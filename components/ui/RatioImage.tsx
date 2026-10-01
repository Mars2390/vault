'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ImageAsset } from '@/lib/content';

export type Ratio = 'hero' | 'category' | 'product' | 'square';

// Explicit render size per ratio. Sources are a mix of portrait, landscape and
// square, so every image is cropped to its slot with object-fit: cover.
const ratios: Record<Ratio, { className: string; width: number; height: number }> = {
  hero: { className: 'aspect-hero', width: 1200, height: 900 },
  category: { className: 'aspect-category', width: 900, height: 1200 },
  product: { className: 'aspect-product', width: 800, height: 1000 },
  square: { className: 'aspect-square', width: 400, height: 400 },
};

export default function RatioImage({
  image,
  ratio,
  sizes,
  preload = false,
  eager = false,
  className = '',
  imageClassName = '',
  focus,
  decorative = false,
}: {
  image: ImageAsset;
  ratio: Ratio;
  sizes: string;
  preload?: boolean;
  /** Load straight away without a preload hint, for images near the top of a page. */
  eager?: boolean;
  className?: string;
  imageClassName?: string;
  focus?: string;
  /** Empty alt, for thumbnails that sit next to the same text. */
  decorative?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const { className: ratioClass, width, height } = ratios[ratio];

  return (
    // A span, so the image can sit inside a button or a link.
    <span
      className={`relative block overflow-hidden ${ratioClass} ${loaded ? '' : 'skeleton'} ${className}`}
    >
      <Image
        src={image.src}
        alt={decorative ? '' : image.alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        loading={eager && !preload ? 'eager' : undefined}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        style={{ objectPosition: focus ?? image.focus }}
      />
    </span>
  );
}
