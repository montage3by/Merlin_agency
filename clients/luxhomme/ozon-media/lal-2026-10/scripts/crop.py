"""Вырезает баннеры из скринов кабинета Ozon. usage: python3 -I crop.py <screens_dir> <out_dir>"""
import sys, os
from PIL import Image
SRC, OUT = sys.argv[1:3]
# скрин -> (файл, рамка баннера на скрине 2000x1250)
L, R = (29, 615, 458, 794), (239, 618, 668, 797)
MAP = {"viplatb2": ("28.webp", L), "aerogril": ("30.webp", L), "robot": ("33.webp", L),
       "shvabra": ("35.webp", R), "vacclcompact": ("37.webp", R), "vaccldry": ("38.webp", R), "vacclwash": ("41.webp", R)}
for k, (f, box) in MAP.items():
    Image.open(os.path.join(SRC, f)).convert("RGB").crop(box).save(os.path.join(OUT, k + ".png"), optimize=True)
print("ok")
