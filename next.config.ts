import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `images.remotePatterns`: every catalog asset and category banner is a local file
  // under public/images/products/. The project's Vercel Blob store is over its plan quota
  // and returns 403, so nothing is loaded from a remote host any more.
};

export default nextConfig;
