// Register new eyetoad.com pages and posts: blog index cards, feed.xml, sitemap.xml, llms.txt.
//   node register.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rd = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const wr = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const POSTS = [
  { slug: 'google-ai-calling-your-business', cat: 'ai', catLabel: 'AI search', date: '2026-10-19', title: 'Google’s AI Is Calling Denver Businesses for Quotes: How to Answer', blurb: 'Google now phones local businesses on a searcher’s behalf and books appointments. What the call sounds like, the script that gets you shortlisted, and the profile fields it reads.', search: 'google ai calling business quotes agentic booking automated call local services ai mode 2026', art: { id: 'aicall', bg1: '#0B2A4A', bg2: '#06162B', accent: '#67E8F9', label: 'AI CALLING', l1: 'Google is on line one.', l2: 'Have an answer ready.', icon: 'phone' }, desc: 'Google’s AI now phones local businesses to check prices and availability, and agentic booking rolled out in 2026. What the call sounds like, what to say, and how to make sure it reaches you.' },
  { slug: 'review-thresholds-2026-denver', cat: 'local', catLabel: 'Reviews', date: '2026-10-19', title: '31% Skip Under 4.5 Stars: 2026 Review Numbers for Denver Businesses', blurb: 'BrightLocal’s 2026 survey moved every threshold: 4.5 stars, 20 reviews, 90-day recency, same-day replies. The four targets, in order, for a Denver service business.', search: 'reviews 2026 brightlocal 4.5 stars 20 reviews recency reply templates ai review summaries denver', art: { id: 'rev26', bg1: '#3B1D0B', bg2: '#1C0E05', accent: '#FBBF24', label: 'REVIEWS 2026', l1: '4.5 is the new floor.', l2: '20 is the new minimum.', icon: 'star' }, desc: 'BrightLocal’s 2026 survey: 31% of consumers require 4.5 stars, 47% skip businesses with fewer than 20 reviews, 74% want reviews from the last three months. What each threshold means for a Denver service business, with a worked plan.' },
  { slug: 'opt-out-of-google-ai-features', cat: 'ai', catLabel: 'AI search', date: '2026-10-19', title: 'Should You Opt Out of Google AI Overviews? The Search Console Toggle', blurb: 'Search Console now lets any site leave AI Overviews and AI Mode. The cited-vs-uncited click data says most local businesses should stay in and earn the citation.', search: 'opt out ai overviews ai mode search console toggle cited uncited ctr seer ahrefs local business', art: { id: 'optout', bg1: '#1E1B4B', bg2: '#0F0D2A', accent: '#A78BFA', label: 'SEARCH CONSOLE', l1: 'There is a switch now.', l2: 'Here is why to leave it on.', icon: 'toggle' }, desc: 'Search Console now lets any site opt out of AI Overviews and AI Mode. What the toggle does, what it does not, the click data on cited vs. uncited pages, and when a local business should leave it on.' },
  { slug: 'local-pack-vs-local-services-ads-denver', cat: 'local', catLabel: 'Local SEO', date: '2026-10-19', title: 'Local Pack vs LSAs vs Google Ads: Where a Denver Contractor’s Budget Goes', blurb: 'A 500-search study found the local pack on 97.6% of home-services searches and LSAs above it on half of city searches. The budget split by business stage.', search: 'local pack local services ads google ads home services contractor budget study 2026 denver plumber hvac roofing', art: { id: 'lsa', bg1: '#064E3B', bg2: '#022C22', accent: '#6EE7B7', label: 'HOME SERVICES', l1: 'The pack is on 98%.', l2: 'LSAs sit above it.', icon: 'map' }, desc: 'A 2026 study of 500 home-services searches found the Google local pack on 97.6% of them, Local Services Ads on 28.4%, and Google Ads averaging position 11. What that means for how a Denver contractor splits money between SEO, LSAs and PPC.' },
];
const PAGES = [
  { path: '/denver-seo-companies/', title: 'Denver SEO Companies Compared (Oct 2026): 16 Agencies, Same Facts', line: 'sixteen Denver SEO companies compared on founded year, HQ, Clutch reviews, published pricing and case numbers; read Oct 19, 2026; no paid placements', prio: '0.9' },
  { path: '/ai-seo-agency/', title: 'AI SEO Agency | Get Cited by AI Overviews, ChatGPT & AI Mode', line: 'AI SEO / GEO / AEO agency services, published pricing $500-$3,000/mo, no guarantees', prio: '0.9' },
  { path: '/ai-visibility-audit/', title: 'AI Visibility Audit | See If ChatGPT & AI Overviews Name Your Business', line: 'free six-prompt AI visibility self-check scored out of 24, plus the full audit', prio: '0.8' },
  { path: '/national-seo-company/', title: 'National SEO Company | Rank Across the US, Measured in Revenue', line: 'national and multi-market SEO from Denver, $1,500-$3,000/mo, AI search included', prio: '0.9' },
];

const icon = (k, c) => ({
  phone: `<path d="M226 60a10 10 0 0 1 10-10h14l8 24-14 10a60 60 0 0 0 30 30l10-14 24 8v14a10 10 0 0 1-10 10c-44 0-82-38-82-82z" fill="none" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
  star: `<path d="M250 44l16 34 37 5-27 26 7 37-33-18-33 18 7-37-27-26 37-5z" fill="none" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
  toggle: `<rect x="196" y="66" width="104" height="48" rx="24" fill="none" stroke="${c}" stroke-width="6"/><circle cx="276" cy="90" r="16" fill="${c}"/>`,
  map: `<path d="M252 48c-22 0-40 18-40 40 0 30 40 68 40 68s40-38 40-68c0-22-18-40-40-40z" fill="none" stroke="${c}" stroke-width="6"/><circle cx="252" cy="88" r="14" fill="none" stroke="${c}" stroke-width="6"/>`,
}[k]);

