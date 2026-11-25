"""Две кампании Директа на сайт luxhomme.store (25.11.2026), создаются ЧЕРНОВИКАМИ: объявления не отправляются
на модерацию, кампании не запускаются, деньги не тратятся.
  1) «ЕПК | Сайт | Бренд широкие | Luxhommè» — широкие брендовые запросы по бренду и товарам, только поиск.
  2) «ЕПК | Сайт | Товарная фид | ЧП BLACK20» — товарные объявления по фиду 4127969 (сайт, 14 товаров).
usage: python3 -I create_bf_campaigns_2026_11.py [--check]   (--check — только проверить тексты, ничего не создавать)
Токен Директа подставляет прокси окружения."""
import json, sys, urllib.request

COUNTER = 103914820
FEED_ID = 4127969
SITELINKS = 1526275583                       # набор из «ЕПК БРЕНД - Черная пятница [BLACK20]», прошёл модерацию
CALLOUTS = [45316992, 45316999, 45317001]    # «Официальный магазин», «Скидка 20% на весь заказ», «Промокод BLACK20»
RUSSIA = [225]
M = 1_000_000                                 # деньги в API в микроединицах
# цели как в «ЕПК БРЕНД - Черная пятница [BLACK20]»; 579826240 передаёт доход заказа — считаем её покупкой
GOALS_BRAND = [(579826240, 2000), (577003156, 300), (577003030, 2000), (570909880, 1500)]
BRAND_BUDGET, FEED_BUDGET, FEED_CPA = 9_000, 30_000, 2_000   # ₽ на 25–30.11 (1 500 и 5 000 в день по плану ЧП); плата за покупку
PERIOD = {"StartDate": "2026-11-25", "EndDate": "2026-11-30", "AutoContinue": "NO"}

TITLE2 = "Промокод BLACK20 до 30.11"
GROUPS = [  # имя, ссылка, ключи (широкое соответствие), объявления [(заголовок, текст)]
    ("Бренд", "https://luxhomme.store/catalog",
     ["luxhomme", "luxhommè", "люксхом", "люксхомм", "люксхомме", "люкс хомме", "lux homme", "luxhomme официальный сайт",
      "luxhomme интернет магазин", "luxhomme каталог", "luxhomme купить", "luxhomme бытовая техника", "luxhomme промокод",
      "luxhomme черная пятница", "luxhomme скидки", "люксхом официальный сайт", "люксхомме сайт", "люксхом техника"],
     [("Luxhommè: официальный магазин техники", "Чёрная пятница: −20% на всю технику по промокоду BLACK20 до 30.11."),
      ("Техника Luxhommè со скидкой 20%", "Кофемашины, аэрогрили, пылесосы и паровые швабры. Промокод BLACK20 до 30.11.")]),
    ("Паровые швабры", "https://luxhomme.store/catalog/parovye-shvabry",
     ["luxhomme паровая швабра", "luxhomme швабра", "luxhomme пароочиститель", "люксхом паровая швабра", "люксхомме швабра",
      "luxhomme ecosteam pro", "ecosteam pro швабра", "luxhomme sc 100 max", "sc 100 max паровая швабра"],
     [("Паровые швабры Luxhommè со скидкой 20%", "EcoSteam Pro и SC-100 Max моют пол паром без химии. −20% по BLACK20 до 30.11.")]),
    ("Моющие пылесосы", "https://luxhomme.store/catalog/moyushchie-pylesosy",
     ["luxhomme моющий пылесос", "luxhomme пылесос", "люксхом пылесос", "люксхомме пылесос", "luxhomme cleneo pro",
      "cleneo pro пылесос", "luxhomme aqvion pro", "aqvion pro пылесос"],
     [("Моющие пылесосы Luxhommè: скидка 20%", "Cleneo Pro и Aqvion Pro для пола, ковров и мебели. −20% по BLACK20 до 30.11.")]),
    ("Aerlyn", "https://luxhomme.store/products/vertikalnyj-suhoj-pylesos-aerlyn",
     ["luxhomme aerlyn", "aerlyn пылесос", "luxhomme вертикальный пылесос", "luxhomme беспроводной пылесос"],
     [("Пылесос Luxhommè Aerlyn со скидкой 20%", "Беспроводной вертикальный, сухая и влажная уборка. −20% по BLACK20 до 30.11.")]),
    ("Кофемашины", "https://luxhomme.store/catalog/kofemashiny",
     ["luxhomme кофемашина", "luxhomme кофеварка", "люксхом кофемашина", "люксхомме кофемашина", "luxhomme coffeemaker classic",
      "luxhomme caffio professional", "caffio professional кофемашина", "luxhomme cremax", "cremax кофемашина luxhomme"],
     [("Кофемашины Luxhommè со скидкой 20%", "CoffeeMaker Classic, Caffio Professional и CremaX. −20% по BLACK20 до 30.11.")]),
    ("Аэрогрили", "https://luxhomme.store/catalog/aerogrili",
     ["luxhomme аэрогриль", "люксхом аэрогриль", "люксхомме аэрогриль", "luxhomme airchef", "airchef dual pro",
      "airchef аэрогриль luxhomme", "luxhomme аэрофритюрница"],
     [("Аэрогрили Luxhommè AirChef: скидка 20%", "AirChef 5,5 л и Dual Pro с двумя чашами. −20% по промокоду BLACK20 до 30.11.")]),
    ("Виброплатформы", "https://luxhomme.store/catalog",
     ["luxhomme виброплатформа", "люксхом виброплатформа", "люксхомме виброплатформа", "luxhomme ufit", "ufit виброплатформа",
      "ufit 2d", "ufit 3d max"],
     [("Виброплатформы Luxhommè uFit: скидка 20%", "uFit 2D и 3D Max для тренировок дома. −20% по промокоду BLACK20 до 30.11.")]),
    ("Робот-мойщик окон", "https://luxhomme.store/products/window",
     ["luxhomme робот мойщик окон", "люксхом мойщик окон", "люксхомме робот мойщик", "luxhomme uclean max", "uclean max робот"],
     [("Робот-мойщик окон Luxhommè uClean Max", "Моет окна сам, по командам с пульта или из приложения. −20% по BLACK20 до 30.11.")]),
]
EXTRA_NEG = ["вакансии", "работа", "резюме", "ремонт", "сервисный центр", "запчасти", "бу", "авито"]
FEED_TEXT = "Чёрная пятница: −20% на всю технику по промокоду BLACK20 до 30.11."


