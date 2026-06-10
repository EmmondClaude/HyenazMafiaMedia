@AGENTS.md

# HYENAZ MAFIA MEDIA

Project source of truth. The two documents below are the engagement contract —
the Style Bible governs every visual decision; the Apex Stack governs the build.

@docs/KICKOFF.md
@docs/APEX-STACK.md

## Where the spec lives in code

- **Palette / type tokens** — `src/app/globals.css` (`@theme`) + `src/lib/brand.ts`
- **Content (catalog, bio, services, tiers)** — `src/lib/brand.ts`
- **Brand art drop-zone** — `public/brand/` (see its README)
- **Integration keys** — `.env.example`

## Build notes

- Stack realized so far: Next.js 16 (App Router) · Tailwind v4 · Motion · Embla.
  Stripe / Cal.com / Sanity / R3F are scaffolded as integration points that
  degrade gracefully until their accounts/assets are provisioned — never block a
  build on a dashboard (APEX-STACK §Setup).
- Motion is the component-entrance lane only; scroll-linked motion is reserved
  for GSAP when added (APEX-STACK §Animation & Render Lanes).
- `prefers-reduced-motion` downgrades heavy motion to static — mandatory.
