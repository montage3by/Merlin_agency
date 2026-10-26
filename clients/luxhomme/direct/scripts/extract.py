"""Факты о товарах со страниц сайта. usage: python3 -I extract.py <rawdir> <out.json>"""
import glob, html, json, os, re, sys

RAW, OUT = sys.argv[1], sys.argv[2]


def text(s):
    s = re.sub(r"<script.*?</script>|<style.*?</style>", " ", s, flags=re.S)
    s = html.unescape(re.sub(r"<[^>]+>", "\n", s))
    return [x.strip() for x in s.split("\n") if x.strip()]


res = {}
for f in sorted(glob.glob(os.path.join(RAW, "*.html"))):
    slug = os.path.basename(f)[:-5]
    s = open(f, encoding="utf-8", errors="ignore").read()
    prod = {}
    for b in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', s, re.S):
        try:
            d = json.loads(b)
        except Exception:
            continue
        if d.get("@type") == "Product":
            prod = d
    L = text(s)
    # описание: от «Описание» до следующего раздела
    def section(start, stops):
        try:
            i = L.index(start)
        except ValueError:
            return []
        out = []
        for x in L[i + 1:]:
            if x in stops:
                break
            out.append(x)
        return out
    stops = {"Видео", "Характеристики", "Аксессуары", "Инструкция", "Отзывы с маркетплейсов", "Другие товары"}
    # первое вхождение «Описание» — якорное меню; берём последнее
    idx = [i for i, x in enumerate(L) if x == "Описание"]
    desc = []
    if idx:
        for x in L[idx[-1] + 1:]:
            if x in stops:
                break
            desc.append(x)
    spec_idx = [i for i, x in enumerate(L) if x == "Характеристики"]
    specs = []
    if spec_idx:
        for x in L[spec_idx[-1] + 1: spec_idx[-1] + 160]:
            if x in {"Аксессуары", "Инструкция", "Отзывы с маркетплейсов", "Другие товары"}:
                break
            specs.append(x)
    acc_idx = [i for i, x in enumerate(L) if x == "Аксессуары"]
    acc = []
    if acc_idx:
        for x in L[acc_idx[-1] + 1: acc_idx[-1] + 40]:
            if x in {"Инструкция", "Отзывы с маркетплейсов", "Другие товары"}:
                break
            acc.append(x)
    imgs = prod.get("image") or []
    res[slug] = {
        "url": f"https://luxhomme.store/products/{slug}",
        "name": prod.get("name", ""),
        "sku": prod.get("sku", ""),
        "price": (prod.get("offers") or {}).get("price"),
        "availability": (prod.get("offers") or {}).get("availability", ""),
        "image": imgs[0] if isinstance(imgs, list) and imgs else imgs,
        "ld_description": prod.get("description", ""),
        "description": " ".join(desc)[:3000],
        "specs": specs,
        "accessories": acc,
    }
json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for k, v in res.items():
    print(k, "|", v["name"], "|", v["sku"], "|", v["price"], "| desc", len(v["description"]), "| specs", len(v["specs"]))
