import { reviews } from '@/lib/content';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { Stars } from './ui/Icons';

export default function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <h2 id="reviews-heading" className="mb-24 font-display text-22 md:text-28">
          {reviews.heading}
        </h2>
        <ul className="grid gap-16 md:grid-cols-3">
          {reviews.items.map((review) => (
            <Card as="li" key={review.name} padding="promo" className="flex flex-col">
              <Stars rating={5} size={16} />
              <blockquote className="mt-16 flex-1 text-16">“{review.quote}”</blockquote>
              <div className="mt-24 flex flex-wrap items-end justify-between gap-12">
                <p>
                  <span className="block text-14 font-semibold">{review.name}</span>
                  <span className="block text-12 text-muted">
                    {review.context} · {review.date}
                  </span>
                </p>
                <Badge variant="verified">{reviews.verified}</Badge>
              </div>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
