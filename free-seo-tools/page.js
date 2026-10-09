
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

var FT = (function(){
  var ctx = null;
  try { ctx = document.createElement('canvas').getContext('2d'); } catch(e){}
  function px(text, font){
    if (!ctx) return String(text).length * (font.indexOf('20px') === 0 ? 9.2 : 6.7);
    ctx.font = font;
    return ctx.measureText(String(text)).width;
  }
  return {
    title: function(t){ return Math.round(px(t, '20px Arial, sans-serif')); },
    desc:  function(t){ return Math.round(px(t, '14px Arial, sans-serif')); },
    clip: function(t, budget, font){
      t = String(t);
      if (!ctx){ return [t, '']; }
      ctx.font = font;
      if (ctx.measureText(t).width <= budget) return [t, ''];
      var lo = 0, hi = t.length;
      while (lo < hi){
        var mid = Math.ceil((lo + hi) / 2);
        if (ctx.measureText(t.slice(0, mid) + '\u2026').width <= budget) lo = mid; else hi = mid - 1;
      }
      return [t.slice(0, lo), t.slice(lo)];
    },
    esc: function(s){
      return String(s).replace(/[&<>"']/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
      });
    },
    money: function(n){
      return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
})();

(function(){
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('.ft-copy') : null;
    if (!b) return;
    var sel = b.getAttribute('data-copy');
    var txt = sel ? (document.querySelector(sel) || {}).textContent : b.getAttribute('data-text');
    if (!txt) return;
    var done = function(){
      var old = b.textContent;
      b.textContent = 'Copied'; b.classList.add('done');
      setTimeout(function(){ b.textContent = old; b.classList.remove('done'); }, 1400);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(done, function(){});
        return;
      }
    } catch(err){}
    try {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.setAttribute('readonly',''); ta.style.position = 'absolute';
      ta.style.left = '-9999px'; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done();
    } catch(err2){}
  });
})();

(function(){
  var T = document.getElementById('sp-title');
  if (!T) return;
  var D = document.getElementById('sp-desc'), U = document.getElementById('sp-url');
  var mobile = false;
  var LIM = { tD:600, tM:500, dD:920, dM:680 };

  function meter(barEl, pxEl, noteEl, val, max){
    var pct = Math.min(100, (val / max) * 100);
    barEl.style.width = pct + '%';
    barEl.className = 'ft-meter-f' + (val > max ? ' over' : (pct > 88 ? ' warn' : ''));
    pxEl.textContent = val;
    noteEl.innerHTML = val > max ? '<span class="bad">Will be cut</span>'
                     : (pct > 88 ? 'Close to the limit' : 'Fits');
  }
  function render(){
    var tLim = mobile ? LIM.tM : LIM.tD, dLim = mobile ? LIM.dM : LIM.dD;
    document.getElementById('sp-tmax').textContent = tLim;
    document.getElementById('sp-dmax').textContent = dLim;

    var tw = FT.title(T.value), dw = FT.desc(D.value);
    meter(document.getElementById('sp-tbar'), document.getElementById('sp-tpx'),
          document.getElementById('sp-tnote'), tw, tLim);
    meter(document.getElementById('sp-dbar'), document.getElementById('sp-dpx'),
          document.getElementById('sp-dnote'), dw, dLim);
    document.getElementById('sp-dch').textContent = D.value.length;

    var tc = FT.clip(T.value, tLim, '20px Arial, sans-serif');
    var dc = FT.clip(D.value, dLim, '14px Arial, sans-serif');
    document.getElementById('sp-ptitle').innerHTML =
      FT.esc(tc[0]) + (tc[1] ? '<span class="ft-serp-cut">' + FT.esc(tc[1]) + '</span>' : '');
    document.getElementById('sp-pdesc').innerHTML =
      FT.esc(dc[0]) + (dc[1] ? '<span class="ft-serp-cut">' + FT.esc(dc[1]) + '</span>' : '');

    var raw = (U.value || '').replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    var parts = raw.split('/');
    var host = parts.shift() || 'example.com';
    document.getElementById('sp-site').textContent = host;
    document.getElementById('sp-path').textContent =
      'https://' + host + (parts.length ? ' \u203a ' + parts.join(' \u203a ') : '');
    document.getElementById('sp-serp').className = 'ft-serp' + (mobile ? ' mob' : '');
  }
  [T, D, U].forEach(function(el){ el.addEventListener('input', render); });
  document.getElementById('sp-desk').addEventListener('click', function(){
    mobile = false; this.setAttribute('aria-pressed','true');
    document.getElementById('sp-mob').setAttribute('aria-pressed','false'); render();
  });
  document.getElementById('sp-mob').addEventListener('click', function(){
    mobile = true; this.setAttribute('aria-pressed','true');
    document.getElementById('sp-desk').setAttribute('aria-pressed','false'); render();
  });
  render();
})();

