import Image from "next/image";
import type { Release } from "@/lib/brand";

/**
 * A single release cover (1:1) → title → type · year → streaming buttons.
 * Artist surface, so crimson-led (Spotify primary) with a gold Apple Music
 * button so the business thread stays present. Buttons open in a new tab and
 * each renders only when its link exists — no dead links. Cover zoom on hover
 * is pure CSS, so prefers-reduced-motion (global clamp) holds it static.
 */
export function ReleaseCard({ release }: { release: Release }) {
  const { title, type, year, cover, spotifyUrl, appleUrl } = release;

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-smoke/40 bg-smoke/10">
        <Image
          src={cover}
          alt={`${title} — Spitta P`}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-105"
        />
      </div>

      <h3 className="display mt-3 text-lg text-pearl">{title}</h3>
      <p className="mt-0.5">
        <span className="display text-[0.7rem] tracking-[0.2em] text-crimson">
          {type}
        </span>
        {year !== undefined && (
          <span className="tabular text-sm text-smoke-mid"> · {year}</span>
        )}
      </p>

      {(spotifyUrl || appleUrl) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${title} on Spotify`}
              className="display bg-crimson px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-pearl-highlight transition-colors hover:bg-crimson-shadow"
            >
              SPOTIFY
            </a>
          )}
          {appleUrl && (
            <a
              href={appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${title} on Apple Music`}
              className="display border border-gold px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              APPLE MUSIC
            </a>
          )}
        </div>
      )}
    </div>
  );
}
