
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
  var boxes=document.querySelectorAll('.chk-box');
  var score=document.getElementById('chkScore');
  var verdict=document.getElementById('chkVerdict');
  var cta=document.getElementById('chkCta');
  if(!boxes.length||!score||!verdict) return;

  function band(n){
    if(n>=9) return {t:"That's a genuinely well-built page. Whatever's limiting your visibility is probably upstream of this page — domain authority, topical depth across the site, or third-party corroboration. Go and do something else with your afternoon.",cta:false};
    if(n>=7) return {t:"Solid foundation with a couple of real gaps. The unticked boxes above are your shortlist, and most of them are an afternoon of work rather than a project. Fix those before spending anything.",cta:false};
    if(n>=4) return {t:"About average, which means there's meaningful room. Start with any unticked box in the first five — structure and eligibility gate everything else, and no amount of corroboration rescues a buried answer.",cta:true};
    if(n>=1) return {t:"There's real ground to make up here, and that's usually good news: the fixes are known and mostly cheap. Work top to bottom — eligibility first, then structure, then coverage.",cta:true};
    return "Tick the boxes above and this updates as you go.";
  }

  function update(){
    var n=0;
    boxes.forEach(function(b){ if(b.checked) n++; });
    score.textContent=n+' of 10';
    var r=band(n);
    if(typeof r==='string'){
      verdict.textContent=r;
      if(cta) cta.style.display='none';
      return;
    }
    verdict.textContent=r.t;
    if(cta) cta.style.display=r.cta?'flex':'none';
  }
  boxes.forEach(function(b){ b.addEventListener('change',update); });
  update();
})();

