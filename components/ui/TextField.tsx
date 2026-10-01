'use client';

import { useId } from 'react';

const control =
  'w-full rounded-input border bg-card px-16 text-16 text-ink transition-colors duration-200 ease-brand placeholder:text-muted';

/** Labelled input or textarea with an optional character count and an inline error. */
export default function TextField({
  label,
  value,
  onChange,
  name,
  type = 'text',
  required = false,
  multiline = false,
  maxLength,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const countId = `${id}-count`;
  const describedBy = [error ? errorId : null, maxLength ? countId : null].filter(Boolean).join(' ');
  const border = error ? 'border-danger-text' : 'border-hairline hover:border-muted';

  const shared = {
    id,
    name,
    value,
    required,
    maxLength,
    placeholder,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
  };

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-12">
        <label htmlFor={id} className="text-14 font-semibold">
          {label}
          {!required && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        {maxLength && (
          <span id={countId} className="price text-12 text-muted">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {multiline ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className={`${control} ${border} block resize-y py-12`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          className={`${control} ${border} h-48`}
        />
      )}

      {error && (
        <p id={errorId} className="mt-4 text-14 text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
