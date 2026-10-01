import type { ReactNode } from 'react';

/**
 * A radio button drawn as a bordered tile. Selectable, so it carries a border,
 * and the native input keeps arrow-key and form behaviour for free.
 * The rental tone plays the range sweep when the tile is chosen.
 */
export default function OptionTile({
  name,
  value,
  checked,
  onChange,
  tone = 'ink',
  title,
  detail,
  trailing,
  className = '',
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  tone?: 'ink' | 'rental';
  title: ReactNode;
  detail?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  const selected = tone === 'rental' ? 'border-rental-accent' : 'border-ink';

  return (
    <label className={`relative block cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        data-swept={tone === 'rental' && checked}
        className={`${
          tone === 'rental' ? 'sweep' : ''
        } flex h-full min-h-48 items-center justify-between gap-8 overflow-hidden rounded-input border bg-card px-12 py-8 transition-colors duration-200 ease-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus ${
          checked ? selected : 'border-hairline hover:border-muted'
        }`}
      >
        <span>
          <span className="block text-14 font-semibold">{title}</span>
          {detail && <span className="block text-12 text-muted">{detail}</span>}
        </span>
        {trailing && <span className="price text-14 font-semibold">{trailing}</span>}
      </span>
    </label>
  );
}
