# HYENAZ MAFIA MEDIA

The flagship brand site for **HYENAZ MAFIA MEDIA** — a Las Vegas production
house — and **Spitta P (“Tha Hyena”)**, the recording artist behind it. Built
to the project Style Bible and the Apex Stack build guide (both in [`docs/`](./docs)).

> **Dual identity is the whole point.** The business and the artist carry equal
> weight on every page. Crimson is the artist/edge; champagne gold is the
> business/premium side — balanced per page.

## Pages

| Route         | What it is                                                            |
| ------------- | --------------------------------------------------------------------- |
| `/`           | Umbrella home — the 3D intro reveal + dual-identity framing            |
| `/production` | Audio Production + Music Production (paired)                          |
| `/visuals`    | Videography + Photography — Embla galleries                          |
| `/studio`     | The Studio — service tiers, 3D lead-capture, booking + deposits      |
| `/epk`        | Electronic press kit — bio, 7-year catalog, affiliations, press      |

## Stack

Realized now: **Next.js 16** (App Router, TS strict) · **Tailwind v4** ·
**Motion** · **Embla Carousel**.

Scaffolded as graceful integration points (provision accounts, then wire — the
build never blocks on a dashboard):

- **Cal.com** booking + Google Calendar — set `NEXT_PUBLIC_CALCOM_LINK`
- **Stripe** deposits across the three tiers — server-validated
- **Sanity** for the video/photo portfolio
- **React Three Fiber + postprocessing** for the real `.glb` 3D hero

See [`.env.example`](./.env.example) for keys and [`docs/APEX-STACK.md`](./docs/APEX-STACK.md)
for the full tier spec.

## Brand assets

The supplied logo art and 3D `.glb` were not in the source repo. On-brand
stand-ins ship in their place; drop the real files into
[`public/brand/`](./public/brand/) to upgrade (see that folder's README).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Brand system

- **Palette & type tokens:** `src/app/globals.css` (`@theme`)
- **Content (catalog, bio, services, tiers):** `src/lib/brand.ts`
- **Components:** `src/components/`

All colors are exact hex from the Style Bible §2; type is Anton (display) +
Inter (body), with tabular numerals on pricing. `prefers-reduced-motion`
downgrades all heavy motion to static.
