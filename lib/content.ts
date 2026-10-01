/**
 * All landing page copy and demo data. Phase 1 has no backend, so every
 * product, price and review on the page is defined here.
 */

export const CURRENCY = '£';

export const formatPrice = (amount: number) =>
  `${CURRENCY}${amount.toLocaleString('en-GB')}`;

export type Mode = 'buy' | 'rent';

export interface ImageAsset {
  src: string;
  alt: string;
  /** object-position, so each crop keeps its subject in frame. */
  focus: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  mode: Mode;
  image: ImageAsset;
  rating: number;
  reviews: number;
  buyPrice: number;
  /** Price when new, for the strikethrough on buy cards. */
  newPrice?: number;
  rentPrice?: number;
  rentUnit?: 'day' | 'night';
}

export const site = {
  name: 'Vault',
  wordmark: 'VAULT',
  tagline: "Buy it. Or rent it. Either way, it's yours.",
  description:
    'Premium watches, consoles, electronics and collectibles. Buy outright or rent by the day, from our vault to your door.',
  promo: `Free delivery over ${CURRENCY}50 · 30-day returns`,
  copyright: '© 2026 Vault. All rights reserved.',
};

export const nav = [
  { label: 'Buy', href: '#featured', mode: 'buy' },
  { label: 'Rent', href: '#rent', mode: 'rent' },
  { label: 'Watches', href: '#categories' },
  { label: 'Consoles', href: '#categories' },
  { label: 'Electronics', href: '#categories' },
  { label: 'Collectibles', href: '#categories' },
] as const;

export const search = {
  label: 'Search the Vault',
  prefix: 'Search ',
  staticPlaceholder: 'Search watches, PS5, Rolex…',
  typewriterWords: ['watches', 'PS5', 'Rolex', 'Switch', 'headphones'],
  popular: ['Watches', 'PS5', 'Rolex', 'Rent'],
  popularLabel: 'Popular searches',
  empty: 'Nothing in the Vault matches',
};

export const hero = {
  eyebrow: 'Watches · Consoles · Collectibles',
  headline: { before: 'Buy it.', accent: 'Rent it.', after: 'Own the moment.' },
  sub: 'Premium watches, consoles and collectibles. Buy outright or rent by day, from our vault to your door.',
  primaryCta: { label: 'Shop the collection', href: '#featured' },
  secondaryCta: { label: 'Rent a console', href: '#rent' },
  pills: ['Free delivery', '30-day returns', 'Rental protection included'],
  image: {
    src: '/images/hero-main.jpg',
    alt: 'Flat lay of a red game controller, mechanical keyboard, phone and wristwatch',
    focus: '50% 50%',
  } satisfies ImageAsset,
};

export const categories = {
  heading: 'Shop by category',
  tiles: [
    {
      name: 'Watches',
      count: 24,
      href: '#featured',
      image: {
        src: '/images/category-watches.jpg',
        alt: 'Close-up of a chronograph wristwatch',
        focus: '60% 42%',
      },
    },
    {
      name: 'Consoles',
      count: 12,
      href: '#featured',
      image: {
        src: '/images/category-consoles.jpg',
        alt: 'Games console with two controllers in ambient light',
        focus: '50% 50%',
      },
    },
    {
      name: 'Electronics',
      count: 38,
      href: '#featured',
      image: {
        src: '/images/category-electronics.jpg',
        alt: 'Black phones and cameras arranged on a dark surface',
        focus: '50% 50%',
      },
    },
    {
      name: 'Collectibles',
      count: 56,
      href: '#featured',
      image: {
        src: '/images/category-collectibles.jpg',
        alt: 'Stacked collection of boxed vinyl figures',
        focus: '50% 38%',
      },
    },
  ] satisfies { name: string; count: number; href: string; image: ImageAsset }[],
  all: { name: 'All products', count: 130, href: '#featured' },
};

