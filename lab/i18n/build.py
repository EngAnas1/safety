#!/usr/bin/env python3
"""Build the English and Urdu copies of the fire lab from the Arabic source.

fire-ar.js is the only file to edit by hand. Every run of Arabic text in it
(split at quotes, HTML tags and ${…}) is looked up, in order of first
appearance, in fire_tr.py, and fire-en.js / fire-ur.js are written next to it.
The build fails if the Arabic source has segments the table doesn't cover,
or if any Arabic letter survives in the English copy.

    python3 lab/i18n/build.py
"""
import re, sys, pathlib
here = pathlib.Path(__file__).resolve().parent
lab = here.parent
sys.path.insert(0, str(here))
from fire_tr import T

A = '؀-ۿﭐ-﷿ﹰ-﻿'
SEG = re.compile(r'[' + A + r'][^<>`\'"${}\n\\]*?(?=[<>`\'"${}\n\\]|$)')
src = (lab / 'fire-ar.js').read_text(encoding='utf-8')

order = []
for m in SEG.finditer(src):
    t = m.group().rstrip(' ')
    if t not in order: order.append(t)
if len(order) != len(T):
    sys.exit(f'fire_tr.py has {len(T)} entries but fire-ar.js has {len(order)} segments; update the table')

# Source-level fixes where word order or direction differs from Arabic
RAW = {
  'en': [("t.n.replace('طفاية ','')", "t.n.replace(/ extinguisher$/,'')"),
         ('grid-template-columns:repeat(5,1fr);direction:rtl', 'grid-template-columns:repeat(5,1fr);direction:ltr'),
         ('margin-left:8px">${v.c}', 'margin-right:8px">${v.c}')],
  'ur': [("t.n.replace('طفاية ','')", "t.n.replace(/ کا آلہ$/,'')")],
}

for li, lang in enumerate(('en', 'ur')):
    s = src
    for a, b in RAW[lang]:
        assert s.count(a) == 1, (lang, a); s = s.replace(a, b)
    table = {k: v[li] for k, v in zip(order, T) if v[li] is not None}
    def sub(m):
        t = m.group(); core = t.rstrip(' ')
        return table[core] + t[len(core):] if core in table else t
    out = SEG.sub(sub, s)
    if lang == 'en':
        left = re.findall('[' + A + ']+', out)
        if left: sys.exit(f'Arabic left in English build: {left[:10]}')
    (lab / f'fire-{lang}.js').write_text(f'/* GENERATED from fire-ar.js by i18n/build.py; do not edit */\n' + out, encoding='utf-8')
    print(f'fire-{lang}.js written')
