import type {
  AdIntelligence,
  BusinessInput,
  CompetitorProfile,
  SeoSnapshot,
} from "../types";

export interface CompetitorDiscoveryProvider {
  readonly name: string;
  findCompetitors(
    input: BusinessInput,
    limit: number,
  ): Promise<CompetitorProfile[]>;
}

export interface SeoProvider {
  readonly name: string;
  getSeoSnapshot(domain: string): Promise<SeoSnapshot>;
}

export interface AdIntelligenceProvider {
  readonly name: string;
  getAdIntelligence(
    domain: string,
    companyName: string | undefined,
  ): Promise<AdIntelligence>;
}

export interface AuditProviders {
  competitorDiscovery: CompetitorDiscoveryProvider;
  seo: SeoProvider;
  ads: AdIntelligenceProvider;
}
