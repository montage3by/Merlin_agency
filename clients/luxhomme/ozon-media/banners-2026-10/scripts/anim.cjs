// Видеобаннер Ozon 1920×1080 с анимацией текста. Кадры через Playwright → MP4 (ffmpeg).
// usage: node anim.cjs <src_dir> <config.json> <product_id> <frames_dir>
const { chromium } = require(process.env.PW_PATH);
const fs = require('fs'), path = require('path');
const [SRC, CFG, ID, OUT] = process.argv.slice(2);
const cfg = JSON.parse(fs.readFileSync(CFG, 'utf8'));
const p = cfg.products.find(x => x.id === ID);
const sizes = JSON.parse(fs.readFileSync(path.join(SRC, 'sizes.json'), 'utf8'));
const [iw, ih] = sizes[p.img];
const f = n => 'file://' + path.resolve(SRC, n);
const W = 1920, H = 1080, FPS = 30, DUR = 8;
const V = { tx: 1260, ty: 560, ...(p.o && p.o.video) };

// товар высотой V.h в точке tx,ty; если фото не закрывает кадр — края дорисовывает размытый фон
const sc = V.h ? V.h / (p.ph * ih) : Math.max(W / iw, H / ih);
const w = iw * sc, h = ih * sc;
const left = V.h ? V.tx - p.fx * w : Math.min(0, Math.max(W - w, V.tx - p.fx * w));
const top = V.h ? V.ty - p.fy * h : Math.min(0, Math.max(H - h, V.ty - p.fy * h));
const fv = 110, mask = V.h ? `-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 ${fv}px,#000 calc(100% - ${fv}px),transparent 100%);` : '';
const lines = p.lines || [p.title];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Onest;src:url(${f('onest-cyr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}
@font-face{font-family:Onest;src:url(${f('8800dfc60902df36-s.p.0w5jfcbmuwuqr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+0-FF,U+131,U+152-153,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:Gogol;src:url(${f('Gogol_Regular-s.p.0x.6nqc-zzfk8.woff2')}) format("woff2")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;overflow:hidden;font-family:Onest,Arial,sans-serif;background:#2a2a2a}
.bg{position:absolute;inset:-60px;background:url(${f(p.img)}) ${p.fx * 100}% ${p.fy * 100}%/cover;filter:blur(36px) brightness(.85)}
.ph{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;${mask}transform-origin:${V.tx - left}px ${V.ty - top}px;animation:kb ${DUR}s linear both}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.32),rgba(0,0,0,0) 50%)}
.plate{position:absolute;left:150px;top:50%;width:880px;padding:52px 58px;transform:translateY(-50%);color:#fff;border-radius:30px}
.bgp{position:absolute;inset:0;border-radius:30px;background:rgba(38,38,36,.52);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);animation:plate .8s cubic-bezier(.2,.7,.2,1) .2s both}
.in{position:relative}
.logo{display:block;height:34px;width:${(34 * 165 / 20.5994).toFixed(1)}px;margin-bottom:34px;animation:fade .6s ease-out .55s both}
.ln{overflow:hidden;white-space:nowrap;font-size:60px;line-height:1.1;letter-spacing:-.01em;padding-bottom:4px}
.ln span{display:block;animation:up .75s cubic-bezier(.2,.75,.2,1) both}
.s{font-family:Gogol;font-size:80px;white-space:nowrap;line-height:1;color:#DFB195;margin-top:10px;padding:6px 10px 14px 0;animation:write 1.3s cubic-bezier(.45,.05,.4,1) 1.75s both}
.p{font-size:28px;line-height:1.3;opacity:.88;margin-top:22px;animation:fade88 .6s ease-out 2.9s both}
.b{display:inline-block;margin-top:26px;background:#DFB195;color:#2a2a2a;font-weight:600;font-size:28px;line-height:1;padding:15px 26px;border-radius:999px;position:relative;overflow:hidden;animation:pop .55s cubic-bezier(.3,1.5,.5,1) 3.3s both}
.b:after{content:"";position:absolute;top:0;bottom:0;width:60px;left:-80px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:shine .9s ease-in-out 4.6s both}
@keyframes kb{from{transform:scale(1.07)}to{transform:scale(1)}}
@keyframes plate{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes fade88{from{opacity:0;transform:translateY(10px)}to{opacity:.88;transform:none}}
@keyframes up{from{transform:translateY(105%)}to{transform:none}}
@keyframes write{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes pop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}
@keyframes shine{from{left:-80px}to{left:110%}}
</style></head><body>
<div class="bg"></div><img class="ph" src="${f(p.img)}"><div class="shade"></div>
<div class="plate"><div class="bgp"></div><div class="in">
<img class="logo" src="${f('logo.svg')}">
${lines.map((l, i) => `<div class="ln"><span style="animation-delay:${(0.85 + i * 0.18).toFixed(2)}s">${l}</span></div>`).join('')}
<div class="s">${p.script}</div><div class="p">${p.product}</div><div class="b">${cfg.badge}</div>
</div></div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  const hp = path.join(OUT, '_a.html'); fs.writeFileSync(hp, html);
  await pg.goto('file://' + path.resolve(hp), { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => document.getAnimations().forEach(a => a.pause()));
  for (let i = 0; i < FPS * DUR; i++) {
    const t = i * 1000 / FPS;
    await pg.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), t);
    await pg.screenshot({ path: path.join(OUT, `f${String(i).padStart(4, '0')}.png`) });
  }
  await b.close(); fs.unlinkSync(hp); console.log('frames', FPS * DUR);
})();
