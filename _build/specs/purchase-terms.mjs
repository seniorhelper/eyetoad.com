// /purchase-terms/  Online Purchase & Subscription Terms (version terms-2026-10-26). Indexed. Linked from the footer next to Terms
// and from the secure-checkout consent box ("I agree to the Purchase Terms"). Bump VERSION here, in secure-checkout
// (public/checkout.js TERMS_VERSION + server/lib/ledger.php SC_TERMS_VERSION) and the "Last updated" date together.
const VERSION = 'terms-2026-10-26';
const UPDATED = 'October 26, 2026';
const S = [
  ['seller', 'Who you are buying from'],
  ['scope', 'When these terms apply'],
  ['what', 'What you buy'],
  ['price', 'Prices and taxes'],
  ['pay', 'Payment'],
  ['renew', 'Automatic renewal'],
  ['cancel', 'Cancelling a recurring plan'],
  ['final', 'All sales are final'],
  ['results', 'No guarantee of results'],
  ['time', 'Deliverables and timelines'],
  ['you', 'Your responsibilities'],
  ['disputes', 'Chargebacks and payment disputes'],
  ['nonpay', 'Non-payment and suspension'],
  ['liability', 'Limitation of liability'],
  ['law', 'Colorado law and arbitration'],
  ['changes', 'Changes to these terms'],
  ['general', 'General'],
  ['contact', 'Contact'],
];
const sec = (id, body) => `<section class="pt-s" id="pt-${id}" aria-labelledby="pt-${id}-h"><h2 class="pt-h" id="pt-${id}-h">${S.findIndex((x) => x[0] === id) + 1}. ${S.find((x) => x[0] === id)[1]}</h2>${body}</section>`;

