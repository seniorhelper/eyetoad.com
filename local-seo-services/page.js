
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
  var g = document.getElementById('lo-grid');
  if (!g) return;
  var R = [14,22,18,11,26,31,
            9,12, 6, 8,17,24,
            4, 3, 2, 5, 9,15,
            6, 2, 0, 1, 7,12,
           11, 5, 3, 4,13,19,
           18,16,10, 9,21,28];
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
  R.forEach(function(n, i){
    var d = document.createElement('div');
    if (n === 0){ d.className = 'lo-cell you'; d.textContent = 'YOU'; }
    else {
      d.className = 'lo-cell ' + (n <= 3 ? 'g' : (n <= 10 ? 'a' : 'r'));
      d.textContent = n;
    }
    d.style.animationDelay = reduce ? '0s' : (i * 0.035) + 's';
    g.appendChild(d);
  });
})();

(function(){
  var rows = [].slice.call(document.querySelectorAll('.lo-w'));
  if (!rows.length) return;
  rows.forEach(function(row){
    var btn = row.querySelector('.lo-wb');
    var pan = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function(){
      var open = btn.getAttribute('aria-expanded') === 'true';
      rows.forEach(function(r){
        var b = r.querySelector('.lo-wb');
        var p = document.getElementById(b.getAttribute('aria-controls'));
        b.setAttribute('aria-expanded','false');
        if (p) p.setAttribute('hidden','');
      });
      if (!open){ btn.setAttribute('aria-expanded','true'); if (pan) pan.removeAttribute('hidden'); }
    });
  });
  function fill(){
    rows.forEach(function(row){
      var pct = row.querySelector('.lo-wb').getAttribute('data-pct');
      var bar = row.querySelector('.lo-wf');
      if (bar) bar.style.width = Math.min(100, parseInt(pct,10)) + '%';
    });
  }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ if (e.isIntersecting){ fill(); io.disconnect(); } });
    }, {rootMargin:'-60px'});
    io.observe(rows[0]);
  } else { fill(); }
})();

