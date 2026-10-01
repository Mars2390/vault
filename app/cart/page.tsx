import type { Metadata } from 'next';
import CartView from '@/components/CartView';
import PageHeader from '@/components/PageHeader';
import { cartPage } from '@/lib/content';

export const metadata: Metadata = { title: cartPage.title };

export default function CartPage() {
  return (
    <>
      <PageHeader title={cartPage.title} crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <div className="mx-auto mb-56 max-w-page px-24">
        <CartView />
      </div>
    </>
  );
}
