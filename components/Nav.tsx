"use client";

import Link from "next/link";
import { useState } from "react";
import { event } from "@/lib/config";

export function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#details", label: "Details" },
    { href: "/#rsvp", label: "RSVP" },
    { href: "/#meals", label: "Meals" },
    { href: "/#explore", label: "Explore" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-pine-800 bg-pine-900/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold text-gold-200">
          🍁 {event.shortName}
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-cream-100 hover:bg-pine-800"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#rsvp" className="btn-primary ml-2">
            RSVP
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <Link href="/#rsvp" className="btn-primary px-4 py-2 text-xs">
            RSVP
          </Link>
          <button
            className="rounded-lg p-2 text-cream-100"
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
        </div>
      </nav>

      {open && (
        <div className="border-t border-pine-800 bg-pine-900 px-4 py-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-cream-100 hover:bg-pine-800"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
