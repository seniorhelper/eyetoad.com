
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
  var g=document.getElementById('gb-grid'); if(!g) return;
  var R=['r','a','a','r','r','a','g','g','a','r','a','g','y','g','a','r','a','g','a','r','r','a','a','r','r'];
  var reduce=false; try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  var n={g:[1,2,3],a:[4,5,6,7,8,9],r:[11,14,17,20]};
  R.forEach(function(c,i){var d=document.createElement('div');
    if(c==='y'){d.className='gb-cell you';d.textContent='YOU';}
    else{d.className='gb-cell '+c;var arr=n[c];d.textContent=arr[(i*7)%arr.length];}
    d.style.animationDelay=reduce?'0s':(i*.04)+'s';g.appendChild(d);});
})();
(function(){
  var box=document.getElementById('gb-checks'); if(!box) return;
  var cbs=[].slice.call(box.querySelectorAll('input[type=checkbox]'));
  var val=document.getElementById('gb-val'),grade=document.getElementById('gb-grade'),score=document.getElementById('gb-score'),read=document.getElementById('gb-read'),gaps=document.getElementById('gb-gaps'),wait=document.getElementById('gb-wait');
  function fmt(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function calc(){
    var total=0,got=0,missing=[];
    cbs.forEach(function(c){var w=+c.getAttribute('data-w');total+=w;if(c.checked)got+=w;else missing.push({w:w,k:c.getAttribute('data-k')});});
    var pct=Math.round(got/total*100);
    var letter=pct>=90?'A':pct>=75?'B':pct>=55?'C':pct>=35?'D':'F';
    var col=pct>=75?'#12B76A':pct>=55?'#F79009':'#D92D20';
    grade.textContent=letter;grade.style.background=col;score.innerHTML=pct+'<small>/ 100</small>';
    var any=cbs.some(function(c){return c.checked;});
    if(!any){read.textContent='Check what applies and the grade updates as you go.';gaps.innerHTML='';wait.hidden=true;window.__etaToolSummary='';return;}
    var msg=pct>=90?'This is a well-run profile. The remaining gaps are small, and the work now is reviews, content and the website behind the profile. Rank still needs measuring across your area.':
      pct>=75?'Solid foundation with real gaps. Profiles at this level are usually in the pack near the office and missing it a mile out. The three items below are where the rank is.':
      pct>=55?'Half built. Google is ranking you on an incomplete picture of what you do, and a competitor with a finished profile is taking calls that should be yours.':
      'This profile is running on defaults. The good news: profiles at this level move the fastest once the foundation is rebuilt, often within 30 to 60 days.';
    read.textContent=msg;
    missing.sort(function(a,b){return b.w-a.w;});
    var top=missing.slice(0,3);
    gaps.innerHTML=top.length?'<b style="font-size:.86rem;letter-spacing:.08em;text-transform:uppercase;color:#1A5FB4">Fix first</b><ol style="margin:6px 0 0 20px;line-height:1.7;color:var(--ink3)">'+top.map(function(m){return '<li>'+m.k+'</li>';}).join('')+'</ol>':'';
    var v=parseFloat(val.value);
    if(v>0&&pct<90){var weekly=1;var yr=v*weekly*52;wait.hidden=false;wait.innerHTML='<b>What waiting costs:</b> if a finished profile produced just one more customer a week at your '+fmt(v)+' average, that is <b>'+fmt(yr)+' a year</b> going to whoever is in the pack instead of you. That is your number, not ours.';}
    else wait.hidden=true;
    window.__etaToolSummary='GBP grade '+letter+' ('+pct+'/100). Top gaps: '+top.map(function(m){return m.k;}).join('; ');
  }
  cbs.forEach(function(c){c.addEventListener('change',calc);}); val.addEventListener('input',calc); calc();
})();

(function(){
  var form=document.getElementById('gbf');
  if(!form) return;
  var btn=document.getElementById('gbfBtn'), msg=document.getElementById('gbfMsg'), load=document.getElementById('gbfLoad');
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
    var name=val('gbf-name'), co=val('gbf-co'), ph=val('gbf-phone'), email=val('gbf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(co)){show('err','Please enter your company name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}
    var to; try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }
    var data={Name:name,Company:co,Phone:ph,Email:email,Website:val('gbf-site').slice(0,200),Notes:val('gbf-msg').slice(0,1500),ToolResult:(window.__etaToolSummary||'').slice(0,400),
      _subject:'Google Business Profile management request — eyetoad.com',_template:'table',_captcha:'false'};
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


