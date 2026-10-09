
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
  var body=document.getElementById('scopeBody');
  var res=document.getElementById('scopeRes');
  if(!body||!res)return;

  var OPTS=[
    {k:'new',label:'My site is new or recently rebuilt',sub:'Under two years old, or launched in the last few months',
     name:'Start with Layers 1 and 2 — foundation and content',
     lead:'A new site has no accumulated authority and usually has technical gaps nobody has found yet. Building content on an unstable foundation wastes the content.',
     body:'The good news is that new sites often improve fast once the technical layer is sound, because there is nothing to undo. The constraint is patience: a brand-new domain adds several months to every timeline, and no amount of budget removes that.',
     order:['Technical foundation — crawlability, indexation, Core Web Vitals, structured data','Content mapped to buying intent, not search volume','Google Business Profile set up properly from the start','Conversion tracking, so month six can be measured against month one'],
     links:[['/free-seo-audit/','Get a free audit'],['/blog/seo-timeline-first-90-days-denver/','What the first 90 days look like']]},

    {k:'local',label:'I am an established local business',sub:'Trading for years, most customers come from nearby',
     name:'Start with Layer 3 — local and entity signals',
     lead:'Established local businesses usually have the hardest asset to build already: a real operating history and real customers. What they typically lack is consistency in how that business appears across the web.',
     body:'This is the cheapest high-impact work available to you. Conflicting details across directories actively suppress both map rankings and AI citation, and fixing them costs patience rather than budget. Most of what we find in this situation has been quietly wrong for years.',
     order:['Google Business Profile completed, with the most specific primary category available','Name, address and phone made identical everywhere — old listings included','A consistent review habit, asked at the right moment','Local content that names real neighbourhoods and service areas'],
     links:[['/local-seo-denver/','Local SEO approach'],['/blog/entity-signals-search-engines/','The entity signals guide']]},

    {k:'traffic',label:'I get traffic but not enough leads',sub:'Analytics look fine, the phone does not match',
     name:'Start with Layer 5 — conversion, before anything else',
     lead:'This is the best diagnosis on this list, because it is the cheapest to fix and the fastest to show results. You are already paying for the visitors. You are simply losing them.',
     body:'Buying more traffic right now would mean more people leaving. Average site conversion sits around 2–3%; strong ones exceed 10%. Same traffic, three times the leads, no additional spend — and it makes every future SEO dollar go further.',
     order:['Test your own site on a phone, on cellular, and time it honestly','Make the offer clear within five seconds of landing','Cut unnecessary form fields and make the phone number permanently visible','Set up call and form tracking so you can see where the leak actually is'],
     links:[['/conversion-optimization/','Conversion optimization'],['/blog/website-traffic-but-no-calls-denver/','Traffic but no calls']]},

    {k:'competitive',label:'I am competing regionally or nationally',sub:'Multiple markets, or a category with deep competition',
     name:'Start with Layers 2 and 4 — depth and authority',
     lead:'Competitive categories are won on topical depth and third-party corroboration, not on optimising a handful of pages harder.',
     body:'Expect a longer timeline and a larger budget than a single-location local business, because you are competing against organisations that have been investing for years. The compensating advantage is that competitive markets reward genuine depth, and most competitors go wide rather than deep.',
     order:['Build genuine topical depth around your core subject, not scattered posts','Earn links and corroboration from sources that actually matter in your category','Structure content so it can be extracted and quoted by AI systems, not just ranked','Measure by pipeline and qualified leads rather than aggregate traffic'],
     links:[['/denver-seo-services/','Full service overview'],['/blog/ai-agents-choosing-business-vendors/','How AI agents shortlist vendors']]},

    {k:'unsure',label:'Honestly, I am not sure',sub:'Something is not working and I cannot tell what',
     name:'Start by finding the constraint — it may not be SEO',
     lead:'That is a more useful answer than it sounds, and it is the position most business owners are actually in.',
     body:'Plenty of businesses have a pricing, capacity or follow-up problem wearing a visibility costume. Buying traffic in that situation makes things measurably worse rather than better, because it floods a stage that already cannot keep up. Diagnose first.',
     order:['Walk the six-rung ladder and find the first genuinely weak stage','If the weak stage is visibility, start with a free audit of all five layers','If it is downstream — conversion, sales, delivery — fix that before increasing spend','Set a baseline either way, so you can tell in ninety days whether anything changed'],
     links:[['/blog/find-your-business-constraint/','Free constraint diagnostic'],['/grow-my-business/','Free answer desk']]}
  ];

  function esc(s){return String(s).replace(/[<>&]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}

  function render(){
    var h='<p class="scope-q">Which of these sounds most like your business?</p>'+
          '<p class="scope-hint">There is no wrong answer, and the last option is a legitimate one.</p>'+
          '<div class="scope-opts">';
    OPTS.forEach(function(o,i){
      h+='<button class="scope-opt" type="button" data-i="'+i+'"><b>'+esc(o.label)+'</b>'+esc(o.sub)+'</button>';
    });
    h+='</div>';
    body.innerHTML=h;
    body.querySelectorAll('.scope-opt').forEach(function(b){
      b.addEventListener('click',function(){ show(OPTS[parseInt(b.getAttribute('data-i'),10)]); });
    });
  }

  function show(o){
    var h='<p class="sr-k">Your starting point</p><p class="sr-name">'+o.name+'</p>'+
          '<p>'+o.lead+'</p><p>'+o.body+'</p>'+
          '<div class="sr-order"><p class="so-k">Do these first</p><ol>';
    o.order.forEach(function(t){ h+='<li>'+t+'</li>'; });
    h+='</ol></div><div class="sr-links">';
    o.links.forEach(function(l,i){
      h+='<a href="'+l[0]+'" class="'+(i===0?'sr-go':'sr-alt')+'">'+esc(l[1])+' \u2192</a>';
    });
    h+='</div><button class="scope-restart" type="button" id="scopeAgain">\u21ba Choose again</button>';
    res.innerHTML=h;
    res.classList.add('on');
    document.getElementById('scopeAgain').addEventListener('click',function(){
      res.classList.remove('on'); res.innerHTML='';
      document.getElementById('scope').scrollIntoView({behavior:'smooth',block:'start'});
    });
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  render();
})();

