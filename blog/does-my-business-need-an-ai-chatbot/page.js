
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
  var root = document.getElementById('botCalc');
  if (!root) return;
  var enq = document.getElementById('cf-enq'), after = document.getElementById('cf-after'),
      val = document.getElementById('cf-val'), close = document.getElementById('cf-close'),
      A = document.getElementById('cfA'), B = document.getElementById('cfB'),
      C = document.getElementById('cfC'), D = document.getElementById('cfD'),
      verdict = document.getElementById('cfVerdict'), explain = document.getElementById('cfExplain'),
      next = document.getElementById('cfNext');

  var RECOVERY = 0.25;   /* conservative on purpose */

  function n(el, fallback){
    var v = parseFloat(el.value);
    return (isNaN(v) || v < 0) ? fallback : v;
  }
  function money(x){
    return '$' + Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function calc(){
    var e = n(enq, 0), a = Math.min(n(after, 0), 100) / 100,
        v = n(val, 0), c = Math.min(n(close, 0), 100) / 100;
    var afterCount = e * a;
    var recovered = afterCount * RECOVERY;
    var extra = recovered * c;
    var annual = extra * v * 12;

    A.textContent = afterCount.toFixed(1);
    B.textContent = recovered.toFixed(1);
    C.textContent = extra.toFixed(1);
    D.textContent = money(annual);
    var totalRow = D.closest ? D.closest('.cf-row') : D.parentNode;
    if (totalRow && totalRow.classList) totalRow.classList.toggle('low', annual < 6000);

    if (e < 10){
      verdict.className = 'dt-verdict build';
      verdict.textContent = 'Not yet \u2014 you need more traffic first.';
      explain.innerHTML = 'At this inquiry volume the arithmetic cannot work whatever the tool ' +
        'costs. <b>The constraint is how many people find you, not how fast you answer them.</b>';
      next.innerHTML = 'Spend the money on being found instead. ' +
        '<a href="/free-seo-audit/">A free audit</a> will tell you where the traffic gap is.';
    } else if (annual < 6000){
      verdict.className = 'dt-verdict mid';
      verdict.textContent = 'Marginal. Do the free things first.';
      explain.innerHTML = 'The recoverable value here is real but modest. <b>Answer the phone ' +
        'reliably, publish your prices, shorten your form and set up a useful auto-reply</b> ' +
        '\u2014 then look again in six months.';
      next.innerHTML = 'Those four cost nothing and address the same underlying problem. ' +
        'If response time is still your constraint afterwards, revisit this.';
    } else {
      verdict.className = 'dt-verdict fix';
      verdict.textContent = 'Worth pricing properly.';
      explain.innerHTML = 'At a deliberately conservative recovery rate the annual value clears ' +
        'the cost of most implementations comfortably. <b>That does not mean buy the first one ' +
        'you are shown</b> \u2014 it means the problem is real enough to solve properly.';
      next.innerHTML = 'Make sure whatever you build hands over gracefully, never invents ' +
        'details, and gets measured weekly. ' +
        '<a href="/ai-chatbot-for-business/">Here is how we build them</a>.';
    }
  }

  [enq, after, val, close].forEach(function(el){
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });
  calc();
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

