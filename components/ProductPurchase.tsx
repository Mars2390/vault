'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cart } from '@/lib/cart';
import { conditionGrades, rentalDurations } from '@/lib/catalog';
import { formatPrice, productPage } from '@/lib/content';
import type { Mode, Product } from '@/lib/content';
import Badge from './ui/Badge';
import Button from './ui/Button';
import {
  ArrowRightIcon,
  CheckIcon,
  HeartIcon,
  ReturnIcon,
  ShieldCheckIcon,
  TruckIcon,
} from './ui/Icons';
import OptionTile from './ui/OptionTile';

const trustIcons = [TruckIcon, ReturnIcon, ShieldCheckIcon];

/**
 * Price, options and add-to-cart for one product. Rentable products get a
 * Rent / Buy switch: rent shows rental lengths, buy shows condition grades.
 */
export default function ProductPurchase({ product }: { product: Product }) {
  const rentable = product.rentDay !== undefined;
  const grades = conditionGrades(product);
  const durations = rentable ? rentalDurations(product.rentDay!) : [];

  const [mode, setMode] = useState<Mode>(rentable ? product.mode : 'buy');
  const [gradeId, setGradeId] = useState('good');
  const [durationId, setDurationId] = useState('day');
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const grade = grades.find((option) => option.id === gradeId)!;
  const duration = durations.find((option) => option.id === durationId);
  const renting = mode === 'rent' && duration !== undefined;
  const saving = product.newPrice - grade.price;

  // Changing any option makes the "added" confirmation stale.
  useEffect(() => setAdded(false), [mode, gradeId, durationId]);

  const addToCart = () => {
    cart.add(
      renting
        ? { slug: product.slug, mode: 'rent', option: duration.label, price: duration.price }
        : { slug: product.slug, mode: 'buy', option: grade.label, price: grade.price },
    );
    setAdded(true);
  };

  return (
    <div>
      {/* Price block */}
      <div className="price">
        {renting ? (
          <>
            <p className="text-22 font-semibold text-rental-text">
              {formatPrice(duration.price)}
              <span className="text-14">/{duration.label.toLowerCase()}</span>
            </p>
            <p className="text-14 text-muted">or buy {formatPrice(product.buyPrice)}</p>
          </>
        ) : (
          <p className="flex flex-wrap items-center gap-x-12 gap-y-4">
            <span className="text-22 font-semibold">{formatPrice(grade.price)}</span>
            <s className="text-14 text-muted">{formatPrice(product.newPrice)} new</s>
            {saving > 0 && <Badge variant="save">Save {formatPrice(saving)}</Badge>}
          </p>
        )}
      </div>

      {rentable && (
        <fieldset className="mt-24">
          <legend className="mb-8 text-14 font-semibold">{productPage.modeLabel}</legend>
          <div className="grid grid-cols-2 gap-8">
            <OptionTile
              name="mode"
              value="rent"
              tone="rental"
              checked={mode === 'rent'}
              onChange={() => setMode('rent')}
              title="Rent"
              detail={`from ${formatPrice(product.rentDay!)}/day`}
            />
            <OptionTile
              name="mode"
              value="buy"
              checked={mode === 'buy'}
              onChange={() => setMode('buy')}
              title="Buy"
              detail={`from ${formatPrice(grades[0].price)}`}
            />
          </div>
        </fieldset>
      )}

      {renting ? (
        <fieldset className="mt-24">
          <legend className="mb-8 text-14 font-semibold">{productPage.durationLabel}</legend>
          <div className="grid grid-cols-2 gap-8">
            {durations.map((option) => (
              <OptionTile
                key={option.id}
                name="duration"
                value={option.id}
                tone="rental"
                checked={durationId === option.id}
                onChange={setDurationId}
                title={option.label}
                detail={option.detail}
                trailing={formatPrice(option.price)}
              />
            ))}
          </div>
        </fieldset>
      ) : (
        <fieldset className="mt-24">
          <legend className="mb-8 text-14 font-semibold">{productPage.conditionLabel}</legend>
          <div className="grid grid-cols-2 gap-8">
            {grades.map((option) => (
              <OptionTile
                key={option.id}
                name="condition"
                value={option.id}
                checked={gradeId === option.id}
                onChange={setGradeId}
                title={option.label}
                detail={option.detail}
                trailing={formatPrice(option.price)}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-24 flex gap-8">
        <Button
          variant={renting ? 'rental' : 'primary'}
          className="flex-1"
          onClick={addToCart}
        >
          {added ? (
            <>
              <CheckIcon size={18} />
              {productPage.added}
            </>
          ) : (
            productPage.addToCart
          )}
        </Button>
        <button
          type="button"
          onClick={() => setWished((value) => !value)}
          aria-pressed={wished}
          aria-label={wished ? productPage.wishlist.remove : productPage.wishlist.add}
          className={`inline-flex h-48 w-48 shrink-0 items-center justify-center rounded-button border transition-colors duration-200 ease-brand hover:bg-chip ${
            wished ? 'border-ink text-danger-text' : 'border-hairline text-ink'
          }`}
        >
          <HeartIcon size={22} filled={wished} />
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-8 min-h-24 text-14">
        {added && (
          <Link
            href="/cart"
            className="inline-flex items-center gap-4 font-semibold text-rental-text hover:text-rental-text-hover"
          >
            {productPage.viewCart}
            <ArrowRightIcon size={16} />
          </Link>
        )}
      </p>

      <ul className="mt-8 space-y-12 rounded-card bg-periwinkle p-16">
        {productPage.trust.map((item, index) => {
          const Icon = trustIcons[index];
          return (
            <li key={item} className="flex items-center gap-12 text-14 font-semibold">
              <Icon size={20} className="shrink-0 text-cobalt" />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
