// /seo-packages/  SEO packages from $100: package ladder + build-your-own with realistic timelines, Industry Lockdown, Stripe-ready.
// Prices are only the posted eyetoad.com prices: SEO levels $100-$5,000/mo in $100 steps, GBP $1,000 / $1,800 / $2,500 per month,
// AI search visibility audit $297 / $750, Local Launch Kit $497 + $97/mo, a la carte tasks $100. No ranking or result guarantees.
// Payment: STRIPE in the page script holds Payment Link URLs from the Search Converts LLC Stripe account. Empty = no pay button;
// the order goes to the team through the lead form and they send a payment link. Fill the URLs, rebuild, done.
//   cd _build && node newpage.mjs specs/seo-packages.mjs
const URL = 'https://eyetoad.com/seo-packages/';

const PK = [
  { k: 'task', name: 'Fix-It', price: '$100', per: 'per task, one time', pick: { tasks: 1 },
    best: 'A tight budget and a site with broken basics',
    work: ['One foundational fix per task: titles, schema, tracking, tappable phone, working forms', 'Done 24 to 72 hours after we get access', 'Up to 10 tasks online, more by phone'],
    first: 'Day 1 to 3 after access', phone: 'Stops leaks. Calls and forms you were already losing can start arriving.' },
  { k: 'starter', name: 'Starter', price: '$500', per: 'per month', pick: { seo: 500 },
    best: 'One service or one area, done properly',
    work: ['Technical cleanup first, then one money page at a time', 'Local signals Google checks before it trusts a business', 'A plain-English report each month'],
    first: 'Search Console impressions: often 30 to 90 days', phone: 'Low-competition markets can see calls by months 4 to 6. Crowded ones take longer.' },
  { k: 'growth', name: 'Local Growth', price: '$2,000', per: 'per month', pick: { seo: 1000, gbp: 1000 }, tag: 'A strong start for most local service businesses',
    math: '$1,000 SEO + $1,000 Google Business Profile management',
    best: 'Service businesses that live and die by the map pack',
    work: ['Website SEO and your Google Business Profile, worked together', 'Reviews, photos, services and posts kept active', 'Calls and form leads tracked to the source'],
    first: 'Map views often move within weeks', phone: 'The map pack is usually the fastest route to the phone for a local business.' },
  { k: 'leader', name: 'Market Leader', price: '$4,300', per: 'per month', pick: { seo: 2500, gbp: 1800 },
    math: '$2,500 SEO + $1,800 aggressive local profile management',
    best: 'Crowded metro categories: legal, medical, home services',
    work: ['More pages, more depth and more of the market each month', 'Aggressive map-pack work across your service area', 'Conversion fixes so the traffic actually calls'],
    first: 'Early movement in 30 to 90 days', phone: 'Built for markets where page one is a fight. Expect a 6 to 12 month climb.' },
  { k: 'dominance', name: 'Dominance', price: '$7,500', per: 'per month + $750 once', pick: { seo: 5000, gbp: 2500, ai: 750 },
    math: '$5,000 SEO + $2,500 profiles for up to 3 locations + $750 AI search audit with fixes',
    best: 'Multi-location and regional businesses',
    work: ['The widest, fastest version of the work we do', 'Up to three locations in the map pack', 'AI answers (ChatGPT, Gemini, AI Overviews) checked and fixed up front'],
    first: 'Early movement in 30 to 90 days', phone: 'More markets covered at once, so more chances to ring. Still no shortcuts past Google.' },
  { k: 'global', name: 'Enterprise & Global', price: 'Custom', per: 'quoted to the market', pick: null,
    best: 'National and international brands, and the most competitive keywords',
    work: ['Many markets, many keywords, many languages', 'AI agents, agentic commerce and custom tools built for you', 'Freelance specialists added as the campaign needs them'],
    first: 'Planned per market', phone: 'The hardest national terms, attorneys and finance among them, can take tens of thousands a month and a year or more.' },
];

const pkCards = PK.map((p) => `<article class="pk-card${p.tag ? ' pk-hot' : ''}" data-k="${p.k}">
${p.tag ? `<p class="pk-tag">${p.tag}</p>` : ''}
<h3 class="pk-name">${p.name}</h3>
<p class="pk-price"><b>${p.price}</b> <span>${p.per}</span></p>
${p.math ? `<p class="pk-math">${p.math}</p>` : ''}
<p class="pk-best">${p.best}</p>
<ul class="pk-work">${p.work.map((w) => `<li>${w}</li>`).join('')}</ul>
<dl class="pk-when"><div><dt>First signs</dt><dd>${p.first}</dd></div><div><dt>Your phone</dt><dd>${p.phone}</dd></div></dl>
<div class="pk-btns">${p.pick ? `<button type="button" class="pk-pick" data-pick='${JSON.stringify(p.pick)}'>Start with ${p.name}</button><a class="pk-pay" data-pay="${p.k}" hidden>Pay by card</a>` : `<a class="pk-pick" href="#build" data-lock="global">Get a custom quote</a>`}</div>
</article>`).join('\n');

// What each piece of SEO can realistically do. Hedged on purpose.
const PIECES = [
  ['Click-to-call and form fixes', 'Day 1', 'Phone numbers become tappable and every form is test-sent.', 'Leads you were already losing can start reaching you the same day.'],
  ['Conversion fixes', 'Day 1', 'Clearer offer, stronger buttons, less friction on the pages people already visit.', 'More of today’s visitors call. No ranking change needed.'],
  ['Google Analytics 4 + Search Console', 'Day 1 to 3', 'Tracking installed and Google told your site exists.', 'No new calls by itself. You finally see what is working.'],
  ['Page speed and mobile', 'Day 1 for visitors', 'Pages load fast and work on phones.', 'Fewer people give up before they call. The ranking effect is usually small.'],
  ['Meta titles and descriptions', 'Days to weeks', 'What your listing says in Google, rewritten for searchers.', 'Can raise clicks from searches you already show up for.'],
  ['Schema markup', 'Weeks, after Google re-reads the page', 'Structured data that tells Google and AI what each page is.', 'Makes rich results possible. Google decides whether to show them.'],
  ['Internal linking', 'Weeks', 'Links between your pages so the important ones get found.', 'Helps your money pages carry more weight.'],
  ['Google Business Profile work', 'Often weeks', 'Categories, services, photos, posts and reviews kept active.', 'For local businesses, usually the fastest path to calls.'],
  ['Review system', 'Builds month by month', 'A steady, honest way to ask happy customers for reviews.', 'More reviews and recent ones help people choose you.'],
  ['New service and city pages', 'Indexed in days to weeks, ranking usually 3 to 6 months', 'A real page for each thing you sell and each place you serve.', 'Each page is another way in. Competitive terms take longer.'],
  ['AI search visibility', 'Months', 'Clear facts, llms.txt and structure AI tools can quote.', 'More chances to be named when someone asks ChatGPT or Gemini.'],
  ['Authority and mentions', 'Months', 'Press releases and mentions on relevant sites, including ones we own.', 'Trust builds slowly, and it lasts.'],
];
const pieces = PIECES.map((p) => `<tr><th scope="row">${p[0]}</th><td class="pk-t" data-l="When">${p[1]}</td><td data-l="What it is">${p[2]}</td><td data-l="For your phone">${p[3]}</td></tr>`).join('\n');

