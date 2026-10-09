
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
  var root = document.getElementById('cityTool');
  if (!root) return;
  var out = document.getElementById('ctOut'),
      verdict = document.getElementById('ctVerdict'),
      explain = document.getElementById('ctExplain'),
      fill = document.getElementById('ctFill'),
      next = document.getElementById('ctNext'),
      hint = document.getElementById('ctHint');

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
    var total = answers.reduce(function(a,b){ return a + b; }, 0);
    var pct = Math.round((total / 20) * 100);
    if (hint) hint.hidden = true;
    out.hidden = false;
    fill.style.width = pct + '%';

    if (total <= 6){
      verdict.className = 'dt-verdict fix';
      verdict.textContent = 'Winnable. Go ahead and build the page properly.';
      explain.innerHTML = 'You have enough going for you here \u2014 either real proximity, real ' +
        'market knowledge, or search behaviour that does not depend on the map pack. ' +
        '<b>Build one genuinely distinct page for that market and support it with links connected ' +
        'to the place.</b>';
      next.innerHTML = 'Next step: research the market before you write a word \u2014 competitors, ' +
        'dominant industries, districts, seasonality. Then build one page and prove it before ' +
        'adding a second market.';
    } else if (total <= 13){
      verdict.className = 'dt-verdict mid';
      verdict.textContent = 'Partly winnable. Compete organically, concede the map.';
      explain.innerHTML = 'The map pack is probably out of reach from where you sit, but the ' +
        'organic results underneath it are not. <b>That is a legitimate strategy as long as you ' +
        'enter it deliberately</b>, knowing which half of the page you are playing for.';
      next.innerHTML = 'Next step: check whether the searches that make you money are the ' +
        'map-pack kind or the research kind. If it is mostly research, this market is worth ' +
        'entering. <a href="/local-seo-services/">Here is how we approach it</a>.';
    } else {
      verdict.className = 'dt-verdict build';
      verdict.textContent = 'Not yet. You would be spending against a result you cannot win.';
      explain.innerHTML = 'No address, real distance, and money that comes from urgent near-me ' +
        'searching is the combination that wastes the most budget in local marketing. ' +
        '<b>The result you need is anchored to a physical point you do not have.</b>';
      next.innerHTML = 'Next step: either commit to a genuine staffed location there, or pick a ' +
        'closer market and expand outward. <a href="/free-seo-audit/">We will tell you honestly</a> ' +
        'which of those makes more sense for your numbers.';
    }
  }
})();

(function(){
  var qs = document.querySelectorAll('.afaq-q');
  for (var i = 0; i < qs.length; i++){
    (function(b){
      b.addEventListener('click', function(){
        var item = b.parentNode, open = item.classList.contains('open');
        item.classList.toggle('open', !open);
        b.setAttribute('aria-expanded', String(!open));
      });
    })(qs[i]);
  }
})();

