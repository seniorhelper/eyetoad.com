/* Eye To Ad Media homepage: live bubble field + typed hero line. Loaded on / only. */
(function(){
var cv=document.getElementById('etaBub');if(!cv||!cv.getContext)return;
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,R=Math.random,dpr=Math.min(1.5,window.devicePixelRatio||1),ctx=cv.getContext('2d');
var CARD=[[239,83,80],[242,128,58],[245,223,77],[39,163,102],[70,88,184],[142,79,181]];
function col(t){var k=Math.max(0,Math.min(5,Math.floor(Math.max(0,Math.min(.999,t))*6+(R()-.5)*1.7))),c=CARD[k],s=(R()-.5)*.55;return c.map(function(v){return Math.round(s>0?v+(255-v)*s:v*(1+s));});}
function qc(a){return a.map(function(v){return Math.max(0,Math.min(255,Math.round(v/6)*6));});}
var W=0,H=0,HF=0,B=[],cache={},FX=[],vis=true,last=0,big=[],SL=null,SB=[],AB=[];
function sprite(r,c){var key=Math.round(r*2)+'|'+c.join(',');if(cache[key])return cache[key];var s=Math.ceil(r*2+2),o=document.createElement('canvas');o.width=o.height=Math.ceil(s*dpr);var g=o.getContext('2d');g.scale(dpr,dpr);var cx=s/2,cy=s/2;
 function m(f){return 'rgb('+c.map(function(v){return Math.round(v*f+255*(1-f));}).join(',')+')';}function d(f){return 'rgb('+c.map(function(v){return Math.round(v*f);}).join(',')+')';}
 var gr=g.createRadialGradient(cx-r*.32,cy-r*.4,0,cx,cy,r);gr.addColorStop(0,'#fff');gr.addColorStop(.09,'#fff');gr.addColorStop(.22,m(.55));gr.addColorStop(.58,'rgb('+c.join(',')+')');gr.addColorStop(1,d(.78));
 g.fillStyle=gr;g.beginPath();g.arc(cx,cy,r,0,6.283);g.fill();g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1;g.beginPath();g.arc(cx,cy,Math.max(.5,r-.5),0,6.283);g.stroke();return cache[key]=o;}
function measure(){var hero=document.querySelector('.h8'),hdr=document.querySelector('.hdr'),sy=window.scrollY||0;W=document.documentElement.clientWidth;H=Math.ceil(hero?hero.getBoundingClientRect().bottom+sy:760);HF=Math.ceil((hdr?hdr.getBoundingClientRect().bottom+sy:200)+34);
 cv.style.height=H+'px';cv.width=Math.ceil(W*dpr);cv.height=Math.ceil(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
function pack(){var C=[],G={},cs=80,sc=Math.min(1.4,Math.max(1,Math.sqrt(W/390))),mx=30*sc,tilt=(R()-.5)*.5,wx=.55+tilt,wy=.45-tilt,shift=(R()-.5)*.12,tries=Math.min(70000,Math.round(20000*W/390/sc));
 function maxr(y){var e=Math.min(Math.max(y+20,0),Math.max(HF+40-y,0))/70;return Math.max(2,Math.min(mx,4+(mx-4)*Math.min(1,e)));}
 for(var n=0;n<tries;n++){var x=R()*(W+20)-10,y=R()*(HF+70)-25,mm=maxr(y),d=mm,gx=Math.floor(x/cs),gy=Math.floor(y/cs);
  for(var i=-1;i<=1;i++)for(var j=-1;j<=1;j++){var L=G[(gx+i)+','+(gy+j)];if(L)for(var q=0;q<L.length;q++){var c=L[q],dd=Math.hypot(x-c.x,y-c.y)-c.r;if(dd<d)d=dd;}}
  var r=Math.min(mm,d-.6);if(r>=2.2&&(y<HF*.9||R()<.6)){var b={x:x,y:y,r:r,c:qc(col((x/W)*wx+(y/HF)*wy+shift+(R()-.5)*.12)),a:1},k=gx+','+gy;C.push(b);(G[k]=G[k]||[]).push(b);}}
 var g=document.querySelector('.h8-grid'),gr=g?g.getBoundingClientRect():null,sy=window.scrollY||0,n2=Math.min(200,Math.round(70*W/390));
 for(var t=0;t<n2;t++){var x2=R()*(W+20)-10,y2=HF+R()*Math.max(60,H-HF),inner=gr&&x2>gr.left-10&&x2<gr.right+10;var r2=inner?[3,4,5,6][t%4]:[6,9,12,16,20][t%5];C.push({x:x2,y:y2,r:r2,c:qc(col((x2/W)*.55+((y2-HF)/Math.max(1,H-HF))*.45)),a:inner?.45:.95});}
 C.forEach(function(b){b.s=sprite(b.r,b.c);b.ph=R()*6.28;b.sp=.5+R()*.9;b.wx=(R()*2-1)*1.6;b.pop=0;b.back=0;});
 B=C;big=B.filter(function(b){return b.r>7&&b.a>.9;});SB=B.filter(function(b){return b.r<=6.5;});AB=B.filter(function(b){return b.r>6.5;});SL=null;}
function layer(){SL=document.createElement('canvas');SL.width=cv.width;SL.height=cv.height;var g=SL.getContext('2d');g.scale(dpr,dpr);for(var i=0;i<SB.length;i++){var b=SB[i],s=b.s.width/dpr;g.globalAlpha=b.a;g.drawImage(b.s,b.x-s/2,b.y-s/2,s,s);}}
function draw(t){ctx.clearRect(0,0,W,H);var ts=t/1000;if(!SL)layer();ctx.drawImage(SL,0,0,W,H);
 for(var i=0;i<AB.length;i++){var b=AB[i],sc=1;if(b.pop)continue;if(b.back){var k=Math.min(1,(t-b.back)/700);sc=k<1?1-Math.pow(1-k,3):1;if(k>=1)b.back=0;}
  var dy=RM?0:Math.sin(ts*b.sp+b.ph)*1.3,dx=RM?0:Math.sin(ts*b.sp*.7+b.ph)*b.wx,s=b.s.width/dpr*sc;ctx.globalAlpha=b.a;ctx.drawImage(b.s,b.x+dx-s/2,b.y+dy-s/2,s,s);}
 ctx.globalAlpha=1;
 FX=FX.filter(function(f){var k=(t-f.t)/450;if(k>1)return false;var cs='rgb('+f.c.join(',')+')';ctx.strokeStyle=cs;ctx.globalAlpha=1-k;ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x,f.y,f.r*(.7+k*1.2),0,6.283);ctx.stroke();
  ctx.fillStyle=cs;for(var j=0;j<6;j++){var a=j/6*6.283+f.a,mm=(f.r*.7+6)*k*1.4;ctx.beginPath();ctx.arc(f.x+Math.cos(a)*mm,f.y+Math.sin(a)*mm,1.6,0,6.283);ctx.fill();}ctx.globalAlpha=1;return true;});}
function pop(b,t){if(!b||b.pop)return;b.pop=1;FX.push({x:b.x,y:b.y,r:b.r,c:b.c,t:t,a:R()});
 setTimeout(function(){b.c=qc(b.c.map(function(v){return v+(R()-.5)*70;}));b.r=Math.max(2.2,b.r*(.85+R()*.15));b.s=sprite(b.r,b.c);b.pop=0;b.back=performance.now();},2200+R()*2600);}
function loop(t){if(vis&&!document.hidden&&t-last>33){last=t;draw(t);}requestAnimationFrame(loop);}
function init(){measure();pack();if(RM)draw(0);}
init();if(!RM)requestAnimationFrame(loop);
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(cv);
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){var w=document.documentElement.clientWidth;if(Math.abs(w-W)>40)init();else{measure();if(RM)draw(0);}},250);});
window.addEventListener('load',function(){var h0=H;measure();if(Math.abs(H-h0)>40)pack();if(RM)draw(0);});
document.addEventListener('pointerdown',function(e){if(e.target.closest&&e.target.closest('a,button,input,textarea,select,label,form,svg,.h8-form'))return;var y=e.pageY,x=e.pageX;if(y>H)return;var best=null,bd=1e9;
 for(var i=0;i<AB.length;i++){var b=AB[i];if(b.pop)continue;var d=Math.hypot(x-b.x,y-b.y);if(d<b.r+4&&d<bd){bd=d;best=b;}}pop(best,performance.now());});
