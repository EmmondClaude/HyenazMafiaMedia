"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * Full-screen brand loading splash — the same 3D mark, on the ink canvas.
 *
 * The logo eases in, breathes with a floating crimson glow, and a thin crimson
 * shimmer tracks beneath it. Used as the App Router route-transition fallback
 * (src/app/loading.tsx). prefers-reduced-motion holds everything static.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion();

  return (
    <div className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-ink">
      {/* radial crimson wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(207,11,52,0.18),transparent_60%)]" />

      <motion.div
        className="relative"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 0],
                  filter: [
                    "drop-shadow(0 0 24px rgba(207,11,52,0.35))",
                    "drop-shadow(0 0 50px rgba(207,11,52,0.6))",
                    "drop-shadow(0 0 24px rgba(207,11,52,0.35))",
                  ],
                }
          }
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 24px rgba(207,11,52,0.35))" }}
        >
          <Image
            src="/brand/hero-logo.png"
            alt="HYENAZ MAFIA MEDIA"
            width={1817}
            height={1169}
            priority
            className="h-auto w-[min(78vw,440px)]"
          />
        </motion.div>
      </motion.div>

      {/* crimson shimmer track */}
      <div className="relative z-10 h-px w-44 overflow-hidden rounded-full bg-smoke/30">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-crimson to-transparent"
          animate={reduce ? undefined : { x: ["-120%", "360%"] }}
          transition={{ duration: 1.3, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <span className="display relative z-10 text-[0.65rem] tracking-[0.45em] text-smoke-mid">
        LOADING
      </span>
    </div>
  );
}
