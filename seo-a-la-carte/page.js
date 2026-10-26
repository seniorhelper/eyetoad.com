/* SEO a la carte — order builder. Cards are the source of truth for task names.
   Payment runs through the network secure checkout engine (checkout.js, SKU SEO-TASK, qty = task count).
   The engine has no order-note field, so the task list is emailed before checkout and confirmed with the
   order number when the buyer returns paid (?sc=thanks&order=...&sku=SEO-TASK). This file must load
   before checkout.js, which strips those return params from the URL. */
(function(){
  'use strict';
  var PRICE=100, CAP=10, KEY='eta_alacarte_v1', SKU='SEO-TASK', SITE='eyetoad.com';
  function $(id){return document.getElementById(id);}
  /* read the engine's return params now, before checkout.js removes them */
  var RET=(function(q){var m=/[?&]sc=thanks(?:&|$)/.test(q),o=/[?&]order=([A-Z0-9]{16})(?:&|$)/.exec(q),k=/[?&]sku=([A-Z0-9-]{2,40})(?:&|$)/.exec(q);
    return m&&k&&k[1]===SKU?{order:o?o[1]:''}:null;})(location.search||'');
  function ga(ev,p){try{if(typeof window.gtag==='function')window.gtag('event',ev,p||{});}catch(e){}}
  var panel=$('ac-panel'); if(!panel) return;

  /* ---- task catalogue from the cards ---- */
  var T={}, ORDER=[];
  [].forEach.call(document.querySelectorAll('.ac-card'),function(c){
    var id=c.getAttribute('data-id');
    T[id]={id:id,name:c.getAttribute('data-name'),unit:c.getAttribute('data-unit'),max:+c.getAttribute('data-max')||10,el:c};
    ORDER.push(id);
  });

  /* ---- state + storage ---- */
  var S={lines:[],d:{},sent:0};
  function load(){
    try{var raw=localStorage.getItem(KEY);if(!raw)return;var o=JSON.parse(raw);
      if(o&&Array.isArray(o.lines))S.lines=o.lines.filter(function(l){return l&&T[l.id]&&l.q>0;}).map(function(l){return {id:l.id,q:Math.min(T[l.id].max,Math.floor(l.q))};});
      if(o&&o.d&&typeof o.d==='object')S.d=o.d;
      if(o&&o.sent)S.sent=+o.sent||0;
    }catch(e){}
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify({lines:S.lines.map(function(l){return {id:l.id,q:l.q};}),d:S.d,sent:S.sent}));}catch(e){}}
  function count(){var n=0;S.lines.forEach(function(l){n+=l.q;});return n;}
  function line(id){for(var i=0;i<S.lines.length;i++)if(S.lines[i].id===id)return S.lines[i];return null;}
  function money(n){return '$'+n.toLocaleString('en-US');}
  function plural(n){return n+(n===1?' task':' tasks');}

  /* ---- icons ---- */
  var SV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
  var IC={plus:SV+'<path d="M12 5v14M5 12h14"/></svg>',x:SV+'<path d="M6 6l12 12M18 6 6 18"/></svg>',check:SV+'<path d="m5 12 5 5 9-10"/></svg>'};
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  /* ---- actions ---- */
  var live=$('ac-live');
  function say(msg){if(!live)return;live.textContent='';setTimeout(function(){live.textContent=msg;},30);}
  function summaryLine(){var n=count();return plural(n)+', '+money(n*PRICE)+' total.'+(n>CAP?' Over the 10 task limit for online checkout.':'');}
  function add(id){
    var t=T[id];if(!t)return;var l=line(id);
    if(l){ if(l.q>=t.max){say(t.name+(t.max===1?' is already in your order. It is a once-per-site task.':' is at its limit.'));return;} l.q++; }
    else S.lines.push({id:id,q:1});
    S.sent=0; commit(); say('Added '+t.name+'. '+summaryLine());
  }
  function dec(id){var l=line(id);if(!l)return;l.q--;if(l.q<=0)S.lines.splice(S.lines.indexOf(l),1);commit();say((l.q>0?'Removed one '+T[id].name+'. ':'Removed '+T[id].name+'. ')+summaryLine());}
  function rm(id){var l=line(id);if(!l)return;S.lines.splice(S.lines.indexOf(l),1);commit();say('Removed '+T[id].name+'. '+summaryLine());}
  function commit(){save();render();}

  /* ---- rendering ---- */
  var lines=$('ac-lines'),empty=$('ac-empty'),next=$('ac-next'),over=$('ac-over'),pay=$('ac-pay');
  function stepper(id,q,max,scope){
    var nm=esc(T[id].name);
    return '<span class="ac-step"><button type="button" data-act="dec" data-id="'+id+'" data-scope="'+scope+'" aria-label="Remove one '+nm+'">&minus;</button>'+
      '<output aria-label="'+nm+' quantity">'+q+'</output>'+
      '<button type="button" data-act="inc" data-id="'+id+'" data-scope="'+scope+'" aria-label="Add another '+nm+'"'+(q>=max?' disabled':'')+'>+</button></span>';
  }
  function render(){
    var a=document.activeElement,fa=null;
    if(a&&a.getAttribute&&a.getAttribute('data-act'))fa={act:a.getAttribute('data-act'),id:a.getAttribute('data-id'),scope:a.getAttribute('data-scope')};
    var n=count(),tot=n*PRICE;
    ORDER.forEach(function(id){
      var t=T[id],l=line(id),ctl=t.el.querySelector('.ac-ctl');
      t.el.classList.toggle('is-in',!!l);
      if(!l) ctl.innerHTML='<button type="button" class="ac-add" data-act="add" data-id="'+id+'" data-scope="card" aria-label="Add '+esc(t.name)+' for $100">'+IC.plus+'Add</button>';
      else if(t.max===1) ctl.innerHTML='<span class="ac-once">'+IC.check+'Added</span> <button type="button" class="ac-rm" data-act="rm" data-id="'+id+'" data-scope="card" aria-label="Remove '+esc(t.name)+'">'+IC.x+'</button>';
      else ctl.innerHTML=stepper(id,l.q,t.max,'card');
    });
    lines.innerHTML=S.lines.map(function(l){var t=T[l.id];
      return '<li><span class="ac-ln">'+esc(t.name)+'<small>'+esc(t.unit)+' · '+money(l.q*PRICE)+'</small></span><span class="ac-lr">'+
        (t.max>1?stepper(l.id,l.q,t.max,'line'):'')+
        '<button type="button" class="ac-rm" data-act="rm" data-id="'+l.id+'" data-scope="line" aria-label="Remove '+esc(t.name)+' from order">'+IC.x+'</button></span></li>';
    }).join('');
    empty.hidden=n>0;
    $('ac-count').textContent=plural(n);$('ac-total').textContent=money(tot);
    $('ac-cap').textContent=Math.min(n,99)+' of '+CAP+' tasks';
    var m=$('ac-meter');m.firstChild.style.width=Math.min(100,n/CAP*100)+'%';m.classList.toggle('over',n>CAP);
    over.hidden=n<=CAP;
    var ok=n>0&&n<=CAP;
    next.disabled=!ok;pay.disabled=!ok;
    $('ac-clear').hidden=n===0;
    $('ac-bar-t').textContent=plural(n)+' · '+money(tot);
    document.body.classList.toggle('ac-bar-on',n>0);
    if(n===0)setOpen(false);
    $('ac-recap').innerHTML=n?S.lines.map(function(l){var t=T[l.id];return '<li>'+esc(t.name)+' ('+esc(t.unit)+')'+(l.q>1?' &times; '+l.q:'')+' &mdash; '+money(l.q*PRICE)+'</li>';}).join(''):'<li>No tasks yet. <a href="#builder">Pick tasks above.</a></li>';
    $('ac-rcount').textContent=plural(n);$('ac-rtotal').textContent=money(tot);
    var err=$('ac-err');
    if(n>CAP){err.hidden=false;err.textContent='Online checkout is limited to 10 tasks. Remove some, or call 1-800-481-8638 for a custom quote.';}
    else if(err.getAttribute('data-k')!=='v')err.hidden=true;
    if(fa){
      var root=fa.scope==='line'?lines:(T[fa.id]&&T[fa.id].el);
      var tries=fa.scope==='line'?[fa.act,'inc','dec','rm']:[fa.act,'inc','rm','add'];
      var tgt=null;
      if(root)for(var i=0;i<tries.length&&!tgt;i++){var c=root.querySelector('[data-act="'+tries[i]+'"][data-id="'+fa.id+'"]');if(c&&!c.disabled)tgt=c;}
      if(!tgt&&fa.scope==='line')tgt=lines.querySelector('button')||$('ac-drop');
      if(tgt)try{tgt.focus({preventScroll:true});}catch(e){tgt.focus();}
    }
  }

  /* ---- clicks (delegated) ---- */
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-act]');if(!b||b.disabled)return;
    var id=b.getAttribute('data-id'),act=b.getAttribute('data-act');
    if(act==='add'||act==='inc')add(id);else if(act==='dec')dec(id);else if(act==='rm')rm(id);
  });
  $('ac-clear').addEventListener('click',function(){S.lines=[];S.sent=0;commit();say('Order cleared.');next.focus();});

  /* ---- drag and drop (pointer devices; Add buttons do the same thing) ---- */
  var drop=$('ac-drop');drop.setAttribute('tabindex','-1');
  var fine=true;try{fine=window.matchMedia('(pointer:fine)').matches;}catch(e){}
  if(!fine)empty.textContent='Tap Add on any card to start your order.';
  ORDER.forEach(function(id){
    var c=T[id].el;
    if(fine)c.setAttribute('draggable','true');
    c.addEventListener('dragstart',function(e){
      if(e.target.closest&&e.target.closest('button'))return;
      try{e.dataTransfer.setData('text/plain','ac:'+id);e.dataTransfer.effectAllowed='copy';}catch(x){}
      c.classList.add('is-drag');
    });
    c.addEventListener('dragend',function(){c.classList.remove('is-drag');drop.classList.remove('is-over');});
  });
  function isOurs(e){try{var ty=e.dataTransfer.types;return !ty||[].indexOf.call(ty,'text/plain')>-1;}catch(x){return true;}}
  panel.addEventListener('dragover',function(e){if(!isOurs(e))return;e.preventDefault();try{e.dataTransfer.dropEffect='copy';}catch(x){}drop.classList.add('is-over');});
  panel.addEventListener('dragleave',function(e){if(!panel.contains(e.relatedTarget))drop.classList.remove('is-over');});
  panel.addEventListener('drop',function(e){
    e.preventDefault();drop.classList.remove('is-over');
    var v='';try{v=e.dataTransfer.getData('text/plain')||'';}catch(x){}
    if(v.indexOf('ac:')===0)add(v.slice(3));
  });

  /* ---- mobile bar ---- */
  var bar=$('ac-bar');
  function setOpen(o){panel.classList.toggle('open',o);document.body.classList.toggle('ac-sheet-open',o);bar.setAttribute('aria-expanded',o?'true':'false');bar.lastElementChild.firstChild.nodeValue=o?'Close ':'Review order ';}
  bar.addEventListener('click',function(){setOpen(!panel.classList.contains('open'));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open')){setOpen(false);bar.focus();}});

  /* ---- step 2 ---- */
  var form=$('ac-form'),site=$('ac-site'),email=$('ac-email');
  var F=['website','name','email','phone','platform','notes'];
  next.addEventListener('click',function(){
    if(next.disabled)return;setOpen(false);
    var d=$('details');d.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(function(){try{site.focus({preventScroll:true});}catch(e){site.focus();}},350);
  });
  F.forEach(function(k){var el=form.elements[k];if(!el)return;if(S.d[k])el.value=S.d[k];
    el.addEventListener('input',function(){S.d[k]=el.value.slice(0,2000);save();});
    el.addEventListener('change',function(){S.d[k]=el.value.slice(0,2000);save();});
  });

  function orderText(det){
    var n=count(),lines=S.lines.map(function(l,i){var t=T[l.id];return (i+1)+'. '+t.name+' ('+t.unit+')'+(l.q>1?' x '+l.q:'')+' - '+money(l.q*PRICE);});
    return ['SEO a la carte order - '+plural(n)+', '+money(n*PRICE),
      'Website: '+(det.website||''),'Name: '+(det.name||''),'Email: '+(det.email||''),'Phone: '+(det.phone||''),'Platform: '+(det.platform||'Not sure'),
      '','Tasks:'].concat(lines).concat(['','Total: '+plural(n)+' - '+money(n*PRICE),'Checkout: '+SKU+' x '+n,'Notes: '+(det.notes||'')]).join('\n');
  }
  function addr(){try{if(window.etaAddr){var a=window.etaAddr();if(a)return a;}}catch(e){}try{return atob('aW5mbw==')+String.fromCharCode(64)+atob('ZXlldG9hZC5jb20=');}catch(e){return '';}}
  function host(u){return String(u||'').replace(/^https?:\/\//i,'').replace(/\/.*$/,'').slice(0,80);}
  function sendLead(det,txt){
    var n=count(),fd=new FormData();
    fd.append('_subject','SEO à la carte order — '+plural(n)+' '+money(n*PRICE)+' — '+host(det.website));
    fd.append('name',det.name||'');fd.append('email',det.email);fd.append('phone',det.phone||'');
    fd.append('website',det.website);fd.append('platform',det.platform||'Not sure');
    fd.append('tasks',S.lines.map(function(l){return T[l.id].name+' ('+T[l.id].unit+')'+(l.q>1?' x '+l.q:'');}).join('; '));
    fd.append('task_count',String(n));fd.append('total',money(n*PRICE));fd.append('checkout_sku',SKU+' x '+n);
    fd.append('order',txt);fd.append('notes',det.notes||'');
    fd.append('page_url',location.href);fd.append('_template','table');fd.append('_captcha','false');
    var ctl=null;try{ctl=new AbortController();}catch(e){}
    var timer=setTimeout(function(){if(ctl)ctl.abort();},9000);
    return fetch('https://formsubmit.co/ajax/'+addr(),{method:'POST',headers:{'Accept':'application/json'},body:fd,signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json().then(function(j){return r.ok&&j&&String(j.success)==='true';},function(){return false;});})
      .catch(function(){return false;})
      .then(function(ok){clearTimeout(timer);return ok;});
  }
  /* open the secure checkout engine for n tasks (SEO-TASK x n) */
  function checkout(n){
    if(!(n>=1&&n<=CAP))return;
    ga('sc_buy_click',{sku:SKU,qty:n,page:location.pathname,source:'builder'});
    var api=window.SCCheckout;
    pay.disabled=false;
    if(api&&typeof api.open==='function'){api.open({sku:SKU,qty:n,site:SITE});return;}
    msg('wait','Secure checkout is still loading. Give it a second and press "Continue to secure checkout" again, or call 1-800-481-8638.');
  }
  var status=$('ac-status');
  function msg(kind,text){status.innerHTML='';var m=document.createElement('div');m.className='eta-msg';m.setAttribute('data-kind',kind);m.textContent=text;
    m.style.cssText='margin-top:12px;padding:12px 14px;border-radius:8px;font-size:.95rem;line-height:1.45;'+(kind==='wait'?'background:#EFF8FF;color:#0B4A6F;border:1px solid #B2DDFF':'background:#ECFDF3;color:#054F31;border:1px solid #A6F4C5');status.appendChild(m);}
  function failBox(txt,n){
    status.innerHTML='';var box=document.createElement('div');box.className='ac-fail';
    box.innerHTML='<b>We could not send your task list automatically.</b> It is saved on this device. Copy it now and reply with it to your receipt email, or call 1-800-481-8638. <span id="ac-cd"></span>'+
      '<textarea readonly aria-label="Your order summary"></textarea><div class="ac-frow"><button type="button" class="alt" id="ac-copy">Copy order</button><button type="button" id="ac-gonow">Go to secure checkout now</button></div>';
    box.querySelector('textarea').value=txt;status.appendChild(box);
    var left=8,cd=$('ac-cd'),gone=false,iv;
    function go(){if(gone)return;gone=true;clearInterval(iv);cd.textContent='Opening secure checkout...';checkout(n);}
    function tick(){cd.textContent='Taking you to secure checkout in '+left+' seconds.';if(left--<=0)go();}
    tick();iv=setInterval(tick,1000);
    $('ac-gonow').addEventListener('click',go);
    $('ac-copy').addEventListener('click',function(){
      var ta=box.querySelector('textarea'),b=this;clearInterval(iv);cd.textContent='Timer paused. Press "Go to secure checkout now" when ready.';
      function done(){b.textContent='Copied';}
      try{navigator.clipboard.writeText(txt).then(done,function(){ta.select();try{document.execCommand('copy');done();}catch(e){}});}catch(e){ta.select();try{document.execCommand('copy');done();}catch(x){}}
    });
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var err=$('ac-err'),n=count();
    if(n<1||n>CAP){render();return;}
    var hp=form.querySelector('[name="_honey"]');if(hp&&hp.value)return;
    var det={};F.forEach(function(k){var el=form.elements[k];det[k]=el?String(el.value||'').trim():'';});
    var bad=null;
    if(!det.website)bad=[site,'Please add your website address.'];
    else if(!det.email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(det.email))bad=[email,'Please add an email address we can send the secure access link to.'];
    if(bad){err.hidden=false;err.setAttribute('data-k','v');err.textContent=bad[1];bad[0].setAttribute('aria-invalid','true');bad[0].focus();return;}
    site.removeAttribute('aria-invalid');email.removeAttribute('aria-invalid');err.hidden=true;err.removeAttribute('data-k');
    S.d=det;S.sent=Date.now();save();
    pay.disabled=true;msg('wait','Sending your task list, then opening secure checkout...');
    var txt=orderText(det);
    sendLead(det,txt).then(function(ok){
      if(ok){msg('ok','Task list received. Opening secure checkout on Authorize.net...');checkout(n);}
      else failBox(txt,n);
    });
  });

  /* ---- returning visitor note ---- */
  function backNote(){
    var b=$('ac-back');if(!S.sent||!count()){b.hidden=true;return;}
    var d=new Date(S.sent);
    b.innerHTML='You started checkout for this order on '+esc(d.toLocaleDateString('en-US',{month:'short',day:'numeric'}))+'. If you paid, you are all set: watch your email for the secure access link. <button type="button" id="ac-new">Start a new order</button>';
    b.hidden=false;
    $('ac-new').addEventListener('click',function(){S.lines=[];S.sent=0;commit();b.hidden=true;$('builder').scrollIntoView({block:'start'});});
  }

  /* ---- after payment: tell us which tasks (linked to the order number) ---- */
  function paidStep(){
    var b=$('ac-back');if(!b||!RET)return;
    var n=count(),order=RET.order;
    var list=n?S.lines.map(function(l){var t=T[l.id];return t.name+' ('+t.unit+')'+(l.q>1?' x '+l.q:'');}).join('\n'):'';
    b.innerHTML='<b>Payment received'+(order?' for order '+esc(order):'')+'. Thank you.</b> Last step: tell us which tasks. '+
      (n?'We saved the list you built; check it and press Send.':'List the tasks you want (and the pages), then press Send.')+
      '<div class="np-form"><label for="ac-pt">Tasks for this order</label><textarea id="ac-pt" maxlength="3000" placeholder="Example: meta tags for home, services and contact; image compression"></textarea>'+
      '<label for="ac-pe">Email you paid with</label><input id="ac-pe" type="email" autocomplete="email">'+
      '<label for="ac-pw">Website URL</label><input id="ac-pw" type="text" inputmode="url" autocomplete="url" placeholder="yourbusiness.com">'+
      '</div><p style="margin:14px 0 0"><button type="button" id="ac-psend" style="min-height:44px;padding:0 18px;border-radius:8px;background:#054F31;color:#fff;text-decoration:none">Send my task list</button></p><div id="ac-pst" role="status" aria-live="polite"></div>';
    b.hidden=false;
    $('ac-pt').value=list;$('ac-pe').value=S.d.email||'';$('ac-pw').value=S.d.website||'';
    var sent=false;
    $('ac-psend').addEventListener('click',function(){
      var btn=this,st=$('ac-pst'),tasks=$('ac-pt').value.trim(),em=$('ac-pe').value.trim(),web=$('ac-pw').value.trim();
      if(sent)return;
      if(!tasks){st.textContent='Please list at least one task.';$('ac-pt').focus();return;}
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){st.textContent='Please add the email you paid with.';$('ac-pe').focus();return;}
      btn.disabled=true;st.textContent='Sending...';
      var fd=new FormData();
      fd.append('_subject','SEO à la carte PAID — order '+(order||'(no number)')+' — '+host(web));
      fd.append('order_id',order);fd.append('email',em);fd.append('website',web);fd.append('tasks',tasks);
      fd.append('task_count',String(n||''));fd.append('checkout_sku',SKU+(n?' x '+n:''));
      fd.append('page_url',location.origin+location.pathname);fd.append('_template','table');fd.append('_captcha','false');
      fetch('https://formsubmit.co/ajax/'+addr(),{method:'POST',headers:{'Accept':'application/json'},body:fd})
        .then(function(r){return r.json().then(function(j){return r.ok&&j&&String(j.success)==='true';},function(){return false;});})
        .catch(function(){return false;})
        .then(function(ok){
          if(ok){sent=true;st.textContent='Got it. We start within 1 business day and email you a secure way to share access.';ga('seo_tasks_confirmed',{order_id:order,qty:n});S.lines=[];S.sent=0;save();}
          else{btn.disabled=false;st.textContent='Could not send. Reply to your receipt email with the list, or call 1-800-481-8638.';}
        });
    });
    setTimeout(function(){try{$('details').scrollIntoView({block:'start'});$('ac-pt').focus({preventScroll:true});}catch(e){}},400);
  }

  /* ---- init ---- */
  var simple=$('ac-simple');if(simple)simple.removeAttribute('open');
  load();render();if(RET)paidStep();else backNote();
  window.__acState=function(){return JSON.parse(JSON.stringify({lines:S.lines,count:count(),total:count()*PRICE}));};
})();
