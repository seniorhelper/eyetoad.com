
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
          btn.disabled=false;btn.textContent='Check my visibility →';
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

