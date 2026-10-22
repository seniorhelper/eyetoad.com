import { hbars } from './chart-helpers.mjs';
// Post: tracking AI search traffic and leads (GA4 + Search Console). Facts read live 2026-10-22.
const css = `.gx-fig{margin:26px 0 30px;padding:18px 18px 14px;background:#FFFFFF;border:1.5px solid #E4E7EC;border-radius:16px;color:#101828}.gx-fig figcaption{font-size:.86rem;color:#475467;line-height:1.5;margin-top:10px}.gx-fig figcaption b{color:#101828}.gx-fig svg{display:block;width:100%;height:auto}.gx-fig details{margin-top:8px;font-size:.85rem;color:#475467}.gx-fig details summary{cursor:pointer;font-weight:700;color:#1D4ED8}.gx-fig table{border-collapse:collapse;margin-top:8px;font-size:.85rem}.gx-fig td,.gx-fig th{border:1px solid #E4E7EC;padding:5px 8px;text-align:left}
.ai-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:18px 0 26px}.ai-map div{background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;padding:14px 16px;font-size:.92rem;line-height:1.5;color:#344054}.ai-map b{display:block;color:#101828;font-size:1rem;margin-bottom:4px}.ai-map i{font-style:normal;display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:20px;margin-bottom:8px}.ai-map .t1 i{background:#DBEAFE;color:#1E40AF}.ai-map .t2 i{background:#FFEDD5;color:#9A3412}.ai-map .t3 i{background:#F2F4F7;color:#344054}
.rx{margin:24px 0 30px;padding:20px;background:#F9FAFB;border:1.5px solid #D0D5DD;border-radius:16px}.rx h3{margin:0 0 6px}.rx p.n{font-size:.85rem;color:#475467;margin:0 0 12px}.rx-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:7px}.rx label{display:flex;gap:8px;align-items:center;padding:8px 10px;border-radius:10px;background:#fff;border:1px solid #E4E7EC;font-size:.92rem;color:#344054;cursor:pointer}.rx input[type=checkbox]{width:19px;height:19px;accent-color:#2563EB;flex:none}.rx textarea{width:100%;box-sizing:border-box;min-height:84px;margin:12px 0 6px;padding:10px 12px;border-radius:10px;border:1.5px solid #98A2B3;background:#101828;color:#E0F2FE;font:13px/1.5 ui-monospace,Consolas,monospace;resize:vertical}.rx button{font:700 .9rem system-ui,sans-serif;padding:9px 14px;border-radius:10px;border:2px solid #101828;background:#101828;color:#fff;cursor:pointer}.rx .tst{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}.rx .tst label{flex:0 0 auto;border:0;background:none;padding:0;font-weight:700}.rx input[type=text]{flex:1 1 200px;min-width:0;padding:9px 11px;border-radius:10px;border:1.5px solid #98A2B3;font:14px ui-monospace,Consolas,monospace;color:#101828;background:#fff}.rx output{display:block;margin-top:8px;font-weight:800;font-size:.92rem;color:#101828}
.bl-src{margin:40px 0 0;padding:18px 20px;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:16px}.bl-src h2{font-size:1.1rem;margin:0 0 10px}.bl-src ol{margin:0;padding-left:20px;font-size:.9rem;color:#475467}.bl-src li{margin:0 0 6px;line-height:1.5;overflow-wrap:anywhere}.lp-tbl{overflow-x:auto;margin:18px 0 24px;border:1px solid #E4E7EC;border-radius:14px}.lp-tbl table{width:100%;border-collapse:collapse;font-size:.92rem;min-width:560px}.lp-tbl th{text-align:left;background:#F2F4F7;padding:10px 12px;font-size:.76rem;letter-spacing:.06em;text-transform:uppercase}.lp-tbl td{padding:10px 12px;border-top:1px solid #EAECF0;vertical-align:top;line-height:1.5}.lp-tbl td:first-child{font-weight:800;color:#101828}.np-btn-ghost{background:#fff!important;color:#101828!important;border:2px solid #101828!important}.np-btn-ghost:hover{background:#101828!important;color:#fff!important}`;

