import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/PageHeader';
import ProductCarousel from '@/components/ProductCarousel';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchase from '@/components/ProductPurchase';
import { CheckIcon, Stars } from '@/components/ui/Icons';
import { categoryHref, categoryName, getProduct, relatedProducts } from '@/lib/catalog';
import { productPage, products } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

// Every product page is prerendered; unknown slugs are a 404, never rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.title, description: product.blurb } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <div className="mx-auto mb-56 max-w-page px-24 pt-32 md:pt-40">
        <Breadcrumb
          crumbs={[
            { label: 'Home', href: '/' },
            { label: categoryName(product.category), href: categoryHref(product.category) },
            { label: product.title },
          ]}
        />

        <div className="grid gap-32 lg:grid-cols-2 lg:gap-56">
          <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
            <ProductGallery product={product} />
          </div>

          <div>
            <h1 className="font-display text-28">{product.title}</h1>
            <p className="mb-16 mt-8 flex flex-wrap items-center gap-8 text-14 text-muted">
              <Stars rating={product.rating} size={14} />
              <span className="price">
                {product.rating.toFixed(1)} · {product.reviews.toLocaleString('en-GB')} reviews
              </span>
            </p>

            <ProductPurchase product={product} />

            <p className="mt-24 text-16 text-muted">{product.description}</p>

            <h2 className="mb-8 mt-24 text-16 font-semibold">{productPage.included}</h2>
            <ul className="space-y-8">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-8 text-14">
                  <CheckIcon size={16} className="mt-2 shrink-0 text-rental-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ProductCarousel
        id="related"
        heading={productPage.related}
        products={relatedProducts(product)}
      />
    </>
  );
}
