
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
  var bIn=document.getElementById('bkBudget');
  var vIn=document.getElementById('bkValue');
  var cIn=document.getElementById('bkClose');
  if(!bIn||!vIn||!cIn)return;
  var bVal=document.getElementById('bkBudgetVal');
  var vVal=document.getElementById('bkValueVal');
  var cVal=document.getElementById('bkCloseVal');
  var big=document.getElementById('bkLeads');
  var sub=document.getElementById('bkSub');
  var t1=document.getElementById('bkT1');
  var t2=document.getElementById('bkT2');
  var t3=document.getElementById('bkT3');
  var verdict=document.getElementById('bkVerdict');

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function paint(el){
    var pct=(el.value-el.min)/(el.max-el.min)*100;
    el.style.background='linear-gradient(90deg,var(--blue) 0%,var(--blue) '+pct+'%,var(--border) '+pct+'%,var(--border) 100%)';
  }

  function recalc(){
    var budget=parseFloat(bIn.value);
    var value=parseFloat(vIn.value);
    var close=parseFloat(cIn.value)/100;

    // Break-even is pure arithmetic on the visitor's own numbers.
    var custNeeded=budget/value;              // customers to cover the fee
    var leadsNeeded=custNeeded/close;         // leads to produce those customers
    var leadsCeil=Math.max(1,Math.ceil(leadsNeeded));
    var leads2x=Math.max(2,Math.ceil(leadsNeeded*2));
    var cpl=budget/leadsNeeded;               // break-even cost per lead

    bVal.textContent=money(budget)+'/mo';
    vVal.textContent=money(value);
    cVal.textContent=Math.round(close*100)+'%';

    big.innerHTML=leadsCeil+' lead'+(leadsCeil===1?'':'s')+' <span>/ month</span>';
    sub.textContent='That is '+(custNeeded<1?custNeeded.toFixed(2):custNeeded.toFixed(1))+
      ' new customer'+(custNeeded===1?'':'s')+' a month at a '+Math.round(close*100)+'% close rate, just to cover the fee.';

    t1.textContent=leadsCeil+' lead'+(leadsCeil===1?'':'s');
    t2.textContent=leads2x+' leads';
    t3.textContent=money(cpl);

    // Verdict is about PLAUSIBILITY of the required lead count, not
    // a promise that it will happen.
    var cls,msg;
    if(leadsCeil<=10){
      cls='bv-ok';
      msg='<strong>The arithmetic here is comfortable.</strong> '+leadsCeil+' lead'+(leadsCeil===1?'':'s')+
          ' a month is a modest target in most local markets, which means this budget has room to be worth it well before it is stretched. Whether search can actually deliver it depends on your competition and your starting position \u2014 that is what an audit establishes.';
    }else if(leadsCeil<=30){
      cls='bv-mid';
      msg='<strong>This needs a real campaign to work.</strong> '+leadsCeil+
          ' leads a month is achievable in many local markets but not automatic. Worth asking two questions before committing: is your close rate accurate, and are you counting phone calls? Both materially change this number.';
    }else{
      cls='bv-hard';
      msg='<strong>Worth pausing here.</strong> '+leadsCeil+
          ' leads a month to break even is a demanding target. Usually that means one of three things: the budget is too high for this customer value, the close rate entered is lower than reality, or the average customer value is understated because it counts one job rather than the relationship. Check those before ruling anything in or out.';
    }
    verdict.className='bk-verdict '+cls;
    verdict.innerHTML=msg;

    paint(bIn);paint(vIn);paint(cIn);
  }

  [bIn,vIn,cIn].forEach(function(el){
    el.addEventListener('input',recalc);
    el.addEventListener('change',recalc);
  });
  recalc();
})();

(function(){
  var form=document.getElementById('prForm');
  if(!form)return;
  var load=document.getElementById('prLoad');
  if(load)load.value=Date.now();
  var btn=document.getElementById('prGo');
  var err=document.getElementById('prErr');
  var ok=document.getElementById('prOk');
  var note=document.getElementById('prNote');
  var last=0;
  function fail(m){err.textContent=m;err.style.display='block';}
  function buildAction(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    err.style.display='none';

    if(form.querySelector('[name="_honey"]').value!==''){return;}
    if(Date.now()-Number(load.value||0)<4000){return fail('Please take a moment, then send again.');}
    var now=Date.now();
    if(last&&(now-last)<60000){return fail('Please wait a moment before submitting again.');}

    var name=document.getElementById('pr-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('pr-email').value.trim())){return fail('Please enter a valid email address.');}
    if(document.getElementById('pr-phone').value.replace(/\D/g,'').length<10){return fail('Please enter a valid phone number (10+ digits).');}
    if(document.getElementById('pr-site').value.trim().length<4){return fail('Please add your website so we know where to look.');}

    last=now;
    btn.disabled=true;btn.textContent='Sending...';

    var fd=new FormData(form);
    fd.append('page_url',location.href);
    fetch(buildAction((form.getAttribute('data-u')||'info')+'@'+(form.getAttribute('data-d')||'eyetoad.com')),{method:'POST',body:fd})
      .then(function(r){return r.ok?r.json():Promise.reject();})
      .then(function(){
        form.style.display='none';
        if(note)note.style.display='none';
        ok.style.display='block';
        ok.innerHTML='<strong style="display:block;margin-bottom:6px;color:#065F46;">Request received \u2014 thank you.</strong>We will look at your market and reply with a real number, usually within one business day. Check your spam folder if you do not see it.';
      })
      .catch(function(){
        btn.disabled=false;btn.textContent='Get My Custom Quote';
        fail('That did not go through. Please email '+(form.getAttribute('data-u')||'info')+'@'+(form.getAttribute('data-d')||'eyetoad.com')+' or call (720) 249-6588.');
      });
  });
})();

(function(){
  var els=document.querySelectorAll('.rv');
  if(!els.length)return;
  if(!('IntersectionObserver' in window) ||
     (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    els.forEach(function(el){el.classList.add('in');});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
    });
  },{rootMargin:'0px 0px -50px 0px',threshold:.06});
  els.forEach(function(el){io.observe(el);});
})();

(function(){
  var stage = document.getElementById('sc-stage');
  if (!stage) return;
  var beam = document.getElementById('sc-beam'),
      panL = document.getElementById('sc-pan-l'),
      panR = document.getElementById('sc-pan-r'),
      costEl = document.getElementById('sc-cost'),
      worthEl = document.getElementById('sc-worth');
  if (!beam) return;

  var COST = 1500;
  var CASES = [
    {worth: 400,   tilt:  11},
    {worth: 2600,  tilt:  -4},
    {worth: 9000,  tilt: -11},
    {worth: 24000, tilt: -14},
    {worth: 850,   tilt:   6}
  ];
  function money(n){ return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  var i = 0, timer = null;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function show(n){
    var c = CASES[n];
    beam.style.transform = 'rotate(' + c.tilt + 'deg)';
    if (panL) panL.style.transform = 'rotate(' + (-c.tilt) + 'deg)';
    if (panR) panR.style.transform = 'rotate(' + (-c.tilt) + 'deg)';
    if (costEl) costEl.textContent = money(COST);
    if (worthEl) worthEl.textContent = money(c.worth);
  }
  if (reduce){ show(2); return; }
  show(0);
  function start(){
    if (timer) return;
    timer = setInterval(function(){ i = (i + 1) % CASES.length; show(i); }, 2600);
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
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

