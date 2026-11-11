/* Clay Toad v2 (Nov 10 2026): the claymation Toad who sits bottom-right on every page.
   Loaded by eta-hdr.js after the page has finished loading (never blocks paint, LCP or input).
   - One sprite (/media/toad/toad-clay-v2.webp), 10 frames: idle, blink, open, half, oh, crouch, air, swimA, swimB, wave.
   - First page of a visit: Toad swims in across a glassy water band at the bottom of the screen, hops out,
     waves, and the water evaporates. Later pages: Toad is just there (state carries across pages).
   - X closes Toad: Toad ducks below the edge with only the eyes peeking out. Tap the eyes to bring Toad back.
     Closed is remembered for 7 days.
   - Says different things per page and per action (scroll, idle, leaving), does small tricks, runs a 3-tap
     package finder, and offers a human expert (call, or ask in chat; the chat shows "Call Zach").
   - Lip sync: window.ehClayLevel(v) is called by eta-hdr.js with Toad's live voice level (0..1).
   - prefers-reduced-motion: no intro, no tricks, no bob; bubbles and buttons still work. */
(function(){
  if(window.ehClay)return;window.ehClay=1;
  var dock=document.querySelector('.eh-dock');if(!dock)return;
  var root=document.documentElement,body=document.body,W=window;
  var R=W.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var SP='/media/toad/toad-clay-v2.webp',NF=10;
  var F={idle:0,blink:1,open:2,half:3,oh:4,crouch:5,air:6,swimA:7,swimB:8,wave:9};
  var PHONE='1-800-481-8638',TEL='tel:18004818638';
  var path=location.pathname.replace(/index\.html$/,'');

  /* ---------- state: closed (7 days, localStorage) + visit state (sessionStorage) ---------- */
  function rd(s,k){try{return JSON.parse(s.getItem(k))||{};}catch(e){return {};}}
  function wr(s,k,v){try{s.setItem(k,JSON.stringify(v));}catch(e){}}
  var LS=rd(localStorage,'etaToad'),SS=rd(sessionStorage,'etaToadS');
  SS.seen=SS.seen||[];SS.pages=(SS.pages||0)+1;wr(sessionStorage,'etaToadS',SS);
  function saveS(){wr(sessionStorage,'etaToadS',SS);}
  var closed=LS.closed&&(Date.now()-LS.closed<7*864e5);

  /* ---------- styles ---------- */
  var pos=function(i){return (i*100/(NF-1))+'% 0';};
  var css=''+
  '.eh-dock.eh-clay{background:none;padding:0;border-radius:50%;box-shadow:none;width:92px;height:92px;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px))}'+
  '.eh-toad .eh-dock.eh-clay{opacity:1;transform:none;pointer-events:auto}'+
  '.eh-toad-off .eh-dock.eh-clay{opacity:0!important;transform:translateY(120%)!important;pointer-events:none!important}'+
  '.eh-dock.eh-clay canvas{position:absolute;width:1px;height:1px;opacity:0}'+
  '.eh-clay::before{content:"";position:absolute;left:16%;right:16%;bottom:3%;height:11%;border-radius:50%;background:radial-gradient(closest-side,rgba(16,24,40,.4),rgba(16,24,40,0))}'+
  '.eh-clay .eh-ct{position:absolute;inset:0;transform-origin:50% 92%;animation:ehClayBreathe 3.4s ease-in-out infinite}'+
  '.eh-clay .eh-cs,.eh-sw .eh-cs,.eh-cpeek .eh-cs{position:absolute;inset:0;background:url('+SP+') no-repeat 0 0/'+(NF*100)+'% 100%;filter:drop-shadow(0 5px 6px rgba(16,24,40,.3))}'+
  '.eh-clay:focus-visible,.eh-cx:focus-visible,.eh-cpeek:focus-visible,.eh-cb button:focus-visible,.eh-cb a:focus-visible{outline:3px solid #FACC15;outline-offset:2px}'+
  '@keyframes ehClayBreathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,.97)}}'+
  /* close X */
  '.eh-cx{position:fixed;z-index:999;right:calc(10px + env(safe-area-inset-right,0px));bottom:calc(84px + env(safe-area-inset-bottom,0px));width:26px;height:26px;border-radius:50%;border:0;background:#101828;color:#fff;font:700 15px/26px system-ui,sans-serif;text-align:center;padding:0;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);opacity:0;transition:opacity .2s;pointer-events:none}'+
  '.eh-toad .eh-cx{opacity:.85;pointer-events:auto}.eh-cx:hover{opacity:1}.eh-perch .eh-cx{opacity:0!important;pointer-events:none!important}'+
  '.eh-perch .eh-clay::after{content:"Tap me to talk";opacity:1;transform:none;top:auto;bottom:100%;right:auto;left:50%;margin:0 0 4px -50px;width:100px;text-align:center;font-size:12px;padding:6px 8px}'+
  /* peeking eyes when closed */
  '.eh-cpeek{position:fixed;z-index:998;right:calc(18px + env(safe-area-inset-right,0px));bottom:0;width:84px;height:30px;border:0;padding:0;background:none;cursor:pointer;overflow:hidden;transform:translateY(110%);transition:transform .45s cubic-bezier(.3,1.5,.5,1)}'+
  '.eh-cpeek .eh-cs{inset:auto 0 -54px 0;height:84px;filter:none}'+
  '.eh-toad-off .eh-cpeek{transform:none}.eh-toad-off .eh-cpeek:hover{transform:translateY(-6px)}'+
  /* speech bubble */
  '.eh-cb{position:fixed;z-index:999;right:calc(112px + env(safe-area-inset-right,0px));bottom:calc(58px + env(safe-area-inset-bottom,0px));width:290px;max-width:calc(100vw - 130px);background:#fff;color:#101828;border-radius:16px;padding:12px 14px 12px;box-shadow:0 14px 36px rgba(16,24,40,.28);font:500 14.5px/1.4 Outfit,system-ui,sans-serif;opacity:0;transform:translateY(8px) scale(.96);transform-origin:100% 100%;transition:opacity .2s,transform .25s cubic-bezier(.3,1.4,.5,1);pointer-events:none}'+
  '.eh-cb.on{opacity:1;transform:none;pointer-events:auto}'+
  '.eh-cb::after{content:"";position:absolute;right:-7px;bottom:22px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-radius:2px}'+
  '.eh-cb p{margin:0 18px 0 0}.eh-cb .eh-cbx{position:absolute;top:4px;right:6px;border:0;background:none;color:#667085;font:700 18px/1 system-ui;cursor:pointer;padding:4px}'+
  '.eh-cb .eh-cbo{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}'+
  '.eh-cb .eh-cbo button,.eh-cb .eh-cbo a{font:600 13px/1.2 Outfit,system-ui,sans-serif;border-radius:999px;padding:8px 12px;min-height:34px;cursor:pointer;text-decoration:none;border:1.5px solid #1D4ED8;background:#fff;color:#1D4ED8}'+
  '.eh-cb .eh-cbo .pri{background:#1D4ED8;color:#fff}'+
  '.eh-cb .eh-cbo a.lnk{border:0;padding:8px 2px;text-decoration:underline;color:#1D4ED8}'+
  /* water intro */
  '.eh-sw{position:fixed;z-index:996;left:0;top:0;pointer-events:none;will-change:transform}'+
  '.eh-drop{position:fixed;z-index:999;width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#7DD3FC 60%,#0284C7);pointer-events:none}'+
  '.eh-bbl{position:fixed;z-index:999;border-radius:50%;border:2px solid rgba(125,211,252,.95);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.9),rgba(186,230,253,.25) 40%,rgba(255,255,255,0) 70%);pointer-events:none}'+
  /* phones and tablets: Toad sits right, just above the bottom bar, a little smaller */
  '@media (max-width:1060px){'+
    'html.eh-toad .eh-dock.eh-clay,html.eh-toad-off .eh-dock.eh-clay{display:block!important;width:66px;height:66px;right:calc(6px + env(safe-area-inset-right,0px));bottom:calc(70px + env(safe-area-inset-bottom,0px))}'+
    '.eh-cx{width:24px;height:24px;line-height:24px;right:calc(2px + env(safe-area-inset-right,0px));bottom:calc(126px + env(safe-area-inset-bottom,0px))}'+
    '.eh-cpeek{bottom:calc(60px + env(safe-area-inset-bottom,0px));width:66px;height:24px;z-index:997}.eh-cpeek .eh-cs{height:66px;bottom:-42px}'+
    '.eh-cb{right:calc(8px + env(safe-area-inset-right,0px));bottom:calc(146px + env(safe-area-inset-bottom,0px));width:min(300px,calc(100vw - 24px));max-width:none;font-size:14px}'+
    '.eh-cb::after{right:26px;bottom:-6px}'+
  '}'+
  '@media (prefers-reduced-motion:reduce){.eh-clay .eh-ct{animation:none!important}.eh-cb,.eh-cpeek,.eh-cx{transition:none}}'+
  '@media print{.eh-cb,.eh-cx,.eh-cpeek,.eh-wcv,.eh-sw{display:none!important}}';
  var st=document.createElement('style');st.id='eh-clay2';st.textContent=css;document.head.appendChild(st);

  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}

  /* ---------- the dock Toad ---------- */
  dock.classList.add('eh-clay');
  var ct=dock.querySelector('.eh-ct'),cs;
  if(!ct){ct=el('span','eh-ct');cs=el('span','eh-cs');ct.appendChild(cs);ct.setAttribute('aria-hidden','true');dock.appendChild(ct);}else{cs=ct.querySelector('.eh-cs');}

  /* frame picker: pose (tricks) > mouth (talking) > hover smile > blink > idle */
  var pose=null,mouth=0,blinkOn=false,hovering=false,talking=false;
  var MOUTH=[F.idle,F.half,F.open,F.oh];
  function render(){
    var i=pose!=null?pose:mouth?MOUTH[mouth]:hovering&&!talking?F.open:blinkOn?F.blink:F.idle;
    cs.style.backgroundPosition=pos(i);
  }
  dock.addEventListener('mouseenter',function(){hovering=true;render();});
  dock.addEventListener('mouseleave',function(){hovering=false;render();});

  /* blink now and then (sometimes twice) */
  function blink(){if(pose!=null||mouth)return;blinkOn=true;render();setTimeout(function(){blinkOn=false;render();},130);}
  (function loop(){setTimeout(function(){if(!document.hidden){blink();if(Math.random()<.25)setTimeout(blink,260);}loop();},2600+Math.random()*3400);})();

  /* lip sync: live voice level from eta-hdr.js; hold each shape >=80ms for a stop-motion feel */
  var lastSet=0,lastLv=0,prevV=0,flap=0;
  function shape(n){if(n===mouth)return;var t=Date.now();if(t-lastSet<80)return;lastSet=t;mouth=n;render();}
  W.ehClayLevel=function(v){lastLv=Date.now();var n=v<.07?0:v<.3?1:(v>prevV+.05&&v<.75&&Math.random()<.45?3:2);prevV=v;shape(n);};
  function talk(on){
    talking=on;
    if(on&&!flap){flap=setInterval(function(){if(Date.now()-lastLv>300)shape([0,1,2,2,3,1][Math.floor(Math.random()*6)]);},130);}
    else if(!on&&flap){clearInterval(flap);flap=0;lastSet=0;shape(0);}
  }
  var talkT=0;function talkFor(ms){if(root.classList.contains('eh-talk'))return;talk(true);clearTimeout(talkT);talkT=setTimeout(function(){if(!root.classList.contains('eh-talk'))talk(false);},ms);}
  new MutationObserver(function(){var t=root.classList.contains('eh-talk');if(t)talk(true);else if(!talkT||talking&&!flap)talk(false);else if(talking&&Date.now()-lastLv<400)talk(false);})
    .observe(root,{attributes:true,attributeFilter:['class']});

  /* ---------- tricks ---------- */
  function anim(node,frames,ms,ease){return node.animate?node.animate(frames,{duration:ms,easing:ease||'ease-in-out'}):null;}
  function dockCenter(){var r=dock.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,w:r.width};}
  function drops(x,y,n){if(R)return;for(var i=0;i<n;i++){var d=el('span','eh-drop');d.style.left=x+'px';d.style.top=y+'px';body.appendChild(d);
    var a=Math.PI*(1.1+Math.random()*.8),v=40+Math.random()*60,dx=Math.cos(a)*v,dy=Math.sin(a)*v;
    var an=anim(d,[{transform:'translate(0,0)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px)',opacity:1,offset:.5},{transform:'translate('+dx*1.4+'px,'+(dy+70)+'px)',opacity:0}],700+Math.random()*300,'cubic-bezier(.2,.6,.4,1)');
    (function(d){setTimeout(function(){d.remove();},1100);})(d);}}
  function bubbles(x,y,n){if(R)return;for(var i=0;i<n;i++){var s=8+Math.random()*16,b=el('span','eh-bbl');b.style.width=b.style.height=s+'px';b.style.left=(x-30+Math.random()*60)+'px';b.style.top=(y+Math.random()*20)+'px';body.appendChild(b);
    anim(b,[{transform:'translate(0,0) scale(.4)',opacity:0},{opacity:1,offset:.15},{transform:'translate('+(Math.random()*40-20)+'px,-'+(90+Math.random()*90)+'px) scale(1)',opacity:0}],1400+Math.random()*900,'ease-out');
    (function(b){setTimeout(function(){b.remove();},2400);})(b);}}
  function hop(){
    if(R)return;pose=F.crouch;render();
    setTimeout(function(){pose=F.air;render();anim(ct,[{transform:'translateY(0)'},{transform:'translateY(-38px) scale(.96,1.06)'},{transform:'translateY(0)'}],520,'cubic-bezier(.3,.0,.5,1)');},140);
    setTimeout(function(){pose=F.crouch;render();},640);setTimeout(function(){pose=null;render();},780);
  }
  function backflip(){
    if(R)return;var c=dockCenter();pose=F.crouch;render();
    setTimeout(function(){pose=F.air;render();bubbles(c.x,c.y,10);
      anim(ct,[{transform:'translateY(0) rotate(0)'},{transform:'translateY(-80px) rotate(-180deg)',offset:.45},{transform:'translateY(-40px) rotate(-330deg)',offset:.75},{transform:'translateY(0) rotate(-360deg)'}],950,'cubic-bezier(.35,0,.4,1)');},160);
    setTimeout(function(){pose=F.crouch;render();drops(c.x,c.y+c.w*.35,12);},1110);
    setTimeout(function(){pose=null;render();},1280);
  }
  function wave(ms){pose=F.wave;render();setTimeout(function(){pose=null;render();},ms||1600);}
  dock.addEventListener('pointerdown',function(){hop();});

  /* ---------- bubble ---------- */
  var cb=el('div','eh-cb');cb.setAttribute('role','status');cb.setAttribute('aria-live','polite');body.appendChild(cb);
  var cbT=0,cbHover=false,lastSay=0,saidHere=0;
  cb.addEventListener('mouseenter',function(){cbHover=true;clearTimeout(cbT);});
  cb.addEventListener('mouseleave',function(){cbHover=false;cbT=setTimeout(hideB,5000);});
  function hideB(){cb.classList.remove('on');}
  function chatOpen(){var p=document.getElementById('ehChat');return p&&!p.hidden;}
  function openChat(q){hideB();if(!chatOpen())dock.click();if(q&&W.ETABrain&&W.ETABrain.ask)setTimeout(function(){W.ETABrain.ask(q);},450);}
  /* say({text, opts:[{t, href|fn, pri, lnk}], ms, force}) */
  var PH=innerWidth<1061;
  function hdrTalking(){var h=document.getElementById('ehSay');return h&&h.classList.contains('on');}
  var forceNext=0;
  function say(o,tries){
    if(forceNext){o.force=1;forceNext=0;}
    if(closed||chatOpen())return false;
    if(hdrTalking()&&!o.force){tries=tries||0;if(tries<6)setTimeout(function(){say(o,tries+1);},2500);return true;}
    cb.innerHTML='';
    var x=el('button','eh-cbx','&times;');x.type='button';x.setAttribute('aria-label','Hide message');x.onclick=hideB;cb.appendChild(x);
    var p=el('p');p.textContent=o.text;cb.appendChild(p);
    if(o.opts&&o.opts.length){var bx=el('div','eh-cbo');o.opts.forEach(function(op){
      var b;if(op.href){b=el('a',op.lnk?'lnk':op.pri?'pri':'');b.href=op.href;b.textContent=op.t;if(op.tel)b.setAttribute('aria-label',op.t);}
      else{b=el('button',op.pri?'pri':'');b.type='button';b.textContent=op.t;b.onclick=function(){forceNext=1;op.fn();};}
      bx.appendChild(b);});cb.appendChild(bx);}
    cb.classList.add('on');lastSay=Date.now();saidHere++;
    talkFor(Math.min(4200,400+o.text.length*38));
    clearTimeout(cbT);if(!cbHover)cbT=setTimeout(hideB,PH?Math.min(o.ms||9000,o.ask?30000:9000):(o.ms||(o.opts&&o.opts.length?16000:9000)));
    return true;
  }
  /* one line per id per visit */
  function sayOnce(id,o){if(SS.seen.indexOf(id)>=0)return false;if(say(o)){SS.seen.push(id);saveS();return true;}return false;}

  /* ---------- human expert + package finder ---------- */
  var HUMAN=[{t:'Call '+PHONE,href:TEL,tel:1,pri:1},{t:'Talk to Toad',fn:function(){voice();}},{t:'Have a person call me',fn:function(){openChat('I would like a human marketing and SEO expert to call me, please.');}},{t:'Chat with Toad',fn:function(){openChat();}}];
  function human(){say({text:'I can connect you with a real human marketing and SEO expert. Call now, or tell me here and I\'ll get someone on the phone for you if one\'s available.',opts:HUMAN});}
  var A=SS.ans||{};
  function ask(q,opts,key,next){say({ask:1,text:q,opts:opts.map(function(o){return {t:o[0],fn:function(){A[key]=o[1];SS.ans=A;saveS();next();}};}),ms:30000});}
  function finder(){
    ask('Let\'s find your fit. What do you want most?',[['More calls from Google','calls'],['Show up in AI answers','ai'],['A new website','web'],['All of it','all']],'goal',function(){
      ask('How many locations?',[['1','1'],['2 to 3','3'],['More than 3','many']],'loc',function(){
        ask('Roughly what monthly budget feels right?',[['Under $300','lo'],['$300 to $1,000','mid'],['$1,000 to $5,000','k'],['$5,000+','hi'],['Not sure','ns']],'bud',result);});});
  }
  function result(){
    var t,o=[];
    if(A.goal==='web'){t='Start with a custom website built for SEO from day one, so it rings your phone. Pair it with Starter SEO ($500/mo) when you\'re ready to grow.';o.push({t:'See website design',href:'/custom-website-design/',pri:1});}
    else if(A.goal==='ai'){t='Start with an AI visibility check (are ChatGPT, Gemini and AI Overviews naming you?), then the AIO SEO system to fix what they miss.';o.push({t:'AI visibility check',href:'/ai-visibility-audit/',pri:1},{t:'AIO SEO system',href:'/aio-seo-system/'});}
    else if(A.bud==='lo'){t='Fix-It: $100 per task. One foundational fix at a time (tracking, forms, tappable phone), done in 24 to 72 hours. Stops the leaks first.';}
    else if(A.bud==='mid'){t='Starter: $500/month. One service or one area, done properly, with a plain-English report every month.';}
    else if(A.loc==='many'){t='Enterprise & Global: quoted to your market. Many markets, many keywords, AI agents and custom tools.';}
    else if(A.bud==='hi'){t='Dominance: $7,500/month + $750 once. Up to three locations in the map pack, with AI answers checked and fixed up front.';}
    else if(A.bud==='k'&&(A.goal==='all'||A.loc==='3')){t='Market Leader: $4,300/month. Built for crowded categories (legal, medical, home services): more pages, aggressive map-pack work and conversion fixes.';}
    else {t='Local Growth: $2,000/month. Website SEO and your Google Business Profile worked together. A strong start for most local service businesses.';}
    if(!o.length)o.push({t:'See the package',href:'/seo-packages/#packages',pri:1},{t:'Build my custom plan',href:'/seo-packages/#plan'});
    o.push({t:'Free 15-min consult',href:'/seo-packages/#consult'});
    o.push({t:'Talk to a human expert',fn:human});
    say({ask:1,text:t+' Want a human expert to fine-tune it with you?',opts:o,ms:40000});
  }

  /* ---------- what Toad says, by page ---------- */
  var JOKES=['I\'d tell you an SEO joke, but you\'d have to go to page 2 of Google to find it.','I don\'t croak. I convert.','Why did the toad hire an SEO? Nobody could find its lily pad.','How can we make your business smile today?'];
  function voice(){hideB();var m=document.getElementById('ehMouth');if(m&&root.classList.contains('eh-ai')){m.click();}else openChat();}
  var TALK={t:'Talk to Toad',fn:voice};
  var PICK={t:'Help me pick',fn:finder,pri:1};
  var P=[
    {re:/^\/seo-packages\//,trick:'flip',arrive:{id:'pk',text:'Want me to help you customize the perfect package? Three quick taps and I\'ll suggest one.',opts:[{t:'Yes, help me',fn:finder,pri:1},{t:'Talk to a human',fn:human}]}},
    {re:/^\/match\//,trick:'hop',arrive:{id:'match',text:'Grab an EARTH ticket and we triple your SEO work. Want me to explain how it works?',opts:[{t:'How does it work?',fn:function(){openChat('How does the EARTH ticket triple SEO offer work?');},pri:1},PICK]}},
    {re:/(web-design|website-design|law-firm-website|web-design-and-development|product-design)/,arrive:{id:'web',text:'Want a website that actually rings your phone? We build sites with SEO baked in from day one.',opts:[{t:'Website design',href:'/custom-website-design/',pri:1},PICK]}},
    {re:/(aio|ai-search|ai-visibility|generative-engine|ai-seo|ai-agents|ai-chatbot|ai-marketing|ai-readiness)/,arrive:{id:'aio',text:'AI answers are the new page one. Want to know if ChatGPT, Gemini and AI Overviews mention you?',opts:[{t:'Free AI visibility check',href:'/ai-visibility-audit/',pri:1},PICK]}},
    {re:/(pricing|seo-a-la-carte|what-you-get|marketing-subscription)/,arrive:{id:'price',text:'Prices make more sense with a plan. Three quick questions and I\'ll suggest one.',opts:[{t:'Let\'s do it',fn:finder,pri:1},{t:'Talk to a human',fn:human}]}},
    {re:/^\/(contact|contact-us)\//,arrive:{id:'contact',text:'Prefer a real person? Call '+PHONE+', or tell me and I\'ll connect you with a human expert if one\'s available.',opts:HUMAN}},
    {re:/^\/blog\//,arrive:null,scroll:{id:'blog',text:'Rather have this done for you than read about it? That\'s literally our job.',opts:[PICK,{t:'See packages',href:'/seo-packages/'}]}},
    {re:/^\/$/,arrive:{id:'home',text:'Want more calls from Google and AI search? I can point you to the right plan in three quick taps, or just talk to me.',opts:[PICK,TALK]}}
  ];
  var CROSS=[
    {id:'lock',text:'Own your industry in your state: the big banners on USABusinessSearch.com (and COBusinessList.com in Colorado), one business per industry.',opts:[{t:'Industry Lockdown',href:'/seo-packages/#lockdown',pri:1}]},
    {id:'pr',text:'Got news? We write press releases and send them across our PR sites, so you show up in more places people (and AI) look.',opts:[{t:'Ask about PR',fn:function(){openChat('Tell me about your press release writing and distribution.');},pri:1}]},
    {id:'dom',text:'Need the perfect domain? We own 600+ ready-to-use names (fence, roofing, real estate, travel and more). If you don\'t see one you like, I\'ll help you find it.',opts:[{t:'Browse domains',href:'https://bestdomainsforbusiness.com/',pri:1},{t:'Ask Toad',fn:function(){openChat('Do you have a domain name for my kind of business?');}}]},
    {id:'tv',text:'As seen on TV: grab an EARTH ticket and we triple your SEO.',opts:[{t:'See the offer',href:'/match/',pri:1}]},
    {id:'hum',text:'Psst: I can connect you directly with a human marketing and SEO expert. Just say the word and I\'ll get someone on the phone if one\'s available.',opts:HUMAN}
  ];
  var rule=null;for(var i=0;i<P.length;i++)if(P[i].re.test(path)){rule=P[i];break;}
  function canTalk(){return !PH&&!closed&&!chatOpen()&&!cb.classList.contains('on')&&Date.now()-lastSay>22000&&saidHere<4&&!document.hidden;}
  function nextCross(){for(var i=0;i<CROSS.length;i++){var c=CROSS[(SS.pages+i)%CROSS.length];if(SS.seen.indexOf(c.id)<0)return c;}return null;}
  function arrive(){
    if(!rule||!rule.arrive){return;}
    var a=rule.arrive;
    if(rule.trick==='flip')backflip();else if(rule.trick==='hop')hop();
    setTimeout(function(){sayOnce(a.id,a);},rule.trick?1300:0);
  }

  /* actions: scroll depth, idle, leaving (desktop) */
  var scrolled=false,idleT=0,lastAct=Date.now();
  addEventListener('scroll',function(){lastAct=Date.now();
    if(scrolled)return;var h=document.documentElement.scrollHeight-innerHeight;if(h>0&&scrollY/h>.55){scrolled=true;
      setTimeout(function(){if(!canTalk())return;if(rule&&rule.scroll)sayOnce(rule.scroll.id,rule.scroll);else{var c=nextCross();if(c)sayOnce(c.id,c);}},600);}},{passive:true});
  ['pointerdown','keydown','mousemove','touchstart'].forEach(function(e){addEventListener(e,function(){lastAct=Date.now();},{passive:true});});
  setInterval(function(){
    if(Date.now()-lastAct>28000&&canTalk()){lastAct=Date.now();
      var r=Math.random();if(r<.4){backflip();setTimeout(function(){say({text:JOKES[Math.floor(Math.random()*JOKES.length)],opts:[PICK]});},1300);}
      else{hop();var c=nextCross();if(c)setTimeout(function(){sayOnce(c.id,c);},700);}
    }},5000);
  var left=false;
  document.addEventListener('mouseout',function(e){if(left||e.relatedTarget||e.clientY>8||innerWidth<1061)return;if(!canTalk()&&!(Date.now()-lastSay>8000))return;left=true;
    wave(1400);say({text:'Before you hop off: want a human SEO expert to call you? No pressure, just answers.',opts:HUMAN});});

  /* ---------- perch on the open chat box: Toad stays visible (and lip-synced) while you chat or talk ---------- */
  var perched=false;
  function perch(){
    var pn=document.getElementById('ehChat');if(!pn||pn.hidden||closed){unperch();return;}
    var r=pn.getBoundingClientRect(),w=dock.offsetWidth||92;
    dock.style.cssText='left:'+Math.max(4,r.left-w*.35)+'px;top:'+Math.max(4,r.top-w*.82)+'px;right:auto;bottom:auto;z-index:1002';
    perched=true;root.classList.add('eh-perch');hideB();
  }
  function unperch(){if(!perched)return;perched=false;dock.style.cssText='';root.classList.remove('eh-perch');}
  new MutationObserver(function(){if(root.classList.contains('eh-chat-open'))requestAnimationFrame(perch);else unperch();}).observe(root,{attributes:true,attributeFilter:['class']});
  addEventListener('resize',function(){if(perched)perch();},{passive:true});
  dock.addEventListener('click',function(e){if(perched){e.preventDefault();e.stopImmediatePropagation();voice();}},true);

  /* ---------- close / bring back ---------- */
  var cx=el('button','eh-cx','&times;');cx.type='button';cx.setAttribute('aria-label','Close Toad');body.appendChild(cx);
  var pk=el('button','eh-cpeek');pk.type='button';pk.setAttribute('aria-label','Bring back Toad, our AI assistant');pk.appendChild(el('span','eh-cs'));body.appendChild(pk);
  var pkcs=pk.firstChild;
  function setClosed(v){
    closed=v;LS.closed=v?Date.now():0;wr(localStorage,'etaToad',LS);
    root.classList.toggle('eh-toad-off',v);root.classList.toggle('eh-toad',!v);
    if(v){hideB();pkcs.style.backgroundPosition=pos(F.idle);}
  }
  cx.onclick=function(){setClosed(true);pk.focus({preventScroll:true});};
  pk.onclick=function(){setClosed(false);hop();setTimeout(function(){wave(1300);say({text:'I\'m back! I\'m here if you need me.',opts:[TALK,PICK,{t:'Talk to a human',fn:human}]});},700);dock.focus({preventScroll:true});};
  /* peeking eyes blink and glance */
  setInterval(function(){if(!closed)return;pkcs.style.backgroundPosition=pos(F.blink);setTimeout(function(){pkcs.style.backgroundPosition=pos(F.idle);},140);},4200);
  var bar=document.querySelector('.eh-bar-toad');if(bar)bar.addEventListener('click',function(){if(closed)setClosed(false);},true);

  /* ---------- intro: swim in across glassy water, hop out, wave, water evaporates ---------- */
  function showNow(){root.classList.add('eh-toad');}
  function greet(){
    wave(1800);
    sayOnce('hello',{text:'Hi, I\'m Toad! I\'m here if you need me. As seen on TV: grab an EARTH ticket and we triple your SEO.',opts:[{t:'See the 3x SEO offer',href:'/match/',pri:1},TALK,PICK],ms:14000});
  }
  function intro(){
    SS.intro=1;saveS();
    /* Physics water on two canvases (back behind Toad, front over Toad): a slow backflip dive with a real
       splash (surface springs + droplets that fall back in), a swim with wake and wobbling glassy bubbles,
       a climb out with drips, a hop to the corner, then the water evaporates into steam. ~9 s, then removed. */
    var phone=innerWidth<1061,size=phone?92:124,dpr=Math.min(devicePixelRatio||1,1.5);
    var barEl=document.querySelector('.eh-bar'),bar=phone&&barEl?Math.round(barEl.getBoundingClientRect().height):0;
    var W=innerWidth,H=phone?120:160,lvl=phone?40:52,VH=innerHeight,top0=VH-bar-H;
    function cv(z){var c=el('canvas','eh-wcv');c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);c.style.cssText='position:fixed;left:0;bottom:'+bar+'px;width:'+W+'px;height:'+H+'px;pointer-events:none;z-index:'+z;c.setAttribute('aria-hidden','true');body.appendChild(c);var g=c.getContext('2d');g.scale(dpr,dpr);return {c:c,g:g};}
    var back=cv(995),front=cv(997);
    var sw=el('div','eh-sw'),scs=el('span','eh-cs');sw.appendChild(scs);sw.setAttribute('aria-hidden','true');sw.style.width=sw.style.height=size+'px';body.appendChild(sw);
    function frame(i){scs.style.backgroundPosition=pos(i);}
    var N=Math.ceil(W/8)+1,hh=new Float32Array(N),vv=new Float32Array(N);
    function poke(x,f,spread){var i=Math.round(x/8);for(var k=-spread;k<=spread;k++){var j=i+k;if(j>=0&&j<N)vv[j]+=f*(1-Math.abs(k)/(spread+1));}}
    function surf(x){var i=Math.max(0,Math.min(N-1,Math.round(x/8)));return lvl+hh[i];}
    var drops=[],bubs=[],pops=[],steam=[];
    function splash(x,n,pw){for(var i=0;i<n;i++){var a=-Math.PI/2+(Math.random()-.5)*1.5,s=pw*(.45+Math.random()*.7);drops.push({x:x+(Math.random()-.5)*30,y:lvl-2,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:1.6+Math.random()*3.4});}}
    function bubble(x,y,big){bubs.push({x:x,y:y,r:(big?3:1.5)+Math.random()*(big?5:3),vy:-(28+Math.random()*50),ph:Math.random()*6,f:3+Math.random()*3,a:2+Math.random()*3});}
    var last=0,alpha=0,phase='in',ph0=0,done=false,hop0=null;
    var x0=W*(phone?.10:.12),x1=x0+(phone?70:130),xEnd=W-size*.5-(phone?70:150),swimDur=Math.max(2600,Math.min(4400,(xEnd-x1)*3.4));
    var tx=x0,ty=top0-(phone?190:250),rot=0,lastWake=0,lastBub=0,k=0;
    function place(sc){sw.style.transform='translate('+(tx-size/2)+'px,'+(ty-size/2)+'px) rotate('+rot+'deg)'+(sc?' scale('+sc+')':'');}
    frame(F.air);sw.style.opacity='0';place();
    function ease(p){return p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;}
    function surfPath(g,off){g.beginPath();for(var j=0;j<N;j++){var yy=lvl+hh[j]+off;j?g.lineTo(j*8,yy):g.moveTo(0,yy);}}
    function drawWater(g,isFront,t){
      g.clearRect(0,0,W,H);
      if(alpha>0){
        g.save();g.globalAlpha=alpha;
        g.beginPath();g.moveTo(0,H);g.lineTo(0,lvl+hh[0]);for(var i=1;i<N;i++)g.lineTo(i*8,lvl+hh[i]);g.lineTo(W,H);g.closePath();
        var gr=g.createLinearGradient(0,lvl-10,0,H);
        if(isFront){gr.addColorStop(0,'rgba(186,230,253,.30)');gr.addColorStop(.35,'rgba(56,189,248,.30)');gr.addColorStop(1,'rgba(3,105,161,.55)');}
        else{gr.addColorStop(0,'rgba(125,211,252,.55)');gr.addColorStop(.5,'rgba(14,116,144,.70)');gr.addColorStop(1,'rgba(8,47,73,.85)');}
        g.fillStyle=gr;g.fill();
        if(!isFront){
          g.save();g.clip();g.globalCompositeOperation='lighter';
          for(var c=0;c<5;c++){g.beginPath();var yb=lvl+18+c*((H-lvl)/5);for(var x=0;x<=W;x+=16){var y=yb+Math.sin(x*.018+t*.0014*(c%2?1:-1)+c)*6+Math.sin(x*.041+t*.002+c*2)*3;x?g.lineTo(x,y):g.moveTo(x,y);}g.strokeStyle='rgba(224,242,254,'+(.10-c*.012)+')';g.lineWidth=5-c*.6;g.stroke();}
          g.restore();
        } else {
          surfPath(g,0);g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=2;g.stroke();
          surfPath(g,7);g.strokeStyle='rgba(255,255,255,.22)';g.lineWidth=5;g.stroke();
          for(var q=0;q<7;q++){var gx=((t*.03*(q%2?1:-1)+q*W/7)%W+W)%W;g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(gx,surf(gx)+3,10+q%3*4,1.6,0,0,7);g.fill();}
          for(var b=0;b<bubs.length;b++){var u=bubs[b],bx=u.x+Math.sin(u.ph+t*.001*u.f)*u.a;
            var rg=g.createRadialGradient(bx-u.r*.3,u.y-u.r*.3,u.r*.1,bx,u.y,u.r);rg.addColorStop(0,'rgba(255,255,255,.05)');rg.addColorStop(.75,'rgba(186,230,253,.18)');rg.addColorStop(1,'rgba(255,255,255,.7)');
            g.fillStyle=rg;g.beginPath();g.arc(bx,u.y,u.r,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1;g.stroke();
            g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.arc(bx-u.r*.38,u.y-u.r*.4,Math.max(.8,u.r*.22),0,7);g.fill();}
          for(var p=0;p<pops.length;p++){var o=pops[p];g.strokeStyle='rgba(255,255,255,'+(1-o.k)+')';g.lineWidth=1;g.beginPath();g.ellipse(o.x,o.y,2+o.k*9,1+o.k*3,0,0,7);g.stroke();}
        }
        g.restore();
      }
      if(isFront){
        for(var d=0;d<drops.length;d++){var dr=drops[d],dg=g.createRadialGradient(dr.x-dr.r*.3,dr.y-dr.r*.3,0,dr.x,dr.y,dr.r);dg.addColorStop(0,'#fff');dg.addColorStop(.5,'rgba(186,230,253,.95)');dg.addColorStop(1,'rgba(2,132,199,.85)');g.fillStyle=dg;g.beginPath();g.ellipse(dr.x,dr.y,dr.r*.85,dr.r*1.15,Math.atan2(dr.vy,dr.vx)+Math.PI/2,0,7);g.fill();}
        for(var s=0;s<steam.length;s++){var m=steam[s],sg=g.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r);sg.addColorStop(0,'rgba(255,255,255,'+(.55*m.a)+')');sg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=sg;g.beginPath();g.arc(m.x,m.y,m.r,0,7);g.fill();}
      }
    }
    function S(y){return top0+y;}
    function step(now){
      if(done)return;var dt=Math.min(.033,(now-last)/1000);last=now;var e=now-ph0,i;
      for(i=0;i<N;i++){vv[i]+=(-60*hh[i]-2.2*vv[i])*dt;hh[i]+=vv[i]*dt;}
      for(var pass=0;pass<2;pass++){for(i=1;i<N;i++){var dl=.18*(hh[i]-hh[i-1]);vv[i-1]+=dl*60*dt;vv[i]-=dl*60*dt;}}
      if(Math.random()<.08)poke(Math.random()*W,(Math.random()-.5)*40,2);
      for(i=drops.length-1;i>=0;i--){var d=drops[i];d.vy+=1500*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;if(alpha>.2&&d.vy>0&&d.y>surf(d.x)){poke(d.x,d.r*14,1);if(Math.random()<.4)bubble(d.x,d.y+6,false);drops.splice(i,1);}else if(d.y>H+10)drops.splice(i,1);}
      for(i=bubs.length-1;i>=0;i--){var u=bubs[i];u.y+=u.vy*dt;if(u.y-u.r<=surf(u.x)){pops.push({x:u.x,y:surf(u.x),k:0});bubs.splice(i,1);}}
      for(i=pops.length-1;i>=0;i--){pops[i].k+=dt*4;if(pops[i].k>=1)pops.splice(i,1);}
      for(i=steam.length-1;i>=0;i--){var m=steam[i];m.y-=m.v*dt;m.r+=14*dt;m.a-=.55*dt;if(m.a<=0)steam.splice(i,1);}
      if(phase==='in'){alpha=Math.min(1,e/600);if(e>600){phase='flip';ph0=now;sw.style.opacity='1';}}
      else if(phase==='flip'){
        var p=Math.min(1,e/1800),ep=ease(p),yA=top0-(phone?190:250),yB=S(lvl+size*.05);
        tx=x0+(x1-x0)*ep;ty=yA+(yB-yA)*ep-Math.sin(ep*Math.PI)*(phone?60:90);rot=-360*ep;frame(F.air);
        if(p>=1){phase='dive';ph0=now;rot=0;poke(tx,-520,6);splash(tx,phone?26:42,phone?520:680);for(var b=0;b<14;b++)bubble(tx+(Math.random()-.5)*50,lvl+20+Math.random()*30,true);frame(F.swimA);}
      }
      else if(phase==='dive'){var q=Math.min(1,e/450);ty=S(lvl+size*.05)+Math.sin(q*Math.PI)*12;if(q>=1){phase='swim';ph0=now;}}
      else if(phase==='swim'){
        var r=Math.min(1,e/swimDur);tx=x1+(xEnd-x1)*r;ty=S(lvl+size*.04)+Math.sin(e*.006)*3;rot=Math.sin(e*.006)*3;
        if(now-k>240){k=now;frame((Math.floor(e/240)%2)?F.swimB:F.swimA);}
        if(now-lastWake>110){lastWake=now;poke(tx+size*.3,-55,2);poke(tx-size*.35,30,2);}
        if(now-lastBub>140){lastBub=now;bubble(tx-size*.35+Math.random()*10,lvl+16+Math.random()*16,false);}
        if(r>=1){phase='climb';ph0=now;frame(F.crouch);rot=0;}
      }
      else if(phase==='climb'){
        var c=Math.min(1,e/700);ty=S(lvl+size*.04)-ease(c)*(size*.42);
        if(Math.random()<.5)drops.push({x:tx+(Math.random()-.5)*size*.5,y:ty-top0+size*.25,vx:(Math.random()-.5)*30,vy:20,r:1.4+Math.random()*2});
        if(c>=1){phase='hop';ph0=now;frame(F.air);poke(tx,40,4);var dk=dock.getBoundingClientRect();hop0={x:tx,y:ty,x2:dk.left+dk.width/2,y2:dk.top+dk.height/2,s:dk.width/size};}
      }
      else if(phase==='hop'){
        var h=Math.min(1,e/620),eh=ease(h);tx=hop0.x+(hop0.x2-hop0.x)*eh;ty=hop0.y+(hop0.y2-hop0.y)*eh-Math.sin(h*Math.PI)*(phone?70:110);rot=-12*Math.sin(h*Math.PI);
        place(1+(hop0.s-1)*eh);
        if(h>=1){phase='evap';ph0=now;sw.remove();showNow();pose=F.crouch;render();setTimeout(function(){pose=null;render();greet();},150);
          for(var z=0;z<16;z++)steam.push({x:Math.random()*W,y:lvl+Math.random()*30,r:18+Math.random()*24,v:30+Math.random()*40,a:.9});}
      }
      else if(phase==='evap'){
        alpha=Math.max(0,1-e/1700);if(Math.random()<.35)steam.push({x:Math.random()*W,y:lvl+10,r:16+Math.random()*20,v:30+Math.random()*40,a:.8});
        if(e>2400){done=true;back.c.remove();front.c.remove();return;}
      }
      if(phase!=='hop'&&phase!=='evap')place();
      drawWater(back.g,false,now);drawWater(front.g,true,now);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(function(n){last=n;ph0=n;requestAnimationFrame(step);});
  }

  /* ---------- start ---------- */
  render();
  if(closed){root.classList.add('eh-toad-off');pkcs.style.backgroundPosition=pos(F.idle);return;}
  var img=new Image();img.src=SP;
  var first=!SS.intro;
  function go(){
    if(first&&!R&&scrollY<innerHeight*.6&&!chatOpen()){intro();setTimeout(function(){if(rule&&rule.arrive&&rule.arrive.id!=='home'){setTimeout(arrive,9000);}},0);}
    else{SS.intro=1;saveS();showNow();if(first)setTimeout(greet,600);setTimeout(arrive,first?12000:4500);}
  }
  if(img.decode)img.decode().then(go,go);else img.onload=go;
})();
