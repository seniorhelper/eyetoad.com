
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
  var vIn=document.getElementById('calcVisits');
  var lIn=document.getElementById('calcLeads');
  var mIn=document.getElementById('calcValue');
  var cIn=document.getElementById('calcClose');
  var go=document.getElementById('calcGo');
  var res=document.getElementById('calcRes');
  if(!vIn||!lIn||!mIn||!cIn||!go||!res)return;

  function num(el,min,max){
    var n=parseFloat(el.value);
    if(!isFinite(n))return null;
    if(min!=null&&n<min)return null;
    if(max!=null&&n>max)return max;
    return n;
  }
  function money(n){
    return '$'+Math.round(n).toLocaleString('en-US');
  }
  function band(rate){
    if(rate>=5)return{cls:'cb-hi',label:'Top tier',
      note:'You are at or above the strong band for a local service business. Further gains are real but incremental \u2014 at this point the bigger lever is usually more qualified traffic, not more optimization.'};
    if(rate>=3)return{cls:'cb-mid',label:'Healthy range',
      note:'You are inside the 3\u20135% target band for a local service business. There is normally still room, and the remaining gains tend to come from the mobile experience and from proof placement rather than from anything structural.'};
    if(rate>=2)return{cls:'cb-mid',label:'Around the median',
      note:'You are near the all-industry median of 2.35%, which for a local service business usually means there is meaningful room. The 3\u20135% band is a realistic target for high-intent local traffic.'};
    return{cls:'cb-lo',label:'Below median',
      note:'This is below the all-industry median. Before concluding the site is at fault, check that phone calls are being counted \u2014 roughly 40% of lead conversions arrive by phone, and an untracked phone line produces exactly this picture.'};
  }

  function run(){
    var visits=num(vIn,1), leads=num(lIn,0), val=num(mIn,1), close=num(cIn,0.1,100);
    if(visits==null){vIn.focus();return;}
    if(leads==null){lIn.focus();return;}
    if(val==null){mIn.focus();return;}
    if(close==null){cIn.focus();return;}
    if(leads>visits){
      res.innerHTML='<p class="cr-k">Check the numbers</p><p>You have entered more leads than visitors. If your leads genuinely exceed your website sessions, most of them are arriving from somewhere other than the website \u2014 referral, repeat business or the phone \u2014 and a website conversion rate is not the right measure for them.</p><button class="calc-again" type="button" id="calcAgain">\u21ba Try again</button>';
      res.classList.add('on'); wireAgain(); return;
    }

    var rate=(leads/visits)*100;
    var b=band(rate);
    var cr=close/100;
    var yearNow=leads*12*cr*val;

    function at(target){
      var tl=visits*(target/100);
      var extra=Math.max(0,tl-leads);
      return {leads:extra, rev:extra*12*cr*val};
    }
    var t3=at(3), t5=at(5);

    var h='<p class="cr-k">Your current conversion rate</p>'+
          '<p class="cr-big">'+rate.toFixed(2)+'%</p>'+
          '<span class="cr-band '+b.cls+'">'+b.label+'</span>'+
          '<p>'+b.note+'</p>'+
          '<div class="cr-tiles">'+
            '<div class="cr-tile"><p class="t-lab">Current annual revenue from site leads</p><p class="t-val">'+money(yearNow)+'</p><p class="t-note">'+leads+' leads/mo \u00d7 '+close+'% close \u00d7 '+money(val)+'</p></div>'+
            '<div class="cr-tile'+(t3.rev>0?' hot':'')+'"><p class="t-lab">If you reached 3%</p><p class="t-val">'+(t3.rev>0?'+'+money(t3.rev)+'/yr':'already there')+'</p><p class="t-note">'+(t3.rev>0?'+'+Math.round(t3.leads)+' leads/mo from the same traffic':'no additional traffic needed')+'</p></div>'+
            '<div class="cr-tile'+(t5.rev>0?' hot':'')+'"><p class="t-lab">If you reached 5%</p><p class="t-val">'+(t5.rev>0?'+'+money(t5.rev)+'/yr':'already there')+'</p><p class="t-note">'+(t5.rev>0?'+'+Math.round(t5.leads)+' leads/mo from the same traffic':'no additional traffic needed')+'</p></div>'+
          '</div>'+
          '<p style="font-size:.9rem;color:var(--muted);line-height:1.65">This is arithmetic on your own figures, not a forecast. It shows what those rates would be worth \u2014 not that they are reachable for your site. Whether they are depends on what is currently in the way, which is what an audit is for.</p>'+
          '<button class="calc-again" type="button" id="calcAgain">\u21ba Start over</button>';
    res.innerHTML=h; res.classList.add('on'); wireAgain();
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function wireAgain(){
    var a=document.getElementById('calcAgain');
    if(!a)return;
    a.addEventListener('click',function(){
      res.classList.remove('on'); res.innerHTML='';
      vIn.value='';lIn.value='';mIn.value='';cIn.value='';vIn.focus();
    });
  }

  go.addEventListener('click',run);
  [vIn,lIn,mIn,cIn].forEach(function(el){
    el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();run();}});
  });
})();

