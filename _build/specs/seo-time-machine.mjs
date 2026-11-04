// /seo-time-machine/  SEO Time Machine: honest SEO timelines vs. monthly investment.
// Rules from Zach (Nov 4 2026): no published plan prices (only the $100 à la carte baseline and VIP 25% off SEO),
// realistic expectations, the "we got burned too" story, the game-plan advantage, light-and-truth tone, no Fraunces.
// The calculator is /time-machine.js (data-tm="full"); compact copies run on pricing, SEO systems, VIP and blog pages.
const C = (t, d) => `<div class="k-card tmx-card"><h3 class="k-h3">${t}</h3><p class="k-p">${d}</p></div>`;
export default {
  path: '/seo-time-machine/',
  prefix: 'tmx',
  date: '2026-11-04',
  title: 'SEO Time Machine | How Long SEO Takes at Your Budget',
  description: 'How long will SEO take for your business, and what changes if you invest more? Pick your goal and budget in the SEO Time Machine and see an honest arrival window.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'SEO Time Machine &middot; Honest timelines &middot; Founder-led since 2012',
  h1: 'SEO Time Machine: <em>How fast do you want to win?</em>',
  kick: 'Burned before? So were we. Pick your date and see the honest route.',
  sub: '',
  cta2: ['Start the machine', '#tmx-machine'],
  asideHtml: `<a class="tmx-flux" href="#tmx-machine" aria-label="Open the SEO Time Machine calculator">
<span class="tmx-flux-top"><i></i>Trip computer</span>
<span class="tmx-flux-row"><small>Departure</small><b>Today</b></span>
<span class="tmx-flux-row"><small>Destination</small><b class="tmx-dest">Page 1 on Google</b></span>
<span class="tmx-flux-row tmx-flux-arr"><small>Arrival</small><b class="tmx-roll" aria-hidden="true">? ? ?</b></span>
<span class="tmx-flux-go">Set your speed &rarr;</span>
</a>`,
  capsule: 'How long SEO takes depends on four things: where your website starts, where you want to go, how competitive your market is, and how much consistent work goes in each month. More consistent work gets you there sooner, but no budget makes it instant, because Google needs time to crawl, test and trust changes. A brand-new site in a tough market can take a year or more; an established site in a smaller market can move in a few months. The SEO Time Machine below shows an honest arrival window for your situation.',
  sections: [
    `<div class="k-chip">Why this page exists</div>
<h2 class="k-h" id="tmx-h2a">We got burned too. <em>That&rsquo;s why we tell you the truth about time.</em></h2>
<div class="k-two tmx-story">
<div>
<p class="k-lead">Before Eye To Ad Media was an agency, our founder, Zach Wennstedt, was the customer. He paid marketing companies that sent reports instead of results, and he made his own expensive marketing mistakes running his own companies.</p>
<p class="k-p">The most common way business owners get burned isn&rsquo;t a bad agency. It&rsquo;s a bad expectation: paying a small amount and expecting the phone to ring next month, or hearing someone promise page one in 30 days. When it doesn&rsquo;t happen, they quit right before it would have worked, and they&rsquo;re out the money and the time.</p>
<p class="k-p">So we do it differently. We test tactics on our own companies before we use them for clients. We tell you how long it will realistically take before you spend a dollar. And we let you choose the speed.</p>
</div>
<div class="tmx-truths" role="list" aria-label="Truths about SEO time">
<div role="listitem"><b>Anyone promising page 1 in 30 days</b><span>is selling a fantasy. Google decides when, not the agency.</span></div>
<div role="listitem"><b>$100 a month is a start</b><span>not a phone that rings off the hook by next month.</span></div>
<div role="listitem"><b>Quitting at month three</b><span>is how most SEO money gets wasted.</span></div>
<div role="listitem"><b>More steady work = sooner</b><span>That&rsquo;s the whole idea behind the Time Machine.</span></div>
</div>
</div>`,

    `<section class="k-sec tmx-mach" id="tmx-machine" aria-labelledby="tmx-h2b"><div class="wrap">
<div class="k-chip">The machine</div>
<h2 class="k-h" id="tmx-h2b">Set your trip. <em>Watch the arrival date move.</em></h2>
<p class="k-lead">Tell it where you&rsquo;re starting, where you want to go and how tough your market is. Then slide the monthly investment and watch the arrival window change. Compare the same trip at different speeds at the bottom.</p>
<div data-tm="full" data-goal="p1" data-start="some" data-comp="med" data-budget="1000"></div>
<noscript><p class="k-p">The SEO Time Machine needs JavaScript. Call 1-800-481-8638 and we&rsquo;ll walk your timeline with you.</p></noscript>
</div></section>`,

    `<section class="k-sec" aria-labelledby="tmx-h2c"><div class="wrap">
<div class="k-chip">The physics</div>
<h2 class="k-h" id="tmx-h2c">Every website follows the same laws. <em>More push gets you there sooner.</em></h2>
<p class="k-lead">A brand-new website and a ten-year-old one play by the same rules. The difference is the starting line. An established site is like a car that&rsquo;s already rolling: the same push takes it further. A new site starts from a stop.</p>
<div class="tmx-grid">
${C('Where you start', 'A site with history, reviews and links has trust banked. A new domain has to earn it from zero, so the same work moves it more slowly at first.')}
${C('How far you&rsquo;re going', 'Showing up in the Google Maps top three for your town is a shorter trip than page one for a big-city head term.')}
${C('Who else is on the road', 'Plumbers, roofers, lawyers and dentists compete with companies that have invested in SEO for years. Smaller and niche markets move faster.')}
${C('How hard you push', 'Steady weekly work beats a burst followed by silence. More work each month means more pages, more proof and more signals, so you arrive sooner.')}
</div>
<h3 class="k-h3 tmx-sub">What money can&rsquo;t buy</h3>
<ul class="tmx-list">
<li><b>Google&rsquo;s clock.</b> Changes have to be crawled, tested and trusted. That takes weeks to months no matter the budget.</li>
<li><b>A natural link pace.</b> Links that appear too fast look unnatural and can backfire. Good link work is steady by design.</li>
<li><b>Instant trust.</b> Reviews, mentions and history build over time. We can speed it up, not skip it.</li>
<li><b>Linear returns.</b> Doubling your budget doesn&rsquo;t cut the time in half. The Time Machine accounts for that.</li>
</ul>
</div></section>`,

    `<section class="k-sec tmx-tiers" aria-labelledby="tmx-h2d"><div class="wrap">
<div class="k-chip">Realistic expectations</div>
<h2 class="k-h" id="tmx-h2d">What does each speed <em>really</em> get you?</h2>
<p class="k-lead">No package names, no hidden asterisks. Here is the honest version of what different monthly investments tend to feel like.</p>
<div class="tmx-pace">
<div class="tmx-p p1"><span>Around $100&ndash;$300/mo</span><h3>Foundation pace</h3><p>Steady fixes on your most important page and Google Business Profile. Great for holding ground or a very small market. It will not make the phone ring in the next couple of months.</p></div>
<div class="tmx-p p2"><span>Around $500&ndash;$800/mo</span><h3>Steady build</h3><p>Core pages and your profile keep moving every week, with new content over time. Real progress at a patient speed.</p></div>
<div class="tmx-p p3"><span>Around $1,000&ndash;$2,000/mo</span><h3>Growth pace</h3><p>More pages, local content, citations and link work every month, with AI search optimization built in. Where most growing local businesses land.</p></div>
<div class="tmx-p p4"><span>Around $2,000&ndash;$3,500/mo</span><h3>Acceleration</h3><p>Several fronts at once: content, links, the map pack, AI answers and conversion fixes, all pulling the same direction.</p></div>
<div class="tmx-p p5"><span>$3,500+/mo</span><h3>Market takeover</h3><p>A full campaign across every channel your plan calls for, built to close the gap on established leaders. Custom-quoted after research.</p></div>
</div>
</div></section>`,

    `<section class="k-sec tmx-plan" aria-labelledby="tmx-h2e"><div class="wrap">
<div class="k-two">
<div>
<div class="k-chip">Our advantage</div>
<h2 class="k-h" id="tmx-h2e">Speed means nothing <em>without a map.</em></h2>
<p class="k-lead">Most businesses don&rsquo;t fail at SEO because they spent too little. They fail because they had no plan, so the money went everywhere and nowhere.</p>
<p class="k-p">Before we accelerate anything, we help you lock in four things. Maybe you already have them. If you don&rsquo;t, we build them with you, so you stand on solid footing instead of guessing.</p>
<div class="k-cta"><a href="tel:18004818638" class="k-btn k-btn-a">Call 1-800-481-8638 now</a><a href="/free-seo-audit/" class="k-btn k-btn-b">Start with a free audit</a></div>
</div>
<ol class="tmx-steps">
<li><b>Your identity</b><span>Who you are, who you serve, and why customers should pick you. Clear enough that Google and AI assistants can repeat it.</span></li>
<li><b>Real market research</b><span>Your actual competitors, what your customers search for, and where the gaps are. Data, not hunches.</span></li>
<li><b>Your protocol</b><span>How your business really works, so the marketing matches what you deliver and every lead fits.</span></li>
<li><b>A domination game plan</b><span>Which pages, places and searches to win first, in what order, at the speed you choose.</span></li>
</ol>
</div>
</div></section>`,

    `<section class="k-sec tmx-price" aria-labelledby="tmx-h2f"><div class="wrap">
<div class="k-chip">How we price it</div>
<h2 class="k-h" id="tmx-h2f">Straight talk on cost. <em>No games.</em></h2>
<div class="tmx-grid">
${C('Start small if you need to', 'À la carte SEO work starts at $100 per task. It&rsquo;s a real way to begin, and the Time Machine shows honestly what that pace can do.')}
${C('Monthly plans are custom', 'Every plan is built around your goal, market and timeline. The more steady work a plan includes, the lower the cost of each piece of work.')}
${C('VIP members save 25%', 'Members of our <a href="/vip-marketing/">VIP marketing subscription</a> save 25% on SEO, so the same budget buys more work and gets there sooner.')}
${C('Month to month', 'No long-term contract. We do ask you to give SEO six months to a year, because switching strategies midstream is how momentum dies.')}
</div>
<p class="k-p">We work every account on a steady weekly rhythm, because SEO compounds when it&rsquo;s consistent. For typical ranges, see our <a href="/denver-seo-pricing/">SEO pricing page</a>.</p>
</div></section>`,

    `<section class="k-sec tmx-close" aria-labelledby="tmx-h2g"><div class="wrap">
<div class="tmx-yn">
<h2 class="k-h" id="tmx-h2g">If we can map the fastest honest route <em>within your budget,</em> are you ready to talk?</h2>
<div class="tmx-yn-btns"><a class="tmx-yes" href="tel:18004818638">Yes, call now: 1-800-481-8638</a><a class="tmx-no" href="/free-seo-audit/">Not yet, send me a free audit</a></div>
<p class="k-p">You&rsquo;ll talk to people who have run businesses, managed sales teams and been burned by marketing too. No pressure, no fantasy timelines.</p>
</div>
</div></section>`
  ],
  faqH2: 'SEO timeline questions, answered honestly',
  faq: [
    { q: 'How long does SEO take to work?', a: 'Most businesses see early movement in impressions within one to three months and meaningful leads in roughly four to twelve months. Brand-new sites and competitive markets take longer; established sites in smaller markets can move faster. Use the SEO Time Machine on this page to see a range for your situation.' },
    { q: 'Can SEO get me on page 1 in 30 days?', a: 'Almost never, and anyone who promises it is guessing at best. Google needs time to crawl, test and trust changes. Quick wins do happen, such as fixing a broken page or a Google Business Profile, but sustainable rankings take months.' },
    { q: 'Why does a bigger SEO budget get results sooner?', a: 'More consistent work each month means more optimized pages, more content, more trust signals and more links, so you close the gap faster. Returns aren&rsquo;t linear, though: doubling a budget doesn&rsquo;t halve the time, and some waiting can&rsquo;t be bought.' },
    { q: 'Does a brand-new website take longer to rank?', a: 'Yes. A new domain has no history, links or reviews yet, so it starts from zero trust. The same work moves an established site further, faster. That&rsquo;s why the Time Machine asks where you&rsquo;re starting.' },
    { q: 'What will $100 a month of SEO get me?', a: 'A steady foundation: fixes to your most important page and profile, done consistently. It can hold ground or slowly grow in a small market. It won&rsquo;t make the phone ring heavily in the next couple of months, and we&rsquo;ll tell you that up front.' },
    { q: 'Is the SEO Time Machine a guarantee?', a: 'No. It&rsquo;s a planning model based on how SEO generally behaves. Your real timeline depends on your market, your site, your competitors and Google. We give you an honest estimate after researching your market, and no one can ethically guarantee rankings.' },
    { q: 'Do you publish your SEO plan prices?', a: 'We publish our starting point: à la carte SEO work from $100 per task, with 25% off SEO for VIP members. Monthly plans are custom-built around your goal and timeline, so we quote them after a conversation and a look at your market.' }
  ],
  related: [['SEO pricing', '/denver-seo-pricing/'], ['Your first 90 days of SEO', '/blog/seo-timeline-first-90-days-denver/'], ['How much SEO costs', '/blog/how-much-does-seo-cost-in-denver/'], ['SEO services', '/seo-systems/'], ['VIP marketing subscription', '/vip-marketing/'], ['Case studies', '/case-studies/'], ['Free SEO audit', '/free-seo-audit/']],
  band: ['Pick your arrival date.', 'Tell us where you want to be and when. We&rsquo;ll show you the honest route and what it takes.', ['Get a free SEO audit', '/free-seo-audit/']],
  style: `
.tmx-hero{position:relative;overflow:hidden;background:radial-gradient(120% 90% at 70% 40%,#3B1F8F 0,#1E1B6B 38%,#0B1437 75%)!important;isolation:isolate}
.tmx-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,20,55,.8) 0,rgba(11,20,55,.4) 45%,rgba(11,20,55,0) 70%);z-index:-1;pointer-events:none}
.tmx-warp{position:absolute;inset:0;width:100%;height:100%;z-index:-2;display:block}
.tmx-hero .k-hgrid{position:relative;z-index:1}
.tmx-hero{padding-top:36px!important;padding-bottom:44px!important}
.tmx-hero .k-eyebrow{margin-bottom:10px}
.tmx-hero h1{font-family:Unbounded,Outfit,Inter,system-ui,sans-serif;font-weight:800;letter-spacing:-.01em;line-height:1.08;font-size:clamp(32px,4.6vw,58px);color:#fff}
.tmx-hero h1 em{display:block;font-style:normal;background:linear-gradient(90deg,#FACC15,#FB923C 45%,#F472B6);-webkit-background-clip:text;background-clip:text;color:transparent;margin-top:.12em}
.tmx-hero .k-kick{font-size:clamp(18px,2vw,22px);color:#E0E7FF!important;font-style:normal}
.tmx-hero .k-sub:empty{display:none}
.tmx-hero .k-proof,.tmx-hero .k-proof span{color:#E0E7FF}
.tmx-flux{display:grid;gap:12px;align-self:center;max-width:380px;justify-self:end;width:100%;padding:20px 22px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);color:#fff;text-decoration:none;box-shadow:0 30px 70px -30px rgba(0,0,0,.6)}
.tmx-flux:hover{background:rgba(255,255,255,.13)}
.tmx-flux-top{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#FDE68A;font-weight:700}
.tmx-flux-top i{width:9px;height:9px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 4px rgba(74,222,128,.22)}
.tmx-flux-row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:1px dashed rgba(255,255,255,.2);padding-bottom:10px}
.tmx-flux-row small{color:#C7D2FE;font-size:13px}
.tmx-flux-row b{font-size:17px}
.tmx-flux-arr b{font-family:Unbounded,Outfit,Inter,system-ui,sans-serif;font-size:22px;color:#FACC15;font-variant-numeric:tabular-nums}
.tmx-flux-go{display:inline-flex;justify-content:center;padding:12px;border-radius:10px;background:#FACC15;color:#101828;font-weight:800}
.tmx-story{align-items:start}
.tmx-truths{display:grid;gap:10px}
.tmx-truths div{display:grid;gap:2px;padding:14px 16px;border-radius:12px;background:#fff;border:1px solid #E4E7EC;border-left:5px solid #F97316;box-shadow:0 10px 24px -18px rgba(16,24,40,.35)}
.tmx-truths div:nth-child(2){border-left-color:#2563EB}.tmx-truths div:nth-child(3){border-left-color:#7C3AED}.tmx-truths div:nth-child(4){border-left-color:#16A34A}
.tmx-truths b{font-size:16.5px;color:#101828}.tmx-truths span{color:#475467;font-size:15px}
.tmx-mach{background:linear-gradient(180deg,#F5F3FF 0,#fff 70%)}
.tmx-mach [data-tm]{margin-top:22px;min-height:420px}
.tmx-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:18px 0}
.tmx-card{border-top:4px solid #2563EB}.tmx-grid .tmx-card:nth-child(2){border-top-color:#7C3AED}.tmx-grid .tmx-card:nth-child(3){border-top-color:#F97316}.tmx-grid .tmx-card:nth-child(4){border-top-color:#16A34A}
.tmx-sub{margin-top:26px}
.tmx-list{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;padding:0;margin:12px 0 0;list-style:none}
.tmx-list li{padding-left:28px;position:relative;line-height:1.55;color:#344054}
.tmx-list li:before{content:"";position:absolute;left:0;top:6px;width:14px;height:14px;border-radius:4px;background:linear-gradient(135deg,#2563EB,#7C3AED)}
.tmx-pace{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:20px}
.tmx-p{position:relative;padding:18px 16px 16px;border-radius:14px;background:#fff;border:1px solid #E4E7EC;overflow:hidden}
.tmx-p:before{content:"";position:absolute;left:0;right:0;top:0;height:6px}
.tmx-p.p1:before{background:#93C5FD}.tmx-p.p2:before{background:#2563EB}.tmx-p.p3:before{background:#7C3AED}.tmx-p.p4:before{background:#F97316}.tmx-p.p5:before{background:linear-gradient(90deg,#F97316,#FACC15)}
.tmx-p span{font-size:12.5px;font-weight:700;color:#475467;letter-spacing:.02em}
.tmx-p h3{margin:6px 0 6px;font-size:18px;color:#101828}
.tmx-p p{margin:0;font-size:14.5px;line-height:1.55;color:#475467}
.tmx-plan{background:#FFFBEB}
.tmx-steps{list-style:none;counter-reset:s;padding:0;margin:0;display:grid;gap:12px}
.tmx-steps li{counter-increment:s;display:grid;grid-template-columns:44px 1fr;gap:4px 14px;padding:16px;border-radius:14px;background:#fff;border:1px solid #FDE68A}
.tmx-steps li:before{content:counter(s);grid-row:span 2;display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:#101828;color:#FACC15;font-family:Unbounded,Outfit,Inter,system-ui,sans-serif;font-weight:800;font-size:18px}
.tmx-steps b{font-size:17px;color:#101828}.tmx-steps span{color:#475467;line-height:1.55}
.tmx-yn{max-width:860px;margin:0 auto;text-align:center;padding:34px 26px;border-radius:20px;background:#fff;border:2px solid #101828;box-shadow:10px 10px 0 #FACC15}
.tmx-yn-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:20px 0 12px}
.tmx-yes,.tmx-no{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:14px 24px;border-radius:12px;font-weight:800;font-size:17px;text-decoration:none}
.tmx-yes{background:#EA580C;color:#fff}.tmx-yes:hover{background:#C2410C}
.tmx-no{border:2px solid #101828;color:#101828;background:#fff}.tmx-no:hover{background:#F2F4F7}
@media (max-width:1000px){.tmx-grid{grid-template-columns:1fr 1fr}.tmx-pace{grid-template-columns:1fr 1fr}.tmx-p.p5{grid-column:span 2}}
@media (max-width:860px){.tmx-flux{justify-self:stretch;max-width:none}.tmx-hero:after{background:linear-gradient(180deg,rgba(11,20,55,.7),rgba(11,20,55,.55))}}
@media (max-width:620px){.tmx-grid,.tmx-pace,.tmx-list{grid-template-columns:1fr}.tmx-p.p5{grid-column:auto}.tmx-hero h1{font-size:clamp(26px,7vw,34px)}.tmx-flux{display:none}}
`,
  script: `(function(){
var h=document.querySelector('.tmx-hero');if(!h)return;
var R=matchMedia('(prefers-reduced-motion:reduce)').matches;
var cv=document.createElement('canvas');cv.className='tmx-warp';cv.setAttribute('aria-hidden','true');h.insertBefore(cv,h.firstChild);
var x=cv.getContext('2d'),W,H,D=Math.min(2,window.devicePixelRatio||1),S=[],speed=1,target=1;
var COL=['#60A5FA','#A78BFA','#F472B6','#FB923C','#FACC15','#FFFFFF'];
var LAB=['MONTH 1','MONTH 3','MONTH 6','MONTH 9','YEAR 1','YEAR 2'];
function size(){W=h.offsetWidth;H=h.offsetHeight;cv.width=W*D;cv.height=H*D;x.setTransform(D,0,0,D,0,0)}
function star(){return{a:Math.random()*Math.PI*2,r:Math.random()*0.15,v:0.002+Math.random()*0.006,c:COL[(Math.random()*COL.length)|0],w:0.6+Math.random()*1.6}}
size();for(var i=0;i<(W<700?130:260);i++){var s=star();s.r=Math.random();S.push(s)}
var labs=LAB.map(function(t,i){return{t:t,r:i/LAB.length,a:-0.5+i*1.1}});
function cx(){return W>860?W*0.68:W*0.5}function cy(){return H*0.46}
function frame(){
speed+=(target-speed)*0.04;
x.clearRect(0,0,W,H);
var X=cx(),Y=cy(),M=Math.hypot(W,H)*0.62;
var g=x.createRadialGradient(X,Y,0,X,Y,M*0.5);g.addColorStop(0,'rgba(250,204,21,.28)');g.addColorStop(.25,'rgba(244,114,182,.12)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
for(var k=0;k<5;k++){var rr=((Date.now()/(3200/speed)+k/5)%1);x.beginPath();x.ellipse(X,Y,rr*rr*M,rr*rr*M*0.62,0,0,Math.PI*2);x.strokeStyle='rgba(165,180,252,'+(0.35*(1-rr))+')';x.lineWidth=1.2;x.stroke()}
for(var i=0;i<S.length;i++){var s=S[i],r0=s.r*s.r*M;s.r+=s.v*speed*(0.4+s.r);if(s.r>1.05){S[i]=star();continue}
var r1=s.r*s.r*M;r0=r1*(1-Math.min(.55,.12+.2*speed*s.r));var ca=Math.cos(s.a),sa=Math.sin(s.a)*0.62;x.strokeStyle=s.c;x.globalAlpha=Math.min(1,s.r*2.2);x.lineWidth=s.w*(0.7+1.6*s.r);x.lineCap='round';
x.beginPath();x.moveTo(X+ca*r0,Y+sa*r0);x.lineTo(X+ca*r1,Y+sa*r1);x.stroke()}
x.globalAlpha=1;x.font='700 11px Outfit,Inter,system-ui,sans-serif';x.textAlign='center';
labs.forEach(function(l){l.r+=0.0016*speed;if(l.r>1)l.r=0;var rr=l.r*l.r*M,al=Math.min(1,l.r*2.2)*(1-l.r)*0.9;x.fillStyle='rgba(224,231,255,'+al+')';x.fillText(l.t,X+Math.cos(l.a)*rr,Y+Math.sin(l.a)*rr*0.62)});
if(!R)requestAnimationFrame(frame)}
frame();
window.addEventListener('resize',function(){size();if(R)frame()});
window.addEventListener('tm:change',function(e){target=Math.max(0.4,Math.min(3,(e.detail&&e.detail.speed)||1));if(R)frame()});
var roll=document.querySelector('.tmx-roll');if(roll){var seq=['14 mo','11 mo','9 mo','7 mo','6 mo','? ? ?'],q=0;if(!R)setInterval(function(){roll.textContent=seq[q++%seq.length]},1400)}
})();`
};
