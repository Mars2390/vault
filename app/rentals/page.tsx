import type { Metadata } from 'next';
import HowItWorks from '@/components/HowItWorks';
import PageHeader from '@/components/PageHeader';
import RentalBrowser from '@/components/RentalBrowser';
import { rentalsPage } from '@/lib/content';

export const metadata: Metadata = {
  title: rentalsPage.title,
  description: rentalsPage.intro,
};

export default function RentalsPage() {
  return (
    <>
      <PageHeader
        title={rentalsPage.title}
        intro={rentalsPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: rentalsPage.title }]}
      />
      <RentalBrowser />
      <HowItWorks />
    </>
  );
}
