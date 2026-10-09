
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
})();
(function(){
  var answers={};
  var ARC_LEN=251.3;
  var arc=document.getElementById('gauge-arc');
  if(!arc)return;
  var needle=document.getElementById('gauge-needle');
  var gradeEl=document.getElementById('gauge-grade');
  var starsEl=document.getElementById('gauge-stars');
  var labelEl=document.getElementById('gauge-label');
  var resultBox=document.getElementById('grader-result');
  var msgEl=document.getElementById('grader-msg');

  document.querySelectorAll('.q-block').forEach(function(block){
    var q=block.getAttribute('data-q');
    block.querySelectorAll('.q-opt').forEach(function(opt){
      opt.addEventListener('click',function(){
        block.querySelectorAll('.q-opt').forEach(function(o){
          o.classList.remove('on');o.setAttribute('aria-pressed','false');
        });
        opt.classList.add('on');opt.setAttribute('aria-pressed','true');
        answers[q]=parseInt(opt.getAttribute('data-v'),10);
        update();
      });
    });
  });

  function update(){
    var keys=Object.keys(answers);
    var sum=0; keys.forEach(function(k){sum+=answers[k];});
    var maxSoFar=keys.length*2;
    var shown = maxSoFar? (sum/maxSoFar) : 0;
    arc.style.strokeDashoffset = ARC_LEN*(1-shown);
    needle.setAttribute('transform','rotate('+(-90 + shown*180)+' 100 100)');
    var grade,stars,label,col;
    if(shown>=0.85){grade='A';stars='\u2605\u2605\u2605\u2605\u2605';label='Five-star marketing';col='#16A34A';}
    else if(shown>=0.65){grade='B';stars='\u2605\u2605\u2605\u2605\u2606';label='Strong \u2014 room to grow';col='#22C55E';}
    else if(shown>=0.45){grade='C';stars='\u2605\u2605\u2605\u2606\u2606';label='Average \u2014 losing customers';col='#F5B43C';}
    else if(shown>=0.25){grade='D';stars='\u2605\u2605\u2606\u2606\u2606';label='Underperforming';col='#F97316';}
    else {grade='F';stars='\u2605\u2606\u2606\u2606\u2606';label='Costing you customers';col='#DC2626';}
    if(keys.length===0){
      gradeEl.textContent='?';starsEl.textContent='';
      labelEl.textContent='Answer below to begin';gradeEl.style.color='#101828';return;
    }
    gradeEl.textContent=grade;gradeEl.style.color=col;
    starsEl.textContent=stars;starsEl.style.color='#F5B43C';
    labelEl.textContent=label;
    if(keys.length===5){
      var msg;
      if(shown>=0.85){msg='Strong across the board. At this level the job is defending the lead \u2014 keeping reviews flowing and holding position as competitors invest.';}
      else if(shown>=0.45){msg='There is recoverable ground here. The gaps you marked lowest are usually the cheapest to fix, and often the fastest to show a return.';}
      else {msg='This is costing you customers every week \u2014 which is also the easiest situation to turn around, because almost everything is still unclaimed.';}
      msgEl.textContent=msg;
      resultBox.classList.add('show');
    }
  }
})();

(function(){
  var grid=document.getElementById('stat-grid');
  if(!grid)return;
  var done=false;
  function animate(){
    if(done)return;done=true;
    grid.querySelectorAll('.sc-num').forEach(function(el){
      var target=parseInt(el.getAttribute('data-target'),10);
      var suffix=el.getAttribute('data-suffix')||'';
      var prefix=el.getAttribute('data-prefix')||'';
      var raw=el.getAttribute('data-raw')==='1';
      if(target===0){el.innerHTML=prefix+'<span class="sc-suf">'+suffix+'</span>';return;}
      var dur=1400,start=null;
      function step(ts){
        if(!start)start=ts;
        var p=Math.min((ts-start)/dur,1);
        var ease=1-Math.pow(1-p,3);
        var val=Math.round(target*ease);
        var shown=raw? val.toString() : val.toLocaleString('en-US');
        el.innerHTML=prefix+shown+'<span class="sc-suf">'+suffix+'</span>';
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)animate();});
    },{threshold:.4}).observe(grid);
  }else{animate();}
})();

(function(){
  var inp=document.getElementById('domIdea');
  var go=document.getElementById('domGo');
  var note=document.getElementById('domNote');
  if(!inp||!go)return;
  var DEST='https://www.buyweburl.com';
  var original=note?note.innerHTML:'';

  function open_(){
    var v=(inp.value||'').trim().replace(/\s+/g,'').toLowerCase();
    function launch(){window.open(DEST,'_blank','noopener');}
    if(v && navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(v).then(function(){
        if(note){
          note.textContent='Copied \u201C'+v+'\u201D to your clipboard \u2014 paste it into the search that just opened.';
          setTimeout(function(){note.innerHTML=original;},6000);
        }
        launch();
      }).catch(launch);
    }else{launch();}
  }
  go.addEventListener('click',open_);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();open_();}});
})();

