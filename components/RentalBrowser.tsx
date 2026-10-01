'use client';

import { useEffect, useId, useState } from 'react';
import { rentableProducts } from '@/lib/catalog';
import { rentalsPage } from '@/lib/content';
import ProductGrid from './ProductGrid';
import { ChipButton } from './ui/Chip';
import { CalendarIcon } from './ui/Icons';

const DAY_MS = 86_400_000;

// Date inputs speak yyyy-mm-dd in local time; toISOString would shift the day in most time zones.
const toInputValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const fromInputValue = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const readable = (value: string) =>
  fromInputValue(value).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

const dateInput =
  'h-48 w-full rounded-input border border-hairline bg-card px-12 text-16 text-ink transition-colors duration-200 ease-brand hover:border-muted';

/** Dates first: choose a start and end, and every rental shows its total for that booking. */
export default function RentalBrowser() {
  const { dates } = rentalsPage;
  const fromId = useId();
  const toId = useId();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  // "Today" is only known in the browser, so it is filled in after hydration.
  const [today, setToday] = useState('');

  useEffect(() => setToday(toInputValue(new Date())), []);

  const days = from && to ? Math.round((+fromInputValue(to) - +fromInputValue(from)) / DAY_MS) + 1 : 0;
  const valid = days > 0;
  const invalid = Boolean(from && to) && !valid;

  const quickPick = (id: string, length: number) => {
    const now = new Date();
    // "This weekend" starts on the coming Saturday; the others start today.
    const start = id === 'weekend' ? addDays(now, (6 - now.getDay() + 7) % 7) : now;
    setFrom(toInputValue(start));
    setTo(toInputValue(addDays(start, length - 1)));
  };

  return (
    <div className="mx-auto mb-56 max-w-page px-24">
      <section
        aria-labelledby="dates-heading"
        className="mb-32 rounded-card bg-card p-16 shadow-resting md:p-24"
      >
        <h2 id="dates-heading" className="mb-16 flex items-center gap-8 text-18 font-semibold">
          <CalendarIcon size={20} className="text-rental-accent" />
          {dates.heading}
        </h2>

        <div className="grid gap-16 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label htmlFor={fromId} className="mb-4 block text-14 font-semibold">
              {dates.from}
            </label>
            <input
              id={fromId}
              type="date"
              value={from}
              min={today || undefined}
              onChange={(event) => setFrom(event.target.value)}
              className={dateInput}
            />
          </div>
          <div>
            <label htmlFor={toId} className="mb-4 block text-14 font-semibold">
              {dates.to}
            </label>
            <input
              id={toId}
              type="date"
              value={to}
              min={from || today || undefined}
              aria-invalid={invalid || undefined}
              onChange={(event) => setTo(event.target.value)}
              className={dateInput}
            />
          </div>
          <div className="flex flex-wrap gap-8 md:pb-8">
            {dates.quick.map((option) => (
              <ChipButton key={option.id} onClick={() => quickPick(option.id, option.days)}>
                {option.label}
              </ChipButton>
            ))}
          </div>
        </div>

        {/* The chosen range fills in with the rental sweep. */}
        <div
          data-swept={valid}
          className="sweep mt-16 flex min-h-48 flex-wrap items-center justify-between gap-x-16 gap-y-4 overflow-hidden rounded-input bg-tint px-16 py-8"
        >
          <p
            role="status"
            aria-live="polite"
            className={`price text-14 ${valid ? 'font-semibold text-rental-text' : invalid ? 'text-danger-text' : 'text-muted'}`}
          >
            {valid
              ? `${days} ${days === 1 ? 'day' : 'days'} · ${readable(from)}${days > 1 ? ` to ${readable(to)}` : ''}`
              : invalid
                ? dates.invalid
                : dates.prompt}
          </p>
          {(from || to) && (
            <button
              type="button"
              onClick={() => {
                setFrom('');
                setTo('');
              }}
              className="inline-flex h-32 items-center text-14 font-semibold text-ink underline transition-colors duration-200 ease-brand hover:text-cobalt"
            >
              {dates.clear}
            </button>
          )}
        </div>
      </section>

      <ProductGrid products={rentableProducts} rentalDays={valid ? days : undefined} fromPrice />
    </div>
  );
}
