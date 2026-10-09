
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
  var root = document.getElementById('decideTool');
  if (!root) return;
  var out = document.getElementById('dtOut'),
      verdict = document.getElementById('dtVerdict'),
      explain = document.getElementById('dtExplain'),
      fill = document.getElementById('dtFill'),
      next = document.getElementById('dtNext'),
      hint = document.getElementById('dtHint');

  var qs = [].slice.call(root.querySelectorAll('.dt-q'));
  var answers = new Array(qs.length).fill(null);

  qs.forEach(function(q, i){
    var opts = [].slice.call(q.querySelectorAll('.dt-o'));
    opts.forEach(function(b){
      b.addEventListener('click', function(){
        opts.forEach(function(o){ o.classList.remove('on'); });
        b.classList.add('on');
        answers[i] = parseInt(b.getAttribute('data-w'), 10);
        score();
      });
    });
  });

  function score(){
    if (answers.indexOf(null) !== -1) return;
    var total = answers.reduce(function(a, b){ return a + b; }, 0);
    var max = 18;
    var pct = Math.round((total / max) * 100);
    if (hint) hint.hidden = true;
    out.hidden = false;
    fill.style.width = pct + '%';

    if (total <= 5){
      verdict.className = 'dt-verdict fix';
      verdict.textContent = 'Fix it. A rebuild would cost you more than it returns.';
      explain.innerHTML = 'Nothing in your answers points at a structural problem. What you have ' +
        'is a site that needs specific work \u2014 speed, forms, wording, proof \u2014 not a ' +
        'replacement. <b>Every one of those can be done without a launch day, and therefore ' +
        'without risking the rankings you already hold.</b>';
      next.innerHTML = 'Sensible next step: run your busiest page through PageSpeed Insights, then ' +
        'fix the three slowest things on it. If you want an outside read first, ' +
        '<a href="/free-seo-audit/">a free audit</a> will tell you which three.';
    } else if (total <= 11){
      verdict.className = 'dt-verdict mid';
      verdict.textContent = 'Mixed. Fix first, then revisit this in a year.';
      explain.innerHTML = 'You have a couple of real constraints but not enough to justify putting ' +
        'your traffic at risk right now. This is the most common result, and it is usually a site ' +
        'that is <b>structurally sound but neglected</b> \u2014 which is exactly the situation ' +
        'where a rebuild wastes the most money.';
      next.innerHTML = 'Sensible next step: fix the specific problems, keep earning, and reassess ' +
        'with twelve more months of data. If one answer was a hard "no, it cannot do that", price ' +
        '<a href="/custom-website-design/">a rebuild</a> so you know the number \u2014 then decide ' +
        'deliberately rather than under pressure.';
    } else {
      verdict.className = 'dt-verdict build';
      verdict.textContent = 'Rebuild \u2014 but plan the migration before the design.';
      explain.innerHTML = 'Your answers point at constraints that patching will not resolve. ' +
        'That is a legitimate rebuild. <b>The thing that decides whether it goes well is the ' +
        'migration plan, not the mockups</b> \u2014 redirect mapping alone accounts for the ' +
        'majority of post-launch traffic loss.';
      next.innerHTML = 'Sensible next step: take your baseline before anything else, and make the ' +
        'redirect map a named deliverable owned by a named person. ' +
        '<a href="/contact/">Talk it through with us</a> if you want a second opinion on the plan ' +
        'before you commit.';
    }
  }
})();

(function(){
  var qs = document.querySelectorAll('.afaq-q');
  for (var i = 0; i < qs.length; i++){
    (function(b){
      b.addEventListener('click', function(){
        var item = b.parentNode;
        var open = item.classList.contains('open');
        item.classList.toggle('open', !open);
        b.setAttribute('aria-expanded', String(!open));
      });
    })(qs[i]);
  }
})();

