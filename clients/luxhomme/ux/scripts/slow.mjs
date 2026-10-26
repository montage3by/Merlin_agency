// Медленная прокрутка со скриншотом каждого экрана. usage: node slow.mjs <url> <outprefix> <mobile|desktop> [maxScreens]
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PW_PATH);
const [url, prefix, mode, maxS] = [process.argv[2], process.argv[3], process.argv[4], Number(process.argv[5] || 8)];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext(mode === "mobile" ? { ...devices["iPhone 13"], locale: "ru-RU" } : { viewport: { width: 1440, height: 900 }, locale: "ru-RU" });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const b = page.getByRole("button", { name: "Принять все" }); if (await b.count()) { await b.first().click(); await page.waitForTimeout(400); }
const imgInfo = await page.evaluate(() => [...document.images].slice(0, 400).map(i => ({ src: i.currentSrc.slice(0, 60), w: i.naturalWidth, shown: Math.round(i.getBoundingClientRect().width), sizes: i.getAttribute("sizes") || "" })));
const big = imgInfo.filter(i => i.w && i.shown && i.w > i.shown * 3);
console.log("images:", imgInfo.length, "loaded >3x display width:", big.length, "with sizes attr:", imgInfo.filter(i => i.sizes).length, "sample:", JSON.stringify(big.slice(0, 3)));
const vh = page.viewportSize().height;
for (let i = 0; i < maxS; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * vh * 0.9);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${prefix}_${String(i).padStart(2, "0")}.png` });
  const end = await page.evaluate(() => window.scrollY + innerHeight >= document.body.scrollHeight - 5);
  if (end) break;
}
await browser.close();
