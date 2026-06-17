"use client";

import { TiltCard } from "./TiltCard";
import { videos } from "@/lib/brand";

/**
 * Music video wall — the Apple Music videos as branded tilt tiles (no thumbnail
 * assets, so on-brand gradient cards). Each opens Apple Music in a new tab.
 */
export function VideoWall() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <TiltCard key={v.url} max={8}>
          <a
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${v.title} on Apple Music`}
            className="group relative flex aspect-video flex-col justify-end overflow-hidden rounded-lg border border-smoke/40 p-5"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, rgba(95,1,15,0.85), rgba(11,11,13,0.96))"
                  : "linear-gradient(135deg, rgba(156,123,58,0.7), rgba(11,11,13,0.96))",
            }}
          >
            <span
              aria-hidden
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-pearl/40 text-pearl transition-transform duration-300 group-hover:scale-110"
            >
              ▶
            </span>
            <span className="display text-[0.6rem] tracking-[0.25em] text-pearl/70">
              MUSIC VIDEO · <span className="tabular">{v.year}</span>
            </span>
            <span className="display mt-1 text-xl text-pearl">{v.title}</span>
            <span className="display mt-2 text-[0.65rem] tracking-[0.2em] text-gold">
              WATCH ON APPLE MUSIC →
            </span>
          </a>
        </TiltCard>
      ))}
    </div>
  );
}
