// Обложка письма и логотип PNG со шрифтами сайта.
// usage: node hero.mjs <src_img_dir> <out_images_dir>
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const [SRC, OUT] = process.argv.slice(2).map(p => path.resolve(p));
const f = n => 'file://' + path.join(SRC, n);

const fonts = `
@font-face{font-family:SiteInter;src:url(${f('fonts/9c72aa0f40e4eef8-s.p.0m6w47a4e5dy9.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}
@font-face{font-family:SiteInter;src:url(${f('fonts/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+0-FF,U+131,U+152-153,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:Gogol;src:url(${f('fonts/Gogol-Regular.woff2')}) format("woff2")}
*{margin:0;padding:0;box-sizing:border-box} body{width:600px;font-family:SiteInter,sans-serif}`;

const hero = `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
.h{position:relative;width:600px;height:440px;overflow:hidden;background:#2a2a2a}
.h img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:38% 50%}
.g{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.45) 70%,rgba(0,0,0,.75) 100%)}
.t{position:absolute;left:36px;bottom:34px;color:#fff}
.k{font-size:11px;letter-spacing:.24em;text-transform:uppercase;opacity:.9;margin-bottom:14px}
.ttl{font-size:46px;line-height:1;font-weight:500;letter-spacing:-.01em}
.s{font-family:Gogol;font-size:58px;line-height:.8;color:#e7ae90;margin:6px 0 0 4px}
.b{position:absolute;left:30px;top:28px;width:124px;height:124px;border-radius:50%;background:#e7ae90;color:#2a2a2a;
   display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(-10deg);font-family:Gogol}
.b .n{font-size:56px;line-height:.85;white-space:nowrap}
.b .pc{display:inline-block;vertical-align:top;margin:4px 0 0 3px}
.b .m{font-size:22px;line-height:.95;margin-top:4px}
</style></head><body><div class="h"><img src="${f('01-steam-mop.jpg')}"><div class="g"></div>
<div class="b"><div class="n">–15<svg class="pc" viewBox="0 0 30 40" width="26" height="36" fill="none" stroke="#2a2a2a" stroke-width="2.1" stroke-linecap="round"><path d="M8.5 6.2c-3 .2-4.6 3.4-3.8 6 .7 2.3 3.6 2.6 5.1.8 1.6-2 1.2-5.6-1.3-6.8"/><path d="M24.5 3.5C19 14 13.5 24.5 6.5 37"/><path d="M22 24.6c-3 .3-4.4 3.6-3.5 6.1.8 2.2 3.7 2.4 5.1.6 1.5-2.1 1-5.6-1.6-6.7"/></svg></div><div class="m">на всю<br>технику</div></div>
<div class="t"><div class="k">Только для подписчиков</div><div class="ttl">Закрытая распродажа</div><div class="s">для своих</div></div>
</div></body></html>`;

const logo = `<!doctype html><html><head><meta charset="utf-8"><style>${fonts} body{width:150px;background:transparent} img{display:block;width:150px;height:20px}</style></head>
<body><img src="${f('logo-group-black.svg')}"></body></html>`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 600, height: 440 }, deviceScaleFactor: 2 });
const hp = path.join(OUT, '_hero.html'); fs.writeFileSync(hp, hero);
await page.goto('file://' + hp, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(OUT, 'hero.png'), clip: { x: 0, y: 0, width: 600, height: 440 } });
const p2 = await browser.newPage({ viewport: { width: 150, height: 20 }, deviceScaleFactor: 3 });
const lp = path.join(OUT, '_logo.html'); fs.writeFileSync(lp, logo);
await p2.goto('file://' + lp, { waitUntil: 'load' });
await p2.evaluate(() => document.fonts.ready);
await p2.screenshot({ path: path.join(OUT, 'logo.png'), clip: { x: 0, y: 0, width: 150, height: 20 }, omitBackground: true });
await browser.close();
fs.unlinkSync(hp); fs.unlinkSync(lp);
console.log('ok');
