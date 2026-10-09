
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
  var els=document.querySelectorAll('.bp-sheet');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in-view');});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){en.target.classList.add('in-view');io.unobserve(en.target);} });
  },{threshold:.25});
  els.forEach(function(e){io.observe(e);});
})();

(function(){
  var price=document.getElementById('tPrice'), close=document.getElementById('tClose'), job=document.getElementById('tJob');
  if(!price||!close||!job) return;
  var pv=document.getElementById('tPriceV'), cv=document.getElementById('tCloseV'), jv=document.getElementById('tJobV');
  var out=document.getElementById('tOut'), math=document.getElementById('tMath');
  function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
  function calc(){
    var p=+price.value, c=+close.value/100, j=+job.value;
    pv.textContent='$'+p; cv.textContent=(+close.value)+'%'; jv.textContent=money(j);
    var leads=1/c, cost=p*leads, pct=cost/j*100;
    out.innerHTML='<span>'+money(cost)+'</span>';
    math.innerHTML='At a <b>'+(+close.value)+'%</b> close rate you buy about <b>'+leads.toFixed(1)+' leads</b> to win one job. '+
      leads.toFixed(1)+' &times; '+money(p)+' = <b>'+money(cost)+'</b> per booked job.<br>'+
      'That is <b>'+pct.toFixed(1)+'%</b> of a '+money(j)+' job spent on acquisition alone, before materials, labour or overhead &mdash; and you pay it again on the next one.';
  }
  [price,close,job].forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();

(function(){
  var start=document.getElementById('spStart'), peak=document.getElementById('spPeak');
  if(!start||!peak) return;
  var startV=document.getElementById('spStartV'), strip=document.getElementById('spStrip'), verdict=document.getElementById('spVerdict');
  var M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var FULL=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var PEAKS={spring:[2,3,4],summer:[5,6,7],fall:[8,9,10],winter:[11,0,1]};
  var LABEL={spring:'spring',summer:'summer',fall:'fall',winter:'winter'};

  function build(){
    var s=+start.value, key=peak.value, pk=PEAKS[key];
    var mapM=(s+2)%12, rankM=(s+5)%12;
    startV.textContent=FULL[s];

    strip.innerHTML='';
    for(var i=0;i<12;i++){
      var d=document.createElement('div');
      d.className='sp-m';
      var tag='';
      if(pk.indexOf(i)>-1){d.className+=' peak';}
      if(i===mapM){d.className+=' map'; tag='MAP';}
      if(i===rankM){d.className+=' rank'; tag='RANK';}
      if(i===s){d.className+=' start'; tag='START';}
      d.innerHTML=(tag?'<i>'+tag+'</i>':'')+M[i];
      strip.appendChild(d);
    }

    // months from rankings landing until the peak begins
    var peakStart=pk[0];
    var gap=(peakStart-rankM+12)%12;
    var ready = gap<=6 && gap>=0;
    var lateBy=(rankM-peakStart+12)%12;

    if(rankM===peakStart||ready){
      verdict.className='sp-verdict good';
      verdict.innerHTML='Start in <b>'+FULL[s]+'</b> and your map pack lift lands around <b>'+FULL[mapM]+'</b>, with rankings following near <b>'+FULL[rankM]+'</b> &mdash; in time for your '+LABEL[key]+' peak. <b>That is the right side of the calendar.</b>';
    }else{
      verdict.className='sp-verdict late';
      verdict.innerHTML='Start in <b>'+FULL[s]+'</b> and rankings land around <b>'+FULL[rankM]+'</b> &mdash; roughly <b>'+lateBy+' month'+(lateBy===1?'':'s')+'</b> after your '+LABEL[key]+' peak began. You would be visible for the tail of this season and properly ready for the next one. <b>Every month you wait pushes that further.</b>';
    }
  }
  start.addEventListener('input',build);
  peak.addEventListener('change',build);
  build();
})();

(function(){
  var form=document.getElementById('coForm');
  if(!form) return;
  var btn=document.getElementById('coBtn'), msg=document.getElementById('coMsg'), load=document.getElementById('coLoad');
  var t0=Date.now();
  load.value=String(t0);
  var sent=false;

  function show(kind,html){msg.className='fmsg on fmsg-'+kind;msg.innerHTML=html;}
  function val(id){var e=document.getElementById(id);return e?e.value.trim():'';}
  function badName(v){return v.length<2||/[<>{}|\\]|https?:\/\//i.test(v);}
  function badPhone(v){return v.replace(/\D/g,'').length<10;}
  function badEmail(v){return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);}

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(sent) return;
    if(form.querySelector('input[name="_honey"]').value!=='') return;
    if(Date.now()-t0<3500){show('err','Give the page a moment to finish loading, then send again.');return;}

    var name=val('co-name'), company=val('co-company'), phone=val('co-phone'), email=val('co-email');
    if(badName(name)){show('err','Please enter your name.');return;}
    if(badName(company)){show('err','Please enter your company name.');return;}
    if(badPhone(phone)){show('err','Please enter a phone number we can reach you on.');return;}
    if(badEmail(email)){show('err','That email address does not look right.');return;}

    var data={Name:name,Company:company,Trade:val('co-trade'),Phone:phone,Email:email,Website:val('co-site'),Notes:val('co-msg'),
      _subject:'Contractor audit request — eyetoad.com',_template:'table',_captcha:'false'};

    btn.disabled=true; btn.textContent='Sending...';
    show('warn','Sending your request...');

    fetch('https://formsubmit.co/ajax/'+form.getAttribute('data-fs'),{
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

