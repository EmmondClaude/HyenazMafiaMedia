"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "./TiltCard";
import { heroAssets } from "@/lib/heroAssets";
import { brand, bio, artistLinks, catalog } from "@/lib/brand";

/**
 * EPK hero — the 3D logo on a pointer tilt/parallax plane over crimson +
 * champagne light fields, with the name lockup, foil persona, hook, CTAs, and a
 * quick-facts row. prefers-reduced-motion drops the tilt and the cue.
 */
export function EpkHero() {
  const reduce = useReducedMotion();
  const facts = [
    { k: "From", v: brand.artist.origin },
    { k: "Since", v: "2017" },
    { k: "Catalog", v: `${catalog.length} releases` },
  ];

  return (
    <section className="grain relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_10%,rgba(207,11,52,0.18),transparent_60%),radial-gradient(50%_50%_at_90%_30%,rgba(200,168,98,0.14),transparent_60%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <span className="display text-sm tracking-[0.3em] text-crimson">
            ELECTRONIC PRESS KIT
          </span>
          <h1 className="display mt-4 text-pearl text-6xl leading-[0.9] sm:text-8xl">
            SPITTA <span className="text-crimson">P</span>
          </h1>
          <p className="foil display mt-2 text-2xl tracking-[0.3em] sm:text-3xl">
            THA HYENA
          </p>
          <p className="mt-6 max-w-md text-lg text-pearl/80">{bio.hook}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={artistLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="display bg-crimson px-5 py-3 text-xs tracking-[0.15em] text-pearl-highlight transition-colors hover:bg-crimson-shadow"
            >
              SPOTIFY
            </a>
            <a
              href={artistLinks.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="display border border-gold px-5 py-3 text-xs tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              APPLE MUSIC
            </a>
            <a
              href="#booking"
              className="display border border-smoke px-5 py-3 text-xs tracking-[0.15em] text-pearl transition-colors hover:border-pearl"
            >
              BOOKING
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="display text-[0.6rem] tracking-[0.25em] text-smoke-mid">
                  {f.k.toUpperCase()}
                </dt>
                <dd className="mt-1 text-pearl">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <TiltCard className="relative mx-auto w-full max-w-md" max={12}>
          <div className="relative aspect-square">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(207,11,52,0.35),transparent_65%)] blur-2xl"
            />
            <div
              className="relative flex h-full items-center justify-center"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="relative inline-block">
                <Image
                  src={heroAssets.logo.src}
                  alt="HYENAZ MAFIA MEDIA — Spitta P"
                  width={1817}
                  height={1169}
                  priority
                  className="h-auto w-full drop-shadow-[0_0_40px_rgba(207,11,52,0.5)]"
                />
                {!reduce && (
                  <span
                    aria-hidden
                    className="logo-sweep"
                    style={{
                      WebkitMaskImage: `url(${heroAssets.logo.src})`,
                      maskImage: `url(${heroAssets.logo.src})`,
                    }}
                  />
                )}
              </span>
            </div>
          </div>
        </TiltCard>
      </div>

      {!reduce && (
        <div className="relative flex justify-center pb-8">
          <motion.span
            aria-hidden
            className="block h-8 w-px bg-gradient-to-b from-crimson to-transparent"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      )}
    </section>
  );
}
