
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
  var biz=document.getElementById('ppBiz');
  var city=document.getElementById('ppCity');
  var go=document.getElementById('ppGo');
  var res=document.getElementById('ppRes');
  if(!biz||!city||!go||!res)return;

  function esc(s){return String(s).replace(/[<>&"]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});}
  function clean(s){return s.trim().replace(/\s+/g,' ').replace(/[<>{}|\\]/g,'');}

  function build(b,c){
    var inC=c?(' in '+c):'';
    var nearC=c?(' near '+c):'';
    return [
      'Who is the best '+b+inC+'?',
      'Can you recommend a reliable '+b+inC+'?',
      'How much does a '+b+' typically charge'+inC+'?',
      'What should I look for when hiring a '+b+inC+'?',
      'What are the top-rated '+b+' companies'+nearC+'?',
      'I need a '+b+inC+' — who should I call first?',
      'What questions should I ask a '+b+' before hiring them?',
      'Which '+b+' companies'+inC+' have the best reviews?',
      'Is it worth paying more for a '+b+inC+'?',
      'Compare the main options for '+b+' services'+inC+'.'
    ];
  }

  function run(){
    var b=clean(biz.value), c=clean(city.value);
    if(!b){biz.focus();return;}
    var list=build(b.toLowerCase(),c);
    var h='<p class="pp-k">Your prompt panel</p>'+
          '<p class="pp-title">Ten questions your buyers would ask an assistant</p>'+
          '<p>Run each of these in ChatGPT and again in Perplexity. Write down which businesses get named, in what order, and whether you appear at all. Keep the list — you will re-run exactly these, unchanged, to measure whether anything moved.</p>'+
          '<ol class="pp-list">';
    list.forEach(function(q){h+='<li>'+esc(q)+'</li>';});
    h+='</ol>'+
       '<div class="pp-acts">'+
       '<button class="pp-copy" type="button" id="ppCopy">Copy all ten</button>'+
       '<button class="pp-again" type="button" id="ppAgain">Start over</button>'+
       '</div>'+
       '<p style="font-size:.87rem;color:var(--muted);margin:14px 0 0;line-height:1.6">If you are not named in most of these, that is the gap. It is also completely normal at the start — almost nobody is, which is exactly why the opportunity is still open.</p>';
    res.innerHTML=h;
    res.classList.add('on');

    var copyBtn=document.getElementById('ppCopy');
    if(copyBtn){
      copyBtn.addEventListener('click',function(){
        var txt=list.join('\n');
        function done(){copyBtn.textContent='Copied \u2713';setTimeout(function(){copyBtn.textContent='Copy all ten';},1800);}
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(txt).then(done).catch(function(){fallback(txt,done);});
        }else{fallback(txt,done);}
      });
    }
    var again=document.getElementById('ppAgain');
    if(again){
      again.addEventListener('click',function(){
        res.classList.remove('on');res.innerHTML='';
        biz.value='';city.value='';biz.focus();
      });
    }
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function fallback(txt,cb){
    try{
      var ta=document.createElement('textarea');
      ta.value=txt;ta.setAttribute('readonly','');
      ta.style.position='fixed';ta.style.left='-9999px';
      document.body.appendChild(ta);ta.select();
      document.execCommand('copy');document.body.removeChild(ta);cb();
    }catch(e){/* clipboard unavailable — the list is on screen anyway */}
  }

  go.addEventListener('click',run);
  [biz,city].forEach(function(el){
    el.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();run();}});
  });
})();

(function(){
  var form=document.getElementById('geForm');
  if(!form)return;
  var load=document.getElementById('geLoad');
  if(load)load.value=Date.now();
  var btn=document.getElementById('geGo');
  var err=document.getElementById('geErr');
  var ok=document.getElementById('geOk');
  var note=document.getElementById('geNote');
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

    var name=document.getElementById('ge-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('ge-email').value.trim())){return fail('Please enter a valid email address.');}
    if(document.getElementById('ge-phone').value.replace(/\D/g,'').length<10){return fail('Please enter a valid phone number (10+ digits).');}
    if(document.getElementById('ge-site').value.trim().length<4){return fail('Please add your website so we know where to look.');}

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
        ok.innerHTML='<strong style="display:block;margin-bottom:6px;color:#065F46;">Request received \u2014 thank you.</strong>We will run your buyer questions through the assistants and reply by email, usually within one business day. Check your spam folder if you do not see it.';
      })
      .catch(function(){
        btn.disabled=false;btn.textContent='Check My AI Visibility';
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
  var go = document.getElementById('cc-go');
  if (!go) return;
  var inp = document.getElementById('cc-url');
  function run(){
    var v = String(inp.value || '').trim()
              .replace(/^\s*https?:\/\//i, '').replace(/\/.*$/, '');
    if (v.indexOf('.') === -1){
      inp.focus(); inp.style.borderColor = '#C0392B';
      setTimeout(function(){ inp.style.borderColor = ''; }, 1600);
      return;
    }
    try { window.open('https://' + v + '/robots.txt', '_blank', 'noopener'); } catch(e){}
  }
  go.addEventListener('click', run);
  inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') run(); });
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

