'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { newsletter } from '@/lib/content';
import Button from './ui/Button';
import Card from './ui/Card';

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  // Phase 1 has no backend: confirm in place, send nothing.
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <section aria-labelledby="newsletter-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <Card className="px-24 py-40 text-center md:py-56">
          <h2 id="newsletter-heading" className="font-display text-22 md:text-28">
            {newsletter.heading}
          </h2>
          <p className="mt-8 text-16 text-muted">{newsletter.sub}</p>

          {subscribed ? (
            <p role="status" className="mx-auto mt-24 max-w-[480px] text-16 font-semibold text-success-text">
              {newsletter.success}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-24 flex max-w-[480px] flex-col gap-12 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {newsletter.inputLabel}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={newsletter.placeholder}
                // flex-1 only in the row layout: in the stacked layout it would collapse the height.
                className="h-48 w-full shrink-0 rounded-input sm:w-auto sm:min-w-0 sm:flex-1 sm:shrink border border-hairline bg-card px-16 text-16 text-ink transition-colors duration-200 ease-brand placeholder:text-muted hover:border-muted"
              />
              <Button type="submit">{newsletter.button}</Button>
            </form>
          )}

          <p className="mt-12 text-12 text-muted">{newsletter.smallPrint}</p>
        </Card>
      </div>
    </section>
  );
}
