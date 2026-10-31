// /client-loyalty-bonuses/terms/  Loyalty Bonus Terms (version LBT-2026-10-30). Indexed. Linked from /client-loyalty-bonuses/
// (clickwrap checkbox on its request form records this version + timestamp). Bump VERSION here and in
// specs/client-loyalty-bonuses.mjs (TERMS_VERSION) together.
const VERSION = 'LBT-2026-10-30';
const UPDATED = 'October 30, 2026';
const S = [
  ['who', 'Who runs the program'],
  ['what', 'What a loyalty bonus is'],
  ['elig', 'Who is eligible'],
  ['disc', 'Bonuses are discretionary'],
  ['nocash', 'No cash value, no transfer'],
  ['nosign', 'Not a sign-up incentive'],
  ['reviews', 'Not tied to reviews'],
  ['value', 'How dollar values are calculated'],
  ['results', 'No guarantee of rankings or results'],
  ['place', 'How bonus placements are published'],
  ['request', 'Requesting a bonus or making a referral'],
  ['change', 'Changing or ending the program'],
  ['law', 'Colorado law'],
  ['legal', 'Not legal advice'],
  ['contact', 'Contact'],
];
const why = (t) => `<p class="lt-why"><b>Why this is here:</b> ${t}</p>`;
const sec = (id, body) => `<section class="pt-s" id="lt-${id}" aria-labelledby="lt-${id}-h"><h2 class="pt-h" id="lt-${id}-h">${S.findIndex((x) => x[0] === id) + 1}. ${S.find((x) => x[0] === id)[1]}</h2>${body}</section>`;

