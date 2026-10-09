
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');
  function measureHeader(){var r=hdr.getBoundingClientRect();mobNav.style.top=Math.max(0,r.bottom)+'px';}
  var _sc=null;window.addEventListener('scroll',function(){var s=window.scrollY>30;if(s===_sc)return;_sc=s;hdr.classList.toggle('scrolled',s);requestAnimationFrame(measureHeader);},{passive:true});
  window.addEventListener('resize',measureHeader);
  measureHeader();
  burger.addEventListener('click',function(){
    measureHeader();
    var o=mobNav.classList.toggle('open');
    burger.classList.toggle('open',o);
    burger.setAttribute('aria-expanded',o);
    document.body.style.overflow=o?'hidden':'';
  });
  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });
})();

(function(){
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
  var ids=['cSpend','cLeads','cClose','cTicket','cMargin','cRepeat'];
  var f={};
  for(var i=0;i<ids.length;i++){
    f[ids[i]]=document.getElementById(ids[i]);
    if(!f[ids[i]])return;
  }
  function money(n){
    if(!isFinite(n))return '$0';
    return '$'+Math.round(n).toLocaleString('en-US');
  }
  function num(el,min){
    var v=parseFloat(el.value);
    if(!isFinite(v)||v<min)v=min;
    return v;
  }
  function render(){
    var spend =num(f.cSpend,0);
    var leads =num(f.cLeads,1);
    var close =Math.min(num(f.cClose,1),100)/100;
    var ticket=num(f.cTicket,1);
    var margin=Math.min(num(f.cMargin,1),100)/100;
    var repeat=num(f.cRepeat,1);

    var cpl       = spend/leads;
    var customers = leads*close;
    var cac       = customers>0 ? spend/customers : 0;
    var revenue   = customers*ticket;
    var grossProf = revenue*margin;
    var roas      = spend>0 ? revenue/spend : 0;
    var breakEven = ticket*margin*close;
    var ltv       = ticket*repeat*margin;
    var ratio     = cac>0 ? ltv/cac : 0;
    var profit    = grossProf-spend;

    document.getElementById('oCPL').textContent   = money(cpl);
    document.getElementById('oCust').textContent  = (Math.round(customers*10)/10).toLocaleString('en-US');
    document.getElementById('oCAC').textContent   = money(cac);
    document.getElementById('oRev').textContent   = money(revenue);
    document.getElementById('oGP').textContent    = money(grossProf);
    document.getElementById('oROAS').textContent  = (Math.round(roas*100)/100)+'\u00D7';
    document.getElementById('oBE').textContent    = money(breakEven);
    document.getElementById('oLTV').textContent   = money(ltv);
    document.getElementById('oRatio').textContent = (Math.round(ratio*10)/10)+':1';
    document.getElementById('oProfit').textContent= money(profit);

    var v=document.getElementById('oVerdict');
    v.classList.remove('good','ok','bad');
    if(profit<=0){
      v.classList.add('bad');
      v.textContent='This is losing money. Your gross profit is below your marketing spend. Look at close rate first \u2014 it is usually the cheapest link to fix.';
    }else if(cpl>breakEven){
      v.classList.add('bad');
      v.textContent='Your cost per lead of '+money(cpl)+' is above your break-even of '+money(breakEven)+'. First jobs are unprofitable, so you are relying on repeat work to rescue it.';
    }else if(ratio<1){
      v.classList.add('bad');
      v.textContent='Lifetime value is below acquisition cost. Every customer costs more than they are worth. Raise average ticket, margin, or repeat rate before spending more.';
    }else if(ratio<3){
      v.classList.add('ok');
      v.textContent='Profitable, but tight at '+(Math.round(ratio*10)/10)+':1. Three to one is the usual health mark. There is room to improve close rate or lifetime value before scaling spend.';
    }else if(ratio>10){
      v.classList.add('ok');
      v.textContent='A '+(Math.round(ratio*10)/10)+':1 ratio is unusually high. That often means you are under-spending on marketing and leaving growth on the table.';
    }else{
      v.classList.add('good');
      v.textContent='Healthy. At '+(Math.round(ratio*10)/10)+':1 with '+money(profit)+' profit after spend, this supports more investment rather than less.';
    }
  }
  ids.forEach(function(id){
    f[id].addEventListener('input',render);
    f[id].addEventListener('change',render);
  });
  render();
})();

(function(){
  var form=document.getElementById('art-form');
  if(!form)return;
  document.getElementById('_loadtime_art').value=Date.now();
  var btn=document.getElementById('btn-art');
  var err=document.getElementById('err-art');
  var last=0;
  function show(m){err.textContent=m;err.style.display='block';}

  form.addEventListener('submit',function(e){
    err.style.display='none';
    if(document.getElementById('_honey_art').value!==''){e.preventDefault();return;}
    if(document.getElementById('_decoy_art').value!==''){e.preventDefault();return;}

    var elapsed=Date.now()-parseInt(document.getElementById('_loadtime_art').value||'0',10);
    if(elapsed<4000){e.preventDefault();show('Please take a moment to fill out the form.');return;}

    var now=Date.now();
    if(last&&(now-last)<60000){e.preventDefault();show('Please wait a moment before submitting again.');return;}

    var name=document.getElementById('ar-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();show('Please enter a valid name.');return;}

    var site=document.getElementById('ar-website').value.trim();
    if(site.length<4){e.preventDefault();show('Please enter your website address.');return;}

    var phone=document.getElementById('ar-phone').value.replace(/\D/g,'');
    if(phone.length<10){e.preventDefault();show('Please enter a valid phone number (10+ digits).');return;}

    var email=document.getElementById('ar-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){e.preventDefault();show('Please enter a valid email address.');return;}

    form.action=['https:','','formsubmit.co',form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'')].join('/');
    last=now;
    btn.disabled=true;
    btn.textContent='Sending...';
  });
})();

