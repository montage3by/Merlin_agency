import * as cheerio from "cheerio";
import type { SeoProvider } from "./types";
import type { SeoSnapshot } from "../types";

const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function toHomepageUrl(domain: string): string {
  return domain.startsWith("http") ? domain : `https://${domain}`;
}

async function checkSitemapExists(baseUrl: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(new URL("/sitemap.xml", baseUrl).toString(), {
      method: "HEAD",
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Free/no-key SEO snapshot: fetches the public homepage and reads on-page
 * signals only (title, meta description, heading/word counts, sitemap,
 * blog link). No traffic/keyword-ranking data — swap in a paid provider
 * (SimilarWeb/SEMrush/Ahrefs/Serpstat) for that.
 */
export class FreeOnPageSeoProvider implements SeoProvider {
  readonly name = "free-on-page";

  async getSeoSnapshot(domain: string): Promise<SeoSnapshot> {
    const baseUrl = toHomepageUrl(domain);
    const notes: string[] = [
      "Источник: публичная главная страница сайта (без данных о трафике и позициях в поиске).",
    ];

    try {
      const res = await fetchWithTimeout(baseUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MerlinAuditBot/1.0)" },
      });
      if (!res.ok) {
        notes.push(`Сайт вернул статус ${res.status} при попытке загрузки.`);
        return {
          domain,
          title: null,
          metaDescription: null,
          hasSitemap: false,
          hasBlog: false,
          headingCount: 0,
          wordCount: 0,
          notes,
        };
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $("title").first().text().trim() || null;
      const metaDescription =
        $('meta[name="description"]').attr("content")?.trim() || null;
      const headingCount = $("h1, h2, h3").length;
      const bodyText = $("body").text().replace(/\s+/g, " ").trim();
      const wordCount = bodyText.length > 0 ? bodyText.split(" ").length : 0;
      const hasBlog =
        /\/(blog|news|articles|stati|blog-i-novosti)(\/|$)/i.test(html) ||
        $('a:contains("Блог")').length > 0 ||
        $('a:contains("Blog")').length > 0;

      const hasSitemap = await checkSitemapExists(baseUrl);

      return {
        domain,
        title,
        metaDescription,
        hasSitemap,
        hasBlog,
        headingCount,
        wordCount,
        notes,
      };
    } catch (error) {
      notes.push(
        `Не удалось загрузить сайт автоматически (${
          error instanceof Error ? error.message : "неизвестная ошибка"
        }). Требуется ручная проверка.`,
      );
      return {
        domain,
        title: null,
        metaDescription: null,
        hasSitemap: false,
        hasBlog: false,
        headingCount: 0,
        wordCount: 0,
        notes,
      };
    }
  }
}
