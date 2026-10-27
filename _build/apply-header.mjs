// Puts the Oct 2026 universal header on every page (idempotent: rerun after editing _build/header/*).
// - removes the old top bar (.ubar), old <header class="hdr"> and the old phone menu (#mobNav)
// - inserts the new header between <!--eh:start--> and <!--eh:end-->, inlines _build/header/eta-hdr.css,
//   adds /eta-hdr.js, turns off the Iris stub, and gives old page scripts harmless stand-ins for #hdr/#burger/#mobNav
// Usage: cd _build && node apply-header.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);
const css = fs.readFileSync('_build/header/eta-hdr.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').trim();
const files = execSync('git ls-files "*.html"').toString().trim().split('\n');
const jsFiles = execSync('git ls-files "*.js"').toString().trim().split('\n').filter(f => !f.startsWith('_build/'));

const BBB_URL = 'https://www.bbb.org/us/co/denver/profile/advertising-agencies/search-converts-llc-1296-90228702/#sealclick';
const BBB_IMG = 'https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-200-65-bbb-90228702.png';
const PHONE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>';
const CHEV = '<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const BRAND = ['#DC2626', '#F97316', '#FACC15', '#16A34A', '#2563EB', '#7C3AED'];

// color bars, blended across the six brand colors and lightened so blue bars still read on blue
function mix(t, w) {
  const p = t * (BRAND.length - 1), i = Math.min(BRAND.length - 2, Math.floor(p)), f = p - i, a = BRAND[i], b = BRAND[i + 1];
  const h = x => parseInt(x, 16), c = k => Math.round((h(a.slice(k, k + 2)) * (1 - f) + h(b.slice(k, k + 2)) * f) * (1 - w) + 255 * w);
  return '#' + [1, 3, 5].map(k => c(k).toString(16).padStart(2, '0')).join('');
}
function bars(n) {
  const c = (n - 1) / 2; let out = '';
  for (let i = 0; i < n; i++) { const d = Math.abs(i - c) / c; out += `<i style="--i:${i};--p:${(1 - .62 * d * d).toFixed(2)}"></i>`; }
  return `<span class="eh-bars">${out}</span>`;
}
// the voice box: red LED bars in a dark housing, with cheeks, eyebrows and glasses that only show in moments
function mouth(n, full) {
  return `<span class="eh-mouth" aria-hidden="true">${full ? '<span class="eh-eyes"><i></i><i></i></span><span class="eh-brows"><i></i><i></i></span>' : ''}<span class="eh-vb"><span class="eh-cheek l"></span>${bars(n)}<span class="eh-cheek r"></span></span></span>`;
}

// Services mega menu: same links as the old menu, restyled
const megaSrc = fs.readFileSync('_build/header/services-menu.html', 'utf8').trim();

const NAV = [
  ['/our-work/', 'Our Work'], ['/industries/', 'Industries'], ['/locations/', 'Locations'],
  ['/denver-seo-pricing/', 'Pricing'], ['/about/', 'About'], ['/contact/', 'Contact'],
];
const DOMAINS = `<a href="https://www.buyweburl.com/" target="_blank" rel="nofollow noopener">Domain Finder<small>buyweburl.com</small></a><a href="https://bestdomainsforbusiness.com/" target="_blank" rel="nofollow noopener">Premium Names<small>bestdomainsforbusiness.com</small></a><a href="https://www.buyweburl.com/products/cpanel" target="_blank" rel="nofollow noopener">Hosting<small>cPanel, WordPress and VPS plans</small></a>`;
const call = cls => `<a class="eh-call${cls ? ' ' + cls : ''}" href="tel:18004818638" aria-label="Call 1-800-481-8638"><span class="eh-ic">${PHONE_SVG}</span><span class="eh-ct"><b>1-800-481-8638</b></span></a>`;
const bbb = w => `<a class="eh-bbb" href="${BBB_URL}" target="_blank" rel="nofollow noopener" aria-label="BBB Accredited Business, A+ rating (opens BBB profile)"><img src="${BBB_IMG}" width="200" height="65" alt="BBB Accredited Business, A+ rating" decoding="async"${w ? ' loading="lazy"' : ''}></a>`;