export default {
  path: '/purchase-terms/',
  prefix: 'pt',
  date: '2026-10-26',
  title: 'Online Purchase & Subscription Terms | Eye To Ad Media',
  description: 'The terms for buying from Eye To Ad Media online: automatic renewal, a 30-day written notice to cancel, all sales final, no guaranteed results, and how payment disputes work.',
  crumbs: [],
  eyebrow: `Version ${VERSION} &middot; Last updated ${UPDATED}`,
  h1: 'Online Purchase &amp; Subscription <em>Terms.</em>',
  kick: 'The rules for anything you buy from us online, in plain English.',
  sub: 'These terms apply when you buy a package or plan from Search Converts LLC (dba Eye To Ad Media) on eyetoad.com or any site in our network. You agree to them by ticking the box at checkout. Please read them before you pay.',
  cta2: ['How to cancel a plan', '/cancel/'],
  factsChip: 'The short version',
  factsLabel: 'Purchase terms at a glance',
  facts: [
    ['Seller', 'Search Converts LLC (dba Eye To Ad Media), Colorado'],
    ['Payment', 'Card, on Authorize.net&rsquo;s secure payment page'],
    ['Renewal', 'Monthly and yearly plans renew automatically until cancelled'],
    ['Cancel', '30 days&rsquo; written notice, online or by email'],
    ['Refunds', 'None. All sales are final'],
    ['Results', 'Not guaranteed. We commit to the work'],
  ],
  capsule: `When you buy online from Eye To Ad Media, you buy from Search Converts LLC (dba Eye To Ad Media), a Colorado company. Monthly and yearly plans renew automatically at the price shown until cancelled. To cancel, give 30 days&rsquo; written notice through <a href="/cancel/">eyetoad.com/cancel</a> or by email to info@eyetoad.com; charges that fall within the notice period still apply. All sales are final, with no refunds. We commit to the work, not to rankings, leads, traffic or other results. This is version ${VERSION}, last updated ${UPDATED}.`,
  sections: [
    `<div class="k-chip">Purchase terms</div>
<h2 class="k-h" id="pt-h2a">The full <em>terms.</em></h2>
<p class="pt-meta"><b>Version:</b> ${VERSION} &middot; <b>Last updated:</b> <time datetime="2026-10-26">${UPDATED}</time></p>
<nav class="pt-toc" aria-label="Sections"><ol>${S.map((x) => `<li><a href="#pt-${x[0]}">${x[1]}</a></li>`).join('')}</ol></nav>
<div class="pt-body">
${sec('seller', `<p>You are buying from <b>Search Converts LLC</b>, a Colorado limited liability company doing business as <b>Eye To Ad Media</b> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). Our address is 1001 Bannock St, Suite 660, Denver, CO 80204. We run eyetoad.com and the sites in our network, including our business directories, press release sites, restaurant and travel guides, and AI Speed to Leads. &ldquo;You&rdquo; means the person or business that places the order.</p>`)}
${sec('scope', `<p>These terms apply to every purchase you make from us online: one-time packages (such as an audit, SEO tasks or a press release) and recurring plans (monthly or yearly), whether you pay through our secure checkout or finish an order request with us. You accept them by ticking the &ldquo;I agree to the Purchase Terms&rdquo; box before you pay. We keep a record of that agreement with your order: the version of these terms, the exact text you agreed to, and the date and time.</p>
<p>Our general <a href="/terms.html">Terms and Conditions</a> also apply. If the two conflict on an online purchase or subscription, these Purchase Terms control. A separate written agreement signed by us controls over both.</p>`)}
${sec('what', `<p>You buy the item described on the page and in the checkout panel at the time of purchase: its name, what is included, the price and how often it is billed. That description is the scope of the work. Anything not listed there is not included, and extra work is quoted and billed separately.</p>`)}
${sec('price', `<p>Prices are in U.S. dollars and are set by our checkout, not by the page you clicked from. The checkout shows what is charged today and what renews later. Prices do not include taxes; if a tax applies to your purchase, you are responsible for it.</p>
<p>We may change the price of a recurring plan for future renewals. If we do, we email you at least 30 days before the new price applies, and you can cancel as described in section 7.</p>`)}
${sec('pay', `<p>Payments are processed by Authorize.net on its secure hosted payment page. Your card details go to Authorize.net, not to our sites, and we never see or store your full card number. By paying, you authorize us to charge your card for the amount shown and, for a recurring plan, to charge the same card for each renewal until the plan is cancelled. Authorize.net emails you a receipt for each charge.</p>`)}
${sec('renew', `<p>Monthly plans renew every month and yearly plans renew every 12 months, automatically, at the price shown at checkout, until cancelled. The checkbox at checkout states the price, how often it renews and, for plans that start later, the date of the first charge. For example, the Local Launch Kit charges the setup fee today and the first monthly charge one month later.</p>`)}
${sec('cancel', `<p>You can cancel a recurring plan by giving us <b>30 days&rsquo; written notice</b>. Written notice means either:</p>
<ul class="pt-ul"><li>the online cancel form at <a href="/cancel/">eyetoad.com/cancel</a>, or</li><li>an email to info@eyetoad.com with the subject <b>CANCEL</b>, your business name and the email address you paid with.</li></ul>
<p>Your notice is effective on the date we receive it. The cancellation takes effect 30 days after that date (the &ldquo;effective date&rdquo;). Any charge that falls on or before the effective date still applies, and nothing is charged after it. Your plan keeps running through the effective date. We confirm by email within 1 business day with your effective date; please keep that confirmation. There is no cancellation fee, and you never need to call us to cancel.</p>
<p>One-time purchases are not subscriptions. They cannot be cancelled once paid, because work is scheduled as soon as the order comes in.</p>`)}
${sec('final', `<p><b>All sales are final.</b> We do not give refunds, partial refunds for unused time, money-back guarantees or service credits, for one-time purchases or recurring plans, except where a law that applies to you requires otherwise. Cancelling a plan stops future charges after the effective date; it does not refund earlier charges or charges within the notice period.</p>`)}
${sec('results', `<p>We commit to doing the work described in your order. We do <b>not</b> guarantee search rankings, map positions, leads, calls, traffic, reviews, mentions or citations by AI assistants, sales or any other result. Those depend on your market, your competitors, your customers and on platforms we do not control, such as Google, Bing and AI assistants, which change their systems without notice. Any examples or case studies on our sites describe past work and are not a promise of future results.</p>`)}
${sec('time', `<p>Delivery times on our pages and in emails (for example &ldquo;within 48 hours&rdquo; or &ldquo;in 5 business days&rdquo;) are good-faith estimates, not deadlines. They start once we have what we need from you: answers, materials and access. Delays caused by missing information, access we cannot use, or a third-party platform&rsquo;s review or outage are not a breach of these terms and do not change what you owe. If an estimate slips, we tell you why and give you a new date.</p>`)}
${sec('you', `<p>You agree to:</p>
<ul class="pt-ul"><li>give accurate, current information: your business name, contact details and billing details;</li><li>own, or be authorized to manage, every business, listing, profile, website and account you ask us to work on, and tell us right away if that changes;</li><li>give us the materials and access the work needs, and only give us content (text, photos, logos) that you own or have permission to use;</li><li>follow the laws that apply to your business, including only sending review requests and messages to your real customers who have agreed to hear from you.</li></ul>
<p>We may decline or stop work on a listing or account that you are not authorized to manage.</p>`)}
${sec('disputes', `<p>If you think a charge is wrong, contact us first at info@eyetoad.com or 1-800-481-8638 and give us 10 business days to look into it. Most questions are settled with one email.</p>
<p>Filing a chargeback or payment dispute with your bank for a charge made under these terms, after you agreed to them at checkout, is a breach of these terms. If that happens we may contest the dispute with our records (including your agreement to these terms), suspend your services, and recover the disputed amount, chargeback fees and our reasonable collection costs and attorneys&rsquo; fees, to the extent the law allows.</p>`)}
${sec('nonpay', `<p>If a renewal charge fails, we may retry the card and will email you. We may pause or suspend the plan, including removing Verified or Featured placements, until the balance is paid. Amounts that were due remain due, and our general Terms and Conditions apply to late payments.</p>`)}
${sec('liability', `<p>Services are provided &ldquo;as is&rdquo;, without warranties of any kind, except the commitment in section 9 to do the work described in your order. To the fullest extent the law allows, our total liability for any claim about a purchase is limited to the amount you paid us for the item the claim relates to, and we are not liable for indirect, incidental, special or consequential damages, including lost profits, lost data, goodwill or business interruption.</p>`)}
${sec('law', `<p>These terms are governed by the laws of the State of Colorado. Disputes are resolved by binding arbitration under the Federal Arbitration Act, as set out in section XII of our <a href="/terms.html#s12">Terms and Conditions</a>. Arbitration does not apply to claims about chargebacks, non-payment or unpaid balances, non-solicitation, non-circumvention, trade secrets, intellectual property, or interference with contractual or business relations; for those claims, either side may go to the courts of Denver County, Colorado, which is also the exclusive venue for any court action.</p>`)}
${sec('changes', `<p>We may update these terms. Each version has an id and a &ldquo;Last updated&rdquo; date at the top of this page, and the version you agreed to is saved with your order. Changes apply to purchases made after we post them. For a plan you already have, we email you at least 30 days before a change takes effect, and you may cancel under section 7.</p>`)}
${sec('general', `<p>If any part of these terms cannot be enforced, it is limited to the minimum extent needed and the rest stays in effect. You may not transfer your order or these terms without our written consent. Our failure to enforce a term is not a waiver of it.</p>`)}
${sec('contact', `<p>Search Converts LLC (dba Eye To Ad Media)<br>1001 Bannock St, Suite 660, Denver, CO 80204<br>Email: info@eyetoad.com<br>Phone: <a href="tel:18004818638">1-800-481-8638</a></p>`)}
</div>`,
  ],
  faqH2: 'Common questions about these terms.',
  faq: [
    { q: 'How do I cancel a monthly or yearly plan?', a: 'Give 30 days&rsquo; written notice: use the form at <a href="/cancel/">eyetoad.com/cancel</a>, or email info@eyetoad.com with the subject CANCEL and your business name + the email you paid with. Your cancellation takes effect 30 days after we receive the notice, and charges that fall within those 30 days still apply. We confirm by email within 1 business day.' },
    { q: 'Do you give refunds?', a: 'No. All sales are final. We do not offer refunds, money-back guarantees or service credits on one-time purchases or plans, except where the law requires it.' },
    { q: 'Do you guarantee rankings or leads?', a: 'No. We commit to doing the work described in your order. Rankings, leads, calls, traffic and AI citations depend on your market and on platforms we do not control, so no honest company can guarantee them.' },
    { q: 'What if I think a charge is wrong?', a: 'Email info@eyetoad.com or call 1-800-481-8638 first, and give us 10 business days to sort it out. Filing a chargeback after agreeing to these terms is a breach of them.' },
  ],
  related: [['Cancel a plan', '/cancel/'], ['Terms and Conditions', '/terms.html'], ['Privacy policy', '/privacy-policy/'], ['Contact', '/contact/']],
  band: ['Questions before you buy?', 'Call and ask. The founder will tell you, on the phone, what a package includes and whether it fits your business.', ['Send a message', '/contact/']],
  style: `:root{--k-hbg:#0B1220}.pt-hero{background:radial-gradient(800px 460px at 82% 12%,rgba(37,99,235,.22),transparent 60%),#0B1220}
.pt-facts dl{margin:0;display:grid;gap:10px}.pt-facts dt{font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#475467}.pt-facts dd{margin:2px 0 0;color:#101828;font-weight:600;line-height:1.45}
.pt-meta{margin:6px 0 18px;color:#475467;font-size:.95rem}
.pt-toc{background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;padding:16px 18px;max-width:78ch;margin:0 0 26px}.pt-toc ol{margin:0;padding:0 0 0 22px;columns:2 240px;column-gap:28px;font-size:.95rem;line-height:1.7}.pt-toc a{color:#1D4ED8}
.pt-body{max-width:78ch}.pt-s{padding:6px 0 10px;scroll-margin-top:90px}.pt-h{font-size:1.22rem;line-height:1.3;margin:22px 0 8px;color:#101828}
.pt-s p,.pt-s li{font-size:1rem;line-height:1.65;color:#344054}.pt-s p{margin:0 0 12px}.pt-ul{margin:0 0 12px;padding:0 0 0 22px}.pt-ul li{margin:0 0 6px}.pt-s a{color:#1D4ED8}`,
};
