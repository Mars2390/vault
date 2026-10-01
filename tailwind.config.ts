import type { Config } from 'tailwindcss';
import { colorVars, fontWeights, layout, radii, typeScale } from './lib/tokens';

// Literal pixel scale: p-16 is 16px, mb-56 is 56px.
const pixelScale = Object.fromEntries(
  Array.from({ length: 161 }, (_, px) => [String(px), `${px}px`]),
);

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colorVars,
    },
    spacing: pixelScale,
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
    },
    fontSize: Object.fromEntries(
      Object.entries(typeScale).map(([size, lineHeight]) => [
        size,
        [`${size}px`, { lineHeight: `${lineHeight}px` }],
      ]),
    ),
    fontWeight: fontWeights,
    borderRadius: {
      none: '0',
      ...radii,
    },
    borderColor: {
      DEFAULT: colorVars.hairline,
      transparent: 'transparent',
      current: 'currentColor',
      ...colorVars,
    },
    boxShadow: {
      none: 'none',
      resting: 'var(--shadow-resting)',
      hover: 'var(--shadow-hover)',
      popover: 'var(--shadow-popover)',
    },
    extend: {
      maxWidth: {
        page: layout.maxWidth,
      },
      aspectRatio: {
        hero: '4 / 3',
        category: '3 / 4',
        product: '4 / 5',
      },
      backgroundImage: {
        'tile-scrim': 'var(--gradient-tile-scrim)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        brand: 'var(--ease-in)',
        out: 'var(--ease-out)',
      },
      transitionDuration: {
        200: '200ms',
        400: '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
