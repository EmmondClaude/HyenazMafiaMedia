import Link from "next/link";
import { OrbitHero } from "@/components/OrbitHero";
import { Reveal } from "@/components/Reveal";
import { ReleaseTeaser } from "@/components/ReleaseTeaser";
import { Section, Eyebrow, SlashHeading, Button, Card } from "@/components/ui";
import { brand, services, releases } from "@/lib/brand";

export default function Home() {
  return (
    <>
      {/* HERO — the 3D intro reveal (KICKOFF §6 Home / umbrella) */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>LAS VEGAS · EST. 2017</Eyebrow>
            <h1 className="display mt-4 text-pearl text-5xl leading-[0.95] sm:text-7xl">
              Two faces.
              <br />
              <span className="text-crimson">One</span> umbrella.
            </h1>
            <p className="mt-6 max-w-md text-lg text-pearl/80">
              {brand.name} is a full-service production house — and{" "}
              <span className="text-gold">{brand.artist.name}</span>, the
              recording artist behind it. The studio and the catalog carry equal
              weight.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/studio#book" variant="crimson">
                BOOK THE STUDIO
              </Button>
              <Button href="/epk" variant="gold">
                ARTIST EPK
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <OrbitHero />
          </Reveal>
        </div>
      </section>

      {/* DUAL IDENTITY — the strategic differentiator (§1) */}
      <Section className="border-y border-smoke/30">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <Eyebrow>THE BUSINESS</Eyebrow>
              <h3 className="display mt-3 text-3xl text-pearl">
                HYENA<span className="text-crimson">Z</span> MAFIA MEDIA
              </h3>
              <p className="mt-3 text-pearl/75">
                Audio production & mixing, videography, photography, and a studio
                built to ship release-ready work. Crimson edge, champagne
                finish.
              </p>
              <Link
                href="/production"
                className="display mt-5 inline-block text-sm tracking-[0.2em] text-gold hover:text-pearl-highlight"
              >
                SEE SERVICES →
              </Link>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <Eyebrow>THE ARTIST</Eyebrow>
              <h3 className="display mt-3 text-3xl text-pearl">
                SPITTA P · THA HYENA
              </h3>
              <p className="mt-3 text-pearl/75">
                A seven-year run out of West Las Vegas — from{" "}
                <em>This Tyme Around</em> to <em>Tha Hyena</em>. The sound that
                started the company.
              </p>
              <Link
                href="/epk"
                className="display mt-5 inline-block text-sm tracking-[0.2em] text-crimson hover:text-pearl-highlight"
              >
                OPEN THE EPK →
              </Link>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* SERVICES preview */}
      <Section>
        <Reveal>
          <SlashHeading>What we make</SlashHeading>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Card className="h-full">
                <span
                  className={`display text-xs tracking-[0.2em] ${
                    s.side === "business" ? "text-gold" : "text-crimson"
                  }`}
                >
                  {s.side === "business" ? "BUSINESS" : "ARTIST"}
                </span>
                <h3 className="display mt-2 text-xl text-pearl">{s.title}</h3>
                <p className="mt-2 text-sm text-pearl/70">{s.blurb}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CATALOG teaser */}
      <Section className="border-t border-smoke/30">
        <Reveal>
          <Eyebrow>THE CATALOG</Eyebrow>
          <SlashHeading className="mt-3">Seven years deep</SlashHeading>
        </Reveal>
        <Reveal className="mt-10">
          <ReleaseTeaser releases={releases} />
        </Reveal>
        <div className="mt-8">
          <Button href="/epk" variant="ghost">
            FULL DISCOGRAPHY
          </Button>
        </div>
      </Section>
    </>
  );
}
