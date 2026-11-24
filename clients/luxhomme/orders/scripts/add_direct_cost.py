"""Затраты на Яндекс Директ по заказам с UTM.
Расход Ozon-кампаний Директа за период суммируется по артикулу (артикул из названия кампании)
и делится поровну между заказами из Директа с этим артикулом рекламы.
Артикул рекламы заказа берётся по № кампании из UTM campaign (vendor_org_<продавец>_<№ кампании>),
если кампании нет в статистике, из самой метки.
Кампании на сайт, брендовые и «Пост | MAX» к заказам Ozon не относятся и не распределяются.
usage: python3 -I add_direct_cost.py in_utm.xlsx direct_stat.xlsx out.xlsx"""
import sys, re, collections
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

IN, STAT, OUT = sys.argv[1:4]
FIX = {"VACCLCOMPAC": "VACCLCOMPACT", "ViPLATB": "VIPLATB"}

# ---------- статистика Директа
ws = openpyxl.load_workbook(STAT, data_only=True).worksheets[0]
period = next((r[0] for r in ws.iter_rows(max_row=5, values_only=True) if r[0] and str(r[0]).startswith("Период")), "")
camp = {}; daily = []
MON = {"08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь"}
for r in ws.iter_rows(min_row=7, values_only=True):
    if not r[0] or r[0] == "Итого": continue
    name = r[0].strip(); cid = str(r[1])
    ozon = bool(re.search(r"[|l]\s*OZON\s*[|l]", name))
    c = camp.setdefault(cid, {"name": name, "spend": 0.0, "ozon": ozon,
                              "art": re.split(r"\s+[|l]\s+", name)[-1].strip() if ozon else ""})
    c["spend"] += r[5] or 0
    daily.append((r[2], name, cid, r[5] or 0))

# ---------- заказы
wb = openpyxl.load_workbook(IN)
z = wb["Заказы"]
H = [c.value for c in z[1]]
iS, iC = H.index("Источник: соц. сеть"), H.index("UTM campaign")
n = z.max_row
cA, cW = z.max_column + 1, z.max_column + 2
z.cell(1, cA, "Артикул рекламы (кампания Директа)"); z.cell(1, cW, "Затраты на Директ, ₽")
L = openpyxl.utils.get_column_letter
for i in range(2, n + 1):
    if z.cell(i, iS + 1).value != "Яндекс Директ": continue
    utm = z.cell(i, iC + 1).value or ""
    m = re.match(r"vendor_org_\d+_(\d+)", utm)
    if m and m.group(1) in camp and camp[m.group(1)]["ozon"]:
        art = camp[m.group(1)]["art"]
    else:
        art = utm.split("|", 1)[1].replace("|", "").split("_")[-1] if "|" in utm else ""
    art = FIX.get(art, art)
    z.cell(i, cA, art)
    z.cell(i, cW, f"=IFERROR(VLOOKUP({L(cA)}{i},'Затраты Директ'!$A:$E,5,FALSE),0)").number_format = "# ##0"

# ---------- лист «Затраты Директ»
s = wb.create_sheet("Затраты Директ", 1)
arts = sorted({c["art"] for c in camp.values() if c["ozon"]} |
              {z.cell(i, cA).value for i in range(2, n + 1) if z.cell(i, cA).value})
s.append(["Артикул рекламы", "Кампании Директа", f"Расход Директа, ₽ ({period.replace('Период: ', '')})",
          "Заказов из Директа", "Затраты на заказ, ₽"])
rng = lambda c: f"'Заказы'!${c}$2:${c}${n}"
for k, a in enumerate(arts, 2):
    names = "; ".join(f'{c["name"]} (№{cid})' for cid, c in camp.items() if c["ozon"] and c["art"] == a)
    s.append([a, names or "нет в статистике за период", f"=SUMIFS($D${len(arts) + 6}:$D$999,$C${len(arts) + 6}:$C$999,A{k})",
              f"=COUNTIFS({rng(L(cA))},A{k})", f"=IFERROR(C{k}/D{k},0)"])
