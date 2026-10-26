"""Мини-краулер для on-page SEO. usage: python3 -I crawl.py <sitemap.xml> <out.json>"""
import json, re, subprocess, sys, html as H
from urllib.parse import urljoin, urlparse

SM, OUT = sys.argv[1], sys.argv[2]
UA = "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)"
urls = re.findall(r"<loc>([^<]+)</loc>", open(SM, encoding="utf-8").read())


def fetch(u):
    r = subprocess.run(["curl", "-sS", "-m", "30", "-A", UA, "-w", "\n__META__%{http_code} %{time_starttransfer} %{size_download}", u],
                       capture_output=True)
    s = r.stdout.decode("utf-8", "ignore")
    body, _, meta = s.rpartition("\n__META__")
    code, ttfb, size = (meta.split() + ["0", "0", "0"])[:3]
    return body, int(code or 0), float(ttfb or 0), int(size or 0)


def one(rx, s, flags=re.S | re.I):
    m = re.search(rx, s, flags)
    return H.unescape(m.group(1)).strip() if m else ""


def meta(s, name):
    for rx in (rf'<meta[^>]+(?:name|property)="{name}"[^>]+content="([^"]*)"',
               rf'<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="{name}"'):
        v = one(rx, s)
        if v:
            return v
    return ""


def visible_text(s):
    s = re.sub(r"<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>", " ", s, flags=re.S | re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", H.unescape(s)).strip()


res = []
for u in urls:
    s, code, ttfb, size = fetch(u)
    imgs = re.findall(r"<img\b[^>]*>", s, re.I)
    no_alt = [i for i in imgs if not re.search(r'\balt="[^"]+', i)]
    links = set(urljoin(u, h) for h in re.findall(r'<a\b[^>]*href="([^"#]+)"', s, re.I))
    internal = sorted(l for l in links if urlparse(l).netloc in ("", "luxhomme.store"))
    ld = re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', s, re.S | re.I)
    ld_types = []
    for b in ld:
        ld_types += re.findall(r'"@type"\s*:\s*"([^"]+)"', b)
    txt = visible_text(s)
    res.append({
        "url": u, "code": code, "ttfb": ttfb, "size": size,
        "title": one(r"<title[^>]*>(.*?)</title>", s),
        "description": meta(s, "description"),
        "robots": meta(s, "robots"),
        "canonical": one(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', s),
        "og_title": meta(s, "og:title"), "og_image": meta(s, "og:image"),
        "h1": [visible_text(x) for x in re.findall(r"<h1\b[^>]*>(.*?)</h1>", s, re.S | re.I)],
        "h2": [visible_text(x) for x in re.findall(r"<h2\b[^>]*>(.*?)</h2>", s, re.S | re.I)][:15],
        "words": len(txt.split()),
        "imgs": len(imgs), "imgs_no_alt": len(no_alt),
        "internal_links": len(internal),
        "jsonld_types": sorted(set(ld_types)),
        "hreflang": re.findall(r'hreflang="([^"]+)"', s),
        "lang": one(r"<html[^>]+lang=\"([^\"]+)\"", s),
        "text_sample": txt[:400],
    })
    print(code, u, file=sys.stderr)
json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
