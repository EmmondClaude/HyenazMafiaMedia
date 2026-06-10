# APEX-STACK.md — Agency Build Guide (Apex Tier)

## How to use this file

This is a **companion to `CLAUDE.md`**. It defines one tier only: the **Apex Stack**, which sits one level above Maximal. Everything in `CLAUDE.md` still applies — the always-on baseline, the Foundation → Signature → Maximal presets, the Git workflow, and the Code Quality Defaults all carry forward unchanged.

When the user says **“use the Apex stack,”** build on a full Maximal install and then add the five tools below. Keep this file lean and reusable: per-project visual direction lives in that project’s **kickoff / Style Bible**, which you `@import` into the project’s own `CLAUDE.md`.

> **Apex is the “can we actually pull this off” tier.** Flagship brand sites, experience-led work, builds where generated media and 3D *are* the product. **Intricacy is a must — but never at the cost of open time.** The whole reputation of this tier is heavy visuals that still load fast.

-----

## Inherits everything below (not re-counted here)

- **Always-on:** TypeScript (strict), ESLint + Prettier, Vercel deploy, `next/image`, `next/font`, `prefers-reduced-motion` on all motion
- **Foundation (1–3):** Next.js · Tailwind CSS · Motion
- **Signature (4–5):** GSAP + ScrollTrigger · Lenis
- **Maximal (6–8):** React Three Fiber + drei · Sanity · React Hook Form + Zod

-----

## Apex Stack — 13 tools

**Use for:** the agency’s own flagship work, experience-led brand sites, full-service clients whose offer is visual (studios, production houses, creative talent). Adds cinematic finish, crafted UI, real transactions, real scheduling, and gallery craft on top of Maximal.

**Adds to Maximal**

1. **@react-three/postprocessing** — `EffectComposer` pipeline layered over the R3F scene: bloom, chromatic aberration, film grain/noise, vignette, depth of field. This is the cinematic finish on 3D hero moments and WebGL backgrounds. Effect intensities are driven by scroll progress (see Animation & Render Lanes), never by a second scroll library.
1. **shadcn/ui (Radix UI + CVA + tailwind-merge)** — crafted, accessible component layer: dialogs, popovers, sheets, tabs, command menus, toasts. Owns booking flows, service-tier selectors, and navigation. Composes with the inherited React Hook Form + Zod for all forms. Components are copied into the repo (`/components/ui`), so they’re fully themeable to the project palette.
1. **Stripe** (`stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`) — deposits and tiered service payments. Payment Element + Checkout on the client; a server route + webhook to confirm bookings and record deposits. This is the “bridge to the phase-2 lead stack” referenced in Maximal.
1. **Cal.com** (`@calcom/embed-react` + Cal API) — booking engine with native two-way **Google Calendar** sync, availability windows, buffers, and per-service event types. Embedded and fully brandable. Swap options if a client insists: Acuity or Calendly — but Cal.com is the default for brand control.
1. **Embla Carousel** (`embla-carousel-react` + `embla-carousel-autoplay`) — performant, gesture-friendly galleries and sliders for videography/photography portfolios and case studies. Pulls media from Sanity. Lightweight; respects reduced-motion (autoplay off).

**Setup (after a full Maximal install)**

```bash
# 9 — 3D postprocessing
npm install @react-three/postprocessing postprocessing

# 10 — crafted UI layer (CLI wires Radix + CVA + tailwind-merge)
npx shadcn@latest init

# 11 — payments / deposits
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

# 12 — booking + Google Calendar sync
npm install @calcom/embed-react

# 13 — brand galleries
npm install embla-carousel-react embla-carousel-autoplay
```

> **External accounts required before wiring:** Stripe (keys + webhook endpoint), Cal.com (account + connected Google Calendar), Sanity (project + schema, per Maximal). Provision these first; never block a build waiting on a dashboard mid-session.

-----

## Asset & Background Generation Module (MCP)

These generate **assets** — backgrounds, hero loops, textures, frames, social cuts, voice. They are **not** part of the web build and do **not** count toward the tier’s 13 tools. This is the same pattern as the Signature Creative Media Module, expanded. Enable per project.

- **Higgsfield** — AI video + image. Animated hero loops, loopable background plates, brand films, social cuts, R3F environment/texture sources. Supports a trained **Soul** for consistent on-brand talent across shots.
- **Canva** — on-brand graphics, layouts, export-ready backgrounds, borders/frames, social templates, and marketing collateral. Use for anything that needs precise layout control or fast template iteration.
- **ElevenLabs** — AI voice / audio branding / VO (carried from the Signature module). Enable only when scope calls for narration or sonic branding.

**One-time setup in Claude Code** (restart the session after adding — MCP servers only register on add)

