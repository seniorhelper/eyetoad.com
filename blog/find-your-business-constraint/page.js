
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');
  if(!hdr||!burger||!mobNav) return;

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
  var bar=document.getElementById('progress');
  var art=document.querySelector('.art-body');
  if(!bar||!art)return;
  var ticking=false;
  function update(){
    var rect=art.getBoundingClientRect();
    var total=art.offsetHeight-window.innerHeight;
    var done=total>0 ? (-rect.top)/total : 0;
    bar.style.width=Math.max(0,Math.min(1,done))*100+'%';
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(update);}
  },{passive:true});
  window.addEventListener('resize',update);
  update();
})();

(function(){
  var links=Array.prototype.slice.call(document.querySelectorAll('#tocList a'));
  if(!links.length)return;
  var targets=links.map(function(a){
    return document.getElementById(a.getAttribute('href').slice(1));
  }).filter(Boolean);
  if(!targets.length)return;
  var ticking=false;
  function spy(){
    var pos=window.scrollY+140, current=0;
    for(var i=0;i<targets.length;i++){
      if(targets[i].offsetTop<=pos)current=i;
    }
    links.forEach(function(a,i){a.classList.toggle('on',i===current);});
    ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(spy);}
  },{passive:true});
  window.addEventListener('resize',spy);
  spy();
})();

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

(function(){
  function buildAction(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }

  document.querySelectorAll('.cap-form').forEach(function(f){
    var lt=f.querySelector('[name="_loadtime"]');
    if(lt)lt.value=Date.now();
    var last=0;

    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var msg=f.querySelector('.cmsg');
      var btn=f.querySelector('button[type="submit"]');
      var val=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value:'';};
      var fail=function(t){msg.style.display='block';msg.style.color='#FCA5A5';msg.textContent=t;};
      msg.style.display='none';msg.textContent='';

      if(val('_honey')!==''){return;}
      if(Date.now()-Number(val('_loadtime'))<4000){return fail('Give it a moment, then send again.');}
      var now=Date.now();
      if(last&&(now-last)<60000){return fail('Please wait a moment before submitting again.');}

      var name=val('name').trim();
      if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){return fail('Please enter a valid name.');}
      if(!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email').trim())){return fail('That email address does not look right.');}
      if(val('website').trim().length<4){return fail('Add your website so we know where to look.');}

      last=now;
      btn.disabled=true;btn.textContent='Sending...';

      var fd=new FormData(f);
      fd.append('_subject', f.dataset.label||'Tap-to-Rank article — request');
      fd.append('_captcha','false');
      fd.append('_template','table');
      fd.append('page_url',location.href);

      fetch(buildAction(f.dataset.fs||(window.etaAddr?window.etaAddr():'')),{method:'POST',body:fd})
        .then(function(r){return r.ok?r.json():Promise.reject();})
        .then(function(){
          f.innerHTML='<p style="color:#fff;font-family:Fraunces,serif;font-weight:900;font-size:1.1rem;margin:0 0 6px">Got it — thank you.</p>'+
                      '<p style="color:rgba(255,255,255,.82);margin:0;font-size:.96rem;line-height:1.7">We will take a look and reply by email, usually the same business day. Check the spam folder if you do not see it.</p>';
        })
        .catch(function(){
          btn.disabled=false;btn.textContent='Send it over →';
          fail('That did not go through. Please call (720) 249-6588.');
        });
    });
  });
})();

(function(){
  var els=document.querySelectorAll('.rv');
  if(!els.length)return;
  if(!('IntersectionObserver' in window) ||
     (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    els.forEach(function(el){el.classList.add('in');});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
    });
  },{rootMargin:'0px 0px -50px 0px',threshold:.06});
  els.forEach(function(el){io.observe(el);});
})();


