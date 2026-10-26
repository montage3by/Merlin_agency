import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PW_PATH);
const out = process.argv[2], base = process.argv[3];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ ...devices["iPhone 13"], locale: "ru-RU" });
const page = await ctx.newPage();
await page.goto(base + "/products/ecosteam-pro", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(9000);
const ck = page.getByRole("button", { name: "Принять все" }); if (await ck.count()) { await ck.first().click(); await page.waitForTimeout(500); }
const pos = await page.evaluate(() => {
  const buy = [...document.querySelectorAll("button,a")].filter(b => /В корзину|Купить/.test(b.textContent)).map(b => ({ t: b.textContent.trim().slice(0, 30), top: Math.round(b.getBoundingClientRect().top + scrollY), h: Math.round(b.getBoundingClientRect().height), fs: getComputedStyle(b).fontSize, bg: getComputedStyle(b).backgroundColor, col: getComputedStyle(b).color }));
  const price = [...document.querySelectorAll("body *")].find(e => e.children.length === 0 && /\d\s?\d{3}\s?₽/.test(e.textContent));
  return { vh: innerHeight, buy: buy.slice(0, 4), priceTop: price ? Math.round(price.getBoundingClientRect().top + scrollY) : null };
});
console.log("PDP", JSON.stringify(pos));
await page.screenshot({ path: `${out}/m_pdp_0.png` });
await page.evaluate(() => window.scrollTo(0, innerHeight * 1)); await page.waitForTimeout(2000);
await page.screenshot({ path: `${out}/m_pdp_1.png` });
await page.evaluate(() => window.scrollTo(0, innerHeight * 4)); await page.waitForTimeout(2000);
const sticky = await page.evaluate(() => [...document.querySelectorAll("button,a")].filter(b => /В корзину|Купить/.test(b.textContent)).some(b => { const r = b.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }));
console.log("buy button visible after deep scroll:", sticky);
await page.screenshot({ path: `${out}/m_pdp_4.png` });
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
const burger = page.locator("header button").first();
console.log("burger aria-label:", await burger.getAttribute("aria-label"));
await burger.click(); await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/m_menu.png` });
await browser.close();
