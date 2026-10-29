"""PNG → JPG в лимит веса Ozon: десктоп 150 КБ, мобильный и нативный 120 КБ.
usage: python3 compress.py <png_dir> <jpg_dir>"""
import glob, io, os, sys
from PIL import Image

LIM = {'desktop': 150, 'mobile': 120, 'native': 120}
src, dst = sys.argv[1:3]
for f in sorted(glob.glob(os.path.join(src, '*.png'))):
    k = os.path.basename(f).split('_')[-2]
    im = Image.open(f).convert('RGB')
    lo, hi, best = 40, 95, None
    while lo <= hi:
        q = (lo + hi) // 2
        b = io.BytesIO()
        im.save(b, 'JPEG', quality=q, optimize=True, progressive=True, subsampling=2)
        if b.tell() <= LIM[k] * 1000:
            best, lo = b.getvalue(), q + 1
        else:
            hi = q - 1
    open(os.path.join(dst, os.path.basename(f)[:-4] + '.jpg'), 'wb').write(best)