const bars = (id, title, desc, rows, max, unit, colorFirst) => hbars({ id, title, desc, max, rows: rows.map((r, i) => ({ label: r[0], values: [{ v: r[1], text: r[1] + unit, color: i === 0 && colorFirst ? '#2563EB' : (r[2] || '#60A5FA') }] })) });
const plat = [['ChatGPT', 74.78], ['Gemini', 11.56], ['Perplexity', 7.23], ['Copilot', 3.51], ['Claude', 2.62]];
const platSvg = bars('plat', 'Share of AI platform referrals by assistant, SE Ranking 2026', 'Bar chart. ChatGPT 74.78 percent, Gemini 11.56, Perplexity 7.23, Copilot 3.51, Claude 2.62 percent of AI referral visits.', plat, 80, '%', true);
const yr = [['2024', 0.02, '#98A2B3'], ['2025', 0.24, '#60A5FA'], ['2026', 0.32, '#2563EB']];
const yrSvg = bars('yr', 'AI platforms as a share of all website traffic, by year', 'Bar chart. AI platforms were 0.02 percent of all website traffic in 2024, 0.24 percent in 2025 and 0.32 percent in 2026. For scale, organic search was 42.75 percent.', yr, 0.4, '%', false);
const pew = [['No AI summary', 15, '#98A2B3'], ['AI summary shown', 8, '#F97316'], ['Link inside summary', 1, '#FB923C']];
const pewSvg = bars('pew', 'Share of Google visits with a click on a result, Pew Research 2025', 'Bar chart. Users clicked a traditional result link on 15 percent of visits without an AI summary and 8 percent with one. A link inside the AI summary was clicked on 1 percent of visits.', pew, 18, '%', false);

const plats = [
  ['chatgpt', 'ChatGPT', 'chatgpt\\.com|chat\\.openai\\.com', true],
  ['perplexity', 'Perplexity', 'perplexity\\.ai', true],
  ['gemini', 'Gemini', 'gemini\\.google\\.com', true],
  ['copilot', 'Microsoft Copilot', 'copilot\\.microsoft\\.com|copilot\\.com', true],
  ['claude', 'Claude', 'claude\\.ai', true],
  ['deepseek', 'DeepSeek', 'chat\\.deepseek\\.com|deepseek\\.com', false],
  ['grok', 'Grok', 'grok\\.com', false],
  ['metaai', 'Meta AI', 'meta\\.ai', false],
];
const tool = `<div class="rx" id="rx"><h3>AI source regex builder and tester</h3><p class="n">Pick the assistants you want in your channel. The pattern matches the domain with or without www and with or without a subdomain, and it will not catch unrelated sources like mail.google.com. Domains are the ones commonly seen in GA4 source reports; confirm against your own Traffic acquisition report before saving. Nothing you type leaves this page.</p>
<div class="rx-g">${plats.map((p) => `<label><input type="checkbox" data-re="${p[2]}" ${p[3] ? 'checked' : ''}> ${p[1]}</label>`).join('')}</div>
<label for="rx-out" style="border:0;background:none;padding:12px 0 0;font-weight:700">Regex for the &ldquo;Source matches regex&rdquo; condition</label><textarea id="rx-out" readonly spellcheck="false"></textarea><button type="button" id="rx-copy">Copy regex</button>
<div class="tst"><label for="rx-in">Test a source:</label><input type="text" id="rx-in" value="chatgpt.com" autocomplete="off" spellcheck="false"></div><output id="rx-res" for="rx-in" aria-live="polite"></output></div>`;
const script = `(function(){var r=document.getElementById('rx');if(!r)return;var boxes=[].slice.call(r.querySelectorAll('input[type=checkbox]')),out=document.getElementById('rx-out'),inp=document.getElementById('rx-in'),res=document.getElementById('rx-res');function pat(){var p=boxes.filter(function(b){return b.checked;}).map(function(b){return b.dataset.re;});return p.length?'^(.*\\\\.)?('+p.join('|')+')$':'';}function test(){var p=out.value;if(!p){res.textContent='Pick at least one assistant.';return;}var v=inp.value.trim().toLowerCase();if(!v){res.textContent='';return;}var ok=new RegExp(p).test(v);res.textContent=ok?'\\u2714 "'+v+'" would be counted in your AI channel.':'\\u2716 "'+v+'" would not match.';res.style.color=ok?'#166534':'#9A3412';}function upd(){out.value=pat();test();}boxes.forEach(function(b){b.addEventListener('change',upd);});inp.addEventListener('input',test);document.getElementById('rx-copy').addEventListener('click',function(){out.select();try{navigator.clipboard.writeText(out.value);}catch(e){try{document.execCommand('copy');}catch(e2){}}this.textContent='Copied';var t=this;setTimeout(function(){t.textContent='Copy regex';},1500);});upd();})();`;

