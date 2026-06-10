import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Hero3D } from "@/components/Hero3D";
import { BookingPanel } from "@/components/BookingPanel";
import { Section, Eyebrow, SlashHeading, Card } from "@/components/ui";
import { tiers } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The Studio",
  description:
    "Book the HYENAZ MAFIA MEDIA studio — three service tiers, deposits, and Cal.com scheduling with Google Calendar sync.",
};

export default function StudioPage() {
  return (
    <>
      {/* 3D lead-capture centerpiece (KICKOFF §6 The Studio) */}
      <section className="relative overflow-hidden border-b border-smoke/30">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>ITS OWN ENTITY</Eyebrow>
            <h1 className="display mt-4 text-pearl text-5xl sm:text-7xl">
              The <span className="text-crimson">Studio</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-pearl/80">
              Engage the mark, pick a tier, lock a date. The studio runs on real
              scheduling and real deposits — the bridge from visitor to booked
              session.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Hero3D />
          </Reveal>
        </div>
      </section>

      {/* TIERS */}
      <Section>
        <Reveal>
          <Eyebrow>SERVICE TIERS</Eyebrow>
          <SlashHeading className="mt-3">Pick your level</SlashHeading>
          <p className="mt-4 max-w-xl text-sm text-smoke-mid">
            Deposit amounts shown are placeholders pending client confirmation
            (KICKOFF §8). Each deposit applies to the final invoice.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Card
                className={`flex h-full flex-col ${
                  t.featured ? "border-gold/70 ring-1 ring-gold/40" : ""
                }`}
              >
                {t.featured && (
                  <span className="display mb-3 inline-block w-fit bg-gold px-2 py-0.5 text-[0.6rem] tracking-[0.25em] text-ink">
                    MOST BOOKED
                  </span>
                )}
                <h3 className="display text-2xl text-pearl">{t.name}</h3>
                <p className="tabular foil display mt-2 text-4xl">${t.deposit}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-smoke-mid">
                  deposit
                </p>
                <p className="mt-4 text-sm text-pearl/75">{t.summary}</p>
                <ul className="mt-5 space-y-2">
                  {t.includes.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-pearl/80">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 ${
                          t.side === "business" ? "bg-gold" : "bg-crimson"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* BOOKING */}
      <Section id="book" className="border-t border-smoke/30">
        <Reveal>
          <Eyebrow>BOOK</Eyebrow>
          <SlashHeading className="mt-3">Lock your session</SlashHeading>
        </Reveal>
        <div className="mt-10">
          <BookingPanel />
        </div>
      </Section>
    </>
  );
}
