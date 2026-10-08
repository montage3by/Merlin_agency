# «Горгасали» — промпты раскадровки для Nano Banana

Сделано по `02-shot-list.md`. Каждый промпт собран целиком. В строке **«Референсы»** указано, какие утверждённые листы из `03-character-prompts.md` надо приложить к запросу.

## Как работать
- **Формат:** **21:9** (если в вашей версии Nano Banana его нет, ставьте 16:9 и пишите в промпте «cinematic letterbox 2.39:1 framing»).
- **Сначала подложки локаций** (раздел 0). Готовые фоны подаются как референсы вместе с персонажами, тогда город и ущелье будут одинаковыми от кадра к кадру.
- **Порядок референсов:** сначала персонаж, потом реквизит, потом локация. В тексте промпта ссылайтесь на них словами: «the boy from the attached sheet».
- **Правки по одной:** «make the fire brighter», «move the camera lower». Переписывать промпт целиком не надо.

**Стилевая строка** уже включена в каждый промпт:
`Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, shallow depth of field, subtle film grain, soft halation. 5th-century Kingdom of Iberia (Kartli, Georgia). No stirrups, no chokha, no papakha, no text, no watermark.`

---

## 0 · Подложки локаций (делать первыми)

### LOC-KASPI — Каспи ночью
```
Wide establishing matte painting of the ancient town of Kaspi in the 5th-century Kingdom of Iberia (eastern Georgia), at night without moon. A fortified town on a hill above the river Mtkvari: walls of rough uncut stone with square towers, houses of stone and timber with flat earthen roofs and wooden balconies and galleries, and above them the silhouette of an early Christian basilica with a gabled roof built of greenish tuff. From the dark hills to the north dozens of torches flow down toward the town like a river of fire; an orange smoky glow over the hills.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation. Only warm firelight and black, no cold colors. No domed churches, no text, no watermark.
```

### LOC-DARIAL — вход в Дарьяльское ущелье на рассвете
```
Wide establishing matte painting of the Darial Gorge in the Caucasus at dawn: a narrow canyon of sheer granite walls rising up to 1800 meters, the wild grey-white river Terek roaring over boulders at the bottom, mist lying over the water, birch and pine clinging to the slopes, snowfields high above. The bottom of the gorge is still in deep cold blue shadow while only the highest ridges start to catch the first pale gold light. A narrow stony track runs along the river.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (Assassin's Creed Revelations mountain cinematic, The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. Cold desaturated palette of granite grey, blue and white. No modern road, no buildings, no text, no watermark.
```

