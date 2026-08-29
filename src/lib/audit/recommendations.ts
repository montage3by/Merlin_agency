import type {
  AdIntelligence,
  CompetitorAnalysis,
  Recommendation,
  SeoSnapshot,
} from "./types";

function seoRecommendations(ownSeo: SeoSnapshot): Recommendation[] {
  const recs: Recommendation[] = [];

  if (!ownSeo.title || !ownSeo.metaDescription) {
    recs.push({
      title: "Прописать title и meta description на ключевых страницах",
      rationale:
        "На главной странице отсутствует title и/или meta description — это напрямую снижает CTR из поисковой выдачи.",
      relatedService: "seo",
      priority: "high",
    });
  }

  if (!ownSeo.hasSitemap) {
    recs.push({
      title: "Добавить sitemap.xml",
      rationale:
        "Без карты сайта поисковым системам сложнее находить и индексировать новые страницы.",
      relatedService: "seo",
      priority: "medium",
    });
  }

  if (!ownSeo.hasBlog) {
    recs.push({
      title: "Запустить блог/раздел статей",
      rationale:
        "Регулярный контент — самый устойчивый источник органического трафика и снижает зависимость от платной рекламы.",
      relatedService: "seo",
      priority: "medium",
    });
  }

  return recs;
}

function adsRecommendations(
  ownAds: AdIntelligence,
  competitors: CompetitorAnalysis[],
): Recommendation[] {
  const recs: Recommendation[] = [];

  const ownActiveChannels = new Set(
    ownAds.channels.filter((c) => c.isActive).map((c) => c.channel),
  );

  const competitorsRunningGoogle = competitors.filter((c) =>
    c.ads.channels.some((ch) => ch.channel === "google_ads_transparency" && ch.isActive),
  ).length;
  const competitorsRunningMeta = competitors.filter((c) =>
    c.ads.channels.some((ch) => ch.channel === "meta_ad_library" && ch.isActive),
  ).length;

  if (!ownActiveChannels.has("google_ads_transparency") && competitorsRunningGoogle > 0) {
    recs.push({
      title: "Запустить контекстную рекламу в Google Ads",
      rationale: `${competitorsRunningGoogle} из ${competitors.length} проверенных конкурентов сейчас активно рекламируются в Google — вы теряете эти показы в свою пользу.`,
      relatedService: "context-ads",
      priority: "high",
    });
  }

  if (!ownActiveChannels.has("meta_ad_library") && competitorsRunningMeta > 0) {
    recs.push({
      title: "Запустить таргетированную рекламу в Meta",
      rationale: `${competitorsRunningMeta} из ${competitors.length} проверенных конкурентов ведут активные кампании в Meta Ad Library — аудитория там уже прогревается вашими конкурентами.`,
      relatedService: "targeted-ads",
      priority: "high",
    });
  }

  if (ownActiveChannels.size === 0 && competitors.length === 0) {
    recs.push({
      title: "Определить первый рекламный канал",
      rationale:
        "Активной рекламы не обнаружено ни у вас, ни у найденных конкурентов — есть возможность занять канал первыми.",
      relatedService: "context-ads",
      priority: "medium",
    });
  }

  return recs;
}

function alwaysOnRecommendations(): Recommendation[] {
  return [
    {
      title: "Аудит и обновление бренд-платформы",
      rationale:
        "Единый визуальный стиль повышает узнаваемость и конверсию рекламы в разы — стоит сверить текущий брендинг с тем, что видят конкуренты.",
      relatedService: "branding",
      priority: "low",
    },
  ];
}

export function buildRecommendations(
  ownSeo: SeoSnapshot,
  ownAds: AdIntelligence,
  competitors: CompetitorAnalysis[],
): Recommendation[] {
  const priorityOrder: Record<Recommendation["priority"], number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [
    ...seoRecommendations(ownSeo),
    ...adsRecommendations(ownAds, competitors),
    ...alwaysOnRecommendations(),
  ].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
