"""Отчёт по LAL-кампаниям медийки Ozon -> HTML.
Данные — выгрузки «Статистика по кампаниям» двух кабинетов (raw/ozon-media-kab1.xlsx, raw/ozon-media-kab2.xlsx),
креативы — вырезки со скринов (creatives/, scripts/crop.py).
usage: python3 -I build_report.py <lal_dir> <out.html>
"""
import base64, html, os, re, sys
import openpyxl

D, OUT = sys.argv[1:3]
e = html.escape

# ── данные из выгрузок
COLS = ["id", "name", "status", "fmt", "pay", "budget", "btype", "imp", "clk", "cpm", "ctr", "cpc", "spend",
        "sold", "sold_v", "sales", "sales_v", "drr"]
rows = []
for kab, f in [(1, "ozon-media-kab1.xlsx"), (2, "ozon-media-kab2.xlsx")]:
    ws = openpyxl.load_workbook(os.path.join(D, "raw", f), data_only=True).worksheets[0]
    for r in ws.iter_rows(min_row=2, values_only=True):
        if r[0] is None:
            continue
        d = dict(zip(COLS, r))
        d["kab"] = kab
        d["sku"] = d["name"].split()[0].rstrip("2") if d["name"].startswith("ROBOTOKONKVADR2") else d["name"].split()[0]
        d["sales_all"] = (d["sales"] or 0) + (d["sales_v"] or 0)
        d["sold_all"] = (d["sold"] or 0) + (d["sold_v"] or 0)
        rows.append(d)

is_lal = lambda d: re.search(r"\bавто\b", d["name"]) is not None
LAL = [d for d in rows if is_lal(d)]
LAL.sort(key=lambda d: -(d["clk"] / d["imp"] if d["imp"] else 0))

# ретаргет: кампании «мои …» того же SKU и кабинета с показами за период
lal_keys = {(d["kab"], d["sku"]) for d in LAL}
RT = {}
for d in rows:
    if is_lal(d) or " мои " not in f" {d['name']} " or not d["imp"]:
        continue
    k = (d["kab"], d["sku"])
    if k in lal_keys:
        a = RT.setdefault(k, {"n": 0, "imp": 0, "clk": 0, "spend": 0.0, "sales": 0, "sold": 0})
        a["n"] += 1; a["imp"] += d["imp"]; a["clk"] += d["clk"]; a["spend"] += d["spend"]; a["sales"] += d["sales_all"]; a["sold"] += d["sold_all"]

S = lambda lst, k: sum(x[k] for x in lst)
TI, TC, TR, TS, TO = S(LAL, "imp"), S(LAL, "clk"), S(LAL, "spend"), S(LAL, "sales_all"), S(LAL, "sold_all")
ALL_R = S(rows, "spend"); ALL_S = S(rows, "sales_all")
KAB_R = {k: sum(d["spend"] for d in rows if d["kab"] == k) for k in (1, 2)}
KAB_S = {k: sum(d["sales_all"] for d in rows if d["kab"] == k) for k in (1, 2)}
RT_R = sum(a["spend"] for a in RT.values()); RT_S = sum(a["sales"] for a in RT.values())


def rub(x, d=2):
    return f"{x:,.{d}f}".replace(",", " ").replace(".", ",") + " ₽"


def num(x):
    return f"{x:,}".replace(",", " ")


pct = lambda a, b: f"{a / b * 100:.2f}%".replace(".", ",") if b else "—"
drr = lambda r, s: pct(r, s) if s else "нет продаж"

# ── креативы и описания (со скринов кабинета 1)
CR = {45748023: "viplatb2", 45751717: "aerogril", 45464624: "robot", 45460757: "shvabra",
      45461438: "vacclcompact", 45463367: "vaccldry", 45462971: "vacclwash"}
