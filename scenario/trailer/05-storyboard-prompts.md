# «Горгасали» — промпты раскадровки (v2, под готовые листы персонажей)

Промпты переписаны **под реальные генерации**. Внешность и костюм каждого персонажа берутся **из приложенного листа**, текст промпта отвечает только за действие, свет, камеру и за **исправления**, где лист отличается от задуманного.

## Реестр референсов

| ID | Что | Статус | Файл | Важно при использовании |
|---|---|---|---|---|
| **V10** | Вахтанг, 10 лет | ✅ | `refs/V10.jpg` | янтарной вышла вся левая радужка; в макро (кадр 9) просим «клинышек» |
| **V16** | Вахтанг, 16 лет | ⚠️ временный | `refs/V16.jpg` | выглядит на 25+, цельная кираса, латинский крест, шрам на носу — **в каждом кадре исправляем текстом** |
| **MIR3** | Мирандухт, 3 года | ✅ | (в сессию не сохранился — положить в `refs/MIR3.jpg`) | на шее латинский крест — **заменяем на CROSS** |
| **MIR9** | Мирандухт, 9 лет | ✅ | `refs/MIR9.jpg` | — |
| **CROSS** | крестик | ✅ | `refs/CROSS.jpg` | прикладывать везде, где виден крестик |
| **HELM** | шлем-волк | ✅ | `refs/HELM.jpg` | лицо открыто в пасти, волчья шкура сзади |
| **ART** | Артаваз | ✅ | `refs/ART.jpg` | — |
| **BAK** | Бакатар | ✅ | (не сохранился — положить в `refs/BAK.jpg`) | версия с иранско-кавказским лицом, чешуёй и войлочным колпаком |
| **HORSES** | кони | ✅ с правкой | (не сохранился — `refs/HORSES.jpg`) | **на листе есть стремена** — в каждом кадре пишем «no stirrups»; подписи на листе обрезать |
| **RAID** | налётчики | ✅ | `refs/RAID.jpg` | подпись в углу обрезать перед загрузкой |
| **ARMY** | войско | ✅ с правкой | `refs/ARMY.jpg` | у коня тяжёлого всадника **стремя** — пишем «no stirrups» |
| **NURSE** | кадр 6 | ✅ **готовый кадр** | (не сохранился — `refs/SHOT06.jpg`) | это уже финальный кадр 6 |

