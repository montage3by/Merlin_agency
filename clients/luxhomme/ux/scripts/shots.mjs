// usage: node shots.mjs <outdir> <base> <path1> <path2> ...
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PW_PATH);
const [out, base, ...paths] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const modes = {
  desktop: { viewport: { width: 1440, height: 900 }, locale: "ru-RU" },
  mobile: { ...devices["iPhone 13"], locale: "ru-RU" },
};
const report = [];
for (const [mode, opts] of Object.entries(modes)) {
  const ctx = await browser.newContext(opts);
  for (const p of paths) {
    const page = await ctx.newPage();
    const name = (p === "/" ? "home" : p.replace(/^\//, "").replace(/[\/?=&]/g, "_")) + "_" + mode;
    try {
      let attempts = 0;
      for (;;) {
        attempts++;
        await page.goto(base + p, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForTimeout(3500);
        const bad = await page.evaluate(() => /Shop Error|Что-то пошло не так/.test([...document.querySelectorAll("h1")].map(h => h.textContent).join(" ")) || document.body.scrollHeight < 100);
        if (!bad || attempts >= 4) break;
      }
      if (process.env.ACCEPT_COOKIES) { const b = page.getByRole("button", { name: "Принять все" }); if (await b.count()) { await b.first().click(); await page.waitForTimeout(500); } }
      // прокрутка, чтобы отработал lazy-load и анимации появления
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${out}/${name}_fold.png` });
      await page.screenshot({ path: `${out}/${name}_full.png`, fullPage: true });
      const facts = await page.evaluate((mode) => {
        const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
        const clickable = [...document.querySelectorAll("a,button,[role=button],input,select,textarea")].filter(vis);
        const noName = clickable.filter(e => !(e.getAttribute("aria-label") || e.textContent.trim() || e.getAttribute("title") || e.querySelector("img[alt]:not([alt=''])") || e.getAttribute("placeholder") || ["hidden"].includes(e.type)));
        const small = mode === "mobile" ? clickable.filter(e => { const r = e.getBoundingClientRect(); return r.width < 40 || r.height < 40; }) : [];
        const inputs = [...document.querySelectorAll("input:not([type=hidden]),select,textarea")].filter(vis);
        const noLabel = inputs.filter(i => !(i.labels && i.labels.length) && !i.getAttribute("aria-label") && !i.getAttribute("aria-labelledby"));
        const smallFontInputs = inputs.filter(i => parseFloat(getComputedStyle(i).fontSize) < 16);
        const vp = document.querySelector('meta[name=viewport]')?.content || "";
        const h1 = [...document.querySelectorAll("h1")].map(h => h.textContent.trim().slice(0, 80));
        const fixed = [...document.querySelectorAll("body *")].filter(e => { const s = getComputedStyle(e); return (s.position === "fixed" || s.position === "sticky") && vis(e); }).map(e => (e.className || e.tagName).toString().slice(0, 50));
        const btns = [...document.querySelectorAll("button,a")].filter(vis).map(b => b.textContent.trim()).filter(t => /корзин|купить|заказ|оформ/i.test(t)).slice(0, 8);
        return { title: document.title, h1, viewport: vp, docH: document.body.scrollHeight, clickable: clickable.length, noName: noName.length,
          noNameSample: noName.slice(0, 5).map(e => e.outerHTML.slice(0, 120)), smallTap: small.length, inputs: inputs.length, noLabel: noLabel.length,
          smallFontInputs: smallFontInputs.length, fixed: [...new Set(fixed)].slice(0, 8), buyButtons: btns };
      }, mode);
      report.push({ name, path: p, attempts, ...facts });
      console.error("ok", name);
    } catch (e) { report.push({ name, path: p, error: String(e).slice(0, 200) }); console.error("ERR", name, String(e).slice(0, 120)); }
    await page.close();
  }
  await ctx.close();
}
const fs = require("fs");
fs.writeFileSync(`${out}/facts.json`, JSON.stringify(report, null, 1));
await browser.close();
