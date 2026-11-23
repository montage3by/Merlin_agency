"""Стильная версия статьи «Что подарить маме на День матери» для блога luxhomme.store.
Витрина (Next.js) почти не стилизует контент статьи, поэтому оформление задано inline-стилями в фирменных цветах сайта.
usage: python3 build_post_01_styled.py out.json"""
import json, sys, html as H

U = "https://luxhomme.store/wp-content/uploads/"
S = "https://luxhomme.store"
INK, MUTED, OLIVE, SAND, DIES, WHITE, LINE = "#2A2A2A", "#5E604E", "#6B743F", "#DDD7C1", "#E1DFDA", "#FFFFFF", "#E8E8E8"
GOGOL = "fontGogol, Gogol, cursive"
B = []


def raw(h): B.append(f"<!-- wp:html -->\n{h}\n<!-- /wp:html -->")
def para(t, extra=""): raw(f'<p style="font-size:17px;line-height:1.6;margin:0 0 18px;{extra}">{t}</p>')
def h2(num, text, anchor):
    raw(f'<h2 id="{anchor}" style="font-size:30px;line-height:1.15;font-weight:500;margin:72px 0 22px;letter-spacing:-0.3px;">'
        f'<span style="display:block;font-family:{GOGOL};font-weight:400;font-size:40px;line-height:1;color:{OLIVE};margin-bottom:8px;">{num}</span>{text}</h2>')
def btn(href, label, primary=True):
    st = (f"background:{OLIVE};color:{WHITE};" if primary else f"background:transparent;color:{INK};border:1.5px solid {INK};")
    return (f'<a href="{href}" style="display:inline-block;{st}text-decoration:none;border-radius:999px;padding:13px 24px;'
            f'font-size:15px;font-weight:600;line-height:1.2;margin:6px 8px 0 0;">{label}</a>')
def note(label, text, bg=SAND):
    raw(f'<div style="background:{bg};border-radius:20px;padding:20px 24px;margin:24px 0;font-size:16px;line-height:1.55;">'
        f'<strong style="display:block;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin-bottom:6px;">{label}</strong>{text}</div>')


def product(img, alt, tag, name, price, specs, text, url, extra=""):
    rows = "".join(f'<div style="display:flex;justify-content:space-between;gap:16px;padding:9px 0;border-bottom:1px solid {LINE};font-size:14px;line-height:1.4;">'
                   f'<span style="color:{MUTED};">{k}</span><span style="text-align:right;font-weight:500;">{v}</span></div>' for k, v in specs)
    raw(f'<div style="display:flex;flex-wrap:wrap;background:{WHITE};border-radius:28px;overflow:hidden;margin:8px 0 18px;">'
        f'<div style="flex:1 1 300px;min-height:320px;background:{DIES};">'
        f'<img src="{U}{img}" alt="{H.escape(alt)}" loading="lazy" style="display:block;width:100%;height:100%;min-height:320px;max-height:520px;object-fit:cover;"></div>'
        f'<div style="flex:1 1 340px;padding:28px 28px 30px;">'
        f'<span style="display:inline-block;background:{SAND};color:{MUTED};border-radius:999px;padding:6px 14px;font-size:13px;line-height:1.2;">{tag}</span>'
        f'<h3 style="font-size:24px;line-height:1.2;font-weight:500;margin:16px 0 6px;">{name}</h3>'
        f'<p style="font-size:26px;font-weight:700;margin:0 0 16px;">{price}</p>'
        f'<div style="margin:0 0 18px;">{rows}</div>'
        f'<p style="font-size:15px;line-height:1.55;margin:0 0 14px;">{text}</p>'
        f'{btn(S + "/products/" + url, "Смотреть в магазине →")}</div></div>')
    if extra:
        note("Ещё вариант", extra, bg=DIES)


TOC = [("kak-vybrat", "Как выбрать подарок маме"), ("kofe", "Маме, которая начинает утро с кофе"),
       ("gotovka", "Маме, которая готовит на всю семью"), ("uborka", "Маме, которая любит чистоту"),
       ("zdorovie", "Маме, которой некогда ходить в спортзал"), ("okna", "Маме, которая не любит мыть окна"),
       ("tablica", "Подарки маме: сравнительная таблица"), ("kak-podarit", "Как подарить, чтобы пользовались"),
       ("uspet", "Как успеть к 29 ноября"), ("faq", "Вопросы и ответы")]

