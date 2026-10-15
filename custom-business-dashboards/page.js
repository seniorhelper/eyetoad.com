/* /custom-business-dashboards/ — FAQ accordion, sample-data dashboard demo, form success state. No libraries. */
(function(){
'use strict';

/* ---------- FAQ accordion ---------- */
[].forEach.call(document.querySelectorAll('.faq-q'),function(btn){
  btn.addEventListener('click',function(){
    var item=btn.closest('.faq-item'),was=item.classList.contains('open');
    [].forEach.call(document.querySelectorAll('.faq-item.open'),function(el){el.classList.remove('open');el.querySelector('.faq-q').setAttribute('aria-expanded','false');});
    if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
  });
});

/* ---------- demo dashboard (sample data for a fictional HVAC company) ----------
   The markup ships already filled in for the 30-day view, so nothing here runs until
   someone touches the demo. Every number and every answer is computed from DATA. */
var db=document.getElementById('db');if(!db)return;
var CH=['Google Business Profile','Google Ads','Website (organic search)','Meta Ads','Referrals'];
var SHORT=['Google profile','Google Ads','Website','Meta Ads','Referrals'];
/* per channel: [leads, booked jobs, ad spend]; c = this period, p = the period before */
var DATA={
  7:{name:'7 days',word:'week',ticket:585,pTicket:560,target:15000,calls:18,pCalls:14,rating:4.8,pRating:4.7,reviews:9,trend:[4.6,4.6,4.7,4.7,4.7,4.8],
     c:[[21,9,0],[16,5,1120],[11,4,0],[9,2,540],[5,3,0]],p:[[17,7,0],[18,5,1180],[10,4,0],[6,1,520],[5,2,0]]},
  30:{name:'30 days',word:'month',ticket:602,pTicket:589,target:60000,calls:71,pCalls:58,rating:4.8,pRating:4.7,reviews:31,trend:[4.5,4.6,4.6,4.7,4.7,4.8],
     c:[[84,31,0],[66,19,4650],[43,15,0],[38,8,2180],[19,15,0]],p:[[71,25,0],[70,20,4800],[39,13,0],[30,6,2050],[18,13,0]]},
  90:{name:'90 days',word:'quarter',ticket:596,pTicket:571,target:180000,calls:199,pCalls:158,rating:4.8,pRating:4.6,reviews:83,trend:[4.4,4.5,4.5,4.6,4.7,4.8],
     c:[[236,87,0],[205,58,14100],[121,41,0],[104,21,6400],[57,44,0]],p:[[190,64,0],[214,57,14600],[108,35,0],[77,15,5900],[52,40,0]]}
};
function sum(rows,i){var s=0;for(var k=0;k<rows.length;k++)s+=rows[k][i];return s;}
function paidLeads(rows){var s=0;for(var k=0;k<rows.length;k++)if(rows[k][2])s+=rows[k][0];return s;}
function stats(d,rows,ticket){
  var leads=sum(rows,0),booked=sum(rows,1),spend=sum(rows,2),pl=paidLeads(rows);
  return {leads:leads,booked:booked,close:booked/leads*100,ticket:ticket,rev:booked*ticket,spend:spend,cpl:spend/pl};
}
function money(n,dp){return '$'+n.toLocaleString('en-US',{minimumFractionDigits:dp||0,maximumFractionDigits:dp||0});}
function int(n){return n.toLocaleString('en-US');}
function pct(n){return n.toFixed(1)+'%';}
function chg(a,b){return (a-b)/b*100;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}

/* delta line: words carry the meaning, color only repeats it */
function delta(now,before,kind,lowerIsBetter,label){
  var diff=now-before,txt,cls;
  if(Math.abs(diff)<1e-9){return {t:'No change vs prior '+label,c:''};}
  var up=diff>0,good=lowerIsBetter?!up:up;
  if(kind==='pts')txt=(up?'Up ':'Down ')+Math.abs(diff).toFixed(1)+' pts';
  else if(kind==='abs')txt=(up?'Up ':'Down ')+Math.abs(diff).toFixed(1);
  else txt=(up?'Up ':'Down ')+Math.abs(chg(now,before)).toFixed(1)+'%';
  cls=good?'good':'bad';
  return {t:txt+' vs prior '+label,c:cls};
}

function setText(sel,t){var el=db.querySelector(sel);if(el)el.textContent=t;}
function setDelta(key,o){var el=db.querySelector('[data-d="'+key+'"]');if(!el)return;el.textContent=o.t;el.className='kt-d'+(o.c?' '+o.c:'');}

function render(r){
  var d=DATA[r],s=stats(d,d.c,d.ticket),p=stats(d,d.p,d.pTicket),lbl=d.name;
  setText('[data-k="leads"]',int(s.leads));setDelta('leads',delta(s.leads,p.leads,'%',false,lbl));
  setText('[data-k="booked"]',int(s.booked));setDelta('booked',delta(s.booked,p.booked,'%',false,lbl));
  setText('[data-k="close"]',pct(s.close));setDelta('close',delta(+s.close.toFixed(1),+p.close.toFixed(1),'pts',false,lbl));
  setText('[data-k="ticket"]',money(s.ticket));setDelta('ticket',delta(s.ticket,p.ticket,'%',false,lbl));
  setText('[data-k="rev"]',money(s.rev));
  var share=Math.round(s.rev/d.target*100);
  setText('[data-d="rev"]',share+'% of the '+money(d.target)+' target');
  var bar=db.querySelector('.kt-bar i');if(bar)bar.style.width=Math.min(100,share)+'%';
  setText('[data-k="calls"]',int(d.calls));setDelta('calls',delta(d.calls,d.pCalls,'%',false,lbl));
  setText('[data-k="rating"]',d.rating.toFixed(1)+' of 5');
  setText('[data-d="rating"]',d.reviews+' new reviews, '+(d.rating>d.pRating?'up from ':'same as ')+d.pRating.toFixed(1));
  var pl=db.querySelector('.kt-spark polyline');
  if(pl){var pts=[];for(var i=0;i<d.trend.length;i++)pts.push((i*22+4)+','+(22-(d.trend[i]-4.3)*30).toFixed(1));pl.setAttribute('points',pts.join(' '));}
  setText('[data-k="cpl"]',money(s.cpl,2));setDelta('cpl',delta(+s.cpl.toFixed(2),+p.cpl.toFixed(2),'%',true,lbl));

  /* chart: bar = this period, tick = previous period, both on one scale */
  var max=0;for(i=0;i<CH.length;i++)max=Math.max(max,d.c[i][1],d.p[i][1]);
  var W=300;
  for(i=0;i<CH.length;i++){
    var b=db.querySelector('#dbBar'+i),t=db.querySelector('#dbVal'+i),k=db.querySelector('#dbPrev'+i);
    var w=Math.max(2,Math.round(d.c[i][1]/max*W)),pw=Math.round(d.p[i][1]/max*W);
    if(b)b.setAttribute('width',w);
    if(t){t.setAttribute('x',w+(pw>w&&pw-w<34?pw-w+8:8));t.textContent=d.c[i][1];}
    if(k){k.setAttribute('x1',pw);k.setAttribute('x2',pw);}
  }
  var svg=db.querySelector('.db-chart');
  if(svg)svg.setAttribute('aria-label','Bar chart of booked jobs by channel, last '+lbl+': '+CH.map(function(c,j){return c+' '+d.c[j][1]+' (previous period '+d.p[j][1]+')';}).join('; ')+'.');
  setText('#dbChartSub','Last '+lbl+'. Bar is this period; the dark tick is the '+lbl+' before.');

  /* table fallback */
  var tb=db.querySelector('#dbRows');
  if(tb){var h='';for(i=0;i<CH.length;i++){var c=d.c[i];
    h+='<tr><td>'+esc(CH[i])+'</td><td>'+c[0]+'</td><td>'+c[1]+'</td><td>'+pct(c[1]/c[0]*100)+'</td><td>'+(c[2]?money(c[2]):'none')+'</td><td>'+d.p[i][1]+'</td></tr>';}
    tb.innerHTML=h;}

  /* what changed */
  var al=db.querySelector('#dbAlerts');
  if(al){
    var ch=[];for(i=0;i<CH.length;i++)ch.push({i:i,v:chg(d.c[i][0],d.p[i][0])});
    ch.sort(function(a,b){return b.v-a.v;});
    var top=ch[0],low=ch[ch.length-1],items=[];
    items.push(['up','Up',esc(CH[top.i])+' leads rose '+top.v.toFixed(0)+'% ('+d.p[top.i][0]+' to '+d.c[top.i][0]+').']);
    if(low.v<0){var sp=d.c[low.i][2]?' while spend was '+money(d.c[low.i][2]):'';
      items.push(['watch','Watch',esc(CH[low.i])+' leads fell '+Math.abs(low.v).toFixed(0)+'% ('+d.p[low.i][0]+' to '+d.c[low.i][0]+')'+sp+'.']);}
    else items.push(['note','Note',esc(CH[low.i])+' grew least, up '+low.v.toFixed(0)+'%.']);
    items.push([share>=100?'up':'watch',share>=100?'Up':'Watch','Revenue is at '+share+'% of target: '+money(s.rev)+' of '+money(d.target)+'.']);
    items.push(['note','Note','Close rate moved from '+pct(p.close)+' to '+pct(s.close)+'.']);
    items.push(['up','Up','Google rating '+d.rating.toFixed(1)+' with '+d.reviews+' new reviews this '+d.word+'.']);
    al.innerHTML=items.map(function(x){return '<li class="a-'+x[0]+'"><b>'+x[1]+'</b><span>'+x[2]+'</span></li>';}).join('');
  }
  setText('#dbAlertsH','What changed this '+d.word);
  setText('#dbAlertsSub','Compared with the '+lbl+' before. Generated from the numbers, not written by hand.');
}

/* canned "Ask your dashboard" answers, computed from DATA */
var Q={
  q1:function(){var d=DATA[30],o=[0,1,2,3,4].sort(function(a,b){return d.c[b][1]-d.c[a][1];}),best=o[0],nx=o[1];
    var tot=sum(d.c,1);
    return '<b>'+esc(CH[best])+'.</b> In the last 30 days it brought '+d.c[best][1]+' of '+tot+' booked jobs ('+Math.round(d.c[best][1]/tot*100)+'%)'+(d.c[best][2]?'':', with no ad spend behind it')+'. Runner-up: '+esc(CH[nx])+' with '+d.c[nx][1]+'.';},
  q2:function(r){var d=DATA[r],s=stats(d,d.c,d.ticket),gap=d.target-s.rev,jobs=Math.ceil(gap/d.ticket);
    if(gap<=0)return '<b>Yes.</b> Revenue is '+money(s.rev)+', past the '+money(d.target)+' target for the last '+d.name+'.';
    return '<b>Not yet.</b> Over the last '+d.name+' revenue was '+money(s.rev)+' against a '+money(d.target)+' target, '+money(gap)+' short. At the '+money(d.ticket)+' average ticket that is about '+jobs+' more booked jobs.';},
  q3:function(r){var d=DATA[r],g=d.c[1],m=d.c[3],cg=g[2]/g[1],cm=m[2]/m[1],win=cg<=cm?'Google Ads':'Meta Ads';
    return '<b>'+win+'.</b> Over the last '+d.name+', Google Ads cost '+money(cg)+' per booked job ('+money(g[2])+' for '+g[1]+' jobs) and Meta Ads cost '+money(cm)+' ('+money(m[2])+' for '+m[1]+').';},
  q4:function(r){var d=DATA[r],lo=0;for(var i=1;i<CH.length;i++)if(d.c[i][1]/d.c[i][0]<d.c[lo][1]/d.c[lo][0])lo=i;
    var c=d.c[lo];
    return '<b>'+esc(CH[lo])+'.</b> Over the last '+d.name+' it produced '+c[0]+' leads but only '+c[1]+' booked jobs, a '+pct(c[1]/c[0]*100)+' close rate. That is the first place to listen to call recordings and check response times.';}
};

var cur=30,lastQ=null,live=document.getElementById('dbLive'),ans=document.getElementById('dbAns');
db.addEventListener('click',function(e){
  var rb=e.target.closest('.db-range button');
  if(rb){var r=+rb.getAttribute('data-r');if(r===cur)return;cur=r;
    [].forEach.call(db.querySelectorAll('.db-range button'),function(b){b.setAttribute('aria-pressed',String(b===rb));});
    render(cur);
    if(live)live.textContent='Showing the last '+DATA[cur].name+'.';
    if(lastQ&&ans)ans.innerHTML=Q[lastQ](cur);
    return;}
  var qb=e.target.closest('.db-q');
  if(qb&&ans){lastQ=qb.getAttribute('data-q');
    [].forEach.call(db.querySelectorAll('.db-q'),function(b){b.setAttribute('aria-pressed',String(b===qb));});
    ans.innerHTML=Q[lastQ](cur);}
});
})();

/* ---------- form: on-page success state (sending is handled by /eta-site.js) ---------- */
(function(){
  var f=document.getElementById('dbForm'),ok=document.getElementById('dbOk');if(!f||!ok||!('MutationObserver' in window))return;
  new MutationObserver(function(){
    var m=f.querySelector('.eta-msg[data-kind="ok"]');
    if(m){f.hidden=true;ok.hidden=false;ok.focus();}
  }).observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:['data-kind']});
})();
