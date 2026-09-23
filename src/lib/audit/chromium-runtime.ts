import type { Browser, LaunchOptions } from "patchright";
import { chromium as patchrightChromium } from "patchright";
import { CHROMIUM_EXECUTABLE_PATH } from "./chromium-path";

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

/**
 * Patchright is a drop-in, stealth-patched Playwright driver (same API,
 * patches how it talks to Chromium over CDP to avoid automation
 * fingerprinting — no special browser binary required). Proven live against
 * Google Ads Transparency Center: our plain playwright-core requests were
 * silently served an empty/blocked result, patchright got the real page on
 * the first try. It replaces playwright-core/playwright everywhere in this
 * project, in both runtime paths below — only the underlying Chromium
 * *binary* still differs by environment.
 *
 * On Vercel/Lambda a normal Chromium download is far too big for the
 * function bundle, so we use @sparticuz/chromium there — a build
 * compressed to fit serverless size limits — driven through patchright.
 * Locally (and in this sandbox) patchright drives the same Chromium binary
 * this environment already has via CHROMIUM_EXECUTABLE_PATH.
 */
async function launchServerless(baseOptions: LaunchOptions): Promise<Browser> {
  const { default: chromium } = await import("@sparticuz/chromium");

  return patchrightChromium.launch({
    ...baseOptions,
    args: [...chromium.args, ...(baseOptions.args ?? [])],
    executablePath: await chromium.executablePath(),
  });
}

async function launchLocal(baseOptions: LaunchOptions): Promise<Browser> {
  return patchrightChromium.launch({
    ...baseOptions,
    executablePath: CHROMIUM_EXECUTABLE_PATH,
  });
}

export function launchChromium(baseOptions: LaunchOptions = {}): Promise<Browser> {
  return isServerlessRuntime() ? launchServerless(baseOptions) : launchLocal(baseOptions);
}
