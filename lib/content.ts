/**
 * All site copy and demo data. There is no backend yet, so every product,
 * price, review and page of text is defined here.
 */

export const CURRENCY = '£';

export const formatPrice = (amount: number) =>
  `${CURRENCY}${amount.toLocaleString('en-GB')}`;

export type Mode = 'buy' | 'rent';
export type CategorySlug = 'watches' | 'consoles' | 'electronics' | 'collectibles';

export interface ImageAsset {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the file, used by the lightbox to show it uncropped. */
  width: number;
  height: number;
  /** object-position, so each crop keeps its subject in frame. */
  focus: string;
}

export interface Product {
  slug: string;
  title: string;
  category: CategorySlug;
  /** How the product is led with on cards. Rentable products can always be bought too. */
  mode: Mode;
  /** Image for the 4:5 card and gallery slots. */
  image: ImageAsset;
  /** Uncropped originals, shown in the lightbox. */
  gallery: ImageAsset[];
  rating: number;
  reviews: number;
  /** Price in Good condition. */
  buyPrice: number;
  /** Price when new, for the strikethrough. */
  newPrice: number;
  /** Day rate. Present only on rentable products. */
  rentDay?: number;
  blurb: string;
  description: string;
  highlights: string[];
}

const img = (
  file: string,
  width: number,
  height: number,
  alt: string,
  focus = '50% 50%',
): ImageAsset => ({ src: `/images/${file}`, alt, width, height, focus });

export const images = {
  hero: img(
    'hero-main.jpg',
    4275,
    3171,
    'Flat lay of a red game controller, mechanical keyboard, phone and wristwatch',
  ),
  watches: img('category-watches.jpg', 4000, 6000, 'Close-up of a chronograph wristwatch', '60% 42%'),
  consoles: img(
    'category-consoles.jpg',
    3072,
    4096,
    'PlayStation 5 Slim with two DualSense controllers in ambient light',
  ),
  electronics: img(
    'category-electronics.jpg',
    2667,
    4000,
    'Black phones and cameras arranged on a dark surface',
  ),
  collectibles: img(
    'category-collectibles.jpg',
    3648,
    5472,
    'Stacked collection of boxed vinyl figures',
    '50% 38%',
  ),
  ps5: img(
    'product-ps5.jpg',
    5547,
    3698,
    'White DualSense controller leaning against a PlayStation 5',
    '32% 50%',
  ),
  xbox: img(
    'product-xbox.jpg',
    3168,
    5631,
    'White Xbox console with a white wireless controller',
    '50% 100%',
  ),
  // Canvas-extended copies made for the 4:5 slot, so the whole subject fits.
  xboxCard: img(
    'product-xbox-card.jpg',
    2400,
    3000,
    'White Xbox console with a white wireless controller',
  ),
  switch: img(
    'product-switch.jpg',
    3000,
    2000,
    'Nintendo Switch console with detached Joy-Con controllers',
    '73% 50%',
  ),
  switchCard: img(
    'product-switch-card.jpg',
    2032,
    2540,
    'Nintendo Switch console with detached Joy-Con controllers',
  ),
  appleWatch: img(
    'product-apple-watch.jpg',
    4160,
    6240,
    'Black smartwatch on a wrist showing a workout screen',
    '50% 56%',
  ),
  rolex: img(
    'product-rolex.jpg',
    3024,
    4032,
    'Hand holding a steel Rolex dive watch with a black dial',
    '50% 72%',
  ),
  iphone: img('product-iphone.jpg', 4320, 4320, 'Two iPhones standing against a glass panel', '40% 50%'),
  headphones: img(
    'product-headphones.jpg',
    3544,
    5316,
    'Matte black over-ear headphones on a white surface',
    '50% 100%',
  ),
} satisfies Record<string, ImageAsset>;

export const site = {
  name: 'Vault',
  wordmark: 'VAULT',
  tagline: "Buy it. Or rent it. Either way, it's yours.",
  description:
    'Premium watches, consoles, electronics and collectibles. Buy outright or rent by the day, from our vault to your door.',
  promo: `Free delivery over ${CURRENCY}50 · 30-day returns`,
  copyright: '© 2026 Vault. All rights reserved.',
  email: {
    requests: 'requests@vault.example',
    hello: 'hello@vault.example',
  },
};

