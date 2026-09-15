import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product art uploaded through /admin is served from the project's Vercel Blob store, and
    // some older catalog records still point at Unsplash. next/image refuses any host that is
    // not listed here, so both have to be declared for the category decks to render.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
