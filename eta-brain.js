/* Eye To Ad Media: Ad Lab neural brain. <canvas data-brain="net|headnet"> inside a section with a .spot */
(function(){
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,R=Math.random;
var OUT=[[.98,.05],[.92,.30],[.78,.50],[.55,.64],[.28,.72],[0,.74],[-.28,.70],[-.55,.58],[-.78,.40],[-.93,.18],[-.98,-.02],[-.92,-.16],[-.75,-.24],[-.55,-.22],[-.35,-.30],[-.10,-.42],[.15,-.46],[.35,-.39],[.47,-.24],[.49,-.12],[.42,-.05],[.58,-.09],[.78,-.11],[.92,-.07]];
var SYL=[[.44,-.05],[.25,.03],[.05,.09],[-.15,.15],[-.33,.24]];
function inside(P,x,y){var c=false;for(var i=0,j=P.length-1;i<P.length;j=i++){var a=P[i],b=P[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))c=!c;}return c;}
function segd(px,py,a,b){var dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((px-a[0])*dx+(py-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(px-a[0]-t*dx,py-a[1]-t*dy);}
function pd(P,x,y){var m=1e9;for(var i=0;i<P.length-1;i++){var d=segd(x,y,P[i],P[i+1]);if(d<m)m=d;}return m;}
var EXT=[];for(var xi=0;xi<=200;xi++){var x=-1+xi/100,lo=9,hi=-9;for(var y=-.55;y<=.8;y+=.006)if(inside(OUT,x,y)){if(y<lo)lo=y;if(y>hi)hi=y;}EXT.push(lo<hi?[lo,hi]:null);}
function fold3(x,y,z){var wx=x+.09*Math.sin(8*y+4*z),wy=y+.09*Math.sin(7*z-3*x),wz=z+.09*Math.sin(9*x+2*y);return Math.sin(14*wx+4*Math.sin(5*wy))*Math.cos(13*wy+3*Math.sin(6*wz))*Math.cos(12*wz+2*Math.sin(5*wx));}
function build(N){var P=[],n=0,g=0;
 while(n<N*.8&&g++<N*30){var x=R()*1.98-.99,e=EXT[Math.round((x+1)*100)];if(!e)continue;var yc=(e[0]+e[1])/2+.04,hh=(e[1]-e[0])/2,th=R()*Math.PI,y=yc+hh*Math.cos(th);if(!inside(OUT,x,y))continue;
  var w=.8*Math.pow(Math.max(0,1-Math.pow((x+.1)/1.06,2)),.5),s=R()<.5?1:-1,lat=w*Math.pow(Math.sin(th),.75),z=s*(.035+lat),f=fold3(x,y,z);
  if(Math.abs(lat)>.3&&pd(SYL,x,y)<.03)continue;if(R()>.12+.88*Math.max(0,Math.min(1,(f+.2)/.7)))continue;
  var nl=Math.hypot(0,y-yc,lat)||1;z+=s*.03*f*Math.sin(th);y+=.03*f*(y-yc)/nl;var nx=(x+.1)*.45,ny=Math.cos(th),nz=s*Math.sin(th),nn=Math.hypot(nx,ny,nz);P.push({x:x,y:y,z:z,f:f,k:0,nx:nx/nn,ny:ny/nn,nz:nz/nn});n++;}
 for(var i=0;i<N*.13;i++){var u=R()*6.283,v=Math.acos(2*R()-1),ex=Math.sin(v)*Math.cos(u),ey=Math.cos(v),ez=Math.sin(v)*Math.sin(u);var cx=-.62+ex*.3,cy=-.44+ey*.17+ex*.03,cz=ez*.6+(ez>0?.04:-.04),ff=Math.sin(64*(cy+.2*cx));if(R()>.2+.8*Math.max(0,ff)){i--;continue;}P.push({x:cx,y:cy,z:cz,f:ff*.6,k:1,nx:ex,ny:ey,nz:ez});}
 for(i=0;i<N*.07;i++){var tt=R(),aa=R()*6.283;P.push({x:-.28-tt*.08+Math.cos(aa)*.1,y:-.3-tt*.62,z:Math.sin(aa)*.1,f:0,k:2,nx:Math.cos(aa),ny:0,nz:Math.sin(aa)});}
 return P;}
function nbrs(P){var idx=[];P.forEach(function(p,i){if(p.k===0&&i%6===0)idx.push(i);});var nb={};idx.forEach(function(a){var L=[],q=P[a];for(var j=0;j<idx.length;j++){var b=idx[j];if(a===b)continue;var w=P[b],d=Math.abs(q.x-w.x)+Math.abs(q.y-w.y)+Math.abs(q.z-w.z);if(d<.24)L.push([d,b]);}L.sort(function(p,r){return p[0]-r[0];});nb[a]=L.slice(0,5).map(function(e){return e[1];});});return {idx:idx,nb:nb};}
function cr(pts,ctx,move){if(move!==false)ctx.moveTo(pts[0][0],pts[0][1]);for(var i=0;i<pts.length-1;i++){var p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];ctx.bezierCurveTo(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6,p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6,p2[0],p2[1]);}}
var HEAD=[[-.62,-2.05],[-.66,-1.38],[-.95,-1.02],[-1.2,-.5],[-1.28,.05],[-1.18,.6],[-.85,1.05],[-.3,1.3],[.3,1.32],[.8,1.1],[1.12,.72],[1.26,.3],[1.3,.08],[1.24,-.03],[1.3,-.18],[1.38,-.34],[1.5,-.52],[1.44,-.6],[1.33,-.62],[1.35,-.72],[1.29,-.8],[1.33,-.88],[1.25,-.98],[1.29,-1.1],[1.2,-1.25],[.95,-1.3],[.66,-1.2],[.57,-1.34],[.52,-1.6],[.56,-2.05]];
var CFG={
 net:{N:8600,base:[125,145,255],fire:[255,140,255],flare:'rgba(200,150,255,',glow:'rgba(160,210,255,',strands:26,mesh:true,spin:true,flares:true,pulse:6},
 deep:{N:8600,base:[110,160,255],fire:[255,120,230],flare:'rgba(230,140,255,',glow:'rgba(150,200,255,',strands:34,layers:true,bokeh:true,spin:true,flares:true,pulse:6},
 cells:{N:8600,base:[120,200,255],fire:[255,255,255],flare:'rgba(200,245,255,',glow:'rgba(150,235,255,',cells:true,spin:true,flares:true,pulse:7},
 head:{N:6800,base:[160,190,255],fire:[255,120,235],flare:'rgba(255,140,240,',glow:'rgba(255,170,245,',head:true,sway:.22,flares:true,pulse:4},
 headnet:{N:6800,base:[130,225,255],fire:[255,255,255],flare:'rgba(210,250,255,',glow:'rgba(150,240,255,',head:true,strands:22,sway:.22,flares:true,pulse:5}};
[].forEach.call(document.querySelectorAll('canvas[data-brain]'),function(cv){
 var C=CFG[cv.dataset.brain],sec=cv.parentNode,spot=sec.querySelector('.spot'),ctx=cv.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1),W,Hh,S,ox,oy,HS,hox,hoy;
 var STR=[],CELLS=[],BOK=[],PLX=[];
 function size(){var r=cv.getBoundingClientRect(),sr=spot.getBoundingClientRect();W=r.width;Hh=r.height;cv.width=W*dpr;cv.height=Hh*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  var cx=sr.left-r.left+sr.width/2,cy=sr.top-r.top+sr.height/2,m=Math.min(sr.width,sr.height);
  if(C.head){HS=sr.height/3.45;hox=cx-.14*HS;hoy=cy-.2*HS;S=HS*1.14;ox=hox+.02*HS;oy=hoy-.42*HS;}else{S=Math.min(m*.42,W*.36);ox=cx;oy=cy+.06*S;}
  mk();}
 function mk(){STR=[];var n=C.strands||0;for(var s=0;s<n;s++){var fromL=R()<.5,x=fromL?-20:W+20,y=R()*Hh,a=Math.atan2(oy-y+(R()-.5)*Hh*.6,ox-x),pts=[[x,y]],len=30+R()*30;for(var k=0;k<len;k++){a+=(R()-.5)*.45;x+=Math.cos(a)*22;y+=Math.sin(a)*22;pts.push([x,y]);}
   var z=C.layers?R():.5;STR.push({p:pts,w:(.5+R()*1.6)*(C.layers?.5+z*1.6:1),z:z,o:R()*6,dots:[R(),R(),R()]});}
  CELLS=[];if(C.cells){var nc=Math.max(5,Math.round(W/150));for(var c=0;c<nc;c++){var cx=(c+.5)/nc*W+(R()-.5)*60,cy=R()<.5?Hh*(.12+R()*.22):Hh*(.66+R()*.26),br=[];
    (function grow(x,y,a,len,d){if(d>3)return;var pts=[[x,y]];for(var k=0;k<len;k++){a+=(R()-.5)*.5;x+=Math.cos(a)*14;y+=Math.sin(a)*14;pts.push([x,y]);}br.push({p:pts,w:2.6-d*.6,d0:R()});if(R()<.8)grow(x,y,a+.6,len*.7|0,d+1);if(R()<.8)grow(x,y,a-.6,len*.7|0,d+1);})(cx,cy,0,1,0);
    br=[];var nd=6+Math.floor(R()*4);for(var d=0;d<nd;d++){(function grow(x,y,a,len,dd){if(dd>2||len<3)return;var pts=[[x,y]];for(var k=0;k<len;k++){a+=(R()-.5)*.45;x+=Math.cos(a)*13;y+=Math.sin(a)*13;pts.push([x,y]);}br.push({p:pts,w:2.4-dd*.7,d0:R()});grow(x,y,a+.5+R()*.3,len*.65|0,dd+1);if(R()<.6)grow(x,y,a-.5-R()*.3,len*.6|0,dd+1);})(cx,cy,d/nd*6.283+R()*.4,6+Math.floor(R()*7),0);}
    CELLS.push({x:cx,y:cy,br:br,r:6+R()*4,o:R()*6});}}
  BOK=[];if(C.bokeh)for(var b=0;b<26;b++)BOK.push({x:R()*W,y:R()*Hh,r:6+R()*26,s:.15+R()*.35,o:R()*6,c:R()<.5?'150,180,255':'220,150,255'});
  PLX=[];if(C.mesh)for(var i=0;i<54;i++){var u=[R()*2-1,R()*2-1,R()*2-1],l=Math.hypot(u[0],u[1],u[2]),rr=1.15+R()*.35;PLX.push([u[0]/l*rr,u[1]/l*rr*.8,u[2]/l*rr]);}}
 var P=build(C.N),G=nbrs(P),F=[],FL=[],ang=R()*6,vis=true,last=0,ph=R()*6;
 size();
 function spawn(a){a=a!=null?a:G.idx[Math.floor(R()*G.idx.length)];var path=[a],seen={};seen[a]=1;for(var h=0;h<9+Math.floor(R()*7);h++){var L=(G.nb[path[path.length-1]]||[]).filter(function(n){return !seen[n];});if(!L.length)break;var n=L[Math.floor(R()*L.length)];seen[n]=1;path.push(n);}if(path.length>3)F.push({p:path,t:0,sp:.16+R()*.16});}
 function flare(){FL.push({i:G.idx[Math.floor(R()*G.idx.length)],t:0,d:.5+R()*.9,s:.6+R()*1.2});}
 function proj(x,y,z){var ca=Math.cos(ang),sa=Math.sin(ang),X=x*ca+z*sa,Z=-x*sa+z*ca,tl=.18,Y=y*Math.cos(tl)-Z*Math.sin(tl);Z=y*Math.sin(tl)+Z*Math.cos(tl);var f=3.8/(3.8-Z);return [ox+X*S*f,oy-Y*S*f,Z,f];}
 function hp(p){return [hox+p[0]*HS,hoy-p[1]*HS];}
 function blob(x,y,r,col,a){var p=hp([x,y]),g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],r*HS);g.addColorStop(0,'rgba('+col+','+a+')');g.addColorStop(1,'rgba('+col+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p[0],p[1],r*HS,0,6.283);ctx.fill();}
 function headPath(){var pts=HEAD.map(hp);ctx.beginPath();cr(pts,ctx);ctx.lineTo(pts[pts.length-1][0],Hh+40);ctx.lineTo(pts[0][0],Hh+40);ctx.closePath();}
 function drawHeadBack(){ctx.save();headPath();var a=hp([-1.1,.4]),b=hp([1.35,-.3]),g=ctx.createLinearGradient(a[0],a[1],b[0],b[1]);g.addColorStop(0,'rgba(40,90,230,.55)');g.addColorStop(.55,'rgba(80,150,255,.42)');g.addColorStop(1,'rgba(150,205,255,.55)');ctx.fillStyle=g;ctx.fill();ctx.clip();
  blob(.2,.95,1.15,'180,220,255',.22);blob(-.9,-1.2,1.2,'10,30,120',.45);blob(.75,-1.45,.8,'10,30,120',.4);blob(.62,-1.12,.55,'10,25,110',.35);
  ctx.restore();}
 function drawHeadFront(){ctx.save();headPath();ctx.clip();
  blob(1.02,-.1,.26,'10,30,120',.55);blob(.82,-.46,.34,'200,230,255',.35);blob(1.3,-.42,.14,'210,235,255',.4);blob(1.08,-1.08,.22,'200,230,255',.28);blob(1.18,.45,.3,'210,235,255',.3);blob(.95,-.78,.28,'10,30,120',.28);
  var e=hp([1.1,-.12]);ctx.fillStyle='rgba(20,45,140,.55)';ctx.beginPath();ctx.ellipse(e[0],e[1],.075*HS,.032*HS,-.1,0,6.283);ctx.fill();ctx.strokeStyle='rgba(200,235,255,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(e[0],e[1]-.012*HS,.08*HS,.035*HS,-.1,3.4,6.1);ctx.stroke();
  var br=[[.88,.07],[1.02,.1],[1.17,.06]].map(hp);ctx.strokeStyle='rgba(15,40,130,.35)';ctx.lineWidth=.03*HS;ctx.lineCap='round';ctx.beginPath();cr(br,ctx);ctx.stroke();
  var ns=[[1.34,-.36],[1.36,-.5],[1.3,-.56]].map(hp);ctx.strokeStyle='rgba(15,40,130,.35)';ctx.lineWidth=.02*HS;ctx.beginPath();cr(ns,ctx);ctx.stroke();
  var lp=[[1.33,-.8],[1.23,-.79],[1.14,-.76]].map(hp);ctx.strokeStyle='rgba(15,40,130,.45)';ctx.lineWidth=.014*HS;ctx.beginPath();cr(lp,ctx);ctx.stroke();
  var jw=[[.62,-1.18],[.8,-1.26],[1.05,-1.28]].map(hp);ctx.strokeStyle='rgba(10,30,120,.4)';ctx.lineWidth=.06*HS;ctx.beginPath();cr(jw,ctx);ctx.stroke();
  var ec=hp([-.12,-.38]);ctx.save();ctx.translate(ec[0],ec[1]);ctx.rotate(.18);var eg=ctx.createRadialGradient(0,0,2,0,0,.3*HS);eg.addColorStop(0,'rgba(40,80,200,.25)');eg.addColorStop(.7,'rgba(150,200,255,.3)');eg.addColorStop(1,'rgba(150,200,255,0)');ctx.fillStyle=eg;ctx.beginPath();ctx.ellipse(0,0,.16*HS,.3*HS,0,0,6.283);ctx.fill();
  ctx.strokeStyle='rgba(200,235,255,.55)';ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(0,0,.14*HS,.27*HS,0,-1.4,2.3);ctx.stroke();ctx.strokeStyle='rgba(20,50,150,.4)';ctx.beginPath();ctx.ellipse(.02*HS,.02*HS,.07*HS,.15*HS,0,-1.2,2);ctx.stroke();ctx.restore();
  headPath();ctx.lineWidth=.14*HS;ctx.strokeStyle='rgba(150,215,255,.22)';ctx.filter='blur(10px)';ctx.stroke();ctx.filter='none';ctx.restore();
  ctx.save();headPath();ctx.shadowColor='rgba(170,230,255,.95)';ctx.shadowBlur=24;ctx.strokeStyle='rgba(190,238,255,.9)';ctx.lineWidth=2.4;ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=.9;ctx.stroke();ctx.restore();}
 function strands(t){ctx.save();ctx.globalCompositeOperation='lighter';STR.forEach(function(s){var dx=Math.sin(t/4200+s.o)*5*(C.layers?(.5+s.z):1);var al=C.layers?(.12+s.z*.3):.26;if(C.layers&&s.z>.82)ctx.filter='blur(3px)';ctx.strokeStyle='rgba(110,130,255,'+al+')';ctx.lineWidth=s.w;ctx.beginPath();cr(s.p.map(function(p){return [p[0]+dx,p[1]];}),ctx);ctx.stroke();
   ctx.fillStyle='rgba(130,220,255,'+(al*2.4)+')';for(var k=3;k<s.p.length;k+=5){ctx.beginPath();ctx.arc(s.p[k][0]+dx,s.p[k][1],1.2+s.w*.45,0,6.283);ctx.fill();}ctx.filter='none';
   s.dots.forEach(function(d0,j){var u=((t/7000+d0+j*.33)%1)*(s.p.length-1),k=Math.floor(u),fr=u-k,a=s.p[k],b=s.p[k+1];var x=a[0]+(b[0]-a[0])*fr+dx,y=a[1]+(b[1]-a[1])*fr,g=ctx.createRadialGradient(x,y,0,x,y,10);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(140,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,10,0,6.283);ctx.fill();});});ctx.restore();}
 function cells(t){ctx.save();ctx.globalCompositeOperation='lighter';CELLS.forEach(function(c){c.br.forEach(function(b){ctx.strokeStyle='rgba(90,170,255,.35)';ctx.lineWidth=Math.max(.6,b.w);ctx.beginPath();cr(b.p,ctx);ctx.stroke();
    var u=((t/3200+b.d0)%1)*(b.p.length-1),k=Math.floor(u),fr=u-k,a=b.p[k],e=b.p[Math.min(k+1,b.p.length-1)],x=a[0]+(e[0]-a[0])*fr,y=a[1]+(e[1]-a[1])*fr,g=ctx.createRadialGradient(x,y,0,x,y,8);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(120,220,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,8,0,6.283);ctx.fill();});
   var pl=.75+.25*Math.sin(t/700+c.o),g2=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r*4);g2.addColorStop(0,'rgba(255,255,255,'+pl+')');g2.addColorStop(.25,'rgba(140,220,255,'+(.8*pl)+')');g2.addColorStop(1,'rgba(80,140,255,0)');ctx.fillStyle=g2;ctx.beginPath();ctx.arc(c.x,c.y,c.r*4,0,6.283);ctx.fill();});ctx.restore();}
 function bokeh(t){ctx.save();ctx.globalCompositeOperation='lighter';BOK.forEach(function(b){var y=(b.y-t/1000*b.s*20)%(Hh+60);if(y<-30)y+=Hh+60;var x=b.x+Math.sin(t/3000+b.o)*10,g=ctx.createRadialGradient(x,y,0,x,y,b.r);g.addColorStop(0,'rgba('+b.c+',.16)');g.addColorStop(.7,'rgba('+b.c+',.10)');g.addColorStop(.9,'rgba('+b.c+',.22)');g.addColorStop(1,'rgba('+b.c+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,b.r,0,6.283);ctx.fill();});ctx.restore();}
 function brain(t){var heads=[];F.forEach(function(f){var k=Math.floor(f.t),fr=f.t-k;if(k<f.p.length-1){var a=P[f.p[k]],b=P[f.p[k+1]];heads.push([a.x+(b.x-a.x)*fr,a.y+(b.y-a.y)*fr,a.z+(b.z-a.z)*fr,.012]);}});
  FL.forEach(function(fl){var p=P[fl.i],k=fl.t/fl.d,e=Math.sin(Math.PI*Math.min(1,k));heads.push([p.x,p.y,p.z,.02*fl.s*e+.001]);});
  ctx.globalCompositeOperation='lighter';var c=C.base;
  for(var i=0;i<P.length;i++){var p=P[i],q=proj(p.x,p.y,p.z),e=0;for(var h=0;h<heads.length;h++){var H0=heads[h],d2=(p.x-H0[0])*(p.x-H0[0])+(p.y-H0[1])*(p.y-H0[1])+(p.z-H0[2])*(p.z-H0[2]);e+=Math.exp(-d2/H0[3]);}e=Math.min(1,e);
   var ca=Math.cos(ang),sa=Math.sin(ang),nZ=-p.nx*sa+p.nz*ca,fz=Math.abs(p.ny*.179+nZ*.984),dep=(q[2]+1.1)/2.2,al=(.12+.55*dep)*(.45+Math.max(0,p.f)*1.2)*(p.k===2?.7:1)*(.22+.78*fz)+e*.85,sz=1.3*q[3];
   ctx.fillStyle='rgba('+((c[0]+(C.fire[0]-c[0])*e)|0)+','+((c[1]+(C.fire[1]-c[1])*e)|0)+','+((c[2]+(C.fire[2]-c[2])*e)|0)+','+Math.min(1,al).toFixed(3)+')';ctx.fillRect(q[0]-sz/2,q[1]-sz/2,sz+e*1.5,sz+e*1.5);}
  if(C.mesh){ctx.lineWidth=.6;for(var a=0;a<PLX.length;a++){var A=proj(PLX[a][0],PLX[a][1],PLX[a][2]);for(var b=a+1;b<PLX.length;b++){var dd=Math.hypot(PLX[a][0]-PLX[b][0],PLX[a][1]-PLX[b][1],PLX[a][2]-PLX[b][2]);if(dd<.55){var B=proj(PLX[b][0],PLX[b][1],PLX[b][2]);ctx.strokeStyle='rgba(120,230,255,'+(.3*(1-dd/.55)).toFixed(2)+')';ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();}}ctx.fillStyle='rgba(170,240,255,.9)';ctx.beginPath();ctx.arc(A[0],A[1],1.5*A[3],0,6.283);ctx.fill();}}
  F.forEach(function(f){var k=Math.floor(f.t);ctx.lineWidth=1.5;for(var j=Math.max(0,k-4);j<Math.min(k+1,f.p.length-1);j++){var A=proj(P[f.p[j]].x,P[f.p[j]].y,P[f.p[j]].z),B=proj(P[f.p[j+1]].x,P[f.p[j+1]].y,P[f.p[j+1]].z),o=1-(k-j)/5;ctx.strokeStyle=C.glow+(o*.85).toFixed(2)+')';ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke();}});
  heads.forEach(function(H0){var q=proj(H0[0],H0[1],H0[2]),big=H0[3]>.013,r=(big?Math.sqrt(H0[3])*S*.28:S*.034)*q[3];if(r<1)return;var g=ctx.createRadialGradient(q[0],q[1],0,q[0],q[1],r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.22,(big?C.flare:C.glow)+'.75)');g.addColorStop(1,(big?C.flare:C.glow)+'0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(q[0],q[1],r,0,6.283);ctx.fill();});
  ctx.globalCompositeOperation='source-over';}
 function draw(t){ctx.clearRect(0,0,W,Hh);if(C.bokeh)bokeh(t);if(STR.length)strands(t);if(C.cells)cells(t);if(C.head){drawHeadBack();ctx.save();headPath();ctx.clip();brain(t);ctx.restore();}else brain(t);if(C.head)drawHeadFront();}
 for(var i=0;i<C.pulse;i++)spawn();
 function step(t){if(vis&&!document.hidden&&t-last>33){var dt=Math.min(3,(t-last)/33);last=t;if(C.spin)ang+=.0105*dt;else ang=C.sway*Math.sin(t/5600+ph);
   F.forEach(function(f){f.t+=f.sp*dt;});F=F.filter(function(f){return f.t<f.p.length-1;});while(F.length<C.pulse)spawn();
   FL.forEach(function(fl){fl.t+=.033*dt;});FL=FL.filter(function(fl){return fl.t<fl.d;});while(FL.length<9)flare();draw(t);}requestAnimationFrame(step);}
 if(RM){ang=.5;draw(0);}else requestAnimationFrame(step);
 if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(cv);
 sec.addEventListener('pointerdown',function(e){if(e.target.closest('a'))return;for(var i=0;i<8;i++)spawn();for(i=0;i<6;i++)flare();});
 var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(size,200);});
});
})();
