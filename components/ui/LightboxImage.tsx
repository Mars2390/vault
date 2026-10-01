'use client';

import type { ImageAsset } from '@/lib/content';
import { useLightbox } from '../Lightbox';
import { ExpandIcon } from './Icons';
import RatioImage from './RatioImage';
import type { Ratio } from './RatioImage';

/**
 * A cropped image that opens the lightbox when clicked. `gallery` is the set
 * of uncropped originals to page through; it defaults to the image itself.
 */
export default function LightboxImage({
  image,
  gallery,
  index = 0,
  ratio,
  sizes,
  preload,
  eager,
  className = '',
  frameClassName = '',
  imageClassName = '',
  focus,
}: {
  image: ImageAsset;
  gallery?: ImageAsset[];
  index?: number;
  ratio: Ratio;
  sizes: string;
  preload?: boolean;
  eager?: boolean;
  className?: string;
  /** Extra classes for the ratio box, e.g. a different ratio at a breakpoint. */
  frameClassName?: string;
  imageClassName?: string;
  focus?: string;
}) {
  const open = useLightbox();

  return (
    <button
      type="button"
      onClick={() => open(gallery ?? [image], index)}
      aria-label={`View larger image: ${image.alt}`}
      className={`focus-inset group/zoom relative block w-full cursor-zoom-in overflow-hidden ${className}`}
    >
      <RatioImage
        image={image}
        ratio={ratio}
        sizes={sizes}
        preload={preload}
        eager={eager}
        className={frameClassName}
        imageClassName={imageClassName}
        focus={focus}
      />
      <span
        aria-hidden="true"
        className="absolute left-12 top-12 flex h-32 w-32 items-center justify-center rounded-pill bg-card text-ink opacity-0 shadow-resting transition-opacity duration-200 ease-brand group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
      >
        <ExpandIcon size={16} />
      </span>
    </button>
  );
}
