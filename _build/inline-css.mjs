// Inner pages: inline a trimmed copy of /eta.min.css (+ the page's own page.css)
// so nothing blocks first paint, put body text on the system font stack, and
// serve the brand faces from /fonts/ like the homepage does.
//
// Re-run after editing /eta.min.css or any page.css:  cd _build && npm i && node inline-css.mjs
// The sources for each page are kept on <style id="eta-css" data-src="...">.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PurgeCSS } from 'purgecss';

const ROOT = process.env.ETA_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const SYS = 'system-ui,-apple-system,Roboto,Arial';

// Inter -> system stack, and metric-matched fallbacks behind Fraunces / Outfit.
export function fixFonts(s) {
  s = s.replace(/(font(?:-family)?\s*:[^;}"<>]*?)(['"]?)Inter\2(?=\s*[,;}"'!]|\s*$)/g, `$1${SYS}`);
  s = s.replace(/(font-family=(["']))([^"']*?)Inter\b/g, `$1$3${SYS}`);
  s = s.replace(/(font(?:-family)?\s*:[^;}"<>]*?)(['"]?)(Fraunces|Outfit)\2(?=\s*,)(?!\s*,\s*\3 Fallback)/g, '$1$3,$3 Fallback');
  return s;
}

const FONTS = '<style id="eta-fonts">' + [
  ['Fraunces', 700, 'fraunces-700'], ['Fraunces', 900, 'fraunces-900'],
  ['Outfit', 400, 'outfit-400'], ['Outfit', 500, 'outfit-500'], ['Outfit', 600, 'outfit-600'],
  ['Outfit', 700, 'outfit-700'], ['Outfit', 800, 'outfit-800'],
].map(([f, w, file]) => `@font-face{font-family:"${f}";font-style:normal;font-weight:${w};font-display:optional;src:url(/fonts/${file}.woff2) format("woff2")}`).join('') +
  '@font-face{font-family:Fraunces Fallback;src:local(Georgia),local(Gelasio),local(Liberation Serif),local(Times New Roman),local(Noto Serif);size-adjust:95.45%;ascent-override:102.46%;descent-override:26.72%;line-gap-override:0%}' +
  '@font-face{font-family:Outfit Fallback;src:local(Arial),local(Liberation Sans),local(Helvetica Neue),local(Helvetica),local(Roboto);size-adjust:100.16%;ascent-override:99.84%;descent-override:25.96%;line-gap-override:0%}' +
  '</style>';

const VISOR = '<div class="vr vr-img" role="group" aria-label="Domain tools"><img src="/images/domain-tools-visor.webp" width="584" height="148" alt="" decoding="async" fetchpriority="low">' +
  '<a class="vr-l" style="left:4%;width:33.5%" href="https://www.buyweburl.com/" target="_blank" rel="nofollow noopener"><span class="sr">Domain finder (opens buyweburl.com)</span></a>' +
  '<a class="vr-l" style="left:40.5%;width:33.5%" href="https://bestdomainsforbusiness.com/" target="_blank" rel="nofollow noopener"><span class="sr">Premium domain names (opens bestdomainsforbusiness.com)</span></a></div>';
const VISOR_CSS = '.sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}' +
  '.vr-img{position:relative;display:block;flex:none;width:252px;height:64px}.vr-img img{display:block;width:100%;height:100%}' +
  '.vr-l{position:absolute;top:18%;height:62%;border-radius:10px}.vr-l:focus-visible{outline:3px solid #4ADE80;outline-offset:2px}';

// Scripts that add classes at runtime; their tokens count as "used".
const SHARED_JS = ['eta-site.js', 'iris.js', 'mascot.js'].map(read).join('\n');

function minify(css) {
  // leave quoted strings (content:"...") untouched
  return css.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/).map((part, i) => i % 2 ? part
    : part.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}'))
    .join('').trim();
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name.startsWith('_') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const GF = /<link rel="(?:preload|stylesheet)"(?: as="style")? href="https:\/\/fonts\.googleapis\.com\/css2\?family=Fraunces[^"]*"[^>]*>|<noscript><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Fraunces[^"]*"><\/noscript>/g;
const PRECONNECT = /<link rel="preconnect" href="https:\/\/fonts\.(?:googleapis|gstatic)\.com"(?: crossorigin)?>\n?/g;

let n = 0, total = 0;
for (const file of walk(ROOT)) {
  const rel = '/' + path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel === '/index.html') continue; // homepage has its own hand-trimmed CSS
  let html = fs.readFileSync(file, 'utf8');
  const orig = html;

  // sources: an earlier run's marker, or the stylesheet links
  let srcs;
  const mark = html.match(/<style id="eta-css" data-src="([^"]+)">[\s\S]*?<\/style>/);
  if (mark) srcs = mark[1].split(' ');
  else {
    srcs = [...html.matchAll(/<link rel="stylesheet" href="(\/(?:eta\.min\.css|[a-z0-9/-]*page\.css))(?:\?[^"]*)?">/g)].map((m) => m[1]);
    if (!srcs.includes('/eta.min.css')) continue;
  }

  // fonts
  const jb = /<link[^>]*fonts\.googleapis\.com\/css2\?[^"]*JetBrains/.test(html);
  html = html.replace(GF, '');
  if (!jb) html = html.replace(PRECONNECT, '');
  else if (!html.includes('family=JetBrains+Mono:wght@500;700&display=swap" media')) {
    html = html.replace(/(<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n?)/,
      `$1<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap" media="print" onload="this.media='all'">\n`);
  }
  html = fixFonts(html);
  // top-bar visor: one WebP with the two links laid over it, like the homepage (the SVG had filters and patterns)
  html = html.replace(/<svg class="vr"[\s\S]*?<\/svg>(?=<a class="bbb-seal")/, () => VISOR);

  // trimmed CSS
  const scripts = [...html.matchAll(/<script[^>]*src="(\/[^"?]+)/g)].map((m) => m[1])
    .filter((s) => fs.existsSync(path.join(ROOT, s))).map((s) => read(s)).join('\n');
  const css = fixFonts(srcs.map(read).join('\n'));
  const [res] = await new PurgeCSS().purge({
    content: [{ raw: html.replace(/<style id="eta-css"[\s\S]*?<\/style>/, ''), extension: 'html' },{ raw: scripts + '\n' + SHARED_JS, extension: 'js' }],
    css: [{ raw: css }],
    keyframes: true,
    safelist: { standard: [/^fmsg/], greedy: [/^ir-/, /^iris/] },
  });
  // links inside running text are underlined, so they are not told apart by color alone
  const extra = (html.includes('vr-img') ? VISOR_CSS : '') + 'main :is(p,li,dd,td,figcaption,small,span,.fact-v,.yd-why)>a:not([class]){text-decoration:underline;text-underline-offset:2px}';
  const tag = `<style id="eta-css" data-src="${srcs.join(' ')}">${minify(res.css)}${extra}</style>`;

  if (mark) html = html.replace(/<style id="eta-css" data-src="[^"]+">[\s\S]*?<\/style>/, () => tag);
  else {
    let placed = false;
    for (const s of srcs) {
      html = html.replace(new RegExp(`<link rel="stylesheet" href="${s.replace(/[.]/g, '\\.')}(?:\\?[^"]*)?">\\n?`), () => {
        if (placed) return '';
        placed = true;
        return tag + '\n';
      });
    }
  }
  if (!html.includes('<style id="eta-fonts">')) html = html.replace(tag, () => FONTS + '\n' + tag);

  if (html !== orig) { fs.writeFileSync(file, html); n++; }
  total += res.css.length;
}
console.log(`updated ${n} pages`);
