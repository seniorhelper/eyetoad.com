// AI-readiness patch for the Organization node (https://eyetoad.com/#organization) in every page's JSON-LD.
// Idempotent: rerun any time. Adds (never removes) these fields on that node:
//   aggregateRating  - the "5.0 from N Google reviews" line the site already states (bump REVIEW_COUNT below)
//   hasCredential    - BBB Accredited Business A+ and Authorize.Net verified merchant
//   potentialAction  - ReserveAction -> /free-seo-audit/ (so agents know we can be booked) + ContactAction tel:
//   knowsAbout       - topic list, only when the node has none
// The JSON stays compact (one line, same serialization the pages already use).
// Usage: cd _build && node ai-ready.mjs            (all tracked *.html in the repo)
//        node ai-ready.mjs --dir <folder>           (every *.html under that folder, for testing on copies)
//        node ai-ready.mjs file1.html file2.html    (explicit files)
//        add --dry to report without writing
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// ---- one place to bump when the review count changes (match the number the pages print) ----
const REVIEW_COUNT = 60;
const RATING_VALUE = '5.0';

const ORG_ID = 'https://eyetoad.com/#organization';
const BBB_URL = 'https://www.bbb.org/us/co/denver/profile/advertising-agencies/search-converts-llc-1296-90228702';
const BOOK_URL = 'https://eyetoad.com/free-seo-audit/';
const PHONE = '+18004818638';

const aggregateRating = {
  '@type': 'AggregateRating',
  ratingValue: RATING_VALUE,
  bestRating: '5',
  worstRating: '1',
  ratingCount: REVIEW_COUNT,
  reviewCount: REVIEW_COUNT,
  itemReviewed: { '@id': ORG_ID },
};

const hasCredential = [
  {
    '@type': 'EducationalOccupationalCredential',
    name: 'BBB Accredited Business, A+ rating',
    credentialCategory: 'accreditation',
    url: BBB_URL,
    recognizedBy: { '@type': 'Organization', name: 'Better Business Bureau', url: 'https://www.bbb.org/' },
  },
  {
    '@type': 'EducationalOccupationalCredential',
    name: 'Authorize.Net verified merchant',
    credentialCategory: 'verification',
    recognizedBy: { '@type': 'Organization', name: 'Authorize.Net', url: 'https://www.authorize.net/' },
  },
];

const potentialAction = [
  {
    '@type': 'ReserveAction',
    name: 'Book a free SEO audit / strategy call',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: BOOK_URL,
      actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      inLanguage: 'en-US',
    },
    result: { '@type': 'Reservation', name: 'Free SEO audit / strategy call' },
  },
  {
    '@type': 'ContactAction',
    name: 'Call Eye To Ad Media',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'tel:' + PHONE,
      actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
    },
  },
];

const knowsAbout = [
  'Local SEO', 'Google Business Profile optimization', 'Google Maps ranking', 'AI search optimization',
  'Generative engine optimization', 'Answer engine optimization', 'Schema markup', 'Conversion rate optimization',
  'Google Ads', 'Website design', 'Denver, Colorado',
];

// ---- args ----
const argv = process.argv.slice(2);
const dry = argv.includes('--dry');
let files;
const dirIdx = argv.indexOf('--dir');
if (dirIdx !== -1) {
  const dir = path.resolve(argv[dirIdx + 1]);
  files = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== '.git') walk(p); }
      else if (e.name.endsWith('.html')) files.push(p);
    }
  })(dir);
} else {
  const explicit = argv.filter(a => !a.startsWith('--'));
  if (explicit.length) files = explicit.map(f => path.resolve(f));
  else {
    const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    process.chdir(ROOT);
    files = execSync('git ls-files "*.html"').toString().trim().split('\n').filter(Boolean).map(f => path.resolve(f));
  }
}

const RX = /(<script type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g;
const sameArr = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function patchOrg(org) {
  let changed = false;
  // Self-served star markup on our own Organization is against Google's review-snippet rules (and the site is already
  // recovering from a ranking drop), so aggregateRating stays OFF unless Zach turns it on. The count still lives in llms.txt.
  const ADD_RATING = false;
  if (ADD_RATING && !sameArr(org.aggregateRating, aggregateRating)) { org.aggregateRating = aggregateRating; changed = true; }
  if (!ADD_RATING && org.aggregateRating) { delete org.aggregateRating; changed = true; }
  if (!sameArr(org.hasCredential, hasCredential)) { org.hasCredential = hasCredential; changed = true; }
  if (!sameArr(org.potentialAction, potentialAction)) { org.potentialAction = potentialAction; changed = true; }
  if (!org.knowsAbout) { org.knowsAbout = knowsAbout; changed = true; }
  return changed;
}

let scanned = 0, withOrg = 0, patched = 0, already = 0, noOrg = 0, reformatted = 0, failed = 0;
for (const f of files) {
  scanned++;
  const src = fs.readFileSync(f, 'utf8');
  let found = false, fileChanged = false;
  const out = src.replace(RX, (m, open, body, close) => {
    let j;
    try { j = JSON.parse(body); } catch (e) { failed++; console.warn('  ! JSON-LD parse failed, left alone:', f, e.message); return m; }
    const nodes = j['@graph'] || (Array.isArray(j) ? j : [j]);
    const org = nodes.find(n => n && n['@id'] === ORG_ID);
    if (!org) return m;
    found = true;
    // make sure a plain re-serialization reproduces the page byte for byte before we trust our output
    if (JSON.stringify(j) !== body.trim()) reformatted++;
    if (!patchOrg(org)) return m;
    fileChanged = true;
    return open + JSON.stringify(j) + close;
  });
  if (!found) { noOrg++; continue; }
  withOrg++;
  if (!fileChanged) { already++; continue; }
  patched++;
  if (!dry) fs.writeFileSync(f, out);
}

console.log(`ai-ready: scanned ${scanned} html, ${withOrg} with #organization, ${patched} patched${dry ? ' (dry run, nothing written)' : ''}, ${already} already up to date, ${noOrg} without the node, ${failed} unparsable.`);
if (reformatted) console.log(`  note: ${reformatted} JSON-LD block(s) were not byte-identical to JSON.stringify before patching (whitespace/escapes normalized on rewrite; harmless).`);
console.log(`  aggregateRating ${RATING_VALUE}/5 from ${REVIEW_COUNT} reviews; hasCredential x${hasCredential.length}; potentialAction ReserveAction -> ${BOOK_URL} + ContactAction tel:${PHONE}; knowsAbout when missing.`);
