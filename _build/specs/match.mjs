// /match/  "Grab an EARTH ticket. We TRIPLE your SEO."  TV landing page + full offer terms (TOAD TV campaign, 2026-11-09).
// Wording rules from Zach: say "triple" (never "200%" or "300%"); credit = 2x what they pay for SEO, as SEO service
// credit (not cash, not transferable); qualify by buying any EARTH ticket and sending the receipt with the order;
// one per business; cap $100,000 of credit per business (reached at $50,000 paid). Climate line exactly: "1.5% of EARTH ticket revenue funds carbon removal through Stripe Climate".
// Never call it a charity donation or an offset. Dates (Zach, 2026-11-09): valid now through January 1, 2027, 11:59 p.m. Eastern.
// No "free" in big type. Prices in the order builder are only the posted eyetoad.com prices (see /denver-seo-pricing/).
// Ticket checkout = the live presale Stripe link on theearthmovie.com (checked 2026-11-09: 200, "Stripe Checkout", $2.99 presale).
// Display font: Unbounded 800, Latin subset self-hosted at /fonts/unbounded-800-sub.woff2 (~10 KB).
//   cd _build && node newpage.mjs specs/match.mjs
const VERSION = 'MATCH-2026-11-09';
const CAP = '$100,000';
const DATES = 'Offer valid now through January 1, 2027, 11:59 p.m. Eastern. It ends early only with notice on this page.';
const TICKET = 'https://buy.stripe.com/eVqdR8br7blt1PCfUv1B600';
const URL = 'https://eyetoad.com/match/';
const S = [
  ['who', 'Who runs the offer'],
  ['what', 'What you get'],
  ['how', 'How to qualify'],
  ['math', 'How the credit is calculated'],
  ['apply', 'How the credit is used'],
  ['cap', 'Limits'],
  ['dates', 'Dates'],
  ['nocash', 'Not cash, not transferable'],
  ['earth', 'About the EARTH movie'],
  ['results', 'No guarantee of rankings or results'],
  ['change', 'Ending the offer'],
  ['contact', 'Questions'],
];
const sec = (id, body) => `<section class="pt-s" id="mt-${id}" aria-labelledby="mt-${id}-h"><h3 class="pt-h" id="mt-${id}-h">${S.findIndex((x) => x[0] === id) + 1}. ${S.find((x) => x[0] === id)[1]}</h3>${body}</section>`;

// hero network: lines from a ring of points converging on the eyetoad apex
const AX = 520, AY = 400;
const net = (() => {
  let lines = '', comets = '', dots = '';
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.2;
    const r = 470 + (i % 3) * 70;
    const x = Math.round(AX + Math.cos(a) * r), y = Math.round(AY + Math.sin(a) * r * 0.82);
    const cx = Math.round((x + AX) / 2 + Math.sin(a) * 60), cy = Math.round((y + AY) / 2 - Math.cos(a) * 60);
    const d = `M${x} ${y}Q${cx} ${cy} ${AX} ${AY}`;
    lines += `<path d="${d}"/>`;
    comets += `<path d="${d}" pathLength="100" style="animation-delay:-${((i * 0.37) % 3.4).toFixed(2)}s"/>`;
    dots += `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" style="animation-delay:-${(i * 0.5) % 4}s"/>`;
  }
  return `<svg class="mt-net" viewBox="0 0 1040 800" aria-hidden="true" focusable="false">
<defs><radialGradient id="mtGlow"><stop offset="0" stop-color="#FDE68A" stop-opacity=".85"/><stop offset=".35" stop-color="#34D399" stop-opacity=".28"/><stop offset="1" stop-color="#34D399" stop-opacity="0"/></radialGradient>
<linearGradient id="mtLn" x1="0" x2="1"><stop offset="0" stop-color="#34D399" stop-opacity=".15"/><stop offset="1" stop-color="#FACC15" stop-opacity=".7"/></linearGradient></defs>
<circle class="mt-halo" cx="${AX}" cy="${AY}" r="230" fill="url(#mtGlow)"/>
<g class="mt-lines" fill="none" stroke="url(#mtLn)" stroke-width="1.4">${lines}</g>
<g class="mt-comets" fill="none" stroke="#FDE68A" stroke-width="2.6" stroke-linecap="round">${comets}</g>
<g class="mt-dots" fill="#6EE7B7">${dots}</g>
<g class="mt-apex"><path d="M${AX} ${AY - 74}L${AX + 70} ${AY + 48}H${AX - 70}Z" fill="#0B1220" stroke="#FACC15" stroke-width="4" stroke-linejoin="round"/><circle cx="${AX}" cy="${AY + 6}" r="20" fill="#FACC15"/><circle cx="${AX}" cy="${AY + 6}" r="8" fill="#0B1220"/></g>
</svg>`;
})();

