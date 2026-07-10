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

  // Layered crimson glow — richer than a single drop-shadow.
  const glowLo =
    "drop-shadow(0 0 16px rgba(207,11,52,0.45)) drop-shadow(0 0 32px rgba(207,11,52,0.25))";
  const glowHi =
    "drop-shadow(0 0 26px rgba(207,11,52,0.72)) drop-shadow(0 0 54px rgba(207,11,52,0.45))";
  const glowMax =
    "drop-shadow(0 0 34px rgba(207,11,52,0.9)) drop-shadow(0 0 66px rgba(207,11,52,0.55))";

  const mark = (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* idle breath + crimson glow pulse; brightens and lifts on hover/focus */}
      <motion.span
        className="inline-block"
        style={{ filter: glowLo, transformPerspective: 600 }}
        animate={reduce ? undefined : { scale: [1, 1.04, 1], filter: [glowLo, glowHi, glowLo] }}
        whileHover={reduce ? undefined : { scale: 1.08, rotateX: 10, filter: glowMax }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
      >
        <span className="relative inline-block">
          <Image
            src={LOGO.src}
            alt="HYENAZ MAFIA MEDIA"
            width={LOGO.w}
            height={LOGO.h}
            priority={priority}
            className={`${HEIGHT[variant]} block w-auto transition-transform duration-300 ease-out group-focus-visible:scale-105`}
          />
          {/* pearl→crimson light cascading across the mark, masked to its shape */}
          {!reduce && (
            <span
              aria-hidden
              className="logo-sweep"
              style={{ WebkitMaskImage: `url(${LOGO.src})`, maskImage: `url(${LOGO.src})` }}
            />
          )}
        </span>
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
