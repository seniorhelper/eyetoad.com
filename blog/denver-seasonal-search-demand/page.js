
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');
  function measureHeader(){var r=hdr.getBoundingClientRect();mobNav.style.top=Math.max(0,r.bottom)+'px';}
  var _sc=null;window.addEventListener('scroll',function(){var s=window.scrollY>30;if(s===_sc)return;_sc=s;hdr.classList.toggle('scrolled',s);requestAnimationFrame(measureHeader);},{passive:true});
  window.addEventListener('resize',measureHeader);
  measureHeader();
  burger.addEventListener('click',function(){
    measureHeader();
    var o=mobNav.classList.toggle('open');
    burger.classList.toggle('open',o);
    burger.setAttribute('aria-expanded',o);
    document.body.style.overflow=o?'hidden':'';
  });
  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });
})();

(function(){
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
  var picks=document.getElementById('plPicks');
  if(!picks)return;
  var yearEl=document.getElementById('plYear');
  var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var FULL=['January','February','March','April','May','June','July','August','September','October','November','December'];

  var IND=[
   {n:'Roofing',        d:[15,15,30,45,80,100,70,45,50,45,25,15], driver:'Hail storms, mid-May to late June'},
   {n:'HVAC',           d:[70,55,35,30,45,85,95,80,55,90,75,80], driver:'Summer heat and the ~7 Oct first freeze'},
   {n:'Landscaping',    d:[10,15,55,85,95,90,75,65,55,40,15,10], driver:'Frost-free window, roughly Apr–Oct'},
   {n:'Auto glass',     d:[55,50,45,55,80,100,70,50,45,50,55,60], driver:'Hail, plus winter thermal cracking'},
   {n:'Plumbing',       d:[85,75,60,55,55,60,60,55,55,60,70,90], driver:'Freeze events; steady floor year-round'},
   {n:'Painting',       d:[15,20,45,75,90,90,85,80,70,50,20,15], driver:'Exterior work needs frost-free weather'},
   {n:'Med spa',        d:[65,60,80,90,95,70,55,50,55,60,85,90], driver:'Pre-summer and pre-holiday peaks'},
   {n:'Dental',         d:[70,60,55,55,55,50,50,60,65,70,85,95], driver:'Insurance benefits expiring at year end'},
   {n:'Legal',          d:[85,70,65,60,60,60,55,60,65,65,60,55], driver:'Fairly flat; January family-law lift'},
   {n:'Restaurant',     d:[45,50,60,70,85,95,100,95,80,65,60,70], driver:'Patio weather and summer tourism'}
  ];

  var active=0;

  function monthOffset(i,back){ return ((i-back)%12+12)%12; }

  function render(){
    var ind=IND[active];
    var d=ind.d;
    var peak=d.indexOf(Math.max.apply(null,d));
    var now=new Date().getMonth();

    yearEl.innerHTML='';
    for(var i=0;i<12;i++){
      var v=d[i];
      var cls = v>=85 ? 'peak' : '';
      var seoStart=monthOffset(peak,6);
      var buildWindow=[seoStart,monthOffset(peak,5),monthOffset(peak,4)];
      if(!cls && buildWindow.indexOf(i)!==-1) cls='build';
      var mo=document.createElement('div');
      mo.className='pl-mo'+(i===now?' now':'');
      mo.innerHTML='<div class="pl-bar"><div class="pl-fill '+cls+'" style="height:'+Math.max(v,6)+'%"></div></div>'+
                   '<div class="pl-mn">'+MONTHS[i]+'</div>';
      yearEl.appendChild(mo);
    }

    var seoM=monthOffset(peak,6), revM=monthOffset(peak,4), adsM=monthOffset(peak,1);
    document.getElementById('plPeak').textContent   = FULL[peak];
    document.getElementById('plSeo').textContent    = FULL[seoM];
    document.getElementById('plRev').textContent    = FULL[revM];
    document.getElementById('plAds').textContent    = FULL[adsM];
    document.getElementById('plDriver').textContent = ind.driver;

    var toPeak=((peak-now)%12+12)%12;
    var msg;
    if(toPeak===0){
      msg='It is '+FULL[now]+' \u2014 your peak month. Execute, do not experiment. Answer fast, keep paid running, and collect reviews from every job. Start next year\u2019s organic work in '+FULL[seoM]+'.';
    }else if(toPeak===1){
      msg='It is '+FULL[now]+', one month out. Paid campaigns should be live now and phones staffed. Do not rebuild anything this month.';
    }else if(toPeak<=4){
      msg='It is '+FULL[now]+', about '+toPeak+' months from your peak. Reviews and Google Business Profile work should be underway. Build paid campaigns now so they are ready to switch on.';
    }else if(toPeak<=6){
      msg='It is '+FULL[now]+'. This is your build window \u2014 content and technical SEO started now has time to rank before '+FULL[peak]+'. This is the highest-value month on your calendar.';
    }else{
      msg='It is '+FULL[now]+', roughly '+toPeak+' months out. Slow season: collect reviews from your last peak, photograph finished work, and fix the site now rather than closer to '+FULL[peak]+'.';
    }
    document.getElementById('plNow').textContent=msg;
  }

  IND.forEach(function(ind,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='pl-pick'+(i===0?' on':'');
    b.textContent=ind.n;
    b.addEventListener('click',function(){
      active=i;
      Array.prototype.forEach.call(picks.children,function(c,j){c.classList.toggle('on',j===i);});
      render();
    });
    picks.appendChild(b);
  });

  render();
})();

(function(){
  var form=document.getElementById('art-form');
  if(!form)return;
  document.getElementById('_loadtime_art').value=Date.now();
  var btn=document.getElementById('btn-art');
  var err=document.getElementById('err-art');
  var last=0;
  function show(m){err.textContent=m;err.style.display='block';}

  form.addEventListener('submit',function(e){
    err.style.display='none';
    if(document.getElementById('_honey_art').value!==''){e.preventDefault();return;}
    if(document.getElementById('_decoy_art').value!==''){e.preventDefault();return;}

    var elapsed=Date.now()-parseInt(document.getElementById('_loadtime_art').value||'0',10);
    if(elapsed<4000){e.preventDefault();show('Please take a moment to fill out the form.');return;}

    var now=Date.now();
    if(last&&(now-last)<60000){e.preventDefault();show('Please wait a moment before submitting again.');return;}

    var name=document.getElementById('ar-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();show('Please enter a valid name.');return;}

    var site=document.getElementById('ar-website').value.trim();
    if(site.length<4){e.preventDefault();show('Please enter your website address.');return;}

    var phone=document.getElementById('ar-phone').value.replace(/\D/g,'');
    if(phone.length<10){e.preventDefault();show('Please enter a valid phone number (10+ digits).');return;}

    var email=document.getElementById('ar-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){e.preventDefault();show('Please enter a valid email address.');return;}

    form.action=['https:','','formsubmit.co',form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'')].join('/');
    last=now;
    btn.disabled=true;
    btn.textContent='Sending...';
  });
})();

