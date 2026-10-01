import type { CSSProperties, ReactNode } from 'react';
import { CheckIcon } from './Icons';

type Variant = 'buy' | 'rent' | 'save' | 'verified';

const base = 'inline-flex h-24 items-center gap-4 whitespace-nowrap px-8 text-12 font-semibold';

const variants: Record<Variant, string> = {
  buy: 'rounded-badge bg-ink uppercase tracking-[0.06em] text-white',
  // The sweep darkens the badge left to right when its rental card is hovered.
  rent: 'sweep overflow-hidden rounded-badge bg-rental-text uppercase tracking-[0.06em] text-white',
  save: 'rounded-badge bg-success-bg text-success-text',
  verified: 'rounded-pill bg-chip text-ink',
};

const rentSweep = { '--sweep-color': 'var(--rental-text-hover)' } as CSSProperties;

export default function Badge({
  variant,
  className = '',
  children,
}: {
  variant: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === 'rent' ? rentSweep : undefined}
    >
      {variant === 'verified' && <CheckIcon size={12} className="text-success-text" />}
      {children}
    </span>
  );
}
