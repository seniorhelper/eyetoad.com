
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');

  function measureHeader(){
    var r=hdr.getBoundingClientRect();
    mobNav.style.top=Math.max(0,r.bottom)+'px';
  }
  var _sc=null;
  window.addEventListener('scroll',function(){
    var s=window.scrollY>30; if(s===_sc) return; _sc=s;
    hdr.classList.toggle('scrolled',s);
    requestAnimationFrame(measureHeader);
  },{passive:true});
  window.addEventListener('resize',measureHeader);
  measureHeader();

  burger.addEventListener('click',function(){
    measureHeader();
    var o=mobNav.classList.toggle('open');
    burger.classList.toggle('open',o);
    burger.setAttribute('aria-expanded',o);
    document.body.classList.toggle('nav-open',o);
    document.body.style.overflow=o?'hidden':'';
    if(o)mobNav.scrollTop=0;
  });

  var mobClose=document.getElementById('mobClose');
  if(mobClose)mobClose.addEventListener('click',function(){burger.click();});
  mobNav.querySelectorAll('.mob-acc').forEach(function(btn){
    btn.addEventListener('click',function(){
      var grp=document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen=btn.getAttribute('aria-expanded')==='true';
      mobNav.querySelectorAll('.mob-acc').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        var g=document.getElementById(b.getAttribute('aria-controls'));
        if(g)g.classList.remove('open');
      });
      if(!isOpen){btn.setAttribute('aria-expanded','true');if(grp)grp.classList.add('open');}
    });
  });

  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);
      document.body.classList.remove('nav-open');
      document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });

  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(el){
        el.classList.remove('open');
        el.querySelector('.faq-q').setAttribute('aria-expanded',false);
      });
      if(!wasOpen){item.classList.add('open');btn.setAttribute('aria-expanded',true);}
    });
  });
})();


(function(){
  var L=document.getElementById('fr-pin-layer'); if(!L) return;
  var P=[[40,70,'g'],[90,140,'a'],[150,60,'g'],[190,200,'r'],[230,110,'a'],[270,40,'g'],[300,170,'r'],[340,90,'g'],[380,210,'r'],[120,230,'a'],[360,30,'a'],[60,200,'g']];
  var C={g:'#12B76A',a:'#F79009',r:'#D92D20'};
  var reduce=false; try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  P.forEach(function(p,i){var g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','fr-pin');g.setAttribute('transform','translate('+p[0]+' '+p[1]+')');g.style.animationDelay=reduce?'0s':(i*.08)+'s';
    g.innerHTML='<path d="M0 0c-9-13-14-19-14-28a14 14 0 0 1 28 0c0 9-5 15-14 28z" fill="'+C[p[2]]+'"/><circle cx="0" cy="-28" r="5.5" fill="#fff"/>';L.appendChild(g);});
})();
(function(){
  var n=document.getElementById('fr-n'); if(!n) return;
  var rev=document.getElementById('fr-rev'),inv=document.getElementById('fr-inv'),read=document.getElementById('fr-read'),plan=document.getElementById('fr-plan'),wait=document.getElementById('fr-wait');
  var S=[1,2,3,4].map(function(i){return {r:document.getElementById('fr-p'+i),o:document.getElementById('fr-o'+i),b:document.getElementById('fr-b'+i),e:document.getElementById('fr-e'+i)};});
  var names=['Unique location pages','Brand-managed Google profiles','Review velocity','Consistent name, address and phone'];
  var why=['Template pages are the doorway-page pattern Google names. Each location needs a page only it could have.','Profiles move map rank fastest. The brand takes ownership and every location is rebuilt to one playbook.','Reviews are the prominence signal that keeps a location in the pack. One system, every location.','Mismatched listings make Google doubt which address is real. Audit and correct every citation.'];
  function fmt(x){return '$'+Math.round(x).toLocaleString('en-US');}
  function calc(){
    var N=Math.max(2,Math.min(2000,parseInt(n.value,10)||2));
    var pct=S.map(function(s){return parseInt(s.r.value,10);});
    S.forEach(function(s,i){s.o.textContent=pct[i];s.b.style.width=pct[i]+'%';s.b.style.background=pct[i]>=70?'#12B76A':pct[i]>=40?'#F79009':'#D92D20';s.e.textContent=Math.round(N*pct[i]/100)+' of '+N;});
    // expected number of locations missing >=2 foundations (independent approximation)
    var miss=pct.map(function(p){return 1-p/100;});
    var p0=1,p1=0; // prob miss 0 or exactly 1
    for(var i=0;i<4;i++)p0*=(1-miss[i]);
    for(var i=0;i<4;i++){var t=miss[i];for(var j=0;j<4;j++)if(j!==i)t*=(1-miss[j]);p1+=t;}
    var invisible=Math.round(N*(1-p0-p1));
    inv.innerHTML=invisible+'<small>of '+N+' locations structurally invisible</small>';
    read.textContent=invisible===0?'Your foundations are mostly in place. The work now is rank measurement per location and brand-level authority.':
      invisible<N*0.3?'A minority of locations are being left behind. They are usually the ones furthest from headquarters, and they are the easiest wins because the playbook already exists.':
      'Most of your locations are missing the basics Google ranks on. The good news is that this is the situation where a rollout by revenue produces the fastest visible change.';
    var order=pct.map(function(p,i){return {i:i,gap:(100-p)*[1.2,1.3,1,0.9][i]};}).sort(function(a,b){return b.gap-a.gap;});
    plan.innerHTML=order.map(function(o,k){return '<div><b>'+(k+1)+'</b><span><strong>'+names[o.i]+'</strong> ('+pct[o.i]+'% done). '+why[o.i]+'</span></div>';}).join('');
    var r=parseFloat(rev.value);
    if(r>0&&invisible>0){var m=invisible*r*0.1;wait.hidden=false;wait.innerHTML='<b>What waiting costs:</b> if the '+invisible+' invisible locations each recovered just 10% of their monthly revenue from local search, that is <b>'+fmt(m)+' a month</b>, or <b>'+fmt(m*12)+' a year</b>, at your own numbers. Every month the rollout waits is a month of that.';}
    else wait.hidden=true;
    window.__etaToolSummary='Locations '+N+'; invisible '+invisible+'; pages '+pct[0]+'%, profiles '+pct[1]+'%, reviews '+pct[2]+'%, NAP '+pct[3]+'%';
  }
  [n,rev].concat(S.map(function(s){return s.r;})).forEach(function(e){e.addEventListener('input',calc);}); calc();
})();

