import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Chromium-launching packages out of the serverless bundle trace —
  // @sparticuz/chromium ships its own binary and patchright resolves its
  // browser at runtime, not at bundle time.
  serverExternalPackages: ["patchright", "@sparticuz/chromium"],
  // patchright-core reads browsers.json via `fs.readFileSync(path.join(__dirname, ...))`
  // at runtime, which Next's file-tracer can't follow statically — force it in,
  // or the deployed function throws "Cannot find module .../patchright-core/browsers.json".
  outputFileTracingIncludes: {
    "/api/audit": ["./node_modules/patchright-core/browsers.json"],
  },
};

export default nextConfig;
