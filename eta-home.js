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

(function(){
  var go = document.getElementById('psi-go');
  if (!go) return;
  var inp = document.getElementById('psi-url');
  var after = document.getElementById('psi-after');
  var auditLink = document.getElementById('psi-audit');

  function tidy(v){
    v = String(v || '').trim();
    if (!v) return '';
    v = v.replace(/^\s*https?:\/\//i, '').replace(/\/+$/, '');
    if (v.indexOf('.') === -1) return '';          // not a domain at all
    return 'https://' + v;
  }
  function run(){
    var url = tidy(inp.value);
    if (!url){
      inp.focus();
      inp.style.borderColor = '#C0392B';
      setTimeout(function(){ inp.style.borderColor = ''; }, 1600);
      return;
    }
    try {
      window.open('https://pagespeed.web.dev/analysis?url=' + encodeURIComponent(url),
                  '_blank', 'noopener');
    } catch (e) {}
    if (after && after.hasAttribute('hidden')){
      after.removeAttribute('hidden');
      if (auditLink) auditLink.href = '/free-seo-audit/?site=' + encodeURIComponent(url);
      setTimeout(function(){
        try { after.scrollIntoView({behavior:'smooth', block:'nearest'}); } catch(e){}
      }, 120);
    }
  }
  go.addEventListener('click', run);
  inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') run(); });
})();

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

(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  function buildAction(form,ajax){
    var to=form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'');
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

