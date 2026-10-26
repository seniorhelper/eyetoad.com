// /ai-visibility-audit/  targets: ai visibility audit, ai visibility check, am i visible in chatgpt, ai search visibility agency
export default {
  path: '/ai-visibility-audit/',
  prefix: 'ava',
  date: '2026-10-19',
  title: 'AI Visibility Audit | See If ChatGPT & AI Overviews Name Your Business',
  description: 'A free AI visibility audit you can run in ten minutes: find out whether Google AI Overviews, AI Mode, ChatGPT and Perplexity name your business, score it, and see what to fix first.',
  crumbs: [['Free SEO tools', 'https://eyetoad.com/free-seo-tools/']],
  eyebrow: 'AI visibility audit &middot; Free self-check &middot; Then a human read if you want one',
  h1: 'AI visibility audit: does the assistant <em>name you, or your competitor?</em>',
  kick: 'Ten minutes, six prompts, a score out of 24. You will know where you stand in AI search before anyone tries to sell you a fix.',
  sub: 'Forty-five percent of consumers asked an AI tool for a local recommendation in the past year (BrightLocal, 2026), and more than a quarter of businesses in Google&rsquo;s local pack are missing from AI Mode for the same search (Local SEO Data, June 2026). This audit shows you which side of that line you are on. Run it yourself below, or have us run the full version and walk you through it.',
  cta2: ['Start the self-check', '#ava-tool'],
  asideHtml: `<div class="k-slider-wrap ava-tool" id="ava-tool" aria-label="AI visibility self-check">
<div class="k-chip">The self-check</div>
<p class="k-mini">Open each assistant, ask the prompt as a customer would, and tick what you see. Use your real category and city.</p>
<form class="ava-f" id="avaForm" onsubmit="return false">
<fieldset><legend>1. Google AI Mode: &ldquo;best [your service] in [your city]&rdquo;</legend>
<label><input type="checkbox" value="2"> Names my business</label><label><input type="checkbox" value="1"> Links my site or profile</label><label><input type="checkbox" value="1"> Gets my facts right (hours, area, services)</label></fieldset>
<fieldset><legend>2. Google AI Overview: &ldquo;how much does [your service] cost in [your city]&rdquo;</legend>
<label><input type="checkbox" value="2"> Cites my site</label><label><input type="checkbox" value="1"> My price range appears</label><label><input type="checkbox" value="1"> A competitor is cited instead (leave unticked if so)</label></fieldset>
<fieldset><legend>3. ChatGPT: &ldquo;who should I call for [your service] near [neighborhood]?&rdquo;</legend>
<label><input type="checkbox" value="2"> Names my business</label><label><input type="checkbox" value="1"> Mentions my reviews or rating</label><label><input type="checkbox" value="1"> Describes what I do accurately</label></fieldset>
<fieldset><legend>4. Perplexity: &ldquo;[your business name] reviews&rdquo;</legend>
<label><input type="checkbox" value="2"> Finds my business, not a namesake</label><label><input type="checkbox" value="1"> Cites Google or a review site I am on</label><label><input type="checkbox" value="1"> Address and phone match my site</label></fieldset>
<fieldset><legend>5. Your Google Business Profile</legend>
<label><input type="checkbox" value="2"> Reviews in the last 90 days</label><label><input type="checkbox" value="1"> Services and products filled in</label><label><input type="checkbox" value="1"> Every review answered</label></fieldset>
<fieldset><legend>6. Your website</legend>
<label><input type="checkbox" value="2"> Each service page opens with a direct answer</label><label><input type="checkbox" value="1"> Structured data validates with no errors</label><label><input type="checkbox" value="1"> Phone number tappable before scrolling on a phone</label></fieldset>
</form>
<div class="ava-score"><b id="avaN">0 / 24</b><span id="avaV">Tick what you see.</span></div>
<div class="ava-out" id="avaOut" hidden></div>
</div>`,
  capsule: 'An AI visibility audit checks whether AI search systems name, cite and correctly describe your business when a customer asks. The six-prompt self-check on this page scores it out of 24 in about ten minutes. The full audit we run for clients records the same prompts across Google AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini and Claude, traces every citation to its source, and ranks the fixes by effort. It is free inside any campaign; as a standalone, the <a href="/ai-search-visibility-audit/">AI search visibility audit</a> is a flat $297 report, or $750 with the fixes done for you.',
  sections: [
    `<div class="k-chip">Why audit this now</div>
<h2 class="k-h" id="ava-h2a">The map pack and the AI answer are <em>no longer the same list.</em></h2>
<p class="k-lead">For years, ranking in Google Maps meant you were the recommendation. Three 2026 studies say that link has loosened.</p>
<div class="ava-grid">
<div class="k-card"><h3 class="k-h3">28.5% missing</h3><p>Local SEO Data checked 1,120 local queries across 13 cities in June 2026 and found that 28.5% of the businesses in Google&rsquo;s local pack did not appear in AI Mode for the same query. For professional services, AI Mode often showed educational content instead of any business at all.</p></div>
<div class="k-card"><h3 class="k-h3">A third as many businesses</h3><p>Sterling Sky&rsquo;s June 2026 review of 322 markets found Google&rsquo;s AI local packs surface roughly 32% as many businesses as the classic three-pack, usually one or two, with no call button. Fewer seats, higher stakes.</p></div>
<div class="k-card"><h3 class="k-h3">Google&rsquo;s own cards</h3><p>Profound measured google.com&rsquo;s share of AI Mode citations rising more than eightfold between April and June 2026, driven by Business Profile cards. Your profile is now a source document, not just a listing.</p></div>
</div>
<p class="k-p">None of this means Maps stopped mattering. The WebFX study from July 2026 found a local pack on 97.6% of home-services searches. It means there is a second surface to win, and most businesses have never looked at it.</p>`,

    `<section class="k-sec k-sec-off" aria-labelledby="ava-h2b"><div class="wrap">
<div class="k-chip">Reading your score</div>
<h2 class="k-h" id="ava-h2b">What the number means, <em>and what to fix first.</em></h2>
<div class="ava-bands">
<div class="ava-band"><b>0&ndash;8</b><h3>Invisible</h3><p>Assistants either do not know you exist or confuse you with someone else. Start with the boring fixes: identical name, address, phone, hours and categories on your site, Google Business Profile, Apple Business Connect and Bing Places. Then get reviews moving. Nothing else works until the entity is clean.</p></div>
<div class="ava-band"><b>9&ndash;16</b><h3>Known, not chosen</h3><p>Engines can find you but name a competitor when asked for a recommendation. Usually the gap is proof and specificity: no recent reviews, no price ranges, service pages that describe you without answering the customer&rsquo;s question. Rewrite the top three service pages to open with a direct answer and a real range.</p></div>
<div class="ava-band"><b>17&ndash;24</b><h3>Cited</h3><p>You are being named. Now protect it: keep review velocity up, answer every review, keep structured data valid, and add the pages that answer the next questions (cost, timeline, what to expect). Track AI Overview and AI Mode impressions in Search Console, which has reported them separately since August 2026.</p></div>
</div>
<p class="k-p">Scores are directional. A plumber in Aurora and a law firm downtown will see different engines matter more; the full audit weights by your category.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="ava-h2c"><div class="wrap">
<div class="k-chip">The full audit</div>
<h2 class="k-h" id="ava-h2c">What we check when we run it <em>for you.</em></h2>
<p class="k-lead">The self-check is six prompts. The full audit is the same idea done properly, with a transcript you keep.</p>
<div class="ava-two">
<div class="k-card"><h3 class="k-h3">Across six engines</h3><p>Twenty to forty real customer questions, run in Google AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini and Claude on the same day, logged with the answer, the businesses named and every cited source. Repeated monthly inside a campaign so you can see movement.</p></div>
<div class="k-card"><h3 class="k-h3">Source tracing</h3><p>When a competitor is cited, we record where the assistant got it: a review site, a list article, a directory, their own page. That tells you exactly which listing or page to earn. Whitespark&rsquo;s 2026 survey ranks presence on curated best-of lists as the strongest AI visibility signal; the trace shows which lists.</p></div>
<div class="k-card"><h3 class="k-h3">Entity audit</h3><p>Every public fact about your business, compared across the sources assistants read. We found a Denver client listed in two different suburbs and under an old phone number on three sites; the assistant had simply averaged the confusion into silence.</p></div>
<div class="k-card"><h3 class="k-h3">Fix list, ranked</h3><p>Ten to twenty fixes ordered by effort and expected effect, with the first five written so your own team could do them. If you hire us, they are the first month&rsquo;s work. If you do not, you still have the list.</p></div>
</div>
<p class="k-p"><b>Cost.</b> Free inside any Eye To Ad Media campaign ($500 to $3,000 a month, month to month). As a standalone it has a posted price: the <a href="/ai-search-visibility-audit/">AI search visibility audit</a> is $297 for the written report or $750 with the top fixes done for you. Published industry rates for a standalone AI visibility audit run $500 to $2,000 (LLM Pulse, May 2026). The broader <a href="/free-seo-audit/">free SEO audit</a> includes a lighter AI section if you want everything looked at once.</p>
</div></section>`,

    `<section class="k-sec k-sec-ink" aria-labelledby="ava-h2d"><div class="wrap">
<div class="k-chip">A worked example</div>
<h2 class="k-h" id="ava-h2d">What an audit found for a business <em>we own.</em></h2>
<p class="k-p" style="color:#fff">We run this on ourselves first, which is how we know it works and where it breaks. When we audited our founder&rsquo;s home-services company, ChatGPT named it on national product questions but Perplexity returned a different company with a similar name in another state. The cause was two stale directory listings using an old phone number. Fixing the listings and adding a plain facts block to the About page cleared it within the next crawl cycle; the company now appears in both. The <a href="/case-studies/" style="color:#FDBA74">case study</a> shows the terms you can test.</p>
<p class="k-p" style="color:#fff">The point is not the fix. It is that the problem was invisible from inside Google Maps, where the business ranked first the whole time.</p>
</div></section>`,
  ],
  faqH2: 'About the AI visibility audit.',
  faq: [
    { q: 'What is an AI visibility audit?', a: 'A structured check of whether AI search systems (Google AI Overviews and AI Mode, ChatGPT, Perplexity, Gemini, Claude) name, cite and correctly describe your business when a customer asks a relevant question, plus a trace of where the assistants get their information and a ranked list of fixes.' },
    { q: 'Is the self-check on this page really free?', a: 'Yes. It runs in your browser, sends nothing to us, and does not ask for your email. The score and the three bands are the same framework we use in the full audit.' },
    { q: 'How long does it take to improve AI visibility?', a: 'Entity and listing fixes tend to show within a few weeks as the assistants re-crawl their sources. Being chosen over an established competitor takes longer, because it depends on reviews, lists and pages that take months to earn. Google says changes to a site may take months to be fully reassessed; AI systems that read Google inherit that pace.' },
    { q: 'Do AI assistants use my Google Business Profile?', a: 'Yes. Google&rsquo;s AI optimization guide says a complete Business Profile helps products and services appear in AI responses, and Profound measured Business Profile cards driving a large rise in google.com citations inside AI Mode during 2026. Keep it complete, current and reviewed.' },
    { q: 'Can I improve my score without hiring anyone?', a: 'Often, yes. The first band of fixes is consistency work any owner can do in an afternoon: match your facts everywhere, fill every profile field, answer every review, and rewrite your top service page to answer the customer&rsquo;s question in the first paragraph. The guide to getting cited by ChatGPT and Perplexity walks through it.' },
  ],
  related: [['Paid AI search visibility audit ($297)', '/ai-search-visibility-audit/'], ['AI SEO agency', '/ai-seo-agency/'], ['Free SEO audit', '/free-seo-audit/'], ['How to get cited by ChatGPT', '/blog/how-to-get-cited-by-chatgpt/'], ['AI visibility self-audit (long version)', '/blog/ai-visability-self-audit/'], ['Google Maps ranking vs AI Mode', '/blog/google-maps-ranking-vs-ai-mode/']],
  band: ['Scored under 17? Send us the number.', 'Call with your score and your category and the founder will tell you, on the phone, which two fixes would move it most and whether you need us at all.', ['Full audit, free with a campaign', '/contact/']],
  service: { name: 'AI visibility audit', types: ['AI visibility audit', 'AI search audit'], alt: ['AI visibility check', 'AI visibility self-check', 'Free AI visibility audit'], area: [{ '@type': 'Country', name: 'United States' }, { '@type': 'City', name: 'Denver' }] },
  script: "(function(){var f=document.getElementById('avaForm'),n=document.getElementById('avaN'),v=document.getElementById('avaV'),o=document.getElementById('avaOut');if(!f)return;function upd(){var t=0;f.querySelectorAll('input:checked').forEach(function(i){t+=parseInt(i.value,10)||0});n.textContent=t+' / 24';var m,txt;if(t<=8){m='Invisible';txt='Assistants either do not know you exist or confuse you with someone else. Start with identical name, address, phone, hours and categories everywhere, then reviews.'}else if(t<=16){m='Known, not chosen';txt='Engines can find you but recommend a competitor. Add recent reviews, price ranges, and rewrite your top three service pages to open with a direct answer.'}else{m='Cited';txt='You are being named. Protect it: review velocity, every review answered, valid structured data, and watch AI Overview and AI Mode impressions in Search Console.'}v.textContent=t===0?'Tick what you see.':m;o.hidden=t===0;o.innerHTML='<b>'+m+' ('+t+' of 24).</b> '+txt+(t<17?' <a href=\"tel:18004818638\">Call 1-800-481-8638</a> with this number and we will tell you the two fixes that move it most.':'')}f.addEventListener('change',upd);upd()})();",
  style: `:root{--k-hbg:#0B1220}.ava-hero{background:radial-gradient(900px 500px at 80% 15%,rgba(6,182,212,.3),transparent 60%),radial-gradient(600px 400px at 10% 95%,rgba(249,115,22,.22),transparent 60%),#0B1220}.ava-tool{max-height:none}.ava-f fieldset{border:1px solid #E4E7EC;border-radius:12px;padding:10px 12px;margin:0 0 10px}.ava-f legend{font-weight:800;font-size:.84rem;color:#101828;padding:0 6px}.ava-f label{display:flex;gap:8px;align-items:flex-start;font-size:.86rem;color:#344054;margin:4px 0;cursor:pointer}.ava-f input{margin-top:3px;accent-color:#2563EB}.ava-score{display:flex;align-items:center;gap:12px;margin-top:8px;padding:10px 12px;background:#F2F4F7;border-radius:10px}.ava-score b{font-size:1.4rem;color:#101828;white-space:nowrap}.ava-score span{font-size:.86rem;color:#475467}.ava-out{margin-top:10px;font-size:.9rem;line-height:1.55;color:#344054;background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:10px 12px}.ava-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}.ava-two{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:26px}.ava-bands{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}.ava-band{background:#fff;border:1px solid #E4E7EC;border-radius:16px;padding:20px}.ava-band b{display:inline-block;font-size:1.3rem;color:#C15205;font-weight:900}.ava-band h3{margin:4px 0 8px;font-size:1.05rem}.ava-band p{margin:0;font-size:.92rem;color:#475467;line-height:1.6}@media(max-width:900px){.ava-grid,.ava-two,.ava-bands{grid-template-columns:1fr}}`,
};
