import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { faqPage } from '@/lib/content';

export const metadata: Metadata = { title: 'FAQ', description: faqPage.intro };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title={faqPage.title}
        intro={faqPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <div className="mx-auto mb-56 max-w-page px-24">
        <div className="max-w-[720px] space-y-40">
          {faqPage.groups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
              <h2 id={`${group.id}-heading`} className="mb-12 font-display text-22">
                {group.heading}
              </h2>
              <div className="space-y-8">
                {group.items.map((item) => (
                  // Something you choose to open, so it carries a border rather than a shadow.
                  <details key={item.q} className="group rounded-card border border-hairline bg-card">
                    <summary className="flex min-h-56 items-center justify-between gap-16 px-16 py-12 text-16 font-semibold">
                      {item.q}
                      <ChevronDownIcon
                        size={18}
                        className="shrink-0 transition-transform duration-200 ease-standard group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-16 pb-16 text-16 text-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-col items-start gap-16 rounded-card bg-tint p-24 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-22">Still have a question?</p>
            <Button href="/contact" variant="outline" className="shrink-0">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
