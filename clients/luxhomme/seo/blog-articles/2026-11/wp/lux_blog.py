"""Общие блоки для статей блога luxhomme.store в фирменном стиле (как статья ко Дню матери, build_post_01_styled.py).
Витрина почти не стилизует контент статьи, поэтому оформление inline-стилями. Цены и наличие берутся из каталога
(Store API) в момент сборки: перед публикацией статью пересобрать, чтобы цены были актуальными."""
import html as H
import json
import urllib.request

U = "https://luxhomme.store/wp-content/uploads/"
S = "https://luxhomme.store"
API = "https://luxhomme.store/wp-json"
INK, MUTED, OLIVE, SAND, DIES, WHITE, LINE = "#2A2A2A", "#5E604E", "#6B743F", "#DDD7C1", "#E1DFDA", "#FFFFFF", "#E8E8E8"
LIME = "#DAE54B"
GOGOL = "fontGogol, Gogol, cursive"
CAT_BLOG = 124

# Факты о товарах: карточки luxhomme.store и черновики статей 23.11. Название, текст, кому подходит, картинка.
P = {
    "ufit-2d": ("Виброплатформа uFit 2D Standard",
                "5 автоматических программ по 10 минут, 180 скоростей, эспандеры и пульт в комплекте, вес 6,3 кг.",
                "хочет заниматься дома по 10–20 минут", "2025/06/VMP-stranitsa-tovara-26-2-.png"),
    "ecosteam-pro": ("Паровая швабра EcoSteam Pro",
                     "Вес 1,83 кг, пар до 120 °C, нагрев за 30 секунд, 22 насадки для пола, окон и швов. Моет пол паром без моющих средств.",
                     "моет полы чаще раза в неделю", "2017/10/SHvabra-EcoSteam-Pro-1a.jpg"),
    "airgrill": ("Аэрогриль AirChef 5,5 л",
                 "12 программ, температура от 30 до 220 °C, таймер до 8 часов, в комплекте книга рецептов и силиконовая форма.",
                 "готовит на двоих или троих", "2026/07/aerogril-airchef-odna-chasha.webp"),
    "sc-100": ("Паровая швабра SC-100 Max",
               "Три режима: влажная уборка, чистка мебели и плитки, отпаривание одежды. Пар до 150 °C, 9 насадок.",
               "хочет швабру и отпариватель для одежды в одном приборе", "2025/09/VMP-stranitsa-tovara-29.png"),
    "ufit-2d-ems": ("Виброплатформа uFit 2D Pro с EMS",
                    "Те же 5 программ и 180 скоростей, что у Standard, плюс EMS-стимуляция мышц, нагрев и фитнес-браслет в комплекте.",
                    "хочет EMS-стимуляцию мышц и нагрев", "2026/01/VMP-stranitsa-tovara-89.png"),
    "steamly-pro": ("Паровая швабра AirSteam Pro",
                    "Три режима пара и 25 насадок: для большой квартиры или дома.",
                    "убирает большую квартиру или дом", "2026/04/VMP-stranitsa-tovara-33.png"),
    "coffee": ("Кофемашина CoffeeMaker Classic",
               "Капсулы Nespresso, чалды и молотый кофе. Помпа 19 бар, нагрев около 20 секунд, ручной капучинатор, тихая работа.",
               "каждое утро пьёт кофе", "2017/10/VMP-stranitsa-tovara-19.png"),
    "window": ("Робот-мойщик окон uClean Max",
               "Моет окна сам в автоматическом режиме или по командам из приложения.",
               "живёт в доме с большими окнами", "2017/10/VMP-stranitsa-tovara-40.png"),
    "vertikalnyj-suhoj-pylesos-aerlyn": ("Вертикальный пылесос Aerlyn",
                                         "Беспроводной, мощность всасывания до 35 000 Па, до 60 минут работы. Сухая уборка и насадка для влажной.",
                                         "держит дома кошку или собаку", "2026/06/VMP-stranitsa-tovara-98.png"),
    "airgrill-dual-pro": ("Аэрогриль AirChef Dual Pro",
                          "Две независимые чаши на 7 и 5 литров: горячее и гарнир одновременно. 18 программ, чаши можно мыть в посудомоечной машине.",
                          "готовит на всю семью", "2026/07/aerogril-airchef-dual-pro-kuhnya.webp"),
    "kompaktnyj-moyushhij-pylesos-cleneo-pro": ("Моющий пылесос Cleneo Pro",
                                                "Моет полы и ковры, чистит диваны и кресла, подаёт пар. Бак чистой воды 1,8 литра, 11 насадок.",
                                                "любит мягкую мебель и ковры", "2026/05/VMP-stranitsa-tovara-1-2.png"),
    "caffio-professional": ("Кофемашина Caffio Professional",
                            "Молотый кофе, капсулы Nespresso и Dolce Gusto, чалды ESE. Автоматический съёмный капучинатор с регулировкой пенки, подогрев чашек.",
                            "любит капучино и латте", "2026/09/Caffio-Professional-1.7.png"),
    "vibroplatforma-dlya-pohudeniya-3d-c-ems-tokami-i-nagrevom-do-150-kg": (
        "Виброплатформа 3D с EMS и нагревом",
        "Три типа вибрации (вертикальная, горизонтальная и их сочетание), EMS, нагрев, управление с пульта и браслета, нагрузка до 150 кг.",
        "занимается регулярно и хочет больше режимов", "2026/07/hf_20260529_125122_5f1d133d-7ba7-433d-a55f-16946538752a-3.png"),
    "vertikalnyj-moyushhij-pylesos-aqvion-pro": ("Моющий пылесос Aqvion Pro",
                                                 "Беспроводной: пылесосит и моет пол за один проход, раздельные баки для чистой и грязной воды, самоочистка и сушка щётки на базе.",
                                                 "хочет пылесосить и мыть пол за один раз", "2026/05/VMP-stranitsa-tovara-12.png"),
    "cremax": ("Зерновая кофемашина CremaX",
               "Встроенная кофемолка. Работает с зерном, молотым кофе, капсулами Nespresso и Dolce Gusto, чалдами ESE, все адаптеры в коробке.",
               "покупает кофе в зёрнах", "2026/10/CremaX-1.1.jpg"),
}