### LOC-CAMP — лагерь осов на том берегу
```
Wide matte painting across a mountain river in the Darial Gorge at dawn: on the far bank, on steep rocky ledges, the war camp of 5th-century Alan steppe warriors — round felt yurt-like tents and hide shelters, smoke of campfires rising into the mist, tethered horses, horse-tail standards on poles, warriors moving between fires. Sheer granite cliffs above, cold blue shadow below, campfires as small warm points.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 1 · УЖАС (ночь, Каспи)

### Кадр 1 · 0:00 · Чёрный экран
Генерировать не нужно: это чёрный кадр со звуком дыхания.

### Кадр 2 · 0:03 · Город перед бедой
**Референсы:** LOC-KASPI
```
Using the attached location as the base, create a cinematic wide establishing shot: the town of Kaspi on its hill at night, seen from a low hill opposite. The torches from the north are now close — a long river of fire reaching the town walls. Orange glow and smoke over the horizon, the basilica silhouette above the roofs, a few windows lit. Still, ominous calm before the attack. Camera static at eye level, 35mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, shallow depth of field, subtle film grain, soft halation. 5th-century Kingdom of Iberia (Kartli, Georgia). Only firelight and black. No text, no watermark.
```

### Кадр 3 · 0:06 · Конница степи
**Референсы:** RAID, LOC-KASPI
```
Extreme low-angle shot from ground level in a muddy street of the burning town: galloping horse hooves smash through the mud right in front of the lens, clods of mud flying toward the camera, motion blur. Above them the raiders from the attached sheet rush past — fur coats, mail shirts, pear-shaped lamellar helmets, composite bows, narrow axes; legs hanging free without stirrups. In the hard orange light of a torch, for a split second, the profile of a Hunnic rider with an elongated deformed skull. A horse-tail standard sweeps across the top of the frame. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"), anamorphic 2.39:1, subtle film grain, soft halation, embers and smoke. 5th-century Caucasus. Only torchlight and black. No stirrups, no text, no watermark.
```

### Кадр 4 · 0:09 · Мальчик прячется
**Референсы:** V10
```
Close-up of the 10-year-old boy from the attached sheet lying on his stomach in the mud under a wooden cart at night. His face is streaked with soot, eyes wide with terror, one hand pressed hard over his own mouth. Through the gaps between the cart planks stripes of orange firelight slide across his face; out-of-focus horse legs gallop past in the background. The small amber segment in his left iris catches the firelight. 85mm lens, very shallow depth of field, slight handheld feel.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation. 5th-century Kingdom of Iberia. Only warm firelight and deep black. No text, no watermark.
```

### Кадр 5 · 0:12 · Сестру уводят
**Референсы:** BAK-NIGHT, MIR3, CROSS, LOC-KASPI
```
Point-of-view shot from under a wooden cart: in the blurred foreground the dark planks and a cart wheel frame the image. In sharp focus in the street beyond, the giant Bakatar from the attached sheet rides past on his huge dark horse, almost entirely a black silhouette against a burning house behind him; only firelight catches his mail and blond beard, his enormous bow slung on his back. In the crook of his arm the 3-year-old girl from the attached sheet twists toward the camera, crying, one small arm stretched out straight toward the viewer, the tiny bronze cross swinging on its cord at her neck, backlit by the fire. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation, sparks and smoke. 5th-century Caucasus. No stirrups, no text, no watermark.
```

### Кадр 6 · 0:16 · Он не может
**Референсы:** V10 (+ промпт NURSE)
```
Extreme close-up at ground level: the small soot-covered hand of the boy from the attached sheet digs its fingers into the mud as he pulls himself forward to run out. From above, a strong weathered woman's hand with a worn copper bracelet grabs his shoulder and pulls him back into the darkness under the cart. Her face is not visible. Orange firelight flickers through the cart planks. 100mm macro feel, very shallow depth of field.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, subtle film grain, soft halation. No text, no watermark.
```

### Кадр 7 · 0:19 · Крестик в грязи
**Референсы:** CROSS
```
Macro shot at ground level: the tiny bronze Bolnisi-style cross from the attached prop sheet lies in dark wet mud, its thin linen cord torn. Orange firelight reflects in the bronze. A heavy horse hoof has just slammed down into the mud right beside it, not on it — mud splashes frozen in the air, droplets catching the firelight. Black background, smoke.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, macro photography, extremely shallow depth of field, subtle film grain. No text, no watermark.
```

### Кадр 8 · 0:22 · Горит церковь
**Референсы:** V10, LOC-KASPI
```
Medium-wide shot: an early Christian basilica of greenish tuff with a gabled roof, 5th-century Georgian style, engulfed in fire. Flames burst from its narrow arched windows, the timber roof is collapsing inward in a shower of sparks, and on the facade the carved relief of a Bolnisi cross (equal flared arms in a circle) glows in the firelight. Above the entrance a stone cross tilts and falls. In the dark foreground, in silhouette, the small figure of the boy from the attached sheet stands and watches, the fire reflected in his eyes. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers), anamorphic 2.39:1, subtle film grain, soft halation, embers. 5th-century Kingdom of Iberia. No domed church, no text, no watermark.
```

---

## ЧАСТЬ 2 · ПЕРЕХОД ЧЕРЕЗ ГЛАЗ

### Кадр 9 · 0:25 · Глаз (огонь)
**Референсы:** V10, кадр 8 (готовый)
```
Extreme macro close-up of the left eye of the 10-year-old boy from the attached sheet, filling the whole frame. Dark brown iris with a small wedge-shaped amber segment in its lower outer part (sectoral heterochromia). In the wet surface of the eye, a clear reflection of the burning basilica, dark rider silhouettes and a falling cross. A tear gathers on the lower eyelid. Soot on the skin around the eye, individual lashes visible.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, extreme detail of iris texture and skin pores, subtle film grain. Warm orange firelight only. No text, no watermark.
```

### Кадр 10a · 0:29 · Глаз (переход)
**Референсы:** кадр 9 (готовый)
```
Edit the attached image: keep exactly the same eye, the same iris pattern and the same small amber segment, but the reflection of fire in the eye fades and turns into cold grey dawn light — now the eye reflects grey granite cliffs and mist. The warm orange light on the skin changes to cool blue-grey morning light. The tear is gone.
```

### Кадр 10b · 0:31 · Глаз (16 лет)
**Референсы:** кадр 10a (готовый), V16
```
Same extreme close-up eye, same iris and the same small amber segment, but now the camera has pulled back slightly to reveal that the skin around it belongs to the 16-year-old young man from the attached sheet: wind-weathered skin, the edge of a thin fresh scar above the right eyebrow visible at the top of frame, a few hairs of dark stubble at the bottom. Cold blue-grey dawn light, mist.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro photography, extreme skin detail, subtle film grain. No text, no watermark.
```

---

## ЧАСТЬ 3 · ОТВЕТ (рассвет, Дарьял)

### Кадр 11 · 0:32 · Шестнадцать
**Референсы:** V16, HELM, HORSES, CROSS, LOC-DARIAL
```
Medium shot of the 16-year-old Vakhtang from the attached sheet sitting on his black stallion (from the attached horse sheet, saddle with high arches, no stirrups) at the entrance to the Darial Gorge at dawn. Mail shirt, dark lamellar breastplate, charcoal wool cloak pinned at the shoulder. His dark steel wolf-head helmet (ears on top, open jaws for the face) from the attached prop sheet rests on the front arch of the saddle under his hand. The tiny bronze cross on a leather cord at his neck. He stares ahead into the gorge, motionless, breath steaming in the cold. Behind him sheer granite walls, mist over the river, the bottom of the gorge in cold blue shadow. 85mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed Revelations), anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. Cold desaturated palette. No stirrups, no gold on the helmet, no text, no watermark.
```

### Кадр 12 · 0:36 · Артаваз
**Референсы:** ART, V16, HORSES, LOC-DARIAL
```
Medium two-shot at the entrance to the Darial Gorge at dawn: Artavaz from the attached sheet has just galloped in on his bay horse and reins it in hard right beside Vakhtang on his black stallion — stones and dust kicked up, both horses snorting steam. Artavaz in leather lamellar armor with a bow in a gorytos looks at Vakhtang and gives one short silent nod. Vakhtang does not turn his head; he keeps staring into the gorge. Cold blue shadow, mist, granite walls. 50mm lens, static camera.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers), anamorphic 2.39:1, shallow depth of field, subtle film grain, volumetric fog. No stirrups, no text, no watermark.
```

### Кадр 13 · 0:40 · Шлем
**Референсы:** V16, HELM
```
Low-angle close-up: the young man from the attached sheet lifts the dark steel wolf-head helmet from the attached prop sheet with both hands and settles it on his head. Capture the moment it sits in place: the wolf's ears rise above his head, the upper jaw with fangs hangs over his brow like a brim, the split lower jaw rests as cheek guards along his cheeks, the mail aventail falls onto his shoulders and back. His face stays fully visible inside the wolf's open jaws — dark brown eyes, the small wedge-shaped amber segment in his left iris, the thin scar above his right eyebrow — and he and the wolf stare in the same direction. Cold misty dawn behind him, granite cliffs out of focus. 50mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (The Witcher 3 and Assassin's Creed cinematics), anamorphic 2.39:1, shallow depth of field, physically based forged steel and mail, subtle film grain. No face mask, no gold, no lion, no glowing eyes, no text, no watermark.
```

### Кадр 14a · 0:43 · Меч
**Референсы:** V16
```
Extreme close-up of a gloved hand in a worn leather riding glove drawing a long straight double-edged sword from a dark scabbard on a belt with iron plaques. At this exact moment the first ray of sunrise crosses the ridge of the gorge and runs along the blade as a single bright warm line — the only warm color in an otherwise cold blue-grey frame. Mail sleeve and charcoal wool cloak visible at the edge.

Photorealistic AAA game CG cinematic in the style of Digic Pictures, anamorphic 2.39:1, macro detail of steel and leather, shallow depth of field, subtle film grain. No text, no watermark.
```

### Кадр 14b · 0:45 · Войско
**Референсы:** V16 (со спины), HELM, ARMY, LOC-DARIAL
```
High crane shot from behind and above Vakhtang (wolf-head helmet on, sword raised, charcoal cloak, black stallion) revealing the army of the 5th-century Kingdom of Iberia filling the entrance of the Darial Gorge and the slopes behind him: in front heavy cavalry in mail and spangenhelms with mail aventails, horses in quilted caparisons, lances upright; behind them infantry with large hide-covered shields painted with red Bolnisi crosses and spears; on the slopes highland allies in felt cloaks and furs. Banners with the Bolnisi cross. Mist, cold blue shadow, the first sunlight touching the top of the cliffs.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (Assassin's Creed Revelations, Assassin's Creed Valhalla cinematic trailers) and Platige Image (The Witcher 3 "Killing Monsters"), anamorphic 2.39:1, volumetric fog, subtle film grain. No stirrups, no text, no watermark.
```

### Кадр 15 · 0:47 · Вперёд
**Референсы:** ARMY, LOC-DARIAL
```
Aerial top-down wide shot over the Darial Gorge at dawn: a long column of armored cavalry flows into the narrow canyon along the roaring river Terek between sheer granite walls, led by a rider on a black horse with a raised sword and a rider on a bay horse beside him. The front ranks are heavy horsemen in mail with horses in caparisons; infantry and highlanders follow. Mist rises from the river; the first sunlight paints only the top edges of the cliffs gold. 24mm lens.

Photorealistic AAA game CG cinematic in the style of Digic Pictures (Assassin's Creed cinematic trailers) and Platige Image (The Witcher 3 cinematics), anamorphic 2.39:1, volumetric fog, subtle film grain. No modern road, no text, no watermark.
```

### Кадр 16a · 0:51 · Тот берег (общий)
**Референсы:** LOC-CAMP, BAK
```
Telephoto wide shot (135mm, compressed perspective) across the river: on the far bank, on rocky ledges, the Alan war camp — felt tents, smoke of campfires, horses, horse-tail standards. In front, standing alone on a rock outcrop above the river, the giant Bakatar from the attached sheet, twice the size of the warriors around him, turning his head toward the sound of the approaching army. Cold blue dawn mist, small warm campfires.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Love Death + Robots "The Secret War", anamorphic 2.39:1, volumetric fog, subtle film grain. No text, no watermark.
```

### Кадр 16b · 0:53 · Бакатар натягивает лук
**Референсы:** BAK, MIR9, LOC-CAMP
```
Medium-close shot of the giant Alan champion Bakatar from the attached sheet on the rock ledge, drawing his enormous composite bow — taller than he is, about 2.5 meters — the string pulled to his cheek, an arrow as long as a spear on the string, muscles straining, his pale eyes fixed across the river. Bearskin over his mail, braided blond beard, cold dawn light on his face. Behind him, out of focus deep in the camp beside a felt tent, stands a thin 9-year-old girl in a dark red Alanic caftan with two long dark braids — her face turned away, nothing on her neck. 135mm lens, shallow depth of field.

Photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics), anamorphic 2.39:1, subtle film grain, volumetric fog. No text, no watermark.
```

### Кадр 17 · 0:55 · Титул
```
Title card on pure black: the single word "GORGASALI" carved into a dark rough stone slab in ancient Georgian Asomtavruli-inspired capital letterforms, like the 5th-century Bolnisi inscription — angular, monumental, chiseled grooves with faint traces of rust and soot, lit by a low raking cold light from the side. Centered composition, lots of black negative space around it.

Photorealistic CG render, anamorphic 2.39:1, subtle film grain. No other text, no watermark.
```
*Примечание:* нейросети плохо рисуют точные буквы. Финальный логотип лучше сделать дизайнеру шрифтом на основе асомтаврули, а этот кадр использовать только как референс фактуры.

---

## Чек-лист раскадровки
- [ ] Глаз с янтарным клинышком совпадает в кадрах 4, 9, 10a, 10b, 13
- [ ] Крестик: на шее (5) → в грязи (7) → на Вахтанге (11) → нет на сестре (16b)
- [ ] Бакатар ночью (5) узнаётся в Бакатаре на рассвете (16)
- [ ] Каспи (2, 3, 5, 8) и Дарьял (11–15) одинаковые от кадра к кадру: подложки LOC
- [ ] Часть 1 только тёплая, часть 3 только холодная (кроме луча на клинке)
- [ ] Нет стремян, чохи, купольных храмов, золота на шлеме; у шлема открытое лицо