const hero = `<section class="mt-hero" aria-labelledby="mt-h1">
${net}
<div class="wrap mt-hg">
<div class="mt-copy">
<p class="mt-eb"><span class="mt-tv">As seen on TV</span> The EARTH SEO Match</p>
<h1 id="mt-h1">Grab an EARTH ticket. <em>We triple your SEO.</em></h1>
<p class="mt-sub">Get a ticket to the EARTH movie, build your SEO order here, and we add SEO work worth twice what you pay. <b>$1,000 becomes $3,000 of SEO work.</b></p>
<div class="mt-ctas"><a class="mt-go" href="#order">Build my tripled SEO order <span aria-hidden="true">&rarr;</span></a></div>
<p class="mt-tk">No ticket yet? <a href="${TICKET}" target="_blank" rel="noopener">Get an EARTH presale ticket<span class="sr"> (opens Stripe checkout in a new tab)</span></a> &middot; $2.99</p>
<ul class="mt-proof" aria-label="Why people trust us"><li><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 5.0 from 60 Google reviews</li><li>A+ BBB accredited</li><li>Founder-led since 2012</li></ul>
</div>
<div class="mt-card">
<p class="mt-card-k">Every $1 you pay for SEO</p>
<div class="mt-stack" role="img" aria-label="You pay $1,000. We add $2,000 of SEO credit. You get $3,000 of SEO work.">
<span class="mt-b mt-you"><small>You pay</small>$1,000</span><span class="mt-b mt-us"><small>On us</small>+$1,000</span><span class="mt-b mt-us"><small>On us</small>+$1,000</span>
</div>
<p class="mt-eq">= <b>$3,000</b> of SEO work</p>
<p class="mt-dl"><span class="mt-dot" aria-hidden="true"></span>Ends January 1, 2027<span class="mt-days" data-days></span></p>
<p class="mt-capline">Up to ${CAP} in credit per business</p>
</div>
</div>
</section>`;

// order builder (posted eyetoad.com prices only)
const months = [1, 3, 6, 12].map((m) => `<option value="${m}"${m === 3 ? ' selected' : ''}>${m} month${m > 1 ? 's' : ''}</option>`).join('');
const builder = `<section class="k-sec mt-ob" id="order" aria-labelledby="mt-ob-h"><div class="wrap">
<div class="k-chip">Step 2</div>
<h2 class="k-h" id="mt-ob-h">Build your SEO order. <em>Watch it triple.</em></h2>
<p class="k-p mt-lead">Pick what you want. The total updates as you go. When it looks right, send it to our team and we confirm the scope with you before anything is billed.</p>
<form class="ob" id="mtOrder" data-eta="lead" aria-describedby="mt-ob-note">
<div class="ob-grid">
<div class="ob-picks">
<fieldset class="ob-f"><legend>1. Monthly SEO</legend>
<p class="ob-hint">Build-your-own SEO levels, in $100 steps. <a href="/denver-seo-pricing/">How we price SEO</a></p>
<label class="ob-l" for="obSeo">SEO each month: <output id="obSeoOut" for="obSeo">$500</output></label>
<input type="range" id="obSeo" name="seo_monthly" min="0" max="5000" step="100" value="500">
<div class="ob-scale" aria-hidden="true"><span>$0</span><span>$5,000</span></div>
<label class="ob-l" for="obMonths">For how long</label>
<select id="obMonths" name="months">${months}</select>
</fieldset>
<fieldset class="ob-f"><legend>2. Google Business Profile management</legend>
<div class="ob-opts">
<label><input type="radio" name="gbp" value="0" checked> None</label>
<label><input type="radio" name="gbp" value="1000"> One location <b>$1,000/mo</b></label>
<label><input type="radio" name="gbp" value="1800"> Aggressive local <b>$1,800/mo</b></label>
<label><input type="radio" name="gbp" value="2500"> Up to 3 locations <b>$2,500/mo</b></label>
</div>
<p class="ob-hint">Billed for the months you picked above. <a href="/google-business-profile-management/#gb-pricing">What each plan covers</a></p>
</fieldset>
<fieldset class="ob-f"><legend>3. One-time SEO work</legend>
<div class="ob-opts">
<label><input type="radio" name="ai_audit" value="0" checked> No AI search audit</label>
<label><input type="radio" name="ai_audit" value="297"> AI search visibility audit, report <b>$297</b></label>
<label><input type="radio" name="ai_audit" value="750"> AI search visibility audit, done for you <b>$750</b></label>
</div>
<label class="ob-chk"><input type="checkbox" id="obLlk" name="local_launch_kit" value="yes"> Local Launch Kit <b>$497 setup + $97/mo</b></label>
<label class="ob-l" for="obTasks">SEO &agrave; la carte fixes at $100 each (meta tags, schema, GA4, Search Console and more)</label>
<input type="number" id="obTasks" name="a_la_carte_tasks" min="0" max="50" step="1" value="0" inputmode="numeric">
</fieldset>
</div>
<aside class="ob-sum" aria-labelledby="ob-sum-h">
<p class="ob-sum-k" id="ob-sum-h">Your EARTH SEO match</p>
<dl class="ob-rows">
<div><dt>You invest</dt><dd id="obInv">$1,500</dd></div>
<div class="ob-on"><dt>On us (SEO credit)</dt><dd id="obCred">+$3,000</dd></div>
<div class="ob-tot"><dt>Total SEO work</dt><dd id="obTot">$4,500</dd></div>
</dl>
<div class="ob-bar" aria-hidden="true"><i id="obBarYou"></i><i id="obBarUs"></i></div>
<p class="ob-capn" id="obCap" hidden>You reached the ${CAP} credit cap. Credit stops growing at $50,000 paid.</p>
<p class="ob-err" id="obErr" role="alert" hidden>Pick at least one SEO service above.</p>
<ul class="ob-lines" id="obLines"></ul>
<p class="ob-live sr" aria-live="polite" id="obSay"></p>
<p class="ob-dl">Offer ends January 1, 2027<span data-days></span></p>
</aside>
</div>

<fieldset class="ob-f ob-you"><legend>4. Send it to our team</legend>
<div class="ob-two">
<p><label for="obName">Your name</label><input id="obName" name="name" autocomplete="name" required maxlength="80"></p>
<p><label for="obBiz">Business name</label><input id="obBiz" name="business" autocomplete="organization" required maxlength="120"></p>
<p><label for="obEmail">Email</label><input id="obEmail" type="email" name="email" autocomplete="email" required maxlength="120"></p>
<p><label for="obPhone">Phone</label><input id="obPhone" type="tel" name="phone" autocomplete="tel" required maxlength="25"></p>
<p><label for="obWeb">Website <span class="ob-opt">(if you have one)</span></label><input id="obWeb" name="website" autocomplete="url" inputmode="url" maxlength="200" placeholder="yourbusiness.com"></p>
<p><label for="obRcpt">EARTH ticket receipt number <span class="ob-opt">(if you have it)</span></label><input id="obRcpt" name="ticket_receipt" maxlength="40" placeholder="e.g. 1234-5678" aria-describedby="obRcptHint"><small id="obRcptHint">It&rsquo;s on your Stripe receipt email. No ticket yet? <a href="${TICKET}" target="_blank" rel="noopener">Get one here<span class="sr"> (opens in a new tab)</span></a>, or send the order now and reply with the receipt.</small></p>
</div>
<label class="ob-chk ob-biz"><input type="checkbox" name="business_use" value="yes" required> This order is for my business.</label>
<p class="ob-hp" aria-hidden="true"><label>Leave this empty <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
<input type="hidden" name="_subject" value="EARTH SEO match order">
<input type="hidden" name="offer_version" value="${VERSION}">
<input type="hidden" name="invest_total" value="">
<input type="hidden" name="credit_total" value="">
<input type="hidden" name="seo_work_total" value="">
<input type="hidden" name="order_summary" value="">
<button type="submit" class="mt-go ob-send">Send to the eyetoad.com team <span aria-hidden="true">&rarr;</span></button>
<p class="ob-note" id="mt-ob-note">No payment now. A real person checks your order, confirms the scope and sends an invoice for what you pay. We use your details only to reply about this order. <a href="/privacy-policy/">Privacy policy</a>.</p>
</fieldset>
<div class="ob-done" id="obDone" hidden tabindex="-1">
<p class="ob-done-k">Order sent to the eyetoad.com team</p>
<p id="obDoneSum"></p>
<ol><li>A real person reviews your order, usually within one business day.</li><li>We confirm the scope and send an invoice for what you pay.</li><li>Your SEO credit (twice what you pay) is added as SEO work on your account.</li></ol>
<p>Still need your ticket? <a href="${TICKET}" target="_blank" rel="noopener">Get an EARTH presale ticket<span class="sr"> (opens in a new tab)</span></a> and reply to our email with the receipt. Questions? Call <a href="tel:18004818638">1-800-481-8638</a>.</p>
</div>
</form>
</div></section>`;

