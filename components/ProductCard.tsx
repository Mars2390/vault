import { formatPrice } from '@/lib/content';
import type { Product } from '@/lib/content';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { Stars } from './ui/Icons';
import RatioImage from './ui/RatioImage';

/**
 * Buy cards lead with the buy price and strike through the new price.
 * Rent cards lead with the rental rate and keep the buy price underneath, so
 * both ways of getting the product are always on the card.
 */
export default function ProductCard({ product }: { product: Product }) {
  const isRent = product.mode === 'rent' && product.rentPrice !== undefined;
  const saving = product.newPrice ? product.newPrice - product.buyPrice : 0;

  return (
    <Card
      as="article"
      id={product.id}
      interactive
      className={`relative flex h-full scroll-mx-24 flex-col overflow-hidden ${
        isRent ? 'sweep-trigger' : ''
      }`}
    >
      <div className="relative">
        <RatioImage
          image={product.image}
          ratio="product"
          sizes="(min-width: 1024px) 296px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 72vw"
        />
        <Badge variant={isRent ? 'rent' : 'buy'} className="absolute right-12 top-12">
          {isRent ? 'Rent' : 'Buy'}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-16">
        <h3 className="text-16 font-semibold">
          {/* Stretched link: the whole card is the click target. */}
          <a href={`#${product.id}`} className="after:absolute after:inset-0">
            {product.title}
          </a>
        </h3>

        <p className="mt-4 flex items-center gap-8 text-12 text-muted">
          <Stars rating={product.rating} />
          <span className="price">
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString('en-GB')})
          </span>
        </p>

        <div className="price mt-auto pt-16">
          {isRent ? (
            <div className="sweep -mx-8 rounded-input px-8 py-4">
              <p className="text-22 font-semibold text-rental-text">
                {formatPrice(product.rentPrice!)}
                <span className="text-14">/{product.rentUnit}</span>
              </p>
              <p className="text-12 text-muted">or buy {formatPrice(product.buyPrice)}</p>
            </div>
          ) : (
            <div className="py-4">
              <p className="flex flex-wrap items-baseline gap-x-8">
                <span className="text-22 font-semibold">{formatPrice(product.buyPrice)}</span>
                {product.newPrice && (
                  <s className="text-14 text-muted">{formatPrice(product.newPrice)} new</s>
                )}
              </p>
              <p className="flex h-16 items-center">
                {saving > 0 && <Badge variant="save">Save {formatPrice(saving)}</Badge>}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
