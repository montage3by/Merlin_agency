import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await b.newPage();
await p.goto("file://" + process.argv[2], { waitUntil: "load" });
await p.pdf({ path: process.argv[3], format: "A4", printBackground: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
  footerTemplate: '<div style="font-size:7pt;color:#888;width:100%;text-align:center">UI/UX-аудит luxhomme.store · 09.10.2026 · стр. <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  margin: { top: "14mm", bottom: "16mm", left: "13mm", right: "13mm" } });
await b.close();