PRODUCT = {"VIPLATB2": "Виброплатформа", "VIPLATB": "Виброплатформа", "AEROGRIL55L2": "Аэрогриль AirChef 5,5 л",
           "ROBOTOKONKVADR": "Робот-мойщик окон uClean Max", "SHVPAREKCHB2": "Паровая швабра EcoSteam Pro",
           "SHVPAREKCHB": "Паровая швабра", "VACCLCOMPACT": "Моющий пылесос Cleneo Pro",
           "VACCLDRY": "Пылесос Aerlyn (сухой)", "VACCLWASH": "Моющий пылесос Aqvion Pro"}
ANAT = {  # заголовок, тип, скидка/кнопки, визуал
    "viplatb2": ("Хочется похудеть? Виброплатформа — 15 мин в день", "вопрос-боль", "«Цена снижена», «Распродажа»", "розовая рамка, товар и человек крупно"),
    "aerogril": ("Хрустящий картофель без масла. Аэрогриль", "результат", "«Распродажа 50%», «Подробнее»", "розовая рамка, еда и товар крупно"),
    "robot": ("Окна сияют за 20 минут. Робот-мойщик окон", "результат + срок", "«Распродажа», «Цена снижена»", "розовая рамка, товар крупно по центру"),
    "shvabra": ("Полы, плитка, ковры — чисто за 1 проход. Паровая швабра", "результат", "«Распродажа», «Подробнее»", "розовая рамка, тёмный фон, товар средний"),
    "vacclcompact": ("Включил пар — и ковёр как новый. Моющий пылесос для мягкой мебели", "результат", "«Распродажа», «Перейти»", "розовая рамка, бежево-серая гамма, низкий контраст"),
    "vaccldry": ("Пять минут — и порядок. Быстрая уборка без подготовки", "выгода, абстрактно", "плашка категории, мелкое «перейти»; скидки нет", "интерьер, белая плашка, рукописный шрифт, товар мелкий"),
    "vacclwash": ("Пылесосит и моет за один проход. Полы идеальны за 10 минут!", "результат + срок", "плашка категории, мелкое «перейти»; скидки нет", "интерьер, белая плашка, рукописный шрифт, товар мелкий"),
}


def img(k):
    if not k:
        return '<div class="noimg">скрина нет</div>'
    b = base64.b64encode(open(os.path.join(D, "creatives", k + ".png"), "rb").read()).decode()
    return f'<img class="cr" src="data:image/png;base64,{b}">'


# ── таблицы
lal_rows = "".join(f"""<tr><td class="img">{img(CR.get(d['id']))}</td>
<td><b>{e(PRODUCT.get(d['sku'], d['sku']))}</b><br><span class="mut">{e(d['name'])} · ID {d['id']} · каб. {d['kab']} · {e(d['status'])}</span></td>
<td class="r">{num(d['imp'])}</td><td class="r">{d['clk']}</td><td class="r b">{pct(d['clk'], d['imp'])}</td><td class="r">{rub(d['spend'])}</td>
<td class="r">{rub(d['spend'] / d['clk']) if d['clk'] else '—'}</td><td class="r">{d['sold_all']}</td><td class="r">{rub(d['sales_all'], 0)}</td><td class="r">{drr(d['spend'], d['sales_all'])}</td></tr>"""
                   for d in LAL)

cmp_rows = ""
for k in sorted({(d["kab"], d["sku"]) for d in LAL}):
    a = RT.get(k)
    if not a:
        continue
    d = {"kab": k[0], "sku": k[1]}
    l = [x for x in LAL if (x["kab"], x["sku"]) == k]
    li, lc, lr, ls = S(l, "imp"), S(l, "clk"), S(l, "spend"), S(l, "sales_all")
    cmp_rows += f"""<tr><td>{d['sku']}</td><td class="r">{d['kab']}</td>
<td class="r">{pct(lc, li)}</td><td class="r">{rub(lr)}</td><td class="r">{rub(ls, 0)}</td>
<td class="r">{pct(a['clk'], a['imp'])}</td><td class="r">{rub(a['spend'])}</td><td class="r">{rub(a['sales'], 0)}</td><td class="r b">{drr(a['spend'], a['sales'])}</td></tr>"""

