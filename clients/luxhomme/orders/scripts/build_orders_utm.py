"""Заказы Ozon FBO и FBS 01.08–31.10.2026 + источники из отчёта «Внешний трафик» (UTM).
В отчёте трафика нет номеров заказов, поэтому заказы сопоставляются по:
  цене (предельная цена = сумма в отчёте / кол-во), дате (сессия или 30 дней после неё), артикулу.
usage: PYLIB=<openpyxl> python3 -I build_orders_utm.py out.xlsx traffic.xlsx [Кабинет=]orders1.csv [Кабинет 2=orders2.csv ...]
traffic: один файл или несколько через запятую, с меткой кабинета: "traffic1.xlsx,Кабинет 2=traffic2.xlsx".
Без метки файл относится к «Кабинет 1». Отчёт трафика каждого кабинета сопоставляется только с заказами этого кабинета."""
import csv, os, sys, collections, datetime as dt
sys.path.insert(0, os.environ.get("PYLIB", ""))
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

OUT, TRAFFIC, FILES = sys.argv[1], sys.argv[2], sys.argv[3:]
MON = {"08": "Август", "09": "Сентябрь", "10": "Октябрь"}
PLACE = {"Ozon": "ОЗ", "Шопинг в Т-Банке": "ОЗ", "ВТБ Шопинг": "ОЗ", "Luxhommè": "Сайт", "Luxhommè store": "Сайт"}
D = lambda s: dt.date.fromisoformat(s[:10])

# ---------- заказы
orders = {}
for f in FILES:
    cab, f = f.split("=", 1) if "=" in f else ("Кабинет 1", f)
    for r in csv.DictReader(open(f, encoding="utf-8-sig"), delimiter=";"):
        r["_scheme"] = "FBS" if "Код этикетки" in r else "FBO"
        r["_cab"] = cab
        orders[(cab, r["Номер отправления"], r["SKU"])] = r
O = sorted((r for r in orders.values() if "2026-08-01" <= r["Принят в обработку"][:10] <= "2026-10-31"),
           key=lambda r: (r["Принят в обработку"], r["Номер отправления"]))
for i, r in enumerate(O):
    r["_i"] = i; r["_d"] = D(r["Принят в обработку"]); r["_p"] = round(float(r["Предельная цена"])); r["_q"] = int(r["Количество"] or 1)
    r["_sum"] = r["_p"] * r["_q"]; r["_m"] = None

# ---------- трафик
T = []
for tf in TRAFFIC.split(","):
    tcab, tf = tf.split("=", 1) if "=" in tf else ("Кабинет 1", tf)
    ws = openpyxl.load_workbook(tf, data_only=True).worksheets[0]
    rows = list(ws.iter_rows(values_only=True)); H = rows[0]
    T += [dict(zip(H, r), _cab=tcab) for r in rows[1:] if r[0]]
QS, SS, QW, SW = H[12], H[13], H[15], H[16]


def social(src, camp, content):
    s = (src or "").lower(); c = (camp or "")
    if s in ("yandex/cpc", "ya/cpc", "yandex_direct/cpc", "ya_direct/cpc") or "|EPK" in c or "|MK" in c or "|RSYA" in c:
        return "Яндекс Директ"
    if s.startswith("instagram"): return "Instagram"
    if "telegram" in s: return "Telegram"
    if s.startswith("max"): return "MAX"
    if s.startswith("vk"): return "ВК"
    if s.startswith("site/article"): return "Статьи (Дзен, DTF)"
    if s.startswith("site/"): return "Сайт luxhomme.store"
    if s.startswith("vitrina"): return "Витрина креатора"
    if s.endswith("/organic"): return "Органика Яндекса"
    return src or "не указан"


def ctype(camp):
    t = (camp or "").split("|", 1)[1] if "|" in (camp or "") else ""
    return {"EPK": "ЕПК", "MK": "Мастер кампаний", "RSYA": "РСЯ", "LAL": "LAL"}.get(t.split("_")[0], "—")


def art_of(camp, content):
    c = camp or ""
    if "|" in c:
        return c.split("|", 1)[1].replace("|", "").split("_")[-1]
    return (content or "").strip() if (content or "").strip().isupper() else ""


