"""YML-фид для товарной кампании Директа из открытого каталога сайта (WooCommerce Store API, только чтение).
Цены и наличие берутся с сайта на момент запуска, описания — из direct/luxhomme-direct-feed.yml.
usage: python3 -I build_feed_from_store.py out.yml [store.json] [--upload FEED_ID|--create]
  store.json — сохранённый ответ /wp-json/wc/store/v1/products?per_page=100 (без него скачивается)
  --create      — загрузить фид в Директ файлом (Feeds.add), напечатать Id
  --upload ID   — обновить файл существующего фида (Feeds.update)
Токен Директа подставляет прокси окружения, в скрипте его нет."""
import sys, json, re, html, base64, datetime, urllib.request, os
from xml.sax.saxutils import escape

OUT = sys.argv[1]
args = sys.argv[2:]
SRC = args[0] if args and not args[0].startswith("--") else None
HERE = os.path.dirname(os.path.abspath(__file__))
OLD_FEED = os.path.join(HERE, "..", "luxhomme-direct-feed.yml")
SALES_NOTES = "Скидка 20% по промокоду BLACK20"

# товары кампании: SKU на сайте -> (модель, тип для заголовка)
PRODUCTS = {
    "VACCLWASH": ("Aqvion Pro", "Вертикальный моющий пылесос"),
    "VACCLCOMPACT": ("Cleneo Pro", "Компактный моющий пылесос"),
    "VACCLDRY": ("Aerlyn", "Вертикальный беспроводной пылесос"),
    "SHVPAREKCHB2": ("EcoSteam Pro", "Паровая швабра"),
    "SHVPAR7V1CH": ("SC-100 Max", "Паровая швабра 7 в 1"),
    "SHVPAR3D": ("AirSteam Pro", "Паровая швабра"),
    "COFMASHCAP4V1": ("CoffeeMaker Classic", "Капсульная кофемашина 4 в 1"),
    "COFMASHROZH": ("Caffio Professional", "Рожковая кофемашина"),
    "COFMASHPOMOL": ("CremaX", "Зерновая кофемашина с кофемолкой"),
    "AEROGRIL55L2": ("AirChef 5,5 л", "Аэрогриль"),
    "AEROGRIL2CHASHI": ("AirChef Dual Pro", "Аэрогриль с двумя чашами"),
    "VIPLATB": ("uFit 2D Standard", "Виброплатформа"),
    "VIPLATEL2D": ("uFit 2D Pro", "Виброплатформа с EMS"),
    "ROBOTOKONKVADR": ("uClean Max", "Робот-мойщик окон"),
}
# виброплатформа 3D на сайте без SKU — по адресу
BY_SLUG = {"vibroplatforma-dlya-pohudeniya-3d-c-ems-tokami-i-nagrevom-do-150-kg": ("uFit 3D Max", "Виброплатформа 3D с EMS и нагревом")}
CATS = {"Техника для уборки": 1, "Техника для кухни": 2, "Техника для занятий спортом": 3}

if SRC:
    data = json.load(open(SRC))
else:
    req = urllib.request.Request("https://luxhomme.store/wp-json/wc/store/v1/products?per_page=100",
                                 headers={"User-Agent": "Mozilla/5.0"})
    data = json.load(urllib.request.urlopen(req, timeout=60))

old = open(OLD_FEED, encoding="utf-8").read()
desc = {}
for m in re.finditer(r"<offer .*?</offer>", old, re.S):
    o = m.group(0)
    slug = re.search(r"<url>https://luxhomme.store/products/([^?<]+)", o).group(1)
    d = re.search(r"<description>(.*?)</description>", o, re.S)
    if d: desc[slug] = html.unescape(re.sub(r"<[^>]+>", " ", d.group(1))).strip()

