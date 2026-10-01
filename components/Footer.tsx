import Link from 'next/link';
import { footer, site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-tint">
      <div className="mx-auto max-w-page px-24 py-56">
        <div className="grid grid-cols-2 gap-x-16 gap-y-40 md:grid-cols-4">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-12 text-14 font-semibold text-ink">{column.title}</h2>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-4 text-14 text-muted transition-colors duration-200 ease-brand hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-56 flex flex-col gap-24 border-t border-hairline pt-24 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-16">
            <Link href="/" className="font-display text-22 tracking-[0.08em]" aria-label={`${site.name} home`}>
              {site.wordmark}
            </Link>
            <span className="text-14 text-muted">{site.copyright}</span>
          </div>

          <ul aria-label="Payment methods" className="flex flex-wrap gap-8">
            {footer.payments.map((method) => (
              <li
                key={method}
                className="inline-flex h-32 items-center rounded-pill bg-chip px-12 text-12 font-semibold text-ink"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
