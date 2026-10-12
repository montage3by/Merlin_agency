"""Письмо «Закрытая распродажа −15%» для Битрикс24 + пакет картинок.
usage: python3 build_email.py <src_img_dir> <hero_dir> <products.json> <out_dir> [img_base_url]
src_img_dir — картинки с luxhomme.store; hero_dir — hero.png и logo.png из hero.mjs;
products.json — карточки (direct/scripts/extract.py); img_base_url — где будут лежать картинки (по умолчанию images/ рядом с письмом).
"""
import html, json, os, sys
from PIL import Image

SRC, HERO, PJ, OUT = sys.argv[1:5]
IMG_BASE = (sys.argv[5].rstrip("/") if len(sys.argv) > 5 else "images")

PROMO = "CLOSED15"          # заглушка: заменить на код из системы сайта или на макрос поля контакта в Битрикс24
DISCOUNT = 0.15
UNTIL = "30.10.2026"
UNSUB = "#UNSUBSCRIBE_LINK#"  # макрос отписки Битрикс24 — сверить в редакторе (кнопка «Персонализация»)
SITE = "https://luxhomme.store"
UTM = "utm_source=bitrix&utm_medium=email&utm_campaign=closed_sale_2026_10"

C = dict(bg="#e1dfda", page="#efeeeb", card="#ffffff", text="#2a2a2a", grey="#6b6b69", stroke="#c2c2bd",
         cta="#e7ae90", accent="#a85a35", clean="#86adea", cook="#e7ae90", care="#a9cb73")
FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

D = json.load(open(PJ, encoding="utf-8"))
os.makedirs(os.path.join(OUT, "images"), exist_ok=True)


def link(path, content):
    sep = "&" if "?" in path else "?"
    return f"{SITE}{path}{sep}{UTM}&utm_content={content}"


def save_jpg(src, name, size, focus=(0.5, 0.5)):
    """Кроп по пропорции size с фокусом и сохранение JPG."""
    im = Image.open(src).convert("RGB")
    tw, th = size
    r = tw / th
    w, h = im.size
    if w / h > r:
        nw = int(h * r)
        x = int(min(max(focus[0] * w - nw / 2, 0), w - nw))
        im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / r)
        y = int(min(max(focus[1] * h - nh / 2, 0), h - nh))
        im = im.crop((0, y, w, y + nh))
    im = im.resize(size, Image.LANCZOS)
    p = os.path.join(OUT, "images", name)
    im.save(p, "JPEG", quality=82, optimize=True, progressive=True)
    return name


def save_png(src, name, size):
    im = Image.open(src).convert("RGBA").resize(size, Image.LANCZOS)
    im.save(os.path.join(OUT, "images", name), "PNG", optimize=True)
    return name


I = lambda n: f"{IMG_BASE}/{n}"

save_jpg(os.path.join(HERO, "hero.png"), "hero.jpg", (1200, 880))
Image.open(os.path.join(HERO, "logo.png")).save(os.path.join(OUT, "images", "logo.png"), optimize=True)
SERIES = [("Уборка", "clean", "clean.jpg", C["clean"], (0.62, 0.5)),
          ("Кухня", "kitchen", "kitchen.jpg", C["cook"], (0.5, 0.5)),
          ("Забота", "care", "care.jpg", C["care"], (0.5, 0.5))]
for t, key, f, _, foc in SERIES:
    save_jpg(os.path.join(SRC, f), f"series-{key}.jpg", (360, 440), foc)
PICKS = [("vertikalnyj-moyushhij-pylesos-aqvion-pro", "Вертикальный моющий пылесос Aqvion Pro", "VMP-stranitsa-tovara-12.png", "aqvion", "Моет полы, а потом сам себя чистит и сушит на базе."),
         ("cremax", "Кофемашина с кофемолкой CremaX", "CremaX-1.1.jpg", "cremax", "Мелет зёрна сама, молоко взбивает тоже сама."),
         ("airgrill-dual-pro", "Аэрогриль AirChef Dual Pro, 2 чаши", "aerogril-14-1.png", "dualpro", "Горячее и гарнир готовятся одновременно, запахи не смешиваются."),
         ("vibroplatforma-dlya-pohudeniya-3d-c-ems-tokami-i-nagrevom-do-150-kg", "Виброплатформа uFit 3D Max", "hf_20260601_122621_948b5ac2_1879_4fd6_b191_3dfe3add6664_1_1.png", "ufit3d", "Тренажёр для дома: вибрация, EMS и нагрев в одной платформе.")]
