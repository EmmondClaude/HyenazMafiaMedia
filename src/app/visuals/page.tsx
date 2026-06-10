import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Gallery, type Slide } from "@/components/Gallery";
import { Section, Eyebrow, SlashHeading, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Visuals",
  description:
    "Videography and Photography at HYENAZ MAFIA MEDIA — music videos, visualizers, brand films, press shots, and cover art.",
};

// Placeholder portfolio sets — fed from Sanity in production (KICKOFF §6).
const videoSlides: Slide[] = [
  { title: "Public Enemy", meta: "MUSIC VIDEO · 2025", tone: "crimson" },
  { title: "Grind It Out", meta: "VISUALIZER · 2024", tone: "smoke" },
  { title: "Walahi", meta: "MUSIC VIDEO · 2026", tone: "crimson" },
  { title: "Studio Sessions", meta: "BRAND FILM", tone: "gold" },
  { title: "Stone Cold", meta: "VISUALIZER · 2024", tone: "smoke" },
];

const photoSlides: Slide[] = [
  { title: "Tha Hyena", meta: "COVER ART · 2025", tone: "crimson" },
  { title: "Press Set", meta: "EDITORIAL", tone: "smoke" },
  { title: "The 7", meta: "LOCATION · LAS VEGAS", tone: "gold" },
  { title: "Live", meta: "EVENT COVERAGE", tone: "smoke" },
  { title: "Blessings", meta: "SINGLE ART · 2026", tone: "crimson" },
];

export default function VisualsPage() {
  return (
    <>
      <Section>
        <Reveal>
          <Eyebrow>THE BUSINESS · IMAGE</Eyebrow>
          <SlashHeading className="mt-3">Visuals</SlashHeading>
          <p className="mt-6 max-w-xl text-lg text-pearl/80">
            Cinematic finish on the moving image, billboard-grade on the still
            one. Videography and photography under one roof.
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <h2 className="display text-2xl text-pearl">
            Videography <span className="text-smoke-mid">— motion</span>
          </h2>
        </Reveal>
        <div className="mt-8">
          <Gallery slides={videoSlides} />
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <h2 className="display text-2xl text-pearl">
            Photography <span className="text-smoke-mid">— stills</span>
          </h2>
        </Reveal>
        <div className="mt-8">
          <Gallery slides={photoSlides} />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/studio#book" variant="crimson">
              BOOK A SHOOT
            </Button>
            <Button href="/production" variant="ghost">
              ← PRODUCTION
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
