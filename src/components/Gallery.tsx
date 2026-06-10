"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type Slide = { title: string; meta: string; tone?: "crimson" | "gold" | "smoke" };

/**
 * Brand gallery — Embla (APEX-STACK tool 13). Gesture-friendly, lightweight.
 * Autoplay respects reduced-motion (disabled). In production these slides are
 * fed from Sanity (video/photo portfolio); here they're typed placeholders so
 * the craft is visible without a CMS connection.
 */
export function Gallery({ slides }: { slides: Slide[] }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    reduce ? [] : [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );

  const scroll = useCallback(
    (dir: -1 | 1) => {
      if (!emblaApi) return;
      if (dir === 1) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const tones: Record<string, string> = {
    crimson: "from-crimson-shadow to-crimson/30",
    gold: "from-gold-deep to-gold/20",
    smoke: "from-smoke to-ink",
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
            >
              <div
                className={`flex aspect-[4/5] flex-col justify-end rounded-lg border border-smoke/40 bg-gradient-to-br p-5 ${
                  tones[s.tone ?? "smoke"]
                }`}
              >
                <span className="display text-xs tracking-[0.25em] text-pearl/70">
                  {s.meta}
                </span>
                <span className="display mt-1 text-xl text-pearl">{s.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="display border border-smoke px-4 py-2 text-xs tracking-[0.2em] text-pearl transition-colors hover:border-crimson hover:text-crimson"
        >
          PREV
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="display border border-smoke px-4 py-2 text-xs tracking-[0.2em] text-pearl transition-colors hover:border-crimson hover:text-crimson"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
