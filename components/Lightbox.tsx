'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, PointerEvent, ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ImageAsset } from '@/lib/content';
import Modal from './ui/Modal';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './ui/Icons';

type OpenLightbox = (images: ImageAsset[], index?: number) => void;

const LightboxContext = createContext<OpenLightbox>(() => {});

/** Returns a function that opens the lightbox on a set of images. */
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ images: ImageAsset[]; index: number } | null>(null);
  const open = useCallback<OpenLightbox>((images, index = 0) => setState({ images, index }), []);
  const pathname = usePathname();

  // Never carry an open lightbox across a navigation.
  useEffect(() => setState(null), [pathname]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state && (
        <Lightbox images={state.images} startIndex={state.index} onClose={() => setState(null)} />
      )}
    </LightboxContext.Provider>
  );
}

const ZOOM_MAX_WIDTH = 2560; // "actual size", capped so a 6000px original stays usable
const SWIPE_DISTANCE = 48;
const TOP_BAR = 64;
const THUMB_BAR = 88;
const GUTTER = 32;

const roundButton =
  'inline-flex h-32 w-32 items-center justify-center rounded-pill border border-white text-white transition-colors duration-200 ease-brand hover:bg-white hover:text-ink';

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: ImageAsset[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const justSwiped = useRef(false);
  const zoomPoint = useRef({ x: 0.5, y: 0.5 });

  const image = images[index];
  const many = images.length > 1;

  const show = useCallback(
    (next: number) => {
      setZoomed(false);
      setLoaded(false);
      setIndex((next + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => closeRef.current?.focus(), []);

  useEffect(() => {
    if (!many) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [many, index, show]);

  // After zooming in, scroll so the point that was clicked stays under the pointer.
  useEffect(() => {
    const stage = stageRef.current;
    if (!zoomed || !stage) return;
    stage.scrollLeft = zoomPoint.current.x * stage.scrollWidth - stage.clientWidth / 2;
    stage.scrollTop = zoomPoint.current.y * stage.scrollHeight - stage.clientHeight / 2;
  }, [zoomed]);

  const toggleZoom = (event: MouseEvent<HTMLButtonElement>) => {
    if (justSwiped.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Keyboard activation has no pointer position: zoom on the centre.
    const fromPointer = event.clientX !== 0 || event.clientY !== 0;
    zoomPoint.current = fromPointer
      ? { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height }
      : { x: 0.5, y: 0.5 };
    setZoomed((value) => !value);
  };

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = zoomed ? null : { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || !many) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    // Swallow the click that follows this pointerup, so a swipe never zooms or closes.
    justSwiped.current = true;
    window.setTimeout(() => (justSwiped.current = false), 60);
    show(index + (dx < 0 ? 1 : -1));
  };

  // Fit the whole image inside the stage, at its own aspect ratio, before it has loaded.
  const chrome = TOP_BAR + (many ? THUMB_BAR : 0) + GUTTER;
  const ratio = image.height / image.width;
  const zoomWidth = Math.min(image.width, ZOOM_MAX_WIDTH);
  const size: CSSProperties = zoomed
    ? { width: zoomWidth, height: zoomWidth * ratio }
    : {
        height: `min(calc(100dvh - ${chrome}px), calc((100vw - ${GUTTER}px) * ${ratio}))`,
        aspectRatio: `${image.width} / ${image.height}`,
      };

  return (
    <Modal label="Image viewer" onClose={onClose} className="on-dark flex-col">
      <div className="flex h-64 shrink-0 items-center justify-between px-16">
        <p className="price text-14 text-white-muted" aria-hidden={!many}>
          {many ? `${index + 1} / ${images.length}` : ''}
        </p>
        <button
          ref={closeRef}
          type="button"
          className={roundButton}
          aria-label="Close image viewer"
          onClick={onClose}
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="group relative flex min-h-0 flex-1">
        <div
          ref={stageRef}
          className={`flex min-h-0 flex-1 px-16 ${
            zoomed ? 'overflow-auto' : 'touch-none overflow-hidden'
          }`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
          onClick={(event) => {
            if (event.target === event.currentTarget && !justSwiped.current) onClose();
          }}
        >
          <button
            type="button"
            onClick={toggleZoom}
            aria-pressed={zoomed}
            aria-label={zoomed ? 'Zoom out to fit the screen' : 'Zoom in to actual size'}
            className={`relative m-auto block shrink-0 overflow-hidden rounded-input ${
              zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            } ${loaded ? '' : 'skeleton'}`}
            style={size}
          >
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={zoomed ? `${zoomWidth}px` : '100vw'}
              draggable={false}
              onLoad={() => setLoaded(true)}
              className="h-full w-full select-none object-contain"
            />
          </button>
        </div>

        {many && (
          <>
            <button
              type="button"
              className={`${roundButton} absolute left-16 top-1/2 -translate-y-1/2 bg-ink opacity-0 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100`}
              aria-label="Previous image"
              onClick={() => show(index - 1)}
            >
              <ChevronLeftIcon size={18} />
            </button>
            <button
              type="button"
              className={`${roundButton} absolute right-16 top-1/2 -translate-y-1/2 bg-ink opacity-0 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100`}
              aria-label="Next image"
              onClick={() => show(index + 1)}
            >
              <ChevronRightIcon size={18} />
            </button>
          </>
        )}
      </div>

      {many && (
        <ul className="flex shrink-0 justify-center gap-8 px-16 py-16">
          {images.map((thumb, i) => (
            <li key={thumb.src}>
              <button
                type="button"
                onClick={() => show(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={`block h-56 w-56 overflow-hidden rounded-input border transition-opacity duration-200 ease-brand ${
                  i === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={thumb.src}
                  alt=""
                  width={112}
                  height={112}
                  sizes="56px"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: thumb.focus }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {`Image ${index + 1} of ${images.length}: ${image.alt}${zoomed ? ', zoomed in' : ''}`}
      </p>
    </Modal>
  );
}
