'use client';

import { useState } from 'react';
import Link from 'next/link';
import { request } from '@/lib/content';
import RequestForm from './RequestForm';
import { ArrowRightIcon, CloseIcon } from './ui/Icons';
import Modal from './ui/Modal';

/**
 * Soft call-to-action card that opens the request form in a modal.
 * The button is a real link to /request, so it still works without JavaScript
 * and when opened in a new tab.
 */
export default function RequestCta({
  variant = 'default',
  bare = false,
}: {
  variant?: 'default' | 'emptyCategory';
  /** Skip the section wrapper, for use inside another page's layout. */
  bare?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const copy = variant === 'emptyCategory' ? request.emptyCategory : request.cta;

  const card = (
    <div className="flex flex-col items-start gap-16 rounded-card bg-tint p-24 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-22">{copy.heading}</p>
        <p className="mt-4 text-14 text-muted">{copy.body}</p>
      </div>
      <Link
        href="/request"
        onClick={(event) => {
          // Let modified clicks (new tab, new window) follow the link.
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          setOpen(true);
        }}
        className="inline-flex h-48 shrink-0 items-center gap-8 rounded-button border border-ink px-24 text-16 font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-chip"
      >
        {copy.button}
        <ArrowRightIcon size={18} />
      </Link>

      {open && (
        <Modal label={request.page.title} onClose={() => setOpen(false)} className="p-16">
          <div className="relative m-auto w-full max-w-[560px] rounded-card bg-card p-24 shadow-popover">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close request form"
              className="absolute right-16 top-16 inline-flex h-32 w-32 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-brand hover:bg-chip"
            >
              <CloseIcon size={18} />
            </button>
            <h2 className="pr-40 font-display text-22 md:text-28">{request.page.title}</h2>
            <p className="mb-24 mt-8 text-14 text-muted">{request.page.intro}</p>
            <RequestForm />
          </div>
        </Modal>
      )}
    </div>
  );

  if (bare) return card;

  return (
    <section aria-label={request.navLabel} className="mb-56">
      <div className="mx-auto max-w-page px-24">{card}</div>
    </section>
  );
}