# ---------- вступление
para("День матери в 2026 году отмечают 29 ноября, в воскресенье. Цветы и открытка будут обязательно, но многие ищут, "
     "<strong>что подарить маме на День матери</strong> такого, чтобы вещь служила каждый день. Хороший вариант: бытовая техника, "
     "которая берёт на себя часть домашних дел. У мамы остаётся время на себя, а подарок напоминает о вас каждое утро.",
     "font-size:19px;line-height:1.6;margin-bottom:28px;")

quick = [("Для утреннего кофе", "CoffeeMaker Classic", "9 290 ₽", "kofe"), ("Для семейных ужинов", "AirChef Dual Pro", "14 981 ₽", "gotovka"),
         ("Для чистых полов", "EcoSteam Pro", "5 089 ₽", "uborka"), ("Для дивана и ковров", "Cleneo Pro", "15 847 ₽", "uborka"),
         ("Для занятий дома", "uFit 2D Standard", "4 813 ₽", "zdorovie"), ("Для окон", "uClean Max", "9 790 ₽", "okna")]
cards = "".join(f'<a href="#{a}" style="flex:1 1 140px;display:block;background:{WHITE};border-radius:18px;padding:16px 18px;text-decoration:none;color:{INK};">'
                f'<span style="display:block;font-size:13px;color:{MUTED};margin-bottom:6px;">{t}</span>'
                f'<span style="display:block;font-size:17px;font-weight:600;line-height:1.25;">{n}</span>'
                f'<span style="display:block;font-size:15px;color:{OLIVE};font-weight:600;margin-top:6px;">{p}</span></a>' for t, n, p, a in quick)
raw(f'<div style="background:{DIES};border-radius:28px;padding:26px;margin:0 0 28px;">'
    f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 6px;">Если коротко</p>'
    f'<p style="font-size:22px;line-height:1.3;font-weight:500;margin:0 0 18px;">Полезный подарок маме от 4 813 ₽: выберите по тому, на что у неё уходит больше всего времени</p>'
    f'<div style="display:flex;flex-wrap:wrap;gap:10px;">{cards}</div></div>')

toc = "".join(f'<a href="#{a}" style="flex:1 1 260px;display:flex;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid {SAND};text-decoration:none;color:{INK};font-size:15px;line-height:1.35;">'
              f'<span style="font-family:{GOGOL};color:{OLIVE};font-size:22px;min-width:30px;">{i:02d}</span>{t}</a>' for i, (a, t) in enumerate(TOC, 1))
raw(f'<div style="border:1.5px solid {SAND};border-radius:24px;padding:22px 26px;margin:0 0 12px;">'
    f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 6px;">Содержание</p>'
    f'<div style="display:flex;flex-wrap:wrap;column-gap:32px;">{toc}</div></div>')

# ---------- как выбрать
h2("01", "Как выбрать подарок маме, которым будут пользоваться", "kak-vybrat")
tips = [("Решите конкретную задачу", "Вспомните, на что мама чаще всего жалуется: «опять мыть полы», «долго стоять у плиты», «нет времени на зарядку». Подарок, который решает понятную задачу, не уберут в шкаф."),
        ("Выбирайте простое управление", "Понятные кнопки, готовые программы и лёгкий вес: тогда техникой будут пользоваться без инструкции под рукой."),
        ("Учитывайте место", "Посмотрите, сколько свободного места на кухне и в кладовке: компактная техника приживается быстрее.")]
raw('<div style="display:flex;flex-wrap:wrap;gap:12px;margin:0 0 8px;">' + "".join(
    f'<div style="flex:1 1 240px;background:{WHITE};border-radius:22px;padding:22px;">'
    f'<span style="font-family:{GOGOL};color:{OLIVE};font-size:30px;line-height:1;">{i}</span>'
    f'<p style="font-size:17px;font-weight:600;line-height:1.3;margin:10px 0 8px;">{t}</p>'
    f'<p style="font-size:14px;line-height:1.55;margin:0;color:{MUTED};">{d}</p></div>' for i, (t, d) in enumerate(tips, 1)) + '</div>')
note("Важно", "Подарок маме на День матери воспринимается как забота, когда он убирает дела, а не добавляет их. Поэтому ниже техника сгруппирована по тому, чем мама занимается чаще всего.")

