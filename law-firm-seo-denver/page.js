
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
  var list=document.getElementById('balList');
  if(!list) return;
  var beam=document.getElementById('beam'), panL=document.getElementById('panL'), panR=document.getElementById('panR');
  var panLNum=document.getElementById('panLNum'), panRNum=document.getElementById('panRNum');
  var actN=document.getElementById('actN'), waitN=document.getElementById('waitN'), verdict=document.getElementById('balVerdict');
  var ownAct=document.getElementById('ownAct'), ownWait=document.getElementById('ownWait');

  var ARGS=[
    {t:'Clients are consulting AI before they consult us', s:'Clio reports more than half now start there, and those systems read what is published.'},
    {t:'Our credentials are not machine-readable', s:'Admissions and experience sitting in a PDF or an image cannot be verified or cited by anything.'},
    {t:'Referrals have a ceiling we have already reached', s:'It rises only if something else raises it.'},
    {t:'Referred clients look us up before calling', s:'The same work improves conversion on business we already earned.'},
    {t:'Rankings take three to six months to build', s:'Every month deferred moves the payoff a month further out.'},
    {t:'A competitor is visible where we are not', s:'Their position compounds while ours does not.'},
    {t:'Our intake loses inquiries we already paid for', s:'This one is cheap to fix and shows up in weeks.'},
    {t:'Paid search in our practice area keeps getting more expensive', s:'Organic and map visibility does not re-bill per click.'},
    {t:'We genuinely cannot take on more matters right now', s:'A real reason to wait. Capacity first, demand second.', w:1},
    {t:'Cash flow will not support a monthly commitment', s:'A real reason to wait, and we would rather you said so now.', w:1},
    {t:'The firm is being sold or wound down', s:'A real reason to wait. Nothing here pays back inside a few months.', w:1},
    {t:'We have no one internally to approve copy', s:'A real constraint. Compliance review needs a named person with time.', w:1}
  ];

  var state={};

  function render(){
    ARGS.forEach(function(a,i){
      var row=document.createElement('div');
      row.className='bal-item';
      row.id='arg'+i;
      var p=document.createElement('p');
      p.innerHTML=a.t+'<em>'+a.s+'</em>';
      var pick=document.createElement('div');
      pick.className='bal-pick';
      ['act','wait'].forEach(function(side){
        var b=document.createElement('button');
        b.type='button';
        b.className='bal-btn'+(side==='wait'?' wait':'');
        b.textContent=side==='act'?'Act':'Wait';
        b.setAttribute('aria-pressed','false');
        b.addEventListener('click',function(){
          state[i]=(state[i]===side)?null:side;
          update();
        });
        b.dataset.side=side; b.dataset.i=i;
        pick.appendChild(b);
      });
      row.appendChild(p); row.appendChild(pick);
      list.appendChild(row);
    });
  }

  function update(){
    var act=0, wait=0;
    ARGS.forEach(function(a,i){
      var row=document.getElementById('arg'+i);
      var s=state[i];
      row.classList.toggle('on-act',s==='act');
      row.classList.toggle('on-wait',s==='wait');
      row.querySelectorAll('.bal-btn').forEach(function(b){
        var on=b.dataset.side===s;
        b.classList.toggle('on',on);
        b.setAttribute('aria-pressed',on?'true':'false');
      });
      if(s==='act') act++;
      if(s==='wait') wait++;
    });
    if(ownAct && ownAct.value.trim()) act++;
    if(ownWait && ownWait.value.trim()) wait++;

    actN.textContent=act; waitN.textContent=wait;
    panLNum.textContent=act; panRNum.textContent=wait;

    var diff=act-wait;
    var deg=Math.max(-11,Math.min(11,diff*2.4));
    beam.setAttribute('transform','rotate('+(-deg)+' 230 64)');
    var drop=deg*3.6;
    panL.setAttribute('transform','translate(0,'+(drop)+')');
    panR.setAttribute('transform','translate(0,'+(-drop)+')');

    if(act===0&&wait===0){
      verdict.innerHTML='Assign the arguments below and the scale will move.';
    }else if(diff>=4){
      verdict.innerHTML='<b>'+act+' to '+wait+'.</b> At that spread the question stops being whether and becomes when &mdash; and since rankings take three to six months, when is the only variable you still control.';
    }else if(diff>0){
      verdict.innerHTML='<b>'+act+' to '+wait+'.</b> Leaning toward acting, but not overwhelmingly. That usually means starting narrow &mdash; one practice area, one problem &mdash; rather than committing to everything at once.';
    }else if(diff===0){
      verdict.innerHTML='<b>Even at '+act+' each.</b> A genuine tie usually means the constraint is timing rather than merit. Worth a conversation to work out which single thing would tip it.';
    }else if(diff>=-3){
      verdict.innerHTML='<b>'+act+' to '+wait+'.</b> Leaning toward waiting. If the reasons on that side are capacity or cash flow, they are real and we would say the same thing on a call.';
    }else{
      verdict.innerHTML='<b>'+act+' to '+wait+'.</b> That is a clear no for now, and it is the right answer. Come back when the constraints on the right-hand side have changed &mdash; the audit will still be free then.';
    }
  }

  render();
  if(ownAct) ownAct.addEventListener('input',update);
  if(ownWait) ownWait.addEventListener('input',update);
  update();
})();

(function(){
  var form=document.getElementById('lwForm');
  if(!form) return;
  var btn=document.getElementById('lwBtn'), msg=document.getElementById('lwMsg'), load=document.getElementById('lwLoad');
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

    var name=val('lw-name'), firm=val('lw-firm'), phone=val('lw-phone'), email=val('lw-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(firm)){show('err','Please enter your firm name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Firm:firm,PracticeArea:val('lw-area'),Phone:phone,Email:email,Website:val('lw-site'),Notes:val('lw-msg'),
      _subject:'Law firm audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

