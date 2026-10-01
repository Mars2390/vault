'use client';

import { useState } from 'react';
import type { Product } from '@/lib/content';
import LightboxImage from './ui/LightboxImage';
import RatioImage from './ui/RatioImage';

/** Main product image with thumbnails. Clicking the main image opens the full set in the lightbox. */
export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  // The first slot uses the card crop; the rest are the gallery originals.
  const slots = [product.image, ...product.gallery.slice(1)];

  return (
    <div>
      <LightboxImage
        image={slots[active]}
        gallery={product.gallery}
        index={active}
        ratio="product"
        sizes="(min-width: 1024px) 560px, 100vw"
        preload
        className="rounded-card shadow-resting"
      />

      {slots.length > 1 && (
        <ul className="mt-12 flex gap-8">
          {slots.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1} of ${slots.length}`}
                aria-current={index === active}
                className={`block w-64 overflow-hidden rounded-input border transition-colors duration-200 ease-brand ${
                  index === active ? 'border-ink' : 'border-hairline hover:border-muted'
                }`}
              >
                <RatioImage image={image} ratio="square" sizes="64px" decorative />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
