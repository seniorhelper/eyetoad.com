
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');
  if(!hdr||!burger||!mobNav) return;

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
    document.body.style.overflow=o?'hidden':'';
  });
  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });
})();

(function(){
  var bar=document.getElementById('progress');
  var art=document.querySelector('.art-body');
  if(!bar||!art)return;
  var ticking=false;
  function update(){
    var rect=art.getBoundingClientRect();
    var total=art.offsetHeight-window.innerHeight;
    var done=total>0 ? (-rect.top)/total : 0;
    bar.style.width=Math.max(0,Math.min(1,done))*100+'%';
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(update);}
  },{passive:true});
  window.addEventListener('resize',update);
  update();
})();

(function(){
  var links=Array.prototype.slice.call(document.querySelectorAll('#tocList a'));
  if(!links.length)return;
  var targets=links.map(function(a){
    return document.getElementById(a.getAttribute('href').slice(1));
  }).filter(Boolean);
  if(!targets.length)return;
  var ticking=false;
  function spy(){
    var pos=window.scrollY+140, current=0;
    for(var i=0;i<targets.length;i++){
      if(targets[i].offsetTop<=pos)current=i;
    }
    links.forEach(function(a,i){a.classList.toggle('on',i===current);});
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(spy);}
  },{passive:true});
  window.addEventListener('resize',spy);
  spy();
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