(function(){
  var form=document.getElementById('frf');
  if(!form) return;
  var btn=document.getElementById('frfBtn'), msg=document.getElementById('frfMsg'), load=document.getElementById('frfLoad');
  var t0=Date.now(); load.value=String(t0);
  var sent=false, touched=false;
  form.addEventListener('keydown',function(){touched=true;},{once:true});
  form.addEventListener('pointerdown',function(){touched=true;},{once:true});
  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(x){return x.length<2||/[<>{}|\\]|https?:\/\//i.test(x);}
  function badPhone(x){return x.replace(/\D/g,'').length<10;}
  function badEmail(x){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x);}
  form.addEventListener('submit',function(e){
    e.preventDefault(); if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(!touched) return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}
    var name=val('frf-name'), co=val('frf-co'), ph=val('frf-phone'), email=val('frf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(co)){show('err','Please enter your company name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}
    var to; try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }
    var data={Name:name,Company:co,Phone:ph,Email:email,Website:val('frf-site').slice(0,200),Notes:val('frf-msg').slice(0,1500),ToolResult:(window.__etaToolSummary||'').slice(0,400),
      _subject:'Franchise / multi-location SEO request — eyetoad.com',_template:'table',_captcha:'false'};
    btn.disabled=true; btn.textContent='Sending...'; show('warn','Sending your request...');
    fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
    .then(function(x){
      if(x.ok&&x.j&&(x.j.success==='true'||x.j.success===true)){sent=true;btn.textContent='Sent';show('ok','<b>Got it.</b> We will review it and call you back within one business day. Need it sooner? Call <a href="tel:18004818638">1-800-481-8638</a>.');}
      else{btn.disabled=false;btn.textContent='Send my request';show('warn','We could not confirm delivery. Please call <a href="tel:18004818638">1-800-481-8638</a> or text <a href="sms:+17202496588">720-249-6588</a> and we will take it from there.');}
    })
    .catch(function(){btn.disabled=false;btn.textContent='Send my request';show('err','Your request did not go through. Call <a href="tel:18004818638">1-800-481-8638</a> and we will take it by phone.');});
  });
})();


