"use client";

import Link from "next/link";
import { useState } from "react";
import { event } from "@/lib/config";

const links = [
  { href: "/#details", label: "Details" },
  { href: "/schedule", label: "Schedule" },
  { href: "/explore", label: "Explore" },
  { href: "/potluck", label: "Potluck" },
  { href: "/carpool", label: "Carpool" },
  { href: "/rsvp", label: "RSVP" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold text-pine-900">
          🍺 {event.shortName}
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-pine-700 hover:bg-pine-100"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/rsvp" className="btn-primary ml-2">
            RSVP
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-pine-800 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-cream-200 bg-cream-50 px-4 py-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-pine-700 hover:bg-pine-100"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
