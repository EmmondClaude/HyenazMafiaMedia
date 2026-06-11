"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

/**
 * HYENAZ MAFIA MEDIA lockup — the real 3D mark.
 *
 * Uses the supplied 3D logo render (background removed, /public/brand), so the
 * bespoke hand-lettering is honored as art and never re-typeset (KICKOFF §3).
 * Signature motion (Motion lane): a smooth entrance, a gentle idle "breath," and
 * a crimson-glow lift on hover/focus. prefers-reduced-motion drops to static.
 */

const LOGO = { src: "/brand/hero-logo.png", w: 1817, h: 1169 };

const HEIGHT: Record<"full" | "wordmark" | "badge", string> = {
  full: "h-16",
  wordmark: "h-10",
  badge: "h-12",
};

export function Logo({
  variant = "full",
  className = "",
  href = "/",
  priority = false,
}: {
  variant?: "full" | "wordmark" | "badge";
  className?: string;
  /** Pass null to render the mark without a link (e.g. splash screens). */
  href?: string | null;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  const mark = (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* gentle idle breath, decoupled from the hover/entrance transforms */}
      <motion.span
        className="inline-block"
        animate={reduce ? undefined : { scale: [1, 1.018, 1] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src={LOGO.src}
          alt="HYENAZ MAFIA MEDIA"
          width={LOGO.w}
          height={LOGO.h}
          priority={priority}
          className={`${HEIGHT[variant]} w-auto drop-shadow-[0_0_18px_rgba(207,11,52,0.35)] transition-[filter,transform] duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(207,11,52,0.6)] group-focus-visible:scale-105`}
        />
      </motion.span>
    </motion.span>
  );

  if (href === null) {
    return <span className={`group inline-flex ${className}`}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="HYENAZ MAFIA MEDIA — home"
      className={`group inline-flex outline-none ${className}`}
    >
      {mark}
    </Link>
  );
}
