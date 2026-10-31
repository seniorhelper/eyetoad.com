// /client-loyalty-bonuses/  Loyalty bonus advertising for existing clients and qualifying referrers.
// Copy follows research_notes/loyalty/COMPLIANCE.md: discretionary, never promised, never a sign-up offer,
// never tied to reviews; dollar figures only at our own regular price; Apple/Google as text only, no logos.
const TERMS_VERSION = 'LBT-2026-10-30';
const P = (name, url, what) => `<div class="lb-prop"><h3 class="k-h3"><a href="${url}" target="_blank" rel="noopener">${name}</a></h3><p>${what}</p></div>`;
export default {
  path: '/client-loyalty-bonuses/',
  prefix: 'lb',
  date: '2026-10-30',
  title: 'Client Loyalty Bonuses | Bonus Advertising for Loyal Clients',
  description: 'Eye To Ad Media thanks loyal clients and people who refer good clients with bonus advertising on sites, press wires and directories we own. At our discretion, never a sign-up offer.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'Client loyalty bonuses &middot; At our discretion &middot; Never a sign-up offer',
  h1: 'We can give away thousands in marketing <em>without breaking a sweat.</em>',
  kick: 'Here&rsquo;s why, who it&rsquo;s for, and why you shouldn&rsquo;t sign up for it.',
  sub: 'We own a lot of the places businesses want to be seen: press release wires, a news site, business directories, a 3D shopping mall, AI tools and hundreds of domains. Sharing some of that space with a loyal client costs us very little, so when it makes sense, we do it. It&rsquo;s a thank-you, not a sales pitch.',
  cta2: ['Ask about your account', '#lb-form'],
  asideHtml: `<div class="k-slider-wrap lb-facts" aria-label="Loyalty bonuses at a glance">
<div class="k-chip">The short version</div>
<dl>
<div><dt>Who</dt><dd>Existing clients, and people who refer a good client worth over $500 a month</dd></div>
<div><dt>Promised?</dt><dd>Never. Bonuses are given at our discretion, case by case</dd></div>
<div><dt>Sign-up offer?</dt><dd>No. Please don&rsquo;t sign up expecting free marketing</dd></div>
<div><dt>For reviews?</dt><dd>Never. Bonuses are not tied to reviews or ratings</dd></div>
<div><dt>Why we can</dt><dd>We own the sites, wires and directories, so sharing costs us mainly time</dd></div>
</dl>
<p class="lb-note">Loyalty bonuses are discretionary thank-yous for existing clients and qualifying referrers. They are not a sign-up offer and are never promised. <a href="/client-loyalty-bonuses/terms/">Terms</a>.</p>
</div>`,
  capsule: 'Eye To Ad Media gives loyal clients bonus advertising at its discretion: things like a press release on its own wires, a featured directory listing, a storefront in World VR Mall, or a custom AI tool, at no charge. It is a thank-you for existing clients and for people who refer a client worth over $500 a month. It is never promised, never a sign-up incentive and never tied to reviews.',
  sections: [
    `<div class="k-chip">Why it costs us so little</div>
<h2 class="k-h" id="lb-h2a">We own the billboards. <em>Loyal clients sometimes get a spot.</em></h2>
<p class="k-lead">We don&rsquo;t have to rent these placements. We built them. Since 2012 we have been building websites, keyword domains and marketing properties, and we test every tactic on our own companies before we use it for clients. Here is some of what we own and run.</p>
<div class="lb-grid">
${P('PressRelease<wbr>ForBusiness<wbr>.com', 'https://pressreleaseforbusiness.com/', 'Our press release publishing wire. A loyal client&rsquo;s news can go out here with a link back to their site.')}
${P('Distribute<wbr>PressReleases<wbr>.com', 'https://distributepressreleases.com/', 'Our press release distribution site, for getting announcements in front of more readers.')}
${P('ActionGlobal<wbr>News.com', 'https://actionglobalnews.com/', 'Our business and technology news site. Client features there are clearly labeled as sponsored.')}
${P('USABusiness<wbr>Search.com', 'https://usabusinesssearch.com/', 'Our national business directory, where a listing can be verified and featured in its category.')}
${P('COBusiness<wbr>List.com', 'https://cobusinesslist.com/', 'Our Colorado business directory, for Colorado clients who want to be found close to home.')}
${P('World VR Mall', 'https://worldvrmall.com/', 'Our walk-in 3D shopping mall, where client storefronts link straight to their own websites.')}
${P('My AI Agent Army', 'https://www.myaiagentarmy.com/', 'Our AI agent workshop, where we build agents that take repetitive work off a business owner&rsquo;s plate.')}
<div class="lb-prop"><h3 class="k-h3">618 domains and a network of sites</h3><p>A portfolio of 618 keyword domains plus authority sites across SEO, web design, home services, restaurants and more. Where a mention truly fits the readers, a client can be featured.</p></div>
</div>
<p class="k-p lb-mt">The work to keep these properties running is already paid for by our own businesses. Adding a loyal client to one of them takes mostly our time, which is why we can be generous without it hurting us.</p>
<div class="lb-dom"><p class="lb-dom-h">Market domination, our way.</p><p>Your own marketing, plus a network working for you: when it fits, we can feature loyal clients across our directories, news, press and VR properties, so your name turns up in more of the places people look. <b>Does your marketing company do that?</b></p><p class="lb-fine">For loyal clients, at our discretion. Not a sign-up offer, and not a promise of any ranking or placement. Want this as a paid plan instead? See <a href="/total-market-domination/">Total Market Domination</a>.</p></div>`,

    `<section class="k-sec k-sec-off" aria-labelledby="lb-h2b"><div class="wrap">
<div class="k-chip">What a bonus can look like</div>
<h2 class="k-h" id="lb-h2b">Examples, <em>not a menu.</em></h2>
<p class="k-lead">These are the kinds of things we have given or may give. Every bonus is picked for the client and the moment, so there is no list to choose from and nothing on it is guaranteed.</p>
<div class="lb-grid lb-ex">
<div class="k-card"><h3 class="k-h3">A press release</h3><p>Written with you and published on our wires, with a link to your website.</p></div>
<div class="k-card"><h3 class="k-h3">A featured listing</h3><p>Verified and featured placement on USABusinessSearch.com or, for Colorado businesses, COBusinessList.com.</p></div>
<div class="k-card"><h3 class="k-h3">A sponsored feature</h3><p>A story about your business on ActionGlobalNews.com, labeled as sponsored.</p></div>
<div class="k-card"><h3 class="k-h3">A VR storefront</h3><p>A store in World VR Mall with signs that show your real domain and link to your site.</p></div>
<div class="k-card"><h3 class="k-h3">An AI tool</h3><p>A chatbot, calculator or AI agent built for your business and trained on what you sell.</p></div>
<div class="k-card"><h3 class="k-h3">Extra work on your site</h3><p>Additional pages, content or fixes beyond what your plan covers.</p></div>
</div>
<p class="k-p lb-mt">Placements on our sites go where they genuinely help readers, and links are marked the way Google&rsquo;s guidelines ask. A bonus placement is exposure, not a promise of rankings, traffic, leads or sales.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="lb-h2c"><div class="wrap">
<div class="k-two">
<div>
<div class="k-chip">Who qualifies</div>
<h2 class="k-h" id="lb-h2c">Two ways onto <em>the thank-you list.</em></h2>
<ol class="lb-who">
<li><b>You are an existing client in good standing.</b> Clients who stay with us, work with us and grow with us are the people we go above and beyond for.</li>
<li><b>You refer a good client worth over $500 a month.</b> Referrals are the best compliment a business can get. If you send us a client at that level, we may thank you with bonus advertising, whether or not you are a client yourself.</li>
</ol>
<p class="k-p">Even then, bonuses are at our discretion. They are not owed, they are not earned by a points system, and we may change or stop them at any time.</p>
<div class="lb-warn" role="note"><p class="lb-warn-h">Don&rsquo;t sign up expecting free marketing.</p><p>Sign up expecting excellent work. That is what you pay for and what we promise. The bonuses are our way of saying thanks to the people who stick with us, and nobody should choose us because of them.</p></div>
</div>
<aside class="lb-story" aria-labelledby="lb-story-h">
<div class="k-chip">A real example</div>
<h3 class="k-h3" id="lb-story-h">A referral, and a $10,000 thank-you</h3>
<p>One of our clients referred <a href="https://bestroofersatlanta.com/" target="_blank" rel="noopener">Roof Solutions</a>, an Atlanta-area roofing company, to us. To say thanks, we built that client a sales-trained knowledge-base chatbot at no charge. We price a build like that at about $10,000.</p>
<p class="lb-fine">Value is based on our regular price for that build. This is one example; it is not what every referral receives.</p>
</aside>
</div>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="lb-h2d"><div class="wrap">
<div class="k-chip">What you are really hiring</div>
<h2 class="k-h" id="lb-h2d">The bonus is nice. <em>The work is the point.</em></h2>
<p class="k-lead">Here is what clients come to us for, and what keeps them long enough to see the bonuses.</p>
<div class="lb-grid">
<div class="k-card"><h3 class="k-h3">Full-stack custom development</h3><p>Hand-coded websites, web apps, dashboards and integrations, from <a href="/custom-website-design/">custom sites</a> on our subscribe-to-own plans to large custom builds.</p></div>
<div class="k-card"><h3 class="k-h3">AI agents that give you time back</h3><p><a href="/ai-agents-for-business/">AI agents</a> and <a href="/ai-chatbot-for-business/">sales-trained chatbots</a> that answer leads, handle follow-up and take repetitive tasks off your plate.</p></div>
<div class="k-card"><h3 class="k-h3">Websites built to win customers</h3><p>Fast, clear sites built around how your buyers decide, with <a href="/denver-seo-company/">SEO</a> and <a href="/aio-seo-system/">AI search optimization</a> built in.</p></div>
<div class="k-card"><h3 class="k-h3">Apps for phones</h3><p>We&rsquo;re an approved developer with the Apple Developer Program and Google Play, so we can build apps and publish them on the App Store and Google Play.</p></div>
</div>
<p class="k-p lb-mt">Founder-led since 2012, headquartered in Denver and growing businesses anywhere. Rated 5.0 from 60 Google reviews and A+ with the BBB. See <a href="/what-you-get/">what working with us looks like</a> or <a href="/our-work/">our work</a>.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="lb-h2e" id="lb-form"><div class="wrap">
<div class="k-two">
<div>
<div class="k-chip">Talk to us</div>
<h2 class="k-h" id="lb-h2e">Request a loyalty bonus, <em>or refer a business.</em></h2>
<p class="k-lead">Existing client with a question about a bonus, or want to send us a business that could use help? Call <a href="tel:18004818638">1-800-481-8638</a> or send the form. A real person reads every message.</p>
<p class="k-p">Sending this form does not sign you up for anything and does not guarantee a bonus. Every bonus is at our discretion under the <a href="/client-loyalty-bonuses/terms/">Loyalty Bonus Terms</a>.</p>
</div>
<form class="lb-form" id="lb-f" novalidate aria-labelledby="lb-fh" data-a="aW5mbw==" data-b="ZXlldG9hZC5jb20=">
<h3 id="lb-fh" class="k-h3">Loyalty bonus request</h3>
<div class="lb-hp" aria-hidden="true"><label for="lb-hp">Leave this empty</label><input id="lb-hp" type="text" name="_honey" tabindex="-1" autocomplete="off"></div>
<label for="lb-name">Your name <span aria-hidden="true">*</span></label><input id="lb-name" name="name" type="text" autocomplete="name" required>
<label for="lb-email">Email <span aria-hidden="true">*</span></label><input id="lb-email" name="email" type="email" autocomplete="email" required>
<label for="lb-phone">Phone (optional)</label><input id="lb-phone" name="phone" type="tel" autocomplete="tel">
<label for="lb-biz">Business name</label><input id="lb-biz" name="business" type="text" autocomplete="organization">
<label for="lb-type">I&rsquo;m writing about <span aria-hidden="true">*</span></label><select id="lb-type" name="topic" required><option value="">Choose one</option><option>Requesting a loyalty bonus (existing client)</option><option>Referring a business to Eye To Ad Media</option><option>A question about loyalty bonuses</option></select>
<label for="lb-msg">Message (for a referral, include their business name and how to reach them)</label><textarea id="lb-msg" name="message" rows="4"></textarea>
<input type="hidden" name="terms_version" value="${TERMS_VERSION}"><input type="hidden" name="terms_agreed_at" id="lb-at" value="">
<div class="lb-agree"><input id="lb-ok" name="terms_agreed" type="checkbox" value="yes"><label for="lb-ok">I have read and agree to the <a href="/client-loyalty-bonuses/terms/" target="_blank" rel="noopener">Loyalty Bonus Terms</a>.</label></div>
<button class="k-btn k-btn-a lb-btn" type="submit" disabled aria-describedby="lb-need">Send request</button>
<p class="lb-fine" id="lb-need">Tick the box above to send.</p>
<p class="lb-status" id="lb-status" role="status" aria-live="polite" hidden></p>
<p class="lb-fine">We use these details only to reply to you; see our <a href="/privacy-policy/">privacy policy</a>.</p>
<noscript><p class="lb-fine"><b>This form needs JavaScript.</b> Call 1-800-481-8638 instead.</p></noscript>
</form>
</div>
</div></section>`,

    `<section class="lb-terms" aria-labelledby="lb-terms-h"><div class="wrap">
<h2 id="lb-terms-h">About loyalty bonuses</h2>
<p>Bonus advertising, placements, tools or services are given at Eye To Ad Media&rsquo;s sole discretion to existing clients in good standing and to people who refer a client whose services are valued at over $500 per month. Bonuses are not offered in exchange for signing up, purchasing, or leaving a review, and no bonus, value, placement, ranking or result is guaranteed. Examples on this page describe things we have given or may give; they are not a list of entitlements. Dollar figures, where shown, are based on our own regular pricing for the same work. We may change or stop bonuses at any time. Full details are in the <a href="/client-loyalty-bonuses/terms/">Loyalty Bonus Terms</a>.</p>
<p>App Store is a service mark of Apple Inc. Google Play is a trademark of Google LLC. Eye To Ad Media is not affiliated with or endorsed by Apple or Google.</p>
</div></section>`,
  ],
  faqH2: 'Loyalty bonus questions, <em>answered straight.</em>',
  faq: [
    { q: 'Do you really give away free advertising?', a: 'Yes, at our discretion. Loyal clients and people who refer a good client may receive bonus advertising on sites, press wires and directories we own, at no charge. It is a thank-you, so it is never promised and there is no set amount.' },
    { q: 'If I sign up, will I get free marketing?', a: 'No. Please don&rsquo;t sign up expecting free marketing. Sign up expecting excellent work, because that is what you pay for. Bonuses go to clients who have been with us and to people who send us good referrals, and even then they are at our discretion.' },
    { q: 'Who can receive a loyalty bonus?', a: 'Existing clients in good standing, and anyone who refers a client whose services are valued at over $500 a month. Meeting either one makes you eligible to be considered; it does not entitle you to a bonus.' },
    { q: 'What can a bonus include?', a: 'Examples include a press release on our wires, a verified and featured directory listing, a sponsored feature on ActionGlobalNews.com, a storefront in World VR Mall, an AI chatbot or tool, or extra work on your website. Each bonus is chosen for the client, so there is no menu.' },
    { q: 'How much is a bonus worth?', a: 'It varies from small to thousands of dollars. When we put a dollar value on a bonus, it is based on our own regular price for the same work. No value is guaranteed.' },
    { q: 'Do I have to leave a review to get a bonus?', a: 'No. Bonuses are never tied to reviews, ratings or testimonials, and we never ask for a review in exchange for anything.' },
    { q: 'How can you afford to give marketing away?', a: 'We own the properties: press release wires, a news site, two business directories, World VR Mall, AI agent tools and a portfolio of 618 domains. Our own businesses already pay to keep them running, so sharing space with a loyal client costs us mainly time.' },
    { q: 'Are there written terms for loyalty bonuses?', a: 'Yes. Eligibility, how values are calculated, no cash value, no guaranteed results and Colorado law are all set out in our <a href="/client-loyalty-bonuses/terms/">Loyalty Bonus Terms</a>. The request form on this page asks you to agree to them.' },
    { q: 'Can you build apps for the App Store and Google Play?', a: 'Yes. We&rsquo;re an approved developer with the Apple Developer Program and Google Play, so we can build apps and publish them on the App Store and Google Play. Eye To Ad Media is not affiliated with or endorsed by Apple or Google.' },
  ],
  related: [['What you get', '/what-you-get/'], ['Our work', '/our-work/'], ['Business Growth Accelerator', '/business-growth-accelerator/'], ['AI agents for business', '/ai-agents-for-business/'], ['Custom website design', '/custom-website-design/'], ['Contact', '/contact/']],
  band: ['Loyalty starts with great work.', 'Tell us what your business needs. If we are a fit, we will earn the long relationship first. The thank-yous come later.', ['Send a message', '#lb-form']],
  script: String.raw`(function(){var f=document.getElementById('lb-f'),st=document.getElementById('lb-status');if(!f||!st)return;var t0=Date.now(),human=false;['keydown','pointerdown','touchstart'].forEach(function(n){f.addEventListener(n,function(){human=true},{passive:true})});var ok=document.getElementById('lb-ok'),btn=f.querySelector('.lb-btn'),need=document.getElementById('lb-need');function sync(){btn.disabled=!ok.checked;if(need)need.hidden=ok.checked}ok.addEventListener('change',sync);sync();function say(m,k){st.textContent=m;st.className='lb-status lb-'+k;st.hidden=false}f.addEventListener('submit',function(ev){ev.preventDefault();var hp=f.querySelector('[name=_honey]');if(hp&&hp.value)return;if(!human)return;if(Date.now()-t0<3500){say('One moment, then press send again.','warn');return}var n=f.querySelector('#lb-name'),m=f.querySelector('#lb-email'),t=f.querySelector('#lb-type');var bad=[n,m,t].filter(function(x){return !x.value.trim()});if(bad.length||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value.trim())){(bad[0]||m).focus();say('Please add your name, a valid email and what you are writing about.','warn');return}if(!ok.checked){ok.focus();say('Please tick the box to agree to the Loyalty Bonus Terms.','warn');return}document.getElementById('lb-at').value=new Date().toISOString();var to=atob(f.getAttribute('data-a'))+String.fromCharCode(64)+atob(f.getAttribute('data-b'));var d={};Array.prototype.forEach.call(f.elements,function(el){if(el.name&&el.name!=='_honey')d[el.name]=el.value});d.terms_agreed=ok.checked?'yes':'no';d._subject='Loyalty bonus: '+t.value+' | '+(d.business||d.name);d._template='table';d._captcha='false';d.page_url=location.origin+location.pathname;var b=btn;b.disabled=true;say('Sending...','info');fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)}).then(function(r){return r.json().catch(function(){return {}})}).then(function(j){if(j&&String(j.success)==='true'){say('Thanks, your request was delivered. We reply within one business day.','ok');f.reset();sync();if(typeof window.gtag==='function'){try{window.gtag('event','generate_lead',{form:'loyalty'})}catch(x){}}}else{sync();say('We could not confirm delivery. Please call 1-800-481-8638 so nothing gets lost.','warn')}}).catch(function(){sync();say('Your message did not send. Please call 1-800-481-8638.','err')})})})();`,
  style: `:root{--k-hbg:#FFF7ED}
.k-hero.lb-hero{background:radial-gradient(760px 420px at 85% 10%,rgba(250,204,21,.28),transparent 62%),radial-gradient(640px 420px at 5% 100%,rgba(249,115,22,.16),transparent 60%),linear-gradient(180deg,#FFFBF5,#FFF7ED);color:#101828}
.k-hero.lb-hero h1{color:#101828;max-width:15ch}.k-hero.lb-hero h1 em{color:#C2410C}
.k-hero.lb-hero .k-eyebrow{color:#9A3412}.k-hero.lb-hero .k-eyebrow:before{background:#C2410C}
.k-hero.lb-hero .k-kick{color:#7C2D12}.k-hero.lb-hero .k-sub{color:#344054}
.k-hero.lb-hero .k-proof{color:#475467}.k-hero.lb-hero .k-proof b{color:#101828}
.k-hero.lb-hero .k-btn-a,.lb-btn{background:#C2410C}.k-hero.lb-hero .k-btn-a:hover,.lb-btn:hover{background:#9A3412}
.k-hero.lb-hero .k-btn-b{color:#101828}
.lb-facts dl{margin:0;display:grid;gap:4px}.lb-facts dl div{display:grid;grid-template-columns:112px 1fr;gap:10px;padding:9px 0;border-bottom:1px solid #EAECF0;font-size:.92rem}
.lb-facts dt{font-weight:800;color:#101828}.lb-facts dd{margin:0;color:#475467;line-height:1.5}
.lb-note{margin:14px 0 0;font-size:.84rem;line-height:1.5;color:#475467}
.lb-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:26px}
.lb-ex{grid-template-columns:repeat(3,minmax(0,1fr))}
.lb-prop{background:#fff;border:1.5px solid #E4E7EC;border-top:4px solid #F97316;border-radius:16px;padding:22px}
.lb-prop:nth-child(4n+2){border-top-color:#2563EB}.lb-prop:nth-child(4n+3){border-top-color:#16A34A}.lb-prop:nth-child(4n){border-top-color:#7C3AED}
.lb-prop h3{font-size:1.08rem;overflow-wrap:break-word}.lb-prop h3 a{color:#101828;text-decoration:none}.lb-prop h3 a:hover{color:#C2410C;text-decoration:underline}
.lb-prop p{margin:0;color:#475467;line-height:1.6;font-size:.95rem}
.lb-grid .k-card{padding:22px}.lb-grid .k-card a{color:#1D4ED8}
.lb-mt{margin-top:24px}
.lb-who{margin:8px 0 18px;padding-left:22px;color:#344054;line-height:1.65;font-size:1.04rem}.lb-who li{margin:0 0 12px}.lb-who b{color:#101828}
.lb-warn{background:#FEF3C7;border:2px solid #F59E0B;border-radius:16px;padding:20px 22px;margin-top:8px}
.lb-warn p{margin:0;color:#78350F;line-height:1.6}.lb-warn .lb-warn-h{font-family:Fraunces,Fraunces Fallback,Georgia,serif;font-weight:900;font-size:1.35rem;color:#7C2D12;margin:0 0 6px}
.lb-story{background:#fff;border:1.5px solid #E4E7EC;border-radius:18px;padding:26px;box-shadow:0 18px 44px rgba(16,24,40,.07)}
.lb-story p{color:#344054;line-height:1.65;margin:0 0 12px}.lb-story a{color:#1D4ED8}
.lb-fine{font-size:.84rem!important;line-height:1.5;color:#475467!important;margin:10px 0 0}.lb-fine a{color:#1D4ED8}
.lb-form{background:#fff;border:1.5px solid #E4E7EC;border-radius:18px;padding:26px;box-shadow:0 18px 44px rgba(16,24,40,.07);display:flex;flex-direction:column}
.lb-form h3{margin:0 0 6px}.lb-form label{font-weight:700;font-size:.9rem;color:#101828;margin:12px 0 5px}
.lb-form input,.lb-form select,.lb-form textarea{font:inherit;font-size:1rem;width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #D0D5DD;border-radius:10px;background:#fff;color:#101828}
.lb-form input:focus,.lb-form select:focus,.lb-form textarea:focus{outline:3px solid #93C5FD;outline-offset:1px;border-color:#2563EB}
.lb-btn{margin-top:18px;width:100%;color:#fff}.lb-btn:disabled{opacity:.6;cursor:wait}
.lb-agree{display:flex;gap:10px;align-items:flex-start;margin-top:16px;padding:12px 14px;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:10px}.lb-agree input{width:22px!important;height:22px;flex:none;margin:1px 0 0;accent-color:#C2410C}.lb-agree label{margin:0!important;font-weight:600!important;line-height:1.45}.lb-agree a{color:#1D4ED8}
.lb-btn:disabled{background:#98A2B3!important;box-shadow:none;cursor:not-allowed;transform:none}
.lb-dom{margin-top:28px;background:linear-gradient(120deg,#EFF6FF,#F5F3FF);border:1.5px solid #C7D2FE;border-radius:18px;padding:24px 26px;max-width:90ch}.lb-dom p{margin:0 0 8px;color:#344054;line-height:1.65;font-size:1.04rem}.lb-dom b{color:#3730A3}.lb-dom .lb-dom-h{font-family:Fraunces,Fraunces Fallback,Georgia,serif;font-weight:900;font-size:1.5rem;color:#1E1B4B;margin:0 0 6px}
.lb-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}
.lb-status{margin:12px 0 0;font-weight:700;font-size:.94rem;line-height:1.5}.lb-ok{color:#067647}.lb-warn.lb-status,.lb-status.lb-warn{background:none;border:0;padding:0;color:#B54708}.lb-err{color:#B42318}.lb-info{color:#475467}
.lb-terms{background:#F9FAFB;border-top:1px solid #E4E7EC;padding:40px 0}
.lb-terms h2{font-size:1.05rem;margin:0 0 10px;color:#101828}.lb-terms p{max-width:90ch;font-size:.88rem;line-height:1.65;color:#475467;margin:0 0 10px}
.k-sec a:not([class]){color:#1D4ED8}
@media(max-width:1100px){.lb-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lb-ex{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:640px){.lb-grid,.lb-ex{grid-template-columns:1fr}.lb-facts dl div{grid-template-columns:96px 1fr}.lb-story,.lb-form{padding:20px}}`,
};