(function(){
  var input=document.getElementById('trigIn');
  var go=document.getElementById('trigGo');
  var res=document.getElementById('trigRes');
  var ex=document.getElementById('trigEx');
  if(!input||!go||!res)return;

  var Q=['how','what','why','when','where','which','who','can','do','does','is','are','should','will','would'];
  var CMP=['vs','versus','compared','difference','better','best','top','alternative','alternatives','or'];
  var COST=['cost','costs','price','pricing','cheap','expensive','worth','afford','budget','rate','rates','fee','fees'];
  var LOC=['near me','denver','colorado','aurora','lakewood','thornton','arvada','westminster','centennial','littleton','broomfield','parker','castle rock','wheat ridge','highlands ranch','near by','nearby','in my area'];

  function esc(s){return String(s).replace(/[<>&"]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});}

  function score(raw){
    var q=raw.toLowerCase().trim().replace(/[?!.]+$/,'');
    var words=q.split(/\s+/).filter(Boolean);
    var n=words.length, s=0, sig=[], miss=[], localKind='none';

    var isQ = Q.indexOf(words[0])>-1;
    var hasLoc = LOC.some(function(l){return q.indexOf(l)>-1;});

    if(isQ){s+=32;sig.push('Starts with a question word. Question-phrased queries trigger AI Overviews far more often than statements or bare keywords.');}
    else{miss.push('Doesn\u2019t start with a question word. Rephrasing as \u201chow\u201d, \u201cwhat\u201d or \u201cwhy\u201d is the single biggest lever available here.');}

    if(n>=8){s+=22;sig.push('Long and conversational ('+n+' words). Longer queries trigger Overviews more reliably than short generic ones \u2014 and AI Mode fans them out wider still.');}
    else if(n>=5){s+=12;sig.push('Moderate length ('+n+' words). Adding specifics would push this higher.');}
    else{miss.push('Short query ('+n+' word'+(n===1?'':'s')+'). Brief generic terms trigger Overviews least often \u2014 Google usually just shows results.');}

    if(words.some(function(w){return CMP.indexOf(w)>-1;})){s+=14;sig.push('Comparison structure detected. Comparisons reliably produce Overviews \u2014 and reward an actual comparison table in your content.');}
    if(words.some(function(w){return COST.indexOf(w)>-1;})){s+=14;sig.push('Cost or value intent detected. Pricing questions trigger Overviews consistently and carry high commercial intent.');}

    if(hasLoc){
      if(isQ||n>=6){
        localKind='info';
        s+=20;
        sig.push('Informational\u2011local intent. Per Whitespark, this shape triggers an AI Overview roughly 77% of the time \u2014 the highest-risk, highest-opportunity category in local search.');
      } else {
        localKind='nearme';
        s-=12;
        miss.push('Plain \u201cnear me\u201d shape. Whitespark found Overviews on only ~15% of these \u2014 you will usually still get a normal local pack. This is a Google Business Profile job, not an AI Overview job.');
      }
    }

    if(/^[a-z0-9'\-]+ ?(reviews|login|hours|phone|address)?$/.test(q)&&n<=2){s-=20;miss.push('Looks navigational. Brand or single-term lookups rarely produce an Overview at all.');}

    return {score:Math.max(0,Math.min(100,s)),sig:sig,miss:miss,n:n,localKind:localKind};
  }

  function band(v){
    if(v>=60)return{cls:'tr-hi',label:'High likelihood',head:'This query very likely shows an AI Overview'};
    if(v>=32)return{cls:'tr-mid',label:'Moderate likelihood',head:'This query may show an AI Overview'};
    return{cls:'tr-lo',label:'Low likelihood',head:'This query probably shows standard results'};
  }

  function advice(r){
    if(r.localKind==='nearme'){
      return 'This is the query shape that is <em>least</em> affected by AI Overviews, and that is genuinely good news \u2014 your customer in this moment is tapping a map listing, not reading a summary. Put your effort into the Google Business Profile, reviews and proximity signals that win the local pack. Then go and test the same topic phrased as a question, because that is where your visibility is quietly leaking.';
    }
    if(r.localKind==='info'){
      return 'This is the shape that is being eaten. Informational\u2011local questions trigger Overviews around 77% of the time, which is why owners tell us their map pack looks fine while the phone got quieter \u2014 the layer feeding people into their world weeks before they call is the layer being summarized. Give this question its own clearly headed section, answer it in the opening sentence, and check who is currently cited for it.';
    }
    if(r.score>=60)return 'Treat this as a priority page. Give the answer its own clearly headed section, state it in the opening sentence, and add a table or step list if the question implies a comparison or a sequence. This is exactly the kind of query where being one of the cited sources is worth real money.';
    if(r.score>=32)return 'Worth covering, and worth phrasing more specifically. Try adding the location, the timeframe, or the qualifier a real customer would include \u2014 more specific questions trigger Overviews more reliably and usually convert better too.';
    return 'This query likely returns ordinary results, so classic ranking work matters more here than answer structure. That is not a problem \u2014 just optimise it as a normal page and put your Overview effort into the question-shaped queries your buyers actually ask.';
  }

  function run(){
    var raw=input.value.trim();
    if(!raw){input.focus();return;}
    var r=score(raw), b=band(r.score);
    var h='<span class="tr-band '+b.cls+'">'+b.label+' \u00b7 '+r.score+'/100</span>'+
          '<p class="tr-head">'+b.head+'</p>'+
          '<p style="font-family:\'JetBrains Mono\',monospace;font-size:.86rem;color:var(--muted);margin-bottom:14px">\u201c'+esc(raw)+'\u201d</p>'+
          '<p>'+advice(r)+'</p>';
    if(r.sig.length){
      h+='<div class="tr-sig"><p class="ts-k">Working in your favour</p><ul>';
      r.sig.forEach(function(t){h+='<li>'+t+'</li>';});
      h+='</ul></div>';
    }
    if(r.miss.length){
      h+='<div class="tr-sig"><p class="ts-k">Working against it</p><ul>';
      r.miss.forEach(function(t){h+='<li>'+t+'</li>';});
      h+='</ul></div>';
    }
    h+='<button class="trig-again" type="button" id="trigAgain">\u21ba Try another query</button>';
    res.innerHTML=h;
    res.classList.add('on');
    var again=document.getElementById('trigAgain');
    if(again){again.addEventListener('click',function(){
      res.classList.remove('on');res.innerHTML='';input.value='';input.focus();
    });}
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  go.addEventListener('click',run);
  input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();run();}});
  if(ex){ex.querySelectorAll('button').forEach(function(b){
    b.addEventListener('click',function(){input.value=b.getAttribute('data-q');run();});
  });}
})();

(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  var form=document.getElementById('aoForm');
  if(!form)return;
  var load=document.getElementById('aoLoad');
  var pageUrl=document.getElementById('aoPageUrl');
  var btn=document.getElementById('aoGo');
  var box=document.getElementById('aoMsg');
  var note=document.getElementById('aoNote');
  var last=0;
  if(load)load.value=Date.now();
  if(pageUrl)pageUrl.value=location.href;

  function buildAction(ajax){
    var to=form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'');
    return (ajax?AJAX:PLAIN)+to;
  }
  function serialize(){
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
  function postViaIframe(data){
    try{
      var name='fs_sink_'+Date.now();
      var ifr=document.createElement('iframe');
      ifr.name=name;ifr.style.display='none';
      document.body.appendChild(ifr);
      var f=document.createElement('form');
      f.method='POST';f.action=buildAction(false);f.target=name;f.style.display='none';
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
  function send(data){
    if(!window.fetch){
      return Promise.resolve(postViaIframe(data)?'unsure':'failed');
    }
    return fetch(buildAction(true),{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
      body:toParams(data)
    }).then(function(r){
      if(r.ok)return 'sent';
      return postViaIframe(data)?'unsure':'failed';
    }).catch(function(){
      return postViaIframe(data)?'unsure':'failed';
    });
  }

  function show(kind,html){
    box.className='af-msg show af-msg-'+kind;
    box.innerHTML=html;
    box.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function reset(){box.className='af-msg';box.innerHTML='';}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    reset();

    if(document.getElementById('ao-honey').value!=='')return;
    if(document.getElementById('ao-decoy').value!=='')return;

    if(Date.now()-Number(load.value||0)<4000){show('err','Please take a moment, then send again.');return;}
    if(last&&(Date.now()-last)<60000){show('err','Please wait a moment before submitting again.');return;}

    var name=document.getElementById('ao-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){show('err','Please enter a valid name.');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('ao-email').value.trim())){show('err','Please enter a valid email address.');return;}
    if(document.getElementById('ao-phone').value.replace(/\D/g,'').length<10){show('err','Please enter a valid phone number with area code.');return;}
    if(document.getElementById('ao-site').value.trim().length<4){show('err','Please add your website so we know where to look.');return;}

    last=Date.now();
    btn.disabled=true;btn.textContent='Sending\u2026';

    send(serialize()).then(function(state){
      if(state==='sent'){
        form.style.display='none';
        if(note)note.style.display='none';
        show('ok','<strong>Sent \u2014 confirmed.</strong> Thanks '+name.split(' ')[0]+". We'll check your AI visibility and reply within one business day. Need it sooner? Call <a href=\"tel:18004818638\">"+PHONE+'</a>.');
        return;
      }
      if(state==='unsure'){
        form.style.display='none';
        if(note)note.style.display='none';
        show('warn','<strong>Sent.</strong> We could not get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a> and mention the AI visibility form. We will find it.');
        return;
      }
      btn.disabled=false;btn.textContent='Check My AI Visibility';
      show('err','That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
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
  var bars = [].slice.call(document.querySelectorAll('.ce-bar'));
  if (!bars.length) return;
  function fill(){
    bars.forEach(function(b){
      var f = b.querySelector('.ce-bf');
      var pct = parseFloat(b.getAttribute('data-pct')) || 0;
      if (f) f.style.width = Math.min(100, pct) + '%';
    });
  }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ if (e.isIntersecting){ fill(); io.disconnect(); } });
    }, {rootMargin:'-60px'});
    io.observe(bars[0]);
  } else { fill(); }
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

