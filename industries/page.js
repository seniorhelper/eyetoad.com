
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
  var host=document.getElementById('ihTiles'), grid=document.getElementById('ihGrid');
  if(!host||!grid) return;
  var cards=Array.prototype.slice.call(grid.querySelectorAll('.ind'));
  cards.forEach(function(card,i){
    var c=(card.getAttribute('style')||'').replace('--c:','').trim();
    var t=document.createElement('span');
    t.className='ih-tile';
    t.style.setProperty('--c',c);
    t.style.animationDelay=(i*0.18)+'s';
    host.appendChild(t);
  });
})();

(function(){
  var grid=document.getElementById('ihGrid'), search=document.getElementById('ihSearch'),
      chipHost=document.getElementById('ihChips'), count=document.getElementById('ihCount'),
      none=document.getElementById('ihNone');
  if(!grid||!search||!chipHost) return;
  var cards=Array.prototype.slice.call(grid.querySelectorAll('.ind'));

  var CATS=[
    {k:'all',   n:'All'},
    {k:'trades',n:'Trades'},
    {k:'health',n:'Health'},
    {k:'pro',   n:'Professional'},
    {k:'local', n:'Food & Local'}
  ];
  var cat='all';

  CATS.forEach(function(c,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='chipf'+(i===0?' on':'');
    b.textContent=c.n;
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      cat=c.k;
      chipHost.querySelectorAll('.chipf').forEach(function(x,xi){
        var on=xi===i;
        x.classList.toggle('on',on);
        x.setAttribute('aria-pressed',on?'true':'false');
      });
      apply();
    });
    chipHost.appendChild(b);
  });

  function apply(){
    var q=search.value.trim().toLowerCase();
    var shown=0;
    cards.forEach(function(card){
      var okCat = cat==='all' || card.getAttribute('data-cat')===cat;
      var hay = (card.getAttribute('data-tags')||'')+' '+card.textContent.toLowerCase();
      var okQ = !q || hay.toLowerCase().indexOf(q)>-1;
      var vis = okCat && okQ;
      card.hidden = !vis;
      if(vis) shown++;
    });
    count.textContent = shown===1 ? '1 industry' : shown+' industries';
    none.classList.toggle('on', shown===0);
  }

  search.addEventListener('input',apply);
  apply();
})();

(function(){
  var form=document.getElementById('ihForm');
  if(!form) return;
  var btn=document.getElementById('ihBtn'), msg=document.getElementById('ihMsg'), load=document.getElementById('ihLoad');
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

    var name=val('ih-name'), company=val('ih-company'), phone=val('ih-phone'), email=val('ih-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your business name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Industry:val('ih-industry'),Phone:phone,Email:email,Website:val('ih-site'),Notes:val('ih-msg'),
      _subject:'Industry audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