function header(urlPath) {
  const cur = href => (urlPath === href || (href !== '/' && urlPath.startsWith(href))) ? ' aria-current="page"' : '';
  const links = NAV.map(([h, t]) => `<li><a class="eh-nl" href="${h}"${cur(h)}>${t}</a></li>`);
  return `<!--eh:start-->
<header class="eh" id="eh">
<div class="eh-wrap eh-top">
<a class="eh-logo" href="/" aria-label="Eye To Ad Media home"><img src="/images/images/eye-to-ad-media-logo-530.webp" srcset="/images/images/eye-to-ad-media-logo-265.webp 265w, /images/images/eye-to-ad-media-logo-530.webp 530w" sizes="(max-width:360px) 220px, (max-width:420px) 250px, (max-width:700px) 260px, 364px" width="530" height="166" alt="Eye To Ad Media" fetchpriority="high" decoding="async"></a>
<div class="eh-act">${bbb()}${call()}<a class="eh-cta" href="/free-seo-audit/">Get SEO Audit</a><button class="eh-menu" type="button" aria-expanded="false" aria-controls="ehSheet">Menu <i aria-hidden="true"></i></button></div>
</div>
<div class="eh-wrap eh-callrow">${bbb(true)}${call()}</div>
<nav class="eh-nav" aria-label="Main navigation"><div class="eh-wrap"><ul class="eh-ul">
<li class="eh-svc"><a class="eh-nl" href="/services/"${cur('/services/')}>Services</a><button class="eh-chev" type="button" data-eh-drop aria-expanded="false" aria-controls="ehSvc" aria-label="Show services menu">${CHEV}</button><div class="eh-drop eh-mega" id="ehSvc">${megaSrc}</div></li>
${links.slice(0, 3).join('')}
<li class="eh-gap" aria-hidden="true"></li>
${links.slice(3).join('')}
<li><button class="eh-nl" type="button" data-eh-drop aria-expanded="false" aria-controls="ehDom">Domains ${CHEV}</button><div class="eh-drop" id="ehDom">${DOMAINS}</div></li>
<li class="eh-navcta"><a class="eh-cta" href="/free-seo-audit/">Get SEO Audit</a></li>
</ul></div></nav>
<nav class="eh-sheet" id="ehSheet" aria-label="Mobile menu" hidden><div class="eh-wrap"><ul>
<li><a href="/services/">Services</a></li>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="/case-studies/">Case Studies</a></li><li><a href="/blog/">Blog</a></li><li><a href="https://www.buyweburl.com/" target="_blank" rel="nofollow noopener">Domain Finder</a></li><li><a href="https://bestdomainsforbusiness.com/" target="_blank" rel="nofollow noopener">Premium Names</a></li>
</ul><a class="eh-cta" href="/free-seo-audit/">Get SEO Audit</a></div></nav>
<div class="eh-mouthrow" aria-hidden="true"></div>
<div class="eh-ribbon" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
${mouth(19, true)}
</header>
<div class="eh-mini" aria-hidden="true"><div class="eh-mini-in"><div class="eh-wrap"><ul class="eh-ul"><li><a class="eh-nl" href="/services/" tabindex="-1">Services</a></li>${NAV.map(([h, t]) => `<li><a class="eh-nl" href="${h}" tabindex="-1">${t}</a></li>`).join('')}</ul>${bbb(true).replace('<a ', '<a tabindex="-1" ')}${call().replace('<a ', '<a tabindex="-1" ')}<a class="eh-cta" href="/free-seo-audit/" tabindex="-1">Get SEO Audit</a></div></div></div>
<a class="eh-dock" href="/contact/" aria-label="Contact Eye To Ad Media">${mouth(9, false)}</a>
<div class="eh-callbar"><a href="tel:18004818638">${PHONE_SVG}Call 1-800-481-8638</a></div>
<!--eh:end-->`;
}

