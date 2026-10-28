/* Eye To Ad Media site search (Oct 2026). Loaded on demand by eta-hdr.js (header icon, "/" or Ctrl+K)
   and by /services/ for the big search box. Index: /search-index.json, built by _build/search-index.mjs.
   ETASearch.open(q)            the overlay
   ETASearch.inline(form, out)  wires a page form + results box (reads ?q= on load) */
(function(){
  'use strict';
  if(window.ETASearch)return;
  var data=null,loading=null;
  function load(){
    if(data)return Promise.resolve(data);
    if(!loading)loading=fetch('/search-index.json?v=1').then(function(r){return r.json();}).then(function(j){
      data=j.pages.map(function(r){return {p:r[0],t:r[1],d:r[2],k:r[3],w:r[4],T:norm(r[1]+' '+r[0].replace(/[\/-]/g,' ')),D:norm(r[2]),W:norm(r[4])};});
      return data;
    });
    return loading;
  }
  function norm(s){return ' '+String(s).toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9$]+/g,' ').trim()+' ';}
  function stem(w){return w.length>4?w.replace(/(ings?|ers?|es|s)$/,''):w;}
  var SYN={chatbot:'chat bot assistant toad',bot:'chatbot agent toad',ai:'ai artificial agent',price:'pricing cost',cost:'pricing price',prices:'pricing',
    website:'web site design',web:'website',maps:'google map local',map:'maps local',gbp:'google business profile',reviews:'review booster',
    ppc:'google ads',ads:'advertising ad lab',voice:'toad talking phone',phone:'call calls',calls:'phone',box:'business in a box',
    design:'product design website branding',logo:'brand design',packaging:'product design',geo:'generative chatgpt',aio:'ai overviews',chatgpt:'geo ai search',
    leads:'lead generation',lead:'lead generation',audit:'free seo audit',seo:'search engine optimization',hire:'contact',job:'careers',jobs:'careers'};
  var STOP={a:1,an:1,the:1,in:1,of:1,for:1,and:1,to:1,on:1,my:1,me:1,is:1,do:1,you:1,your:1,with:1,how:1,what:1,i:1};
  /* our own products float up when a query is clearly about them */
  var PIN=[[/chat ?bot|voice|assistant|talking|receptionist|answer/,'/toad/'],[/box|revenue share|partner/,'/business-in-a-box/'],[/design|packag|label|logo|brand|mockup|merch/,'/product-design/'],[/agent|automat/,'/ai-agents-for-business/'],[/price|pricing|cost/,'/denver-seo-pricing/'],[/audit|check|scan/,'/free-seo-audit/']];
  function terms(q){
    var base=norm(q).trim().split(' ').filter(function(w){return w&&!STOP[w];}),out=[];
    base.forEach(function(w){out.push({w:stem(w),x:1});(SYN[w]||'').split(' ').forEach(function(s){if(s)out.push({w:stem(s),x:.35});});});
    return {base:base,list:out,phrase:norm(q)};
  }
  var KIND={Service:1.15,Tool:1.1,Home:1.1,Industry:1,Article:.92,Location:.82,Info:.7,Blog:1};
  function score(r,q){
    var s=0,hit=0;
    q.list.forEach(function(t){
      var w=t.w,re=' '+w,m=0;
      if(r.T.indexOf(re)>-1)m=6;else if(r.W.indexOf(re)>-1)m=3;else if(r.D.indexOf(re)>-1)m=2;
      if(m){s+=m*t.x;if(t.x===1)hit++;}
    });
    if(!s)return 0;
    var need=q.base.length;
    if(need>1&&hit<need)s*=hit/need*.7;                 // every typed word should appear somewhere
    if(q.phrase.length>4&&r.T.indexOf(q.phrase)>-1)s+=10;  // exact phrase in the title
    else if(q.phrase.length>4&&(r.W+r.D).indexOf(q.phrase)>-1)s+=4;
    return s*(KIND[r.k]||1);
  }
  function find(q,n){
    var t=terms(q);if(!t.base.length)return [];
    var pin={};PIN.forEach(function(x){if(x[0].test(t.phrase))pin[x[1]]=1;});
    return data.map(function(r){var v=score(r,t);return [v&&pin[r.p]?v+12:v,r];}).filter(function(x){return x[0]>0;})
      .sort(function(a,b){return b[0]-a[0];}).slice(0,n).map(function(x){return x[1];});
  }
  var QUICK=[['/business-in-a-box/','Business in a Box','We build and run the lead site, you sell'],['/toad/','Toad','A talking AI for your website'],
    ['/product-design/','Product Design','Packaging, labels, brand and the Mockup Studio'],['/ai-agents-for-business/','AI Agents','They do the busywork'],
    ['/denver-seo-pricing/','Pricing','What SEO costs, published'],['/free-seo-audit/','Free SEO Audit','See what is holding you back']];
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function mark(s,q){
    var h=esc(s);terms(q).base.forEach(function(w){if(w.length<3)return;h=h.replace(new RegExp('\\b('+w.replace(/[^a-z0-9]/g,'')+'[a-z]*)','gi'),'<mark>$1</mark>');});return h;
  }
  function item(r,q){
    return '<li><a class="es-r" href="'+esc(r.p)+'"><span class="es-k">'+esc(r.k)+'</span><b>'+mark(r.t,q)+'</b><span class="es-d">'+mark(r.d,q)+'</span><span class="es-u">eyetoad.com'+esc(r.p)+'</span></a></li>';
  }
  function quick(){
    return '<p class="es-h">Popular</p><ul class="es-list es-quick">'+QUICK.map(function(x){return '<li><a class="es-r" href="'+x[0]+'"><b>'+x[1]+'</b><span class="es-d">'+x[2]+'</span></a></li>';}).join('')+'</ul>';
  }
  function none(q){
    return '<div class="es-none"><p><b>No page matches &ldquo;'+esc(q)+'&rdquo; yet.</b> A real person can answer it in a minute.</p><p><a class="es-btn" href="tel:18004818638">Call 1-800-481-8638</a> <a class="es-btn es-alt" href="/contact/">Send a message</a></p></div>';
  }
  var tmr;
  function track(q){clearTimeout(tmr);tmr=setTimeout(function(){try{gtag('event','search',{search_term:q.slice(0,80)});}catch(e){}},1200);}
  function render(out,q,n,count){
    q=q.trim();
    if(!q){out.innerHTML=quick();if(count)count.textContent='';return;}
    var r=find(q,n);
    out.innerHTML=r.length?'<ul class="es-list">'+r.map(function(x){return item(x,q);}).join('')+'</ul>':none(q);
    if(count)count.textContent=r.length?r.length+(r.length===n?'+':'')+' results for '+q:'No results for '+q;
    track(q);
  }
  /* arrow keys move between the input and the result links */
  function arrows(input,out){
    function links(){return [].slice.call(out.querySelectorAll('a.es-r'));}
    function onKey(e){
      if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
      var l=links();if(!l.length)return;
      var i=l.indexOf(document.activeElement);e.preventDefault();
      if(e.key==='ArrowDown')(l[i+1]||l[0]).focus();else if(i<=0)input.focus();else l[i-1].focus();
    }
    input.addEventListener('keydown',onKey);out.addEventListener('keydown',onKey);
  }

  /* ---------- overlay ---------- */
  var dlg,input,out,count,lastFocus;
  function build(){
    dlg=document.createElement('div');
    dlg.className='es-ov';dlg.hidden=true;
    dlg.innerHTML='<div class="es-panel" role="dialog" aria-modal="true" aria-label="Search eyetoad.com">'+
      '<form class="es-form" role="search" action="/services/" method="get"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'+
      '<label class="es-sr" for="esQ">Search the site</label><input id="esQ" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="Search services, tools, articles…" enterkeyhint="search">'+
      '<button class="es-x" type="button" aria-label="Close search">Esc</button></form>'+
      '<p class="es-sr" role="status" aria-live="polite"></p><div class="es-out"></div>'+
      '<p class="es-foot"><span>Can&rsquo;t find it? <a href="tel:18004818638">Call 1-800-481-8638</a></span><span class="es-keys"><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move <kbd>Enter</kbd> to open</span></p></div>';
    document.body.appendChild(dlg);
    input=dlg.querySelector('input');out=dlg.querySelector('.es-out');count=dlg.querySelector('[role=status]');
    input.addEventListener('input',function(){render(out,input.value,8,count);});
    dlg.querySelector('form').addEventListener('submit',function(e){
      var first=out.querySelector('a.es-r');
      if(first&&input.value.trim()){e.preventDefault();location.href=first.getAttribute('href');}
    });
    dlg.querySelector('.es-x').addEventListener('click',close);
    dlg.addEventListener('mousedown',function(e){if(e.target===dlg)close();});
    dlg.addEventListener('keydown',function(e){
      if(e.key==='Escape'){e.preventDefault();close();}
      if(e.key==='Tab'){ /* keep focus inside the dialog */
        var f=[].slice.call(dlg.querySelectorAll('input,button,a[href]')),a=f[0],z=f[f.length-1];
        if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
      }
    });
    arrows(input,out);
  }
  function open(q){
    if(!dlg)build();
    lastFocus=document.activeElement;
    dlg.hidden=false;document.documentElement.classList.add('es-open');
    if(typeof q==='string')input.value=q;
    out.innerHTML='<p class="es-h">Loading&hellip;</p>';
    input.focus();
    load().then(function(){render(out,input.value,8,count);},function(){out.innerHTML=none(input.value||'that');});
  }
  function close(){
    if(!dlg||dlg.hidden)return;
    dlg.hidden=true;document.documentElement.classList.remove('es-open');
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }

  /* ---------- inline (the /services/ search) ---------- */
  function inline(form,res){
    var inp=form.querySelector('input[type=search]'),cnt=form.parentNode.querySelector('[role=status]');
    var url=new URLSearchParams(location.search).get('q');
    function go(){
      load().then(function(){
        render(res,inp.value,24,cnt);res.hidden=!inp.value.trim();
        try{var u=new URL(location.href);if(inp.value.trim())u.searchParams.set('q',inp.value.trim());else u.searchParams.delete('q');history.replaceState(null,'',u);}catch(e){}
      });
    }
    inp.addEventListener('input',go);
    form.addEventListener('submit',function(e){e.preventDefault();go();var f=res.querySelector('a.es-r');if(f)f.focus();});
    arrows(inp,res);
    if(url){inp.value=url;go();}
  }

  /* styles live here so pages pay nothing until search is used */
  var css=document.createElement('style');css.id='eta-search-css';
  css.textContent='.es-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}'+
  'html.es-open{overflow:hidden}.es-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(6,11,22,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;justify-content:center;align-items:flex-start;padding:9vh 16px 16px}.es-ov[hidden]{display:none}'+
  '.es-panel{width:100%;max-width:680px;max-height:82vh;display:flex;flex-direction:column;background:#fff;border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.45);overflow:hidden;animation:esIn .18s ease-out;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}'+
  '@keyframes esIn{from{opacity:0;transform:translateY(-10px) scale(.985)}}'+
  '.es-form{position:relative;display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #E4E7EC}.es-form::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;background:linear-gradient(90deg,#DC2626,#F97316,#FACC15,#16A34A,#2563EB,#7C3AED)}'+
  '.es-form svg{width:22px;height:22px;color:#2563EB;flex:none}.es-form input{flex:1;min-width:0;border:0;outline:0;font:600 19px/1.3 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#101828;background:none;padding:6px 0}.es-form input::-webkit-search-cancel-button{display:none}'+
  '.es-x{flex:none;border:1px solid #D0D5DD;background:#F9FAFB;color:#344054;border-radius:8px;font:600 12px/1 Inter,system-ui,-apple-system,Segoe UI,sans-serif;padding:7px 9px;cursor:pointer}'+
  '.es-out{overflow:auto;padding:8px 10px 10px;overscroll-behavior:contain}'+
  '.es-h{margin:8px 8px 6px;font:800 11px/1 Inter,system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#475467}'+
  '.es-list{list-style:none;margin:0;padding:0}.es-r{display:block;padding:11px 12px;border-radius:12px;color:#101828!important;text-decoration:none!important;border:2px solid transparent}'+
  '.es-r:hover,.es-r:focus{background:#EFF4FF;outline:0;border-color:#2563EB}.es-r b{display:block;font:700 16px/1.3 Inter,system-ui,-apple-system,Segoe UI,sans-serif}.es-d{display:block;margin-top:3px;font:400 14px/1.45 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#475467;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'+
  '.es-u{display:block;margin-top:4px;font:500 12px/1.2 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#1D4ED8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
  '.es-k{float:right;margin-left:10px;font:700 10.5px/1 Inter,system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#344054;background:#F2F4F7;border-radius:99px;padding:5px 8px}'+
  '.es-r mark{background:#FEF08A;color:inherit;border-radius:3px;padding:0 1px}'+
  '.es-quick{display:grid;grid-template-columns:1fr 1fr;gap:2px}'+
  '.es-none{padding:18px 12px;color:#344054;font:400 15px/1.5 Inter,system-ui,-apple-system,Segoe UI,sans-serif}.es-none p{margin:0 0 12px}'+
  '.es-btn{display:inline-block;margin:0 8px 8px 0;padding:11px 16px;border-radius:10px;background:#DC2626;color:#fff!important;font:700 15px/1 Inter,system-ui,-apple-system,Segoe UI,sans-serif;text-decoration:none!important}.es-btn.es-alt{background:#101828}'+
  '.es-foot{display:flex;justify-content:space-between;gap:12px;margin:0;padding:10px 16px;border-top:1px solid #E4E7EC;background:#F9FAFB;font:500 13px/1.3 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#475467}.es-foot a{color:#1D4ED8;font-weight:700}'+
  '.es-keys kbd{display:inline-block;margin:0 2px;padding:2px 5px;border:1px solid #D0D5DD;border-bottom-width:2px;border-radius:5px;background:#fff;font:600 11px/1.2 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#344054}'+
  '@media (max-width:600px){.es-ov{padding:10px 10px}.es-panel{max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px)}.es-quick{grid-template-columns:1fr}.es-keys{display:none}.es-form input{font-size:17px}}'+
  '@media (prefers-reduced-motion:reduce){.es-panel{animation:none}}';
  document.head.appendChild(css);

  window.ETASearch={open:open,close:close,inline:inline,load:load};
})();
