/**
 * Hero 3D assets — generated in Higgsfield (Nano Banana Pro, 2K), on-brand to
 * the Style Bible palette: isolated 3D renders on a pure ink-black field so
 * they melt into the canvas.
 *
 * These currently point at the Higgsfield CDN because the build environment's
 * network policy blocked downloading the bytes into the repo. To version them
 * properly: drop the PNGs into /public/brand and switch each `src` to the local
 * path (e.g. "/brand/hero-camera.png"). The OrbitHero and next.config
 * remotePattern need no other changes.
 */

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3ECGVFZTaGiKHb6MBbVpPbvllLv";

export const heroAssets = {
  camera: {
    src: `${CDN}/hf_20260610_222253_43960781-43f1-42c7-b920-72a2b753070d.png`,
    alt: "3D cinema camera — HYENAZ MAFIA MEDIA videography",
  },
  mic: {
    src: `${CDN}/hf_20260610_222256_d3cb8bce-9485-48d3-927a-2f9e68067285.png`,
    alt: "3D studio microphone — HYENAZ MAFIA MEDIA audio production",
  },
  logo: {
    src: `${CDN}/hf_20260610_222300_b1940d2a-1b9b-4bd2-a45b-36bbc7fb022d.png`,
    alt: "HYENAZ MAFIA MEDIA 3D logo emblem",
  },
} as const;
