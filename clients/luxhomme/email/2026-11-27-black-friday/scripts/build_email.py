"""Письмо «Главный день Чёрной пятницы» (Битрикс24, отправка 27.11.2026 в 10:00 МСК).

usage:
  python3 -I build_email.py images   # скачать фото, сжать под письмо, загрузить в медиатеку WP -> images.json
  python3 -I build_email.py build    # цены из каталога сайта -> email-bitrix24.html и превью с картинками внутри
Перед отправкой утром 27.11 запустить build ещё раз: цены на сайте меняются почти каждый день.
Авторизацию в WP подставляет прокси окружения Merlin_agency."""
import base64, html as H, io, json, os, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SITE = "https://luxhomme.store"
UP = SITE + "/wp-content/uploads/"
CAMPAIGN = "bf_main_day_2026_11_27"
INK, BG, OUTER, MUTED, LIME, BEIGE = "#161616", "#EFEEEB", "#E1DFDA", "#78746A", "#DAE54B", "#E8E4DA"

SUBJECT = "До конца Чёрной пятницы 4 дня"
PREHEADER = "Промокод BLACK20: −20% на весь заказ до 30 ноября. И подарки маме ко Дню матери."

# slug: (подпись, название, текст, исходное фото)
PRODUCTS = [
    ("vertikalnyj-suhoj-pylesos-aerlyn", "Для быстрой уборки каждый день", "Пылесос Aerlyn",
     "Беспроводной, до 60 минут работы, мощность всасывания до 35 000 Па. Есть насадка для влажной уборки.", "2026/06/VMP-stranitsa-tovara-98.png"),
    ("kompaktnyj-moyushhij-pylesos-cleneo-pro", "Для дивана и ковров", "Моющий пылесос Cleneo Pro",
     "Моет полы и ковры, чистит мягкую мебель и подаёт пар. Бак чистой воды 1,8 литра, 11 насадок.", "2026/05/VMP-stranitsa-tovara-1-2.png"),
    ("vertikalnyj-moyushhij-pylesos-aqvion-pro", "Пылесосит и моет за один проход", "Моющий пылесос Aqvion Pro",
     "Беспроводной, раздельные баки для чистой и грязной воды, самоочистка и сушка щётки на базе.", "2026/05/VMP-stranitsa-tovara-12.png"),
    ("caffio-professional", "Для капучино и латте", "Кофемашина Caffio Professional",
     "Рожковая, с автоматическим капучинатором и подогревом чашек. Молотый кофе, капсулы и чалды.", "2026/09/Caffio-Professional-1.7.png"),
]
HERO_SRC = os.path.join(ROOT, "..", "..", "direct", "creatives-bf-2026-11", "pylesosy_1080.jpg")
HERO_ALT = "Чёрная пятница в Luxhommè: −20% на весь заказ по промокоду BLACK20"
ARTICLE = "/blog/podarok-mame-po-byudzhetu"


def utm(path, content):
    sep = "&amp;" if "?" in path else "?"
    return f"{SITE}{path}{sep}utm_source=crm&amp;utm_medium=email&amp;utm_campaign={CAMPAIGN}&amp;utm_content={content}"


def rub(n):
    return f"{n:,}".replace(",", "&nbsp;") + "&nbsp;₽"


def get(url):
    with urllib.request.urlopen(url, timeout=120) as r:
        return r.read()