units = []   # одна запись на заказанный товар из отчёта
for ri, t in enumerate(T):
    qw = int(t[QW] or 0)
    if not qw: continue
    qs = int(t[QS] or 0)
    even = round(t[SW] or 0) == round((t[SW] or 0) / qw) * qw   # все товары строки по одной цене
    for k in range(qw):
        units.append({"row": ri, "rowsum": round(t[SW] or 0), "even": even, "cab": t["_cab"], "date": D(str(t["Дата"])), "src": t["Source/Medium"], "camp": t["Campaign"], "content": t["Content"],
                      "term": t["Term"], "price": round((t[SW] or 0) / qw),
                      "rep": round(t[SW] or 0) - round((t[SW] or 0) / qw) * (qw - 1) if k == qw - 1 else round((t[SW] or 0) / qw), "in_session": k < qs,
                      "art": art_of(t["Campaign"], t["Content"])})

# ---------- сопоставление: сначала заказы в рамках сессии (та же дата), потом окно 30 дней
by_price = collections.defaultdict(list)
for r in O: by_price[(r["_cab"], r["_p"])].append(r)
for phase in ("session", "window"):
    for u in units:
        if "order" in u or not u["even"] or (phase == "session" and not u["in_session"]): continue
        cands = [r for r in by_price.get((u["cab"], u["price"]), []) if r["_m"] is None and
                 (r["_d"] == u["date"] if phase == "session" else u["date"] <= r["_d"] <= u["date"] + dt.timedelta(days=30))]
        if not cands: continue
        cands.sort(key=lambda r: (r["Артикул"].rstrip("2") != u["art"].rstrip("2"), r["_d"], r["_i"]))
        r = cands[0]; r["_m"] = u; u["order"] = r
        u["how"] = ("в рамках сессии" if phase == "session" else "окно атрибуции") + \
                   ("" if r["Артикул"].rstrip("2") == u["art"].rstrip("2") or not u["art"] else ", другой артикул")

# ---------- строки отчёта, где несколько товаров с разными ценами: подбор заказов, чьи цены в сумме дают сумму строки
def combo(prices, n, total, tol):
    """prices: [(цена, доступно шт)] по убыванию; n цен с суммой total ± tol"""
    out = []; budget = [200000]
    def go(i, n, rest, acc):
        budget[0] -= 1
        if budget[0] < 0: return True                 # перебор слишком большой: строку не подбираем
        if n == 0:
            if abs(rest) <= tol: out.append(list(acc))
            return n == 0 and abs(rest) <= tol
        for j in range(i, len(prices)):
            p, cnt = prices[j]
            if p * n < rest - tol: break              # дальше цены только меньше
            if p > rest + tol: continue
            used = acc.count(p)
            if used >= cnt: continue
            acc.append(p)
            if go(j, n - 1, rest - p, acc): return True
            acc.pop()
        return False
    go(0, n, total, [])
    return out[0] if out and budget[0] >= 0 else None


rows_u = collections.defaultdict(list)
for u in units: rows_u[u["row"]].append(u)
for tier in ("day_art", "day", "window_art", "window"):
    for ri, uu in rows_u.items():
        left = [u for u in uu if "order" not in u]
        if not left: continue
        u0 = left[0]; n = len(left); S = u0["rowsum"] - sum(u["order"]["_p"] for u in uu if "order" in u)
        lo, hi = u0["date"], u0["date"] + dt.timedelta(days=0 if tier.startswith("day") else 30)
        cands = [r for r in O if r["_cab"] == u0["cab"] and r["_m"] is None and lo <= r["_d"] <= hi and
                 (not tier.endswith("art") or (u0["art"] and r["Артикул"].rstrip("2") == u0["art"].rstrip("2")))]
        if tier.endswith("art") and not u0["art"]: continue
        cnt = collections.Counter(r["_p"] for r in cands)
        pick = combo(sorted(cnt.items(), reverse=True), n, S, 0)
        if not pick: continue
        for u, pr in zip(left, pick):
            r = sorted((r for r in cands if r["_p"] == pr and r["_m"] is None),
                       key=lambda r: (r["Артикул"].rstrip("2") != u["art"].rstrip("2"), r["_d"], r["_i"]))[0]
            r["_m"] = u; u["order"] = r
            u["how"] = ("в рамках сессии" if r["_d"] == u["date"] else "окно атрибуции") + ", подбор по сумме строки" + \
                       ("" if r["Артикул"].rstrip("2") == u["art"].rstrip("2") or not u["art"] else ", другой артикул")
            u["price"] = pr

