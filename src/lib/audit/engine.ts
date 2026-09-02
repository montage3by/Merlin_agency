import { getDefaultProviders } from "./providers";
import type { AuditProviders } from "./providers/types";
import { buildRecommendations } from "./recommendations";
import type { AuditReport, BusinessInput, CompetitorAnalysis } from "./types";

const MAX_COMPETITORS = 2;

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
  // this run (see withBrowserContext). Firing every competitor's checks at
  // once (up to 3 competitors x 2 ad channels, on top of the own-site
  // checks) piled too many concurrent navigations onto one browser and
  // crashed it inside the serverless function. Fully serializing every
  // step instead made a *correct* run blow past the 60s function timeout.
  // The middle ground: run the two independent single-navigation steps
  // (own ads, competitor search) together, then process competitors one
  // at a time so the browser never has more than a handful of contexts
  // open at once. The SEO fetch is plain HTTP (no browser), so it stays
  // parallel throughout.
  const [ownSeo, ownAds, competitorProfiles] = await Promise.all([
    providers.seo.getSeoSnapshot(business.domain),
    providers.ads.getAdIntelligence(business.domain, business.businessName),
    providers.competitorDiscovery.findCompetitors(business, maxCompetitors),
  ]);

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
