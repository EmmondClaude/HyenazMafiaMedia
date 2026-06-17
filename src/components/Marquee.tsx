"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Infinite scrolling text row (Motion lane). Two copies translate -50% for a
 * seamless loop. prefers-reduced-motion renders a static wrapped row.
 */
export function Marquee({
  items,
  tone = "crimson",
  reverse = false,
  speed = 32,
}: {
  items: string[];
  tone?: "crimson" | "gold";
  reverse?: boolean;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const color = tone === "gold" ? "text-gold" : "text-crimson";

  if (reduce) {
    return (
      <div className={`flex flex-wrap gap-x-10 gap-y-2 ${color}`}>
        {items.map((t, i) => (
          <span key={i} className="display text-xl tracking-[0.15em]">
            {t}
          </span>
        ))}
      </div>
    );
  }

  const Row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span key={i} className={`display text-2xl tracking-[0.15em] ${color}`}>
          {t}
          <span className="ml-10 text-smoke">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {Row}
        {Row}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
