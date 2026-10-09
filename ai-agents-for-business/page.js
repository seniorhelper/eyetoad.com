/* /ai-agents-for-business/ — hero animation, build-your-agent picker, audit form glue. No libraries. */
(function(){
'use strict';
var RM=false;try{RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}

/* ---------- FAQ accordion ---------- */
[].forEach.call(document.querySelectorAll('.faq-q'),function(btn){
  btn.addEventListener('click',function(){
    var item=btn.closest('.faq-item'),was=item.classList.contains('open');
    [].forEach.call(document.querySelectorAll('.faq-item.open'),function(el){el.classList.remove('open');el.querySelector('.faq-q').setAttribute('aria-expanded','false');});
    if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
  });
});

/* ---------- hero: agent network canvas ---------- */
(function(){
  var cv=document.getElementById('agCanvas');if(!cv||!cv.getContext)return;
  var ctx=cv.getContext('2d'),W=560,H=500,dpr=Math.min(window.devicePixelRatio||1,2);
  cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  /* phones show this 560px scene at ~370px; enlarge the labels so they stay readable */
  var K=1;var fitK=function(){var w=cv.clientWidth||W;K=Math.max(1,Math.min(1.32,(W/w)*0.78));};fitK();window.addEventListener('resize',fitK);
  var F=function(wt,px,fam){return wt+' '+(px*K).toFixed(1)+'px '+fam;};
  var CX=290,CY=268,CYCLE=20000;
  var TYPES=[
    {l:'Emails',c:'#60A5FA'},{l:'Spreadsheet',c:'#34D399'},{l:'Follow-ups',c:'#F472B6'},
    {l:'Booking',c:'#FBBF24'},{l:'Reports',c:'#A78BFA'},{l:'Reviews',c:'#FB923C',ok:1}
  ];
  var SLOTS=[118,178,238,298,358,418];
  var stars=[];for(var i=0;i<46;i++)stars.push([Math.random()*W,Math.random()*200,Math.random()*1.4+.4,Math.random()*6.28]);
  var cards=[],done=[],count=0,pulse=0,spawnAt=0,k=0,start=null,last=0;
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
  function mix(a,b,t){var pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);
    var r=Math.round(((pa>>16)&255)*(1-t)+((pb>>16)&255)*t),g=Math.round(((pa>>8)&255)*(1-t)+((pb>>8)&255)*t),bl=Math.round((pa&255)*(1-t)+(pb&255)*t);
    return 'rgb('+r+','+g+','+bl+')';}
  function check(x,y,s,col){ctx.save();ctx.strokeStyle=col;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(x-s*.45,y);ctx.lineTo(x-s*.1,y+s*.35);ctx.lineTo(x+s*.5,y-s*.35);ctx.stroke();ctx.restore();}
  function sky(ph){
    var day=.5+.5*Math.cos(ph*6.2832);
    var g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,mix('#050A17','#1E3A8A',day));g.addColorStop(.55,mix('#0B1530','#2B5CC4',day));g.addColorStop(1,mix('#101A33','#F4A261',day*.55));
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    var na=1-day;if(na>.05){for(var i=0;i<stars.length;i++){var s=stars[i];ctx.globalAlpha=na*(.45+.4*Math.sin(s[3]+ph*40));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s[0],s[1],s[2],0,6.2832);ctx.fill();}ctx.globalAlpha=1;}
    /* sun or moon on an arc */
    var a=ph*6.2832,isDay=day>=.5,ang=isDay?a:a+Math.PI;
    var bx=W/2+Math.sin(ang)*210,by=150-Math.cos(ang)*100;
    ctx.save();ctx.shadowColor=isDay?'rgba(253,224,71,.8)':'rgba(226,232,240,.6)';ctx.shadowBlur=24;
    ctx.fillStyle=isDay?'#FDE68A':'#E2E8F0';ctx.beginPath();ctx.arc(bx,by,isDay?16:12,0,6.2832);ctx.fill();ctx.restore();
    if(!isDay){ctx.fillStyle=mix('#050A17','#1E3A8A',day);ctx.beginPath();ctx.arc(bx+6,by-4,10,0,6.2832);ctx.fill();}
    /* skyline */
    ctx.fillStyle=mix('#060B16','#13254D',day);
    var sk=[[0,470,40],[36,452,30],[64,462,28],[90,440,26],[114,458,36],[148,446,22],[168,466,40],[206,450,30],[234,458,26],[258,436,22],[278,452,44],[320,444,26],[344,462,34],[376,448,30],[404,458,28],[430,440,24],[452,456,36],[486,446,30],[514,462,46]];
    for(var j=0;j<sk.length;j++)ctx.fillRect(sk[j][0],sk[j][1],sk[j][2],H-sk[j][1]);
    ctx.fillStyle='rgba(253,224,71,'+(.5*na+.05)+')';
    for(j=0;j<sk.length;j+=2){ctx.fillRect(sk[j][0]+6,sk[j][1]+10,4,4);ctx.fillRect(sk[j][0]+14,sk[j][1]+22,4,4);}
    return day;
  }
  function clock(ph,day){
    var hr=(12+ph*24)%24,h=Math.floor(hr),m=Math.floor((hr-h)*60);
    rr(16,16,206+64*(K-1)/0.32,62,10);ctx.fillStyle='rgba(8,13,28,.72)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.16)';ctx.lineWidth=1;ctx.stroke();
    var cx=47,cy=47;ctx.strokeStyle='#CBD5E1';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,19,0,6.2832);ctx.stroke();
    var ha=((hr%12)/12)*6.2832,ma=(m/60)*6.2832;ctx.lineCap='round';
    ctx.strokeStyle='#fff';ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.sin(ha)*10,cy-Math.cos(ha)*10);ctx.stroke();
    ctx.strokeStyle='#FDBA74';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.sin(ma)*15,cy-Math.cos(ma)*15);ctx.stroke();
    var hh=h%12||12,ap=h<12?'AM':'PM';
    ctx.fillStyle='#fff';ctx.font=F('800',19,'Inter,system-ui,sans-serif');ctx.textAlign='left';ctx.textBaseline='alphabetic';
    ctx.fillText(hh+':'+(m<10?'0':'')+m+' '+ap,76,44);
    var night=h>=22||h<6,eve=h>=18&&h<22;
    ctx.fillStyle=night?'#FDBA74':eve?'#F9A8D4':'#BFDBFE';ctx.font=F('600',12,'Inter,system-ui,sans-serif');
    ctx.fillText(night?'Working while you sleep':eve?'Working while you\u2019re home':'Working while you work',76,64);
  }
  function counter(){
    rr(W-150,16,134,62,10);ctx.fillStyle='rgba(8,13,28,.72)';ctx.fill();ctx.strokeStyle='rgba(255,255,255,.16)';ctx.stroke();
    ctx.fillStyle='#4ADE80';ctx.font=F('900',26,'Fraunces,Georgia,serif');ctx.textAlign='left';ctx.fillText(String(count),W-136,52);
    ctx.fillStyle='#CBD5E1';ctx.font=F('600',11,'Inter,system-ui,sans-serif');ctx.fillText('tasks finished',W-136,68);
  }
  function network(){
    ctx.strokeStyle='rgba(148,163,184,.22)';ctx.lineWidth=1;ctx.setLineDash([3,5]);
    for(var i=0;i<SLOTS.length;i++){ctx.beginPath();ctx.moveTo(150,SLOTS[i]+15);ctx.quadraticCurveTo(220,SLOTS[i]+15,CX-40,CY);ctx.stroke();}
    ctx.beginPath();ctx.moveTo(CX+44,CY);ctx.lineTo(400,CY);ctx.stroke();ctx.setLineDash([]);
  }
  function agent(t){
    var p=(t%2400)/2400;
    for(var r=0;r<2;r++){var q=(p+r*.5)%1;ctx.strokeStyle='rgba(249,115,22,'+(.55*(1-q))+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(CX,CY,44+q*46,0,6.2832);ctx.stroke();}
    var g=ctx.createRadialGradient(CX-12,CY-14,6,CX,CY,48);g.addColorStop(0,'#FDBA74');g.addColorStop(.55,'#F97316');g.addColorStop(1,'#C2410C');
    ctx.save();ctx.shadowColor='rgba(249,115,22,'+(.5+pulse*.5)+')';ctx.shadowBlur=30+pulse*30;
    rr(CX-42,CY-42,84,84,12);ctx.fillStyle=g;ctx.fill();ctx.restore();
    /* face: two eyes + status bar */
    ctx.fillStyle='#0B1220';rr(CX-28,CY-18,56,30,8);ctx.fill();
    var blink=(t%4200)<140?2:8;ctx.fillStyle='#7DD3FC';
    ctx.fillRect(CX-16,CY-3-blink/2,9,blink);ctx.fillRect(CX+7,CY-3-blink/2,9,blink);
    ctx.fillStyle='rgba(11,18,32,.75)';ctx.fillRect(CX-20,CY+20,40,5);ctx.fillStyle='#4ADE80';ctx.fillRect(CX-20,CY+20,40*((t%1600)/1600),5);
    ctx.fillStyle='#fff';ctx.font=F('800',13,'Inter,system-ui,sans-serif');ctx.textAlign='center';ctx.fillText('YOUR AI AGENT',CX,CY+66);
    pulse*=.92;
  }
  function card(x,y,ty,a,s){
    ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);
    rr(0,0,118*K,30,8);ctx.fillStyle='rgba(15,23,42,.92)';ctx.fill();ctx.strokeStyle=ty.c;ctx.lineWidth=1.5;ctx.stroke();
    ctx.fillStyle=ty.c;ctx.beginPath();ctx.arc(14,15,5,0,6.2832);ctx.fill();
    ctx.fillStyle='#F1F5F9';ctx.font=F('700',12.5,'Inter,system-ui,sans-serif');ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(ty.l,26,15.5);
    ctx.restore();ctx.textBaseline='alphabetic';
  }
  function doneList(){
    ctx.fillStyle='#CBD5E1';ctx.font=F('800',11,'Inter,system-ui,sans-serif');ctx.textAlign='left';ctx.fillText('DONE',W-16-140*K,150);
    for(var i=0;i<done.length;i++){
      var d=done[i],y=162+i*40,a=Math.min(1,d.a);
      ctx.save();ctx.globalAlpha=a*(1-i*.12);
      rr(W-16-140*K,y,140*K,32,8);ctx.fillStyle='rgba(15,23,42,.88)';ctx.fill();ctx.strokeStyle=d.ty.ok?'rgba(251,191,36,.7)':'rgba(74,222,128,.6)';ctx.lineWidth=1.2;ctx.stroke();
      ctx.fillStyle=d.ty.ok?'#FBBF24':'#22C55E';ctx.beginPath();ctx.arc(W-16-140*K+16,y+16,9,0,6.2832);ctx.fill();
      if(d.ty.ok){ctx.fillStyle='#0B1220';ctx.font=F('900',12,'Inter,sans-serif');ctx.textAlign='center';ctx.fillText('?',W-16-140*K+16,y+20);}else check(W-16-140*K+16,y+16,9,'#0B1220');
      ctx.fillStyle='#F1F5F9';ctx.font=F('700',11.5,'Inter,system-ui,sans-serif');ctx.textAlign='left';
      ctx.fillText(d.ty.ok?'Reply: your OK':d.ty.l+' done',W-16-140*K+31,y+20);
      ctx.restore();
    }
  }
  function spawn(now){var ty=TYPES[k%6],slot=SLOTS[k%6];k++;cards.push({ty:ty,y0:slot,t0:now});}
  function frame(now,staticMode){
    var ph=staticMode?.5:((now-start)%CYCLE)/CYCLE;
    var day=sky(ph);network();
    if(!staticMode){
      if(now>spawnAt){spawn(now);spawnAt=now+1150;}
      for(var i=cards.length-1;i>=0;i--){
        var c=cards[i],p=(now-c.t0)/2300;
        if(p>=1){cards.splice(i,1);pulse=1;count++;done.unshift({ty:c.ty,a:0});if(done.length>6)done.pop();continue;}
        var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,x0=24,y0=c.y0,x1=CX-40,y1=CY-15;
        var x=(1-e)*(1-e)*x0+2*(1-e)*e*170+e*e*x1,y=(1-e)*(1-e)*y0+2*(1-e)*e*y0+e*e*y1;
        card(x,y,c.ty,p<.08?p/.08:(p>.85?(1-p)/.15:1),1-e*.55);
      }
      for(i=0;i<done.length;i++)done[i].a+=.06;
    }else{
      for(var j=0;j<6;j++)card(24,SLOTS[j],TYPES[j],.6,1);
    }
    agent(staticMode?0:now);doneList();clock(ph,day);counter();
  }
  if(RM){
    count=6;for(var d=5;d>=0;d--)done.push({ty:TYPES[d],a:1});
    var drawStatic=function(){frame(0,true);};drawStatic();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawStatic);
    return;
  }
  var running=false,vis=true,raf=0;
  function loop(now){if(start===null){start=now;spawnAt=now+300;}frame(now,false);if(running)raf=requestAnimationFrame(loop);}
  function set(on){if(on&&!running){running=true;raf=requestAnimationFrame(loop);}else if(!on&&running){running=false;cancelAnimationFrame(raf);}}
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){vis=es[0].isIntersecting;set(vis&&!document.hidden);}).observe(cv);}
  document.addEventListener('visibilitychange',function(){set(vis&&!document.hidden);});
  set(true);
})();

