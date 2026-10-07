"""channels_raw.csv -> Excel для посевов Luxhomme в MAX.

usage: python3 -I build_xlsx.py <channels_raw.csv> <out.xlsx>
"""
import csv, re, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

SRC, OUT = sys.argv[1], sys.argv[2]
CPM = 606          # ₽, средний CPM каналов MAX, июнь 2026 (Unisender)
CPM_LO, CPM_HI = 500, 700
MIN_SUBS = 3000

# ниша -> (ключевые слова, продукты Luxhomme, приоритет 1..3)
NICHES = [
    ("Уборка и хозяйство", r"уборк|хозяй|чистот|порядок|быт|хитрост|лайфхак|советы для дома|домохоз",
     "Паровая швабра EcoSteam Pro, моющие пылесосы Cleneo Pro / Aqvion Pro, Aerlyn", 1),
    ("Находки и скидки WB/Ozon", r"находк|скидк|wb|ozon|озон|вайлдб|wildb|промокод|распродаж|товары для дома|где купить|халяв|акци",
     "Все SKU, акцент на скидку / промокод", 1),
    ("Кулинария и рецепты", r"рецепт|кулинар|готов|кухн|выпечк|аэрогрил|мультивар|блюд|еда",
     "Аэрогриль AirChef Dual Pro, кофемашины Caffio / CoffeeMaker", 1),
    ("Мамы и семья", r"мам|дет|семь|родител|многодет|малыш|декрет|беремен",
     "Паровая швабра (гигиена для малыша), моющий пылесос", 1),
    ("Дом, интерьер, ремонт", r"интерьер|ремонт|уют|декор|дом|квартир|дизайн|стройк",
     "Пылесосы Aerlyn / Aqvion Pro, кофемашина как элемент интерьера", 2),
    ("Женское: красота, здоровье", r"женск|красот|здоров|похуд|фитнес|ухо?д|стиль|мода|психолог|отношен",
     "Виброплатформа (Забота), кофемашина, подарочные подборки", 2),
    ("Дача и загородный дом", r"дач|огород|сад|загород|урожа",
     "Моющий пылесос, паровая швабра для частного дома", 2),
    ("Подарки и хендмейд", r"подар|рукодел|handmade|diy|вязан|шить",
     "Подарочные подборки: кофемашина, аэрогриль", 3),
]


