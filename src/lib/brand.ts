/**
 * HYENAZ MAFIA MEDIA — content source of truth.
 * Values pulled from docs/KICKOFF.md (Style Bible + Research Dossier).
 * Streaming numbers are intentionally omitted: the Bible (§5) says pull them
 * live from Spotify/Apple for Artists day-of — never from stale aggregators.
 */

export const brand = {
  name: "HYENAZ MAFIA MEDIA",
  shortName: "HYENAZ",
  tagline: "MAFIA MEDIA",
  // The strategic differentiator: artist + business carry equal weight (§1)
  positioning:
    "A Las Vegas production house and the recording artist Spitta P — two faces of one umbrella, equal weight.",
  artist: {
    name: "Spitta P",
    persona: "Tha Hyena",
    instagram: "@spitta_p",
    origin: "West Las Vegas",
  },
  email: "booking@hyenazmafiamedia.com",
} as const;

/** Brand palette — exact hex from the Style Bible (§2). */
export const palette = [
  { name: "Crimson Red", hex: "#CF0B34", role: "Primary accent — the slash, CTAs" },
  { name: "Crimson Shadow", hex: "#5F010F", role: "Depth, gradients, hover" },
  { name: "Pearl White", hex: "#F6E5CC", role: "Wordmark, primary text on dark" },
  { name: "Pearl Highlight", hex: "#FEFEF1", role: "Specular highlights, brightest text" },
  { name: "Champagne Gold", hex: "#C8A862", role: "Premium / business layer" },
  { name: "Gold Deep", hex: "#9C7B3A", role: "Metallic depth" },
  { name: "Smoke Grey", hex: "#3C4046", role: "Cards, muted UI" },
  { name: "Smoke Mid", hex: "#74787E", role: "Borders, captions" },
  { name: "Ink Black", hex: "#0B0B0D", role: "The canvas everything sits on" },
] as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Production", href: "/production" },
  { label: "Visuals", href: "/visuals" },
  { label: "The Studio", href: "/studio" },
  { label: "EPK", href: "/epk" },
];

export type Service = {
  slug: string;
  title: string;
  side: "artist" | "business";
  blurb: string;
  features: string[];
};

/** The production-house offering, page-per-offering paired per §6. */
export const services: Service[] = [
  {
    slug: "audio-production",
    title: "Audio Production",
    side: "business",
    blurb:
      "Recording, engineering, and a mix that translates from the trunk to the club to the AirPods.",
    features: ["Tracking & comping", "Mixing & mastering", "Vocal tuning & FX", "Stem delivery"],
  },
  {
    slug: "music-production",
    title: "Music Production",
    side: "artist",
    blurb:
      "Beats, arrangement, and full songs built from the ground up — seven years of catalog behind the board.",
    features: ["Original beats", "Arrangement & topline", "Session players", "Publishing-ready files"],
  },
  {
    slug: "videography",
    title: "Videography",
    side: "business",
    blurb:
      "Music videos, visualizers, and brand films cut with cinematic finish.",
    features: ["Music videos", "Visualizers", "Brand films", "Social cuts"],
  },
  {
    slug: "photography",
    title: "Photography",
    side: "artist",
    blurb:
      "Press shots, cover art, and editorial imagery that hold up at billboard scale.",
    features: ["Press & EPK shoots", "Cover art", "Editorial", "Event coverage"],
  },
];

/** Service tiers — amounts are placeholders pending client confirmation (§5, §8). */
export type Tier = {
  name: string;
  side: "artist" | "business";
  deposit: number;
  summary: string;
  includes: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Session",
    side: "artist",
    deposit: 100,
    summary: "Single-session studio time. Lock a slot, walk out with a mix.",
    includes: ["Up to 3 hours tracking", "Engineer on the board", "Rough mix same-day"],
  },
  {
    name: "Project",
    side: "business",
    deposit: 350,
    summary: "Multi-session package for an EP or a video — production house end to end.",
    includes: [
      "Block of sessions",
      "Full mix & master",
      "One visualizer or photo set",
      "Priority scheduling",
    ],
    featured: true,
  },
  {
    name: "Apex",
    side: "business",
    deposit: 1000,
    summary: "The full-service rollout: record, shoot, cut, and deliver a release-ready campaign.",
    includes: [
      "Album / campaign scope",
      "Audio + video + photo",
      "Brand & EPK assets",
      "Dedicated producer",
    ],
  },
];

/** Catalog — confirmed in the Research Dossier (§5). 7-year run. */
export const catalog = [
  { title: "Tha Hyena", year: 2025, type: "Album" },
  { title: "Walahi", year: 2026, type: "Single" },
  { title: "Blessings", year: 2026, type: "Single" },
  { title: "Public Enemy", year: 2025, type: "Single" },
  { title: "Why Explain", year: 2024, type: "EP" },
  { title: "Stone Cold", year: 2024, type: "Single" },
  { title: "Grind It Out", year: 2024, type: "Single" },
  { title: "Escapin' Depression 2", year: 2023, type: "Album" },
  { title: "Introversion", year: 2022, type: "Album" },
  { title: "Master Mind", year: 2020, type: "Album" },
  { title: "In My Feelings", year: 2019, type: "Album" },
  { title: "This Tyme Around 2", year: 2018, type: "Album" },
  { title: "This Tyme Around", year: 2017, type: "Album" },
] as const;

