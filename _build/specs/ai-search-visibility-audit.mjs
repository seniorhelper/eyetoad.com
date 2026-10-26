// /ai-search-visibility-audit/  targets: ai search visibility audit (paid, flat price), ai visibility report, chatgpt visibility audit price
// Owner split: /ai-visibility-audit/ = the FREE six-prompt self-check; this page = the PAID report and done-for-you fix.
// SKUs (secure-checkout CONTRACT.md): AIVIS-REPORT $297, AIVIS-DFY $750.
const BUY = (sku, label) => `<button type="button" class="sc-buy k-btn k-btn-a px-btn" data-sku="${sku}" data-site="eyetoad.com">${label}</button>`;
export default {
  path: '/ai-search-visibility-audit/',
  prefix: 'asv',
  date: '2026-10-26',
  title: 'AI Search Visibility Audit: $297 Report, $750 Done for You',
  description: 'See if ChatGPT, Google AI Overviews, Perplexity and Gemini name your business. Flat $297 report in 5 business days, or $750 with the fixes done.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'AI search visibility audit &middot; Flat price &middot; Written report in 5 business days',
  h1: 'AI search visibility audit: see who the AI <em>recommends instead of you.</em>',
  kick: 'A real person runs the searches your customers run, writes down what the assistants say, and tells you what to fix first.',
  sub: 'When someone asks ChatGPT or Google&rsquo;s AI for &ldquo;the best roofer near me,&rdquo; one or two businesses get named and everyone else gets nothing. This audit shows you whether you are one of them, where the assistants get their information, and the short list of fixes that would change the answer. $297 for the report. $750 if you want us to make the fixes too.',
  cta2: ['See the two options', '#asv-buy'],
  asideHtml: `<div class="k-slider-wrap px-box" id="asv-buy" aria-label="Order the audit">
<div class="k-chip">Two options, flat prices</div>
<div class="px-opt">
<div class="px-top"><p class="px-name">Audit report</p><p class="px-price">$297<small>one time</small></p></div>
<p class="px-desc">Your written report and ranked fix list, delivered in 5 business days. You or your web person make the fixes.</p>
${BUY('AIVIS-REPORT', 'Order the report, $297')}
</div>
<div class="px-opt px-hi">
<div class="px-top"><p class="px-name">Done for you <span class="px-tag">Most chosen</span></p><p class="px-price">$750<small>one time</small></p></div>
<p class="px-desc">The same report, then we make the top fixes on your site and profiles and re-check the answers 30 days later.</p>
${BUY('AIVIS-DFY', 'Order done for you, $750')}
</div>
<p class="px-fine">No monthly fee and no contract. Bought the report first? The full $297 counts toward the done-for-you upgrade or <a href="/seo-a-la-carte/">$100 SEO tasks</a> ordered within 30 days.</p>
<noscript><p class="px-fine"><b>Checkout needs JavaScript.</b> Call 1-800-481-8638 or email info@eyetoad.com and we will send a secure invoice.</p></noscript>
</div>`,
  capsule: 'An AI search visibility audit checks whether AI assistants (ChatGPT, Google AI Overviews and AI Mode, Perplexity and Gemini) name, cite and correctly describe your business when a customer asks for what you sell, then traces where each answer came from and ranks the fixes. Eye To Ad Media sells it at a flat $297 for the written report, delivered in 5 business days, or $750 with the top fixes done for you. Want to look first? The <a href="/ai-visibility-audit/">free AI visibility self-check</a> takes ten minutes.',
  sections: [
    `<div class="k-chip">What we check</div>
<h2 class="k-h" id="asv-h2a">Nine things that decide whether <em>an assistant names you.</em></h2>
<p class="k-lead">We test the same customer questions on every engine on the same day, so you are comparing like with like.</p>
<div class="k-grid3 asv-checks">
<div class="k-card"><h3 class="k-h3">ChatGPT</h3><p>Recommendation and comparison questions (&ldquo;who should I call for&hellip;&rdquo;, &ldquo;is [you] any good&rdquo;), with and without web search. We log every business it names and every link it cites.</p></div>
<div class="k-card"><h3 class="k-h3">Google AI Overviews and AI Mode</h3><p>Cost, &ldquo;best in [city]&rdquo; and how-to questions. Which pages Google quotes, whether your site is one of them, and whether your Business Profile card appears.</p></div>
<div class="k-card"><h3 class="k-h3">Perplexity and Gemini</h3><p>The same questions again. Perplexity shows its sources plainly, which makes it the quickest way to see which review sites and lists the assistants trust in your category.</p></div>
<div class="k-card"><h3 class="k-h3">Entity and schema</h3><p>Is your business one clear &ldquo;thing&rdquo; online? Name, address, phone, hours, services and owner checked across your site, your profiles and the big data sources, plus your structured data validated line by line.</p></div>
<div class="k-card"><h3 class="k-h3">Citations and sources</h3><p>When a competitor gets named, we find out why: a best-of list, a directory, a review site, a news mention, their own page. That tells you exactly which listing or page you need to earn.</p></div>
<div class="k-card"><h3 class="k-h3">Reviews</h3><p>Count, recency, rating and replies on Google and the review sites the assistants quoted, compared with the businesses that did get named. Stale reviews are one of the most common reasons a known business is passed over.</p></div>
<div class="k-card"><h3 class="k-h3">Local pack</h3><p>Where you sit in Google&rsquo;s map results for your top searches, because the AI answers and the map pack are related but no longer the same list. We note the gaps between the two.</p></div>
<div class="k-card"><h3 class="k-h3">Your key pages</h3><p>Do your home and top service pages open with a plain answer, show a price range, and make the phone number easy to tap? Pages that answer the question are the pages that get quoted.</p></div>
<div class="k-card"><h3 class="k-h3">Accuracy</h3><p>Wrong hours, an old phone number, a service you dropped, a city you never served. We list every wrong fact an assistant repeats about you and where it picked it up.</p></div>
</div>`,

    `<section class="k-sec k-sec-off" aria-labelledby="asv-h2b"><div class="wrap">
<div class="k-chip">Report or done for you</div>
<h2 class="k-h" id="asv-h2b">Same audit. The difference is <em>who makes the fixes.</em></h2>
<div class="px-scroll"><table class="px-tbl">
<caption class="px-cap">What each option includes</caption>
<thead><tr><th scope="col">Included</th><th scope="col">Report, $297</th><th scope="col">Done for you, $750</th></tr></thead>
<tbody>
<tr><th scope="row">20 to 30 customer questions run on ChatGPT, Google AI Overviews and AI Mode, Perplexity and Gemini</th><td>Yes</td><td>Yes</td></tr>
<tr><th scope="row">Answer log with every business named and every source cited</th><td>Yes</td><td>Yes</td></tr>
<tr><th scope="row">Entity, schema, review and local pack check</th><td>Yes</td><td>Yes</td></tr>
<tr><th scope="row">Ranked fix list (10 to 20 fixes, easiest wins first)</th><td>Yes</td><td>Yes</td></tr>
<tr><th scope="row">Structured data (Organization or LocalBusiness, Service) added or fixed on up to 5 key pages</th><td>Written instructions</td><td>We do it</td></tr>
<tr><th scope="row">Name, address and phone corrected on up to 10 listings you can give us access to</th><td>Written instructions</td><td>We do it</td></tr>
<tr><th scope="row">Google Business Profile categories, services and description cleaned up</th><td>Written instructions</td><td>We do it</td></tr>
<tr><th scope="row">Opening paragraph rewritten on your top 3 service pages to answer the question first</th><td>Written instructions</td><td>We do it</td></tr>
<tr><th scope="row">Re-check of the same questions 30 days later, before-and-after summary</th><td>No</td><td>Yes</td></tr>
<tr><th scope="row">Timing</th><td>Report in 5 business days</td><td>Report in 5 business days, fixes within 10 more once access works</td></tr>
</tbody></table></div>
<p class="k-p">The done-for-you fixes need access to your website and manager access to your Google Business Profile. We email you a secure way to share it after checkout. Please never type passwords into a form.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="asv-h2c"><div class="wrap">
<div class="k-chip">What you get</div>
<h2 class="k-h" id="asv-h2c">The report, <em>section by section.</em></h2>
<p class="k-lead">Plain English, about 12 to 20 pages, written for an owner, not a developer. Your web person will have what they need too.</p>
<ol class="k-steps asv-outline">
<li class="k-step"><div><h3>One-page summary</h3><p>Are you named, cited, or missing, on each engine, for your three most valuable searches. The top three fixes in one sentence each.</p></div></li>
<li class="k-step"><div><h3>The answer log</h3><p>Every question we asked, on every engine, with the businesses named and the sources cited. You can repeat any of them yourself later.</p></div></li>
<li class="k-step"><div><h3>Who gets named instead, and why</h3><p>The two or three competitors the assistants prefer, and the lists, reviews and pages that put them there.</p></div></li>
<li class="k-step"><div><h3>Facts the assistants get wrong</h3><p>Each wrong or outdated detail, the source it came from, and how to correct it at the source.</p></div></li>
<li class="k-step"><div><h3>Entity and schema findings</h3><p>Consistency across your site and profiles, structured data errors, and ready-to-paste markup for your key pages.</p></div></li>
<li class="k-step"><div><h3>Reviews and local pack</h3><p>Where you stand against the named competitors on count, recency and replies, and your map position for the same searches.</p></div></li>
<li class="k-step"><div><h3>The fix list</h3><p>Ten to twenty fixes ranked by effort and expected effect, each marked &ldquo;owner can do this&rdquo;, &ldquo;web person&rdquo; or &ldquo;needs outside work&rdquo;.</p></div></li>
</ol>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="asv-h2d"><div class="wrap">
<div class="k-chip">Price, honestly</div>
<h2 class="k-h" id="asv-h2d">What audits like this cost, <em>and what ours does not promise.</em></h2>
<div class="k-grid2">
<div class="k-card"><h3 class="k-h3">The going rate</h3><p>When we looked at published prices in October 2026, AI visibility audits ran from $49 for an automated scan to $3,500 for an agency engagement, with most clustered around $300. Ours sits at the middle on purpose: a person does the searching and the writing, and the price is on this page instead of behind a sales call.</p></div>
<div class="k-card"><h3 class="k-h3">What we guarantee</h3><p>The work and the timing: the full report in 5 business days, and the done-for-you fixes within 10 business days after access works. We do not guarantee that an assistant will name you by a certain date. Nobody can, and anyone who does is guessing. AI answers also change from one day to the next, which is why the log records the date of every answer.</p></div>
</div>
<p class="k-p">Already in an Eye To Ad Media campaign? The audit is included there and repeated monthly. If you want everything looked at at once, including speed and conversion, start with the <a href="/free-seo-audit/">free SEO audit</a>. For the bigger picture of how we work on AI search, see our <a href="/ai-seo-agency/">AI SEO agency</a> page.</p>
<script src="https://usabusinesssearch.com/secure-checkout/checkout.js" defer></script>
</div></section>`,
  ],
  faqH2: 'About the AI search visibility audit.',
  faq: [
    { q: 'What is the difference between this and your free AI visibility check?', a: 'The <a href="/ai-visibility-audit/">free self-check</a> is six prompts you run yourself in about ten minutes, scored out of 24. It tells you roughly where you stand. This paid audit is the full version done by a person: 20 to 30 real customer questions on every major assistant, every source traced, your listings and structured data checked, and a written fix list ranked by effort. If the free check scores you low and you are not sure why, this is the next step.' },
    { q: 'How long does it take?', a: 'The report arrives within 5 business days of your order and the short intake email we send right after checkout (your top services, your service area and the competitors you worry about). On the done-for-you option, the fixes are finished within 10 more business days once we have access to your website and Google Business Profile, and we re-run the same questions 30 days after that.' },
    { q: 'Will this get my business recommended by ChatGPT?', a: 'It shows you why you are or are not being recommended and what would change it. We cannot promise an assistant will name you, because these systems decide on their own and their answers shift from day to day. What we do promise is the work: the full report on time and, on the done-for-you option, the fixes made and re-checked. Most fixes, like matching your facts everywhere and earning recent reviews, also help your regular Google rankings.' },
    { q: 'Which AI assistants do you test?', a: 'ChatGPT, Google AI Overviews, Google AI Mode, Perplexity and Gemini, because those are the ones local customers use most for recommendations today. We ask the same questions on each one on the same day so the answers are comparable. If your customers lean on another assistant, tell us in the intake email and we will add its answers to the log.' },
    { q: 'What do you need from me?', a: 'For the report, only your website address, your main services and service area, and any competitors you want compared. For the done-for-you option, we also need access to your website (or your web person&rsquo;s contact) and manager access to your Google Business Profile. We email you a secure way to share access after checkout. Please do not send passwords by email or put them in a form.' },
    { q: 'Can the $297 count toward more work?', a: 'Yes. If you buy the report and then decide you want help, the full $297 counts toward the done-for-you upgrade or toward <a href="/seo-a-la-carte/">$100 SEO tasks</a> ordered within 30 days of your report. Call 1-800-481-8638 or reply to your report email and we apply it to the invoice.' },
    { q: 'Is there a refund if I am not happy?', a: 'Tell us within 7 days of receiving the report what is missing or wrong and we will fix or add to it at no charge. If we miss the 5-business-day delivery date and you would rather not wait, ask and we refund you in full. Call 1-800-481-8638 or email info@eyetoad.com.' },
  ],
  related: [['Free AI visibility self-check', '/ai-visibility-audit/'], ['AI SEO agency', '/ai-seo-agency/'], ['Local Launch Kit', '/local-launch-kit/'], ['Review Booster', '/review-booster/'], ['How to get cited by ChatGPT', '/blog/how-to-get-cited-by-chatgpt/']],
  band: ['Want to know before you buy?', 'Call and tell us your business and city. The founder will tell you, on the phone, whether the audit is worth $297 for you or whether the free self-check is enough.', ['Take the free self-check', '/ai-visibility-audit/']],
  service: {
    name: 'AI search visibility audit', types: ['AI search visibility audit', 'AI visibility audit'], alt: ['AI search audit', 'ChatGPT visibility audit', 'AI Overviews visibility audit'],
    area: { '@type': 'Country', name: 'United States' },
    offers: [
      { '@type': 'Offer', name: 'AI search visibility audit report', sku: 'AIVIS-REPORT', price: '297', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://eyetoad.com/ai-search-visibility-audit/', description: 'Written audit report and ranked fix list, delivered in 5 business days.' },
      { '@type': 'Offer', name: 'AI search visibility audit, done for you', sku: 'AIVIS-DFY', price: '750', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://eyetoad.com/ai-search-visibility-audit/', description: 'The audit report plus the top fixes made on your site and profiles, and a re-check 30 days later.' },
    ],
  },
  script: "document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.sc-buy');if(b&&typeof window.gtag==='function'){try{window.gtag('event','sc_buy_click',{sku:b.getAttribute('data-sku'),page:location.pathname})}catch(x){}}});",
  style: `:root{--k-hbg:#0B1220}.asv-hero{background:radial-gradient(900px 500px at 82% 12%,rgba(37,99,235,.32),transparent 60%),radial-gradient(600px 400px at 8% 96%,rgba(249,115,22,.22),transparent 60%),#0B1220}
.px-box{color:#101828}.px-opt{border:1.5px solid #E4E7EC;border-radius:14px;padding:16px;margin:0 0 12px;background:#fff}.px-hi{border-color:#F97316;box-shadow:0 10px 28px rgba(234,88,12,.14)}
.px-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}.px-name{margin:0;font-weight:800;font-size:1.05rem;color:#101828}
.px-tag{display:inline-block;margin-left:6px;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;background:#FFF7ED;color:#9A3412;border-radius:20px;padding:3px 9px;vertical-align:2px}
.px-price{margin:0;font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:1.9rem;color:#101828;line-height:1}.px-price small{font-family:system-ui,-apple-system,Roboto,Arial;font-size:.78rem;font-weight:600;color:#667085;margin-left:6px}
.px-desc{margin:8px 0 12px;font-size:.92rem;line-height:1.55;color:#475467}.px-btn{width:100%;min-height:50px;font-size:.98rem;background:#C15205}.px-btn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.px-fine{margin:6px 0 0;font-size:.84rem;line-height:1.5;color:#475467}.px-fine a{color:#1D4ED8}
.px-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:22px;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.px-tbl{width:100%;min-width:560px;border-collapse:collapse;font-size:.93rem}.px-tbl th,.px-tbl td{padding:12px 14px;border-bottom:1px solid #EEF0F3;text-align:left;vertical-align:top;line-height:1.5}
.px-tbl thead th{background:#101828;color:#fff;font-weight:800}.px-tbl tbody th{font-weight:600;color:#101828}.px-tbl td{color:#344054}.px-tbl tbody tr:last-child>*{border-bottom:0}
.px-cap{caption-side:top;text-align:left;padding:12px 14px 0;font-weight:800;color:#101828}
.asv-checks{margin-top:24px}.asv-outline{margin:24px 0 0;padding:0;list-style:none;max-width:860px}
@media(max-width:640px){.px-price{font-size:1.6rem}.px-opt{padding:14px}}`,
};
