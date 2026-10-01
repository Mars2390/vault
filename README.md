# VAULT

Premium e-commerce and rental site for watches, consoles, electronics and collectibles.
Every product can be bought outright, and consoles can be rented by the day.

This repository holds **Phase 1.5**: the landing page plus every page it links to. The whole
site is static. There is no backend, database, API route or admin yet, and the catalogue is
demo data.

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

## Routes

Every route is prerendered.

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/products` | The full catalogue, with filters for buy or rent, category and price |
| `/rentals` | Rentable products. Pick dates first and each card shows the total for that booking |
| `/product/[slug]` | Product detail: gallery, condition grades or rental lengths, add to cart |
| `/category/[slug]` | `watches`, `consoles`, `electronics`, `collectibles` |
| `/cart` | Cart, saved in the browser only |
| `/account` | Sign-in form, visual only |
| `/request` | Request an item that is not in stock |
| `/contact`, `/about`, `/guide`, `/faq` | Supporting pages |
| `/legal/[slug]` | `privacy`, `terms`, `cookies` placeholders |

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/tokens.ts` | Every colour, shadow, radius and easing. The only file allowed to contain a hex value. |
| `lib/content.ts` | All copy, the product catalogue, prices, reviews and image focal points. |
| `lib/catalog.ts` | Lookups and pricing rules: condition grades, rental lengths, booking totals, search. |
| `lib/cart.ts` | The cart store, kept in `localStorage`. |
| `lib/mailto.ts` | Builds the pre-filled `mailto:` links the forms use in place of a backend. |
| `app/layout.tsx` | Fonts, design tokens as CSS variables, header, footer and the lightbox provider. |
| `app/globals.css` | Base styles, keyframes and the reduced-motion rules. Uses `var(--…)` only. |
| `components/` | Page sections and features: `Lightbox`, `ProductBrowser`, `RentalBrowser`, `RequestForm`… |
| `components/ui/` | Primitives: `Button`, `Card`, `Chip`, `Badge`, `Icons`, `RatioImage`, `LightboxImage`, `Modal`, `OptionTile`, `TextField`. |
| `public/images/` | The photographs. `*-card.jpg` files are canvas-extended copies made for 4:5 slots. |

## Design rules

- **Buy and Rent are equals.** Buy is ink, Rent is teal. Every product card says which mode it
  is in, and rental cards always show the buy price too.
- **Three rental tokens.** `rental-accent` is for borders and icons, `rental-text` is for text
  and filled buttons (it passes WCAG AA), `rental-fill` is for backgrounds.
- **Shadow means content, border means selectable.** Cards never lift or scale on hover; only
  the shadow deepens. Option tiles, filters and FAQ rows carry borders.
- **Images are cropped in place and shown whole in the lightbox.** The hero is 4:3, category
  tiles 3:4, product cards 4:5, all `object-fit: cover` with a focal point per image. Clicking
  an image opens the uncropped original.
- **Motion is optional.** Every animation respects `prefers-reduced-motion` and lands on its
  final state instantly when motion is turned off.

## What is real and what is not

- **Forms open your email app.** The request and contact forms build a `mailto:` link to
  `requests@vault.example` and `hello@vault.example`. Nothing is sent by the site itself, and
  those addresses are placeholders.
- **The cart is local.** It is saved in this browser's `localStorage`. Checkout is not open.
- **Accounts do not exist.** The sign-in form submits nowhere and says so.
- **Legal pages are placeholders.**
- **Products, prices and reviews are demo data** defined in `lib/content.ts`.
