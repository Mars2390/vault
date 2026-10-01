import type { ReactNode, SVGProps } from 'react';

/**
 * Hand-drawn inline icons. All strokes use currentColor, so colour always
 * comes from a token class on the parent.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.9-3.9" />
  </Svg>
);

export const UserIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.600 8 7" />
  </Svg>
);

export const CartIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.200a2 2 0 0 1-2-1.800L5 8z" />
    <path d="M9 8V6.500a3 3 0 0 1 6 0V8" />
  </Svg>
);

export const MenuIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m15 5-7 7 7 7" />
  </Svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const CheckIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m5 12.500 4.500 4.500L19 7.500" />
  </Svg>
);

export const TagIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 12V4h8l10 10-8 8L3 12z" />
    <circle cx="7.500" cy="8.500" r="1.250" />
  </Svg>
);

export const WalletIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 7.500A2.500 2.500 0 0 1 6.500 5H17v3" />
    <path d="M4 7.500V17a2 2 0 0 0 2 2h14V8H6.500A2.500 2.500 0 0 1 4 7.500z" />
    <path d="M16 13.500h.01" />
  </Svg>
);

export const TruckIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M2 6h11v10H2zM13 9h4.500L21 12.500V16h-8z" />
    <circle cx="6.500" cy="17.500" r="1.750" />
    <circle cx="17" cy="17.500" r="1.750" />
  </Svg>
);

export const ShieldCheckIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3 5 5.500v6c0 4.300 2.900 7.600 7 9.500 4.100-1.900 7-5.200 7-9.500v-6L12 3z" />
    <path d="m9 12 2.200 2.200L15 10.400" />
  </Svg>
);

export const AwardIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="9" r="5.500" />
    <path d="m8.500 13.500-1.500 7 5-2.500 5 2.500-1.500-7" />
  </Svg>
);

export const ReturnIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 5v5h5" />
    <path d="M4.600 10A8 8 0 1 1 4 13.500" />
  </Svg>
);

export const InspectIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.900-3.900M8.300 11.200l1.900 1.900 3.500-3.700" />
  </Svg>
);

export const CalendarIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3.500" y="5" width="17" height="15" rx="2" />
    <path d="M3.500 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const ExpandIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </Svg>
);

export const HeartIcon = ({ filled = false, ...props }: IconProps & { filled?: boolean }) => (
  <Svg {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.800C19.500 15.400 12 20 12 20z" />
  </Svg>
);

export const PlusIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MinusIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12h14" />
  </Svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m5 9 7 7 7-7" />
  </Svg>
);

export const FilterIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 7h16M7 12h10M10 17h4" />
  </Svg>
);

export const MailIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);

/** Shield silhouette used as the light grey backing in the trust strip. */
export const ShieldShape = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M24 2 6 8.500v13.800C6 33 13.400 41.300 24 46c10.600-4.700 18-13 18-23.700V8.500L24 2z" />
  </svg>
);

export const StarIcon = ({ size = 12, filled = true, ...props }: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="m12 2.800 2.850 5.800 6.400.900-4.650 4.500 1.100 6.400L12 17.400l-5.700 3 1.100-6.400L2.750 9.500l6.400-.900L12 2.800z" />
  </svg>
);

/** Five stars; the first `Math.round(rating)` are filled. */
export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex gap-2 text-ink" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={size} filled={n <= filled} />
      ))}
    </span>
  );
}
