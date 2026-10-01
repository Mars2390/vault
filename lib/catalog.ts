import { categories, products } from './content';
import type { CategorySlug, Product } from './content';

/** Lookups and pricing rules over the demo catalogue in content.ts. */

export const productHref = (product: Product) => `/product/${product.slug}`;
export const categoryHref = (slug: CategorySlug) => `/category/${slug}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const rentableProducts = products.filter((p) => p.rentDay !== undefined);

export const categoryName = (slug: CategorySlug) => getCategory(slug)?.name ?? slug;

/** Same category first, then the rest, never the product itself. */
export function relatedProducts(product: Product, count = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  return [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, count);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    `${p.title} ${categoryName(p.category)} ${p.rentDay ? 'rent rental' : ''} buy ${p.blurb}`
      .toLowerCase()
      .includes(q),
  );
}

// Round to the pound, or to the nearest fifty on four-figure pieces.
const tidy = (amount: number) =>
  amount >= 1000 ? Math.round(amount / 50) * 50 : Math.round(amount);

export interface PriceOption {
  id: string;
  label: string;
  detail: string;
  price: number;
}

/** Condition grades for buying. "Good" is the listed price. */
export function conditionGrades(product: Product): PriceOption[] {
  const base = product.buyPrice;
  return [
    { id: 'fair', label: 'Fair', detail: 'Visible wear', price: tidy(base * 0.92) },
    { id: 'good', label: 'Good', detail: 'Light marks', price: base },
    { id: 'excellent', label: 'Excellent', detail: 'Barely used', price: tidy(base * 1.05) },
    { id: 'premium', label: 'Premium', detail: 'Like new, boxed', price: tidy(base * 1.09) },
  ];
}

const weekRate = (day: number) => Math.round((day * 35) / 6);

/** Rental lengths, all derived from the day rate. */
export function rentalDurations(day: number): PriceOption[] {
  return [
    { id: 'day', label: 'Day', detail: 'Daytime', price: day },
    { id: 'night', label: 'Night', detail: 'Overnight', price: Math.round(day * 1.25) },
    { id: 'weekend', label: 'Weekend', detail: 'Fri to Mon', price: Math.round(day * 2.5) },
    { id: 'week', label: 'Week', detail: '7 days', price: weekRate(day) },
  ];
}

/** Total for a booking of `days` days: full weeks at the week rate, the rest by the day. */
export function rentalTotal(day: number, days: number) {
  const week = weekRate(day);
  return Math.floor(days / 7) * week + Math.min((days % 7) * day, week);
}

export const lowestDayRate = Math.min(...rentableProducts.map((p) => p.rentDay!));
export const lowestNightRate = Math.round(lowestDayRate * 1.25);
