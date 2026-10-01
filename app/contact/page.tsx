import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/ui/Card';
import { contactPage } from '@/lib/content';

export const metadata: Metadata = { title: contactPage.title, description: contactPage.intro };

export default function ContactPage() {
  const { aside } = contactPage;

  return (
    <>
      <PageHeader
        title={contactPage.title}
        intro={contactPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: contactPage.title }]}
      />
      <div className="mx-auto mb-56 grid max-w-page items-start gap-24 px-24 lg:grid-cols-[1fr_360px] lg:gap-32">
        <Card padding="promo">
          <ContactForm />
        </Card>

        <aside className="rounded-card bg-tint p-24">
          <h2 className="mb-16 text-18 font-semibold">{aside.heading}</h2>
          <dl className="space-y-12 text-14">
            {aside.items.map((item) => (
              <div key={item.label}>
                <dt className="text-muted">{item.label}</dt>
                <dd className="font-semibold">
                  {item.value.includes('@') ? (
                    <a href={`mailto:${item.value}`} className="underline hover:text-cobalt">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  );
}
