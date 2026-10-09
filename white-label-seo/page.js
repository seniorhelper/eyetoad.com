
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
  var n=document.getElementById('wl-n'); if(!n) return;
  var ids=['wl-retail','wl-whole','wl-hrs','wl-rate','wl-sal'];var E={};ids.forEach(function(i){E[i]=document.getElementById(i);});
  var k1=document.getElementById('wl-k1'),k2=document.getElementById('wl-k2'),k3=document.getElementById('wl-k3'),read=document.getElementById('wl-read'),wait=document.getElementById('wl-wait');
  var b1=document.getElementById('wl-b1'),b2=document.getElementById('wl-b2'),e1=document.getElementById('wl-e1'),e2=document.getElementById('wl-e2');
  function v(id){return Math.max(0,parseFloat(E[id].value)||0);}
  function fmt(x){return (x<0?'-$':'$')+Math.round(Math.abs(x)).toLocaleString('en-US');}
  function calc(){
    var N=Math.max(1,Math.min(500,parseInt(n.value,10)||1)),R=v('wl-retail'),W=v('wl-whole'),H=v('wl-hrs'),T=v('wl-rate'),S=v('wl-sal');
    var gross=(R-W)*N, pct=R>0?Math.round((R-W)/R*100):0, net=(gross-H*T*N)*12;
    var inhouse=(R*N)*12-S-(H*T*N*12);
    k1.textContent=fmt(gross);k2.textContent=pct+'%';k3.textContent=fmt(net);
    var mx=Math.max(Math.abs(net),Math.abs(inhouse),1);
    b1.style.width=Math.max(2,Math.round(Math.max(0,net)/mx*100))+'%';b1.style.background=net>=0?'#6D28D9':'#D92D20';e1.textContent=fmt(net)+'/yr';
    b2.style.width=Math.max(2,Math.round(Math.max(0,inhouse)/mx*100))+'%';b2.style.background=inhouse>=0?'#F79009':'#D92D20';e2.textContent=fmt(inhouse)+'/yr';
    var msg;
    if(R<=W) msg='Your retail price is at or below your wholesale cost. Either the retail number is low for your market (industry average retainers run above $3,000) or the wholesale number is a guess. Change one and watch the margin appear.';
    else if(inhouse>net) msg='At '+N+' clients, an in-house hire would out-earn white label by '+fmt(inhouse-net)+' a year, if you can keep that person busy and good. Most partners cross this line somewhere past a dozen clients, and plenty keep white label anyway for the capacity and the AI search work.';
    else msg='White label wins by '+fmt(net-inhouse)+' a year at '+N+' clients, and you carry no salary while the client list grows. The break-even point against a hire moves as you add clients; drag the client count up to find yours.';
    read.textContent=msg;
    if(net>0){wait.hidden=false;wait.innerHTML='<b>What waiting costs:</b> every month you send SEO out the door instead of selling it is <b>'+fmt(gross)+'</b> in gross margin you did not keep, at your own numbers, plus the client relationship you handed to a competitor.';}else wait.hidden=true;
    window.__etaToolSummary='Clients '+N+', retail '+fmt(R)+', wholesale '+fmt(W)+', net/yr '+fmt(net)+', in-house/yr '+fmt(inhouse);
  }
  [n].concat(ids.map(function(i){return E[i];})).forEach(function(e){e.addEventListener('input',calc);}); calc();
})();

(function(){
  var form=document.getElementById('wlf');
  if(!form) return;
  var btn=document.getElementById('wlfBtn'), msg=document.getElementById('wlfMsg'), load=document.getElementById('wlfLoad');
  var t0=Date.now(); load.value=String(t0);
  var sent=false, touched=false;
  form.addEventListener('keydown',function(){touched=true;},{once:true});
  form.addEventListener('pointerdown',function(){touched=true;},{once:true});
  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(x){return x.length<2||/[<>{}|\\]|https?:\/\//i.test(x);}
  function badPhone(x){return x.replace(/\D/g,'').length<10;}
  function badEmail(x){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x);}
  form.addEventListener('submit',function(e){
    e.preventDefault(); if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(!touched) return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}
    var name=val('wlf-name'), co=val('wlf-co'), ph=val('wlf-phone'), email=val('wlf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(co)){show('err','Please enter your company name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}
    var to; try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }
    var data={Name:name,Company:co,Phone:ph,Email:email,Website:val('wlf-site').slice(0,200),Notes:val('wlf-msg').slice(0,1500),ToolResult:(window.__etaToolSummary||'').slice(0,400),
      _subject:'White label SEO partner inquiry — eyetoad.com',_template:'table',_captcha:'false'};
    btn.disabled=true; btn.textContent='Sending...'; show('warn','Sending your request...');
    fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
    .then(function(x){
      if(x.ok&&x.j&&(x.j.success==='true'||x.j.success===true)){sent=true;btn.textContent='Sent';show('ok','<b>Got it.</b> We will review it and call you back within one business day. Need it sooner? Call <a href="tel:18004818638">1-800-481-8638</a>.');}
      else{btn.disabled=false;btn.textContent='Send my request';show('warn','We could not confirm delivery. Please call <a href="tel:18004818638">1-800-481-8638</a> or text <a href="sms:+17202496588">720-249-6588</a> and we will take it from there.');}
    })
    .catch(function(){btn.disabled=false;btn.textContent='Send my request';show('err','Your request did not go through. Call <a href="tel:18004818638">1-800-481-8638</a> and we will take it by phone.');});
  });
})();


