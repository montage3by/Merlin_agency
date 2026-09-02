import type { Browser, BrowserContext } from "playwright-core";
import { launchChromium } from "./chromium-runtime";

const HUMAN_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

let browserPromise: Promise<Browser> | null = null;

/**
 * Some hosting/dev environments (this sandbox included) require all
 * outbound HTTPS to go through a proxy — Chromium doesn't pick that up
 * from the process env on its own. Forward it explicitly when present;
 * this is a no-op wherever HTTPS_PROXY isn't set (normal deployments).
 */
function resolveProxyConfig() {
  const server = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!server) return undefined;
  const bypass = process.env.NO_PROXY || process.env.no_proxy;
  return { server, ...(bypass ? { bypass } : {}) };
}

async function getBrowser(): Promise<Browser> {
  if (browserPromise) {
    const existing = await browserPromise.catch(() => null);
    if (existing?.isConnected()) return existing;
    browserPromise = null;
  }
  browserPromise = launchChromium({
    headless: true,
    proxy: resolveProxyConfig(),
  });
  return browserPromise;
}

/**
 * One shared Chromium instance serves every check in an audit run (own
 * site + each competitor, across both ad channels). Under concurrent
 * navigations to heavy pages like Meta Ad Library, that process can crash
 * mid-request inside a memory-constrained serverless function, taking
 * every in-flight context down with it ("Target page, context or browser
 * has been closed"). Retry once against a freshly launched browser rather
 * than surfacing that as a false "no ads found".
 */
export async function withBrowserContext<T>(
  fn: (context: BrowserContext) => Promise<T>,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    let browser: Browser;
    try {
      browser = await getBrowser();
    } catch (error) {
      browserPromise = null;
      lastError = error;
      continue;
    }

    let context: BrowserContext | undefined;
    try {
      context = await browser.newContext({
        userAgent: HUMAN_USER_AGENT,
        locale: "ru-RU",
        viewport: { width: 1366, height: 900 },
      });
      return await fn(context);
    } catch (error) {
      // `browser.isConnected()` can still report true for a moment after
      // the underlying process has actually died, so don't gate the retry
      // on it — any failure here forces a fresh browser on the next
      // attempt rather than reusing one we now know is bad.
      browserPromise = null;
      lastError = error;
      continue;
    } finally {
      if (context) await context.close().catch(() => {});
    }
  }
  throw lastError;
}

export async function closeSharedBrowser(): Promise<void> {
  if (browserPromise) {
    const browser = await browserPromise;
    await browser.close();
    browserPromise = null;
  }
}
