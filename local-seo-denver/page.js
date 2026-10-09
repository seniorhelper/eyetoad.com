
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
  function buildAction(form){
    var to=(form.getAttribute('data-u')||'info')+'@'+
           (form.getAttribute('data-d')||'eyetoad.com');
    return ['https:','','formsubmit.co',to].join('/');
  }

  var form=document.getElementById('local-lead-form');
  if(form){
    document.getElementById('_loadtime').value=Date.now();
    var lastSubmit=0;
    var errBox=document.getElementById('lsd-form-err');
    var submitBtn=document.getElementById('lsd-fsub');
    function showErr(msg){errBox.textContent=msg;errBox.style.display='block';errBox.scrollIntoView({behavior:'smooth',block:'nearest'});}
    form.addEventListener('submit',function(e){
      errBox.style.display='none';
      if(document.getElementById('_honey').value!==''){e.preventDefault();return;}
      if(document.getElementById('website_url').value!==''){e.preventDefault();return;}
      var elapsed=Date.now()-parseInt(document.getElementById('_loadtime').value||'0',10);
      if(elapsed<4000){e.preventDefault();showErr('Please take a moment to fill out the form.');return;}
      var now=Date.now();
      if(lastSubmit&&(now-lastSubmit)<60000){e.preventDefault();showErr('Please wait a moment before submitting again.');return;}
      var name=document.getElementById('lsd-name').value.trim();
      if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();showErr('Please enter a valid name.');return;}
      var phone=document.getElementById('lsd-phone').value.replace(/\D/g,'');
      if(phone.length<10){e.preventDefault();showErr('Please enter a valid phone number (10+ digits).');return;}
      var email=document.getElementById('lsd-email').value.trim();
      if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){e.preventDefault();showErr('Please enter a valid email address.');return;}
      var msg=document.getElementById('lsd-message').value;
      var spamPattern=/\b(viagra|casino|crypto|bitcoin|loan|SEO guarantee|buy followers|cheap traffic|make money fast|click here|free money)\b/i;
      if(spamPattern.test(msg)){e.preventDefault();return;}
      form.action=buildAction(form);
      lastSubmit=now;
      submitBtn.disabled=true;
      submitBtn.textContent='Sending...';
    });
  }

  var mForm=document.getElementById('mini-cta-form');
  if(mForm){
    document.getElementById('_mini_loadtime').value=Date.now();
    var mBtn=document.getElementById('mini-submit');
    var mErr=document.getElementById('mini-err');
    var mLast=0;
    function mShow(msg){mErr.textContent=msg;mErr.style.display='block';}
    mForm.addEventListener('submit',function(e){
      mErr.style.display='none';
      if(document.getElementById('_honey_mini').value!==''){e.preventDefault();return;}
      if(document.getElementById('_contact_email_mini').value!==''){e.preventDefault();return;}
      var elapsed=Date.now()-parseInt(document.getElementById('_mini_loadtime').value||'0',10);
      if(elapsed<4000){e.preventDefault();mShow('Please take a moment before submitting.');return;}
      var now=Date.now();
      if(mLast&&(now-mLast)<60000){e.preventDefault();mShow('Please wait before submitting again.');return;}
      var name=document.getElementById('mini-name').value.trim();
      if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();mShow('Please enter a valid name.');return;}
      var phone=document.getElementById('mini-phone').value.replace(/\D/g,'');
      if(phone.length<10){e.preventDefault();mShow('Please enter a valid phone number (10+ digits).');return;}
      mForm.action=buildAction(mForm);
      mLast=now;
      mBtn.disabled=true;
      mBtn.textContent='Sending...';
    });
  }
})();

(function(){
  var stage = document.getElementById('rg-stage');
  if (!stage) return;
  var pin = document.getElementById('rg-pin'),
      rank = document.getElementById('rg-rank'),
      rl = document.getElementById('rg-rl'),
      where = document.getElementById('rg-where');
  if (!pin || !rank) return;

  var STOPS = [
    {x:150, y:96,  r:2,  w:'Your office',      t:'Where you appear from here'},
    {x:224, y:74,  r:4,  w:'1 mile north',     t:'Where you appear from here'},
    {x:286, y:140, r:7,  w:'2 miles east',     t:'Where you appear from here'},
    {x:344, y:190, r:11, w:'3 miles southeast',t:'Where you appear from here'},
    {x:96,  y:194, r:14, w:'4 neighborhoods over', t:'Page two. Nobody scrolls that far.'},
    {x:74,  y:120, r:9,  w:'3 miles west',     t:'Where you appear from here'}
  ];
  var i = 0, timer = null;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function show(n){
    var s = STOPS[n];
    pin.setAttribute('transform','translate(' + s.x + ',' + s.y + ')');
    rank.textContent = '#' + s.r;
    rank.className = 'rg-rank ' + (s.r <= 3 ? 'good' : (s.r <= 8 ? 'mid' : 'bad'));
    if (rl) rl.textContent = s.t;
    if (where) where.textContent = s.w;
  }
  if (reduce){ show(4); return; }
  show(0);
  function start(){
    if (timer) return;
    timer = setInterval(function(){ i = (i + 1) % STOPS.length; show(i); }, 2400);
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
  var go = document.getElementById('lc-go');
  if (!go) return;
  var q = document.getElementById('lc-q'), n = document.getElementById('lc-n');
  function run(){
    var term = (q.value || '').trim();
    if (!term){
      q.focus(); q.style.borderColor = '#B42318';
      setTimeout(function(){ q.style.borderColor = ''; }, 1600);
      return;
    }
    var at = n.value || '39.7392,-104.9903';
    var url = 'https://www.google.com/maps/search/' + encodeURIComponent(term) +
              '/@' + at + ',13z';
    try { window.open(url, '_blank', 'noopener'); } catch(e){}
  }
  go.addEventListener('click', run);
  q.addEventListener('keydown', function(e){ if (e.key === 'Enter') run(); });
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

