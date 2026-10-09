// Нарезка длинного скриншота на части. usage: node crop.mjs <png> <outprefix> <segHeight> [maxSegs]
import { createRequire } from "module";
import fs from "fs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const [png, prefix, segH, maxSegs] = [process.argv[2], process.argv[3], Number(process.argv[4]), Number(process.argv[5] || 12)];
const buf = fs.readFileSync(png);
const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1 });
await page.setContent(`<html><body style="margin:0"><img id="i" src="data:image/png;base64,${buf.toString("base64")}" style="display:block"></body></html>`);
await page.waitForFunction(() => document.getElementById("i").complete);
let n = 0;
for (let y = 0; y < h && n < maxSegs; y += segH, n++) {
  await page.screenshot({ path: `${prefix}_${String(n).padStart(2, "0")}.png`, clip: { x: 0, y, width: w, height: Math.min(segH, h - y) }, fullPage: true });
}
console.log(png.split("/").pop(), w + "x" + h, "->", n, "parts");
await browser.close();
