
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
  var budget=document.getElementById('radBudget'), miles=document.getElementById('radMiles');
  if(!budget||!miles) return;
  var bv=document.getElementById('radBudgetV'), mv=document.getElementById('radMilesV');
  var big=document.getElementById('radBig'), lab=document.getElementById('radLab'), note=document.getElementById('radNote');
  var rIn=document.getElementById('ringIn'), rMid=document.getElementById('ringMid'),
      rOut=document.getElementById('ringOuter'), rEdge=document.getElementById('ringEdge'), rLbl=document.getElementById('ringLbl');

  function money(n){
    if(n>=100) return '$'+Math.round(n).toLocaleString('en-US');
    return '$'+n.toFixed(n<10?2:1);
  }
  function area(m){return Math.PI*m*m;}

  function calc(){
    var b=+budget.value, m=+miles.value;
    bv.textContent='$'+b.toLocaleString('en-US');
    mv.textContent=m+(m===1?' mile':' miles');

    var dens=b/area(m);
    big.innerHTML='<span>'+money(dens)+'</span>';
    lab.textContent='per square mile, per month, across '+Math.round(area(m)).toLocaleString('en-US')+' square miles';

    var half=Math.max(2,Math.round(m/2));
    var densHalf=b/area(half);
    var mult=densHalf/dens;

    rLbl.textContent=m+(m===1?' mile radius':' mile radius');
    var scale=Math.min(1,m/40);
    var outer=44+96*scale;
    rOut.setAttribute('r',outer);
    rEdge.setAttribute('r',outer);
    rMid.setAttribute('r',outer*0.62);
    rIn.setAttribute('r',outer*0.3);
    var thin=Math.max(.05,Math.min(.34,.34-scale*0.26));
    rOut.setAttribute('opacity',thin.toFixed(2));
    rMid.setAttribute('opacity',(thin*1.5).toFixed(2));
    rIn.setAttribute('opacity',(thin*2.6).toFixed(2));

    if(half>=m){
      note.innerHTML='At <b>'+m+' miles</b> you are already as concentrated as this slider goes &mdash; '+('$'+b.toLocaleString('en-US'))+' across roughly <b>'+Math.round(area(m)).toLocaleString('en-US')+' square miles</b>. '+
        'That is the shape we are arguing for. Widen the radius and watch how fast it thins out.'+
        '<br><br>Proximity is a real ranking input in the map pack and it is the one thing a national advertiser cannot buy away from you. Concentration is how a smaller firm turns that into an advantage instead of a consolation.';
      return;
    }
    note.innerHTML='At <b>'+m+' miles</b> you are spreading '+('$'+b.toLocaleString('en-US'))+' across roughly <b>'+Math.round(area(m)).toLocaleString('en-US')+' square miles</b>. '+
      'Cut the radius to <b>'+half+' miles</b> and the same budget becomes <b>'+money(densHalf)+' per square mile</b> &mdash; about <b>'+mult.toFixed(1)+' times</b> the concentration, on ground where you are already closest to the searcher.'+
      '<br><br>Proximity is a real ranking input in the map pack and it is the one thing a national advertiser cannot buy away from you. Concentration is how a smaller firm turns that into an advantage instead of a consolation.';
  }
  [budget,miles].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('piForm');
  if(!form) return;
  var btn=document.getElementById('piBtn'), msg=document.getElementById('piMsg'), load=document.getElementById('piLoad');
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

    var name=val('pi-name'), firm=val('pi-firm'), phone=val('pi-phone'), email=val('pi-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(firm)){show('err','Please enter your firm name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Firm:firm,Phone:phone,Email:email,Website:val('pi-site'),Notes:val('pi-msg'),
      _subject:'Personal injury firm audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Received. We will review the firm and reply, usually the same business day.');
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

