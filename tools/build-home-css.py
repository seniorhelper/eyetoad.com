#!/usr/bin/env python3
"""Rebuild /home.css for the homepage: eta.min.css + page.css + eta-agent-scenes.css, with the
metric-matched fallback families spliced into the font stacks (the @font-face rules live inline in
index.html). Run after editing any of the three source files, then re-extract the inline critical CSS."""
import os, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(n): return open(os.path.join(R, n), encoding='utf-8').read().rstrip('\n')
FALLBACKS = [
    (re.compile(r"(?<![\w\-'\"])Inter\s*,"), 'Inter,"Inter Fallback",'),
    (re.compile(r"(['\"])Inter\1\s*,"), 'Inter,"Inter Fallback",'),
    (re.compile(r"(['\"])DM Serif Display\1\s*,"), '"DM Serif Display","DM Serif Display Fallback",'),
    (re.compile(r"(?<![\w\-'\"])Caveat\s*,"), 'Caveat,"Caveat Fallback",'),
    (re.compile(r"(['\"])Caveat\1\s*,"), 'Caveat,"Caveat Fallback",'),
    (re.compile(r"(?<![\w\-'\"])Fraunces\s*,"), 'Fraunces,"Fraunces Fallback",'),
    (re.compile(r"(['\"])Fraunces\1\s*,"), 'Fraunces,"Fraunces Fallback",'),
    (re.compile(r"(?<![\w\-'\"])Outfit\s*,"), 'Outfit,"Outfit Fallback",'),
    (re.compile(r"(['\"])Outfit\1\s*,"), 'Outfit,"Outfit Fallback",'),
]
def with_fallbacks(css):
    for rx, rep in FALLBACKS: css = rx.sub(rep, css)
    return css
if __name__ == '__main__':
    hdr = '/* home.css: eta.min.css + page.css + eta-agent-scenes.css concatenated for the homepage (one stylesheet, loaded after the first interaction; the inline critical block covers first paint). Built by tools/build-home-css.py; edit the three source files, then rebuild. */'
    out = hdr + '\n/* ---- eta.min.css ---- */\n' + rd('eta.min.css') + '\n/* ---- page.css ---- */\n' + rd('page.css') + '\n/* ---- eta-agent-scenes.css ---- */\n' + rd('eta-agent-scenes.css') + '\n'
    out = with_fallbacks(out)
    open(os.path.join(R, 'home.css'), 'w', encoding='utf-8').write(out)
    print('home.css', len(out), 'bytes; fallback refs', out.count('Fallback'))