export const featured = {
  heading: 'Most wanted this week',
  seeAll: { label: 'See all', href: '#categories' },
  products: [
    {
      id: 'product-ps5',
      title: 'PlayStation 5 + DualSense',
      category: 'Consoles',
      mode: 'rent',
      image: {
        src: '/images/product-ps5.jpg',
        alt: 'White DualSense controller leaning against a PlayStation 5',
        focus: '32% 50%',
      },
      rating: 4.9,
      reviews: 1204,
      buyPrice: 429,
      newPrice: 479,
      rentPrice: 12,
      rentUnit: 'day',
    },
    {
      id: 'product-rolex',
      title: 'Rolex Sea-Dweller Deepsea',
      category: 'Watches',
      mode: 'buy',
      image: {
        src: '/images/product-rolex.jpg',
        alt: 'Hand holding a steel Rolex dive watch with a black dial',
        focus: '50% 72%',
      },
      rating: 4.9,
      reviews: 86,
      buyPrice: 9450,
      newPrice: 10900,
    },
    {
      id: 'product-xbox',
      title: 'Xbox Series X — Robot White',
      category: 'Consoles',
      mode: 'rent',
      image: {
        src: '/images/product-xbox.jpg',
        alt: 'White Xbox console with a white wireless controller',
        focus: '50% 100%',
      },
      rating: 4.8,
      reviews: 932,
      buyPrice: 389,
      newPrice: 449,
      rentPrice: 11,
      rentUnit: 'day',
    },
    {
      id: 'product-apple-watch',
      title: 'Apple Watch Series 9, 45mm',
      category: 'Watches',
      mode: 'buy',
      image: {
        src: '/images/product-apple-watch.jpg',
        alt: 'Black smartwatch on a wrist showing a workout screen',
        focus: '50% 56%',
      },
      rating: 4.7,
      reviews: 2318,
      buyPrice: 279,
      newPrice: 399,
    },
    {
      id: 'product-switch',
      title: 'Nintendo Switch + Joy-Con',
      category: 'Consoles',
      mode: 'rent',
      image: {
        src: '/images/product-switch.jpg',
        alt: 'Nintendo Switch console with detached Joy-Con controllers',
        focus: '73% 50%',
      },
      rating: 4.8,
      reviews: 1577,
      buyPrice: 219,
      newPrice: 259,
      rentPrice: 9,
      rentUnit: 'day',
    },
    {
      id: 'product-iphone',
      title: 'iPhone 14 Pro, 256GB',
      category: 'Electronics',
      mode: 'buy',
      image: {
        src: '/images/product-iphone.jpg',
        alt: 'Two iPhones standing against a glass panel',
        focus: '40% 50%',
      },
      rating: 4.6,
      reviews: 3041,
      buyPrice: 529,
      newPrice: 699,
    },
    {
      id: 'product-headphones',
      title: 'Wireless Over-Ear Headphones',
      category: 'Electronics',
      mode: 'buy',
      image: {
        src: '/images/product-headphones.jpg',
        alt: 'Matte black over-ear headphones on a white surface',
        focus: '50% 100%',
      },
      rating: 4.5,
      reviews: 764,
      buyPrice: 89,
      newPrice: 129,
    },
    {
      id: 'product-ps5-bundle',
      title: 'PS5 Slim Party Bundle',
      category: 'Consoles',
      mode: 'rent',
      image: {
        src: '/images/category-consoles.jpg',
        alt: 'PlayStation 5 Slim with two DualSense controllers',
        focus: '50% 50%',
      },
      rating: 4.9,
      reviews: 418,
      buyPrice: 499,
      newPrice: 549,
      rentPrice: 15,
      rentUnit: 'night',
    },
  ] satisfies Product[] as Product[],
};

