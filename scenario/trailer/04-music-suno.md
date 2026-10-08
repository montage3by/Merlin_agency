# «Горгасали» — музыка трейлера (Suno)

**Задача:** эпичный и при этом очень драматичный грузинский хор для трейлера длиной ~58 с. Средневековое звучание, грузинские мотивы.

## Музыкальная драматургия (под монтаж)

| Время | Что в кадре | Что в музыке |
|---|---|---|
| 0:00–0:03 | орёл над горами | ветер, клёкот (SFX), музыки нет |
| 0:03–0:25 | орёл над аланами, нырок в Каспи, сестру уводят | **один женский голос**: плач в духе сванского **«Зари»** и колыбельной **«Иавнана»**, без инструментов. Провал на крике сестры |
| 0:25–0:32 | глаз, огонь → рассвет | голос обрывается, низкий гул, вдох |
| 0:32–0:51 | Вахтанг, шлем, меч, войско | **мужская полифония**: три голоса и бурдон-бас (*бани*), барабаны (*доли*), нарастание |
| 0:51–0:55 | Бакатар натягивает лук | **провал**, только гул и один удар |
| 0:55–0:58 | логотип | удар барабана, тишина, вой волка (это звук, не музыка) |

**Грузинские инструменты для промпта:** *panduri* и *chonguri* (щипковые), *salamuri* (флейта), *duduki* (грузинский дудук), *doli* (барабан), *chiboni* (волынка).

**Грузинские слова в тексте** (латиницей, так Suno поёт лучше):
- *Iavnana* — колыбельный рефрен; в народной традиции этой песней ещё и лечили детей.
- *dao, chemo dao* — «сестра, моя сестра».
- *mgelo* — «волк!» (звательный падеж).
- *Gmerto* — «Боже».
- *Gorgasali*.
- Вокализы грузинской полифонии: *o-de-la, va-ra-di-la, o-ri-ra*.

---

## Вариант 1 · Главный: структура под трейлер

**Style of Music** (поле стиля):
```
epic dramatic cinematic trailer, Georgian medieval polyphony, deep male choir in three-part Georgian folk harmony over a low drone bass, solo female lament a cappella, Svan funeral chant, tragic and heroic, slow build to massive war drums, doli, taiko, panduri, chonguri, salamuri flute, duduki, low strings, brass swells, dark, 5th century Caucasus
```

**Exclude Styles** (если доступно):
```
pop, EDM, trap, rap, autotune, modern beat, synth lead, happy
```

**Lyrics:**
```
[Intro]
[Solo female voice, a cappella, distant, mourning lament]
Iavnana... vardo nana...
Iavnana... dao... chemo dao...

[Break]
[Silence, low rumble]

[Build]
[Deep male choir enters, three-part Georgian polyphony, low drone]
O-de-la... va-ra-di-la...
Gmerto... Gmerto...

[Drums enter, war drums, rising]
O-ri-ra... o-ri-ra...
Mgelo... mgelo...

[Climax]
[Full male choir, powerful, heroic, massive drums, strings and brass]
Gorgasali! Gorgasali!
Dao... chemo dao!

[Hard stop]
[Silence]

[Outro]
[Single drum hit, distant wolf howl]
```

---

## Вариант 2 · Чистая полифония a cappella + барабаны

Только голоса и ударные, без оркестра. Звучит архаичнее и «грузиннее».

**Style of Music:**
```
a cappella Georgian polyphonic choir, ancient medieval chant, Svan funeral song Zari style, raw male voices with dissonant three-part harmony, solo female lament, slow tempo, deep frame drums and doli, dramatic, mournful, warrior hymn, cinematic trailer
```

**Lyrics:**
```
[Intro]
[Solo female voice, raw, mourning]
Iavnana... dao...

[Verse]
[Male choir, slow, dissonant Georgian harmony]
O-de-la... o-de-la...
Gmerto, Gmerto...

[Build]
[Frame drums, stomping, rising tempo]
Va-ra-di-la... mgelo...

[Climax]
[All voices, loud, triumphant]
Gorgasali!

[End]
```

---

## Вариант 3 · Инструментал (подложка под монтаж)

Включить переключатель **Instrumental**.

**Style of Music:**
```
dark epic cinematic trailer score, Georgian medieval folk instruments, duduki lament melody, salamuri flute, panduri and chonguri ostinato, chiboni bagpipe drone, low choir pads, slow build, huge war drums, taiko, low brass, tragic heroic, Caucasus mountains, ancient battle
```

---

## Советы по Suno

1. **Точные таймкоды Suno не попадает.** Генерируйте 1–2 минуты, выбирайте дубль с лучшим нарастанием, а потом режьте под монтаж: провалы на 0:25 и 0:51 проще сделать при сведении.
2. **Генерируйте по 4–6 дублей** на вариант. Грузинская полифония получается «через раз».
3. **Скачайте стемы (stems)** у лучшего дубля: женский голос, хор и барабаны отдельно. Так можно собрать идеальную версию из нескольких дублей.
4. **Женский плач отдельно.** Если вступление не выходит, сгенерируйте его отдельным коротким треком (вариант 2 только с секцией Intro) и подложите в начало.
5. **Клёкот орла, ветер, вой волка и дыхание ребёнка** — это звуковые эффекты, их лучше взять из SFX-библиотеки, а не из Suno.
6. **Референсы для слуха:** сванское «Зари» (погребальное), «Чакрули» (кахетинская полифония), «Иавнана» (колыбельная), а также синематики «Ведьмака 3» и «Тайной войны».
