"""Статья-хаб «Что подарить на Новый год 2027» (план: 01.12.2026). Цены и группы по бюджету берутся из каталога при сборке:
утром 01.12 (после окончания Чёрной пятницы) пересобрать с --draft, чтобы цены обновились.
usage: python3 -I build_post_03.py [--draft]"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lux_blog import Doc, P, S, MUTED, DIES, catalog, rub, link, save_draft, check

HERE = os.path.dirname(os.path.abspath(__file__))
TITLE = "Что подарить на Новый год 2027: техника по бюджету"
SLUG = "chto-podarit-na-novyj-god-tehnika-dlya-doma"
COVER = 5676456  # aerogril-airchef-dual-pro-kuhnya.webp, временно: новогодней обложки в медиатеке нет

cat = catalog()
ok = lambda s: s in cat and cat[s][1]
price = lambda s: cat[s][0]
items = sorted(((price(s), s) for s in P if ok(s)), key=lambda x: x[0])
cheapest = items[0][0]
B = [("До 6 000 ₽", 0, 6000), ("До 10 000 ₽", 6000, 10000), ("До 20 000 ₽", 10000, 20000), ("Больше 20 000 ₽", 20000, 10 ** 9)]
nm = lambda s: P[s][0]


def cards(slugs, prefix="Тому, кто"):
    for s in slugs:
        if ok(s):
            d.card(s, price(s), prefix)


d = Doc()
d.para("Техника на Новый год кажется практичным, а не праздничным подарком. Но именно её чаще всего потом вспоминают добрым словом: "
       "аэрогриль, который готовит ужин, пока все отдыхают, или кофемашину, с которой начинается каждое утро. "
       "В этой подборке техника Luxhommè по бюджету и по тому, кому вы дарите.",
       "font-size:19px;line-height:1.6;margin-bottom:28px;")
quick = [("Семье на кухню", "airgrill-dual-pro", "kuhnya"), ("Кофеману", "coffee", "kofe"),
         ("Для чистоты дома", "kompaktnyj-moyushhij-pylesos-cleneo-pro", "chistota"), ("Для формы", "ufit-2d", "forma")]
d.summary("Если коротко", f"Полезный подарок на Новый год от {rub(cheapest)}: выберите по тому, чем человек занимается каждый день",
          [(t, nm(s).split(" ", 1)[1] if s != "kompaktnyj-moyushhij-pylesos-cleneo-pro" else "Cleneo Pro", rub(price(s)), a) for t, s, a in quick if ok(s)])
d.toc([("byudzhet", "Подарки по бюджету"), ("kuhnya", "Подарок семье: на кухню"), ("kofe", "Подарок кофеману"),
       ("chistota", "Подарок тем, кто следит за чистотой"), ("forma", "Подарок для здоровья и формы"),
       ("komu", "Жене, маме, родителям"), ("kak-podarit", "Как подарить, чтобы пользовались"),
       ("uspet", "Как успеть к празднику"), ("faq", "Вопросы и ответы")])

d.h2("01", "Подарки на Новый год по бюджету", "byudzhet")
rows = []
for t, lo, hi in B:
    g = [(p, s) for p, s in items if lo < p <= hi]
    if g:
        rows.append([(t, "font-weight:700;white-space:nowrap;"),
                     ("; ".join(f'{link(f"/products/{s}", nm(s))} ({rub(p)})' for p, s in g), "")])
d.table(["Бюджет", "Что подарить"], rows, "Цены указаны по каталогу Luxhommè на момент публикации.")

d.h2("02", "Подарок семье: на кухню", "kuhnya")
d.para("На новогодних каникулах готовят много и часто. Аэрогриль берёт на себя горячее и гарниры: не нужно стоять у плиты, пока все отдыхают.")
cards(["airgrill-dual-pro", "airgrill"], "Тому, кто")
d.note("Ещё по теме", f'Если сомневаетесь, сколько чаш нужно: {link("/blog/aerogril-odna-ili-dve-chashi", "аэрогриль с одной или двумя чашами")}. '
       f'Идеи блюд: {link("/blog/chto-mozhno-gotovit-v-aerogrile-kazhdyj-den-idei-dlya-zavtraka-obeda-i-uzhina", "что готовить в аэрогриле каждый день")}.', bg=DIES)

d.h2("03", "Подарок кофеману", "kofe")
d.para("Три кофемашины Luxhommè закрывают три сценария: быстрый кофе из капсул, капучино с автоматической пенкой и кофе из свежемолотых зёрен.")
cards(["coffee", "caffio-professional", "cremax"])
d.note("Ещё по теме", f'Как выбрать систему: {link("/blog/kapsulnaya-ili-zernovaya-kofemashina-chto-luchshe-dlya-doma", "капсульная или зерновая кофемашина")}, '
       f'{link("/blog/kofemashina-4-v-1", "кофемашина 4 в 1")}.', bg=DIES)

d.h2("04", "Подарок тем, кто следит за чистотой", "chistota")
d.para("После праздничного застолья остаются пятна на диване, ковре и полу. Паровые швабры моют пол паром без моющих средств, моющие пылесосы справляются с ковром и мягкой мебелью.")
cards(["ecosteam-pro", "sc-100", "steamly-pro", "kompaktnyj-moyushhij-pylesos-cleneo-pro", "vertikalnyj-moyushhij-pylesos-aqvion-pro",
       "vertikalnyj-suhoj-pylesos-aerlyn", "window"])
d.note("Ещё по теме", f'{link("/blog/kak-vybrat-parovuyu-shvabru-dlya-kvartiry-i-chastnogo-doma", "Как выбрать паровую швабру")}, '
       f'{link("/blog/vertikalnyj-moyushhij-i-kompaktnyj-pylesos-v-chyom-raznitsa-i-kak-vybrat", "вертикальный, моющий или компактный пылесос")}.', bg=DIES)

d.h2("05", "Подарок для здоровья и формы", "forma")
d.para("После праздников многие хотят вернуться к тренировкам, и виброплатформа помогает заниматься дома без абонемента в зал. "
       "Во всех моделях uFit 5 автоматических программ по 10 минут и 180 скоростей.")
cards(["ufit-2d", "ufit-2d-ems", "vibroplatforma-dlya-pohudeniya-3d-c-ems-tokami-i-nagrevom-do-150-kg"])
d.note("Важно", f'При заболеваниях суставов, сердца, повышенном давлении и других хронических заболеваниях перед занятиями стоит посоветоваться с врачом. '
       f'Чем отличаются модели: {link("/blog/2d-ili-3d-vibroplatforma-raznica", "2D или 3D виброплатформа")}.')

d.h2("06", "Подарок жене, маме, родителям", "komu")
three = [("Жене", f'Подарок, который освобождает время для себя: {link("/products/caffio-professional", "кофемашина Caffio Professional")} для капучино по утрам, '
          f'{link("/products/kompaktnyj-moyushhij-pylesos-cleneo-pro", "моющий пылесос Cleneo Pro")} или виброплатформа для занятий дома.'),
         ("Маме", f'Идеи по увлечениям мамы: {link("/blog/chto-podarit-mame-na-den-materi", "что подарить маме")}. Подборка по сумме: {link("/blog/podarok-mame-po-byudzhetu", "подарок маме по бюджету")}.'),
         ("Родителям", f'Техника с простым управлением: {link("/products/coffee", "кофемашина CoffeeMaker Classic")}, лёгкая '
          f'{link("/products/ecosteam-pro", "паровая швабра EcoSteam Pro")}, аэрогриль с готовыми программами.')]
d.steps(three)

d.h2("07", "Как подарить технику, чтобы ею пользовались", "kak-podarit")
d.steps([("Распакуйте вместе", "Один раз попробуйте вместе: сварите кофе, приготовьте ужин в аэрогриле, помойте пол на кухне."),
         ("Сохраните инструкцию", "Добавьте в телефон ссылку на инструкцию со страницы товара: если что-то забудется, её легко найти."),
         ("Подскажите, куда писать", "Служба заботы Luxhommè отвечает в Telegram и по почте care@luxhomme.store с 9:00 до 21:00 по Москве.")])

d.h2("08", "Как успеть к празднику", "uspet")
d.dark("До Нового года", "", "Закажите подарок заранее",
       "Срок доставки в ваш город видно при оформлении заказа. Если до праздника остаётся мало времени, уточните сроки в службе заботы: "
       "Telegram-бот @LuxhommeServiceBot или care@luxhomme.store, с 9:00 до 21:00 по Москве.",
       "Выбрать подарок →", f"{S}/catalog")

d.resume("Что подарить на Новый год, проще решить, если начать с того, чем человек занимается каждый день. Семье, которая много готовит, "
         "подойдёт аэрогриль с двумя чашами, кофеману кофемашина под его способ варить кофе, тем, кто следит за чистотой, паровая швабра "
         "или моющий пылесос, а тем, кто хочет вернуться к тренировкам после праздников, виброплатформа.")

d.h2("09", "Вопросы и ответы", "faq")
u10 = [(p, s) for p, s in items if p <= 10000]
d.faq([("Какую технику подарить на Новый год семье?", "Ту, которой будут пользоваться все: аэрогриль с двумя чашами, кофемашину или моющий пылесос для дивана и ковров."),
       ("Что подарить на Новый год до 10 000 ₽?", "; ".join(f"{nm(s)} ({rub(p)})" for p, s in u10) + ". Цены по каталогу на момент публикации."),
       ("Можно ли дарить технику на Новый год?", "Да, если она решает понятную задачу человека: экономит время на кухне, на уборке или помогает заниматься спортом. "
        "Чтобы подарок был личным, добавьте открытку о том, почему вы его выбрали."),
       ("Что подарить родителям, которые не любят сложную технику?", "Технику с минимумом настроек: кофемашину CoffeeMaker Classic, лёгкую паровую швабру EcoSteam Pro или аэрогриль с готовыми программами.")])

content = d.html()
excerpt = (f"Что подарить на Новый год 2027: техника для кухни, уборки и здоровья. Подборка по бюджету и по тому, кому дарите. "
           f"Цены от {rub(cheapest)}.")
check(TITLE, excerpt, content)
json.dump({"title": TITLE, "slug": SLUG, "content": content, "excerpt": excerpt, "featured_media": COVER},
          open(os.path.join(HERE, "post_03.json"), "w"), ensure_ascii=False)
print("по бюджету:", [(r[0][0], r[1][0].count("<a ")) for r in rows])
print(len(content), "символов, description", len(excerpt), "| нет в наличии:", [s for s in P if s in cat and not cat[s][1]])
if "--draft" in sys.argv:
    r = save_draft(os.path.join(HERE, "draft_03.json"), TITLE, SLUG, content, excerpt, COVER)
    print("черновик:", r["id"], r["status"], f"https://luxhomme.store/wp-admin/post.php?post={r['id']}&action=edit")
