# HYENAZ MAFIA MEDIA — Project Kickoff & Style Bible

> **Status:** Pre-production / kickoff. This is the single source of truth for the engagement.
> **How to use:** `@import` this file into the project’s `CLAUDE.md`. The build runs on the **Apex Stack** (see `APEX-STACK.md`); every asset-generation rule in that tier defers to *this* document.
> **Last updated:** drafted at kickoff — keep current as items are confirmed.

-----

## 1. Client & Positioning

**Client:** Spitta P — Las Vegas hip-hop artist **and** business owner.
**Company:** **HYENAZ MAFIA MEDIA** (confirmed spelling — note the **Z**).
**Artist aliases:** Spitta P / Spitta_p (streaming) · “Tha Hyena” (Instagram handle / persona).

**Core positioning — non-negotiable:** the artist identity and the business-owner identity carry **equal weight** across every touchpoint. This dual identity is the strategic differentiator, not an afterthought. HYENAZ MAFIA MEDIA is the umbrella; Spitta P the artist is one face of it, the studio/production services the other.

**Umbrella → faces:**

- **HYENAZ MAFIA MEDIA** — the production house (audio production & mixing, videography, photography, studio).
- **Spitta P / Tha Hyena** — the recording artist (7-year catalog, active releases).

-----

## 2. Brand Palette

Crimson and pearl are sampled directly from the logo, so they’re exact. Champagne gold and smoke grey are defined to complement them. Black is the foundational canvas (every logo lives on black).

|Color                              |Hex      |RGB          |CMYK (approx, finalize at print)|Role                                                                                 |
|-----------------------------------|---------|-------------|--------------------------------|-------------------------------------------------------------------------------------|
|**Crimson Red** (primary accent)   |`#CF0B34`|207, 11, 52  |0 / 95 / 75 / 19                |Primary brand accent — the slash, CTAs, highlights                                   |
|**Crimson Shadow**                 |`#5F010F`|95, 1, 15    |0 / 99 / 84 / 63                |Depth, gradients, 3D shadow side, hover states                                       |
|**Pearl White** (wordmark)         |`#F6E5CC`|246, 229, 204|0 / 7 / 17 / 4                  |Wordmark, primary text on dark, warm light                                           |
|**Pearl Highlight**                |`#FEFEF1`|254, 254, 241|0 / 0 / 5 / 0                   |Specular highlights, brightest text                                                  |
|**Champagne Gold** (premium accent)|`#C8A862`|200, 168, 98 |0 / 16 / 51 / 22                |“Business owner” premium layer — dividers, foil/edge treatments, deposit/tier accents|
|**Gold Deep**                      |`#9C7B3A`|156, 123, 58 |0 / 21 / 63 / 39                |Gold gradients, metallic depth                                                       |
|**Smoke Grey** (neutral)           |`#3C4046`|60, 64, 70   |15 / 9 / 0 / 73                 |Secondary surfaces, cards, muted UI                                                  |
|**Smoke Mid**                      |`#74787E`|116, 120, 126|8 / 5 / 0 / 51                  |Borders, secondary text, captions                                                    |
|**Ink Black** (canvas)             |`#0B0B0D`|11, 11, 13   |rich black — see print spec     |Backgrounds, the field everything sits on                                            |

**Usage ratio (rough):** ~60% Ink Black canvas, ~20% Pearl, ~12% Crimson, ~8% Champagne Gold, Smoke Grey for structure. Gold is the lever that signals the *business/premium* side; crimson is the *artist/edge* side — balance them per page to honor the dual identity.

-----

## 3. Logo System

Three supplied variants, each with a locked role, plus the 3D asset.

|Asset                                      |File                      |Role                                                                                                                                                                                                                                 |
|-------------------------------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|**Primary / Hero** — lightning-slash lockup|`IMG_0256.PNG`            |Hero sections, intro, the source for the 3D asset. The showpiece.                                                                                                                                                                    |
|**Badge / Stamp** — bordered lockup        |`IMG_0255.PNG`            |Favicon, social avatar, watermark on photo/video work, merch patch. Contained + square-ish.                                                                                                                                          |
|**Clean Wordmark** — red on black          |`IMG_0254.PNG`            |Navbar lockup, inline/body usage, small sizes where legibility wins.                                                                                                                                                                 |
|**3D Logo** (unrigged)                     |`HYENAZ_MafiaMedia_3D.glb`|Loading transitions between sequences, the homepage intro, and the Studio page “3D lead-capture” centerpiece. glTF 2.0, ~6.9k tris, 198 KB, two materials (Cream_Pearl wordmark + Crimson_Slash on its own depth plane for parallax).|

**Rules:** the “HYENAZ” wordmark is custom hand-lettering — treat it as art, never re-typeset it in a font. Minimum clear space = height of the “H” on all sides. Never recolor outside the palette. Never place the black-field lockups on a busy/light background without the badge container.

-----

## 4. Typography

The logo lettering is bespoke, so the type system *supports* it rather than imitating it.

