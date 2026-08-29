import type { Browser, LaunchOptions } from "playwright-core";
import { CHROMIUM_EXECUTABLE_PATH } from "./chromium-path";

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

/**
 * On Vercel/Lambda a normal Chromium download is far too big for the
 * function bundle, so we use @sparticuz/chromium there — a build
 * specifically compressed to fit serverless size limits — driven through
 * playwright-core (which has no bundled browser of its own).
 *
 * Locally (and in this sandbox) we use the full `playwright` package,
 * which manages its own downloaded browser via `npx playwright install`.
 * `playwright` is a devDependency only — it is never imported on the
 * serverless path, so it doesn't ship in the production bundle.
 */
async function launchServerless(baseOptions: LaunchOptions): Promise<Browser> {
  const [{ default: chromium }, { chromium: playwrightChromium }] = await Promise.all([
    import("@sparticuz/chromium"),
    import("playwright-core"),
  ]);

  return playwrightChromium.launch({
    ...baseOptions,
    args: [...chromium.args, ...(baseOptions.args ?? [])],
    executablePath: await chromium.executablePath(),
  });
}

async function launchLocal(baseOptions: LaunchOptions): Promise<Browser> {
  const { chromium } = await import("playwright");
  return chromium.launch({
    ...baseOptions,
    executablePath: CHROMIUM_EXECUTABLE_PATH,
  });
}

export function launchChromium(baseOptions: LaunchOptions = {}): Promise<Browser> {
  return isServerlessRuntime() ? launchServerless(baseOptions) : launchLocal(baseOptions);
}
