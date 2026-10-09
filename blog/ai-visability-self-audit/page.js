
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
  document.querySelectorAll('.prompt-copy').forEach(function(b){
    b.addEventListener('click',function(){
      var txt=b.getAttribute('data-p')||'';
      function done(){var o=b.textContent;b.textContent='Copied \u2713';b.classList.add('done');
        setTimeout(function(){b.textContent=o;b.classList.remove('done');},1800);}
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(done).catch(function(){});
      }else{
        var ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.left='-9999px';
        document.body.appendChild(ta);ta.select();
        try{document.execCommand('copy');done();}catch(e){}
        document.body.removeChild(ta);
      }
    });
  });
})();

(function(){
  var body=document.getElementById('scBody');
  if(!body)return;
  var items=Array.prototype.slice.call(body.querySelectorAll('.sc-item'));
  var scoreEl=document.getElementById('scScore');
  var barEl=document.getElementById('scBar');
  var bandEl=document.getElementById('scBand');
  var diagEl=document.getElementById('scDiag');

  var MAX=items.reduce(function(a,i){return a+parseInt(i.getAttribute('data-pts'),10);},0);

  var BANDS=[
    {min:90,name:'Strong',d:'You are doing the work most businesses skip. Protect it: keep reviews flowing and refresh key pages quarterly.'},
    {min:70,name:'Solid, with gaps',d:'The foundation is there. Close the unticked items above and you will likely start appearing in answers where you currently do not.'},
    {min:45,name:'Partially visible',d:'You are probably named occasionally but inconsistently. The unticked access and entity items are almost certainly why.'},
    {min:20,name:'Mostly invisible',d:'AI systems have little to work with. Start at the top of the list — crawler access and entity consistency — before writing anything new.'},
    {min:0, name:'Invisible',d:'Right now there is almost nothing for an AI to use. The good news is that the first three fixes are cheap and fast.'}
  ];

  function render(){
    var got=0;
    items.forEach(function(i){
      if(i.classList.contains('on')) got+=parseInt(i.getAttribute('data-pts'),10);
    });
    var pct=Math.round(got/MAX*100);
    scoreEl.textContent=pct;
    barEl.style.width=pct+'%';
    var band=BANDS.find(function(b){return pct>=b.min;});
    bandEl.textContent=band.name+' \u2014 '+got+' of '+MAX+' points';
    diagEl.textContent=band.d;
  }

  items.forEach(function(i){
    function toggle(){
      var on=i.classList.toggle('on');
      i.setAttribute('aria-checked',on?'true':'false');
      render();
    }
    i.addEventListener('click',toggle);
    i.addEventListener('keydown',function(e){
      if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}
    });
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

