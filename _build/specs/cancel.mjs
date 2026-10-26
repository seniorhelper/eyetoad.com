// /cancel/  Online cancel-request page for every recurring plan sold through secure checkout (California auto-renewal law: cancel online).
// noindex (set after build), linked from the footer on every page. Plain FormSubmit POST with CAPTCHA ON, honeypot, 3-second guard.
// The form has no action in the HTML; the script sets it only after the guard passes (so bots that skip JS post nowhere).
const PLANS = ['Verified listing', 'Boost', 'List Booster', 'Growth Plan', 'Press release plan', 'Menu Pro', 'Featured listing', 'Review Booster', 'Local Launch Kit monthly', 'AI Speed to Leads', 'Other'];
export default {
  path: '/cancel/',
  prefix: 'cx',
  date: '2026-10-26',
  title: 'Cancel a Plan Online | Eye To Ad Media',
  description: 'Cancel any Eye To Ad Media, directory, press release or AI Speed to Leads plan online. No phone call needed. We confirm within 1 business day.',
  crumbs: [],
  eyebrow: 'Cancel online &middot; No phone call needed &middot; No cancellation fee',
  h1: 'Cancel a plan <em>online.</em>',
  kick: 'Fill in the form below. That is all you have to do.',
  sub: 'This page cancels any monthly or yearly plan bought from Eye To Ad Media or our network: directory listings, Boost and Featured placements, press release plans, Menu Pro, Review Booster, the Local Launch Kit monthly plan and AI Speed to Leads. We confirm by email within 1 business day, and the confirmation shows the date your plan stops renewing.',
  cta2: ['Go to the cancel form', '#cx-form'],
  asideHtml: `<div class="k-slider-wrap cx-box" aria-label="How cancelling works">
<div class="k-chip">How it works</div>
<ol class="cx-list">
<li><b>Send the form.</b> Use the email address you paid with, so we can find your plan fast.</li>
<li><b>We confirm within 1 business day</b> by email, with the date your plan stops renewing.</li>
<li><b>No more charges</b> after that date. You keep what you already paid for until the end of the current period.</li>
</ol>
<p class="cx-fine">Prefer email? Write to info@eyetoad.com with the subject &ldquo;Cancel&rdquo; and the same details. That works too.</p>
</div>`,
  capsule: 'To cancel a recurring plan bought from Eye To Ad Media or one of its network sites, send the form on this page with the email you used at checkout and the plan you want to cancel. There is no phone call, no cancellation fee and no retention pitch. We confirm by email within 1 business day, and your plan stops renewing on the date shown in that confirmation.',
  sections: [
    `<div class="k-chip">Cancel request</div>
<h2 class="k-h" id="cx-h2a">Tell us which plan <em>to stop.</em></h2>
<div class="cx-done" id="cx-done" hidden tabindex="-1" role="status">
<h3>Your cancel request was sent.</h3>
<p>We'll confirm within 1 business day. Your plan stops renewing on the date in the confirmation.</p>
<p>No email from us by the end of the next business day? Check spam, then write to info@eyetoad.com or call 1-800-481-8638.</p>
</div>
<form class="np-form cx-form" id="cx-form" method="POST" novalidate aria-labelledby="cx-fh">
<h3 id="cx-fh" role="heading" aria-level="3">Cancel request</h3>
<input class="np-hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<input type="hidden" name="_subject" id="cx-subject" value="CANCEL REQUEST">
<input type="hidden" name="_next" value="https://eyetoad.com/cancel/?sent=1#cx-done">
<input type="hidden" name="_template" value="table">
<label for="cx-name">Your name <span aria-hidden="true">*</span></label><input id="cx-name" name="name" type="text" autocomplete="name" required>
<label for="cx-email">Email you used at checkout <span aria-hidden="true">*</span></label><input id="cx-email" name="email" type="email" autocomplete="email" required>
<label for="cx-biz">Business name <span aria-hidden="true">*</span></label><input id="cx-biz" name="business" type="text" autocomplete="organization" required>
<label for="cx-plan">Which plan? <span aria-hidden="true">*</span></label><select id="cx-plan" name="plan" required><option value="">Choose a plan</option>${PLANS.map((p) => `<option>${p}</option>`).join('')}</select>
<label for="cx-order">Order or receipt number (optional)</label><input id="cx-order" name="order_number" type="text" autocomplete="off">
<label for="cx-why">Reason (optional, it helps us improve)</label><textarea id="cx-why" name="reason"></textarea>
<button class="k-btn k-btn-a cx-btn" type="submit">Send cancel request</button>
<p class="cx-err" id="cx-err" role="alert" hidden></p>
<p class="cx-fine">You may see a quick &ldquo;I am not a robot&rdquo; check after you press send. It keeps bots from cancelling other people&rsquo;s plans. We use these details only to find and cancel your plan; see our <a href="/privacy-policy/">privacy policy</a>.</p>
<noscript><p class="cx-fine"><b>This form needs JavaScript.</b> Email info@eyetoad.com with the subject &ldquo;Cancel&rdquo;, your name, business, the email you paid with and the plan, or call 1-800-481-8638.</p></noscript>
</form>`,
  ],
  faqH2: 'About cancelling.',
  faq: [
    { q: 'Is there a cancellation fee?', a: 'No. There is no fee to cancel any monthly or yearly plan, and you do not need to call anyone. Send the form on this page and we confirm by email within 1 business day.' },
    { q: 'When does my plan stop?', a: 'Your plan stops renewing on the date shown in our confirmation email, which is the end of the period you already paid for. You keep the plan&rsquo;s features until then, and you are not charged again after it.' },
    { q: 'What if I bought more than one plan?', a: 'Send one request per plan, or choose the main plan and list the others in the reason box. We confirm each one in the same email.' },
    { q: 'I bought through a different site in your network. Is this the right place?', a: 'Yes. This page handles cancellations for Eye To Ad Media and every site in our network, including the business directories, the press release sites, the restaurant and travel guides, and AI Speed to Leads.' },
    { q: 'What about a refund?', a: 'Cancelling stops future charges. If your plan has a money-back guarantee, such as the 14-day guarantee on AI Speed to Leads, say so in the reason box and we handle the refund in the same reply.' },
  ],
  related: [['Privacy policy', '/privacy-policy/'], ['Terms', '/terms.html'], ['Contact', '/contact/']],
  band: ['Rather talk to a person?', 'Call and we cancel it on the phone, or tell us what is not working. Either way, no pressure.', ['Send a message', '/contact/']],
  script: "(function(){var f=document.getElementById('cx-form'),d=document.getElementById('cx-done'),e=document.getElementById('cx-err');if(!f)return;if(/[?&]sent=1/.test(location.search)&&d){d.hidden=false;f.hidden=true;try{d.focus()}catch(x){}}var t0=Date.now();f.addEventListener('submit',function(ev){var hp=f.querySelector('[name=_honey]');function no(m){ev.preventDefault();if(m){e.textContent=m;e.hidden=false}}if(hp&&hp.value){return no('')}if(Date.now()-t0<3000){return no('One moment, then press send again.')}var n=f.querySelector('#cx-name'),m=f.querySelector('#cx-email'),b=f.querySelector('#cx-biz'),p=f.querySelector('#cx-plan');var bad=[n,m,b,p].filter(function(x){return !x.value.trim()});if(bad.length||!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(m.value.trim())){bad=bad.length?bad:[m];bad[0].focus();return no('Please fill in your name, the email you paid with, your business and the plan.')}document.getElementById('cx-subject').value='CANCEL REQUEST | '+p.value+' | '+m.value.trim();f.action='https://formsubmit.co/info'+String.fromCharCode(64)+'eyetoad.com';e.hidden=true;if(typeof window.gtag==='function'){try{window.gtag('event','cancel_request',{plan:p.value})}catch(x){}}})})();",
  style: `:root{--k-hbg:#0B1220}.cx-hero{background:radial-gradient(800px 460px at 82% 12%,rgba(37,99,235,.24),transparent 60%),#0B1220}
.cx-box{color:#101828}.cx-list{margin:0;padding:0 0 0 20px;font-size:.95rem;line-height:1.6;color:#344054}.cx-list li{margin:0 0 10px}.cx-list b{color:#101828}
.cx-fine{margin:12px 0 0;font-size:.86rem;line-height:1.5;color:#475467}.cx-fine a{color:#1D4ED8}
.cx-form{margin-top:22px}.cx-form select{appearance:auto}.cx-btn{width:100%;margin-top:18px;min-height:52px;background:#C15205}.cx-btn:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.cx-err{margin:10px 0 0;color:#B42318;font-weight:700;font-size:.92rem}
.cx-done{max-width:560px;margin-top:22px;background:#ECFDF3;border:1.5px solid #ABEFC6;border-radius:16px;padding:22px 24px;color:#054F31}.cx-done h3{margin:0 0 8px;font-size:1.2rem;color:#054F31}.cx-done p{margin:0 0 8px;line-height:1.6}
.np-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}`,
};
