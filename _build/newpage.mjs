// Build a new eyetoad.com page from a spec module, cloning the site chrome from an existing page.
//   node newpage.mjs specs/some-page.mjs
// Money pages clone /denver-seo-company/ (k-* layout classes); posts clone the newest blog post (bl-* classes).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (h) => String(h).replace(/<[^>]+>/g, '').replace(/&rsquo;/g, '’').replace(/&ldquo;|&rdquo;/g, '"').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&amp;/g, '&').replace(/&hellip;/g, '…').replace(/&middot;/g, '·').replace(/\s+/g, ' ').trim();

const specPath = path.resolve(process.argv[2]);
const spec = (await import('file://' + specPath)).default;
const isPost = spec.type === 'post';
const tpl = isPost ? 'blog/google-september-2026-spam-update/index.html' : 'denver-seo-company/index.html';
const tplUrl = isPost ? 'https://eyetoad.com/blog/google-september-2026-spam-update/' : 'https://eyetoad.com/denver-seo-company/';
const tplTitle = isPost ? 'Google September 2026 Spam Update: Local Business Checklist' : 'Denver SEO Company | Eye To Ad Media — Since 2012';
const tplDesc = isPost ? "Google's September 2026 spam update ran from Sept 24 to Oct 8. What Google said, what it did not, and a checklist for local service business sites." : 'Denver SEO company since 2012: how we work, what it costs ($500–$3,000/mo), and how to compare Denver SEO companies before you hire one.';

let html = read(tpl);
const url = 'https://eyetoad.com' + spec.path;

// head
const swapAll = (a, b) => { if (!html.includes(a)) throw new Error('template anchor missing: ' + a.slice(0, 80)); html = html.split(a).join(b); };
swapAll(`<title>${tplTitle}</title>`, `<title>${esc(spec.title)}</title>`);
swapAll(`content="${tplTitle}"`, `content="${esc(spec.title)}"`);
swapAll(`content="${tplDesc}"`, `content="${esc(spec.description)}"`);
swapAll(tplUrl, url);
if (isPost) {
  html = html.replace(/<meta property="article:published_time" content="[^"]+">/, `<meta property="article:published_time" content="${spec.date}T08:00:00-06:00">`);
  html = html.replace(/<meta property="article:modified_time" content="[^"]+">/, `<meta property="article:modified_time" content="${spec.date}T08:00:00-06:00">`);
}
// page style
html = html.replace(/<style>[\s\S]*?<\/style>/, () => `<style>${spec.style || ''}</style>`);
// visible breadcrumb (outside <main>)
{
  const cur = `<li aria-current="page">${esc(text(spec.h1)).slice(0, 60)}</li>`;
  const items = isPost
    ? ['<li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li>', cur]
    : ['<li><a href="/">Home</a></li>', ...(spec.crumbs || []).map((c) => `<li><a href="${c[1].replace('https://eyetoad.com', '')}">${esc(c[0])}</a></li>`), cur];
  html = html.replace(/<nav class="bcrumb"[\s\S]*?<\/nav>/, () => `<nav class="bcrumb" aria-label="Breadcrumb"><div class="wrap"><ol>${items.join('')}</ol></div></nav>`);
}
// remove the template's contrast patch (specific to its own ids)
html = html.replace(/<style id="eta-contrast">[\s\S]*?<\/style>\n?/, '');

// body
const main = isPost ? postMain(spec) : moneyMain(spec);
html = html.replace(/<main id="main">[\s\S]*?<\/main>/, () => main + (spec.script ? '\n<script>' + spec.script + '</script>' : ''));

