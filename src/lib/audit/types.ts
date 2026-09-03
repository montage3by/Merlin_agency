export interface BusinessInput {
  domain: string;
  businessName?: string;
  niche?: string;
  city?: string;
  contactName?: string;
  contactEmail: string;
  knownCompetitors?: string[];
}

export interface CompetitorProfile {
  domain: string;
  name: string;
  discoverySource: "user-provided" | "search-results";
}

export interface SeoTrafficSnapshot {
  monthlyOrganicTraffic: number;
  organicKeywordsCount: number;
  visibilityIndex: number | null;
  topKeywords: { keyword: string; position: number; searchVolume: number | null }[];
  source: string;
}

export interface SeoSnapshot {
  domain: string;
  title: string | null;
  metaDescription: string | null;
  hasSitemap: boolean;
  hasBlog: boolean;
  headingCount: number;
  wordCount: number;
  /** Only present when a paid traffic/keyword provider (e.g. Serpstat) is configured. */
  traffic?: SeoTrafficSnapshot;
  notes: string[];
}

export interface AdCreative {
  headline?: string;
  body?: string;
  sourceUrl: string;
}

export interface AdChannelFinding {
  channel: "google_ads_transparency" | "meta_ad_library";
  isActive: boolean;
  creativeCount: number;
  sampleCreatives: AdCreative[];
  checkedUrl: string;
  notes: string[];
}

export interface AdIntelligence {
  domain: string;
  channels: AdChannelFinding[];
}

export interface CompetitorAnalysis {
  profile: CompetitorProfile;
  seo: SeoSnapshot;
  ads: AdIntelligence;
}

export type ServiceLine =
  | "context-ads"
  | "targeted-ads"
  | "seo"
  | "branding"
  | "web-dev"
  | "smm"
  | "ai-automation";

export interface Recommendation {
  title: string;
  rationale: string;
  relatedService: ServiceLine;
  priority: "high" | "medium" | "low";
}

export interface AuditReport {
  business: BusinessInput;
  ownSeo: SeoSnapshot;
  ownAds: AdIntelligence;
  competitors: CompetitorAnalysis[];
  recommendations: Recommendation[];
  generatedAt: string;
  dataSourceDisclaimer: string;
}
