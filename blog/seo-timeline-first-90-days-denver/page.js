
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

// Growth curve draw
function drawCurve(){
  document.getElementById('curveSeo').classList.add('draw');
  document.getElementById('curvePpc').classList.add('draw');
  document.getElementById('curveArea').classList.add('draw');
  document.querySelectorAll('.curve-dot').forEach((d,i)=>setTimeout(()=>d.classList.add('draw'),700+i*250));
}
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    if(e.target.id==='curveChart'){drawCurve();io.unobserve(e.target);}
  });
},{threshold:0.35});
const cc=document.getElementById('curveChart');if(cc)io.observe(cc);

// 90-Day Timeline Simulator (agentic)
const simState={site:null,comp:null};
document.querySelectorAll('#sim .sim-q').forEach(q=>{
  const key=q.dataset.q;
  q.querySelectorAll('.sim-opt').forEach(opt=>{
    opt.addEventListener('click',()=>{
      q.querySelectorAll('.sim-opt').forEach(o=>o.classList.remove('sel'));
      opt.classList.add('sel');
      simState[key]=opt.dataset.val;
      runSim();
    });
  });
});
function runSim(){
  const out=document.getElementById('simOut');
  if(!simState.site||!simState.comp){return;}
  out.classList.add('ready');

  // base pace per starting point (relative fill % for each phase)
  const siteBase={
    'new':       [25,40,55],
    'established':[35,58,75],
    'seo':       [45,68,88]
  }[simState.site];
  // competition multiplier
  const compMul={'low':1.12,'med':1.0,'high':0.82}[simState.comp];

  const f=siteBase.map(v=>Math.min(Math.round(v*compMul),100));
  document.getElementById('smf1').style.width=f[0]+'%';
  document.getElementById('smf2').style.width=f[1]+'%';
  document.getElementById('smf3').style.width=f[2]+'%';

  // phase text adapts to inputs
  const t1=document.getElementById('smt1'),t2=document.getElementById('smt2'),t3=document.getElementById('smt3');
  t1.textContent='Audit, technical fixes, roadmap';
  if(simState.site==='new'){
    t2.textContent='Indexing begins; impressions slowly appear';
    t3.textContent='A few long-tail rankings; trust still building';
  }else if(simState.site==='established'){
    t2.textContent='Impressions rising on optimized pages';
    t3.textContent='Long-tail rankings; ~10–25% traffic lift';
  }else{
    t2.textContent='Impressions climbing; faster indexing';
    t3.textContent='Several rankings; ~20–30% traffic lift';
  }

  // verdict
  let v='';
  const newSite=simState.site==='new', high=simState.comp==='high', low=simState.comp==='low';
  if(newSite&&high){
    v='You\'re on the <b>patient path</b>. A new site in a tough market may need 6–12 months for real traction (the "sandbox"). The first 90 days build a foundation and a few long-tail wins. Stay consistent — it compounds. <a href="/contact/">See your real plan →</a>';
  }else if(low&&!newSite){
    v='You\'re on the <b>fast lane</b>. An established site in a low-competition market can move quickly — even 4–8 weeks on some terms, with strong 90-day momentum. Local SEO can win within weeks. <a href="/local-seo-denver/">Move faster with local →</a>';
  }else if(simState.site==='seo'){
    v='You\'ve got a <b>head start</b>. With prior SEO work, you build on existing authority, so expect clearer 90-day movement and a real traffic lift by day 90. <a href="/contact/">Accelerate it →</a>';
  }else{
    v='You\'re on the <b>standard arc</b>. Foundation in month one, rising impressions in month two, and early rankings plus a modest traffic lift by month three. Biggest gains arrive months 6–12. <a href="/contact/">Get your timeline →</a>';
  }
  document.getElementById('simVerdict').innerHTML=v;
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

