# «Горгасали» — промпты персонажей для Nano Banana

Референс-листы персонажей трейлера (`02-shot-list.md`). Задача листов — держать **одинаковые лица и костюмы во всех кадрах раскадровки**.

## Как работать

1. **Сначала мастер-листы, потом кадры.** Генерируем лист персонажа: несколько ракурсов на нейтральном фоне. Лучший вариант сохраняем и **подаём его как референс-изображение** во все кадры с этим персонажем.
2. **Порядок генерации:**
   1. **V16** (Вахтанг, 16 лет) — главное лицо, мастер-эталон.
   2. **V10**: подаём лист V16 и просим «тот же мальчик в 10 лет». Так лица совпадут.
   3. **Шлем**, затем **крестик** (реквизит).
   4. **MIR9**, затем MIR3 по листу MIR9.
   5. ART, BAK, массовка.
3. **Один промпт — одна правка.** Nano Banana хорошо редактирует по шагам («сделай шрам тоньше», «поверни голову на три четверти»). Не переписывайте весь промпт целиком, иначе лицо «уплывёт».
4. **Пишем по-английски**, полными предложениями (модель лучше понимает описание, чем список тегов).
5. Формат листов — **16:9**, кадров раскадровки — **21:9** (если доступно), иначе 16:9 с кашетированием.

---

## Общий стилевой блок

Добавлять в конец **каждого** промпта:

```
Style: photorealistic AAA game CG cinematic in the style of Digic Pictures and Platige Image (The Witcher 3 cinematics, Assassin's Creed cinematic trailers, Love Death + Robots "The Secret War"). Physically based rendering, realistic skin with visible pores, fine scars and stubble, worn and dirty fabrics, subtle film grain. Historically grounded Late Antique Caucasus, 5th century AD, Kingdom of Iberia (Kartli, eastern Georgia).
```

**Добавка для листов персонажей:**
```
Character reference sheet on a neutral mid-grey studio background, soft even key light with gentle rim light, no text, no logos, no watermark.
```

**Анти-анахронизмы** (добавлять в промпты с костюмом и конями):
```
Strictly no stirrups, no Georgian chokha with cartridge loops, no papakha, no Gothic plate armor, no fantasy glowing effects.
```

---

## V16 · Вахтанг, 16 лет (главный эталон)

```
Character reference sheet of Vakhtang, a 16-year-old prince of 5th-century Caucasian Iberia, shown in four views: front full body, three-quarter full body, side profile full body, and a large close-up portrait of the face.

He is unusually tall and broad-shouldered for his age, athletic, already the size of a grown warrior but with a young face. Olive skin weathered by wind and sun. Dark brown, slightly wavy hair falling to the shoulders. Thick dark eyebrows, straight strong nose, firm jaw, the first sparse dark stubble on the chin and upper lip. Deep-set dark brown eyes; in the left iris, a small distinctive amber-gold fleck right next to the pupil, clearly visible in the close-up. A thin fresh scar above the right eyebrow. Serious, closed, determined expression — grief turned into resolve, he does not smile.

Costume: knee-length riveted iron mail shirt over a quilted padded under-tunic, a lamellar breastplate of small dark steel plates laced with leather over the mail, dark wool trousers tucked into soft leather riding boots. A heavy dark charcoal wool cloak pinned on the right shoulder with a simple bronze fibula. Broad leather belt with small iron plaques and hanging straps carrying a long straight double-edged sword in a plain dark scabbard. Leather riding gloves. Around his neck, on a new leather cord, a tiny worn bronze cross — a child's cross, too small for him.

He holds no helmet in this sheet.
```
+ стилевой блок + блок листа + анти-анахронизмы

**Проверка:** янтарное пятнышко в **левом** глазу, шрам над **правой** бровью, детский крестик на шее.

---

## V10 · Вахтанг, 10 лет

*Подать мастер-лист V16 как референс.*

