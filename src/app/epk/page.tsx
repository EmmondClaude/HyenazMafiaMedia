import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Section, Eyebrow, SlashHeading, Button, Card } from "@/components/ui";
import { brand, bio, catalog, services } from "@/lib/brand";

export const metadata: Metadata = {
  title: "EPK",
  description:
    "Electronic press kit for Spitta P (Tha Hyena) and HYENAZ MAFIA MEDIA — bio, seven-year catalog, affiliations, and press.",
};

export default function EpkPage() {
  return (
    <>
      <Section>
        <Reveal>
          <Eyebrow>ELECTRONIC PRESS KIT</Eyebrow>
          <SlashHeading className="mt-3">Spitta P</SlashHeading>
          <p className="display mt-2 text-xl tracking-[0.2em] text-gold">
            “THA HYENA”
          </p>
          <p className="mt-6 max-w-2xl text-lg text-pearl/85">{bio.hook}</p>
          <p className="mt-4 max-w-2xl text-pearl/75">{bio.long}</p>
          <p className="mt-6 text-xs text-smoke-mid">
            Live monthly listeners, followers, and video views are pulled from
            Spotify / Apple for Artists day-of publishing (KICKOFF §5) — never
            from stale third-party aggregators.
          </p>
        </Reveal>
      </Section>

      {/* DUAL IDENTITY: artist <> business */}
      <Section className="border-t border-smoke/30 pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ARTIST side */}
          <Reveal>
            <Card className="h-full">
              <Eyebrow>THE ARTIST</Eyebrow>
              <h2 className="display mt-3 text-2xl text-pearl">Discography</h2>
              <ul className="mt-5 divide-y divide-smoke/30">
                {catalog.map((r) => (
                  <li key={r.title} className="flex items-center justify-between py-2.5">
                    <span className="text-pearl/90">{r.title}</span>
                    <span className="flex items-center gap-3">
                      <span className="display text-[0.65rem] tracking-[0.2em] text-crimson">
                        {r.type}
                      </span>
                      <span className="tabular text-sm text-smoke-mid">{r.year}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          {/* BUSINESS side */}
          <Reveal delay={0.1}>
            <Card className="h-full">
              <Eyebrow>THE BUSINESS</Eyebrow>
              <h2 className="display mt-3 text-2xl text-pearl">{brand.name}</h2>
              <p className="mt-3 text-pearl/75">
                The same artist runs the production house. Full-service from one
                roof:
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <li
                    key={s.slug}
                    className="rounded border border-smoke/40 px-3 py-2 text-sm text-pearl/85"
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/studio#book" variant="gold">
                  BOOK THE STUDIO
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* SCENE / PRESS */}
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <div>
              <h3 className="display text-xs tracking-[0.25em] text-gold">SCENE</h3>
              <p className="mt-3 text-sm text-pearl/80">
                Las Vegas. Grouped with {bio.affiliations.join(", ")}.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h3 className="display text-xs tracking-[0.25em] text-gold">FEATURES</h3>
              <p className="mt-3 text-sm text-pearl/80">{bio.features.join(" · ")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div>
              <h3 className="display text-xs tracking-[0.25em] text-gold">PRESS</h3>
              {bio.press.map((p) => (
                <p key={p} className="mt-3 text-sm text-pearl/80">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={`mailto:${brand.email}`} variant="crimson">
              BOOKING & PRESS INQUIRIES
            </Button>
            <Button href={`https://instagram.com/${brand.artist.instagram.replace("@", "")}`} variant="ghost">
              {brand.artist.instagram}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
