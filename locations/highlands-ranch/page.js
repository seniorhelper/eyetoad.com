
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
   {n:'Roofing',comp:73,vs:'Lighter than Denver',drv:'Ageing roofs on $685k homes, plus hail',
    note:'Covenant approval is required, so homeowners strongly prefer contractors who know the process. Publish an approval guide and you separate yourself from every competitor who has not.'},
   {n:'Exterior painting',comp:54,vs:'Notably lighter',drv:'Colour approval requirements across the community',
    note:'One of the clearest openings here. Approved colour palettes are a real homeowner question and nobody local answers it online. A single good page can own this.'},
   {n:'Windows / doors',comp:50,vs:'Notably lighter',drv:'Original windows in the older northern areas',
    note:'Homes built in the earlier phases are cycling through window replacement now. Exterior changes touch covenant rules, which again favours whoever explains the process.'},
   {n:'Fencing / decks',comp:47,vs:'Notably lighter',drv:'Covenant-governed exterior structures',
    note:'Approval is mandatory and rules are specific. Contractors who lead with compliance knowledge rather than price win these consistently.'},
   {n:'HVAC',comp:62,vs:'Lighter than Denver',drv:'Original systems reaching end of life',
    note:'Full replacement rather than repair, on homes where the better system is affordable. Explain efficiency trade-offs properly \u2014 this audience does the maths.'},
   {n:'Plumbing',comp:58,vs:'Lighter than Denver',drv:'Ageing systems plus winter freeze events',
    note:'Emergency work converts on proximity, but few plumbers hold an address inside the community. Organic Highlands Ranch visibility matters more here than the map pack alone.'},
   {n:'Electrical',comp:45,vs:'Notably lighter',drv:'Panel upgrades, EV chargers, large homes',
    note:'Affluent households with big homes and EV adoption. Genuinely under-contested, and one of the faster categories to reach page one.'},
   {n:'Landscaping / design',comp:56,vs:'Lighter than Denver',drv:'Large lots plus landscape approval rules',
    note:'Significant landscaping changes need approval, which pushes homeowners toward design-led firms. Portfolio content plus covenant knowledge is the winning combination.'},
   {n:'Remodelling',comp:64,vs:'Lighter than Denver',drv:'Older northern homes cycling through renovation',
    note:'Interiors need no covenant approval, so the sale moves faster \u2014 but the quality bar is the same. Kitchens and basements are the strongest sub-categories.'},
   {n:'Dental / orthodontics',comp:67,vs:'Comparable to Denver',drv:'Family-dense community with strong schools',
    note:'Orthodontics is especially strong given the concentration of school-age children. Competition is real, so win on parent-focused content and review depth.'},
   {n:'Medical / healthcare',comp:59,vs:'Lighter than Denver',drv:'Affluent families with strong coverage',
    note:'Elective and specialist care sells well. This audience checks credentials properly, so substantive clinical content beats promotional pages.'},
   {n:'Med spa / aesthetics',comp:61,vs:'Lighter than Denver',drv:'The highest household income in Douglas County',
    note:'Excellent demographic fit. Discount-led offers underperform badly here \u2014 lead with results, credentials and detailed treatment explanation instead.'},
   {n:'Childcare / youth',comp:44,vs:'Far lighter',drv:'A community built around families and recreation',
    note:'Four rec centres, 80+ parks and Douglas County School District. Dense, reachable family audience with very little local search competition.'},
   {n:'Tutoring / instruction',comp:40,vs:'Far lighter',drv:'High-income households investing in education',
    note:'Among the quietest fields in the community. Affluent parents actively search for tutoring, music and sports instruction, and almost nobody local competes on search.'},
   {n:'Automotive',comp:55,vs:'Lighter than Denver',drv:'Multi-car households with higher-value vehicles',
    note:'Specialist and marque-specific service outperforms general repair. Position on expertise, not on oil change pricing.'},
   {n:'Restaurant',comp:60,vs:'Lighter than Denver',drv:'Town Center and Westridge dining clusters',
    note:'Affluent diners who read reviews carefully. Profile photos, posts and review responses move faster than a site rebuild.'},
   {n:'Fitness',comp:57,vs:'Lighter than Denver',drv:'Active community \u2014 but four free rec centres compete',
    note:'Unusual dynamic: the HRCA rec centres are included with property taxes, so you are competing with free. Specialised formats \u2014 personal training, recovery, boutique \u2014 are the viable path.'},
   {n:'Legal',comp:49,vs:'Notably lighter',drv:'Established households with significant assets',
    note:'Estate planning and real estate law have real local demand. Most searches still resolve to Denver or Littleton firms, which leaves a genuine opening.'},
   {n:'Accounting / financial',comp:46,vs:'Notably lighter',drv:'The highest incomes in the county',
    note:'Complex finances, high assets, and very little local competition. Long sales cycle but the best client lifetime value of any category here.'},
   {n:'Real estate',comp:78,vs:'Heavier than most suburbs',drv:'High-value homes and strong school demand',
    note:'The most crowded category in the community by some distance. Win on sub-neighbourhood content \u2014 Backcountry, Northridge, The Villages \u2014 rather than community-wide terms.'}
  ];
  var active=0;
  function band(c){
    if(c>=72)return['Heavy','#EF4444'];
    if(c>=57)return['Moderate','#F97316'];
    if(c>=44)return['Light','#FBBF24'];
    return['Very light','#22C55E'];
  }
  function timeline(c){
    if(c>=72)return'4\u20138 months';
    if(c>=57)return'3\u20136 months';
    if(c>=44)return'2\u20134 months';
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

