import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Section, Eyebrow, SlashHeading, Button, Card } from "@/components/ui";
import { services } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Production",
  description:
    "Audio Production and Music Production at HYENAZ MAFIA MEDIA — tracking, mixing, mastering, and original beats.",
};

const audio = services.filter((s) =>
  ["audio-production", "music-production"].includes(s.slug),
);

export default function ProductionPage() {
  return (
    <>
      <Section>
        <Reveal>
          <Eyebrow>THE BUSINESS · SOUND</Eyebrow>
          <SlashHeading className="mt-3">Production</SlashHeading>
          <p className="mt-6 max-w-xl text-lg text-pearl/80">
            Two halves of one board: the engineering that makes a record
            translate, and the music built from scratch behind it.
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-smoke/30 pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {audio.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Card className="h-full">
                <span
                  className={`display text-xs tracking-[0.2em] ${
                    s.side === "business" ? "text-gold" : "text-crimson"
                  }`}
                >
                  {s.side === "business" ? "BUSINESS SIDE" : "ARTIST SIDE"}
                </span>
                <h2 className="display mt-3 text-3xl text-pearl">{s.title}</h2>
                <p className="mt-3 text-pearl/75">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-pearl/80">
                      <span className="h-1.5 w-1.5 shrink-0 bg-crimson" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/studio#book" variant="crimson">
              BOOK A SESSION
            </Button>
            <Button href="/visuals" variant="ghost">
              VISUALS →
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
