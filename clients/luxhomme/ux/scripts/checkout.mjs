import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const out = process.argv[2], base = process.argv[3];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: "ru-RU" });
await page.goto(base + "/products/ecosteam-pro", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(8000);
const ck = page.getByRole("button", { name: "Принять все" }); if (await ck.count()) { await ck.first().click(); await page.waitForTimeout(400); }
await page.getByRole("button", { name: "В корзину" }).first().click();
await page.waitForTimeout(2500);
await page.screenshot({ path: `${out}/c1_after_add.png` });
console.log("header cart:", await page.evaluate(() => document.querySelector("header")?.innerText.replace(/\s+/g, " ").slice(-40)));
await page.goto(base + "/cart", { waitUntil: "domcontentloaded" }); await page.waitForTimeout(6000);
await page.screenshot({ path: `${out}/c2_cart.png`, fullPage: true });
const btn = page.getByRole("button", { name: /Оформ|заказ/i }).or(page.getByRole("link", { name: /Оформ|заказ/i }));
console.log("checkout buttons:", await btn.count());
if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(6000); console.log("url:", page.url());
  await page.screenshot({ path: `${out}/c3_checkout.png`, fullPage: true });
  const f = await page.evaluate(() => [...document.querySelectorAll("input,select,textarea")].filter(i => i.type !== "hidden").map(i => ({ n: i.name || i.id || i.placeholder, type: i.type, ac: i.autocomplete, req: i.required, label: !!(i.labels && i.labels.length) || !!i.getAttribute("aria-label") })));
  console.log("fields:", JSON.stringify(f)); }
await browser.close();
