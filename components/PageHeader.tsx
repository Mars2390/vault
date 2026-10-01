import type { ReactNode } from 'react';
import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb, page title and intro, shared by every page except the homepage. */
export default function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-page px-24 pb-32 pt-32 md:pt-40">
      {crumbs && <Breadcrumb crumbs={crumbs} />}
      <h1 className="font-display text-28 md:text-40">{title}</h1>
      {intro && <p className="mt-8 max-w-[640px] text-16 text-muted md:text-18">{intro}</p>}
      {children}
    </header>
  );
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-12">
      <ol className="flex flex-wrap items-center gap-x-8 text-14 text-muted">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-8">
            {index > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="inline-block py-4 transition-colors duration-200 ease-brand hover:text-ink"
              >
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="py-4 text-ink">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
