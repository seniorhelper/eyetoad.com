/* SEO a la carte — order builder. Cards are the source of truth for task names.
   No card payment happens on this site: the visitor sends an order request (FormSubmit, CAPTCHA on)
   and we email a private Authorize.net invoice. Never add public checkout buttons or payment IDs here. */
(function(){
  'use strict';
  var PRICE=100, CAP=10, KEY='eta_alacarte_v1';
  function $(id){return document.getElementById(id);}
  var panel=$('ac-panel'); if(!panel) return;
  var form=$('ac-form'),site=$('ac-site'),email=$('ac-email'),nameEl=$('ac-name'),phone=$('ac-phone');

  /* ---- task catalogue from the cards ---- */
  var T={}, ORDER=[];
  [].forEach.call(document.querySelectorAll('.ac-card'),function(c){
    var id=c.getAttribute('data-id');
    T[id]={id:id,name:c.getAttribute('data-name'),unit:c.getAttribute('data-unit'),max:+c.getAttribute('data-max')||10,el:c};
    ORDER.push(id);
  });

  /* ---- state + storage ---- */
  var S={lines:[],simple:0,d:{},sent:0};
  function load(){
    try{var raw=localStorage.getItem(KEY);if(!raw)return;var o=JSON.parse(raw);
      if(o&&Array.isArray(o.lines))S.lines=o.lines.filter(function(l){return l&&T[l.id]&&l.q>0;}).map(function(l){return {id:l.id,q:Math.min(T[l.id].max,Math.floor(l.q))};});
      if(o&&o.d&&typeof o.d==='object')S.d=o.d;
      if(o&&o.sent)S.sent=+o.sent||0;
      if(o&&o.simple&&!S.lines.length)S.simple=Math.max(0,Math.min(CAP,Math.floor(+o.simple)||0));
    }catch(e){}
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify({lines:S.lines.map(function(l){return {id:l.id,q:l.q};}),simple:S.simple,d:S.d,sent:S.sent}));}catch(e){}}
  function count(){var n=0;S.lines.forEach(function(l){n+=l.q;});return S.lines.length?n:(S.simple||0);}
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
  function summaryLine(){var n=count();return plural(n)+', '+money(n*PRICE)+' total.'+(n>CAP?' Over the 10 task limit for online orders.':'');}
  function add(id){
    var t=T[id];if(!t)return;var l=line(id);
    if(l){ if(l.q>=t.max){say(t.name+(t.max===1?' is already in your order. It is a once-per-site task.':' is at its limit.'));return;} l.q++; }
    else S.lines.push({id:id,q:1});
    S.simple=0;
    S.sent=0; commit(); say('Added '+t.name+'. '+summaryLine());
  }
  function dec(id){var l=line(id);if(!l)return;l.q--;if(l.q<=0)S.lines.splice(S.lines.indexOf(l),1);commit();say((l.q>0?'Removed one '+T[id].name+'. ':'Removed '+T[id].name+'. ')+summaryLine());}
  function rm(id){if(id==='__any'){S.simple=0;commit();say('Removed. '+summaryLine());return;}var l=line(id);if(!l)return;S.lines.splice(S.lines.indexOf(l),1);commit();say('Removed '+T[id].name+'. '+summaryLine());}
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
    }).join('')+(!S.lines.length&&S.simple?'<li><span class="ac-ln">Any '+plural(S.simple)+'<small>you tell us which in the notes · '+money(S.simple*PRICE)+'</small></span><span class="ac-lr"><button type="button" class="ac-rm" data-act="rm" data-id="__any" data-scope="line" aria-label="Remove quick order from order">'+IC.x+'</button></span></li>':'');
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
    $('ac-recap').innerHTML=(!S.lines.length&&S.simple)?'<li>Any '+plural(S.simple)+' (tell us which in the notes) &mdash; '+money(S.simple*PRICE)+'</li>':n?S.lines.map(function(l){var t=T[l.id];return '<li>'+esc(t.name)+' ('+esc(t.unit)+')'+(l.q>1?' &times; '+l.q:'')+' &mdash; '+money(l.q*PRICE)+'</li>';}).join(''):'<li>No tasks yet. <a href="#builder">Pick tasks above.</a></li>';
    $('ac-rcount').textContent=plural(n);$('ac-rtotal').textContent=money(tot);
    var err=$('ac-err');
    if(n>CAP){err.hidden=false;err.textContent='Online orders are limited to 10 tasks. Remove some, or call 1-800-481-8638 for a custom quote.';}
    else if(err.getAttribute('data-k')!=='v')err.hidden=true;
    if(fa){
      if(fa.id==='__any')fa.scope='line';
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
  $('ac-clear').addEventListener('click',function(){S.lines=[];S.simple=0;S.sent=0;commit();say('Order cleared.');next.focus();});

  /* ---- quick order table: any N tasks, details in the notes ---- */
  [].forEach.call(document.querySelectorAll('[data-simple]'),function(b){
    b.addEventListener('click',function(){
      var n=Math.max(1,Math.min(CAP,parseInt(b.getAttribute('data-simple'),10)||0));
      S.lines=[];S.simple=n;S.sent=0;commit();say('Quick order: '+summaryLine()+' Tell us which tasks in the notes.');
      $('details').scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(function(){try{nameEl.focus({preventScroll:true});}catch(e){nameEl.focus();}},350);
    });
  });

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

  function taskList(){
    if(!S.lines.length&&S.simple)return 'Any '+plural(S.simple)+' (customer will say which in notes)';
    return S.lines.map(function(l){return T[l.id].name+' ('+T[l.id].unit+')'+(l.q>1?' x '+l.q:'');}).join('; ');
  }
  function orderText(det){
    var n=count(),ls=(!S.lines.length&&S.simple)?['1. Any '+plural(S.simple)+' - customer will say which in notes - '+money(S.simple*PRICE)]:S.lines.map(function(l,i){var t=T[l.id];return (i+1)+'. '+t.name+' ('+t.unit+')'+(l.q>1?' x '+l.q:'')+' - '+money(l.q*PRICE);});
    return ['SEO a la carte ORDER REQUEST - '+plural(n)+', '+money(n*PRICE)+' - send a secure invoice',
      'Website: '+(det.website||''),'Name: '+(det.name||''),'Email: '+(det.email||''),'Phone: '+(det.phone||''),'Platform: '+(det.platform||'Not sure'),
      '','Tasks:'].concat(ls).concat(['','Total: '+plural(n)+' - '+money(n*PRICE),'Notes: '+(det.notes||'')]).join('\n');
  }
  function addr(){try{if(window.etaAddr){var a=window.etaAddr();if(a)return a;}}catch(e){}try{return atob('aW5mbw==')+String.fromCharCode(64)+atob('ZXlldG9hZC5jb20=');}catch(e){return '';}}
  function setH(k,v){var el=form.elements[k];if(el)el.value=v;}
  var status=$('ac-status');
  function msg(kind,text){status.innerHTML='';var m=document.createElement('div');m.className='eta-msg';m.setAttribute('data-kind',kind);m.textContent=text;
    m.style.cssText='margin-top:12px;padding:12px 14px;border-radius:8px;font-size:.95rem;line-height:1.45;'+(kind==='wait'?'background:#EFF8FF;color:#0B4A6F;border:1px solid #B2DDFF':kind==='err'?'background:#FEF3F2;color:#7A271A;border:1px solid #FECDCA':'background:#ECFDF3;color:#054F31;border:1px solid #A6F4C5');status.appendChild(m);}

  /* bot guard: a person takes more than 3 seconds between first touching the form and sending it */
  var t0=0,MINFILL=3000;
  function touch(){if(!t0)t0=Date.now();}
  form.addEventListener('focusin',touch);form.addEventListener('input',touch);form.addEventListener('pointerdown',touch);

  form.addEventListener('submit',function(e){
    e.preventDefault();
    var err=$('ac-err'),n=count();
    if(n<1||n>CAP){render();return;}
    var hp=form.querySelector('[name="_honey"]');if(hp&&hp.value)return;
    if(!t0||Date.now()-t0<MINFILL){msg('err','Please take a moment to check your details, then press Request this order again.');t0=t0||Date.now();return;}
    var det={};F.forEach(function(k){var el=form.elements[k];det[k]=el?String(el.value||'').trim():'';});
    var bad=null;
    if(!det.name)bad=[nameEl,'Please add your name.'];
    else if(!det.email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(det.email))bad=[email,'Please add an email address we can send your secure invoice to.'];
    else if(det.phone.replace(/\D/g,'').length<10)bad=[phone,'Please add a phone number with area code.'];
    else if(!det.website)bad=[site,'Please add your business website.'];
    [nameEl,email,phone,site].forEach(function(el){el.removeAttribute('aria-invalid');});
    if(bad){err.hidden=false;err.setAttribute('data-k','v');err.textContent=bad[1];bad[0].setAttribute('aria-invalid','true');bad[0].focus();return;}
    err.hidden=true;err.removeAttribute('data-k');
    S.d=det;S.sent=Date.now();save();
    setH('order_type',(!S.lines.length&&S.simple)?'Quick order (any tasks)':'Order builder');
    setH('tasks',taskList());setH('quantity',plural(n));setH('total',money(n*PRICE));
    setH('order',orderText(det));setH('page_url',location.href);
    pay.disabled=true;msg('wait','Sending your order request. You may be asked to confirm you are not a robot...');
    /* plain POST (not AJAX) so FormSubmit shows its CAPTCHA, then returns to our thank-you page */
    form.method='post';form.action='https://formsubmit.co/'+addr();
    HTMLFormElement.prototype.submit.call(form);
  });
  window.addEventListener('pageshow',function(ev){if(ev.persisted){var c=count();pay.disabled=c<1||c>CAP;status.innerHTML='';}});

  /* ---- returning visitor note ---- */
  function backNote(){
    var b=$('ac-back');if(!S.sent||!count()){b.hidden=true;return;}
    var d=new Date(S.sent);
    b.innerHTML='You sent an order request for this order on '+esc(d.toLocaleDateString('en-US',{month:'short',day:'numeric'}))+'. Watch your email for your secure invoice (within 1 business day). <button type="button" id="ac-new">Start a new order</button>';
    b.hidden=false;
    $('ac-new').addEventListener('click',function(){S.lines=[];S.simple=0;S.sent=0;commit();b.hidden=true;$('builder').scrollIntoView({block:'start'});});
  }

  /* ---- init ---- */
  var simple=$('ac-simple');if(simple)simple.removeAttribute('open');
  load();render();backNote();
  window.__acState=function(){return JSON.parse(JSON.stringify({lines:S.lines,count:count(),total:count()*PRICE}));};
})();
