'use client';

import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/lib/content';
import SearchBox from './SearchBox';
import { CartIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './ui/Icons';

const HIDE_AFTER = 160; // px scrolled before the header is allowed to hide
const DEADZONE = 6; // ignore scroll jitter smaller than this

const iconButton =
  'relative inline-flex h-40 w-40 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-brand hover:bg-chip';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up. One rAF per scroll burst.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < DEADZONE) return;
      lastY = y;
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(delta > 0 && y > HIDE_AFTER && !focusInside);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  const pinned = menuOpen || searchOpen;

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      // The slide is motion-safe only: with reduced motion the header simply stays put.
      className={`sticky top-0 z-40 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-standard ${
        hidden && !pinned ? 'motion-safe:-translate-y-full' : ''
      }`}
    >
      <p className="on-cobalt flex min-h-32 items-center justify-center bg-cobalt px-24 py-4 text-center text-12 font-semibold text-white">
        {site.promo}
      </p>

      <div className="border-b border-hairline bg-page">
        <div className="mx-auto grid h-64 max-w-page grid-cols-[auto_1fr_auto] items-center gap-16 px-24 md:h-80 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-8">
            <button
              type="button"
              className={`${iconButton} -ml-8 lg:hidden`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => {
                setMenuOpen((value) => !value);
                setSearchOpen(false);
              }}
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
            <a
              href="#top"
              aria-label={`${site.name} home`}
              className="font-display text-22 tracking-[0.08em] md:text-28"
            >
              {site.wordmark}
            </a>
          </div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-24">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`inline-flex h-40 items-center text-14 font-semibold transition-colors duration-200 ease-brand ${
                      'mode' in item && item.mode === 'rent'
                        ? 'text-rental-text hover:text-rental-text-hover'
                        : 'text-ink hover:text-cobalt'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-4">
            <SearchBox className="mr-8 hidden w-[220px] md:block lg:w-[190px] xl:w-[260px]" />
            <button
              type="button"
              className={`${iconButton} md:hidden`}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((value) => !value);
                setMenuOpen(false);
              }}
            >
              {searchOpen ? <CloseIcon size={22} /> : <SearchIcon size={22} />}
            </button>
            <button type="button" className={iconButton} aria-label="Account">
              <UserIcon size={22} />
            </button>
            <button type="button" className={`${iconButton} -mr-8`} aria-label="Cart, 2 items">
              <CartIcon size={22} />
              <span
                aria-hidden="true"
                className="price absolute right-0 top-0 flex h-16 min-w-16 items-center justify-center rounded-pill bg-cobalt px-4 text-12 font-semibold text-white"
              >
                2
              </span>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-hairline px-24 py-12 md:hidden">
            <SearchBox autoFocus />
          </div>
        )}

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="border-t border-hairline px-24 py-8 shadow-popover lg:hidden"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-12 text-16 font-semibold ${
                      'mode' in item && item.mode === 'rent' ? 'text-rental-text' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
