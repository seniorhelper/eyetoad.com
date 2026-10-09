
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
  var list=document.getElementById('alList');
  if(!list) return;
  var boxes=list.querySelectorAll('input[type=checkbox]');
  var scoreEl=document.getElementById('alScore'), bandEl=document.getElementById('alBand'), noteEl=document.getElementById('alNote');
  var notes=[
    'Check what is true today.',
    'One of six. This is where most practices start, and none of the remaining five are expensive to fix.',
    'Two of six. The profile side usually moves first, so if those are still unchecked, start there.',
    'Halfway. At this point the gap is consistency rather than capability.',
    'Four of six. Better than most practices in your radius. The last two are the ones everyone skips.',
    'Five of six. One signal short of a practice that is genuinely hard to beat locally.',
    'All six. If the schedule still has holes, the issue is reach rather than readiness — a different job entirely.'
  ];
  var bands=['Out of alignment','Out of alignment','Misaligned','Getting there','Nearly aligned','Nearly aligned','Aligned'];
  function upd(){
    var c=0;
    boxes.forEach(function(b){
      var v=document.getElementById(b.getAttribute('data-v'));
      if(v) v.classList.toggle('on',b.checked);
      b.closest('.al-item').classList.toggle('on',b.checked);
      if(b.checked) c++;
    });
    scoreEl.textContent=c+' / 6';
    bandEl.textContent=bands[c];
    noteEl.textContent=notes[c];
  }
  boxes.forEach(function(b){b.addEventListener('change',upd);});
  upd();
})();

(function(){
  var form=document.getElementById('chForm');
  if(!form) return;
  var btn=document.getElementById('chBtn'), msg=document.getElementById('chMsg'), load=document.getElementById('chLoad');
  var t0=Date.now();
  load.value=String(t0);
  var sent=false;

  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badPhone(v){return v.replace(/\D/g,'').length<10;}
  function badEmail(v){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}

    var name=val('ch-name'), practice=val('ch-practice'), phone=val('ch-phone'), email=val('ch-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(practice)){show('err','Please enter your practice name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var data={Name:name,Practice:practice,Phone:phone,Email:email,Website:val('ch-site'),Notes:val('ch-msg'),
      _subject:'Chiropractic practice audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+form.getAttribute('data-fs'),{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will review your practice and get back to you, usually the same business day.');
        btn.textContent='Request sent';
      }else{
        show('warn','We could not confirm that your request went through. Please call <a href="tel:18004818638">1-800-481-8638</a> so nothing is lost.');
        btn.disabled=false; btn.textContent='Try again';
      }
    }).catch(function(){
      show('err','That did not send. Please call <a href="tel:18004818638">1-800-481-8638</a> and we will pick it up from there.');
      btn.disabled=false; btn.textContent='Try again';
    });
  });
})();