const hero = `<section class="pk-hero" aria-labelledby="pk-h1">
<div class="wrap pk-hg">
<div class="pk-copy">
<p class="pk-eb">SEO packages &middot; from $100</p>
<h1 id="pk-h1">SEO packages for anyone who&rsquo;s been burned. <span class="pk-hand">Not this time.<svg viewBox="0 0 300 24" aria-hidden="true" preserveAspectRatio="none"><path d="M4 16C70 6 150 4 296 12"/></svg></span></h1>
<p class="pk-sub">Every price, every timeline, up front. Start at $100 or go all in.</p>
<div class="pk-ctas"><a class="pk-go" href="#packages">See the packages <span aria-hidden="true">&rarr;</span></a><a class="pk-call" href="tel:18004818638">Call 1-800-481-8638</a></div>
<p class="pk-save"><button type="button" id="pkSave"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>Save this page</button><span id="pkSaveMsg" role="status" aria-live="polite"></span></p>
<ul class="pk-proof" aria-label="Why people trust us"><li><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 5.0 from 60 Google reviews</li><li>A+ BBB accredited</li><li>Since 2012</li></ul>
</div>
<div class="pk-scar" aria-labelledby="pk-scar-q">
<p class="pk-scar-q" id="pk-scar-q">How many SEO companies have let you down?</p>
<div class="pk-scar-b" role="group" aria-label="Pick one"><button type="button" data-n="0">0</button><button type="button" data-n="1">1</button><button type="button" data-n="2">2</button><button type="button" data-n="3">3+</button></div>
<p class="pk-scar-a" id="pkScarA" aria-live="polite">Tap a number.</p>
<a class="pk-scar-go" href="#build">Build mine the honest way <span aria-hidden="true">&rarr;</span></a>
</div>
</div>
</section>`;

const sPackages = `<h2 class="k-h" id="pk-h2a">Pick a package. Or build your own.</h2>
<p class="k-p">Each package is built from our published prices, so you can see exactly where the money goes. Change anything you like in the builder below.</p>
<div class="pk-grid" id="packages">
${pkCards}
</div>
<p class="pk-fine">Monthly plans renew each month until you cancel with 30 days&rsquo; written notice. All sales are final. Read the <a href="/purchase-terms/">purchase terms</a>. VIP members get 25% off SEO: <a href="/vip-marketing/">how VIP works</a>.</p>`;

const sPieces = `<section class="k-sec k-sec-off" aria-labelledby="pk-pieces-h"><div class="wrap">
<div class="k-chip">Outcomes first</div>
<h2 class="k-h" id="pk-pieces-h">What each piece can realistically do. And when.</h2>
<p class="k-p">We start from the result you need: calls and form leads from real buyers. Here is what each kind of work can do for that, and roughly when. These are typical windows we see, not promises.</p>
<div class="pk-tw" tabindex="0" role="region" aria-label="SEO work, timing and impact table">
<table class="pk-table"><thead><tr><th scope="col">The work</th><th scope="col">When you might see it</th><th scope="col">What it is</th><th scope="col">What it can mean for your phone</th></tr></thead>
<tbody>
${pieces}
</tbody></table></div>
<p class="pk-fine">Google&rsquo;s own advice to business owners: expect an SEO to need <a href="https://www.seroundtable.com/google-give-seos-4-12-months-23419.html" rel="noopener" target="_blank">four months to a year</a> to make changes and see the benefit. Want a date for your budget? Try the <a href="/seo-time-machine/">SEO Time Machine</a>.</p>
</div></section>`;

