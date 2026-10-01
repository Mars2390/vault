'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productHref, searchProducts } from '@/lib/catalog';
import { formatPrice, search } from '@/lib/content';
import Badge from './ui/Badge';
import { ChipButton } from './ui/Chip';
import { ArrowRightIcon, SearchIcon } from './ui/Icons';
import RatioImage from './ui/RatioImage';

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1400;
const GAP_MS = 350;
const MAX_RESULTS = 5;

/**
 * Header search. Filters the catalogue into a results popover, and types
 * example queries into the placeholder while the field is idle.
 */
export default function SearchBox({
  className = '',
  autoFocus = false,
  onNavigate,
}: {
  className?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const results = useMemo(() => searchProducts(query), [query]);
  const hasQuery = query.trim().length > 0;

  // Typewriter placeholder. Writes straight to the DOM so typing a character
  // never re-renders the header. Reduced motion keeps the static placeholder.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const words = search.typewriterWords;
    let frame = 0;
    let word = 0;
    let chars = 0;
    let typing = true;
    let next = performance.now() + GAP_MS;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now < next) return;

      const idle = document.activeElement !== input && !input.value && input.offsetParent !== null;
      if (reduced.matches || !idle) {
        input.placeholder = search.staticPlaceholder;
        chars = 0;
        typing = true;
        next = now + GAP_MS;
        return;
      }

      chars += typing ? 1 : -1;
      input.placeholder = `${search.prefix}${words[word].slice(0, chars)}`;

      if (typing && chars === words[word].length) {
        typing = false;
        next = now + HOLD_MS;
      } else if (!typing && chars === 0) {
        typing = true;
        word = (word + 1) % words.length;
        next = now + GAP_MS;
      } else {
        next = now + (typing ? TYPE_MS : DELETE_MS);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Close when the pointer or focus leaves the search box.
  useEffect(() => {
    if (!open) return;
    const outside = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [open]);

  const leave = () => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
  };

  // Enter goes to the best match, or to the full catalogue when nothing matches.
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!hasQuery) return;
    router.push(results.length ? productHref(results[0]) : '/products');
    inputRef.current?.blur();
    leave();
  };

  const footerLink =
    'flex items-center justify-between gap-12 rounded-input p-8 text-14 font-semibold text-rental-text transition-colors duration-200 ease-brand hover:bg-tint';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form role="search" onSubmit={onSubmit}>
        <label htmlFor={id} className="sr-only">
          {search.label}
        </label>
        <SearchIcon
          size={18}
          className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          ref={inputRef}
          id={id}
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={search.staticPlaceholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
          }}
          className="h-40 w-full appearance-none rounded-pill border border-transparent bg-chip pl-40 pr-16 text-14 text-ink transition-colors duration-200 ease-brand placeholder:text-muted hover:bg-chip-hover focus:border-hairline focus:bg-card [&::-webkit-search-cancel-button]:hidden"
        />
      </form>

      <p className="sr-only" role="status" aria-live="polite">
        {hasQuery ? `${results.length} results for ${query}` : ''}
      </p>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-8 min-w-[280px] rounded-card bg-card p-8 shadow-popover md:left-auto md:w-[360px]">
          {!hasQuery && (
            <div className="p-8">
              <p className="mb-8 text-12 font-semibold text-muted">{search.popularLabel}</p>
              <div className="flex flex-wrap gap-8">
                {search.popular.map((term) => (
                  <ChipButton
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                  >
                    {term}
                  </ChipButton>
                ))}
              </div>
            </div>
          )}

          {hasQuery && results.length === 0 && (
            <>
              <p className="p-8 text-14 text-muted">
                {search.empty} “{query.trim()}”.
              </p>
              <Link href="/request" onClick={leave} className={footerLink}>
                {search.request}
                <ArrowRightIcon size={16} />
              </Link>
            </>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <ul>
                {results.slice(0, MAX_RESULTS).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={productHref(product)}
                      onClick={leave}
                      className="flex items-center gap-12 rounded-input p-8 transition-colors duration-200 ease-brand hover:bg-tint"
                    >
                      <RatioImage
                        image={product.image}
                        ratio="square"
                        sizes="48px"
                        decorative
                        className="w-48 shrink-0 rounded-input"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-14 font-semibold">
                          {product.title}
                        </span>
                        <span className="price block truncate text-12 text-muted">
                          {product.rentDay
                            ? `${formatPrice(product.rentDay)}/day · or buy ${formatPrice(product.buyPrice)}`
                            : formatPrice(product.buyPrice)}
                        </span>
                      </span>
                      <Badge variant={product.mode}>{product.mode}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/products" onClick={leave} className={`${footerLink} mt-4`}>
                {search.seeAll}
                <ArrowRightIcon size={16} />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