(function(){
  function buildAction(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }

  document.querySelectorAll('.cap-form').forEach(function(f){
    var lt=f.querySelector('[name="_loadtime"]');
    if(lt)lt.value=Date.now();
    var last=0;

    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var msg=f.querySelector('.cmsg');
      var btn=f.querySelector('button[type="submit"]');
      var val=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value:'';};
      var fail=function(t){msg.style.display='block';msg.style.color='#FCA5A5';msg.textContent=t;};
      msg.style.display='none';msg.textContent='';

      if(val('_honey')!==''){return;}
      if(Date.now()-Number(val('_loadtime'))<4000){return fail('Give it a moment, then send again.');}
      var now=Date.now();
      if(last&&(now-last)<60000){return fail('Please wait a moment before submitting again.');}

      var name=val('name').trim();
      if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
      if(!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email').trim())){return fail('That email address does not look right.');}
      if(val('website').trim().length<4){return fail('Add your website so we know where to look.');}

      last=now;
      btn.disabled=true;btn.textContent='Sending...';

      var fd=new FormData(f);
      fd.append('_subject', f.dataset.label||'Tap-to-Rank article — request');
      fd.append('_captcha','false');
      fd.append('_template','table');
      fd.append('page_url',location.href);

      fetch(buildAction(f.dataset.fs||(window.etaAddr?window.etaAddr():'')),{method:'POST',body:fd})
        .then(function(r){return r.ok?r.json():Promise.reject();})
        .then(function(){
          f.innerHTML='<p style="color:#fff;font-family:Fraunces,serif;font-weight:900;font-size:1.1rem;margin:0 0 6px">Got it — thank you.</p>'+
                      '<p style="color:rgba(255,255,255,.82);margin:0;font-size:.96rem;line-height:1.7">We will take a look and reply by email, usually the same business day. Check the spam folder if you do not see it.</p>';
        })
        .catch(function(){
          btn.disabled=false;btn.textContent='Audit my entity →';
          fail('That did not go through. Please call (720) 249-6588.');
        });
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
  var body=document.getElementById('scoreBody');
  var fill=document.getElementById('scoreFill');
  var num=document.getElementById('scoreNum');
  var lab=document.getElementById('scoreLab');
  var verdict=document.getElementById('scoreVerdict');
  var reset=document.getElementById('scoreReset');
  if(!body||!fill)return;

  var GROUPS=[
    {name:'Layer 1 · Consistency',items:[
      {w:10,t:'My business name is written identically on my website, Google Business Profile and every directory'},
      {w:10,t:'My address is identical everywhere — same suite format, same abbreviations'},
      {w:9,t:'One phone number appears on every external listing (call tracking, if used, is on my own site only)'},
      {w:6,t:'My hours match between my website and my Google Business Profile right now'},
      {w:8,t:'No old address or disconnected number is still live anywhere I can find'}
    ]},
    {name:'Layer 2 · Structured data',items:[
      {w:8,t:'My site has LocalBusiness or Organization schema stating name, address, phone and hours'},
      {w:4,t:'The schema matches what a visitor actually sees on the page'},
      {w:4,t:'I have Person schema tying a named human to the business'}
    ]},
    {name:'Layer 3 · sameAs',items:[
      {w:7,t:'My schema includes a sameAs array linking my verified profiles'},
      {w:4,t:'I have checked in the last year that every sameAs URL still resolves'}
    ]},
    {name:'Layer 4 · Corroboration',items:[
      {w:8,t:'I have received at least one review in the last 30 days'},
      {w:5,t:'I respond to reviews — positive and negative'},
      {w:4,t:'I appear on at least five independent directories with matching details'}
    ]},
    {name:'Layer 5 · Specificity & access',items:[
      {w:6,t:'My site names specific cities, neighbourhoods or service areas rather than "the metro area"'},
      {w:7,t:'My robots.txt does not block GPTBot, ClaudeBot, PerplexityBot or Google-Extended'}
    ]}
  ];

  var TOTAL=0;
  GROUPS.forEach(function(g){g.items.forEach(function(i){TOTAL+=i.w;});});

  var BANDS=[
    {min:90,lab:'Verifiable',v:'<b>Strong.</b> Your business is straightforward for a machine to identify and confirm. At this level the remaining work is corroboration volume and content specificity rather than repair — and you are already ahead of most competitors in any local market.'},
    {min:70,lab:'Mostly solid',v:'<b>Good foundation with gaps.</b> Nothing here is fatal, but the unticked boxes are exactly where confidence leaks. Work down the list in layer order — consistency issues first, because everything above that layer depends on them.'},
    {min:45,lab:'Fragmented',v:'<b>Your identity is fragmented.</b> A machine assembling a record of you is currently finding contradictions and resolving them conservatively — which usually means naming someone else. The good news: nearly everything on this list is free to fix and mostly needs patience.'},
    {min:20,lab:'Hard to verify',v:'<b>You are difficult to verify.</b> This is the profile that produces respectable Google rankings alongside total absence from AI answers. Start with Layer 1 and do nothing else until it is complete — schema built on inconsistent facts makes the problem worse, not better.'},
    {min:0,lab:'Start here',v:'Tick the boxes above that are genuinely true of your business today. Be honest rather than optimistic — an inflated score just means fixing the wrong things.'}
  ];

  function render(){
    var html='';
    GROUPS.forEach(function(g,gi){
      html+='<div class="score-group"><h4>'+g.name+'</h4>';
      g.items.forEach(function(it,ii){
        html+='<div class="score-row" role="checkbox" tabindex="0" aria-checked="false" data-g="'+gi+'" data-i="'+ii+'" data-w="'+it.w+'">'+
                '<span class="score-box" aria-hidden="true">✓</span>'+
                '<span>'+it.t+'</span>'+
              '</div>';
      });
      html+='</div>';
    });
    body.innerHTML=html;

    body.querySelectorAll('.score-row').forEach(function(r){
      function toggle(){
        var on=r.classList.toggle('on');
        r.setAttribute('aria-checked',on?'true':'false');
        tally();
      }
      r.addEventListener('click',toggle);
      r.addEventListener('keydown',function(e){
        if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}
      });
    });
  }

  function tally(){
    var got=0;
    body.querySelectorAll('.score-row.on').forEach(function(r){
      got+=parseInt(r.getAttribute('data-w'),10);
    });
    var pct=Math.round((got/TOTAL)*100);
    fill.style.width=pct+'%';
    num.innerHTML=pct+'<small>/100</small>';
    for(var i=0;i<BANDS.length;i++){
      if(pct>=BANDS[i].min){ lab.textContent=BANDS[i].lab; verdict.innerHTML=BANDS[i].v; break; }
    }
  }

  reset.addEventListener('click',function(){
    body.querySelectorAll('.score-row.on').forEach(function(r){
      r.classList.remove('on'); r.setAttribute('aria-checked','false');
    });
    tally();
  });

  render();
  tally();
})();

