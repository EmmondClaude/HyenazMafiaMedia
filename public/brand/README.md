# /public/brand — asset drop-zone

The Style Bible (`docs/KICKOFF.md` §3) specifies supplied brand art that was
**not** included in the source repo. Drop the real files here and the site
upgrades from the on-brand stand-ins to the actual assets.

| Expected file              | Used by                                   | Current stand-in                |
| -------------------------- | ----------------------------------------- | ------------------------------- |
| `IMG_0256.PNG`             | Hero / primary lightning-slash lockup     | `Hero3D` (CSS/SVG)              |
| `IMG_0255.PNG`             | Badge / favicon / social avatar / watermark | —                             |
| `IMG_0254.PNG`             | Clean wordmark — navbar lockup            | `Logo` (SVG)                    |
| `HYENAZ_MafiaMedia_3D.glb` | 3D intro + Studio 3D lead-capture         | `Hero3D` parallax planes        |

## Rules (non-negotiable on Apex)

- The "HYENAZ" wordmark is **bespoke hand-lettering** — never re-typeset it in
  a font. Treat the supplied art as art.
- Never recolor outside the palette (`src/lib/brand.ts` / `globals.css`).
- Ship the GLB meshopt- or Draco-compressed; lazy-load via dynamic import +
  `Suspense` so WebGL never blocks first paint (APEX-STACK §Performance).
- Keep generated assets versioned here and **log their generation prompts** in
  the Style Bible so any asset is reproducible.