# ---------- xlsx
ALL_N = len(O)
if os.environ.get("UTM_ONLY"):          # только заказы с UTM-метками
    O = [r for r in O if r["_m"]]
wb = openpyxl.Workbook()
ws = wb.active; ws.title = "Заказы"
HD = ["Месяц", "Дата заказа", "Номер заказа", "Номер отправления", "Площадка продаж (ВБ/ОЗ/Сайт)", "Откуда заказ (поле Ozon)",
      "Источник: соц. сеть", "Источник данных (ЮТМ/ВК/ОРГ/АТР/WW)", "Артикул", "Товар", "Статус заказа",
      "Предельная цена, ₽ (сколько упало на счёт)", "UTM source/medium", "UTM campaign", "Тип кампании Директа",
      "UTM content", "Дата клика (сессии)", "Как сопоставлено", "Схема (FBO/FBS)", "Количество", "Кабинет Ozon"]
ws.append(HD)
for r in O:
    d = r["Принят в обработку"]; u = r["_m"]
    ws.append([MON[d[5:7]], f"{d[8:10]}.{d[5:7]}.{d[:4]}", r["Номер заказа"], r["Номер отправления"],
               PLACE.get(r["Откуда заказ"], r["Откуда заказ"]), r["Откуда заказ"],
               social(u["src"], u["camp"], u["content"]) if u else "нет UTM",
               "ЮТМ" if u else "нет UTM",
               r["Артикул"], r["Название товара"], r["Статус"], r["_sum"],
               u["src"] if u else "", u["camp"] if u else "", ctype(u["camp"]) if u else "",
               u["content"] if u else "", u["date"].strftime("%d.%m.%Y") if u else "", u["how"] if u else "", r["_scheme"], r["_q"], r["_cab"]])
n = len(O) + 1
rng = lambda c: f"Заказы!${c}$2:${c}${n}"

# сводка по месяцам и площадкам
s = wb.create_sheet("Сводка")
s.append(["Месяц", "Кабинет Ozon", "Площадка", "Схема", "Заказов", "Доставлено", "Отменено", "Предельная цена по доставленным, ₽",
          "Из них с UTM: заказов", "С UTM: доставлено", "С UTM: предельная цена по доставленным, ₽"])
keys = sorted({(r["Принят в обработку"][5:7], r["_cab"], PLACE.get(r["Откуда заказ"]), r["_scheme"]) for r in O})
for i, (m, cb, p, sc) in enumerate(keys, 2):
    a = f'{rng("A")},A{i},{rng("U")},B{i},{rng("E")},C{i},{rng("S")},D{i}'
    s.append([MON[m], cb, p, sc, f"=COUNTIFS({a})", f'=COUNTIFS({a},{rng("K")},"Доставлен")', f'=COUNTIFS({a},{rng("K")},"Отменён")',
              f'=SUMIFS({rng("L")},{a},{rng("K")},"Доставлен")', f'=COUNTIFS({a},{rng("H")},"ЮТМ")',
              f'=COUNTIFS({a},{rng("H")},"ЮТМ",{rng("K")},"Доставлен")', f'=SUMIFS({rng("L")},{a},{rng("H")},"ЮТМ",{rng("K")},"Доставлен")'])
last = len(keys) + 1
s.append(["Итого", "", "", ""] + [f"=SUM({get_column_letter(c)}2:{get_column_letter(c)}{last})" for c in range(5, 12)])

# сводка по источникам UTM
u2 = wb.create_sheet("UTM по источникам")
u2.append(["Месяц", "Кабинет Ozon", "Источник: соц. сеть", "Тип кампании Директа", "Артикул", "Заказов", "Доставлено", "Отменено",
           "Предельная цена по доставленным, ₽"])
k3 = sorted({(r["Принят в обработку"][5:7], r["_cab"], social(r["_m"]["src"], r["_m"]["camp"], r["_m"]["content"]),
              ctype(r["_m"]["camp"]), r["Артикул"]) for r in O if r["_m"]})
for i, (m, cb, so, ct, ar) in enumerate(k3, 2):
    a = f'{rng("A")},A{i},{rng("U")},B{i},{rng("G")},C{i},{rng("O")},D{i},{rng("I")},E{i}'
    u2.append([MON[m], cb, so, ct, ar, f"=COUNTIFS({a})", f'=COUNTIFS({a},{rng("K")},"Доставлен")',
               f'=COUNTIFS({a},{rng("K")},"Отменён")', f'=SUMIFS({rng("L")},{a},{rng("K")},"Доставлен")'])
