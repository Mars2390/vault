import { categories } from '@/lib/content';
import { ArrowRightIcon } from './ui/Icons';
import RatioImage from './ui/RatioImage';

const tile =
  'group relative overflow-hidden rounded-card shadow-resting duration-200 hover:shadow-hover focus-visible:shadow-hover';

export default function CategoryGrid() {
  const { heading, tiles, all } = categories;

  return (
    <section id="categories" aria-labelledby="categories-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <h2 id="categories-heading" className="mb-24 font-display text-22 md:text-28">
          {heading}
        </h2>

        {/* 2 across on mobile, 3 on tablet, 5 on desktop. "All products" fills the last row. */}
        <ul className="grid grid-cols-2 gap-16 md:grid-cols-3 lg:grid-cols-5">
          {tiles.map((category) => (
            <li key={category.name}>
              <a href={category.href} className={`${tile} block transition-shadow ease-standard`}>
                <RatioImage
                  image={category.image}
                  ratio="category"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  imageClassName="transition-transform duration-400 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-tile-scrim" aria-hidden="true" />
                <span className="absolute inset-x-16 bottom-16">
                  <span className="block text-18 font-semibold text-white">{category.name}</span>
                  <span className="price block text-14 text-white-muted">
                    {category.count} items
                  </span>
                </span>
              </a>
            </li>
          ))}

          <li className="col-span-2 lg:col-span-1">
            <a
              href={all.href}
              className={`${tile} flex h-full min-h-[120px] flex-col justify-between bg-cobalt p-16 transition-[background-color,box-shadow] ease-brand hover:bg-cobalt-hover`}
            >
              <ArrowRightIcon size={24} className="self-end text-white" />
              <span>
                <span className="block text-18 font-semibold text-white">{all.name}</span>
                <span className="price block text-14 text-white-muted">{all.count} items</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
