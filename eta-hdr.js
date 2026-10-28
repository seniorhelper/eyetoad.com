/* Eye To Ad Media universal header (Oct 2026 v3): menus, phone sheet, compact bar on scroll,
   the waveform mouth (canvas) with its moments, and the AI assistant hookup.
   Load with: <script src="/eta-hdr.js?v=7" defer></script> */
(function(){
  'use strict';
  var eh=document.getElementById('eh');
  if(!eh||window.__etaHdr)return;
  window.__etaHdr=1;
  var root=document.documentElement;
  var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- dropdowns: Services (chevron) and Domains ---------- */
  var btns=[].slice.call(eh.querySelectorAll('[data-eh-drop]'));
  function closeAll(except){
    btns.forEach(function(b){
      if(b===except)return;
      var m=document.getElementById(b.getAttribute('aria-controls'));
      if(m)m.classList.remove('open');
      b.setAttribute('aria-expanded','false');
    });
  }
  btns.forEach(function(b){
    var m=document.getElementById(b.getAttribute('aria-controls'));
    if(!m)return;
    b.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      var open=b.getAttribute('aria-expanded')!=='true';
      closeAll(b);
      m.classList.toggle('open',open);m.classList.toggle('shut',!open);
      b.setAttribute('aria-expanded',open?'true':'false');
    });
    var li=b.closest('li');
    if(li){
      li.addEventListener('mouseleave',function(){m.classList.remove('shut');});
      li.addEventListener('focusout',function(e){if(!e.relatedTarget||!li.contains(e.relatedTarget)){m.classList.remove('open');b.setAttribute('aria-expanded','false');}});
    }
  });
  document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.eh-drop'))closeAll();});
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    var open=btns.filter(function(b){return b.getAttribute('aria-expanded')==='true';})[0];
    closeAll();if(open)open.focus();
  });

  /* ---------- phone menu ---------- */
  var mb=eh.querySelector('.eh-menu'),sheet=document.getElementById('ehSheet');
  if(mb&&sheet){
    mb.addEventListener('click',function(){
      var open=sheet.hidden;
      sheet.hidden=!open;
      mb.setAttribute('aria-expanded',open?'true':'false');
    });
  }

  /* ---------- phone menu accordions ---------- */
  [].forEach.call(document.querySelectorAll('.eh-acc'),function(b){
    var p=document.getElementById(b.getAttribute('aria-controls'));if(!p)return;
    b.addEventListener('click',function(){var open=p.hidden;p.hidden=!open;b.setAttribute('aria-expanded',open?'true':'false');});
  });

  /* ---------- bottom bar (phones/tablets) ---------- */
  var barSvc=document.querySelector('.eh-bar-svc'),barToad=document.querySelector('.eh-bar-toad');
  if(barSvc&&sheet){
    barSvc.addEventListener('click',function(){var open=sheet.hidden;sheet.hidden=!open;barSvc.setAttribute('aria-expanded',open?'true':'false');});
    document.addEventListener('click',function(e){if(!sheet.hidden&&!e.target.closest('.eh-sheet')&&!e.target.closest('.eh-bar-svc')){sheet.hidden=true;barSvc.setAttribute('aria-expanded','false');}});
  }
  var cur=location.pathname;
  [].forEach.call(document.querySelectorAll('.eh-bar a[href^="/"]'),function(x){if(cur.indexOf(x.getAttribute('href'))===0&&x.getAttribute('href')!=='/contact/')x.setAttribute('aria-current','page');});

  /* ---------- ripple on the yellow button and the bar ---------- */
  document.addEventListener('pointerdown',function(e){
    var b=e.target.closest&&e.target.closest('.eh-cta,.eh-bar a,.eh-bar button');if(!b||reduced)return;
    var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,i=document.createElement('i');i.className='eh-rip';
    i.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.appendChild(i);setTimeout(function(){i.remove();},600);
  },{passive:true});

  /* ---------- header off screen: compact bar slides in, mouth docks, phone call bar shows ---------- */
  var ticking=false,on=null;
  function update(){
    ticking=false;
    var gone=eh.getBoundingClientRect().bottom<0;
    if(gone!==on){on=gone;root.classList.toggle('eh-on',gone);}
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update,{passive:true});
  update();

  /* ---------- the waveform mouth ----------
     Three layered lines on a canvas, colored across the six brand colors, driven by a level (0..1)
     and a few moment modes. Runs at 30fps while idle, 60 while talking, and not at all off screen. */
  var BRAND=['#DC2626','#F97316','#FACC15','#16A34A','#2563EB','#7C3AED'];
  function makeWave(canvas,small){
    var ctx=canvas.getContext('2d');if(!ctx)return null;
    var W=0,H=0,dpr=1,level=0,target=0,mode='idle',t0=performance.now(),raf=0,visible=true,last=0,grad=null,lean=0,leanT=0;
    var seeds=[[1.0,0,1],[1.6,1.7,.72],[2.3,3.1,.5]];
    function size(){dpr=Math.min(2,window.devicePixelRatio||1);var r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=Math.max(1,W*dpr);canvas.height=Math.max(1,H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);grad=ctx.createLinearGradient(0,0,W,0);BRAND.forEach(function(c,j){grad.addColorStop(j/(BRAND.length-1),c);});}
    if('ResizeObserver' in window)new ResizeObserver(size).observe(canvas);size();
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){visible=e[0].isIntersecting;if(visible&&!raf)raf=requestAnimationFrame(frame);}).observe(canvas);
    function frame(now){
      raf=0;if(!visible||!W)return;
      lean+=(leanT-lean)*.08;
      var talking=target>0||mode!=='idle'||Math.abs(lean-leanT)>.01||Math.abs(lean)>.01;
      if(!talking&&now-last<32){raf=requestAnimationFrame(frame);return;}
      last=now;
      var t=(now-t0)/1000;
      level+=(target-level)*(mode==='shiver'?.6:.18);
      ctx.clearRect(0,0,W,H);
      /* amp leaves room for the stroke and its glow so peaks never hit the canvas edge */
      var mid=H/2,amp=Math.max(4,H/2-(small?4:8));
      if(mode==='pulse'){
        /* the dramatic moment: an equalizer burst */
        var n=small?12:28,gap=small?3:5,bw=(W-gap*(n-1))/n;
        for(var k=0;k<n;k++){
          var u=k/(n-1),env=Math.sin(Math.PI*u),h=(0.15+0.85*Math.abs(Math.sin(t*9+k*.9))*Math.abs(Math.sin(t*3.1+k*.3)))*amp*2*Math.max(.35,env);
          ctx.fillStyle=BRAND[k%6];ctx.shadowColor=BRAND[k%6];ctx.shadowBlur=small?6:12;
          ctx.fillRect(k*(bw+gap),mid-h/2,bw,h);
        }
        ctx.shadowBlur=0;raf=requestAnimationFrame(frame);return;
      }
      var tongue=mode==='tongue'?((t*1.1)%1.6):-1;
      for(var i=0;i<3;i++){
        var f=seeds[i][0],ph=seeds[i][1],k2=seeds[i][2];
        ctx.beginPath();
        for(var x=0;x<=W;x+=2){
          var u2=x/W,env2=Math.sin(Math.PI*u2),y=0;
          var idle=.17+.07*Math.sin(t*1.3+i),a=Math.max(idle,level);
          y+=Math.sin(u2*Math.PI*(4+2*i)*k2+t*(2.2+f)+ph)*a;
          y+=Math.sin(u2*Math.PI*11*k2-t*(3.5+f*1.3))*a*.35;
          if(tongue>=0){var d=u2-tongue;y+=Math.exp(-d*d*180)*1.1*(i===0?1:.5);}
          if(lean)y+=Math.exp(-Math.pow((u2-(.5+lean*.4))*4,2))*Math.abs(lean)*.9*(i===0?1:.5);
          if(mode==='shiver')y+=(Math.random()-.5)*.55;
          if(mode==='think')y*=.5;
          /* tanh keeps loud speech, tongue and lean peaks inside ±amp instead of cutting off */
          ctx.lineTo(x,mid+Math.tanh(y*1.3)*amp*env2);
        }
        ctx.strokeStyle=grad;ctx.lineCap='round';
        ctx.lineWidth=i===0?(small?2.6:5):(small?1.4:2.2);
        ctx.shadowColor='rgba(255,255,255,.9)';ctx.shadowBlur=i===0?(small?10:22):9;ctx.globalAlpha=i===0?1:.72;
        ctx.stroke();
        if(i===0){ctx.shadowBlur=0;ctx.globalAlpha=.9;ctx.strokeStyle='#fff';ctx.lineWidth=small?1:1.8;ctx.stroke();}
      }
      ctx.globalAlpha=1;ctx.shadowBlur=0;
      if(!reduced||talking)raf=requestAnimationFrame(frame);
    }
    raf=requestAnimationFrame(frame);
    return {set:function(v){target=Math.max(0,Math.min(1,+v||0));if(!raf)raf=requestAnimationFrame(frame);},mode:function(m){mode=m;if(!raf)raf=requestAnimationFrame(frame);},lean:function(v){leanT=v;if(!raf)raf=requestAnimationFrame(frame);}};
  }
  var mouth=document.getElementById('ehMouth');
  var waves=[].slice.call(document.querySelectorAll('.eh-wave')).map(function(c){return makeWave(c,c.closest('.eh-dock')!==null);}).filter(Boolean);
  function setLevel(v){waves.forEach(function(w){w.set(v);});}
  /* Toad's wave leans toward the mouse (desktop, pointer only) */
  if(mouth&&window.matchMedia&&matchMedia('(hover:hover)').matches&&!reduced){
    eh.addEventListener('mousemove',function(e){var r=mouth.getBoundingClientRect();var u=(e.clientX-r.left)/r.width-.5;waves.forEach(function(w){w.lean(Math.max(-1,Math.min(1,u*2)));});});
    eh.addEventListener('mouseleave',function(){waves.forEach(function(w){w.lean(0);});});
  }
  function setMode(m){waves.forEach(function(w){w.mode(m);});}

  /* ---------- moments: signs of life while idle (visual only) ---------- */
  var brows=eh.querySelector('.eh-brows'),moTimer=0,moClear=0;
  function moment(name,ms){
    if(moClear)clearTimeout(moClear);
    if(name==='brow'){brows.classList.toggle('fluffy',Math.random()<.45);}
    var cls={brow:'eh-mo-brow',eyes:'eh-mo-eyes',cheeks:'eh-mo-cheeks'}[name];
    if(cls)root.classList.add(cls);
    if(name==='tongue'||name==='shiver'||name==='pulse')setMode(name);
    moClear=setTimeout(function(){root.classList.remove('eh-mo-brow','eh-mo-eyes','eh-mo-cheeks');setMode('idle');},ms);
  }
  var idleMoments=['brow','brow','tongue','shiver','brow','pulse','cheeks','eyes','tongue'];
  function schedule(){
    moTimer=setTimeout(function(){
      if(!document.hidden&&!reduced&&!root.classList.contains('eh-talk')&&!root.classList.contains('eh-on')){
        var m=idleMoments[Math.floor(Math.random()*idleMoments.length)];
        moment(m,m==='pulse'?2600:m==='cheeks'?3000:m==='eyes'?2600:m==='tongue'?3200:m==='shiver'?1500:1400);
      }
      schedule();
    },22000+Math.random()*38000);
  }
  moTimer=setTimeout(schedule,8000);

  /* ---------- first-visit greeting (Zach's line, shown once per visitor) ---------- */
  var say=document.getElementById('ehSay');
  var sayTimer=0,sayRaf=0;
  function hideSay(){if(say){say.classList.remove('on');}cancelAnimationFrame(sayRaf);clearTimeout(sayTimer);if(!(window.ETABrain&&window.ETABrain.inVoice&&window.ETABrain.inVoice())){setLevel(0);root.classList.remove('eh-talk');}}
  function speakLine(text,withHear){
    if(!say||reduced&&false)return;
    var words=text.split(' '),box=say.querySelector('.txt');
    box.innerHTML=words.map(function(w){return '<span class="w">'+w+'</span>';}).join(' ');
    var spans=[].slice.call(box.querySelectorAll('.w')),hear=say.querySelector('.eh-hear');
    hear.hidden=!withHear;var zb=say.querySelector('.eh-zip');if(zb)zb.hidden=true;var who=say.querySelector('.eh-who');if(who)who.remove();
    say.classList.add('on');root.classList.add('eh-talk');
    moment('brow',1400);
    var sched=[],t=0;words.forEach(function(w){var d=110+48*w.replace(/[^\w]/g,'').length;sched.push([t,t+d]);t+=d+(/[.,?!:]$/.test(w)?230:45);});
    var total=t,t0=performance.now();
    function step(now){var el=now-t0,env=0;for(var k=0;k<sched.length;k++){if(el>=sched[k][0])spans[k].classList.add('lit');if(el>=sched[k][0]&&el<sched[k][1]){var x=(el-sched[k][0])/(sched[k][1]-sched[k][0]);env=Math.sin(Math.PI*x)*(.7+.3*Math.sin(el/37+k));}}
      setLevel(reduced?0:env);
      if(el<total+150)sayRaf=requestAnimationFrame(step);else{setLevel(0);root.classList.remove('eh-talk');sayTimer=setTimeout(hideSay,9000);}}
    sayRaf=requestAnimationFrame(step);
  }
  if(say){
    say.querySelector('.eh-x').addEventListener('click',function(e){e.stopPropagation();hideSay();try{sessionStorage.setItem('ehGreeted','1');}catch(x){}});
    say.addEventListener('click',function(e){e.stopPropagation();});
  }
  function showBubble(text,kind,opts){
    if(!say)return;opts=opts||{};
    cancelAnimationFrame(sayRaf);clearTimeout(sayTimer);
    var box=say.querySelector('.txt');box.textContent=text;
    var who=say.querySelector('.eh-who');if(!who){who=document.createElement('div');who.className='eh-who';say.insertBefore(who,box);}
    who.innerHTML='<span>Toad</span><span>'+(kind||'')+'</span>';
    say.querySelector('.eh-hear').hidden=!opts.hear;
    var zip=say.querySelector('.eh-zip');if(zip)zip.hidden=!opts.zip;
    say.classList.add('on');
    if(opts.ms)sayTimer=setTimeout(hideSay,opts.ms);
  }
  var tapped=false,zipped=false;try{tapped=!!sessionStorage.getItem('ehTapped');zipped=!!sessionStorage.getItem('ehZipped');}catch(x){}
  if(!tapped&&!zipped)root.classList.add('eh-untapped');
  if(zipped)root.classList.add('eh-zipped');
  function markTapped(){tapped=true;root.classList.remove('eh-untapped');try{sessionStorage.setItem('ehTapped','1');}catch(x){}}
  var GREETING='Pretty high tech right? We can easily build everything you see and more for your business!';
  var greeted=false;try{greeted=!!sessionStorage.getItem('ehGreeted');}catch(x){}

  /* ---------- AI assistant hookup: only when the brain script (window.ETABrain) is on the page ---------- */
  function hook(B){
    if(!B||root.classList.contains('eh-ai'))return;
    root.classList.add('eh-ai');

    var panel=document.createElement('div');
    panel.className='eh-chat';panel.id='ehChat';panel.hidden=true;
    panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Chat with the Eye To Ad Media AI assistant');
    panel.innerHTML='<button class="eh-chat-x" type="button" aria-label="Close chat">&times;</button><div class="eh-chat-body"></div>';
    document.body.appendChild(panel);
    var mounted=false,opener=null;
    function openChat(from){
      opener=from||null;hideSay();
      if(!mounted){B.mount(panel.querySelector('.eh-chat-body'));mounted=true;}
      panel.hidden=false;root.classList.add('eh-chat-open');
      var inp=panel.querySelector('input:not([aria-hidden])');if(inp)inp.focus();
    }
    function closeChat(){
      panel.hidden=true;root.classList.remove('eh-chat-open');
      if(B.inVoice&&B.inVoice())B.stopVoice();
      if(opener&&opener.focus)opener.focus();
    }
    panel.querySelector('.eh-chat-x').addEventListener('click',closeChat);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)closeChat();});
    if(mouth){
      mouth.removeAttribute('aria-hidden');mouth.setAttribute('role','button');mouth.tabIndex=0;
      mouth.setAttribute('aria-label','Chat with our AI assistant');
      var voiceOK=false;B.ready().then(function(r){voiceOK=!!r.voice;});
      function lips(){
        markTapped();
        if(zipped){zipped=false;root.classList.remove('eh-zipped');try{sessionStorage.removeItem('ehZipped');}catch(x){}}
        if(!voiceOK||!B.startVoice){openChat(mouth);return;}
        if(B.inVoice&&B.inVoice()){B.stopVoice();showBubble('Okay, I\'ll be quiet. Tap me again any time.','',{ms:3500});return;}
        if(B.state==='connecting')return;
        hideSay();showBubble('One second...','Connecting',{});
        B.startVoice();
      }
      mouth.addEventListener('click',lips);
      mouth.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();lips();}});
      var zipBtn=say&&say.querySelector('.eh-zip');
      if(zipBtn)zipBtn.addEventListener('click',function(e){e.stopPropagation();if(B.inVoice&&B.inVoice())B.stopVoice();zipped=true;root.classList.add('eh-zipped');try{sessionStorage.setItem('ehZipped','1');}catch(x){}hideSay();var h=mouth.querySelector('.eh-hint');if(h)h.textContent='Zipped. Tap the lips to unzip Toad';});
    }
    if(barToad){barToad.addEventListener('click',function(e){e.preventDefault();if(panel.hidden)openChat(barToad);else closeChat();});}
    var dock=document.querySelector('.eh-dock');
    if(dock){
      dock.setAttribute('aria-label','Chat with our AI assistant');
      dock.addEventListener('click',function(e){e.preventDefault();if(panel.hidden)openChat(dock);else closeChat();});
    }
    /* "Tap to hear me": opens the chat and starts voice from the tap */
    var hear=say&&say.querySelector('.eh-hear');
    if(hear)hear.addEventListener('click',function(e){e.stopPropagation();lips();});

    /* talking level moves the lines; modes and states drive the moments */
    B.on('level',function(d){setLevel(d.v);});
    B.on('speaking',function(d){root.classList.toggle('eh-talk',d.on);if(!d.on)setLevel(0);});
    B.on('mode',function(d){
      root.classList.remove('eh-m-rainbow','eh-m-promo','eh-m-tip','eh-m-cheeks','eh-m-eyes');
      if(d.mode==='cheeks')root.classList.add('eh-m-cheeks');
      else if(d.mode==='eyes'||d.mode==='joke')root.classList.add('eh-m-eyes');
      else if(d.mode==='promo'||d.mode==='rainbow')moment('pulse',2600);
      else if(d.mode==='tip')moment('brow',2000);
    });
    B.on('state',function(d){
      if(!root.classList.contains('eh-chat-open')&&say&&say.classList.contains('on')){var who=say.querySelector('.eh-who');if(who)who.lastChild.textContent=d.state==='listening'?'Listening':d.state==='speaking'?'Talking':d.state==='thinking'?'Thinking':d.state==='connecting'?'Connecting':'';}
      if(d.state==='idle'&&say&&say.classList.contains('on')&&!(B.inVoice&&B.inVoice())){sayTimer=setTimeout(hideSay,2500);}
      root.classList.toggle('eh-think',d.state==='thinking'||d.state==='connecting');
      root.classList.toggle('eh-listen',d.state==='listening');
      if(d.state==='thinking')brows.classList.remove('fluffy');
    });
    /* googly eyes when it says something worth a look */
    B.on('message',function(d){
      if(d.role==='assistant'&&(d.voice||d.fallback)&&!root.classList.contains('eh-chat-open')){showBubble(String(d.text||'').slice(0,260),d.fallback?'':'Talking',{zip:!d.fallback,ms:d.fallback?7000:0});}
      if(d.role!=='assistant')return;
      if(/\b(look|see this|check this|wow|whoa|ta-da|tada|joke|funny|ha ha|haha)\b/i.test(d.text||'')){root.classList.add('eh-m-eyes');setTimeout(function(){root.classList.remove('eh-m-eyes');},3200);}
    });
    /* first visit: the greeting, with "Tap to hear me" when voice is available */
    if(!greeted&&say&&!zipped){
      B.ready().then(function(r){setTimeout(function(){if(!root.classList.contains('eh-chat-open'))speakLine(GREETING,!!r.voice);},1200);try{sessionStorage.setItem('ehGreeted','1');}catch(x){}});
    }
  }
  if(window.ETABrain)hook(window.ETABrain);
  else document.addEventListener('eta:ready',function(e){hook(e.detail||window.ETABrain);});
  /* no brain on the page (or it failed to load): still greet once, silently */
  setTimeout(function(){if(!root.classList.contains('eh-ai')&&!greeted&&say){speakLine(GREETING,false);try{sessionStorage.setItem('ehGreeted','1');}catch(x){}}},2500);
})();