last = len(k3) + 1
u2.append(["Итого", "", "", "", ""] + [f"=SUM({get_column_letter(c)}2:{get_column_letter(c)}{last})" for c in range(6, 10)])

# несопоставленные из отчёта трафика
nm = wb.create_sheet("Не сопоставлено")
nm.append(["Кабинет Ozon", "Дата клика", "UTM source/medium", "UTM campaign", "UTM content", "Артикул из UTM", "Сумма, ₽", "Причина"])
for u in units:
    if "order" not in u:
        nm.append([u["cab"], u["date"].strftime("%d.%m.%Y"), u["src"], u["camp"], u["content"], u["art"], u["rep"],
                   "нет заказа с такой предельной ценой в 30 дней после клика"])

# сверка с отчётом внешнего трафика (по месяцу клика)
sv = wb.create_sheet("Сверка с отчётом", 1)
sv.append(["Месяц клика", "Кабинет Ozon", "Группа", "Отчёт Ozon: заказано, шт (окно атрибуции)", "Отчёт Ozon: сумма, ₽",
           "Найдено в заказах, шт", "Найдено в заказах: сумма, ₽", "Не найдено, шт", "Не найдено, ₽"])
grp = lambda u: "Яндекс Директ" if social(u["src"], u["camp"], u["content"]) == "Яндекс Директ" else "Прочие UTM"
agg = collections.defaultdict(lambda: [0, 0, 0, 0])
for u in units:
    a = agg[(u["date"].strftime("%m"), u["cab"], grp(u))]
    a[0] += 1; a[1] += u["rep"]
    if "order" in u: a[2] += 1; a[3] += u["order"]["_p"]
for i, (m, cb, g) in enumerate(sorted(agg), 2):
    a = agg[(m, cb, g)]
    sv.append([MON[m], cb, g, a[0], a[1], a[2], a[3], f"=D{i}-F{i}", f"=E{i}-G{i}"])
last = len(agg) + 1
sv.append(["Итого", "", ""] + [f"=SUM({get_column_letter(c)}2:{get_column_letter(c)}{last})" for c in range(4, 10)])

# оформление
fill = PatternFill("solid", fgColor="DDD7C1")
for sh in wb.worksheets:
    for c in sh[1]:
        c.font = Font(bold=True); c.fill = fill; c.alignment = Alignment(wrap_text=True, vertical="top")
    for row in sh.iter_rows(min_row=2):
        for c in row:
            if "₽" in str(sh.cell(1, c.column).value): c.number_format = "# ##0"
    if sh.cell(sh.max_row, 1).value == "Итого":
        for c in sh[sh.max_row]: c.font = Font(bold=True)
    sh.freeze_panes = "A2"
for col, w in zip("ABCDEFGHIJKLMNOPQRSTU", (10, 12, 16, 19, 12, 18, 18, 16, 18, 45, 12, 16, 18, 48, 16, 30, 12, 22, 10, 10, 12)):
    ws.column_dimensions[col].width = w
ws.auto_filter.ref = f"A1:U{n}"
for sh in (s, u2, nm, sv):
    for col in "ABCDEFGHIJK": sh.column_dimensions[col].width = 18
if os.environ.get("UTM_ONLY"): s.delete_cols(9, 3)   # столбцы «с UTM» дублируют основные
wb.save(OUT)

# контроль
mt = [u for u in units if "order" in u]
print("заказов", len(O), collections.Counter((r["_cab"], r["_scheme"]) for r in O), "| единиц в отчёте трафика", len(units), "сумма", sum(u["rep"] for u in units),
      "| сопоставлено", len(mt), "сумма", sum(u["order"]["_p"] for u in mt))
for cb in sorted({u["cab"] for u in units}):
    uu = [u for u in units if u["cab"] == cb]; mm = [u for u in uu if "order" in u]
    print(cb, "в отчёте", len(uu), sum(u["rep"] for u in uu), "сопоставлено", len(mm), sum(u["order"]["_p"] for u in mm),
          collections.Counter(social(u["src"], u["camp"], u["content"]) for u in mm))
print(collections.Counter(u["how"] for u in mt))
print(collections.Counter(social(u["src"], u["camp"], u["content"]) for u in mt))
print("не сопоставлено", [(u["cab"], u["date"].isoformat(), u["src"], u["art"], u["price"]) for u in units if "order" not in u])
