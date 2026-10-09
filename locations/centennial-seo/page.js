
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
   {n:'Roofing',comp:70,vs:'Lighter than Denver',drv:'High property values plus Front Range hail',
    note:'Replacement work on expensive homes, so ticket sizes are large. This buyer reads the estimate properly \u2014 document your scope and materials rather than competing on price.'},
   {n:'HVAC',comp:64,vs:'Lighter than Denver',drv:'Mature homes with high-spec systems',
    note:'Full system replacement rather than patch repairs. Publish honest replace-vs-repair content; a $128k median income household will choose the better system if you explain why.'},
   {n:'Plumbing',comp:60,vs:'Lighter than Denver',drv:'Older housing stock plus winter freeze events',
    note:'Emergency work converts on proximity, which makes the citation fix critical here. Half the Centennial plumbers we audit are listed under Englewood or Littleton and lose the map pack because of it.'},
   {n:'Electrical',comp:49,vs:'Notably lighter',drv:'Panel upgrades, EV chargers, home automation',
    note:'Affluent, technically literate households with big homes. EV charger and panel upgrade demand is strong and almost nobody local is competing for it properly.'},
   {n:'Landscaping / design',comp:57,vs:'Lighter than Denver',drv:'Large lots and established properties',
    note:'Design and renovation rather than first install, on larger lots than the north metro. Portfolio content outperforms service-list pages decisively with this audience.'},
   {n:'Remodelling',comp:66,vs:'Lighter than Denver',drv:'High home values justifying major projects',
    note:'One of the best fits in the city. Kitchens, baths and basements on homes where the investment makes sense. Process transparency and real project galleries close these.'},
   {n:'Dental / orthodontics',comp:68,vs:'Comparable to Denver',drv:'Older affluent households plus Cherry Creek families',
    note:'Elective and cosmetic work sells here in a way it does not in cheaper suburbs. Orthodontics especially \u2014 strong schools mean a steady pipeline of teenagers.'},
   {n:'Medical / healthcare',comp:61,vs:'Lighter than Denver',drv:'Median age 41.8 with high income',
    note:'Specialist and elective care is the sweet spot. This audience researches credentials properly, so substantive clinical content beats promotional pages every time.'},
   {n:'Med spa / aesthetics',comp:63,vs:'Lighter than Denver',drv:'Affluent, older-skewing clientele',
    note:'Excellent demographic fit \u2014 the money and the motivation are both here. Before-and-after proof and detailed treatment explanation outperform discount offers.'},
   {n:'Chiropractic / PT',comp:46,vs:'Notably lighter',drv:'Older population with active lifestyles',
    note:'Under-contested and well matched to the demographic. Educational content converts unusually well because this audience wants to understand the treatment first.'},
   {n:'Automotive',comp:59,vs:'Lighter than Denver',drv:'High vehicle values and multi-car households',
    note:'Specialist and European marque service does far better here than general repair. Position on expertise for specific makes rather than competing on oil changes.'},
   {n:'Restaurant',comp:65,vs:'Lighter than Denver',drv:'The Streets at SouthGlenn and Arapahoe Road',
    note:'Affluent diners who read reviews carefully before choosing. Profile photos, posts and review responses move faster here than a website rebuild.'},
   {n:'Fitness',comp:50,vs:'Lighter than Denver',drv:'Health-conscious, higher-income households',
    note:'Premium and specialised formats do well \u2014 personal training, boutique studios, recovery. Budget gym positioning struggles in this market.'},
   {n:'Legal',comp:52,vs:'Lighter than Denver',drv:'Established households with real assets',
    note:'Estate planning, real estate and business law all have genuine local demand. Many Centennial legal searches still resolve to Denver firms, which leaves an opening.'},
   {n:'Accounting / financial',comp:48,vs:'Notably lighter',drv:'High income, complex finances, Tech Center proximity',
    note:'Excellent fit. Affluent households with real complexity, plus a business client base next door. Long sales cycle but exceptional lifetime value.'},
   {n:'Real estate',comp:75,vs:'Comparable to Denver',drv:'High-value housing stock and school-district demand',
    note:'Crowded and competitive. Win on neighbourhood-level content \u2014 Southglenn, Smoky Hill, the Cherry Creek district boundaries \u2014 rather than city-wide terms.'},
   {n:'B2B / commercial',comp:38,vs:'Far lighter than Denver',drv:'Adjacency to the Denver Tech Center corridor',
    note:'The quietest open field in the metro. Most B2B firms near the Tech Center run on referrals and outbound with no local SEO at all \u2014 yet decision-makers absolutely do search.'},
   {n:'IT / managed services',comp:42,vs:'Far lighter',drv:'Dense office corridor within a short drive',
    note:'Real demand, almost no local search competition. Businesses searching for IT support in this corridor find national providers because nobody local has bothered to rank.'}
  ];
  var active=0;
  function band(c){
    if(c>=72)return['Heavy','#EF4444'];
    if(c>=58)return['Moderate','#F97316'];
    if(c>=44)return['Light','#FBBF24'];
    return['Very light','#22C55E'];
  }
  function timeline(c){
    if(c>=72)return'4\u20138 months';
    if(c>=58)return'3\u20136 months';
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

