"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { TiltCard } from "./TiltCard";
import { releaseAccents, type Release } from "@/lib/brand";

const APPLE_HOST = "https://music.apple.com";
const EMBED_HOST = "https://embed.music.apple.com";

/**
 * Release cover (1:1) → title → type · year → actions, tinted to the cover's
 * own accent (releaseAccents) so each player matches its artwork.
 *
 * Apple Music inline player (discography rule): a Single embeds its own song
 * (from appleUrl); an album/EP only gets a player once a most-popular featured
 * track is set (appleEmbedUrl) — never the whole album. The player is a
 * click-to-load facade (lazy iframe) and renders OUTSIDE the 3D tilt (iframes
 * misrender inside CSS 3D transforms). Only the cover tilts. The play badge is
 * always visible (works on touch, not hover-only). prefers-reduced-motion is
 * handled by TiltCard + the global clamp.
 */
export function ReleaseCard({ release }: { release: Release }) {
  const { slug, title, type, year, cover, spotifyUrl, appleUrl, appleEmbedUrl } = release;
  const [playing, setPlaying] = useState(false);

  const accent = releaseAccents[slug] ?? "#C8A862";

  const playerUrl = type === "Single" ? appleUrl : appleEmbedUrl;
  let embedSrc: string | undefined;
  if (playerUrl?.startsWith(APPLE_HOST)) {
    const base = playerUrl.replace(APPLE_HOST, EMBED_HOST);
    embedSrc = `${base}${base.includes("?") ? "&" : "?"}theme=dark`;
  }

  // Apple serves two embed layouts: a compact ~175px player for a specific track
  // (?i=…) and a tall ~450px album-style player without one. Size the iframe to
  // match so it never overflows its box.
  const isTrackEmbed = !!playerUrl && /[?&]i=/.test(playerUrl);
  const playerHeight = isTrackEmbed ? 175 : 450;

  return (
    <div className="group" style={{ "--accent": accent } as CSSProperties}>
      <TiltCard max={10} className="relative">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-smoke/40 bg-smoke/10 transition-shadow duration-500 group-hover:shadow-[0_0_34px_-8px_var(--accent)]">
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
              className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--accent)] bg-ink/70 text-pearl backdrop-blur-sm transition-transform duration-300 hover:scale-110"
              style={{ boxShadow: "0 0 18px -4px var(--accent)" }}
            >
              <span className="ml-0.5 text-sm">▶</span>
            </button>
          )}
        </div>
      </TiltCard>

      <h3 className="display mt-3 text-lg text-pearl">{title}</h3>
      <p className="mt-0.5">
        <span className="display text-[0.7rem] tracking-[0.2em] text-crimson">{type}</span>
        {year !== undefined && <span className="tabular text-sm text-smoke-mid"> · {year}</span>}
      </p>

      {embedSrc && playing && (
        <div
          className="mt-3 rounded-xl p-px"
          style={{
            background: "linear-gradient(135deg, var(--accent), transparent 72%)",
            boxShadow: "0 0 32px -10px var(--accent)",
          }}
        >
          <div className="rounded-[11px] bg-ink p-1.5">
            <iframe
              title={`Apple Music — ${title}`}
              src={embedSrc}
              loading="lazy"
              allow="autoplay *; encrypted-media *; clipboard-write"
              className="block w-full rounded-lg"
              height={playerHeight}
              style={{ border: 0, background: "transparent" }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {embedSrc ? (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-expanded={playing}
            className="display border border-[color:var(--accent)] px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-pearl transition-shadow duration-300 hover:shadow-[0_0_18px_-4px_var(--accent)]"
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
