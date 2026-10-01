'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { accountPage } from '@/lib/content';
import Button from './ui/Button';
import Card from './ui/Card';
import TextField from './ui/TextField';

/**
 * Sign in / create account, visual only. There is no auth yet: submitting
 * sends nothing anywhere and says so.
 */
export default function AccountForm() {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPassword('');
    setNotice(true);
  };

  return (
    <Card padding="promo" className="mx-auto max-w-[440px]">
      <h2 className="mb-16 font-display text-22">
        {creating ? accountPage.create : accountPage.signIn}
      </h2>

      <form onSubmit={onSubmit} className="space-y-16">
        {creating && (
          <TextField
            label={accountPage.name}
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={setName}
          />
        )}
        <TextField
          label={accountPage.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <TextField
          label={accountPage.password}
          name="password"
          type="password"
          required
          autoComplete={creating ? 'new-password' : 'current-password'}
          value={password}
          onChange={setPassword}
        />
        <Button type="submit" className="w-full">
          {creating ? accountPage.create : accountPage.signIn}
        </Button>
      </form>

      <div role="status" aria-live="polite">
        {notice && (
          <div className="mt-16 rounded-input bg-warning-bg p-12 text-14 text-warning-text">
            <p>{accountPage.notice}</p>
            <Link href="/contact" className="mt-4 inline-block font-semibold underline">
              {accountPage.contact}
            </Link>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setCreating((value) => !value);
          setNotice(false);
        }}
        className="mt-16 inline-flex h-32 items-center text-14 font-semibold text-ink underline transition-colors duration-200 ease-brand hover:text-cobalt"
      >
        {creating ? accountPage.switchToSignIn : accountPage.switchToCreate}
      </button>
    </Card>
  );
}
