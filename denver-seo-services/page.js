
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
  'use strict';
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.05});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')});
  }

  var bar=document.getElementById('stickybar'),
      audit=document.getElementById('audit'),
      fin=document.getElementById('start');
  if(bar&&'IntersectionObserver' in window){
    var hidden={a:false,f:false};
    var vis=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.target===audit)hidden.a=en.isIntersecting;
        if(en.target===fin)hidden.f=en.isIntersecting;
      });
      var past=(window.scrollY||0)>420;
      bar.classList.toggle('show',past&&!hidden.a&&!hidden.f);
    },{threshold:.12});
    if(audit)vis.observe(audit);
    if(fin)vis.observe(fin);
    window.addEventListener('scroll',function(){
      var past=(window.scrollY||0)>420;
      bar.classList.toggle('show',past&&!hidden.a&&!hidden.f);
    },{passive:true});
  }

  var form=document.getElementById('auditForm'),
      msg=document.getElementById('fmsg'),
      fbtn=document.getElementById('fbtn');
  var _to = (form ? form.getAttribute('data-u') : 'info') + '@' +
            (form ? form.getAttribute('data-d') : 'eyetoad.com');
  var ENDPOINT = 'https://formsubmit.co/' + _to;
  var AJAX = 'https://formsubmit.co/ajax/' + _to;

  function show(kind,html){
    if(!msg)return;
    msg.className='fmsg show fmsg-'+kind;
    msg.innerHTML=html;
    msg.scrollIntoView({behavior:'smooth',block:'center'});
  }

  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();

      var hp=form.querySelector('[name="_honey"]');
      if(hp&&hp.value){return;}

      var required=['Name','Business','Phone','Email'];
      for(var i=0;i<required.length;i++){
        var f=form.querySelector('[name="'+required[i]+'"]');
        if(!f||!f.value.trim()){
          show('err','Please fill in your '+required[i].toLowerCase()+' so we can send the audit back to you.');
          if(f)f.focus();
          return;
        }
      }
      var em=form.querySelector('[name="Email"]');
      if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())){
        show('err','That email address does not look right — please check it.');
        em.focus();return;
      }

      if(fbtn){fbtn.disabled=true;fbtn.textContent='Sending…';}
      var data=new FormData(form);

      try{
        form.setAttribute('action',ENDPOINT);
        form.setAttribute('target','af-sink');
        HTMLFormElement.prototype.submit.call(form);
      }catch(err){}

      fetch(AJAX,{method:'POST',body:data,headers:{'Accept':'application/json'}})
      .then(function(r){return r.json().catch(function(){return null})})
      .then(function(j){
        if(fbtn){fbtn.disabled=false;fbtn.textContent='Send My Free Audit Request';}
        if(j&&(j.success==='true'||j.success===true)){
          show('ok','<strong>Got it — your audit request is in.</strong> We reply within one business day. If it is urgent, call <a href="tel:18004818638">1-800-481-8638</a>.');
          form.reset();
        }else{
          show('warn','<strong>Your request was submitted.</strong> We could not get a delivery confirmation back, so if you do not hear from us within one business day, call <a href="tel:18004818638">1-800-481-8638</a> and we will pick it up straight away.');
          form.reset();
        }
      })
      .catch(function(){
        if(fbtn){fbtn.disabled=false;fbtn.textContent='Send My Free Audit Request';}
        show('warn','<strong>Your request was submitted, but we could not confirm it.</strong> The fastest route is a call: <a href="tel:18004818638">1-800-481-8638</a>,.');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(id.length<2)return;
      var t=document.querySelector(id);
      if(!t)return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',id);
    });
  });

})();

(function(){
  var stage = document.getElementById('pm-stage');
  if (!stage) return;
  var g = document.getElementById('pm-calls'),
      youN = document.getElementById('pm-you'),
      themN = document.getElementById('pm-them'),
      live = document.getElementById('pm-live');
  if (!g) return;

  var SRC = [[74,64],[128,70],[92,124],[136,122],[64,104],[110,52],[150,96],[82,142]];
  var TARGET = [318,196];
  var them = 0, you = 0, i = 0, timer = null;

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function drop(){
    var p = SRC[i % SRC.length]; i++;
    var el = document.createElementNS('http://www.w3.org/2000/svg','g');
    el.setAttribute('transform','translate(' + p[0] + ',' + p[1] + ')');
    el.setAttribute('class','call');
    el.style.setProperty('--dx', (TARGET[0]-p[0]) + 'px');
    el.style.setProperty('--dy', (TARGET[1]-p[1]) + 'px');
    el.innerHTML = '<circle r="8.5" fill="#fff" stroke="#CBD5E1" stroke-width="1.5"/>' +
                   '<text y="3.5" text-anchor="middle" font-size="9" font-weight="800" fill="#475467">?</text>';
    g.appendChild(el);
    void el.getBoundingClientRect();
    el.classList.add('go');
    setTimeout(function(){
      them++; if (themN) themN.textContent = them;
      if (youN) youN.textContent = you;
      try { el.remove(); } catch(e){}
    }, 4200);
  }

  if (reduce){
    them = 7; if (themN) themN.textContent = them;
    if (youN) youN.textContent = 0;
    if (live) live.textContent = 'Illustration';
    return;
  }

  function start(){
    if (timer) return;
    timer = setInterval(function(){
      if (them >= 12){
        clearInterval(timer); timer = null;
        setTimeout(function(){ them = 0; i = 0; if (themN) themN.textContent = 0; start(); }, 3200);
        return;
      }
      drop();
    }, 1250);
    drop();
  }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ e.isIntersecting ? start() : stop(); });
    }, {threshold:.25});
    io.observe(stage);
  } else { start(); }
})();

(function(){
  var f=document.getElementById('afLoad');
  if(f) f.value=Date.now();
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

