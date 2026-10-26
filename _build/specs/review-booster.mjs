// /review-booster/  targets: review booster, get more google reviews for small business, review request service, review management cheap
// SKU (secure-checkout CONTRACT.md): REVIEW-M $59/mo.
const BUY = (sku, label) => `<button type="button" class="sc-buy k-btn k-btn-a px-btn" data-sku="${sku}" data-site="eyetoad.com">${label}</button>`;
export default {
  path: '/review-booster/',
  prefix: 'rvb',
  date: '2026-10-26',
  title: 'Review Booster | More Google Reviews for $59 a Month',
  description: 'Every customer asked for a Google review after every job, one reminder, and a reply drafted for every review. $59 a month, no setup fee, cancel anytime.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'Review Booster &middot; $59 a month &middot; No setup fee &middot; Cancel anytime online',
  h1: 'Review Booster: ask every customer, <em>every time, without thinking about it.</em>',
  kick: 'Most happy customers will leave a review. Most are never asked.',
  sub: 'Reviews are what people read before they call you, and recent reviews are one of the signals Google and AI assistants use to decide who to show. Review Booster sends a review request after every job, follows up once, and drafts a reply to every review you get. You stay focused on the work; the asking happens on its own.',
  cta2: ['Start for $59 a month', '#rvb-buy'],
  asideHtml: `<div class="k-slider-wrap px-box" id="rvb-buy" aria-label="Start Review Booster">
<div class="k-chip">One plan</div>
<div class="px-opt px-hi">
<div class="px-top"><p class="px-name">Review Booster</p><p class="px-price">$59<small>a month</small></p></div>
<ul class="px-list">
<li>Review request after every job, plus one reminder</li>
<li>Your one-tap Google review link and a printable QR card</li>
<li>A reply drafted for every new Google review</li>
<li>Up to 200 requests a month</li>
<li>Monthly report: requests sent, reviews in, rating trend</li>
</ul>
${BUY('REVIEW-M', 'Start Review Booster, $59/mo')}
<p class="px-fine">$59 today, then $59 every month until you cancel. No setup fee, no contract. Cancel anytime online.</p>
</div>
<noscript><p class="px-fine"><b>Checkout needs JavaScript.</b> Call 1-800-481-8638 or email info@eyetoad.com and we will send a secure invoice.</p></noscript>
</div>`,
  capsule: 'Review Booster from Eye To Ad Media is a $59 a month review-request service for local businesses. After each job, your customer gets a request with a one-tap link to your Google review form, and one reminder if they have not left a review. Every new Google review gets a reply drafted for you. Every customer is asked the same way, with no incentives and no filtering of unhappy customers, which keeps you inside Google&rsquo;s review rules.',
  sections: [
    `<div class="k-chip">How it works</div>
<h2 class="k-h" id="rvb-h2a">Three steps, and <em>only the first one is yours.</em></h2>
<ol class="k-steps rvb-steps">
<li class="k-step"><div><h3>You add the customer when the job is done</h3><p>Type a name and email into a short form on your phone, upload a list once a week, or have your booking or CRM tool send it over automatically. It takes about ten seconds per customer.</p></div></li>
<li class="k-step"><div><h3>We ask, then remind once</h3><p>The customer gets a short, friendly request under your business name with a one-tap link straight to your Google review form. If they have not left a review after three days, they get one polite reminder. Then we stop. No pestering.</p></div></li>
<li class="k-step"><div><h3>Every review gets a reply</h3><p>When a new Google review comes in, we draft a reply in your voice within one business day and email it to you to post. Answering every review, good or bad, is one of the simplest things you can do for how your profile reads.</p></div></li>
</ol>
<p class="k-p">Requests go by email from day one. Text requests can be switched on once the carrier registration for your business texting is approved (usually one to three weeks), and only to customers who gave you their mobile number for the job.</p>`,

    `<section class="k-sec k-sec-off" aria-labelledby="rvb-h2b"><div class="wrap">
<div class="k-chip">Why it matters</div>
<h2 class="k-h" id="rvb-h2b">Reviews are what decide <em>who gets the call.</em></h2>
<div class="k-grid3">
<div class="k-card"><h3 class="k-h3">The map pack</h3><p>For most local searches, Google shows three businesses on the map first. Review count, rating and how recent the reviews are all shape which three, and they are what the customer compares once they get there.</p></div>
<div class="k-card"><h3 class="k-h3">AI answers</h3><p>When someone asks an AI assistant who to hire, the answer usually leans on review sites and your Google profile. A business with recent, answered reviews is easier for an assistant to recommend with confidence.</p></div>
<div class="k-card"><h3 class="k-h3">The customer</h3><p>A steady trickle of fresh reviews tells a stranger you are busy, current and still doing good work. A great rating with the newest review from two years ago raises the question of whether you are still open.</p></div>
</div>
</div></section>`,

    `<section class="k-sec" aria-labelledby="rvb-h2c"><div class="wrap">
<div class="k-chip">Compared honestly</div>
<h2 class="k-h" id="rvb-h2c">What review tools usually cost, <em>and what you get for less.</em></h2>
<div class="px-scroll"><table class="px-tbl">
<caption class="px-cap">Published starting prices, checked October 2026. Prices and plans change; confirm with each company.</caption>
<thead><tr><th scope="col">Tool</th><th scope="col">Typical price</th><th scope="col">Good fit for</th></tr></thead>
<tbody>
<tr><th scope="row">NiceJob</th><td>About $75 to $125 a month</td><td>Small service businesses that want review requests plus marketing extras</td></tr>
<tr><th scope="row">GatherUp</th><td>About $99 a month per location</td><td>Businesses that also want customer feedback surveys</td></tr>
<tr><th scope="row">Birdeye</th><td>$299 a month and up</td><td>Multi-location brands that want messaging, listings and surveys in one platform</td></tr>
<tr><th scope="row">Review Booster</th><td>$59 a month</td><td>One-location businesses that mostly need every customer asked and every review answered, done for them</td></tr>
</tbody></table></div>
<p class="k-p">Those platforms do more than we do: dashboards, widgets, messaging inboxes, multi-location reporting. If you need that, they are worth the price. If what you actually need is for the asking and the replies to happen without you, Review Booster costs less and someone does it for you.</p>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="rvb-h2d"><div class="wrap">
<div class="k-chip">Inside the rules</div>
<h2 class="k-h" id="rvb-h2d">What we will never do <em>with your reviews.</em></h2>
<div class="k-grid2">
<div class="k-card"><h3 class="k-h3">No filtering</h3><p>Every customer gets the same request and the same link. Steering only happy customers to Google, sometimes called review gating, breaks Google&rsquo;s policy and can get reviews removed. If someone had a bad experience, you want to hear it and answer it in public.</p></div>
<div class="k-card"><h3 class="k-h3">No incentives, no fakes</h3><p>No discounts or gifts for reviews, no reviews written by staff or friends, and no buying reviews. Google removes them, and the FTC&rsquo;s rule on fake reviews puts real penalties behind it. Honest reviews take longer, and they last.</p></div>
</div>
<p class="k-p">Reviews are part of a bigger picture. If you want your Google Business Profile run for you as well, see <a href="/google-business-profile-management/">Google Business Profile management</a>. Just starting out? <a href="/local-launch-kit/">The Local Launch Kit</a> includes review requests along with directory listings, a press release and SEO fixes. To see whether AI assistants recommend you today, try the <a href="/ai-search-visibility-audit/">AI search visibility audit</a>.</p>
<script src="https://usabusinesssearch.com/secure-checkout/checkout.js" defer></script>
</div></section>`,
  ],
  faqH2: 'About Review Booster.',
  faq: [
    { q: 'How many reviews will I get?', a: 'We cannot promise a number, and you should be wary of anyone who does. It depends on how many customers you serve, how happy they are and how soon after the job they are asked. What we guarantee is the work: every customer you add gets a request within one business day and one reminder, and every new Google review gets a reply drafted within one business day.' },
    { q: 'Is there a contract or setup fee?', a: 'No. It is $59 a month, starting the day you sign up, and it renews monthly until you cancel. There is no setup fee and no minimum term. Cancel anytime online with the link in your receipt email, or email info@eyetoad.com. Your reviews, your review link and your QR card stay yours after you cancel.' },
    { q: 'Do you post the replies for me?', a: 'By default we email you a drafted reply and you post it, so nothing goes out under your name without your say. If you would rather we post them, give us manager access to your Google Business Profile and we will post the replies for positive reviews and send you any negative ones to approve first.' },
    { q: 'What if a customer leaves a bad review?', a: 'You will hear about it the same day, with a calm, professional reply drafted for you. A thoughtful public answer to a bad review often does more for the next customer than another five-star review. We will not hide, filter or try to remove honest reviews. If a review breaks Google&rsquo;s rules, such as one from someone who was never a customer, we show you how to report it.' },
    { q: 'Can you text my customers?', a: 'Yes, once your business&rsquo;s texting registration is approved by the carriers, which usually takes one to three weeks. Until then, requests go by email. We only text customers who gave you their mobile number for the job, every text names your business, and anyone who replies STOP never gets another one.' },
    { q: 'What happens if I go over 200 requests a month?', a: 'We let you know before it happens and nothing extra is charged without your OK. Most single-location businesses send far fewer. If you regularly need more, call us and we will quote a higher-volume plan or a multi-location setup.' },
  ],
  related: [['Google Business Profile management', '/google-business-profile-management/'], ['Local Launch Kit', '/local-launch-kit/'], ['AI search visibility audit', '/ai-search-visibility-audit/'], ['Local SEO and Google Maps', '/local-seo-services/'], ['How to get more Google reviews', '/blog/how-to-get-more-google-reviews/'], ['How to respond to Google reviews', '/blog/how-to-respond-to-google-reviews/']],
  band: ['Your next customer is reading your reviews right now.', 'Start Review Booster today for $59 a month, or call and we will look at your profile with you first.', ['Start for $59 a month', '#rvb-buy']],
  service: {
    name: 'Review Booster', types: ['Review request service', 'Online review management'], alt: ['Google review requests', 'Review generation service'],
    area: { '@type': 'Country', name: 'United States' },
    offers: [
      { '@type': 'Offer', name: 'Review Booster monthly plan', sku: 'REVIEW-M', price: '59', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://eyetoad.com/review-booster/', priceSpecification: { '@type': 'UnitPriceSpecification', price: '59', priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } }, description: 'Review requests after every job with one reminder, a one-tap Google review link and QR card, a reply drafted for every new review, up to 200 requests a month. No setup fee, cancel anytime online.' },
    ],
  },
  script: "document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.sc-buy');if(b&&typeof window.gtag==='function'){try{window.gtag('event','sc_buy_click',{sku:b.getAttribute('data-sku'),page:location.pathname})}catch(x){}}});",
  style: `:root{--k-hbg:#0B1220}.rvb-hero{background:radial-gradient(900px 500px at 82% 12%,rgba(234,179,8,.24),transparent 60%),radial-gradient(600px 400px at 8% 96%,rgba(249,115,22,.22),transparent 60%),#0B1220}
.px-box{color:#101828}.px-opt{border:1.5px solid #E4E7EC;border-radius:14px;padding:16px;margin:0 0 12px;background:#fff}.px-hi{border-color:#F97316;box-shadow:0 10px 28px rgba(234,88,12,.14)}
.px-top{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}.px-name{margin:0;font-weight:800;font-size:1.05rem;color:#101828}
.px-price{margin:0;font-family:'Fraunces',Georgia,serif;font-weight:900;font-size:1.9rem;color:#101828;line-height:1}.px-price small{font-family:system-ui,-apple-system,Roboto,Arial;font-size:.78rem;font-weight:600;color:#667085;margin-left:6px}
.px-list{margin:10px 0 14px;padding:0 0 0 20px;font-size:.92rem;line-height:1.6;color:#344054}.px-list li{margin:2px 0}
.px-btn{width:100%;min-height:50px;font-size:.98rem;background:#C15205}.px-btn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.px-fine{margin:8px 0 0;font-size:.84rem;line-height:1.5;color:#475467}
.px-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:22px;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.px-tbl{width:100%;min-width:520px;border-collapse:collapse;font-size:.93rem}.px-tbl th,.px-tbl td{padding:12px 14px;border-bottom:1px solid #EEF0F3;text-align:left;vertical-align:top;line-height:1.5}
.px-tbl thead th{background:#101828;color:#fff;font-weight:800}.px-tbl tbody th{font-weight:700;color:#101828}.px-tbl td{color:#344054}.px-tbl tbody tr:last-child>*{border-bottom:0;background:#FFF7ED}
.px-cap{caption-side:top;text-align:left;padding:12px 14px 0;font-weight:600;font-size:.86rem;color:#475467}
.rvb-steps{margin:24px 0 18px;padding:0;list-style:none;max-width:860px}
@media(max-width:640px){.px-price{font-size:1.6rem}.px-opt{padding:14px}}`,
};
