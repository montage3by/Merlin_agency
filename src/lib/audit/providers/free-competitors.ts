import { withBrowserContext } from "../browser";
import type { CompetitorDiscoveryProvider } from "./types";
import type { BusinessInput, CompetitorProfile } from "../types";

const AGGREGATOR_HOST_FRAGMENTS = [
  "google.",
  "youtube.",
  "wikipedia.org",
  "facebook.com",
  "instagram.com",
  "vk.com",
  "2gis.",
  "yandex.",
  "maps.app",
  "linkedin.com",
  "t.me",
  "wa.me",
];

function extractDomain(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");
    return host;
  } catch {
    return null;
  }
}

function isAggregator(host: string): boolean {
  return AGGREGATOR_HOST_FRAGMENTS.some((fragment) => host.includes(fragment));
}

function normalizeDomain(domain: string): string {
  return domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/**
 * Free/no-key competitor discovery: renders a real Google search results
 * page in headless Chromium (so it sees the same rendered page a human
 * would) and reads the organic result domains. Best-effort — Google's
 * markup and consent flows change often and this has no guarantee against
 * being blocked at higher volume. Swap in a paid SERP API for reliability
 * at scale.
 */
export class FreeSearchCompetitorProvider implements CompetitorDiscoveryProvider {
  readonly name = "free-google-serp";

  async findCompetitors(
    input: BusinessInput,
    limit: number,
  ): Promise<CompetitorProfile[]> {
    const ownDomain = normalizeDomain(input.domain);
    const results: CompetitorProfile[] = [];
    const seen = new Set<string>([ownDomain]);

    for (const known of input.knownCompetitors ?? []) {
      const domain = normalizeDomain(known);
      if (!domain || seen.has(domain)) continue;
      seen.add(domain);
      results.push({ domain, name: domain, discoverySource: "user-provided" });
    }

    if (results.length >= limit) {
      return results.slice(0, limit);
    }

    const query = [input.niche, input.city].filter(Boolean).join(" ").trim();
    if (!query) {
      return results;
    }

    try {
      const discovered = await withBrowserContext(async (context) => {
        const page = await context.newPage();
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
          query,
        )}&hl=ru&num=20`;
        await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 15_000 });

        // Best-effort consent dismissal; harmless no-op if not present.
        const consentButton = page.locator(
          'button:has-text("Принять все"), button:has-text("Accept all")',
        );
        if (await consentButton.first().isVisible().catch(() => false)) {
          await consentButton.first().click().catch(() => {});
        }

        const hrefs = await page.$$eval("a[href^='http']", (anchors) =>
          anchors.map((a) => a.getAttribute("href") ?? ""),
        );

        const domains: string[] = [];
        for (const href of hrefs) {
          const host = extractDomain(href);
          if (!host || isAggregator(host)) continue;
          if (!domains.includes(host)) domains.push(host);
        }
        return domains;
      });

      for (const domain of discovered) {
        if (seen.has(domain) || results.length >= limit) continue;
        seen.add(domain);
        results.push({ domain, name: domain, discoverySource: "search-results" });
      }
    } catch {
      // Search scrape is best-effort; fall back to whatever we already have
      // (user-provided competitors, if any). The audit engine surfaces a
      // note when the competitor list ends up empty.
    }

    return results.slice(0, limit);
  }
}
