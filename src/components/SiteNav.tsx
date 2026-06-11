"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/brand";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-smoke/40 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo variant="wordmark" priority />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`display text-xs tracking-[0.2em] transition-colors ${
                  active ? "text-crimson" : "text-pearl hover:text-pearl-highlight"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/studio#book"
            className="display bg-gold px-4 py-2 text-xs tracking-[0.2em] text-ink transition-colors hover:bg-gold-deep"
          >
            BOOK
          </Link>
        </nav>

        <button
          className="display text-xs tracking-[0.2em] text-pearl md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-smoke/40 px-6 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display py-2 text-sm tracking-[0.2em] text-pearl"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/studio#book"
            onClick={() => setOpen(false)}
            className="display mt-2 bg-gold px-4 py-2 text-center text-sm tracking-[0.2em] text-ink"
          >
            BOOK A SESSION
          </Link>
        </nav>
      )}
    </header>
  );
}
