
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
  var sec=document.getElementById('unlock');
  if(!sec)return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)){sec.classList.add('unlocked');return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        sec.classList.add('unlocked');
        io.disconnect();
      }
    });
  },{threshold:.28});
  io.observe(sec);
  setTimeout(function(){sec.classList.add('unlocked');},9000);
})();

(function(){
  var bar=document.getElementById('stickybar');
  if(!bar||!('IntersectionObserver' in window))return;
  var hero=document.querySelector('.sub-hero');
  var forms=[document.getElementById('apply'),document.getElementById('apply-bottom')].filter(Boolean);
  var heroOut=false,formVisible=false;
  function sync(){
    var show=heroOut&&!formVisible;
    bar.classList.toggle('show',show);
    bar.setAttribute('aria-hidden',show?'false':'true');
  }
  if(hero){
    new IntersectionObserver(function(e){heroOut=!e[0].isIntersecting;sync();},{threshold:0}).observe(hero);
  }
  if(forms.length){
    var seen={};
    var fo=new IntersectionObserver(function(entries){
      entries.forEach(function(en){seen[en.target.id]=en.isIntersecting;});
      formVisible=Object.keys(seen).some(function(k){return seen[k];});
      sync();
    },{threshold:.15});
    forms.forEach(function(f){fo.observe(f);});
  }
})();

var MEMBER_ANNUAL_FEE = 839.88;   /* $69.99 x 12 — this figure is real */

var CALC_ITEMS = [
  {g:'Build once \u2014 50% off members', n:'Sales funnel website',          s:'Multi-page, conversion-built',     val:2500, off:.5},
  {g:'Build once \u2014 50% off members', n:'Landing page',                  s:'Single high-converting page',      val:800,  off:.5},
  {g:'Build once \u2014 50% off members', n:'Logo &amp; brand identity',         s:'Full identity package',            val:600,  off:.5},
  {g:'Build once \u2014 50% off members', n:'Video production',              s:'Promo or brand video',             val:1500, off:.5},
  {g:'Build once \u2014 50% off members', n:'Graphic &amp; print design',        s:'Collateral, flyers, signage',      val:450,  off:.5},
  {g:'Build once \u2014 50% off members', n:'NFC Sales Funnel package',      s:'20 cards, 20 stickers + funnel page', val:5000, off:.5},
  {g:'Build once \u2014 50% off members', n:'Google Business Profile setup', s:'Full optimization &amp; citations',    val:500,  off:.5},
  {g:'Build once \u2014 50% off members', n:'Website updates (year)',        s:'Ongoing changes and fixes',        val:600,  off:.5},
  {g:'Every month \u2014 25% off members',n:'SEO retainer (12 months)',      s:'Example: $1,500/mo standard',      val:18000,off:.25},
  {g:'Every month \u2014 25% off members',n:'AI optimization (12 months)',   s:'Example: AIO + GEO at $800/mo',    val:9600, off:.25},
  {g:'Every month \u2014 25% off members',n:'Conversion optimization (12mo)',s:'Example: $600/mo standard',        val:7200, off:.25}
];

(function(){
  var list=document.getElementById('calcList');
  if(!list)return;

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  var state=CALC_ITEMS.map(function(){return false;});
  var lastGroup=null;

  CALC_ITEMS.forEach(function(it,i){
    if(it.g!==lastGroup){
      var h=document.createElement('p');
      h.className='calc-group';
      h.textContent=it.g;
      list.appendChild(h);
      lastGroup=it.g;
    }
    var row=document.createElement('div');
    row.className='calc-row';
    row.setAttribute('role','checkbox');
    row.setAttribute('aria-checked','false');
    row.setAttribute('tabindex','0');
    row.innerHTML='<span class="calc-box" aria-hidden="true">\u2713</span>'+
                  '<span class="calc-name">'+it.n+'<small>'+it.s+'</small></span>'+
                  '<span class="calc-val">'+money(it.val)+'<i>example</i></span>';
    function toggle(){
      state[i]=!state[i];
      row.classList.toggle('on',state[i]);
      row.setAttribute('aria-checked',state[i]?'true':'false');
      render();
    }
    row.addEventListener('click',toggle);
    row.addEventListener('keydown',function(e){
      if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}
    });
    list.appendChild(row);
  });

  function render(){
    var std=0,mem=0,picked=0;
    CALC_ITEMS.forEach(function(it,i){
      if(!state[i])return;
      picked++;
      std+=it.val;
      mem+=it.val*(1-it.off);
    });
    var saved=std-mem-(picked?MEMBER_ANNUAL_FEE:0);

    document.getElementById('outStd').textContent=money(std);
    document.getElementById('outMem').textContent=money(mem);
    document.getElementById('outSave').textContent=picked?money(Math.max(0,saved)):'$0';

    var note=document.getElementById('outNote');
    if(!picked){
      note.textContent='Select a service to see how the maths works.';
    }else if(saved<=0){
      note.textContent='On these example figures that roughly breaks even against the membership fee.';
    }else{
      note.textContent='Example only, after the '+money(MEMBER_ANNUAL_FEE)+
                       ' annual membership. Your real figures come from a custom quote.';
    }
  }

  render();
})();

