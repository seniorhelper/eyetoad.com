
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

  function deferHero(){
    var v=document.getElementById('heroVideo');
    if(!v)return;
    var c=navigator.connection||{};
    if(window.innerWidth<900)return;
    if(c.saveData===true)return;
    if(c.effectiveType&&/2g/.test(c.effectiveType))return;
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    v.src=v.getAttribute('data-src');
    v.load();
    v.addEventListener('canplay',function(){v.classList.add('ready');v.play().catch(function(){});},{once:true});
  }
  if('requestIdleCallback' in window){requestIdleCallback(deferHero,{timeout:2500});}
  else{window.addEventListener('load',function(){setTimeout(deferHero,900);});}

  window.bindEmails=function(){
    document.querySelectorAll('a.eml').forEach(function(a){
      if(a.dataset.bound)return; a.dataset.bound='1';
      a.href='mailto:'+a.getAttribute('data-u')+String.fromCharCode(64)+a.getAttribute('data-d');
    });
  };
  window.bindEmails();

})();

function etaTo(form){
  try{
    return atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y'));
  }catch(e){ return ''; }
}
(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  function buildAction(form,ajax){
    var to=etaTo(form);
    return (ajax?AJAX:PLAIN)+to;
  }
  function serialize(form){
    var out={},els=form.elements,i,el;
    for(i=0;i<els.length;i++){
      el=els[i];
      if(!el.name||el.disabled||el.type==='submit')continue;
      out[el.name]=el.value;
    }
    return out;
  }
  function toParams(o){
    var a=[],k;
    for(k in o){if(Object.prototype.hasOwnProperty.call(o,k))a.push(encodeURIComponent(k)+'='+encodeURIComponent(o[k]));}
    return a.join('&');
  }
  function postViaIframe(form,data){
    try{
      var name='fs_sink_'+Date.now();
      var ifr=document.createElement('iframe');
      ifr.name=name;ifr.style.display='none';
      document.body.appendChild(ifr);
      var f=document.createElement('form');
      f.method='POST';f.action=buildAction(form,false);f.target=name;f.style.display='none';
      for(var k in data){
        if(!Object.prototype.hasOwnProperty.call(data,k))continue;
        var i=document.createElement('input');
        i.type='hidden';i.name=k;i.value=data[k];
        f.appendChild(i);
      }
      document.body.appendChild(f);
      f.submit();
      setTimeout(function(){try{f.remove();ifr.remove();}catch(e){}},20000);
      return true;
    }catch(e){return false;}
  }
  function send(form,data){
    if(!window.fetch){
      return Promise.resolve(postViaIframe(form,data)?'unsure':'failed');
    }
    return fetch(buildAction(form,true),{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
      body:toParams(data)
    }).then(function(r){
      if(r.ok)return 'sent';
      return postViaIframe(form,data)?'unsure':'failed';
    }).catch(function(){
      return postViaIframe(form,data)?'unsure':'failed';
    });
  }

  var SPAM=/\b(viagra|casino|crypto|bitcoin|loan|SEO guarantee|buy followers|cheap traffic|make money fast|click here|free money)\b/i;
  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badPhone(v){return v.replace(/\D/g,'').length<10;}
  function badEmail(v){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}

  var form=document.getElementById('hero-lead-form');
  if(form){
    var lt=document.getElementById('_loadtime');
    var pu=document.getElementById('hero-page-url');
    var box=document.getElementById('hero-form-msg');
    var btn=document.getElementById('hero-fsub');
    var last=0;
    lt.value=Date.now();
    pu.value=location.href;

    function show(kind,html){
      box.className='fmsg show fmsg-'+kind;
      box.innerHTML=html;
      box.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    function reset(){box.className='fmsg';box.innerHTML='';}

    form.addEventListener('submit',function(e){
      e.preventDefault();
      reset();

      if(document.getElementById('_honey').value!=='')return;
      if(document.getElementById('website_url').value!=='')return;

      if(Date.now()-parseInt(lt.value||'0',10)<4000){
        show('err','Please take a moment to fill out the form.');return;
      }
      if(last&&(Date.now()-last)<60000){
        show('err','Please wait a moment before submitting again.');return;
      }
      var name=document.getElementById('hero-name').value.trim();
      if(badName(name)){show('err','Please enter a valid name.');return;}
      var phone=document.getElementById('hero-phone').value;
      if(badPhone(phone)){show('err','Please enter a valid phone number with area code.');return;}
      var email=document.getElementById('hero-email').value.trim();
      if(email&&badEmail(email)){show('err','Please check that email address.');return;}
      if(SPAM.test(document.getElementById('hero-message').value))return;

      last=Date.now();
      btn.disabled=true;
      btn.textContent='Sending…';

      send(form,serialize(form)).then(function(state){
        if(state==='sent'){
          form.style.display='none';
          show('ok','<strong>Sent.</strong> Thanks '+name.split(' ')[0]+" — we'll be in touch within one business day. Need it sooner? Call <a href=\"tel:18004818638\">"+PHONE+'</a>.');
          return;
        }
        if(state==='unsure'){
          form.style.display='none';
          show('warn','<strong>Sent.</strong> We could not get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a> and mention the website form. We will find it.');
          return;
        }
        btn.disabled=false;
        btn.textContent='Get Free SEO Strategy →';
        if(window.bindEmails)setTimeout(window.bindEmails,0);
        show('err','That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a> or email <a class="eml" data-u="info" data-d="eyetoad.com" href="#">info&#64;eyetoad&#46;com</a>.');
      });
    });
  }

  var mForm=document.getElementById('mini-cta-form');
  if(mForm){
    var mlt=document.getElementById('_mini_loadtime');
    var mpu=document.getElementById('mini-page-url');
    var mBox=document.getElementById('mini-msg');
    var mBtn=document.getElementById('mini-submit');
    var mLast=0;
    mlt.value=Date.now();
    mpu.value=location.href;

    function mShow(kind,html){
      mBox.className='fcta-mini-msg show '+kind;
      mBox.innerHTML=html;
    }

    mForm.addEventListener('submit',function(e){
      e.preventDefault();
      mBox.className='fcta-mini-msg';

      if(document.getElementById('_honey_mini').value!=='')return;
      if(document.getElementById('_contact_email_mini').value!=='')return;

      if(Date.now()-parseInt(mlt.value||'0',10)<4000){
        mShow('err','Please take a moment before submitting.');return;
      }
      if(mLast&&(Date.now()-mLast)<60000){
        mShow('err','Please wait before submitting again.');return;
      }
      var name=document.getElementById('mini-name').value.trim();
      if(badName(name)){mShow('err','Please enter a valid name.');return;}
      if(badPhone(document.getElementById('mini-phone').value)){
        mShow('err','Please enter a valid phone number with area code.');return;
      }

      mLast=Date.now();
      mBtn.disabled=true;
      mBtn.textContent='Sending…';

      send(mForm,serialize(mForm)).then(function(state){
        if(state==='sent'){
          mForm.querySelector('.fcta-mini-row').style.display='none';
          mShow('ok','<strong>Got it.</strong> We will call you within one business day.');
          return;
        }
        if(state==='unsure'){
          mForm.querySelector('.fcta-mini-row').style.display='none';
          mShow('warn','<strong>Sent</strong> — but we could not confirm delivery from here. If you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a>.');
          return;
        }
        mBtn.disabled=false;
        mBtn.textContent='Call Me →';
        mShow('err','That did not go through. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
      });
    });
  }
})();

(function(){
  var canvas=document.getElementById('scratch-canvas');
  if(!canvas)return;
  var prizes=[
    {emoji:'🏆',text:'15% Off SEO + AIO Optimization for the Life of Your Campaign',fine:'New clients · cannot be combined'},
    {emoji:'⚡',text:'2 Months FREE VIP Marketing Subscription',fine:'$139.98 value · new members'},
    {emoji:'🎨',text:'$100 Off a Custom Logo Design',fine:'One per business'},
    {emoji:'🎬',text:'$300 Off a Viral Video Production',fine:'New video projects'},
    {emoji:'🎟️',text:'VIP Member Pricing on Your First Campaign — Membership Fee Waived',fine:'New clients · first 3 months'},
    {emoji:'📞',text:'FREE 30-Minute Business Growth Strategy Session',fine:'No obligation'}
  ];
  var prizeBox=document.getElementById('scratch-prize');
  var hint=document.getElementById('scratch-hint');
  var claim=document.getElementById('scratch-claim');
  var resetBtn=document.getElementById('scratch-reset');
  var skipBtn=document.getElementById('scratch-skip');
  var ctx,scratching=false,revealed=false,booted=false;

  function pickPrize(){
    var p=prizes[Math.floor(Math.random()*prizes.length)];
    document.getElementById('sp-emoji').textContent=p.emoji;
    document.getElementById('sp-text').textContent=p.text;
    document.getElementById('sp-fine').textContent=p.fine;
  }
  function sizeCanvas(){
    var rect=prizeBox.getBoundingClientRect();
    canvas.width=rect.width;canvas.height=rect.height;
  }
  function paintCover(){
    ctx=canvas.getContext('2d');
    var g=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    g.addColorStop(0,'#c0c0c8');g.addColorStop(.5,'#e6e6ee');g.addColorStop(1,'#b8b8c2');
    ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='rgba(120,120,135,.5)';
    ctx.font="bold 15px Inter, sans-serif";ctx.textAlign='center';
    ctx.fillText('★ ★ ★  SCRATCH TO REVEAL  ★ ★ ★',canvas.width/2,canvas.height/2);
    ctx.globalCompositeOperation='destination-out';
  }
  function pos(e){
    var rect=canvas.getBoundingClientRect();
    return {x:(e.touches?e.touches[0].clientX:e.clientX)-rect.left,
            y:(e.touches?e.touches[0].clientY:e.clientY)-rect.top};
  }
  function scratch(e){
    if(!scratching||revealed)return;
    var p=pos(e);
    ctx.beginPath();ctx.arc(p.x,p.y,24,0,Math.PI*2);ctx.fill();
    if(hint)hint.style.opacity='0';
    checkReveal();
  }
  function checkReveal(){
    var data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    var cleared=0;
    for(var i=3;i<data.length;i+=4*40){if(data[i]===0)cleared++;}
    var total=data.length/(4*40);
    if(cleared/total>0.45){doReveal();}
  }
  function doReveal(){
    revealed=true;
    canvas.style.transition='opacity .4s';canvas.style.opacity='0';
    setTimeout(function(){canvas.style.display='none';},420);
    if(hint)hint.style.display='none';
    if(skipBtn)skipBtn.style.display='none';
    claim.classList.add('show');
  }
  function reset(){
    revealed=false;scratching=false;pickPrize();
    canvas.style.display='block';canvas.style.opacity='1';
    claim.classList.remove('show');
    if(hint){hint.style.display='block';hint.style.opacity='1';}
    if(skipBtn)skipBtn.style.display='block';
    sizeCanvas();paintCover();
  }
  function boot(){
    if(booted)return;booted=true;
    pickPrize();sizeCanvas();paintCover();
    window.addEventListener('resize',function(){if(!revealed){sizeCanvas();paintCover();}});
    canvas.addEventListener('mousedown',function(e){scratching=true;scratch(e);});
    canvas.addEventListener('mousemove',scratch);
    window.addEventListener('mouseup',function(){scratching=false;});
    canvas.addEventListener('touchstart',function(e){scratching=true;scratch(e);e.preventDefault();},{passive:false});
    canvas.addEventListener('touchmove',function(e){scratch(e);e.preventDefault();},{passive:false});
    canvas.addEventListener('touchend',function(){scratching=false;});
    resetBtn.addEventListener('click',reset);
    if(skipBtn)skipBtn.addEventListener('click',function(){if(!revealed)doReveal();});
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){boot();io.disconnect();}});
    },{rootMargin:'300px'});
    io.observe(canvas);
  }else{window.addEventListener('load',boot);}
})();


