
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
  var plans=document.getElementById('hgPlans'), fee=document.getElementById('hgFee'), peak=document.getElementById('hgPeak');
  if(!plans||!fee||!peak) return;
  var pv=document.getElementById('hgPlansV'), fv=document.getElementById('hgFeeV'), kv=document.getElementById('hgPeakV');
  var grid=document.getElementById('hgGrid'), big=document.getElementById('hgBig'), lab=document.getElementById('hgLab'), note=document.getElementById('hgNote');
  var M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var SHAPE=[0.72,0.60,0.30,0.16,0.44,0.86,1.00,0.94,0.38,0.22,0.58,0.80];
  var HEAT =[1,1,1,0,0,0,0,0,0,0,1,1]; /* 1 = heating driven, 0 = cooling driven */

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  function draw(){
    var n=+plans.value, f=+fee.value, pk=+peak.value;
    pv.textContent=n; fv.textContent=money(f); kv.textContent=money(pk);

    var planMonthly=n*f/12;
    grid.textContent='';
    var lowIdx=0, lowVal=Infinity, totals=[];
    for(var i=0;i<12;i++){
      var seasonal=SHAPE[i]*pk;
      var total=seasonal+planMonthly;
      totals.push(total);
      if(seasonal<lowVal){lowVal=seasonal;lowIdx=i;}

      var cell=document.createElement('div');
      cell.className='hg-cell';
      var share=Math.min(1,total/pk);
      var planShare=planMonthly/Math.max(total,1);
      var base = HEAT[i]
        ? 'rgba(14,165,233,'+(0.14+SHAPE[i]*0.7).toFixed(2)+')'
        : 'rgba(234,88,12,'+(0.14+SHAPE[i]*0.7).toFixed(2)+')';
      cell.style.background='linear-gradient(to top,rgba(100,116,139,'+(0.25+planShare*0.6).toFixed(2)+') 0%,rgba(100,116,139,'+(0.25+planShare*0.6).toFixed(2)+') '+Math.round(planShare*100)+'%,'+base+' '+Math.round(planShare*100)+'%,'+base+' 100%)';
      cell.style.borderColor = share>0.55?'rgba(255,255,255,.34)':'rgba(255,255,255,.14)';
      cell.innerHTML='<b>'+M[i]+'</b><i>'+Math.round(share*100)+'%</i>';
      grid.appendChild(cell);
    }

    var floorPct=(totals[lowIdx]/pk)*100;
    var before=(SHAPE[lowIdx]*100);
    big.innerHTML='<span>'+Math.round(floorPct)+'%</span>';
    lab.textContent='of your peak month now covered in '+M[lowIdx]+', your deadest month';

    if(floorPct>=100){
      note.innerHTML='At those numbers your plan base alone covers more than a full peak month. Worth sanity-checking the inputs &mdash; but if it is real, the seasonal swing has stopped being the thing that decides your year, which is the entire goal.';
    }else if(n===0){
      note.innerHTML='With no plan members, '+M[lowIdx]+' runs at about <b>'+Math.round(before)+'%</b> of your peak month. That trough is where the layoffs, the idle trucks and the cash-flow stress live. Move the top slider.';
    }else{
      note.innerHTML='<b>'+n.toLocaleString()+' plan members</b> at '+money(f)+' a year adds about <b>'+money(planMonthly)+' every month</b>, regardless of weather. '+
        M[lowIdx]+' goes from roughly <b>'+Math.round(before)+'%</b> of peak to <b>'+Math.round(floorPct)+'%</b>, and the whole year adds <b>'+money(n*f)+'</b> of revenue that does not depend on anything breaking.'+
        '<br><br>That is also why plan members matter beyond the fee: they are the people who already trust you when a system finally fails, which is where the replacement margin comes from.';
    }
  }
  [plans,fee,peak].forEach(function(e){e.addEventListener('input',draw);});
  draw();
})();

(function(){
  var form=document.getElementById('hvForm');
  if(!form) return;
  var btn=document.getElementById('hvBtn'), msg=document.getElementById('hvMsg'), load=document.getElementById('hvLoad');
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

    var name=val('hv-name'), company=val('hv-company'), phone=val('hv-phone'), email=val('hv-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your company name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Phone:phone,Email:email,Website:val('hv-site'),Notes:val('hv-msg'),
      _subject:'HVAC contractor audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

