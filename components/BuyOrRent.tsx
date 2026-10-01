'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import Link from 'next/link';
import { getProduct, lowestDayRate, lowestNightRate, productHref } from '@/lib/catalog';
import { buyOrRent, formatPrice } from '@/lib/content';
import type { Mode } from '@/lib/content';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { ArrowRightIcon, ShieldCheckIcon, TagIcon, TruckIcon, WalletIcon } from './ui/Icons';
import RatioImage from './ui/RatioImage';

const bulletIcons = {
  tag: TagIcon,
  wallet: WalletIcon,
  truck: TruckIcon,
  shield: ShieldCheckIcon,
};

const MODES: Mode[] = ['buy', 'rent'];

export default function BuyOrRent() {
  const { heading, body, cta, demo } = buyOrRent;
  const product = getProduct(demo.slug)!;
  const groupRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Mode>('rent');
  const [inView, setInView] = useState(false);

  // The lowest rates come from the catalogue, so this line can never drift from the prices.
  const bullets = [
    {
      icon: 'tag' as const,
      text: `Rent from ${formatPrice(lowestDayRate)}/day or ${formatPrice(lowestNightRate)}/night`,
    },
    ...buyOrRent.bullets,
  ];

  const titles: Record<Mode, string> = {
    buy: `Buy — ${formatPrice(product.buyPrice)}`,
    rent: `Rent — ${formatPrice(product.rentDay!)}/day`,
  };

  // Hold the range sweep until the demo scrolls into view, so it is seen.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  // Radio group keyboard pattern: arrows move the selection and the focus.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const back = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setSelected(event.currentTarget.dataset.mode as Mode);
      return;
    }
    if (!forward && !back) return;
    event.preventDefault();
    const next = selected === 'buy' ? 'rent' : 'buy';
    setSelected(next);
    groupRef.current?.querySelector<HTMLElement>(`[data-mode="${next}"]`)?.focus();
  };

  const rangeWidth = { '--sweep-width': `${(demo.rent.rangeDays / demo.rent.days.length) * 100}%` };

  return (
    <section id="rent" aria-labelledby="rent-heading" className="mb-56 bg-tint py-56">
      <div className="mx-auto grid max-w-page items-center gap-40 px-24 lg:grid-cols-2 lg:gap-56">
        <div>
          <h2 id="rent-heading" className="font-display text-28 md:text-40">
            {heading}
          </h2>
          <p className="mt-16 max-w-[520px] text-16 text-muted md:text-18">{body}</p>

          <ul className="mt-24 space-y-12">
            {bullets.map((bullet) => {
              const Icon = bulletIcons[bullet.icon];
              return (
                <li key={bullet.text} className="flex items-center gap-12 text-16">
                  <span className="flex h-32 w-32 shrink-0 items-center justify-center rounded-pill bg-rental-fill text-rental-text">
                    <Icon size={18} />
                  </span>
                  <span className="price">{bullet.text}</span>
                </li>
              );
            })}
          </ul>

          <Button href={cta.href} variant="rental" className="mt-32">
            {cta.label}
            <ArrowRightIcon size={18} />
          </Button>
        </div>

        <div className="max-w-[560px] lg:max-w-none">
          <div
            ref={groupRef}
            role="radiogroup"
            aria-label={demo.groupLabel}
            className="grid grid-cols-2 gap-16"
          >
            {MODES.map((mode) => {
              const isSelected = selected === mode;
              const isRent = mode === 'rent';
              const copy = demo[mode];
              const selectedStyle = isRent
                ? 'border-rental-accent shadow-popover'
                : 'border-ink shadow-popover';

              return (
                <div
                  key={mode}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  data-mode={mode}
                  onClick={() => setSelected(mode)}
                  onKeyDown={onKeyDown}
                  // Selectable, so it carries a border; the chosen card is raised by shadow alone.
                  className={`cursor-pointer overflow-hidden rounded-card border bg-card transition-[box-shadow,border-color] duration-200 ease-standard ${
                    isSelected ? selectedStyle : 'border-hairline shadow-resting hover:shadow-hover'
                  }`}
                >
                  <RatioImage
                    image={product.image}
                    ratio="product"
                    sizes="(min-width: 640px) 286px, 50vw"
                    decorative
                  />
                  <div className="p-16">
                    <Badge variant={mode}>{copy.badge}</Badge>
                    <p
                      className={`price mt-8 text-16 font-semibold md:text-18 ${
                        isRent ? 'text-rental-text' : ''
                      }`}
                    >
                      {titles[mode]}
                    </p>
                    <p className="text-14 text-muted">{copy.note}</p>

                    <div className="mt-12 flex h-24 items-center">
                      {isRent ? (
                        <div
                          role="img"
                          aria-label={demo.rent.rangeLabel}
                          data-swept={isSelected && inView}
                          style={rangeWidth as CSSProperties}
                          className="sweep grid w-full grid-cols-7 overflow-hidden rounded-pill bg-chip"
                        >
                          {demo.rent.days.map((day, index) => (
                            <span
                              key={index}
                              aria-hidden="true"
                              className={`py-4 text-center text-12 font-semibold ${
                                index < demo.rent.rangeDays ? 'text-rental-text' : 'text-muted'
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="save">
                          Save {formatPrice(product.newPrice - product.buyPrice)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href={productHref(product)}
            className="mt-16 inline-flex h-40 items-center gap-4 text-14 font-semibold text-rental-text transition-colors duration-200 ease-brand hover:text-rental-text-hover"
          >
            View the {product.title}
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