def check():
    bad = []
    for name, href, kws, ads in GROUPS:
        for t, x in ads:
            if len(t) > 56: bad.append((name, "заголовок", len(t), t))
            if len(x) > 81: bad.append((name, "текст", len(x), x))
            if any(len(w) > 23 for w in (t + " " + x).split()): bad.append((name, "слово > 23", t, x))
    if len(TITLE2) > 30: bad.append(("Title2", len(TITLE2)))
    if len(FEED_TEXT) > 81: bad.append(("FEED_TEXT", len(FEED_TEXT)))
    return bad


def api(path, method, params):
    req = urllib.request.Request("https://api.direct.yandex.com/json/" + path,
                                 data=json.dumps({"method": method, "params": params}).encode(),
                                 headers={"Authorization": "Bearer proxy-injected", "Accept-Language": "ru"})
    r = json.load(urllib.request.urlopen(req, timeout=120))
    if "error" in r: raise SystemExit(f"{path}.{method}: {json.dumps(r['error'], ensure_ascii=False)}")
    return r["result"]


def ids(res, key="AddResults"):
    out = []
    for x in res[key]:
        if x.get("Errors"): raise SystemExit(json.dumps(x, ensure_ascii=False))
        out.append(x["Id"])
    return out


if __name__ == "__main__":
    problems = check()
    if problems: raise SystemExit(f"тексты не проходят лимиты: {problems}")
    if "--check" in sys.argv: print("тексты в лимитах"); raise SystemExit

    neg = api("v501/campaigns", "get", {"SelectionCriteria": {"Ids": [713806605]}, "FieldNames": ["NegativeKeywords"]})
    neg = neg["Campaigns"][0]["NegativeKeywords"]["Items"] + EXTRA_NEG
    neg = sorted(set(neg))

    # 1. брендовая
    brand = ids(api("v501/campaigns", "add", {"Campaigns": [{
        "Name": "ЕПК | Сайт | Бренд широкие | Luxhommè", "StartDate": "2026-11-25",
        "NegativeKeywords": {"Items": neg},
        "UnifiedCampaign": {
            "BiddingStrategy": {
                "Search": {"BiddingStrategyType": "AVERAGE_CPA_MULTIPLE_GOALS",
                           "AverageCpaMultipleGoals": {"CustomPeriodBudget": {"SpendLimit": BRAND_BUDGET * M, **PERIOD}}},
                "Network": {"BiddingStrategyType": "SERVING_OFF"}},
            "CounterIds": {"Items": [COUNTER]},
            "PriorityGoals": {"Items": [{"GoalId": g, "Value": v * M} for g, v in GOALS_BRAND]},
            "TrackingParams": "utm_source=yandex&utm_medium=cpc&utm_campaign=lux_brand_{campaign_id}&utm_content={ad_id}_{source_type}&utm_term={keyword}",
        }}]}))[0]
    print("бренд: кампания", brand)
    for name, href, kws, ads in GROUPS:
        gid = ids(api("v501/adgroups", "add", {"AdGroups": [{"Name": name, "CampaignId": brand, "RegionIds": RUSSIA,
                                                             "UnifiedAdGroup": {"OfferRetargeting": "NO"}}]}))[0]
        ids(api("v5/keywords", "add", {"Keywords": [{"AdGroupId": gid, "Keyword": k} for k in kws]}))
        ad_ids = ids(api("v5/ads", "add", {"Ads": [{"AdGroupId": gid, "TextAd": {
            "Title": t, "Title2": TITLE2, "Text": x, "Href": href, "Mobile": "NO",
            "SitelinkSetId": SITELINKS, "AdExtensionIds": CALLOUTS}} for t, x in ads]}))
        print(f"  группа {name}: {gid}, ключей {len(kws)}, объявлений {len(ad_ids)}")

    # 2. товарная по фиду, оплата только за покупку
    feed = ids(api("v501/campaigns", "add", {"Campaigns": [{
        "Name": "ЕПК | Сайт | Товарная фид | ЧП BLACK20", "StartDate": "2026-11-25",
        "NegativeKeywords": {"Items": sorted(set(EXTRA_NEG + ["инструкция", "отзывы", "запчасти", "насадки"]))},
        "UnifiedCampaign": {
            "BiddingStrategy": {
                "Search": {"BiddingStrategyType": "PAY_FOR_CONVERSION",
                           "PayForConversion": {"Cpa": FEED_CPA * M, "GoalId": 579826240,
                                                "CustomPeriodBudget": {"SpendLimit": FEED_BUDGET * M, **PERIOD}}},
                "Network": {"BiddingStrategyType": "PAY_FOR_CONVERSION",
                            "PayForConversion": {"Cpa": FEED_CPA * M, "GoalId": 579826240,
                                                 "CustomPeriodBudget": {"SpendLimit": FEED_BUDGET * M, **PERIOD}}}},
            "CounterIds": {"Items": [COUNTER]},
            "TrackingParams": "utm_source=yandex&utm_medium=cpc&utm_campaign=lux_feed_bf_{campaign_id}&utm_content={ad_id}_{source_type}&utm_term={keyword}",
        }}]}))[0]
    print("товарная: кампания", feed)
    fg = ids(api("v501/adgroups", "add", {"AdGroups": [{"Name": "Все товары сайта (фид)", "CampaignId": feed, "RegionIds": RUSSIA,
                                                        "UnifiedAdGroup": {"OfferRetargeting": "YES"}}]}))[0]
    fa = ids(api("v501/ads", "add", {"Ads": [{"AdGroupId": fg, "ShoppingAd": {
        "FeedId": FEED_ID, "GenerationScopes": ["OFFER"], "TitleSources": ["name"], "TextSources": ["sales_notes"],
        "DefaultTexts": [FEED_TEXT], "SitelinkSetId": SITELINKS, "AdExtensionIds": CALLOUTS}}]}))
    print(f"  группа {fg}, товарное объявление {fa}")
