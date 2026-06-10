"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";

/**
 * Homepage 3D intro stand-in.
 *
 * The Style Bible specs a glTF asset (HYENAZ_MafiaMedia_3D.glb — Cream_Pearl
 * wordmark + Crimson_Slash on its own depth plane for parallax). That binary
 * wasn't in the repo, so this recreates the *intent* in pure CSS/SVG: two
 * depth planes that parallax to the pointer. When the .glb lands in
 * /public/brand, swap this for a lazy <Canvas> (R3F + drei + postprocessing,
 * APEX-STACK tool 9) driven by the same pointer/scroll value. Reduced-motion
 * falls back to the flat lockup — mandatory on Apex.
 */
export function Hero3D() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // All springs declared unconditionally (rules-of-hooks); applied only when
  // motion is allowed. Wordmark plane drifts soft; the slash plane harder.
  const wordX = useSpring(mx, { stiffness: 120, damping: 20 });
  const wordY = useSpring(my, { stiffness: 120, damping: 20 });
  const wordTilt = useSpring(my, { stiffness: 80, damping: 20 });
  const slashX = useSpring(mx, { stiffness: 200, damping: 18 });
  const slashY = useSpring(my, { stiffness: 200, damping: 18 });

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="grain relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-smoke/40 bg-[radial-gradient(circle_at_50%_40%,rgba(95,1,15,0.35),transparent_70%)]"
    >
      {/* wordmark plane */}
      <motion.div
        style={reduce ? undefined : { x: wordX, y: wordY, rotateX: wordTilt }}
        className="select-none text-center"
      >
        <div className="display text-pearl text-6xl sm:text-8xl">
          HYENA<span className="text-crimson">Z</span>
        </div>
        <div className="display mt-3 inline-block bg-crimson px-3 py-1 text-sm tracking-[0.4em] text-pearl-highlight sm:text-lg">
          MAFIA MEDIA
        </div>
      </motion.div>

      {/* crimson slash on its own depth plane — parallaxes harder */}
      <motion.svg
        viewBox="0 0 100 200"
        aria-hidden
        style={reduce ? { opacity: 0.9 } : { x: slashX, y: slashY }}
        className="pointer-events-none absolute right-[18%] top-1/2 h-40 w-20 -translate-y-1/2 drop-shadow-[0_0_25px_rgba(207,11,52,0.6)]"
      >
        <path
          d="M60 0 L8 110 L42 110 L26 200 L92 70 L58 70 Z"
          fill="var(--color-crimson)"
        />
      </motion.svg>
    </div>
  );
}
