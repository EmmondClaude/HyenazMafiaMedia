"use client";

import { useState } from "react";
import Image from "next/image";
import type { Release } from "@/lib/brand";

const APPLE_HOST = "https://music.apple.com";
const EMBED_HOST = "https://embed.music.apple.com";

/**
 * Release cover (1:1) → title → type · year → actions.
 *
 * Apple Music inline player (discography rule): a Single embeds its own song
 * (from `appleUrl`); an album/EP only gets a player once a most-popular featured
 * track is set (`appleEmbedUrl`) — never the whole album. The iframe is a
 * click-to-load facade (lazy), so 12 players never load until asked. Spotify
 * stays a link. Cover zoom is CSS, so prefers-reduced-motion holds it static.
 */
export function ReleaseCard({ release }: { release: Release }) {
  const { title, type, year, cover, spotifyUrl, appleUrl, appleEmbedUrl } = release;
  const [playing, setPlaying] = useState(false);

  const playerUrl = type === "Single" ? appleUrl : appleEmbedUrl;
  const embedSrc = playerUrl?.startsWith(APPLE_HOST)
    ? playerUrl.replace(APPLE_HOST, EMBED_HOST)
    : undefined;

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
        {embedSrc && !playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title} on Apple Music`}
            className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-pearl/70 bg-ink/60 text-pearl backdrop-blur-sm">
              ▶
            </span>
          </button>
        )}
      </div>

      <h3 className="display mt-3 text-lg text-pearl">{title}</h3>
      <p className="mt-0.5">
        <span className="display text-[0.7rem] tracking-[0.2em] text-crimson">{type}</span>
        {year !== undefined && <span className="tabular text-sm text-smoke-mid"> · {year}</span>}
      </p>

      {embedSrc && playing && (
        <iframe
          title={`Apple Music — ${title}`}
          src={embedSrc}
          loading="lazy"
          allow="autoplay *; encrypted-media *; clipboard-write"
          className="mt-3 w-full rounded-lg"
          height={175}
          style={{ border: 0, background: "transparent" }}
        />
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {embedSrc ? (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-expanded={playing}
            className="display bg-gold px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-ink transition-colors hover:bg-gold-deep"
          >
            {playing ? "HIDE PLAYER" : "▶ LISTEN"}
          </button>
        ) : (
          appleUrl && (
            <a
              href={appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${title} on Apple Music`}
              className="display border border-gold px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              APPLE MUSIC
            </a>
          )
        )}
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
      </div>
    </div>
  );
}
