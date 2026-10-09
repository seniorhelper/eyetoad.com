
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
  var dense=document.getElementById('lvDense'), content=document.getElementById('lvContent'),
      rev=document.getElementById('lvRev'), rival=document.getElementById('lvRival');
  if(!dense||!content||!rev||!rival) return;
  var dv=document.getElementById('lvDenseV'), cv=document.getElementById('lvContentV'),
      rv=document.getElementById('lvRevV'), iv=document.getElementById('lvRivalV');
  var barRel=document.getElementById('barRel'), barDist=document.getElementById('barDist'), barProm=document.getElementById('barProm');
  var valRel=document.getElementById('valRel'), valDist=document.getElementById('valDist'), valProm=document.getElementById('valProm');
  var lvDist=document.getElementById('lvDist');
  var big=document.getElementById('lvBig'), note=document.getElementById('lvNote');

  function calc(){
    var d=+dense.value, c=+content.value, r=+rev.value, iR=+rival.value;
    dv.textContent=d; cv.textContent=c; rv.textContent=r; iv.textContent=iR;

    var distPower=Math.max(6,88-d*4);
    var relPower=Math.min(100,(c/12)*100);
    var promPower=iR<=0 ? (r>0?100:0) : Math.min(100,(r/iR)*100);

    barDist.style.height=distPower+'%';
    barRel.style.height=Math.max(4,relPower)+'%';
    barProm.style.height=Math.max(4,promPower)+'%';

    var dead=d>=12;
    lvDist.classList.toggle('dead',dead);
    valDist.textContent = d===0 ? 'Decisive' : (dead ? 'A tie' : 'Still counts');
    valRel.textContent = relPower>=80?'Strong':relPower>=45?'Partial':'Thin';
    valProm.textContent = promPower>=90?'Ahead':promPower>=50?'Closing':'Behind';

    var gap=Math.max(0,iR-r);

    if(d===0){
      big.innerHTML='<span>Distance is still your friend</span>';
      note.innerHTML='With no competitors within a half mile, proximity is doing real work for you and this page\u2019s argument does not apply. Hold the ground you have &mdash; keep the profile accurate and the reviews current &mdash; and spend the effort on conversion instead of on a fight you are already winning.';
    }else if(dead && promPower<50){
      big.innerHTML='<span>Prominence is the gap</span>';
      note.innerHTML='At <b>'+d+' competitors within a half mile</b>, distance has stopped separating anyone &mdash; you are all equally close and Google has to decide on something else. Right now the business above you has <b>'+gap.toLocaleString()+' more reviews</b> than you do.'+
        '<br><br>That is the actual contest, and it is winnable: reviews are earned rather than bought, and most competitors ask once and stop. <b>Relevance is the faster half</b> &mdash; writing out '+(c<12?'the '+(12-c)+' services you have not published yet':'your full service list')+' moves within weeks, while prominence compounds over months.';
    }else if(dead){
      big.innerHTML='<span>You are in the fight on both</span>';
      note.innerHTML='At <b>'+d+' competitors within a half mile</b> distance is a tie, and you are holding your own on the two factors that decide it &mdash; '+Math.round(promPower)+'% of the review base above you and '+c+' services published.'+
        '<br><br>From here it is maintenance rather than catch-up: keep reviews recent, because recency fades faster than owners expect, and keep publishing services as you add them. This is the position competitors find hardest to take back.';
    }else{
      big.innerHTML='<span>Distance still counts here</span>';
      note.innerHTML='At <b>'+d+' competitors within a half mile</b> you are not yet in full density, so proximity is still doing some sorting for you. Worth knowing that this cuts both ways &mdash; it helps against businesses further out and does nothing against the ones on your block.'+
        '<br><br>Relevance is the cheapest move available: '+(c<12?'you have '+c+' services written out, and each one you add is another query you can match.':'your service coverage is solid, so prominence is where the remaining room is.');
    }
  }
  [dense,content,rev,rival].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('fcForm');
  if(!form) return;
  var btn=document.getElementById('fcBtn'), msg=document.getElementById('fcMsg'), load=document.getElementById('fcLoad');
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

    var name=val('fc-name'), company=val('fc-company'), phone=val('fc-phone'), email=val('fc-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your business name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Area:val('fc-area'),Phone:phone,Email:email,Website:val('fc-site'),Notes:val('fc-msg'),
      _subject:'Fort Collins audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will check where you rank from downtown and from the corridors, and get back to you.');
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