export const nav = [
  { label: 'Buy', href: '/products' },
  { label: 'Rent', href: '/rentals', rental: true },
  { label: 'Watches', href: '/category/watches' },
  { label: 'Consoles', href: '/category/consoles' },
  { label: 'Electronics', href: '/category/electronics' },
  { label: 'Collectibles', href: '/category/collectibles' },
  { label: 'Request an item', href: '/request' },
];

export const search = {
  label: 'Search the Vault',
  prefix: 'Search ',
  staticPlaceholder: 'Search watches, PS5, Rolex…',
  typewriterWords: ['watches', 'PS5', 'Rolex', 'Switch', 'headphones'],
  popular: ['Watches', 'PS5', 'Rolex', 'Rent'],
  popularLabel: 'Popular searches',
  empty: 'Nothing in the Vault matches',
  seeAll: 'Browse all products',
  request: 'Request it instead',
};

export const categories: {
  slug: CategorySlug;
  name: string;
  intro: string;
  image: ImageAsset;
}[] = [
  {
    slug: 'watches',
    name: 'Watches',
    intro: 'Dive watches, chronographs and smartwatches. Inspected, authenticated and ready to wear.',
    image: images.watches,
  },
  {
    slug: 'consoles',
    name: 'Consoles',
    intro: 'PlayStation, Xbox and Switch. Buy one to keep, or rent one for the weekend.',
    image: images.consoles,
  },
  {
    slug: 'electronics',
    name: 'Electronics',
    intro: 'Phones and audio, tested and graded so you know exactly what arrives.',
    image: images.electronics,
  },
  {
    slug: 'collectibles',
    name: 'Collectibles',
    intro: 'Boxed figures, limited runs and the pieces people hunt for. We source these to order.',
    image: images.collectibles,
  },
];

