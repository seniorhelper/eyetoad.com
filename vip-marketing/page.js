
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

var currentLang='en';
function setLang(lang){
  currentLang=lang;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-en]').forEach(function(el){
    var val=el.getAttribute('data-'+lang);
    if(val!==null)el.innerHTML=val;
  });
  document.querySelectorAll('[data-en-ph]').forEach(function(el){
    var ph=el.getAttribute('data-'+lang+'-ph');
    if(ph!==null)el.setAttribute('placeholder',ph);
  });
  var lf=document.getElementById('vip-lang');
  if(lf)lf.value=lang;
  document.getElementById('btn-en').classList.toggle('active',lang==='en');
  document.getElementById('btn-es').classList.toggle('active',lang==='es');
}
var _bEn=document.getElementById('btn-en'), _bEs=document.getElementById('btn-es');
if(_bEn)_bEn.addEventListener('click',function(){setLang('en');});
if(_bEs)_bEs.addEventListener('click',function(){setLang('es');});

(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  function buildAction(form,ajax){
    var to=(form.getAttribute('data-u')||'info')+'@'+(form.getAttribute('data-d')||'eyetoad.com');
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

  var form=document.getElementById('vip-lead-form');
  if(!form)return;
  var lt=document.getElementById('_loadtime');
  var pu=document.getElementById('vip-page-url');
  var box=document.getElementById('v-msg');
  var btn=document.getElementById('v-fsub');
  var last=0;
  lt.value=Date.now();
  pu.value=location.href;

  function show(kind,html){
    box.className='fmsg show fmsg-'+kind;
    box.innerHTML=html;
    box.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function reset(){box.className='fmsg';box.innerHTML='';}
  function es(){return currentLang==='es';}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    reset();

    if(document.getElementById('_honey').value!=='')return;
    if(document.getElementById('vip_alt_email').value!=='')return;

    if(Date.now()-parseInt(lt.value||'0',10)<4000){
      show('err',es()?'Tómate un momento para completar el formulario.':'Please take a moment to fill out the form.');return;
    }
    if(last&&(Date.now()-last)<60000){
      show('err',es()?'Espera un momento antes de enviar de nuevo.':'Please wait a moment before submitting again.');return;
    }
    var name=document.getElementById('v-name').value.trim();
    if(badName(name)){show('err',es()?'Ingresa un nombre válido.':'Please enter a valid name.');return;}
    if(badPhone(document.getElementById('v-phone').value)){
      show('err',es()?'Ingresa un teléfono válido con código de área.':'Please enter a valid phone number with area code.');return;
    }
    var email=document.getElementById('v-email').value.trim();
    if(badEmail(email)){show('err',es()?'Ingresa un correo válido.':'Please enter a valid email address.');return;}
    if(SPAM.test(document.getElementById('v-message').value))return;

    last=Date.now();
    btn.disabled=true;
    btn.textContent=es()?'Enviando…':'Sending…';

    send(form,serialize(form)).then(function(state){
      var first=name.split(' ')[0];
      if(state==='sent'){
        form.style.display='none';
        show('ok',es()
          ?'<strong>Enviado.</strong> Gracias '+first+' — te contactamos en 1 día hábil. ¿Lo necesitas antes? Llama al <a href="tel:18004818638">'+PHONE+'</a>.'
          :'<strong>Sent.</strong> Thanks '+first+" — we'll be in touch within one business day. Need it sooner? Call <a href=\"tel:18004818638\">"+PHONE+'</a>.');
        return;
      }
      if(state==='unsure'){
        form.style.display='none';
        show('warn',es()
          ?'<strong>Enviado.</strong> No pudimos confirmar la entrega desde aquí, así que por seguridad: si no sabes de nosotros en 1 día hábil, llama al <a href="tel:18004818638">'+PHONE+'</a> y menciona el formulario del sitio. Lo encontraremos.'
          :'<strong>Sent.</strong> We could not get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a> and mention the website form. We will find it.');
        return;
      }
      btn.disabled=false;
      btn.textContent=es()?'Solicitar Mi Sistema NFC →':'Request My NFC System →';
      show('err',es()
        ?'Eso no se envió, y no vamos a fingir lo contrario. Llama al <a href="tel:18004818638">'+PHONE+'</a> o escribe a <a href="mailto:'+to+'">'+to+'</a>.'
        :'That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
    });
  });
})();

(function(){
  var stage = document.getElementById('tp-stage');
  if (!stage) return;
  var card = document.getElementById('tp-card'),
      waves = document.getElementById('tp-waves'),
      screen = document.getElementById('tp-screen'),
      step = document.getElementById('tp-step'),
      cnt = document.getElementById('tp-cnt');
  if (!card || !screen) return;

  var LABELS = {
    ready:  {en:'Ready',        es:'Listo'},
    tap:    {en:'Tapping\u2026', es:'Tocando\u2026'},
    opened: {en:'Page open',    es:'P\u00e1gina abierta'},
    lead:   {en:'Lead captured',es:'Cliente captado'}
  };
  function say(key){
    if (!step) return;
    step.setAttribute('data-en', LABELS[key].en);
    step.setAttribute('data-es', LABELS[key].es);
    var lang = document.documentElement.lang === 'es' ? 'es' : 'en';
    step.textContent = LABELS[key][lang];
  }

  var n = 0, timers = [], reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function clear(){ timers.forEach(clearTimeout); timers = []; }
  function t(fn, ms){ timers.push(setTimeout(fn, ms)); }

  function reset(){
    card.setAttribute('transform','translate(96,150)');
    screen.classList.remove('on');
    var ws = waves.querySelectorAll('.tp-wave');
    for (var i=0;i<ws.length;i++) ws[i].classList.remove('on');
    say('ready');
  }

  function run(){
    clear(); reset();
    t(function(){
      card.setAttribute('transform','translate(150,150)');
      say('tap');
    }, 600);
    t(function(){
      var ws = waves.querySelectorAll('.tp-wave');
      for (var i=0;i<ws.length;i++) ws[i].classList.add('on');
    }, 1250);
    t(function(){ screen.classList.add('on'); say('opened'); }, 1900);
    t(function(){
      say('lead');
      n++; if (cnt) cnt.textContent = n;
    }, 3000);
    t(run, 4600);
  }

  if (reduce){
    card.setAttribute('transform','translate(150,150)');
    screen.classList.add('on'); say('lead');
    if (cnt) cnt.textContent = '1';
    return;
  }

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if (e.isIntersecting) run(); else { clear(); reset(); }
      });
    }, {threshold:.25});
    io.observe(stage);
  } else { run(); }
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

