/* Eye To Ad Media universal header (Oct 2026): menus, phone sheet, compact bar + docked mouth on scroll.
   Load with: <script src="/eta-hdr.js?v=1" defer></script> */
(function(){
  'use strict';
  var eh=document.getElementById('eh');
  if(!eh||window.__etaHdr)return;
  window.__etaHdr=1;
  var root=document.documentElement;

  /* dropdowns: Services (chevron) and Domains */
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

  /* phone menu */
  var mb=eh.querySelector('.eh-menu'),sheet=document.getElementById('ehSheet');
  if(mb&&sheet){
    mb.addEventListener('click',function(){
      var open=sheet.hidden;
      sheet.hidden=!open;
      mb.setAttribute('aria-expanded',open?'true':'false');
    });
  }

  /* header off screen: compact bar slides in, mouth docks, phone call bar shows */
  var ticking=false,on=null;
  function update(){
    ticking=false;
    var gone=eh.getBoundingClientRect().bottom<0;
    if(gone!==on){on=gone;root.classList.toggle('eh-on',gone);}
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update,{passive:true});
  update();

  /* AI assistant hookup: only runs when the brain script (window.ETABrain) is on the page.
     Its talking level drives the bars, its mode tints them, and the mouths open the chat panel. */
  function hook(B){
    if(!B||root.classList.contains('eh-ai'))return;
    root.classList.add('eh-ai');
    var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sets=[].slice.call(document.querySelectorAll('.eh-bars')).map(function(s){
      return [].slice.call(s.children).map(function(b,i){return {el:b,p:+b.style.getPropertyValue('--p')||1,f:1.7+i*.37,ph:(i*2.39)%6.28};});
    });

    /* chat panel, opened from the header mouth or the docked mouth */
    var panel=document.createElement('div');
    panel.className='eh-chat';panel.id='ehChat';panel.hidden=true;
    panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Chat with the Eye To Ad Media AI assistant');
    panel.innerHTML='<button class="eh-chat-x" type="button" aria-label="Close chat">&times;</button><div class="eh-chat-body"></div>';
    document.body.appendChild(panel);
    var mounted=false,opener=null;
    function openChat(from){
      opener=from||null;
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
    [].forEach.call(document.querySelectorAll('.eh .eh-mouth'),function(m){
      m.removeAttribute('aria-hidden');m.setAttribute('role','button');m.tabIndex=0;
      m.setAttribute('aria-label','Chat with our AI assistant');
      m.addEventListener('click',function(){openChat(m);});
      m.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openChat(m);}});
    });
    var dock=document.querySelector('.eh-dock');
    if(dock){
      dock.setAttribute('aria-label','Chat with our AI assistant');
      dock.addEventListener('click',function(e){e.preventDefault();if(panel.hidden)openChat(dock);else closeChat();});
    }

    /* talking: the brain's level (0..1) moves every set of bars */
    var level=0,raf=0;
    function rest(){sets.forEach(function(set){set.forEach(function(b){b.el.style.transform='';});});}
    function frame(now){
      raf=0;
      if(!B.speaking){rest();return;}
      sets.forEach(function(set){set.forEach(function(b){
        var h=.16+level*b.p*(.7+.3*Math.sin(now/1000*b.f*6+b.ph));
        b.el.style.transform='scaleY('+Math.min(1,h).toFixed(3)+')';
      });});
      if(B.speaking&&!reduced)raf=requestAnimationFrame(frame);
    }
    B.on('level',function(d){level=d.v;if(!raf&&!reduced)raf=requestAnimationFrame(frame);});
    B.on('speaking',function(d){
      root.classList.toggle('eh-talk',d.on);
      if(!d.on){if(raf)cancelAnimationFrame(raf);raf=0;rest();}
    });
    B.on('mode',function(d){
      root.classList.remove('eh-m-rainbow','eh-m-promo','eh-m-tip','eh-m-cheeks');
      if(d.mode&&d.mode!=='normal')root.classList.add('eh-m-'+d.mode);
    });
  }
  if(window.ETABrain)hook(window.ETABrain);
  else document.addEventListener('eta:ready',function(e){hook(e.detail||window.ETABrain);});
})();