export default {
  type: 'post',
  path: '/blog/track-ai-search-traffic-and-leads/',
  date: '2026-10-22',
  dateText: 'October 22, 2026',
  read: 12,
  section: 'AI search',
  title: 'Track AI Search Traffic and Leads in GA4 and Search Console',
  description: 'Where ChatGPT, Gemini, AI Overviews and AI Mode traffic shows up in GA4 and Search Console in 2026, with a regex builder and a call and lead tracking setup.',
  eyebrow: 'AI search &middot; Measurement',
  h1: 'How to track AI search traffic and leads in GA4 and Search Console (2026 guide for local businesses)',
  lede: 'Every owner we talk to has heard that &ldquo;AI search is changing everything,&rdquo; and almost none of them can say how many calls it sent last month. That number is measurable, mostly with tools you already have. Here is where each kind of AI traffic shows up, what is invisible, and a simple monthly report.',
  key: 'Google AI Overviews and AI Mode clicks are counted inside Search Console&rsquo;s normal Web performance data, and since August 31, 2026 every site also has a separate, impressions-only Generative AI report. Visits from ChatGPT, Gemini, Copilot and similar assistants land in GA4&rsquo;s built-in AI Assistant channel, which excludes Google&rsquo;s own AI features. To connect either to revenue, mark calls and form submissions as GA4 key events and ask every new customer how they found you.',
  toc: ['Where AI traffic shows up', 'How big is it?', 'How Search Console counts AI Overviews and AI Mode', 'The Generative AI report', 'Does GA4 track ChatGPT automatically?', 'Build your own AI channel (regex builder)', 'Why AI clicks behave differently', 'Tie AI visits to calls and jobs', 'What you cannot measure', 'The monthly AI report'],
  body: `<h2 id="s1">Where does AI search traffic show up in analytics?</h2>
<p>There are three kinds of &ldquo;AI search traffic,&rdquo; and each lands somewhere different. Mixing them up is the most common reason owners think AI is sending nothing, or everything.</p>
<div class="ai-map">
<div class="t1"><i>Google Search Console</i><b>AI Overviews and AI Mode</b>Clicks, impressions and positions are folded into the normal Performance report under the Web search type. A separate Generative AI report shows impressions only.</div>
<div class="t2"><i>Google Analytics 4</i><b>ChatGPT, Gemini app, Copilot, Perplexity, Claude</b>Visits arrive as referrals and GA4 sorts the ones it recognizes into a built-in AI Assistant channel. Google&rsquo;s own AI Overviews and AI Mode are excluded from it.</div>
<div class="t3"><i>Your phone and CRM</i><b>People who read an AI answer and then call</b>No click, no session. The only ways to see them are call tracking, the &ldquo;how did you hear about us&rdquo; question and brand-search trends.</div>
</div>
<p>For a Denver plumber, roofer or dentist, the third box is often the biggest. Someone asks an assistant who handles emergency water heater replacement in Littleton, reads three names, and dials one from the Business Profile without ever visiting a website. Keep that in mind while reading the analytics sections: they measure the visits, not the whole effect.</p>

<h2 id="s2">How much traffic do AI assistants actually send?</h2>
<p>Less than the headlines suggest, but growing fast. SE Ranking&rsquo;s June 2026 study of 101,574 websites (January 2025 to April 2026) found that &ldquo;AI platforms now account for 0.32% of all website traffic,&rdquo; up from 0.24% in 2025 and 0.02% in 2024. Organic search, for comparison, was 42.75% of all traffic in the same data.</p>
<figure class="gx-fig">${yrSvg}<figcaption><b>AI platforms as a share of all website traffic.</b> 0.02% in 2024, 0.24% in 2025, 0.32% in 2026; organic search was 42.75% in the same study. Source: SE Ranking, June 18, 2026 (source 8).</figcaption><details><summary>Chart data</summary><table><tr><th>Year</th><th>AI platforms&rsquo; share of all traffic</th></tr>${yr.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}%</td></tr>`).join('')}</table></details></figure>
<p>Within that slice, one assistant dominates. In the same study ChatGPT sent about three of every four AI referrals:</p>
<figure class="gx-fig">${platSvg}<figcaption><b>Share of AI referral visits by assistant, 2026.</b> ChatGPT 74.78%, Gemini 11.56%, Perplexity 7.23%, Copilot 3.51%, Claude 2.62%. Source: SE Ranking, June 18, 2026 (source 8).</figcaption><details><summary>Chart data</summary><table><tr><th>Assistant</th><th>Share of AI referrals</th></tr>${plat.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}%</td></tr>`).join('')}</table></details></figure>
<p>Two cautions before you compare these to your own numbers. First, they are averages across every kind of site; a local service business can look very different, so compare against your own GA4 rather than the study. Second, they only count clicks. The BrightLocal 2026 consumer survey found 45% of consumers now use ChatGPT or another AI tool for local recommendations, up from 6% a year earlier. Usage is far ahead of clicks, which is exactly why the &ldquo;how did you hear about us&rdquo; question in section 8 matters.</p>

<h2 id="s3">How does Search Console count AI Overviews and AI Mode?</h2>
<p>Google&rsquo;s documentation is explicit: &ldquo;sites appearing in AI features (such as AI Overviews and AI Mode) are included in the overall search traffic&rdquo; and are &ldquo;reported on in the Performance report, within the &lsquo;Web&rsquo; search type.&rdquo; There is no filter in the main Performance report that splits AI Overview clicks from blue-link clicks. The counting rules, from Search Console&rsquo;s help page:</p>
<ul>
<li><b>AI Overviews:</b> &ldquo;An AI Overview occupies a single position in search results,&rdquo; and every link inside it shares that position. Standard impression rules apply, so a link counts as an impression when it could be seen.</li>
<li><b>AI Mode:</b> &ldquo;Position in AI Mode follows the same methodology as a Google Search results page.&rdquo; When the user asks a follow-up, it counts as a new query: &ldquo;All impression, position, and click data in the new response are counted as coming from this new user query.&rdquo;</li>
</ul>
<p>The practical effect for a local business: if your average position for &ldquo;furnace repair denver&rdquo; jumped from 6 to 2 without any ranking work, a citation inside an AI Overview may be the reason, because the whole Overview counts as one position near the top. Conversely, a falling click-through rate with steady impressions often means an Overview is answering the question above you.</p>

<h2 id="s4">What is the Search Console Generative AI report?</h2>
<p>On June 3, 2026, Google announced a separate report: &ldquo;a separate view dedicated to visibility from generative AI features,&rdquo; while that data also stays &ldquo;included in the overall performance report.&rdquo; An update on the same post says: &ldquo;As of August 31, 2026, we&rsquo;ve rolled out these insights to all websites worldwide.&rdquo;</p>
<p>Know its limits before you show it to anyone. The help page for the &ldquo;Generative AI performance report (Search)&rdquo; defines one metric, impressions: &ldquo;how many times links to your site were shown to a user in a generative AI feature on Google Search.&rdquo; It does not report clicks or queries. You can break it down by page, country, date and device, and switch between &ldquo;Web: text-based&rdquo; and &ldquo;Web: multimodal.&rdquo; Google also notes that small sites may not see the report at all.</p>
<p>So use it for one job: which of your pages Google&rsquo;s AI features show, and whether that is growing. If your service pages appear and your blog does not (or the reverse), that tells you where AI features find you useful. Pair it with the main Performance report for clicks.</p>

<h2 id="s5">Does GA4 track ChatGPT traffic automatically?</h2>
<p>Mostly, yes, as of 2026. Google&rsquo;s default channel group definitions now include a channel called AI Assistant: &ldquo;AI Assistant is the channel by which users arrive at your site from sources like ChatGPT, Gemini, Deepseek, Copilot, or Grok.&rdquo; GA4 assigns it automatically when the referrer is on Google&rsquo;s list of AI assistant sources (the rule is that the medium exactly matches &ldquo;ai-assistant&rdquo;). The same page adds the line most people miss: &ldquo;It excludes Google&rsquo;s AI Overviews and AI Mode.&rdquo; Those stay in Organic Search, which is consistent with how Search Console counts them.</p>
<p>To see it: Reports, Acquisition, Traffic acquisition, then look for AI Assistant in the Session default channel group. If you see nothing, check two things before concluding AI sends you no visits. The first is the date range: low-traffic local sites may get a handful of AI visits a month. The second is whether an older custom setup is relabeling referrals. You will also often see ChatGPT visits tagged with utm_source=chatgpt.com in the landing-page URL; that tag is added on ChatGPT&rsquo;s side, so check your own landing-page report for it rather than assuming.</p>

<h2 id="s6">How do I build my own AI channel group in GA4?</h2>
<p>The built-in channel is a good default, but a custom channel group lets you choose exactly which assistants count and keeps your history comparable if Google changes its list. Google&rsquo;s help page on custom channel groups gives the essentials: standard properties get two custom groups (360 properties get five), each with up to 50 channels; &ldquo;Custom channel groups can be applied to your reports retroactively&rdquo;; and &ldquo;Traffic is included in the first channel whose definition it matches given the current order of channels in the group.&rdquo;</p>
<p>That last rule is where most setups go wrong. The steps:</p>
<ol>
<li>Admin, Data display, Channel groups, Create new channel group. Start by copying the default group so every other channel keeps working.</li>
<li>Add a channel named something like &ldquo;AI assistants.&rdquo; Condition: Source, matches regex, then paste the pattern from the builder below.</li>
<li>Reorder so your AI channel sits <b>above Referral</b>. If it sits below, Referral claims the visits first and your AI channel stays empty.</li>
<li>Save, then pick your new group as the primary dimension in Traffic acquisition. Because groups apply retroactively, you will see past months too.</li>
</ol>
<p>Google&rsquo;s own help page includes an example AI regex. It is a reasonable start but has two quirks worth knowing: its example text mentions Claude while the pattern does not include it, and its first branch (anything containing &ldquo;ai&rdquo;) also matches sources such as mail.google.com. The builder below writes a tighter pattern from the assistants you pick.</p>
${tool}

<h2 id="s7">Why do AI clicks behave differently from regular search clicks?</h2>
<p>Because the search did more of the work before the click. Pew Research Center tracked 68,879 real Google searches by 900 US adults in March 2025. When an AI summary appeared, users clicked a traditional result on 8% of visits, against 15% when no summary appeared, and clicked a link inside the summary on just 1% of visits. Sessions also ended on the results page more often with a summary (26%) than without (16%).</p>
<figure class="gx-fig">${pewSvg}<figcaption><b>Visits with a click on a search result, with and without a Google AI summary.</b> 15% without, 8% with; 1% clicked a link inside the summary. Source: Pew Research Center, July 22, 2025 (source 9).</figcaption><details><summary>Chart data</summary><table><tr><th>Situation</th><th>Visits with a click</th></tr>${pew.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}%</td></tr>`).join('')}</table></details></figure>
<p>Google&rsquo;s position is that the clicks that remain are better ones. Its AI features documentation says &ldquo;these clicks are higher quality (meaning, users are more likely to spend more time on the site),&rdquo; and Liz Reid wrote in August 2025 that &ldquo;total organic click volume from Google Search to websites has been relatively stable year-over-year,&rdquo; defining quality clicks as &ldquo;those where users don&rsquo;t quickly click back.&rdquo; Google has not published the underlying data, so treat it as Google&rsquo;s claim. Your own GA4 numbers are the test: compare engagement rate and key-event rate for the AI Assistant channel against Organic Search over 90 days.</p>
<p>What to do with a smaller, warmer stream of visitors is a conversion question as much as a search one. Our network&rsquo;s conversion team wrote the playbook for that in <a href="https://searchconverts.com/ai-traffic-conversion-optimization/">converting AI-referred visitors</a>, including which landing-page elements those visitors look for first.</p>

