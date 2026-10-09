
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
  var go=document.getElementById('sp-go'); if(!go) return;
  var st=document.getElementById('sp-status'),mob=document.getElementById('sp-mob'),desk=document.getElementById('sp-desk'),ext=document.getElementById('sp-ext');
  var strategy='mobile',busy=false;
  var R={perf:'sp-perf',a11y:'sp-a11y',bp:'sp-bp',seo:'sp-seo'};
  function set(id,v){var c=document.getElementById(id+'-c'),n=document.getElementById(id+'-n');if(v==null){c.style.strokeDashoffset=314;n.textContent='–';return;}
    var s=Math.round(v*100);c.style.strokeDashoffset=314-314*s/100;c.style.stroke=s>=90?'#12B76A':s>=50?'#F79009':'#D92D20';n.textContent=s;}
  function reset(){Object.keys(R).forEach(function(k){set(R[k],null);});}
  function pick(s){strategy=s;mob.setAttribute('aria-pressed',s==='mobile');desk.setAttribute('aria-pressed',s==='desktop');reset();st.textContent='Ready. Run the test for '+s+'.';ext.href='https://pagespeed.web.dev/analysis?url=https%3A%2F%2Feyetoad.com%2F&form_factor='+s;}
  mob.addEventListener('click',function(){pick('mobile');});desk.addEventListener('click',function(){pick('desktop');});
  go.addEventListener('click',function(){
    if(busy) return; busy=true; reset(); go.disabled=true; go.textContent='Running on Google...';
    st.textContent='Asking Google to load eyetoad.com on a throttled '+(strategy==='mobile'?'phone':'desktop')+' and measure it. This usually takes 20 to 60 seconds.';
    var u='https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+encodeURIComponent('https://eyetoad.com/')+'&strategy='+strategy+'&category=performance&category=accessibility&category=best-practices&category=seo';
    var t0=Date.now();
    fetch(u).then(function(r){if(!r.ok)throw new Error('http '+r.status);return r.json();}).then(function(j){
      var c=(j.lighthouseResult&&j.lighthouseResult.categories)||{};
      set(R.perf,c.performance&&c.performance.score);set(R.a11y,c.accessibility&&c.accessibility.score);set(R.bp,c['best-practices']&&c['best-practices'].score);set(R.seo,c.seo&&c.seo.score);
      var secs=Math.round((Date.now()-t0)/1000);
      st.textContent='Measured by Google just now ('+secs+'s). Lighthouse '+((j.lighthouseResult&&j.lighthouseResult.lighthouseVersion)||'')+', '+strategy+'. Run it again and the numbers will move a point or two; that is the test, not the site.';
      window.__etaToolSummary='Lighthouse '+strategy+' run from /site-speed/';
    }).catch(function(e){
      st.innerHTML='Google\u2019s free test quota is busy right now, which happens. <a href="'+ext.href+'" target="_blank" rel="noopener">Open the full report on pagespeed.web.dev</a> and it will run the identical test there.';
    }).then(function(){busy=false;go.disabled=false;go.textContent='Run it again';});
  });
})();

(function(){
  var form=document.getElementById('spf');
  if(!form) return;
  var btn=document.getElementById('spfBtn'), msg=document.getElementById('spfMsg'), load=document.getElementById('spfLoad');
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
    var name=val('spf-name'), co=val('spf-co'), ph=val('spf-phone'), email=val('spf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(co)){show('err','Please enter your company name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}
    var to; try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }
    var data={Name:name,Company:co,Phone:ph,Email:email,Website:val('spf-site').slice(0,200),Notes:val('spf-msg').slice(0,1500),ToolResult:(window.__etaToolSummary||'').slice(0,400),
      _subject:'Speed and SEO review request — eyetoad.com',_template:'table',_captcha:'false'};
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