(function(){
  var K = document.getElementById('tg-kw');
  if (!K) return;
  var C = document.getElementById('tg-city'), B = document.getElementById('tg-brand');
  var OUT = document.getElementById('tg-out');
  var YEAR = new Date().getFullYear();

  function cap(s){ return s.replace(/\b[a-z]/g, function(m){ return m.toUpperCase(); }); }
  function build(){
    var k = cap((K.value || '').trim() || 'your service');
    var c = (C.value || '').trim(), b = (B.value || '').trim();
    var loc = c ? ' in ' + cap(c) : '';
    var locS = c ? ' ' + cap(c) : '';
    var tail = b ? ' | ' + b : '';
    var list = [
      k + locS + tail,
      k + locS + ' | Free Quotes' + (b ? ' from ' + b : ''),
      'Affordable ' + k + loc + tail,
      'Best ' + k + locS + ' (' + YEAR + ')' + tail,
      k + locS + ' \u2014 Licensed & Insured' + tail,
      'How Much Does ' + k + ' Cost' + loc + '?',
      '5 Things to Ask Before Hiring for ' + k + locS,
      k + locS + ' You Can Book This Week' + tail
    ];
    OUT.innerHTML = list.map(function(t){
      var w = FT.title(t);
      var cls = w > 600 ? 'over' : (w > 528 ? 'warn' : 'ok');
      return '<div class="ft-var"><span class="ft-var-t">' + FT.esc(t) + '</span>' +
             '<span class="ft-var-px ' + cls + '">' + w + 'px</span>' +
             '<button class="ft-copy" type="button" data-text="' + FT.esc(t) + '">Copy</button></div>';
    }).join('');
  }
  [K, C, B].forEach(function(el){ el.addEventListener('input', build); });
  build();
})();

(function(){
  var N = document.getElementById('sc-name');
  if (!N) return;
  var ids = ['sc-name','sc-type','sc-url','sc-phone','sc-street','sc-city','sc-state','sc-zip','sc-areas'];
  var el = {}; ids.forEach(function(i){ el[i] = document.getElementById(i); });
  var OUT = document.getElementById('sc-code');

  function build(){
    var areas = (el['sc-areas'].value || '').split(',')
      .map(function(s){ return s.trim(); }).filter(Boolean)
      .map(function(s){ return { '@type':'City', name:s }; });
    var obj = {
      '@context':'https://schema.org',
      '@type': el['sc-type'].value,
      name: el['sc-name'].value,
      url: el['sc-url'].value,
      telephone: el['sc-phone'].value,
      address: {
        '@type':'PostalAddress',
        streetAddress: el['sc-street'].value,
        addressLocality: el['sc-city'].value,
        addressRegion: el['sc-state'].value,
        postalCode: el['sc-zip'].value,
        addressCountry:'US'
      }
    };
    if (areas.length) obj.areaServed = areas;
    OUT.textContent = '<script type="application/ld+json">\n'
      + JSON.stringify(obj, null, 2) + '\n<\/script>';
  }
  ids.forEach(function(i){
    el[i].addEventListener('input', build);
    el[i].addEventListener('change', build);
  });
  build();
})();

(function(){
  var A = document.getElementById('lc-ticket');
  if (!A) return;
  var ids = ['lc-ticket','lc-margin','lc-close','lc-repeat','lc-target'];
  var el = {}; ids.forEach(function(i){ el[i] = document.getElementById(i); });

  function calc(){
    var ticket = Math.max(1, parseFloat(el['lc-ticket'].value) || 0);
    var margin = Math.min(100, Math.max(1, parseFloat(el['lc-margin'].value) || 0)) / 100;
    var close  = Math.min(100, Math.max(1, parseFloat(el['lc-close'].value)  || 0)) / 100;
    var repeat = Math.max(1, parseFloat(el['lc-repeat'].value) || 1);
    var target = Math.max(1, parseFloat(el['lc-target'].value) || 1);

    var ltv   = ticket * margin * repeat;      // lifetime gross profit per customer
    var breakEven = ltv * close;               // per LEAD, since only some close
    var maxCost   = breakEven / target;

    document.getElementById('lc-ltv').textContent = FT.money(ltv);
    document.getElementById('lc-break').textContent = FT.money(breakEven);
    document.getElementById('lc-target-out').textContent = FT.money(maxCost);
  }
  ids.forEach(function(i){
    el[i].addEventListener('input', calc);
    el[i].addEventListener('change', calc);
  });
  calc();
})();

