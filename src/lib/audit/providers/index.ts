import { FreeSearchCompetitorProvider } from "./free-competitors";
import { FreeOnPageSeoProvider } from "./free-seo";
import { FreeAdTransparencyProvider } from "./free-ads";
import { SerpstatSeoProvider } from "./serpstat-seo";
import type { AuditProviders, SeoProvider } from "./types";

function getSeoProvider(): SeoProvider {
  const token = process.env.SERPSTAT_API_TOKEN;
  return token ? new SerpstatSeoProvider(token) : new FreeOnPageSeoProvider();
}

/**
 * Default provider set. SEO/traffic upgrades to Serpstat automatically once
 * SERPSTAT_API_TOKEN is set (falls back to the free on-page-only checks
 * otherwise). When further paid access (SimilarWeb/SEMrush/Ahrefs) is
 * available, add a provider class implementing the same interface in this
 * folder and swap it in here — nothing else in the audit engine needs to
 * change.
 */
export function getDefaultProviders(): AuditProviders {
  return {
    competitorDiscovery: new FreeSearchCompetitorProvider(),
    seo: getSeoProvider(),
    ads: new FreeAdTransparencyProvider(),
  };
}

export * from "./types";