const sBuild = `<section class="k-sec pk-bsec" id="build" aria-labelledby="pk-b-h"><div class="wrap">
<div class="k-chip">Build your own</div>
<h2 class="k-h" id="pk-b-h">Build your SEO campaign. <em>See when it can work.</em></h2>
<p class="k-p">Pick what you want. The totals and the timeline update as you go. Send it to us and a real person confirms the scope before anything is billed.</p>
<form class="pb" id="pkOrder" data-eta="lead">
<div class="pb-grid">
<div class="pb-picks">
<fieldset class="pb-f"><legend>Monthly SEO</legend>
<label class="pb-l" for="pbSeo">SEO each month: <output id="pbSeoOut" for="pbSeo">$1,000</output></label>
<input type="range" id="pbSeo" name="seo_monthly" min="0" max="5000" step="100" value="1000">
<div class="pb-scale" aria-hidden="true"><span>$0</span><span>$5,000</span></div>
<p class="pb-hint">In $100 steps. More budget mostly means more of the same work, done wider and faster. <a href="/what-you-get/">How it scales</a></p>
</fieldset>
<fieldset class="pb-f"><legend>Google Business Profile</legend>
<div class="pb-opts">
<label><input type="radio" name="gbp" value="0" checked> None</label>
<label><input type="radio" name="gbp" value="1000"> One location <b>$1,000/mo</b></label>
<label><input type="radio" name="gbp" value="1800"> Aggressive local <b>$1,800/mo</b></label>
<label><input type="radio" name="gbp" value="2500"> Up to 3 locations <b>$2,500/mo</b></label>
</div>
<p class="pb-hint"><a href="/google-business-profile-management/">What each plan covers</a></p>
</fieldset>
<fieldset class="pb-f"><legend>One-time work</legend>
<label class="pb-l" for="pbTasks">Fix-It tasks at $100 each</label>
<div class="pb-step"><button type="button" data-step="-1" aria-label="One less task">&minus;</button><input id="pbTasks" name="tasks" type="number" min="0" max="10" value="0" inputmode="numeric"><button type="button" data-step="1" aria-label="One more task">+</button></div>
<p class="pb-hint">Pick the exact fixes on <a href="/seo-a-la-carte/">SEO &agrave; la carte</a>.</p>
<div class="pb-opts">
<label><input type="radio" name="ai" value="0" checked> No AI search audit</label>
<label><input type="radio" name="ai" value="297"> AI search audit, report <b>$297</b></label>
<label><input type="radio" name="ai" value="750"> AI search audit, done for you <b>$750</b></label>
</div>
<label class="pb-chk"><input type="checkbox" name="launch_kit" id="pbKit" value="yes"> <span><a href="/local-launch-kit/">Local Launch Kit</a> <b>$497 setup + $97/mo</b></span></label>
</fieldset>
</div>
<div class="pb-sum" aria-live="polite">
<p class="pb-sum-k">Your campaign</p>
<div class="pb-tot"><div><small>Each month</small><b id="pbMo">$1,000</b></div><div><small>One time</small><b id="pbOnce">$0</b></div><div><small>First month</small><b id="pbFirst">$1,000</b></div></div>
<p class="pb-match" id="pbPkg"></p>
<p class="pb-tl-k">When it can start to show</p>
<ol class="pb-tl" id="pbTl">
<li data-w="0"><span>Day 1</span><em></em></li>
<li data-w="1"><span>30 days</span><em></em></li>
<li data-w="2"><span>90 days</span><em></em></li>
<li data-w="3"><span>6 months</span><em></em></li>
<li data-w="4"><span>12 months</span><em></em></li>
</ol>
<div class="pb-be">
<label for="pbVal">One new customer is worth</label>
<div class="pb-be-in"><span>$</span><input id="pbVal" type="number" min="0" step="50" value="1500" inputmode="numeric"></div>
<p id="pbBe"></p>
</div>
<p class="pb-earth">Ordering before January 1, 2027? With an EARTH movie ticket, this order can qualify for <a href="/match/">the EARTH SEO Match</a>. See the terms there.</p>
</div>
</div>
<div class="pb-you" id="pbYou">
<h3 class="pb-h3">Where should we send it?</h3>
<div class="pb-fields">
<label>Your name<input name="name" autocomplete="name" required></label>
<label>Business name<input name="business" autocomplete="organization" required></label>
<label>Email<input name="email" type="email" autocomplete="email" required></label>
<label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
<label>Website<input name="website" id="pbWeb" inputmode="url" placeholder="yourbusiness.com"></label>
<label>Industry and city<input name="industry_city" placeholder="e.g. roofing, Aurora CO"></label>
</div>
<label class="pb-chk"><input type="checkbox" name="industry_lockdown" id="pbLock" value="yes"> <span>Ask about an <a href="#lockdown">Industry Lockdown</a> for my industry and city</span></label>
<label class="pb-notes">Anything we should know?<textarea name="notes" rows="3"></textarea></label>
<p class="ob-hp" aria-hidden="true"><label>Leave this empty <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
<input type="hidden" name="_subject" value="SEO package order">
<input type="hidden" name="order_summary"><input type="hidden" name="monthly_total"><input type="hidden" name="one_time_total">
<div class="pb-acts"><button type="submit" class="pb-send">Send my campaign to the team <span aria-hidden="true">&rarr;</span></button><a class="pb-pay" id="pbPay" hidden>Pay by card instead</a></div>
<p class="pb-note">No payment on this button. A real person checks your order, confirms the scope and sends a secure payment link, usually within one business day. We use your details only to reply about this order. <a href="/privacy-policy/">Privacy policy</a></p>
</div>
<div class="pb-done" id="pbDone" tabindex="-1" hidden><h3 class="pb-h3">Your campaign is with our team.</h3><p id="pbDoneSum"></p><p>A real person reviews it, usually within one business day. Want to talk now? <a href="tel:18004818638">Call 1-800-481-8638</a>.</p></div>
</form>
</div></section>`;

const sAssets = `<section class="k-sec k-sec-off" aria-labelledby="pk-own-h"><div class="wrap">
<div class="k-chip">Unfair advantages</div>
<h2 class="k-h" id="pk-own-h">We already own part of the road you need.</h2>
<p class="k-p">We built our own sites and networks, and we test every tactic on our own companies first. When one fits your business, it goes to work for you.</p>
<div class="pk-own">
<div><h3>Business directories</h3><p>Listings on <a href="https://usabusinesssearch.com/" rel="noopener" target="_blank">USA Business Search</a> nationwide and <a href="https://cobusinesslist.com/" rel="noopener" target="_blank">CO Business List</a> in Colorado.</p></div>
<div><h3>Industry networks</h3><p>Restaurants on <a href="https://restaurantsseo.com/" rel="noopener" target="_blank">our restaurant network</a>. Contractors on <a href="https://advertisingforcontractors.com/" rel="noopener" target="_blank">Advertising for Contractors</a>.</p></div>
<div><h3>Press and news</h3><p>Releases published through <a href="https://pressreleaseforbusiness.com/" rel="noopener" target="_blank">Press Release for Business</a>.</p></div>
<div><h3>AI agents and speed to lead</h3><p>Instant replies to new leads with <a href="https://aispeedtoleads.com/" rel="noopener" target="_blank">AI Speed to Leads</a>, and custom agents from <a href="https://myaiagentarmy.com/" rel="noopener" target="_blank">My AI Agent Army</a>.</p></div>
<div><h3>TV-quality video</h3><p>Commercials and explainers made in <a href="https://www.madwackd.ai/" rel="noopener" target="_blank">Madwackd</a> studios.</p></div>
<div><h3>Your own site, built by us</h3><p>Custom-coded sites from $99/mo through <a href="/custom-website-design/">subscribe-to-own</a>, and sites we build in your industry (below).</p></div>
</div>
<p class="pk-fine">Placement on our sites means exposure to their visitors. It is not a promise of rankings, and we follow Google&rsquo;s link rules on every one of them.</p>
</div></section>`;

