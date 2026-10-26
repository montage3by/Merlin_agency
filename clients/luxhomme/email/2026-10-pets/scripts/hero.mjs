import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch({args:['--allow-file-access-from-files']}); const p=await b.newPage({viewport:{width:1200,height:880}});
await p.goto('file://'+process.cwd()+'/hero.html',{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'hero.png'}); await b.close();