```
Using the attached reference sheet, create a character reference sheet of the SAME person as a 10-year-old boy: same face structure, same deep-set dark brown eyes with the same small amber-gold fleck next to the pupil in the left iris, same thick dark eyebrows and straight nose, but childlike proportions and soft round cheeks. No scar yet, no stubble. Dark brown hair, a bit shorter, tangled.

Views: front full body, three-quarter full body, and a large close-up of the face with a frightened, wide-eyed expression, one hand pressed over his own mouth.

Costume: a simple long undyed off-white wool tunic reaching below the knee, belted with a thin leather cord, soft leather shoes. No jewelry. His face, hands and tunic are streaked with soot and dust, as if he has been hiding during a night fire.
```
+ стилевой блок + блок листа

**Проверка:** тот же глаз с пятнышком, лицо узнаётся как V16 в детстве.

---

## HELM · Шлем «волчья голова» (реквизит)

```
Prop reference sheet of a 5th-century Late Antique Caucasian war helmet, shown from front, three-quarter and side views, plus a close-up of the wolf face.

A segmented spangenhelm of dark blackened forged steel with a slightly pointed crown and riveted iron bands. The entire front of the helmet is forged into the snarling head of a wolf: the wolf's brow and snout form the face guard, the bared iron fangs frame the lower edge, and two narrow eye slits sit exactly where the wolf's eyes would be, so the wearer looks out through the wolf's eyes. Short pointed wolf ears forged at the top of the brow. A riveted iron mail aventail hangs from the back and sides down to the shoulders.

Battle-worn and functional, not decorative: hammer marks, scratches, a dent on the left side, traces of rust in the rivets. No gold, no gilding, no lion, no glowing eyes, no fantasy spikes.
```
+ стилевой блок + `Prop reference sheet on a neutral mid-grey studio background, no text.`

---

## CROSS · Крестик Мирандухт (реквизит)

```
Macro prop photograph of a tiny child's pectoral cross from 5th-century Georgia, about 2 cm tall, cast in bronze, in the shape of the Bolnisi cross: four equal arms that flare outward in curves from a narrow center, enclosed in a thin circle. Worn smooth by touch, small dent on one arm, hanging on a thin twisted dark linen cord. Shown twice: once clean on grey background, once lying in dark mud with orange firelight reflecting in the metal.
```
+ стилевой блок

---

## MIR9 · Мирандухт, 9 лет

```
Character reference sheet of Mirandukht, a 9-year-old girl, princess of 5th-century Iberia, held for six years as a captive among the Alans of the North Caucasus. Views: front full body, three-quarter full body, back view, and a close-up portrait.

Same family features as her brother: dark brown eyes, thick dark eyebrows, straight nose, olive skin. Long dark brown hair in two thick braids. Thin, watchful, quiet, older than her years.

Costume: Alanic steppe clothing — a long dark red wool caftan wrapping across the chest, edged with a band of woven pattern, belted with a leather belt with small bronze plaques, felt boots, a small round felt cap with a fur rim. Nothing on her neck — no cross.
```
+ стилевой блок + блок листа

## MIR3 · Мирандухт, 3 года

*Подать лист MIR9 как референс.*

```
Using the attached reference sheet, create a character reference sheet of the SAME girl at 3 years old: chubby toddler face, same dark brown eyes and thick dark eyebrows, short tousled dark brown hair. Views: front full body, three-quarter full body, close-up face crying with mouth open and one arm stretched out reaching toward the viewer.

Costume: a simple long light cream linen shift with long sleeves, barefoot. Around her neck on a thin twisted dark linen cord, the tiny bronze Bolnisi-style cross from the attached prop sheet.
```
+ стилевой блок + блок листа

---

## ART · Артаваз, молочный брат

