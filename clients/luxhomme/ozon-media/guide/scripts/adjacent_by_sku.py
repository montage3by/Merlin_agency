"""Смежные аудитории для медийки Ozon по артикулам.
usage: python3 -I adjacent_by_sku.py <ozon-media-guide.xlsx> <out.xlsx>
Источник — листы «Портрет смежных» и «Цифры смежных» (выгрузка из кабинета 26.10.2026).
"""
import os, sys
sys.path.insert(0, os.environ.get("PYLIB", ""))
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

SRC, OUT = sys.argv[1:3]
# группы артикулов медийки → как товар назван в файле
GROUPS = [
    ("Паровые швабры", "SHVPAREKCHB, SHVPAREKCHB2, SHVPAR7V1CH", ["паровая швабра", "вся техника"]),
    ("Вертикальный сухой пылесос", "VACCLDRY", ["вертикальный пылесос", "вся техника"]),
    ("Вертикальный моющий пылесос", "VACCLWASH", ["вертикальный моющий пылесос", "вертикальный пылесос", "вся техника"]),
    ("Компактный моющий пылесос", "VACCLCOMPACT", ["компактный моющий пылесос", "кмп", "вся техника"]),
    ("Аэрогрили", "AEROGRIL55L, AEROGRIL55L2, AEROGRIL2CHASHI", ["аэрогриль", "вся техника"]),
    ("Виброплатформы", "VIPLATB, VIPLATB2, VIPLATEL2D", ["виброплатформа", "вся техника"]),
    ("Кофемашина", "COFMASHCAP4V1", ["кофемашина", "вся техника"]),
]
# правки текстов: «любые капсулы» — недостоверно (машина берёт капсулы формата Nespresso, чалды и молотый)
FIX = {"Капсульные кофемашины": ("Капсулы и молотый", "Капсулы, чалды и молотый в одной машине")}
TYPE_ORDER = {"Конкуренты": 0, "Размещение": 1, "Аудитория": 2}
# общие категории: в файле текст написан под другой товар — свой текст под группу (факты из карточек сайта)
OVR = {
    ("Паровые швабры", "Аптека"): ("Легко для спины", "Паровая швабра — мытьё пола без наклонов"),
    ("Паровые швабры", "Корма для кошек и собак"): ("Дом с питомцем", "Паровая швабра: пол чистый без химии"),
    ("Кофемашина", "Холодильники"): ("Обновите технику", "Кофемашина для обновлённой кухни"),
    ("Виброплатформы", "Фитнес и йога"): ("Фитнес дома", "Виброплатформа для тренировок дома"),
    ("Компактный моющий пылесос", "Моющие и чистящие средства"): ("Химчистка дома", "Моющий пылесос с паром для мебели и авто"),
}
NOTE = {
    "Роботы для мойки окон": "Своя категория: здесь же продаётся ваш робот-мойщик uClean Max — пылесос будет конкурировать с ним",
    "Ламинат": "«Минимум воды» — сверить с карточкой, на сайте такого факта нет",
    "Средство антицеллюлитное": "«Упругость» близко к обещанию результата для тела — лучше «для тонуса»",
    "Капсульные кофемашины": "Текст исправлен: машина берёт капсулы формата Nespresso, чалды и молотый, не «любые капсулы»",
}
REACH = {"Бумага для выпечки": 4103000, "Машинки для стрижки, бритвы": 6539000,
         "Косметика (уход, волосы)": "24,7–27,2 млн", "Электроинструмент (шлифмашины, дрели, пилы)": "2,4–3,8 млн"}
ROBOT = [dict(cat="Роботы для мойки окон", path="Ур. 3: Робот для мойки окон", typ="Конкуренты", sex="Ж 51% / М 49%",
              age="25–44 (67%), больше всего 35–44", geo="Москва и МО 16%, Казань 10%, Центр 9%",
              hook="Своя категория — перехват покупателей конкурентов. Платёжеспособные, ценят своё время",
              h="Окна моет робот", s="Робот-мойщик окон с двойным распылением")]

wb = openpyxl.load_workbook(SRC, data_only=True)
reach = {}
for r in wb["Цифры смежных"].iter_rows(min_row=9, values_only=True):
    if r[0] and isinstance(r[3], (int, float)):
        reach[r[0].split(":")[0].split(",")[0].strip().lower()[:12]] = r[3]
rows = []
for r in wb["Портрет смежных"].iter_rows(min_row=4, values_only=True):
    if not (r[0] and r[8]) or r[0].startswith("•"):
        continue
    rows.append(dict(cat=r[0], path=r[1], prod=r[2], typ=r[3], sex=r[4], age=r[5], geo=r[6], hook=r[7], h=r[8], s=r[10]))


def reach_of(cat):
    k = cat.split("(")[0].split(",")[0].strip().lower()[:12]
    for key, v in reach.items():
        if key[:10] == k[:10]:
            return v
    return None


out = openpyxl.Workbook()
ws = out.active
ws.title = "Смежные по артикулам"
head = ["Товар", "Артикулы", "Смежная категория", "Категория в конструкторе", "Тип", "Охват, чел.", "Пол", "Возраст",
        "География (топ-3)", "Чем зацепить", "Заголовок (≤18)", "Симв.", "Подзаголовок (≤42)", "Симв.", "Примечание"]
ws.append(head)
n = 0
for name, skus, keys in GROUPS:
    sel = [r for r in rows if any(k in r["prod"].lower() for k in keys)]
    if name == "Вертикальный сухой пылесос":
        sel = [r for r in sel if "моющий" not in r["prod"].lower() or "вертикальный пылесос" in r["prod"].lower().replace("вертикальный моющий пылесос", "")]
    sel.sort(key=lambda r: (TYPE_ORDER.get(r["typ"], 9), -(reach_of(r["cat"]) or 0)))
    for r in sel:
        h, s = OVR.get((name, r["cat"]), FIX.get(r["cat"], (r["h"], r["s"])))
        i = ws.max_row + 1
        ws.append([name, skus, r["cat"], r["path"], r["typ"], REACH.get(r["cat"], reach_of(r["cat"])), r["sex"], r["age"], r["geo"], r["hook"],
                   h, f"=LEN(K{i})", s, f"=LEN(M{i})", NOTE.get(r["cat"], "")])
        assert len(h) <= 18 and len(s) <= 42, (name, r["cat"], h, s)
        n += 1
for r in ROBOT:
    i = ws.max_row + 1
    ws.append(["Робот-мойщик окон", "ROBOTOKONKVADR", r["cat"], r["path"], r["typ"], 755000, r["sex"], r["age"], r["geo"], r["hook"],
               r["h"], f"=LEN(K{i})", r["s"], f"=LEN(M{i})", "Смежных категорий для робота в файле нет, портрета покупателя тоже — снять в конструкторе"])
    n += 1
for c in ws[1]:
    c.font = Font(bold=True); c.fill = PatternFill("solid", fgColor="F4F2EE"); c.alignment = Alignment(wrap_text=True, vertical="top")
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical="top")
    if isinstance(row[5].value, (int, float)) and not isinstance(row[5].value, bool):
        row[5].number_format = "# ##0"
for col, w in zip("ABCDEFGHIJKLMNO", (20, 22, 26, 30, 12, 12, 16, 18, 26, 40, 20, 6, 36, 6, 36)):
    ws.column_dimensions[col].width = w
ws.freeze_panes = "C2"
ws.auto_filter.ref = f"A1:O{ws.max_row}"
out.save(OUT)
print("ok", n, "строк")
