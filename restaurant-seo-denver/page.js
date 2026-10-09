
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
  var modeHost=document.getElementById('doorMode'), grid=document.getElementById('doorGrid'),
      items=document.getElementById('doorItems');
  if(!modeHost||!grid||!items) return;
  var itemsV=document.getElementById('doorItemsV'), big=document.getElementById('doorBig'),
      lab=document.getElementById('doorLab'), note=document.getElementById('doorNote');

  var SAMPLE=['birria tacos','gluten free pizza','pad see ew','oxtail','horchata','patio seating',
    'vegan ramen','brunch','happy hour','open late','private room','kids menu',
    'espresso martini','dry aged ribeye','pho','banh mi','key lime pie','natural wine',
    'gluten free pasta','halal','tasting menu','large groups','dog friendly','cold brew'];

  var MODES=[{k:'pdf',n:'PDF or photo menu'},{k:'text',n:'Readable text menu'}];
  var mode='pdf';

  MODES.forEach(function(m,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='door-btn'+(i===0?' on':'');
    b.textContent=m.n;
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.addEventListener('click',function(){
      mode=m.k;
      modeHost.querySelectorAll('.door-btn').forEach(function(x,xi){
        var on=xi===i;
        x.classList.toggle('on',on);
        x.setAttribute('aria-pressed',on?'true':'false');
      });
      draw();
    });
    modeHost.appendChild(b);
  });

  function draw(){
    var n=+items.value;
    itemsV.textContent=n;

    var shown=Math.min(n,24);
    grid.textContent='';
    for(var i=0;i<shown;i++){
      var t=document.createElement('div');
      t.className='door-tile'+(mode==='text'?' open':'');
      t.textContent=mode==='text'?SAMPLE[i%SAMPLE.length]:'\u2014';
      grid.appendChild(t);
    }

    var count=mode==='text'?n:0;
    big.innerHTML='<span>'+count+'</span>';
    lab.textContent=mode==='text'
      ? 'searchable phrases a machine can actually read'
      : 'searchable phrases a machine can actually read';

    if(mode==='text'){
      note.innerHTML='A '+n+'-item menu published as text is <b>'+n+' separate phrases</b> somebody could search and find you for &mdash; dish names, dietary markers, the things you are known for. Add the attributes a constraint query matches against (quiet, patio, large groups, open late) and the number climbs further.'+
        '<br><br>This is also what an assistant quotes when it names you. It cannot describe a photograph, but it can read a menu.';
    }else{
      note.innerHTML='As a PDF or a photograph, that same '+n+'-item menu is worth <b>zero</b> searchable phrases. Not few &mdash; zero. To a search engine a picture of your menu is a picture, so the dish you are famous for is not a word associated with your restaurant anywhere.'+
        '<br><br>Flip the switch above. Nothing about the food changed; only whether a machine can read it.';
    }
  }
  items.addEventListener('input',draw);
  draw();
})();

(function(){
  var form=document.getElementById('rsForm');
  if(!form) return;
  var btn=document.getElementById('rsBtn'), msg=document.getElementById('rsMsg'), load=document.getElementById('rsLoad');
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

    var name=val('rs-name'), rest=val('rs-rest'), phone=val('rs-phone'), email=val('rs-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(rest)){show('err','Please enter your restaurant name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Restaurant:rest,MenuFormat:val('rs-menu'),Phone:phone,Email:email,Website:val('rs-site'),Notes:val('rs-msg'),
      _subject:'Restaurant audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+to,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(data)
    }).then(function(res){
      if(res.ok){
        sent=true;
        show('ok','Got it. We will check your menu, your listings and whether assistants know you exist, and get back to you.');
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