(function(){
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
  var ask=document.getElementById('boAsk');
  if(!ask)return;
  var think=document.getElementById('boThink'), ans=document.getElementById('boAnswer');
  var Q=[
   "Who's the best roofer in Boise?",
   "Top rated dentist near Meridian, Idaho",
   "Who should I call for AC repair in Nampa?",
   "Best HVAC company in the Treasure Valley",
   "Find me a good plumber in Eagle, Idaho",
   "Reliable electrician near Kuna",
   "Best vet in Boise for a new puppy",
   "Who does cleanroom electrical work in Boise?"
  ];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){ ask.textContent=Q[0]; think.classList.remove('on'); ans.classList.add('on'); return; }
  var qi=0, ci=0, timer;
  function type(){
    var q=Q[qi];
    if(ci<=q.length){ ask.textContent=q.slice(0,ci); ci++; timer=setTimeout(type, 42); return; }
    timer=setTimeout(thinking, 620);
  }
  function thinking(){
    think.classList.add('on');
    timer=setTimeout(function(){
      think.classList.remove('on');
      ans.classList.add('on');
      timer=setTimeout(reset, 3400);
    }, 1150);
  }
  function reset(){
    ans.classList.remove('on');
    timer=setTimeout(function(){
      qi=(qi+1)%Q.length; ci=0; ask.textContent='';
      timer=setTimeout(type, 380);
    }, 420);
  }
  // only run while the widget is actually on screen
  var box=ask.closest('.bo-sim'), running=false;
  function start(){ if(running)return; running=true; type(); }
  function stop(){ running=false; clearTimeout(timer); }
  if('IntersectionObserver' in window && box){
    new IntersectionObserver(function(es){
      es.forEach(function(e){ e.isIntersecting ? start() : stop(); });
    },{threshold:.25}).observe(box);
  } else { start(); }
})();

