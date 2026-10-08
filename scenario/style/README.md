# Визуальный стиль «Горгасали»: ресерч референсов

**Задача:** реализм и фотореализм, стилизованные под CG-синематики **«Ведьмака»**, серии **«Тайная война»** (*Love, Death & Robots*) и **Assassin's Creed**.

**Главная находка:** почти все эти синематики сделаны **двумя студиями**, и на них стоит ориентироваться:

| Студия | Город | Что из наших референсов |
|---|---|---|
| **Digic Pictures** | Будапешт | «Тайная война» (LD+R), **The Witcher 3 — «A Night to Remember»** (launch-синематик), Gwent, **почти все синематики Assassin's Creed** (II, Brotherhood, Revelations, III, Black Flag, Unity, Syndicate, Origins, Valhalla, Dawn of Ragnarök, Mirage, Shadows), **The Blood of Dawnwalker**, Lords of the Fallen, Castlevania: LoS 2, Elden Ring |
| **Platige Image** | Варшава | Интро всех трёх игр «Ведьмака», **The Witcher 3 — «Killing Monsters»** (2013) и «The Trail», режиссёр **Томек Багиньский** |

Сейчас «Тайная война», AC и «Ведьмак» снимает фактически одна студия. Если будем заказывать трейлер на стороне, Digic — первый кандидат по стилю.

---

## Что в папках

| Папка | Кадров | Что внутри |
|---|---|---|
| `secret-war/` | 22 + 16 | «Тайная война»: финальные кадры и концепты, подробный разбор в `secret-war/README.md` |
| `witcher/platige_killing-monsters/` | 18 | «Killing Monsters»: кадры, концепты, конь, лица |
| `witcher/digic_a-night-to-remember/` | 9 | «A Night to Remember» + ТВ-ролик |
| `witcher/digic_gwent/` | 5 | Gwent: Геральт, крупные планы, огонь в таверне |
| `assassins-creed/…` | 99 | По частям: II–Revelations, III–Black Flag, Unity–Syndicate, Origins, Valhalla, Dawn of Ragnarök, Mirage, Shadows |
| `dark-fantasy/…` | 42 | The Blood of Dawnwalker, Lords of the Fallen, Castlevania LoS 2, Elden Ring |
| `*/contact_*.jpg` | — | Контактные листы, вся папка на одном изображении |

