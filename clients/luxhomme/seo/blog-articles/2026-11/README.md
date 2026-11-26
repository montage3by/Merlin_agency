# Статьи блога: первые 4 по плану (черновики 23.11.2026)

Google Drive, папка «Luxhommè: статьи блога (ДМ и НГ 2026)»: https://drive.google.com/drive/folders/1NneuMuEeBm3QTqUfU32DF6OSL6IIzWKS

| Дата | Статья | Google Doc | Исходник |
|---|---|---|---|
| 24.11 | Что подарить маме на День матери | https://docs.google.com/document/d/1hbyqXiZG6kttWDUQNBn6Dguh528_YPELMkHxZZ1DKTk/edit | `01_chto-podarit-mame-na-den-materi.html` |
| 26.11 | Подарок маме по бюджету | https://docs.google.com/document/d/12aD2ITlCi7qmockvixY1kaspJC9-lhNkoM_qOfK2320/edit | `02_podarok-mame-po-byudzhetu.html` |
| 01.12 | Что подарить на Новый год: техника по бюджету | https://docs.google.com/document/d/1YNZEmC0Sfo1z7Ky-nZ2XNON5-TW68HydKDpYxMxAdeM/edit | `03_chto-podarit-na-novyj-god-tehnika.html` |
| 03.12 | Виброплатформа uFit: как включить, режимы, скорость, музыка | https://docs.google.com/document/d/1hfbhdk5IJcazo_fvL41YLib-SUCk92yMTXcxgKqWDtQ/edit | `04_vibroplatforma-ufit-kak-vklyuchit-rezhimy.html` |

Факты о товарах: карточки luxhomme.store и PDF-инструкции на 23.11. Цены на 23.11 (Чёрная пятница), перед публикацией сверить.
Расхождение: на карточке AirChef 5,5 л указано «Wi-Fi, управление с телефона», а клиент говорил, что к телефону не подключается. В статьях функция не упоминается, уточнить у клиента.

## Вёрстка в WordPress (26.11)

| Статья | Черновик WP | Сборка | Превью |
|---|---|---|---|
| Подарок маме по бюджету: до 5 000, 10 000 и 20 000 ₽ (`/blog/podarok-mame-po-byudzhetu`) | 5683486: https://luxhomme.store/wp-admin/post.php?post=5683486&action=edit | `wp/build_post_02.py` | `wp/preview_02_*.jpg` |
| Что подарить на Новый год 2027: техника по бюджету (`/blog/chto-podarit-na-novyj-god-tehnika-dlya-doma`) | 5683487: https://luxhomme.store/wp-admin/post.php?post=5683487&action=edit | `wp/build_post_03.py` | `wp/preview_03_*.jpg` |

- Вёрстка в фирменном стиле, как у статьи ко Дню матери; общие блоки в `wp/lux_blog.py`.
- Цены, наличие и группы по бюджету берутся из каталога в момент сборки. Пересобрать и обновить черновик: `python3 -I wp/build_post_0X.py --draft` (публикации нет, только черновик). Статью на 01.12 пересобрать утром 01.12: после Чёрной пятницы цены и группы изменятся.
- В подборки попадают только товары в наличии: AirSteam Pro на 26.11 нет. Добавлен Aqvion Pro (в черновиках 23.11 его не было).
- Виброплатформа 3D названа как на сайте («Виброплатформа 3D с EMS и нагревом»), не uFit 3D Max (открытый вопрос 9).
- Статья 02: блок Чёрной пятницы с BLACK20, как в статье ко Дню матери (условия промокода клиент не подтверждал, открытый вопрос 15).
- Статья 03: обложка временная (аэрогриль на кухне), новогодней картинки в медиатеке нет. Ссылка на статью 02 заработает, когда 02 опубликуют.
- Предпросмотр WordPress здесь не работает (адреса с ?preview=true открывает витрина), поэтому превью сняты с витрины: опубликованная статья ДМ с подменённым текстом. Дата в шапке и блок «Товары из статьи» на превью от статьи ДМ, на сайте витрина соберёт их сама.
