
(function(){
  var hdr=document.getElementById('hdr')||document.createElement('div');
  var burger=document.getElementById('burger')||document.createElement('div');
  var mobNav=document.getElementById('mobNav')||document.createElement('div');

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
  var dlg=document.getElementById('vsDlg'),vid=document.getElementById('vsVid'),ttl=document.getElementById('vsDlgT');
  if(!dlg||!vid) return;
  var base='/video-seo/videos/';
  function close(){try{vid.pause();}catch(e){} vid.removeAttribute('src'); vid.load(); if(dlg.open) dlg.close();}
  document.querySelectorAll('.vs-play').forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-v');
      vid.src=base+v+'.mp4'; vid.poster=base+v+'.jpg'; ttl.textContent='“'+b.getAttribute('data-t')+'”';
      if(typeof dlg.showModal==='function') dlg.showModal(); else dlg.setAttribute('open','');
      var p=vid.play(); if(p&&p.catch) p.catch(function(){});
      try{gtag('event','video_start',{video_title:b.getAttribute('data-t')});}catch(e){}
    });
  });
  document.getElementById('vsX').addEventListener('click',close);
  document.getElementById('vsDlgCta').addEventListener('click',close);
  dlg.addEventListener('click',function(e){if(e.target===dlg) close();});
  dlg.addEventListener('close',function(){try{vid.pause();}catch(e){}});
})();

(function(){
  var boxes=[].slice.call(document.querySelectorAll('.vs-checks input'));
  if(!boxes.length) return;
  var arc=document.getElementById('vsArc'),sc=document.getElementById('vsScore'),gr=document.getElementById('vsGrade'),fx=document.getElementById('vsFixes');
  var C=326.7, touched=false;
  function calc(){
    var tot=0,got=0,miss=[];
    boxes.forEach(function(b){var w=+b.getAttribute('data-w');tot+=w;if(b.checked)got+=w;else miss.push({w:w,f:b.getAttribute('data-fix')});});
    var s=Math.round(got/tot*100);
    sc.textContent=s; arc.style.strokeDashoffset=String(C*(1-s/100));
    arc.style.stroke=s>=80?'#16A34A':(s>=50?'#F59E0B':'#F97316');
    var g;
    if(!touched) g='Tick what is true to see your score.';
    else if(s>=85) g='Strong. Your video is set up to be found. The next win is making more of them.';
    else if(s>=60) g='Close. A few fixes would put this video in front of a lot more people.';
    else if(s>=30) g='Leaking. People are searching for this, and your video is not set up to catch them.';
    else g='Invisible to search right now. The good news: every one of these is fixable.';
    gr.textContent=g;
    miss.sort(function(a,b){return b.w-a.w;});
    fx.innerHTML='';
    if(touched) miss.slice(0,3).forEach(function(m){var li=document.createElement('li');li.textContent=m.f;fx.appendChild(li);});
    window.__etaToolSummary='Video SEO checkup score '+s+'/100; top fixes: '+miss.slice(0,3).map(function(m){return m.f.split('.')[0];}).join(' | ');
  }
  boxes.forEach(function(b){b.addEventListener('change',function(){touched=true;calc();});});
  calc();
})();

(function(){
  var form=document.getElementById('vsf');
  if(!form) return;
  var btn=document.getElementById('vsfBtn'), msg=document.getElementById('vsfMsg'), load=document.getElementById('vsfLoad');
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
    var name=val('vsf-name'), co=val('vsf-co'), ph=val('vsf-phone'), email=val('vsf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(co)){show('err','Please enter your business name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}
    var to; try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }
    var data={Name:name,Company:co,Phone:ph,Email:email,Website:val('vsf-site').slice(0,200),Notes:val('vsf-msg').slice(0,1500),ToolResult:(window.__etaToolSummary||'').slice(0,400),
      _subject:'Video SEO plan request — eyetoad.com',_template:'table',_captcha:'false'};
    btn.disabled=true; btn.textContent='Sending...'; show('warn','Sending your request...');
    fetch('https://clients.eyetoad.com/lead/send.php#to='+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
    .then(function(x){
      if(x.ok&&x.j&&(x.j.success==='true'||x.j.success===true)){sent=true;btn.textContent='Sent';show('ok','<b>Got it.</b> We will review it and call you back within one business day. Need it sooner? Call <a href="tel:18004818638">1-800-481-8638</a>.');}
      else{btn.disabled=false;btn.textContent='Send my request';show('warn','We could not confirm delivery. Please call <a href="tel:18004818638">1-800-481-8638</a> or text <a href="sms:+17202496588">720-249-6588</a> and we will take it from there.');}
    })
    .catch(function(){btn.disabled=false;btn.textContent='Send my request';show('err','Your request did not go through. Call <a href="tel:18004818638">1-800-481-8638</a> and we will take it by phone.');});
  });
})();