// remove the element that starts at `start` (an opening tag of `tag`) through its matching close tag
function cutElement(s, start, tag) {
  const re = new RegExp(`<\\/?${tag}\\b`, 'g'); re.lastIndex = start; let d = 0, m;
  while ((m = re.exec(s))) { d += m[0][1] === '/' ? -1 : 1; if (d === 0) { const end = s.indexOf('>', m.index) + 1; return [start, end]; } }
  throw new Error('unclosed ' + tag);
}
const STUB = /((?:\b(?:var|let|const)\s+|,\s*)(?:hdr|burger|mobNav)\s*=\s*document\.getElementById\((['"])(?:hdr|burger|mobNav)\2\))(?!\s*\|\|)/g;
const stubbed = s => s.replace(STUB, "$1||document.createElement('div')");

let changed = 0; const skipped = [];
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8'); const orig = s;
  const hasOld = s.includes('<header class="hdr"'), hasNew = s.includes('<!--eh:start-->');
  if (!hasOld && !hasNew) { skipped.push(f); continue; }
  const urlPath = '/' + f.replace(/index\.html$/, '').replace(/\\/g, '/');
  const body = s.indexOf('<body');
  if (hasNew) {
    const a = s.indexOf('<!--eh:start-->'), b = s.indexOf('<!--eh:end-->') + '<!--eh:end-->'.length;
    s = s.slice(0, a) + header(urlPath) + s.slice(b);
  } else {
    // old phone menu first (it sits after the header), then the header, then the top bar before it
    const mob = s.indexOf('<nav class="mob-nav" id="mobNav"', body);
    if (mob > 0) { const [a, b] = cutElement(s, mob, 'nav'); s = s.slice(0, a) + s.slice(b).replace(/^\r?\n/, ''); }
    const h = s.indexOf('<header class="hdr"', body); const [ha, hb] = cutElement(s, h, 'header');
    s = s.slice(0, ha) + header(urlPath) + s.slice(hb);
    const u = s.indexOf('<div class="ubar', body);
    if (u > 0 && u < ha) { const [a, b] = cutElement(s, u, 'div'); s = s.slice(0, a) + s.slice(b).replace(/^(\r?\n)+/, ''); }
  }
  // inline header CSS
  const style = `<style id="eta-hdr">${css}</style>`;
  if (s.includes('<style id="eta-hdr">')) s = s.replace(/<style id="eta-hdr">[\s\S]*?<\/style>/, () => style);
  else s = s.replace('</head>', style + '\n</head>');
  // header script
  // header script (bump HDR_V when eta-hdr.js changes) + the AI assistant (served from the eyetoad cPanel)
  const HDR_V = 3, AI_TAG = '<script src="https://clients.eyetoad.com/ai/eta-ai.js" defer></script>';
  s = s.replace(/\/eta-hdr\.js\?v=\d+/g, '/eta-hdr.js?v=' + HDR_V);
  if (!s.includes('/eta-hdr.js')) {
    const tag = `<script src="/eta-hdr.js?v=${HDR_V}" defer></script>`;
    s = s.includes('</body>') ? s.replace(/<\/body>/, tag + '\n</body>') : s + tag;
  }
  if (!s.includes('clients.eyetoad.com/ai/eta-ai.js')) s = s.replace(/(<script src="\/eta-hdr\.js\?v=\d+" defer><\/script>)/, '$1\n' + AI_TAG);
  // Iris, the wizard cameo and the old orb stay off (the docked mouth replaces them)
  s = s.replace(/<script>window\.__etaIris=1;<\/script>\r?\n?/g, '');
  s = s.replace(/<script>\/\* caped-hero cameo:[\s\S]*?<\/script>\r?\n?/g, '');
  // logo preload matches the new size
  s = s.replace(/imagesizes="\(max-width:430px\) 179px, \(max-width:768px\) 204px, 280px"/g, 'imagesizes="(max-width:360px) 220px, (max-width:420px) 250px, (max-width:700px) 260px, 364px"');
  s = stubbed(s);
  if (s !== orig) { fs.writeFileSync(f, s); changed++; }
}
let jsChanged = 0;
for (const f of jsFiles) {
  const s = fs.readFileSync(f, 'utf8'), t = stubbed(s);
  if (t !== s) { fs.writeFileSync(f, t); jsChanged++; }
}
console.log(`pages updated: ${changed}, scripts patched: ${jsChanged}, pages without a site header (left alone): ${skipped.join(', ')}`);
