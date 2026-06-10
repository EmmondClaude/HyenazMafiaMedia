import Link from "next/link";
import { Logo } from "./Logo";
import { brand, nav } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-smoke/40 bg-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-smoke-mid">
            {brand.positioning}
          </p>
        </div>

        <div>
          <h3 className="display text-xs tracking-[0.25em] text-gold">EXPLORE</h3>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-pearl/80 transition-colors hover:text-crimson"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="display text-xs tracking-[0.25em] text-gold">ARTIST</h3>
          <ul className="mt-4 space-y-2 text-sm text-pearl/80">
            <li>{brand.artist.name} · {brand.artist.persona}</li>
            <li>{brand.artist.instagram}</li>
            <li>{brand.artist.origin}</li>
          </ul>
        </div>

        <div>
          <h3 className="display text-xs tracking-[0.25em] text-gold">BOOKING</h3>
          <ul className="mt-4 space-y-2 text-sm text-pearl/80">
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors hover:text-crimson"
              >
                {brand.email}
              </a>
            </li>
            <li>
              <Link href="/studio#book" className="transition-colors hover:text-crimson">
                Book a session
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-smoke/40 py-6">
        <p className="mx-auto w-full max-w-6xl px-6 text-xs text-smoke-mid">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
