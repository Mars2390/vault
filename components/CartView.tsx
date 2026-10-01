'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cart, useCart } from '@/lib/cart';
import { getProduct, productHref } from '@/lib/catalog';
import { cartPage, formatPrice } from '@/lib/content';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Card from './ui/Card';
import { MinusIcon, PlusIcon } from './ui/Icons';
import RatioImage from './ui/RatioImage';

const stepper =
  'inline-flex h-32 w-32 items-center justify-center rounded-pill border border-hairline bg-card text-ink transition-colors duration-200 ease-brand hover:bg-chip disabled:cursor-not-allowed disabled:text-chip-hover disabled:hover:bg-card';

/** The cart held in this browser. Quantities and removal work; checkout is not open yet. */
export default function CartView() {
  const { lines, subtotal } = useCart();
  const [notice, setNotice] = useState(false);

  // Skip any saved line whose product has since left the catalogue.
  const rows = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ line, product }] : [];
  });

  if (rows.length === 0) {
    return (
      <Card padding="promo" className="text-center md:py-56">
        <h2 className="font-display text-22">{cartPage.empty.heading}</h2>
        <p className="mx-auto mt-8 max-w-[420px] text-16 text-muted">{cartPage.empty.body}</p>
        <div className="mt-24 flex flex-col justify-center gap-12 sm:flex-row">
          <Button href="/products">Shop the collection</Button>
          <Button href="/rentals" variant="rentalOutline">
            Browse rentals
          </Button>
        </div>
      </Card>
    );
  }

  const delivery = subtotal >= cartPage.freeDeliveryOver ? 0 : cartPage.deliveryFee;

  return (
    <div className="grid items-start gap-24 lg:grid-cols-[1fr_360px] lg:gap-32">
      <div>
        <ul className="space-y-16">
          {rows.map(({ line, product }) => (
            <Card as="li" key={line.id} padding="product" className="flex gap-16">
              <RatioImage
                image={product.image}
                ratio="square"
                sizes="96px"
                decorative
                className="w-80 shrink-0 self-start rounded-input md:w-96"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <div className="flex items-start justify-between gap-12">
                  <div className="min-w-0">
                    <Link
                      href={productHref(product)}
                      className="text-16 font-semibold hover:text-cobalt"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-4 flex flex-wrap items-center gap-8 text-14 text-muted">
                      <Badge variant={line.mode}>{line.mode}</Badge>
                      {line.option}
                    </p>
                  </div>
                  <p className="price shrink-0 text-16 font-semibold">
                    {formatPrice(line.price * line.qty)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-12">
                  <div className="flex items-center gap-8">
                    <button
                      type="button"
                      className={stepper}
                      aria-label={`Decrease quantity of ${product.title}`}
                      disabled={line.qty <= 1}
                      onClick={() => cart.setQty(line.id, line.qty - 1)}
                    >
                      <MinusIcon size={16} />
                    </button>
                    <span className="price min-w-24 text-center text-14 font-semibold" aria-live="polite">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      className={stepper}
                      aria-label={`Increase quantity of ${product.title}`}
                      disabled={line.qty >= 9}
                      onClick={() => cart.setQty(line.id, line.qty + 1)}
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(line.id)}
                    aria-label={`${cartPage.remove} ${product.title}`}
                    className="inline-flex h-32 items-center text-14 font-semibold text-ink underline transition-colors duration-200 ease-brand hover:text-danger-text"
                  >
                    {cartPage.remove}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-12">
          <p className="text-12 text-muted">{cartPage.note}</p>
          <button
            type="button"
            onClick={() => cart.clear()}
            className="inline-flex h-32 items-center text-14 font-semibold text-ink underline transition-colors duration-200 ease-brand hover:text-danger-text"
          >
            {cartPage.clear}
          </button>
        </div>
      </div>

      <Card as="section" padding="promo" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="mb-16 text-18 font-semibold">
          {cartPage.summary}
        </h2>
        <dl className="price space-y-8 text-14">
          <div className="flex justify-between">
            <dt className="text-muted">{cartPage.subtotal}</dt>
            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{cartPage.delivery}</dt>
            <dd className="font-semibold">{delivery ? formatPrice(delivery) : cartPage.free}</dd>
          </div>
          <div className="flex justify-between border-t border-hairline pt-12 text-18">
            <dt className="font-semibold">{cartPage.total}</dt>
            <dd className="font-semibold">{formatPrice(subtotal + delivery)}</dd>
          </div>
        </dl>

        <Button className="mt-24 w-full" onClick={() => setNotice(true)}>
          {cartPage.checkout}
        </Button>

        <div role="status" aria-live="polite">
          {notice && (
            <div className="mt-16 rounded-input bg-warning-bg p-12 text-14 text-warning-text">
              <p>{cartPage.checkoutNotice}</p>
              <Link href="/contact" className="mt-4 inline-block font-semibold underline">
                {cartPage.checkoutLink}
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
