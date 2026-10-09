
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

  window.bindEmails=function(){
    document.querySelectorAll('a.eml').forEach(function(a){
      if(a.dataset.bound)return; a.dataset.bound='1';
      a.href='mailto:'+a.getAttribute('data-u')+String.fromCharCode(64)+a.getAttribute('data-d');
    });
  };
  window.bindEmails();

})();

(function(){
  var p=document.getElementById('packWrap');
  if(!p) return;
  if(!('IntersectionObserver' in window)){p.classList.add('in');return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){p.classList.add('in');io.disconnect();} });
  },{threshold:.35});
  io.observe(p);
})();

(function(){
  var bays=document.getElementById('cBays'), idle=document.getElementById('cIdle'), rate=document.getElementById('cRate');
  if(!bays||!idle||!rate) return;
  var bv=document.getElementById('cBaysV'), iv=document.getElementById('cIdleV'), rv=document.getElementById('cRateV');
  var out=document.getElementById('cYear'), math=document.getElementById('cMath');
  var ARO=585.91;
  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function calc(){
    var b=+bays.value, h=+idle.value, r=+rate.value;
    var weekly=b*h*r, monthly=weekly*4.33, yearly=weekly*52;
    bv.textContent=b; iv.textContent=h; rv.textContent='$'+r;
    out.innerHTML='<span>'+money(yearly)+'</span>';
    var ros=monthly/ARO;
    math.innerHTML='<b>'+b+' bays</b> &times; <b>'+h+' idle hours</b> &times; <b>$'+r+'/hour</b> = '+money(weekly)+
      ' a week, or '+money(monthly)+' a month.<br>At an average repair order of $585.91, that is about <b>'+
      (ros<1?ros.toFixed(1):Math.round(ros))+' repair orders a month</b> you have the capacity to take and are not taking.';
  }
  [bays,idle,rate].forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();

(function(){
  var box=document.getElementById('score');
  if(!box) return;
  var boxes=box.querySelectorAll('input[type=checkbox]');
  var n=document.getElementById('scoreN'), msg=document.getElementById('scoreMsg');
  var lines=[
    'Check the boxes that apply.',
    'There is a lot on the table here. The good news is that nothing on this list is expensive to fix.',
    'Early days. Start with the Google Business Profile items — they move fastest.',
    'You have a foundation. The gap is consistency, not capability.',
    'Solid. The remaining items are the ones your competitors are also skipping.',
    'Better than most shops we audit. Closing the last few is where the separation happens.',
    'Strong. At this point the work is maintenance and review cadence rather than repair.',
    'Very strong. You are likely already in the pack for some terms — the question is which ones you are missing.',
    'Excellent. Growth from here comes from expanding the terms you show up for, not fixing basics.',
    'Near complete. If the phone still is not ringing, the issue is targeting, not hygiene.',
    'Full marks. Either you have done this work already or you are being generous with yourself.'
  ];
  function upd(){
    var c=0;
    boxes.forEach(function(b){if(b.checked)c++;});
    n.textContent=c+' / 10';
    msg.textContent=lines[c];
  }
  boxes.forEach(function(b){b.addEventListener('change',upd);});
  upd();
})();

(function(){
  var form=document.getElementById('arForm');
  if(!form) return;
  var btn=document.getElementById('arBtn'), msg=document.getElementById('arMsg');
  var load=document.getElementById('arLoad');
  var t0=Date.now();
  load.value=String(t0);
  var sent=false;

  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function action(){return 'https://formsubmit.co/ajax/'+form.getAttribute('data-fs');}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badPhone(v){return v.replace(/\D/g,'').length<10;}
  function badEmail(v){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sent) return;

    if(form.querySelector('input[name="_honey"]').value!==''){return;}
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}

    var name=val('ar-name'), shop=val('ar-shop'), phone=val('ar-phone'), email=val('ar-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(shop)){show('err','Please enter your shop name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var data={Name:name,Shop:shop,Phone:phone,Email:email,Website:val('ar-site'),Notes:val('ar-msg'),
      _subject:'Auto shop audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true;btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch(action(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(res){
        sent=true;
        if(res.ok){
          show('ok','Got it. We will review your shop and get back to you, usually the same business day.');
          btn.textContent='Request sent';
        }else{
          show('warn','We could not confirm that your request went through. Please call <a href="tel:18004818638">1-800-481-8638</a> so nothing is lost.');
          btn.disabled=false;btn.textContent='Try again';
          sent=false;
        }
      })
      .catch(function(){
        show('err','That did not send. Please call <a href="tel:18004818638">1-800-481-8638</a> and we will pick it up from there.');
        btn.disabled=false;btn.textContent='Try again';
      });
  });
})();

