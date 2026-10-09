// PNG -> уменьшенный JPEG. usage: node tojpg.mjs <in.png> <out.jpg> <width> [maxHeight]
import { createRequire } from "module"; import fs from "fs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const [inp, out, W, MH] = [process.argv[2], process.argv[3], Number(process.argv[4]), Number(process.argv[5] || 0)];
const buf = fs.readFileSync(inp); const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
const H = Math.round(h * W / w), clipH = MH ? Math.min(H, MH) : H;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await b.newPage({ viewport: { width: W, height: clipH }, deviceScaleFactor: 1 });
await p.setContent(`<body style="margin:0"><img src="data:image/png;base64,${buf.toString("base64")}" style="width:${W}px;display:block"></body>`);
await p.waitForTimeout(300);
await p.screenshot({ path: out, type: "jpeg", quality: 72, clip: { x: 0, y: 0, width: W, height: clipH } });
await b.close();
