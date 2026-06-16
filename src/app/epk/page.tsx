import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { EpkHero } from "@/components/EpkHero";
import { CareerTimeline } from "@/components/CareerTimeline";
import { DiscographyExplorer } from "@/components/DiscographyExplorer";
import { VideoWall } from "@/components/VideoWall";
import { Marquee } from "@/components/Marquee";
import { Spotlight } from "@/components/Spotlight";
import { Section, Eyebrow, SlashHeading, Button, Card } from "@/components/ui";
import { brand, bio, releases, services, artistLinks } from "@/lib/brand";

export const metadata: Metadata = {
  title: "EPK",
  description:
    "Electronic press kit for Spitta P (Tha Hyena) and HYENAZ MAFIA MEDIA — bio, seven-year catalog, music videos, affiliations, and press.",
};

export default function EpkPage() {
  return (
    <>
      <ScrollProgress />
      <EpkHero />

      {/* THE STORY */}
      <Section className="border-t border-smoke/30">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>THE STORY</Eyebrow>
            <SlashHeading className="mt-3">West Vegas to the board</SlashHeading>
            <p className="mt-6 text-lg text-pearl/85">{bio.hook}</p>
            <p className="mt-4 text-pearl/75">{bio.long}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Spotlight className="flex h-full items-center p-8">
              <p className="display text-2xl leading-tight text-pearl sm:text-3xl">
                “Two faces. <span className="text-crimson">One</span> umbrella.”
              </p>
            </Spotlight>
          </Reveal>
        </div>
      </Section>

      {/* THE CLIMB */}
      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <Eyebrow>THE CLIMB</Eyebrow>
          <SlashHeading className="mt-3">Seven years deep</SlashHeading>
        </Reveal>
        <div className="mt-12">
          <CareerTimeline />
        </div>
      </Section>

      {/* DISCOGRAPHY */}
      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <Eyebrow>THE CATALOG</Eyebrow>
          <SlashHeading className="mt-3">Discography</SlashHeading>
          <p className="mt-4 max-w-2xl text-pearl/70">
            Filter the run and stream every release on Spotify and Apple Music.
          </p>
        </Reveal>
        <div className="mt-10">
          <DiscographyExplorer releases={releases} />
        </div>
      </Section>

      {/* THE VISUALS */}
      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <Eyebrow>THE VISUALS</Eyebrow>
          <SlashHeading className="mt-3">Music videos</SlashHeading>
        </Reveal>
        <div className="mt-10">
          <VideoWall />
        </div>
      </Section>

      {/* THE PACK */}
      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <Eyebrow>THE PACK</Eyebrow>
          <SlashHeading className="mt-3">Scene &amp; features</SlashHeading>
        </Reveal>
        <div className="mt-10 space-y-4">
          <Marquee items={[...bio.affiliations]} tone="gold" />
          <Marquee items={[...bio.features]} tone="crimson" reverse />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="display text-xs tracking-[0.25em] text-gold">AFFILIATIONS</h3>
            <p className="mt-3 text-pearl/85">{bio.affiliations.join(" · ")}</p>
          </Card>
          <Card>
            <h3 className="display text-xs tracking-[0.25em] text-crimson">FEATURED WITH</h3>
            <p className="mt-3 text-pearl/85">{bio.features.join(" · ")}</p>
          </Card>
        </div>
      </Section>

      {/* ONE UMBRELLA */}
      <Section className="border-t border-smoke/30 pt-0">
        <Reveal>
          <Eyebrow>ONE UMBRELLA</Eyebrow>
          <SlashHeading className="mt-3">{brand.name}</SlashHeading>
          <p className="mt-4 max-w-2xl text-pearl/75">
            The same artist runs the production house — audio, video, photo, and a
            studio under one roof.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-8">
          <Button href="/studio#book" variant="gold">
            BOOK THE STUDIO
          </Button>
        </div>
      </Section>

      {/* PRESS + BOOKING */}
      <Section id="booking" className="border-t border-smoke/30 pt-0">
        <div className="grid gap-10 md:grid-cols-3">
          <Reveal>
            <h3 className="display text-xs tracking-[0.25em] text-gold">PRESS</h3>
            {bio.press.map((p) => (
              <p key={p} className="mt-3 text-sm text-pearl/80">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="display text-xs tracking-[0.25em] text-gold">BOOKING &amp; PRESS</h3>
            <div className="mt-3 flex flex-col items-start gap-3">
              <Button href={`mailto:${brand.email}`} variant="crimson">
                {brand.email}
              </Button>
              <Button href={artistLinks.instagram} variant="ghost">
                {brand.artist.instagram}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="display text-xs tracking-[0.25em] text-gold">STREAM &amp; FOLLOW</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={artistLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-pearl/80 transition-colors hover:text-crimson">
                  Spotify →
                </a>
              </li>
              <li>
                <a href={artistLinks.apple} target="_blank" rel="noopener noreferrer" className="text-pearl/80 transition-colors hover:text-crimson">
                  Apple Music →
                </a>
              </li>
              <li>
                <a href={artistLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pearl/80 transition-colors hover:text-crimson">
                  Instagram →
                </a>
              </li>
              <li>
                <a href={artistLinks.bandcamp} target="_blank" rel="noopener noreferrer" className="text-pearl/80 transition-colors hover:text-crimson">
                  Bandcamp →
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