last = len(arts) + 1
s.append(["Итого", "", f"=SUM(C2:C{last})", f"=SUM(D2:D{last})", f"=SUM('Заказы'!${L(cW)}$2:${L(cW)}${n})"])
s.append([])
s.append(["Кампании из статистики Директа"])
s.append(["№ кампании", "Название", "Артикул", "Расход, ₽", "Распределяется на заказы Ozon"])
top = s.max_row + 1
assert top == len(arts) + 6
for cid, c in sorted(camp.items(), key=lambda x: (not x[1]["ozon"], -x[1]["spend"])):
    k = s.max_row + 1
    s.append([cid, c["name"], c["art"], f"=SUMIFS('Расход Директ'!$G:$G,'Расход Директ'!$D:$D,A{k})",
              "да" if c["ozon"] else "нет (сайт / бренд / MAX)"])
s.append(["Итого", "", "", f"=SUM(D{top}:D{s.max_row})", ""])

fill = PatternFill("solid", fgColor="DDD7C1")
for c in list(s[1]) + list(s[top - 1]) + [z.cell(1, cA), z.cell(1, cW)]:
    c.font = Font(bold=True); c.fill = fill; c.alignment = Alignment(wrap_text=True, vertical="top")
for row in (last + 1, s.max_row):
    for c in s[row]: c.font = Font(bold=True)
for row in s.iter_rows(min_row=2):
    for c in row:
        if c.column in (3, 4, 5) and row[0].row <= last + 1 and c.column != 4: c.number_format = "# ##0"
        if row[0].row >= top and c.column == 4: c.number_format = "# ##0.00"
for col, w in zip("ABCDE", (18, 60, 20, 14, 16)): s.column_dimensions[col].width = w
z.column_dimensions[L(cA)].width = 18; z.column_dimensions[L(cW)].width = 14
z.auto_filter.ref = f"A1:{L(cW)}{n}"
# ---------- лист «Расход Директ»: только расход по дням из статистики
rd = wb.create_sheet("Расход Директ", 2)
rd.append(["Месяц", "Дата", "Кампания", "№ кампании", "Артикул", "Распределяется на заказы Ozon", "Расход, ₽"])
for d, name, cid, v in sorted(daily, key=lambda x: (x[0][6:] + x[0][3:5] + x[0][:2], x[1])):
    c = camp[cid]
    rd.append([MON[d[3:5]], d, name, cid, c["art"], "да" if c["ozon"] else "нет", round(v, 2)])
rd.append(["Итого", "", "", "", "", "", f"=SUM(G2:G{rd.max_row})"])
for c in rd[1]:
    c.font = Font(bold=True); c.fill = fill; c.alignment = Alignment(wrap_text=True, vertical="top")
for c in rd[rd.max_row]: c.font = Font(bold=True)
for row in rd.iter_rows(min_row=2, min_col=7, max_col=7):
    row[0].number_format = "# ##0.00"
for col, w in zip("ABCDEFG", (10, 12, 44, 13, 18, 14, 12)): rd.column_dimensions[col].width = w
rd.freeze_panes = "A2"; rd.auto_filter.ref = f"A1:G{rd.max_row - 1}"
wb.save(OUT)

oz = sum(c["spend"] for c in camp.values() if c["ozon"]); al = sum(c["spend"] for c in camp.values())
print("расход всего", round(al, 2), "Ozon", round(oz, 2), "не Ozon", round(al - oz, 2))
cnt = collections.Counter(z.cell(i, cA).value for i in range(2, n + 1) if z.cell(i, cA).value)
sp = collections.defaultdict(float)
for c in camp.values():
    if c["ozon"]: sp[c["art"]] += c["spend"]
for a in arts: print(a, round(sp[a], 2), cnt[a], round(sp[a] / cnt[a], 2) if cnt[a] else "нет заказов")
print("распределено", round(sum(sp[a] for a in arts if cnt[a]), 2), "без заказов", round(sum(sp[a] for a in arts if not cnt[a]), 2))
