/* Homepage hero slider (2026-10-12). Vanilla, no libraries, no IntersectionObserver.
   Slide 1 is the original hero and always loads first. Without JS the slides are a
   swipeable scroll-snap row and the dots are plain #anchor links. */
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
  function x(i){return i*track.clientWidth;}
  var progScroll=false,psT=null;
  function go(i,user){
    i=(i+n)%n;
    progScroll=true;clearTimeout(psT);psT=setTimeout(function(){progScroll=false;},1200);
    var smooth=!RM;
    if(track.scrollTo){try{track.scrollTo({left:x(i),behavior:smooth?'smooth':'auto'});}catch(e){track.scrollLeft=x(i);}}
    else track.scrollLeft=x(i);
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
    if(cur===0&&!firstDone)return; /* first advance waits for the typed subtitle (see below) */
    timer=setTimeout(function(){go(cur+1,false);},DELAY);run(true,DELAY);
  }
  /* first advance: a few seconds after the protected typing subtitle finishes */
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

  /* pause while the pointer or keyboard focus is in the hero */
  root.addEventListener('mouseenter',function(){hold|=1;schedule();});
  root.addEventListener('mouseleave',function(){hold&=~1;schedule();});
  root.addEventListener('focusin',function(){hold|=2;schedule();});
  root.addEventListener('focusout',function(e){if(!root.contains(e.relatedTarget)){hold&=~2;schedule();}});
  document.addEventListener('visibilitychange',schedule);

  /* once the slider has moved off slide 1, keep the controls on screen while the hero is
     in view: the bar's slot below the hero keeps its height, only the bar itself is pinned */
  var cw=root.querySelector('.hs-cw'),bar=root.querySelector('.hs-ctrl'),fixed=false,fT=0;
  function checkFix(){
    var on=false;
    if(root.classList.contains('hs-live')){
      var h=window.innerHeight||800,r=cw.getBoundingClientRect(),hr=hero.getBoundingClientRect();
      on=(r.top+12)>(h-12-bar.offsetHeight)&&hr.top<h*0.6&&hr.bottom>0;
    }
    if(on!==fixed){fixed=on;root.classList.toggle('hs-fix',on);}
  }

  /* only rotate while the hero is on screen (scroll position check, no IntersectionObserver) */
  var vT=null;
  function checkView(){
    var r=hero.getBoundingClientRect(),v=r.bottom>140&&r.top<(window.innerHeight||800)*0.6;
    if(v!==inView){inView=v;schedule();}
  }
  window.addEventListener('scroll',function(){
    if(!fT)fT=requestAnimationFrame(function(){fT=0;checkFix();});
    if(vT)return;vT=setTimeout(function(){vT=null;checkView();},150);
  },{passive:true});

  /* swipes and trackpad scrolls on the track */
  var sT=null;
  function settle(){
    var i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));
    if(i<0)i=0;if(i>n-1)i=n-1;
    if(progScroll){progScroll=false;if(i===cur)return;}
    if(i!==cur){setState(i,true);stop();}
  }
  track.addEventListener('scroll',function(){clearTimeout(sT);sT=setTimeout(settle,140);},{passive:true});

  window.addEventListener('resize',function(){track.scrollLeft=x(cur);checkFix();});
  if(mq.addEventListener)mq.addEventListener('change',function(e){RM=e.matches;if(RM)stop();});

  /* start on slide 1 (or on #hs-N if someone linked straight to a slide) */
  var m=/^#hs-(\d)$/.exec(location.hash||''),i0=m?Math.min(n,Math.max(1,+m[1]))-1:0;
  track.scrollLeft=x(i0);
  setState(i0,false);
  if(i0)stop();
  if(stopped){pp.innerHTML=PLAY;pp.setAttribute('aria-label','Start automatic slide show');}
  setLive();
  checkView();
})();
