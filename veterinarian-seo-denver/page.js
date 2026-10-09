
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
  document.querySelectorAll('a.emx').forEach(function(a){
    if(a.dataset.done) return;
    a.dataset.done='1';
    try{
      var u=atob(a.getAttribute('data-x')), d=atob(a.getAttribute('data-y'));
      var t=a.querySelector('.emx-t');
      if(t) t.textContent=u+String.fromCharCode(64)+d;
      a.setAttribute('href','mai'+'lto:'+u+String.fromCharCode(64)+d);
      a.removeAttribute('data-x'); a.removeAttribute('data-y');
    }catch(e){
      a.setAttribute('href','tel:18004818638');
    }
  });
})();

(function(){
  var slots=document.getElementById('clSlots'), no=document.getElementById('clNo'),
      value=document.getElementById('clValue'), phone=document.getElementById('clPhone'),
      avoid=document.getElementById('clAvoid'), wage=document.getElementById('clWage'),
      week=document.getElementById('week');
  if(!slots||!no||!value||!phone||!avoid||!wage||!week) return;
  var sv=document.getElementById('clSlotsV'), nv=document.getElementById('clNoV'),
      vv=document.getElementById('clValueV'), pv=document.getElementById('clPhoneV'),
      av=document.getElementById('clAvoidV'), wv=document.getElementById('clWageV');
  var big=document.getElementById('clBig'), lab=document.getElementById('clLab'), note=document.getElementById('clNote');
  var cMissed=document.getElementById('clMissed'), cMissedV=document.getElementById('clMissedV'),
      cHours=document.getElementById('clHours'), cHoursV=document.getElementById('clHoursV');

  var DAYS=['Mon','Tue','Wed','Thu','Fri'];
  var PER_DAY=14;           /* grid is illustrative: 5 days x 14 blocks */
  var blocks=[];

  DAYS.forEach(function(d){
    var col=document.createElement('div');
    col.className='day';
    var h=document.createElement('span');
    h.className='dn'; h.textContent=d;
    col.appendChild(h);
    for(var i=0;i<PER_DAY;i++){
      var s=document.createElement('span');
      s.className='slot';
      col.appendChild(s);
      blocks.push(s);
    }
    week.appendChild(col);
  });

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  function calc(){
    var s=+slots.value, r=+no.value/100, v=+value.value,
        ph=+phone.value, av2=+avoid.value/100, w=+wage.value;
    sv.textContent=s.toLocaleString('en-US');
    nv.textContent=(+no.value)+'%';
    vv.textContent=money(v);
    pv.textContent=ph;
    av.textContent=(+avoid.value)+'%';
    wv.textContent=money(w);

    var missedWk=s*r, missedYr=missedWk*50;
    var slotLoss=missedYr*v;
    var avoidHrsWk=ph*av2, avoidHrsYr=avoidHrsWk*50;
    var phoneLoss=avoidHrsYr*w;
    var total=slotLoss+phoneLoss;

    var emptyCount=Math.round(Math.min(blocks.length,blocks.length*r));
    blocks.forEach(function(b,i){
      b.className='slot'+(i<emptyCount?' empty':'');
    });

    big.innerHTML='<span>'+money(total)+'</span>';
    lab.textContent='a year, before a single new client';

    cMissed.textContent=Math.round(missedYr).toLocaleString('en-US');
    cMissedV.textContent=money(slotLoss);
    cHours.textContent=Math.round(avoidHrsYr).toLocaleString('en-US');
    cHoursV.textContent=money(phoneLoss);

    if(missedWk<1&&avoidHrsWk<1){
      note.innerHTML='At those numbers there is very little leaking, which is genuinely unusual and worth being pleased about. If that is accurate, your constraint is capacity or staffing rather than marketing &mdash; and the honest advice is to leave the marketing alone until that changes.';
    }else{
      note.innerHTML='<b>'+Math.round(missedYr).toLocaleString()+' appointment slots</b> a year that nobody sat in, worth <b>'+money(slotLoss)+'</b>. Plus <b>'+Math.round(avoidHrsYr).toLocaleString()+' front-desk hours</b> spent answering questions a page could have answered, costing <b>'+money(phoneLoss)+'</b>.'+
        '<br><br>Neither number requires one additional client to fix. That is the entire argument on this page, and it is why we would rather look here first than sell you traffic you have nowhere to put.';
    }
  }
  [slots,no,value,phone,avoid,wage].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('vtForm');
  if(!form) return;
  var btn=document.getElementById('vtBtn'), msg=document.getElementById('vtMsg'), load=document.getElementById('vtLoad');
  var t0=Date.now();
  load.value=String(t0);
  var sent=false, touched=false;

  form.addEventListener('keydown',function(){touched=true;},{once:true});
  form.addEventListener('pointerdown',function(){touched=true;},{once:true});

  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(x){return x.length<2||/[<>{}|\\]|https?:\/\//i.test(x);}
  function badPhone(x){return x.replace(/\D/g,'').length<10;}
  function badEmail(x){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x);}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(!touched) return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}

    var name=val('vt-name'), clinic=val('vt-clinic'), ph=val('vt-phone'), email=val('vt-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(clinic)){show('err','Please enter your practice name.');return;}
    if(badPhone(ph)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Practice:clinic,PracticeType:val('vt-type'),Phone:ph,Email:email,Website:val('vt-site'),Notes:val('vt-msg'),
      _subject:'Veterinary practice audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will look at your practice and reply, usually the same business day.');
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

