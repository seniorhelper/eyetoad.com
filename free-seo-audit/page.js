
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
  var boxes=document.querySelectorAll('.sa-cb');
  if(!boxes.length)return;
  var fill=document.getElementById('saFill');
  var scoreEl=document.getElementById('saScore');
  var verdictEl=document.getElementById('saVerdict');
  var fixWrap=document.getElementById('saFixWrap');
  var fixList=document.getElementById('saFixes');
  var scoreField=document.getElementById('auScoreField');

  var FIX={
    q1:{t:'Get on page one for your core service + city',
        d:'This is the single biggest gap on the list. Start with whether the page targeting that term exists at all, is indexed, and says the thing plainly. <a href="/seo-systems/">The 5-Layer system</a> covers the sequence.'},
    q2:{t:'Get into the Google map pack',
        d:'For a local service business this often drives more calls than everything below it combined. Usually blocked by an incomplete profile, wrong primary category, or inconsistent business details. See <a href="/local-seo-denver/">local SEO</a>.'},
    q3:{t:'Complete your Google Business Profile and restart reviews',
        d:'Cheapest high-impact work available. Fill every field, pick the most specific primary category, and get a review habit going — a profile whose last review is 18 months old reads as a business that may have closed.'},
    q4:{t:'Fix mobile speed — test on cellular, not wifi',
        d:'Aim for usable within about 2.5 seconds. Images are almost always the culprit. This one helps rankings and conversions simultaneously, which few fixes do.'},
    q5:{t:'Get named by AI assistants',
        d:'Being absent here is now a distinct failure from ranking poorly. Fixes differ by engine — <a href="/aio-seo-system/">AI Overviews</a> lean on Google\u2019s index, while <a href="/generative-engine-optimization-system/">ChatGPT and Perplexity</a> weigh how the wider web describes you.'},
    q6:{t:'Let the AI crawlers in',
        d:'Check robots.txt for GPTBot, PerplexityBot, ClaudeBot and Google-Extended. Sites block these by accident far more often than on purpose, and a blocked crawler cannot cite you no matter how good the content is.'},
    q7:{t:'Add structured data',
        d:'Schema markup is how machines resolve what your business actually is. Not a ranking lever on its own, but it underpins several that are. The <a href="/blog/entity-signals-search-engines/">entity signals guide</a> covers what to add.'},
    q8:{t:'Fix the conversion path — and test your own form',
        d:'A broken form costs more than any ranking problem, and it fails silently. Submit your own, check spam, confirm delivery. Then make the phone number tappable without scrolling. <a href="/conversion-optimization/">More here</a>.'},
    q9:{t:'Start tracking phone calls',
        d:'Around 40% of lead conversions arrive by phone. Untracked, you are seeing roughly 60% of your results and judging campaigns, pages and agencies on a number that is missing the rest.'},
    q10:{t:'Work out your conversion rate',
        d:'Leads divided by visitors. Without it you cannot tell whether you have a traffic problem or a conversion problem \u2014 and those need opposite responses. Fix tracking first, then this becomes trivial.'}
  };

  var MAX=0;
  boxes.forEach(function(b){MAX+=parseInt(b.getAttribute('data-w'),10);});

  function verdict(pts,pct,missing){
    if(pts===0)return{s:'Check the boxes above to see your score',
      v:'Almost nobody checks all ten. The useful part isn\u2019t the number \u2014 it\u2019s which ones you left empty.'};
    // Which category dominates the misses? That is the real finding.
    var tally={vis:0,conv:0,meas:0,tech:0,ai:0};
    missing.forEach(function(m){tally[m.k]+=m.w;});
    var kind='', top=Math.max(tally.vis,tally.conv,tally.meas,tally.tech+tally.ai);
    if(top===0){kind='';}
    else if(tally.meas===top){kind='Your biggest gaps are in <strong>measurement</strong> \u2014 which means fix those first, because every other number you have is currently unreliable.';}
    else if(tally.conv===top){kind='Your biggest gap is <strong>conversion</strong> \u2014 you may already have the traffic. Buying more before fixing this raises the cost of every future visit.';}
    else if(tally.vis===top){kind='Your biggest gaps are in <strong>visibility</strong> \u2014 people are not finding you in the first place, so the work starts upstream.';}
    else{kind='Your biggest gaps are <strong>technical and AI-side</strong> \u2014 the foundations that let everything else compound.';}

    var band;
    if(pct<40)band='Major opportunity. Plenty is being left on the table, which is genuinely good news \u2014 these are the gaps that close fastest.';
    else if(pct<65)band='A real foundation with clear gaps. You are past the hard part; what remains is usually a short list.';
    else if(pct<88)band='Ahead of most competitors in this market. What is left tends to be the fine-grained work that separates the top three from everyone else.';
    else band='Genuinely strong. Even sites at this level usually have something quiet costing them \u2014 worth confirming rather than assuming.';

    return {s:pct+'% \u2014 '+pts+' of '+MAX+' points', v:band+(kind?' '+kind:'')};
  }

  function update(){
    var pts=0, missing=[];
    boxes.forEach(function(b){
      var w=parseInt(b.getAttribute('data-w'),10);
      if(b.checked){pts+=w;}
      else{missing.push({id:b.id,w:w,k:b.getAttribute('data-k')});}
    });
    var pct=Math.round(pts/MAX*100);
    fill.style.width=pct+'%';

    var r=verdict(pts,pct,missing);
    scoreEl.innerHTML=r.s.replace(/(\d+%)/,'<em>$1</em>');
    verdictEl.innerHTML=r.v;

    // sorted fix list — heaviest first, original order as tiebreak
    missing.sort(function(a,b){
      if(b.w!==a.w)return b.w-a.w;
      return parseInt(a.id.slice(1),10)-parseInt(b.id.slice(1),10);
    });
    if(pts>0&&missing.length){
      var h='';
      missing.forEach(function(m){
        var f=FIX[m.id];
        if(f)h+='<li><b>'+f.t+'</b><span>'+f.d+'</span></li>';
      });
      fixList.innerHTML=h;
      fixWrap.style.display='block';
    }else if(pts>0&&!missing.length){
      fixList.innerHTML='<li><b>Nothing on this list is failing</b><span>That is rare. It also means the constraint is somewhere this check does not reach \u2014 competitive investment, market size, or something downstream of marketing. Worth confirming with a full audit rather than assuming.</span></li>';
      fixWrap.style.display='block';
    }else{
      fixWrap.style.display='none';
    }

    if(scoreField){scoreField.value=pts>0?(pts+'/'+MAX+' ('+pct+'%)'):'not run';}
  }

  boxes.forEach(function(b){b.addEventListener('change',update);});
  update();
})();

