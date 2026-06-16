"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { catalog } from "@/lib/brand";

/**
 * The Climb — a scroll-driven rail that fills crimson→gold as the section
 * passes through view, with a node per release (oldest → newest). Reduced
 * motion shows the rail fully filled and static.
 */
export function CareerTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const items = [...catalog].sort((a, b) => a.year - b.year);

  return (
    <div ref={ref} className="relative pl-8">
      <div aria-hidden className="absolute left-2 top-0 h-full w-px bg-smoke/40" />
      {reduce ? (
        <div aria-hidden className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-crimson to-gold" />
      ) : (
        <motion.div
          aria-hidden
          style={{ height: fill }}
          className="absolute left-2 top-0 w-px bg-gradient-to-b from-crimson to-gold"
        />
      )}

      <ol className="space-y-8">
        {items.map((r) => (
          <li key={`${r.title}-${r.year}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border border-crimson bg-ink"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="tabular display text-gold">{r.year}</span>
              <span className="text-pearl">{r.title}</span>
              <span className="display text-[0.6rem] tracking-[0.2em] text-smoke-mid">
                {r.type}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
