// English copy of agency-content.ts. Same facts, same rules: nothing beyond the brief.
import type { Case } from "./agency-content";

export { SHOW_CLIENT_NAMES } from "./agency-content";

export const CONTACTS = {
  telegram: { label: "Telegram", value: "@ikaINT", href: "https://t.me/ikaINT" },
  whatsapp: {
    label: "WhatsApp",
    value: "+7 927 444 16 68",
    href: "https://wa.me/79274441668",
  },
  phone: { label: "Phone", value: "+995 511 10 77 69", href: "tel:+995511107769" },
  email: { label: "Email", value: "montage3by@gmail.com", href: "mailto:montage3by@gmail.com" },
};

export const NAV = [
  { href: "#services", label: "Services" },
  { href: "#cases", label: "Cases" },
  { href: "#approach", label: "Approach" },
  { href: "#audit", label: "Audit" },
  { href: "#contact", label: "Contact" },
];

export const TICKER = [
  ["Yandex Direct", "Google Ads"],
  ["SEO", "Landing pages"],
  ["Meta Ads", "Telegram Ads"],
  ["Ozon", "Wildberries"],
  ["Yandex Metrica", "GA and GTM"],
  ["AI creatives", "Claude Code"],
];

export const STATS = [
  { value: "10+", unit: "years", label: "in digital marketing" },
  { value: "14", unit: "countries", label: "project geography" },
  { value: "10+", unit: "niches", label: "from healthcare to B2B manufacturing" },
  { value: "+320%", unit: "", label: "more leads in 3 months for a clinic chain" },
  { value: "4x", unit: "", label: "lead-to-payment conversion growth in EdTech, from 5% to 20%" },
  { value: "5,000+", unit: "", label: "new customers from scratch for a Dodo Pizza franchise (Georgia)" },
];

export const SERVICES = [
  {
    title: "Search advertising",
    body: "Yandex Direct since 2017 and Google Ads. Search, Yandex Advertising Network, campaigns for international markets.",
    tags: ["Yandex Direct", "Google Ads", "YAN"],
  },
  {
    title: "SEO",
    body: "On-page and off-page optimization, site structure and landing pages for each service line, structured data.",
    tags: ["Structure", "Landing pages", "Schema"],
  },
  {
    title: "Paid social",
    body: "Meta Ads, Telegram Ads and LinkedIn promotion.",
    tags: ["Meta Ads", "Telegram Ads", "LinkedIn"],
  },
  {
    title: "Marketplace advertising",
    body: "Product promotion inside Ozon and Wildberries.",
    tags: ["Ozon", "Wildberries"],
  },
  {
    title: "Landing pages for ads",
    body: "Tilda, WordPress, HTML and CSS. Copy and structure built for conversion.",
    tags: ["Tilda", "WordPress", "HTML/CSS"],
  },
  {
    title: "Analytics",
    body: "Yandex Metrica, Google Analytics, Google Tag Manager, UTM, goal and event setup.",
    tags: ["Metrica", "GA", "GTM", "UTM"],
  },
  {
    title: "CRM and email marketing",
    body: "Email sequences, newsletters, messengers, Mindbox.",
    tags: ["Sequences", "Newsletters", "Mindbox"],
  },
  {
    title: "Full-cycle marketing",
    body: "An outsourced marketing department: strategy, launch, a team of contractors, reporting.",
    tags: ["Strategy", "Contractors", "Reports"],
  },
  {
    title: "AI and automation",
    body: "Creatives made with neural networks, copy and variants for A/B tests, in-house Claude Code tools for data collection and reports.",
    tags: ["Nano Banana", "Seedance", "Kling", "Claude", "ChatGPT"],
  },
];

