"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { heroAssets } from "@/lib/heroAssets";

/**
 * The reinvented hero (KICKOFF §6 Home / Studio centerpiece).
 *
 * A 3D camera and a 3D microphone counter-rotate on two concentric rings around
 * the 3D HYENAZ logo locked in the center — the two production-house crafts
 * (image + sound) orbiting the brand. Subjects are Higgsfield renders on an
 * ink-black field so they melt into the canvas; concentric rings are crisp SVG.
 * Each render carries a baked background, so a radial mask feathers its edges to
 * transparent — the square/navy boundary dissolves into the ink field while the
 * lit object stays crisp and the rings/glow read through behind it.
 *
 * Lane discipline (APEX-STACK): this is decorative component motion, not
 * scroll-linked — it lives in the Motion lane. prefers-reduced-motion drops the
 * orbit and renders a static composed lockup, which is mandatory on Apex.
 */
export function OrbitHero() {
  const reduce = useReducedMotion();

  // Two concentric orbits, counter-rotating. Radii are % of the stage.
  const outer = { radius: 42, duration: 28, subject: heroAssets.camera, size: 26 };
  const inner = { radius: 27, duration: 20, subject: heroAssets.mic, size: 22 };

  return (
    <div className="grain relative aspect-square w-full overflow-hidden rounded-2xl border border-smoke/40 bg-[radial-gradient(circle_at_50%_50%,rgba(95,1,15,0.4),transparent_70%)]">
      {/* concentric guide rings */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle cx="50" cy="50" r={outer.radius} fill="none" stroke="var(--color-smoke)" strokeWidth="0.2" opacity="0.5" />
        <circle cx="50" cy="50" r={inner.radius} fill="none" stroke="var(--color-gold)" strokeWidth="0.2" opacity="0.35" />
        <circle cx="50" cy="50" r="13" fill="none" stroke="var(--color-crimson)" strokeWidth="0.25" opacity="0.4" />
      </svg>

      {/* center — 3D logo emblem (feather the baked navy field into the canvas) */}
      <div
        className="absolute left-1/2 top-1/2 z-10 w-[34%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_40px_rgba(207,11,52,0.45)]"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, #000 66%, transparent 86%)",
          maskImage: "radial-gradient(circle, #000 66%, transparent 86%)",
        }}
      >
        <Image
          src={heroAssets.logo.src}
          alt={heroAssets.logo.alt}
          width={2048}
          height={2048}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* orbiting subjects */}
      {[outer, inner].map((ring, i) => (
        <Orbit key={i} {...ring} reduce={reduce} reverse={i === 1} />
      ))}
    </div>
  );
}

function Orbit({
  radius,
  duration,
  subject,
  size,
  reduce,
  reverse,
}: {
  radius: number;
  duration: number;
  subject: { src: string; alt: string };
  size: number;
  reduce: boolean | null;
  reverse: boolean;
}) {
  const spin = reverse ? -360 : 360;

  // Static fallback: park the subject at a fixed point on its ring.
  const parkedY = reverse ? radius : -radius;

  if (reduce) {
    return (
      <div
        className="absolute left-1/2 top-1/2 z-20"
        style={{ transform: `translate(-50%, -50%) translateY(${parkedY}%)` }}
      >
        <Subject {...subject} size={size} />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-20"
      animate={{ rotate: spin }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {/* place subject at top of the ring, then counter-rotate it upright */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: `translate(-50%, -50%) translateY(-${radius}%)` }}
      >
        <motion.div
          animate={{ rotate: -spin }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          <Subject {...subject} size={size} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Subject({ src, alt, size }: { src: string; alt: string; size: number }) {
  return (
    <div
      className="relative drop-shadow-[0_0_25px_rgba(0,0,0,0.6)]"
      style={{
        width: `${size}vw`,
        maxWidth: size * 5.5,
        aspectRatio: "1 / 1",
        WebkitMaskImage: "radial-gradient(circle, #000 56%, transparent 74%)",
        maskImage: "radial-gradient(circle, #000 56%, transparent 74%)",
      }}
    >
      <Image src={src} alt={alt} fill sizes="30vw" className="object-contain" />
    </div>
  );
}