**Правила:**
- **Порядок вложений:** персонажи → реквизит → локация (подложка). Не больше 3–4 картинок за раз, иначе модель начинает путать лица.
- **Перед загрузкой обрезайте подписи** на листах (Vakhtang's horse, Steppe raiders), иначе текст может просочиться в кадр.
- **Формат 21:9** (или 16:9 с припиской про 2.39:1).

**Стилевая строка** (уже вшита в каждый промпт):
`Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, shallow depth of field, subtle film grain, soft halation. 5th-century Caucasus. No stirrups, no text, no watermark.`

**Исправление для V16** (вставлено во все кадры с ним):
`He is 16 years old: youthful face, smooth skin, sparse stubble. Instead of a solid breastplate he wears a dark lamellar breastplate of small laced steel plates over the mail. On his neck the tiny bronze cross from the attached cross image, not a large cross. A thin scar above the right eyebrow only, no scar on the nose.`

---

## 0 · Подложки локаций (без персонажей, делать первыми)

### LOC-KASPI
```
Wide establishing matte painting of the ancient fortified town of Kaspi in the 5th-century Kingdom of Iberia (eastern Georgia), at night without moon: a hill above the river Mtkvari, walls of rough uncut stone with square towers, houses of stone and timber with flat earthen roofs and wooden balconies, and above them the silhouette of an early Christian basilica of greenish tuff with a gabled roof. From the dark hills to the north dozens of torches flow down toward the town like a river of fire; an orange smoky glow on the horizon.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Only warm firelight and black. No domed churches, no text, no watermark.
```

### LOC-DARIAL
```
Wide establishing matte painting of the Darial Gorge in the Caucasus at dawn: a narrow canyon of sheer granite walls rising up to 1800 meters, the wild grey-white river Terek roaring over boulders, mist lying over the water, birch and pine clinging to the slopes, snowfields high above. The bottom of the gorge is in deep cold blue shadow; only the highest ridges catch the first pale gold light. A narrow stony track along the river.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (Assassin's Creed Revelations, The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. Cold desaturated palette. No modern road, no buildings, no text, no watermark.
```

### LOC-CAMP
```
Wide matte painting across a mountain river in the Darial Gorge at dawn: on the far bank, on steep rocky ledges, the war camp of 5th-century Alan steppe warriors — round felt tents and hide shelters, smoke of campfires rising into the mist, tethered horses, horse-tail standards on poles. Sheer granite cliffs above, cold blue shadow, campfires as small warm points.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 1 · УЖАС (ночь, Каспи)

### Кадр 1 · чёрный экран — генерировать не нужно

### Кадр 2 · Город перед бедой
**Вложения:** LOC-KASPI
```
Using the attached location as the base, create a cinematic wide establishing shot of the town on its hill at night, seen from a low hill opposite. The river of torches from the north has almost reached the town walls; orange glow and smoke over the horizon; the basilica silhouette above the roofs; a few windows still lit. Ominous calm before the attack. Static camera at eye level, 35mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Only firelight and black. No text, no watermark.
```

### Кадр 3 · Конница степи
**Вложения:** RAID (без подписи), LOC-KASPI
```
Extreme low-angle shot from ground level in a muddy street of the burning town: galloping horse hooves smash through the mud right in front of the lens, clods of mud flying toward the camera, motion blur. Above them the two raider types from the attached sheet rush past on horseback — the fair-haired Alan in mail with an axe, and the shaven-headed Hunnic rider with a topknot in a sheepskin coat, his helmet on. Their legs hang free — no stirrups. A horse-tail standard sweeps across the top of the frame. Hard orange torchlight, embers, smoke. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation. Only torchlight and black. No stirrups, no text, no watermark.
```

### Кадр 4 · Мальчик прячется
**Вложения:** V10
```
Close-up of the boy from the attached sheet, exactly as he looks there, lying on his stomach in the mud under a wooden cart at night. Soot on his face, eyes wide with terror, one hand pressed hard over his own mouth. Stripes of orange firelight slide across his face through the gaps between the cart planks; out-of-focus horse legs gallop past in the background. 85mm lens, very shallow depth of field, slight handheld feel.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation. Only warm firelight and deep black. No text, no watermark.
```

### Кадр 5 · Сестру уводят
**Вложения:** BAK, MIR3, CROSS
```
Point-of-view shot from under a wooden cart: blurred dark planks and a cart wheel frame the image in the foreground. In sharp focus in the street beyond, the giant from the attached sheet — six years younger, shorter beard, the same scale armor over the red caftan and the pointed felt cap — rides past on a huge dark horse, almost entirely a black silhouette against a burning house; firelight only catches the iron scales, his beard and the huge bow on his back. In the crook of his arm the crying 3-year-old girl from the attached sheet twists toward the camera, one small arm stretched straight out toward the viewer. On her neck the tiny bronze cross from the attached cross image (not a Latin cross), swinging on its cord, backlit by fire. No stirrups. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation, sparks and smoke. No stirrups, no text, no watermark.
```

### Кадр 6 · Он не может — ✅ ГОТОВ
Используем присланный кадр с рукой кормилицы (медный браслет, огонь сквозь доски). Перегенерировать не нужно.

### Кадр 7 · Крестик в грязи
**Вложения:** CROSS
```
Use the right half of the attached cross image as the base: the tiny bronze cross with the circle lying in dark wet mud, torn cord, orange firelight reflecting in the bronze. Add a heavy horse hoof that has just slammed down into the mud right beside it, not on it — mud splashes frozen in the air, droplets catching the firelight. Black background, smoke. Macro lens.

Photorealistic AAA game CG cinematic, anamorphic 2.39:1, extremely shallow depth of field, subtle film grain. No text, no watermark.
```

### Кадр 8 · Горит церковь
**Вложения:** V10, LOC-KASPI
```
Medium-wide shot: an early Christian basilica of greenish tuff with a gabled roof, 5th-century Georgian style, engulfed in fire. Flames burst from its narrow arched windows, the timber roof collapses inward in a shower of sparks, and on the facade the carved relief of a cross in a circle (Bolnisi cross) glows in the firelight. Above the entrance a stone cross tilts and falls. In the dark foreground the small silhouette of the boy from the attached sheet stands and watches, the fire reflected in his eyes. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, subtle film grain, soft halation, embers. No domed church, no text, no watermark.
```

---

## ЧАСТЬ 2 · ПЕРЕХОД ЧЕРЕЗ ГЛАЗ

### Кадр 9 · Глаз (огонь)
**Вложения:** V10, готовый кадр 8
```
Extreme macro close-up of the LEFT eye of the boy from the attached sheet, filling the whole frame. Dark brown iris with a small wedge-shaped amber segment in its lower outer part (sectoral heterochromia) — not the whole iris amber. In the wet surface of the eye a clear reflection of the burning basilica from the attached frame, dark rider silhouettes and a falling cross. A tear gathers on the lower eyelid. Soot on the skin around the eye, individual lashes visible.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, extreme iris and skin detail, subtle film grain. Warm orange firelight only. No text, no watermark.
```

### Кадр 10a · Глаз (переход) — правка кадра 9
**Вложения:** готовый кадр 9
```
Edit the attached image: keep exactly the same eye, the same iris pattern and the same amber segment, but the reflection of fire fades and turns into cold grey dawn light — the eye now reflects grey granite cliffs and mist. The warm light on the skin becomes cool blue-grey morning light. The tear is gone.
```

### Кадр 10b · Глаз (16 лет) — правка кадра 10a
**Вложения:** готовый кадр 10a, V16
```
Same extreme close-up eye, same iris and the same amber segment, but the camera has pulled back slightly to show that the skin around it belongs to the young man from the attached sheet at 16: wind-weathered young skin, the edge of a thin scar above the right eyebrow at the top of frame, a few hairs of dark stubble at the bottom. Cold blue-grey dawn light, mist.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 3 · ОТВЕТ (рассвет, Дарьял)

### Кадр 11 · Шестнадцать
**Вложения:** V16, HELM, HORSES (вороной), CROSS
```
Medium shot at the entrance to the Darial Gorge at dawn: the young man from the attached character sheet sits on the black stallion with the white star and red saddle cloth from the attached horse sheet — with NO stirrups, his feet hanging free. The wolf-head helmet from the attached prop sheet rests on the front of the saddle under his hand. He stares ahead into the gorge, motionless, breath steaming in the cold. Sheer granite walls, mist over the river, the bottom of the gorge in cold blue shadow. 85mm lens.

He is 16 years old: youthful face, smooth skin, sparse stubble. Instead of a solid breastplate he wears a dark lamellar breastplate of small laced steel plates over the mail. On his neck the tiny bronze cross from the attached cross image, not a large cross. A thin scar above the right eyebrow only, no scar on the nose.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed Revelations), anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. Cold desaturated palette. No stirrups, no text, no watermark.
```

### Кадр 12 · Артаваз
**Вложения:** ART, V16, HORSES
```
Medium two-shot at the entrance to the Darial Gorge at dawn: the warrior from the attached sheet (leather lamellar armor, brown cloak, bow) has just galloped in on the bay horse with the scarred shoulder from the attached horse sheet and reins it in hard beside the young man on the black stallion — stones and dust kicked up, both horses snorting steam. He looks at the young man and gives one short silent nod. The young man does not turn his head; he keeps staring into the gorge. Both riders with NO stirrups. Cold blue shadow, mist, granite walls. 50mm lens, static camera.

The young man is 16: youthful face, dark lamellar breastplate over mail, tiny bronze cross on his neck.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. No stirrups, no text, no watermark.
```

### Кадр 13 · Шлем
**Вложения:** V16, HELM
```
Low-angle close-up: the young man from the attached character sheet lifts the steel wolf-head helmet from the attached prop sheet with both hands and settles it on his head. Capture the moment it sits in place: the wolf's ears above his head, the fangs over his brow, the grey wolf pelt falling over the back of his neck. His face stays fully visible inside the wolf's open jaws — dark brown eyes with a small amber segment in the left iris, a thin scar above the right eyebrow — and he and the wolf stare in the same direction. Cold misty dawn behind him, granite cliffs out of focus. 50mm lens.

He is 16 years old: youthful face, smooth skin, sparse stubble, no scar on the nose.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (The Witcher 3 and Assassin's Creed cinematics), anamorphic 2.39:1, shallow depth of field, physically based steel and fur, subtle film grain. No face mask, no gold, no glowing eyes, no text, no watermark.
```

### Кадр 14a · Меч
**Вложения:** V16
```
Extreme close-up of a hand in a worn leather riding glove drawing a long straight double-edged sword from a dark scabbard on a belt with iron plaques. At this exact moment the first ray of sunrise crosses the ridge of the gorge and runs along the blade as a single bright warm line — the only warm color in an otherwise cold blue-grey frame. The edge of a mail sleeve and a charcoal wool cloak at the side.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro detail of steel and leather, shallow depth of field, subtle film grain. No text, no watermark.
```

### Кадр 14b · Войско
**Вложения:** HELM, ARMY, LOC-DARIAL
```
High crane shot from behind and above a young rider on a black horse — the wolf-head helmet from the attached prop sheet on his head with the grey wolf pelt on his shoulders, sword raised, charcoal cloak — revealing the army from the attached army sheet filling the entrance of the Darial Gorge and the slopes behind him: in front heavy cavalry in mail and spangenhelms with mail over the face, horses in quilted caparisons, lances upright; behind them infantry with wicker shields painted with a red cross in a circle, spears; on the slopes highland allies in green-brown cloaks and fur hats. Banners with a red cross in a circle. No stirrups anywhere. Mist, cold blue shadow, first sunlight on the top of the cliffs.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (Assassin's Creed Revelations, Assassin's Creed Valhalla) and Platige Image (The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. No stirrups, no text, no watermark.
```

### Кадр 15 · Вперёд
**Вложения:** ARMY, LOC-DARIAL
```
Aerial top-down wide shot over the Darial Gorge at dawn: a long column of the armored cavalry from the attached army sheet flows into the narrow canyon along the roaring river Terek between sheer granite walls, led by a rider on a black horse with a raised sword and a grey wolf pelt on his shoulders, and a rider on a bay horse beside him. Heavy horsemen in mail and caparisons in front, infantry and highlanders behind. Mist rises from the river; the first sunlight paints only the top edges of the cliffs gold. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, volumetric fog, subtle film grain. No stirrups, no modern road, no text, no watermark.
```

### Кадр 16a · Тот берег
**Вложения:** BAK, LOC-CAMP
```
Telephoto wide shot (135mm, compressed perspective) across the river: on the far bank, on rocky ledges, the Alan war camp — felt tents, smoke of campfires, horses, horse-tail standards. In front, standing alone on a rock outcrop above the river, the giant from the attached sheet (scale armor over a red caftan, pointed felt cap), clearly twice the size of the warriors around him, turning his head toward the sound of the approaching army. Cold blue dawn mist, small warm campfires.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

### Кадр 16b · Бакатар натягивает лук
**Вложения:** BAK, MIR9, LOC-CAMP
```
Medium-close shot of the giant from the attached sheet on the rock ledge, drawing his colossal bow — taller than he is — the string pulled to his cheek, an arrow as long as a spear on the string, muscles straining, his dark eyes fixed across the river. Scale armor over the red caftan, pointed felt cap, cold dawn light on his face. Behind him, out of focus deep in the camp beside a felt tent, stands the 9-year-old girl from the attached sheet in her dark red caftan and fur-trimmed cap with two long braids — her face turned away, nothing on her neck. 135mm lens, shallow depth of field.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image, anamorphic 2.39:1, subtle film grain, volumetric fog. No text, no watermark.
```

### Кадр 17 · Титул
Генерировать только как референс фактуры; финальный логотип — у дизайнера (шрифт на основе асомтаврули).
```
Title card on pure black: the single word "GORGASALI" carved into a dark rough stone slab in ancient Georgian Asomtavruli-inspired capital letterforms, like the 5th-century Bolnisi inscription — angular, monumental, chiseled grooves with traces of rust and soot, low raking cold side light, lots of black negative space.

Photorealistic CG render, anamorphic 2.39:1, subtle film grain. No other text, no watermark.
```

---

## Чек-лист раскадровки
- [ ] Вахтанг в 16 молодой во всех кадрах (11, 12, 13), ламеллярный нагрудник, маленький бронзовый крестик
- [ ] Глаз с янтарным клинышком совпадает в кадрах 4, 9, 10a, 10b, 13
- [ ] Крестик: на шее (5) → в грязи (7) → на Вахтанге (11) → нет на сестре (16b)
- [ ] Бакатар ночью (5) узнаётся в Бакатаре на рассвете (16)
- [ ] Ни в одном кадре нет стремян (особенно 11, 12, 14b, 15)
- [ ] Часть 1 только тёплая, часть 3 только холодная (кроме луча на клинке)
