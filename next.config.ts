import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Higgsfield CDN — hero 3D renders (camera / mic / logo). Vercel's image
    // optimizer fetches + caches these server-side. Swap to /public/brand once
    // the bytes can be versioned locally (see public/brand/README).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
