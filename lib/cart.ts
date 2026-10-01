'use client';

import { useSyncExternalStore } from 'react';
import type { Mode } from './content';

/**
 * A cart kept in this browser's localStorage. There is no backend yet, so this
 * is the whole cart: nothing is sent anywhere.
 */

export interface CartLine {
  /** slug + mode + option, so the same product in two conditions is two lines. */
  id: string;
  slug: string;
  mode: Mode;
  /** Condition grade or rental length, as shown to the customer. */
  option: string;
  price: number;
  qty: number;
}

const KEY = 'vault-cart';
const EMPTY: CartLine[] = [];
const MAX_QTY = 9;

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

const isLine = (value: unknown): value is CartLine => {
  const line = value as CartLine;
  return (
    typeof line === 'object' &&
    line !== null &&
    typeof line.id === 'string' &&
    typeof line.slug === 'string' &&
    (line.mode === 'buy' || line.mode === 'rent') &&
    typeof line.option === 'string' &&
    Number.isFinite(line.price) &&
    Number.isInteger(line.qty) &&
    line.qty > 0
  );
};

function load() {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
    lines = Array.isArray(parsed) ? parsed.filter(isLine) : EMPTY;
  } catch {
    lines = EMPTY;
  }
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    load();
  }
  return lines;
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota). The cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // Keep tabs in step with each other.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    load();
    listener();
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export const cart = {
  add(line: Omit<CartLine, 'id' | 'qty'>) {
    const id = `${line.slug}:${line.mode}:${line.option}`;
    const current = getSnapshot();
    const existing = current.find((l) => l.id === id);
    commit(
      existing
        ? current.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l))
        : [...current, { ...line, id, qty: 1 }],
    );
  },
  setQty(id: string, qty: number) {
    const clamped = Math.max(1, Math.min(qty, MAX_QTY));
    commit(getSnapshot().map((l) => (l.id === id ? { ...l, qty: clamped } : l)));
  },
  remove(id: string) {
    commit(getSnapshot().filter((l) => l.id !== id));
  },
  clear() {
    commit(EMPTY);
  },
};

/** Cart lines for this browser. Empty during server render and hydration. */
export function useCart() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return {
    lines: current,
    count: current.reduce((sum, line) => sum + line.qty, 0),
    subtotal: current.reduce((sum, line) => sum + line.price * line.qty, 0),
  };
}
