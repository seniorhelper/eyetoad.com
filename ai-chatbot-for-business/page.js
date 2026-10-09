
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
  var log = document.getElementById('ab-log');
  var clock = document.getElementById('ab-clock');
  if (!log) return;

  var SCRIPT = [
    {w:'u', t:'do you guys do bathroom remodels? how much roughly', at:'11:47 PM'},
    {w:'b', t:'We do. Ballpark for a full bath in this area runs <b>$9,000 to $18,000</b> depending on whether the layout moves and what the tile situation is. Is this a full gut or a refresh?', at:'11:47 PM'},
    {w:'u', t:'refresh. tub to shower conversion mainly', at:'11:48 PM'},
    {w:'b', t:'That is usually the lower end &mdash; call it <b>$6,500 to $11,000</b> for a tub-to-shower without moving plumbing. Are you working to a deadline?', at:'11:49 PM'},
    {w:'u', t:'my mom is moving in next month so kind of yes', at:'11:50 PM'},
    {w:'b', t:'Understood &mdash; that also changes what I would suggest, because accessibility work is worth deciding on <em>before</em> the tile goes in, not after. Want someone to call you in the morning and walk through it?', at:'11:50 PM'},
    {w:'u', t:'yes please. 9am works', at:'11:51 PM'},
    {w:'b', t:'Booked. What is the best number to reach you on?', at:'11:51 PM'},
    {w:'b', cls:'win', t:'&#10003; <b>Lead captured at 11:52 PM.</b> Sent through with the full conversation attached &mdash; so whoever calls at 9am already knows it is a tub-to-shower, there is a deadline, and accessibility matters.', at:'11:52 PM'}
  ];

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  function add(step){
    var d = document.createElement('div');
    d.className = 'ab-msg ' + step.w + (step.cls ? ' ' + step.cls : '');
    d.innerHTML = step.t;
    log.appendChild(d);
    if (clock && step.at) clock.textContent = step.at;
    while (log.children.length > 5) log.removeChild(log.firstChild);
  }

  if (reduce){ SCRIPT.forEach(add); return; }

  var i = 0, timer = null;
  function typing(){
    var t = document.createElement('div');
    t.className = 'ab-typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t);
    while (log.children.length > 5) log.removeChild(log.firstChild);
    return t;
  }
  function step(){
    if (i >= SCRIPT.length){
      timer = setTimeout(function(){ log.innerHTML = ''; i = 0; step(); }, 5200);
      return;
    }
    var s = SCRIPT[i++];
    if (s.w === 'b'){
      var t = typing();
      timer = setTimeout(function(){
        try { t.remove(); } catch(e){}
        add(s);
        timer = setTimeout(step, 1500);
      }, 950);
    } else {
      add(s);
      timer = setTimeout(step, 1250);
    }
  }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if (e.isIntersecting && i === 0) step();
        if (!e.isIntersecting && timer){ clearTimeout(timer); timer = null; if (i >= SCRIPT.length) { log.innerHTML=''; i=0; } }
      });
    }, {threshold:.25});
    io.observe(log);
  } else { step(); }
})();

(function(){
  var bars = [].slice.call(document.querySelectorAll('.ab-bar'));
  if (!bars.length) return;
  function fill(){
    bars.forEach(function(b){
      var f = b.querySelector('.ab-bar-f');
      var pct = parseFloat(b.getAttribute('data-pct')) || 0;
      if (f) f.style.width = Math.min(100, (pct / 30) * 100) + '%';
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
  var btns = [].slice.call(document.querySelectorAll('[data-open-iris]'));
  if (!btns.length) return;
  function tryOpen(n){
    if (typeof window.openIris === 'function'){ window.openIris(); return; }
    if (n > 20) return;
    setTimeout(function(){ tryOpen(n+1); }, 150);
  }
  btns.forEach(function(b){
    b.addEventListener('click', function(){ tryOpen(0); });
  });
})();

