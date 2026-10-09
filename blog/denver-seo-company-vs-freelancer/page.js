
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

// Animated stat counters (supports prefix + suffix + thousands)
function animateCount(el){
  const target=parseFloat(el.dataset.target),suffix=el.dataset.suffix||'',prefix=el.dataset.prefix||'';
  const isFloat=target%1!==0;const dur=1400;const start=performance.now();
  function render(v){
    const num=isFloat?v.toFixed(1):Math.round(v).toLocaleString('en-US');
    el.textContent=prefix+num+suffix;
  }
  function step(now){
    const p=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-p,3);
    render(target*eased);
    if(p<1)requestAnimationFrame(step);else render(target);
  }
  requestAnimationFrame(step);
}

// Cost bar fill
function fillBars(container){
  container.querySelectorAll('.cost-fill, .bar-fill').forEach((b,i)=>{
    setTimeout(()=>{b.style.width=b.dataset.w+'%';b.classList.add('show');},i*180);
  });
}

// IntersectionObserver triggers
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const t=e.target;
    if(t.id==='statStrip'){t.querySelectorAll('.stat-num').forEach(animateCount);io.unobserve(t);}
    if(t.id==='costChart'){fillBars(t);io.unobserve(t);}
  });
},{threshold:0.3});
['statStrip','costChart'].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el);});

// Decision tool
const dtAnswers={budget:null,market:null,scope:null,risk:null};
const dtBig=document.getElementById('dtBig'),dtNote=document.getElementById('dtNote'),dtResult=document.getElementById('dtResult');
document.querySelectorAll('#dtool .dt-q').forEach(q=>{
  const key=q.dataset.q;
  q.querySelectorAll('.dt-opt').forEach(opt=>{
    opt.addEventListener('click',()=>{
      q.querySelectorAll('.dt-opt').forEach(o=>o.classList.remove('sel'));
      opt.classList.add('sel');
      dtAnswers[key]=opt.dataset.val;
      updateDtool();
    });
  });
});
function updateDtool(){
  const vals=Object.values(dtAnswers);
  const answered=vals.filter(v=>v!==null).length;
  if(answered<4){
    dtResult.classList.remove('ready');
    dtBig.textContent='Answer the questions above';
    dtNote.textContent='Tap one option in each question to see which path fits your business. ('+answered+' of 4 answered)';
    return;
  }
  dtResult.classList.add('ready');
  const companyScore=vals.filter(v=>v==='company').length;
  if(companyScore>=3){
    dtBig.textContent='A full SEO company';
    dtNote.innerHTML='Your answers point to a competitive market and a need for full-service, reliable growth. A team-based company is likely your best fit. <a href="/contact/">Get a free audit →</a>';
  }else if(companyScore<=1){
    dtBig.textContent='A freelancer (to start)';
    dtNote.innerHTML='Your needs look narrow and budget-conscious. A skilled freelancer is a smart first step — you can always scale to a team later. <a href="/contact/">Want a second opinion? →</a>';
  }else{
    dtBig.textContent='Either could work';
    dtNote.innerHTML='You are right on the line. Start with whichever fits your budget now, but plan to scale toward a team as you grow. <a href="/contact/">Talk it through with us →</a>';
  }
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