offers = []
for p in data:
    slug = p["permalink"].rstrip("/").split("/")[-1]
    info = PRODUCTS.get(p["sku"]) or BY_SLUG.get(slug)
    if not info or not p["is_in_stock"]: continue
    model, typ = info
    mu = p["prices"]["currency_minor_unit"]
    price = int(p["prices"]["price"]) / 10 ** mu
    reg = int(p["prices"]["regular_price"]) / 10 ** mu
    cat = CATS.get(p["categories"][0]["name"], 1) if p["categories"] else 1
    pics = [i["src"] for i in p["images"]][:5]
    d = desc.get(slug, f"{typ} Luxhommè {model}.")
    offers.append(dict(id=p["id"], url=f"https://luxhomme.store/products/{slug}", price=price,
                       old=reg if reg > price and reg <= price * 2 else None, cat=cat, pics=pics,
                       name=f"{typ} Luxhommè {model}", model=model, typ=typ, desc=d[:2900], sku=p["sku"] or slug))

now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
x = [f'<?xml version="1.0" encoding="UTF-8"?>', f'<yml_catalog date="{now}">', "<shop>",
     "<name>Luxhommè</name>", "<company>ООО «САУДАГАР Е-КОМ»</company>", "<url>https://luxhomme.store</url>",
     '<currencies><currency id="RUR" rate="1"/></currencies>', "<categories>"]
for n, i in CATS.items(): x.append(f'<category id="{i}">{escape(n)}</category>')
x.append("</categories>")
x.append("<offers>")
for o in offers:
    x.append(f'<offer id="{o["id"]}" available="true">')
    x.append(f"<url>{escape(o['url'])}</url>")
    x.append(f"<price>{o['price']:.0f}</price>")
    if o["old"]: x.append(f"<oldprice>{o['old']:.0f}</oldprice>")
    x.append("<currencyId>RUR</currencyId>")
    x.append(f"<categoryId>{o['cat']}</categoryId>")
    for pic in o["pics"]: x.append(f"<picture>{escape(pic)}</picture>")
    x.append(f"<name>{escape(o['name'])}</name>")
    x.append("<vendor>Luxhommè</vendor>")
    x.append(f"<model>{escape(o['model'])}</model>")
    x.append(f"<typePrefix>{escape(o['typ'])}</typePrefix>")
    x.append(f"<description>{escape(o['desc'])}</description>")
    x.append(f"<sales_notes>{escape(SALES_NOTES)}</sales_notes>")
    x.append("<delivery>true</delivery>")
    x.append(f"<vendorCode>{escape(o['sku'])}</vendorCode>")
    x.append("</offer>")
x += ["</offers>", "</shop>", "</yml_catalog>"]
open(OUT, "w", encoding="utf-8").write("\n".join(x))
for o in offers: print(f"{o['sku']:<18} {o['price']:>8.0f} {('old ' + format(o['old'], '.0f')) if o['old'] else '':<10} {o['url']}")
print("товаров:", len(offers))


def direct(path, method, params):
    req = urllib.request.Request("https://api.direct.yandex.com/json/" + path,
                                 data=json.dumps({"method": method, "params": params}).encode(),
                                 headers={"Authorization": "Bearer proxy-injected", "Accept-Language": "ru"})
    return json.load(urllib.request.urlopen(req, timeout=90))


b64 = base64.b64encode(open(OUT, "rb").read()).decode()
if "--create" in args:
    print(json.dumps(direct("v5/feeds", "add", {"Feeds": [{"Name": "Luxhommè сайт: товарная ЧП BLACK20 (файл из каталога)",
          "BusinessType": "RETAIL", "SourceType": "FILE", "FileFeed": {"Data": b64, "Filename": "luxhomme-feed.yml"}}]}), ensure_ascii=False))
if "--upload" in args:
    fid = int(args[args.index("--upload") + 1])
    print(json.dumps(direct("v5/feeds", "update", {"Feeds": [{"Id": fid, "FileFeed": {"Data": b64, "Filename": "luxhomme-feed.yml"}}]}), ensure_ascii=False))