if(!RM)(function auto(){setTimeout(function(){if(vis&&!document.hidden&&big.length)pop(big[Math.floor(R()*big.length)],performance.now());auto();},700+R()*1400);})();
var sc=false;window.addEventListener('scroll',function(){var s=(window.scrollY||0)>60;if(s!==sc){sc=s;document.body.classList.toggle('bub-scrolled',s);}},{passive:true});
/* typed hero line: steady ~16 chars/sec, beats at punctuation, clock-timed */
var p=document.querySelector('.h8-sub.typer');if(p){var cs=[].slice.call(p.querySelectorAll('.ch'));
 if(RM){cs.forEach(function(c){c.classList.add('on');});p.classList.add('kw-done');}
 else{var at=[],tt=0;cs.forEach(function(c,i){at.push(tt);tt+=62;if(/[.,]/.test(c.textContent)&&i<cs.length-1)tt+=c.textContent==='.'?380:190;});
  var start=performance.now()+1300,shown=0;(function tick(now){var el=now-start;while(shown<cs.length&&at[shown]<=el){if(shown>0)cs[shown-1].classList.remove('cur');cs[shown].classList.add('on','cur');shown++;}
   if(shown<cs.length)requestAnimationFrame(tick);else setTimeout(function(){cs[cs.length-1].classList.remove('cur');p.classList.add('kw-done');},500);})(performance.now());}}
})();