anat_rows = "".join(f"""<tr><td class="img sm">{img(CR[d['id']])}</td><td>{e(ANAT[CR[d['id']]][0])}</td><td>{e(ANAT[CR[d['id']]][1])}</td>
<td>{e(ANAT[CR[d['id']]][2])}</td><td>{e(ANAT[CR[d['id']]][3])}</td><td class="r b">{pct(d['clk'], d['imp'])}</td></tr>"""
                    for d in LAL if d["id"] in CR)

START = {45748023: ("15.10", 4), 45751717: ("15.10", 4), 45464624: ("13.10", 6), 45460757: ("13.10", 6),
         45461438: ("13.10", 6), 45463367: ("13.10", 6), 45462971: ("13.10", 6)}
spend_rows = "".join(f"""<tr><td>{e(PRODUCT[d['sku']])}</td><td>{START[d['id']][0]}</td><td class="r">{START[d['id']][1]}</td><td class="r">{rub(d['spend'])}</td>
<td class="r">{rub(d['spend'] / START[d['id']][1], 0)}</td><td class="r">{d['spend'] / START[d['id']][1] / 10:.0f}%</td></tr>"""
                     for d in LAL if d["id"] in START)

H = f"""<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>LAL-кампании медийки Ozon — Luxhommè</title>
<style>
@page {{ size: A4 landscape; margin: 11mm 11mm 12mm; }}
body {{ font-family: 'DejaVu Sans', Arial, sans-serif; font-size: 9.2pt; line-height: 1.42; color: #1f1f1f; }}
h1 {{ font-size: 18pt; margin: 0 0 4pt; }} h2 {{ font-size: 13pt; margin: 16pt 0 6pt; border-bottom: 1px solid #ddd; padding-bottom: 3pt; page-break-after: avoid; }}
p {{ margin: 4pt 0; }} .mut {{ color: #6b6b69; font-size: 8.2pt; }} .b {{ font-weight: 700; }} .r {{ text-align: right; white-space: nowrap; }}
table {{ border-collapse: collapse; width: 100%; margin: 6pt 0; }} th, td {{ border: 1px solid #ddd; padding: 4pt 5pt; vertical-align: middle; text-align: left; }}
th {{ background: #f4f2ee; font-size: 8.4pt; }} tr {{ page-break-inside: avoid; }}
td.img {{ width: 170px; padding: 3pt; }} td.img.sm {{ width: 150px; }} .cr {{ width: 100%; display: block; border-radius: 3px; }}
.noimg {{ height: 56px; border: 1px dashed #ccc; border-radius: 3px; color: #999; font-size: 8pt; display: flex; align-items: center; justify-content: center; }}
.kpi {{ display: flex; gap: 8pt; margin: 8pt 0; }} .kpi div {{ flex: 1; border: 1px solid #ddd; border-radius: 6px; padding: 6pt 8pt; }}
.kpi b {{ display: block; font-size: 13pt; }} .kpi span {{ color: #6b6b69; font-size: 8.2pt; }} .kpi .bad b {{ color: #b3261e; }}
ul {{ margin: 3pt 0 3pt 15pt; padding: 0; }} li {{ margin: 2.5pt 0; }} tr.tot td {{ font-weight: 700; background: #faf8f5; }}
.lead {{ font-size: 10.4pt; border-left: 3px solid #b3261e; padding: 4pt 0 4pt 9pt; margin: 8pt 0; }}
</style></head><body>
<h1>LAL-кампании медийной рекламы Ozon</h1>
<p class="mut">Luxhommè · кампании «авто» (похожая аудитория), два кабинета · источник: выгрузки «Статистика по кампаниям» кабинетов 1 и 2 и скрины кабинета 1 (креативы, настройки) · период выгрузки каб. 1 — 1–18.10.2026 (сверено со скрином списка), каб. 2 — в файле не указан</p>

<div class="kpi">
<div><b>{len(LAL)}</b><span>LAL-кампаний</span></div>
<div><b>{rub(TR)}</b><span>расход</span></div>
<div><b>{num(TI)}</b><span>показы</span></div>
<div><b>{num(TC)}</b><span>клики · CTR {pct(TC, TI)}</span></div>
<div class="bad"><b>{TO} / {rub(TS, 0)}</b><span>продано товаров / продажи (включая после просмотра)</span></div>
</div>
<p class="lead"><b>Главное:</b> {len(LAL)} LAL-кампаний потратили {rub(TR)} и не дали ни одной продажи — ни после клика, ни после просмотра. Ретаргет тех же товаров за тот же период: расход {rub(RT_R)}, продажи {rub(RT_S, 0)}, ДРР {pct(RT_R, RT_S)}. LAL — {pct(TR, ALL_R)} всего расхода медийки двух кабинетов ({rub(ALL_R)}), при нуле в продажах.</p>

<h2>1. Все LAL-кампании</h2>
<table><tr><th>Креатив</th><th>Товар / кампания</th><th class="r">Показы</th><th class="r">Клики</th><th class="r">CTR</th><th class="r">Расход</th><th class="r">Цена клика</th><th class="r">Продано, шт</th><th class="r">Продажи</th><th class="r">ДРР</th></tr>
{lal_rows}
<tr class="tot"><td>Итого</td><td>{len(LAL)} кампаний</td><td class="r">{num(TI)}</td><td class="r">{TC}</td><td class="r">{pct(TC, TI)}</td><td class="r">{rub(TR)}</td><td class="r">{rub(TR / TC)}</td><td class="r">{TO}</td><td class="r">{rub(TS, 0)}</td><td class="r">{drr(TR, TS)}</td></tr></table>
<p class="mut">CTR = клики / показы; цена клика = расход / клики; продано и продажи — сумма «после клика» и «после просмотра»; ДРР = расход / продажи × 100% (так же считает Ozon в колонке «ДРР в продвижении»). Цена 1 000 показов у всех — 220 ₽. Креативов кабинета 2 и копии робота на скринах нет.</p>

<h2>2. LAL против ретаргета тех же товаров</h2>
<table><tr><th>SKU</th><th class="r">Каб.</th><th class="r">CTR LAL</th><th class="r">Расход LAL</th><th class="r">Продажи LAL</th><th class="r">CTR ретаргет</th><th class="r">Расход ретаргет</th><th class="r">Продажи ретаргет</th><th class="r">ДРР ретаргет</th></tr>{cmp_rows}
<tr class="tot"><td>Итого</td><td></td><td class="r">{pct(TC, TI)}</td><td class="r">{rub(TR)}</td><td class="r">{rub(TS, 0)}</td><td class="r">{pct(sum(a['clk'] for a in RT.values()), sum(a['imp'] for a in RT.values()))}</td><td class="r">{rub(RT_R)}</td><td class="r">{rub(RT_S, 0)}</td><td class="r">{drr(RT_R, RT_S)}</td></tr></table>
<p class="mut">Ретаргет — кампании «мои просмотры / мои корзины» того же SKU в том же кабинете, у которых были показы за период. Почти все продажи ретаргета — «после просмотра».</p>
<p>Ретаргет тех же товаров продаёт с ДРР {pct(RT_R, RT_S)}, LAL — ноль. Скорее всего, дело не в товаре и не в карточке: те же SKU продаются тем, кто их уже смотрел. Не работает холодная похожая аудитория в текущей настройке.</p>

<h2>3. Креативы: CTR есть, продаж нет</h2>
<table><tr><th>Креатив</th><th>Заголовок</th><th>Тип заголовка</th><th>Скидка / кнопки</th><th>Визуал</th><th class="r">CTR</th></tr>{anat_rows}</table>
<ul>
<li>Лучше кликают баннеры одного шаблона: розовая рамка, короткий крупный заголовок, товар или результат крупно, плашка скидки («Хочется похудеть?», «Распродажа 50%»).</li>
<li>Хуже всех — три пылесоса, по 0,13%: у Aerlyn и Aqvion интерьерный шаблон без скидки, у Cleneo тёмная картинка.</li>
<li>Но даже лидеры по CTR не дали ни одной продажи. Значит, креатив отвечает за клик, а продаж нет из-за аудитории. Менять баннеры без изменения аудитории продаж не добавит.</li>
</ul>

<h2>4. Настройки (кабинет 1, со скринов)</h2>
<table><tr><th>Параметр</th><th>Значение</th></tr>
<tr><td>Формат / оплата / место</td><td>Баннер, за показы, Главная</td></tr>
<tr><td>Ставка за 1 000 показов</td><td>220 ₽ = конкурентная ставка; «% побед» пусто</td></tr>
<tr><td>Бюджет / частота</td><td>1 000 ₽ в день; 1 показ в неделю на человека</td></tr>
<tr><td>Время показа</td><td>9:00–21:00 (аэрогриль — без ограничения)</td></tr>
<tr><td>Старт</td><td>13.10 — робот, швабра, три пылесоса; 15.10 — виброплатформа, аэрогриль. В каб. 2: SHVPAREKCHB — с 3.10, VIPLATB — с 13.10 (по названию)</td></tr>
<tr><td>Баннеры</td><td>по одному; у робота 3, работает 1 (два с замком, 0 показов). Копия робота (45464738) неактивна: CTR {pct(12, 13473)}, {rub(2964.06)}, 0 продаж</td></tr>
<tr><td>Основа похожей аудитории</td><td>не видна на скринах — уточнить (⚙ в блоке «Параметры»)</td></tr>
</table>

<h2>5. Бюджет не выбирается (кабинет 1)</h2>
<table><tr><th>Товар</th><th>Старт</th><th class="r">Дней до 18.10</th><th class="r">Расход</th><th class="r">В день</th><th class="r">От лимита 1 000 ₽</th></tr>{spend_rows}</table>
<p>Кампании тратят 29–44% дневного лимита. Вероятная причина — частота «1 в неделю» при ограниченной аудитории. При нуле продаж расширять охват сейчас нет смысла.</p>

<h2>6. Рекомендации</h2>
<ul>
<li><b>Выключить сейчас:</b> три пылесоса (VACCLDRY, VACCLWASH, VACCLCOMPACT авто) — худший CTR и 0 продаж; SHVPAREKCHB авто 3.10 в каб. 2 — самая долгая LAL (с 3.10), {rub(3389.54)} и 0 продаж. Копию робота не включать.</li>
<li><b>Оставить до 27.10 со стоп-критерием:</b> виброплатформы (VIPLATB2, VIPLATB), аэрогриль, робот, швабра каб. 1. Если к 27.10 (две недели с запуска) нет ни одной продажи, включая после просмотра, — выключить.</li>
<li><b>Перед повторным запуском LAL</b> проверить основу похожей аудитории: строить её от покупателей товара, а не от просмотров, если Ozon позволяет. Затем запускать с креативом по шаблону лидеров и цифрой скидки.</li>
<li><b>Деньги с выключенных LAL</b> не переливать автоматически в ретаргет: он тоже не выбирает лимит 1 000 ₽ в день. Лучше расширить ретаргет на товары, где он продаёт с низким ДРР.</li>
</ul>

<h2>7. Что уточнить</h2>
<ul>
<li>Период выгрузки кабинета 2 — в файле не указан.</li>
<li>Основу и размер похожей аудитории в LAL-кампаниях.</li>
<li>Окно атрибуции «продаж после просмотра» у Ozon: если продажи засчитываются с задержкой, кампании от 13–15.10 могли не успеть их набрать. Поэтому для живых LAL срок решения — 27.10, а не сегодня.</li>
<li>Креативы кабинета 2 (VIPLATB авто 13.10, SHVPAREKCHB авто 3.10) и почему два баннера робота с замком.</li>
</ul>
</body></html>"""
open(OUT, "w", encoding="utf-8").write(H)
print("ok", len(LAL), TI, TC, round(TR, 2), TS, "| RT", round(RT_R, 2), RT_S, "| all", round(ALL_R, 2), KAB_R, KAB_S)
