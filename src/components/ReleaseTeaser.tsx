import Image from "next/image";
import Link from "next/link";
import type { Release } from "@/lib/brand";

/**
 * Home teaser — the three most recent releases, newest first, with the newest
 * rendered largest. The whole tile links through to the full /epk discography.
 * Cover zoom is CSS, so prefers-reduced-motion (global clamp) holds it static.
 */
export function ReleaseTeaser({ releases }: { releases: Release[] }) {
  const [feature, ...rest] = releases.slice(0, 3);
  if (!feature) return null;

  return (
    <div className="grid items-start gap-4 sm:grid-cols-[2fr_1fr]">
      <TeaserCover release={feature} featured />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
        {rest.map((release) => (
          <TeaserCover key={release.slug} release={release} />
        ))}
      </div>
    </div>
  );
}

function TeaserCover({
  release,
  featured = false,
}: {
  release: Release;
  featured?: boolean;
}) {
  return (
    <Link
      href="/epk"
      aria-label={`${release.title} — see the full discography`}
      className="group relative block overflow-hidden rounded-lg border border-smoke/40"
    >
      <div className="relative aspect-square">
        <Image
          src={release.cover}
          alt={`${release.title} — Spitta P`}
          fill
          sizes={
            featured
              ? "(min-width: 640px) 42vw, 100vw"
              : "(min-width: 640px) 21vw, 50vw"
          }
          className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="display text-[0.65rem] tracking-[0.2em] text-crimson">
          {release.type}
          {release.year !== undefined && (
            <span className="tabular text-smoke-mid"> · {release.year}</span>
          )}
        </span>
        <h3 className={`display text-pearl ${featured ? "text-2xl sm:text-3xl" : "text-base"}`}>
          {release.title}
        </h3>
      </div>
    </Link>
  );
}
