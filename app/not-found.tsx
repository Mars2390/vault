import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import RequestCta from '@/components/RequestCta';
import Button from '@/components/ui/Button';
import { notFound as copy } from '@/lib/content';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <PageHeader title={copy.title} intro={copy.body}>
        <div className="mt-24 flex flex-col gap-12 sm:flex-row">
          <Button href="/">{copy.home}</Button>
          <Button href="/products" variant="outline">
            {copy.products}
          </Button>
        </div>
      </PageHeader>
      <RequestCta />
    </>
  );
}