(function(){
  var W1 = document.getElementById('md-what');
  if (!W1) return;
  var P = document.getElementById('md-proof'), O = document.getElementById('md-offer'),
      A = document.getElementById('md-cta'), OUT = document.getElementById('md-out');

  function build(){
    var w = (W1.value||'').trim(), p = (P.value||'').trim(),
        o = (O.value||'').trim(), a = (A.value||'').trim();
    var list = [
      w + '. ' + o + '. ' + p + '. ' + a + '.',
      o + ' on ' + w.toLowerCase() + '. ' + p + '. ' + a + '.',
      w + ' \u2014 ' + p.toLowerCase() + '. ' + o + ', no obligation. ' + a + '.',
      'Looking for ' + w.toLowerCase() + '? ' + o + '. ' + p + '. ' + a + '.'
    ].map(function(s){ return s.replace(/\s+/g,' ').replace(/\.\s*\./g,'.').trim(); });

    OUT.innerHTML = list.map(function(t){
      var wpx = FT.desc(t);
      var cls = wpx > 920 ? 'over' : (wpx > 680 ? 'warn' : 'ok');
      var note = wpx > 920 ? 'cut on desktop' : (wpx > 680 ? 'cut on mobile' : 'fits both');
      return '<div class="ft-var"><span class="ft-var-t">' + FT.esc(t) + '</span>' +
             '<span class="ft-var-px ' + cls + '">' + wpx + 'px \u00b7 ' + note + '</span>' +
             '<button class="ft-copy" type="button" data-text="' + FT.esc(t) + '">Copy</button></div>';
    }).join('');
  }
  [W1,P,O,A].forEach(function(e){ e.addEventListener('input', build); });
  build();
})();


