'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ImageAsset } from '@/lib/content';

type Ratio = 'hero' | 'category' | 'product';

// Explicit render size per ratio. Sources are a mix of portrait, landscape and
// square, so every image is cropped to its slot with object-fit: cover.
const ratios: Record<Ratio, { className: string; width: number; height: number }> = {
  hero: { className: 'aspect-hero', width: 1200, height: 900 },
  category: { className: 'aspect-category', width: 900, height: 1200 },
  product: { className: 'aspect-product', width: 800, height: 1000 },
};

export default function RatioImage({
  image,
  ratio,
  sizes,
  preload = false,
  fill = false,
  className = '',
  imageClassName = '',
  focus,
}: {
  image: ImageAsset;
  ratio: Ratio;
  sizes: string;
  preload?: boolean;
  /** Stretch to the parent's box instead of holding the ratio. */
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  focus?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const { className: ratioClass, width, height } = ratios[ratio];

  return (
    <div
      className={`relative overflow-hidden ${fill ? 'h-full w-full' : ratioClass} ${
        loaded ? '' : 'skeleton'
      } ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        style={{ objectPosition: focus ?? image.focus }}
      />
    </div>
  );
}