def catalog():
    """slug -> (цена, в наличии) из Store API."""
    rows = json.load(urllib.request.urlopen(f"{API}/wc/store/v1/products?per_page=100", timeout=60))
    out = {}
    for r in rows:
        pr = r["prices"]
        out[r["slug"]] = (int(pr["price"]) // 10 ** pr["currency_minor_unit"], r["is_in_stock"])
    return out


def rub(n):
    return f"{n:,}".replace(",", "\u00a0") + "\u00a0₽"  # неразрывные пробелы: число и ₽ не переносятся


class Doc:
    def __init__(self):
        self.B = []

    def raw(self, h):
        self.B.append(f"<!-- wp:html -->\n{h}\n<!-- /wp:html -->")

    def para(self, t, extra=""):
        self.raw(f'<p style="font-size:17px;line-height:1.6;margin:0 0 18px;{extra}">{t}</p>')

    def h2(self, num, text, anchor):
        self.raw(f'<h2 id="{anchor}" style="font-size:30px;line-height:1.15;font-weight:500;margin:72px 0 22px;letter-spacing:-0.3px;">'
                 f'<span style="display:block;font-family:{GOGOL};font-weight:400;font-size:40px;line-height:1;color:{OLIVE};margin-bottom:8px;">{num}</span>{text}</h2>')

    def note(self, label, text, bg=SAND):
        self.raw(f'<div style="background:{bg};border-radius:20px;padding:20px 24px;margin:24px 0;font-size:16px;line-height:1.55;">'
                 f'<strong style="display:block;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin-bottom:6px;">{label}</strong>{text}</div>')

    def summary(self, label, title, cards):
        """cards: (подпись, название, цена-строка, якорь)"""
        cs = "".join(f'<a href="#{a}" style="flex:1 1 150px;display:block;background:{WHITE};border-radius:18px;padding:16px 18px;text-decoration:none;color:{INK};">'
                     f'<span style="display:block;font-size:13px;color:{MUTED};margin-bottom:6px;">{t}</span>'
                     f'<span style="display:block;font-size:17px;font-weight:600;line-height:1.25;">{n}</span>'
                     f'<span style="display:block;font-size:15px;color:{OLIVE};font-weight:600;margin-top:6px;">{p}</span></a>' for t, n, p, a in cards)
        self.raw(f'<div style="background:{DIES};border-radius:28px;padding:26px;margin:0 0 28px;">'
                 f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 6px;">{label}</p>'
                 f'<p style="font-size:22px;line-height:1.3;font-weight:500;margin:0 0 18px;">{title}</p>'
                 f'<div style="display:flex;flex-wrap:wrap;gap:10px;">{cs}</div></div>')

    def toc(self, items):
        t = "".join(f'<a href="#{a}" style="flex:1 1 260px;display:flex;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid {SAND};text-decoration:none;color:{INK};font-size:15px;line-height:1.35;">'
                    f'<span style="font-family:{GOGOL};color:{OLIVE};font-size:22px;min-width:30px;">{i:02d}</span>{x}</a>' for i, (a, x) in enumerate(items, 1))
        self.raw(f'<div style="border:1.5px solid {SAND};border-radius:24px;padding:22px 26px;margin:0 0 12px;">'
                 f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 6px;">Содержание</p>'
                 f'<div style="display:flex;flex-wrap:wrap;column-gap:32px;">{t}</div></div>')

    def card(self, slug, price, who_prefix, extra=""):
        """Карточка товара: фото, кому подходит, название, цена, факты, кнопка."""
        name, text, who, img = P[slug]
        alt = f"{name} Luxhommè"
        self.raw(f'<div style="display:flex;flex-wrap:wrap;background:{WHITE};border-radius:24px;overflow:hidden;margin:0 0 12px;">'
                 f'<div style="flex:1 1 200px;position:relative;min-height:220px;background:{DIES};">'
                 f'<img src="{U}{img}" alt="{H.escape(alt)}" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;"></div>'
                 f'<div style="flex:2 1 300px;padding:22px 24px 24px;">'
                 f'<span style="display:inline-block;background:{SAND};color:{MUTED};border-radius:999px;padding:6px 14px;font-size:13px;line-height:1.3;">{who_prefix} {who}</span>'
                 f'<h3 style="font-size:21px;line-height:1.25;font-weight:500;margin:14px 0 4px;">{name}</h3>'
                 f'<p style="font-size:22px;font-weight:700;margin:0 0 10px;">{rub(price)}</p>'
                 f'<p style="font-size:15px;line-height:1.55;margin:0 0 12px;">{text}{(" " + extra) if extra else ""}</p>'
                 f'<a href="{S}/products/{slug}" style="display:inline-block;background:{OLIVE};color:{WHITE};text-decoration:none;border-radius:999px;'
                 f'padding:12px 22px;font-size:15px;font-weight:600;line-height:1.2;">Смотреть в магазине →</a></div></div>')

    def table(self, head, rows, note=""):
        td = f"padding:14px 18px;border-top:1px solid {LINE};font-size:15px;line-height:1.45;vertical-align:top;"
        th = f"padding:14px 18px;text-align:left;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:{MUTED};font-weight:600;"
        trs = "".join("<tr>" + "".join(f'<td style="{td}{st}">{v}</td>' for v, st in r) + "</tr>" for r in rows)
        self.raw(f'<div style="background:{WHITE};border-radius:24px;overflow:hidden;overflow-x:auto;margin:8px 0 12px;">'
                 f'<table style="width:100%;border-collapse:collapse;min-width:520px;"><thead><tr style="background:{SAND};">'
                 + "".join(f'<th style="{th}">{h}</th>' for h in head) + f'</tr></thead><tbody>{trs}</tbody></table></div>')
        if note:
            self.para(note, f"font-size:14px;color:{MUTED};")

    def steps(self, items):
        self.raw('<div style="display:flex;flex-wrap:wrap;gap:12px;margin:0 0 8px;">' + "".join(
            f'<div style="flex:1 1 240px;background:{WHITE};border-radius:22px;padding:22px;">'
            f'<span style="font-family:{GOGOL};color:{OLIVE};font-size:30px;line-height:1;">{i}</span>'
            f'<p style="font-size:17px;font-weight:600;line-height:1.3;margin:10px 0 8px;">{t}</p>'
            f'<p style="font-size:14px;line-height:1.55;margin:0;color:{MUTED};">{d}</p></div>' for i, (t, d) in enumerate(items, 1)) + '</div>')

    def dark(self, kicker, big, sub, text, cta, href, code=None):
        code_html = (f'<div style="display:inline-block;background:#EFEEEB;color:{INK};border-radius:16px;padding:12px 20px;margin:0 0 18px;">'
                     f'<span style="display:block;font-size:12px;">Промокод</span><strong style="font-size:26px;letter-spacing:2px;">{code}</strong></div>') if code else ""
        big_html = f'<p style="font-size:56px;line-height:1;font-weight:700;color:{LIME};margin:0 0 6px;letter-spacing:-2px;">{big}</p>' if big else ""
        self.raw(f'<div style="background:{INK};color:{WHITE};border-radius:28px;padding:32px 30px;margin:8px 0 12px;">'
                 f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{LIME};margin:0 0 8px;">{kicker}</p>'
                 f'{big_html}<p style="font-size:20px;font-weight:600;margin:0 0 20px;">{sub}</p>{code_html}'
                 f'<p style="font-size:15px;line-height:1.55;color:#EFEEEB;margin:0 0 18px;">{text}</p>'
                 f'<a href="{href}" style="display:inline-block;background:{LIME};color:{INK};text-decoration:none;border-radius:999px;padding:14px 26px;font-size:16px;font-weight:700;">{cta}</a></div>')

    def resume(self, text):
        self.raw(f'<div style="border-left:4px solid {OLIVE};padding:6px 0 6px 22px;margin:48px 0 0;">'
                 f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 8px;">Резюмируя</p>'
                 f'<p style="font-size:18px;line-height:1.6;margin:0;">{text}</p></div>')

    def faq(self, items):
        self.raw("".join(f'<details style="background:{WHITE};border-radius:18px;padding:18px 22px;margin:0 0 10px;">'
                         f'<summary style="font-size:17px;font-weight:600;line-height:1.35;cursor:pointer;">{q}</summary>'
                         f'<p style="font-size:15px;line-height:1.6;margin:12px 0 0;color:{MUTED};">{a}</p></details>' for q, a in items))

    def html(self):
        return "\n\n".join(self.B)


def link(path, text):
    return f'<a href="{S}{path}" style="color:{INK};">{text}</a>'


def save_draft(state_file, title, slug, content, excerpt, featured_media):
    """Создаёт черновик или обновляет созданную ранее запись (id в state_file). Статус и дату существующей записи
    не трогает: запланированная (future) остаётся запланированной. Никогда не публикует."""
    import os
    body = {"title": title, "slug": slug, "content": content, "excerpt": excerpt,
            "categories": [CAT_BLOG], "featured_media": featured_media}
    pid = json.load(open(state_file))["id"] if os.path.exists(state_file) else None
    if pid:
        cur = json.load(urllib.request.urlopen(f"{API}/wp/v2/posts/{pid}?context=edit&_fields=status", timeout=60))["status"]
        assert cur in ("draft", "future"), f"запись {pid} уже {cur}: пересборку опубликованной статьи делать вручную"
    else:
        body["status"] = "draft"
    url = f"{API}/wp/v2/posts/{pid}" if pid else f"{API}/wp/v2/posts"
    req = urllib.request.Request(url, method="POST", data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req, timeout=120))
    assert r["status"] in ("draft", "future"), r["status"]
    json.dump({"id": r["id"], "slug": r["slug"], "status": r["status"], "date": r["date"]}, open(state_file, "w"))
    return r


def schedule(state_file, date_msk):
    """Ставит черновик в отложенную публикацию: date_msk вида 2026-11-26T18:00:00 (время сайта, Москва)."""
    pid = json.load(open(state_file))["id"]
    req = urllib.request.Request(f"{API}/wp/v2/posts/{pid}", method="POST",
                                 data=json.dumps({"status": "future", "date": date_msk}).encode(), headers={"Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req, timeout=60))
    assert r["status"] == "future", r["status"]
    json.dump({"id": r["id"], "slug": r["slug"], "status": r["status"], "date": r["date"]}, open(state_file, "w"))
    return r


def check(title, excerpt, content):
    assert len(title) <= 59, (len(title), title)
    assert 120 <= len(excerpt) <= 160, (len(excerpt), excerpt)
    assert "—" not in content and "—" not in excerpt and "—" not in title, "длинное тире"
