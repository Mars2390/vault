import { footer, site } from '@/lib/content';

const pill =
  'inline-flex h-32 items-center rounded-pill bg-chip px-12 text-12 font-semibold text-ink';

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
                  <li key={link}>
                    <a
                      href="#top"
                      className="inline-block py-4 text-14 text-muted transition-colors duration-200 ease-brand hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-56 flex flex-col gap-24 border-t border-hairline pt-24 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-16">
            <span className="font-display text-22 tracking-[0.08em]">{site.wordmark}</span>
            <span className="text-14 text-muted">{site.copyright}</span>
          </div>

          <div className="flex flex-col gap-16 md:flex-row md:items-center md:gap-24">
            <ul aria-label="Payment methods" className="flex flex-wrap gap-8">
              {footer.payments.map((method) => (
                <li key={method} className={pill}>
                  {method}
                </li>
              ))}
            </ul>
            <ul aria-label="Social media" className="flex flex-wrap gap-8">
              {footer.socials.map((network) => (
                <li key={network}>
                  <a
                    href="#top"
                    className={`${pill} transition-colors duration-200 ease-brand hover:bg-chip-hover`}
                  >
                    {network}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