export const CASES: Case[] = [
  {
    client: "Budovsky",
    niche: "Medical clinic chain",
    geo: "Saint Petersburg and Dubai",
    headline: "+320%",
    headlineLabel: "more leads in 3 months",
    hook: "How did a clinic chain grow leads by 320% in three months?",
    slug: "budovsky-clinics",
    task: "Bring in leads for three clinic service lines in two countries at once.",
    done: "Search ads and SEO, ads tied to the website, a separate campaign in the UAE.",
    results: ["Website-to-client conversion grew 4x", "2,000+ new clients in the database"],
    campaign: "UAE: budget $1,500, reach 511,569, CTR 9.65%, CPA $18",
    story:
      "Budovsky, a medical clinic chain, operates in two countries at once — Saint Petersburg and Dubai — across three service lines. That rules out the usual \"one site, one campaign, one lead\" funnel: each service line has its own audience and decision cycle, competitors differ by market, and Dubai runs on completely different rules than Saint Petersburg.\n\nThe brief wasn't just to run ads — it was to build a system that generates leads across all three service lines in both countries at once, without diluting the budget or sacrificing lead quality.\n\nWe started with search ads and SEO in the core market, Saint Petersburg: restructured the site around each service line, tied campaigns to specific landing pages, and set up full-funnel analytics to track actual patients, not clicks. Separately, we launched a UAE campaign from scratch, built for the local audience with its own budget and bidding logic.\n\nThe UAE campaign performed strongly: on a $1,500 budget, it reached 511,569 impressions, a 9.65% CTR, and an $18 cost per lead — a strong outcome for a premium healthcare market where competition for patient attention is fierce.\n\nBut the real result isn't one campaign's numbers — it's what happened next: website-to-client conversion grew 4x, and the client database grew by over 2,000 new clients. Leads across all clinic service lines grew by 320% in three months — across two markets at once.",
  },
  {
    client: "Dodo Pizza",
    niche: "Pizza chain franchise",
    geo: "Georgia",
    headline: "5,000+",
    headlineLabel: "new customers from scratch",
    hook: "How did a Dodo Pizza franchise in Georgia bring in 5,000+ customers from scratch on Google Ads?",
    slug: "dodo-pizza-georgia",
    task: "Launch and grow the franchise from scratch.",
    done: "Led the marketing department, launched Google Ads.",
    results: ["5,000+ new customers", "Among the fastest-growing franchises in the region by order volume"],
    campaign: "Google Ads in 2 weeks: 343,401 impressions, 1,431 conversions, $2.00 per conversion",
    story:
      "The Dodo Pizza franchise in Georgia launched with literally nothing to build on: no local brand recognition, no existing marketing, no order history to optimize against. The brief was simple — launch and grow the franchise from scratch — but in practice it meant building the entire marketing function from zero: positioning, channels, analytics.\n\nWe took over leading the franchise's marketing department, not just running ads: launch strategy, local brand positioning, and setting cost-per-order targets. Google Ads was the primary channel — in food delivery, search and performance traffic deliver the fastest, most measurable results, because someone searching \"order pizza\" is ready to buy right now.\n\nThe first two weeks of active campaigns tell the story: 343,401 impressions and 1,431 conversions at $2.00 per conversion. For food delivery, where the average order is small and competition for clicks is fierce, that conversion cost is a campaign that pays for itself from the first orders — not \"eventually.\"\n\nFrom there, new orders became a steady stream: the franchise brought in 5,000+ new customers — and became one of the fastest-growing franchises in the region by order volume. Marketing built right from zero paid off faster than a brand-new market usually allows.",
  },
  {
    client: "Azri",
    niche: "Online Georgian language school",
    geo: "EdTech",
    headline: "4x",
    headlineLabel: "more students",
    hook: "How do you 4x enrollment at an online language school?",
    slug: "azri-edtech",
    task: "Build marketing from scratch and grow course sales.",
    done: "Led marketing, funnel: website, webinar, payment.",
    results: ["Cost per lead $3.20", "Lead-to-payment conversion grew from 5% to 20%"],
    story:
      "Azri, an online Georgian-language school, had a classic EdTech problem: traffic was coming in, leads were showing up, but almost none converted to paying students. Lead-to-payment conversion sat at 5% — a ceiling that limited growth no matter how much budget went into the top of the funnel.\n\nThe brief was to build marketing from scratch and grow course sales — but that meant fixing the whole funnel, not just the ad spend. We took over marketing leadership and rebuilt the funnel around a new logic: website → free webinar → payment. The free webinar became the key piece — it removes the biggest objection in online language learning, \"will this actually work for me,\" before anyone pays a cent.\n\nCost per lead held at $3.20 — notable, because in EdTech a low lead cost usually comes at the expense of quality. Here we got both: a cheap lead and a conversion rate that grew from 5% to 20% — a 4x jump.\n\nThe result: the school's student count grew 4x. It's a case that shows growth in EdTech rarely comes from bigger ad budgets alone — the bottleneck is usually in the middle of the funnel, and that's where the fix has to happen.",
  },
  {
    client: "Sunrock Residences",
    niche: "Premium real estate from €579,000",
    geo: "Cyprus",
    headline: "−23%",
    headlineLabel: "CPL in 2 months",
    hook: "How to cut CPL on luxury real estate by 23% in two months?",
    slug: "sunrock-cyprus",
    task: "Leads from investors in the high-end segment.",
    done: "Lead generation with Google Ads, query and budget optimization.",
    results: ["Positive ROMI from the third month", "2.79M impressions, 12.4K clicks, CPC €0.27"],
    campaign: "Budget of about 500,000 RUB per month",
    story:
      "Sunrock Residences is a premium real estate project in Cyprus, starting at €579,000. At that price point, the usual \"more traffic equals more leads\" logic doesn't hold: the audience is narrow, clicks are expensive, and most traffic is just curiosity, not real investors.\n\nThe brief was to bring in leads specifically from investors in the high-end segment — meaning the goal wasn't to cut lead cost at any price, but to do it without losing audience quality. We ran lead generation through Google Ads with ongoing query and budget optimization: cutting irrelevant queries that generated clicks but no relevant leads, and shifting budget toward campaigns that actually drew interest from buyers at this price level.\n\nOn a budget of about 500,000 RUB a month, campaigns reached 2.79M impressions and 12.4K clicks at a €0.27 CPC — an efficient click price for premium real estate, achieved through precise targeting rather than broad reach.\n\nOver two months, cost per lead dropped 23%. By month three, ROMI — return on marketing investment — turned positive. For real estate at this level, where deal cycles are long and ticket sizes are high, turning a profit within three months is faster than this segment typically sees.",
  },
  {
    client: "C&B Center",
    niche: "Immigration law firm",
    geo: "Israel",
    headline: "3x",
    headlineLabel: "higher conversion to lead",
    hook: "How did a law firm triple its lead conversion rate?",
    slug: "cb-center-israel",
    task: "Leads from the CIS and Europe for legal services.",
    done: "Google Ads, SEO, design.",
    results: ["Lead-to-client conversion 17%", "Average time on site 11 minutes"],
    campaign: "Budget $1,000, reach 106,726, CTR 7.1%, CPA $35",
    story:
      "C&B Center is an immigration law firm working with clients from the CIS and Europe. Immigration services run on trust: no one decides to relocate and change jurisdiction because of a banner ad — they decide after they're convinced the firm can actually be trusted with something this serious.\n\nThe brief was to bring in leads from the CIS and Europe for legal services — but ads alone couldn't solve the trust problem, so the work covered Google Ads and SEO alongside design: the site itself had to do the convincing, not just collect clicks from ads.\n\nOn a $1,000 budget, campaigns reached 106,726 impressions at a 7.1% CTR — a strong click-through rate for B2C advertising in a legal niche where ad copy tends to be dry. Cost per lead was $35 — modest for a service with this high a ticket size and this long a decision cycle.\n\nThe real result isn't the click cost — it's what happened after: lead-to-client conversion tripled to 17%, and average time on site reached 11 minutes. That's unusually long for a services website, and direct evidence that the site's design and structure are actually building trust, not just formatting a page.",
  },
  {
    client: "Private Label",
    niche: "B2B private label swimwear manufacturing",
    geo: "Latvia",
    headline: "112",
    headlineLabel: "conversions, CPA €24.84",
    hook: "How to find B2B private-label clients across the US and Europe?",
    slug: "private-label-latvia",
    task: "Find fashion brands that need a manufacturer in Germany, the Netherlands, the US and Scandinavia.",
    done: "A B2B funnel from scratch, Google Ads for English-speaking markets.",
    results: ["45,197 impressions"],
    story:
      "A private-label swimwear manufacturing project in Latvia is a B2B niche of a different kind than typical consumer advertising. The customer here isn't someone shopping for a swimsuit — it's a fashion brand that needs a reliable manufacturer willing to produce under its own label.\n\nThe brief was to find such fashion brands in Germany, the Netherlands, the US, and Scandinavia — markets where manufacturer competition is dense and partner decisions are made slowly, often by an entire team on the brand's side.\n\nWe built the B2B funnel from scratch: landing pages that explain manufacturing capabilities in language buyers and brand founders actually use, and English-language Google Ads campaigns targeting the search queries a business audience uses — not a mass consumer.\n\nCampaigns reached 45,197 impressions and generated 112 conversions at €24.84 per conversion — a strong number once you account for what a B2B manufacturing conversion actually is: not an \"add to cart\" click, but a serious inquiry from a brand considering a new manufacturing partner. For an audience this narrow and this deliberate, €24.84 per lead reflects precise targeting and messaging built for English-speaking markets, not broad reach.",
  },
  {
    client: "",
    niche: "Dietary supplements, B2B",
    geo: "CIS",
    headline: "498 RUB",
    headlineLabel: "CPA",
    hook: "How to bring B2B CPA down to 498 RUB?",
    slug: "bady-b2b-cis",
    results: ["Budget 85,000 RUB", "Reach 350,433", "CTR 1.8%"],
    story:
      "A dietary supplements project running on a B2B model — selling not to end consumers but to partners and wholesale buyers across the CIS. The niche has its own challenge: a specific product, a narrow and fragmented buyer audience, and traditionally expensive, competitive ad traffic in the pharma and nutraceutical category.\n\nOn an 85,000 RUB budget, the campaign reached 350,433 impressions at a 1.8% CTR — a click-through rate typical of B2B advertising, where the audience responds selectively to an offer rather than reacting to broad reach the way mass consumer e-commerce does.\n\nThe key result is the cost per target action: CPA came in at just 498 RUB. For B2B supplements, where acquiring a partner or wholesale buyer is usually far more expensive due to the narrow audience and long decision cycle, that cost reflects precise campaign targeting rather than a lucky low market rate.\n\nParticular care went into making sure traffic wasn't spread across random users: the campaign was tuned to queries and segments matching actual B2B purchasing, not a one-off retail buy. That's the difference between the typical CPA in this category and the result here: where competitors pay for broad reach to end consumers, this budget went specifically toward buyers who actually make partnership decisions.",
  },
];