# ---------- товары
h2("02", "Маме, которая начинает утро с кофе", "kofe")
product("2017/10/VMP-stranitsa-tovara-19.png", "Кофемашина Luxhommè CoffeeMaker Classic в подарок маме", "Для утреннего кофе",
        "Кофемашина CoffeeMaker Classic", "9 290 ₽",
        [("Формат кофе", "капсулы Nespresso, чалды, молотый"), ("Давление помпы", "19 бар"), ("Нагрев", "около 20 секунд"),
         ("Объём порции", "7 уровней, 30–180 мл"), ("Шум", "60–65 дБ")],
        "Маме не придётся привыкать к одному формату кофе. Кофемашина работает тихо: можно сварить кофе рано утром и никого не разбудить. Есть ручной капучинатор для молочной пенки.",
        "coffee",
        f'Любит капучино и латте, но не хочет взбивать молоко вручную? Посмотрите рожковую <a href="{S}/products/caffio-professional" style="color:{INK};">Caffio Professional</a> за 17 556 ₽: автоматический капучинатор и подогрев чашек. О форматах кофе: <a href="{S}/blog/kofemashina-4-v-1" style="color:{INK};">кофемашина 4 в 1</a>.')

h2("03", "Маме, которая готовит на всю семью", "gotovka")
product("2026/07/aerogril-airchef-dual-pro-kuhnya.webp", "Аэрогриль Luxhommè AirChef Dual Pro с двумя чашами на кухне", "Для семейных ужинов",
        "Аэрогриль AirChef Dual Pro", "14 981 ₽",
        [("Чаши", "2 независимые, 7 л и 5 л"), ("Программы", "18"), ("Температура", "30–220 °C"), ("Таймер", "до 8 часов"),
         ("Уход", "чаши можно мыть в посудомойке")],
        "Два блюда одновременно: в одной чаше мясо, в другой гарнир, запахи не смешиваются. Напоминание перевернуть продукты и синхронизация чаш, чтобы всё было готово к одному времени. В комплекте книга рецептов, шашлычница и силиконовая форма.",
        "airgrill-dual-pro",
        f'Для небольшой семьи подойдёт <a href="{S}/products/airgrill" style="color:{INK};">AirChef на 5,5 литра</a> за 5 380 ₽: 12 программ. Если сомневаетесь: <a href="{S}/blog/aerogril-odna-ili-dve-chashi" style="color:{INK};">аэрогриль с одной или двумя чашами</a>.')

h2("04", "Маме, которая любит чистоту", "uborka")
product("2017/10/SHvabra-EcoSteam-Pro-1a.jpg", "Паровая швабра Luxhommè EcoSteam Pro", "Для чистых полов",
        "Паровая швабра EcoSteam Pro", "5 089 ₽",
        [("Вес", "1,83 кг"), ("Температура пара", "до 120 °C"), ("Нагрев", "30 секунд"), ("Насадки", "22")],
        "Моет полы паром без моющих средств, легко поднимается одной рукой. Насадки для пола, окон, швов и мягкой мебели. По данным производителя, пар удаляет до 99% бактерий, жир и аллергены.",
        "ecosteam-pro")
product("2026/05/VMP-stranitsa-tovara-1-2.png", "Компактный моющий пылесос Cleneo Pro для дивана и ковров", "Для дивана и ковров",
        "Моющий пылесос Cleneo Pro", "15 847 ₽",
        [("Уборка", "сухая, влажная и пар"), ("Бак чистой воды", "1,8 л"), ("Насадки", "11 и 2 адаптера")],
        "Подарок для дома с коврами и мягкой мебелью: моет полы и ковры, чистит диваны и кресла, подаёт пар.",
        "kompaktnyj-moyushhij-pylesos-cleneo-pro",
        f'Что ещё можно чистить паром: <a href="{S}/blog/parovaya-shvabra-chto-mozhno-chistit" style="color:{INK};">паровая швабра: что можно чистить</a>.')

h2("05", "Маме, которой некогда ходить в спортзал", "zdorovie")
product("2025/06/VMP-stranitsa-tovara-26-2-.png", "Виброплатформа uFit 2D для занятий дома", "Для занятий дома",
        "Виброплатформа uFit 2D Standard", "4 813 ₽",
        [("Программы", "5 по 10 минут"), ("Скорость", "180 уровней"), ("В комплекте", "эспандеры, резинка, пульт"), ("Нагрузка", "до 150 кг")],
        f'Помогает заниматься дома без абонемента в зал. Производитель рекомендует тренировки по 10–20 минут. Версия с EMS-стимуляцией мышц и нагревом: <a href="{S}/products/ufit-2d-ems" style="color:{INK};">uFit 2D Pro</a> за 7 498 ₽.',
        "ufit-2d")