(function(){
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  var form=document.getElementById('best-form');
  if(!form)return;

  var lt=document.getElementById('_loadtime_best');
  var pu=document.getElementById('best-page-url');
  var box=document.getElementById('msg-best');
  var btn=document.getElementById('btn-best');
  var last=0;
  lt.value=Date.now();
  pu.value=location.href;

  function buildAction(ajax){
    var to=form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'');
    return (ajax?AJAX:PLAIN)+to;
  }
  function serialize(){
    var out={},els=form.elements,i,el;
    for(i=0;i<els.length;i++){
      el=els[i];
      if(!el.name||el.disabled||el.type==='submit')continue;
      out[el.name]=el.value;
    }
    return out;
  }
  function toParams(o){
    var a=[],k;
    for(k in o){if(Object.prototype.hasOwnProperty.call(o,k))a.push(encodeURIComponent(k)+'='+encodeURIComponent(o[k]));}
    return a.join('&');
  }
  function postViaIframe(data){
    try{
      var name='fs_sink_'+Date.now();
      var ifr=document.createElement('iframe');
      ifr.name=name;ifr.style.display='none';
      document.body.appendChild(ifr);
      var f=document.createElement('form');
      f.method='POST';f.action=buildAction(false);f.target=name;f.style.display='none';
      for(var k in data){
        if(!Object.prototype.hasOwnProperty.call(data,k))continue;
        var i=document.createElement('input');
        i.type='hidden';i.name=k;i.value=data[k];
        f.appendChild(i);
      }
      document.body.appendChild(f);
      f.submit();
      setTimeout(function(){try{f.remove();ifr.remove();}catch(e){}},20000);
      return true;
    }catch(e){return false;}
  }
  function send(data){
    if(!window.fetch){
      return Promise.resolve(postViaIframe(data)?'unsure':'failed');
    }
    return fetch(buildAction(true),{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
      body:toParams(data)
    }).then(function(r){
      if(r.ok)return 'sent';
      return postViaIframe(data)?'unsure':'failed';
    }).catch(function(){
      return postViaIframe(data)?'unsure':'failed';
    });
  }

  function show(kind,html){
    box.className='lf-msg show lf-msg-'+kind;
    box.innerHTML=html;
    box.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function reset(){box.className='lf-msg';box.innerHTML='';}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    reset();

    if(document.getElementById('_honey_best').value!=='')return;
    if(document.getElementById('_decoy_best').value!=='')return;

    if(Date.now()-parseInt(lt.value||'0',10)<4000){
      show('err','Please take a moment to fill out the form.');return;
    }
    if(last&&(Date.now()-last)<60000){
      show('err','Please wait a moment before submitting again.');return;
    }

    var name=document.getElementById('bf-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){
      show('err','Please enter a valid name.');return;
    }
    if(!document.getElementById('bf-industry').value){
      show('err','Please choose your industry.');return;
    }
    var site=document.getElementById('bf-website').value.trim();
    if(site.length<4){show('err','Please enter your website address.');return;}
    var phone=document.getElementById('bf-phone').value.replace(/\D/g,'');
    if(phone.length<10){show('err','Please enter a valid phone number with area code.');return;}
    var email=document.getElementById('bf-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){
      show('err','Please check that email address.');return;
    }

    last=Date.now();
    btn.disabled=true;
    btn.textContent='Sending…';

    send(serialize()).then(function(state){
      if(state==='sent'){
        form.style.display='none';
        show('ok','<strong>Sent.</strong> Thanks '+name.split(' ')[0]+" — we'll be in touch within one business day. Need it sooner? Call <a href=\"tel:18004818638\">"+PHONE+'</a>.');
        return;
      }
      if(state==='unsure'){
        form.style.display='none';
        show('warn','<strong>Sent.</strong> We could not get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a> and mention the audit form. We will find it.');
        return;
      }
      btn.disabled=false;
      btn.textContent='Get My Free Audit →';
      show('err','That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
    });
  });
})();

