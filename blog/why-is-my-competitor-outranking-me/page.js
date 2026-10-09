
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
  var root = document.getElementById('diagTool');
  if (!root) return;
  var out = document.getElementById('dgOut'),
      verdict = document.getElementById('dgVerdict'),
      explain = document.getElementById('dgExplain'),
      next = document.getElementById('dgNext'),
      hint = document.getElementById('dgHint');

  var CAUSES = {
    check: {
      cls:'fix',
      v:'Start here: you have not confirmed the gap is real.',
      e:'Search results are personalised by location, history and whether you are signed in. ' +
        '<b>Until you have checked signed out, in a private window, searching the service rather ' +
        'than your business name, you do not yet know that they are outranking you</b> for anyone ' +
        'but you.',
      n:'Do that first \u2014 it takes four minutes and resolves a meaningful share of these. ' +
        'For local terms, <a href="/free-seo-tools/">re-centre the map on a different neighbourhood</a> ' +
        'and look again.'
    },
    prox: {
      cls:'mid',
      v:'Most likely cause: they are closer to the searcher.',
      e:'Distance is one of Google\u2019s three stated local ranking factors and you cannot ' +
        'optimise around where your building is. <b>Two equally good businesses do not rank ' +
        'equally for someone standing between them.</b>',
      n:'Stop fighting geography and change the target: compete on longer, more considered ' +
        'searches where the map pack does not decide the outcome. ' +
        '<a href="/local-seo-denver/">Here is how local position actually varies</a>.'
    },
    intent: {
      cls:'mid',
      v:'Most likely cause: your page describes the company instead of answering the question.',
      e:'This is the best available trade on the list \u2014 <b>the cheapest fix with the largest ' +
        'realistic effect</b>. Their page answers what was typed. Yours introduces you first and ' +
        'answers later, or not at all.',
      n:'Rewrite the top of the page so the question is answered in the first paragraph, then ' +
        'keep the company story further down where it still does useful work.'
    },
    age: {
      cls:'mid',
      v:'Most likely cause: their page is considerably older than yours.',
      e:'About 73% of pages in Google\u2019s top ten are more than three years old. <b>A large part ' +
        'of your gap is calendar rather than quality</b>, and that changes what a reasonable ' +
        'expectation looks like.',
      n:'Update in place rather than republishing at new URLs, refresh the page properly every ' +
        'quarter, and give a competitive term six to twelve months before judging it.'
    },
    cluster: {
      cls:'build',
      v:'Most likely cause: they cover the topic, you cover one page.',
      e:'A site with a main page plus supporting content consistently outranks a site with one ' +
        'standalone page on the same subject. <b>You are competing one page against a body of ' +
        'work.</b>',
      n:'Plan eight to ten supporting pieces around your main page \u2014 costs, problems, ' +
        'comparisons, the questions people ask before buying. ' +
        '<a href="/seo-systems/">This is what an ongoing engagement is for</a>.'
    },
    links: {
      cls:'build',
      v:'Most likely cause: their links are more relevant than yours.',
      e:'Topical relevance now matters roughly four times more than quantity. <b>Ten links from ' +
        'genuinely related sources beat a hundred from directories nobody reads.</b>',
      n:'Look at who links to them \u2014 anyone willing to link to a business like theirs may ' +
        'link to yours. Then go local: suppliers, associations, press, partners.'
    },
    tech: {
      cls:'build',
      v:'Fix this first: something technical is holding the page back.',
      e:'Only around 56% of pages pass all three Core Web Vitals together, and a page that cannot ' +
        'be indexed properly cannot rank at all. <b>A technical fault masks every other cause ' +
        'beneath it.</b>',
      n:'Run PageSpeed Insights on mobile and inspect the URL in Search Console. Resolve what you ' +
        'find, then work down this list again from the top.'
    }
  };

  var qs = [].slice.call(root.querySelectorAll('.dt-q'));
  var picked = new Array(qs.length).fill(null);

  qs.forEach(function(q, i){
    var opts = [].slice.call(q.querySelectorAll('.dt-o'));
    opts.forEach(function(b){
      b.addEventListener('click', function(){
        opts.forEach(function(o){ o.classList.remove('on'); });
        b.classList.add('on');
        picked[i] = { k: b.getAttribute('data-k'), w: parseInt(b.getAttribute('data-w'), 10) };
        decide();
      });
    });
  });

  function decide(){
    if (picked.indexOf(null) !== -1) return;
    var best = null;
    picked.forEach(function(p){
      if (!p || p.w <= 0) return;
      if (!best || p.w > best.w) best = p;
    });
    if (hint) hint.hidden = true;
    out.hidden = false;

    if (!best){
      verdict.className = 'dt-verdict fix';
      verdict.textContent = 'Nothing on this list is obviously wrong.';
      explain.innerHTML = 'You have checked properly, the page answers the query, it is not ' +
        'newer, the depth is comparable and the technical side is clean. <b>That usually means ' +
        'the competitor is simply doing the unglamorous version of this consistently, and has ' +
        'been for longer.</b>';
      next.innerHTML = 'That is replicable. Keep updating, keep earning relevant links, and give ' +
        'it time \u2014 or <a href="/free-seo-audit/">have us look</a> for something the list does ' +
        'not cover.';
      return;
    }
    var c = CAUSES[best.k];
    verdict.className = 'dt-verdict ' + c.cls;
    verdict.textContent = c.v;
    explain.innerHTML = c.e;
    next.innerHTML = c.n;
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

