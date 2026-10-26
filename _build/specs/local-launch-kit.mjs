// /local-launch-kit/  targets: local business launch kit, new business marketing package, marketing package for new local business
// SKU (secure-checkout CONTRACT.md): LAUNCHKIT = $497 setup + LAUNCHKIT-M $97/mo.
const BUY = (sku, label) => `<button type="button" class="sc-buy k-btn k-btn-a px-btn" data-sku="${sku}" data-site="eyetoad.com">${label}</button>`;
export default {
  path: '/local-launch-kit/',
  prefix: 'llk',
  date: '2026-10-26',
  title: 'Local Launch Kit | Get Found, Own Your Leads, $497 + $97/mo',
  description: 'Directory listings, a press release, 3 SEO fixes, review requests and instant lead replies for local businesses. $497 setup, $97/mo, cancel anytime.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'Local Launch Kit &middot; $497 setup + $97/mo &middot; Cancel anytime online',
  h1: 'Local Launch Kit: get found, get reviewed, <em>and keep your own leads.</em>',
  kick: 'The groundwork a local business needs in its first year, done for you in about two weeks, at a price posted on this page.',
  sub: 'You started a business to support your family, not to learn directory dashboards. The Launch Kit puts you in the places customers and AI assistants look, starts asking every customer for a review, and answers every web lead the moment it arrives. Every lead it produces comes to you, not to a marketplace that sells the same lead to three of your competitors.',
  cta2: ['See what is included', '#llk-buy'],
  asideHtml: `<div class="k-slider-wrap px-box" id="llk-buy" aria-label="Order the Local Launch Kit">
<div class="k-chip">One kit, one price</div>
<div class="px-opt px-hi">
<div class="px-top"><p class="px-name">Local Launch Kit</p><p class="px-price">$497<small>setup, once</small></p></div>
<p class="px-then">then <b>$97 a month</b> to keep it all running</p>
<ul class="px-list">
<li>Verified + Featured directory listings</li>
<li>1 press release, written and published</li>
<li>3 SEO fixes on your website</li>
<li>Review requests set up and running</li>
<li>Instant reply to every web lead</li>
</ul>
${BUY('LAUNCHKIT', 'Start my Launch Kit, $497')}
<p class="px-fine">You pay $497 today. The $97 monthly plan starts 30 days later and renews monthly until you cancel. Cancel anytime online; no contract.</p>
</div>
<p class="px-fine">No lead guarantees, no ranking promises. We guarantee the work and the dates below.</p>
<noscript><p class="px-fine"><b>Checkout needs JavaScript.</b> Call 1-800-481-8638 or email info@eyetoad.com and we will send a secure invoice.</p></noscript>
</div>`,
  capsule: 'The Local Launch Kit from Eye To Ad Media is a $497 setup plus $97 a month package for new and growing local businesses. Setup covers Verified and Featured directory listings, one press release, three SEO fixes on your site, review-request setup and an instant reply to every web lead. The monthly fee keeps the listings, review requests and lead replies running. It does not buy leads or promise rankings; it builds a lead source you own.',
  sections: [
    `<div class="k-chip">What is in the kit</div>
<h2 class="k-h" id="llk-h2a">Five pieces of groundwork, <em>each with a date.</em></h2>
<p class="k-lead">These are the jobs most new businesses mean to get to and never do. We do them in order, and you get an email as each one goes live.</p>
<div class="k-grid3 llk-parts">
<div class="k-card"><p class="k-num">1</p><h3 class="k-h3">Directory listings, verified and featured</h3><p>Your business claimed, filled in and marked Verified on USABusinessSearch.com and, for Colorado businesses, COBusinessList.com, with a Featured (Boost) placement in your category. Consistent name, address and phone is one of the first things AI assistants check. <b>Live within 2 business days.</b></p></div>
<div class="k-card"><p class="k-num">2</p><h3 class="k-h3">One press release</h3><p>We interview you for ten minutes, write an announcement about your opening, new location or new service, and publish it on our press release sites with a link to your website. You approve it before it goes out. <b>Published within 5 business days of the interview.</b></p></div>
<div class="k-card"><p class="k-num">3</p><h3 class="k-h3">Three SEO fixes</h3><p>Pick any three tasks from our <a href="/seo-a-la-carte/">SEO &agrave; la carte menu</a> (titles and descriptions, schema, Google Analytics, Search Console, and more), or let us choose the three that matter most. <b>Done 24 to 72 hours after access works.</b></p></div>
<div class="k-card"><p class="k-num">4</p><h3 class="k-h3">Review requests, set up</h3><p>Your one-tap Google review link, a printable QR card, and an email request that goes to every customer after each job. It runs on the same system as <a href="/review-booster/">Review Booster</a>. <b>Ready within 3 business days.</b></p></div>
<div class="k-card"><p class="k-num">5</p><h3 class="k-h3">Instant lead reply</h3><p>Your website form wired to an AI Speed to Leads starter setup: every new web lead gets a reply under your name within seconds, and you get an alert on your phone. Add AI phone calls later if you want them. <b>Live within 5 business days.</b></p></div>
<div class="k-card"><p class="k-num">$97</p><h3 class="k-h3">What the monthly fee keeps running</h3><p>Your directory listings stay Verified and Featured, review requests keep going out, lead replies keep firing, and you get a one-page report each month. Bought separately, the listings and review requests alone would run about $137 a month.</p></div>
</div>`,

    `<section class="k-sec k-sec-off" aria-labelledby="llk-h2b"><div class="wrap">
<div class="k-chip">Own your leads</div>
<h2 class="k-h" id="llk-h2b">Shared-lead marketplaces vs <em>a lead source you own.</em></h2>
<p class="k-lead">Angi, Thumbtack and Yelp can fill a calendar fast, and plenty of good businesses use them. They work differently from the Launch Kit, and you should know how before you choose.</p>
<div class="px-scroll"><table class="px-tbl">
<caption class="px-cap">How each one works (general terms, checked October 2026; confirm current terms with each company)</caption>
<thead><tr><th scope="col"></th><th scope="col">Angi / Thumbtack</th><th scope="col">Yelp Ads</th><th scope="col">Local Launch Kit</th></tr></thead>
<tbody>
<tr><th scope="row">What you pay for</th><td>Each lead or contact, whether or not it turns into a job</td><td>Clicks on your ad, from a monthly ad budget</td><td>The work: listings, press release, SEO fixes, review and lead-reply setup</td></tr>
<tr><th scope="row">Who else gets the lead</th><td>Often several other pros get the same request at the same time</td><td>The customer still sees competitors on the same page</td><td>Nobody. People who find you contact you directly</td></tr>
<tr><th scope="row">What you keep if you stop</th><td>Past customers, not the source</td><td>Your Yelp page; ad placement stops</td><td>Your website fixes, the press release, your reviews and your customer list</td></tr>
<tr><th scope="row">Spending floor</th><td>Set by the platform per lead and category</td><td>Set by Yelp per market and category</td><td>$497 once, then $97 a month</td></tr>
<tr><th scope="row">How fast it works</th><td>Days</td><td>Days</td><td>Groundwork in about 2 weeks; results build over months</td></tr>
</tbody></table></div>
<p class="k-p">Our honest advice: if you need jobs this week, a marketplace may be the right call while the groundwork builds. If you already buy shared leads, answer them in the first minute: <a href="https://fronetics.com/50-of-sales-go-to-the-vendor-that-responds-first/" target="_blank" rel="noopener nofollow">up to 50% of sales go to the first business that responds</a>. The Launch Kit&rsquo;s instant reply covers the leads that come to you directly, and <a href="https://aispeedtoleads.com/">AI Speed to Leads</a> can call marketplace leads back within a minute when you are ready for that. Over time, the kit is how you need marketplaces less. For the full picture, see our <a href="/lead-generation-agency/">lead generation</a> page.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="llk-h2c"><div class="wrap">
<div class="k-chip">How it works</div>
<h2 class="k-h" id="llk-h2c">From checkout to <em>everything live in about two weeks.</em></h2>
<ol class="k-steps llk-steps">
<li class="k-step"><div><h3>Order and a short intake email</h3><p>Pay the $497 setup by card. We email a short intake (your services, area, hours, logo and photos) and a secure way to share website access. Please never type passwords into a form.</p></div></li>
<li class="k-step"><div><h3>Listings and review link (days 1 to 3)</h3><p>Directory listings go live, verified and featured. Your review link and QR card arrive by email, ready to print.</p></div></li>
<li class="k-step"><div><h3>SEO fixes and lead reply (days 3 to 7)</h3><p>The three SEO fixes are done on your site, and your website form starts sending instant replies under your name.</p></div></li>
<li class="k-step"><div><h3>Press release (by day 10)</h3><p>A ten-minute interview, a draft for your approval, then publication on our press release sites with a link back to you.</p></div></li>
<li class="k-step"><div><h3>Monthly from day 30</h3><p>The $97 plan keeps it all running and sends a one-page report: listing views, review requests sent, reviews received and leads answered.</p></div></li>
</ol>
<p class="k-p">Dates count from the day we receive your intake and access. If something on our side slips, we tell you before the date, not after.</p>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="llk-h2d"><div class="wrap">
<div class="k-chip">The fine print, up front</div>
<h2 class="k-h" id="llk-h2d">Every fee, <em>in one place.</em></h2>
<div class="k-grid2">
<div class="k-card"><h3 class="k-h3">What you pay</h3><p>$497 once for setup, charged at checkout. $97 a month starting 30 days later, renewing monthly until you cancel. No contract, no setup fee to cancel, no charge per lead. Want more than three SEO fixes? Extra tasks are $100 each on the <a href="/seo-a-la-carte/">&agrave; la carte menu</a>.</p></div>
<div class="k-card"><h3 class="k-h3">What we guarantee</h3><p>The work and the dates on this page. We do not guarantee a number of leads, calls or reviews, or a ranking position, because those depend on your market, your reviews and your customers. If we miss a date we promised, tell us and we credit that month&rsquo;s $97.</p></div>
</div>
<p class="k-p">Not sure where you stand in AI search before you start? The <a href="/ai-search-visibility-audit/">AI search visibility audit</a> shows which assistants name you today. Already established and only need reviews? <a href="/review-booster/">Review Booster</a> is $59 a month on its own.</p>
<script src="https://usabusinesssearch.com/secure-checkout/checkout.js" defer></script>
</div></section>`,
  ],
  faqH2: 'About the Local Launch Kit.',
  faq: [
    { q: 'Who is the Local Launch Kit for?', a: 'New businesses in their first year, and established businesses that never did the groundwork: no directory listings, no review requests, a website form that sits unanswered until evening. It fits service businesses best (contractors, home services, salons, clinics, restaurants). If you already run a full SEO campaign with us, you have most of this already and do not need the kit.' },
    { q: 'Will the Launch Kit guarantee me leads?', a: 'No, and be careful of anyone who guarantees leads for a fixed monthly price. The kit guarantees the work: listings verified and featured, a press release published, three SEO fixes made, review requests and lead replies running, all by the dates on this page. Those are the things that make a business easier to find and easier to choose, and every lead they produce comes straight to you.' },
    { q: 'How is this different from Angi, Thumbtack or Yelp?', a: 'Those marketplaces sell you access to customers they found, usually per lead or per click, and the same customer often hears from several of your competitors. The Launch Kit spends your money on things you keep: your listings, your reviews, your website and your own lead replies. Many businesses use both for a while. The kit is how you rely on the marketplaces less over time.' },
    { q: 'Which directories are included?', a: 'USABusinessSearch.com, our nationwide business directory, and COBusinessList.com, our Colorado directory. You get a Verified listing and a Featured (Boost) placement in your category, kept active while your $97 plan runs. COBusinessList.com only lists Colorado businesses, so outside Colorado we do a fourth SEO fix on your website in place of the second listing.' },
    { q: 'Can I cancel the $97 a month?', a: 'Yes, anytime, online, with the cancel link in your receipt email or by emailing info@eyetoad.com. No phone call, no cancellation fee. When you cancel, the Featured placements and review requests stop at the end of that month. Your website fixes, the published press release and every review you earned stay yours.' },
    { q: 'What does the AI Speed to Leads starter actually do?', a: 'It connects your website form so every new lead gets an instant reply under your business name within seconds, and you get an alert with the details on your phone. Leads who reach out at 9 pm hear back right away instead of the next morning. If you later want an AI phone call to qualified leads within a minute, that is a separate AI Speed to Leads plan you can add any time.' },
    { q: 'Do you need my passwords?', a: 'We need access to your website for the three SEO fixes, and to your website form for the instant reply. After checkout we email you a secure way to share it, or we work with your web person directly. Please never put a password in a form or an email. The directory listings and press release need no logins from you.' },
  ],
  related: [['AI search visibility audit', '/ai-search-visibility-audit/'], ['Review Booster', '/review-booster/'], ['SEO &agrave; la carte', '/seo-a-la-carte/'], ['Lead generation', '/lead-generation-agency/'], ['Google Business Profile management', '/google-business-profile-management/']],
  band: ['Starting a business, or restarting one?', 'Call and tell us what you do and where. If the Launch Kit is the wrong fit, the founder will tell you what to do instead.', ['Send a message', '/contact/']],
  service: {
    name: 'Local Launch Kit', types: ['Local business marketing package', 'Local SEO setup'], alt: ['New business marketing package', 'Local business launch package'],
    area: { '@type': 'Country', name: 'United States' },
    offers: [
      { '@type': 'Offer', name: 'Local Launch Kit setup', sku: 'LAUNCHKIT', price: '497', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://eyetoad.com/local-launch-kit/', description: 'One-time setup: directory listings verified and featured, one press release, three SEO fixes, review-request setup and instant lead reply.' },
      { '@type': 'Offer', name: 'Local Launch Kit monthly plan', sku: 'LAUNCHKIT-M', price: '97', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://eyetoad.com/local-launch-kit/', priceSpecification: { '@type': 'UnitPriceSpecification', price: '97', priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } }, description: 'Keeps the directory listings featured, review requests and instant lead replies running, with a monthly report. Cancel anytime online.' },
    ],
  },
  script: "document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.sc-buy');if(b&&typeof window.gtag==='function'){try{window.gtag('event','sc_buy_click',{sku:b.getAttribute('data-sku'),page:location.pathname})}catch(x){}}});",
  style: `:root{--k-hbg:#0B1220}.llk-hero{background:radial-gradient(900px 500px at 82% 12%,rgba(22,163,74,.26),transparent 60%),radial-gradient(600px 400px at 8% 96%,rgba(249,115,22,.22),transparent 60%),#0B1220}
.px-box{color:#101828}.px-opt{border:1.5px solid #E4E7EC;border-radius:14px;padding:16px;margin:0 0 12px;background:#fff}.px-hi{border-color:#F97316;box-shadow:0 10px 28px rgba(234,88,12,.14)}
.px-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}.px-name{margin:0;font-weight:800;font-size:1.05rem;color:#101828}
.px-price{margin:0;font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:1.9rem;color:#101828;line-height:1}.px-price small{font-family:system-ui,-apple-system,Roboto,Arial;font-size:.78rem;font-weight:600;color:#667085;margin-left:6px}
.px-then{margin:6px 0 10px;font-size:.95rem;color:#344054}.px-list{margin:0 0 14px;padding:0 0 0 20px;font-size:.92rem;line-height:1.6;color:#344054}.px-list li{margin:2px 0}
.px-btn{width:100%;min-height:50px;font-size:.98rem;background:#C15205}.px-btn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.px-fine{margin:8px 0 0;font-size:.84rem;line-height:1.5;color:#475467}.px-fine a{color:#1D4ED8}
.px-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:22px;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.px-tbl{width:100%;min-width:640px;border-collapse:collapse;font-size:.93rem}.px-tbl th,.px-tbl td{padding:12px 14px;border-bottom:1px solid #EEF0F3;text-align:left;vertical-align:top;line-height:1.5}
.px-tbl thead th{background:#101828;color:#fff;font-weight:800}.px-tbl tbody th{font-weight:700;color:#101828}.px-tbl td{color:#344054}.px-tbl td:last-child{background:#FFF7ED}.px-tbl tbody tr:last-child>*{border-bottom:0}
.px-cap{caption-side:top;text-align:left;padding:12px 14px 0;font-weight:600;font-size:.86rem;color:#475467}
.llk-parts{margin-top:24px}.llk-parts .k-num{font-size:1.8rem}.llk-steps{margin:24px 0 0;padding:0;list-style:none;max-width:860px}
@media(max-width:640px){.px-price{font-size:1.6rem}.px-opt{padding:14px}}`,
};
