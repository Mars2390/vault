import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import RequestForm from '@/components/RequestForm';
import Card from '@/components/ui/Card';
import { request } from '@/lib/content';

export const metadata: Metadata = { title: request.page.title, description: request.page.intro };

export default function RequestPage() {
  return (
    <>
      <PageHeader
        title={request.page.title}
        intro={request.page.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: request.page.title }]}
      />
      <div className="mx-auto mb-56 max-w-page px-24">
        <Card padding="promo" className="max-w-[640px]">
          <RequestForm />
        </Card>
      </div>
    </>
  );
}