const trust = `<section class="k-sec mt-trust" aria-labelledby="mt-tr-h"><div class="wrap">
<div class="k-chip">Why this is real</div>
<h2 class="k-h" id="mt-tr-h">A real agency. <em>A real deadline.</em></h2>
<div class="mt-tg">
<div><b>5.0</b><span>from 60 Google reviews</span></div>
<div><b>A+</b><span>BBB accredited</span></div>
<div><b>2012</b><span>founder-led since</span></div>
<div><b>24</b><span>live sites in our own network, grown with the same SEO you&rsquo;re buying</span></div>
</div>
<div class="mt-dead"><p><b>The offer ends January 1, 2027 at 11:59 p.m. Eastern.</b> That date is in the terms below. It is not a timer that resets. <span data-days></span></p></div>
<p class="k-p">Search Converts LLC, doing business as Eye To Ad Media, 1001 Bannock St, Suite 660, Denver, CO 80204. Call <a href="tel:18004818638">1-800-481-8638</a> and a person answers.</p>
</div></section>`;

const terms = `<section class="k-sec mt-terms" aria-labelledby="mt-terms"><div class="wrap">
<div class="k-chip">Offer terms</div>
<h2 class="k-h" id="mt-terms">The full <em>terms.</em></h2>
<p class="pt-meta"><b>Version:</b> ${VERSION} &middot; <b>Last updated:</b> <time datetime="2026-11-09">November 9, 2026</time> &middot; <a href="/match/offer.json">Machine-readable terms (JSON)</a></p>
<nav class="pt-toc" aria-label="Terms sections"><ol>${S.map((x) => `<li><a href="#mt-${x[0]}">${x[1]}</a></li>`).join('')}</ol></nav>
<div class="pt-body">
${sec('who', `<p>This offer is made by <b>Search Converts LLC</b>, a Colorado limited liability company doing business as <b>Eye To Ad Media</b> (&ldquo;we&rdquo;, &ldquo;us&rdquo;), 1001 Bannock St, Suite 660, Denver, CO 80204.</p>`)}
${sec('what', `<p>When you qualify, we add <b>SEO service credit equal to 2 times what you pay us for SEO</b> in your order. The credit is applied as SEO work on your account, so the SEO work you get is triple what you pay.</p>`)}
${sec('how', `<ul class="pt-ul"><li><b>Buy any ticket to the EARTH movie.</b> Any ticket counts.</li><li><b>Send the ticket receipt with your SEO order.</b> Attach it to your order, or email it to us when you order.</li><li>The order must be placed during the offer dates below.</li></ul>`)}
${sec('math', `<p>Credit = 2 &times; what you pay for SEO. Examples: pay $100, get $200 in credit, for $300 of SEO work. Pay $1,000, get $2,000 in credit, for $3,000 of SEO work. The credit is capped at ${CAP} per business, which you reach when you pay $50,000 for SEO.</p>`)}
${sec('apply', `<p>The credit can be used only for SEO services from Eye To Ad Media, and we apply it as SEO work on your account.</p>`)}
${sec('cap', `<ul class="pt-ul"><li>One per business.</li><li>Credit of up to ${CAP} per business.</li></ul>`)}
${sec('dates', `<p>${DATES}</p>`)}
${sec('nocash', `<p>The credit is SEO service credit, not cash. It cannot be exchanged for cash, refunded or transferred to another person or business.</p>`)}
${sec('earth', `<p>EARTH is a feature film. Learn more at <a href="https://www.theearthmovie.com/" target="_blank" rel="noopener">theearthmovie.com</a>. 1.5% of EARTH ticket revenue funds carbon removal through Stripe Climate. Buying a ticket is separate from our SEO services; we do not sell tickets.</p>`)}
${sec('results', `<p>The credit adds SEO work. It does not guarantee rankings, traffic, AI citations, leads or sales. No one can honestly guarantee those, because Google and AI platforms decide.</p>`)}
${sec('change', `<p>We may withdraw this offer by posting notice on this page. Credit you have already earned is not affected.</p>`)}
${sec('contact', `<p>Call 1-800-481-8638 or use our <a href="/contact/">contact form</a>. A real person will answer.</p>`)}
</div>
</div></section>`;

