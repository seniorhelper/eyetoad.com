
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
  var homes=document.getElementById('stHomes'), rate=document.getElementById('stRate'),
      job=document.getElementById('stJob'), posHost=document.getElementById('posHost'),
      hood=document.getElementById('hood');
  if(!homes||!rate||!job||!posHost||!hood) return;
  var hv=document.getElementById('stHomesV'), rv=document.getElementById('stRateV'), jv=document.getElementById('stJobV');
  var big=document.getElementById('stBig'), lab=document.getElementById('stLab'), note=document.getElementById('stNote');

  var POS=[
    {k:1,n:'Map pack #1',  share:0.178},
    {k:2,n:'Map pack #2',  share:0.154},
    {k:3,n:'Map pack #3',  share:0.151},
    {k:0,n:'Not in the pack', share:0.012}
  ];
  var pos=POS[3];

  var CELLS=160;
  var cells=[];
  for(var i=0;i<CELLS;i++){
    var c=document.createElement('span');
    c.className='home';
    hood.appendChild(c);
    cells.push(c);
  }

  POS.forEach(function(p,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='pos-btn'+(i===3?' on':'');
    b.textContent=p.n;
    b.setAttribute('aria-pressed',i===3?'true':'false');
    b.addEventListener('click',function(){
      pos=p;
      posHost.querySelectorAll('.pos-btn').forEach(function(x,xi){
        var on=xi===i;
        x.classList.toggle('on',on);
        x.setAttribute('aria-pressed',on?'true':'false');
      });
      calc();
    });
    posHost.appendChild(b);
  });

  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}

  function calc(){
    var h=+homes.value, r=+rate.value/100, j=+job.value;
    hv.textContent=h.toLocaleString('en-US');
    rv.textContent=(+rate.value)+'%';
    jv.textContent=money(j);

    var replacing=h*r;
    var yours=replacing*pos.share;
    var revenue=yours*j;

    var hitCells=Math.round(Math.min(CELLS,CELLS*r));
    var yourCells=Math.round(Math.min(hitCells,hitCells*pos.share));
    cells.forEach(function(c,i){
      c.className='home'+(i<yourCells?' yours':(i<hitCells?' hit':''));
    });

    big.innerHTML='<span>'+money(revenue)+'</span>';
    lab.textContent='from one storm, at '+pos.n.toLowerCase()+' &mdash; about '+Math.round(yours)+' roofs';

    var top=POS[0];
    var topRev=replacing*top.share*j;
    var gap=topRev-revenue;

    if(pos.k===0){
      note.innerHTML='Outside the pack you are effectively invisible for the searches that follow a storm. Of roughly <b>'+Math.round(replacing).toLocaleString()+' homeowners</b> replacing a roof, this position reaches almost none of them &mdash; and the crews that drove in from out of state reach them at the door instead.'+
        '<br><br>At <b>'+top.n.toLowerCase()+'</b> the same storm is worth about <b>'+money(topRev)+'</b>. That gap &mdash; <b>'+money(gap)+'</b> &mdash; is the actual cost of not ranking, and it repeats every storm.';
    }else{
      note.innerHTML='At <b>'+pos.n.toLowerCase()+'</b>, roughly <b>'+Math.round(yours)+' of the '+Math.round(replacing).toLocaleString()+'</b> homeowners replacing a roof find you first. At '+money(j)+' a job that is <b>'+money(revenue)+'</b> from a single storm.'+
        (gap>0?'<br><br>Moving to '+top.n.toLowerCase()+' would be worth roughly <b>'+money(gap)+'</b> more from the same storm.':'<br><br>That is the top of the pack. The work from here is holding it &mdash; recency and review flow are what erode first.');
    }
  }
  [homes,rate,job].forEach(function(e){e.addEventListener('input',calc);});
  calc();
})();

(function(){
  var form=document.getElementById('rfForm');
  if(!form) return;
  var btn=document.getElementById('rfBtn'), msg=document.getElementById('rfMsg'), load=document.getElementById('rfLoad');
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

    var name=val('rf-name'), company=val('rf-company'), phone=val('rf-phone'), email=val('rf-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your company name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Years:val('rf-years'),Phone:phone,Email:email,Website:val('rf-site'),Notes:val('rf-msg'),
      _subject:'Roofing contractor audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

