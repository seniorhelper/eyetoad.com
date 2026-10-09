
// Header scroll shadow
const hdr=document.getElementById('hdr');
window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',window.scrollY>30),{passive:true});

// Mobile nav
const burger=document.getElementById('burger'),mobNav=document.getElementById('mobNav');
burger.addEventListener('click',()=>{const o=mobNav.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});
mobNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobNav.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded',false);document.body.style.overflow='';}));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
  q.addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-a').style.maxHeight=null;});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
  });
});

// Animated stat counters
function animateCount(el){
  const target=parseFloat(el.dataset.target),suffix=el.dataset.suffix||'',prefix=el.dataset.prefix||'';
  const isFloat=target%1!==0;const dur=1400;const start=performance.now();
  function render(v){el.textContent=prefix+(isFloat?v.toFixed(1):Math.round(v).toLocaleString('en-US'))+suffix;}
  function step(now){const p=Math.min((now-start)/dur,1);render(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);else render(target);}
  requestAnimationFrame(step);
}

// Bar fill
function fillBars(container){
  container.querySelectorAll('.bar-fill').forEach((b,i)=>{
    setTimeout(()=>{b.style.width=b.dataset.w+'%';b.classList.add('show');},i*180);
  });
}

// IntersectionObserver
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const t=e.target;
    if(t.id==='statStrip'){t.querySelectorAll('.stat-num').forEach(animateCount);io.unobserve(t);}
    if(t.id==='reviewChart'){fillBars(t);io.unobserve(t);}
  });
},{threshold:0.3});
['statStrip','reviewChart'].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el);});

// Map Pack Readiness Scorecard (agentic diagnostic)
const scQuestions=document.querySelectorAll('#scorecard .sc-q');
const scScore=document.getElementById('scScore'),scFill=document.getElementById('scFill'),scVerdict=document.getElementById('scVerdict'),scAdvice=document.getElementById('scAdvice');
const scState={}; // index -> 'yes'|'no'|undefined
scQuestions.forEach((q,i)=>{
  const yes=q.querySelector('.sc-btn.yes'),no=q.querySelector('.sc-btn.no');
  yes.addEventListener('click',()=>{scState[i]='yes';yes.classList.add('on');no.classList.remove('on');updateScore();});
  no.addEventListener('click',()=>{scState[i]='no';no.classList.add('on');yes.classList.remove('on');updateScore();});
});
function updateScore(){
  let total=0,answered=0,gaps=[];
  scQuestions.forEach((q,i)=>{
    const w=parseInt(q.dataset.w);
    if(scState[i]==='yes'){total+=w;answered++;}
    else if(scState[i]==='no'){answered++;gaps.push({i:i,w:w,label:q.querySelector('.sc-label').textContent});}
  });
  scScore.textContent=total;
  scFill.style.width=total+'%';
  if(answered<6){
    scVerdict.textContent='Answer all six to see your full score';
    scAdvice.textContent=answered+' of 6 answered. Keep going for your readiness verdict.';
    return;
  }
  // Verdict by score band
  let verdict,advice;
  // biggest gap = highest weight 'no'
  gaps.sort((a,b)=>b.w-a.w);
  const topGap=gaps.length?gaps[0].label.replace(/^\d+\.\s*/,''):null;
  if(total>=85){
    verdict='Strong — you\'re map-pack ready';
    advice='Your profile fundamentals are solid. Keep your review engine running and stay consistent. <a href="/contact/">Want to push for #1? Get a free audit →</a>';
  }else if(total>=55){
    verdict='Decent — but you\'re leaving rankings on the table';
    advice='Fix this first: "'+topGap+'" That gap is likely holding you back most. <a href="/local-seo-denver/">See how we close it →</a>';
  }else{
    verdict='At risk — competitors are taking your calls';
    advice='Start here: "'+topGap+'" Then work the rest of the steps above in order. <a href="/contact/">Or let us handle it — free audit →</a>';
  }
  scVerdict.textContent=verdict;
  scAdvice.innerHTML=advice;
}

// Smooth-scroll TOC
document.querySelectorAll('.toc a, .bc-list a').forEach(a=>{
  a.addEventListener('click',function(e){
    const href=this.getAttribute('href');
    if(href&&href.startsWith('#')){
      const tgt=document.querySelector(href);
      if(tgt){e.preventDefault();const y=tgt.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:y,behavior:'smooth'});}
    }
  });
});