const steps = `<div class="k-chip" style="margin-top:28px">How it works</div>
<h2 class="k-h" id="mt-h2a">Three steps. <em>Triple the SEO.</em></h2>
<ol class="mt-steps">
<li><span class="mt-n" aria-hidden="true">1</span><h3>Get an EARTH ticket</h3><p>Any ticket to the EARTH movie counts. Presale tickets are $2.99 on theearthmovie.com.</p><a class="mt-sbtn" href="${TICKET}" target="_blank" rel="noopener">Get an EARTH ticket<span class="sr"> (opens Stripe checkout in a new tab)</span> <span aria-hidden="true">&#8599;</span></a></li>
<li><span class="mt-n" aria-hidden="true">2</span><h3>Build your SEO order</h3><p>Pick your SEO services and budget below. You see your tripled total live.</p><a class="mt-sbtn" href="#order">Build my order <span aria-hidden="true">&darr;</span></a></li>
<li><span class="mt-n" aria-hidden="true">3</span><h3>We triple it</h3><p>Send it to our team with your receipt. We add SEO credit worth twice what you pay, applied as SEO work.</p></li>
</ol>
<div class="mt-math" aria-label="Examples">
<div><span class="mt-in">You pay $100</span><span class="mt-arrow" aria-hidden="true">&rarr;</span><b>$300</b><small>of SEO work ($200 credit)</small></div>
<div><span class="mt-in">You pay $1,000</span><span class="mt-arrow" aria-hidden="true">&rarr;</span><b>$3,000</b><small>of SEO work ($2,000 credit)</small></div>
<div><span class="mt-in">You pay $10,000</span><span class="mt-arrow" aria-hidden="true">&rarr;</span><b>$30,000</b><small>of SEO work ($20,000 credit)</small></div>
</div>
<div class="mt-glance"><p class="mt-glance-k">The offer at a glance</p>
<dl>
<div><dt>Offer</dt><dd>SEO service credit equal to 2&times; what you pay for SEO, so your SEO work is triple your investment</dd></div>
<div><dt>Qualify</dt><dd>Buy any EARTH movie ticket and send the receipt with your SEO order</dd></div>
<div><dt>Limit</dt><dd>One per business, up to ${CAP} in credit (reached at $50,000 paid)</dd></div>
<div><dt>Dates</dt><dd>Now through January 1, 2027, 11:59 p.m. Eastern</dd></div>
<div><dt>Credit</dt><dd>SEO work only. Not cash, not transferable</dd></div>
<div><dt>Run by</dt><dd>Search Converts LLC dba Eye To Ad Media, Denver, CO</dd></div>
</dl></div>`;

const FAQ = [
  { q: 'How do I triple my SEO investment?', a: 'Buy any ticket to the EARTH movie and send the receipt with your SEO order. We add SEO service credit equal to twice what you pay, so $100 becomes $300 of SEO work and $1,000 becomes $3,000.' },
  { q: 'How much is an EARTH ticket?', a: 'Presale tickets are $2.99 on theearthmovie.com. Any EARTH ticket qualifies.' },
  { q: 'Do I need the ticket before I send my order?', a: 'No. You can send your order now and reply with the ticket receipt when we contact you. The receipt is needed before the credit is added.' },
  { q: 'What is the most credit I can get?', a: 'Up to $100,000 of SEO credit per business, which you reach when you pay $50,000 for SEO. One per business.' },
  { q: 'When does the offer end?', a: 'Orders must be placed by January 1, 2027, 11:59 p.m. Eastern. It ends early only with notice on this page.' },
  { q: 'Is the credit cash?', a: 'No. It is SEO service credit for SEO work from Eye To Ad Media. It cannot be exchanged for cash or transferred.' },
  { q: 'What happens after I send my order?', a: 'A real person reviews it, confirms the scope with you and sends an invoice for what you pay. Then your credit is added as SEO work on your account.' },
  { q: 'Where does the climate part come in?', a: '1.5% of EARTH ticket revenue funds carbon removal through Stripe Climate.' },
  { q: 'Does the credit guarantee rankings?', a: 'No. It adds SEO work. No one can honestly guarantee rankings, AI citations or leads.' },
];

