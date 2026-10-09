
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
  var join=document.getElementById('rJoin'), keep=document.getElementById('rKeep'),
      fee=document.getElementById('rFee'), cac=document.getElementById('rCac'), lift=document.getElementById('rLift');
  if(!join||!keep||!fee||!cac||!lift) return;
  var jv=document.getElementById('rJoinV'), kv=document.getElementById('rKeepV'), fv=document.getElementById('rFeeV'),
      cv=document.getElementById('rCacV'), lv=document.getElementById('rLiftV');
  var area=document.getElementById('retArea'), line=document.getElementById('retLine');
  var area2=document.getElementById('retArea2'), line2=document.getElementById('retLine2');
  var big=document.getElementById('retBig'), lab=document.getElementById('retLab'), note=document.getElementById('retNote');

  var X0=30, X1=320, Y0=160, Y1=22;
  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  function series(keepPct){
    var r=Math.pow(keepPct/100, 1/11);
    var pts=[];
    for(var m=0;m<12;m++){ pts.push(Math.pow(r,m)); }
    return pts;
  }
  function path(pts){
    var d='';
    for(var i=0;i<pts.length;i++){
      var x=X0+(X1-X0)*(i/11), y=Y0-(Y0-Y1)*pts[i];
      d+=(i?' L':'M')+x.toFixed(1)+' '+y.toFixed(1);
    }
    return d;
  }
  function areaPath(pts){ return path(pts)+' L'+X1+' '+Y0+' L'+X0+' '+Y0+' Z'; }
  function months(pts){ var s=0; for(var i=0;i<pts.length;i++){s+=pts[i];} return s; }

  function calc(){
    var j=+join.value, k=+keep.value, f=+fee.value, c=+cac.value, L=+lift.value;
    var k2=Math.min(92,k+L);
    jv.textContent=j; kv.textContent=k+'%'; fv.textContent=money(f); cv.textContent=money(c);
    lv.textContent=(L===0?'no change':'+'+L+' pts');

    var a=series(k), b=series(k2);
    line.setAttribute('d',path(a)); area.setAttribute('d',areaPath(a));
    line2.setAttribute('d',path(b)); area2.setAttribute('d',areaPath(b));

    var mA=months(a), mB=months(b);
    var ltvA=mA*f-c, ltvB=mB*f-c;
    big.innerHTML='<span>'+money(ltvA)+'</span>';
    lab.innerHTML='first-year value per member, after the '+money(c)+' it cost to get them &mdash; from about <b>'+mA.toFixed(1)+' billed months</b>';

    var annualA=ltvA*j*12, annualB=ltvB*j*12, delta=annualB-annualA;
    if(L===0){
      note.innerHTML='At <b>'+k+'%</b> twelve-month retention each member bills about <b>'+mA.toFixed(1)+' months</b> and returns <b>'+money(ltvA)+'</b> net of acquisition. Move the bottom slider to see what a few points of retention would be worth.';
    }else{
      note.innerHTML='Holding everything else still and moving twelve-month retention from <b>'+k+'%</b> to <b>'+k2+'%</b> takes the average member from <b>'+mA.toFixed(1)+'</b> to <b>'+mB.toFixed(1)+' billed months</b>. '+
        'Across '+j+' joins a month that is <b>'+money(delta)+'</b> a year &mdash; with no extra advertising, no extra signups and no extra capacity.'+
        '<br><br>That is the argument. Retention is a marketing problem long before anyone cancels, because the person most likely to stay is decided by which search brought them in and what the page promised.';
    }
  }
  [join,keep,fee,cac,lift].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('ftForm');
  if(!form) return;
  var btn=document.getElementById('ftBtn'), msg=document.getElementById('ftMsg'), load=document.getElementById('ftLoad');
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

    var name=val('ft-name'), biz=val('ft-gym'), phone=val('ft-phone'), email=val('ft-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(biz)){show('err','Please enter your gym or studio name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Business:biz,Phone:phone,Email:email,Website:val('ft-site'),Notes:val('ft-msg'),
      _subject:'Fitness business audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