(function(){
function $(i){return document.getElementById(i);}
function on(ids,fn){ids.forEach(function(i){var e=$(i);if(e){e.addEventListener('input',fn);e.addEventListener('change',fn);}});fn();}
function J(o){return JSON.stringify(o,null,2);}
/* FAQ */
if($('fq-in')){on(['fq-in'],function(){var blocks=$('fq-in').value.split(/\n\s*\n/).map(function(b){return b.trim();}).filter(Boolean);var items=[];blocks.forEach(function(b){var ls=b.split('\n');if(ls.length<2)return;items.push({"@type":"Question","name":ls[0].trim(),"acceptedAnswer":{"@type":"Answer","text":ls.slice(1).join(' ').trim()}});});
 $('fq-out').textContent=items.length?'<script type="application/ld+json">\n'+J({"@context":"https://schema.org","@type":"FAQPage","mainEntity":items})+'\n<\/script>':'Add at least one question and answer pair.';});}
/* Article */
if($('ar-title')){on(['ar-title','ar-url','ar-author','ar-org','ar-date','ar-desc'],function(){var o={"@context":"https://schema.org","@type":"BlogPosting","headline":$('ar-title').value,"description":$('ar-desc').value,"url":$('ar-url').value,"datePublished":$('ar-date').value,"dateModified":$('ar-date').value,"author":{"@type":"Person","name":$('ar-author').value},"publisher":{"@type":"Organization","name":$('ar-org').value},"mainEntityOfPage":$('ar-url').value};$('ar-out').textContent='<script type="application/ld+json">\n'+J(o)+'\n<\/script>';});}
/* UTM */
if($('ut-url')){on(['ut-url','ut-src','ut-med','ut-cmp','ut-cnt'],function(){function c(s){return encodeURIComponent(s.trim().toLowerCase().replace(/\s+/g,'-'));}var u=$('ut-url').value.trim();if(!u){$('ut-out').textContent='Enter a destination URL.';return;}var q=['utm_source='+c($('ut-src').value),'utm_medium='+c($('ut-med').value),'utm_campaign='+c($('ut-cmp').value)];if($('ut-cnt').value.trim())q.push('utm_content='+c($('ut-cnt').value));$('ut-out').textContent=u+(u.indexOf('?')>-1?'&':'?')+q.join('&');});}
/* robots */
if($('rb-site')){on(['rb-site','rb-block','rb-ai'],function(){var s=$('rb-site').value.replace(/\/+$/,''),b=$('rb-block').value.trim(),ai=$('rb-ai').checked;var t='# robots.txt for '+s+'\n# Everything is crawlable on purpose.\n\nUser-agent: *\nAllow: /\n'+(b?'Disallow: '+(b.charAt(0)==='/'?b:'/'+b)+'\n':'')+'\n';if(ai){t+='# AI and answer-engine crawlers: explicitly welcome.\n';['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','anthropic-ai','PerplexityBot','Google-Extended','Applebot-Extended','Bytespider','CCBot'].forEach(function(u){t+='User-agent: '+u+'\nAllow: /\n';});t+='\n';}t+='Sitemap: '+s+'/sitemap.xml\n';$('rb-out').textContent=t;});}
/* NAP */
if($('np-a')){function norm(s){return s.toLowerCase().replace(/\b(street)\b/g,'st').replace(/\b(avenue)\b/g,'ave').replace(/\b(boulevard)\b/g,'blvd').replace(/\b(suite|ste|#)\s*/g,'#').replace(/\b(road)\b/g,'rd').replace(/\b(drive)\b/g,'dr').replace(/[.,]/g,'').replace(/\s+/g,' ').trim();}
 function parts(v){var ls=v.split('\n').map(function(l){return l.trim();}).filter(Boolean);var phone=(v.match(/\d{3}[^\d]{0,3}\d{3}[^\d]{0,3}\d{4}/)||[''])[0].replace(/\D/g,'');var name=ls[0]||'';var addr=ls.slice(1).filter(function(l){return !/\d{3}[^\d]{0,3}\d{3}[^\d]{0,3}\d{4}/.test(l);}).join(' ');return {name:norm(name),addr:norm(addr),phone:phone};}
 on(['np-a','np-b','np-c'],function(){var A=parts($('np-a').value),B=parts($('np-b').value),C=parts($('np-c').value);var rows=[['Business name',A.name,B.name,C.name],['Address',A.addr,B.addr,C.addr],['Phone',A.phone,B.phone,C.phone]];var html='<table style="width:100%;border-collapse:collapse;font-size:.9rem"><tr><th style="text-align:left;padding:8px;border-bottom:1px solid #E4E7EC">Field</th><th style="text-align:left;padding:8px;border-bottom:1px solid #E4E7EC">Match?</th><th style="text-align:left;padding:8px;border-bottom:1px solid #E4E7EC">What differs</th></tr>';var bad=0;rows.forEach(function(r){var ok=r[1]===r[2]&&r[2]===r[3];if(!ok)bad++;html+='<tr><td style="padding:8px;border-bottom:1px solid #F1F5F9"><b>'+r[0]+'</b></td><td style="padding:8px;border-bottom:1px solid #F1F5F9;color:'+(ok?'#15803D':'#B91C1C')+';font-weight:800">'+(ok?'Consistent':'Mismatch')+'</td><td style="padding:8px;border-bottom:1px solid #F1F5F9;color:#475467">'+(ok?'—':[r[1],r[2],r[3]].filter(function(v,i,a){return a.indexOf(v)===i;}).join(' · '))+'</td></tr>';});html+='</table><p style="margin:12px 0 0;font-weight:700;color:'+(bad?'#B91C1C':'#15803D')+'">'+(bad?bad+' field'+(bad>1?'s':'')+' disagree across your sources. A machine cross-checking you would fail verification.':'All three agree. That is the foundation AI systems and Google verify against.')+'</p>';$('np-out').innerHTML=html;});}
/* DIY vs pro */
if($('dy-hours')){on(['dy-hours','dy-rate','dy-job','dy-pro','dy-diyc'],function(){var hrs=+$('dy-hours').value||0,rate=+$('dy-rate').value||0,job=+$('dy-job').value||1,pro=+$('dy-pro').value||0,diyc=+$('dy-diyc').value||0;var diyTime=hrs*52*rate,diyTools=diyc*12,diyTotal=diyTime+diyTools,proTotal=pro*12,gap=(proTotal-diyTotal)/12/job;var need=gap>0?gap:0;$('dy-gap').value=(need>0?need.toFixed(1)+' more per month':'0 — the pro campaign already costs less');
 function f(n){return '$'+Math.round(n).toLocaleString('en-US');}
 $('dy-out').innerHTML=[['Your time, 12 months',f(diyTime),hrs+' hrs/week at '+f(rate)+'/hr'],['DIY tools, 12 months',f(diyTools),f(diyc)+' per month'],['DIY true cost',f(diyTotal),'time + tools'],['Professional campaign',f(proTotal),f(pro)+' per month']].map(function(c){return '<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:14px"><small style="display:block;color:#94A3B8;font-size:.78rem">'+c[0]+'</small><b style="display:block;font-size:1.5rem;color:#FDBA74;font-family:Fraunces,serif">'+c[1]+'</b><span style="font-size:.82rem;color:#CBD5E1">'+c[2]+'</span></div>';}).join('');
 $('dy-note').innerHTML=(proTotal<=diyTotal?'<b>At these numbers, doing it yourself is the more expensive option before a single extra customer.</b> Your time alone is worth more than the campaign — and the '+hrs+' hours a week come out of the part of the business only you can do.':'<b>A professional campaign would need to produce about '+need.toFixed(1)+' extra customer'+(need>=1.5?'s':'')+' a month to cost less than doing it yourself.</b> Whether it would is the question a free audit answers. What is not in this math: the customers you don\'t get during the months you spend learning, and the hours that come out of the work only you can do.')+' <span style="color:#94A3B8">Assumes your time has value; if it doesn\'t, DIY is free and this calculator is wrong.</span>';});}
})();

