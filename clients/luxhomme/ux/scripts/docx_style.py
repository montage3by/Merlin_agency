"""Доводка docx после pandoc: явные границы таблиц, шапка с заливкой, шрифт Arial, заголовки.
usage: python3 docx_style.py in.docx out.docx"""
import re
import sys
import zipfile

src, dst = sys.argv[1:3]
zin = zipfile.ZipFile(src)
files = {n: zin.read(n) for n in zin.namelist()}

ARIAL = '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial" />'

# styles.xml: шрифт по умолчанию, заголовки
st = files['word/styles.xml'].decode()
st = re.sub(r'<w:rFonts [^>]*Theme[^>]*/>', ARIAL, st)
st = re.sub(r'(<w:rPrDefault>\s*<w:rPr>.*?<w:sz w:val=")24(" />\s*<w:szCs w:val=")24', r'\g<1>22\g<2>22', st, flags=re.S)
colors = {'Heading1': ('2A2A2A', '36'), 'Heading2': ('4F5630', '30'), 'Heading3': ('4F5630', '26'), 'Title': ('2A2A2A', '40')}
for sid, (col, sz) in colors.items():
    m = re.search(r'(<w:style [^>]*w:styleId="%s".*?</w:style>)' % sid, st, flags=re.S)
    if not m:
        continue
    blk = m.group(1)
    nb = re.sub(r'<w:color [^>]*/>', '<w:color w:val="%s" />' % col, blk)
    nb = re.sub(r'<w:sz w:val="\d+" />', '<w:sz w:val="%s" />' % sz, nb)
    nb = re.sub(r'<w:szCs w:val="\d+" />', '<w:szCs w:val="%s" />' % sz, nb)
    st = st.replace(blk, nb)
files['word/styles.xml'] = st.encode()

# document.xml: таблицы
doc = files['word/document.xml'].decode()
BORDERS = ('<w:tblBorders>' + ''.join(
    '<w:%s w:val="single" w:sz="4" w:space="0" w:color="BFBAA8" />' % s
    for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV')) + '</w:tblBorders>'
    '<w:tblCellMar><w:top w:w="80" w:type="dxa" /><w:left w:w="120" w:type="dxa" />'
    '<w:bottom w:w="80" w:type="dxa" /><w:right w:w="120" w:type="dxa" /></w:tblCellMar>')


def fix_tblpr(m):
    t = m.group(0)
    t = re.sub(r'<w:tblBorders>.*?</w:tblBorders>', '', t, flags=re.S)
    t = re.sub(r'<w:tblCellMar>.*?</w:tblCellMar>', '', t, flags=re.S)
    t = re.sub(r'<w:tblW [^>]*/>', '<w:tblW w:w="5000" w:type="pct" />', t)
    return t.replace('</w:tblPr>', BORDERS + '</w:tblPr>')


doc = re.sub(r'<w:tblPr>.*?</w:tblPr>', fix_tblpr, doc, flags=re.S)


def fix_header_row(m):
    row = m.group(0)
    row = re.sub(r'<w:tcPr>', '<w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="DDD7C1" />', row)
    row = re.sub(r'<w:tc>(?!<w:tcPr>)', '<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="DDD7C1" /></w:tcPr>', row)
    row = re.sub(r'<w:r>(?!<w:rPr>)', '<w:r><w:rPr><w:b /></w:rPr>', row)
    row = re.sub(r'<w:r><w:rPr>(?!<w:b />)', '<w:r><w:rPr><w:b />', row)
    return row


# первая строка каждой таблицы
def fix_table(m):
    tbl = m.group(0)
    return re.sub(r'<w:tr>.*?</w:tr>', fix_header_row, tbl, count=1, flags=re.S)


doc = re.sub(r'<w:tbl>.*?</w:tbl>', fix_table, doc, flags=re.S)
# строки таблиц не разрываются между страницами
doc = doc.replace('<w:tr><w:trPr>', '<w:tr><w:trPr><w:cantSplit />')
doc = re.sub(r'<w:tr>(?!<w:trPr>)', '<w:tr><w:trPr><w:cantSplit /></w:trPr>', doc)
doc = doc.replace('<w:tcPr />', '<w:tcPr></w:tcPr>')
files['word/document.xml'] = doc.encode()

with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as z:
    for n, b in files.items():
        z.writestr(n, b)
print('tables:', doc.count('<w:tbl>'))