/**
 * Discography — releases with cover art that link out to Spotify + Apple Music.
 * Single source of truth for the /epk cover grid; render from this, never
 * hardcode cards. Links verified from his Spotify (62zntN4UQCZqIiIxRt7fjb) and
 * Apple (516708870) profiles, June 2026. Newest first.
 *
 * A few entries intentionally omit URLs / year — covers exist but the DSP links
 * are still owed by the client (see DISCOGRAPHY-HANDOFF §7). Cards hide any
 * button whose link is missing rather than render a dead link.
 */
export type ReleaseType = "Single" | "EP" | "Mixtape" | "Album";

export interface Release {
  slug: string;
  title: string;
  type: ReleaseType;
  year?: number; // render with tabular numerals
  cover: string; // "/releases/<slug>.jpg"
  spotifyUrl?: string;
  appleUrl?: string;
}

export const releases: Release[] = [
  {
    slug: "blessings",
    title: "Blessings",
    type: "Single",
    year: 2026,
    cover: "/releases/blessings.jpg",
    appleUrl: "https://music.apple.com/us/album/blessings-single/1870484091",
    spotifyUrl: "https://open.spotify.com/album/4tXZ0kjvPA8PMc7MfrvQEA",
  },
  {
    slug: "public-enemy",
    title: "Public Enemy",
    type: "Single",
    year: 2025,
    cover: "/releases/public-enemy.jpg",
    appleUrl: "https://music.apple.com/us/album/public-enemy-single/1790237808",
    spotifyUrl: "https://open.spotify.com/album/0pT5ULDL7zpua6CqYzM5hM",
  },
  {
    slug: "why-explain",
    title: "Why Explain",
    type: "EP",
    year: 2024,
    cover: "/releases/why-explain.jpg",
    appleUrl: "https://music.apple.com/us/album/why-explain-ep/1782748794",
    spotifyUrl: "https://open.spotify.com/album/613glB45QLyuStfEe21wIJ",
  },
  {
    slug: "stone-cold",
    title: "Stone Cold",
    type: "Single",
    year: 2024,
    cover: "/releases/stone-cold.jpg",
    appleUrl: "https://music.apple.com/us/album/stone-cold-single/1774345314",
    spotifyUrl: "https://open.spotify.com/album/7mid54OU656sTlJaKYurex",
  },
  {
    slug: "grind-it-out",
    title: "Grind It Out",
    type: "Single",
    year: 2024,
    cover: "/releases/grind-it-out.jpg",
    appleUrl: "https://music.apple.com/us/album/grind-it-out-single/1748420912",
    spotifyUrl: "https://open.spotify.com/album/7AouhSgtpz4xgDHZmTX1iz",
  },
  {
    slug: "escapin-depression-2",
    title: "Escapin' Depression 2",
    type: "Album",
    year: 2023,
    cover: "/releases/escapin-depression-2.jpg",
    appleUrl: "https://music.apple.com/us/album/escapin-depression-2/1681158705",
    spotifyUrl: "https://open.spotify.com/album/0zTRzHayF4KtEislxDa8Ii",
  },
  {
    slug: "introversion",
    title: "Introversion",
    type: "Album",
    year: 2022,
    cover: "/releases/introversion.jpg",
    appleUrl: "https://music.apple.com/us/album/introversion/1608252606",
    spotifyUrl: "https://open.spotify.com/album/7eynOprrHbAc6Vkp9y02Ig",
  },
  {
    // TODO (client, handoff §7): exact Apple + Spotify album URLs.
    slug: "something-2-prove-rap",
    title: "Something 2 Prove Rap",
    type: "EP",
    year: 2022,
    cover: "/releases/something-2-prove-rap.jpg",
  },
  {
    slug: "master-mind",
    title: "Master Mind",
    type: "Album",
    year: 2020,
    cover: "/releases/master-mind.jpg",
    appleUrl: "https://music.apple.com/us/album/master-mind/1546651524",
    spotifyUrl: "https://open.spotify.com/album/5m5yx5ud3ygU1qfDVANBqN",
  },
  {
    slug: "in-my-feelings",
    title: "In My Feelings",
    type: "Album",
    year: 2019,
    cover: "/releases/in-my-feelings.jpg",
    appleUrl: "https://music.apple.com/us/album/in-my-feelings/1476999393",
    spotifyUrl: "https://open.spotify.com/album/61QJ2KeqKtNWhqL5nEoxx6",
  },
  {
    // TODO (client, handoff §7): platform + links (likely Bandcamp) + type/year.
    slug: "set-up",
    title: "Set Up",
    type: "Single",
    cover: "/releases/set-up.jpg",
  },
  {
    // TODO (client, handoff §7): platform + links (likely Bandcamp) + type/year.
    slug: "caramel-macchiato",
    title: "Caramel Macchiato",
    type: "Single",
    cover: "/releases/caramel-macchiato.jpg",
  },
];

/** Bio hooks — confirmed (§5). */
export const bio = {
  hook: "Started writing at nine, recorded his first song at thirteen.",
  long:
    "Born and raised in West Las Vegas, Spitta P — Tha Hyena — has spent a seven-year run turning the 7 into a sound. From This Tyme Around (2017) to Tha Hyena (2025), the catalog tracks an artist who builds his own world and runs the business behind it. HYENAZ MAFIA MEDIA is that business: the studio, the cameras, and the board.",
  affiliations: ["KingVay", "Greez Blanko", "D Cross"],
  features: ["Kae Jones", "Connie Pee", "D'arrick Dawayne", "Josh Dakid", "Chozen Ru", "Hitman Beatz"],
  press: ['Guest on the Las Vegas podcast "Views From The 7."'],
} as const;
