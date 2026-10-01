import { hero } from '@/lib/content';
import Button from './ui/Button';
import Chip from './ui/Chip';
import { CheckIcon } from './ui/Icons';
import RatioImage from './ui/RatioImage';

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mb-56 pt-32 md:pt-56">
      <div className="mx-auto grid max-w-page items-center gap-32 px-24 lg:grid-cols-2 lg:gap-56">
        <div>
          <p className="mb-16 text-12 font-semibold uppercase tracking-[0.08em] text-muted">
            {hero.eyebrow}
          </p>
          <h1 id="hero-heading" className="font-display text-40 md:text-56">
            <span className="block">
              {hero.headline.before} <span className="text-cobalt">{hero.headline.accent}</span>
            </span>{' '}
            <span className="block">{hero.headline.after}</span>
          </h1>
          <p className="mt-16 max-w-[520px] text-18 text-muted md:text-20">{hero.sub}</p>

          <div className="mt-32 flex flex-col gap-12 sm:flex-row sm:gap-16">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="rentalOutline">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-24 flex flex-wrap gap-8">
            {hero.pills.map((pill) => (
              <li key={pill}>
                <Chip icon={<CheckIcon size={14} className="text-rental-accent" />}>{pill}</Chip>
              </li>
            ))}
          </ul>
        </div>

        <RatioImage
          image={hero.image}
          ratio="hero"
          sizes="(min-width: 1280px) 588px, (min-width: 1024px) 50vw, 100vw"
          preload
          className="rounded-card shadow-resting"
        />
      </div>
    </section>
  );
}
