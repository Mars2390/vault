'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen modal on a native <dialog>. showModal() gives the focus trap,
 * makes the page behind inert, and puts the dialog in the top layer. This
 * component adds scroll lock, close on Esc, close on outside click, and
 * returning focus to whatever opened it.
 */
export default function Modal({
  label,
  onClose,
  className = '',
  children,
}: {
  label: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const root = document.documentElement;
    // Remember the opener once: StrictMode runs this effect twice in development,
    // and by the second run focus is already inside the dialog.
    openerRef.current ??= document.activeElement as HTMLElement | null;
    const opener = openerRef.current;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    // Lock page scroll, and pad for the scrollbar so the page does not shift sideways.
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = 'hidden';
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;

    if (!dialog.open) dialog.showModal();

    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
      opener?.focus?.();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className}`}
      // Esc. The parent unmounts the modal, so the dialog never needs close().
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      // showModal() keeps focus off the page behind, but Tab can still leave for the
      // browser's own controls. Wrap it so focus cycles inside the dialog.
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
          (element) => element.offsetParent !== null,
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
    >
      {children}
    </dialog>
  );
}
