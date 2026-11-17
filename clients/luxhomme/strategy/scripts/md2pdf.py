"""Простой md → HTML → PDF для документов проекта (заголовки, таблицы, списки, жирный).
usage: python3 md2pdf.py <in.md> <out.pdf> <fonts_dir>"""
import html, os, re, subprocess, sys
src, out, fonts = sys.argv[1:4]
lines = open(src, encoding="utf-8").read().splitlines()
def inl(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return re.sub(r"`(.+?)`", r"<code>\1</code>", t)
body, i = [], 0
while i < len(lines):
    l = lines[i]
    if l.startswith("# "): body.append(f"<h1>{inl(l[2:])}</h1>")
    elif l.startswith("## "): body.append(f"<h2>{inl(l[3:])}</h2>")
    elif l.startswith("|"):
        rows = []
        while i < len(lines) and lines[i].startswith("|"):
            rows.append([c.strip() for c in lines[i].strip("|").split("|")]); i += 1
        h, rs = rows[0], [r for r in rows[2:]]
        body.append("<table><tr>" + "".join(f"<th>{inl(c)}</th>" for c in h) + "</tr>" +
                    "".join("<tr>" + "".join(f"<td>{inl(c)}</td>" for c in r) + "</tr>" for r in rs) + "</table>")
        continue
    elif l.startswith("- "):
        items = []
        while i < len(lines) and lines[i].startswith("- "):
            items.append(f"<li>{inl(lines[i][2:])}</li>"); i += 1
        body.append("<ul>" + "".join(items) + "</ul>"); continue
    elif l.strip(): body.append(f"<p>{inl(l)}</p>")
    i += 1
f = lambda n: "file://" + os.path.abspath(os.path.join(fonts, n))
doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Onest;src:url({f('onest-cyr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}}
@font-face{{font-family:Onest;src:url({f('8800dfc60902df36-s.p.0w5jfcbmuwuqr.woff2')}) format("woff2");font-weight:100 900;unicode-range:U+0-FF,U+131,U+152-153,U+2000-206F,U+20AC,U+2122,U+2212}}
@page{{size:A4;margin:16mm 14mm}}
body{{font-family:Onest,Arial,sans-serif;color:#2a2a2a;font-size:10.5pt;line-height:1.45}}
h1{{font-size:20pt;font-weight:500;margin:0 0 10px}} h2{{font-size:13.5pt;font-weight:600;margin:20px 0 8px;padding-top:6px;border-top:2px solid #DFB195}}
table{{width:100%;border-collapse:collapse;margin:6px 0 10px;font-size:9.3pt;page-break-inside:auto}} tr{{page-break-inside:avoid}}
th{{background:#efeeeb;text-align:left;font-weight:600}} th,td{{border:1px solid #d9d7d2;padding:5px 7px;vertical-align:top}}
ul{{margin:4px 0 8px;padding-left:18px}} li{{margin:2px 0}} p{{margin:5px 0}} code{{font-size:9pt;background:#efeeeb;padding:0 3px}}
</style></head><body>{''.join(body)}</body></html>"""
hp = out[:-4] + ".html"; open(hp, "w", encoding="utf-8").write(doc)
js = f"""const {{chromium}}=require(process.env.PW_PATH);(async()=>{{const b=await chromium.launch({{args:['--allow-file-access-from-files']}});const p=await b.newPage();await p.goto('file://{os.path.abspath(hp)}');await p.evaluate(()=>document.fonts.ready);await p.pdf({{path:'{os.path.abspath(out)}',format:'A4',printBackground:true,margin:{{top:'16mm',bottom:'16mm',left:'14mm',right:'14mm'}}}});await b.close();}})();"""
subprocess.run(["node", "-e", js], check=True, env={**os.environ, "PW_PATH": subprocess.check_output(["npm", "root", "-g"], text=True).strip() + "/playwright"})
os.remove(hp)
