# «Горгасали» — покадровый сценарий трейлера

**Хронометраж:** ~58 с · **Кадр:** 2.39:1 · **Без слов** (только логотип) · **Стиль:** фотореализм CG уровня Digic / Platige (см. `style/README.md`) · **Эпоха:** Картли, V век (см. `research/05-kavkaz-5-vek.md`)

**Обозначения:** ОП — общий план, СП — средний, КП — крупный, ДКП — деталь / сверхкрупный. Объективы указаны в эквиваленте full-frame.

**Персонажи (листы в `03-character-prompts.md`):** EAGLE — беркут · V10 — Вахтанг 10 лет · V16 — Вахтанг 16 лет · MIR3 / MIR9 — Мирандухт 3 и 9 лет · ART — Артаваз · BAK — Бакатар · RAID — налётчики (аланы и гунны) · NURSE — рука кормилицы · ARMY — войско Картли.

---

## ПОДГОТОВКА К РАСКАДРОВКЕ

Промпты для Nano Banana стоят прямо под каждым кадром (блоки «Промпт раскадровки»). Реестр референсов и статусы листов: `05-storyboard-prompts.md`.

**Правила:**
- **Порядок вложений:** персонажи → реквизит → локация (подложка). Не больше 3–4 картинок за раз, иначе модель начинает путать лица.
- **Перед загрузкой обрезайте подписи** на листах (Vakhtang's horse, Steppe raiders), иначе текст может просочиться в кадр.
- **Формат 21:9** (или 16:9 с припиской про 2.39:1).

**Стилевая строка** (уже вшита в каждый промпт):
`Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, shallow depth of field, subtle film grain, soft halation. 5th-century Caucasus. No stirrups, no text, no watermark.`

**Исправление для V16** (вставлено во все кадры с ним):
`He is 16 years old: youthful face, smooth skin, sparse stubble. Instead of a solid breastplate he wears a dark lamellar breastplate of small laced steel plates over the mail. On his neck the tiny bronze cross from the attached cross image, not a large cross. A thin scar above the right eyebrow only, no scar on the nose.`

### Подложки локаций (делать первыми, без персонажей)

#### LOC-KASPI
```
Wide establishing matte painting of the ancient fortified town of Kaspi in the 5th-century Kingdom of Iberia (eastern Georgia), at night without moon: a hill above the river Mtkvari, walls of rough uncut stone with square towers, houses of stone and timber with flat earthen roofs and wooden balconies, and above them the silhouette of an early Christian basilica of greenish tuff with a gabled roof. From the dark hills to the north dozens of torches flow down toward the town like a river of fire; an orange smoky glow on the horizon.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Only warm firelight and black. No domed churches, no text, no watermark.
```

#### LOC-KASPI-DUSK (для пролёта орла)
**Вложения:** LOC-KASPI
```
Same town as in the attached image, but at deep dusk just after sunset instead of night: a dark red afterglow on the western horizon, the sky turning to deep blue above, the town and the valley in shadow, a few warm hearth fires in windows. Torches of the raiders flow down from the northern hills toward the walls. Seen from high above, as from a bird's flight.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. No domed churches, no text, no watermark.
```

#### LOC-DARIAL
```
Wide establishing matte painting of the Darial Gorge in the Caucasus at dawn: a narrow canyon of sheer granite walls rising up to 1800 meters, the wild grey-white river Terek roaring over boulders, mist lying over the water, birch and pine clinging to the slopes, snowfields high above. The bottom of the gorge is in deep cold blue shadow; only the highest ridges catch the first pale gold light. A narrow stony track along the river.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (Assassin's Creed Revelations, The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. Cold desaturated palette. No modern road, no buildings, no text, no watermark.
```

#### LOC-CAMP
```
Wide matte painting across a mountain river in the Darial Gorge at dawn: on the far bank, on steep rocky ledges, the war camp of 5th-century Alan steppe warriors — round felt tents and hide shelters, smoke of campfires rising into the mist, tethered horses, horse-tail standards on poles. Sheer granite cliffs above, cold blue shadow, campfires as small warm points.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 1. УЖАС · 0:00–0:25 · закат → ночь, Каспи
*Палитра: кадры 1–3 начинаются в последнем багровом свете заката высоко в горах и спускаются во тьму, где горят только факелы. С кадра 4 — только огонь (оранжево-красный) и чёрное, ни одного холодного цвета.*

> **Кадры 1–3 — один непрерывный пролёт (oner) за орлом.** Камера держится за хвостом беркута и ни разу не режется: горы → колонна алан → Каспи → нырок вниз, на улицу, к повозке, под которой прячется мальчик. Для раскадровки пролёт разбит на три фазы.
>
> **Почему закат, а не ночь:** орлы ночью не летают. Набег начинается в сумерках: наверху, где летит орёл, ещё горит солнце, внизу в долине уже темно и зажжены факелы. Нырок камеры из света во тьму — это и есть вход в «Ужас».

### Кадр 1 · 0:00–0:03 · Орёл
- **Экран открывается сразу на пролёте. Камера летит за орлом, чуть выше и позади него, 35 мм.**
- **Беркут** (золотистый затылок, тёмно-бурые крылья с белёсыми пятнами) парит над хребтами Триалети. Внизу облака, заснеженные гребни, ущелья уже в синей тени. Солнце садится, кромки крыльев горят багровым контровым светом.
- Орёл чуть доворачивает, складывает крылья и **уходит вниз, в долину**. Камера ныряет за ним сквозь облако.
- **Звук:** ветер, шелест перьев, **один клёкот орла**, далёкий и чистый.

#### Промпт раскадровки · 1 · Орёл над хребтами
**Вложения:** нет (этот кадр сам становится референсом EAGLE)
```
Aerial chase shot: the camera flies just behind and slightly above a golden eagle soaring over the Caucasus mountains at sunset. The eagle seen from behind fills the lower third of the frame — golden-brown nape, dark brown wings spread wide, pale patches under the wings, the edges of the feathers glowing crimson in the backlight of the setting sun. Below: a sea of clouds, snowy ridges catching the last red light, deep valleys already sinking into cold blue darkness. Vast scale, wind, solitude. 35mm lens, slight motion blur on the wing tips.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Crimson sunset and deep shadow. No text, no watermark.
```

### Кадр 2 · 0:03–0:06 · Над аланами
- **Камера за орлом, 24 мм, низкий бреющий полёт метрах в десяти над колонной.**
- Под орлом по склону **течёт конница RAID**: сотни всадников, десятки факелов, только что зажжённых, **бунчуки из конских хвостов**, сложные луки, меховые шубы, пластинчатые грушевидные шлемы. **Без стремян.**
- Орёл проходит прямо над головами. **Один всадник-гунн с вытянутым деформированным черепом поднимает лицо** и провожает птицу взглядом. Факельный свет на его лице на долю секунды.
- Впереди, в разрыве колонны, едет **Бакатар (BAK)**: огромный всадник в чешуе, громадный лук за спиной. Только силуэт, без лица. *Зритель узнает его в кадре 5 и в кадре 16.*
- **Звук:** снизу нарастает **гул копыт**, лязг. Поверх вступает **«Зари»**, один женский голос без инструментов.

#### Промпт раскадровки · 2 · Над аланами
**Вложения:** кадр 1 (EAGLE), RAID (без подписи), BAK
```
Low skimming aerial shot following the same golden eagle from the first attached image, now gliding just ten meters above a long column of steppe raiders riding down a dark mountain slope at dusk. The riders are the ones from the attached raider sheet — Alans in mail with axes and Hunnic riders in sheepskin coats — hundreds of them, freshly lit torches, horse-tail standards on poles, composite bows. Their legs hang free, no stirrups. In the foreground one Hunnic rider with an elongated deformed skull lifts his face toward the eagle, torchlight on his face. Further along the column, a giant rider in iron scale armor with a huge bow on his back, from the attached giant sheet, seen only as a dark silhouette. The sky still holds a dark red afterglow; the valley below is dark, lit only by the torches. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. No stirrups, no text, no watermark.
```

### Кадр 3 · 0:06–0:09 · Каспи
- **Орёл обгоняет колонну. Камера поднимается вместе с ним, открывается Каспи, 35 мм → 24 мм.**
- **Каспи на холме над Мтквари** в последних сумерках: стены из рваного камня, плоские кровли, деревянные галереи, над всем **базилика с двускатной крышей**. В нескольких окнах огонь очагов. Город ещё не знает.
- Огненная река факелов **растекается вокруг стен**, первые всадники врываются в ворота.
- Орёл проходит над крышей базилики, и **камера отрывается от него**: орёл уходит дальше вверх, во тьму, а камера **падает вниз, в улицу**, между галерей, сквозь дым, к земле, к деревянной повозке. Последнее, что видно в пролёте: копыта, бьющие грязь у самого объектива.
- **Звук:** на нырке всё обрывается в **частое сдавленное дыхание ребёнка**, очень близко. Склейка в кадр 4.

#### Промпт раскадровки · 3 · Каспи, нырок вниз
**Вложения:** кадр 1 (EAGLE), LOC-KASPI-DUSK
```
High aerial shot over the shoulder of the same golden eagle from the first attached image as it glides over the town from the attached location image at dusk. Below: the fortified hilltop town above the river, rough stone walls, flat roofs, wooden balconies, a few hearth fires in the windows, the gabled roof of the basilica just under the eagle's wings. A river of torches spreads around the walls and the first riders pour through the gate; smoke begins to rise. The eagle banks upward into the darkening sky while the camera tilts down toward a narrow street below. Deep dusk, the last red light on the horizon, warm torchlight below. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. No domed churches, no stirrups, no text, no watermark.
```

**Конец пролёта** (опционально, если монтажу нужен кадр нырка): возьмите старый промпт копыт у земли.
```
Extreme low-angle shot from ground level in a muddy street of the town at dusk: galloping horse hooves smash through the mud right in front of the lens, clods of mud flying toward the camera, motion blur, smoke and embers. Legs of riders hang free — no stirrups. A wooden cart in the background. Hard orange torchlight. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Only torchlight and black. No stirrups, no text, no watermark.
```

### Кадр 4 · 0:09–0:12 · Мальчик прячется
- **КП, 85 мм, малая глубина резкости, лёгкая ручная камера.**
- **V10** лежит под деревянной повозкой, лицо в саже, на нём светлая шерстяная туника. Глаза широко раскрыты. **Ладонью зажимает себе рот.**
- Через щели между досками по лицу бегут **полосы огненного света**. Мимо проносятся ноги лошадей, вне фокуса.

#### Промпт раскадровки · 4 · Мальчик прячется
**Вложения:** V10
```
Close-up of the boy from the attached sheet, exactly as he looks there, lying on his stomach in the mud under a wooden cart at night. Soot on his face, eyes wide with terror, one hand pressed hard over his own mouth. Stripes of orange firelight slide across his face through the gaps between the cart planks; out-of-focus horse legs gallop past in the background. 85mm lens, very shallow depth of field, slight handheld feel.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation. Only warm firelight and deep black. No text, no watermark.
```

### Кадр 5 · 0:12–0:16 · Сестру уводят
- **Субъективная точка зрения V10, 50 мм. На переднем плане расфокус: доски повозки, колесо.**
- По улице проезжает **BAK** (великан-ос, моложе, без шрама) на огромном тёмном коне и держит на сгибе руки **MIR3**: светлая рубашка, **крестик на шнурке**. Сам Бакатар почти целиком силуэт против огня, видны только отблески на чешуйчатом доспехе и бороде; остроконечный башлык и огромный лук за спиной дают узнаваемый силуэт. *Зритель узнает его в кадре 16.* Девочка выкручивается и **тянет руку назад**, прямо в камеру, к брату.
- Рот открыт, но **крика нет**: звук проваливается, остаётся высокий гул в ушах.
- **Свет:** за ней горит дом, она в контровом огненном свете.

#### Промпт раскадровки · 5 · Сестру уводят
**Вложения:** BAK, MIR3, CROSS
```
Point-of-view shot from under a wooden cart: blurred dark planks and a cart wheel frame the image in the foreground. In sharp focus in the street beyond, the giant from the attached sheet — six years younger, shorter beard, the same scale armor over the red caftan and the pointed felt cap — rides past on a huge dark horse, almost entirely a black silhouette against a burning house; firelight only catches the iron scales, his beard and the huge bow on his back. In the crook of his arm the crying 3-year-old girl from the attached sheet twists toward the camera, one small arm stretched straight out toward the viewer. On her neck the tiny bronze cross from the attached cross image (not a Latin cross), swinging on its cord, backlit by fire. No stirrups. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation, sparks and smoke. No stirrups, no text, no watermark.
```

### Кадр 6 · 0:16–0:19 · Он не может
- **ДКП: рука мальчика. Затем панорама вверх на плечо.**
- Пальцы V10 вцепились в землю. Он подтягивается, чтобы выскочить, но в кадр входит **взрослая женская рука (NURSE)**: грубая, с медным браслетом. Рука хватает его за плечо и **вдавливает обратно в тень**. Лица её не видно.

#### Промпт раскадровки · 6 · Он не может — ✅ ГОТОВ
Используем присланный кадр с рукой кормилицы (медный браслет, огонь сквозь доски). Перегенерировать не нужно.

### Кадр 7 · 0:19–0:22 · Крестик в грязи
- **ДКП, макро, камера у земли.**
- **Маленький крестик MIR3** в грязи, порванный шнурок. В металле отражается огонь.
- **Копыто опускается рядом** (не на него), брызги грязи. Крестик остаётся.
- **Звук:** музыка замирает. Слышен удар копыта и капли.

#### Промпт раскадровки · 7 · Крестик в грязи
**Вложения:** CROSS
```
Use the right half of the attached cross image as the base: the tiny bronze cross with the circle lying in dark wet mud, torn cord, orange firelight reflecting in the bronze. Add a heavy horse hoof that has just slammed down into the mud right beside it, not on it — mud splashes frozen in the air, droplets catching the firelight. Black background, smoke. Macro lens.

Photorealistic AAA game CG cinematic, anamorphic 2.39:1, extremely shallow depth of field, subtle film grain. No text, no watermark.
```

### Кадр 8 · 0:22–0:25 · Горит церковь
- **СП, 50 мм, медленный отъезд назад.**
- **Базилика в огне.** Пламя рвётся из окон, двускатная **крыша проваливается**, на фасаде в отблесках виден рельеф **болнисского креста**. Над входом **оседает и падает каменный крест**.
- На первом плане в тени тёмный силуэт мальчика, огонь отражается в его глазах.

#### Промпт раскадровки · 8 · Горит церковь
**Вложения:** V10, LOC-KASPI
```
Medium-wide shot: an early Christian basilica of greenish tuff with a gabled roof, 5th-century Georgian style, engulfed in fire. Flames burst from its narrow arched windows, the timber roof collapses inward in a shower of sparks, and on the facade the carved relief of a cross in a circle (Bolnisi cross) glows in the firelight. Above the entrance a stone cross tilts and falls. In the dark foreground the small silhouette of the boy from the attached sheet stands and watches, the fire reflected in his eyes. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, subtle film grain, soft halation, embers. No domed church, no text, no watermark.
```

---

## ЧАСТЬ 2. ПЕРЕХОД ЧЕРЕЗ ГЛАЗ · 0:25–0:32
*Палитра: огонь → холодный серо-голубой.*

### Кадр 9 · 0:25–0:29 · Глаз
- **Непрерывный наезд от КП лица V10 до ДКП глаза (макро).**
- Тёмно-карий глаз. **В левом глазу янтарный клинышек в нижнем внешнем секторе радужки (секторная гетерохромия)** (якорь узнавания, обязательно на всех крупных планах). В радужке отражаются **пожар, силуэты всадников, падающий крест**.
- По нижнему веку собирается **слеза**.
- **Звук:** «Зари» обрывается на высокой ноте.

#### Промпт раскадровки · 9 · Глаз (огонь)
**Вложения:** V10, готовый кадр 8
```
Extreme macro close-up of the LEFT eye of the boy from the attached sheet, filling the whole frame. Dark brown iris with a small wedge-shaped amber segment in its lower outer part (sectoral heterochromia) — not the whole iris amber. In the wet surface of the eye a clear reflection of the burning basilica from the attached frame, dark rider silhouettes and a falling cross. A tear gathers on the lower eyelid. Soot on the skin around the eye, individual lashes visible.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, extreme iris and skin detail, subtle film grain. Warm orange firelight only. No text, no watermark.
```

### Кадр 10 · 0:29–0:32 · Огонь становится рассветом
- **Тот же ДКП глаза, затем начинается отъезд.**
- Пламя в отражении **выцветает и становится холодным утренним светом**: в зрачке уже отражаются серые скалы и туман.
- На отъезде видно, что **лицо вокруг другое**: обветренная кожа, тонкий шрам над бровью, первая тёмная щетина. **Глаз тот же, с тем же янтарным клинышком.**
- **Звук:** на вдохе вступает **мужская полифония**, низкий бурдон. **Первый удар барабана.**

#### Промпт раскадровки · 10a · Глаз (переход) — правка кадра 9
**Вложения:** готовый кадр 9
```
Edit the attached image: keep exactly the same eye, the same iris pattern and the same amber segment, but the reflection of fire fades and turns into cold grey dawn light — the eye now reflects grey granite cliffs and mist. The warm light on the skin becomes cool blue-grey morning light. The tear is gone.
```

#### Промпт раскадровки · 10b · Глаз (16 лет) — правка кадра 10a
**Вложения:** готовый кадр 10a, V16
```
Same extreme close-up eye, same iris and the same amber segment, but the camera has pulled back slightly to show that the skin around it belongs to the young man from the attached sheet at 16: wind-weathered young skin, the edge of a thin scar above the right eyebrow at the top of frame, a few hairs of dark stubble at the bottom. Cold blue-grey dawn light, mist.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 3. ОТВЕТ · 0:32–0:58 · рассвет, Дарьяльское ущелье
*Палитра: холодный туман, гранит, тёмная сталь. Единственная тёплая точка — луч на клинке.*

### Кадр 11 · 0:32–0:36 · Шестнадцать
- **Отъезд продолжается до СП, 85 мм → 50 мм.**
- **V16** на **вороном коне** (без стремян, седло с высокими луками). Высокий, широкоплечий, волосы до плеч. Кольчуга до колен, поверх неё ламеллярный нагрудник, тёмный шерстяной плащ с фибулой на плече. На поясе бляхи и меч.
- **Шлем лежит на луке седла:** тёмная сталь, сегментный, **целиком выкованный в виде головы волка** (уши наверху, пасть открыта для лица), сзади волчья шкура на шею и плечи, цельнометаллический, без висящих пластин и кольчуги.
- На шее **крестик сестры на новом кожаном шнурке**.
- **Фон:** вход в **Дарьяльское ущелье**, отвесные гранитные стены, туман над Тереком, шум воды. Дно ущелья в синей тени, вершины только начинают светлеть.

#### Промпт раскадровки · 11 · Шестнадцать
**Вложения:** V16, HELM, HORSES (вороной), CROSS
```
Medium shot at the entrance to the Darial Gorge at dawn: the young man from the attached character sheet sits on the black stallion with the white star and red saddle cloth from the attached horse sheet — with NO stirrups, his feet hanging free. The wolf-head helmet from the attached prop sheet rests on the front of the saddle under his hand. He stares ahead into the gorge, motionless, breath steaming in the cold. Sheer granite walls, mist over the river, the bottom of the gorge in cold blue shadow. 85mm lens.

He is 16 years old: youthful face, smooth skin, sparse stubble. Instead of a solid breastplate he wears a dark lamellar breastplate of small laced steel plates over the mail. On his neck the tiny bronze cross from the attached cross image, not a large cross. A thin scar above the right eyebrow only, no scar on the nose.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed Revelations), anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. Cold desaturated palette. No stirrups, no text, no watermark.
```

### Кадр 12 · 0:36–0:40 · Артаваз
- **СП, 50 мм, камера стоит, ART въезжает в кадр слева.**
- **ART** на гнедом коне подлетает галопом, из-под копыт летят камни. Он осаживает коня вплотную к V16, кони фыркают, пар от дыхания.
- ART чуть старше, с короткой бородой, **в кожаном ламеллярном доспехе**, через плечо лук в горите.
- Он **молча смотрит на Вахтанга и коротко кивает**: всё готово. V16 не поворачивает головы, смотрит вперёд, в ущелье.

#### Промпт раскадровки · 12 · Артаваз
**Вложения:** ART, V16, HORSES
```
Medium two-shot at the entrance to the Darial Gorge at dawn: the warrior from the attached sheet (leather lamellar armor, brown cloak, bow) has just galloped in on the bay horse with the scarred shoulder from the attached horse sheet and reins it in hard beside the young man on the black stallion — stones and dust kicked up, both horses snorting steam. He looks at the young man and gives one short silent nod. The young man does not turn his head; he keeps staring into the gorge. Both riders with NO stirrups. Cold blue shadow, mist, granite walls. 50mm lens, static camera.

The young man is 16: youthful face, dark lamellar breastplate over mail, tiny bronze cross on his neck.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. No stirrups, no text, no watermark.
```

### Кадр 13 · 0:40–0:43 · Шлем
- **КП, низкий ракурс, 50 мм, медленный наезд.**
- V16 двумя руками поднимает шлем и **надевает его**. Стальная голова волка накрывает его голову: уши встают над макушкой, верхняя челюсть с клыками нависает над бровями, цельные стальные бока шлема закрывают уши и скулы, волчья шкура падает на шею и плечи. **Лицо открыто, оно смотрит из пасти волка**: те самые глаза с янтарным клинышком. Человек и волк смотрят в одну сторону.
- **Звук:** глухой тяжёлый удар металла, звенит кольчуга.

#### Промпт раскадровки · 13 · Шлем
**Вложения:** V16, HELM
```
Low-angle close-up: the young man from the attached character sheet lifts the steel wolf-head helmet from the attached prop sheet with both hands and settles it on his head. Capture the moment it sits in place: the wolf's ears above his head, the fangs over his brow, the grey wolf pelt falling over the back of his neck. His face stays fully visible inside the wolf's open jaws — dark brown eyes with a small amber segment in the left iris, a thin scar above the right eyebrow — and he and the wolf stare in the same direction. Cold misty dawn behind him, granite cliffs out of focus. 50mm lens.

He is 16 years old: youthful face, smooth skin, sparse stubble, no scar on the nose.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (The Witcher 3 and Assassin's Creed cinematics), anamorphic 2.39:1, shallow depth of field, physically based steel and fur, subtle film grain. No face mask, no gold, no glowing eyes, no text, no watermark.
```

### Кадр 14 · 0:43–0:47 · Меч и войско
- **ДКП рукояти → кран вверх и назад, за спину V16 (ОП).**
- Рука в кожаной перчатке на рукояти. **Меч выходит из ножен** со звоном. **Первый луч солнца** переваливает через гребень ущелья и бежит по клинку. Это единственная тёплая точка в части 3.
- Кран поднимается, и открывается **ARMY**: на склонах и в ущелье **тяжёлая конница в кольчугах и шлемах, кони в стёганых попонах**, за ней пехота с большими щитами и копьями, **горцы-союзники** в войлоке и мехах. Знамёна с **болнисским крестом**. Туман.
- **Звук:** хор нарастает.

#### Промпт раскадровки · 14a · Меч
**Вложения:** V16
```
Extreme close-up of a hand in a worn leather riding glove drawing a long straight double-edged sword from a dark scabbard on a belt with iron plaques. At this exact moment the first ray of sunrise crosses the ridge of the gorge and runs along the blade as a single bright warm line — the only warm color in an otherwise cold blue-grey frame. The edge of a mail sleeve and a charcoal wool cloak at the side.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro detail of steel and leather, shallow depth of field, subtle film grain. No text, no watermark.
```

#### Промпт раскадровки · 14b · Войско
**Вложения:** HELM, ARMY, LOC-DARIAL
```
High crane shot from behind and above a young rider on a black horse — the wolf-head helmet from the attached prop sheet on his head with the grey wolf pelt on his shoulders, sword raised, charcoal cloak — revealing the army from the attached army sheet filling the entrance of the Darial Gorge and the slopes behind him: in front heavy cavalry in mail and spangenhelms with mail over the face, horses in quilted caparisons, lances upright; behind them infantry with wicker shields painted with a red cross in a circle, spears; on the slopes highland allies in green-brown cloaks and fur hats. Banners with a red cross in a circle. No stirrups anywhere. Mist, cold blue shadow, first sunlight on the top of the cliffs.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (Assassin's Creed Revelations, Assassin's Creed Valhalla) and Platige Image (The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. No stirrups, no text, no watermark.
```

### Кадр 15 · 0:47–0:51 · Вперёд
- **ОП сверху (дрон над ущельем), 24 мм, медленный пролёт вперёд.**
- V16 **указывает мечом в глубь ущелья** и трогает коня, ART рядом. **Поток конницы втягивается в теснину** между отвесными стенами, вдоль Терека. Первый ряд — тяжёлые всадники в кольчугах, кони в доспехах (по «Житию»).

#### Промпт раскадровки · 15 · Вперёд
**Вложения:** ARMY, LOC-DARIAL
```
Aerial top-down wide shot over the Darial Gorge at dawn: a long column of the armored cavalry from the attached army sheet flows into the narrow canyon along the roaring river Terek between sheer granite walls, led by a rider on a black horse with a raised sword and a grey wolf pelt on his shoulders, and a rider on a bay horse beside him. Heavy horsemen in mail and caparisons in front, infantry and highlanders behind. Mist rises from the river; the first sunlight paints only the top edges of the cliffs gold. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, volumetric fog, subtle film grain. No stirrups, no modern road, no text, no watermark.
```

### Кадр 16 · 0:51–0:55 · Тот берег
- **Резкая склейка. ОП с противоположного берега, 135 мм (сжатая перспектива), затем наезд на BAK.**
- Музыка проваливается, слышен **только гул копыт, отражённый от скал**.
- **Противоположный берег, кручи, лагерь осов:** шатры, дымы костров, кони.
- На скальном выступе впереди стоит **BAK**: великан почти вдвое выше обычного человека, сармато-алан: чешуйчатый доспех поверх красного кафтана, скифский башлык, вытянутый череп, иранско-кавказские черты, аланский топор на поясе. Он медленно поднимает голову на гул и **натягивает свой лук**. Лук выше его роста, около 2,5 м. **Скрип тетивы.**
- В глубине, у шатра, стоит **MIR9**. Лица не видно, на ней аланское платье. **На её шее нет крестика.**

#### Промпт раскадровки · 16a · Тот берег
**Вложения:** BAK, LOC-CAMP
```
Telephoto wide shot (135mm, compressed perspective) across the river: on the far bank, on rocky ledges, the Alan war camp — felt tents, smoke of campfires, horses, horse-tail standards. In front, standing alone on a rock outcrop above the river, the giant from the attached sheet (scale armor over a red caftan, pointed felt cap), clearly twice the size of the warriors around him, turning his head toward the sound of the approaching army. Cold blue dawn mist, small warm campfires.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

#### Промпт раскадровки · 16b · Бакатар натягивает лук
**Вложения:** BAK, MIR9, LOC-CAMP
```
Medium-close shot of the giant from the attached sheet on the rock ledge, drawing his colossal bow — taller than he is — the string pulled to his cheek, an arrow as long as a spear on the string, muscles straining, his dark eyes fixed across the river. Scale armor over the red caftan, pointed felt cap, cold dawn light on his face. Behind him, out of focus deep in the camp beside a felt tent, stands the 9-year-old girl from the attached sheet in her dark red caftan and fur-trimmed cap with two long braids — her face turned away, nothing on her neck. 135mm lens, shallow depth of field.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, subtle film grain, volumetric fog. No text, no watermark.
```

### Кадр 17 · 0:55–0:58 · Титул
- **Удар барабана, резкий чёрный экран.**
- Проступает логотип **«ГОРГАСАЛИ»**, стилизованный под **асомтаврули**, как в Болнисской надписи 493 года. Шрифт процарапан в камне, края тронуты ржавчиной.
- **Звук:** вдали воет волк.

#### Промпт раскадровки · 17 · Титул
Генерировать только как референс фактуры; финальный логотип — у дизайнера (шрифт на основе асомтаврули).
```
Title card on pure black: the single word "GORGASALI" carved into a dark rough stone slab in ancient Georgian Asomtavruli-inspired capital letterforms, like the 5th-century Bolnisi inscription — angular, monumental, chiseled grooves with traces of rust and soot, low raking cold side light, lots of black negative space.

Photorealistic CG render, anamorphic 2.39:1, subtle film grain. No other text, no watermark.
```

---

## Сводная таблица для раскадровки

| # | Время | План | Персонажи | Локация | Свет |
|---|---|---|---|---|---|
| 1 | 0:00 | ОП, пролёт | EAGLE | хребты над облаками | багровый закат |
| 2 | 0:03 | пролёт, бреющий | EAGLE, RAID, BAK (силуэт) | склон над Каспи | сумерки + факелы |
| 3 | 0:06 | пролёт → нырок | EAGLE, RAID | Каспи, улица | сумерки → факелы |
| 4 | 0:09 | КП | V10 | под повозкой | полосы огня |
| 5 | 0:12 | субъективный | MIR3, BAK (ночь) | улица | контровой огонь |
| 6 | 0:16 | ДКП | V10, NURSE | под повозкой | огонь |
| 7 | 0:19 | макро | крестик | грязь | огонь |
| 8 | 0:22 | СП | V10 (силуэт) | базилика | пожар |
| 9 | 0:25 | ДКП | глаз V10 | — | огонь в зрачке |
| 10 | 0:29 | ДКП→КП | глаз V16 | — | холодный рассвет |
| 11 | 0:32 | СП | V16, конь, шлем | вход в Дарьял | синяя тень |
| 12 | 0:36 | СП | V16, ART | Дарьял | синяя тень |
| 13 | 0:40 | КП | V16 в шлеме | Дарьял | синяя тень |
| 14 | 0:43 | ДКП→ОП | V16, ARMY | Дарьял | первый луч |
| 15 | 0:47 | ОП сверху | ARMY | теснина, Терек | рассвет |
| 16 | 0:51 | ОП→КП | BAK, MIR9 | лагерь осов | костры + рассвет |
| 17 | 0:55 | — | — | — | логотип |

## Сквозные якоря (проверять в каждом кадре)
1. **Глаз:** тёмно-карий, янтарный клинышек в левой радужке (кадры 4, 9, 10, 13).
2. **Крестик:** на MIR3 → в грязи → на V16 → отсутствует на MIR9 (кадры 5, 7, 11, 16).
3. **Бакатар:** силуэт в колонне под орлом (кадр 2) → похититель с луком за спиной (кадр 5) → тот же великан с луком на том берегу (кадр 16).
4. **Шлем:** тёмная сталь, голова волка с ушами, лицо в открытой пасти, без золота и без льва (кадры 11, 13).
5. **Эпоха:** нет стремян, нет чохи, базилика, а не купольный храм.