const card = (p) => `<article class="post-card rv" data-cat="${p.cat}" data-search="${esc(p.search)}">
<div class="pc-head pc-art"><svg class="pc-svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.art.label + ': ' + p.art.l1 + ' ' + p.art.l2)}"><defs><radialGradient id="g${p.art.id}" cx="72%" cy="45%" r="70%"><stop offset="0" stop-color="${p.art.bg1}"/><stop offset="1" stop-color="${p.art.bg2}"/></radialGradient><pattern id="p${p.art.id}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="${p.art.accent}" stroke-width=".6" opacity=".25"/></pattern></defs><rect width="320" height="180" fill="url(#g${p.art.id})"/><rect width="320" height="180" fill="url(#p${p.art.id})"/><g opacity=".9">${icon(p.art.icon, p.art.accent)}</g><text x="18" y="38" font-family="system-ui,sans-serif" font-weight="800" font-size="8.5" letter-spacing="2.2" fill="${p.art.accent}">${esc(p.art.label)}</text><text x="18" y="106" font-family="Fraunces,Georgia,serif" font-weight="900" font-size="19" fill="#fff">${esc(p.art.l1)}</text><text x="18" y="128" font-family="Fraunces,Georgia,serif" font-weight="900" font-size="19" fill="${p.art.accent}">${esc(p.art.l2)}</text></svg></div>
<div class="pc-top">
<div class="pc-meta"><span class="pc-cat cat-${p.cat}">${p.catLabel}</span><span class="pc-date">Oct 2026</span></div>
<h3><a href="/blog/${p.slug}/">${esc(p.title)}</a></h3>
<p>${esc(p.blurb)}</p>
</div>
<div class="pc-foot"><span class="pc-read">Read More &rarr;</span></div>
</article>
`;

// blog index: insert before the first existing card
{
  let s = rd('blog/index.html');
  const first = s.indexOf('<article class="post-card rv"');
  if (first < 0) throw new Error('no cards');
  const fresh = POSTS.filter((p) => !s.includes(`/blog/${p.slug}/`));
  s = s.slice(0, first) + fresh.map(card).join('') + s.slice(first);
  wr('blog/index.html', s);
  console.log('blog index: added', fresh.length, 'cards');
}
// feed.xml
{
  let s = rd('blog/feed.xml');
  const fresh = POSTS.filter((p) => !s.includes(`/blog/${p.slug}/`));
  const items = fresh.map((p) => `<item><title>${esc(p.title)}</title><link>https://eyetoad.com/blog/${p.slug}/</link><guid isPermaLink="true">https://eyetoad.com/blog/${p.slug}/</guid><description>${esc(p.desc)}</description><pubDate>Mon, 19 Oct 2026 12:00:00 -0600</pubDate><author>Zach Wennstedt</author></item>`).join('');
  s = s.replace('<item>', items + '<item>');
  s = s.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, '<lastBuildDate>Mon, 19 Oct 2026 12:00:00 -0600</lastBuildDate>');
  wr('blog/feed.xml', s);
  console.log('feed: added', fresh.length);
}
// sitemap.xml
{
  let s = rd('sitemap.xml');
  const add = [];
  for (const p of PAGES) if (!s.includes(`<loc>https://eyetoad.com${p.path}</loc>`)) add.push(`  <url><loc>https://eyetoad.com${p.path}</loc><lastmod>2026-10-19</lastmod><priority>${p.prio}</priority></url>`);
  for (const p of POSTS) if (!s.includes(`/blog/${p.slug}/`)) add.push(`  <url><loc>https://eyetoad.com/blog/${p.slug}/</loc><lastmod>2026-10-19</lastmod><priority>0.6</priority></url>`);
  s = s.replace(/\n?<\/urlset>/, '\n' + add.join('\n') + '\n</urlset>');
  // home lastmod
  s = s.replace(/(<loc>https:\/\/eyetoad\.com\/<\/loc><lastmod>)[^<]*/, '$12026-10-19');
  wr('sitemap.xml', s);
  console.log('sitemap: added', add.length);
}
// llms.txt
{
  let s = rd('llms.txt');
  const key = PAGES.filter((p) => !s.includes(`https://eyetoad.com${p.path})`)).map((p) => `- [${p.title.split(' | ')[0].replace(/ \(Oct 2026\):.*$/, '')}](https://eyetoad.com${p.path}): ${p.line}`).join('\n');
  s = s.replace('- [Denver SEO Agency](https://eyetoad.com/denver-seo-agency/): founder-led, no handoffs', '- [Denver SEO Agency](https://eyetoad.com/denver-seo-agency/): founder-led, no handoffs\n' + key);
  const blog = POSTS.filter((p) => !s.includes(`/blog/${p.slug}/`)).map((p) => `- [${p.title}](https://eyetoad.com/blog/${p.slug}/)`).join('\n');
  s = s.replace('## Blog\n', '## Blog\n' + blog + '\n');
  wr('llms.txt', s);
  console.log('llms.txt updated');
}
