import Link from 'next/link';
import { categoryHref, productsIn } from '@/lib/catalog';
import { categories, categoryGrid, products } from '@/lib/content';
import { ArrowRightIcon } from './ui/Icons';
import LightboxImage from './ui/LightboxImage';

const tile =
  'group relative overflow-hidden rounded-card shadow-resting transition-shadow duration-200 ease-standard hover:shadow-hover focus-within:shadow-hover';

const itemCount = (count: number) => (count === 1 ? '1 item' : `${count} items`);

export default function CategoryGrid() {
  const gallery = categories.map((category) => category.image);

  return (
    <section id="categories" aria-labelledby="categories-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <h2 id="categories-heading" className="mb-24 font-display text-22 md:text-28">
          {categoryGrid.heading}
        </h2>

        {/* 2 across on mobile, 3 on tablet, 5 on desktop. "All products" fills the last row. */}
        <ul className="grid grid-cols-2 gap-16 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const count = productsIn(category.slug).length;
            return (
              <li key={category.slug} className={tile}>
                {/* The image opens the lightbox; the label below it is the link to the category. */}
                <LightboxImage
                  image={category.image}
                  gallery={gallery}
                  index={index}
                  ratio="category"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  imageClassName="transition-transform duration-400 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-tile-scrim" aria-hidden="true" />
                <Link
                  href={categoryHref(category.slug)}
                  className="focus-inset on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-16"
                >
                  <span>
                    <span className="block text-18 font-semibold text-white">{category.name}</span>
                    <span className="price block text-14 text-white-muted">
                      {count ? itemCount(count) : categoryGrid.emptyCount}
                    </span>
                  </span>
                  <ArrowRightIcon size={20} className="mb-4 shrink-0 text-white" />
                </Link>
              </li>
            );
          })}

          <li className="col-span-2 lg:col-span-1">
            <Link
              href={categoryGrid.all.href}
              className="flex h-full min-h-[120px] flex-col justify-between rounded-card bg-cobalt p-16 shadow-resting transition-[background-color,box-shadow] duration-200 ease-brand hover:bg-cobalt-hover hover:shadow-hover"
            >
              <ArrowRightIcon size={24} className="self-end text-white" />
              <span>
                <span className="block text-18 font-semibold text-white">{categoryGrid.all.name}</span>
                <span className="price block text-14 text-white-muted">
                  {itemCount(products.length)}
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
