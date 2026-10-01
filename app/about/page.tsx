import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import TrustStrip from '@/components/TrustStrip';
import Button from '@/components/ui/Button';
import { aboutPage } from '@/lib/content';

export const metadata: Metadata = { title: aboutPage.title, description: aboutPage.intro };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={aboutPage.title}
        intro={aboutPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <div className="mx-auto mb-56 max-w-page px-24">
        <div className="max-w-[720px] space-y-32">
          {aboutPage.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-22">{section.heading}</h2>
              <p className="mt-8 text-16 text-muted md:text-18">{section.body}</p>
            </section>
          ))}
        </div>
      </div>

      <TrustStrip />

      <div className="mx-auto mb-56 max-w-page px-24">
        <div className="flex flex-col items-start gap-16 rounded-card bg-tint p-24 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-22">{aboutPage.cta.heading}</p>
          <Button href="/request" variant="outline" className="shrink-0">
            {aboutPage.cta.button}
          </Button>
        </div>
      </div>
    </>
  );
}