for slug, _, f, key, _ in PICKS:
    save_jpg(os.path.join(SRC, f), f"p-{key}.jpg", (540, 720))
SOC = [("ВКонтакте", "https://vk.com/luxhomme", "vk-bg.png", "vk"),
       ("Telegram", "https://t.me/Luxhomme", "telegram-bg.png", "tg"),
       ("Дзен", "https://dzen.ru/luxhomme", "dzen-bg.png", "dzen"),
       ("YouTube", "https://www.youtube.com/@Luxhomm%C3%A8/shorts", "youtube-bg.png", "yt")]
for _, _, f, key in SOC:
    save_png(os.path.join(SRC, f), f"soc-{key}.png", (72, 72))


def money(x):
    return f"{x:,.0f}".replace(",", " ") + " ₽"


def rub_round(x):
    return int(x + 0.5)


e = html.escape


def btn(text, href, bg=C["cta"], fg=C["text"], w=260):
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
<td align="center" bgcolor="{bg}" style="border-radius:999px;">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{href}" style="height:52px;v-text-anchor:middle;width:{w}px;" arcsize="50%" stroke="f" fillcolor="{bg}"><center style="color:{fg};font-family:Arial,sans-serif;font-size:16px;">{e(text)}</center></v:roundrect><![endif]-->
<!--[if !mso]><!--><a href="{href}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:{FONT};font-size:16px;line-height:20px;color:{fg};text-decoration:none;border-radius:999px;background:{bg};min-width:{w - 72}px;">{e(text)}</a><!--<![endif]-->
</td></tr></table>"""


P = lambda s, extra="": f'<p style="margin:0 0 14px;font-family:{FONT};font-size:16px;line-height:24px;color:{C["text"]};{extra}">{s}</p>'

# ── блоки
pre = "Код только для подписчиков. Работает на всю технику до 30 октября."

steps = [("1", "Положите технику в корзину", "Одну вещь или сразу несколько, код работает на весь каталог."),
         ("2", "Введите код", f"В корзине есть поле «Промокод». Впишите туда {PROMO}."),
         ("3", "Оформите заказ", "Корзина сразу покажет цену со скидкой.")]
steps_html = "".join(f"""<tr><td valign="top" width="44" style="padding:0 0 18px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="32" height="32" bgcolor="{C['text']}" style="border-radius:16px;font-family:{FONT};font-size:14px;font-weight:bold;color:#ffffff;">{n}</td></tr></table></td>
<td valign="top" style="padding:4px 0 18px;font-family:{FONT};font-size:16px;line-height:22px;color:{C['text']};"><strong>{e(t)}</strong><br><span style="color:{C['grey']};font-size:14px;">{e(d)}</span></td></tr>""" for n, t, d in steps)

series_html = "".join(f"""<td valign="top" width="180" style="padding:0 5px;">
<a href="{link('/catalog?series=' + key, 'series_' + key)}" target="_blank" style="text-decoration:none;">
<img src="{I('series-' + key + '.jpg')}" width="170" height="208" alt="Серия «{t}»" style="display:block;width:100%;max-width:170px;height:auto;border:0;border-radius:12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr>
<td width="10" height="10" bgcolor="{col}" style="border-radius:5px;font-size:0;line-height:0;">&nbsp;</td>
<td style="padding-left:8px;font-family:{FONT};font-size:16px;line-height:20px;color:{C['text']};">{t}&nbsp;→</td></tr></table></a></td>""" for t, key, _, col, _ in SERIES)


def card(slug, title, key, hook):
    d = D[slug]
    price = int(float(d["price"]))
    promo = rub_round(price * (1 - DISCOUNT))
    url = link(f"/products/{slug}", "product_" + key)
    return f"""<td class="col2" valign="top" width="270" style="padding:0 7px 24px;">