- **Display / impact:** **Anton** or **Bebas Neue** — tall, condensed, all-caps. Echoes the “MAFIA MEDIA” tagline bar. Use for section headers and big statements.
- **Grunge accent (sparing):** a distressed face such as **Rubik Distressed** / **Metal Mania** for one-off moments (drop titles, stamps). Never for body.
- **Body / UI:** **Inter** (or **Geist**, the Next.js-native pairing) — clean, neutral, highly legible. Use **tabular numerals** for pricing, deposits, and the booking UI.
- **Hierarchy:** display in Pearl or Crimson on Ink Black; body in Pearl/Smoke Mid; gold reserved for premium accents and numerals on the business side.

-----

## 5. Research Dossier (EPK + bio source material)

Built from public research. **Pull live streaming numbers from his own Spotify for Artists / Apple Music for Artists dashboards the day they’re published** — third-party aggregators returned conflicting, stale figures and are not trusted for this client.

### Confirmed

- **Origin:** West Las Vegas. Born-and-raised LV hip-hop/rap artist.
- **Story hook:** started writing music at **nine**, recorded his first song at **thirteen** (per his Spotify bio).
- **Catalog (Apple Music), 7-year run:** *Tha Hyena* (2025) · *Escapin’ Depression 2* (2023) · *Introversion* (2022) · *Master Mind* (2020) · *In My Feelings* (2019) · *This Tyme Around 2* (2018) · *This Tyme Around* (2017). Recent singles: *Walahi*, *Blessings* (2026) · *Public Enemy* (2025) · *Why Explain* EP, *Stone Cold*, *Grind It Out* (2024). Music videos 2022–2023.
- **Platforms:** Apple Music, Spotify, SoundCloud, Instagram (**@spitta_p**, display name “Tha Hyena”).
- **Scene / affiliations:** grouped with **KingVay**, **Greez Blanko** (a.k.a. Greaze Blanco), and **D Cross** in the LV scene. Featured on tracks by Kae Jones, Connie Pee, D’arrick Dawayne, Josh Dakid, Chozen Ru, Hitman Beatz.
- **Press:** guest on the Las Vegas podcast **“Views From The 7.”**

### Confirm with client before publishing

- **Real / legal name** — an older platform surfaced one tied to “Spitta P / West Las Vegas.” Single, dated source. His call whether a legal name appears in the EPK at all.
- **Live stats** — current monthly listeners / followers / video views (dashboards, day-of).
- **Business specifics** — service rates, the three deposit tiers, gear list, studio address/hours, booking availability windows.
- **Assets from client** — any pro photos, press shots, logos in vector, prior press links, music video embeds.

-----

## 6. Deliverables Roadmap

Sequence (locked): **Brand Deck → Website → EPK.**

> **Creative principle:** every artist gets a **wholly original concept** — no template reuse across clients. Nothing here is ported from a prior project; the content-calendar idea and brand-deck direction are built fresh for HYENAZ MAFIA MEDIA / Spitta P.

### Phase 1 — Brand Deck (Style Bible, client-facing)

The brand foundation, packaged for the client. Includes: palette (this doc’s values), full logo system + usage rules, the 3D asset, typography, voice/positioning (dual identity), **borders & frames**, **social post templates**, and a **content calendar built as an original concept unique to this artist** (not a reused template). Assets generated per the Apex asset module (Higgsfield + Canva), all conforming to this palette.

### Phase 2 — Website (HYENAZ MAFIA MEDIA)

Built on the **Apex Stack**. Architecture (service-based, page-per-offering):

- **Home / umbrella** — HYENAZ MAFIA MEDIA. The 3D intro reveal; the 3D asset reappears on load transitions between sequences.
- **Audio Production / Music Production** (paired)
- **Videography / Photography** (paired) — Embla galleries fed by Sanity.
- **The Studio** — its own entity: Cal.com booking with Google Calendar sync, Stripe deposits across the three service tiers, and the **3D lead-capture** centerpiece (visitor engages the 3D object → opens into booking/contact capture).

### Phase 3 — EPK

Digital EPK + one-page PDF, built from the Research Dossier (§5) and this brand. Dual-identity framing throughout: artist bio + catalog + press on one side, HYENAZ MAFIA MEDIA services on the other.

-----

## 7. Tech Stack (Website)

**Apex Stack — 13 tools** (full spec in `APEX-STACK.md`):
Next.js · Tailwind · Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber + drei · Sanity · React Hook Form + Zod · @react-three/postprocessing · shadcn/ui · **Stripe** (deposits/tiers) · **Cal.com** (booking + Google Calendar) · Embla Carousel.

**Asset & Background module (MCP, uncounted):** Higgsfield (hero loops, animated backgrounds, brand films) · Canva (on-brand graphics, backgrounds, frames, templates) · ElevenLabs (audio branding, if scoped). Every generated asset conforms to §2–§4.

-----

## 8. Open Questions / Next Actions

1. **Brand-deck format** — presentation deck (.pptx) or PDF?
1. **Real-name decision** for the EPK (§5).
1. **Studio details** — rates, three deposit tiers + amounts, gear, address/hours, availability (§5).
1. **Accounts to provision** before Phase 2 wiring: Stripe (keys + webhook), Cal.com (+ connected Google Calendar), Sanity (project + schema).
1. **Client assets** — vector logos, pro photography, music-video embeds, prior press links.
1. **Confirm tier name** “Apex” and the “3D lead-capture” interaction model.