
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
   {n:'Roofing',comp:74,vs:'Lighter than Denver',drv:'Mature roofs plus Front Range hail',
    note:'Replacement rather than new-build work, which means bigger tickets and a homeowner who actually researches. Your estimate documentation and review text matter more here than your ad spend.'},
   {n:'HVAC',comp:68,vs:'Lighter than Denver',drv:'Ageing systems in mature housing stock',
    note:'A built-out city means a steady stream of systems hitting end of life. Publish honest replace-vs-repair content — this audience is deciding between the two and will reward whoever explains it straight.'},
   {n:'Plumbing',comp:64,vs:'Lighter than Denver',drv:'Older pipework plus winter freeze events',
    note:'Emergency work still converts on proximity, so the two-county citation fix matters disproportionately. Clean that up before spending on anything else.'},
   {n:'Electrical',comp:51,vs:'Notably lighter',drv:'Panel upgrades, EV chargers, older wiring',
    note:'Mature housing plus an affluent, technically literate buyer means panel and service upgrades sell well. Genuinely under-contested locally.'},
   {n:'Landscaping',comp:55,vs:'Lighter than Denver',drv:'Established yards needing renovation, not install',
    note:'Different job to a growth suburb: redesign and maintenance rather than first install. Longer client relationships and higher lifetime value if you position for it.'},
   {n:'Remodelling',comp:63,vs:'Lighter than Denver',drv:'Older housing stock plus high household income',
    note:'One of the strongest fits in the city. Mature homes, $100,272 median income and a research-driven buyer make this a content-led win — portfolios and process explanations beat price claims.'},
   {n:'Dental',comp:66,vs:'Comparable to Denver',drv:'Stable population with established provider relationships',
    note:'Hardest category to switch people in, because dental loyalty is sticky. Win it on review depth and on being visibly better at explaining treatment than the incumbent.'},
   {n:'Medical / clinic',comp:58,vs:'Lighter than Denver',drv:'42.3% degree-holding population researching providers',
    note:'This audience reads credentials and comparison content properly. Practices publishing substantive material consistently outrank those running thin service pages.'},
   {n:'Chiropractic',comp:47,vs:'Notably lighter',drv:'Older median age and desk-based commuters',
    note:'Under-contested and well suited to the demographic. Educational content converts unusually well because the audience wants to understand the treatment before booking.'},
   {n:'Automotive',comp:62,vs:'Comparable to Denver',drv:'Stable car ownership across a spread-out city',
    note:'Loyalty is strong in auto repair, so switching needs a reason. Specialisation beats generic repair terms — pick a niche and own it rather than competing on "mechanic near me".'},
   {n:'Auto glass',comp:56,vs:'Lighter than Denver',drv:'Hail season plus winter thermal cracking',
    note:'Two peaks a year, and most competitors only market for one. The winter cracking window is almost entirely unclaimed.'},
   {n:'Restaurant',comp:69,vs:'Lighter than Denver',drv:'Downtown Westminster and the Promenade',
    note:'The Downtown Westminster redevelopment is creating genuinely new search volume in an otherwise flat city. Profile photos and posts move faster here than a site rebuild.'},
   {n:'Salon / med spa',comp:60,vs:'Lighter than Denver',drv:'Affluent, older-skewing, research-driven clientele',
    note:'Higher median age plus $100k+ income suits premium aesthetic services. Before-and-after proof and detailed treatment explanations outperform discount offers with this audience.'},
   {n:'Fitness',comp:52,vs:'Lighter than Denver',drv:'Stable membership base, low churn',
    note:'Flat population means fewer new prospects but stickier members. Compete on specialisation and community rather than on trial offers.'},
   {n:'Legal',comp:43,vs:'Far lighter than Denver',drv:'Few firms genuinely based in Westminster',
    note:'The clearest open field in the city. Most Westminster legal search still resolves to Denver or Boulder firms — a genuinely local practice with proper signals can own this quickly.'},
   {n:'Accounting / financial',comp:45,vs:'Far lighter',drv:'High income, high education, complex needs',
    note:'Affluent, educated households with real financial complexity, and almost no local SEO competition. Long sales cycle but exceptional client lifetime value.'},
   {n:'Real estate',comp:72,vs:'Comparable to Denver',drv:'Turnover within a stable housing stock',
    note:'Crowded, and flat population means fewer transactions overall. Win on neighbourhood-level content — Standley Lake, Church Ranch, Downtown Westminster — rather than city-wide terms.'}
  ];
  var active=0;
  function band(c){
    if(c>=72)return['Heavy','#EF4444'];
    if(c>=58)return['Moderate','#F97316'];
    if(c>=46)return['Light','#FBBF24'];
    return['Very light','#22C55E'];
  }
  function timeline(c){
    if(c>=72)return'5\u20139 months';
    if(c>=58)return'4\u20137 months';
    if(c>=46)return'3\u20135 months';
    return'2\u20134 months';
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