<a href="{url}" target="_blank" style="text-decoration:none;"><img src="{I('p-' + key + '.jpg')}" width="256" height="341" alt="{e(title)}" style="display:block;width:100%;max-width:256px;height:auto;border:0;border-radius:12px;"></a>
<p style="margin:12px 0 6px;font-family:{FONT};font-size:15px;line-height:20px;color:{C['text']};"><strong>{e(title)}</strong></p>
<p style="margin:0 0 10px;font-family:{FONT};font-size:14px;line-height:20px;color:{C['text']};min-height:40px;">{e(hook)}</p>
<p style="margin:0;font-family:{FONT};font-size:14px;line-height:20px;color:{C['grey']};">На сайте: {money(price)}</p>
<p style="margin:2px 0 10px;font-family:{FONT};font-size:18px;line-height:24px;color:{C['text']};"><strong>{money(promo)}</strong> <span style="font-size:13px;color:{C['accent']};">с вашим кодом</span></p>
<a href="{url}" target="_blank" style="font-family:{FONT};font-size:14px;line-height:20px;color:{C['text']};text-decoration:underline;">Посмотреть</a></td>"""


cards = [card(s, t, k, h) for s, t, _, k, h in PICKS]
cards_html = f"<tr>{cards[0]}{cards[1]}</tr><tr>{cards[2]}{cards[3]}</tr>"

benefits = [("Свой сервисный центр", "в России"), ("Сломалось по гарантии?", "Заберём бесплатно через СДЭК"), ("Служба заботы", "на связи с 9 до 21 по Москве")]
ben_html = "".join(f"""<td class="col3" valign="top" width="33%" style="padding:0 8px;font-family:{FONT};font-size:14px;line-height:20px;color:{C['text']};text-align:center;">
<strong>{e(a)}</strong><br><span style="color:{C['grey']};">{e(b)}</span></td>""" for a, b in benefits)

soc_html = "".join(f"""<td style="padding:0 6px;"><a href="{u}" target="_blank"><img src="{I('soc-' + k + '.png')}" width="36" height="36" alt="{e(n)}" style="display:block;border:0;"></a></td>""" for n, u, _, k in SOC)

H = f"""<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Закрытая распродажа: −15% на всю технику Luxhommè</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
body{{margin:0;padding:0;}} table{{border-collapse:collapse;}} img{{-ms-interpolation-mode:bicubic;}}
a[x-apple-data-detectors]{{color:inherit!important;text-decoration:none!important;}}
@media screen and (max-width:620px){{
 .wrap{{width:100%!important;}} .px{{padding-left:20px!important;padding-right:20px!important;}}
 .col2,.col3{{display:block!important;width:100%!important;max-width:100%!important;padding:0 0 20px!important;box-sizing:border-box;}}
 .col2 img,.col3 img{{max-width:100%!important;width:100%!important;}}
 .code{{font-size:30px!important;letter-spacing:4px!important;}}
 .h1{{font-size:28px!important;line-height:34px!important;}}
}}
</style>
</head>
<body style="margin:0;padding:0;background:{C['bg']};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:{C['bg']};">{e(pre)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{C['bg']}" style="background:{C['bg']};">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="{C['page']}" style="width:600px;max-width:600px;background:{C['page']};">

<!-- шапка -->
<tr><td align="center" style="padding:28px 20px 22px;">
<a href="{link('/', 'logo')}" target="_blank"><img src="{I('logo.png')}" width="150" height="20" alt="LUXHOMMÈ" style="display:block;border:0;"></a>
</td></tr>

<!-- обложка -->
<tr><td>
<a href="{link('/catalog', 'hero')}" target="_blank"><img src="{I('hero.jpg')}" width="600" height="440" alt="Закрытая распродажа для своих: −15% на всю технику" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a>
</td></tr>

<!-- вступление -->
<tr><td class="px" style="padding:40px 48px 8px;">
<h1 class="h1" style="margin:0 0 18px;font-family:{FONT};font-size:32px;line-height:38px;font-weight:normal;color:{C['text']};">Ждали скидку? Она уже у вас</h1>
{P("Здравствуйте!")}
{P("Мы устроили закрытую распродажу и рассказываем о ней только подписчикам. Ниже ваш промокод: он даёт 15% на любую технику Luxhommè на сайте, будь то моющий пылесос, кофемашина или аэрогриль.")}
{P("Если что-то давно лежит в закладках или просто в мыслях, сейчас оно обойдётся на 15% дешевле.")}
</td></tr>

<!-- промокод -->
<tr><td class="px" style="padding:16px 48px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{C['card']}" style="background:{C['card']};border-radius:16px;">
<tr><td align="center" style="padding:30px 24px 32px;">
<p style="margin:0 0 12px;font-family:{FONT};font-size:12px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:{C['grey']};">Ваш промокод</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
<td class="code" align="center" style="padding:14px 28px;border:2px dashed {C['cta']};border-radius:12px;font-family:{FONT};font-size:36px;line-height:42px;font-weight:bold;letter-spacing:6px;color:{C['text']};">{e(PROMO)}</td>
</tr></table>
<p style="margin:18px 0 4px;font-family:{FONT};font-size:20px;line-height:26px;color:{C['text']};"><strong>−15% на всю технику Luxhommè</strong></p>
<p style="margin:0 0 24px;font-family:{FONT};font-size:15px;line-height:22px;color:{C['grey']};">Работает на luxhomme.store до 30 октября</p>
{btn("Выбрать со скидкой", link('/catalog', 'cta_promo'))}
</td></tr></table>
</td></tr>

<!-- как применить -->
<tr><td class="px" style="padding:36px 48px 10px;">
<h2 style="margin:0 0 20px;font-family:{FONT};font-size:22px;line-height:28px;font-weight:normal;color:{C['text']};">Как получить скидку</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{steps_html}</table>
</td></tr>

<!-- серии -->
<tr><td class="px" style="padding:20px 30px 12px;">
<h2 style="margin:0 0 20px 18px;font-family:{FONT};font-size:22px;line-height:28px;font-weight:normal;color:{C['text']};">Код подходит ко всему каталогу</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>{series_html}</tr></table>
</td></tr>

<!-- подборка -->
<tr><td class="px" style="padding:36px 30px 4px;">
<h2 style="margin:0 0 20px 18px;font-family:{FONT};font-size:22px;line-height:28px;font-weight:normal;color:{C['text']};">Если не знаете, с чего начать</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{cards_html}</table>
</td></tr>

<!-- второй CTA -->
<tr><td align="center" class="px" style="padding:4px 48px 40px;">
{P("30 октября код перестанет работать. До этого дня он ваш.", "text-align:center;")}
{btn("Выбрать технику", link('/catalog', 'cta_bottom'), bg=C['text'], fg='#ffffff')}
</td></tr>

<!-- сервис -->
<tr><td style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" bgcolor="{C['stroke']}" style="font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
<tr><td class="px" style="padding:28px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>{ben_html}</tr></table>
</td></tr>

<!-- подвал -->
<tr><td align="center" bgcolor="#cccbc9" style="background:#cccbc9;padding:32px 32px 36px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>{soc_html}</tr></table>
<p style="margin:20px 0 6px;font-family:{FONT};font-size:14px;line-height:20px;color:{C['text']};">
<a href="tel:88005057130" style="color:{C['text']};text-decoration:none;">8 800 505 71 30</a> ·
<a href="mailto:care@luxhomme.store" style="color:{C['text']};text-decoration:none;">care@luxhomme.store</a> ·
<a href="https://t.me/LuxhommeServiceBot" target="_blank" style="color:{C['text']};text-decoration:none;">Служба заботы в Telegram</a></p>
<p style="margin:0 0 14px;font-family:{FONT};font-size:12px;line-height:18px;color:#4a4a48;">Промокод {PROMO} работает при заказе на luxhomme.store до {UNTIL}.</p>
<p style="margin:0;font-family:{FONT};font-size:12px;line-height:18px;color:#4a4a48;">Это письмо пришло, потому что вы подписаны на новости luxhomme.store.<br>
<a href="{UNSUB}" style="color:#4a4a48;text-decoration:underline;">Отписаться</a><br><br>
ООО «САУДАГАР Е-КОМ», ИНН 1686050910<br>420061, Казань, ул. Николая Ершова, д. 62, помещение 10</p>
</td></tr>

</table>
</td></tr></table>
</body>
</html>
"""
open(os.path.join(OUT, "email.html"), "w", encoding="utf-8").write(H)
tot = sum(os.path.getsize(os.path.join(OUT, "images", f)) for f in os.listdir(os.path.join(OUT, "images")))
print("ok", len(H.encode()) // 1024, "KB html,", tot // 1024, "KB images")
for slug, t, _, k, _ in PICKS:
    p = int(float(D[slug]["price"]))
    print(t, p, "→", rub_round(p * (1 - DISCOUNT)))
