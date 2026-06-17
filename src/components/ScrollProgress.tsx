"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Crimson→gold read-depth bar bound to page scroll (user-driven, RM-safe). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-crimson to-gold"
    />
  );
}
