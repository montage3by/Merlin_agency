"""Аудит .md + скриншоты -> единый HTML для печати в PDF.
usage: python3 -I build_html.py <audit.md> <imgdir> <out.html>
Простой конвертер под наш markdown: заголовки, списки (2 уровня), чекбоксы, жирный, `код`, ссылки, таблицы, ---.
"""
import base64, html, os, re, sys

MD, IMG, OUT = sys.argv[1:4]

# куда вставлять скриншоты: после заголовка раздела (точное начало строки заголовка)
FIGS = {
    "### 🔴 1. Оформление заказа": [
        ("07-cart-login-required.jpg", "Корзина: единственная кнопка — «Войти и оформить заказ», без входа заказать нельзя"),
        ("06-added-to-cart.jpg", "После «В корзину»: уведомление и счётчик — хорошо. Ниже — «Войдите, чтобы указать адрес» вместо срока доставки"),
    ],
    "### 🔴 2. Карточка товара": [
        ("03-pdp-desktop.jpg", "Карточка на десктопе: первый экран собран правильно, но нет рейтинга, а доставка скрыта за входом"),
        [("04-pdp-mobile-first-screen.jpg", "Мобайл, первый экран: только фото, цены и кнопки нет"),
         ("05-pdp-mobile-price.jpg", "Мобайл, второй экран: цена и кнопки с белым текстом низкого контраста")],
    ],
    "### 🟠 4. Главная страница": [
        ("01-home-desktop.jpg", "Главная, первый экран: слайдер без заголовка, оффера и кнопки"),
        [("02-home-mobile.jpg", "Мобайл: белые логотип и иконки на светлом фоне, пока грузится фото"),
         ("09-blog-error-state-mobile.jpg", "Мобайл: cookie-баннер занимает половину экрана (здесь — поверх экрана ошибки блога с кнопкой «Повторить»)")],
    ],
    "### 🟠 5. Каталог": [
        ("08-catalog-cookie-banner.jpg", "Каталог: фильтр только по сериям, нет сортировки; cookie-баннер перекрывает кнопки товаров"),
    ],
}


def img_tag(name, cap, narrow=False):
    p = os.path.join(IMG, name)
    data = base64.b64encode(open(p, "rb").read()).decode()
    cls = "fig narrow" if narrow else "fig"
    return f'<figure class="{cls}"><img src="data:image/jpeg;base64,{data}"><figcaption>{html.escape(cap)}</figcaption></figure>'


def figs_html(items):
    out = []
    for it in items:
        if isinstance(it, list):
            out.append('<div class="pair">' + "".join(img_tag(n, c, True) for n, c in it) + "</div>")
        else:
            out.append(img_tag(*it))
    return "\n".join(out)


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<em>\1</em>", t)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', t)
    return t


lines = open(MD, encoding="utf-8").read().split("\n")
out, i = [], 0
list_stack = []  # уровни открытых <ul>/<ol>


def close_lists(to=0):
    while len(list_stack) > to:
        out.append(f"</{list_stack.pop()}>")


pending_figs = None
while i < len(lines):
    ln = lines[i]
    s = ln.rstrip()
    if not s.strip():
        i += 1
        continue
    # таблица
    if s.lstrip().startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[-\s|:]+\|\s*$", lines[i + 1]):
        close_lists()
        head = [c.strip() for c in s.strip().strip("|").split("|")]
        rows = []
        i += 2
        while i < len(lines) and lines[i].strip().startswith("|"):
            rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
            i += 1
        out.append("<table><thead><tr>" + "".join(f"<th>{inline(h)}</th>" for h in head) + "</tr></thead><tbody>" +
                   "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in rows) + "</tbody></table>")
        continue
    m = re.match(r"^(#{1,4})\s+(.*)", s)
    if m:
        close_lists()
        if pending_figs:
            out.append(figs_html(pending_figs)); pending_figs = None
        lvl = len(m.group(1))
        out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
        for key, items in FIGS.items():
            if s.startswith(key):
                pending_figs = items  # вставим после списка раздела
        i += 1
        continue
    if s.strip() == "---":
        close_lists()
        if pending_figs:
            out.append(figs_html(pending_figs)); pending_figs = None
        out.append("<hr>")
        i += 1
        continue
    m = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)", s)
    if m:
        depth = len(m.group(1)) // 2 + 1
        tag = "ol" if m.group(2)[0].isdigit() else "ul"
        while len(list_stack) < depth:
            list_stack.append(tag); out.append(f"<{tag}>")
        close_lists(depth)
        txt = m.group(3)
        cb = ""
        if txt.startswith("[ ] "):
            cb, txt = '<span class="cb">☐</span> ', txt[4:]
        out.append(f"<li>{cb}{inline(txt)}</li>")
        i += 1
        continue
    # продолжение пункта (строка с отступом без маркера)
    if ln.startswith("  ") and list_stack:
        out.append(f'<div class="cont">{inline(s.strip())}</div>')
        i += 1
        continue
    close_lists()
    out.append(f"<p>{inline(s.strip())}</p>")
    i += 1
close_lists()
if pending_figs:
    out.append(figs_html(pending_figs))

css = """
@page { size: A4; margin: 14mm 13mm 16mm; }
body { font-family: 'DejaVu Sans', Arial, sans-serif; font-size: 10.2pt; line-height: 1.45; color: #1f1f1f; }
h1 { font-size: 20pt; margin: 0 0 6pt; } h2 { font-size: 15pt; margin: 16pt 0 6pt; border-bottom: 1px solid #ddd; padding-bottom: 3pt; }
h3 { font-size: 12.2pt; margin: 14pt 0 5pt; page-break-after: avoid; } p { margin: 4pt 0; }
ul, ol { margin: 3pt 0 3pt 16pt; padding: 0; } li { margin: 2pt 0; } .cont { margin: 1pt 0 2pt 0; }
.cb { color: #888; } code { background: #f2f0ec; padding: 0 3px; border-radius: 3px; font-size: 9pt; }
strong { font-weight: 700; } hr { border: 0; border-top: 1px solid #ddd; margin: 12pt 0; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; font-size: 9.4pt; } th, td { border: 1px solid #ddd; padding: 4pt 6pt; text-align: left; vertical-align: top; } th { background: #f4f2ee; }
figure { margin: 8pt 0 10pt; page-break-inside: avoid; } figure img { width: 100%; border: 1px solid #ddd; border-radius: 4px; }
figcaption { font-size: 8.8pt; color: #555; margin-top: 3pt; }
.pair { display: flex; gap: 14pt; align-items: flex-start; page-break-inside: avoid; } .pair figure { flex: 1; } .fig.narrow img { max-height: 120mm; width: auto; max-width: 100%; display: block; }
a { color: #8a4b2a; }
"""
open(OUT, "w", encoding="utf-8").write(f'<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>UI/UX-аудит luxhomme.store</title><style>{css}</style></head><body>{"".join(out)}</body></html>')
print("ok", OUT, os.path.getsize(OUT) // 1024, "KB")
