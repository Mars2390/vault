import type { Product } from '@/lib/content';
import ProductCard from './ProductCard';

/** Responsive grid of product cards: 2 across on mobile, up to `columns` on desktop. */
export default function ProductGrid({
  products,
  columns = 4,
  rentalDays,
  fromPrice,
}: {
  products: Product[];
  columns?: 3 | 4;
  rentalDays?: number;
  fromPrice?: boolean;
}) {
  return (
    <ul
      className={`grid grid-cols-2 gap-16 md:grid-cols-3 ${columns === 4 ? 'lg:grid-cols-4' : ''}`}
    >
      {products.map((product, index) => (
        <li key={product.slug}>
          <ProductCard
            product={product}
            rentalDays={rentalDays}
            fromPrice={fromPrice}
            eager={index < columns}
          />
        </li>
      ))}
    </ul>
  );
}
