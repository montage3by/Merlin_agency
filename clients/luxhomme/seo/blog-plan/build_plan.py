"""План SEO-статей блога luxhomme.store, вт и чт с 24.11.2026 по 28.01.2027. Собирает md и xlsx.
usage: PYLIB=<openpyxl> python3 -I build_plan.py <out_dir>"""
import os
import sys
sys.path.insert(0, os.environ.get("PYLIB", ""))
import openpyxl
from openpyxl.styles import Alignment, Font, PatternFill

OUT = sys.argv[1]

# дата, день, повод, заголовок H1, запросы, товары, внутренние ссылки на статьи блога, основание
P = [
    ("24.11", "Вт", "День матери", "Что подарить маме на День матери: техника, которая бережёт её время",
     "что подарить маме на день матери; подарок маме на день матери; полезный подарок маме",
     "CoffeeMaker Classic, AirChef Dual Pro, EcoSteam Pro, uFit 2D Standard, Cleneo Pro",
     "kakaya-bytovaya-tehnika-dejstvitelno-ekonomit-vremya-doma; ritualy-dlya-zhenshhin-kak-luxhomme-vdohnovlyae",
     "29.11 День матери; в блоге нет ни одной подарочной статьи; промостраницы «Подарки на День матери» стартуют 21–22.11"),
    ("26.11", "Чт", "День матери", "Подарок маме по бюджету: техника до 5 000, 10 000 и 20 000 ₽",
     "подарок маме до 5000; подарок маме до 10000; недорогой подарок маме на день матери",
     "до 5 000: uFit 2D Standard; до 10 000: SC-100 Max, CoffeeMaker Classic, uFit 2D Pro; до 20 000: AirChef Dual Pro, Caffio Professional, Cleneo Pro",
     "kofemashina-4-v-1; aerogril-odna-ili-dve-chashi; kak-vybrat-parovuyu-shvabru",
     "Бюджетные запросы ближе к покупке; ссылка из письма Чёрной пятницы 26.11"),
    ("01.12", "Вт", "Новый год", "Что подарить на Новый год 2027: бытовая техника для дома по бюджету",
     "что подарить на новый год; подарок на новый год технику; полезный подарок на новый год",
     "Вся линейка по ценовым группам",
     "Все подарочные статьи декабря (статья-хаб)",
     "Хаб для всех новогодних статей; спрос на подарки растёт с начала декабря"),
    ("03.12", "Чт", "Товар", "Виброплатформа uFit: как включить, режимы, скорость, музыка и Bluetooth",
     "как включить виброплатформу; виброплатформа режимы; как включить музыку на виброплатформе; как отключить звук; скорость на виброплатформе",
     "uFit 2D Standard, uFit 2D Pro, uFit 3D Max",
     "kak-pravilno-zanimatsya-na-vibroplatforme-novichku-uprazhneniya-i-rekomendatsii; trenirovka-na-vibroplatforme-15-minut",
     "18 запросов Алисы вели на PDF инструкции, 19.11 сайт из ответов пропал; HTML вместо PDF (гипотеза 01)"),
    ("08.12", "Вт", "Новый год", "Что подарить жене на Новый год: техника, которая освобождает время для себя",
     "что подарить жене на новый год; подарок жене на новый год; подарок девушке на новый год",
     "CremaX, Caffio Professional, Cleneo Pro, uFit 3D Max",
     "ritualy-dlya-zhenshhin-kak-luxhomme-vdohnovlyae; vibroplatforma-s-ems-kak-rabotaet",
     "Стратегия ЧП: промостраницы «жене, дочери, маме»"),
    ("10.12", "Чт", "Товар", "Паровые швабры EcoSteam Pro и SC-100 Max: как собрать, насадки, что можно чистить",
     "как пользоваться паровой шваброй luxhomme; как собрать паровую швабру; насадка для окон паровая швабра; паровая швабра как чистить ковёр",
     "EcoSteam Pro, SC-100 Max, AirSteam Pro",
     "parovaya-shvabra-chto-mozhno-chistit; uhod-za-parovoy-shvabroy; mozhno-li-myt-laminat-parovoj-shvabroj-i-kak-delat-eto-pravilno",
     "8 запросов Алисы по швабрам вели на PDF «Safety instructions» и «Многофункциональная»"),
    ("15.12", "Вт", "Новый год", "Подарок кофеману на Новый год: какую кофемашину выбрать",
     "подарок кофеману; какую кофемашину подарить; кофемашина в подарок",
     "CoffeeMaker Classic, Caffio Professional, CremaX",
     "kapsulnaya-ili-zernovaya-kofemashina-chto-luchshe-dlya-doma; kakuyu-kofemashinu-vybrat-dlya-kapuchino-i-latte-doma",
     "В блоге 10 статей про кофе, но ни одной подарочной"),
    ("17.12", "Чт", "Новый год", "Новогоднее меню в аэрогриле: 7 блюд к праздничному столу",
     "новогоднее меню в аэрогриле; что приготовить в аэрогриле на новый год; горячее в аэрогриле",
     "AirChef Dual Pro (два блюда одновременно), AirChef 5,5 л",
     "chto-prigotovit-v-aerogrile; aerogril-odna-ili-dve-chashi",
     "Сезонный рецептный спрос; товар показан в работе"),
    ("22.12", "Вт", "Новый год", "Уборка перед Новым годом за один день: кухня, ванная и полы паром",
     "уборка перед новым годом; генеральная уборка перед новым годом; уборка паром",
     "EcoSteam Pro, SC-100 Max, Cleneo Pro",
     "plan-generalnoy-uborki-kvartiry; uborka-kuhni-parom; ochistka-mezhplitochnyh-shvov-parom",
     "Сезонный спрос; не дублирует «План генеральной уборки», а ссылается на него"),
    ("24.12", "Чт", "Новый год", "Подарки до 10 000 ₽ в последний момент: что успеть заказать до праздника",
     "подарок на новый год до 10000; что подарить родителям на новый год; подарок коллеге",
     "SC-100 Max, CoffeeMaker Classic, uFit 2D Pro, EcoSteam Pro",
     "Статья-хаб 01.12",
     "Последний поток подарочного спроса; срок доставки до 31.12 уточнить у клиента"),
    ("29.12", "Вт", "После праздника", "Как убрать после праздника: пятна от вина, воска и жира на диване, ковре и полу",
     "как вывести пятно от вина с дивана; как убрать воск с ковра; чем почистить диван дома",
     "Cleneo Pro, EcoSteam Pro, SC-100 Max",
     "moyushhie-pylesosy-dlya-mebeli-kak-vybrat-i-pravilno-ispolzovat; parovaya-shvabra-chto-mozhno-chistit",
     "Сезонный спрос 30.12–05.01"),
    ("31.12", "Чт", "Каникулы", "Новогодние каникулы без лишних килограммов: 10 дней тренировок на виброплатформе",
     "как не набрать вес в новогодние праздники; тренировки дома на каникулах; виброплатформа для похудения",
     "uFit 2D, uFit 3D Max",
     "pervye-trenirovki-na-vibroplatforme-doma; trenirovka-na-vibroplatforme-15-minut",
     "Публикация отложенная (автопубликация)"),
    ("05.01", "Вт", "Подарили технику", "Подарили аэрогриль Luxhommè AirChef: первые шаги и 10 простых блюд",
     "как пользоваться аэрогрилем luxhomme; как включить аэрогриль luxhomme; правила использования аэрогриля luxhomme 5.5l",
     "AirChef 5,5 л, AirChef Dual Pro",
     "kak-razogrevat-edu-v-aerogrile; kak-uhazhivat-za-aerogrilem",
     "Запросы Алисы про аэрогриль; FAQ: к телефону AirChef не подключается"),
    ("07.01", "Чт", "Подарили технику", "Кофемашина CoffeeMaker Classic 4 в 1: первый запуск, капсулы, капучино и уход",
     "как работает кофемашина luxhomme; как приготовить капучино в кофемашине luxhomme coffeemaker classic 4 в 1; заклинило кофемашину",
     "CoffeeMaker Classic",
     "kak-prigotovit-kapuchino-doma; uhod-za-kapsulnoy-kofemashinoy; kofemashina-4-v-1",
     "Запросы Алисы про кофемашину; PDF кофемашины 870 показов"),
    ("12.01", "Вт", "Товар", "Компактный моющий пылесос Cleneo Pro: как пользоваться, ошибки, уход",
     "компактный моющий пылесос; моющий пылесос компактный; luxhomme моющий пылесос",
     "Cleneo Pro",
     "vertikalnyj-moyushhij-i-kompaktnyj-pylesos-v-chyom-raznitsa-i-kak-vybrat; moyushhie-pylesosy-dlya-mebeli-kak-vybrat-i-pravilno-ispolzovat",
     "«компактный моющий пылесос»: 100 показов, позиция 6,98, 0 кликов; по пылесосам 0 запросов в Алисе"),
    ("14.01", "Чт", "Товар", "Вертикальный пылесос Aerlyn: уборка шерсти питомцев, насадки, уход",
     "вертикальный пылесос для шерсти; пылесос aerlyn; пылесос luxhomme",
     "Aerlyn",
     "vertikalnyy-pylesos-dlya-doma-s-zhivotnymi; kakoj-pylesos-luchshe-vybrat-dlya-doma-s-zhivotnymi",
     "По пылесосам 0 запросов в Алисе; Алиса путает названия моделей"),
    ("19.01", "Вт", "Сравнение", "EcoSteam Pro, SC-100 Max или AirSteam Pro: какую паровую швабру Luxhommè выбрать",
     "какую паровую швабру выбрать; паровая швабра luxhomme sc-100 max; швабра паровая с насадками",
     "EcoSteam Pro, SC-100 Max, AirSteam Pro",
     "luchshie-parovye-shvabry-dlya-doma-rejting-modelej-luxhomm; kak-vybrat-parovuyu-shvabru",
     "«швабра паровая с насадками» позиция 9,79; «паровая швабра luxhomme sc-100 max» позиция 6,49, 0 кликов"),
    ("21.01", "Чт", "Товар", "Рожковая кофемашина Caffio Professional: эспрессо и капучино дома шаг за шагом",
     "как пользоваться рожковой кофемашиной; caffio professional; рожковая кофемашина для дома",
     "Caffio Professional",
     "espresso-lungo-americano-otlichiya; kak-prigotovit-kapuchino-doma",
     "Карточка под конкретную модель уже даёт клики"),
    ("26.01", "Вт", "Товар", "Робот-мойщик окон uClean Max: как пользоваться и мыть окна зимой",
     "робот мойщик окон как пользоваться; робот-стеклоочиститель luxhomme uclean max",
     "uClean Max, салфетки для uClean Max",
     "plan-generalnoy-uborki-kvartiry",
     "Запрос Алисы по uClean Max (4-е место из 9)"),
    ("28.01", "Чт", "Сравнение", "Cleneo Pro или Orvelon: какой моющий пылесос выбрать",
     "orvelon моющий пылесос; cleneo pro или orvelon; моющий пылесос для дома",
     "Cleneo Pro",
     "moyushhij-ili-obychnyj-vertikalnyj-pylesos-chto-luchshe-vybrat",
     "«orvelon моющий пылесос»: 68 показов, позиция 8,44, 0 кликов"),
]

