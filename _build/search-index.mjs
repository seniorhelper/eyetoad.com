// Builds /search-index.json for the site search (header icon + the big box on /services/).
// One row per indexable page: [path, title, description, kind, keywords]. Rerun after adding pages.
// Usage: cd _build && node search-index.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);
const files = execSync('git ls-files "*.html"').toString().trim().split('\n')
  .concat(fs.existsSync('product-design/index.html') ? ['product-design/index.html'] : [])
  .filter((f, i, a) => a.indexOf(f) === i && /(^|\/)index\.html$/.test(f) && !/^(_|cancel\/|thank-you\/|sell-myself\/)/.test(f));

const ent = s => s.replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;|&#39;/g, '’').replace(/&lsquo;/g, '‘').replace(/&ldquo;|&rdquo;|&quot;/g, '"')
  .replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&middot;/g, '·').replace(/&agrave;/g, 'à').replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/g, '');
const clean = s => ent(String(s || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const kind = p => p === '/' ? 'Home' : p.startsWith('/blog/') ? (p === '/blog/' ? 'Blog' : 'Article')
  : p.startsWith('/locations/') ? 'Location' : p.startsWith('/industries/') || /-seo-denver\/$|-marketing(-denver)?\/$|-website-design\/$/.test(p) ? 'Industry'
  : p.startsWith('/tools/') || /tools|audit|checklist|calculator/.test(p) ? 'Tool' : /privacy|terms|accessibility|careers/.test(p) ? 'Info' : 'Service';

const rows = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(s)) continue;
  const p = '/' + f.replace(/index\.html$/, '');
  let title = clean((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1]).replace(/\s*[|–—-]\s*Eye To Ad Media.*$/i, '');
  const desc = clean((s.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const main = s.slice(s.indexOf('<main') > 0 ? s.indexOf('<main') : 0);
  const h1 = clean((main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
  const h2 = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].slice(0, 8).map(m => clean(m[1])).join(' · ');
  if (!title) continue;
  rows.push([p, title, desc.slice(0, 220), kind(p), (h1 + ' · ' + h2).slice(0, 360)]);
}
rows.sort((a, b) => a[0].localeCompare(b[0]));
fs.writeFileSync('search-index.json', JSON.stringify({ v: 1, built: new Date().toISOString().slice(0, 10), pages: rows }));
console.log('search-index.json:', rows.length, 'pages,', fs.statSync('search-index.json').size, 'bytes');