(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  function buildAction(form,ajax){
    var to=(form.getAttribute('data-u')||'info')+'@'+
           (form.getAttribute('data-d')||'eyetoad.com');
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

  var SPAM=/\b(viagra|casino|crypto|bitcoin|payday|loan|seo guarantee|buy followers|cheap traffic|make money fast|click here|free money|escort)\b/i;

  function wire(cfg){
    var form=document.getElementById(cfg.form);
    if(!form)return;
    document.getElementById(cfg.load).value=Date.now();
    var pu=document.getElementById(cfg.url);
    if(pu)pu.value=location.href;
    var btn=document.getElementById(cfg.btn);
    var box=document.getElementById(cfg.msg);
    var last=0;
    function show(kind,html){
      box.className='fmsg show fmsg-'+kind;
      box.innerHTML=html;
      box.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    function reset(){box.className='fmsg';box.innerHTML='';}

    form.addEventListener('submit',function(e){
      e.preventDefault();
      reset();

      if(document.getElementById(cfg.honey).value!=='')return;
      if(document.getElementById(cfg.decoy).value!=='')return;

      if(Date.now()-parseInt(document.getElementById(cfg.load).value||'0',10)<4000){
        show('err','Please take a moment to fill out the form.');return;
      }
      if(last&&(Date.now()-last)<60000){
        show('err','Please wait a moment before applying again.');return;
      }
      var name=document.getElementById(cfg.name).value.trim();
      if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){show('err','Please enter a valid name.');return;}
      if(document.getElementById(cfg.biz).value.trim().length<2){show('err','Please enter your business name.');return;}
      if(document.getElementById(cfg.phone).value.replace(/\D/g,'').length<10){
        show('err','Please enter a valid phone number with area code.');return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById(cfg.email).value.trim())){
        show('err','Please enter a valid email address.');return;
      }
      if(cfg.notes){
        var n=document.getElementById(cfg.notes);
        if(n&&SPAM.test(n.value))return;
      }

      last=Date.now();
      btn.disabled=true;
      btn.textContent='Sending your application…';

      send(form,serialize(form)).then(function(state){
        var first=name.split(' ')[0];
        if(state==='sent'){
          form.style.display='none';
          show('ok','<strong>Application received.</strong> Thanks '+first+" — we review applications within one business day and we'll be in touch. Nothing has been charged. Need it sooner? Call <a href=\"tel:18004818638\">"+PHONE+'</a>.');
          return;
        }
        if(state==='unsure'){
          form.style.display='none';
          show('warn','<strong>Sent.</strong> We could not get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a> and mention the membership application. We will find it.');
          return;
        }
        btn.disabled=false;
        btn.textContent='Apply for Membership →';
        show('err','That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
      });
    });
  }

  wire({form:'app-form-top',load:'_loadtime_top',btn:'btn-top',msg:'msg-top',url:'page-url-top',
        honey:'_honey_top',decoy:'_decoy_top',name:'t-name',biz:'t-business',
        phone:'t-phone',email:'t-email'});

  wire({form:'app-form-bot',load:'_loadtime_bot',btn:'btn-bot',msg:'msg-bot',url:'page-url-bot',
        honey:'_honey_bot',decoy:'_decoy_bot',name:'b-name',biz:'b-business',
        phone:'b-phone',email:'b-email',notes:'b-goals'});
})();

(function(){
  var cyl = document.getElementById('lk-cyl'),
      rows = document.getElementById('lk-rows'),
      state = document.getElementById('lk-state');
  if (!cyl || !rows) return;

  var done = false;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function unlock(){
    if (done) return;
    done = true;
    cyl.classList.add('turned');
    if (state){ state.textContent = 'Member pricing'; state.classList.add('open'); }
    var rs = rows.querySelectorAll('.lk-r');
    for (var i = 0; i < rs.length; i++) rs[i].classList.add('on');
  }

  if (reduce){ unlock(); return; }

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if (e.isIntersecting){ setTimeout(unlock, 550); io.disconnect(); }
      });
    }, {threshold:.4});
    io.observe(cyl);
  } else { setTimeout(unlock, 800); }
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

