// Баннеры медийки Ozon: десктоп 2832×600, мобильный 1080×450, нативный 768×1024.
// usage: node render.cjs <src_dir> <config.json> <out_dir>
const { chromium } = require(process.env.PW_PATH);
const fs = require('fs'), path = require('path');
const [SRC, CFG, OUT] = process.argv.slice(2).map(p => path.resolve(p));
const cfg = JSON.parse(fs.readFileSync(CFG, 'utf8'));
const f = n => 'file://' + path.join(SRC, n);
const C = { beige: '#E1D3BC', peach: '#DFB195', taupe: '#B9A389', blue: '#336190', steel: '#47647C', text: '#2a2a2a', bg: '#efeeeb' };

const FORMATS = {
  // tx,ty — куда ставим центр товара; h — высота товара в px; plate — блок текста
  desktop: { W: 2832, H: 600, tx: 1900, ty: 300, h: 470, plate: 'left:400px;top:50%;transform:translateY(-50%);width:900px;padding:44px 52px', fs: [58, 74, 24, 24], logo: 30, fade: 320 },
  mobile:  { W: 1080, H: 450, tx: 830, ty: 262, h: 300, plate: 'left:40px;top:50%;transform:translateY(-50%);width:520px;padding:28px 30px', fs: [34, 44, 17, 17], logo: 20, fade: 160 },
  native:  { W: 768, H: 1024, tx: 384, ty: 400, h: 500, plate: 'left:36px;right:36px;bottom:70px;padding:30px 34px', fs: [40, 52, 20, 20], logo: 22, fade: 0 },
};

function html(p, k, F0, iw, ih) {
  const o = (p.o || {})[k] || {}, F = { ...F0, ...o };
  const fit = k !== 'native' || o.fit; // fit — товар по размеру h, фон дорисовывается размытием
  const top_ = k === 'native' && p.o && p.o.nplate === 'top';
  if (top_) F.plate = 'left:36px;right:36px;top:130px;padding:30px 34px';
  const s = F.h / (p.ph * ih);
  let w = iw * s, h = ih * s;
  let left = F.tx - p.fx * w, top = F.ty - p.fy * h;
  if (!fit) { // нативный — фото на весь кадр
    const sc = Math.max(F.W / iw, F.H / ih, s); w = iw * sc; h = ih * sc;
    left = Math.min(0, Math.max(F.W - w, F.tx - p.fx * w)); top = Math.min(0, Math.max(F.H - h, F.ty - p.fy * h));
  }
  const fd = k === 'native' ? (o.fit ? 160 : 0) : F.fade, fv = 70;
  const mask = fd ? `-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${fd}px,#000 calc(100% - ${fd * 0.6}px),transparent 100%),linear-gradient(to bottom,transparent 0,#000 ${fv}px,#000 calc(100% - ${fv}px),transparent 100%);-webkit-mask-composite:source-in;mask-composite:intersect;` : '';
  const vfade = k !== 'native' && (top > 0 || top + h < F.H);
  const [t1, t2, t3, t4] = F.fs;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Onest;src:url(${f('onest-cyr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}
@font-face{font-family:Onest;src:url(${f('8800dfc60902df36-s.p.0w5jfcbmuwuqr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+0-FF,U+131,U+152-153,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:Gogol;src:url(${f('Gogol_Regular-s.p.0x.6nqc-zzfk8.woff2')}) format("woff2")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${F.W}px;height:${F.H}px;overflow:hidden;font-family:Onest,Arial,sans-serif;background:${C.text}}
.bg{position:absolute;inset:-60px;background:url(${f(p.img)}) ${p.fx * 100}% ${p.fy * 100}%/cover;filter:blur(${fit ? 36 : 0}px) brightness(.82) saturate(.9)}
.fg{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;${fit ? mask : ''}}
.shade{position:absolute;inset:0;background:${k === 'native' ? (top_ ? 'linear-gradient(0deg,rgba(0,0,0,0) 50%,rgba(0,0,0,.3) 100%)' : 'linear-gradient(180deg,rgba(0,0,0,.18) 0,rgba(0,0,0,0) 18%,rgba(0,0,0,0) 45%,rgba(0,0,0,.35) 100%)') : 'linear-gradient(90deg,rgba(0,0,0,.25),rgba(0,0,0,0) 55%)'}}
.plate{position:absolute;${F.plate};background:rgba(38,38,36,.52);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:${k === 'mobile' ? 18 : 26}px;color:#fff}
.logo{display:block;height:${F.logo}px;width:auto;margin-bottom:${k === 'mobile' ? 14 : 26}px}
.t{font-size:${t1}px;line-height:1.08;font-weight:400;letter-spacing:-.01em}
.s{font-family:Gogol;font-size:${t2}px;line-height:.95;color:${C.peach};margin-top:${k === 'mobile' ? 4 : 8}px}
.p{font-size:${t3}px;line-height:1.3;opacity:.88;margin-top:${k === 'mobile' ? 12 : 20}px}
.b{display:inline-block;margin-top:${k === 'mobile' ? 12 : 22}px;background:${C.peach};color:${C.text};font-weight:600;font-size:${t4}px;line-height:1;padding:${k === 'mobile' ? '8px 14px' : '12px 20px'};border-radius:999px}
.lt{position:absolute;left:50%;top:62px;transform:translateX(-50%);background:rgba(38,38,36,.5);backdrop-filter:blur(12px);padding:14px 24px;border-radius:999px}
.lt img{display:block;height:${F.logo}px}
</style></head><body>
<div class="bg"></div><img class="fg" src="${f(p.img)}"><div class="shade"></div>
${k === 'native' ? `<div class="lt"><img src="${f('logo.svg')}"></div>` : ''}
<div class="plate">${k === 'native' ? '' : `<img class="logo" src="${f('logo.svg')}">`}
<div class="t">${p.title}</div><div class="s">${p.script}</div><div class="p">${p.product}</div><div class="b">${cfg.badge}</div></div>
</body></html>`;
}

(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const sizes = JSON.parse(fs.readFileSync(path.join(SRC, 'sizes.json'), 'utf8'));
  const only = process.env.ONLY;
  for (const p of cfg.products) {
    if (only && !p.id.startsWith(only)) continue;
    const [iw, ih] = sizes[p.img];
    for (const [k, F] of Object.entries(FORMATS)) {
      const pg = await b.newPage({ viewport: { width: F.W, height: F.H } });
      const hp = path.join(OUT, `_${p.id}_${k}.html`);
      fs.writeFileSync(hp, html(p, k, F, iw, ih));
      await pg.goto('file://' + hp, { waitUntil: 'load' });
      await pg.evaluate(() => document.fonts.ready);
      await pg.screenshot({ path: path.join(OUT, `${p.id}_${k}_${F.W}x${F.H}.png`) });
      await pg.close(); fs.unlinkSync(hp);
    }
  }
  await b.close(); console.log('ok');
})();
