"""Сводная таблица заказов (Ozon FBO) за 01.08–31.10.2026 по ТЗ.
usage: PYLIB=<openpyxl> python3 -I build_orders.py out.xlsx file1.csv [file2.csv ...]"""
import csv, os, sys, collections
sys.path.insert(0, os.environ.get("PYLIB", ""))
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

OUT, FILES = sys.argv[1], sys.argv[2:]
MON = {"08": "Август", "09": "Сентябрь", "10": "Октябрь"}
PLACE = {"Ozon": "ОЗ", "Шопинг в Т-Банке": "ОЗ", "ВТБ Шопинг": "ОЗ", "Luxhommè": "Сайт"}
NO = "нет в выгрузке"

rows = {}
for f in FILES:
    for r in csv.DictReader(open(f, encoding="utf-8-sig"), delimiter=";"):
        rows[(r["Номер отправления"], r["SKU"])] = r
R = sorted((r for r in rows.values() if "2026-08-01" <= r["Принят в обработку"][:10] <= "2026-10-31"),
           key=lambda r: r["Принят в обработку"])

wb = openpyxl.Workbook()
ws = wb.active; ws.title = "Заказы"
H = ["Месяц", "Дата заказа", "Номер заказа", "Номер отправления", "Площадка продаж (ВБ/ОЗ/Сайт)",
     "Откуда заказ (поле Ozon)", "Источник: соц. сеть", "Источник данных (ЮТМ/ВК/ОРГ/АТР/WW)",
     "Артикул", "Товар", "Статус заказа", "Предельная цена, ₽ (сколько упало на счёт)"]
ws.append(H)
for r in R:
    d = r["Принят в обработку"]
    ws.append([MON[d[5:7]], d[:10].split("-")[2] + "." + d[5:7] + "." + d[:4], r["Номер заказа"], r["Номер отправления"],
               PLACE.get(r["Откуда заказ"], r["Откуда заказ"]), r["Откуда заказ"], NO, NO,
               r["Артикул"], r["Название товара"], r["Статус"], float(r["Предельная цена"])])
n = len(R) + 1

# Сводка
s = wb.create_sheet("Сводка")
s.append(["Месяц", "Площадка", "Заказов всего", "Доставлено", "Отменено", "В доставке",
          "Предельная цена по доставленным, ₽", "Предельная цена по всем, ₽"])
keys = sorted({(r["Принят в обработку"][5:7], PLACE.get(r["Откуда заказ"], r["Откуда заказ"])) for r in R})
rng = lambda c: f"Заказы!${c}$2:${c}${n}"
i = 2
for m, p in keys:
    M = MON[m]
    s.append([M, p, f'=COUNTIFS({rng("A")},A{i},{rng("E")},B{i})',
              f'=COUNTIFS({rng("A")},A{i},{rng("E")},B{i},{rng("K")},"Доставлен")',
              f'=COUNTIFS({rng("A")},A{i},{rng("E")},B{i},{rng("K")},"Отменён")',
              f'=COUNTIFS({rng("A")},A{i},{rng("E")},B{i},{rng("K")},"Доставляется")',
              f'=SUMIFS({rng("L")},{rng("A")},A{i},{rng("E")},B{i},{rng("K")},"Доставлен")',
              f'=SUMIFS({rng("L")},{rng("A")},A{i},{rng("E")},B{i})'])
    i += 1
s.append(["Итого", ""] + [f"=SUM({get_column_letter(c)}2:{get_column_letter(c)}{i-1})" for c in range(3, 9)])

# По артикулам
a = wb.create_sheet("По артикулам")
a.append(["Артикул", "Заказов", "Доставлено", "Отменено", "Предельная цена по доставленным, ₽"])
arts = sorted({r["Артикул"] for r in R})
for j, art in enumerate(arts, 2):
    a.append([art, f'=COUNTIF({rng("I")},A{j})', f'=COUNTIFS({rng("I")},A{j},{rng("K")},"Доставлен")',
              f'=COUNTIFS({rng("I")},A{j},{rng("K")},"Отменён")', f'=SUMIFS({rng("L")},{rng("I")},A{j},{rng("K")},"Доставлен")'])
a.append(["Итого"] + [f"=SUM({get_column_letter(c)}2:{get_column_letter(c)}{len(arts)+1})" for c in range(2, 6)])

fill = PatternFill("solid", fgColor="DDD7C1")
for sh in wb.worksheets:
    for c in sh[1]:
        c.font = Font(bold=True); c.fill = fill; c.alignment = Alignment(wrap_text=True, vertical="top")
    for row in sh.iter_rows(min_row=2):
        for c in row:
            if "₽" in str(sh.cell(1, c.column).value): c.number_format = "# ##0"
    last = sh.max_row
    if sh.cell(last, 1).value == "Итого":
        for c in sh[last]: c.font = Font(bold=True)
    sh.freeze_panes = "A2"
for col, w in zip("ABCDEFGHIJKL", (10, 12, 16, 19, 14, 18, 16, 20, 18, 50, 13, 18)):
    ws.column_dimensions[col].width = w
s.column_dimensions["A"].width = 12; a.column_dimensions["A"].width = 20
for sh in (s, a):
    for col in "BCDEFGH": sh.column_dimensions[col].width = 16
ws.auto_filter.ref = f"A1:L{n}"
wb.save(OUT)

# контрольные суммы
c = collections.Counter(); sm = collections.Counter()
for r in R:
    k = (r["Принят в обработку"][5:7], PLACE.get(r["Откуда заказ"]), r["Статус"]); c[k] += 1; sm[k] += float(r["Предельная цена"])
print("строк", len(R))
for k in sorted(c): print(k, c[k], round(sm[k]))
