
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
  var host=document.getElementById('ccList');
  if(!host) return;
  var barNE=document.getElementById('barNE'), barIA=document.getElementById('barIA');
  var big=document.getElementById('ccBig'), lab=document.getElementById('ccLab'), note=document.getElementById('ccNote');

  var TOTAL=1001010, NE_TOTAL=878138, IA_TOTAL=122872;
  var COUNTIES=[
    {n:'Douglas County',      s:'NE', pop:601158, note:'Omaha, Dundee, Benson, Millard, Elkhorn', on:true},
    {n:'Sarpy County',        s:'NE', pop:204828, note:'Bellevue, Papillion, La Vista, Gretna, Offutt', on:true},
    {n:'Washington, Cass & Saunders', s:'NE', pop:72152, note:'Blair, Plattsmouth, Wahoo, Ashland — grouped', on:false},
    {n:'Pottawattamie County',s:'IA', pop:93529, note:'Council Bluffs, Carter Lake, Crescent, Treynor', on:false},
    {n:'Harrison & Mills',    s:'IA', pop:29343, note:'Glenwood, Missouri Valley, Pacific Junction — grouped', on:false}
  ];

  function nfmt(n){return n.toLocaleString('en-US');}

  COUNTIES.forEach(function(c,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='cc-row'+(c.s==='IA'?' ia':'')+(c.on?' on':'');
    b.setAttribute('aria-pressed',c.on?'true':'false');
    b.innerHTML='<span class="cc-box"></span>'+
      '<span class="cc-name">'+c.n+'<span class="cc-state">'+c.s+'</span><em>'+c.note+'</em></span>'+
      '<span class="cc-pop">'+nfmt(c.pop)+'</span>';
    b.addEventListener('click',function(){
      c.on=!c.on;
      b.classList.toggle('on',c.on);
      b.setAttribute('aria-pressed',c.on?'true':'false');
      calc();
    });
    host.appendChild(b);
  });

  function calc(){
    var ne=0, ia=0;
    COUNTIES.forEach(function(c){ if(c.on){ if(c.s==='NE') ne+=c.pop; else ia+=c.pop; } });
    var tot=ne+ia;
    var missing=TOTAL-tot;

    barNE.style.width=((ne/TOTAL)*100).toFixed(2)+'%';
    barIA.style.width=((ia/TOTAL)*100).toFixed(2)+'%';

    big.innerHTML='<span>'+nfmt(tot)+'</span>';
    lab.textContent='people inside your stated service area, of 1,001,010 in the metro';

    var pct=Math.round((tot/TOTAL)*100);
    var iaOn=ia>0;

    if(tot===0){
      note.innerHTML='Nothing selected, which is a fair starting point if you genuinely are not sure &mdash; and plenty of owners are not. <b>Whatever your Google Business Profile currently says is the answer Google is using</b>, whether or not it matches reality. Worth ten minutes to go and look.';
    }else if(!iaOn){
      note.innerHTML='You are covering <b>'+nfmt(tot)+' people</b>, about '+pct+'% of the metro, all on the Nebraska side. The <b>'+nfmt(IA_TOTAL)+'</b> across the river are outside your stated area.'+
        '<br><br>That is entirely fine if you will not cross the bridge &mdash; and worth acting on if you would. Iowa is a smaller share of the metro than most people assume, but it is also where fewer Omaha businesses have bothered to state that they serve it.';
    }else if(missing<=0){
      note.innerHTML='Full metro coverage &mdash; <b>'+nfmt(tot)+' people</b> across all eight counties and both states.'+
        '<br><br>If that is genuinely true, the job now is making sure it is <b>published</b> rather than just intended: both states named in your service area settings, the Iowa communities written out in text on your site, and any state-specific licensing stated plainly. An assistant cannot infer a service area, and neither can Google.';
    }else{
      note.innerHTML='You are covering <b>'+nfmt(tot)+' people</b>, about '+pct+'% of the metro, including <b>'+nfmt(ia)+'</b> on the Iowa side.'+
        '<br><br>Crossing the river is the part most competitors skip, so being explicit about it is unusually cheap ground. Make sure the Iowa communities appear as words on your site and in your profile &mdash; <b>'+nfmt(missing)+' people</b> in the metro still sit outside what you have stated.';
    }
  }
  calc();
})();

(function(){
  var form=document.getElementById('omForm');
  if(!form) return;
  var btn=document.getElementById('omBtn'), msg=document.getElementById('omMsg'), load=document.getElementById('omLoad');
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

    var name=val('om-name'), company=val('om-company'), phone=val('om-phone'), email=val('om-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your business name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,ServiceArea:val('om-area'),Phone:phone,Email:email,Website:val('om-site'),Notes:val('om-msg'),
      _subject:'Omaha metro audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will check your coverage from both sides of the river and get back to you.');
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

