import { chromium, type Browser, type BrowserContext } from "playwright";
import { CHROMIUM_EXECUTABLE_PATH } from "./chromium-path";

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

function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = chromium.launch({
      headless: true,
      executablePath: CHROMIUM_EXECUTABLE_PATH,
      proxy: resolveProxyConfig(),
    });
  }
  return browserPromise;
}

export async function withBrowserContext<T>(
  fn: (context: BrowserContext) => Promise<T>,
): Promise<T> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    userAgent: HUMAN_USER_AGENT,
    locale: "ru-RU",
    viewport: { width: 1366, height: 900 },
  });
  try {
    return await fn(context);
  } finally {
    await context.close();
  }
}

export async function closeSharedBrowser(): Promise<void> {
  if (browserPromise) {
    const browser = await browserPromise;
    await browser.close();
    browserPromise = null;
  }
}
