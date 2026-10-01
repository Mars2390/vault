'use client';

import { useMemo, useState } from 'react';
import { productsIn } from '@/lib/catalog';
import { categories, products, productsPage } from '@/lib/content';
import type { CategorySlug, Product } from '@/lib/content';
import ProductGrid from './ProductGrid';
import RequestCta from './RequestCta';
import { ChevronDownIcon, FilterIcon } from './ui/Icons';

type ModeFilter = 'all' | 'buy' | 'rent';

const { filters } = productsPage;

const sorters: Record<string, (a: Product, b: Product) => number> = {
  'price-asc': (a, b) => a.buyPrice - b.buyPrice,
  'price-desc': (a, b) => b.buyPrice - a.buyPrice,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
};

const choice =
  'flex min-h-32 cursor-pointer items-center gap-8 text-14 text-ink [&>input]:h-16 [&>input]:w-16 [&>input]:accent-ink';

const groupHeading = 'mb-8 text-14 font-semibold';

/** The full catalogue with a filter sidebar: buy or rent, category, price, and sort order. */
export default function ProductBrowser() {
  const [mode, setMode] = useState<ModeFilter>('all');
  const [selected, setSelected] = useState<CategorySlug[]>([]);
  const [price, setPrice] = useState('any');
  const [sort, setSort] = useState('featured');

  const visible = useMemo(() => {
    const band = filters.price.options.find((option) => option.id === price)!;
    const matches = products.filter(
      (product) =>
        (mode === 'all' || (mode === 'rent' ? product.rentDay !== undefined : product.mode === 'buy')) &&
        (selected.length === 0 || selected.includes(product.category)) &&
        product.buyPrice >= band.min &&
        product.buyPrice <= band.max,
    );
    const sorter = sorters[sort];
    return sorter ? [...matches].sort(sorter) : matches;
  }, [mode, selected, price, sort]);

  const active = (mode !== 'all' ? 1 : 0) + selected.length + (price !== 'any' ? 1 : 0);

  const clear = () => {
    setMode('all');
    setSelected([]);
    setPrice('any');
  };

  const toggleCategory = (slug: CategorySlug) =>
    setSelected((current) =>
      current.includes(slug) ? current.filter((c) => c !== slug) : [...current, slug],
    );

  // Rendered twice (sidebar and disclosure), so radio groups need a name per copy.
  const controls = (scope: string) => (
    <div className="space-y-24">
      <fieldset>
        <legend className={groupHeading}>{filters.mode.label}</legend>
        {(Object.keys(filters.mode.options) as ModeFilter[]).map((option) => (
          <label key={option} className={choice}>
            <input
              type="radio"
              name={`${scope}-mode`}
              checked={mode === option}
              onChange={() => setMode(option)}
            />
            {filters.mode.options[option]}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className={groupHeading}>{filters.category}</legend>
        {categories.map((category) => (
          <label key={category.slug} className={choice}>
            <input
              type="checkbox"
              checked={selected.includes(category.slug)}
              onChange={() => toggleCategory(category.slug)}
            />
            <span className="flex-1">{category.name}</span>
            <span className="price text-12 text-muted">{productsIn(category.slug).length}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className={groupHeading}>{filters.price.label}</legend>
        {filters.price.options.map((option) => (
          <label key={option.id} className={choice}>
            <input
              type="radio"
              name={`${scope}-price`}
              checked={price === option.id}
              onChange={() => setPrice(option.id)}
            />
            <span className="price">{option.label}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        onClick={clear}
        disabled={active === 0}
        className="inline-flex h-40 items-center text-14 font-semibold text-ink underline transition-colors duration-200 ease-brand hover:text-cobalt disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
      >
        {filters.clear}
      </button>
    </div>
  );

  return (
    <div className="mx-auto mb-56 max-w-page px-24">
      <div className="grid gap-24 lg:grid-cols-[240px_1fr] lg:gap-32">
        {/* Desktop: a fixed sidebar. Below desktop: the same controls in a disclosure. */}
        <aside aria-label={filters.heading} className="hidden lg:block">
          <h2 className="mb-16 text-16 font-semibold">{filters.heading}</h2>
          {controls('sidebar')}
        </aside>

        <details className="group rounded-card border border-hairline bg-card lg:hidden">
          <summary className="flex h-48 items-center justify-between px-16 text-14 font-semibold">
            <span className="flex items-center gap-8">
              <FilterIcon size={18} />
              {filters.heading}
              {active > 0 && (
                <span className="price flex h-20 min-w-20 items-center justify-center rounded-pill bg-ink px-4 text-12 text-white">
                  {active}
                </span>
              )}
            </span>
            <ChevronDownIcon
              size={18}
              className="transition-transform duration-200 ease-standard group-open:rotate-180"
            />
          </summary>
          <div className="border-t border-hairline p-16">{controls('panel')}</div>
        </details>

        <div>
          <div className="mb-16 flex flex-wrap items-center justify-between gap-12">
            <p className="price text-14 text-muted" role="status" aria-live="polite">
              {visible.length === 1 ? '1 product' : `${visible.length} products`}
            </p>
            <label className="flex items-center gap-8 text-14">
              <span className="text-muted">{filters.sort.label}</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-40 rounded-input border border-hairline bg-card px-12 text-14 font-semibold text-ink transition-colors duration-200 ease-brand hover:border-muted"
              >
                {filters.sort.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visible.length > 0 ? (
            <ProductGrid products={visible} columns={3} />
          ) : (
            <p className="rounded-card border border-hairline bg-card p-24 text-16 text-muted">
              {productsPage.empty}
            </p>
          )}

          <div className="mt-32">
            <RequestCta bare />
          </div>
        </div>
      </div>
    </div>
  );
}
