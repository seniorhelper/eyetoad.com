/* Header shadow after scrolling + the typed hero line (moved here from eta-bubbles.js, Oct 13 2026; the bubble field is gone). */
(function(){
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var sc=false;window.addEventListener('scroll',function(){var s=(window.scrollY||0)>60;if(s!==sc){sc=s;document.body.classList.toggle('bub-scrolled',s);}},{passive:true});
/* typed hero line: ~19 chars/sec with beats at punctuation. One class flip per character on a
   timer; opacity only, so each step is a tiny style change (Oct 13 2026). */
var p=document.querySelector('.h8-sub.typer');if(p){var cs=[].slice.call(p.querySelectorAll('.ch'));
 if(RM){cs.forEach(function(c){c.classList.add('on');});p.classList.add('kw-done');}
 else{var i=0;function nx(){if(i>=cs.length){setTimeout(function(){p.classList.add('kw-done');},500);return;}var c=cs[i++];c.classList.add('on');var g=52;if(/[.,]/.test(c.textContent)&&i<cs.length)g+=c.textContent==='.'?320:160;setTimeout(nx,g);}setTimeout(nx,1300);}}
})();
/* Homepage hero slider v2 (Oct 13 2026). The track moves with one GPU transform instead of
   native scroll-snap: no stickiness, mouse drag on desktop, finger swipe on phones (vertical
   scroll still works), velocity decides the snap. Slide 1 is the original hero. Without JS
   the track is a plain swipeable scroll-snap row and the dots are #anchor links. */
