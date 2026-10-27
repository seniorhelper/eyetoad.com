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
})();
