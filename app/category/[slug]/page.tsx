import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ProductGrid from '@/components/ProductGrid';
import RequestCta from '@/components/RequestCta';
import LightboxImage from '@/components/ui/LightboxImage';
import { getCategory, productsIn } from '@/lib/catalog';
import { categories } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return category ? { title: category.name, description: category.intro } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).slug);
  if (!category) notFound();

  const items = productsIn(category.slug);

  return (
    <>
      <div className="mx-auto grid max-w-page items-end gap-24 md:grid-cols-[1fr_auto]">
        <PageHeader
          title={category.name}
          intro={category.intro}
          crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]}
        >
          <p className="price mt-12 text-14 text-muted">
            {items.length === 1 ? '1 item' : `${items.length} items`}
          </p>
        </PageHeader>
        <div className="mb-32 mr-24 hidden w-[200px] md:block lg:w-[240px]">
          <LightboxImage
            image={category.image}
            ratio="hero"
            sizes="240px"
            eager
            className="rounded-card shadow-resting"
          />
        </div>
      </div>

      <div className="mx-auto mb-56 max-w-page px-24">
        {items.length > 0 ? (
          <>
            <ProductGrid products={items} />
            <div className="mt-32">
              <RequestCta bare />
            </div>
          </>
        ) : (
          <RequestCta variant="emptyCategory" bare />
        )}
      </div>
    </>
  );
}