(function(){
  var form=document.getElementById('cvForm');
  if(!form)return;
  var load=document.getElementById('cvLoad');
  if(load)load.value=Date.now();
  var btn=document.getElementById('cvGo');
  var err=document.getElementById('cvErr');
  var ok=document.getElementById('cvOk');
  var note=document.getElementById('cvNote');
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

    var name=document.getElementById('cv-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('cv-email').value.trim())){return fail('Please enter a valid email address.');}
    if(document.getElementById('cv-phone').value.replace(/\D/g,'').length<10){return fail('Please enter a valid phone number (10+ digits).');}
    if(document.getElementById('cv-site').value.trim().length<4){return fail('Please add your website so we know where to look.');}

    last=now;
    btn.disabled=true;btn.textContent='Sending...';

    var fd=new FormData(form);
    fd.append('page_url',location.href);
    fetch(buildAction(form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'')),{method:'POST',body:fd})
      .then(function(r){return r.ok?r.json():Promise.reject();})
      .then(function(){
        form.style.display='none';
        if(note)note.style.display='none';
        ok.style.display='block';
        ok.innerHTML='<strong style="display:block;margin-bottom:6px;color:#065F46;">Request received \u2014 thank you.</strong>We will walk your conversion path and reply by email, usually within one business day. Check your spam folder if you do not see it.';
      })
      .catch(function(){
        btn.disabled=false;btn.textContent='Get My Free Audit';
        fail('That did not go through. Please call (720) 249-6588.');
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
  var cards = [].slice.call(document.querySelectorAll('.mg-card'));
  if (!cards.length) return;
  function fill(){
    cards.forEach(function(c){
      var f = c.querySelector('.mg-fill');
      var p = parseFloat(c.getAttribute('data-pct')) || 0;
      if (f) f.style.width = Math.min(100, p) + '%';
    });
  }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ if (e.isIntersecting){ fill(); io.disconnect(); } });
    }, {rootMargin:'-60px'});
    io.observe(cards[0]);
  } else { fill(); }
})();

(function(){
  var r = document.getElementById('ff-range');
  if (!r) return;
  var num = document.getElementById('ff-num'),
      rate = document.getElementById('ff-rate'),
      lost = document.getElementById('ff-lost'),
      verd = document.getElementById('ff-verdict');

  var TABLE = {1:11.4, 2:10.8, 3:10.1, 4:9.0, 5:7.4, 6:6.2, 7:5.4, 8:4.4, 9:3.6, 10:3.2, 11:2.9, 12:2.7};

  function render(){
    var n = parseInt(r.value, 10);
    var v = TABLE[n];
    num.textContent = n;
    rate.textContent = v.toFixed(1) + '%';
    var drop = Math.max(0, (1 - (v / TABLE[3])) * 100);
    lost.textContent = Math.round(drop) + '%';

    verd.className = 'ff-verdict' + (n <= 4 ? ' good' : (n >= 8 ? ' bad' : ''));
    if (n <= 3){
      verd.innerHTML = '<b>This is the right end of the curve.</b> Name, phone, and one line about the job is a working form for almost any service business. Everything else you can ask on the call.';
    } else if (n <= 5){
      verd.innerHTML = '<b>Defensible, if every field earns its place.</b> Ask yourself which one you could find out on the phone in four seconds — that is the one to cut first.';
    } else if (n <= 7){
      verd.innerHTML = '<b>You are inside the steepest part of the drop.</b> This is where each additional field costs the most, and it is the cheapest fix available to you — no design work, no new traffic, just deletion.';
    } else {
      verd.innerHTML = '<b>This is costing you roughly two thirds of your inquiries</b> against a short form. If the length is there to qualify people, a multi-step form does that job without the same penalty.';
    }
  }
  r.addEventListener('input', render);
  r.addEventListener('change', render);
  render();
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

