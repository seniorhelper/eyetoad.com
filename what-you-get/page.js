
(function(){
document.querySelectorAll('.faq-q').forEach(function(btn){btn.addEventListener('click',function(){var item=btn.closest('.faq-item');var was=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(el){el.classList.remove('open');el.querySelector('.faq-q').setAttribute('aria-expanded','false');});if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true');}});});

/* sliding scale */
(function(){
var R=document.getElementById('wy-range');if(!R)return;
var A=[['Technical foundation','Fix what blocks trust: speed, crawl, schema.','Full technical program, ongoing monitoring.'],['Content','A few money pages, written to convert.','Every service and city, built out and refreshed.'],['Local & maps','Business Profile done properly, reviews started.','Multi-location, review systems, full citation work.'],['Authority & mentions','Directory presence, first press release.','Press at scale, vertical networks, editorial outreach.'],['AI visibility','Entity signals and fact blocks on key pages.','Citation-eligible structure across the whole site.'],['Conversion','Calls-to-action and forms that work.','Testing, speed-to-lead, sales-trained chatbot.'],['Reporting','Monthly, plain English.','Live view, strategy reviews, market tracking.']];
var LV=[['Starter','one focused deliverable'],['Starter','one focused deliverable'],['Starter','foundations first'],['Growth','typical local campaign'],['Growth','typical local campaign'],['Growth','competitive local market'],['Growth+','multi-market or competitive metro'],['Dominance','several markets, press at scale'],['Dominance','several markets, press at scale'],['Dominance','the market leader plan']];
var NOTE={1:'At the entry point you get one thing done properly — usually the map listing or the single page that should be bringing the calls. Honest, not a full campaign.',3:'Foundations: the site stops blocking itself, the profile is complete, the first money pages go up. The phone usually moves here first, from Maps.',5:'This is where most local businesses live. All seven areas active, the important pages built, authority growing, conversion being tested.',7:'Wider and faster: more cities, more pages, press distribution through our own properties, AI-citation work across the site.',9:'Everything above, at scale, plus the things only big campaigns carry — agentic systems, multi-market builds, ongoing creative testing.'};
var EX={7:['Press releases distributed through our own platforms','Multi-city page builds with unique modules per market'],9:['Agentic follow-up and sales-trained chatbot systems','Custom conversion sites and NFC campaigns','Strategy sessions on demand']};
var areas=document.getElementById('wy-areas'),note=document.getElementById('wy-note'),ex=document.getElementById('wy-extra'),exl=document.getElementById('wy-extra-list'),lvl=document.getElementById('wy-lvl'),tag=document.getElementById('wy-tag');
areas.innerHTML=A.map(function(a,i){return '<div class="wy-area"><b>'+a[0]+'</b><div><div class="k-bar"><i data-i="'+i+'"></i></div></div></div>';}).join('');
function paint(){var v=+R.value;R.setAttribute('aria-valuenow',v);lvl.textContent=LV[v-1][0];tag.textContent=LV[v-1][1];
 [].forEach.call(areas.querySelectorAll('i'),function(b,i){var base=[.35,.3,.45,.2,.25,.3,.4][i];var w=Math.min(100,Math.round((base+(1-base)*(v-1)/9)*100));b.style.width=w+'%';});
 var k=v<=2?1:v<=4?3:v<=6?5:v<=8?7:9;note.textContent=NOTE[k];
 var list=v>=9?EX[7].concat(EX[9]):v>=7?EX[7]:null;if(list){exl.innerHTML=list.map(function(t){return '<li>'+t+'</li>';}).join('');ex.classList.add('on');}else ex.classList.remove('on');}
R.addEventListener('input',paint);paint();
})();
/* deck */
(function(){
var dk=document.getElementById('dk');if(!dk)return;var S=[].slice.call(dk.querySelectorAll('.dk-slide')),i=0,prev=document.getElementById('dk-prev'),next=document.getElementById('dk-next'),cnt=document.getElementById('dk-count'),dots=document.getElementById('dk-dots');
dots.innerHTML=S.map(function(){return '<i></i>';}).join('');
function go(n){i=Math.max(0,Math.min(S.length-1,n));S.forEach(function(s,k){s.classList.toggle('on',k===i);});[].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===i);});cnt.textContent=(i+1)+' / '+S.length;prev.disabled=i===0;next.disabled=i===S.length-1;next.textContent=i===S.length-2?'The question →':'Next →';}
prev.addEventListener('click',function(){go(i-1);});next.addEventListener('click',function(){go(i+1);});
dk.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1);});dk.tabIndex=0;
[].forEach.call(dk.querySelectorAll('.dk-choice button'),function(b){b.addEventListener('click',function(){var g=b.parentNode;[].forEach.call(g.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});var s=b.closest('.dk-slide');[].forEach.call(s.querySelectorAll('.dk-rev'),function(r){r.classList.toggle('on',r.id===b.getAttribute('data-rev'));});});});
var v=document.getElementById('dk-val'),o=document.getElementById('dk-out');function m(){o.textContent='$'+(20*+v.value).toLocaleString('en-US');o.nextElementSibling.textContent='per month, at $'+(+v.value).toLocaleString('en-US')+' per customer. Illustrative — your numbers, your math.';}v.addEventListener('input',m);m();
document.getElementById('dk-no').addEventListener('click',function(){var f=document.getElementById('dk-form');f.classList.add('on');var inp=f.querySelector('input[name=name]');if(inp)inp.focus();});
go(0);
})();

})();

