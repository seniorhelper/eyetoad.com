
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
  var calls=document.getElementById('lkCalls'), ans=document.getElementById('lkAns'),
      book=document.getElementById('lkBook'), show=document.getElementById('lkShow'), val=document.getElementById('lkVal');
  if(!calls||!ans||!book||!show||!val) return;
  var cv=document.getElementById('lkCallsV'), av=document.getElementById('lkAnsV'), bv=document.getElementById('lkBookV'),
      sv=document.getElementById('lkShowV'), vv=document.getElementById('lkValV');
  var stages=document.getElementById('lkStages'), big=document.getElementById('lkBig'), lab=document.getElementById('lkLab'), note=document.getElementById('lkNote');
  var NS='http://www.w3.org/2000/svg';
  var NAMES=['Calls in','Answered','Booked','Showed up'];

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function el(tag,attrs,text){
    var e=document.createElementNS(NS,tag);
    for(var k in attrs){e.setAttribute(k,attrs[k]);}
    if(text!==undefined){e.textContent=text;}
    return e;
  }

  function draw(){
    var c=+calls.value, a=+ans.value/100, b=+book.value/100, s=+show.value/100, v=+val.value;
    cv.textContent=c; av.textContent=(+ans.value)+'%'; bv.textContent=(+book.value)+'%';
    sv.textContent=(+show.value)+'%'; vv.textContent=money(v);

    var n=[c, c*a, c*a*b, c*a*b*s];
    var lost=n[0]-n[3];
    big.innerHTML='<span>'+Math.round(lost)+'</span>';
    lab.textContent='new patients lost per month, worth '+money(lost*v)+' in first-year value';

    stages.textContent='';
    var top=14, h=48, gapY=10, w=248, x=26;
    for(var i=0;i<4;i++){
      var y=top+i*(h+gapY);
      var pct=n[i]/n[0];
      stages.appendChild(el('rect',{x:x,y:y,width:w,height:h,rx:8,'class':'lk-stage'}));
      var fw=Math.max(4,w*pct);
      stages.appendChild(el('rect',{x:x,y:y,width:fw,height:h,rx:8,'class':'lk-fill'}));
      stages.appendChild(el('text',{x:x+10,y:y+19,'class':'lk-lbl'},NAMES[i]));
      stages.appendChild(el('text',{x:x+10,y:y+37,'class':'lk-val'},Math.round(n[i])+' ('+Math.round(pct*100)+'%)'));
      if(i<3){
        var drop=n[i]-n[i+1];
        if(drop>=0.5){
          stages.appendChild(el('text',{x:x+w+4,y:y+h+8,'class':'lk-lbl','text-anchor':'end'},'-'+Math.round(drop)));
          stages.appendChild(el('circle',{cx:x+w-6,cy:y+h+gapY/2,r:3,'class':'lk-drip'}));
        }
      }
    }

    var worst=0, worstDrop=-1;
    for(var j=0;j<3;j++){
      var d=n[j]-n[j+1];
      if(d>worstDrop){worstDrop=d;worst=j;}
    }
    var fixes=[
      'The biggest loss is at the front desk: <b>'+Math.round(worstDrop)+' callers a month</b> never reach a person. That is the cheapest thing on this page to fix, and it needs no marketing spend at all.',
      'The biggest loss is between answering and booking: <b>'+Math.round(worstDrop)+' people a month</b> speak to someone and still do not schedule. That is usually a script, an availability, or a price question nobody was ready for.',
      'The biggest loss is no-shows: <b>'+Math.round(worstDrop)+' booked patients a month</b> do not arrive. Confirmation cadence and how the first appointment is framed do most of the work here.'
    ];
    if(lost<1){
      note.innerHTML='<b>Nothing is leaking at those numbers.</b> If that is genuinely your funnel, you do not need conversion work &mdash; you need more people reaching it, which is a different job and the one we would actually quote you for.';
    }else{
      note.innerHTML=fixes[worst]+'<br><br>Across all four stages you are losing <b>'+Math.round(lost)+' of '+c+'</b> new patient calls, or <b>'+money(lost*v)+'</b> in first-year value every month. More visibility multiplies whatever this funnel already does &mdash; which is why we look at it before selling you traffic.';
    }
  }
  [calls,ans,book,show,val].forEach(function(e){e.addEventListener('input',draw);});
  draw();
})();

(function(){
  var form=document.getElementById('dtForm');
  if(!form) return;
  var btn=document.getElementById('dtBtn'), msg=document.getElementById('dtMsg'), load=document.getElementById('dtLoad');
  var t0=Date.now();
  load.value=String(t0);
  var sent=false, touched=false;

  form.addEventListener('keydown',function(){touched=true;},{once:true});
  form.addEventListener('pointerdown',function(){touched=true;},{once:true});

  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badPhone(v){return v.replace(/\D/g,'').length<10;}
  function badEmail(v){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(!touched) return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}

    var name=val('dt-name'), practice=val('dt-practice'), phone=val('dt-phone'), email=val('dt-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(practice)){show('err','Please enter your practice name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Practice:practice,Phone:phone,Email:email,Website:val('dt-site'),Notes:val('dt-msg'),
      _subject:'Dental practice audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
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

