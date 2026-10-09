
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
  var targets=[['#sev','in'],['#fun','in'],['#bro','drop']];
  function reveal(el,cls){el.classList.add(cls);}
  targets.forEach(function(t){
    var el=document.querySelector(t[0]);
    if(!el) return;
    if(!('IntersectionObserver' in window)){reveal(el,t[1]);return;}
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){reveal(el,t[1]);io.disconnect();} });
    },{threshold:.3});
    io.observe(el);
  });
})();

(function(){
  var drop=document.querySelector('.bro-drop');
  if(!drop) return;
  var words=drop.textContent.trim().split(/\s+/);
  drop.textContent='';
  words.forEach(function(w,i){
    var s=document.createElement('span');
    s.className='w go';
    s.textContent=w;
    s.style.setProperty('--r',((i%5)-2)*9+'deg');
    s.style.transitionDelay=(i*0.045)+'s';
    drop.appendChild(s);
    drop.appendChild(document.createTextNode(' '));
  });
})();

(function(){
  var r=document.getElementById('rain');
  if(!r) return;
  var n=window.innerWidth<600?18:34;
  for(var i=0;i<n;i++){
    var d=document.createElement('i');
    d.style.left=(Math.random()*100)+'%';
    d.style.animationDelay=(-Math.random()*3.4)+'s';
    d.style.animationDuration=(2.9+Math.random()*1.8)+'s';
    d.style.opacity=(0.3+Math.random()*0.5);
    r.appendChild(d);
  }
})();

(function(){
  var q=document.getElementById('hmQ');
  if(!q) return;
  var boxes=q.querySelectorAll('input[type=checkbox]');
  var needle=document.getElementById('hmNeedle'),scoreEl=document.getElementById('hmScore');
  var bandEl=document.getElementById('hmBand'),noteEl=document.getElementById('hmNote'),panel=document.getElementById('hmPanel');
  var bands=[
    {max:29,name:'Critical',note:'This is the state most sites are in when we first see them. Nothing here is unfixable, but the site is currently costing you money rather than making it.'},
    {max:57,name:'Poor',note:'The foundation exists and the finishing does not. Usually the fastest gains are speed and making the next step obvious on every page.'},
    {max:85,name:'Fair',note:'Better than most. What is missing tends to be the machine-readable side and the measurement — you cannot improve what you cannot see.'},
    {max:100,name:'Healthy',note:'Genuinely strong. At this point a rebuild is probably the wrong spend, and getting more people to the site is the right one.'}
  ];
  function upd(){
    var c=0; boxes.forEach(function(b){if(b.checked)c++;});
    var score=Math.round(c/boxes.length*100);
    needle.setAttribute('transform','rotate('+((score/100*180)-90)+' 150 132)');
    scoreEl.textContent=score;
    var b=bands.find(function(x){return score<=x.max;});
    bandEl.textContent=b.name;
    noteEl.textContent=c===0?'Check the statements that are true of your site today.':b.note;
    panel.classList.toggle('broken',c>0&&score<30);
  }
  boxes.forEach(function(b){b.addEventListener('change',upd);});
  upd();
})();

(function(){
  var p=document.getElementById('dPages'),t=document.getElementById('dTools'),c=document.getElementById('dCopy');
  if(!p||!t||!c) return;
  var pv=document.getElementById('dPagesV'),tv=document.getElementById('dToolsV'),cv=document.getElementById('dCopyV');
  var out=document.getElementById('dOut');
  function calc(){
    var pages=+p.value,tools=+t.value,copy=Math.min(+c.value,pages);
    if(+c.value>pages){c.value=pages;copy=pages;}
    pv.textContent=pages; tv.textContent=tools; cv.textContent=copy;
    var base=99+(pages-1)*11+tools*46+copy*9;
    var lo=Math.max(99,Math.floor(base/10)*10), hi=Math.round(base*1.28/10)*10;
    out.textContent='$'+lo.toLocaleString('en-US')+' – $'+hi.toLocaleString('en-US')+' / mo';
  }
  [p,t,c].forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();

(function(){
  var forms=[document.getElementById('cwTop'),document.getElementById('cwBot')].filter(Boolean);
  if(!forms.length) return;
  var t0=Date.now();

  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badContact(v){
    var digits=v.replace(/\D/g,'').length;
    var email=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    return !(email||digits>=10);
  }

  forms.forEach(function(form){
    var msg=form.querySelector('.fmsg');
    var btn=form.querySelector('button[type=submit]');
    var label=btn.textContent;
    var lt=form.querySelector('input[name="_loadtime"]');
    if(lt) lt.value=String(t0);
    var done=false;

    function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
    function v(sel){var e=form.querySelector(sel);return e?e.value.trim():'';}

    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(done) return;
      if(form.querySelector('input[name="_honey"]').value!=='') return;
      if(Date.now()-t0<3500){show('err','Give the page a second to finish loading, then send again.');return;}

      var name=v('[name="Name"]'), contact=v('[name="Contact"]');
      if(badName(name)){show('err','Please enter your name.');return;}
      if(badContact(contact)){show('err','Please enter a phone number or an email address we can reach you on.');return;}

      var data={};
      form.querySelectorAll('input[name],textarea[name]').forEach(function(el){
        if(el.name!=='_honey') data[el.name]=el.value;
      });
      data.Name=name; data.Contact=contact;

      btn.disabled=true; btn.textContent='Sending...';
      show('warn','Sending...');

      fetch('https://formsubmit.co/ajax/'+form.getAttribute('data-fs'),{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data)
      }).then(function(res){
        if(res.ok){
          done=true;
          show('ok','Got it. We will come back to you with a real assessment, usually the same business day.');
          btn.textContent='Sent';
        }else{
          show('warn','We could not confirm that went through. Please call <a href="tel:18004818638">1-800-481-8638</a> so nothing is lost.');
          btn.disabled=false; btn.textContent=label;
        }
      }).catch(function(){
        show('err','That did not send. Please call <a href="tel:18004818638">1-800-481-8638</a> and we will pick it up from there.');
        btn.disabled=false; btn.textContent=label;
      });
    });
  });
})();

