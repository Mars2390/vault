'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/content';
import ProductCard from './ProductCard';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from './ui/Icons';

const arrowButton =
  'hidden h-40 w-40 items-center justify-center rounded-pill border border-hairline bg-card text-ink transition-colors duration-200 ease-brand hover:bg-chip disabled:cursor-not-allowed disabled:text-chip-hover disabled:hover:bg-card md:inline-flex';

/** Horizontal row of product cards: arrows on desktop, swipe on touch. */
export default function ProductCarousel({
  id,
  heading,
  link,
  products,
}: {
  id: string;
  heading: string;
  link?: { label: string; href: string };
  products: Product[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        measure();
      });
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [measure]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <div className="mb-24 flex items-center justify-between gap-16">
          <h2 id={headingId} className="font-display text-22 md:text-28">
            {heading}
          </h2>
          <div className="flex shrink-0 items-center gap-8">
            {link && (
              <Link
                href={link.href}
                className="mr-8 inline-flex h-40 items-center gap-4 text-14 font-semibold text-rental-text transition-colors duration-200 ease-brand hover:text-rental-text-hover"
              >
                {link.label}
                <ArrowRightIcon size={16} />
              </Link>
            )}
            <button
              type="button"
              className={arrowButton}
              aria-label="Previous products"
              disabled={!canPrev}
              onClick={() => page(-1)}
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className={arrowButton}
              aria-label="Next products"
              disabled={!canNext}
              onClick={() => page(1)}
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>

        {/* The vertical padding leaves room for card shadows inside the scroller. */}
        <ul
          ref={trackRef}
          className="no-scrollbar -mx-24 -my-12 flex snap-x snap-mandatory scroll-px-24 gap-16 overflow-x-auto px-24 py-12 md:-mx-8 md:scroll-px-8 md:px-8"
        >
          {products.map((product) => (
            <li
              key={product.slug}
              className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)]"
            >
              <ProductCard
                product={product}
                sizes="(min-width: 1024px) 296px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 72vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
