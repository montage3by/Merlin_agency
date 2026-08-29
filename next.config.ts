import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Chromium-launching packages out of the serverless bundle trace —
  // @sparticuz/chromium ships its own binary and playwright/playwright-core
  // resolve their browser at runtime, not at bundle time.
  serverExternalPackages: ["playwright", "playwright-core", "@sparticuz/chromium"],
};

export default nextConfig;
