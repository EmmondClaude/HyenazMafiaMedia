"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { heroAssets } from "@/lib/heroAssets";

/**
 * The reinvented hero (KICKOFF §6 Home / Studio centerpiece).
 *
 * A 3D camera and a 3D microphone genuinely orbit the 3D HYENAZ logo locked in
 * the center — the two production-house crafts (image + sound) circling the
 * brand. Each subject passes BEHIND the mark across the top arc and IN FRONT
 * across the bottom arc (animated z-index, flipped at the 3/9-o'clock sides
 * where there's no overlap), so it reads as a real orbit with depth rather than
 * a sprite hovering in front. The orbit guides are invisible — the motion alone
 * carries it. The camera links to Visuals, the microphone to Production.
 *
 * Lane discipline (APEX-STACK): decorative component motion, not scroll-linked —
 * the Motion lane. prefers-reduced-motion parks the subjects into a static
 * composed lockup, which is mandatory on Apex.
 */

// Layered crimson glow for the centered mark — matches the Logo / loading splash.
const HERO_GLOW_LO =
  "drop-shadow(0 0 24px rgba(207,11,52,0.45)) drop-shadow(0 0 48px rgba(207,11,52,0.25))";
const HERO_GLOW_HI =
  "drop-shadow(0 0 40px rgba(207,11,52,0.75)) drop-shadow(0 0 82px rgba(207,11,52,0.45))";

type Ring = {
  radius: number; // distance from center, % of the square stage
  duration: number; // seconds per revolution
  size: number; // subject width in vw (capped for desktop)
  startAngle: number; // degrees; 0 = top (12 o'clock)
  reverse: boolean; // orbit direction
  subject: { src: string; alt: string };
  href: string;
  label: string;
};

const RINGS: Ring[] = [
  {
    radius: 41,
    duration: 30,
    size: 24,
    startAngle: 0,
    reverse: false,
    subject: heroAssets.camera,
    href: "/visuals",
    label: "Videography & photography — go to Visuals",
  },
  {
    radius: 27,
    duration: 22,
    size: 20,
    startAngle: 180,
    reverse: true,
    subject: heroAssets.mic,
    href: "/production",
    label: "Audio & music production — go to Production",
  },
];

export function OrbitHero() {
  const reduce = useReducedMotion();

  // Pointer parallax — the metal mark tips toward the cursor across the stage.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function resetTilt() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="grain relative aspect-square w-full overflow-hidden rounded-2xl border border-smoke/40 bg-[radial-gradient(circle_at_50%_50%,rgba(95,1,15,0.4),transparent_70%)]"
      onMouseMove={reduce ? undefined : handleMove}
      onMouseLeave={reduce ? undefined : resetTilt}
    >
      {/* center — 3D logo emblem; outer centers + sets perspective, inner tilts
          to the cursor with the layered crimson glow pulse + cascading sweep */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[44%] -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX, rotateY, filter: HERO_GLOW_LO }}
          animate={reduce ? undefined : { filter: [HERO_GLOW_LO, HERO_GLOW_HI, HERO_GLOW_LO] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="relative block">
            <Image
              src={heroAssets.logo.src}
              alt={heroAssets.logo.alt}
              width={1817}
              height={1169}
              priority
              className="block h-auto w-full"
            />
            {!reduce && (
              <span
                aria-hidden
                className="logo-sweep"
                style={{
                  WebkitMaskImage: `url(${heroAssets.logo.src})`,
                  maskImage: `url(${heroAssets.logo.src})`,
                }}
              />
            )}
          </span>
        </motion.div>
      </div>

      {RINGS.map((ring) => (
        <Orbit key={ring.href} ring={ring} reduce={reduce} />
      ))}
    </div>
  );
}

function Orbit({ ring, reduce }: { ring: Ring; reduce: boolean | null }) {
  const { radius, duration, size, startAngle, reverse, subject, href, label } = ring;

  // Place the subject at the top of a full-stage layer, then rotate the layer
  // about the stage center — radius is a clean % of the stage, so the path is a
  // true circle (no wobble).
  const positioned = (content: React.ReactNode) => (
    <div
      className="absolute left-1/2"
      style={{ top: `${50 - radius}%`, transform: "translate(-50%, -50%)" }}
    >
      {content}
    </div>
  );

  if (reduce) {
    // Static composed lockup — park the subject at its start angle, upright.
    return (
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ transform: `rotate(${startAngle}deg)` }}
      >
        {positioned(
          <div style={{ transform: `rotate(${-startAngle}deg)` }}>
            <SubjectLink subject={subject} size={size} href={href} label={label} />
          </div>,
        )}
      </div>
    );
  }

  const spin = reverse ? -360 : 360;

  // Depth: behind the mark (z < logo's 10) across the top arc, in front
  // (z > 10) across the bottom arc. The discrete flip lands at the sides
  // (t = 0.25 / 0.75) where the subject never overlaps the logo, so it's unseen.
  const norm = (((startAngle % 360) + 360) % 360);
  const startsTop = norm < 90 || norm > 270;
  const zVals = startsTop ? [5, 5, 15, 15, 5, 5] : [15, 15, 5, 5, 15, 15];
  const zTimes = [0, 0.249, 0.251, 0.749, 0.751, 1];

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ rotate: [startAngle, startAngle + spin], zIndex: zVals }}
      transition={{
        rotate: { duration, ease: "linear", repeat: Infinity },
        zIndex: { duration, ease: "linear", repeat: Infinity, times: zTimes },
      }}
    >
      {positioned(
        // counter-rotate so the subject stays upright as the layer spins
        <motion.div
          animate={{ rotate: [-startAngle, -(startAngle + spin)] }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          <SubjectLink subject={subject} size={size} href={href} label={label} />
        </motion.div>,
      )}
    </motion.div>
  );
}

function SubjectLink({
  subject,
  size,
  href,
  label,
}: {
  subject: { src: string; alt: string };
  size: number;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group pointer-events-auto relative block outline-none"
      style={{ width: `${size}vw`, maxWidth: size * 5.5, aspectRatio: "1 / 1" }}
    >
      {/* baked near-black field feathered into the canvas; lifts on hover/focus */}
      <span
        className="absolute inset-0 drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        style={{
          WebkitMaskImage: "radial-gradient(circle, #000 56%, transparent 74%)",
          maskImage: "radial-gradient(circle, #000 56%, transparent 74%)",
        }}
      >
        <Image src={subject.src} alt={subject.alt} fill sizes="30vw" className="object-contain" />
      </span>
      {/* keyboard focus affordance */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-crimson/0 transition group-focus-visible:ring-crimson/70"
      />
    </Link>
  );
}
