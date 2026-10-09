
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
  var picks=document.getElementById('oppPicks');
  if(!picks)return;
  var IND=[
   {n:'Roofing',comp:78,vs:'Much lighter than Denver',drv:'Hail plus 22.9% growth in housing stock',
    note:'The most contested trade here because storm work draws national lead generators. You win Thornton roofing on review volume and speed of response, not on outspending them.'},
   {n:'HVAC',comp:66,vs:'Lighter than Denver',drv:'New builds plus the first hard freeze each October',
    note:'Newer northern developments mean warranty-age systems coming due. Get ranked before October — furnace searches spike on the first genuinely cold night and there is no time to react.'},
   {n:'Plumbing',comp:62,vs:'Lighter than Denver',drv:'Year-round emergency demand plus January freezes',
    note:'Emergency searches convert immediately and rarely involve comparison shopping, so map pack position matters more here than almost anywhere. Proximity across all five ZIPs is the whole game.'},
   {n:'Electrical',comp:48,vs:'Notably lighter',drv:'New construction and EV charger installs',
    note:'Genuinely under-contested in Thornton. Few local electricians have invested in local SEO, so this is one of the faster categories to reach page one.'},
   {n:'Landscaping',comp:52,vs:'Lighter than Denver',drv:'New homes with unfinished yards',
    note:'North Thornton growth means thousands of new builds with bare lots. Start ranking by winter — landscaping searches begin in March and rankings take three to six months.'},
   {n:'Remodelling',comp:57,vs:'Lighter than Denver',drv:'Ageing 80229 housing stock plus young owners upgrading',
    note:'Split market: renovation demand in the older south, finish-out demand in the north. Content covering both corridors outperforms a single generic service page.'},
   {n:'Dental',comp:59,vs:'Lighter than Denver',drv:'Median age 34.7 — young families choosing a first dentist',
    note:'High lifetime value because you are catching families forming a first provider relationship. Reviews matter disproportionately since new residents have nobody to ask.'},
   {n:'Medical / clinic',comp:54,vs:'Lighter than Denver',drv:'Population growth outpacing local provider supply',
    note:'Health care is the second largest employment sector among residents, but provider supply lags the growth curve. Urgent care and specialist clinics are especially winnable.'},
   {n:'Chiropractic',comp:44,vs:'Notably lighter',drv:'31-minute commutes and a construction-heavy workforce',
    note:'Long commutes and 7,752 residents working in construction create real demand. Competition is thin, so this is one of the quickest wins in the city.'},
   {n:'Automotive',comp:64,vs:'Comparable to Denver',drv:'31-minute average commute each way',
    note:'Everyone drives here and the corridors are busy, so competition is real. Differentiate on specialisation rather than trying to rank for generic repair terms.'},
   {n:'Auto glass',comp:58,vs:'Lighter than Denver',drv:'Front Range hail plus winter thermal cracking',
    note:'Two demand peaks, not one. Most operators only market for hail season and ignore the winter cracking spike entirely — that gap is yours to take.'},
   {n:'Restaurant',comp:71,vs:'Lighter than Denver',drv:'The 120th Avenue corridor and RTD N Line foot traffic',
    note:'Busy corridor, lots of competitors, but very few doing local SEO properly. Google Business Profile photos and posts move the needle faster here than a website rebuild.'},
   {n:'Salon / med spa',comp:61,vs:'Lighter than Denver',drv:'Young, above-median-income households',
    note:'A $103,088 median household income supports premium services. Two peaks a year — pre-summer and pre-holiday — so build rankings in the quiet months.'},
   {n:'Fitness',comp:49,vs:'Notably lighter',drv:'Median age 34.7 and continuous new arrivals',
    note:'New residents shopping for a gym is a recurring, predictable demand stream. January is the spike but the year-round trickle of arrivals is bigger than most owners realise.'},
   {n:'Legal',comp:46,vs:'Far lighter than Denver',drv:'Population base with few Thornton-based firms',
    note:'Most Adams County legal search still resolves to Denver firms. A genuinely Thornton-based practice with proper local signals has an unusually open field.'},
   {n:'Childcare',comp:41,vs:'Far lighter',drv:'Young families and a 31-minute commute',
    note:'The least contested category we see in Thornton. Young households plus long commutes plus almost no local SEO competition makes this a fast win.'}
  ];
  var active=0;

  function band(c){
    if(c>=72)return['Heavy','#EF4444'];
    if(c>=58)return['Moderate','#F97316'];
    if(c>=46)return['Light','#FBBF24'];
    return['Very light','#22C55E'];
  }
  function timeline(c){
    if(c>=72)return'4\u20138 months';
    if(c>=58)return'3\u20136 months';
    if(c>=46)return'2\u20134 months';
    return'6\u201312 weeks';
  }
  function render(){
    var i=IND[active], b=band(i.comp);
    document.getElementById('oppComp').textContent=b[0]+' ('+i.comp+'/100)';
    document.getElementById('oppVs').textContent=i.vs;
    document.getElementById('oppTime').textContent=timeline(i.comp);
    document.getElementById('oppDrv').textContent=i.drv;
    document.getElementById('oppNote').textContent=i.note;
    var bar=document.getElementById('oppBar');
    bar.style.width=i.comp+'%';
    bar.style.background='linear-gradient(90deg,'+b[1]+',#FDE68A)';
  }
  IND.forEach(function(ind,i){
    var btn=document.createElement('button');
    btn.type='button';
    btn.className='opp-pick'+(i===0?' on':'');
    btn.textContent=ind.n;
    btn.addEventListener('click',function(){
      active=i;
      Array.prototype.forEach.call(picks.children,function(c,j){c.classList.toggle('on',j===i);});
      render();
    });
    picks.appendChild(btn);
  });
  render();
})();

(function(){
  var form=document.getElementById('loc-form');
  if(!form)return;
  document.getElementById('_loadtime_loc').value=Date.now();
  var btn=document.getElementById('btn-loc');
  var err=document.getElementById('err-loc');
  var last=0;
  function show(m){err.textContent=m;err.style.display='block';}

  form.addEventListener('submit',function(e){
    err.style.display='none';
    if(document.getElementById('_honey_loc').value!==''){e.preventDefault();return;}
    if(document.getElementById('_decoy_loc').value!==''){e.preventDefault();return;}

    var elapsed=Date.now()-parseInt(document.getElementById('_loadtime_loc').value||'0',10);
    if(elapsed<4000){e.preventDefault();show('Please take a moment to fill out the form.');return;}

    var now=Date.now();
    if(last&&(now-last)<60000){e.preventDefault();show('Please wait a moment before submitting again.');return;}

    var name=document.getElementById('lf-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){e.preventDefault();show('Please enter a valid name.');return;}

    var site=document.getElementById('lf-website').value.trim();
    if(site.length<4){e.preventDefault();show('Please enter your website address.');return;}

    var phone=document.getElementById('lf-phone').value.replace(/\D/g,'');
    if(phone.length<10){e.preventDefault();show('Please enter a valid phone number (10+ digits).');return;}

    var email=document.getElementById('lf-email').value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){e.preventDefault();show('Please enter a valid email address.');return;}

    form.action=['https:','','formsubmit.co',form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'')].join('/');
    last=now;
    btn.disabled=true;
    btn.textContent='Sending...';
  });
})();