export const buyOrRent = {
  heading: 'One product. Two ways.',
  body: "Buy it outright and it's yours forever. Or rent it for a day, a night, or a week. Same quality, same protection, different commitment.",
  bullets: [
    { icon: 'tag', text: `Rent from ${CURRENCY}9/day or ${CURRENCY}15/night` },
    { icon: 'wallet', text: `Zero deposit on rentals under ${CURRENCY}100` },
    { icon: 'truck', text: 'Free delivery and pickup in Nairobi' },
    { icon: 'shield', text: 'Rental protection included on every booking' },
  ] as const,
  cta: { label: 'Browse rentals', href: '#featured' },
  demo: {
    groupLabel: 'PlayStation 5: choose how you want it',
    image: {
      src: '/images/product-ps5.jpg',
      alt: 'PlayStation 5 with DualSense controller',
      focus: '32% 50%',
    } satisfies ImageAsset,
    buy: {
      badge: 'Buy',
      title: `Buy — ${CURRENCY}429`,
      note: 'Yours to keep',
      saving: `Save ${CURRENCY}50`,
    },
    rent: {
      badge: 'Rent',
      title: `Rent — ${CURRENCY}12/day`,
      note: "Back when you're done",
      days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      /** How many of the seven days the demo range covers. */
      rangeDays: 3,
      rangeLabel: 'Example booking: Monday to Wednesday',
    },
  },
};

export const trust = {
  heading: 'Why shop the Vault',
  items: [
    {
      icon: 'award',
      title: '1-year warranty',
      description: 'On everything you buy, no small print.',
    },
    {
      icon: 'returns',
      title: 'Free 30-day returns',
      description: 'Changed your mind? Send it back free.',
    },
    {
      icon: 'shield',
      title: 'Rental protection included',
      description: 'Accidental damage is covered on every booking.',
    },
    {
      icon: 'inspect',
      title: 'Professionally inspected',
      description: 'Tested, cleaned and graded before it ships.',
    },
  ] as const,
};

export const howItWorks = {
  heading: 'Renting from the Vault',
  steps: [
    {
      title: 'Pick your dates',
      body: 'Day, night, weekend, or week. You only pay for the time you choose.',
    },
    {
      title: 'We deliver, you play',
      body: 'Free delivery in Nairobi, set up and ready to go when it arrives.',
    },
    {
      title: 'Send it back, get refunded',
      body: 'We collect it, check it, and return any deposit. No hidden fees.',
    },
  ],
};

export const editorial = {
  heading: "The 2026 Collector's Guide",
  sub: "Watches, retro consoles, and the pieces everyone's hunting.",
  cta: { label: 'Read the guide', href: '#categories' },
  image: {
    src: '/images/category-collectibles.jpg',
    alt: 'Shelf stacked with boxed collectible vinyl figures',
    focus: '50% 30%',
  } satisfies ImageAsset,
};

export const reviews = {
  heading: 'What our customers say',
  verified: 'Verified purchase',
  items: [
    {
      quote:
        'Rented a PS5 for my son’s birthday weekend. It arrived the same afternoon, already updated, and pickup on Monday took two minutes. Cheaper than I expected too.',
      name: 'Wanjiru M.',
      date: '14 September 2026',
      context: 'Rented PlayStation 5',
    },
    {
      quote:
        'I was nervous buying a watch online, but the inspection report matched the piece exactly. Box, papers, and a condition better than described.',
      name: 'Daniel O.',
      date: '2 September 2026',
      context: 'Bought Rolex Sea-Dweller',
    },
    {
      quote:
        'Tried the Switch for a week before deciding to buy one. Knowing exactly what I was getting made it an easy choice, and my own arrived the next day.',
      name: 'Priya S.',
      date: '21 August 2026',
      context: 'Rented, then bought Nintendo Switch',
    },
  ],
};

export const newsletter = {
  heading: 'Get first access to new drops',
  sub: 'Watches, consoles, and rarities. One email a month.',
  inputLabel: 'Email address',
  placeholder: 'you@example.com',
  button: 'Subscribe',
  smallPrint: "We don't share your email. Unsubscribe anytime.",
  success: "You're on the list. Watch your inbox for the next drop.",
};

export const footer = {
  columns: [
    {
      title: 'Shop',
      links: ['Buy', 'Rent', 'Watches', 'Consoles', 'Electronics', 'Collectibles'],
    },
    { title: 'Support', links: ['Contact', 'Delivery', 'Returns', 'FAQ'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
  ],
  payments: ['Visa', 'Mastercard', 'Apple Pay', 'M-Pesa'],
  socials: ['Instagram', 'TikTok', 'YouTube', 'X'],
};
