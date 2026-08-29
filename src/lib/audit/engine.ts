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

  const [ownSeo, ownAds, competitorProfiles] = await Promise.all([
    providers.seo.getSeoSnapshot(business.domain),
    providers.ads.getAdIntelligence(business.domain, business.businessName),
    providers.competitorDiscovery.findCompetitors(business, maxCompetitors),
  ]);

  const competitors: CompetitorAnalysis[] = await Promise.all(
    competitorProfiles.map(async (profile) => {
      const [seo, ads] = await Promise.all([
        providers.seo.getSeoSnapshot(profile.domain),
        providers.ads.getAdIntelligence(profile.domain, profile.name),
      ]);
      return { profile, seo, ads };
    }),
  );

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
