/* /free-ai-agent-plan/ planner + rules engine. Outputs outcomes only, never build instructions. */
(()=>{
'use strict';
var RM=false;try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var $=i=>document.getElementById(i),KEY='etaAgentPlan.v1',WK=4.33;
var wiz=$('apWiz');if(!wiz)return;var on=(e,t,f)=>e.addEventListener(t,f);
var TASKS={inbox:['Inbox triage and replies','Inbox',.6],leads:['Lead follow-up','Leads',.7],booking:['Booking and reminders','Booking',.7],quotes:['Quotes and estimates','Quotes',.5],books:['Spreadsheets and bookkeeping prep','Books',.6],crm:['CRM updates','CRM',.65],reviews:['Review requests and replies','Reviews',.7],social:['Social posts','Social',.55],reports:['Weekly reports','Reports',.7],inventory:['Inventory and reorders','Stock',.6],docs:['PDFs and paperwork','Paperwork',.65],phone:['Missed calls and texts','Calls',.65]};
var TIDS=Object.keys(TASKS);
var IND={hvac:['HVAC','home'],plumbing:['Plumbing','home'],electrical:['Electrical','home'],roofing:['Roofing','home'],landscaping:['Landscaping','home'],cleaning:['Cleaning services','home'],contractor:['Contracting and remodeling','home'],auto:['Auto repair','auto'],medspa:['Med spa','health'],dental:['Dental office','health'],chiro:['Chiropractic and PT','health'],law:['Law firm','legal'],accounting:['Accounting','fin'],insurance:['Insurance agency','fin'],realestate:['Real estate','re'],restaurant:['Restaurant','food'],ecom:['Retail and online store','retail'],consulting:['Consulting','pro'],fitness:['Fitness studio','fit'],other:['Small business','other']};
var URGENT={hvac:'no heat, no cooling',plumbing:'leaks, backups or no water',electrical:'sparking, burning smells or outages',roofing:'active leaks and storm damage'};
var TOOLS={gmail:'Gmail',outlook:'Outlook',sheets:'Google Sheets / Excel',qb:'QuickBooks',square:'Square',stripe:'Stripe',hubspot:'HubSpot',ghl:'GoHighLevel',sf:'Salesforce',calendly:'Calendly',gbp:'Google Business Profile',shopify:'Shopify',wp:'WordPress',slack:'Slack',sms:'your phone line / SMS',paper:'paper'};
var NOUN={home:'homeowner',auto:'customer',health:'client',legal:'client',fin:'client',re:'client',food:'guest',retail:'shopper',pro:'client',fit:'member',other:'customer'};
var AG={
inbox:['Inbox Agent','gmail outlook slack',2,'time to first reply and how many emails you personally touch',''],
leads:['Speed-to-Lead Agent','hubspot ghl sf sms gmail outlook wp',2,'minutes to first response and leads booked',''],
booking:['Booking & Reminder Agent','calendly gmail outlook sms square',1,'bookings per week and no-show rate',''],
quotes:['Quote Drafting Agent','sheets qb gmail outlook hubspot',2,'quote turnaround time and quotes won','Every quote before a customer sees it'],
books:['Books & Receipts Agent','qb sheets square stripe gmail outlook',2,'hours spent at month-end and overdue invoices','Anything it can’t categorize with confidence; it never pays a bill'],
crm:['CRM Hygiene Agent','hubspot ghl sf gmail outlook sheets',2,'stale deals and records missing a next step','Merging or deleting records'],
reviews:['Review & Reputation Agent','gbp sms gmail square',1,'new reviews per month and reply time','Replies to any review under four stars'],
social:['Social Drafting Agent','gbp wp shopify',1,'posts published per week and hours you spend on them','The weekly post queue before anything publishes'],
reports:['Reporting Agent','sheets qb square stripe shopify hubspot ghl sf gbp',1,'hours spent pulling numbers each week','Nothing; it only reads and reports'],
inventory:['Reorder & Inventory Agent','shopify square sheets qb',2,'stock-outs and cash sitting on the shelf','Every purchase order before it reaches a supplier'],
docs:['Intake & Paperwork Agent','gmail outlook sheets hubspot sf',2,'forms retyped by hand (goal: zero) and data-entry errors','Fields it flags as low-confidence'],
phone:['Missed-Call Text-Back Agent','sms calendly slack ghl',1,'missed calls recovered and callbacks booked','']};
var LIFE={
inbox:'By the time you sit down, last night’s email is sorted into needs-you, handled and junk. Routine questions have replies drafted in your voice, waiting for one tap.',
inbox_retail:'Every “where is my order?” email gets a status reply drafted from the order record, and returns are sorted by reason. You open the inbox to the few messages that need you.',
inbox_health:'Questions about appointments, prep and directions get drafted replies in minutes. Anything clinical goes to staff untouched, so the front desk can focus on the people in the room.',
leads:'A new inquiry lands at 9:40 p.m. Within a minute the {c} gets a friendly, specific reply, two qualifying questions and a way to book. By morning every lead is logged and the hottest are on top.',
leads_home:'A homeowner fills out your form at night. Within a minute they’re asked what’s wrong, the address and how urgent it is, and offered a slot. Your morning starts with qualified jobs.',
leads_re:'A portal lead arrives on Saturday and is answered in under a minute, sorted as buyer or seller with timeline and budget. Serious ones are offered a call or showing while still on the listing.',
booking:'{C}s pick an open slot without phone tag, get a confirmation and a reminder the day before, and likely no-shows get a second nudge. Cancellations go to the waitlist so gaps fill themselves.',
booking_urgent:'Emergency triage first: requests mentioning {u} skip the queue and ring the on-call tech. Routine visits are booked into open windows grouped by area, with a reminder the day before.',
booking_health:'Clients book, reschedule and get reminders without calling the front desk, and intake forms go out ahead of the visit. Reminders carry no treatment details unless a HIPAA-eligible, BAA-covered setup is in place.',
quotes:'Notes, photos or measurements from a {c} become a draft estimate built from your real line items. You adjust and send the same day, and quotes that go quiet get a polite follow-up.',
quotes_home:'Job-walk notes and photos become a draft estimate with good, better and best options from your own price book. You approve from your phone; quiet quotes get a follow-up on day three.',
books:'Receipts and invoices that hit your inbox are matched, categorized and dropped into the right rows. Overdue invoices get courteous reminders, and anything odd is flagged instead of guessed.',
crm:'Every call, email and form fill updates the right contact, stage and next step. Duplicates get flagged, stale deals get nudged, and your pipeline finally matches reality.',
crm_none:'First it gives you one simple place where every customer and lead lives. Then it keeps it current from your email and calls, nudging stale deals so nobody slips through.',
reviews:'After each finished job, happy {c}s get a well-timed review request. Every new review gets a reply drafted in your voice, and anything under four stars comes to you first.',
reviews_health:'After each visit, satisfied clients get a gentle review request. Reply drafts never confirm someone is a patient or mention treatment, and unhappy feedback comes privately to you.',
social:'This week’s finished work and photos become a short queue of posts in your voice. You approve the batch in one sitting; it publishes on schedule and never replies on your behalf.',
reports:'Every Monday at 6 a.m. one page lands in your inbox: leads, sales, calls and reviews, what changed since last week, and the one number that needs attention.',
inventory:'It compares stock with how fast things sell, warns you a week before you run out and drafts the purchase order for your OK. Slow movers get flagged so cash isn’t stuck on the shelf.',
inventory_food:'Ingredient counts are checked against what’s selling and the supplier order is drafted before the truck cutoff. You approve it in a minute instead of counting the walk-in at midnight.',
docs:'New-client forms, work orders and PDFs become clean records with names, dates, amounts and signatures checked. Missing pieces trigger a polite request. Nobody retypes anything.',
docs_health:'Intake and consent forms are read, checked for missing signatures and filed before the client arrives. This runs only on a HIPAA-eligible setup with a signed BAA.',
phone:'When nobody can pick up, the caller gets a text within seconds asking what they need, with a way to book. Answers are logged and urgent ones go straight to your phone.',
phone_urgent:'A missed call gets a text back in seconds. If the caller mentions {u}, the on-call tech is paged at once; everyone else gets a booking link, so the job doesn’t go to the next company on Google.',
phone_health:'Missed calls get a quick text back with a booking link and office hours. It never asks for health details by text, and urgent callers are told to phone the office or emergency services.'};
function boosts(s){var o={};s.split(',').forEach(p=>{var kv=p.split(':');o[kv[0]]=+kv[1];});return o;}
var FIT_IND={home:boosts('phone:.4,booking:.3,quotes:.3,leads:.2,reviews:.15'),auto:boosts('phone:.25,booking:.25,quotes:.2,reviews:.2'),health:boosts('booking:.35,docs:.3,phone:.2,reviews:.15'),legal:boosts('docs:.3,inbox:.3,leads:.2,crm:.1'),fin:boosts('docs:.3,inbox:.25,books:.2,crm:.15'),re:boosts('leads:.35,crm:.3,social:.15,inbox:.1'),food:boosts('inventory:.3,reviews:.3,social:.2,booking:.15'),retail:boosts('inventory:.4,inbox:.25,reviews:.2,social:.2,reports:.15'),pro:boosts('inbox:.3,books:.2,crm:.2,docs:.15,reports:.1'),fit:boosts('booking:.3,leads:.2,social:.2,reviews:.1'),other:{}};
var FIT_GOAL={leads:boosts('leads:.35,phone:.3,reviews:.2,social:.1'),time:boosts('inbox:.25,books:.2,reports:.2,docs:.2,crm:.1'),service:boosts('phone:.3,inbox:.25,booking:.25,reviews:.1'),mistakes:boosts('books:.3,docs:.3,crm:.2,quotes:.15,inventory:.15'),grow:boosts('leads:.2,booking:.2,inbox:.15,crm:.15,reports:.1')};
var FIT_CH={google:boosts('reviews:.15,phone:.1'),referral:boosts('reviews:.1,crm:.1'),web:boosts('leads:.2'),calls:boosts('phone:.25'),social:boosts('social:.15'),market:boosts('inventory:.1,inbox:.1'),ads:boosts('leads:.15'),email:boosts('crm:.05')};
var WORDS=[[/e-?mail|inbox/i,'inbox'],[/lead|follow.?up|inquir/i,'leads'],[/schedul|appointment|calendar|book|no.?show|remind/i,'booking'],[/quote|estimate|bid|proposal/i,'quotes'],[/invoice|receipt|bookkeep|expense|quickbooks|spreadsheet|reconcil/i,'books'],[/crm|contact|pipeline|data entry/i,'crm'],[/review|reputation/i,'reviews'],[/social|post|instagram|facebook|tiktok/i,'social'],[/report|numbers|kpi|dashboard/i,'reports'],[/inventor|stock|reorder|supplier/i,'inventory'],[/form|paperwork|pdf|intake|document|retyp/i,'docs'],[/call|voicemail|phone|text/i,'phone']];
var JUDGE=/(hir(e|ing)|fir(e|ing)|negotiat|apolog|complain|angry|upset|lawsuit|legal advice|diagnos|strategy|design|creative|price my|pricing decision|sales call|clos(e|ing) deals|interview|layoff|counsel)/i;
var APR={pricing:['Prices or discounts','quotes leads inbox inventory'],refunds:['Refunds','inbox books reviews'],customer:['Anything sent to customers','inbox leads booking reviews social phone quotes docs'],payments:['Payments','books inventory'],scheduling:['Schedule changes','booking phone leads']};
var BAND=['','about $5k–$25k for a simple single-task agent','about $15k–$75k for a custom integrated agent','about $100k–$450k+ for a production multi-agent system'];
var GOALS={leads:'more leads',time:'saving time',service:'better customer service',mistakes:'fewer mistakes',grow:'growing without hiring'};
var TIER=['','S','M','L'],STEPS=['Your business','Tasks you hate','Your tools','Your rules','Value and goal'];
function esc(s){return String(s).replace(/[&<>"']/g,c=>{return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function fmt(n){return Math.round(n).toLocaleString('en-US');}
function list(a){return a.length<2?a.join(''):a.slice(0,-1).join(', ')+(a.length>2?',':'')+' and '+a[a.length-1];}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
var store={get:()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){return null;}},set:v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(e){}},del:()=>{try{localStorage.removeItem(KEY);}catch(e){}}};
var step=1,done=false,steps=[].slice.call(wiz.querySelectorAll('.ap-step'));
function read(){
var f={};[...wiz.elements].forEach(el=>{
if(!el.name)return;
if(el.type==='checkbox'){f[el.name]=f[el.name]||[];if(el.checked)f[el.name].push(el.value);}
else if(el.type==='radio'){if(el.checked)f[el.name]=el.value;}
else f[el.name]=el.value;
});return f;
}
function write(f){
[...wiz.elements].forEach(el=>{
if(!el.name||!(el.name in f))return;var v=f[el.name];
if(el.type==='checkbox')el.checked=v.includes(el.value);
else if(el.type==='radio')el.checked=v===el.value;
else el.value=v;
});syncCustom();
}
function save(){store.set({f:read(),step:step,done:done});}
function syncCustom(){wiz.querySelectorAll('.ap-task').forEach(fs=>{
var c=fs.querySelector('input[value="c"]').checked,box=fs.querySelector('.ap-cust');box.hidden=!c;
var any=fs.querySelector('input[type=radio]:checked');fs.classList.toggle('on',!!any&&any.value!=='0');
});}
function hours(f,t){var v=f['h_'+t];if(v==='c'){v=parseFloat(f['hc_'+t]);}else v=parseFloat(v);return isFinite(v)&&v>0?Math.min(v,80):0;}
function show(n,focus){
step=n;steps.forEach(s=>{s.hidden=+s.getAttribute('data-step')!==n;});
$('apStepLbl').textContent='Step '+n+' of 5 · '+STEPS[n-1];
$('apPct').textContent=n*20+'%';$('apBar').setAttribute('aria-valuenow',n);$('apBar').firstElementChild.style.width=n*20+'%';
wiz.querySelectorAll('.ap-dots li').forEach((li,i)=>{li.className=i<n-1?'ok':i===n-1?'on':'';});
$('apBack').hidden=n===1;
$('apNext').firstChild.nodeValue=n===5?'Build my plan':'Next';
err('');
if(focus){var h=steps[n-1].querySelector('.ap-st');var top=wiz.getBoundingClientRect().top;if(top<0||top>innerHeight*.5)wiz.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});setTimeout(()=>{h.focus({preventScroll:true});},RM?0:250);}
}
function err(m){var e=$('apErr');e.textContent=m;e.hidden=!m;}
function valid(n){
var f=read();
if(n===1&&!f.ind){err('Choose your industry to continue.');$('ap-ind').focus();return false;}
if(n===2&&!TIDS.some(t=>hours(f,t)>0)){err('Give at least one chore some hours. Rough guesses are fine.');var r=wiz.querySelector('input[name="h_inbox"][value="1"]');if(r)r.focus();return false;}
if(n===5){var r2=parseFloat(f.rate);if(!(r2>=10&&r2<=1000)){err('Enter an hourly value between $10 and $1,000.');$('ap-rate').focus();return false;}if(!f.goal){err('Pick the goal that matters most.');wiz.querySelector('input[name="goal"]').focus();return false;}}
return true;
}
on($('apNext'),'click',()=>{
if(!valid(step))return;
if(step<5){show(step+1,true);save();return;}
done=true;save();build(true);
});
on($('apBack'),'click',()=>{if(step>1){show(step-1,true);save();}});
on(wiz,'submit',e=>{e.preventDefault();$('apNext').click();});
on(wiz,'keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox'&&e.target.type!=='radio'){e.preventDefault();$('apNext').click();}});
on(wiz,'change',e=>{
var t=e.target;
if(t.type==='checkbox'&&t.checked){var ex={apr:'nothing',sens:'none'}[t.name];
if(ex){wiz.querySelectorAll('input[name="'+t.name+'"]').forEach(o=>{if(t.value===ex?o!==t:o.value===ex)o.checked=false;});}}
if(t.type==='radio'&&t.value==='c'){syncCustom();var n=t.closest('.ap-task').querySelector('input[type=number]');setTimeout(()=>{n.focus();},0);}
syncCustom();save();
});
on(wiz,'input',()=>{save();});
function plan(){
var f=read(),ind=IND[f.ind]||IND.other,g=ind[1],tools=f.tools||[],apr=f.apr||[],sens=f.sens||[],ch=f.ch||[];
var rate=Math.max(10,parseFloat(f.rate)||75),crm=f.crm||'unsure',team=f.team||'1',annoy=(f.annoy||'').trim();
var hint={};WORDS.forEach(w=>{if(w[0].test(annoy))hint[w[1]]=1;});
var rows=TIDS.map(t=>{
var a=AG[t],wk=hours(f,t),now=wk*WK,saved=now*TASKS[t][2],fit=0,why=[];
var conn=a[1].split(' ').filter(x=>tools.includes(x));
fit+=Math.min(.3,conn.length*.15);if(conn.length)why.push('it works inside '+TOOLS[conn[0]]+', which you already use');
var bi=(FIT_IND[g]||{})[t]||0;fit+=bi;if(bi>=.2)why.push(ind[0]+' businesses lean hard on this job');
var bg=(FIT_GOAL[f.goal]||{})[t]||0;fit+=bg;if(bg>=.2)why.push('it serves your goal of '+GOALS[f.goal]);
ch.forEach(c=>{fit+=(FIT_CH[c]||{})[t]||0;});
if(hint[t]){fit+=.3;why.unshift('it targets the chore you called most annoying');}
if(t==='crm'&&crm==='no'&&wk>0)fit+=.1;
var tier=a[2],up=0;
if(conn.length>=3)up++;
if((sens.includes('health')||sens.includes('legal'))&&'docs booking inbox phone leads'.includes(t))up++;
if(up)tier=Math.min(2,tier+1);
if(team==='50+'&&a[2]===2&&up>=2)tier=3;
return {t:t,a:a,wk:wk,now:now,saved:saved,val:saved*rate,fit:fit,score:saved*rate*(1+fit)+fit,conn:conn,tier:tier,why:why};
});
var ranked=rows.slice().sort((x,y)=>y.score-x.score);
var top=ranked.filter(r=>r.wk>0).slice(0,3);
ranked.forEach(r=>{if(top.length<3&&top.indexOf(r)<0)top.push(r);});
var all=rows.reduce((s,r)=>s+r.saved,0),topH=top.reduce((s,r)=>s+r.saved,0);
/* readiness */
var pts=[['Starting point',40]],has=x=>tools.includes(x),fix=[];
if(crm==='yes')pts.push(['You have a CRM',15]);else if(crm==='unsure'){pts.push(['Maybe a CRM',5]);fix.push(['Confirm where customer records live','If contacts live in three places, pick one before anything is automated.']);}
else fix.push(['Pick one home for customer records','Without one, leads live in heads and inboxes. A simple CRM you own is step zero for most agents.']);
if(has('gmail')||has('outlook'))pts.push(['Business email account',10]);else fix.push(['Move email to a business account','Google Workspace or Microsoft 365 lets an agent work with permissions you control.']);
if(has('sheets')||has('qb'))pts.push(['Spreadsheet or accounting system',10]);else fix.push(['Get the numbers into one system','A shared spreadsheet or QuickBooks beats sticky notes for any agent.']);
if(has('calendly')||has('square'))pts.push(['Online calendar or booking',5]);else if(rows[2].wk>0)fix.push(['Choose one calendar','Bookings spread across phones and paper make reminders impossible.']);
var nT=tools.filter(x=>x!=='paper').length;if(nT>=3)pts.push(['Three or more connected tools',10]);
if(apr.length)pts.push(['Approval rules decided',10]);else fix.push(['Write down what needs your OK','Two lines on what an agent may never do alone saves weeks of back-and-forth.']);
if(has('paper'))pts.push(['Records on paper',-15]),fix.unshift(['Get records off paper','An agent can’t read a filing cabinet. Making your busiest form digital unlocks most of this plan.']);
if(rows[0].wk>=5)fix.push(['Agree on inbox rules','Who answers which emails, and how fast? Those rules become the agent’s job description.']);
if(sens.includes('health'))fix.push(['Confirm a HIPAA-eligible setup','Before any patient detail touches an agent, the AI and hosting vendors must sign a BAA.']);
fix.push(['Pick the one number you’ll judge it by','Response time, hours saved or leads booked. Measure before launch.']);
var score=Math.max(0,Math.min(100,pts.reduce((s,p)=>s+p[1],0)));
/* honest notes */
var notes=[];
if(annoy&&JUDGE.test(annoy))notes.push('Part of what you described sounds like a judgment call (“'+annoy.slice(0,90)+(annoy.length>90?'…':'')+'”). An agent can gather facts and draft options; the decision stays with you.');
if(rows[3].wk>0)notes.push('Setting prices isn’t something to automate. The quote agent drafts from your price book; you decide what the customer sees.');
if(all<8)notes.push('Honest note: under eight hours a month is light for a custom build. We may point you to a template or a tool you already own instead.');
if(team==='1'&&rows[5].wk>3&&crm==='no')notes.push('A CRM agent only pays off once a CRM exists. Set one up first; it may solve half the problem alone.');
var comp=[];
if(sens.includes('health'))comp.push(['Health information','No protected health information goes through any agent unless the AI and hosting vendors sign a Business Associate Agreement (BAA) and the setup is HIPAA-eligible. Until then, messages carry no treatment details.']);
if(sens.includes('payment')||apr.includes('payments'))comp.push(['Payments','Agents never store card numbers. Moving money, refunds and paying bills always wait for a human approval.']);
if(sens.includes('legal'))comp.push(['Legal matters','Nothing that reads as legal advice goes to a client without attorney review, and privileged material stays in systems the firm controls.']);
if(apr.includes('customer'))comp.push(['Customer messages','Customer-facing messages wait for approval until the agent earns trust; we loosen rules only with you.']);
if(apr.includes('nothing'))comp.push(['“I trust it”','Noted. Every agent still launches in draft mode so you see its work before it acts alone.']);
comp.push(['Always on','Least-privilege access, a log of every action and an instant kill switch come with every build. Your data never trains AI models.']);
var first=top[0],qw=top.find(r=>r.wk>0&&r.tier<first.tier&&r.score>=first.score*.6);if(qw)first=qw;
var order=[first].concat(top.filter(r=>r!==first));
var seed=JSON.stringify(f),h=0;for(var i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
var d=new Date(),id='AP-'+(''+d.getFullYear()).slice(2)+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'-'+h.toString(36).toUpperCase().slice(0,4);
return {f:f,ind:ind,g:g,rate:rate,tools:tools,apr:apr,sens:sens,crm:crm,annoy:annoy,rows:rows,top:top,all:all,topH:topH,score:score,pts:pts,fix:fix.slice(0,3),notes:notes,comp:comp,order:order,id:id,date:d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),biz:(f.biz||'').trim()};
}
function life(r,P){
var t=r.t,k=t;if(URGENT[P.f.ind]&&LIFE[t+'_urgent'])k=t+'_urgent';else if(LIFE[t+'_'+P.g])k=t+'_'+P.g;
if(t==='crm'&&P.crm!=='yes')k='crm_none';
return LIFE[k].replace(/\{c\}/g,NOUN[P.g]).replace(/\{C\}/g,cap(NOUN[P.g])).replace(/\{u\}/g,URGENT[P.f.ind]||'');
}
function connects(r){return r.conn.length?list(r.conn.map(x=>TOOLS[x])):'We’d connect it to a simple tool you’d own.';}
function approves(r,P){
var out=[];P.apr.forEach(a=>{if(APR[a]&&APR[a][1].split(' ').includes(r.t))out.push(APR[a][0].toLowerCase());});
var s=out.length?cap(list(out)):'';
if(r.a[4])s+=(s?'. Also: ':'')+r.a[4].charAt(0).toLowerCase()+r.a[4].slice(1);
if(P.apr.includes('nothing'))s=(s?s+'. ':'')+'You said you trust it; it still starts in draft mode';
return cap(s||'Anything outside the rules you set on the review call');
}
var ROLE=['Quickest win','Next up','Then'];
function whyFirst(r){return r.tier===1?'it is a small build that pays back within weeks':'it returns the most value, which justifies a mid-size build';}
var last=null;
function build(scroll){
var P=plan();last=P;var top=P.top,h='';
h+='<header class="pl-head"><div><p class="pl-kick">Free AI agent plan &middot; Eye To Ad Media</p><h2 id="apPlanH" tabindex="-1">Your AI Agent Plan</h2><p class="pl-meta">'+esc(P.biz?P.biz+' · ':'')+esc(P.ind[0])+' &middot; '+esc(P.date)+' &middot; Plan '+P.id+'</p></div>'+
'<div class="pl-ready"><svg viewBox="0 0 64 64" width="72" height="72" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="7"/><circle cx="32" cy="32" r="27" fill="none" stroke="'+(P.score>=70?'#4ADE80':P.score>=45?'#FBBF24':'#F87171')+'" stroke-width="7" stroke-linecap="round" stroke-dasharray="169.6" stroke-dashoffset="'+(169.6*(1-P.score/100)).toFixed(1)+'" transform="rotate(-90 32 32)"/></svg><span><b>'+P.score+'</b>readiness</span></div></header>';
var tv=top.reduce((s,r)=>s+r.val,0);
h+='<div class="pl-tiles"><div class="pl-tile"><b>'+fmt(P.topH)+'</b><span>hours a month back from your top 3 agents</span></div><div class="pl-tile"><b>$'+fmt(tv)+'</b><span>of your time each month, at $'+fmt(P.rate)+'/hour</span></div><div class="pl-tile pl-tile-l"><b>'+fmt(P.all)+'</b><span>hours a month across every chore you listed</span></div></div>';
h+='<p class="pl-assume"><b>The assumption:</b> an agent handles '+esc(list(top.filter(r=>r.wk>0).map(r=>Math.round(TASKS[r.t][2]*100)+'% of '+TASKS[r.t][0].toLowerCase().replace(/pdfs|crm/,m=>m.toUpperCase().replace('S','s')))))+' (50&ndash;70% by chore type) because a person still approves what matters. Weekly hours &times; 4.33 = monthly. An estimate, not a promise.</p>';
h+='<figure class="pl-fig"><figcaption>Hours a month on each agent’s chore: now vs. with the agent</figcaption><svg id="plChart" class="pl-chart" role="img" aria-labelledby="plChartT"><title id="plChartT">Monthly hours now vs. with an agent, per recommended agent</title></svg>'+
'<div class="pl-legend" aria-hidden="true"><span><i class="sw-now"></i>Hours now</span><span><i class="sw-ag"></i>With the agent</span></div>'+
'<details class="pl-dt"><summary>Show as a table</summary><table><thead><tr><th scope="col">Agent</th><th scope="col">Hours/month now</th><th scope="col">With agent</th><th scope="col">Value back</th></tr></thead><tbody>'+
top.map(r=>'<tr><td>'+esc(r.a[0])+'</td><td>'+r.now.toFixed(1)+'</td><td>'+(r.now-r.saved).toFixed(1)+'</td><td>$'+fmt(r.val)+'</td></tr>').join('')+'</tbody></table></details></figure>';
h+='<h3 class="pl-h">Your top 3 recommended agents</h3><ol class="pl-agents">';
top.forEach((r,i)=>{
h+='<li class="pl-ag"><div class="pl-ag-h"><span class="pl-rank">'+(i+1)+'</span><div><h4>'+esc(r.a[0])+'</h4><p class="pl-why">'+'Why it ranks here: '+esc(list(r.why.slice(0,2))||'a strong fit for your kind of business')+'.'+'</p></div><span class="pl-tier pl-t'+r.tier+'">'+TIER[r.tier]+'</span></div>'+
'<p class="pl-life"><b>A day in its life.</b> '+esc(life(r,P))+'</p>'+
'<dl class="pl-dl"><div><dt>Connects to</dt><dd>'+esc(connects(r))+'</dd></div><div><dt>A human approves</dt><dd>'+esc(approves(r,P))+'</dd></div>'+
'<div><dt>Time and value back</dt><dd>'+(r.wk>0?'About <b>'+fmt(r.saved)+' hours</b> and <b>$'+fmt(r.val)+'</b> a month':'Not sized: you didn’t list hours for it. We’d measure it on the review.')+'</dd></div>'+
'<div><dt>Size and market cost</dt><dd><b>Tier '+TIER[r.tier]+'</b>: published agency ranges put this '+BAND[r.tier]+' (<a href="https://neoteric.eu/blog/ai-agent-development-cost-2026/" target="_blank" rel="noopener">Neoteric</a>, <a href="https://www.cleveroad.com/blog/ai-agent-development-cost/" target="_blank" rel="noopener">Cleveroad</a>, <a href="https://dpvision.agency/blog/custom-ai-agent-development-cost/" target="_blank" rel="noopener">DP Vision</a>). Ours: a fixed price after a free 30-minute call.</dd></div></dl></li>';
});
h+='</ol>';
h+='<h3 class="pl-h">Your 30/60/90-day rollout</h3><ol class="pl-roll">';
P.order.forEach((r,i)=>{
var d=['Days 1–30','Days 31–60','Days 61–90'][i];
var txt=i===0?'Start with the '+r.a[0]+' because '+whyFirst(r)+'. It starts in draft mode: you see every action first.':i===1?'Add the '+r.a[0]+' once the first has earned your trust; shared connections make it faster.':'Bring in the '+r.a[0]+', then review all three: what to loosen, tighten or add next.';
h+='<li><span class="pl-d">'+d+' &middot; '+ROLE[i]+'</span><h4>'+esc(r.a[0])+'</h4><p>'+esc(txt)+'</p><p class="pl-m"><b>Measure:</b> '+esc(r.a[3])+'.</p></li>';
});
h+='</ol>';
h+='<div class="pl-two"><section class="pl-box" aria-labelledby="plR"><h3 class="pl-h" id="plR">Readiness: '+P.score+' / 100</h3><p class="pl-sub">Fix these first; each makes every agent cheaper and faster to build.</p><ol class="pl-fix">'+
P.fix.map(x=>'<li><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></li>').join('')+'</ol>'+
'<details class="pl-dt"><summary>How this score is calculated</summary><table><tbody>'+P.pts.map(p=>'<tr><td>'+esc(p[0])+'</td><td>'+(p[1]>0&&p[0]!=='Starting point'?'+':'')+p[1]+'</td></tr>').join('')+'<tr><th scope="row">Total (0–100)</th><th>'+P.score+'</th></tr></tbody></table></details></section>';
h+='<section class="pl-box" aria-labelledby="plC"><h3 class="pl-h" id="plC">Safety and compliance notes</h3><ul class="pl-comp">'+P.comp.map(c=>'<li><b>'+esc(c[0])+'.</b> '+esc(c[1])+'</li>').join('')+'</ul></section></div>';
if(P.notes.length)h+='<aside class="pl-note"><h3 class="pl-h">Not a good fit for automation</h3>'+P.notes.map(n=>'<p>'+esc(n)+'</p>').join('')+'</aside>';
h+='<p class="pl-foot">Plan '+P.id+' &middot; eyetoad.com/free-ai-agent-plan &middot; Estimates only &middot; 1-800-481-8638</p>';
var el=$('apPlan');el.innerHTML=h;$('plan').hidden=false;
chart(top);fill(P);
if(scroll){$('plan').scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});setTimeout(()=>{$('apPlanH').focus({preventScroll:true});},RM?0:400);}
}
function chart(top){
var svg=$('plChart');if(!svg)return;var NS='http://www.w3.org/2000/svg',D=t=>document.createElementNS(NS,t);
function n(t,a,x){var e=D(t);for(var k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;svg.appendChild(e);return e;}
while(svg.lastChild&&svg.lastChild.nodeName!=='title')svg.removeChild(svg.lastChild);
var rows=top.filter(r=>r.wk>0),W=Math.round(Math.max(300,Math.min(760,svg.parentNode.clientWidth||600))),L=W<440?96:150,R=W-44,rh=50,H=rows.length*rh+52;
svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('height',H);
if(!rows.length){n('text',{x:W/2,y:30,'text-anchor':'middle'},'Add hours in step 2');return;}
var mx=Math.max.apply(null,rows.map(r=>r.now))||1,st=mx<=10?2:mx<=25?5:mx<=60?10:mx<=150?25:50,max=Math.ceil(mx/st)*st,base=rows.length*rh+8;
for(var v=0;v<=max;v+=st){var x=L+(R-L)*v/max;n('line',{x1:x,y1:4,x2:x,y2:base,'class':'gl'});n('text',{x:x,y:base+16,'text-anchor':'middle'},v);}
n('text',{x:(L+R)/2,y:base+36,'text-anchor':'middle'},'Hours per month');
rows.forEach((r,i)=>{
var y=10+i*rh,w1=Math.max(2,(R-L)*r.now/max),w2=Math.max(2,(R-L)*(r.now-r.saved)/max),nm=r.a[0].replace(' Agent','');
if(W<440)nm=TASKS[r.t][1];
n('text',{x:L-8,y:y+18,'text-anchor':'end','class':'lbl'},nm);
n('rect',{x:L,y:y,width:w1,height:14,rx:3,'class':'b1'}).appendChild(D('title')).textContent=r.now.toFixed(1)+' hours a month now';
n('rect',{x:L,y:y+17,width:w2,height:14,rx:3,'class':'b2'}).appendChild(D('title')).textContent=(r.now-r.saved).toFixed(1)+' hours a month with the agent';
n('text',{x:L+w1+5,y:y+11,'class':'v'},r.now.toFixed(0));n('text',{x:L+w2+5,y:y+28,'class':'v'},(r.now-r.saved).toFixed(0));
});
}
function text(P){
var L=['YOUR AI AGENT PLAN — Plan '+P.id,(P.biz?P.biz+' | ':'')+P.ind[0]+' | '+P.date,''];
var tv=P.top.reduce((s,r)=>s+r.val,0);
L.push('Top 3 agents: about '+fmt(P.topH)+' hours and $'+fmt(tv)+' a month back (at $'+fmt(P.rate)+'/hour). All chores listed: about '+fmt(P.all)+' hours a month.','');
P.top.forEach((r,i)=>{
L.push((i+1)+'. '+r.a[0]+' (size '+TIER[r.tier]+')','   '+life(r,P),'   Connects to: '+connects(r),'   A human approves: '+approves(r,P),'   Back: '+(r.wk>0?'about '+fmt(r.saved)+' hours and $'+fmt(r.val)+' a month':'not sized yet'),'   Market range: '+BAND[r.tier]+'. Eye To Ad Media: fixed price after a free 30-minute call.','');
});
L.push('ROLLOUT');P.order.forEach((r,i)=>{L.push(['Days 1-30','Days 31-60','Days 61-90'][i]+': '+r.a[0]+' (measure '+r.a[3]+')');});
L.push('','READINESS: '+P.score+'/100. Fix first:');P.fix.forEach(x=>L.push('- '+x[0]));
L.push('','NOTES');P.comp.forEach(c=>L.push('- '+c[0]+': '+c[1]));
P.notes.forEach(n=>L.push('- '+n));
var f=P.f,hrs=TIDS.filter(t=>hours(f,t)>0).map(t=>TASKS[t][0]+' '+hours(f,t)+'h/wk');
L.push('','MY ANSWERS','Team: '+(f.team||'-')+' | Found via: '+((f.ch||[]).join(', ')||'-'),'Chores: '+(hrs.join('; ')||'-'),'Most annoying: '+(P.annoy||'-'),'Tools: '+((P.tools.map(x=>TOOLS[x])).join(', ')||'-')+' | CRM: '+P.crm,'Must approve: '+((P.apr.map(a=>APR[a]?APR[a][0]:'nothing, I trust it')).join(', ')||'-')+' | Sensitive: '+((P.sens).join(', ')||'-'),'Goal: '+(f.goal||'-'));
return L.join('\n');
}
function auto(P){
var tv=P.top.reduce((s,r)=>s+r.val,0),L=['Thanks for building your free AI Agent Plan with Eye To Ad Media.','','Your top 3 agents:'];
P.top.forEach((r,i)=>{L.push((i+1)+'. '+r.a[0]+(r.wk>0?' - about '+fmt(r.saved)+' hours and $'+fmt(r.val)+' a month back':''));});
L.push('','Together: about '+fmt(P.topH)+' hours and $'+fmt(tv)+' of your time each month. Start with the '+P.order[0].a[0]+'.','Readiness score: '+P.score+'/100.','','Reply to this email or call 1-800-481-8638 to book your free review.','','Plan '+P.id+' - Eye To Ad Media, Denver');
return L.join('\n');
}
function fill(P){
var mf=$('apMailForm'),t=text(P),bn=P.biz||P.ind[0];
mf.elements.plan.value=t;mf.elements._autoresponse.value=auto(P);mf.elements._subject.value='Free AI Agent Plan — '+bn;
if(P.biz&&!$('am-biz').value)$('am-biz').value=P.biz;
}
on($('apBook'),'click',()=>{
if(!last)return;var ta=$('rv-plan');ta.value=text(last);
var rf=$('apRevForm');rf.elements._subject.value='Free AI Agent Plan review — '+(last.biz||last.ind[0]);
if(last.biz&&!$('rv-biz').value)$('rv-biz').value=last.biz;
ta.classList.remove('flash');void ta.offsetWidth;ta.classList.add('flash');
$('review').scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});setTimeout(()=>{$('rv-name').focus({preventScroll:true});},RM?0:450);
});
on($('apMail'),'click',()=>{
var b=$('apMailBox'),o=b.hidden;b.hidden=!o;$('apMail').setAttribute('aria-expanded',o?'true':'false');if(o)setTimeout(()=>{$('am-name').focus();},0);
});
on($('apPrint'),'click',()=>{window.print();});
on($('apMailForm'),'submit',()=>{if(!last)return;var b=$('am-biz').value.trim();if(b){last.biz=b;}fill(last);if(b)$('apMailForm').elements._subject.value='Free AI Agent Plan — '+b;});
on($('apRevForm'),'submit',()=>{var b=$('rv-biz').value.trim();if(b)$('apRevForm').elements._subject.value='Free AI Agent Plan review — '+b;});
on($('apEdit'),'click',()=>{show(1,true);});
on($('apReset'),'click',()=>{
store.del();wiz.reset();done=false;last=null;syncCustom();$('plan').hidden=true;$('apPlan').innerHTML='';
$('apMailBox').hidden=true;$('apMail').setAttribute('aria-expanded','false');$('rv-plan').value='';show(1,true);
});
/* success panels (sending is done by /eta-site.js) */
[['apMailForm','apMailOk'],['apRevForm','apRevOk']].forEach(p=>{
var f=$(p[0]),ok=$(p[1]);if(!f||!ok||!('MutationObserver' in window))return;
new MutationObserver(()=>{if(f.querySelector('.eta-msg[data-kind="ok"]')){f.hidden=true;ok.hidden=false;ok.focus();}}).observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:['data-kind']});
});
var rz=0;on(window,'resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{if(last)chart(last.top);},150);});
on($('apStart'),'click',e=>{e.preventDefault();$('tool').scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});var s=steps[step-1].querySelector('.ap-st');setTimeout(()=>{s.focus({preventScroll:true});},RM?0:450);});
var saved=store.get();
if(saved&&saved.f){write(saved.f);done=!!saved.done;show(Math.min(5,Math.max(1,saved.step|0||1)),false);if(done)build(false);}
else show(1,false);
syncCustom();
})();