(function(){
  var rows = document.getElementById('lg-rows');
  if (!rows) return;
  var live = document.getElementById('lg-live'),
      out  = document.getElementById('lg-out'),
      inn  = document.getElementById('lg-in');
  var FEE = 1500;
  var NOTES = ['Onboarding call','Keyword research delivered','Monthly report','Monthly report',
    'Blog post published','Monthly report','"SEO takes time"','Monthly report',
    'Blog post published','Monthly report','"We are seeing movement"','Monthly report'];
  function money(n){ return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  var reduce=false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
  function paint(n){
    var r=document.createElement('div'); r.className='lg-r';
    r.innerHTML='<span class="lg-m">Month '+n+'</span><span class="lg-d">'+NOTES[n-1]+
                '</span><span class="lg-a">-'+money(FEE)+'</span>';
    rows.appendChild(r);
    while(rows.children.length>6) rows.removeChild(rows.firstChild);
    if(live) live.textContent='Month '+n+' of 12';
    if(out) out.textContent=money(FEE*n);
    if(inn) inn.textContent='0';
  }
  if (reduce){ for(var k=7;k<=12;k++) paint(k); return; }
  var i=0,timer=null;
  function step(){
    i++;
    if(i>12){ timer=setTimeout(function(){ rows.innerHTML=''; i=0; step(); },4200); return; }
    paint(i); timer=setTimeout(step,1100);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      en.forEach(function(e){
        if(e.isIntersecting && !timer && i===0) step();
        else if(!e.isIntersecting && timer){ clearTimeout(timer); timer=null; rows.innerHTML=''; i=0; }
      });
    },{threshold:.25});
    io.observe(rows);
  } else { step(); }
})();

(function(){
  var mo = document.getElementById('sr-mo'), len = document.getElementById('sr-len');
  if (!mo || !len) return;
  var tot = document.getElementById('sr-total'), totl = document.getElementById('sr-totall'),
      phase = document.getElementById('sr-phase'), verd = document.getElementById('sr-verdict');

  function money(n){ return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  var STAGES = [
    {by:3,  t:'<b>Months 1&ndash;3:</b> technical foundation fixed, Google Business Profile fully built out, and a written plan you can actually read.'},
    {by:6,  t:'<b>Months 3&ndash;6:</b> measurable movement &mdash; keywords climbing, impressions up, map pack position improving in your own neighbourhood.'},
    {by:12, t:'<b>Months 6&ndash;12:</b> positive return. Not just traffic &mdash; calls and inquiries you can trace back to search.'},
    {by:24, t:'<b>Year two onward:</b> compounding. The work already done keeps producing without proportional new spend.'}
  ];

  function render(){
    var m = Math.max(1, parseInt(mo.value, 10) || 0);
    var n = Math.min(120, Math.max(1, parseInt(len.value, 10) || 1));
    var total = m * n;
    tot.textContent = money(total);
    totl.textContent = 'Paid so far, over ' + n + (n === 1 ? ' month' : ' months');

    phase.innerHTML = STAGES.map(function(s){
      var reached = n >= s.by;
      var cls = reached ? 'hit' : (n >= s.by - 3 ? 'soon' : 'soon');
      var ico = reached ? '\u2713' : '\u00b7';
      return '<div class="sr-row ' + cls + '"><span class="sr-ico">' + ico + '</span>' +
             '<span class="sr-rt">' + s.t + (reached ? '' : ' <em style="color:#94A3B8;">&mdash; not yet due</em>') + '</span></div>';
    }).join('');

    var v;
    if (n <= 3){
      v = '<b>You are still inside the quiet part, and that is normal.</b> What you should be able to see right now is not rankings &mdash; it is <b>work</b>. A written plan, technical fixes shipped, your Business Profile finished. If you cannot see those after ' + n + (n===1?' month':' months') + ', that is worth a conversation today rather than in six months.';
    } else if (n <= 6){
      v = 'At ' + n + ' months and ' + money(total) + ' in, you should be seeing <b>movement you can point at</b> &mdash; not revenue yet, but keywords climbing and impressions rising in Search Console. If the reports show activity but nothing is moving, ask which specific keywords improved this month and by how much. The answer tells you most of what you need to know.';
    } else if (n <= 12){
      v = 'You have now paid <b>' + money(total) + '</b>. Past the six-month mark, the honest question stops being about rankings and becomes: <b>has the phone changed?</b> If the answer is no and nobody has explained why in plain language, that is the signal &mdash; not a reason to panic, but a reason to get a second opinion while the spend is still recoverable.';
    } else {
      v = '<b>' + money(total) + '</b>, over ' + n + ' months. At this point the engagement should be compounding &mdash; producing more each quarter from work already done. If it is producing the same as it did in month four, you are not paying for growth any more. You are paying for maintenance, at a growth price. <b>That is the moment most owners wish they had checked a year earlier.</b>';
    }
    verd.innerHTML = v;
  }
  mo.addEventListener('input', render); mo.addEventListener('change', render);
  len.addEventListener('input', render); len.addEventListener('change', render);
  render();
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

