Продолжаем проект Luxhomme (агентство Merlin, клиент Luxhommè — бытовая техника; Ozon, WB, ЯМ, сайт luxhomme.store).

1. Контекст. Подключи репозиторий montage3by/Merlin_agency, ветка claude/funny-ride-astdyr. Всё по проекту лежит в clients/luxhomme/. Прочитай clients/luxhomme/CLAUDE.md — там правила и оглавление; скилл проекта — .claude/skills/luxhomme. Правила: язык русский; цифры только из данных клиента, ничего не придумывать; суммы перепроверять; ЯД (Директ) и ЯМ (медийка Маркета) не смешивать; таблицы без лишних комментариев.

2. Что уже сделано (всё в clients/luxhomme/):
- медийка Ozon, план ЯД на сентябрь — data/2026-09.md
- каналы MAX для посевов — research/max-kanaly-posevy-2026-10.xlsx
- SEO-аудит — seo/seo-audit-2026-10.md; UI/UX-аудит — ux/ (PDF + скриншоты)
- Яндекс Директ на 15 товаров — direct/ (Excel, YML-фид, тексты в direct/scripts/content.py; промокод-заглушка DIRECT20, 20%)
- письмо для Битрикс24 «Закрытая распродажа −15% до 30.10.2026» — email/2026-10-closed-sale/ (README с темами письма; заголовок «Секретная скидка»; промокод-заглушка CLOSED15)

3. Доступ к сайту. Сайт: WordPress + WooCommerce (админка), витрина на Next.js. В окружении должны быть переменные LUXHOMME_WP_USER (claude-merlin1), LUXHOMME_WP_APP_PASSWORD, LUXHOMME_WC_KEY, LUXHOMME_WC_SECRET. Проверь, что они есть (значения не выводи), и проверь доступ только чтением: GET /wp-json/wp/v2/users/me (пароль приложения), GET /wp-json/wc/v3/products?per_page=5 и /wp-json/wc/v3/coupons (ключи WooCommerce). Ничего на сайте не меняй без моего подтверждения.

4. Плагины. Проверь, подключились ли SEO-плагины SEO-AEO-GEO Ultimate, JSON SEO, wordpress-mcp.

5. Следующие задачи после проверки доступа:
- загрузить картинки письма (email/2026-10-closed-sale/images/) в медиатеку WordPress и пересобрать письмо с публичными ссылками (build_email.py, последний аргумент — базовый URL);
- завести в WooCommerce промокод на 15% на всю технику до 30.10.2026 (код скажу) и подставить его в письмо;
- обновить цены в Директе: с 12.10 CremaX 23 200 ₽ (было 47 990), Caffio Professional 16 990 ₽ (было 17 990), AirSteam Pro нет в наличии;
- решить вопрос с публичностью репозитория (Merlin_agency публичный, в нём материалы клиента).
