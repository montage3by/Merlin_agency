import { chromium } from "playwright";
import { CHROMIUM_EXECUTABLE_PATH } from "../audit/chromium-path";
import type { AuditReport } from "../audit/types";
import { renderAuditReportHtml } from "./report-html";

export async function renderAuditReportPdf(report: AuditReport): Promise<Buffer> {
  const html = renderAuditReportHtml(report);
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROMIUM_EXECUTABLE_PATH,
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}