// schema
html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (m, j) => {
  const g = JSON.parse(j);
  const keep = g['@graph'].filter((n) => ['https://eyetoad.com/#organization', 'https://eyetoad.com/#website'].includes(n['@id']));
  const faq = spec.faq && spec.faq.length ? { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: spec.faq.map((q) => ({ '@type': 'Question', name: text(q.q), acceptedAnswer: { '@type': 'Answer', text: text(q.a) } })) } : null;
  const crumbs = isPost
    ? [['Home', 'https://eyetoad.com/'], ['Blog', 'https://eyetoad.com/blog/'], [text(spec.h1), url]]
    : [['Home', 'https://eyetoad.com/'], ...(spec.crumbs || []), [text(spec.h1), url]];
  const bc = { '@type': 'BreadcrumbList', '@id': url + '#crumb', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: c[1] })) };
  const page = { '@type': 'WebPage', '@id': url + '#page', url, name: spec.title, description: spec.description, isPartOf: { '@id': 'https://eyetoad.com/#website' }, inLanguage: 'en-US', dateModified: spec.date, breadcrumb: { '@id': url + '#crumb' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.k-capsule', '.bl-key'] } };
  const nodes = [...keep, page, bc];
  if (isPost) nodes.push({ '@type': 'BlogPosting', '@id': url + '#post', mainEntityOfPage: { '@type': 'WebPage', '@id': url }, url, headline: text(spec.h1), description: spec.description, datePublished: spec.date, dateModified: spec.date, inLanguage: 'en-US', author: { '@type': 'Person', '@id': 'https://eyetoad.com/#zach', name: 'Zach Wennstedt', url: 'https://eyetoad.com/about/' }, publisher: { '@id': 'https://eyetoad.com/#organization' }, image: 'https://eyetoad.com/images/images/denver-seo-services-hero.png', articleSection: spec.section || 'Strategy' });
  else if (spec.service) nodes.push({ '@type': 'Service', '@id': url + '#service', name: spec.service.name, serviceType: spec.service.types, alternateName: spec.service.alt, provider: { '@id': 'https://eyetoad.com/#organization' }, areaServed: spec.service.area || { '@type': 'Country', name: 'United States' }, url, ...(spec.service.offers ? { offers: spec.service.offers } : {}) });
  if (faq) nodes.push(faq);
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })}</script>`;
});

const out = path.join(ROOT, spec.path.replace(/^\//, ''), 'index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('wrote', spec.path, html.length, 'bytes');

function faqBlock(spec, idp) {
  if (!spec.faq) return '';
  return `<div class="faq-cols">\n${spec.faq.map((q, i) => `<div class="faq-item"><button class="faq-q" type="button" aria-expanded="false" aria-controls="${idp}-${i + 1}">${q.q}<span class="faq-ico" aria-hidden="true">+</span></button><div class="faq-a" id="${idp}-${i + 1}"><p>${q.a}</p></div></div>`).join('\n')}\n</div>`;
}

function moneyMain(s) {
  const p = s.prefix;
  const facts = s.facts ? `<div class="k-slider-wrap ${p}-facts" aria-label="${esc(s.factsLabel || 'At a glance')}">\n<div class="k-chip">${s.factsChip || 'At a glance'}</div>\n<dl>\n${s.facts.map((f) => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('\n')}\n</dl>\n</div>` : (s.asideHtml || '');
  return `<main id="main">

<section class="k-hero ${p}-hero" aria-labelledby="${p}-h1">
<div class="wrap"><div class="k-hgrid">
<div>
<p class="eyebrow k-eyebrow">${s.eyebrow}</p>
<h1 id="${p}-h1">${s.h1}</h1>
<p class="k-kick">${s.kick}</p>
<p class="k-sub">${s.sub}</p>
<div class="k-cta"><a href="tel:18004818638" class="k-btn k-btn-a">Call 1-800-481-8638</a><a href="${s.cta2 ? s.cta2[1] : '/free-seo-audit/'}" class="k-btn k-btn-b">${s.cta2 ? s.cta2[0] : 'Get a free SEO audit'}</a></div>
<div class="k-proof"><span><b>5.0</b> from 60 Google reviews</span><span><b>A+</b> BBB Accredited</span><span><b>Founder-led</b> since 2012</span></div>
</div>
${facts}
</div></div>
</section>

<section class="k-sec" aria-labelledby="${p}-h2a"><div class="wrap">
<div class="k-capsule"><p><b>Direct answer:</b> ${s.capsule}</p></div>
${s.sections[0]}
</div></section>

${s.sections.slice(1).join('\n\n')}

<section class="k-sec" aria-labelledby="${p}-faq"><div class="wrap">
<div class="k-chip">${s.faqChip || 'Questions people ask'}</div><h2 class="k-h" id="${p}-faq">${s.faqH2}</h2>
${faqBlock(s, p + 'faq')}
<p class="k-p" style="margin-top:26px">Related: ${s.related.map((r) => `<a href="${r[1]}">${r[0]}</a>`).join(' &middot; ')}</p>
</div></section>

<section class="k-band"><div class="wrap"><h2>${s.band[0]}</h2><p>${s.band[1]}</p><div class="k-cta"><a href="tel:18004818638" class="k-btn k-btn-w">Call 1-800-481-8638</a><a href="${s.band[2] ? s.band[2][1] : '/contact/'}" class="k-btn k-btn-b">${s.band[2] ? s.band[2][0] : 'Send a message'}</a></div></div></section>
</main>`;
}

function postMain(s) {
  const toc = s.toc.map((t, i) => `<li><a href="#s${i + 1}">${t}</a></li>`).join('');
  const faq = s.faq ? `<div class="bl-faq"><h2>Questions readers ask</h2><div class="np-faq">${s.faq.map((q) => `<details><summary>${q.q}</summary><div class="a"><p>${q.a}</p></div></details>`).join('')}</div></div>` : '';
  const more = s.more.map((m) => `<a href="${m[1]}">${m[0]}<span>${m[2]}</span></a>`).join('');
  const src = s.sources ? `<div class="bl-src"><h2>Sources</h2><ol>${s.sources.map((x) => `<li><a href="${x[1]}" rel="noopener" target="_blank">${x[0]}</a>${x[2] ? ' — ' + x[2] : ''}</li>`).join('')}</ol></div>` : '';
  return `<main id="main">

<div class="bl-progress" id="blp" aria-hidden="true"></div>
<section class="bl-hero" aria-labelledby="h1"><div class="wrap"><p class="np-eyebrow">${s.eyebrow}</p><h1 id="h1">${s.h1}</h1><p class="bl-meta"><span>By Zachary Wennstedt, founder</span><span>Published ${s.dateText}</span><span>${s.read} minute read</span></p><p class="bl-lede">${s.lede}</p></div></section>

<article class="bl-body"><nav class="bl-toc" aria-label="In this guide"><b>In this guide</b><ol>${toc}</ol></nav>

<div class="bl-key"><b>Direct answer:</b> ${s.key}</div>

${s.body}

<div class="bl-cta"><h2>${s.cta[0]}</h2><p>${s.cta[1]}</p><a class="np-btn" href="${s.cta[3] || '/free-seo-audit/'}">${s.cta[2]} &rarr;</a> <a class="np-btn np-btn-ghost" href="tel:18004818638">Call 1-800-481-8638</a></div>
${faq}
${src}
<h2>Keep going</h2><div class="np-more">${more}</div>
</article>
<script>(function(){var p=document.getElementById('blp');if(!p)return;function u(){var d=document.documentElement;var s=d.scrollTop||document.body.scrollTop;var h=d.scrollHeight-d.clientHeight;p.style.width=(h>0?Math.min(100,s/h*100):0)+'%';}window.addEventListener('scroll',u,{passive:true});u();})();</script>

<section style="padding:10px 0 46px"><div class="wrap"><div style="display:flex;gap:16px;align-items:center;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:16px;padding:18px 20px;max-width:78ch"><div aria-hidden="true" style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#F97316,#7C3AED);flex:none;display:grid;place-items:center;color:#fff;font-weight:900;font-family:Fraunces,Fraunces Fallback,Georgia,serif;font-size:1.3rem">Z</div><p style="margin:0;font-size:.94rem;color:#475467;line-height:1.5"><b style="color:#101828">Written by Zach Wennstedt</b>, founder of Eye To Ad Media (Denver, 2012). Before the agency he ran sales for multi-million-dollar plumbing and national remodeling companies, and he still operates a home-services business on the methods in this article. <a href="/about/">About Zach</a> · <a href="/what-you-get/">What working with us looks like</a></p></div></div></section>
</main>`;
}
