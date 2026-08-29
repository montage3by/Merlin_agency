import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * This sandbox pre-installs a full Chromium build under
 * $PLAYWRIGHT_BROWSERS_PATH, but the npm `playwright` package defaults to
 * launching a headless-shell build whose bundled revision doesn't always
 * match what's on disk here. We resolve the full Chromium binary explicitly
 * so `chromium.launch()` doesn't try (and fail) to find a headless-shell
 * revision that isn't installed.
 *
 * In a normal deployment (no pre-provisioned browsers dir, or a matching
 * revision), this resolves to `undefined` and Playwright falls back to its
 * own default resolution — so this is a no-op outside this environment.
 */
function resolveChromiumExecutablePath(): string | undefined {
  const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!browsersPath || !existsSync(browsersPath)) return undefined;

  let entries: string[];
  try {
    entries = readdirSync(browsersPath);
  } catch {
    return undefined;
  }

  const chromiumDir = entries.find(
    (entry) => entry.startsWith("chromium-") && !entry.includes("headless_shell"),
  );
  if (!chromiumDir) return undefined;

  const candidate = join(browsersPath, chromiumDir, "chrome-linux", "chrome");
  return existsSync(candidate) ? candidate : undefined;
}

export const CHROMIUM_EXECUTABLE_PATH = resolveChromiumExecutablePath();
