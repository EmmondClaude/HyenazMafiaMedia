import { Reveal } from "./Reveal";
import { ReleaseCard } from "./ReleaseCard";
import type { Release } from "@/lib/brand";

/**
 * Responsive discography grid — even 1:1 tiles, 2 cols on mobile up to 4 on
 * desktop. Cards stagger in via the Motion-lane Reveal (reduced-motion safe).
 */
export function ReleaseGrid({ releases }: { releases: Release[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {releases.map((release, i) => (
        <Reveal key={release.slug} delay={(i % 4) * 0.06}>
          <ReleaseCard release={release} />
        </Reveal>
      ))}
    </div>
  );
}