def images():
    from PIL import Image, ImageOps
    os.makedirs(os.path.join(ROOT, "images"), exist_ok=True)
    out = {}
    jobs = [("hero", open(HERO_SRC, "rb").read(), (1200, 1200), HERO_ALT)] + \
           [(s, get(UP + src), (560, 620), name) for s, _, name, _, src in PRODUCTS]
    for key, raw, size, alt in jobs:
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        im = ImageOps.fit(im, size, Image.LANCZOS, centering=(0.5, 0.45))
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=82, optimize=True, progressive=True)
        fn = f"luxhomme-email-bf-2026-11-27-{key}.jpg"
        open(os.path.join(ROOT, "images", fn), "wb").write(buf.getvalue())
        req = urllib.request.Request(SITE + "/wp-json/wp/v2/media", method="POST", data=buf.getvalue(),
                                     headers={"Content-Type": "image/jpeg", "Content-Disposition": f'attachment; filename="{fn}"'})
        m = json.load(urllib.request.urlopen(req, timeout=120))
        req = urllib.request.Request(f"{SITE}/wp-json/wp/v2/media/{m['id']}", method="POST",
                                     data=json.dumps({"alt_text": alt}).encode(), headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=60).read()
        out[key] = {"id": m["id"], "url": m["source_url"], "kb": len(buf.getvalue()) // 1024}
        print(key, out[key])
    json.dump(out, open(os.path.join(HERE, "images.json"), "w"), indent=1)


def card(slug, kicker, name, text, img, price, regular):
    old = f'<span style="font-size:15px;line-height:22px;color:{MUTED};text-decoration:line-through;font-weight:normal;">{rub(regular)}</span>' if regular > price else ""
    return (f'<td class="half" width="50%" valign="top" style="padding:7px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="table-layout:fixed;border-radius:14px;">'
            f'<tr><td height="286" style="height:286px;line-height:0;"><a href="{utm("/products/" + slug, slug)}"><img src="{img}" width="258" height="286" alt="{H.escape(name)} Luxhommè" style="display:block;width:100%;height:286px;object-fit:cover;border-radius:14px 14px 0 0;"></a></td></tr>'
            f'<tr><td style="padding:18px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">'
            f'<tr><td height="22" valign="top" style="height:22px;font-size:12px;line-height:17px;color:{MUTED};">{kicker}</td></tr>'
            f'<tr><td height="54" valign="top" style="height:54px;font-size:19px;line-height:25px;font-weight:bold;">{name}</td></tr>'
            f'<tr><td height="32" valign="top" style="height:32px;font-size:21px;line-height:28px;font-weight:bold;">{rub(price)} {old}</td></tr>'
            f'<tr><td height="92" valign="top" style="height:92px;font-size:14px;line-height:21px;">{text}</td></tr>'
            f'<tr><td height="25" valign="bottom" style="height:25px;"><a href="{utm("/products/" + slug, slug)}" style="font-size:15px;line-height:22px;font-weight:bold;color:{INK};text-decoration:underline;">Смотреть на сайте →</a></td></tr>'
            f'</table></td></tr></table></td>')


def button(href, label, bg=INK, color="#FFFFFF"):
    return (f'<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="{bg}" style="border-radius:10px;mso-padding-alt:16px 24px;">'
            f'<a href="{href}" style="display:inline-block;padding:16px 24px;font-size:16px;line-height:22px;font-weight:bold;text-decoration:none;color:{color};">{label}</a></td></tr></table>')


def build():
    imgs = json.load(open(os.path.join(HERE, "images.json")))
    cat = {r["slug"]: r for r in json.loads(get(SITE + "/wp-json/wc/store/v1/products?per_page=100"))}
    def pr(slug):
        p = cat[slug]["prices"]; k = 10 ** p["currency_minor_unit"]
        assert cat[slug]["is_in_stock"], f"{slug} нет в наличии"
        return int(p["price"]) // k, int(p["regular_price"]) // k
    cards = [card(s, kk, n, t, imgs[s]["url"], *pr(s)) for s, kk, n, t, _ in PRODUCTS]
    rows = f"<tr>{cards[0]}{cards[1]}</tr><tr>{cards[2]}{cards[3]}</tr>"
    days = "".join(
        f'<td width="25%" align="center" style="padding:0 4px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td align="center" bgcolor="{LIME if d == "27" else "#2C2C2C"}" style="border-radius:10px;padding:10px 0;color:{INK if d == "27" else "#FFFFFF"};">'
        f'<div style="font-size:26px;line-height:30px;font-weight:bold;">{d}</div><div style="font-size:11px;line-height:15px;">{lbl}</div></td></tr></table></td>'
        for d, lbl in (("27", "сегодня"), ("28", "суббота"), ("29", "День матери"), ("30", "последний день")))
    body = f"""<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>{SUBJECT}</title>
<!-- ТЕМА: {SUBJECT}
ПРЕХЕДЕР: {PREHEADER} -->
<style>body{{margin:0;padding:0;background:{OUTER};color:{INK};font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;}}table{{border-collapse:separate;border-spacing:0;}}img{{border:0;outline:none;}}a{{color:inherit;}}@media screen and (max-width:620px){{.wrap{{width:100%!important;}}.pad{{padding:26px 22px!important;}}.headline{{font-size:34px!important;line-height:39px!important;}}.half{{display:block!important;width:100%!important;box-sizing:border-box!important;padding:7px 0!important;}}.discount{{font-size:72px!important;line-height:80px!important;}}}}</style></head>
<body><div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;overflow:hidden;mso-hide:all;">{PREHEADER}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="{OUTER}"><tr><td align="center" style="padding:16px 8px;">
<table class="wrap" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="{BG}" style="width:600px;max-width:600px;">
<tr><td style="padding:0;font-size:0;line-height:0;"><a href="{utm("/catalog", "hero")}"><img src="{imgs["hero"]["url"]}" width="600" alt="{H.escape(HERO_ALT)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a></td></tr>
<tr><td class="pad" style="padding:34px 36px 32px;">
<p style="margin:0 0 22px;font-size:12px;line-height:18px;letter-spacing:2px;color:#696658;">27 НОЯБРЯ · ГЛАВНЫЙ ДЕНЬ ЧЁРНОЙ ПЯТНИЦЫ</p>
<h1 class="headline" style="margin:0 0 22px;font-size:42px;line-height:47px;font-weight:bold;">До конца акции<br>осталось 4 дня</h1>
<p style="margin:0 0 16px;font-size:17px;line-height:26px;">Сегодня главный день Чёрной пятницы в Luxhommè. По промокоду BLACK20 скидка 20% на весь заказ на сайте, и действует она до 30 ноября.</p>
<p style="margin:0 0 24px;font-size:17px;line-height:26px;">Если давно присматривались к пылесосу или кофемашине, сейчас хороший момент, чтобы перестать откладывать.</p>
{button(utm("/catalog", "intro"), "Выбрать технику")}
</td></tr>
<tr><td class="pad" bgcolor="{INK}" style="padding:30px 36px;color:#FFFFFF;">
<p style="margin:0 0 10px;font-size:13px;line-height:20px;letter-spacing:1px;color:{LIME};">ЧЁРНАЯ ПЯТНИЦА ДО 30 НОЯБРЯ</p>
<p style="margin:0 0 20px;font-size:26px;line-height:33px;font-weight:bold;">Успейте до 30 ноября</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;"><tr><td bgcolor="{BG}" style="padding:14px 22px;border-radius:10px;color:{INK};"><span style="font-size:12px;line-height:18px;">Ваш промокод</span><br><strong style="font-size:29px;line-height:36px;letter-spacing:2px;">BLACK20</strong></td></tr></table>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;margin:0 0 20px;"><tr>{days}</tr></table>
<p style="margin:0;font-size:15px;line-height:23px;color:{BG};">Скидка 20% на весь заказ. Введите код при оформлении заказа на luxhomme.store.</p>
</td></tr>
<tr><td class="pad" style="padding:30px 23px;"><h2 style="margin:0 7px 10px;font-size:27px;line-height:33px;">Большие покупки по цене Чёрной пятницы</h2><p style="margin:0 7px 18px;font-size:16px;line-height:24px;">Пылесосы под любую уборку и кофемашина для капучино. Цены на сайте на 27 ноября.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">{rows}</table></td></tr>
<tr><td class="pad" bgcolor="{BEIGE}" style="padding:28px 36px;"><p style="margin:0 0 10px;font-size:12px;line-height:18px;letter-spacing:2px;color:#696658;">29 НОЯБРЯ · ДЕНЬ МАТЕРИ</p><h2 style="margin:0 0 14px;font-size:25px;line-height:31px;">Подарок маме ещё можно выбрать</h2><p style="margin:0 0 18px;font-size:16px;line-height:25px;">Собрали технику Luxhommè по бюджету: до 5&nbsp;000, 10&nbsp;000 и 20&nbsp;000&nbsp;₽. Если подарок должен приехать к воскресенью, проверьте срок доставки при оформлении заказа.</p>
<a href="{utm(ARTICLE, "mothers_day_article")}" style="font-size:16px;line-height:22px;font-weight:bold;color:{INK};text-decoration:underline;">Подарок маме по бюджету →</a></td></tr>
<tr><td class="pad" bgcolor="{LIME}" style="padding:30px 36px;"><h2 style="margin:0 0 12px;font-size:26px;line-height:32px;">BLACK20 работает до 30 ноября</h2><p style="margin:0 0 22px;font-size:16px;line-height:24px;">Скидка 20% на весь заказ на luxhomme.store. После 30 ноября промокод перестанет действовать.</p>{button(utm("/catalog", "bottom"), "Перейти в каталог")}</td></tr>
<tr><td style="padding:24px 30px 30px;font-size:12px;line-height:18px;color:#66665D;"><p style="margin:0 0 16px;">BLACK20 действует только при заказе на luxhomme.store до 30.11.2026 включительно. Примените промокод при оформлении заказа. Цены указаны на 27.11.2026 и могут измениться. Срок доставки в ваш город уточняйте перед покупкой.</p><p style="margin:0 0 16px;">Поможем с выбором: <a href="mailto:care@luxhomme.store" style="color:{INK};">care@luxhomme.store</a></p><p style="margin:0 0 12px;">Вы получили это письмо, потому что подписались на рассылку Luxhommè.<br><a href="#UNSUBSCRIBE_LINK#" style="color:#66665D;text-decoration:underline;">Отписаться от рассылки</a></p><p style="margin:0;font-size:10px;line-height:15px;">ООО «САУДАГАР Е-КОМ», ИНН 1686050910<br>420061, Казань, ул. Николая Ершова, дом 62, помещение 10</p></td></tr>
</table></td></tr></table></body></html>
"""
    assert "—" not in body, "длинное тире"
    open(os.path.join(ROOT, "email-bitrix24.html"), "w", encoding="utf-8").write(body)
    # превью: те же картинки, встроенные в файл
    prev = body
    for v in imgs.values():
        local = os.path.join(ROOT, "images", v["url"].rsplit("/", 1)[1])
        prev = prev.replace(v["url"], "data:image/jpeg;base64," + base64.b64encode(open(local, "rb").read()).decode())
    open(os.path.join(ROOT, "Luxhomme_email_preview.html"), "w", encoding="utf-8").write(prev)
    print("цены:", {s: pr(s) for s, *_ in PRODUCTS})
    print("html:", len(body) // 1024, "КБ; картинки:", sum(v["kb"] for v in imgs.values()), "КБ")


if __name__ == "__main__":
    {"images": images, "build": build}[sys.argv[1]]()
