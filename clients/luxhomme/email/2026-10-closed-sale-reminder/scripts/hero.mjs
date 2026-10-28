import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage({viewport:{width:600,height:440},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/hero.html',{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'hero.png',clip:{x:0,y:0,width:600,height:440}}); await b.close();