export const products: Product[] = [
  {
    slug: 'playstation-5',
    title: 'PlayStation 5 + DualSense',
    category: 'consoles',
    mode: 'rent',
    image: images.ps5,
    gallery: [images.ps5, images.consoles],
    rating: 4.9,
    reviews: 1204,
    buyPrice: 429,
    newPrice: 479,
    rentDay: 12,
    blurb: 'Disc edition with one DualSense controller.',
    description:
      'The disc-drive PlayStation 5 with one DualSense controller, HDMI and power cables. Every console is wiped, updated and tested before it leaves the Vault, whether you are keeping it or handing it back on Monday.',
    highlights: ['One DualSense controller included', 'Wiped, updated and tested', 'HDMI and power cables in the box'],
  },
  {
    slug: 'rolex-sea-dweller-deepsea',
    title: 'Rolex Sea-Dweller Deepsea',
    category: 'watches',
    mode: 'buy',
    image: images.rolex,
    gallery: [images.rolex],
    rating: 4.9,
    reviews: 86,
    buyPrice: 9450,
    newPrice: 10900,
    blurb: 'Steel dive watch with a black dial.',
    description:
      'A steel Rolex dive watch on its original bracelet. Authenticated and serviced by an independent watchmaker, and supplied with an inspection report so you know its condition before you commit.',
    highlights: ['Independently authenticated', 'Inspection report included', 'Original bracelet'],
  },
  {
    slug: 'xbox-series-x',
    title: 'Xbox Series X — Robot White',
    category: 'consoles',
    mode: 'rent',
    image: images.xboxCard,
    gallery: [images.xbox],
    rating: 4.8,
    reviews: 932,
    buyPrice: 389,
    newPrice: 449,
    rentDay: 11,
    blurb: 'White console with a matching wireless controller.',
    description:
      'The Xbox Series X in Robot White with a matching wireless controller. Cleaned, reset and tested, with HDMI and power cables included.',
    highlights: ['Matching wireless controller', 'Cleaned, reset and tested', 'HDMI and power cables in the box'],
  },
  {
    slug: 'apple-watch-series-9',
    title: 'Apple Watch Series 9, 45mm',
    category: 'watches',
    mode: 'buy',
    image: images.appleWatch,
    gallery: [images.appleWatch],
    rating: 4.7,
    reviews: 2318,
    buyPrice: 279,
    newPrice: 399,
    blurb: 'Midnight aluminium case with a sport band.',
    description:
      'Apple Watch Series 9 in the 45mm midnight aluminium case with a sport band. Battery health is checked and reported, and the watch is unlocked and ready to pair.',
    highlights: ['Battery health checked', 'Unlocked and ready to pair', 'Sport band and charger included'],
  },
  {
    slug: 'nintendo-switch',
    title: 'Nintendo Switch + Joy-Con',
    category: 'consoles',
    mode: 'rent',
    image: images.switchCard,
    gallery: [images.switch],
    rating: 4.8,
    reviews: 1577,
    buyPrice: 219,
    newPrice: 259,
    rentDay: 9,
    blurb: 'Console, dock and a pair of grey Joy-Con.',
    description:
      'The Nintendo Switch with its dock and a pair of grey Joy-Con. Stick drift is tested for on every pair before the console goes out.',
    highlights: ['Dock and Joy-Con pair included', 'Joy-Con tested for stick drift', 'Ready for handheld or TV play'],
  },
  {
    slug: 'iphone-14-pro',
    title: 'iPhone 14 Pro, 256GB',
    category: 'electronics',
    mode: 'buy',
    image: images.iphone,
    gallery: [images.iphone],
    rating: 4.6,
    reviews: 3041,
    buyPrice: 529,
    newPrice: 699,
    blurb: 'Unlocked, with battery health reported.',
    description:
      'iPhone 14 Pro with 256GB of storage, unlocked to any network. Each phone is graded on screen, body and battery, and the grade you pick is the grade you get.',
    highlights: ['Unlocked to any network', 'Battery health reported', 'Graded on screen, body and battery'],
  },
  {
    slug: 'wireless-headphones',
    title: 'Wireless Over-Ear Headphones',
    category: 'electronics',
    mode: 'buy',
    image: images.headphones,
    gallery: [images.headphones],
    rating: 4.5,
    reviews: 764,
    buyPrice: 89,
    newPrice: 129,
    blurb: 'Matte black, with fresh ear cushions.',
    description:
      'Matte black wireless over-ear headphones. Ear cushions are replaced on every pair, and battery and pairing are tested before dispatch.',
    highlights: ['New ear cushions fitted', 'Battery and pairing tested', 'Charging cable included'],
  },
  {
    slug: 'ps5-slim-party-bundle',
    title: 'PS5 Slim Party Bundle',
    category: 'consoles',
    mode: 'rent',
    image: images.consoles,
    gallery: [images.consoles, images.ps5],
    rating: 4.9,
    reviews: 418,
    buyPrice: 499,
    newPrice: 549,
    rentDay: 14,
    blurb: 'PS5 Slim with two DualSense controllers.',
    description:
      'A PlayStation 5 Slim with two DualSense controllers, built for a night with friends. Both controllers are charged and paired before delivery.',
    highlights: ['Two DualSense controllers', 'Charged and paired on arrival', 'HDMI and power cables in the box'],
  },
  {
    slug: 'rose-gold-chronograph',
    title: 'Rose Gold Chronograph, 44mm',
    category: 'watches',
    mode: 'buy',
    image: images.watches,
    gallery: [images.watches],
    rating: 4.6,
    reviews: 212,
    buyPrice: 349,
    newPrice: 449,
    blurb: 'Black dial, rose gold case, three sub-dials.',
    description:
      'A 44mm chronograph with a black dial and rose gold case. The movement is timed and the case and crystal are inspected before it is listed.',
    highlights: ['Movement timed and checked', 'Case and crystal inspected', 'Presentation box included'],
  },
];

export const hero = {
  eyebrow: 'Watches · Consoles · Collectibles',
  headline: { before: 'Buy it.', accent: 'Rent it.', after: 'Own the moment.' },
  sub: 'Premium watches, consoles and collectibles. Buy outright or rent by day, from our vault to your door.',
  primaryCta: { label: 'Shop the collection', href: '/products' },
  secondaryCta: { label: 'Rent a console', href: '/rentals' },
  pills: ['Free delivery', '30-day returns', 'Rental protection included'],
  image: images.hero,
};

export const categoryGrid = {
  heading: 'Shop by category',
  all: { name: 'All products', href: '/products' },
  /** Shown instead of a count while a category has no stock. */
  emptyCount: 'By request',
};

export const featured = {
  heading: 'Most wanted this week',
  seeAll: { label: 'See all', href: '/products' },
  slugs: [
    'playstation-5',
    'rolex-sea-dweller-deepsea',
    'xbox-series-x',
    'apple-watch-series-9',
    'nintendo-switch',
    'iphone-14-pro',
    'wireless-headphones',
    'ps5-slim-party-bundle',
  ],
};