<h2 id="s8">How do I tie AI visits to calls, forms and booked jobs?</h2>
<p>Traffic is not the goal; booked work is. For a local service business, four pieces close the loop:</p>
<ol>
<li><b>Key events for every lead action.</b> In GA4, mark form submissions, click-to-call taps (clicks on tel: links), text-link taps and booking confirmations as key events. Then the AI Assistant row in Traffic acquisition shows leads, not just sessions.</li>
<li><b>Call tracking with a website pool.</b> Most local leads phone in. Dynamic number insertion on the website (with your main number left alone on the Business Profile and citations) attributes calls back to the session source, including AI assistants. Our <a href="/blog/call-tracking-local-seo/">call tracking guide</a> explains how to do it without hurting your name, address and phone consistency.</li>
<li><b>One required question at intake.</b> &ldquo;How did you hear about us?&rdquo; with &ldquo;ChatGPT or another AI assistant&rdquo; and &ldquo;Google AI answer&rdquo; as options, alongside Google search, Maps, referral and the rest. This is the only way to count the people in the third box at the top of this page. Ask it on the phone and in the form, and write the answer into your CRM.</li>
<li><b>A monthly join.</b> Put the GA4 key events by channel, the call tracking report and the intake answers side by side. When they disagree (they will), the intake answer is usually closest to the truth for phone-first businesses.</li>
</ol>
<p>The Business Profile has its own gap: it reports calls, website clicks and direction requests, but it does not say whether the person found you through a map search, an AI Overview or Ask Maps. That is one more reason the intake question matters. Our <a href="/blog/google-business-profile-changes-2026/">Business Profile changes post</a> covers what else changed there.</p>