(function(){
  var body=document.getElementById('quizBody');
  var result=document.getElementById('quizResult');
  var bar=document.getElementById('quizBar');
  if(!body||!result||!bar)return;

  var RUNGS=[
    {id:'visibility',n:'Rung 1 of 6',t:'Do enough of the right people know you exist?',
     hint:'Think about actual inbound volume over the last month — not how it felt, how many.',
     good:'We get plenty of inquiries',weak:'Not enough people find us',
     name:'Visibility',
     lead:'Not enough of the right people know you exist. That is the top of the ladder, and it is the one rung where spending money is genuinely the right answer.',
     body:'Good news first: this is the most straightforward constraint to attack, and the fixes are well understood. The caution is that visibility is also the most <em>over</em>-diagnosed rung, precisely because it is the comfortable answer. Before you spend, confirm your close rate is decent — if it is not, you are about to buy a bigger version of a different problem.',
     todo:['Finish your Google Business Profile properly, choosing the most specific primary category available rather than a broad one.','Build a consistent review habit — volume, recency and response rate all count separately.','Set up two referral partnerships with businesses serving your customer without competing for it.','Only then consider paid traffic, and only once you know what a customer is worth to you.'],
     links:[['/local-seo-denver/','See how local search work fits together'],['/blog/how-to-get-more-google-reviews/','The review method']]},

    {id:'conversion',n:'Rung 2 of 6',t:'Do the people who find you actually contact you?',
     hint:'Roughly what share of website visitors call, submit a form or message you?',
     good:'A healthy share get in touch',weak:'They visit and leave',
     name:'Conversion',
     lead:'People are finding you and leaving without contacting anyone. Honestly? This is the best result the diagnostic can give you.',
     body:'It is the cheapest rung to fix and the fastest to show movement, because you are not buying anything — you are keeping visitors you already paid for. Average site conversion sits around 2–3%; strong ones exceed 10%. <strong>Same traffic, three times the leads, no extra ad spend.</strong> Adding traffic right now would simply mean more people leaving.',
     todo:['Test your own site on a phone, on cellular, not on office wifi. Time it honestly.','Make sure a visitor knows what you do, where you do it and what to do next within five seconds.','Put your phone number somewhere permanently visible. This is not a joke — it is a frequent finding.','Cut every form field that is not strictly necessary, and add real proof: reviews, photos of actual work, named people.'],
     links:[['/conversion-optimization/','How we approach conversion work'],['/blog/website-traffic-but-no-calls-denver/','Traffic but no calls — the full breakdown']]},

    {id:'sales',n:'Rung 3 of 6',t:'Do the people who contact you buy?',
     hint:'Of last month\u2019s inquiries, roughly what share became customers? Count, do not estimate.',
     good:'We close a healthy share',weak:'Lots of inquiries, few close',
     name:'Sales &amp; follow-up',
     lead:'Inquiries arrive and do not convert. This is the rung where "we need more leads" is most often flatly wrong — and most expensive to get wrong.',
     body:'Do the arithmetic. At a 15% close rate, <strong>85 of every 100 leads you pay for produce nothing.</strong> Doubling ad spend doubles the 85. Lifting the close rate to 30% instead doubles revenue without buying a single extra lead. The two most common causes are both free to fix: response time and follow-up depth.',
     todo:['Measure your real response time for one week. Write it down. Most owners are wrong about this by hours.','Assign inbound to one named person with a daily check, because "everyone\u2019s job" reliably becomes nobody\u2019s.','Build a follow-up sequence of at least five touches. Most sales need five; most people stop at two.','Stop sending prices without an outcome attached — a number alone is always too high.'],
     links:[['/grow-my-business/','Free answer desk — sales and follow-up'],['/blog/marketing-numbers-every-business-owner-should-know/','The numbers to track']]},

    {id:'delivery',n:'Rung 4 of 6',t:'Could you handle 50% more work next month?',
     hint:'Without quality dropping, without working evenings, without lead times stretching.',
     good:'Yes, comfortably',weak:'No — we are near capacity',
     name:'Delivery capacity',
     lead:'You are at or near capacity. Marketing is currently the wrong purchase, and this is the most dangerous rung to ignore.',
     body:'Marketing into a delivery constraint is how good companies acquire bad reputations. You win more work, deliver it worse, collect the reviews that reflect that, and damage the asset that was making visibility work in the first place. <strong>The damage outlasts the campaign by years.</strong> Fix capacity or price first — both are faster than repairing a review profile.',
     todo:['Raise prices. If demand exceeds capacity, price is the fastest lever and it improves margin at the same time.','Document your process so the work stops depending on who happens to do it.','Remove the low-value work consuming capacity without paying for it.','Subcontract overflow before hiring, because subcontracting is reversible and hiring is not.'],
     links:[['/grow-my-business/','Free answer desk — pricing and capacity'],['/blog/how-much-does-seo-cost-in-denver/','What growth costs once you are ready']]},

    {id:'retention',n:'Rung 5 of 6',t:'Do customers come back, and do they refer?',
     hint:'What share of last year\u2019s customers bought again or sent someone your way?',
     good:'Yes, regularly',weak:'Mostly one and done',
     name:'Retention',
     lead:'Customers arrive, buy once and disappear. You are refilling a leaking bucket, and new customers cost several times more than keeping existing ones.',
     body:'Here is the useful part: most churn is caused by <em>silence</em>, not dissatisfaction. Your customers did not leave in anger. They forgot, and nobody reminded them. That makes this rung unusually cheap to fix compared with buying replacements forever — and the same review system that fixes it also feeds rung one.',
     todo:['Give customers a reason and a reminder to return — seasonal service, annual check, replacement cycle. Book it at the point of sale.','Call before they need you. One hour a week, startlingly effective.','Ask for referrals specifically: "do you know one person dealing with this right now?" beats "send people my way".','Build a review request into job completion, which serves retention and visibility simultaneously.'],
     links:[['/blog/how-to-get-more-google-reviews/','Build the review habit'],['/blog/nfc-seo-ai-search-lead-funnel/','Turn repeat contact into compounding visibility']]},

    {id:'margin',n:'Rung 6 of 6',t:'After everything, does the work leave you money?',
     hint:'Not revenue — profit. After materials, your own time at a real rate, overhead and tax.',
     good:'Yes, the margin works',weak:'Busy but not much left',
     name:'Margin',
     lead:'The work is not leaving enough money behind. Until this is fixed, every other improvement makes your situation worse rather than better.',
     body:'<strong>Volume never fixes a broken margin — it multiplies it.</strong> Selling more of something unprofitable loses money faster, with more effort and more risk. This is the one rung where growth is genuinely the wrong goal, and where doing less can immediately make you better off.',
     todo:['Calculate profit by job type, by customer and by service line. Nearly every business finds a surprise here.','Raise prices. The entire increase is margin, because delivery cost does not change.','Cut the cost of delivery — rework, waste and scheduling gaps are usually the quiet killers.','Fire the unprofitable work. Painful, immediate, and it frees capacity for better jobs.'],
     links:[['/grow-my-business/','Free answer desk — pricing and margin'],['/blog/marketing-numbers-every-business-owner-should-know/','Know your numbers first']]}
  ];

  var CLEAN={
    name:'Nothing obvious — which means the constraint is you, or the market',
    lead:'All six rungs came back healthy. That is genuinely rare, and it means the limit is somewhere the ladder does not reach.',
    body:'Two candidates remain. Either <strong>you are the constraint</strong> — every decision routes through one person, so the business cannot move faster than you can think — or you have outgrown your market and need new geography, new services or a new customer segment. The test for the first one is simple: could the business run for two weeks without you?',
    todo:['Track your own time for one week, in writing. Most owners are startled by the split between $15/hour work and $500/hour work.','Delegate decisions, not tasks. Handing over a task while keeping the decision leaves the bottleneck exactly where it was.','Document before you delegate, so "they cannot do it like me" becomes "they can now".','If you are genuinely not the constraint, look at expansion: new service areas, adjacent services, or a different customer segment.'],
    links:[['/locations/','Expanding into new service areas'],['/grow-my-business/','Free answer desk']]
  };

  var idx=0, answers=[];

  function pct(){ return Math.round((idx/RUNGS.length)*100); }

  function render(){
    bar.style.width=pct()+'%';
    var r=RUNGS[idx];
    var html='<div class="quiz-step on">'+
      '<p class="quiz-n">'+r.n+'</p>'+
      '<h4>'+r.t+'</h4>'+
      '<p class="qhint">'+r.hint+'</p>'+
      '<div class="quiz-opts">'+
        '<button class="quiz-opt" type="button" data-a="good"><b>'+r.good+'</b>This stage is working well enough</button>'+
        '<button class="quiz-opt" type="button" data-a="weak"><b>'+r.weak+'</b>This is a genuine weak point</button>'+
        '<button class="quiz-opt" type="button" data-a="unsure"><b>I am not sure</b>We do not measure this — treat as needs checking</button>'+
      '</div>'+
      (idx>0?'<button class="quiz-back" type="button" id="quizBack">← Previous question</button>':'')+
    '</div>';
    body.innerHTML=html;

    body.querySelectorAll('.quiz-opt').forEach(function(b){
      b.addEventListener('click',function(){ answer(b.getAttribute('data-a')); });
    });
    var back=document.getElementById('quizBack');
    if(back)back.addEventListener('click',function(){ idx--; answers.pop(); render(); });
  }

  function answer(a){
    answers[idx]=a;
    if(a==='weak'||a==='unsure'){ finish(RUNGS[idx],a==='unsure'); return; }
    idx++;
    if(idx>=RUNGS.length){ finish(null,false); return; }
    render();
  }

  function esc(s){return String(s).replace(/[<>&]/g,function(c){return{'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});}

  function finish(r,wasUnsure){
    bar.style.width='100%';
    body.innerHTML='';
    var d = r || CLEAN;
    var html='<p class="qr-k">'+(r?'Your constraint':'Result')+'</p>'+
      '<p class="qr-name">'+d.name+'</p>'+
      '<div class="qr-body"><p>'+d.lead+'</p><p>'+d.body+'</p></div>';
    if(wasUnsure){
      html+='<div class="qr-warn"><strong>You answered “not sure” here.</strong> That is itself the finding. A stage nobody measures is a stage nobody is managing — and it is almost always where the leak turns out to be. Measure this one for thirty days before spending anywhere else.</div>';
    }
    html+='<div class="qr-do"><p class="qd-k">Start with these four</p><ol>';
    d.todo.forEach(function(t){ html+='<li>'+t+'</li>'; });
    html+='</ol></div><div class="qr-links">';
    d.links.forEach(function(l,i){
      html+='<a href="'+l[0]+'" class="'+(i===0?'qr-go':'qr-alt')+'">'+esc(l[1])+' →</a>';
    });
    html+='</div><button class="quiz-restart" type="button" id="quizRestart">↺ Start over</button>';
    result.innerHTML=html;
    result.classList.add('on');
    document.getElementById('quizRestart').addEventListener('click',function(){
      idx=0;answers=[];result.classList.remove('on');result.innerHTML='';render();
      document.getElementById('quiz').scrollIntoView({behavior:'smooth',block:'start'});
    });
  }

  render();
})();

