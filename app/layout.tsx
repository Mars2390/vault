import type { CSSProperties, ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LightboxProvider } from '@/components/Lightbox';
import { colors, cssVariables } from '@/lib/tokens';
import { site } from '@/lib/content';
import './globals.css';

// Display: variable Fraunces with the SOFT axis (set to 100 in globals.css).
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-display',
  display: 'swap',
});

// Body: DM Sans. Loaded as the variable font, because Google Fonts can answer the
// static-weight request with query-string font URLs that the Turbopack font loader
// rejects. Only 400 and 600 are ever used: tailwind.config.ts exposes no other weight.
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Buy it. Rent it. Own the moment.`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: colors.page,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable}`}
      style={cssVariables as CSSProperties}
      // Tells Next.js to jump, not glide, to the top on route changes.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-page font-body text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-16 focus:top-16 focus:z-50 focus:rounded-button focus:bg-ink focus:px-16 focus:py-8 focus:text-14 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <LightboxProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