<h2 id="s9">What AI search activity can&rsquo;t be measured?</h2>
<p>Be honest with yourself (and with any agency report you receive) about three blind spots:</p>
<ul>
<li><b>Answers with no click.</b> When an assistant names your business and the customer calls from memory or from the map, analytics never sees a session. Only intake questions and call tracking on your main line catch it.</li>
<li><b>What the assistant said.</b> No analytics tool tells you whether ChatGPT described you accurately or recommended a competitor. Spot-check by asking the assistants the questions your customers ask, monthly, and save the answers. Our <a href="/blog/ai-visability-self-audit/">AI visibility self-audit</a> gives you the prompts.</li>
<li><b>Influence that shows up later as a brand search.</b> A customer who read your name in an AI answer and searched for it the next day appears as branded organic traffic. A rising trend in branded queries in Search Console is the indirect signal.</li>
</ul>

<h2 id="s10">What should a monthly AI search report include?</h2>
<p>Here is a one-page format. It fits in a spreadsheet and takes about twenty minutes once the setup above is done.</p>
<div class="lp-tbl"><table><thead><tr><th>Line</th><th>Where it comes from</th><th>What it tells you</th></tr></thead><tbody>
<tr><td>AI feature impressions, by page</td><td>Search Console, Generative AI report</td><td>Which pages Google&rsquo;s AI features show, and the trend</td></tr>
<tr><td>Organic clicks and CTR on top service queries</td><td>Search Console, Performance (Web)</td><td>Whether AI Overviews are taking clicks from your money terms</td></tr>
<tr><td>AI Assistant sessions and key events</td><td>GA4, Traffic acquisition</td><td>Visits and leads from ChatGPT, Gemini, Copilot, Perplexity and others</td></tr>
<tr><td>Key-event rate, AI vs organic</td><td>GA4</td><td>Whether AI visitors convert better, as Google claims, on your site</td></tr>
<tr><td>Calls by source</td><td>Call tracking</td><td>Phone leads from AI sessions and from organic</td></tr>
<tr><td>&ldquo;Heard about us&rdquo; answers mentioning AI</td><td>CRM or intake sheet</td><td>The zero-click share no analytics tool sees</td></tr>
<tr><td>Branded query clicks</td><td>Search Console, query filter</td><td>Indirect lift from being named in answers</td></tr>
<tr><td>Assistant spot-check</td><td>Five saved prompts, run monthly</td><td>Whether you are named, and whether the description is right</td></tr>
</tbody></table></div>
<p>Run it for three months before drawing conclusions. AI referral counts for a local business are small and noisy, and one month&rsquo;s spike can be a single customer comparing quotes on ChatGPT. The trend line and the intake answers are what to act on.</p>`,
  cta: ['Want this set up for you?', 'We will build the AI channel, key events and the monthly report on your GA4 and Search Console, and show you what AI search sent you last quarter.', 'Get a free SEO audit', '/free-seo-audit/'],
  faq: [
    { q: 'Does Google Search Console show AI Overview clicks separately?', a: 'No. Google says AI Overviews and AI Mode traffic is included in the Performance report under the Web search type. The separate Generative AI report, available to all sites since August 31, 2026, shows impressions only, not clicks or queries.' },
    { q: 'Where is ChatGPT traffic in Google Analytics 4?', a: 'In the built-in AI Assistant channel of the default channel group, under Reports, Acquisition, Traffic acquisition. Google says the channel covers sources like ChatGPT, Gemini, DeepSeek, Copilot and Grok, and excludes Google&rsquo;s AI Overviews and AI Mode.' },
    { q: 'Why is my custom AI channel in GA4 empty?', a: 'Usually because it sits below Referral in the channel order. GA4 puts traffic in the first channel whose rule it matches, so move the AI channel above Referral. Custom channel groups apply retroactively, so past data will fill in.' },
    { q: 'How much traffic do AI assistants send to websites?', a: 'SE Ranking&rsquo;s 2026 study of 101,574 sites found AI platforms sent 0.32% of all website traffic, up from 0.24% in 2025. ChatGPT accounted for about 75% of those AI referrals.' },
    { q: 'How do I know if customers found me through ChatGPT if they just called?', a: 'Ask. A required &ldquo;How did you hear about us?&rdquo; question with AI options, recorded in your CRM, is the only reliable way to count people who read an AI answer and phoned without visiting your site.' },
    { q: 'Are clicks from AI Overviews better quality?', a: 'Google says they are, meaning users spend more time on the site, but has not published the data. Compare engagement and key-event rates for AI and organic traffic in your own GA4 over 90 days.' },
  ],
  sources: [
    ['Google Search Central, AI features and your website', 'https://developers.google.com/search/docs/appearance/ai-features'],
    ['Search Console Help, Performance report: how impressions, position and clicks are counted', 'https://support.google.com/webmasters/answer/7042828'],
    ['Google Search Central Blog, generative AI performance reports in Search Console (June 3, 2026; all sites August 31, 2026)', 'https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports'],
    ['Search Console Help, Generative AI performance report (Search)', 'https://support.google.com/webmasters/answer/16984139'],
    ['Google Analytics Help, default channel group (AI Assistant channel)', 'https://support.google.com/analytics/answer/9756891'],
    ['Google Analytics Help, custom channel groups', 'https://support.google.com/analytics/answer/13051316'],
    ['Google, AI in Search is driving more queries and higher quality clicks (Liz Reid, August 6, 2025)', 'https://blog.google/products/search/ai-search-driving-more-queries-higher-quality-clicks/'],
    ['SE Ranking, AI traffic research study (June 18, 2026; 101,574 sites)', 'https://seranking.com/blog/ai-traffic-research-study/'],
    ['Pew Research Center, Google users are less likely to click on links when an AI summary appears (July 22, 2025)', 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/'],
    ['BrightLocal, Local Consumer Review Survey 2026', 'https://www.brightlocal.com/research/local-consumer-review-survey/'],
  ],
  more: [['How to get cited by ChatGPT', '/blog/how-to-get-cited-by-chatgpt/', 'Earn the mention first'], ['Call tracking and local SEO', '/blog/call-tracking-local-seo/', 'Count the calls'], ['Should you opt out of AI Overviews?', '/blog/opt-out-of-google-ai-features/', 'The Search Console toggle']],
  style: css,
  script,
};