note("Важно", f'Если у мамы есть заболевания суставов, сердца, повышенное давление или другие хронические заболевания, перед занятиями стоит посоветоваться с врачом. Список противопоказаний есть в инструкции. Как начать: <a href="{S}/blog/pervye-trenirovki-na-vibroplatforme-doma" style="color:{INK};">первые тренировки на виброплатформе дома</a>.')

h2("06", "Маме, которая не любит мыть окна", "okna")
product("2017/10/VMP-stranitsa-tovara-40.png", "Робот-мойщик окон Luxhommè uClean Max", "Для окон",
        "Робот-мойщик окон uClean Max", "9 790 ₽",
        [("Режимы", "автоматический и из приложения")],
        "Полезный подарок маме, у которой большие окна или загородный дом: одну из самых нелюбимых домашних задач можно поручить роботу.",
        "window")

# ---------- таблица
h2("07", "Подарки маме на День матери: сравнительная таблица", "tablica")
rows = [("Виброплатформа uFit 2D Standard", "ufit-2d", "4 813 ₽", "хочет заниматься дома"),
        ("Паровая швабра EcoSteam Pro", "ecosteam-pro", "5 089 ₽", "часто моет полы"),
        ("Аэрогриль AirChef 5,5 л", "airgrill", "5 380 ₽", "готовит на двоих или троих"),
        ("Кофемашина CoffeeMaker Classic", "coffee", "9 290 ₽", "каждое утро пьёт кофе"),
        ("Робот-мойщик окон uClean Max", "window", "9 790 ₽", "живёт в доме с большими окнами"),
        ("Аэрогриль AirChef Dual Pro", "airgrill-dual-pro", "14 981 ₽", "готовит на всю семью"),
        ("Моющий пылесос Cleneo Pro", "kompaktnyj-moyushhij-pylesos-cleneo-pro", "15 847 ₽", "любит мягкую мебель и ковры"),
        ("Кофемашина Caffio Professional", "caffio-professional", "17 556 ₽", "любит капучино и латте")]
td = f"padding:14px 18px;border-top:1px solid {LINE};font-size:15px;line-height:1.4;vertical-align:top;"
trs = "".join(f'<tr><td style="{td}"><a href="{S}/products/{u}" style="color:{INK};font-weight:500;">{n}</a></td>'
              f'<td style="{td}white-space:nowrap;font-weight:700;">{p}</td><td style="{td}color:{MUTED};">{w}</td></tr>' for n, u, p, w in rows)
th = f"padding:14px 18px;text-align:left;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:{MUTED};font-weight:600;"
raw(f'<div style="background:{WHITE};border-radius:24px;overflow:hidden;overflow-x:auto;margin:8px 0 12px;">'
    f'<table style="width:100%;border-collapse:collapse;min-width:520px;"><thead><tr style="background:{SAND};">'
    f'<th style="{th}">Подарок</th><th style="{th}">Цена</th><th style="{th}">Маме, которая</th></tr></thead><tbody>{trs}</tbody></table></div>')
para("Цены указаны по каталогу Luxhommè на момент публикации.", f"font-size:14px;color:{MUTED};")

# ---------- как подарить
h2("08", "Как подарить технику, чтобы ею пользовались", "kak-podarit")
gift = [("Распакуйте вместе", "Один раз попробуйте: сварите кофе, приготовьте ужин в аэрогриле, помойте пол на кухне."),
        ("Сохраните инструкцию", "Добавьте в телефон мамы ссылку на инструкцию со страницы товара: если что-то забудется, её легко найти."),
        ("Подскажите, куда писать", "Служба заботы Luxhommè отвечает в Telegram и по почте care@luxhomme.store с 9:00 до 21:00 по Москве.")]
raw('<div style="display:flex;flex-wrap:wrap;gap:12px;">' + "".join(
    f'<div style="flex:1 1 240px;background:{WHITE};border-radius:22px;padding:22px;">'
    f'<span style="font-family:{GOGOL};color:{OLIVE};font-size:30px;line-height:1;">{i}</span>'
    f'<p style="font-size:17px;font-weight:600;line-height:1.3;margin:10px 0 8px;">{t}</p>'
    f'<p style="font-size:14px;line-height:1.55;margin:0;color:{MUTED};">{d}</p></div>' for i, (t, d) in enumerate(gift, 1)) + '</div>')

