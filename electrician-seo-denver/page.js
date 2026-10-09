
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
  var list=document.getElementById('cktList');
  if(!list) return;
  var boxes=list.querySelectorAll('input[type=checkbox]');
  var vis=document.getElementById('cktVis'), bulb=document.getElementById('bulb');
  var scoreEl=document.getElementById('cktScore'), bandEl=document.getElementById('cktBand'), noteEl=document.getElementById('cktNote');
  var bands=['Open circuit','Open circuit','Open circuit','Still open','Almost closed','Carrying current','Closed'];
  var notes=[
    'Check what is true today.',
    'One of six. A circuit with five breaks in it carries nothing, which is roughly what most electrician websites are doing right now.',
    'Two of six. The profile and review items usually move fastest, so if those are still open, start there.',
    'Halfway, and still dark. This is the frustrating part of the trade: partial credit does not exist, because the customer only sees the result.',
    'Four of six. Better than most companies in your area. The last two are the ones everybody skips.',
    'Five of six. One switch from a company that is genuinely hard to beat locally.',
    'Closed. If the phone still is not ringing at this point, the problem is reach rather than readiness, and that is a different and much easier conversation.'
  ];
  function upd(){
    var c=0;
    boxes.forEach(function(b,i){
      var seg=document.getElementById('s'+(i+1));
      if(seg) seg.style.opacity=b.checked?'1':'0';
      b.closest('.ckt-item').classList.toggle('on',b.checked);
      if(b.checked) c++;
    });
    scoreEl.textContent=c+' / 6';
    bandEl.textContent=bands[c];
    noteEl.textContent=notes[c];
    var lit=c>=5;
    vis.classList.toggle('lit',lit);
    bulb.setAttribute('class',lit?'bulb-on':'bulb-off');
  }
  boxes.forEach(function(b){b.addEventListener('change',upd);});
  upd();
})();

(function(){
  var v=document.getElementById('jVal'), n=document.getElementById('jNum'), m=document.getElementById('jMargin');
  if(!v||!n||!m) return;
  var vv=document.getElementById('jValV'), nv=document.getElementById('jNumV'), mv=document.getElementById('jMarginV');
  var out=document.getElementById('jOut'), lab=document.getElementById('jLab');
  function money(x){return '$'+Math.round(x).toLocaleString('en-US');}
  function calc(){
    var job=+v.value, num=+n.value, mar=+m.value/100;
    vv.textContent=money(job); nv.textContent=num; mv.textContent=(+m.value)+'%';
    var yearRev=job*num*12, yearGross=yearRev*mar;
    out.innerHTML='<span>'+money(yearGross)+'</span>';
    lab.innerHTML='in additional gross profit a year &mdash; from '+money(yearRev)+' of added revenue at a '+(+m.value)+'% margin.<br>'+
      'That is '+num+' more '+money(job)+' job'+(num===1?'':'s')+' a month. Not a doubling of the business. '+
      '<b>Weigh that against what a month of marketing costs</b>, and the decision usually makes itself.';
  }
  [v,n,m].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('elForm');
  if(!form) return;
  var btn=document.getElementById('elBtn'), msg=document.getElementById('elMsg'), load=document.getElementById('elLoad');
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

    var name=val('el-name'), company=val('el-company'), phone=val('el-phone'), email=val('el-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your company name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Phone:phone,Email:email,Website:val('el-site'),Notes:val('el-msg'),
      _subject:'Electrical contractor audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will review your market and get back to you, usually the same business day.');
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

