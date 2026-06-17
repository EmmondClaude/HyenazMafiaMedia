"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ReleaseCard } from "./ReleaseCard";
import type { Release, ReleaseType } from "@/lib/brand";

type Filter = "All" | "Albums" | "EPs" | "Singles";

const FILTERS: { label: Filter; match: (t: ReleaseType) => boolean }[] = [
  { label: "All", match: () => true },
  { label: "Albums", match: (t) => t === "Album" || t === "Mixtape" },
  { label: "EPs", match: (t) => t === "EP" },
  { label: "Singles", match: (t) => t === "Single" },
];

/**
 * Discography explorer — filter chips with live counts feed an animated grid of
 * ReleaseCards on 3D tilt planes. Reduced motion drops the tilt + transitions.
 */
export function DiscographyExplorer({ releases }: { releases: Release[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Filter>("All");
  const matcher = (FILTERS.find((f) => f.label === active) ?? FILTERS[0]).match;
  const shown = releases.filter((r) => matcher(r.type));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = releases.filter((r) => f.match(r.type)).length;
          const on = f.label === active;
          return (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              aria-pressed={on}
              className={`display border px-4 py-2 text-xs tracking-[0.15em] transition-colors ${
                on
                  ? "border-crimson bg-crimson text-pearl-highlight"
                  : "border-smoke text-pearl/80 hover:border-pearl"
              }`}
            >
              {f.label} <span className="tabular text-[0.7em] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduce}
        className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((release) => (
            <motion.div
              key={release.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ReleaseCard release={release} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
