import type { Metadata } from 'next';
import AccountForm from '@/components/AccountForm';
import PageHeader from '@/components/PageHeader';
import { accountPage } from '@/lib/content';

export const metadata: Metadata = { title: accountPage.title, description: accountPage.intro };

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title={accountPage.title}
        intro={accountPage.intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Account' }]}
      />
      <div className="mx-auto mb-56 max-w-page px-24">
        <AccountForm />
      </div>
    </>
  );
}