export const buyOrRent = {
  heading: 'One product. Two ways.',
  body: "Buy it outright and it's yours forever. Or rent it for a day, a night, or a week. Same quality, same protection, different commitment.",
  bullets: [
    { icon: 'wallet', text: `Zero deposit on rentals under ${CURRENCY}100` },
    { icon: 'truck', text: 'Free delivery and pickup in Nairobi' },
    { icon: 'shield', text: 'Rental protection included on every booking' },
  ] as const,
  cta: { label: 'Browse rentals', href: '/rentals' },
  demo: {
    groupLabel: 'PlayStation 5: choose how you want it',
    slug: 'playstation-5',
    buy: { badge: 'Buy', note: 'Yours to keep' },
    rent: {
      badge: 'Rent',
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
    { icon: 'award', title: '1-year warranty', description: 'On everything you buy, no small print.' },
    { icon: 'returns', title: 'Free 30-day returns', description: 'Changed your mind? Send it back free.' },
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
  cta: { label: 'Read the guide', href: '/guide' },
  image: { ...images.collectibles, focus: '50% 30%' },
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

export const request = {
  navLabel: 'Request an item',
  page: {
    title: 'Request an item',
    intro:
      "Can't see it in the Vault? Tell us what you are after and we will go and find it. Watches, consoles, electronics or collectibles, to buy or to rent.",
  },
  cta: {
    heading: "Can't find what you're looking for?",
    body: 'Tell us what you are after and we will source it for you.',
    button: 'Request it',
  },
  emptyCategory: {
    heading: 'Nothing on the shelf right now',
    body: 'We source this category to order. Tell us what you are hunting for and we will find it.',
    button: 'Request a piece',
  },
  form: {
    item: { label: 'What are you looking for?', placeholder: 'e.g. Omega Speedmaster, boxed Game Boy Color', max: 200 },
    name: { label: 'Your name' },
    email: { label: 'Your email' },
    budget: { label: 'Budget', placeholder: `e.g. ${CURRENCY}200–${CURRENCY}500` },
    notes: { label: 'Any notes', placeholder: 'Condition, colour, when you need it by…', max: 500 },
    submit: 'Send request',
    subject: 'Item request',
  },
  success: {
    heading: "Thanks — we'll get back to you within 24 hours.",
    body: 'Your email app should have opened with the request ready to send. If it did not, email us at',
    again: 'Send another request',
  },
};

export const productPage = {
  modeLabel: 'How do you want it?',
  conditionLabel: 'Condition',
  durationLabel: 'Rental length',
  addToCart: 'Add to cart',
  added: 'Added to cart',
  viewCart: 'View cart',
  wishlist: { add: 'Save to wishlist', remove: 'Remove from wishlist' },
  trust: ['Free delivery', '30-day returns', 'Rental protection'],
  included: "What's included",
  related: 'You may also like',
};

export const productsPage = {
  title: 'All products',
  intro: 'Everything in the Vault. Filter by category, price, or how you want it.',
  filters: {
    heading: 'Filters',
    mode: { label: 'Buy or rent', options: { all: 'All', buy: 'Buy', rent: 'Rent' } },
    category: 'Category',
    price: {
      label: 'Price',
      options: [
        { id: 'any', label: 'Any price', min: 0, max: Infinity },
        { id: 'under-100', label: `Under ${CURRENCY}100`, min: 0, max: 99 },
        { id: '100-500', label: `${CURRENCY}100 to ${CURRENCY}500`, min: 100, max: 500 },
        { id: 'over-500', label: `Over ${CURRENCY}500`, min: 501, max: Infinity },
      ],
    },
    sort: {
      label: 'Sort by',
      options: [
        { id: 'featured', label: 'Featured' },
        { id: 'price-asc', label: 'Price: low to high' },
        { id: 'price-desc', label: 'Price: high to low' },
        { id: 'rating', label: 'Top rated' },
      ],
    },
    clear: 'Clear filters',
  },
  empty: 'No products match those filters.',
};

export const rentalsPage = {
  title: 'Rentals',
  intro: 'Pick your dates first. We will show you what each console costs for exactly that long.',
  dates: {
    heading: 'When do you need it?',
    from: 'From',
    to: 'To',
    quick: [
      { id: 'day', label: 'Today', days: 1 },
      { id: 'weekend', label: 'This weekend', days: 2 },
      { id: 'week', label: 'A week', days: 7 },
    ],
    clear: 'Clear dates',
    prompt: 'Choose your dates to see the total for each rental.',
    invalid: 'The return date is before the start date.',
  },
};

export const cartPage = {
  title: 'Your cart',
  empty: {
    heading: 'Your cart is empty',
    body: 'Add something to buy, or book a rental, and it will show up here.',
  },
  summary: 'Order summary',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  free: 'Free',
  deliveryFee: 5,
  freeDeliveryOver: 50,
  total: 'Total',
  checkout: 'Checkout',
  checkoutNotice: 'Checkout is not open yet. To place this order now, send it to us and we will arrange payment and delivery.',
  checkoutLink: 'Contact us to order',
  remove: 'Remove',
  clear: 'Empty cart',
  note: 'This cart is saved on this device only.',
};

export const accountPage = {
  title: 'Your account',
  intro: 'Sign in to track orders and manage rentals.',
  signIn: 'Sign in',
  create: 'Create account',
  email: 'Email',
  password: 'Password',
  name: 'Name',
  switchToCreate: 'New here? Create an account',
  switchToSignIn: 'Already have an account? Sign in',
  notice: 'Accounts are not open yet, so nothing was sent. In the meantime, contact us about any order or rental.',
  contact: 'Contact us',
};

export const contactPage = {
  title: 'Contact',
  intro: 'Questions about an order, a rental or a piece you are looking for? Send us a note.',
  topics: ['An order', 'A rental', 'A return', 'Something else'],
  form: {
    name: 'Your name',
    email: 'Your email',
    topic: 'What is it about?',
    message: 'Message',
    max: 1000,
    submit: 'Send message',
  },
  success: {
    heading: 'Thanks — your message is ready to send.',
    body: 'Your email app should have opened with the message filled in. If it did not, email us at',
    again: 'Write another message',
  },
  aside: {
    heading: 'Other ways to reach us',
    items: [
      { label: 'General', value: 'hello@vault.example' },
      { label: 'Item requests', value: 'requests@vault.example' },
      { label: 'Delivery and pickup', value: 'Nairobi, seven days a week' },
    ],
  },
};

export const aboutPage = {
  title: 'About Vault',
  intro: 'Vault is one shop with two doors. Walk out owning the thing, or borrow it and bring it back.',
  sections: [
    {
      heading: 'Why we exist',
      body: 'Some things you want forever. A watch you will wear for twenty years. Other things you want for a weekend: a console for a birthday, a second controller for a tournament night. Most shops only sell you the first kind. We built Vault so the choice is yours every time.',
    },
    {
      heading: 'How we choose what goes in',
      body: 'Everything in the Vault is inspected, cleaned and tested before it is listed. Pre-owned pieces are graded honestly, and the grade you choose is the grade that arrives. If it is not good enough to keep, it is not good enough to rent.',
    },
    {
      heading: 'What you can count on',
      body: 'A one-year warranty on everything you buy. Thirty days to change your mind. Rental protection on every booking, and free delivery and pickup in Nairobi.',
    },
  ],
  cta: { heading: 'Looking for something we do not stock?', button: 'Request an item' },
};

export const guidePage = {
  title: "The 2026 Collector's Guide",
  intro: 'What to look for, what to walk away from, and how to try before you commit.',
  readTime: '4 minute read',
  sections: [
    {
      heading: 'Buy the condition, not the name',
      paragraphs: [
        'The most common mistake is paying for a famous name in tired condition. A clean, honest example of a modest piece will hold its appeal far better than a worn example of a grand one.',
        'Look at the parts that are expensive to put right. On a watch, that is the dial, the case edges and the bracelet. On a console, it is the ports, the fans and the controllers.',
      ],
    },
    {
      heading: 'Watches: box, papers and service history',
      paragraphs: [
        'Original box and papers do not make a watch run better, but they make it easier to sell later and they tell you it has been looked after. A recent service by a known watchmaker matters more than either.',
        'Be wary of a dial that looks newer than the case around it. Refinished dials and over-polished cases are the two things collectors mark down hardest.',
      ],
    },
    {
      heading: 'Consoles: test the things that wear out',
      paragraphs: [
        'Controllers fail before consoles do. Check every stick for drift and every button for a clean click. Listen to the console under load: a fan that roars is a console that needs opening up.',
        'If you are not sure a console is for you, rent it for a week first. A week with it at home tells you more than any review.',
      ],
    },
    {
      heading: 'Collectibles: keep it boxed, keep it dry',
      paragraphs: [
        'For boxed figures and limited runs, the packaging is a large part of the value. Creases, sun fade and price-sticker residue all count against a piece.',
        'Store boxes upright, out of direct light, and away from damp. If you are hunting for one specific piece, ask us. We source collectibles to order.',
      ],
    },
  ],
  cta: { heading: 'Hunting for one specific piece?', button: 'Request an item' },
};

export const faqPage = {
  title: 'Frequently asked questions',
  intro: 'The short answers. If yours is not here, contact us.',
  groups: [
    {
      id: 'buying',
      heading: 'Buying',
      items: [
        {
          q: 'What do the condition grades mean?',
          a: 'Fair has visible wear but works perfectly. Good has light marks. Excellent is barely used. Premium is like new, with its original box. Every grade is fully tested and carries the same warranty.',
        },
        {
          q: 'Is there a warranty?',
          a: 'Yes. Everything you buy from the Vault comes with a one-year warranty.',
        },
      ],
    },
    {
      id: 'rentals',
      heading: 'Rentals',
      items: [
        {
          q: 'How long can I rent for?',
          a: 'A day, a night, a weekend or a week. Choose your dates on the rentals page and you will see the total before you book.',
        },
        {
          q: 'Do I pay a deposit?',
          a: `There is no deposit on rentals under ${CURRENCY}100. For larger bookings we take a deposit and return it when the item comes back.`,
        },
        {
          q: 'What if something gets damaged?',
          a: 'Rental protection is included on every booking and covers accidental damage.',
        },
      ],
    },
    {
      id: 'delivery',
      heading: 'Delivery',
      items: [
        {
          q: 'How much is delivery?',
          a: `Delivery is free on orders over ${CURRENCY}50. Rental delivery and pickup are free in Nairobi.`,
        },
        {
          q: 'Where do you deliver?',
          a: 'Rentals are delivered and collected in Nairobi. Contact us before ordering if you are elsewhere.',
        },
      ],
    },
    {
      id: 'returns',
      heading: 'Returns',
      items: [
        {
          q: 'Can I return something I bought?',
          a: 'Yes. You have 30 days to return a purchase, free of charge.',
        },
        {
          q: 'How do I return a rental?',
          a: 'You do not need to do anything. We collect it at the end of your booking.',
        },
      ],
    },
    {
      id: 'requests',
      heading: 'Requests',
      items: [
        {
          q: 'Can you find something that is not listed?',
          a: 'Usually, yes. Send us a request with what you are after and your budget, and we will reply within 24 hours.',
        },
      ],
    },
  ],
};

export const legalPages = [
  { slug: 'privacy', title: 'Privacy' },
  { slug: 'terms', title: 'Terms' },
  { slug: 'cookies', title: 'Cookies' },
];

export const legalPlaceholder =
  'This policy is being written and will be published here before the Vault opens for orders. Until then, the site takes no payments, has no accounts, and stores nothing about you except a cart saved in your own browser.';

export const notFound = {
  title: 'This page is not in the Vault',
  body: 'The link may be old, or the page may have moved.',
  home: 'Back to the homepage',
  products: 'Browse all products',
};

export const footer = {
  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'All products', href: '/products' },
        { label: 'Rentals', href: '/rentals' },
        { label: 'Watches', href: '/category/watches' },
        { label: 'Consoles', href: '/category/consoles' },
        { label: 'Electronics', href: '/category/electronics' },
        { label: 'Collectibles', href: '/category/collectibles' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Delivery', href: '/faq#delivery' },
        { label: 'Returns', href: '/faq#returns' },
        { label: "Collector's guide", href: '/guide' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Request an item', href: '/request' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/legal/privacy' },
        { label: 'Terms', href: '/legal/terms' },
        { label: 'Cookies', href: '/legal/cookies' },
      ],
    },
  ],
  payments: ['Visa', 'Mastercard', 'Apple Pay', 'M-Pesa'],
};
