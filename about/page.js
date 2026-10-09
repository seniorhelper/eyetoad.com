
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');

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
    document.body.classList.toggle('nav-open',o);
    document.body.style.overflow=o?'hidden':'';
    if(o)mobNav.scrollTop=0;
  });

  var mobClose=document.getElementById('mobClose');
  if(mobClose)mobClose.addEventListener('click',function(){burger.click();});
  mobNav.querySelectorAll('.mob-acc').forEach(function(btn){
    btn.addEventListener('click',function(){
      var grp=document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen=btn.getAttribute('aria-expanded')==='true';
      mobNav.querySelectorAll('.mob-acc').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        var g=document.getElementById(b.getAttribute('aria-controls'));
        if(g)g.classList.remove('open');
      });
      if(!isOpen){btn.setAttribute('aria-expanded','true');if(grp)grp.classList.add('open');}
    });
  });

  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);
      document.body.classList.remove('nav-open');
      document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });

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
  var AJAX='https://formsubmit.co/ajax/';
  var PLAIN='https://formsubmit.co/';
  var PHONE='1-800-481-8638';

  var form=document.getElementById('mini-cta-form');
  if(!form)return;

  var lt=document.getElementById('_mini_loadtime');
  var pu=document.getElementById('mini-page-url');
  var box=document.getElementById('mini-msg');
  var btn=document.getElementById('mini-submit');
  var last=0;
  lt.value=Date.now();
  pu.value=location.href;

  function buildAction(ajax){
    var to=form.getAttribute('data-fs')||(window.etaAddr?window.etaAddr():'');
    return (ajax?AJAX:PLAIN)+to;
  }
  function serialize(){
    var out={},els=form.elements,i,el;
    for(i=0;i<els.length;i++){
      el=els[i];
      if(!el.name||el.disabled||el.type==='submit')continue;
      out[el.name]=el.value;
    }
    return out;
  }
  function toParams(o){
    var a=[],k;
    for(k in o){if(Object.prototype.hasOwnProperty.call(o,k))a.push(encodeURIComponent(k)+'='+encodeURIComponent(o[k]));}
    return a.join('&');
  }
  function postViaIframe(data){
    try{
      var name='fs_sink_'+Date.now();
      var ifr=document.createElement('iframe');
      ifr.name=name;ifr.style.display='none';
      document.body.appendChild(ifr);
      var f=document.createElement('form');
      f.method='POST';f.action=buildAction(false);f.target=name;f.style.display='none';
      for(var k in data){
        if(!Object.prototype.hasOwnProperty.call(data,k))continue;
        var i=document.createElement('input');
        i.type='hidden';i.name=k;i.value=data[k];
        f.appendChild(i);
      }
      document.body.appendChild(f);
      f.submit();
      setTimeout(function(){try{f.remove();ifr.remove();}catch(e){}},20000);
      return true;
    }catch(e){return false;}
  }
  function send(data){
    if(!window.fetch){
      return Promise.resolve(postViaIframe(data)?'unsure':'failed');
    }
    return fetch(buildAction(true),{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
      body:toParams(data)
    }).then(function(r){
      if(r.ok)return 'sent';
      return postViaIframe(data)?'unsure':'failed';
    }).catch(function(){
      return postViaIframe(data)?'unsure':'failed';
    });
  }

  function show(kind,html){
    box.className='fcta-mini-msg show '+kind;
    box.innerHTML=html;
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    box.className='fcta-mini-msg';

    if(document.getElementById('_honey_mini').value!=='')return;
    if(document.getElementById('_contact_email_mini').value!=='')return;

    if(Date.now()-parseInt(lt.value||'0',10)<4000){
      show('err','Please take a moment before submitting.');return;
    }
    if(last&&(Date.now()-last)<60000){
      show('err','Please wait before submitting again.');return;
    }
    var name=document.getElementById('mini-name').value.trim();
    if(name.length<2||/[<>{}|\\]|https?:\/\//i.test(name)){
      show('err','Please enter a valid name.');return;
    }
    if(document.getElementById('mini-phone').value.replace(/\D/g,'').length<10){
      show('err','Please enter a valid phone number with area code.');return;
    }

    last=Date.now();
    btn.disabled=true;
    btn.textContent='Sending…';

    send(serialize()).then(function(state){
      if(state==='sent'){
        form.querySelector('.fcta-mini-row').style.display='none';
        show('ok','<strong>Got it.</strong> We will call you within one business day.');
        return;
      }
      if(state==='unsure'){
        form.querySelector('.fcta-mini-row').style.display='none';
        show('warn','<strong>Sent</strong> — but we could not confirm delivery from here. If you have not heard from us within one business day, call <a href="tel:18004818638">'+PHONE+'</a>.');
        return;
      }
      btn.disabled=false;
      btn.textContent='Call Me →';
      show('err','That did not go through, and we are not going to pretend otherwise. Please call <a href="tel:18004818638">'+PHONE+'</a>.');
    });
  });
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();