/* ---------- build-your-agent picker ---------- */
(function(){
  var list=document.getElementById('agTaskList');if(!list)return;
  var T=[
    ['Inbox triage and replies','Inbox',5,1,'an inbox agent that sorts every email and drafts the routine replies for your one-tap OK'],
    ['Lead follow-up','Leads',3,1,'a speed-to-lead agent that answers new inquiries within a minute and logs the details'],
    ['Booking and reminders','Booking',2,0,'a booking agent that fills your calendar and chases no-shows'],
    ['Quotes and estimates','Quotes',3,0,'a quoting agent that drafts estimates from your real price sheet for you to approve'],
    ['Spreadsheets and bookkeeping prep','Sheets',3,1,'a bookkeeping-prep agent that pulls receipts and invoices into the right rows'],
    ['CRM updates','CRM',2,0,'a CRM agent that keeps every contact and next step current from your calls and emails'],
    ['Review requests and replies','Reviews',1,0,'a reviews agent that asks happy customers and drafts every reply'],
    ['Social posts','Social',2,0,'a social agent that turns finished jobs into a weekly post queue'],
    ['Weekly reports','Reports',2,0,'a reporting agent that drops a one-page numbers digest in your inbox every Monday'],
    ['Inventory and reorders','Inventory',1,0,'an inventory agent that warns you before you run out and drafts the order'],
    ['PDFs and paperwork','Docs',2,0,'a document agent that reads PDFs and turns them into clean, searchable rows'],
    ['Missed calls and texts','Phone',3,0,'a receptionist agent that answers missed calls by text and books the callback']
  ];
  var html='';
  T.forEach(function(t,i){
    html+='<div class="ag-task'+(t[3]?' on':'')+'"><input type="checkbox" id="agT'+i+'"'+(t[3]?' checked':'')+'><label for="agT'+i+'">'+t[0]+'</label>'+
      '<input type="number" id="agH'+i+'" min="0" max="60" step="0.5" value="'+t[2]+'" aria-label="Hours per week on '+t[0].toLowerCase()+'"'+(t[3]?'':' disabled')+'></div>';
  });
  list.innerHTML=html;
  var rate=document.getElementById('agRate'),pct=document.getElementById('agPct'),pctV=document.getElementById('agPctV');
  var oH=document.getElementById('agHrs'),oV=document.getElementById('agVal'),oF=document.getElementById('agFirst'),svg=document.getElementById('agChart'),tb=document.getElementById('agTable');
  var NS='http://www.w3.org/2000/svg',WK=4.33,state={};
  function el(n,a,txt){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;return e;}
  function num(v,d){v=parseFloat(v);return isFinite(v)&&v>=0?v:d;}
  function fmt(n){return Math.round(n).toLocaleString('en-US');}
  function calc(){
    var p=num(pct.value,60)/100,r=num(rate.value,0),rows=[],saved=0;
    pctV.textContent=Math.round(p*100)+'%';
    T.forEach(function(t,i){
      var cb=document.getElementById('agT'+i),h=document.getElementById('agH'+i);
      h.disabled=!cb.checked;cb.parentNode.classList.toggle('on',cb.checked);
      if(!cb.checked)return;var wk=Math.min(num(h.value,0),60),now=wk*WK,ag=now*(1-p);
      saved+=now-ag;rows.push({t:t,wk:wk,now:now,ag:ag});
    });
    oH.textContent=fmt(saved);oV.textContent='$'+fmt(saved*r);
    var best=rows.slice().sort(function(a,b){return b.now-a.now;})[0];
    if(best&&best.now>0){
      oF.innerHTML='';var b=document.createElement('b');b.textContent='Your first agent: ';oF.appendChild(b);
      oF.appendChild(document.createTextNode('start with '+best.t[4]+'. On its own that is about '+fmt(best.now-best.ag)+' hours a month back. Build one, prove it, then add the next.'));
    }else oF.innerHTML='<b>Your first agent:</b> tick a task and give it some hours to see a recommendation.';
    draw(rows);
    tb.innerHTML='';rows.forEach(function(x){var tr=document.createElement('tr');[x.t[0],x.now.toFixed(1),x.ag.toFixed(1)].forEach(function(v){var td=document.createElement('td');td.textContent=v;tr.appendChild(td);});tb.appendChild(tr);});
    state={rows:rows,saved:saved,rate:r,p:p,best:best};
  }
  function draw(rows){
    while(svg.lastChild&&svg.lastChild.nodeName!=='title')svg.removeChild(svg.lastChild);
    var VW=Math.round(Math.max(300,Math.min(560,svg.clientWidth||520))),L=78,R=VW-34,top=12,rh=36,n=rows.length,h=Math.max(120,top+n*rh+44);
    svg.setAttribute('viewBox','0 0 '+VW+' '+h);
    if(!n){svg.appendChild(el('text',{x:VW/2,y:64,'text-anchor':'middle'},'Tick a task to draw your chart'));return;}
    var mx=0;rows.forEach(function(x){mx=Math.max(mx,x.now);});mx=mx>0?mx:1;
    var step=mx<=10?2:mx<=40?10:mx<=100?20:mx<=200?50:100,max=Math.ceil(mx/step)*step;
    var base=top+n*rh;
    for(var v=0;v<=max;v+=step){var x=L+(R-L)*v/max;svg.appendChild(el('line',{x1:x,y1:top-4,x2:x,y2:base,'class':'gl'}));svg.appendChild(el('text',{x:x,y:base+16,'text-anchor':'middle'},String(v)));}
    svg.appendChild(el('text',{x:(L+R)/2,y:base+34,'text-anchor':'middle'},'Hours per month'));
    rows.forEach(function(x,i){
      var y=top+i*rh+4,w1=Math.max(2,(R-L)*x.now/max),w2=Math.max(2,(R-L)*x.ag/max);
      svg.appendChild(el('text',{x:L-8,y:y+16,'text-anchor':'end','class':'lbl'},x.t[1]));
      var a=el('rect',{x:L,y:y,width:w1,height:12,rx:3,fill:'#2563EB'});a.appendChild(el('title',{},x.t[0]+': '+x.now.toFixed(1)+' hours/month now'));svg.appendChild(a);
      var b=el('rect',{x:L,y:y+14,width:w2,height:12,rx:3,fill:'#EA580C'});b.appendChild(el('title',{},x.t[0]+': '+x.ag.toFixed(1)+' hours/month with an agent'));svg.appendChild(b);
      svg.appendChild(el('text',{x:L+w1+5,y:y+10,'class':'v'},x.now.toFixed(0)));
      svg.appendChild(el('text',{x:L+w2+5,y:y+24,'class':'v'},x.ag.toFixed(0)));
    });
  }
  document.getElementById('agCalc').addEventListener('input',calc);
  document.getElementById('agCalc').addEventListener('change',calc);
  calc();
  var rz=0;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(calc,150);});
  var send=document.getElementById('agSend');
  send.addEventListener('click',function(){
    calc();var s=state,ta=document.getElementById('af-tasks');if(!ta)return;
    var lines=['From the Build-your-agent picker:'];
    if(!s.rows.length)lines.push('- (no tasks ticked yet)');
    s.rows.forEach(function(x){lines.push('- '+x.t[0]+': '+x.wk+' h/week');});
    lines.push('My time is worth about $'+fmt(s.rate)+'/hour. At '+Math.round(s.p*100)+'% handled: about '+fmt(s.saved)+' hours/month back (about $'+fmt(s.saved*s.rate)+'/month).');
    if(s.best)lines.push('Suggested first agent: '+s.best.t[0]+'.');
    ta.value=lines.join('\n');
    ta.classList.remove('flash');void ta.offsetWidth;ta.classList.add('flash');
    var a=document.getElementById('audit');if(a)a.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
    var nm=document.getElementById('af-name');if(nm)setTimeout(function(){nm.focus({preventScroll:true});},RM?0:500);
  });
})();

/* ---------- audit form: on-page success state (sending is handled by /eta-site.js) ---------- */
(function(){
  var f=document.getElementById('agForm'),ok=document.getElementById('agOk');if(!f||!ok||!('MutationObserver' in window))return;
  new MutationObserver(function(){
    var m=f.querySelector('.eta-msg[data-kind="ok"]');
    if(m){f.hidden=true;ok.hidden=false;ok.focus();}
  }).observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:['data-kind']});
})();
})();
