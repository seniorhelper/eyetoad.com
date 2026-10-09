
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
  var host=document.getElementById('reDots');
  if(!host) return;
  var TOTAL=1026;              /* ~1,026 dots at roughly 1,400 agents each */
  var LIT=[137,402,613,788,941];
  var frag=document.createDocumentFragment();
  for(var i=0;i<TOTAL;i++){
    var d=document.createElement('span');
    d.className='re-dot'+(LIT.indexOf(i)>-1?' lit':'');
    frag.appendChild(d);
  }
  host.appendChild(frag);
})();

(function(){
  var now=document.getElementById('comNow'), add=document.getElementById('comAdd'),
      price=document.getElementById('comPrice'), rate=document.getElementById('comRate'),
      split=document.getElementById('comSplit');
  if(!now||!add||!price||!rate||!split) return;
  var nv=document.getElementById('comNowV'), av=document.getElementById('comAddV'),
      pv=document.getElementById('comPriceV'), rv=document.getElementById('comRateV'),
      sv=document.getElementById('comSplitV');
  var big=document.getElementById('comBig'), lab=document.getElementById('comLab'), note=document.getElementById('comNote');
  var barNow=document.getElementById('barNow'), barNext=document.getElementById('barNext');
  var barNowV=document.getElementById('barNowV'), barNextV=document.getElementById('barNextV');
  var tabs=document.getElementById('comTabs');

  var TYPES=[
    {k:'res',  n:'Residential', price:525000,  rate:2.5},
    {k:'lux',  n:'Luxury',      price:1750000, rate:2.5},
    {k:'comm', n:'Commercial',  price:1200000, rate:4.0},
    {k:'land', n:'Land',        price:340000,  rate:6.0}
  ];
  var active='res';

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  TYPES.forEach(function(t,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='com-tab'+(i===0?' on':'');
    b.textContent=t.n;
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      active=t.k;
      price.value=t.price; rate.value=t.rate;
      tabs.querySelectorAll('.com-tab').forEach(function(x,xi){
        var on=xi===i;
        x.classList.toggle('on',on);
        x.setAttribute('aria-pressed',on?'true':'false');
      });
      calc();
    });
    tabs.appendChild(b);
  });

  function calc(){
    var n=+now.value, a=+add.value, p=+price.value, r=+rate.value/100, s=+split.value/100;
    nv.textContent=n; av.textContent='+'+a; pv.textContent=money(p);
    rv.textContent=(+rate.value).toFixed(1)+'%'; sv.textContent=(+split.value)+'%';

    var per=p*r*s;
    var gciNow=n*per, gciNext=(n+a)*per, delta=a*per;

    big.innerHTML='<span>'+money(delta)+'</span>';
    lab.textContent='added to your gross commission income, per year';

    var max=Math.max(gciNext,1);
    barNow.style.width=((gciNow/max)*100).toFixed(1)+'%';
    barNext.style.width='100%';
    barNowV.textContent=money(gciNow);
    barNextV.textContent=money(gciNext);

    var t=TYPES.filter(function(x){return x.k===active;})[0];
    var pct=gciNow>0?((delta/gciNow)*100):null;

    note.innerHTML='At '+money(p)+' per '+t.n.toLowerCase()+' transaction, '+(+rate.value).toFixed(1)+'% to your side and a '+(+split.value)+'% split, each closing nets you about <b>'+money(per)+'</b>. '+
      a+' more of them is <b>'+money(delta)+' a year</b>'+
      (pct!==null?' &mdash; a <b>'+Math.round(pct)+'%</b> increase on where you are now':'')+'.'+
      '<br><br>Now hold that number next to what marketing costs. That comparison is the entire decision, and it is the one almost nobody sits down and actually makes.';
  }
  [now,add,price,rate,split].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('reForm');
  if(!form) return;
  var btn=document.getElementById('reBtn'), msg=document.getElementById('reMsg'), load=document.getElementById('reLoad');
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

    var name=val('re-name'), broker=val('re-broker'), phone=val('re-phone'), email=val('re-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(broker)){show('err','Please enter your brokerage or team name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Brokerage:broker,Markets:val('re-market'),Phone:phone,Email:email,Website:val('re-site'),Notes:val('re-msg'),
      _subject:'Real estate agent audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will review your market, check the domain shelf and get back to you, usually the same business day.');
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

