import { FreeSearchCompetitorProvider } from "./free-competitors";
import { FreeOnPageSeoProvider } from "./free-seo";
import { FreeAdTransparencyProvider } from "./free-ads";
import type { AuditProviders } from "./types";

/**
 * Default provider set: free/no-key sources only. When paid API access
 * (SimilarWeb/SEMrush/Ahrefs/Serpstat) is available, add a provider class
 * implementing the same interface in this folder and swap it in here —
 * nothing else in the audit engine needs to change.
 */
export function getDefaultProviders(): AuditProviders {
  return {
    competitorDiscovery: new FreeSearchCompetitorProvider(),
    seo: new FreeOnPageSeoProvider(),
    ads: new FreeAdTransparencyProvider(),
  };
}

export * from "./types";
