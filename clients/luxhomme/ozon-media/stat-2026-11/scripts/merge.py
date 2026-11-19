"""Медийка Ozon: объединение выгрузок «Статистика по кампаниям» двух кабинетов + группы и артикулы.
usage: PYLIB=<openpyxl> python3 -I merge.py <kab1.xlsx> <kab2.xlsx> <out.xlsx>"""
import os, sys
sys.path.insert(0, os.environ.get("PYLIB", ""))
import openpyxl
from openpyxl.styles import Font, PatternFill

K1, K2, OUT = sys.argv[1:4]


def group(n):
    n = n.lower()
    if "видео" in n or "нативн" in n:
        return "Видео ЧП / нативные"
    if "авто" in n:
        return "LAL авто"
    if "мои" in n:
        return "Ретаргет: мои товары"
    return "Корзины категории (все корз)"


rows = []
for f, k in ((K1, "Каб 1"), (K2, "Каб 2")):
    ws = openpyxl.load_workbook(f, data_only=True).worksheets[0]
    for r in ws.iter_rows(min_row=2, values_only=True):
        if r[0]:
            rows.append((k, r))

wb = openpyxl.Workbook()
c = wb.active; c.title = "Кампании"
c.append(["Кабинет", "ID", "Кампания", "Артикул", "Группа", "Статус", "Формат", "Показы", "Клики", "CTR", "Расход, ₽",
          "Заказы (клик)", "Заказы (просмотр)", "Заказы всего", "Продажи (клик), ₽", "Продажи (просмотр), ₽", "Продажи всего, ₽", "ДРР"])
for i, (k, r) in enumerate(rows, 2):
    c.append([k, r[0], r[1], r[1].split()[0], group(r[1]), r[2], r[3], r[7], r[8], f"=I{i}/H{i}", r[12], r[13], r[14],
              f"=L{i}+M{i}", r[15], r[16], f"=O{i}+P{i}", f'=IF(Q{i}=0,"нет продаж",K{i}/Q{i})'])
n = len(rows) + 1
c.append(["Итого", "", "", "", "", "", "", f"=SUM(H2:H{n})", f"=SUM(I2:I{n})", f"=I{n+1}/H{n+1}", f"=SUM(K2:K{n})", f"=SUM(L2:L{n})",
          f"=SUM(M2:M{n})", f"=SUM(N2:N{n})", f"=SUM(O2:O{n})", f"=SUM(P2:P{n})", f"=SUM(Q2:Q{n})", f"=K{n+1}/Q{n+1}"])


def pivot(title, col):
    ws = wb.create_sheet(title)
    keys = sorted({c.cell(i, col).value for i in range(2, n + 1)})
    ws.append([title[:-1] if title.endswith("ы") else title, "Кампаний", "Показы", "Клики", "CTR", "Расход, ₽", "Заказы", "Продажи, ₽", "ДРР"])
    L = openpyxl.utils.get_column_letter(col)
    for j, key in enumerate(keys, 2):
        rng = lambda x: f"Кампании!{x}2:{x}{n}"
        ws.append([key, f'=COUNTIF({rng(L)},A{j})', f'=SUMIF({rng(L)},A{j},{rng("H")})', f'=SUMIF({rng(L)},A{j},{rng("I")})',
                   f"=D{j}/C{j}", f'=SUMIF({rng(L)},A{j},{rng("K")})', f'=SUMIF({rng(L)},A{j},{rng("N")})',
                   f'=SUMIF({rng(L)},A{j},{rng("Q")})', f'=IF(H{j}=0,"нет продаж",F{j}/H{j})'])
    return ws


pivot("Группы", 5); pivot("Артикулы", 4)
for ws in wb.worksheets:
    for cell in ws[1]:
        cell.font = Font(bold=True); cell.fill = PatternFill("solid", fgColor="EFEEEB")
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            h = ws.cell(1, cell.column).value or ""
            if h in ("CTR", "ДРР"): cell.number_format = "0.0%"
            elif "₽" in h: cell.number_format = "# ##0.00"
            elif h in ("Показы", "Клики"): cell.number_format = "# ##0"
    ws.column_dimensions["A"].width = 30 if ws.title != "Кампании" else 8
c.column_dimensions["C"].width = 48; c.column_dimensions["E"].width = 28
for ws in wb.worksheets[1:]:
    ws.column_dimensions["A"].width = 32
wb.save(OUT)
