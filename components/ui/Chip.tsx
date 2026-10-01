import type { ButtonHTMLAttributes, ReactNode } from 'react';

const base =
  'inline-flex h-32 items-center gap-4 whitespace-nowrap rounded-pill bg-chip px-12 text-12 font-semibold text-ink';

type ChipProps = {
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Static pill, e.g. a trust marker. */
export default function Chip({ icon, className = '', children }: ChipProps) {
  return (
    <span className={`${base} ${className}`}>
      {icon}
      {children}
    </span>
  );
}

/** Clickable pill, e.g. a suggested search. */
export function ChipButton({
  icon,
  className = '',
  children,
  ...rest
}: ChipProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`${base} transition-colors duration-200 ease-brand hover:bg-chip-hover ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
