/* Eye To Ad Media — shared site behavior. Load with: <script src="/eta-site.js" defer></script> */
(function(){
  'use strict';
  var A=['aW5mbw==','ZXlldG9hZC5jb20='];
  function addr(){try{return atob(A[0])+String.fromCharCode(64)+atob(A[1]);}catch(e){return '';}}
  window.etaAddr=addr;

  /* ---------- navigation ---------- */
  var hdr=document.getElementById('hdr'),burger=document.getElementById('burger'),mob=document.getElementById('mobNav');
  if(hdr&&burger&&mob&&!window.__etaNav){
    window.__etaNav=1;
    var measure=function(){mob.style.top=Math.max(0,hdr.getBoundingClientRect().bottom)+'px';};
    var setOpen=function(o){
      measure();
      mob.classList.toggle('open',o);burger.classList.toggle('open',o);
      burger.setAttribute('aria-expanded',o?'true':'false');
      document.body.classList.toggle('nav-open',o);
      document.body.style.overflow=o?'hidden':'';
      if(o)mob.scrollTop=0;
    };
    var own=function(el,fn){el.addEventListener('click',function(e){e.stopImmediatePropagation();fn(e);},true);};
    window.addEventListener('scroll',function(){hdr.classList.toggle('scrolled',window.scrollY>30);measure();},{passive:true});
    window.addEventListener('resize',measure);measure();
    own(burger,function(){setOpen(!mob.classList.contains('open'));});
    var mc=document.getElementById('mobClose');if(mc)own(mc,function(){setOpen(false);});
    [].forEach.call(mob.querySelectorAll('.mob-acc'),function(btn){
      own(btn,function(){
        var was=btn.getAttribute('aria-expanded')==='true';
        [].forEach.call(mob.querySelectorAll('.mob-acc'),function(b){
          b.setAttribute('aria-expanded','false');
          var g=document.getElementById(b.getAttribute('aria-controls'));if(g)g.classList.remove('open');
        });
        if(!was){btn.setAttribute('aria-expanded','true');var g=document.getElementById(btn.getAttribute('aria-controls'));if(g)g.classList.add('open');}
      });
    });
    [].forEach.call(mob.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setOpen(false);});});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&mob.classList.contains('open')){e.stopImmediatePropagation();setOpen(false);burger.focus();}
    },true);
    /* keyboard access for the Resources toggle */
    [].forEach.call(document.querySelectorAll('.nl-tog'),function(t){
      t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t.parentNode.classList.toggle('kb-open');}});
    });
  }

  /* ---------- email links, assembled at runtime ---------- */
  [].forEach.call(document.querySelectorAll('[data-eml]'),function(a){
    var v=addr();if(!v)return;
    if(a.tagName==='A')a.setAttribute('href','mai'+'lto:'+v);
    if(a.getAttribute('data-eml')!=='keep')a.textContent=v;
  });

  /* ---------- lead forms ---------- */
  var touched=false,t0=Date.now();
  ['keydown','pointerdown','touchstart'].forEach(function(ev){document.addEventListener(ev,function(){touched=true;},{passive:true,capture:true});});
  function say(form,kind,text){
    var m=form.querySelector('.eta-msg');
    if(!m){m=document.createElement('div');m.className='eta-msg';m.setAttribute('role','status');m.setAttribute('aria-live','polite');form.appendChild(m);}
    m.setAttribute('data-kind',kind);m.textContent=text;
    m.style.cssText='margin-top:12px;padding:12px 14px;border-radius:8px;font-size:.95rem;line-height:1.45;'+
      (kind==='ok'?'background:#ECFDF3;color:#054F31;border:1px solid #A6F4C5':kind==='wait'?'background:#EFF8FF;color:#0B4A6F;border:1px solid #B2DDFF':'background:#FEF3F2;color:#7A271A;border:1px solid #FECDCA');
  }
  [].forEach.call(document.querySelectorAll('form[data-eta="lead"]'),function(form){
    form.removeAttribute('action');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var hp=form.querySelector('[name="_honey"]');
      if(hp&&hp.value){return;}
      if(!touched||Date.now()-t0<3500){say(form,'err','Please take a moment to fill in the form, then press send again.');return;}
      if(form.checkValidity&&!form.checkValidity()){if(form.reportValidity)form.reportValidity();return;}
      var btn=form.querySelector('[type="submit"]');if(btn)btn.disabled=true;
      say(form,'wait','Sending your message...');
      var fd=new FormData(form);fd.delete('_next');fd.append('page_url',location.href);
      if(!fd.get('_subject'))fd.append('_subject','New eyetoad.com lead — '+document.title);
      fd.append('_template','table');fd.append('_captcha','false');
      fetch('https://formsubmit.co/ajax/'+addr(),{method:'POST',headers:{'Accept':'application/json'},body:fd})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};},function(){return {ok:r.ok,j:null};});})
        .then(function(res){
          if(res.ok&&res.j&&String(res.j.success)==='true'){say(form,'ok','Got it. A real person reads this and replies within one business day. Need us sooner? Call 1-800-481-8638.');form.reset();}
          else{say(form,'err','We could not confirm delivery. Please call 1-800-481-8638 so your message is not lost.');if(btn)btn.disabled=false;}
        })
        .catch(function(){say(form,'err','The message did not send. Please call 1-800-481-8638 and we will take it from there.');if(btn)btn.disabled=false;});
    });
  });
})();
