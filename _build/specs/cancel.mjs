// /cancel/  Written cancellation notice for every recurring plan sold through secure checkout (online cancel, plus email).
// Purchase Terms (terms-2026-10-26): 30 days' written notice; effective 30 days after we receive it; charges in that window still apply.
// noindex (set after build), linked from the footer on every page. Plain FormSubmit POST with CAPTCHA ON, honeypot, 3-second guard.
// The form has no action in the HTML; the script sets it only after the guard passes (so bots that skip JS post nowhere).
// Paper trail: FormSubmit _autoresponse sends the customer a copy (plan + time sent); hidden notice_sent_at (ISO) + page_url.
const PLANS = ['Verified listing', 'Boost', 'List Booster', 'Growth Plan', 'Press release plan', 'Menu Pro', 'Featured listing', 'Review Booster', 'Local Launch Kit monthly', 'AI Speed to Leads', 'Other'];
export default {
  path: '/cancel/',
  prefix: 'cx',
  date: '2026-10-26',
  title: 'Cancel a Plan Online | Eye To Ad Media',
  description: 'Give written notice to cancel any Eye To Ad Media, directory, press release or AI Speed to Leads plan, online or by email. Takes effect 30 days after we receive it.',
  crumbs: [],
  eyebrow: 'Cancel online or by email &middot; 30 days&rsquo; written notice &middot; No cancellation fee',
  h1: 'Cancel a plan <em>online.</em>',
  kick: 'Send the form below, or email us. Either one is your written notice.',
  sub: 'This page is how you give written notice to cancel any monthly or yearly plan bought from Eye To Ad Media or our network: directory listings, Boost and Featured placements, press release plans, Menu Pro, Review Booster, the Local Launch Kit monthly plan and AI Speed to Leads. Under our <a href="/purchase-terms/">Purchase Terms</a>, a cancellation takes effect 30 days after we receive your notice, and any charge that falls within those 30 days still applies. We confirm by email within 1 business day with your effective date.',
  cta2: ['Go to the cancel form', '#cx-form'],
  asideHtml: `<div class="k-slider-wrap cx-box" aria-label="How cancelling works">
<div class="k-chip">How it works</div>
<ol class="cx-list">
<li><b>Send the form</b> (or the email below). Use the email address you paid with, so we can find your plan fast.</li>
<li><b>You get a copy right away.</b> Keep it: it is your record of when you sent the notice.</li>
<li><b>We confirm within 1 business day</b> by email, with your effective date: 30 days after we received your notice.</li>
<li><b>Charges dated within those 30 days still apply.</b> Nothing is charged after the effective date. All sales are final, so there are no refunds.</li>
</ol>
<p class="cx-fine">Prefer email? Email info@eyetoad.com with the subject <b>CANCEL</b> and your business name + the email you paid with. That is written notice too.</p>
</div>`,
  capsule: 'To cancel a recurring plan bought from Eye To Ad Media or one of its network sites, give 30 days&rsquo; written notice: send the form on this page, or email info@eyetoad.com with the subject CANCEL and your business name and the email you paid with. Your notice counts from the day we receive it, and the cancellation takes effect 30 days later. Charges that fall within those 30 days still apply, and all sales are final. There is no cancellation fee and no phone call needed. We confirm by email within 1 business day.',
  sections: [
    `<div class="k-chip">Cancellation notice</div>
<h2 class="k-h" id="cx-h2a">Tell us which plan <em>to stop.</em></h2>
<div class="cx-done" id="cx-done" hidden tabindex="-1" role="status">
<h3>Your cancellation notice was sent.</h3>
<p>A copy is on its way to your email. Keep it as your record. Your cancellation takes effect 30 days after the date we received your notice, and charges in that window still apply.</p>
<p>We confirm within 1 business day with your effective date. No email from us by the end of the next business day? Check spam, then write to info@eyetoad.com or call 1-800-481-8638.</p>
</div>
<form class="np-form cx-form" id="cx-form" method="POST" novalidate aria-labelledby="cx-fh">
<h3 id="cx-fh" role="heading" aria-level="3">Cancellation notice</h3>
<input class="np-hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<input type="hidden" name="_subject" id="cx-subject" value="CANCEL REQUEST">
<input type="hidden" name="_next" value="https://eyetoad.com/cancel/?sent=1#cx-done">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_autoresponse" id="cx-auto" value="We received your cancellation notice. Your plan&rsquo;s cancellation takes effect 30 days after the date we received it; charges in that window still apply. Keep this email as your record.">
<input type="hidden" name="notice_sent_at" id="cx-at" value="">
<input type="hidden" name="page_url" id="cx-url" value="https://eyetoad.com/cancel/">
<label for="cx-name">Your name <span aria-hidden="true">*</span></label><input id="cx-name" name="name" type="text" autocomplete="name" required>
<label for="cx-email">Email you used at checkout <span aria-hidden="true">*</span></label><input id="cx-email" name="email" type="email" autocomplete="email" required>
<label for="cx-biz">Business name <span aria-hidden="true">*</span></label><input id="cx-biz" name="business" type="text" autocomplete="organization" required>
<label for="cx-plan">Which plan? <span aria-hidden="true">*</span></label><select id="cx-plan" name="plan" required><option value="">Choose a plan</option>${PLANS.map((p) => `<option>${p}</option>`).join('')}</select>
<label for="cx-order">Order or receipt number (optional)</label><input id="cx-order" name="order_number" type="text" autocomplete="off">
<label for="cx-why">Reason (optional, it helps us improve)</label><textarea id="cx-why" name="reason"></textarea>
<button class="k-btn k-btn-a cx-btn" type="submit">Send cancellation notice</button>
<p class="cx-err" id="cx-err" role="alert" hidden></p>
<p class="cx-fine">Sending this form is your written notice under our <a href="/purchase-terms/">Purchase Terms</a>. We email you a copy right away; keep it. You may see a quick &ldquo;I am not a robot&rdquo; check after you press send. It keeps bots from cancelling other people&rsquo;s plans. We use these details only to find and cancel your plan; see our <a href="/privacy-policy/">privacy policy</a>.</p>
<noscript><p class="cx-fine"><b>This form needs JavaScript.</b> Email info@eyetoad.com with the subject CANCEL and your business name + the email you paid with. That is written notice too.</p></noscript>
</form>`,
  ],
  faqH2: 'About cancelling.',
  faq: [
    { q: 'How much notice do I need to give?', a: 'Thirty days, in writing. Send the form on this page or email info@eyetoad.com. Your cancellation takes effect 30 days after the date we receive your notice. Any charge that falls on or before that date still applies, and nothing is charged after it.' },
    { q: 'Can I cancel by email instead?', a: 'Yes. Email info@eyetoad.com with the subject CANCEL and your business name + the email you paid with. That is written notice too, and the date we receive your email is the day your 30 days start. We confirm by email within 1 business day; keep that confirmation.' },
    { q: 'Is there a cancellation fee?', a: 'No. There is no fee to cancel, and you do not need to call anyone. You keep the plan&rsquo;s features until your effective date.' },
    { q: 'Do I get a refund?', a: 'No. All sales are final. Cancelling does not refund past charges or charges that fall within the 30-day notice period; it stops every charge after your effective date. The full rules are in our <a href="/purchase-terms/">Purchase Terms</a>.' },
    { q: 'What if I bought more than one plan?', a: 'Send one notice per plan, or choose the main plan and list the others in the reason box. We confirm each one in the same email.' },
    { q: 'I bought through a different site in your network. Is this the right place?', a: 'Yes. This page handles cancellations for Eye To Ad Media and every site in our network, including the business directories, the press release sites, the restaurant and travel guides, and AI Speed to Leads.' },
  ],
  related: [['Purchase terms', '/purchase-terms/'], ['Privacy policy', '/privacy-policy/'], ['Terms', '/terms.html'], ['Contact', '/contact/']],
  band: ['Rather talk to a person?', 'Call and tell us what is not working, with no pressure. To cancel, we still need your notice in writing: the form above or an email to info@eyetoad.com.', ['Send a message', '/contact/']],
  script: String.raw`(function(){var f=document.getElementById('cx-form'),d=document.getElementById('cx-done'),e=document.getElementById('cx-err');if(!f)return;if(/[?&]sent=1/.test(location.search)&&d){d.hidden=false;f.hidden=true;try{d.focus()}catch(x){}}var t0=Date.now();f.addEventListener('submit',function(ev){var hp=f.querySelector('[name=_honey]');function no(m){ev.preventDefault();if(m){e.textContent=m;e.hidden=false}}if(hp&&hp.value){return no('')}if(Date.now()-t0<3000){return no('One moment, then press send again.')}var n=f.querySelector('#cx-name'),m=f.querySelector('#cx-email'),b=f.querySelector('#cx-biz'),p=f.querySelector('#cx-plan');var bad=[n,m,b,p].filter(function(x){return !x.value.trim()});if(bad.length||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value.trim())){bad=bad.length?bad:[m];bad[0].focus();return no('Please fill in your name, the email you paid with, your business and the plan.')}var now=new Date(),iso=now.toISOString(),shown=iso;try{shown=now.toLocaleString('en-US',{timeZone:'America/Denver',dateStyle:'long',timeStyle:'short'})+' Mountain Time'}catch(x){}document.getElementById('cx-at').value=iso;document.getElementById('cx-url').value=location.origin+location.pathname;document.getElementById('cx-auto').value='We received your cancellation notice for '+p.value+' on '+shown+'. Your plan’s cancellation takes effect 30 days after this date; charges in that window still apply. Keep this email as your record. Search Converts LLC (dba Eye To Ad Media), info@eyetoad.com, 1-800-481-8638.';document.getElementById('cx-subject').value='CANCEL REQUEST | '+p.value+' | '+m.value.trim();f.action='https://formsubmit.co/info'+String.fromCharCode(64)+'eyetoad.com';e.hidden=true;if(typeof window.gtag==='function'){try{window.gtag('event','cancel_request',{plan:p.value})}catch(x){}}})})();`,
  style: `:root{--k-hbg:#0B1220}.cx-hero{background:radial-gradient(800px 460px at 82% 12%,rgba(37,99,235,.24),transparent 60%),#0B1220}
.cx-box{color:#101828}.cx-list{margin:0;padding:0 0 0 20px;font-size:.95rem;line-height:1.6;color:#344054}.cx-list li{margin:0 0 10px}.cx-list b{color:#101828}
.cx-fine{margin:12px 0 0;font-size:.86rem;line-height:1.5;color:#475467}.cx-fine a{color:#1D4ED8}
.cx-form{margin-top:22px}.cx-form select{appearance:auto}.cx-btn{width:100%;margin-top:18px;min-height:52px;background:#C15205}.cx-btn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.cx-err{margin:10px 0 0;color:#B42318;font-weight:700;font-size:.92rem}
.cx-done{max-width:560px;margin-top:22px;background:#ECFDF3;border:1.5px solid #ABEFC6;border-radius:16px;padding:22px 24px;color:#054F31}.cx-done h3{margin:0 0 8px;font-size:1.2rem;color:#054F31}.cx-done p{margin:0 0 8px;line-height:1.6}
.np-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}`,
};