const sLock = `<section class="k-sec pk-lock" id="lockdown" aria-labelledby="pk-lock-h"><div class="wrap pk-lock-g">
<div>
<div class="k-chip">Industry Lockdown</div>
<h2 class="k-h" id="pk-lock-h">Don&rsquo;t see your industry? <em>Lock it down.</em></h2>
<p class="k-p">We build a lead site for your industry in your city, on a domain we own. While you are the business on it, its calls and forms go to you. One business per industry per area.</p>
<ul class="pk-lock-l">
<li><b>Short on budget?</b> We may build it anyway, at our cost. You pay nothing up front.</li>
<li><b>We own the site.</b> We keep the asset, and we may keep it long term.</li>
<li><b>Terms in writing first.</b> How you pay for what it sends is agreed before anything goes live.</li>
</ul>
<p class="pk-fine">Availability depends on the industry and the area. A site we own is not a substitute for ranking your own website, so we usually pair the two. Want us to run the whole thing? See <a href="/business-in-a-box/">Business in a Box</a>.</p>
</div>
<div class="pk-lock-card">
<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="22" y="52" width="76" height="56" rx="10"/><path d="M38 52V38a22 22 0 0 1 44 0v14"/><circle cx="60" cy="78" r="8"/><path d="M60 86v10"/></svg>
<p>Check if your industry and city are open.</p>
<button type="button" class="pk-lock-go" id="pkLockGo">Ask about a Lockdown</button>
</div>
</div></section>`;

const sChoice = `<section class="k-sec k-sec-off" aria-labelledby="pk-ch-h"><div class="wrap">
<h2 class="k-h pk-ch-h" id="pk-ch-h">Lead your industry, or keep things how they are?</h2>
<p class="k-p">Both are fine choices. We support you either way.</p>
<div class="pk-ch" role="group" aria-label="Choose one">
<button type="button" data-ch="lead">I want to lead my industry</button>
<button type="button" data-ch="keep">I&rsquo;ll keep things how they are</button>
</div>
<p class="pk-ch-a" id="pkChA" aria-live="polite"></p>
</div></section>`;

const sHonest = `<section class="k-sec" aria-labelledby="pk-hon-h"><div class="wrap">
<div class="k-chip">The honest part</div>
<h2 class="k-h" id="pk-hon-h">Nobody can promise you page one. Including us.</h2>
<div class="pk-hon">
<p class="k-p">Google changes its systems constantly. AI search changes even faster. Your competitors move too. Nobody can see the future, so anyone who guarantees rankings is guessing. Google says it plainly in its own guide to hiring an SEO: <a href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo" rel="noopener" target="_blank">no one can guarantee a #1 ranking</a>, and if someone does, find someone else.</p>
<p class="k-p">What we do promise: we treat your business like it is ours, we show you what we did and what it is doing for calls and leads, and we tell you straight when something isn&rsquo;t working. Strategy can change at any time as search changes.</p>
</div>
</div></section>`;

const FAQ = [
  { q: 'How much do SEO packages cost?', a: 'Our packages run from $100 for a single one-time fix to $7,500 a month plus a one-time $750 for multi-location campaigns, all built from our published prices. National and international campaigns are quoted to the market.' },
  { q: 'What is the cheapest way to start?', a: 'A $100 Fix-It task. It fixes one foundational problem, like a missing title tag, broken tracking or a phone number you can&rsquo;t tap on a phone. Monthly SEO starts at $100 a month in $100 steps.' },
  { q: 'How long does SEO take to work?', a: 'Some fixes help the same day, like tappable phone numbers and working forms. Rankings usually take months. Google tells business owners to expect four months to a year, and crowded markets can take longer.' },
  { q: 'Do you guarantee rankings or leads?', a: 'No. Nobody controls Google or AI search, and Google warns against anyone who guarantees a #1 ranking. We show you what we did and what it is doing for calls and leads every month.' },
  { q: 'Can I pay online?', a: 'Yes. Send your campaign from the builder and we email a secure card payment link after a real person confirms the scope. Fix-It tasks can also be bought right away on the SEO &agrave; la carte page.' },
  { q: 'Is there a contract?', a: 'Monthly plans run month to month. They renew until you cancel with 30 days&rsquo; written notice, and all sales are final. We still suggest giving SEO six months to a year, because stopping early resets much of the work.' },
  { q: 'What is an Industry Lockdown?', a: 'We build a lead site for your industry in your city on a domain we own, and send its calls and forms to you. One business per industry per area. We may build it at our cost if your budget is tight. We own the site and agree the terms with you in writing before it goes live.' },
  { q: 'Do the packages work outside Denver?', a: 'Yes. We are headquartered in Denver and work with businesses all over the world.' },
];

const SVC = {
  '@type': 'Service', '@id': URL + '#service', name: 'SEO packages', serviceType: 'Search engine optimization',
  alternateName: ['SEO packages for small business', 'SEO plans', 'monthly SEO packages'],
  provider: { '@id': 'https://eyetoad.com/#organization' }, areaServed: { '@type': 'Place', name: 'Worldwide' }, url: URL,
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'SEO packages', itemListElement: [
    { '@type': 'Offer', name: 'Fix-It SEO task', price: '100', priceCurrency: 'USD' },
    ...[['Starter SEO package', 500], ['Local Growth SEO package', 2000], ['Market Leader SEO package', 4300], ['Dominance SEO package', 7500]].map(([n, p]) => ({ '@type': 'Offer', name: n, priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p), priceCurrency: 'USD', unitCode: 'MON' } })),
  ] },
};

