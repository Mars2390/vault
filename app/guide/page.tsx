import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import LightboxImage from '@/components/ui/LightboxImage';
import { editorial, guidePage, images } from '@/lib/content';

export const metadata: Metadata = { title: guidePage.title, description: guidePage.intro };

export default function GuidePage() {
  return (
    <>
      <PageHeader
        title={guidePage.title}
        intro={guidePage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: "Collector's guide" }]}
      >
        <p className="mt-12 text-14 text-muted">{guidePage.readTime}</p>
      </PageHeader>

      <article className="mx-auto mb-56 max-w-page px-24">
        <div className="max-w-[720px]">
          <LightboxImage
            image={editorial.image}
            gallery={[images.collectibles, images.watches, images.consoles]}
            ratio="hero"
            sizes="(min-width: 768px) 720px, 100vw"
            preload
            className="mb-32 rounded-card shadow-resting"
          />

          <div className="space-y-32">
            {guidePage.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-22 md:text-28">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-12 text-16 text-muted md:text-18">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-40 flex flex-col items-start gap-16 rounded-card bg-tint p-24 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-22">{guidePage.cta.heading}</p>
            <Button href="/request" variant="outline" className="shrink-0">
              {guidePage.cta.button}
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
