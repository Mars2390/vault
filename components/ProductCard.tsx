import Link from 'next/link';
import { productHref, rentalTotal } from '@/lib/catalog';
import { formatPrice } from '@/lib/content';
import type { Product } from '@/lib/content';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { Stars } from './ui/Icons';
import LightboxImage from './ui/LightboxImage';

/**
 * Buy cards lead with the buy price and strike through the new price.
 * Rent cards lead with the day rate and keep the buy price underneath, so
 * both ways of getting the product are always on the card.
 *
 * The image opens the lightbox; the rest of the card links to the product page.
 */
export default function ProductCard({
  product,
  sizes = '(min-width: 1024px) 296px, (min-width: 768px) 33vw, 50vw',
  rentalDays,
  fromPrice = false,
  eager = false,
}: {
  product: Product;
  sizes?: string;
  /** Load the image straight away: set on the first row of a grid. */
  eager?: boolean;
  /** On the rentals page: show the total for a booking of this many days. */
  rentalDays?: number;
  /** On the rentals page: prefix the day rate with "from". */
  fromPrice?: boolean;
}) {
  const isRent = product.mode === 'rent' && product.rentDay !== undefined;
  const saving = product.newPrice - product.buyPrice;

  return (
    <Card
      as="article"
      interactive
      className={`flex h-full flex-col overflow-hidden ${isRent ? 'sweep-trigger' : ''}`}
    >
      <div className="relative">
        <LightboxImage
          image={product.image}
          gallery={product.gallery}
          ratio="product"
          sizes={sizes}
          eager={eager}
        />
        <Badge
          variant={isRent ? 'rent' : 'buy'}
          className="pointer-events-none absolute right-12 top-12"
        >
          {isRent ? 'Rent' : 'Buy'}
        </Badge>
      </div>

      <div className="relative flex flex-1 flex-col p-16">
        <h3 className="text-16 font-semibold">
          {/* Stretched link: the whole text area is the click target. */}
          <Link href={productHref(product)} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h3>

        <p className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 text-12 text-muted">
          <Stars rating={product.rating} />
          <span className="price">
            {product.rating.toFixed(1)} ({product.reviews.toLocaleString('en-GB')})
          </span>
        </p>

        <div className="price mt-auto pt-16">
          {isRent ? (
            <div className="sweep -mx-8 rounded-input px-8 py-4">
              {rentalDays ? (
                <p className="text-22 font-semibold text-rental-text">
                  {formatPrice(rentalTotal(product.rentDay!, rentalDays))}
                  <span className="text-14">
                    {' '}
                    for {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                  </span>
                </p>
              ) : (
                <p className="text-22 font-semibold text-rental-text">
                  {fromPrice && <span className="text-14">from </span>}
                  {formatPrice(product.rentDay!)}
                  <span className="text-14">/day</span>
                </p>
              )}
              <p className="text-12 text-muted">or buy {formatPrice(product.buyPrice)}</p>
            </div>
          ) : (
            <div className="py-4">
              <p className="flex flex-wrap items-baseline gap-x-8">
                <span className="text-22 font-semibold">{formatPrice(product.buyPrice)}</span>
                <s className="text-14 text-muted">{formatPrice(product.newPrice)} new</s>
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
