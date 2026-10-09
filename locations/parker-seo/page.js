
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
   {n:'Roofing',comp:66,vs:'Much lighter than Denver',drv:'New builds ageing in, plus Front Range hail',
    note:'Strongest home services category here. Newer roofs mean less replacement today but a large warranty-age wave building. Establish now and you own it when that wave lands.'},
   {n:'HVAC',comp:58,vs:'Lighter than Denver',drv:'New construction plus the October first freeze',
    note:'Thousands of new systems installed by builders, all needing service contracts nobody has claimed yet. Maintenance agreements signed now become replacements later.'},
   {n:'Plumbing',comp:55,vs:'Lighter than Denver',drv:'Emergency demand plus continuous new build',
    note:'Emergency work converts on proximity and speed. In a town of new arrivals, being the first plumber someone finds often means being their plumber for a decade.'},
   {n:'Electrical',comp:41,vs:'Far lighter',drv:'New homes, EV chargers, finish-out work',
    note:'Genuinely under-contested. New construction plus high EV adoption in an affluent commuter town, and almost no local electricians competing on search.'},
   {n:'Landscaping / lawn',comp:44,vs:'Far lighter',drv:'New builds handed over with bare lots',
    note:'Every new home is a bare yard. This is the single most predictable demand stream in Parker, and competition has not caught up with the construction rate.'},
   {n:'Fencing / decks',comp:39,vs:'Far lighter',drv:'New builds without fencing or outdoor living',
    note:'The lowest competition of any trade here. Builders rarely include fencing or decks, so every completed home is a near-term prospect.'},
   {n:'Remodelling',comp:48,vs:'Notably lighter',drv:'Older Parker homes plus new-build upgrades',
    note:'Split market \u2014 renovation in the established areas near Mainstreet, finish-out and upgrades in the new south-west. Content covering both outperforms a single generic page.'},
   {n:'Dental / orthodontics',comp:57,vs:'Lighter than Denver',drv:'Median age 36.2 and strong Douglas County schools',
    note:'Families arriving with children and no dentist. High lifetime value because you are catching the first provider relationship, not displacing one.'},
   {n:'Medical / healthcare',comp:52,vs:'Lighter than Denver',drv:'Population growing faster than provider supply',
    note:'Provider supply lags the arrival rate here. Urgent care, family practice and paediatrics are all winnable, and new residents are actively looking.'},
   {n:'Med spa / aesthetics',comp:53,vs:'Lighter than Denver',drv:'$133,369 median household income',
    note:'Affluent enough to support premium services, young enough to want them. Two seasonal peaks \u2014 pre-summer and pre-holiday \u2014 so build rankings in the quiet months.'},
   {n:'Childcare / youth',comp:37,vs:'Far lighter',drv:'Young families arriving continuously',
    note:'The least contested category in Parker. Median age 36.2, strong schools, constant in-migration, and almost no local search competition at all.'},
   {n:'Tutoring / instruction',comp:35,vs:'Far lighter',drv:'High-income families investing in education',
    note:'Quietest field in the town. Affluent parents actively search for tutoring, music and sports instruction, and virtually nobody local competes on search.'},
   {n:'Automotive',comp:56,vs:'Lighter than Denver',drv:'Commuter town with heavy vehicle dependence',
    note:'Long daily drives from the far south-east corner mean high mileage and steady service demand. Specialisation beats generic repair terms.'},
   {n:'Auto glass',comp:50,vs:'Lighter than Denver',drv:'Hail season plus commuter highway miles',
    note:'Two peaks \u2014 hail and winter thermal cracking \u2014 and most competitors market for only one. The winter window is essentially unclaimed.'},
   {n:'Restaurant',comp:61,vs:'Lighter than Denver',drv:'Mainstreet revival and a growing population',
    note:'At least six new businesses opened on Mainstreet in a year, so competition is rising \u2014 but the downtown district is actively promoting the area. If you are on Mainstreet, use it.'},
   {n:'Retail \u2014 Mainstreet',comp:45,vs:'Notably lighter',drv:'Downtown business improvement district activity',
    note:'Downtown-specific search terms are low volume, high intent, and almost nobody optimises for them. Most Mainstreet businesses do not even mention Mainstreet on their own site.'},
   {n:'Fitness',comp:46,vs:'Notably lighter',drv:'Young, affluent, growing population',
    note:'A continuous stream of new residents shopping for a gym is a more reliable demand source than the January spike most operators plan around.'},
   {n:'Legal',comp:40,vs:'Far lighter than Denver',drv:'Growing population, few Parker-based firms',
    note:'Most Parker legal search still resolves to Denver, Lone Tree or Castle Rock firms. A genuinely Parker-based practice with proper local signals has a wide-open field.'},
   {n:'Accounting / financial',comp:43,vs:'Far lighter',drv:'High incomes and new-homeowner financial needs',
    note:'New homeowners with $133k median income and fresh mortgages have immediate needs. Long sales cycle, excellent lifetime value, minimal competition.'},
   {n:'Real estate',comp:74,vs:'Comparable to Denver',drv:'High transaction volume from continuous growth',
    note:'The most crowded category in Parker by a wide margin, because the growth attracts agents. Win on neighbourhood content \u2014 Stonegate, Canterberry, Pradera \u2014 not town-wide terms.'}
  ];
  var active=0;
  function band(c){
    if(c>=70)return['Heavy','#EF4444'];
    if(c>=54)return['Moderate','#F97316'];
    if(c>=42)return['Light','#FBBF24'];
    return['Very light','#22C55E'];
  }
  function timeline(c){
    if(c>=70)return'4\u20137 months';
    if(c>=54)return'3\u20135 months';
    if(c>=42)return'2\u20134 months';
    return'6\u201310 weeks';
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