(function(){
  var form=document.getElementById('svForm');
  if(!form)return;
  var load=document.getElementById('svLoad');
  if(load)load.value=Date.now();
  var btn=document.getElementById('svGo');
  var err=document.getElementById('svErr');
  var ok=document.getElementById('svOk');
  var note=document.getElementById('svNote');
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

    var name=document.getElementById('sv-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('sv-email').value.trim())){return fail('Please enter a valid email address.');}
    if(document.getElementById('sv-phone').value.replace(/\D/g,'').length<10){return fail('Please enter a valid phone number (10+ digits).');}
    if(document.getElementById('sv-site').value.trim().length<4){return fail('Please add your website so we know where to look.');}

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
        ok.innerHTML='<strong style="display:block;margin-bottom:6px;color:#065F46;">Request received — thank you.</strong>We will review your site and reply by email, usually within one business day. Check your spam folder if you do not see it.';
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
  var tabs = [].slice.call(document.querySelectorAll('.pr-tab'));
  if (!tabs.length) return;
  function show(btn){
    tabs.forEach(function(t){
      var on = (t === btn);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      var p = document.getElementById(t.getAttribute('aria-controls'));
      if (p){ if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden',''); }
    });
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ show(t); });
    t.addEventListener('keydown', function(e){
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i+1) % tabs.length];
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   n = tabs[(i-1+tabs.length) % tabs.length];
      if (n){ e.preventDefault(); n.focus(); show(n); }
    });
  });
})();

(function(){
  var links = document.querySelectorAll('a.eml[data-u][data-d]');
  for (var i = 0; i < links.length; i++){
    (function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href = 'mailto:' + a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
      });
    })(links[i]);
  }
})();

