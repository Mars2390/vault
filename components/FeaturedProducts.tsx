import { getProduct } from '@/lib/catalog';
import { featured } from '@/lib/content';
import type { Product } from '@/lib/content';
import ProductCarousel from './ProductCarousel';
import RequestCta from './RequestCta';

export default function FeaturedProducts() {
  const products = featured.slugs.map(getProduct).filter((p): p is Product => p !== undefined);

  return (
    <>
      <ProductCarousel
        id="featured"
        heading={featured.heading}
        link={featured.seeAll}
        products={products}
      />
      <RequestCta />
    </>
  );
}
