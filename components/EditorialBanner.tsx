import { editorial } from '@/lib/content';
import Button from './ui/Button';
import LightboxImage from './ui/LightboxImage';

export default function EditorialBanner() {
  return (
    // Extra top margin on desktop makes room for the image that breaks out of the block.
    <section aria-labelledby="editorial-heading" className="on-cobalt mb-56 bg-cobalt md:mt-88">
      <div className="mx-auto grid max-w-page items-center gap-32 px-24 py-40 md:grid-cols-[1fr_auto] md:gap-56 md:py-0">
        <div className="md:py-56">
          <h2 id="editorial-heading" className="font-display text-28 text-white md:text-40">
            {editorial.heading}
          </h2>
          <p className="mt-12 max-w-[480px] text-16 text-white md:text-18">{editorial.sub}</p>
          <Button href={editorial.cta.href} variant="white" className="mt-24">
            {editorial.cta.label}
          </Button>
        </div>

        <div className="md:-my-32 md:w-[300px] lg:w-[360px]">
          <LightboxImage
            image={editorial.image}
            ratio="hero"
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 100vw"
            className="rounded-card shadow-popover"
            frameClassName="md:aspect-product"
          />
        </div>
      </div>
    </section>
  );
}