H = ["Дата", "День", "Повод", "Заголовок (H1)", "Основные запросы", "Товары в статье", "Ссылки на статьи блога (/blog/…)", "Почему эта тема"]

# xlsx
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "План публикаций"
ws.append(H)
for r in P:
    ws.append(list(r))
fill = PatternFill("solid", fgColor="DDD7C1")
for c in ws[1]:
    c.font = Font(bold=True)
    c.fill = fill
seas = {"День матери": "F3E3D8", "Новый год": "E6EBD9"}
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical="top")
    col = seas.get(row[2].value)
    if col:
        for c in row[:3]:
            c.fill = PatternFill("solid", fgColor=col)
for col, w in zip("ABCDEFGH", (8, 6, 16, 48, 48, 36, 44, 44)):
    ws.column_dimensions[col].width = w
ws.freeze_panes = "A2"
wb.save(os.path.join(OUT, "Luxhomme_plan-statej-blog_2026-11.xlsx"))

# md-таблица
lines = ["| Дата | Повод | Заголовок (H1) | Товары |", "|---|---|---|---|"]
for d, day, why, h1, q, prod, links, base in P:
    lines.append(f"| {d} {day} | {why} | {h1} | {prod} |")
open(os.path.join(OUT, "_table.md"), "w").write("\n".join(lines) + "\n")
print(len(P))
