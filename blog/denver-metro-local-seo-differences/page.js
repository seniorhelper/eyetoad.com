
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
          btn.disabled=false;btn.textContent='Check my markets →';
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
  var selA=document.getElementById('cityA'), selB=document.getElementById('cityB');
  var colA=document.getElementById('colA'), colB=document.getElementById('colB');
  var verdict=document.getElementById('cmpVerdict');
  if(!selA||!selB)return;

  var CITIES=[
    {id:'denver',name:'Denver',pop:'~715,000',county:'Denver County',den:3,
     page:'/',character:'The primary market and the deepest fight in the state.',
     best:'Everything, at a price',
     note:'National lead generation sites hold many top organic positions and established competitors hold the map pack. Winnable, but plan in years. Neighbourhood-level targeting frequently outperforms city-level here.'},
    {id:'aurora',name:'Aurora',pop:'~394,000',county:'Arapahoe, Adams & Douglas',den:3,
     page:'/locations/aurora-seo/',character:'Colorado\u2019s third-largest city, spanning three counties.',
     best:'Healthcare, home services, retail',
     note:'The Anschutz Medical Campus and Southlands anchor very different ends of a very large market. Size means depth of competition in most categories, so pick a sub-area rather than the whole city.'},
    {id:'lakewood',name:'Lakewood',pop:'~157,000',county:'Jefferson County',den:3,
     page:'/locations/lakewood-seo/',character:'Colorado\u2019s fifth-largest city, dense commercially.',
     best:'Home services, retail, professional',
     note:'Belmar, West Colfax and the Union Boulevard corridor behave differently enough that Lakewood is closer to three sub-markets than one. Treat it accordingly.'},
    {id:'thornton',name:'Thornton',pop:'~148,000',county:'Adams County',den:1,
     page:'/locations/thornton-seo/',character:'The largest Denver suburb by population.',
     best:'Home services, contractors, retail',
     note:'Growth corridor along I-25 and 120th Avenue with heavy home services demand and comparatively light search competition. One of the strongest opportunity-to-effort ratios in the metro.'},
    {id:'arvada',name:'Arvada',pop:'~123,000',county:'Jefferson County',den:2,
     page:'/locations/arvada-seo/',character:'One of the most commercially active mid-sized cities in Jefferson County.',
     best:'Home services, dental, local retail',
     note:'Olde Town, the Wadsworth corridor and rapid expansion toward Candelas each pull different demand. Moderate competition and a well-established local business community.'},
    {id:'westminster',name:'Westminster',pop:'~116,000',county:'Adams & Jefferson',den:2,
     page:'/locations/westminster-seo/',character:'Spans two counties between Arvada and Thornton.',
     best:'Home services, professional, retail',
     note:'The Downtown Westminster redevelopment and Church Ranch corridor are creating new commercial search demand. Sitting between two counties can complicate citation consistency \u2014 worth checking carefully.'},
    {id:'centennial',name:'Centennial',pop:'~109,000',county:'Arapahoe County',den:2,
     page:'/locations/centennial-seo/',character:'Affluent Arapahoe County, bordering the Denver Tech Center.',
     best:'Medical, legal, dental, premium home services',
     note:'High household incomes make this one of the strongest markets in the metro for high-value services. Competition is moderate but the customer value is high enough to justify a longer campaign.'},
    {id:'highlands-ranch',name:'Highlands Ranch',pop:'~103,000',county:'Douglas County',den:2,
     page:'/locations/highlands-ranch-seo/',character:'One of Colorado\u2019s largest master-planned communities.',
     best:'Home services, healthcare, professional',
     note:'Not an incorporated city \u2014 an unincorporated census-designated place, so boundaries are looser in some data sources and residents sometimes describe themselves as Littleton. Target both name variants.'},
    {id:'castle-rock',name:'Castle Rock',pop:'~84,000',county:'Douglas County',den:1,
     page:'/locations/castle-rock-seo/',character:'Douglas County\u2019s fastest-growing city.',
     best:'Contractors, home services, professional',
     note:'High household incomes and rapid residential expansion create a strong and still-winnable opportunity. Fewer established competitors have invested seriously in local search here.'},
    {id:'broomfield',name:'Broomfield',pop:'~79,000',county:'Broomfield County',den:2,
     page:'/locations/broomfield-seo/',character:'The Denver\u2013Boulder tech corridor.',
     best:'Professional services, tech, premium home services',
     note:'Interlocken and Flatiron business parks drive a high-income, tech-employed population that researches thoroughly and reads reviews carefully. Depth of proof matters more here than volume.'},
    {id:'parker',name:'Parker',pop:'~66,000',county:'Douglas County',den:1,
     page:'/locations/parker-seo/',character:'One of the fastest-growing corridors in the metro.',
     best:'Contractors, home services, family services',
     note:'Continuous new residential construction means steady contractor demand with lighter competition than the core metro. Frequently the single most winnable market on this list.'},
    {id:'littleton',name:'Littleton',pop:'~46,000',county:'Arapahoe & Jefferson',den:2,
     page:'/locations/littleton-seo/',character:'South metro anchor with a strong historic downtown.',
     best:'Professional services, dental, local retail',
     note:'High-income demographics and a dense professional services market for its size. Punches above its population in commercial search demand.'},
    {id:'wheat-ridge',name:'Wheat Ridge',pop:'~33,000',county:'Jefferson County',den:1,
     page:'/locations/wheat-ridge-seo/',character:'Between Denver, Lakewood and Arvada.',
     best:'Home services, local retail, trades',
     note:'The 38th Avenue district and light rail corridor are driving revitalisation, and competition remains lighter than in any neighbouring city. Small population, low entry price.'}
  ];

  var DEN=[null,
    {c:'den-low',t:'Lighter competition'},
    {c:'den-mid',t:'Moderate competition'},
    {c:'den-hi',t:'High competition'}
  ];

  function esc(s){return String(s).replace(/[<>&]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}

  function opts(sel,def){
    sel.innerHTML=CITIES.map(function(c){
      return '<option value="'+c.id+'"'+(c.id===def?' selected':'')+'>'+esc(c.name)+'</option>';
    }).join('');
  }

  function find(id){ for(var i=0;i<CITIES.length;i++){ if(CITIES[i].id===id) return CITIES[i]; } return CITIES[0]; }

  function panel(c){
    var d=DEN[c.den];
    return '<p class="cmp-city">'+esc(c.name)+'</p>'+
      '<p class="cmp-sub">'+esc(c.county)+'</p>'+
      '<div class="cmp-stat"><span class="cs-k">Population</span><span class="cs-v">'+esc(c.pop)+'</span></div>'+
      '<div class="cmp-stat"><span class="cs-k">Competition</span><span class="cs-v"><span class="den '+d.c+'">'+d.t+'</span></span></div>'+
      '<div class="cmp-stat"><span class="cs-k">Strongest for</span><span class="cs-v">'+esc(c.best)+'</span></div>'+
      '<p class="cmp-note"><strong>'+esc(c.character)+'</strong> '+esc(c.note)+'</p>'+
      '<a href="'+c.page+'" class="cmp-go">'+(c.id==='denver'?'Denver SEO strategy':esc(c.name)+' SEO strategy')+' <span aria-hidden="true">\u2192</span></a>';
  }

  function verdictText(a,b){
    if(a.id===b.id){
      return '<p class="cv-k">Pick two different cities</p><p>Choose a different market in one of the selectors to see them side by side.</p>';
    }
    var easier = a.den<b.den ? a : (b.den<a.den ? b : null);
    var msg;
    if(easier){
      var harder = easier===a ? b : a;
      msg='<b>'+esc(easier.name)+'</b> is the lower-cost entry of the two. Fewer established competitors have invested seriously in local search there, so the review count you need to reach the top three is lower and the timeline is shorter. '+
          '<b>'+esc(harder.name)+'</b> will take longer and cost more \u2014 which can still be correct if customers are worth enough there to justify it.';
    } else {
      msg='These two sit at similar competitive density, so the deciding factors become <b>proximity</b> and <b>customer value</b>. Whichever is closer to your actual address has the map pack advantage, and whichever produces higher average project values deserves the budget.';
    }
    return '<p class="cv-k">The read</p><p>'+msg+' Remember that difficulty is category-specific \u2014 check your own service in each market before committing.</p>';
  }

  function render(){
    var a=find(selA.value), b=find(selB.value);
    colA.innerHTML=panel(a);
    colB.innerHTML=panel(b);
    verdict.innerHTML=verdictText(a,b);
  }

  opts(selA,'denver');
  opts(selB,'thornton');
  selA.addEventListener('change',render);
  selB.addEventListener('change',render);
  render();
})();

