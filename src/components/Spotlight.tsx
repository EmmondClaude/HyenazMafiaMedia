"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

/**
 * Pull-quote / feature panel with a cursor-following crimson spotlight.
 * prefers-reduced-motion falls back to a fixed centered glow.
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const background = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(207,11,52,0.20), transparent 55%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <div
      onPointerMove={reduce ? undefined : handleMove}
      className={`relative overflow-hidden rounded-lg border border-smoke/40 bg-smoke/10 ${className}`}
    >
      {reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(207,11,52,0.16), transparent 55%)" }}
        />
      ) : (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
