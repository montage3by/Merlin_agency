import { getDefaultProviders } from "./providers";
import type { AuditProviders } from "./providers/types";
import { buildRecommendations } from "./recommendations";
import type { AuditReport, BusinessInput, CompetitorAnalysis } from "./types";

const MAX_COMPETITORS = 3;

export interface RunAuditOptions {
  providers?: AuditProviders;
  maxCompetitors?: number;
}

export async function runAudit(
  business: BusinessInput,
  options: RunAuditOptions = {},
): Promise<AuditReport> {
  const providers = options.providers ?? getDefaultProviders();
  const maxCompetitors = options.maxCompetitors ?? MAX_COMPETITORS;

  // A single shared Chromium instance backs every browser-driven check in
  // this run (see withBrowserContext). Piling many concurrent navigations
  // onto it — own ads x2 channels, competitor search, then every
  // competitor's ads x2 channels all at once — was enough to crash that
  // process inside a memory-constrained serverless function, which then
  // surfaced as false "no ads found" results. The SEO fetch is plain HTTP
  // (no browser) so it can stay parallel; the browser-heavy steps run one
  // at a time.
  const ownSeo = await providers.seo.getSeoSnapshot(business.domain);
  const competitorProfiles = await providers.competitorDiscovery.findCompetitors(
    business,
    maxCompetitors,
  );
  const ownAds = await providers.ads.getAdIntelligence(business.domain, business.businessName);

  const competitors: CompetitorAnalysis[] = [];
  for (const profile of competitorProfiles) {
    const [seo, ads] = await Promise.all([
      providers.seo.getSeoSnapshot(profile.domain),
      providers.ads.getAdIntelligence(profile.domain, profile.name),
    ]);
    competitors.push({ profile, seo, ads });
  }

  const recommendations = buildRecommendations(ownSeo, ownAds, competitors);

  return {
    business,
    ownSeo,
    ownAds,
    competitors,
    recommendations,
    generatedAt: new Date().toISOString(),
    dataSourceDisclaimer:
      "Отчёт собран из публичных источников (главная страница сайта, Google Ads Transparency Center, Meta Ad Library, органическая выдача Google) без платных доступов к аналитике трафика. Данные о позициях в поиске и объёме трафика — по запросу, подключаются платные источники (SimilarWeb/SEMrush/Ahrefs/Serpstat).",
  };
}
