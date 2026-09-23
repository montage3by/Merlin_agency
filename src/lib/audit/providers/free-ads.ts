import { withBrowserContext } from "../browser";
import type { AdIntelligenceProvider } from "./types";
import type { AdChannelFinding, AdIntelligence } from "../types";

/**
 * Free/no-key ad intelligence: reads the two official public ad-transparency
 * tools (Google Ads Transparency Center, Meta Ad Library) with a headless
 * browser so the pages render like they would for a human visitor. These
 * are the only lawful public windows into a competitor's ad activity —
 * actual targeting settings are private to the advertiser and cannot be
 * observed from outside. Best-effort: if either page's markup doesn't match
 * (they change without notice), we report "не удалось проверить" rather
 * than guessing.
 */
export class FreeAdTransparencyProvider implements AdIntelligenceProvider {
  readonly name = "free-ad-transparency";

  async getAdIntelligence(
    domain: string,
    companyName: string | undefined,
  ): Promise<AdIntelligence> {
    const [googleFinding, metaFinding] = await Promise.all([
      this.checkGoogleAdsTransparency(domain),
      this.checkMetaAdLibrary(companyName ?? domain),
    ]);

    return {
      domain,
      channels: [googleFinding, metaFinding],
    };
  }

  private async checkGoogleAdsTransparency(domain: string): Promise<AdChannelFinding> {
    const checkedUrl = `https://adstransparency.google.com/?domain=${encodeURIComponent(
      domain,
    )}&region=anywhere`;
    const notes: string[] = [];

    try {
      const result = await withBrowserContext(async (context) => {
        const page = await context.newPage();
        await page.goto(checkedUrl, { waitUntil: "domcontentloaded", timeout: 10_000 });
        await page.waitForTimeout(1800);

        const bodyText = await page.innerText("body").catch(() => "");
        const noResults = /did.?n.?t run any ads|no ads|нет объявлений|0 (ads|объявлени)/i.test(
          bodyText,
        );
        // The page states the count as visible text ("69 ads" / "69 объявлений"),
        // not a fixed DOM element/class we can select reliably long-term.
        const countMatch = bodyText.match(/([\d][\d,\s]*)\s*(ads?|объявлени\w*)\b/i);
        const count = countMatch ? Number(countMatch[1].replace(/[,\s]/g, "")) : 0;

        // TEMP DEBUG: remove once we've confirmed what Vercel's IP actually
        // gets back from this page (may differ from what a residential/
        // sandbox IP sees, e.g. a stricter empty state served to datacenter
        // IP ranges regardless of browser stealth).
        console.error(
          "GAT_DEBUG",
          domain,
          "len=" + bodyText.length,
          JSON.stringify(bodyText.slice(0, 300)),
        );

        return { count, noResults };
      });

      return {
        channel: "google_ads_transparency",
        isActive: result.count > 0 && !result.noResults,
        creativeCount: result.count,
        sampleCreatives: [],
        checkedUrl,
        notes:
          result.count > 0 && !result.noResults
            ? [`Google Ads Transparency Center показывает ${result.count} объявлений.`]
            : ["Активных объявлений в Google Ads Transparency Center не обнаружено."],
      };
    } catch (error) {
      notes.push(
        `Не удалось автоматически проверить Google Ads Transparency Center (${
          error instanceof Error ? error.message : "ошибка загрузки"
        }). Проверьте вручную по ссылке.`,
      );
      return {
        channel: "google_ads_transparency",
        isActive: false,
        creativeCount: 0,
        sampleCreatives: [],
        checkedUrl,
        notes,
      };
    }
  }

  private async checkMetaAdLibrary(query: string): Promise<AdChannelFinding> {
    const checkedUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=${encodeURIComponent(
      query,
    )}&search_type=keyword_unordered&media_type=all`;
    const notes: string[] = [];

    try {
      const result = await withBrowserContext(async (context) => {
        const page = await context.newPage();
        await page.goto(checkedUrl, { waitUntil: "domcontentloaded", timeout: 10_000 });
        await page.waitForTimeout(1200);

        const bodyText = await page.innerText("body").catch(() => "");
        const noResults = /no results found|ничего не найдено|0 results/i.test(bodyText);
        const resultCountMatch = bodyText.match(/~?([\d,]+) results?/i);
        const approxCount = resultCountMatch
          ? Number(resultCountMatch[1].replace(/,/g, ""))
          : 0;

        return { noResults, approxCount };
      });

      return {
        channel: "meta_ad_library",
        isActive: !result.noResults && result.approxCount > 0,
        creativeCount: result.approxCount,
        sampleCreatives: [],
        checkedUrl,
        notes:
          result.approxCount > 0
            ? [`Meta Ad Library показывает примерно ${result.approxCount} результатов.`]
            : ["Активных объявлений в Meta Ad Library не обнаружено (или бренд не найден по названию)."],
      };
    } catch (error) {
      notes.push(
        `Не удалось автоматически проверить Meta Ad Library (${
          error instanceof Error ? error.message : "ошибка загрузки"
        }). Проверьте вручную по ссылке.`,
      );
      return {
        channel: "meta_ad_library",
        isActive: false,
        creativeCount: 0,
        sampleCreatives: [],
        checkedUrl,
        notes,
      };
    }
  }
}
