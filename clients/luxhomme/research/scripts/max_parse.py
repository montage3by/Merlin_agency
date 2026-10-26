"""Сбор MAX-каналов с telemetr.me: топы категорий + страницы каналов.

usage: python3 -I max_parse.py <out_dir> [extra_ids_file]
"""
import csv, html, json, os, re, subprocess, sys, time

OUT = sys.argv[1]
EXTRA = sys.argv[2] if len(sys.argv) > 2 else None
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"
CATS = ["parents", "house", "food", "lifehack", "beauty", "health", "free", "marketplace",
        "magaziny", "garden", "handmade", "design", "dating", "podslushano", "pets"]


def get(url):
    for _ in range(3):
        r = subprocess.run(["curl", "-sS", "-m", "25", "-A", UA, "-L", url], capture_output=True)
        if r.returncode == 0 and r.stdout:
            return r.stdout.decode("utf-8", "ignore")
        time.sleep(3)
    return ""


def text(s):
    s = re.sub(r"<script.*?</script>|<style.*?</style>", "", s, flags=re.S)
    s = html.unescape(re.sub(r"<[^>]+>", "\n", s))
    return [x.strip() for x in s.split("\n") if x.strip()]


def num(v):
    v = (v or "").replace("\xa0", "").replace(" ", "").replace("+", "").replace(",", ".").replace("%", "")
    try:
        return float(v)
    except ValueError:
        return None


def after(lines, label, n=1):
    for i, x in enumerate(lines):
        if x == label and i + n < len(lines):
            return lines[i + n]
    return ""


def channel(cid):
    s = get(f"https://telemetr.me/max/channels/{cid}")
    if not s:
        return None
    L = text(s)
    title = (re.findall(r"<title>(.*?)</title>", s) or [""])[0]
    title = html.unescape(re.sub(r"\s*—\s*Telemetr.*$", "", title)).strip()
    try:
        a = L.index("Показать полностью")
        b = L.index("Открыть в MAX")
        desc = " / ".join(L[a + 1:b]).replace(" / Показать полностью", "")
    except ValueError:
        desc = ""
    links = sorted(set(re.findall(r"(?:https?://)?(?:t\.me|max\.ru/u|vk\.(?:ru|com)|wa\.me)/[\w\-/+]+", desc)))
    ats = sorted(set(re.findall(r"@[\w]{4,}", desc)))
    return {
        "id": cid,
        "title": title,
        "url": f"https://max.ru/{cid}",
        "category": after(L, "Категория"),
        "subscribers": num(after(L, "Аудитория")),
        "views_24h": num(after(L, "24 ч")),
        "views_48h": num(after(L, "48 ч")),
        "er_pct": num(after(L, "Процент вовлеченности")),
        "reactions_avg": num(after(L, "Среднее реакций")),
        "growth_week": num(after(L, "Неделя")),
        "growth_month": num(after(L, "Месяц")),
        "posts_total": num(after(L, "Всего публикаций")),
        "description": desc[:600],
        "contacts": " ".join(links + ats),
        "telemetr": f"https://telemetr.me/max/channels/{cid}",
    }


def main():
    os.makedirs(OUT, exist_ok=True)
    ids = {}
    for c in CATS:
        s = get(f"https://telemetr.me/max/catalog/{c}")
        for cid in dict.fromkeys(re.findall(r"/max/channels/([A-Za-z0-9_]+)", s)):
            ids.setdefault(cid, set()).add("cat:" + c)
        time.sleep(1)
    if EXTRA:
        for line in open(EXTRA, encoding="utf-8"):
            p = line.strip().split("\t")
            if p and p[0]:
                ids.setdefault(p[0], set()).add("search:" + (p[1] if len(p) > 1 else ""))
    print("candidates", len(ids), file=sys.stderr)
    rows = []
    cache = os.path.join(OUT, "cache.jsonl")
    done = {}
    if os.path.exists(cache):
        for line in open(cache, encoding="utf-8"):
            d = json.loads(line)
            done[d["id"]] = d
    from concurrent.futures import ThreadPoolExecutor

    todo = [cid for cid in ids if cid not in done]

    def work(cid):
        d = channel(cid)
        time.sleep(1)
        return cid, d

    with open(cache, "a", encoding="utf-8") as cf, ThreadPoolExecutor(4) as ex:
        for cid, d in ex.map(work, todo):
            if d:
                done[cid] = d
                cf.write(json.dumps(d, ensure_ascii=False) + "\n")
                cf.flush()
    for cid, src in ids.items():
        if cid in done:
            rows.append(dict(done[cid], source=" ".join(sorted(src))))
    keys = ["id", "title", "url", "category", "subscribers", "views_24h", "views_48h", "er_pct",
            "reactions_avg", "growth_week", "growth_month", "posts_total", "contacts", "description",
            "telemetr", "source"]
    with open(os.path.join(OUT, "channels_raw.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=keys)
        w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, "") for k in keys})
    print("rows", len(rows), file=sys.stderr)


main()