# ---------- промо
h2("09", "Как успеть к 29 ноября", "uspet")
raw(f'<div style="background:{INK};color:{WHITE};border-radius:28px;padding:32px 30px;margin:8px 0 12px;">'
    f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#DAE54B;margin:0 0 8px;">Чёрная пятница продолжается</p>'
    f'<p style="font-size:56px;line-height:1;font-weight:700;color:#DAE54B;margin:0 0 6px;letter-spacing:-2px;">−20%</p>'
    f'<p style="font-size:20px;font-weight:600;margin:0 0 20px;">на весь заказ на luxhomme.store</p>'
    f'<div style="display:inline-block;background:#EFEEEB;color:{INK};border-radius:16px;padding:12px 20px;margin:0 0 18px;">'
    f'<span style="display:block;font-size:12px;">Промокод</span><strong style="font-size:26px;letter-spacing:2px;">BLACK20</strong></div>'
    f'<p style="font-size:15px;line-height:1.55;color:#EFEEEB;margin:0 0 18px;">Введите код при оформлении заказа: скидка действует и на подарок маме. Срок доставки в ваш город проверьте при оформлении или уточните в службе заботы.</p>'
    f'<a href="{S}/catalog" style="display:inline-block;background:#DAE54B;color:{INK};text-decoration:none;border-radius:999px;padding:14px 26px;font-size:16px;font-weight:700;">Выбрать подарок маме →</a></div>')

# ---------- резюме
raw(f'<div style="border-left:4px solid {OLIVE};padding:6px 0 6px 22px;margin:48px 0 0;">'
    f'<p style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:{MUTED};margin:0 0 8px;">Резюмируя</p>'
    f'<p style="font-size:18px;line-height:1.6;margin:0;">Что подарить маме на День матери, зависит от того, на что у неё уходит больше всего времени. '
    f'Кофе по утрам решит CoffeeMaker Classic, готовку на всю семью аэрогриль AirChef Dual Pro, уборку паровая швабра EcoSteam Pro или моющий пылесос Cleneo Pro, '
    f'а занятия дома виброплатформа uFit 2D. Подарок, который освобождает время, мама будет использовать каждый день.</p></div>')

# ---------- FAQ
h2("10", "Вопросы и ответы", "faq")
FAQ = [("Что подарить маме на День матери недорого?", "До 6 000 ₽ подойдут виброплатформа uFit 2D Standard (4 813 ₽), паровая швабра EcoSteam Pro (5 089 ₽) и аэрогриль AirChef на 5,5 литра (5 380 ₽)."),
       ("Какой полезный подарок маме выбрать, если она много готовит?", "Аэрогриль с двумя чашами AirChef Dual Pro: горячее и гарнир готовятся одновременно, чаши моются в посудомоечной машине."),
       ("Не обидится ли мама на подарок «для хозяйства»?", "Обычно обижаются на вещь, которая добавляет дел. Техника, которая их убирает, воспринимается как забота. Добавьте открытку и объясните, зачем вы выбрали подарок: «чтобы по утрам у тебя было десять минут на кофе»."),
       ("Какая техника подойдёт пожилой маме?", "Та, где меньше настроек: кофемашина CoffeeMaker Classic, лёгкая паровая швабра EcoSteam Pro, аэрогриль с готовыми программами."),
       ("Когда отмечают День матери в 2026 году?", "В России День матери отмечают в последнее воскресенье ноября, в 2026 году это 29 ноября.")]
raw("".join(f'<details style="background:{WHITE};border-radius:18px;padding:18px 22px;margin:0 0 10px;">'
            f'<summary style="font-size:17px;font-weight:600;line-height:1.35;cursor:pointer;">{q}</summary>'
            f'<p style="font-size:15px;line-height:1.6;margin:12px 0 0;color:{MUTED};">{a}</p></details>' for q, a in FAQ))

content = "\n\n".join(B)
post = {"content": content, "featured_media": 5683329,
        "excerpt": "Что подарить маме на День матери 29 ноября: кофемашина, аэрогриль, паровая швабра, виброплатформа. Полезные подарки маме от 4 813 ₽."}
json.dump(post, open(sys.argv[1], "w"), ensure_ascii=False)
print(len(content), "символов;", content.count("—"), "длинных тире")
