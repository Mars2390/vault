'use client';

import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { contactPage, site } from '@/lib/content';
import { isEmail, mailtoHref } from '@/lib/mailto';
import Button from './ui/Button';
import { CheckIcon } from './ui/Icons';
import TextField from './ui/TextField';

const blank = { name: '', email: '', topic: contactPage.topics[0], message: '' };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/** Contact form. Submitting opens the visitor's email app with the message written out. */
export default function ContactForm() {
  const { form, success, topics } = contactPage;
  const topicId = useId();
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [sentHref, setSentHref] = useState<string | null>(null);

  const set = (key: keyof typeof blank) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found: Errors = {};
    if (!values.name.trim()) found.name = 'Enter your name.';
    if (!values.email.trim()) found.email = 'Enter your email address.';
    else if (!isEmail(values.email)) found.email = 'That email address does not look right.';
    if (!values.message.trim()) found.message = 'Write a message.';
    setErrors(found);
    if (Object.keys(found).length) return;

    const href = mailtoHref(site.email.hello, `${values.topic} — ${values.name.trim()}`, [
      ['Name', values.name],
      ['Email', values.email],
      ['About', values.topic],
      ['Message', values.message],
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
            {site.email.hello}
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
      <div className="grid gap-16 sm:grid-cols-2">
        <TextField
          label={form.name}
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
        <TextField
          label={form.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
        />
      </div>

      <div>
        <label htmlFor={topicId} className="mb-4 block text-14 font-semibold">
          {form.topic}
        </label>
        <select
          id={topicId}
          value={values.topic}
          onChange={(event) => set('topic')(event.target.value)}
          className="h-48 w-full rounded-input border border-hairline bg-card px-12 text-16 text-ink transition-colors duration-200 ease-brand hover:border-muted"
        >
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <TextField
        label={form.message}
        name="message"
        required
        multiline
        maxLength={form.max}
        value={values.message}
        onChange={set('message')}
        error={errors.message}
      />

      <Button type="submit" className="w-full sm:w-auto">
        {form.submit}
      </Button>
    </form>
  );
}
