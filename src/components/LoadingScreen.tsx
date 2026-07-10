"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const LOGO = "/brand/hero-logo.png";

// Three claw slashes that rake across the screen before the mark lands.
const CLAWS = ["M22,6 C 34,34 44,60 38,96", "M46,3 C 60,32 70,58 64,97", "M70,5 C 84,34 94,60 88,98"];

const glow = (a: number, b: number) =>
  `drop-shadow(0 0 ${a}px rgba(207,11,52,0.5)) drop-shadow(0 0 ${b}px rgba(207,11,52,0.32))`;

/**
 * Full-screen brand loading splash — cinematic reveal.
 *
 * Black → three crimson claw slashes rake across the frame → the metal mark
 * assembles with a 3D settle, specular sweep, and a crimson glow bloom → a steel
 * shimmer tracks a LOADING bar. Used by IntroLoader and the App Router
 * loading.tsx fallback. prefers-reduced-motion holds everything static.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion();

  return (
    <div className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 overflow-hidden bg-ink">
      {/* crimson wash that blooms up as the mark lands */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(207,11,52,0.22),transparent_60%)]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      />

      {/* claw rake — behind the mark */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        style={{ filter: "drop-shadow(0 0 6px rgba(207,11,52,0.7))" }}
      >
        <defs>
          <linearGradient id="claw" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEFEF1" />
            <stop offset="45%" stopColor="#CF0B34" />
            <stop offset="100%" stopColor="#5F010F" />
          </linearGradient>
        </defs>
        {CLAWS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#claw)"
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0.9 }}
            animate={reduce ? { pathLength: 1 } : { pathLength: 1, opacity: [0.9, 1, 0.55] }}
            transition={{ duration: 0.55, delay: 0.05 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* the mark assembles after the claws start */}
      <motion.div
        className="relative"
        style={{ transformPerspective: 1000 }}
        initial={reduce ? false : { opacity: 0, scale: 0.82, rotateX: 18 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ filter: glow(30, 60) }}
          animate={
            reduce ? undefined : { y: [0, -10, 0], filter: [glow(30, 60), glow(52, 104), glow(30, 60)] }
          }
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        >
          <span className="relative inline-block">
            <Image
              src={LOGO}
              alt="HYENAZ MAFIA MEDIA"
              width={1817}
              height={1169}
              priority
              className="block h-auto w-[min(80vw,460px)]"
            />
            {!reduce && (
              <span
                aria-hidden
                className="logo-sweep"
                style={{ WebkitMaskImage: `url(${LOGO})`, maskImage: `url(${LOGO})` }}
              />
            )}
          </span>
        </motion.div>
      </motion.div>

      {/* progress shimmer + label */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.95 }}
      >
        <div className="relative h-px w-48 overflow-hidden rounded-full bg-smoke/30">
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-crimson to-transparent"
            animate={reduce ? undefined : { x: ["-120%", "360%"] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        <span className="display text-[0.65rem] tracking-[0.5em] text-smoke-mid">LOADING</span>
      </motion.div>
    </div>
  );
}