export default {
  path: '/client-loyalty-bonuses/terms/',
  prefix: 'lt',
  date: '2026-10-30',
  title: 'Loyalty Bonus Terms | Eye To Ad Media',
  description: 'The terms for Eye To Ad Media loyalty bonuses: who is eligible, why bonuses are discretionary with no cash value, how values are calculated, and no guaranteed results.',
  crumbs: [['Client loyalty bonuses', 'https://eyetoad.com/client-loyalty-bonuses/']],
  eyebrow: `Version ${VERSION} &middot; Last updated ${UPDATED}`,
  h1: 'Loyalty Bonus <em>Terms.</em>',
  kick: 'How our loyalty bonuses work, in plain English.',
  sub: 'These terms explain the bonus advertising we sometimes give loyal clients and people who refer good clients. If you ask us for a bonus or send a referral through our loyalty form, you agree to them by ticking the box on that form.',
  cta2: ['Back to loyalty bonuses', '/client-loyalty-bonuses/'],
  factsChip: 'The short version',
  factsLabel: 'Loyalty bonus terms at a glance',
  facts: [
    ['Eligible', 'Existing clients in good standing, and referrers of clients valued at over $500/mo'],
    ['Promised?', 'No. Every bonus is at our sole discretion'],
    ['Cash value', 'None. Bonuses cannot be exchanged for cash or credit'],
    ['Results', 'No ranking, traffic, lead or sales guarantee'],
    ['Law', 'Colorado'],
  ],
  capsule: 'Eye To Ad Media loyalty bonuses are discretionary thank-yous: bonus advertising, placements, tools or services given at no charge to existing clients in good standing and to people who refer a client valued at over $500 a month. They have no cash value, are never a sign-up incentive, are never tied to reviews, carry no guarantee of results, and may be changed or ended at any time. Colorado law governs.',
  sections: [
    `<div class="k-chip">Loyalty Bonus Terms</div>
<h2 class="k-h" id="lt-h2a">The full <em>terms.</em></h2>
<p class="pt-meta"><b>Version:</b> ${VERSION} &middot; <b>Last updated:</b> <time datetime="2026-10-30">${UPDATED}</time></p>
<nav class="pt-toc" aria-label="Sections"><ol>${S.map((x) => `<li><a href="#lt-${x[0]}">${x[1]}</a></li>`).join('')}</ol></nav>
<div class="pt-body">
${sec('who', `<p>The loyalty bonus program is run by <b>Search Converts LLC</b>, a Colorado limited liability company doing business as <b>Eye To Ad Media</b> (&ldquo;we&rdquo;, &ldquo;us&rdquo;), 1001 Bannock St, Suite 660, Denver, CO 80204. &ldquo;You&rdquo; means the client, referrer or business we are dealing with.</p>`)}
${sec('what', `<p>A loyalty bonus is advertising, a placement, a tool or a service that we choose to give you at no charge as a thank-you. Examples include a press release on our press release sites, a verified or featured listing in our business directories, a sponsored feature on our news site, a storefront in World VR Mall, an AI chatbot or tool, or extra work on your website. Examples describe things we have given or may give. They are not a list of things you are entitled to.</p>`)}
${sec('elig', `<p>You may be considered for a loyalty bonus if either of these is true:</p><ul class="pt-ul"><li>you are an <b>existing client in good standing</b> (your account is current and you are not in a payment dispute with us); or</li><li>you <b>referred a client to us whose services are valued at over $500 per month</b>, and that client has signed up and paid. You do not have to be a client yourself to qualify as a referrer.</li></ul><p>Being eligible means we may consider you. It does not mean you will receive a bonus.</p>${why('the FTC expects the terms and conditions of any offer to be clear up front (FTC Guide Concerning Use of the Word &ldquo;Free,&rdquo; 16 CFR 251.1(c)), and stating one set of criteria lets us treat everyone the same way.')}`)}
${sec('disc', `<p>Whether to give a bonus, what it is, when it is given and how much it is worth are decided by us, at our sole discretion, case by case. No number of months, dollars spent or referrals made earns a bonus automatically, and a bonus given once does not create a right to another one.</p>${why('Section 5 of the FTC Act and the Colorado Consumer Protection Act (C.R.S. 6-1-105(1)(i)) prohibit advertising something you do not intend to provide as advertised. Calling the bonus what it is, discretionary, keeps our advertising accurate.')}`)}
${sec('nocash', `<p>Loyalty bonuses have <b>no cash value</b>. They cannot be exchanged for cash, refunds, account credit or a discount on your invoices, and they cannot be transferred, sold or assigned to anyone else unless we agree in writing. If a bonus placement ends or is removed, nothing is owed in its place.</p>`)}
${sec('nosign', `<p>Loyalty bonuses are <b>not a sign-up incentive</b> and are not offered in exchange for buying anything. Please do not become a client expecting free marketing. Choose us for the work you pay for.</p>${why('if a &ldquo;free&rdquo; item is tied to a purchase, the FTC&rsquo;s &ldquo;Free&rdquo; guide (16 CFR Part 251) applies its full rules on disclosures, regular prices and how often the offer runs. Our bonuses are thank-yous after the fact, not purchase offers.')}`)}
${sec('reviews', `<p>Bonuses are never given in exchange for a review, a rating, a testimonial or a social media post, and are never conditioned on what a review says. We do not ask for reviews in return for anything.</p><p>If you talk about Eye To Ad Media publicly (for example, recommending us on social media) and you have received or may receive a bonus or referral thank-you from us, please say so in your post, for example &ldquo;I may get a thank-you from Eye To Ad Media if you sign up.&rdquo; If we ever quote you in our advertising after giving you a bonus, we will disclose that you received one.</p>${why('the FTC&rsquo;s rule on consumer reviews and testimonials (16 CFR Part 465) bans incentives conditioned on reviews, and the FTC Endorsement Guides (16 CFR Part 255) require disclosure of a material connection, such as a bonus, between a business and someone who recommends it.')}`)}
${sec('value', `<p>When we describe a bonus by its dollar value, that value is based on <b>our own regular price</b> for the same work: the price we publish on our websites or regularly quote to paying clients for that item. We do not use inflated &ldquo;retail&rdquo; values. A stated value is for description only; it is not cash value and it is not what any other bonus will be worth.</p>${why('the FTC Guides Against Deceptive Pricing (16 CFR 233.1) treat a stated value as deceptive unless it is a real price at which the item was openly offered in good faith, and Colorado law prohibits false or misleading statements about price (C.R.S. 6-1-105(1)(l)).')}`)}
${sec('results', `<p>Bonus placements give your business exposure. We do <b>not</b> guarantee any search ranking, position, traffic, number of leads, calls, sales or other result from a bonus, and we do not guarantee how long a bonus placement will stay up. Search engines and other platforms make their own decisions, which we do not control.</p>${why('objective claims about results need proof before they are made (FTC Policy Statement Regarding Advertising Substantiation), so we do not make them.')}`)}
${sec('place', `<p>Bonus content on our sites is published where it is genuinely useful to readers, may be labeled as sponsored, and links are marked the way search engine guidelines ask. We may edit bonus content for accuracy, length and our publishing standards, and we may decline or remove content that is unlawful, misleading or does not fit a site.</p>${why('our news site labels client features as sponsored, and search engine spam policies call for paid or given links to be marked (for example, rel=&ldquo;sponsored&rdquo;).')}`)}
${sec('request', `<p>You can tell us about a referral or ask about a bonus with the form on our <a href="/client-loyalty-bonuses/#lb-form">loyalty bonuses page</a> or by phone. Sending the form does not guarantee a bonus. When you send it, you confirm that the information is true and that you have the right to share any referral&rsquo;s contact details with us. The form records the version of these terms and the time you agreed to them.</p>`)}
${sec('change', `<p>We may change these terms, or change, pause or end the loyalty bonus program, at any time. Changes apply from the date they are posted here with a new version and date. Bonuses already delivered stay delivered for as long as we choose to keep them published.</p>`)}
${sec('law', `<p>These terms are governed by the laws of the State of Colorado. Any court action about them belongs in the courts of Denver County, Colorado. Nothing in these terms limits a right you have under the Colorado Consumer Protection Act or other law that cannot be waived.</p>`)}
${sec('legal', `<p>These terms describe how our program works. They are not legal advice to you, and our team has not been asked to give you legal advice about them. We have written them to follow the FTC and Colorado rules cited above in good faith; if you have a legal question about them, ask your own lawyer.</p>`)}
${sec('contact', `<p>Eye To Ad Media<br>1001 Bannock St, Suite 660, Denver, CO 80204<br>Phone: <a href="tel:18004818638">1-800-481-8638</a><br>Email: <a class="eml" data-u="info" data-d="eyetoad.com" href="#">info&#64;eyetoad&#46;com</a></p>`)}
</div>`,
  ],
  faqH2: 'Loyalty bonus terms, <em>quick answers.</em>',
  faq: [
    { q: 'Am I guaranteed a bonus if I meet the eligibility rules?', a: 'No. Eligibility means we may consider you. Every bonus is given at our sole discretion.' },
    { q: 'Can I trade a bonus for cash or a discount?', a: 'No. Loyalty bonuses have no cash value and cannot be exchanged for cash, credit, refunds or discounts.' },
    { q: 'How do you work out what a bonus is worth?', a: 'From our own regular price for the same work, the price we publish or regularly quote to paying clients. A stated value is for description only.' },
    { q: 'Which law applies to these terms?', a: 'Colorado law. Court actions belong in Denver County, Colorado.' },
  ],
  related: [['Client loyalty bonuses', '/client-loyalty-bonuses/'], ['Purchase terms', '/purchase-terms/'], ['Privacy policy', '/privacy-policy/'], ['Contact', '/contact/']],
  band: ['Questions about a bonus or a referral?', 'Call and ask. A real person will walk you through how it works.', ['Back to loyalty bonuses', '/client-loyalty-bonuses/']],
  style: `:root{--k-hbg:#FFF7ED}
.k-hero.lt-hero{background:linear-gradient(180deg,#FFFBF5,#FFF7ED);color:#101828}.k-hero.lt-hero h1{color:#101828}.k-hero.lt-hero h1 em{color:#C2410C}
.k-hero.lt-hero .k-eyebrow{color:#9A3412}.k-hero.lt-hero .k-eyebrow:before{background:#C2410C}.k-hero.lt-hero .k-kick{color:#7C2D12}.k-hero.lt-hero .k-sub{color:#344054}
.k-hero.lt-hero .k-proof{color:#475467}.k-hero.lt-hero .k-proof b{color:#101828}.k-hero.lt-hero .k-btn-a{background:#C2410C}.k-hero.lt-hero .k-btn-b{color:#101828}
.lt-facts dl{margin:0;display:grid;gap:10px}.lt-facts dt{font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#475467}.lt-facts dd{margin:2px 0 0;color:#101828;font-weight:600;line-height:1.45}
.pt-meta{margin:6px 0 18px;color:#475467;font-size:.95rem}
.pt-toc{background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;padding:16px 18px;max-width:78ch;margin:0 0 26px}.pt-toc ol{margin:0;padding:0 0 0 22px;columns:2 240px;column-gap:28px;font-size:.95rem;line-height:1.7}.pt-toc a{color:#1D4ED8}
.pt-body{max-width:78ch}.pt-s{padding:6px 0 10px;scroll-margin-top:90px}.pt-h{font-size:1.22rem;line-height:1.3;margin:22px 0 8px;color:#101828}
.pt-s p,.pt-s li{font-size:1rem;line-height:1.65;color:#344054}.pt-s p{margin:0 0 12px}.pt-ul{margin:0 0 12px;padding:0 0 0 22px}.pt-ul li{margin:0 0 6px}.pt-s a{color:#1D4ED8}
.lt-why{background:#F0F9FF;border-left:4px solid #0284C7;border-radius:0 10px 10px 0;padding:10px 14px;font-size:.9rem!important;color:#0C4A6E!important}`,
};
