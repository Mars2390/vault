/**
 * VAULT design tokens — the single source of truth.
 *
 * Every colour, shadow, radius and easing in the app comes from this file.
 * layout.tsx writes them onto <html> as CSS variables, tailwind.config.ts maps
 * utilities to those variables, and globals.css only ever uses var(--…).
 * No hex or rgba value may appear anywhere else.
 */

export const colors = {
  // Neutrals
  ink: '#111014',
  inkHover: '#2B2A30',
  page: '#F7F7F5',
  card: '#FFFFFF',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255, 255, 255, 0.82)',
  muted: '#5B5D62',
  hairline: '#DFE1E7',
  tint: '#F2F3F7',
  chip: '#EDEFF3',
  chipHover: '#D8D9DF',
  periwinkle: '#E6EAFF', // trust panels on the product page
  backdrop: 'rgba(17, 15, 21, 0.85)', // lightbox and modal scrim

  // Brand accent
  cobalt: '#2F4BFF',
  cobaltHover: '#2238D6',
  focus: '#2F4BFF',

  // Rental semantic hue
  rentalAccent: '#0F8C7E', // borders, icons, decorative
  rentalText: '#0A6B60', // text, fills, buttons (AA on white, page and mint)
  rentalTextHover: '#07544B',
  rentalFill: '#D6F5EF', // backgrounds, range sweep

  // Semantic
  successText: '#006B40',
  successBg: '#94F5BC',
  dangerText: '#B71029',
  dangerBg: '#FFB8B5',
  warningText: '#785A11',
  warningBg: '#FBE0B1',
} as const;

export const shadows = {
  resting: '0 2px 4px rgba(17, 15, 21, 0.05)',
  hover: '0 4px 8px rgba(17, 15, 21, 0.08)',
  popover: '0 8px 16px rgba(17, 15, 21, 0.12)',
} as const;

export const gradients = {
  // Dark overlay behind white text on category tiles.
  tileScrim:
    'linear-gradient(to top, rgba(17, 16, 20, 0.82) 0%, rgba(17, 16, 20, 0.36) 38%, rgba(17, 16, 20, 0) 68%)',
} as const;

export const radii = {
  button: '6px',
  card: '12px',
  input: '6px',
  pill: '9999px',
  badge: '2px',
} as const;

/** [font-size, line-height] in px. Class names are the pixel size: text-56, text-16… */
export const typeScale = {
  56: 64,
  40: 48,
  28: 40,
  22: 32,
  20: 28,
  18: 28,
  16: 24,
  14: 20,
  12: 16,
} as const;

export const fontWeights = {
  normal: '400',
  semibold: '600',
} as const;

export const layout = {
  maxWidth: '1280px',
  gutter: '24px',
  sectionGap: '56px',
} as const;

export const motion = {
  easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  durFast: '200ms',
  durSlow: '400ms',
  durShimmer: '1.6s',
} as const;

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const toVars = (prefix: string, group: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(group).map(([key, value]) => [`--${prefix}${kebab(key)}`, value]),
  );

/** Token name → CSS variable reference, e.g. rentalText → var(--rental-text). */
export const colorVars = Object.fromEntries(
  Object.keys(colors).map((key) => [kebab(key), `var(--${kebab(key)})`]),
) as Record<string, string>;

/** Everything that globals.css and Tailwind read at runtime, set on <html>. */
export const cssVariables: Record<string, string> = {
  ...toVars('', colors),
  ...toVars('shadow-', shadows),
  ...toVars('gradient-', gradients),
  ...toVars('', motion),
};
