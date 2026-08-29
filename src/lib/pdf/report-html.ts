import type {
  AdChannelFinding,
  AuditReport,
  CompetitorAnalysis,
  Recommendation,
  SeoSnapshot,
} from "../audit/types";

const SERVICE_LABELS: Record<Recommendation["relatedService"], string> = {
  "context-ads": "Контекстная реклама",
  "targeted-ads": "Таргетированная реклама",
  seo: "SEO-продвижение",
  branding: "Брендинг",
  "web-dev": "Веб-разработка",
  smm: "SMM",
  "ai-automation": "AI-автоматизация",
};

const PRIORITY_LABELS: Record<Recommendation["priority"], string> = {
  high: "Высокий приоритет",
  medium: "Средний приоритет",
  low: "Низкий приоритет",
};

const CHANNEL_LABELS: Record<AdChannelFinding["channel"], string> = {
  google_ads_transparency: "Google Ads",
  meta_ad_library: "Meta (Facebook/Instagram)",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function seoSection(title: string, seo: SeoSnapshot): string {
  return `
    <div class="card">
      <h3>${escapeHtml(title)}</h3>
      <table class="kv">
        <tr><td>Домен</td><td>${escapeHtml(seo.domain)}</td></tr>
        <tr><td>Title</td><td>${seo.title ? escapeHtml(seo.title) : "<span class=\"muted\">не найден</span>"}</td></tr>
        <tr><td>Meta description</td><td>${
          seo.metaDescription ? escapeHtml(seo.metaDescription) : '<span class="muted">не найден</span>'
        }</td></tr>
        <tr><td>Sitemap.xml</td><td>${seo.hasSitemap ? "есть" : "не найден"}</td></tr>
        <tr><td>Блог/раздел статей</td><td>${seo.hasBlog ? "есть" : "не найден"}</td></tr>
        <tr><td>Заголовков H1–H3 на главной</td><td>${seo.headingCount}</td></tr>
      </table>
      ${
        seo.notes.length
          ? `<ul class="notes">${seo.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>`
          : ""
      }
    </div>`;
}

function adsChannelRow(finding: AdChannelFinding): string {
  const status = finding.isActive
    ? '<span class="pill pill-active">Активна</span>'
    : '<span class="pill pill-inactive">Не обнаружена</span>';
  return `
    <tr>
      <td>${CHANNEL_LABELS[finding.channel]}</td>
      <td>${status}</td>
      <td>${finding.notes.map((n) => escapeHtml(n)).join("<br/>")}</td>
    </tr>`;
}

function competitorCard(competitor: CompetitorAnalysis): string {
  return `
    <div class="card">
      <h3>${escapeHtml(competitor.profile.name)} <span class="muted">(${escapeHtml(
        competitor.profile.domain,
      )})</span></h3>
      <table class="kv">
        <tr><td>Способ обнаружения</td><td>${
          competitor.profile.discoverySource === "user-provided"
            ? "указан вами"
            : "найден в поиске"
        }</td></tr>
        <tr><td>Title сайта</td><td>${
          competitor.seo.title ? escapeHtml(competitor.seo.title) : '<span class="muted">не найден</span>'
        }</td></tr>
        <tr><td>Блог/раздел статей</td><td>${competitor.seo.hasBlog ? "есть" : "не найден"}</td></tr>
      </table>
      <table class="channels">
        <thead><tr><th>Канал рекламы</th><th>Статус</th><th>Комментарий</th></tr></thead>
        <tbody>${competitor.ads.channels.map(adsChannelRow).join("")}</tbody>
      </table>
    </div>`;
}

function recommendationCard(rec: Recommendation, index: number): string {
  return `
    <div class="rec">
      <div class="rec-number">${index + 1}</div>
      <div class="rec-body">
        <div class="rec-title">${escapeHtml(rec.title)}
          <span class="pill pill-priority-${rec.priority}">${PRIORITY_LABELS[rec.priority]}</span>
        </div>
        <p class="rec-rationale">${escapeHtml(rec.rationale)}</p>
        <p class="rec-service">Услуга Merlin Studio: <strong>${SERVICE_LABELS[rec.relatedService]}</strong></p>
      </div>
    </div>`;
}

export function renderAuditReportHtml(report: AuditReport): string {
  const { business } = report;
  const dateLabel = new Date(report.generatedAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<title>Digital-аудит: ${escapeHtml(business.businessName ?? business.domain)}</title>
<style>
  :root {
    --bg: #0c0c0d;
    --panel: #171615;
    --accent: #ef6b3a;
    --accent-soft: #ffb98f;
    --text: #f4f2ee;
    --muted: #9b968d;
    --border: #2b2926;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 13px;
    line-height: 1.5;
  }
  .page { padding: 40px 48px; }
  .cover {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: radial-gradient(circle at 20% 20%, #2a1c12, var(--bg) 60%);
  }
  .cover .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--accent-soft);
    font-size: 12px;
    margin-bottom: 16px;
  }
  .cover h1 { font-size: 34px; margin: 0 0 12px; }
  .cover .sub { color: var(--muted); font-size: 15px; }
  .brand { font-weight: 700; color: var(--accent-soft); }
  h2 {
    font-size: 20px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
    margin-top: 36px;
  }
  h3 { font-size: 15px; margin: 0 0 12px; color: var(--accent-soft); }
  .card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    margin-bottom: 16px;
  }
  table.kv { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  table.kv td { padding: 4px 0; vertical-align: top; }
  table.kv td:first-child { color: var(--muted); width: 190px; }
  table.channels { width: 100%; border-collapse: collapse; margin-top: 10px; }
  table.channels th {
    text-align: left;
    color: var(--muted);
    font-weight: 500;
    font-size: 11px;
    text-transform: uppercase;
    padding: 6px 8px;
    border-bottom: 1px solid var(--border);
  }
  table.channels td { padding: 8px; border-bottom: 1px solid var(--border); font-size: 12px; }
  .pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }
  .pill-active { background: #16331f; color: #7ee2a0; }
  .pill-inactive { background: var(--border); color: var(--muted); }
  .pill-priority-high { background: #3a1420; color: #f28b9a; }
  .pill-priority-medium { background: #3a2c14; color: #f2c98b; }
  .pill-priority-low { background: #142a3a; color: #8bc2f2; }
  .muted { color: var(--muted); }
  ul.notes { margin: 8px 0 0; padding-left: 18px; color: var(--muted); font-size: 12px; }
  .rec { display: flex; gap: 14px; margin-bottom: 16px; }
  .rec-number {
    flex: none;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
  }
  .rec-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; display: flex; gap: 10px; align-items: center; }
  .rec-rationale { margin: 4px 0; color: var(--text); }
  .rec-service { margin: 0; color: var(--accent-soft); font-size: 12px; }
  .footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 11px;
  }
  .disclaimer { font-size: 11px; color: var(--muted); margin-top: 24px; }
</style>
</head>
<body>
  <section class="cover page">
    <div class="eyebrow">Digital-аудит от <span class="brand">Merlin Studio</span></div>
    <h1>${escapeHtml(business.businessName ?? business.domain)}</h1>
    <div class="sub">${escapeHtml(business.domain)} · ${dateLabel}</div>
  </section>

  <section class="page">
    <h2>Ваш сайт сегодня</h2>
    ${seoSection(business.businessName ?? business.domain, report.ownSeo)}
    <div class="card">
      <h3>Реклама</h3>
      <table class="channels">
        <thead><tr><th>Канал</th><th>Статус</th><th>Комментарий</th></tr></thead>
        <tbody>${report.ownAds.channels.map(adsChannelRow).join("")}</tbody>
      </table>
    </div>

    <h2>Конкуренты</h2>
    ${
      report.competitors.length
        ? report.competitors.map(competitorCard).join("")
        : '<p class="muted">Автоматически найти публичных конкурентов не удалось. Рекомендуем указать их вручную для более точного отчёта.</p>'
    }

    <h2>Рекомендации Merlin Studio</h2>
    ${report.recommendations.map(recommendationCard).join("")}

    <p class="disclaimer">${escapeHtml(report.dataSourceDisclaimer)}</p>

    <div class="footer">
      Merlin Studio. «Связки, которые продают» · merlin_studio@gmail.com
    </div>
  </section>
</body>
</html>`;
}
