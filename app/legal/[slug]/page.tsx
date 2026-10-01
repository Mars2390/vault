import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import { legalPages, legalPlaceholder } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: legalPages.find((page) => page.slug === slug)?.title };
}

// Placeholder pages: the real policies are written before the Vault takes orders.
export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = legalPages.find((entry) => entry.slug === slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader title={page.title} crumbs={[{ label: 'Home', href: '/' }, { label: page.title }]} />
      <div className="mx-auto mb-56 max-w-page px-24">
        <p className="max-w-[640px] text-16 text-muted md:text-18">{legalPlaceholder}</p>
        <Button href="/contact" variant="outline" className="mt-24">
          Contact us
        </Button>
      </div>
    </>
  );
}