```
Character reference sheet of Artavaz, a 19-year-old warrior of 5th-century Iberia, foster-brother and closest companion of the young king. Views: front full body, three-quarter full body, side profile, close-up portrait.

Lean, wiry and strong, a little shorter than the king. Sun-darkened skin, short dark beard trimmed close, dark hair tied back at the nape, sharp dark eyes, a broken nose that healed slightly crooked. Calm, loyal, economical in movement — a man who answers with a nod rather than words.

Costume: lamellar armor of small hardened-leather plates laced with rawhide over a quilted tunic, leather vambraces, dark wool trousers, soft riding boots, a short brown wool cloak. A composite recurve bow in a combined leather bow-case and quiver (gorytos) on his left hip, a short sword and a narrow axe on the belt. No helmet.
```
+ стилевой блок + блок листа + анти-анахронизмы

---

## BAK · Бакатар, богатырь осов

```
Character reference sheet of Bakatar, an Alan champion of the 5th-century North Caucasus — a true giant, almost twice the height of a normal man (show a normal-sized warrior standing next to him for scale in one view). Views: front full body, three-quarter full body with the scale figure, close-up portrait.

Massive heavy frame, long fair-blond hair and a braided blond beard, pale eyes, weathered ruddy skin, old scars across the cheek. Calm, contemptuous confidence.

Costume: long riveted mail shirt over a quilted caftan, a heavy bearskin over the shoulders, wide leather belt with bronze plaques, a typical Alanic narrow-bladed battle axe with a hammer-shaped butt on the belt. In his hands an enormous composite recurve bow of horn, sinew and wood with bone plates, about 2.5 meters long — taller than he is — and a quiver of arrows as long as spears.
```
+ стилевой блок + блок листа

---

## RAID · Налётчики: ос и гунн (массовка)

```
Character reference sheet of two 5th-century steppe raiders from the North Caucasus, side by side, each in front and three-quarter view.

Left — an Alan horseman: tall, fair-haired, mail shirt over a wool caftan, fur cap, narrow-bladed axe with hammer butt, long straight sword, composite bow.

Right — a Hunnic horseman: an artificially elongated, deformed skull sloping backward (Hunnic cranial deformation), shaved head with a small topknot, narrow eyes, weathered face, sheepskin coat over a wool tunic, trousers and soft boots, small gold plaques sewn on the collar, a pear-shaped lamellar helmet held under the arm, a short composite bow and gorytos, a leather riding whip.

Both look dangerous and real, not cartoonish.
```
+ стилевой блок + блок листа

---

## ARMY · Войско Картли (массовка)

```
Character reference sheet of three soldiers of the 5th-century Iberian (Georgian) army, each in front and three-quarter view:

1) Heavy cavalryman: knee-length mail shirt, lamellar breastplate, segmented spangenhelm with mail aventail covering the lower face, long lance, long sword, bow case; his horse in a quilted horse armor caparison, saddle with high front and back arches, no stirrups.

2) Infantryman: quilted padded coat, leather cap, large wicker shield covered in hide painted with a red Bolnisi cross, spear and short axe.

3) Highland ally from the mountains of Pshavi: rough undyed wool tunic, heavy felt cloak and fur hat, long hair and beard, battle axe and bow, no armor.
```
+ стилевой блок + блок листа + анти-анахронизмы

---

## NURSE · Рука кормилицы (вставка, кадр 6)

```
Close-up photorealistic insert shot: a strong weathered woman's hand with a simple worn copper bracelet grips a 10-year-old boy's shoulder (off-white wool tunic streaked with soot) and pulls him back into darkness under a wooden cart. Orange firelight flickers through the cart planks. Her face is not visible.
```
+ стилевой блок

---

## Чек-лист перед раскадровкой
- [ ] V16 одобрен как мастер-лицо (глаз, шрам, крестик)
- [ ] V10 узнаётся как тот же человек
- [ ] Шлем: волк, тёмная сталь, без золота и без льва
- [ ] Крестик одинаковый на MIR3, в грязи и на V16
- [ ] Нигде нет стремян и чохи
- [ ] Бакатар реально великан (есть масштабная фигура)

**Следующий шаг после одобрения листов:** промпты на 17 кадров раскадровки, каждый с указанием, какие листы подавать как референс.
