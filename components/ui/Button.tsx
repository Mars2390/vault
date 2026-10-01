import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'rental' | 'rentalOutline' | 'outline' | 'white';

const base =
  'inline-flex h-48 items-center justify-center gap-8 whitespace-nowrap rounded-button border px-24 text-16 font-semibold transition-colors duration-200 ease-brand disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover',
  rental:
    'border-rental-text bg-rental-text text-white hover:border-rental-text-hover hover:bg-rental-text-hover',
  rentalOutline: 'border-rental-text bg-transparent text-rental-text hover:bg-rental-fill',
  outline: 'border-ink bg-transparent text-ink hover:bg-chip',
  white: 'border-white bg-white text-ink hover:border-chip hover:bg-chip',
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Renders a link when given an href (client-side for internal routes), otherwise a button. */
export default function Button(props: LinkProps | NativeProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (typeof props.href === 'string') {
    const { href, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return href.startsWith('/') ? (
      <Link href={href} className={classes} {...anchor}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...anchor}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
