import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Chromium-launching packages out of the serverless bundle trace —
  // @sparticuz/chromium ships its own binary and patchright resolves its
  // browser at runtime, not at bundle time.
  serverExternalPackages: ["patchright", "@sparticuz/chromium"],
};

export default nextConfig;