(function(){
  var form=document.getElementById('auForm');
  if(!form)return;
  var load=document.getElementById('auLoad');
  if(load)load.value=Date.now();
  var btn=document.getElementById('auGo');
  var err=document.getElementById('auErr');
  var ok=document.getElementById('auOk');
  var note=document.getElementById('auNote');
  var last=0;
  function fail(m){err.textContent=m;err.style.display='block';}
  function buildAction(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    err.style.display='none';

    if(form.querySelector('[name="_honey"]').value!==''){return;}
    if(form.querySelector('[name="company_site_url"]').value!==''){return;}
    if(Date.now()-Number(load.value||0)<4000){return fail('Please take a moment, then send again.');}
    var now=Date.now();
    if(last&&(now-last)<60000){return fail('Please wait a moment before submitting again.');}

    var name=document.getElementById('au-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('au-email').value.trim())){return fail('Please enter a valid email address.');}
    if(document.getElementById('au-phone').value.replace(/\D/g,'').length<10){return fail('Please enter a valid phone number (10+ digits).');}
    if(document.getElementById('au-site').value.trim().length<4){return fail('Please add your website so we know where to look.');}
    var msg=document.getElementById('au-msg').value;
    if(/\b(viagra|casino|crypto|bitcoin|loan|buy followers|cheap traffic|make money fast|click here|free money)\b/i.test(msg)){return;}

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
        ok.innerHTML='<strong style="display:block;margin-bottom:6px;color:#065F46;">Request received \u2014 thank you.</strong>We will audit your site and walk you through the findings, usually within a few business days. Check your spam folder if you do not hear from us.';
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
  var go = document.getElementById('tw-go');
  if (!go) return;
  var inp = document.getElementById('tw-url');
  var rev = document.getElementById('tw-rev');
  function tidy(v){
    v = String(v || '').trim().replace(/^\s*https?:\/\//i, '').replace(/\/+$/, '');
    return v.indexOf('.') === -1 ? '' : 'https://' + v;
  }
  function run(){
    var url = tidy(inp.value);
    if (!url){
      inp.focus(); inp.style.borderColor = '#C0392B';
      setTimeout(function(){ inp.style.borderColor = ''; }, 1600);
      return;
    }
    try {
      window.open('https://pagespeed.web.dev/analysis?url=' + encodeURIComponent(url),
                  '_blank', 'noopener');
    } catch(e){}
    if (rev && rev.hasAttribute('hidden')) rev.removeAttribute('hidden');
    var site = document.getElementById('au-site');
    if (site && !site.value) site.value = url;
  }
  go.addEventListener('click', run);
  inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') run(); });
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

