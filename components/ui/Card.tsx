import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type Padding = 'none' | 'product' | 'promo';

const paddings: Record<Padding, string> = {
  none: '',
  product: 'p-16',
  promo: 'p-24',
};

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  padding?: Padding;
  /** Deepens the shadow on hover and focus. Never lifts or scales. */
  interactive?: boolean;
  children: ReactNode;
};

/** White content card. Shadow means content; borders are for things you choose. */
export default function Card({
  as: Tag = 'div',
  padding = 'none',
  interactive = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const hover = interactive
    ? 'transition-shadow duration-200 ease-standard hover:shadow-hover focus-within:shadow-hover'
    : '';
  return (
    <Tag
      className={`rounded-card bg-card shadow-resting ${paddings[padding]} ${hover} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
