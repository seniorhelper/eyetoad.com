
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
  var tools=document.getElementById('ydTools'), plot=document.getElementById('ydPlot');
  if(!tools||!plot) return;
  var countEl=document.getElementById('ydCount');
  var NS='http://www.w3.org/2000/svg';

  var ITEMS=[
    {k:'tree', n:'Tree',        c:'#166534'},
    {k:'shrub',n:'Shrub',       c:'#16A34A'},
    {k:'bed',  n:'Flower bed',  c:'#DB2777'},
    {k:'grass',n:'Native grass',c:'#A3A635'},
    {k:'patio',n:'Patio',       c:'#A8A29E'},
    {k:'path', n:'Path',        c:'#D6D3D1'},
    {k:'rock', n:'Boulder',     c:'#78716C'},
    {k:'fire', n:'Fire pit',    c:'#EA580C'},
    {k:'water',n:'Water feature',c:'#0EA5E9'},
    {k:'veg',  n:'Veg beds',    c:'#84CC16'}
  ];

  function icon(kind,color){
    var s=document.createElementNS(NS,'svg');
    s.setAttribute('viewBox','0 0 24 24');
    function add(tag,attrs){
      var e=document.createElementNS(NS,tag);
      for(var a in attrs){e.setAttribute(a,attrs[a]);}
      s.appendChild(e); return e;
    }
    if(kind==='tree'){
      add('rect',{x:11,y:14,width:2,height:8,rx:1,fill:'#6B4423'});
      add('circle',{cx:12,cy:9,r:6.5,fill:color});
      add('circle',{cx:8.5,cy:12,r:3.6,fill:color,opacity:.85});
      add('circle',{cx:15.5,cy:12,r:3.6,fill:color,opacity:.85});
    }else if(kind==='shrub'){
      add('ellipse',{cx:12,cy:15,rx:8,ry:6,fill:color});
      add('ellipse',{cx:8,cy:13,rx:4,ry:3.4,fill:color,opacity:.8});
      add('ellipse',{cx:16,cy:13,rx:4,ry:3.4,fill:color,opacity:.8});
    }else if(kind==='bed'){
      add('rect',{x:3,y:9,width:18,height:11,rx:3,fill:'#5B3A22'});
      [6,10,14,18].forEach(function(x,i){
        add('circle',{cx:x,cy:(i%2?13:16),r:2.1,fill:color});
      });
    }else if(kind==='grass'){
      [5,9,13,17,21].forEach(function(x,i){
        add('path',{d:'M'+x+' 21 q'+(i%2?2:-2)+' -7 0 -12',stroke:color,'stroke-width':2,fill:'none','stroke-linecap':'round'});
      });
    }else if(kind==='patio'){
      for(var r=0;r<3;r++){for(var c=0;c<3;c++){
        add('rect',{x:3+c*6.4,y:3+r*6.4,width:5.4,height:5.4,rx:1,fill:color});
      }}
    }else if(kind==='path'){
      add('path',{d:'M4 21 Q12 14 20 3',stroke:color,'stroke-width':6,fill:'none','stroke-linecap':'round'});
    }else if(kind==='rock'){
      add('path',{d:'M4 19 L8 8 L15 6 L20 13 L18 19 Z',fill:color});
      add('path',{d:'M8 8 L15 6 L13 13 Z',fill:'#A8A29E',opacity:.6});
    }else if(kind==='fire'){
      add('circle',{cx:12,cy:14,r:8,fill:'#57534E'});
      add('circle',{cx:12,cy:14,r:5,fill:'#1C1917'});
      add('path',{d:'M12 17 q-3 -3 0 -6 q1 2 2 2 q2 2 -2 4 Z',fill:color});
    }else if(kind==='water'){
      add('ellipse',{cx:12,cy:14,rx:9,ry:6,fill:color,opacity:.8});
      add('path',{d:'M6 13 q3 -2 6 0 t6 0',stroke:'#fff',fill:'none','stroke-width':1.4,opacity:.7});
      add('path',{d:'M6 16 q3 -2 6 0 t6 0',stroke:'#fff',fill:'none','stroke-width':1.4,opacity:.5});
    }else if(kind==='veg'){
      add('rect',{x:3,y:6,width:18,height:5,rx:1.5,fill:'#6B4423'});
      add('rect',{x:3,y:14,width:18,height:5,rx:1.5,fill:'#6B4423'});
      [6,10,14,18].forEach(function(x){
        add('circle',{cx:x,cy:8.5,r:1.5,fill:color});
        add('circle',{cx:x,cy:16.5,r:1.5,fill:color});
      });
    }
    return s;
  }

  var active=ITEMS[0].k;

  ITEMS.forEach(function(it,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='yd-tool'+(i===0?' on':'');
    b.setAttribute('data-k',it.k);
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.appendChild(icon(it.k,it.c));
    var sp=document.createElement('span');
    sp.textContent=it.n;
    b.appendChild(sp);
    b.addEventListener('click',function(){
      active=it.k;
      tools.querySelectorAll('.yd-tool').forEach(function(t){
        var on=t.getAttribute('data-k')===active;
        t.classList.toggle('on',on);
        t.setAttribute('aria-pressed',on?'true':'false');
      });
    });
    tools.appendChild(b);
  });

  var CELLS=96;
  for(var i=0;i<CELLS;i++){
    var cell=document.createElement('button');
    cell.type='button';
    cell.className='yd-cell';
    cell.setAttribute('aria-label','Yard square '+(i+1)+', empty');
    cell.addEventListener('click',function(){
      var self=this;
      if(self.dataset.k){
        self.textContent='';
        delete self.dataset.k;
        self.setAttribute('aria-label','Yard square, empty');
      }else{
        var it=ITEMS.filter(function(x){return x.k===active;})[0];
        self.textContent='';
        self.appendChild(icon(it.k,it.c));
        self.dataset.k=it.k;
        self.setAttribute('aria-label','Yard square, '+it.n);
      }
      tally();
    });
    plot.appendChild(cell);
  }

  function summary(){
    var counts={};
    plot.querySelectorAll('.yd-cell').forEach(function(c){
      if(c.dataset.k){counts[c.dataset.k]=(counts[c.dataset.k]||0)+1;}
    });
    var parts=[];
    ITEMS.forEach(function(it){
      if(counts[it.k]){parts.push(counts[it.k]+' x '+it.n);}
    });
    return parts;
  }

  function tally(){
    var parts=summary();
    countEl.innerHTML = parts.length
      ? 'Your plan: <b>'+parts.join('</b>, <b>')+'</b>'
      : 'Nothing placed yet.';
  }

  document.getElementById('ydClear').addEventListener('click',function(){
    plot.querySelectorAll('.yd-cell').forEach(function(c){
      c.textContent=''; delete c.dataset.k;
      c.setAttribute('aria-label','Yard square, empty');
    });
    tally();
  });

  document.getElementById('ydPrint').addEventListener('click',function(){ window.print(); });

  document.getElementById('ydEmail').addEventListener('click',function(){
    var parts=summary();
    var notes=document.getElementById('lg-msg');
    if(notes){
      notes.value = parts.length
        ? 'My yard plan from the planner: '+parts.join(', ')+'. Please send me a copy and what this would take.'
        : 'I tried the yard planner and would like a copy of my plan.';
    }
    var target=document.getElementById('audit');
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    var name=document.getElementById('lg-name');
    if(name) setTimeout(function(){name.focus();},650);
  });

  tally();
})();

(function(){
  var form=document.getElementById('lgForm');
  if(!form) return;
  var btn=document.getElementById('lgBtn'), msg=document.getElementById('lgMsg'), load=document.getElementById('lgLoad');
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

    var name=val('lg-name'), company=val('lg-company'), phone=val('lg-phone'), email=val('lg-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your company name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var to;
    try{ to=atob(form.getAttribute('data-x'))+String.fromCharCode(64)+atob(form.getAttribute('data-y')); }
    catch(err){ show('err','Something went wrong on our end. Please call <a href="tel:18004818638">1-800-481-8638</a>.'); return; }

    var data={Name:name,Company:company,Phone:phone,Email:email,Website:val('lg-site'),Notes:val('lg-msg'),
      _subject:'Landscape company audit request — eyetoad.com',_template:'table',_captcha:'false'};

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

