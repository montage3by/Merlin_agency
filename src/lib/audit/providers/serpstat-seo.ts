import type { SeoProvider } from "./types";
import type { SeoSnapshot, SeoTrafficSnapshot } from "../types";
import { FreeOnPageSeoProvider } from "./free-seo";

const SERPSTAT_API_URL = "https://api.serpstat.com/v4";
const FETCH_TIMEOUT_MS = 12_000;

/**
 * Serpstat's default search-engine code for domain lookups. Serpstat tracks
 * separate keyword databases per country/search-engine (g_us, g_ru, g_de,
 * ...); a domain with mostly non-US traffic will under-report here. This is
 * a reasonable default, not a guarantee — worth revisiting once we see
 * real traffic mixes across audited domains.
 */
const DEFAULT_SEARCH_ENGINE = "g_us";

interface SerpstatRpcResponse<T> {
  result?: T;
  error?: { code: number; message: string };
}

async function callSerpstat<T>(
  token: string,
  method: string,
  params: Record<string, unknown>,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${SERPSTAT_API_URL}/?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, method, params }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Serpstat HTTP ${res.status}`);
    }

    const json = (await res.json()) as SerpstatRpcResponse<T>;
    if (json.error) {
      throw new Error(`Serpstat API error ${json.error.code}: ${json.error.message}`);
    }
    if (json.result === undefined) {
      throw new Error("Serpstat: пустой ответ (result отсутствует)");
    }
    return json.result;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Response shapes here are based on Serpstat's documented JSON-RPC v4
 * conventions, not a live-verified call (no token available while writing
 * this). Kept defensive on purpose: every field access has a fallback, and
 * unexpected shapes surface as a note on the report instead of a thrown
 * error. Once a real token is live, run one real domain through this and
 * adjust field names here if they don't match.
 */
interface DomainInfoRow {
  domain?: string;
  visible?: number;
  keywords?: number;
  traff?: number;
}

interface DomainKeywordRow {
  keyword?: string;
  position?: number;
  region_queries_count?: number;
  cost?: number;
}

async function fetchTrafficSnapshot(
  token: string,
  domain: string,
): Promise<SeoTrafficSnapshot> {
  const [infoResult, keywordsResult] = await Promise.all([
    callSerpstat<{ data?: DomainInfoRow[] }>(token, "SerpstatDomainProcedure.getDomainsInfo", {
      domains: [domain],
      se: DEFAULT_SEARCH_ENGINE,
    }),
    callSerpstat<{ data?: DomainKeywordRow[] }>(token, "SerpstatDomainProcedure.getDomainKeywords", {
      domain,
      se: DEFAULT_SEARCH_ENGINE,
      page: 1,
      size: 5,
      sort: "region_queries_count",
      order: "desc",
    }).catch(() => ({ data: [] })),
  ]);

  const info = infoResult.data?.[0];

  return {
    monthlyOrganicTraffic: Math.round(info?.traff ?? 0),
    organicKeywordsCount: Math.round(info?.keywords ?? 0),
    visibilityIndex: typeof info?.visible === "number" ? info.visible : null,
    topKeywords: (keywordsResult.data ?? [])
      .filter((row) => row.keyword)
      .slice(0, 5)
      .map((row) => ({
        keyword: row.keyword!,
        position: row.position ?? 0,
        searchVolume: typeof row.region_queries_count === "number" ? row.region_queries_count : null,
      })),
    source: "Serpstat",
  };
}

/**
 * Adds real organic-traffic and keyword data from Serpstat on top of the
 * free on-page checks (title/description/sitemap/blog), instead of
 * replacing them — the two are complementary, not alternatives.
 */
export class SerpstatSeoProvider implements SeoProvider {
  readonly name = "serpstat";
  private readonly onPage = new FreeOnPageSeoProvider();

  constructor(private readonly apiToken: string) {}

  async getSeoSnapshot(domain: string): Promise<SeoSnapshot> {
    const snapshot = await this.onPage.getSeoSnapshot(domain);

    try {
      const traffic = await fetchTrafficSnapshot(this.apiToken, domain);
      return {
        ...snapshot,
        traffic,
        notes: [...snapshot.notes, "Трафик и ключевые слова: Serpstat."],
      };
    } catch (error) {
      return {
        ...snapshot,
        notes: [
          ...snapshot.notes,
          `Не удалось получить данные трафика из Serpstat (${
            error instanceof Error ? error.message : "неизвестная ошибка"
          }).`,
        ],
      };
    }
  }
}