**Источники кадров:** официальное портфолио [Digic Pictures](https://digicgroup.com/pictures/) (кадры от самой студии), интервью Platige на [The Art of VFX](https://www.artofvfx.com/the-witcher-3-tomek-baginski-director-maciej-jackiewicz-art-director-grzegorz-kukus-cg-supervisor-platige-image/), обложки официальных роликов на YouTube. Картинки © правообладателей, используем как **внутренний мудборд**. В git не коммитятся (`.gitignore`), лежат только локально и в чате.

---

## Разбор: что берём из каждого референса

### 1. «Ведьмак 3» от Platige: «Killing Monsters»
**Ключевой референс для Картли.** Пасмурная, обесцвеченная земля после войны: голые дубы, грязь, туман, бурая трава, низкое серое небо. Палитра почти монохромная, зелёно-серо-охристая, без ярких цветов. Лица грязные и изношенные, всадники — силуэты в дымке.
→ **Для нас:** пепелище Каспи наутро, дороги Картли, общий тон мира.

### 2. «Ведьмак 3» от Digic: «A Night to Remember» и Gwent
**Ночь** — бирюзово-синяя, с лунной водой. **Интерьер** — тёплый, оранжевый: огонь, свечи. Крупные планы лиц с детализацией кожи, шрамов, щетины, кольчуги. Контраст холодной ночи снаружи и тёплого огня внутри.
→ **Для нас:** крупные планы Вахтанга, Артаваза, ночные сцены.

### 3. «Тайная война»
**Один тёплый источник в холодной тьме**: файер, костёр, выстрел. Туман, метель, искры. Длинный фокус, малая глубина резкости. Фактуры меха, ваты, обветренной кожи.
→ **Для нас:** ночь набега (часть 1 трейлера), марш войска в тумане (часть 3).

### 4. Assassin's Creed
- **Историческая достоверность костюма и среды**: ткани, доспехи, город, толпы. Мир не фэнтезийный, а реконструированный.
- **Эпичные общие планы на «золотом часе»**: Unity, Origins, Mirage. Герой на высоте над городом, птица над миром.
- **Revelations (2011): горы, снег, метель, войско в мехах в ущелье.** Ближайший к нашему Дарьялу кадр из всех.
- **Valhalla**: мех, косы, раскраска лица, грубый металл. Сцены огня в Dawn of Ragnarök пересвечены красным.
- **AC III**: поле пшеницы, контровой свет, бой в высокой траве.
→ **Для нас:** костюмы V века, массовка войска, общие планы гор на рассвете.

### 5. Тёмное фэнтези (The Blood of Dawnwalker, Lords of the Fallen)
Dawnwalker делают выходцы из CD Projekt RED, и по духу это ближе всего к «Ведьмаку»: средневековье, вампиры, ночь, лунный свет. Lords of the Fallen показывает **красную или синюю магию** как единственный цветной акцент в тёмном кадре.
→ **Для нас:** будущие сцены с деви, каджами и магией. В этом трейлере мистики нет, поэтому пока не используем.

---

## Формула стиля «Горгасали»

> **Историческая достоверность Assassin's Creed + мрачная «славянская» земля Platige-«Ведьмака» + свет «Тайной войны» (один тёплый источник в холодной тьме) + фактуры и крупные планы Digic.**

| Часть трейлера | Палитра | Главные референсы |
|---|---|---|
| **1. Ночь набега** (Каспи в огне) | красно-оранжевый огонь против чёрного, искры, дым | Secret War (файер, выстрелы), AC Valhalla: Ragnarök (огонь), Gwent (огонь на лицах) |
| **2. Переход через глаз** | огонь → холодный серо-голубой | Secret War: от красного к синему |
| **3. Дарьял на рассвете** | холодный туман, камень, сталь, один тёплый луч | AC Revelations (горы, снег, войско), Platige Killing Monsters (туман, всадники), Secret War (марш в снегу) |
| **Крупные планы** | малая глубина резкости, фактура кожи | Digic: Night to Remember, Gwent, AC Mirage |

### Чего избегать
- **Пересвеченной фэнтези-магии** (красное «всё в огне» Ragnarök и Lords of the Fallen). Это хорошо в малых дозах, но не как основной тон.
- «Пластиковых» чистых лиц и одежды. Нужны грязь, износ, пот, сажа.
- Голливудской «эпичности» без героя в кадре: у Digic почти каждый общий план держится на фигуре.

---

## Пробелы: что ещё нужно для Кавказа V века

В референсах нет **нашего места и нашей эпохи**. Нужен отдельный ресерч:
1. **Дарьял и Казбеги:** реальные фотографии ущелья, Терека, скал на рассвете и в тумане.
2. **Доспех и костюм Картли V века:** сасанидский пластинчатый доспех, шлемы-спангенхельмы, кольчуги, плащи. **Не чоха**: она появилась намного позже.
3. **Аланы и гунны V века:** конница, луки, бунчуки, деформированные черепа у гуннов.
4. **Архитектура:** раннехристианские базилики Картли (Болниси, V век), Мцхета, Уджарма, каменные стены.
5. **Горцы:** пшавы, хевсуры (позднейшая одежда с крестами для V века тоже анахронизм, но как стилизация возможна).

---

## Словарь для промптов (Nano Banana)

**Общий стиль:**
`photorealistic AAA game CG cinematic, in the style of Digic Pictures and Platige Image cinematics (The Witcher 3, Assassin's Creed, Love Death + Robots "The Secret War"), anamorphic 2.39:1, shallow depth of field, subtle film grain, soft halation`

**Свет:**
`single warm light source in cold blue-teal darkness` · `overcast desaturated muted palette, grey-green and ochre` · `cold misty dawn, god rays through fog` · `firelight rim light, embers and sparks`

**Среда:**
`volumetric fog, drifting snow and ash, war-torn landscape, bare oak trees, mud`

**Фактуры:**
`weathered skin with pores, scars and stubble, soot and sweat, worn chainmail and leather, fur and wool, historically accurate 5th-century Caucasian (Iberian) costume`

---

## Источники
- [Digic Pictures — портфолио](https://digicgroup.com/pictures/)
- [Digic: The Witcher 3 — Launch Cinematic](https://digicgroup.com/pictures/works/603e77f6dfa4660017674073/), [The Blood of Dawnwalker — Cinematic Trailer](https://digicgroup.com/pictures/works/6789054572d4940014db8583/), [AC Revelations](https://digicgroup.com/pictures/works/603e9242963f19001708f7d3/), [AC Valhalla: Dawn of Ragnarök](https://digicgroup.com/pictures/works/648812d5c14c3a001448b0b0/)
- [The Art of VFX — интервью Platige о Witcher 3](https://www.artofvfx.com/the-witcher-3-tomek-baginski-director-maciej-jackiewicz-art-director-grzegorz-kukus-cg-supervisor-platige-image/)
- [CG Channel — Platige Image's new Witcher 3 trailer](https://www.cgchannel.com/2013/08/eye-candy-platige-images-new-witcher-3-trailer/)
- [3DVF — «A Night to Remember» (Digic)](https://3dvf.com/actualite-13233-cinematique-the-witcher-iii-a-night-to-remember-html/)
- [Platige Image — The Witcher 3](https://platige.com/project/the-witcher-3/)
- [Witcher Wiki — A Night to Remember](https://witcher-games.fandom.com/wiki/A_Night_to_Remember)
