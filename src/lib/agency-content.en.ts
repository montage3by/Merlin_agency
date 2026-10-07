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
  { value: "#1", unit: "", label: "in orders among all Dodo Pizza franchises worldwide (Georgia)" },
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
    task: "Bring in leads for three clinic service lines in two countries at once.",
    done: "Search ads and SEO, ads tied to the website, a separate campaign in the UAE.",
    results: ["Website-to-client conversion grew 4x", "2,000+ new clients in the database"],
    campaign: "UAE: budget $1,500, reach 511,569, CTR 9.65%, CPA $18",
  },
  {
    client: "Dodo Pizza",
    niche: "Pizza chain franchise",
    geo: "Georgia",
    headline: "#1",
    headlineLabel: "in orders among all franchises of the chain worldwide",
    task: "Launch and grow the franchise from scratch.",
    done: "Led the marketing department, launched Google Ads.",
    results: ["5,000+ new customers"],
    campaign: "Google Ads in 2 weeks: 343,401 impressions, 1,431 conversions, $2.00 per conversion",
  },
  {
    client: "Azri",
    niche: "Online Georgian language school",
    geo: "EdTech",
    headline: "4x",
    headlineLabel: "more students",
    task: "Build marketing from scratch and grow course sales.",
    done: "Led marketing, funnel: website, webinar, payment.",
    results: ["Cost per lead $3.20", "Lead-to-payment conversion grew from 5% to 20%"],
  },
  {
    client: "Sunrock Residences",
    niche: "Premium real estate from €579,000",
    geo: "Cyprus",
    headline: "−23%",
    headlineLabel: "CPL in 2 months",
    task: "Leads from investors in the high-end segment.",
    done: "Lead generation with Google Ads, query and budget optimization.",
    results: ["Positive ROMI from the third month", "2.79M impressions, 12.4K clicks, CPC €0.27"],
    campaign: "Budget of about 500,000 RUB per month",
  },
  {
    client: "C&B Center",
    niche: "Immigration law firm",
    geo: "Israel",
    headline: "3x",
    headlineLabel: "higher conversion to lead",
    task: "Leads from the CIS and Europe for legal services.",
    done: "Google Ads, SEO, design.",
    results: ["Lead-to-client conversion 17%", "Average time on site 11 minutes"],
    campaign: "Budget $1,000, reach 106,726, CTR 7.1%, CPA $35",
  },
  {
    client: "Private Label",
    niche: "B2B private label swimwear manufacturing",
    geo: "Latvia",
    headline: "112",
    headlineLabel: "conversions, CPA €24.84",
    task: "Find fashion brands that need a manufacturer in Germany, the Netherlands, the US and Scandinavia.",
    done: "A B2B funnel from scratch, Google Ads for English-speaking markets.",
    results: ["45,197 impressions"],
  },
  {
    client: "",
    niche: "Dietary supplements, B2B",
    geo: "CIS",
    headline: "498 RUB",
    headlineLabel: "CPA",
    results: ["Budget 85,000 RUB", "Reach 350,433", "CTR 1.8%"],
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