export const STEPS = [
  {
    title: "Audit",
    body: "Analytics, current ads and website, competitors, the customer path to a lead.",
  },
  { title: "Strategy", body: "Channels, budget, target cost per lead." },
  { title: "Launch", body: "Campaigns, landing pages, goal and UTM setup." },
  {
    title: "Optimization",
    body: "Query cleanup, budget reallocation, A/B tests of copy and creatives.",
  },
  {
    title: "Reporting",
    body: "Regular reports in plain numbers: leads, cost, return on spend.",
  },
];

export const TRAITS = [
  {
    title: "One point of responsibility",
    body: "Someone who has run a marketing department handles your traffic end to end: from strategy to analytics.",
  },
  {
    title: "Clients, not clicks",
    body: "Our cases show growth in conversion to client and payment, not just cheap clicks.",
  },
  {
    title: "International experience",
    body: "Projects in 14 countries, campaigns in English, client communication in English and Georgian.",
  },
  {
    title: "AI at work",
    body: "More creatives and test variants in the same time, in-house tools for data collection and reports.",
  },
];

export const NICHES = [
  "Healthcare and clinics",
  "Premium real estate",
  "Food service and delivery",
  "EdTech and online schools",
  "E-commerce and marketplaces",
  "B2B manufacturing",
  "Legal and immigration services",
  "Fashion",
  "Sports",
];

export const GEO = [
  "Russia",
  "Georgia",
  "Cyprus",
  "UAE",
  "Israel",
  "Turkey",
  "Latvia",
  "USA",
  "Western Europe",
  "Eastern Europe",
];

export const TOOLS = [
  "Yandex Direct",
  "Google Ads",
  "Meta Ads",
  "Telegram Ads",
  "LinkedIn",
  "Ozon",
  "Wildberries",
  "Yandex Metrica",
  "Google Analytics",
  "Google Tag Manager",
  "Mindbox",
  "ClickUp",
  "Tilda",
  "WordPress",
  "Figma",
  "Photoshop",
  "Premiere Pro",
  "After Effects",
  "Claude",
  "ChatGPT",
];

export const AUDIT_STEPS = [
  {
    title: "Share your website",
    body: "Domain, niche and city. That is enough to find relevant competitors.",
  },
  {
    title: "We analyze",
    body: "We check your SEO, find competitors and look at their ads on Google and Meta.",
  },
  {
    title: "Get the report",
    body: "A PDF with competitor findings and recommendations.",
  },
];