const OFFER = {
  '@type': 'Offer',
  '@id': URL + '#offer',
  name: 'The EARTH SEO Match: triple your SEO',
  description: 'Buy any EARTH movie ticket and send the receipt with an SEO order. Eye To Ad Media adds SEO service credit equal to 2 times what you pay for SEO, so the SEO work is triple the investment. One per business, credit capped at $100,000 per business (reached at $50,000 paid). Credit is SEO work only, not cash, not transferable. No guarantee of rankings or results.',
  url: URL,
  category: 'SEO services promotion',
  validFrom: '2026-11-09',
  validThrough: '2027-01-01T23:59:00-05:00',
  eligibleCustomerType: 'http://purl.org/goodrelations/v1#Business',
  availability: 'https://schema.org/InStock',
  offeredBy: { '@id': 'https://eyetoad.com/#organization' },
  seller: { '@id': 'https://eyetoad.com/#organization' },
  itemOffered: { '@type': 'Service', name: 'SEO services', serviceType: 'Search engine optimization', provider: { '@id': 'https://eyetoad.com/#organization' } },
  potentialAction: { '@type': 'OrderAction', target: URL + '#order', name: 'Send an SEO order to the eyetoad.com team' },
};

export default {
  path: '/match/',
  prefix: 'mt',
  date: '2026-11-09',
  title: 'Grab an EARTH Ticket, We Triple Your SEO | Eye To Ad Media',
  description: 'As seen on TV: get any EARTH movie ticket and we triple your SEO. $1,000 becomes $3,000 of SEO work, up to $100,000 credit. Build your order. Ends Jan 1, 2027.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  h1: 'Grab an EARTH ticket. We triple your SEO.',
  heroHtml: hero,
  headExtra: `<link rel="preload" href="/fonts/unbounded-800-sub.woff2" as="font" type="font/woff2" crossorigin>
<link rel="alternate" type="application/json" href="/match/offer.json" title="EARTH SEO Match offer terms (machine-readable)">`,
  extraNodes: [OFFER],
  capsule: `The EARTH SEO match is an Eye To Ad Media offer that triples your SEO investment. Buy any ticket to the EARTH movie (presale tickets are $2.99), send the receipt with your SEO order, and we add SEO service credit equal to twice what you pay for SEO. Pay $100 and you get $300 of SEO work; pay $1,000 and you get $3,000. One per business, up to ${CAP} in credit, now through January 1, 2027. The credit is not cash and cannot be transferred.`,
  sections: [steps, builder, trust, terms],
  faqH2: 'EARTH SEO match questions',
  faq: FAQ,
  related: [['SEO pricing', '/denver-seo-pricing/'], ['SEO &agrave; la carte', '/seo-a-la-carte/'], ['SEO packages', '/seo-packages/'], ['Dream It package', '/dream-it-advertising-package/'], ['Purchase terms', '/purchase-terms/'], ['Contact', '/contact/']],
  band: ['Ready to triple your SEO?', 'Build your order in two minutes, or call and tell us you have an EARTH ticket.', ['Build my order', '#order']],
  style: `@font-face{font-family:Unbounded;font-style:normal;font-weight:800;font-display:optional;src:url(/fonts/unbounded-800-sub.woff2) format("woff2")}
:root{--mt-disp:Unbounded,"Arial Black","Segoe UI Black",Impact,system-ui,sans-serif;--mt-ink:#0B1220;--mt-gold:#FACC15}
.sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.mt-hero{position:relative;overflow:hidden;isolation:isolate;color:#F8FAFC;padding:44px 0 56px;background:radial-gradient(900px 520px at 78% 42%,rgba(52,211,153,.16),transparent 62%),radial-gradient(1200px 700px at 10% 120%,rgba(37,99,235,.38),transparent 60%),radial-gradient(600px 300px at 15% 0%,rgba(250,204,21,.10),transparent 70%),linear-gradient(160deg,#030712 0%,#071330 55%,#04201A 100%)}
.mt-net{position:absolute;z-index:-1;top:50%;right:-6%;width:min(1000px,78vw);height:auto;transform:translateY(-50%);opacity:.95}
.mt-comets path{stroke-dasharray:7 100;animation:mtFlow 3.4s linear infinite}
@keyframes mtFlow{from{stroke-dashoffset:7}to{stroke-dashoffset:-100}}
.mt-dots circle{animation:mtBlink 4s ease-in-out infinite}@keyframes mtBlink{50%{opacity:.25}}
.mt-halo{transform-origin:520px 400px;animation:mtPulse 4.5s ease-in-out infinite}@keyframes mtPulse{50%{transform:scale(1.12);opacity:.75}}
.mt-hg{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:40px;align-items:center}
.mt-eb{margin:0 0 16px;font-size:.92rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#A7F3D0;display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.mt-tv{background:var(--mt-gold);color:var(--mt-ink);padding:4px 10px;border-radius:999px;letter-spacing:.04em}
.mt-hero h1{font-family:var(--mt-disp);font-weight:800;font-size:clamp(1.8rem,5.4vw,3.6rem);line-height:1.08;letter-spacing:-.01em;margin:0 0 18px;color:#fff;max-width:16ch;text-wrap:balance}
.mt-hero h1 em{font-style:normal;display:block;color:var(--mt-gold);text-shadow:0 0 28px rgba(250,204,21,.35)}
.mt-sub{font-size:clamp(1.05rem,1.6vw,1.22rem);line-height:1.6;color:#D7E0EC;margin:0 0 24px;max-width:56ch}.mt-sub b{color:#fff}
.mt-ctas{display:flex;flex-wrap:wrap;gap:12px}
.mt-go{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:54px;padding:14px 26px;border:0;border-radius:14px;background:var(--mt-gold);color:var(--mt-ink);font:800 1.08rem/1.2 Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;text-decoration:none;cursor:pointer;box-shadow:0 10px 30px rgba(250,204,21,.32),inset 0 -3px 0 rgba(0,0,0,.12);transition:transform .15s,box-shadow .15s}
.mt-go:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(250,204,21,.45)}.mt-go:focus-visible{outline:3px solid #fff;outline-offset:3px}
.mt-tk{margin:14px 0 0;color:#CBD5E1;font-size:.98rem}.mt-tk a{color:#A7F3D0;font-weight:700}
.mt-proof{list-style:none;margin:22px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px 18px;font-size:.92rem;color:#CBD5E1}.mt-proof span{color:var(--mt-gold);letter-spacing:1px}
.mt-card{background:rgba(8,15,34,.72);border:1px solid rgba(250,204,21,.35);border-radius:22px;padding:22px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 24px 60px rgba(0,0,0,.4)}
.mt-card-k{margin:0 0 12px;font-weight:800;color:#A7F3D0;font-size:.9rem;letter-spacing:.06em;text-transform:uppercase}
.mt-stack{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.mt-b{display:flex;flex-direction:column;gap:4px;padding:14px 10px;border-radius:12px;font-family:var(--mt-disp);font-weight:800;font-size:clamp(.95rem,1.6vw,1.15rem);text-align:center;font-variant-numeric:tabular-nums}
.mt-b small{font-family:Inter,system-ui,sans-serif;font-weight:700;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase}
.mt-you{background:#E2E8F0;color:var(--mt-ink)}.mt-us{background:var(--mt-gold);color:var(--mt-ink);animation:mtRise .7s cubic-bezier(.2,.8,.2,1) both}.mt-us+.mt-us{animation-delay:.18s}
@keyframes mtRise{from{transform:translateY(14px);opacity:0}}
.mt-eq{margin:14px 0 6px;font-size:1.05rem;color:#E2E8F0}.mt-eq b{font-family:var(--mt-disp);font-size:2rem;color:var(--mt-gold);vertical-align:-2px}
.mt-dl{margin:10px 0 0;font-weight:700;color:#fff;display:flex;flex-wrap:wrap;align-items:center;gap:8px}.mt-days{color:#FDE68A;font-weight:700}
.mt-dot{width:9px;height:9px;border-radius:50%;background:#F87171;box-shadow:0 0 0 4px rgba(248,113,113,.25)}
.mt-capline{margin:6px 0 0;color:#CBD5E1;font-size:.92rem}
.k-h{font-family:var(--mt-disp);font-weight:800;letter-spacing:-.01em}h2.k-h em{color:#C2410C}
.mt-steps{list-style:none;margin:22px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;counter-reset:s}
.mt-steps li{position:relative;background:#fff;border:1.5px solid #E4E7EC;border-radius:18px;padding:22px;box-shadow:0 10px 26px rgba(16,24,40,.06)}
.mt-steps h3{margin:12px 0 6px;font-size:1.15rem;color:#101828}.mt-steps p{margin:0 0 14px;color:#344054;line-height:1.6}
.mt-n{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--mt-ink);color:var(--mt-gold);font-family:var(--mt-disp);font-weight:800;font-size:1.2rem}
.mt-sbtn{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:10px 16px;border-radius:12px;background:#0B1220;color:#fff;font-weight:800;text-decoration:none}.mt-sbtn:hover{background:#1D2939}
.mt-math{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px}
.mt-math div{background:#0B1220;color:#fff;border-radius:18px;padding:20px 22px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px;box-shadow:0 18px 40px rgba(11,18,32,.18)}
.mt-in{font-weight:700;font-size:1rem;color:#CBD5E1}.mt-arrow{font-size:1.4rem;color:var(--mt-gold)}
.mt-math b{font-family:var(--mt-disp);font-weight:800;font-size:clamp(1.9rem,4vw,2.6rem);line-height:1;color:var(--mt-gold);font-variant-numeric:tabular-nums}
.mt-math small{flex-basis:100%;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:#CBD5E1;font-weight:700}
.mt-glance{margin-top:22px;background:#F0FDF4;border:1.5px solid #BBF7D0;border-radius:18px;padding:18px 20px}
.mt-glance-k{margin:0 0 8px;font-weight:800;color:#065F46}
.mt-glance dl{margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px}.mt-glance dl div{display:grid;grid-template-columns:72px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid #D1FAE5;font-size:.95rem}
.mt-glance dt{font-weight:800;color:#101828}.mt-glance dd{margin:0;color:#344054;line-height:1.5}
.mt-ob{background:linear-gradient(180deg,#F8FAFC,#EEF2FF)}.mt-lead{max-width:70ch}
.ob-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,.9fr);gap:22px;align-items:start;margin-top:18px}
.ob-f{border:1.5px solid #E4E7EC;border-radius:18px;background:#fff;padding:18px 20px 20px;margin:0 0 16px;min-width:0}
.ob-f legend{font-weight:800;font-size:1.08rem;color:#101828;padding:0 6px}
.ob-hint{margin:2px 0 12px;color:#475467;font-size:.95rem}.ob-hint a,.ob-note a,.ob-you small a{color:#1D4ED8}
.ob-l{display:block;font-weight:700;color:#101828;margin:12px 0 6px}.ob-l output{font-family:var(--mt-disp);color:#047857}
.ob input[type=range]{width:100%;min-height:32px;accent-color:#047857}
.ob-scale{display:flex;justify-content:space-between;font-size:.85rem;color:#475467}
.ob select,.ob input[type=number],.ob-two input{width:100%;min-height:46px;padding:10px 12px;border:1.5px solid #98A2B3;border-radius:10px;font:500 1rem Inter,system-ui,sans-serif;color:#101828;background:#fff;box-sizing:border-box}
.ob select:focus-visible,.ob input:focus-visible{outline:3px solid #2563EB;outline-offset:1px;border-color:#2563EB}
.ob input[type=number]{max-width:140px}
.ob-opts{display:grid;gap:6px}.ob-opts label,.ob-chk{display:flex;align-items:center;gap:10px;min-height:40px;padding:6px 10px;border-radius:10px;cursor:pointer;color:#344054}
.ob-opts label:hover,.ob-chk:hover{background:#F2F4F7}.ob-opts b,.ob-chk b{color:#101828;margin-left:auto;white-space:nowrap}
.ob-opts input,.ob-chk input{width:20px;height:20px;accent-color:#047857;flex:none}
.ob-sum{position:sticky;top:90px;background:#0B1220;color:#fff;border-radius:20px;padding:22px;box-shadow:0 24px 50px rgba(11,18,32,.25)}
.ob-sum-k{margin:0 0 10px;font-weight:800;color:#A7F3D0;text-transform:uppercase;letter-spacing:.06em;font-size:.88rem}
.ob-rows{margin:0}.ob-rows div{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.12)}
.ob-rows dt{color:#CBD5E1;font-weight:600}.ob-rows dd{margin:0;font-family:var(--mt-disp);font-weight:800;font-variant-numeric:tabular-nums;font-size:1.15rem}
.ob-on dd{color:#6EE7B7}.ob-tot{border-bottom:0!important}.ob-tot dt{color:#fff;font-weight:800}.ob-tot dd{font-size:clamp(1.7rem,3vw,2.2rem);color:var(--mt-gold)}
.ob-bar{display:flex;height:12px;border-radius:99px;overflow:hidden;background:#1D2939;margin:10px 0 12px}.ob-bar i{display:block;height:100%;transition:width .3s}#obBarYou{background:#E2E8F0;width:33.3%}#obBarUs{background:var(--mt-gold);width:66.7%}
.ob-capn{margin:0 0 8px;color:#FDE68A;font-weight:700;font-size:.92rem}.ob-err{margin:0 0 8px;color:#FECACA;font-weight:700}
.ob-lines{margin:0 0 10px;padding:0 0 0 18px;color:#CBD5E1;font-size:.9rem;line-height:1.55}
.ob-dl{margin:0;color:#fff;font-weight:700;font-size:.92rem}.ob-dl span{color:#FDE68A;margin-left:6px}
.ob-you{margin-top:6px}.ob-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 18px}
.ob-two p{margin:0 0 10px}.ob-two label{display:block;font-weight:700;color:#101828;margin:0 0 6px}.ob-opt{font-weight:500;color:#475467}
.ob-two small{display:block;margin-top:6px;color:#475467;line-height:1.5}
.ob-biz{margin:4px 0 14px;font-weight:700;color:#101828}
.ob-hp{position:absolute!important;left:-9999px;width:1px;height:1px;overflow:hidden}
.ob-send{width:100%;max-width:440px}.ob-send:disabled{opacity:.6;cursor:wait}
.ob-note{margin:12px 0 0;color:#475467;font-size:.92rem;line-height:1.55}
.ob-done{background:#ECFDF3;border:2px solid #6CE9A6;border-radius:18px;padding:22px;color:#054F31}
.ob-done-k{font-family:var(--mt-disp);font-weight:800;font-size:1.25rem;margin:0 0 8px}.ob-done ol{margin:10px 0 12px;padding-left:22px;line-height:1.6}.ob-done a{color:#05603A;font-weight:700}
.mt-trust{background:#fff}.mt-tg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:20px 0}
.mt-tg div{background:#F8FAFC;border:1.5px solid #E4E7EC;border-radius:16px;padding:18px}.mt-tg b{display:block;font-family:var(--mt-disp);font-size:2rem;color:#0B1220}.mt-tg span{color:#344054;line-height:1.5}
.mt-dead{background:#FFF7ED;border:1.5px solid #FED7AA;border-radius:16px;padding:16px 18px;margin:0 0 14px}.mt-dead p{margin:0;color:#7C2D12;line-height:1.6}.mt-dead span{font-weight:700}
.pt-meta{margin:6px 0 18px;color:#475467;font-size:.95rem}.pt-meta a{color:#1D4ED8}
.pt-toc{background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;padding:16px 18px;max-width:78ch;margin:0 0 26px}.pt-toc ol{margin:0;padding:0 0 0 22px;columns:2 240px;column-gap:28px;font-size:.95rem;line-height:1.9}.pt-toc a{color:#1D4ED8}
.pt-body{max-width:78ch}.pt-s{padding:6px 0 10px;scroll-margin-top:90px}.pt-h{font-size:1.15rem;line-height:1.3;margin:22px 0 8px;color:#101828}
.pt-s p,.pt-s li{font-size:1rem;line-height:1.65;color:#344054}.pt-s p{margin:0 0 12px}.pt-ul{margin:0 0 12px;padding:0 0 0 22px}.pt-ul li{margin:0 0 6px}.pt-s a{color:#1D4ED8}
#order{scroll-margin-top:80px}
@media (max-width:900px){.mt-hg,.ob-grid{grid-template-columns:1fr}.ob-sum{position:static}.mt-steps,.mt-math{grid-template-columns:1fr}.mt-tg{grid-template-columns:repeat(2,minmax(0,1fr))}.mt-net{width:150vw;right:-62vw;top:2%;transform:none;opacity:.5}}
@media (max-width:640px){.mt-hero{padding:30px 0 40px}.mt-glance dl,.ob-two{grid-template-columns:1fr}.ob-opts b,.ob-chk b{margin-left:0}.ob-opts label,.ob-chk{flex-wrap:wrap}.mt-go{width:100%}.mt-b{font-size:.92rem;padding:12px 4px;white-space:nowrap;letter-spacing:-.02em}.mt-b small{font-size:.66rem}}
@media (prefers-reduced-motion:reduce){.mt-net *,.mt-us{animation:none!important}.mt-go,.ob-bar i{transition:none}}`,
  script: String.raw`(function(){
var END=Date.UTC(2027,0,2,4,59,59),left=Math.ceil((END-Date.now())/864e5);
var dtxt=left>1?' · '+left+' days left':left===1?' · last day':'';
[].forEach.call(document.querySelectorAll('[data-days]'),function(e){e.textContent=dtxt;});
var f=document.getElementById('mtOrder');if(!f)return;
function $(i){return document.getElementById(i);}
function m(n){return '$'+Math.round(n).toLocaleString('en-US');}
function val(name){var c=f.querySelector('input[name="'+name+'"]:checked');return c?+c.value:0;}
var last={},t;
function calc(){
var mo=+$('obMonths').value||1,seo=+$('obSeo').value||0,gbp=val('gbp'),ai=val('ai_audit'),llk=$('obLlk').checked,tasks=Math.max(0,Math.min(50,Math.floor(+$('obTasks').value||0)));
var L=[],inv=0;
if(seo){L.push('Monthly SEO '+m(seo)+'/mo x '+mo+' mo = '+m(seo*mo));inv+=seo*mo;}
if(gbp){L.push('Google Business Profile management '+m(gbp)+'/mo x '+mo+' mo = '+m(gbp*mo));inv+=gbp*mo;}
if(ai){L.push('AI search visibility audit ('+(ai===297?'report':'done for you')+') = '+m(ai));inv+=ai;}
if(llk){L.push('Local Launch Kit '+m(497)+' setup + '+m(97)+'/mo x '+mo+' mo = '+m(497+97*mo));inv+=497+97*mo;}
if(tasks){L.push('SEO a la carte '+tasks+' task'+(tasks>1?'s':'')+' x $100 = '+m(tasks*100));inv+=tasks*100;}
var cred=Math.min(inv*2,100000),tot=inv+cred;
$('obSeoOut').textContent=m(seo);$('obInv').textContent=m(inv);$('obCred').textContent='+'+m(cred);$('obTot').textContent=m(tot);
var pu=tot?inv/tot*100:33.3;$('obBarYou').style.width=pu+'%';$('obBarUs').style.width=(100-pu)+'%';
$('obCap').hidden=inv<50000;if(inv)$('obErr').hidden=true;
var ul=$('obLines');ul.innerHTML='';L.forEach(function(s){var li=document.createElement('li');li.textContent=s;ul.appendChild(li);});
clearTimeout(t);t=setTimeout(function(){$('obSay').textContent='You invest '+m(inv)+'. Total SEO work '+m(tot)+'.';},700);
last={inv:inv,cred:cred,tot:tot,L:L,mo:mo};}
f.addEventListener('input',calc);f.addEventListener('change',calc);
f.addEventListener('reset',function(){setTimeout(calc,0);});
f.addEventListener('submit',function(e){calc();
if(!last.inv){e.preventDefault();$('obErr').hidden=false;$('obSeo').focus();return;}
var w=$('obWeb');if(w.value&&!/^https?:\/\//i.test(w.value.trim()))w.value='https://'+w.value.trim();
var sum='EARTH SEO match order ('+'${VERSION}'+')\n'+last.L.join('\n')+'\nYou invest: '+m(last.inv)+'\nSEO credit on us (2x, cap $100,000): '+m(last.cred)+'\nTotal SEO work: '+m(last.tot);
f.elements.order_summary.value=sum;f.elements.invest_total.value=m(last.inv);f.elements.credit_total.value=m(last.cred);f.elements.seo_work_total.value=m(last.tot);
f.elements._subject.value='EARTH SEO match order: '+m(last.inv)+' -> '+m(last.tot)+' of SEO work ('+(f.elements.business.value||'').slice(0,60)+')';
f.dataset.sum='You invest '+m(last.inv)+'. With the EARTH match you get '+m(last.tot)+' of SEO work ('+m(last.cred)+' on us).';
});
var mo=new MutationObserver(function(){var ok=f.querySelector('.eta-msg[data-kind="ok"]');if(!ok)return;mo.disconnect();
[].forEach.call(f.querySelectorAll('.ob-grid,.ob-you'),function(x){x.hidden=true;});ok.hidden=true;
$('obDoneSum').textContent=f.dataset.sum||'';var d=$('obDone');d.hidden=false;d.focus();});mo.observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:["data-kind"]});
calc();})();`,
};