export default {
  path: '/seo-packages/',
  prefix: 'pk',
  date: '2026-11-10',
  title: 'SEO Packages from $100 | Real Prices, Real Timelines',
  description: 'SEO packages from a $100 fix to multi-location campaigns, with published prices and honest timelines for every piece. No ranking guarantees. Build your own.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  h1: 'SEO packages for anyone who&rsquo;s been burned. Not this time.',
  heroHtml: hero,
  extraNodes: [SVC],
  capsule: `Eye To Ad Media SEO packages start at $100 for a one-time fix and run to $7,500 a month for multi-location campaigns, all built from published prices: monthly SEO from $100 to $5,000 in $100 steps, Google Business Profile management from $1,000 a month, and one-time audits. Every piece of work below shows what it can realistically do for calls and leads and roughly when. No rankings are guaranteed. Call 1-800-481-8638.`,
  sections: [sPackages, sPieces, sBuild, sAssets, sLock, sChoice, sHonest],
  faqH2: 'SEO package questions, answered straight.',
  faq: FAQ,
  related: [['SEO &agrave; la carte', '/seo-a-la-carte/'], ['SEO pricing ranges', '/denver-seo-pricing/'], ['SEO Time Machine', '/seo-time-machine/'], ['What you get', '/what-you-get/'], ['The EARTH SEO Match', '/match/'], ['Guaranteed SEO: the red flag', '/blog/guaranteed-seo-red-flag/']],
  band: ['Done with SEO that goes nowhere?', 'Pick a package, build your own, or just call and tell us what happened last time.', ['Build my campaign', '#build']],
  headExtra: `<link rel="preload" href="/fonts/caveat-700.woff2" as="font" type="font/woff2" crossorigin>`,
  style: `
@font-face{font-family:Caveat;font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/caveat-700.woff2) format("woff2")}
.pk-hero{position:relative;overflow:hidden;background:#FFFBF5;border-bottom:1px solid #F2E6D8;padding:46px 0 40px}
.pk-hero:before{content:"";position:absolute;inset:-30% -10% auto auto;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.16),rgba(249,115,22,0) 65%);pointer-events:none;animation:pkdrift 18s ease-in-out infinite alternate}
.pk-hero:after{content:"";position:absolute;left:-160px;bottom:-220px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.12),rgba(37,99,235,0) 65%);pointer-events:none;animation:pkdrift 22s ease-in-out infinite alternate-reverse}
@keyframes pkdrift{to{transform:translate(-40px,30px)}}
.pk-hg{position:relative;display:grid;grid-template-columns:1.25fr .9fr;gap:40px;align-items:center}
.pk-eb{display:inline-block;margin:0 0 14px;font:800 .78rem/1 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#C2410C;background:#FFEDD5;border:1px solid #FED7AA;padding:8px 12px;border-radius:6px}
.pk-hero h1{margin:0;font:800 clamp(2rem,4.6vw,3.35rem)/1.06 Inter,system-ui,sans-serif;letter-spacing:-.03em;color:#101828;max-width:16ch}
.pk-hand{position:relative;display:inline-block;font-family:Caveat,"Segoe Print",cursive;font-weight:700;color:#EA580C;font-size:1.18em;letter-spacing:0;white-space:nowrap;transform:rotate(-2deg)}
.pk-hand svg{position:absolute;left:0;right:0;bottom:-6px;width:100%;height:14px;overflow:visible}
.pk-hand path{fill:none;stroke:#DC2626;stroke-width:5;stroke-linecap:round;stroke-dasharray:320;stroke-dashoffset:320;animation:pkdraw 1.1s .5s ease-out forwards}
@keyframes pkdraw{to{stroke-dashoffset:0}}
.pk-sub{margin:18px 0 0;font:500 1.14rem/1.45 Inter,system-ui,sans-serif;color:#344054;max-width:40ch}
.pk-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.pk-go,.pk-call{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 22px;border-radius:10px;font:800 1rem Inter,system-ui,sans-serif;text-decoration:none}
.pk-go{background:#F97316;color:#fff;box-shadow:0 10px 24px rgba(249,115,22,.3)}
.pk-go:hover{background:#EA580C}
.pk-call{background:#fff;color:#101828;border:2px solid #101828}
.pk-call:hover{background:#101828;color:#fff}
.pk-save{margin:14px 0 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.pk-save button{display:inline-flex;align-items:center;gap:7px;background:none;border:0;padding:6px 0;font:700 .92rem Inter,system-ui,sans-serif;color:#1D4ED8;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
.pk-save svg{width:16px;height:16px;fill:#1D4ED8}
#pkSaveMsg{font:500 .88rem Inter,system-ui,sans-serif;color:#344054}
.pk-proof{list-style:none;margin:18px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px 18px;font:600 .88rem Inter,system-ui,sans-serif;color:#475467}
.pk-proof span{color:#F59E0B;letter-spacing:1px}
.pk-scar{background:#fff;border:2px solid #101828;border-radius:18px;padding:26px 24px;box-shadow:10px 10px 0 #FED7AA}
.pk-scar-q{margin:0 0 16px;font:800 1.3rem/1.25 Inter,system-ui,sans-serif;color:#101828}
.pk-scar-b{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.pk-scar-b button{min-height:58px;border:2px solid #D0D5DD;border-radius:12px;background:#F9FAFB;font:800 1.4rem Inter,system-ui,sans-serif;color:#101828;cursor:pointer;transition:transform .2s,border-color .2s,background .2s}
.pk-scar-b button:hover{border-color:#F97316;transform:translateY(-2px)}
.pk-scar-b button[aria-pressed="true"]{background:#101828;color:#fff;border-color:#101828}
.pk-scar-a{min-height:3.2em;margin:16px 0 12px;font:500 1rem/1.45 Inter,system-ui,sans-serif;color:#344054}
.pk-scar-go{font:800 .98rem Inter,system-ui,sans-serif;color:#C2410C}
.pk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
.pk-card{position:relative;display:flex;flex-direction:column;background:#fff;border:1.5px solid #E4E7EC;border-radius:16px;padding:24px 22px}
.pk-hot{border:2px solid #F97316;box-shadow:0 14px 34px rgba(249,115,22,.14)}
.pk-tag{position:absolute;top:-13px;left:20px;margin:0;background:#F97316;color:#fff;font:800 .74rem Inter,system-ui,sans-serif;padding:6px 10px;border-radius:6px}
.pk-name{margin:4px 0 6px;font:800 1.25rem Inter,system-ui,sans-serif;color:#101828}
.pk-price{margin:0;color:#475467;font:500 .92rem Inter,system-ui,sans-serif}
.pk-price b{font:800 2rem Inter,system-ui,sans-serif;color:#101828;letter-spacing:-.02em;margin-right:4px}
.pk-math{margin:6px 0 0;font:500 .84rem/1.4 Inter,system-ui,sans-serif;color:#667085}
.pk-best{margin:12px 0 0;font:700 .96rem/1.4 Inter,system-ui,sans-serif;color:#1D2939}
.pk-work{margin:12px 0 0;padding-left:18px;color:#344054;font-size:.94rem;line-height:1.5}
.pk-work li{margin:4px 0}
.pk-when{margin:14px 0 0;padding:12px 14px;background:#F9FAFB;border-radius:10px;font-size:.88rem;line-height:1.45}
.pk-when div+div{margin-top:8px}
.pk-when dt{font-weight:800;color:#101828}
.pk-when dd{margin:2px 0 0;color:#475467}
.pk-btns{margin-top:auto;padding-top:16px;display:flex;flex-direction:column;gap:8px}
.pk-pick,.pk-pay,.pb-send,.pb-pay,.pk-lock-go{display:inline-flex;justify-content:center;align-items:center;min-height:48px;padding:0 18px;border-radius:10px;font:800 .98rem Inter,system-ui,sans-serif;text-decoration:none;cursor:pointer;border:0}
.pk-pick{background:#101828;color:#fff}
.pk-pick:hover{background:#F97316}
.pk-pay,.pb-pay{background:#fff;color:#1D4ED8;border:2px solid #1D4ED8}
.pk-pay[hidden],.pb-pay[hidden],.pb-you[hidden],.pb-done[hidden]{display:none!important}
.pk-fine{margin:18px 0 0;font-size:.88rem;line-height:1.55;color:#475467;max-width:80ch}
.pk-tw{margin-top:22px;overflow-x:auto;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.pk-table{width:100%;min-width:760px;border-collapse:collapse;font-size:.93rem;line-height:1.45}
.pk-table th,.pk-table td{padding:13px 14px;border-bottom:1px solid #EAECF0;text-align:left;vertical-align:top;color:#344054}
.pk-table thead th{background:#101828;color:#fff;font-weight:800;font-size:.84rem}
.pk-table tbody th{color:#101828;font-weight:800;width:22%}
.pk-table .pk-t{font-weight:700;color:#C2410C;width:17%}
.pk-table tbody tr:last-child>*{border-bottom:0}
.pb{margin-top:24px}
.pb-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px;align-items:start}
.pb-f{margin:0 0 16px;border:1.5px solid #E4E7EC;border-radius:14px;padding:16px 18px;background:#fff}
.pb-f legend{padding:0 6px;font:800 1rem Inter,system-ui,sans-serif;color:#101828}
.pb-l{display:block;font:700 .95rem Inter,system-ui,sans-serif;color:#1D2939;margin-bottom:8px}
.pb-l output{color:#C2410C}
.pb input[type=range]{width:100%;accent-color:#F97316;height:30px}
.pb-scale{display:flex;justify-content:space-between;font-size:.8rem;color:#667085}
.pb-hint{margin:8px 0 0;font-size:.86rem;color:#475467;line-height:1.45}
.pb-opts{display:grid;gap:8px;margin-top:6px}
.pb-opts label,.pb-chk{display:flex;gap:10px;align-items:flex-start;font-size:.95rem;color:#344054;line-height:1.35;cursor:pointer}
.pb-opts input,.pb-chk input{width:20px;height:20px;margin:0;flex:none;accent-color:#F97316}
.pb-chk{margin-top:12px}
.pb-step{display:inline-flex;align-items:center;border:1.5px solid #D0D5DD;border-radius:10px;overflow:hidden;margin-bottom:10px}
.pb-step button{width:46px;height:44px;border:0;background:#F2F4F7;font:800 1.2rem Inter,system-ui,sans-serif;color:#101828;cursor:pointer}
.pb-step input{width:64px;height:44px;border:0;text-align:center;font:800 1.05rem Inter,system-ui,sans-serif;color:#101828;-moz-appearance:textfield}
.pb-sum{position:sticky;top:90px;background:#101828;color:#fff;border-radius:16px;padding:22px 20px}
.pb-sum a{color:#FDBA74}
.pb-sum-k,.pb-tl-k{margin:0 0 10px;font:800 .8rem Inter,system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:#FDBA74}
.pb-tot{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pb-tot div{background:rgba(255,255,255,.08);border-radius:10px;padding:10px}
.pb-tot small{display:block;font-size:.76rem;color:#D0D5DD}
.pb-tot b{font:800 1.3rem Inter,system-ui,sans-serif;color:#fff}
.pb-match{min-height:1.4em;margin:12px 0 14px;font:700 .9rem Inter,system-ui,sans-serif;color:#86EFAC}
.pb-tl{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.pb-tl li{display:grid;grid-template-columns:78px 1fr;gap:10px;align-items:start;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.05);transition:background .4s}
.pb-tl li.on{background:rgba(249,115,22,.22)}
.pb-tl span{font:800 .84rem Inter,system-ui,sans-serif;color:#FDBA74}
.pb-tl em{font-style:normal;font-size:.86rem;line-height:1.4;color:#F2F4F7}
.pb-be{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.16)}
.pb-be label{font:700 .9rem Inter,system-ui,sans-serif;color:#F2F4F7}
.pb-be-in{display:flex;align-items:center;gap:6px;margin-top:6px}
.pb-be-in span{font-weight:800}
.pb-be-in input{width:120px;height:42px;border-radius:8px;border:0;padding:0 10px;font:800 1rem Inter,system-ui,sans-serif;color:#101828}
.pb-be p{margin:10px 0 0;font-size:.9rem;line-height:1.45;color:#F2F4F7}
.pb-earth{margin:14px 0 0;font-size:.84rem;line-height:1.45;color:#D0D5DD}
.pb-you,.pb-done{margin-top:22px;background:#fff;border:2px solid #101828;border-radius:16px;padding:22px}
.pb-h3{margin:0 0 14px;font:800 1.25rem Inter,system-ui,sans-serif;color:#101828}
.pb-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pb-fields label,.pb-notes{display:grid;gap:6px;font:700 .9rem Inter,system-ui,sans-serif;color:#1D2939}
.pb-fields input,.pb-notes textarea{min-height:46px;border:1.5px solid #D0D5DD;border-radius:10px;padding:10px 12px;font:500 1rem Inter,system-ui,sans-serif;color:#101828;width:100%;box-sizing:border-box}
.pb-notes{margin-top:12px}
.ob-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.pb-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.pb-send{background:#F97316;color:#fff;min-height:54px;font-size:1.05rem}
.pb-send:hover{background:#EA580C}
.pb-note{margin:12px 0 0;font-size:.85rem;color:#475467;line-height:1.5}
.pk-own{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
.pk-own>div{background:#fff;border:1.5px solid #E4E7EC;border-radius:14px;padding:18px}
.pk-own h3{margin:0 0 6px;font:800 1.02rem Inter,system-ui,sans-serif;color:#101828}
.pk-own p{margin:0;font-size:.93rem;line-height:1.5;color:#344054}
.pk-lock{background:#FFF7ED}
.pk-lock-g{display:grid;grid-template-columns:1.4fr .8fr;gap:30px;align-items:center}
.pk-lock-l{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.pk-lock-l li{padding:12px 14px;background:#fff;border-left:4px solid #F97316;border-radius:8px;font-size:.96rem;line-height:1.45;color:#344054}
.pk-lock-l b{color:#101828}
.pk-lock-card{background:#fff;border:2px solid #101828;border-radius:18px;padding:24px;text-align:center;box-shadow:10px 10px 0 #BFDBFE}
.pk-lock-card svg{width:96px;height:96px;fill:none;stroke:#101828;stroke-width:6;stroke-linecap:round;stroke-linejoin:round}
.pk-lock-card svg rect{fill:#FDBA74}
.pk-lock-card p{margin:10px 0 14px;font:700 1rem Inter,system-ui,sans-serif;color:#101828}
.pk-lock-go{background:#1D4ED8;color:#fff;width:100%}
.pk-lock-go:hover{background:#1E40AF}
.pk-ch{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}
.pk-ch button{min-height:56px;padding:0 22px;border-radius:12px;font:800 1rem Inter,system-ui,sans-serif;cursor:pointer;border:2px solid #101828;background:#fff;color:#101828}
.pk-ch button[data-ch=lead]{background:#F97316;border-color:#F97316;color:#fff}
.pk-ch-a{min-height:1.6em;margin:16px 0 0;font:600 1.02rem/1.5 Inter,system-ui,sans-serif;color:#1D2939;max-width:70ch}
.pk-hon{max-width:78ch}
@media (max-width:1000px){.pk-grid,.pk-own{grid-template-columns:1fr 1fr}.pb-grid,.pk-lock-g{grid-template-columns:1fr}.pb-sum{position:static}}
@media (max-width:760px){.pk-hero{padding:26px 0 30px}.pk-hg{grid-template-columns:1fr;gap:26px}.pk-hero h1{font-size:clamp(1.85rem,8.6vw,2.4rem)}.pk-sub{font-size:1.04rem;margin-top:12px}.pk-ctas{margin-top:16px}.pk-go,.pk-call{flex:1 1 100%;justify-content:center}.pk-grid,.pk-own,.pb-fields{grid-template-columns:1fr}.pb-tot b{font-size:1.08rem}.pk-scar{box-shadow:6px 6px 0 #FED7AA}}
@media (max-width:760px){.pk-tw{border:0;background:none;overflow:visible}.pk-table{min-width:0}.pk-table thead{position:absolute;left:-9999px}.pk-table,.pk-table tbody,.pk-table tr,.pk-table th,.pk-table td{display:block;width:auto}.pk-table tr{background:#fff;border:1.5px solid #E4E7EC;border-radius:12px;margin-bottom:12px;padding:6px 0}.pk-table th,.pk-table td{border:0;padding:6px 14px}.pk-table tbody th{width:auto;font-size:1rem}.pk-table td:before{content:attr(data-l);display:block;font-size:.74rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#667085}.pk-table .pk-t{width:auto}}
@media (prefers-reduced-motion:reduce){.pk-hero:before,.pk-hero:after{animation:none}.pk-hand path{animation:none;stroke-dashoffset:0}}
`,
  script: String.raw`(function(){
var STRIPE={task:'',starter:'',growth:'',leader:'',dominance:''};
function $(i){return document.getElementById(i);}
function m(n){return '$'+Math.round(n).toLocaleString('en-US');}
function ref(){return 'pk-'+Date.now().toString(36);}
function payUrl(k){var u=STRIPE[k];if(!u)return '';return u+(u.indexOf('?')<0?'?':'&')+'client_reference_id='+ref();}
[].forEach.call(document.querySelectorAll('[data-pay]'),function(a){var u=payUrl(a.getAttribute('data-pay'));if(u){a.href=u;a.target='_blank';a.rel='noopener';a.hidden=false;}});
/* save / bookmark */
var sv=$('pkSave'),sm=$('pkSaveMsg');
if(sv)sv.addEventListener('click',function(){
if(navigator.share&&/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)){navigator.share({title:document.title,url:location.href.split('#')[0]}).catch(function(){});return;}
var mac=/Mac|iPhone|iPad/.test(navigator.platform||'');sm.textContent='Press '+(mac?'Cmd':'Ctrl')+' + D to bookmark this page.';});
/* scar counter */
var SAY={'0':'Lucky you. Let’s keep it that way: every price and timeline is on this page.','1':'One is enough. This time you see the price, the work and the timeline before you pay.','2':'Twice hurts. No long-term contract, no promises we can’t keep, and a real person on the phone.','3':'We get it. Our founder lost tens of thousands of dollars to agencies before starting this one. That is why this page exists.'};
[].forEach.call(document.querySelectorAll('.pk-scar-b button'),function(b){b.addEventListener('click',function(){
[].forEach.call(document.querySelectorAll('.pk-scar-b button'),function(x){x.setAttribute('aria-pressed','false');});
b.setAttribute('aria-pressed','true');$('pkScarA').textContent=SAY[b.getAttribute('data-n')];});});
/* lead or keep */
var CH={lead:'Good. Build your campaign below, or call 1-800-481-8638 and we will map out how to get you there.',keep:'That is a fine choice too. Save this page, and when you are ready to grow, it will be here. So will we.'};
[].forEach.call(document.querySelectorAll('.pk-ch button'),function(b){b.addEventListener('click',function(){$('pkChA').textContent=CH[b.getAttribute('data-ch')];if(b.getAttribute('data-ch')==='lead'){setTimeout(function(){$('build').scrollIntoView({behavior:'smooth'});},900);}});});
/* builder */
var f=$('pkOrder');if(!f)return;
var PK=[['starter','Starter',500,0,0,0],['growth','Local Growth',1000,1000,0,0],['leader','Market Leader',2500,1800,0,0],['dominance','Dominance',5000,2500,750,0]];
function val(n){var c=f.querySelector('input[name="'+n+'"]:checked');return c?+c.value:0;}
var last={};
function calc(){
var seo=+$('pbSeo').value||0,gbp=val('gbp'),ai=val('ai'),kit=$('pbKit').checked,t=Math.max(0,Math.min(10,Math.floor(+$('pbTasks').value||0)));
$('pbSeoOut').textContent=m(seo);
var mo=seo+gbp+(kit?97:0),once=t*100+ai+(kit?497:0);
$('pbMo').textContent=m(mo);$('pbOnce').textContent=m(once);$('pbFirst').textContent=m(mo+once);
var key='',name='';PK.forEach(function(p){if(seo===p[2]&&gbp===p[3]&&ai===p[4]&&!kit&&t===0){key=p[0];name=p[1];}});
if(!key&&t>0&&!seo&&!gbp&&!ai&&!kit){key='task';name='Fix-It';}
$('pbPkg').textContent=name?'This matches the '+name+' package.':'';
var pay=$('pbPay'),u=key?payUrl(key):'';if(u){pay.href=u;pay.target='_blank';pay.rel='noopener';pay.hidden=false;}else{pay.hidden=true;pay.removeAttribute('href');}
var W=[[],[],[],[],[]];
if(t){W[0].push('Fix-It tasks: leaks fixed, tracking working');}
if(ai){W[0].push('AI audit: where ChatGPT and Gemini stand on you');}
if(kit){W[0].push('Launch Kit: listings, press release, review requests');}
if(gbp){W[1].push('Google Business Profile: map views can start to move');}
if(seo){W[1].push('Technical fixes in; Google re-reading your pages');W[2].push('New pages often start to earn impressions');W[3].push('Rankings can climb on the terms you target');W[4].push('Work compounds: each month builds on the last');}
if(seo>=2500){W[2].push('More of your market worked at once');}
if(gbp&&seo){W[3].push('Map pack and website pulling together');}
if(!t&&!ai&&!kit&&!gbp&&!seo){W[0].push('Pick something to see the timeline');}
[].forEach.call(document.querySelectorAll('#pbTl li'),function(li,i){li.classList.toggle('on',W[i].length>0);li.querySelector('em').textContent=W[i].length?W[i].join('. ')+'.':'—';});
var v=+$('pbVal').value||0;$('pbBe').textContent=mo&&v?'At '+m(mo)+' a month, about '+(Math.ceil(mo/v*10)/10)+' new customer'+(mo/v>1?'s':'')+' a month covers it. Anything past that is growth.':'Enter what one new customer is worth to you.';
var L=[];if(seo)L.push('Monthly SEO '+m(seo)+'/mo');if(gbp)L.push('Google Business Profile '+m(gbp)+'/mo');if(kit)L.push('Local Launch Kit $497 setup + $97/mo');if(t)L.push('Fix-It tasks: '+t+' x $100 = '+m(t*100));if(ai)L.push('AI search visibility audit '+m(ai));
last={mo:mo,once:once,L:L,name:name};}
f.addEventListener('input',calc);f.addEventListener('change',calc);
[].forEach.call(f.querySelectorAll('[data-step]'),function(b){b.addEventListener('click',function(){var i=$('pbTasks');i.value=Math.max(0,Math.min(10,(+i.value||0)+(+b.getAttribute('data-step'))));calc();});});
function setPick(p){$('pbSeo').value=p.seo||0;var g=f.querySelector('input[name="gbp"][value="'+(p.gbp||0)+'"]');if(g)g.checked=true;var a=f.querySelector('input[name="ai"][value="'+(p.ai||0)+'"]');if(a)a.checked=true;$('pbTasks').value=p.tasks||0;$('pbKit').checked=false;calc();}
[].forEach.call(document.querySelectorAll('.pk-pick[data-pick]'),function(b){b.addEventListener('click',function(){setPick(JSON.parse(b.getAttribute('data-pick')));$('build').scrollIntoView({behavior:'smooth'});});});
function toLock(){$('pbLock').checked=true;$('pbYou').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(function(){var n=f.querySelector('input[name=industry_city]');if(n)n.focus({preventScroll:true});},700);}
var lg=$('pkLockGo');if(lg)lg.addEventListener('click',toLock);
[].forEach.call(document.querySelectorAll('[data-lock]'),function(a){a.addEventListener('click',function(e){e.preventDefault();var n=f.querySelector('textarea[name=notes]');if(n&&!n.value)n.value='Interested in an Enterprise / Global campaign.';$('pbYou').scrollIntoView({behavior:'smooth',block:'start'});});});
f.addEventListener('submit',function(){calc();
var w=$('pbWeb');if(w.value&&!/^https?:\/\//i.test(w.value.trim()))w.value='https://'+w.value.trim();
f.elements.order_summary.value=(last.name?'Package: '+last.name+'\n':'Custom campaign\n')+(last.L.join('\n')||'Nothing picked, wants to talk')+'\nMonthly: '+m(last.mo)+'\nOne time: '+m(last.once)+($('pbLock').checked?'\nAsked about an Industry Lockdown':'');
f.elements.monthly_total.value=m(last.mo);f.elements.one_time_total.value=m(last.once);
f.elements._subject.value='SEO package order: '+(last.name||'custom')+' '+m(last.mo)+'/mo ('+(f.elements.business.value||'').slice(0,60)+')';
f.dataset.sum=(last.name?last.name+' package: ':'Your campaign: ')+m(last.mo)+' a month'+(last.once?' plus '+m(last.once)+' one time':'')+'.';});
var mo=new MutationObserver(function(){var ok=f.querySelector('.eta-msg[data-kind="ok"]');if(!ok)return;mo.disconnect();
$('pbYou').hidden=true;$('pbDoneSum').textContent=f.dataset.sum||'';var d=$('pbDone');d.hidden=false;d.focus();});
mo.observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:['data-kind']});
calc();})();`,
};