```bash
# Canva — remote HTTP server (authenticate in-session via /mcp if prompted)
claude mcp add --transport http canva https://mcp.canva.com/mcp

# Higgsfield — remote HTTP server (per Signature module)
claude mcp add --transport http higgsfield https://mcp.higgsfield.ai/mcp

# ElevenLabs — official MCP server (needs uv + an ElevenLabs API key)
claude mcp add elevenlabs --env ELEVENLABS_API_KEY=YOUR_KEY -- uvx elevenlabs-mcp

claude mcp list   # verify
```

**Asset rules — non-negotiable on Apex**

- **Branding is law.** Every generated asset must conform to the active project’s **kickoff / Style Bible** — palette, type system, logo system, and mood. If it doesn’t match the brand, it doesn’t ship. Generated ≠ exempt from brand review.
- **Where assets land in the build:** postprocessing background plates → R3F textures / env maps → Embla gallery media → OG/social cards → section dividers and frames.
- **Keep sources versioned.** Store finished brand assets in `/public/brand/` and **log the generation prompts** in the Style Bible so any asset is reproducible later.
- **Generate to spec, not to vibe.** Pull exact hex values and the logo system from the kickoff file into the prompt every time.

-----

## Animation & Render Lanes (extends the Maximal rules)

With Motion, GSAP, R3F, postprocessing, and Lenis all live, lane discipline is what keeps Apex from turning into jank. Decide lanes per project up front.

- **GSAP + ScrollTrigger** — scroll-driven sequences, pinned 3D moments, the showpiece timelines. **Single owner of scroll-linked motion.**
- **Motion** — component-level entrances, hovers, page transitions. No scroll-linked work.
- **R3F + postprocessing** — the WebGL layer. Effect uniforms and intensities are driven by a **shared scroll-progress value from GSAP/Lenis** — never a second scroll listener.
- **Lenis** — the single smooth-scroll source of truth. Bind `ScrollTrigger.scrollerProxy` to Lenis so GSAP and the smooth scroll agree.
- **Never run two libraries on the same animation.** (Carried verbatim from `CLAUDE.md`.)
- **`prefers-reduced-motion`:** heavy effects (bloom / chromatic aberration / DOF) downgrade to static; carousels disable autoplay; the 3D hero falls back to a static render or the flat logo. This is mandatory, not optional.

-----

## Performance Guardrails (intricacy without bloat)

3D plus generated media is heavy by default. Apex earns its name only if it still opens fast.

- **GLB:** ship meshopt- or Draco-compressed. Lazy-load the 3D via dynamic import + `Suspense` so WebGL never blocks first paint. `<Preload>` only what the first view needs.
- **Backgrounds:** prefer a shader or a compressed looping video (AV1/H.265 + WebM fallback) over giant GIFs. Poster frame, `muted playsInline autoplay`, and pause offscreen via `IntersectionObserver`.
- **Images:** AVIF/WebP through `next/image`; Sanity image CDN with width hints and blur placeholders.
- **Postprocessing:** cap DPR (≤ 2), use half-res effect buffers where the look allows, and disable the composer entirely under reduced-motion or on low-power devices.
- **Third-party scripts:** route analytics/pixels through **Partytown** (web worker) to protect the main thread and open time.
- **Budget:** target LCP < 2.5s. Code-split 3D and effects out of the initial route bundle. If a section can’t hit budget, simplify the section — not the budget.

-----

## Security & Environment

- All third-party keys live in env (`.env.local` locally, Vercel project envs in prod). **Never commit** Stripe, Cal.com, Sanity, or ElevenLabs secrets.
- Stripe secret key and webhook signing secret are server-only — never expose in client bundles. Use the publishable key on the client.
- Validate every payment and booking server-side (Zod schemas + Stripe webhook signature verification). Never trust client-reported amounts.

-----

## Git Workflow & Code Quality

Inherits **all** of `CLAUDE.md` unchanged — conventional commits, commit-after-each-unit-of-work, push each session, branch-before-risky-work, never force-push `main`, Server Components by default, design tokens over arbitrary Tailwind values, no unexplained `any`.

-----

## Apex Kickoff Checklist (in addition to the base checklist)

When starting an Apex project, confirm with the user:

1. Tier confirmed = **Apex**, and project name (repo + Vercel).
1. **Payments:** which service tiers, what deposit rules and amounts (audio / video / photo)?
1. **Scheduling:** which Google account syncs to Cal.com? Availability windows, buffers, per-service event types?
1. **Asset plan:** what’s generated in **Higgsfield** vs **Canva** (backgrounds, hero loops, frames), and is the **Style Bible locked** — palette, logo system, and any 3D assets?
1. **Animation lanes** assigned (GSAP vs Motion) for this project.
1. **Modules to skip?** (e.g., no voiceover → skip ElevenLabs; CMS-light → trim Sanity scope.)