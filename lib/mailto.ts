/**
 * Builds a mailto: link with the subject and body filled in. Forms use this
 * instead of a backend: submitting opens the visitor's own email app.
 */
export function mailtoHref(to: string, subject: string, fields: [label: string, value: string][]) {
  const body = fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
