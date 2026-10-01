# VAULT

Premium e-commerce and rental site for watches, consoles, electronics and collectibles.
Every product can be bought outright or rented by the day.

This repository currently holds **Phase 1: the landing page**. It is a static page with
demo data. There is no backend, database, API route or admin yet.

## Run it

Requires Node 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender
npm run start    # serve the production build
```

## Stack

- Next.js 16 (App Router) and TypeScript
- Tailwind CSS v3, configured with a literal pixel scale (`mb-56` is 56px)
- Fraunces and DM Sans through `next/font`
- `next/image` for every image
- No animation libraries: CSS keyframes, `IntersectionObserver` and `requestAnimationFrame`

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/tokens.ts` | Every colour, shadow, radius and easing. The only file allowed to contain a hex value. |
| `lib/content.ts` | All copy, demo products, prices, reviews and per-image focal points. |
| `app/layout.tsx` | Loads the fonts and writes the tokens onto `<html>` as CSS variables. |
| `app/globals.css` | Base styles, keyframes and the reduced-motion rules. Uses `var(--…)` only. |
| `tailwind.config.ts` | Maps Tailwind utilities to the tokens. |
| `components/` | One file per page section, plus `SearchBox` and `ProductCard`. |
| `components/ui/` | Small primitives: `Button`, `Card`, `Chip`, `Badge`, `Icons`, `RatioImage`. |
| `public/images/` | The 12 photographs used on the page. |

## Design rules

- **Buy and Rent are equals.** Buy is ink, Rent is teal. Every product card says which mode it
  is in, and rental cards always show the buy price too.
- **Three rental tokens.** `rental-accent` is for borders and icons, `rental-text` is for text
  and filled buttons (it passes WCAG AA), `rental-fill` is for backgrounds.
- **Shadow means content, border means selectable.** Cards never lift or scale on hover; only
  the shadow deepens.
- **Images are cropped, not letterboxed.** The hero is 4:3, category tiles 3:4, product cards
  4:5, all `object-fit: cover` with a focal point set per image in `lib/content.ts`.
- **Motion is optional.** Every animation respects `prefers-reduced-motion` and lands on its
  final state instantly when motion is turned off.

## Phase 1 placeholders

- Navigation and footer links point at sections of this page, because no other routes exist.
- Search filters the eight demo products in `lib/content.ts`.
- The newsletter form confirms in place and sends nothing.
- Account and cart buttons are not wired up.
