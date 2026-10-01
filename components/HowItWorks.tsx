import { howItWorks } from '@/lib/content';

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mb-56">
      <div className="mx-auto max-w-page px-24">
        <h2 id="how-heading" className="mb-24 font-display text-22 md:text-28">
          {howItWorks.heading}
        </h2>
        <ol className="grid gap-24 md:grid-cols-3 md:gap-16">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-16 md:block">
              {/* Hairline joining each numbered circle to the next step. */}
              {index < howItWorks.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-56 right-0 top-20 hidden h-1 bg-hairline md:block"
                />
              )}
              <span className="price flex h-40 w-40 shrink-0 items-center justify-center rounded-pill bg-cobalt text-16 font-semibold text-white">
                {index + 1}
              </span>
              <div className="md:mt-16 md:pr-24">
                <h3 className="text-18 font-semibold">{step.title}</h3>
                <p className="mt-4 text-14 text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
