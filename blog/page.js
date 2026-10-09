
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
  var grid=document.getElementById('postGrid');
  if(!grid)return;
  var cards=Array.prototype.slice.call(grid.querySelectorAll('.post-card'));
  var input=document.getElementById('blogSearch');
  var clear=document.getElementById('blogClear');
  var countEl=document.getElementById('blogCount');
  var labelEl=document.getElementById('gridLabel');
  var noRes=document.getElementById('noResults');
  var featured=document.getElementById('featuredPost');
  var all=featured?cards.concat([featured]):cards;
  var catBtns=Array.prototype.slice.call(document.querySelectorAll('#blogCats .tb-cat'));
  var topicBtns=Array.prototype.slice.call(document.querySelectorAll('#topicList button'));

  var LABELS={all:'All articles',local:'Local SEO & Maps',ai:'AI Search & GEO',
              strategy:'Strategy & Planning',tech:'Technology',conversion:'Conversion'};
  var activeCat='all';

  function fillCounts(){
    var tally={all:all.length};
    all.forEach(function(c){
      var k=c.getAttribute('data-cat');
      tally[k]=(tally[k]||0)+1;
    });
    topicBtns.forEach(function(b){
      var n=b.querySelector('.tc-n');
      if(n)n.textContent=tally[b.getAttribute('data-cat')]||0;
    });
  }

  function apply(){
    var q=(input.value||'').trim().toLowerCase();
    var shown=0;
    all.forEach(function(c){
      var catOk = activeCat==='all' || c.getAttribute('data-cat')===activeCat;
      var hay=(c.textContent+' '+(c.getAttribute('data-search')||'')).toLowerCase();
      var qOk = !q || hay.indexOf(q)!==-1;
      var vis = catOk && qOk;
      if(c===featured){ c.style.display = vis ? '' : 'none'; }
      else { c.classList.toggle('hide',!vis); }
      if(vis)shown++;
    });
    clear.classList.toggle('show',!!q);
    labelEl.textContent=LABELS[activeCat]||'All articles';
    countEl.innerHTML='Showing <b>'+shown+'</b> of '+all.length+' articles'+
                      (q?' matching &ldquo;'+q.replace(/[<>&]/g,'')+'&rdquo;':'');
    noRes.classList.toggle('show',shown===0);
    var gridShown=cards.filter(function(c){return !c.classList.contains('hide');}).length;
    grid.style.display = gridShown===0 ? 'none' : '';
  }

  function setCat(cat){
    activeCat=cat;
    catBtns.forEach(function(b){b.classList.toggle('on',b.getAttribute('data-cat')===cat);});
    topicBtns.forEach(function(b){b.classList.toggle('on',b.getAttribute('data-cat')===cat&&cat!=='all');});
    apply();
  }

  input.addEventListener('input',apply);
  clear.addEventListener('click',function(){input.value='';input.focus();apply();});
  catBtns.forEach(function(b){b.addEventListener('click',function(){setCat(b.getAttribute('data-cat'));});});
  topicBtns.forEach(function(b){
    b.addEventListener('click',function(){
      setCat(b.getAttribute('data-cat'));
      var tb=document.querySelector('.toolbar');
      if(tb)tb.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  document.getElementById('resetFilters').addEventListener('click',function(){
    input.value='';setCat('all');
  });

  fillCounts();
  apply();
})();

(function(){
  var form=document.getElementById('blog-audit-form');
  if(!form)return;
  document.getElementById('_loadtime_blog').value=Date.now();
  var btn=document.getElementById('btn-blog');
  var err=document.getElementById('err-blog');
  var ok=document.getElementById('ok-blog');
  var note=document.getElementById('note-blog');
  var last=0;
  function show(m){err.textContent=m;err.style.display='block';}

  function buildAction(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    err.style.display='none';

    if(document.getElementById('_honey_blog').value!==''){return;}
    if(document.getElementById('_decoy_blog').value!==''){return;}

    var elapsed=Date.now()-parseInt(document.getElementById('_loadtime_blog').value||'0',10);
    if(elapsed<4000){show('Please take a moment to fill out the form.');return;}

    var now=Date.now();
    if(last&&(now-last)<60000){show('Please wait a moment before submitting again.');return;}

    var name=document.getElementById('bl-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){show('Please enter a valid name.');return;}

    var site=document.getElementById('bl-website').value.trim();
    if(site.length<4){show('Please enter your website address.');return;}

    var phone=document.getElementById('bl-phone').value.replace(/\D/g,'');
    if(phone.length<10){show('Please enter a valid phone number (10+ digits).');return;}

    var email=document.getElementById('bl-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){show('Please enter a valid email address.');return;}

    last=now;
    btn.disabled=true;
    btn.textContent='Sending...';

    var fd=new FormData(form);
    fd.append('page_url',location.href);
    fetch(buildAction((form.getAttribute('data-u')||'info')+'@'+(form.getAttribute('data-d')||'eyetoad.com')),{method:'POST',body:fd})
      .then(function(r){return r.ok?r.json():Promise.reject();})
      .then(function(){
        form.style.display='none';
        note.style.display='none';
        ok.style.display='block';
        ok.innerHTML='<strong style="color:#fff;display:block;margin-bottom:6px;">Request received.</strong>We will review your site and reply by email, usually within one business day. Check the spam folder if you do not see it.';
      })
      .catch(function(){
        btn.disabled=false;
        btn.textContent='Request My Free Audit';
        show('That did not go through. Please email ' + (('inf'+'o')+'@'+'eyetoad.com') + ' or call (720) 249-6588.');
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

var INSIGHTS = {
  local: {
    q: 'Should you care about your Google Business Profile?',
    a: 'Around <b>46% of all Google searches</b> have local intent, and the map pack is the first thing most of them see \u2014 above the blue links.',
    src: 'Google Search Central',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business'
  },
  ai: {
    q: 'Is AI search actually taking your traffic?',
    a: 'Google reports AI Overviews now appear on a large share of queries, and cited brands earn <b>roughly 120% more organic clicks</b> than uncited ones on the same search.',
    src: 'Google \u2014 AI in Search',
    url: 'https://blog.google/products/search/generative-ai-search/'
  },
  conversion: {
    q: 'Traffic is up but the phone is quiet?',
    a: 'Google\u2019s own data: <b>53% of mobile visits are abandoned</b> if a page takes longer than three seconds. The visit never becomes a call.',
    src: 'Think with Google',
    url: 'https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/'
  },
  tech: {
    q: 'Do Core Web Vitals really matter?',
    a: 'Google treats page experience as a ranking signal and publishes the thresholds openly \u2014 <b>LCP under 2.5s, INP under 200ms</b>. You can check yours free, right now.',
    src: 'web.dev \u2014 Google',
    url: 'https://web.dev/articles/vitals'
  },
  strategy: {
    q: 'Not sure where to spend first?',
    a: 'The SBA\u2019s own guidance is blunt about it: businesses that plan before they spend survive longer. <b>Free mentoring exists</b> and almost nobody uses it.',
    src: 'U.S. Small Business Administration',
    url: 'https://www.sba.gov/business-guide/grow-your-business'
  }
};

(function(){
  'use strict';
  var host = document.getElementById('insightPop');
  if (!host) return;
  var open = null, hideT = null;

  function esc(s){ return String(s).replace(/[<>&"]/g, function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

  function show(card){
    var cat = card.getAttribute('data-cat');
    var d = INSIGHTS[cat];
    if (!d) return;
    clearTimeout(hideT);
    host.innerHTML =
      '<p class="ip-q">' + esc(d.q) + '</p>' +
      '<p class="ip-a">' + d.a + '</p>' +
      '<a class="ip-src" href="' + d.url + '" target="_blank" rel="noopener">Source: ' +
      esc(d.src) + ' \u2197</a>';
    var r = card.getBoundingClientRect();
    var top = r.top + window.scrollY - 12;
    var left = r.left + window.scrollX + r.width / 2;
    var w = 300;
    left = Math.max(w/2 + 10, Math.min(left, window.innerWidth - w/2 - 10));
    host.style.top = top + 'px';
    host.style.left = left + 'px';
    host.classList.add('on');
    open = card;
  }
  function hide(){
    hideT = setTimeout(function(){ host.classList.remove('on'); open = null; }, 140);
  }

  var cards = document.querySelectorAll('.post-card[data-cat]');
  for (var i = 0; i < cards.length; i++){
    (function(c){
      c.addEventListener('mouseenter', function(){ show(c); });
      c.addEventListener('mouseleave', hide);
      c.addEventListener('focusin', function(){ show(c); });
      c.addEventListener('focusout', hide);
    })(cards[i]);
  }
  host.addEventListener('mouseenter', function(){ clearTimeout(hideT); });
  host.addEventListener('mouseleave', hide);
  var chips = document.querySelectorAll('.pc-cat');
  for (var j = 0; j < chips.length; j++){
    (function(ch){
      ch.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        var card = ch.closest('.post-card');
        if (card) (open === card ? hide() : show(card));
      });
    })(chips[j]);
  }
})();

(function(){
  var BATCH = 12;                 /* shown before the button appears */
  var grid = document.getElementById('postGrid');
  var wrap = document.getElementById('loadMoreWrap');
  var btn  = document.getElementById('loadMoreBtn');
  var note = document.getElementById('loadMoreNote');
  if (!grid || !wrap || !btn) return;

  function cards(){
    return [].slice.call(grid.querySelectorAll('.post-card'))
             .filter(function(c){ return c.style.display !== 'none'; });
  }
  var shown = BATCH;

  function apply(){
    var list = cards();
    if (list.length <= BATCH){
      wrap.hidden = true;
      list.forEach(function(c){ c.classList.remove('lm-hidden'); });
      return;
    }
    list.forEach(function(c, i){
      c.classList.toggle('lm-hidden', i >= shown);
    });
    var left = list.length - shown;
    wrap.hidden = left <= 0;
    if (note) note.textContent = left > 0 ? (left + ' more ' + (left === 1 ? 'post' : 'posts')) : '';
  }

  btn.addEventListener('click', function(){
    shown += BATCH; apply();
  });

  document.addEventListener('click', function(e){
    if (e.target && e.target.classList && e.target.classList.contains('tb-cat')){
      shown = BATCH;
      setTimeout(apply, 30);
    }
  });
  apply();
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