def f(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


BYNAME = {n[0]: n for n in NICHES}
CAT2NICHE = {
    "Лайфхаки": "Уборка и хозяйство",
    "Халява, скидки, акции": "Находки и скидки WB/Ozon",
    "Маркетплейсы": "Находки и скидки WB/Ozon",
    "Магазины": "Находки и скидки WB/Ozon",
    "Каталоги": "Находки и скидки WB/Ozon",
    "Кулинария": "Кулинария и рецепты",
    "Для родителей": "Мамы и семья",
    "Дом и ремонт": "Дом, интерьер, ремонт",
    "Дизайн": "Дом, интерьер, ремонт",
    "Красота и мода": "Женское: красота, здоровье",
    "Медицина и здоровье": "Женское: красота, здоровье",
    "Психология": "Женское: красота, здоровье",
    "Сад и огород": "Дача и загородный дом",
    "Рукоделие": "Подарки и хендмейд",
}
# бренды/магазины/госканалы — рекламу не продают; нерелевантное
BLACK = r"^(ozon|ozon fresh|магнит|пятёрочка|чижик|a4|золотое яблоко|рив гош|pinterest|wildberries|вб)$|госуслуги|сферум|школы \| родители|знакомств|любовник|интимолог|подслушано|найдись|барахолка|18\+|учимся рисовать|да, рисую|^изо$|уроки этикета|открытки"
TITLE_OVERRIDE = [
    (r"дач", "Дача и загородный дом"),
    (r"уборк|хозяй|порядок в доме|домашние хитрости|хитрости от хозяйки|советы для дома|дом без забот", "Уборка и хозяйство"),
    (r"рецепт|аэрогрил|мультивар|кухн", "Кулинария и рецепты"),
    (r"находк|скидк|wb|ozon|wildberries", "Находки и скидки WB/Ozon"),
]
EXTRA_NICHE = ("Аудитория 50+", "", "Кофемашина CoffeeMaker Classic 4в1 (компактная, простая), паровая швабра", 2)


def niche(r):
    title = r["title"].lower()
    if re.search(BLACK, title.strip()):
        return None
    if re.search(r"пенсионер", title):
        return EXTRA_NICHE[0], EXTRA_NICHE[2], EXTRA_NICHE[3]
    for rx, nm in TITLE_OVERRIDE:
        if re.search(rx, title):
            n = BYNAME[nm]
            return n[0], n[2], n[3]
    cat = r["category"]
    if cat in CAT2NICHE:
        n = BYNAME[CAT2NICHE[cat]]
        return n[0], n[2], n[3]
    if cat in ("Отношения и знакомства", "Подслушано") and re.search(r"женск", title):
        n = BYNAME["Женское: красота, здоровье"]
        return n[0], n[2], n[3]
    hay = " ".join([r["title"], r["description"]]).lower()
    if cat in ("", "—"):
        for name, rx, prod, pr in NICHES:
            if re.search(rx, hay):
                return name, prod, pr
    return None


def rnd(x, step=100):
    return int(round(x / step) * step)


rows = []
seen = set()
for r in csv.DictReader(open(SRC, encoding="utf-8")):
    subs, v24 = f(r["subscribers"]), f(r["views_24h"])
    if not subs or subs < MIN_SUBS or not v24:
        continue
    key = (r["title"].strip().lower(), v24)
    if key in seen or r["id"] in {x["url"].rsplit("/", 1)[-1] for x in rows}:
        continue
    seen.add(key)
    n = niche(r)
    if not n:
        continue
    name, prod, pr = n
    reach = v24 / subs
    flag = ""
    if reach < 0.03:
        flag = "охват <3% подписчиков — проверить на накрутку"
    elif reach > 0.6:
        flag = "охват >60% подписчиков — проверить статистику"
    rows.append({
        "title": r["title"], "niche": name,
        "price": max(rnd(v24 * CPM / 1000), 300),
        "price_range": f"{max(rnd(v24 * CPM_LO / 1000), 300):,}–{max(rnd(v24 * CPM_HI / 1000), 300):,}".replace(",", " "),
        "url": r["url"], "subs": int(subs), "v24": int(v24), "reach": reach,
        "er": f(r["er_pct"]), "growth": f(r["growth_month"]),
        "product": prod, "prio": pr, "contact": r["contacts"], "flag": flag,
        "cat": r["category"], "desc": r["description"], "telemetr": r["telemetr"],
    })

rows.sort(key=lambda x: (x["prio"], bool(x["flag"]), -x["v24"]))

wb = Workbook()
ws = wb.active
ws.title = "Каналы MAX"
head = ["Название", "Ниша", "Цена поста (оценка), ₽", "Вилка цены, ₽", "Ссылка", "Подписчики",
        "Охват поста 24 ч", "Охват / подписчики", "ER, %", "Прирост за месяц", "Что предлагать (Luxhomme)",
        "Приоритет", "Контакты и ссылки из описания", "Проверить", "Категория telemetr", "Описание канала", "Статистика"]
ws.append(head)
for x in rows:
    ws.append([x["title"], x["niche"], x["price"], x["price_range"], x["url"], x["subs"], x["v24"],
               x["reach"], x["er"], x["growth"], x["product"], x["prio"], x["contact"] or "нет — писать в канал / через описание",
               x["flag"], x["cat"], x["desc"], x["telemetr"]])

hdr_fill = PatternFill("solid", fgColor="1F3A5F")
for c in ws[1]:
    c.font = Font(bold=True, color="FFFFFF")
    c.fill = hdr_fill
    c.alignment = Alignment(wrap_text=True, vertical="center")
widths = [38, 26, 14, 14, 34, 12, 12, 11, 8, 12, 44, 9, 34, 30, 18, 70, 40]
for i, w in enumerate(widths, 1):
    ws.column_dimensions[get_column_letter(i)].width = w
for row in ws.iter_rows(min_row=2):
    row[2].number_format = "# ##0"
    row[5].number_format = "# ##0"
    row[6].number_format = "# ##0"
    row[7].number_format = "0%"
    row[9].number_format = "# ##0"
    row[4].hyperlink = row[4].value
    row[16].hyperlink = row[16].value
    for c in row:
        c.alignment = Alignment(wrap_text=c.column in (1, 11, 13, 14, 16), vertical="top")
ws.freeze_panes = "B2"
ws.auto_filter.ref = ws.dimensions

m = wb.create_sheet("Методика")
for line in [
    ["Источник", "telemetr.me — каталог MAX-каналов: топы категорий + каналы, найденные поиском по темам ЦА"],
    ["Дата сбора", "07.10.2026"],
    ["Цена поста (оценка)", f"Охват поста за 24 ч × CPM {CPM} ₽ / 1000. CPM — средний по каналам MAX, июнь 2026 (Unisender). Мин. 300 ₽"],
    ["Вилка цены", f"Тот же охват × CPM {CPM_LO}–{CPM_HI} ₽"],
    ["Точная цена", "Публичных прайсов в MAX нет — точную цену и формат даёт админ (контакты — в колонке «Контакты и ссылки из описания»: там все @ и ссылки из описания, рекламный контакт обычно среди них)"],
    ["Фильтр", f"Подписчиков от {MIN_SUBS:,}".replace(",", " ") + "; ниша совпадает с ЦА Luxhomme"],
    ["Приоритет", "1 — уборка, находки/скидки, кулинария, мамы; 2 — дом/интерьер, женское, дача, аудитория 50+; 3 — подарки/хендмейд"],
    ["Проверить", "Охват <3% или >60% от подписчиков — возможна накрутка или неполная статистика"],
    ["Сортировка", "По приоритету, затем по охвату"],
]:
    m.append(line)
m.column_dimensions["A"].width = 22
m.column_dimensions["B"].width = 120
for c in m["A"]:
    c.font = Font(bold=True)

wb.save(OUT)
print(len(rows), "channels ->", OUT)
from collections import Counter
print(Counter(x["niche"] for x in rows))