(function(){
  var root=document.getElementById('hs'),track=document.getElementById('hs-track');
  if(!root||!track)return;
  var slides=[].slice.call(track.querySelectorAll('.hs-slide')),n=slides.length;
  if(n<2)return;
  var hero=root.querySelector('.hero');
  var dots=[].slice.call(root.querySelectorAll('.hs-dot'));
  var prev=root.querySelector('.hs-prev'),next=root.querySelector('.hs-next'),pp=root.querySelector('.hs-pp'),st=root.querySelector('.hs-st');
  var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
  var RM=mq.matches,cur=0,stopped=RM,hold=0,inView=true,timer=null,prog=false,firstDone=false;
  var DELAY=8000,AFTER_TYPE=4500,FALLBACK_FIRST=14000;
  var PLAY='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE=pp.innerHTML;

  [prev,next,pp].forEach(function(b){b.hidden=false;});
  root.classList.add('hs-js');
  track.scrollLeft=0;

  function W(){return track.clientWidth||1;}
  /* only the slides that can be seen are painted: the active one at rest, the pair during a move,
     three while a finger or mouse drags. The others are skipped entirely (hs-off). */
  var sweepT=null,dragging=false,H=document.documentElement,PRE=!!window.__hsPre; /* idle pre-paint of the neighbours: measured no gain, off by default */
  function show(list){slides.forEach(function(s,k){s.classList.toggle('hs-off',list.indexOf(k)<0);});}
  function moving(on){H.classList.toggle('hs-moving',!!on);}
  /* at rest only the active slide is painted; once the move has settled the two neighbours are
     prepared in idle time so the next move starts on the first frame */
  function settle(ms){clearTimeout(sweepT);sweepT=setTimeout(function(){moving(false);if(dragging)return;show([cur]);if(PRE){var f=function(){if(!dragging)show([cur-1,cur,cur+1]);};if('requestIdleCallback' in window)requestIdleCallback(f,{timeout:900});else setTimeout(f,400);}},ms);}
  function place(i,dx,anim,dur){
    track.style.transitionDuration=anim?(dur||.64)+'s':'0s';
    track.style.transform='translate3d(calc('+(-i*100)+'% + '+(dx||0)+'px),0,0)';
  }
  function setState(i,announce){
    cur=i;
    slides.forEach(function(s,k){
      var on=k===i;s.classList.toggle('is-on',on);
      if(on)s.removeAttribute('inert');else s.setAttribute('inert','');
    });
    dots.forEach(function(d,k){if(k===i)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');});
    if(i!==0)root.classList.add('hs-live');
    checkFix();
    if(announce&&st)st.textContent='Slide '+(i+1)+' of '+n;
  }
  function go(i,user,dur){
    i=(i+n)%n;
    clearTimeout(sweepT);show(i===cur?[i]:[cur,i]);
    place(i,0,!RM,dur);
    if(RM)show([i]);else{moving(true);settle((dur||.64)*1000+80);}
    setState(i,user||stopped);
    if(user)stop();else schedule();
  }
  function setLive(){track.setAttribute('aria-live',stopped?'polite':'off');}
  function stop(){
    stopped=true;clearTimeout(timer);timer=null;run(false);
    pp.innerHTML=PLAY;pp.setAttribute('aria-label','Start automatic slide show');setLive();
  }
  function start(){
    stopped=false;firstDone=true;
    pp.innerHTML=PAUSE;pp.setAttribute('aria-label','Stop automatic slide show');setLive();
    schedule();
  }
  function run(on,d){
    if(prog){root.classList.remove('hs-run');prog=false;}
    if(on){root.style.setProperty('--hs-d',(d/1000)+'s');void root.offsetWidth;root.classList.add('hs-run');prog=true;}
  }
  function schedule(){
    clearTimeout(timer);timer=null;
    if(stopped||hold||!inView||document.hidden){run(false);return;}
    if(cur===0&&!firstDone)return; /* first advance waits for the typed subtitle */
    timer=setTimeout(function(){go(cur+1,false);},DELAY);run(true,DELAY);
  }
  function armFirst(){
    if(firstDone)return;firstDone=true;
    if(stopped||cur!==0)return;
    clearTimeout(timer);
    if(hold||!inView||document.hidden){schedule();return;}
    timer=setTimeout(function(){go(1,false);},AFTER_TYPE);run(true,AFTER_TYPE);
  }
  var typer=document.querySelector('.h8-sub.typer');
  if(!stopped){
    if(typer&&window.MutationObserver){
      var mo=new MutationObserver(function(){if(typer.classList.contains('kw-done')){mo.disconnect();armFirst();}});
      mo.observe(typer,{attributes:true,attributeFilter:['class']});
      setTimeout(function(){mo.disconnect();armFirst();},FALLBACK_FIRST);
    }else setTimeout(armFirst,FALLBACK_FIRST);
  }

  prev.addEventListener('click',function(){go(cur-1,true);});
  next.addEventListener('click',function(){go(cur+1,true);});
  pp.addEventListener('click',function(){if(stopped)start();else stop();});
  dots.forEach(function(d,k){d.addEventListener('click',function(e){e.preventDefault();go(k,true);});});
  root.querySelector('.hs-ctrl').addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();go(cur+(e.key==='ArrowLeft'?-1:1),true);
      if(e.target.classList.contains('hs-dot'))dots[cur].focus();
    }
  });

  /* drag / swipe: horizontal pointer moves drive the track, vertical ones scroll the page */
  var sx=0,sy=0,dx=0,axis=null,pid=null,samples=[],suppress=false;
  function onDown(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;
    if(e.target.closest('.hs-ctrl'))return;
    sx=e.clientX;sy=e.clientY;dx=0;axis=null;dragging=false;pid=e.pointerId;samples=[{t:e.timeStamp,x:e.clientX}];
  }
  function onMove(e){
    if(pid!==e.pointerId||axis==='y')return;
    var mx=e.clientX-sx,my=e.clientY-sy;
    if(!axis){
      if(Math.abs(mx)<7&&Math.abs(my)<7)return;
      axis=Math.abs(mx)>Math.abs(my)?'x':'y';
      if(axis==='y')return;
      dragging=true;hold|=4;clearTimeout(timer);run(false);
      clearTimeout(sweepT);show([cur-1,cur,cur+1]);moving(true);
      try{track.setPointerCapture(e.pointerId);}catch(err){}
      track.classList.add('drag');
    }
    dx=mx;
    if((cur===0&&dx>0)||(cur===n-1&&dx<0))dx*=.32; /* rubber band at the ends */
    samples.push({t:e.timeStamp,x:e.clientX});if(samples.length>6)samples.shift();
    place(cur,dx,false);
    if(e.cancelable)e.preventDefault();
  }
  function onUp(e){
    if(pid!==e.pointerId)return;
    pid=null;
    if(!dragging){axis=null;return;}
    dragging=false;hold&=~4;track.classList.remove('drag');
    var last=samples[samples.length-1],first=samples[0];
    for(var k=samples.length-1;k>=0;k--){if(last.t-samples[k].t>=60){first=samples[k];break;}}
    var v=(last.x-first.x)/Math.max(1,last.t-first.t); /* px per ms */
    var w=W(),target=cur;
    if(dx<-w*.16||v<-.45)target=cur+1;else if(dx>w*.16||v>.45)target=cur-1;
    target=Math.max(0,Math.min(n-1,target));
    var dist=Math.abs(target===cur?dx:(w-Math.abs(dx)));
    var dur=Math.min(.6,Math.max(.28,dist/w*.45+.2));
    suppress=true;setTimeout(function(){suppress=false;},60);
    if(target===cur){place(cur,0,!RM,dur);stop();if(RM){moving(false);show([cur]);}else settle(dur*1000+80);}
    else{go(target,true,dur);}
    axis=null;
  }
  track.addEventListener('pointerdown',onDown);
  track.addEventListener('pointermove',onMove);
  track.addEventListener('pointerup',onUp);
  track.addEventListener('pointercancel',onUp);
  track.addEventListener('click',function(e){if(suppress){e.preventDefault();e.stopPropagation();}},true);
  track.addEventListener('dragstart',function(e){e.preventDefault();});
  /* trackpad: a horizontal two-finger swipe moves one slide */
  var wT=0;
  track.addEventListener('wheel',function(e){
    if(Math.abs(e.deltaX)<=Math.abs(e.deltaY)||Math.abs(e.deltaX)<18)return;
    e.preventDefault();var now=Date.now();if(now-wT<700)return;wT=now;
    go(cur+(e.deltaX>0?1:-1),true);
  },{passive:false});

  /* pause while the pointer or keyboard focus is in the hero */
  root.addEventListener('mouseenter',function(){hold|=1;schedule();});
  root.addEventListener('mouseleave',function(){hold&=~1;schedule();});
  root.addEventListener('focusin',function(){hold|=2;schedule();});
  root.addEventListener('focusout',function(e){if(!root.contains(e.relatedTarget)){hold&=~2;schedule();}});
  document.addEventListener('visibilitychange',schedule);

  /* once off slide 1, keep the controls on screen while the hero is in view */
  var cw=root.querySelector('.hs-cw'),bar=root.querySelector('.hs-ctrl'),fixed=false,fT=0;
  function checkFix(){
    var on=false;
    if(root.classList.contains('hs-live')){
      var h=window.innerHeight||800,r=cw.getBoundingClientRect(),hr=hero.getBoundingClientRect();
      on=(r.top+12)>(h-12-bar.offsetHeight)&&hr.top<h*0.6&&hr.bottom>0;
    }
    if(on!==fixed){fixed=on;root.classList.toggle('hs-fix',on);}
  }
  var vT=null;
  function checkView(){
    var r=hero.getBoundingClientRect(),v=r.bottom>140&&r.top<(window.innerHeight||800)*0.6;
    if(v!==inView){inView=v;schedule();}
  }
  window.addEventListener('scroll',function(){
    if(!fT)fT=requestAnimationFrame(function(){fT=0;checkFix();});
    if(vT)return;vT=setTimeout(function(){vT=null;checkView();},150);
  },{passive:true});
  window.addEventListener('resize',checkFix);
  if(mq.addEventListener)mq.addEventListener('change',function(e){RM=e.matches;if(RM)stop();});

  var m=/^#hs-(\d)$/.exec(location.hash||''),i0=m?Math.min(n,Math.max(1,+m[1]))-1:0;
  show([i0]);
  place(i0,0,false);
  setState(i0,false);
  if(PRE)settle(0);
  if(i0)stop();
  if(stopped){pp.innerHTML=PLAY;pp.setAttribute('aria-label','Start automatic slide show');}
  setLive();
  if('requestIdleCallback' in window)requestIdleCallback(checkView,{timeout:2500});else setTimeout(checkView,1200);
})();
