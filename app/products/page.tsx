import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ProductBrowser from '@/components/ProductBrowser';
import { productsPage } from '@/lib/content';

export const metadata: Metadata = {
  title: productsPage.title,
  description: productsPage.intro,
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title={productsPage.title}
        intro={productsPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: productsPage.title }]}
      />
      <ProductBrowser />
    </>
  );
}