(function(){
  var f=document.getElementById('bo-top-form');
  if(!f)return;
  var lt=document.getElementById('bo-top-lt'); lt.value=Date.now();
  var box=document.getElementById('bo-top-msg'), btn=document.getElementById('bo-top-btn');
  function show(k,h){box.className='bo-msg show '+k;box.innerHTML=h;}
  f.addEventListener('submit',function(e){
    e.preventDefault(); box.className='bo-msg';
    if(f.elements['_honey'].value!=='')return;
    if(f.elements['company_url'].value!=='')return;
    if(Date.now()-parseInt(lt.value||'0',10)<3500){show('err','Please take a moment to fill this out.');return;}
    if(f.elements['name'].value.trim().length<2){show('err','Please enter a valid name.');return;}
    if(f.elements['website'].value.trim().length<4){show('err','Please enter your website address.');return;}
    if(f.elements['phone'].value.replace(/\D/g,'').length<10){show('err','Please enter a valid phone number with area code.');return;}
    btn.disabled=true; btn.textContent='Sending...';
    var data={}; Array.prototype.forEach.call(f.elements,function(el){if(el.name&&el.type!=='submit')data[el.name]=el.value;});
    var to=etaTo(f), done=false;
    function finish(state){
      if(done)return; done=true;
      if(state==='sent'){f.style.display='none';show('ok','<strong>Sent.</strong> We will come back to you within one business day.');return;}
      if(state==='unsure'){f.style.display='none';show('warn','<strong>Sent</strong> &mdash; but we could not confirm delivery from here. If you have not heard back within one business day, call 1-800-481-8638.');return;}
      btn.disabled=false;btn.textContent='Get My Free Audit';
      show('err','That did not go through. Please call 1-800-481-8638.');
    }
    var guard=setTimeout(function(){finish('unsure');},8000);
    try{
      fetch('https://formsubmit.co/ajax/'+to,{method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(j){clearTimeout(guard);finish(j&&(j.success===true||j.success==='true')?'sent':'unsure');})
      .catch(function(){clearTimeout(guard);finish('unsure');});
    }catch(ex){clearTimeout(guard);finish('failed');}
  });
})();

(function(){
  var form=document.getElementById('loc-form');
  if(!form)return;
  document.getElementById('_loadtime_loc').value=Date.now();
  var btn=document.getElementById('btn-loc');
  var err=document.getElementById('err-loc');
  var last=0;
  function show(m){err.textContent=m;err.style.display='block';}

  form.addEventListener('submit',function(e){
    err.style.display='none';
    if(document.getElementById('_honey_loc').value!==''){e.preventDefault();return;}
    if(document.getElementById('_decoy_loc').value!==''){e.preventDefault();return;}

    var elapsed=Date.now()-parseInt(document.getElementById('_loadtime_loc').value||'0',10);
    if(elapsed<4000){e.preventDefault();show('Please take a moment to fill out the form.');return;}

    var now=Date.now();
    if(last&&(now-last)<60000){e.preventDefault();show('Please wait a moment before submitting again.');return;}

    var name=document.getElementById('lf-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();show('Please enter a valid name.');return;}

    var site=document.getElementById('lf-website').value.trim();
    if(site.length<4){e.preventDefault();show('Please enter your website address.');return;}

    var phone=document.getElementById('lf-phone').value.replace(/\D/g,'');
    if(phone.length<10){e.preventDefault();show('Please enter a valid phone number (10+ digits).');return;}

    var email=document.getElementById('lf-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){e.preventDefault();show('Please enter a valid email address.');return;}

    form.action=['https:','','formsubmit.co',etaTo(form)].join('/');
    last=now;
    btn.disabled=true;
    btn.textContent='Sending...';
  });
})();


