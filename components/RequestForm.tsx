'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { request, site } from '@/lib/content';
import { isEmail, mailtoHref } from '@/lib/mailto';
import Button from './ui/Button';
import { CheckIcon } from './ui/Icons';
import TextField from './ui/TextField';

const blank = { item: '', name: '', email: '', budget: '', notes: '' };
type Values = typeof blank;
type Errors = Partial<Record<keyof Values, string>>;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.item.trim()) errors.item = 'Tell us what you are looking for.';
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!isEmail(values.email)) errors.email = 'That email address does not look right.';
  return errors;
}

/**
 * "Request an item". There is no backend, so submitting opens the visitor's
 * email app with the request written out, addressed to the requests inbox.
 */
export default function RequestForm() {
  const { form, success } = request;
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [sentHref, setSentHref] = useState<string | null>(null);

  const set = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const href = mailtoHref(site.email.requests, `${form.subject}: ${values.item.trim()}`, [
      ['Looking for', values.item],
      ['Name', values.name],
      ['Email', values.email],
      ['Budget', values.budget],
      ['Notes', values.notes],
    ]);
    setSentHref(href);
    window.location.href = href;
  };

  if (sentHref) {
    return (
      <div role="status">
        <span className="mb-16 flex h-48 w-48 items-center justify-center rounded-pill bg-success-bg text-success-text">
          <CheckIcon size={24} />
        </span>
        <p className="font-display text-22">{success.heading}</p>
        <p className="mt-8 text-14 text-muted">
          {success.body}{' '}
          <a href={sentHref} className="font-semibold text-ink underline">
            {site.email.requests}
          </a>
          .
        </p>
        <Button
          variant="outline"
          className="mt-24"
          onClick={() => {
            setValues(blank);
            setSentHref(null);
          }}
        >
          {success.again}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-16">
      <TextField
        label={form.item.label}
        name="item"
        required
        maxLength={form.item.max}
        placeholder={form.item.placeholder}
        value={values.item}
        onChange={set('item')}
        error={errors.item}
      />
      <div className="grid gap-16 sm:grid-cols-2">
        <TextField
          label={form.name.label}
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
        <TextField
          label={form.email.label}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
        />
      </div>
      <TextField
        label={form.budget.label}
        name="budget"
        placeholder={form.budget.placeholder}
        value={values.budget}
        onChange={set('budget')}
      />
      <TextField
        label={form.notes.label}
        name="notes"
        multiline
        maxLength={form.notes.max}
        placeholder={form.notes.placeholder}
        value={values.notes}
        onChange={set('notes')}
      />
      <Button type="submit" className="w-full sm:w-auto">
        {form.submit}
      </Button>
    </form>
  );
}
