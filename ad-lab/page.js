
(function(){
'use strict';
var cv=document.getElementById('mzCanvas');
if(!cv) return;
var g=cv.getContext('2d');

var LEVELS=[
{name:'FIRST IMPRESSION',mat:'wood',par:12,grid:[
'###############',
'#S    #       #',
'#     #   *   #',
'#  ####       #',
'#     #  ######',
'####  #       #',
'#        ###  #',
'#  ####  # G  #',
'#     #       #',
'###############']},

{name:'BOUNCE RATE ALLEY',mat:'wood',par:16,grid:[
'###############',
'#S   o    #  *#',
'#    #    #   #',
'# ####  ###   #',
'#    #   o    #',
'#  o #  ###  ##',
'#    #    #   #',
'#### #  * #   #',
'#       # # G #',
'###############']},

{name:'ALGORITHM UPDATE',mat:'metal',par:20,grid:[
'###############',
'#S      #    *#',
'#       #     #',
'#####   #  ####',
'#   #      #  #',
'#   #  o   #  #',
'#      #      #',
'#  *   #   ####',
'#      #    G #',
'###############'],
movers:[{x:5,y:1,w:1,h:2,ax:'y',dist:4,spd:.55,ph:0},
        {x:8,y:6,w:2,h:1,ax:'x',dist:3,spd:.7,ph:1.6}]},

{name:'THE REVIEW GAUNTLET',mat:'metal',par:26,grid:[
'###############',
'#S  #   *  #  #',
'#   #      #  #',
'# o #  ##  # *#',
'#   #  ##     #',
'#      ##  # ##',
'#####      #  #',
'#  *   o   # G#',
'#          #  #',
'###############'],
movers:[{x:9,y:1,w:1,h:3,ax:'y',dist:1,spd:.6,ph:.8},
        {x:5,y:8,w:3,h:1,ax:'x',dist:2,spd:.85,ph:0}]},

{name:'SLIPPERY RANKINGS',mat:'concrete',par:24,grid:[
'###############',
'#S iiii   #  *#',
'#  iiii   #   #',
'#  iiii  ##   #',
'#      o      #',
'#  ###   iiii #',
'#  # *   iiii #',
'#  #   o iiii #',
'#         # G #',
'###############']},

{name:'THIN CONTENT SWAMP',mat:'concrete',par:28,grid:[
'###############',
'#S mmm #     *#',
'#  mmm #      #',
'#      #  ### #',
'#### o    #   #',
'#   #   mmm   #',
'# * #   mmm ###',
'#   #     o   #',
'#      ##   G #',
'###############'],
movers:[{x:6,y:1,w:1,h:2,ax:'y',dist:5,spd:.5,ph:.4}]},

{name:'COMPETITOR SPIN',mat:'metal',par:30,grid:[
'###############',
'#S      #    *#',
'#       #     #',
'#   #####     #',
'#             #',
'#     o    ####',
'#  ###        #',
'#   #    *    #',
'# G #         #',
'###############'],
spinners:[{x:11.5,y:3.5,len:2.4,spd:1.15,ph:0},
          {x:7.5,y:7.5,len:2.0,spd:-1.5,ph:1.2}]},

{name:'PAGE ONE',mat:'concrete',par:38,grid:[
'###############',
'#S  o  #  iii #',
'#      #  iii #',
'#  #####      #',
'#  #    o   ###',
'#  #  mmm     #',
'#     mmm  *  #',
'####       ####',
'# *    o    G #',
'###############'],
movers:[{x:9,y:1,w:1,h:3,ax:'y',dist:3,spd:.75,ph:0},
        {x:3,y:8,w:2,h:1,ax:'x',dist:2,spd:.6,ph:1}],
spinners:[{x:10.5,y:3.5,len:2.2,spd:1.3,ph:.5}]}
];

var lv=0,cols=0,rows=0,CS=0,OX=0,OY=0;
var solid=[],surf=[],holes=[],gems=[],goal=null,startPt=null;
var movers=[],spinners=[];
var ball={x:0,y:0,vx:0,vy:0,r:0,dead:0};
var running=false,won=false,t0=0,elapsed=0,best={},cleared={};
var ax=0,ay=0,tiltOn=false,tiltZero=null,parts=[];
var keys={},dragOn=false,dragX=0,dragY=0;
var stat=document.createElement('canvas'),sctx=stat.getContext('2d');
var last=0,raf=0;

var $=function(id){return document.getElementById(id)};
var elLvl=$('mzLvl'),elName=$('mzName'),elGems=$('mzGems'),elTime=$('mzTime'),elBest=$('mzBest');
var ov=$('mzOverlay'),ovT=$('mzOvTitle'),ovX=$('mzOvText'),ovB=$('mzOvBtn'),ovB2=$('mzOvBtn2');

var TEX={};
function buildTex(){
  TEX.wood=mk(function(c,x){
    x.fillStyle='#8a5a30';x.fillRect(0,0,96,96);
    for(var i=0;i<40;i++){
      x.strokeStyle='rgba(60,34,14,'+(0.05+Math.random()*0.16).toFixed(3)+')';
      x.lineWidth=0.6+Math.random()*2.2;x.beginPath();
      var y=Math.random()*96;x.moveTo(0,y);
      for(var px=0;px<=96;px+=8)x.lineTo(px,y+Math.sin(px*0.09+i)*2.2);
      x.stroke();
    }
    for(var k=0;k<2;k++){
      var kx=Math.random()*96,ky=Math.random()*96;
      var gr=x.createRadialGradient(kx,ky,1,kx,ky,7);
      gr.addColorStop(0,'rgba(52,28,10,.55)');gr.addColorStop(1,'rgba(52,28,10,0)');
      x.fillStyle=gr;x.beginPath();x.arc(kx,ky,7,0,6.3);x.fill();
    }
  });
  TEX.metal=mk(function(c,x){
    var lg=x.createLinearGradient(0,0,0,96);
    lg.addColorStop(0,'#99a2ad');lg.addColorStop(.5,'#7e8792');lg.addColorStop(1,'#8d96a1');
    x.fillStyle=lg;x.fillRect(0,0,96,96);
    for(var i=0;i<160;i++){
      x.strokeStyle='rgba(255,255,255,'+(Math.random()*0.07).toFixed(3)+')';
      x.lineWidth=Math.random()*1.4;var px=Math.random()*96;
      x.beginPath();x.moveTo(px,0);x.lineTo(px,96);x.stroke();
    }
    for(var j=0;j<70;j++){
      x.strokeStyle='rgba(30,36,44,'+(Math.random()*0.09).toFixed(3)+')';
      x.lineWidth=Math.random();var qx=Math.random()*96;
      x.beginPath();x.moveTo(qx,0);x.lineTo(qx,96);x.stroke();
    }
  });
  TEX.concrete=mk(function(c,x){
    x.fillStyle='#8f8f88';x.fillRect(0,0,96,96);
    for(var i=0;i<900;i++){
      var v=Math.random();
      x.fillStyle=v>.5?'rgba(255,255,255,'+(Math.random()*.14).toFixed(3)+')'
                      :'rgba(40,40,38,'+(Math.random()*.20).toFixed(3)+')';
      x.fillRect(Math.random()*96,Math.random()*96,1+Math.random()*1.8,1+Math.random()*1.8);
    }
    for(var b=0;b<8;b++){
      var bx=Math.random()*96,by=Math.random()*96,br=6+Math.random()*16;
      var gr=x.createRadialGradient(bx,by,1,bx,by,br);
      gr.addColorStop(0,'rgba(120,120,114,.28)');gr.addColorStop(1,'rgba(120,120,114,0)');
      x.fillStyle=gr;x.beginPath();x.arc(bx,by,br,0,6.3);x.fill();
    }
  });
}
function mk(fn){var c=document.createElement('canvas');c.width=c.height=96;fn(c,c.getContext('2d'));return c}
var SIDE={wood:'#4a2f16',metal:'#3f464f',concrete:'#4c4c47'};
var FLOOR={wood:'#2a1d12',metal:'#161a20',concrete:'#1d1d1b'};

function load(n){
  lv=Math.max(0,Math.min(LEVELS.length-1,n));
  var L=LEVELS[lv],grid=L.grid;
  rows=grid.length;cols=grid[0].length;
  CS=Math.floor(Math.min(cv.width/cols,cv.height/rows));
  OX=Math.floor((cv.width-cols*CS)/2);OY=Math.floor((cv.height-rows*CS)/2);

  solid=[];surf=[];holes=[];gems=[];goal=null;startPt=null;parts=[];
  for(var r=0;r<rows;r++){
    solid[r]=[];surf[r]=[];
    for(var c=0;c<cols;c++){
      var ch=grid[r][c]||' ';
      solid[r][c]=(ch==='#');
      surf[r][c]=(ch==='i')?'ice':(ch==='m')?'mud':'';
      var cx=OX+c*CS+CS/2, cy=OY+r*CS+CS/2;
      if(ch==='S') startPt={x:cx,y:cy};
      if(ch==='G') goal={x:cx,y:cy};
      if(ch==='o') holes.push({x:cx,y:cy,r:CS*0.34});
      if(ch==='*') gems.push({x:cx,y:cy,got:false});
    }
  }
  movers=(L.movers||[]).map(function(m){
    return {x0:OX+m.x*CS,y0:OY+m.y*CS,w:m.w*CS,h:m.h*CS,ax:m.ax,
            dist:m.dist*CS,spd:m.spd,ph:m.ph,x:0,y:0,vx:0,vy:0};
  });
  spinners=(L.spinners||[]).map(function(s){
    return {cx:OX+s.x*CS,cy:OY+s.y*CS,len:s.len*CS,spd:s.spd,ph:s.ph,a:s.ph,th:CS*0.17};
  });

  ball.r=CS*0.30;reset(false);
  bakeStatic();
  elLvl.textContent=lv+1;elName.textContent=L.name;
  elBest.textContent=best[lv]?best[lv].toFixed(1):'—';
  paintLevelRail();updateGems();
}

function reset(keepTime){
  ball.x=startPt.x;ball.y=startPt.y;ball.vx=ball.vy=0;ball.dead=0;
  won=false;
  gems.forEach(function(m){m.got=false});
  if(!keepTime){elapsed=0;t0=performance.now()}
  updateGems();
}

function bakeStatic(){
  var L=LEVELS[lv];
  stat.width=cv.width;stat.height=cv.height;
  var x=sctx;
  x.clearRect(0,0,cv.width,cv.height);

  x.fillStyle=FLOOR[L.mat];x.fillRect(OX,OY,cols*CS,rows*CS);
  var fp=x.createPattern(TEX[L.mat],'repeat');
  x.save();x.globalAlpha=.14;x.fillStyle=fp;x.fillRect(OX,OY,cols*CS,rows*CS);x.restore();
  x.strokeStyle='rgba(255,255,255,.028)';x.lineWidth=1;
  for(var i=0;i<=cols;i++){x.beginPath();x.moveTo(OX+i*CS,OY);x.lineTo(OX+i*CS,OY+rows*CS);x.stroke()}
  for(var j=0;j<=rows;j++){x.beginPath();x.moveTo(OX,OY+j*CS);x.lineTo(OX+cols*CS,OY+j*CS);x.stroke()}

  for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
    if(!surf[r][c])continue;
    var px=OX+c*CS,py=OY+r*CS;
    if(surf[r][c]==='ice'){
      var lg=x.createLinearGradient(px,py,px+CS,py+CS);
      lg.addColorStop(0,'rgba(191,233,255,.55)');lg.addColorStop(1,'rgba(124,199,239,.35)');
      x.fillStyle=lg;x.fillRect(px,py,CS,CS);
      x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1;
      x.beginPath();x.moveTo(px+CS*.15,py+CS*.7);x.lineTo(px+CS*.5,py+CS*.2);x.lineTo(px+CS*.8,py+CS*.62);x.stroke();
    } else {
      x.fillStyle='rgba(90,74,44,.72)';x.fillRect(px,py,CS,CS);
      for(var k=0;k<9;k++){
        x.fillStyle='rgba(58,46,26,'+(0.2+Math.random()*0.3).toFixed(2)+')';
        x.beginPath();x.arc(px+Math.random()*CS,py+Math.random()*CS,CS*0.06+Math.random()*CS*0.07,0,6.3);x.fill();
      }
    }
  }

  holes.forEach(function(h){
    var gr=x.createRadialGradient(h.x-h.r*.2,h.y-h.r*.25,h.r*.12,h.x,h.y,h.r*1.08);
    gr.addColorStop(0,'#000');gr.addColorStop(.62,'#05070b');gr.addColorStop(1,'rgba(0,0,0,.15)');
    x.fillStyle=gr;x.beginPath();x.arc(h.x,h.y,h.r*1.08,0,6.3);x.fill();
    x.strokeStyle='rgba(255,255,255,.10)';x.lineWidth=1.6;
    x.beginPath();x.arc(h.x,h.y,h.r,Math.PI*1.05,Math.PI*1.95);x.stroke();
  });

  var D=Math.max(3,Math.round(CS*0.20));   // extrusion depth
  x.save();x.globalAlpha=.42;x.fillStyle='#000';
  each(function(px,py){x.fillRect(px+D*0.9,py+D*1.15,CS,CS)});
  x.restore();
  x.fillStyle=SIDE[L.mat];
  each(function(px,py){x.fillRect(px+D,py+D,CS,CS)});
  x.save();x.fillStyle=x.createPattern(TEX[L.mat],'repeat');
  each(function(px,py){x.fillRect(px,py,CS,CS)});
  x.restore();
  for(var rr=0;rr<rows;rr++)for(var cc=0;cc<cols;cc++){
    if(!solid[rr][cc])continue;
    var bx=OX+cc*CS,by=OY+rr*CS;
    var up=isSolid(rr-1,cc),dn=isSolid(rr+1,cc),lf=isSolid(rr,cc-1),rt=isSolid(rr,cc+1);
    x.lineWidth=Math.max(1.5,CS*0.06);
    if(!up){x.strokeStyle='rgba(255,255,255,.30)';x.beginPath();x.moveTo(bx,by+x.lineWidth/2);x.lineTo(bx+CS,by+x.lineWidth/2);x.stroke()}
    if(!lf){x.strokeStyle='rgba(255,255,255,.18)';x.beginPath();x.moveTo(bx+x.lineWidth/2,by);x.lineTo(bx+x.lineWidth/2,by+CS);x.stroke()}
    if(!dn){x.strokeStyle='rgba(0,0,0,.40)';x.beginPath();x.moveTo(bx,by+CS-x.lineWidth/2);x.lineTo(bx+CS,by+CS-x.lineWidth/2);x.stroke()}
    if(!rt){x.strokeStyle='rgba(0,0,0,.30)';x.beginPath();x.moveTo(bx+CS-x.lineWidth/2,by);x.lineTo(bx+CS-x.lineWidth/2,by+CS);x.stroke()}
  }
  x.strokeStyle='rgba(249,115,22,.20)';x.lineWidth=2;
  x.strokeRect(OX+1,OY+1,cols*CS-2,rows*CS-2);

  function each(fn){for(var r2=0;r2<rows;r2++)for(var c2=0;c2<cols;c2++)if(solid[r2][c2])fn(OX+c2*CS,OY+r2*CS)}
}
function isSolid(r,c){return r>=0&&r<rows&&c>=0&&c<cols&&solid[r][c]}

window.addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].indexOf(k)>-1){
    keys[k]=1;
    if(running&&(document.activeElement===cv||nearView()))e.preventDefault();
  }
});
window.addEventListener('keyup',function(e){keys[e.key.toLowerCase()]=0});
function nearView(){var r=cv.getBoundingClientRect();return r.top<window.innerHeight*0.8&&r.bottom>0}

cv.addEventListener('pointerdown',function(e){dragOn=true;dragX=e.clientX;dragY=e.clientY;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',function(e){
  if(!dragOn)return;
  ax=Math.max(-1,Math.min(1,(e.clientX-dragX)/90));
  ay=Math.max(-1,Math.min(1,(e.clientY-dragY)/90));
});
cv.addEventListener('pointerup',function(){dragOn=false;if(!tiltOn){ax=ay=0}});
cv.addEventListener('pointercancel',function(){dragOn=false;if(!tiltOn){ax=ay=0}});

document.querySelectorAll('[data-mzd]').forEach(function(b){
  var d=b.getAttribute('data-mzd');
  var on=function(e){e.preventDefault();keys[{up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}[d]]=1;b.classList.add('hit')};
  var off=function(){keys[{up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}[d]]=0;b.classList.remove('hit')};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);
  b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);
});
$('mzPadBtn').addEventListener('click',function(){
  var p=$('mzPad');p.classList.toggle('show');
  this.classList.toggle('on',p.classList.contains('show'));
});

function onTilt(e){
  if(e.gamma==null&&e.beta==null)return;
  if(!tiltZero)tiltZero={g:e.gamma||0,b:e.beta||0};
  ax=Math.max(-1,Math.min(1,((e.gamma||0)-tiltZero.g)/22));
  ay=Math.max(-1,Math.min(1,((e.beta ||0)-tiltZero.b)/22));
}
$('mzTiltBtn').addEventListener('click',function(){
  var btn=this;
  if(tiltOn){
    window.removeEventListener('deviceorientation',onTilt);
    tiltOn=false;tiltZero=null;ax=ay=0;
    btn.textContent='📱 TILT: OFF';btn.classList.remove('on');
    $('mzHint').innerHTML='Tip: on a phone, tap <strong>TILT</strong> and hold the device flat to calibrate.';
    return;
  }
  var go=function(){
    window.addEventListener('deviceorientation',onTilt);
    tiltOn=true;tiltZero=null;
    btn.textContent='📱 TILT: ON';btn.classList.add('on');
    $('mzHint').innerHTML='Hold your phone flat, then tilt to roll. Tap <strong>TILT</strong> again to recalibrate.';
  };
  if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
    DeviceOrientationEvent.requestPermission().then(function(res){
      if(res==='granted')go();
      else $('mzHint').textContent='Motion access was declined — use the D-pad or arrow keys instead.';
    }).catch(function(){$('mzHint').textContent='Motion unavailable on this device — use the D-pad instead.'});
  } else if('ondeviceorientation' in window){ go(); }
  else { $('mzHint').textContent='No motion sensor here — use the D-pad, arrow keys, or drag the board.'; }
});

var ACC=1750, MAXV=560;
function surfaceAt(px,py){
  var c=Math.floor((px-OX)/CS),r=Math.floor((py-OY)/CS);
  if(r<0||r>=rows||c<0||c>=cols)return '';
  return surf[r][c];
}
function step(dt){
  if(!running||won||ball.dead)return;
  var kx=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0);
  var ky=(keys.arrowdown ||keys.s?1:0)-(keys.arrowup  ||keys.w?1:0);
  var iax=kx||ax, iay=ky||ay;

  var s=surfaceAt(ball.x,ball.y);
  var fr=s==='ice'?0.996:s==='mud'?0.84:0.945;
  var pw=s==='mud'?0.45:s==='ice'?0.75:1;

  ball.vx+=iax*ACC*pw*dt; ball.vy+=iay*ACC*pw*dt;
  ball.vx*=Math.pow(fr,dt*60); ball.vy*=Math.pow(fr,dt*60);
  var sp=Math.hypot(ball.vx,ball.vy);
  if(sp>MAXV){ball.vx=ball.vx/sp*MAXV;ball.vy=ball.vy/sp*MAXV}

  var steps=Math.max(1,Math.ceil(sp*dt/(ball.r*0.7)));
  for(var i=0;i<steps;i++){
    ball.x+=ball.vx*dt/steps; ball.y+=ball.vy*dt/steps;
    collideWalls(); collideMovers(); collideSpinners();
  }
  for(var h=0;h<holes.length;h++){
    if(Math.hypot(ball.x-holes[h].x,ball.y-holes[h].y)<holes[h].r*0.62){fall();return}
  }
  gems.forEach(function(m){
    if(!m.got&&Math.hypot(ball.x-m.x,ball.y-m.y)<ball.r+CS*0.2){
      m.got=true;burst(m.x,m.y,'#f5c518',14);updateGems();
    }
  });
  if(goal&&allGot()&&Math.hypot(ball.x-goal.x,ball.y-goal.y)<CS*0.34)win();
}
function allGot(){return gems.every(function(m){return m.got})}
function updateGems(){
  var got=gems.filter(function(m){return m.got}).length;
  elGems.textContent=got+'/'+gems.length;
}
function circleRect(bx,by,br,rx,ry,rw,rh){
  var nx=Math.max(rx,Math.min(bx,rx+rw)), ny=Math.max(ry,Math.min(by,ry+rh));
  var dx=bx-nx, dy=by-ny, d2=dx*dx+dy*dy;
  if(d2>br*br||d2===0)return null;
  var d=Math.sqrt(d2);
  return {nx:dx/d,ny:dy/d,pen:br-d};
}
function collideWalls(){
  var c0=Math.floor((ball.x-ball.r-OX)/CS),c1=Math.floor((ball.x+ball.r-OX)/CS);
  var r0=Math.floor((ball.y-ball.r-OY)/CS),r1=Math.floor((ball.y+ball.r-OY)/CS);
  for(var r=r0;r<=r1;r++)for(var c=c0;c<=c1;c++){
    if(!isSolid(r,c))continue;
    var hit=circleRect(ball.x,ball.y,ball.r,OX+c*CS,OY+r*CS,CS,CS);
    if(!hit)continue;
    ball.x+=hit.nx*hit.pen; ball.y+=hit.ny*hit.pen;
    var dot=ball.vx*hit.nx+ball.vy*hit.ny;
    if(dot<0){ball.vx-=1.42*dot*hit.nx; ball.vy-=1.42*dot*hit.ny}
  }
}
function collideMovers(){
  movers.forEach(function(m){
    var hit=circleRect(ball.x,ball.y,ball.r,m.x,m.y,m.w,m.h);
    if(!hit)return;
    ball.x+=hit.nx*hit.pen; ball.y+=hit.ny*hit.pen;
    var rvx=ball.vx-m.vx, rvy=ball.vy-m.vy;
    var dot=rvx*hit.nx+rvy*hit.ny;
    if(dot<0){ball.vx-=1.42*dot*hit.nx; ball.vy-=1.42*dot*hit.ny}
    ball.vx+=m.vx*0.55; ball.vy+=m.vy*0.55;
  });
}
function collideSpinners(){
  spinners.forEach(function(s){
    var hx=Math.cos(s.a)*s.len/2, hy=Math.sin(s.a)*s.len/2;
    var x1=s.cx-hx,y1=s.cy-hy,x2=s.cx+hx,y2=s.cy+hy;
    var vx=x2-x1,vy=y2-y1,L2=vx*vx+vy*vy;
    var t=L2?Math.max(0,Math.min(1,((ball.x-x1)*vx+(ball.y-y1)*vy)/L2)):0;
    var px=x1+vx*t,py=y1+vy*t;
    var dx=ball.x-px,dy=ball.y-py,d=Math.hypot(dx,dy),rad=ball.r+s.th;
    if(d>=rad||d===0)return;
    var nx=dx/d,ny=dy/d;
    ball.x+=nx*(rad-d); ball.y+=ny*(rad-d);
    var dot=ball.vx*nx+ball.vy*ny;
    if(dot<0){ball.vx-=1.5*dot*nx; ball.vy-=1.5*dot*ny}
    var arm=Math.hypot(px-s.cx,py-s.cy);
    ball.vx+=-Math.sin(s.a)*s.spd*arm*0.55;
    ball.vy+= Math.cos(s.a)*s.spd*arm*0.55;
  });
}

function fall(){
  ball.dead=1;burst(ball.x,ball.y,'#334155',18);
  setTimeout(function(){
    reset(true);
    if(running)t0=performance.now()-elapsed*1000;
  },620);
}
function win(){
  won=true;running=false;
  cleared[lv]=true;
  var tm=elapsed;
  if(!best[lv]||tm<best[lv])best[lv]=tm;
  elBest.textContent=best[lv].toFixed(1);
  burst(goal.x,goal.y,'#00e676',34);
  paintLevelRail();
  var lastLevel=(lv===LEVELS.length-1);
  var reward=(lv===3)?{c:'MAZE100',d:'$100 off a custom branded game build'}
            :lastLevel?{c:'MAZEBOSS',d:'A free branded-game concept session — we sketch your version, no charge'}
            :null;
  showOv(lastLevel?'ALL 8 CLEARED':'LEVEL CLEAR',
    (reward
      ? 'Finished in '+tm.toFixed(1)+'s. You unlocked <strong style="color:#f5c518">'+reward.c+'</strong> — '+reward.d+'. Mention it when you call.'
      : 'Finished in '+tm.toFixed(1)+'s. Par was '+LEVELS[lv].par+'s.'),
    lastLevel?'↺ PLAY AGAIN':'NEXT LEVEL ▶',
    function(){ lastLevel?load(0):load(lv+1); begin(); },
    '↺ REPLAY', function(){ load(lv); begin(); });
}
function showOv(title,html,b1,f1,b2,f2){
  ovT.textContent=title;ovX.innerHTML=html;
  ovB.textContent=b1;ovB.onclick=function(){hideOv();f1()};
  if(b2){ovB2.style.display='';ovB2.textContent=b2;ovB2.onclick=function(){hideOv();f2()}}
  else ovB2.style.display='none';
  ov.classList.add('show');
}
function hideOv(){ov.classList.remove('show')}
function begin(){running=true;won=false;t0=performance.now();elapsed=0;hideOv()}

function burst(x,y,col,n){
  for(var i=0;i<n;i++){
    var a=Math.random()*6.3,sp=40+Math.random()*190;
    parts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,col:col,sz:2+Math.random()*4});
  }
}

function draw(now){
  g.clearRect(0,0,cv.width,cv.height);
  g.drawImage(stat,0,0);

  var L=LEVELS[lv],D=Math.max(3,Math.round(CS*0.20));

  movers.forEach(function(m){
    g.save();
    g.globalAlpha=.4;g.fillStyle='#000';g.fillRect(m.x+D*.9,m.y+D*1.15,m.w,m.h);g.globalAlpha=1;
    g.fillStyle='#7a3208';g.fillRect(m.x+D,m.y+D,m.w,m.h);
    var lg=g.createLinearGradient(m.x,m.y,m.x,m.y+m.h);
    lg.addColorStop(0,'#ff9d5c');lg.addColorStop(1,'#e0500f');
    g.fillStyle=lg;g.fillRect(m.x,m.y,m.w,m.h);
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=Math.max(1.5,CS*.05);
    g.strokeRect(m.x+g.lineWidth/2,m.y+g.lineWidth/2,m.w-g.lineWidth,m.h-g.lineWidth);
    g.save();g.beginPath();g.rect(m.x,m.y,m.w,m.h);g.clip();
    g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=CS*.16;
    for(var i=-m.h;i<m.w+m.h;i+=CS*.42){g.beginPath();g.moveTo(m.x+i,m.y);g.lineTo(m.x+i+m.h,m.y+m.h);g.stroke()}
    g.restore();g.restore();
  });

  spinners.forEach(function(s){
    var hx=Math.cos(s.a)*s.len/2,hy=Math.sin(s.a)*s.len/2;
    g.save();
    g.lineCap='round';
    g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=s.th*2;
    g.beginPath();g.moveTo(s.cx-hx+D*.8,s.cy-hy+D*.8);g.lineTo(s.cx+hx+D*.8,s.cy+hy+D*.8);g.stroke();
    var lg=g.createLinearGradient(s.cx-hx,s.cy-hy,s.cx+hx,s.cy+hy);
    lg.addColorStop(0,'#c084fc');lg.addColorStop(.5,'#8b5cf6');lg.addColorStop(1,'#c084fc');
    g.strokeStyle=lg;g.lineWidth=s.th*2;
    g.beginPath();g.moveTo(s.cx-hx,s.cy-hy);g.lineTo(s.cx+hx,s.cy+hy);g.stroke();
    g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=Math.max(1,s.th*.35);
    g.beginPath();g.moveTo(s.cx-hx,s.cy-hy-s.th*.4);g.lineTo(s.cx+hx,s.cy+hy-s.th*.4);g.stroke();
    g.fillStyle='#2d1b52';g.beginPath();g.arc(s.cx,s.cy,s.th*.9,0,6.3);g.fill();
    g.strokeStyle='rgba(196,181,253,.7)';g.lineWidth=2;g.stroke();
    g.restore();
  });

  var pulse=1+Math.sin(now*0.005)*0.12;
  gems.forEach(function(m){
    if(m.got)return;
    g.save();g.translate(m.x,m.y);g.scale(pulse,pulse);
    g.shadowColor='#f5c518';g.shadowBlur=CS*.55;
    var gr=g.createRadialGradient(-CS*.05,-CS*.06,CS*.02,0,0,CS*.2);
    gr.addColorStop(0,'#fff8d8');gr.addColorStop(.55,'#f5c518');gr.addColorStop(1,'#b8880a');
    g.fillStyle=gr;g.beginPath();g.arc(0,0,CS*.2,0,6.3);g.fill();
    g.shadowBlur=0;g.fillStyle='rgba(255,255,255,.75)';
    g.beginPath();g.arc(-CS*.06,-CS*.07,CS*.05,0,6.3);g.fill();
    g.restore();
  });

  if(goal){
    var open=allGot();
    var col=open?'#00e676':'#64748b';
    g.save();g.translate(goal.x,goal.y);
    g.shadowColor=col;g.shadowBlur=open?CS*.9:CS*.25;
    g.strokeStyle=col;g.lineWidth=Math.max(2,CS*.09);
    g.beginPath();g.arc(0,0,CS*.32*(open?pulse:1),0,6.3);g.stroke();
    g.shadowBlur=0;
    var gg=g.createRadialGradient(0,0,1,0,0,CS*.3);
    gg.addColorStop(0,open?'rgba(0,230,118,.5)':'rgba(15,23,42,.85)');
    gg.addColorStop(1,'rgba(0,0,0,.85)');
    g.fillStyle=gg;g.beginPath();g.arc(0,0,CS*.28,0,6.3);g.fill();
    if(!open){
      g.fillStyle='rgba(255,255,255,.5)';g.font='bold '+Math.round(CS*.3)+'px Inter,sans-serif';
      g.textAlign='center';g.textBaseline='middle';g.fillText('🔒',0,CS*.02);
    }
    g.restore();
  }

  if(!ball.dead){
    g.save();
    g.fillStyle='rgba(0,0,0,.45)';
    g.beginPath();g.ellipse(ball.x+ball.r*.42,ball.y+ball.r*.52,ball.r*.95,ball.r*.72,0,0,6.3);g.fill();
    var bg=g.createRadialGradient(ball.x-ball.r*.36,ball.y-ball.r*.4,ball.r*.06,ball.x,ball.y,ball.r*1.05);
    bg.addColorStop(0,'#ffffff');bg.addColorStop(.22,'#e9eef5');
    bg.addColorStop(.55,'#aab4c2');bg.addColorStop(.82,'#697485');bg.addColorStop(1,'#39424f');
    g.fillStyle=bg;g.beginPath();g.arc(ball.x,ball.y,ball.r,0,6.3);g.fill();
    g.strokeStyle='rgba(255,255,255,.30)';g.lineWidth=Math.max(1,ball.r*.12);
    g.beginPath();g.arc(ball.x,ball.y,ball.r*.93,Math.PI*.15,Math.PI*.85);g.stroke();
    g.fillStyle='rgba(255,255,255,.95)';
    g.beginPath();g.ellipse(ball.x-ball.r*.34,ball.y-ball.r*.38,ball.r*.19,ball.r*.13,-0.6,0,6.3);g.fill();
    g.restore();
  }

  for(var i=parts.length-1;i>=0;i--){
    var p=parts[i];
    g.globalAlpha=Math.max(0,p.life);
    g.fillStyle=p.col;g.beginPath();g.arc(p.x,p.y,p.sz,0,6.3);g.fill();
    g.globalAlpha=1;
  }

  if(running){
    var bx=cv.width-46,by=cv.height-46;
    g.save();g.globalAlpha=.5;
    g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1.5;
    g.beginPath();g.arc(bx,by,17,0,6.3);g.stroke();
    g.fillStyle='#00e5ff';
    g.beginPath();g.arc(bx+ax*11,by+ay*11,4.5,0,6.3);g.fill();
    g.restore();
  }
}

function frame(now){
  var dt=Math.min(0.033,(now-last)/1000||0);last=now;
  movers.forEach(function(m){
    var o=Math.sin(now/1000*m.spd+m.ph)*0.5+0.5, prev;
    if(m.ax==='x'){prev=m.x;m.x=m.x0+o*m.dist;m.y=m.y0;m.vx=(m.x-prev)/Math.max(dt,.001);m.vy=0}
    else{prev=m.y;m.y=m.y0+o*m.dist;m.x=m.x0;m.vy=(m.y-prev)/Math.max(dt,.001);m.vx=0}
  });
  spinners.forEach(function(s){s.a+=s.spd*dt});
  step(dt);
  for(var i=parts.length-1;i>=0;i--){
    var p=parts[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.94;p.vy*=.94;p.life-=dt*1.6;
    if(p.life<=0)parts.splice(i,1);
  }
  if(running&&!won&&!ball.dead){elapsed=(now-t0)/1000;elTime.textContent=elapsed.toFixed(1)}
  draw(now);
  raf=requestAnimationFrame(frame);
}

function paintLevelRail(){
  var w=$('mzLevels');w.innerHTML='';
  LEVELS.forEach(function(L,i){
    var b=document.createElement('button');
    b.className='mz-lv'+(cleared[i]?' done':'')+(i===lv?' cur':'');
    b.textContent=i+1;b.type='button';
    b.title=L.name;
    b.addEventListener('click',function(){load(i);begin()});
    w.appendChild(b);
  });
}
$('mzRetryBtn').addEventListener('click',function(){load(lv);begin()});
$('mzPrevBtn').addEventListener('click',function(){load(lv-1);begin()});
$('mzNextBtn').addEventListener('click',function(){load(lv+1);begin()});
ovB.onclick=function(){hideOv();begin()};

if('IntersectionObserver' in window){
  new IntersectionObserver(function(en){
    if(!en[0].isIntersecting&&running){running=false;showOv('PAUSED','Scrolled away, so the board is paused.','▶ RESUME',function(){running=true;t0=performance.now()-elapsed*1000})}
  },{threshold:0.12}).observe(cv);
}

buildTex();
load(0);
last=performance.now();
raf=requestAnimationFrame(frame);
})();


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
  var n = document.getElementById('dw-n'), you = document.getElementById('dw-you'),
      fy = document.getElementById('dw-fyou'), fa = document.getElementById('dw-favg'),
      lab = document.getElementById('dw-l');
  if (!n) return;

  var AVG = 52;          /* seconds — the bar being raced */
  var CEIL = 180;        /* both bars are drawn against three minutes */
  var secs = 0, timer = null;

  function fmt(s){
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function paint(){
    n.textContent = fmt(secs);
    if (you) you.textContent = fmt(secs);
    if (fy) fy.style.width = Math.min(100, (secs / CEIL) * 100) + '%';
    if (lab){
      lab.textContent = secs > AVG
        ? 'longer than a typical marketing page'
        : 'and counting';
    }
  }
  if (fa) fa.style.width = Math.min(100, (AVG / CEIL) * 100) + '%';
  paint();

  function tick(){ secs++; paint(); }
  function start(){ if (!timer) timer = setInterval(tick, 1000); }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }
  start();
  document.addEventListener('visibilitychange', function(){
    document.hidden ? stop() : start();
  });
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();



(function(){
'use strict';
var cv=document.getElementById('mzCanvas');
if(!cv) return;
var g=cv.getContext('2d');

var LEVELS=[
{name:'FIRST IMPRESSION',mat:'wood',par:12,grid:[
'###############',
'#S    #       #',
'#     #   *   #',
'#  ####       #',
'#     #  ######',
'####  #       #',
'#        ###  #',
'#  ####  # G  #',
'#     #       #',
'###############']},

{name:'BOUNCE RATE ALLEY',mat:'wood',par:16,grid:[
'###############',
'#S   o    #  *#',
'#    #    #   #',
'# ####  ###   #',
'#    #   o    #',
'#  o #  ###  ##',
'#    #    #   #',
'#### #  * #   #',
'#       # # G #',
'###############']},

{name:'ALGORITHM UPDATE',mat:'metal',par:20,grid:[
'###############',
'#S      #    *#',
'#       #     #',
'#####   #  ####',
'#   #      #  #',
'#   #  o   #  #',
'#      #      #',
'#  *   #   ####',
'#      #    G #',
'###############'],
movers:[{x:5,y:1,w:1,h:2,ax:'y',dist:4,spd:.55,ph:0},
        {x:8,y:6,w:2,h:1,ax:'x',dist:3,spd:.7,ph:1.6}]},

{name:'THE REVIEW GAUNTLET',mat:'metal',par:26,grid:[
'###############',
'#S  #   *  #  #',
'#   #      #  #',
'# o #  ##  # *#',
'#   #  ##     #',
'#      ##  # ##',
'#####      #  #',
'#  *   o   # G#',
'#          #  #',
'###############'],
movers:[{x:9,y:1,w:1,h:3,ax:'y',dist:1,spd:.6,ph:.8},
        {x:5,y:8,w:3,h:1,ax:'x',dist:2,spd:.85,ph:0}]},

{name:'SLIPPERY RANKINGS',mat:'concrete',par:24,grid:[
'###############',
'#S iiii   #  *#',
'#  iiii   #   #',
'#  iiii  ##   #',
'#      o      #',
'#  ###   iiii #',
'#  # *   iiii #',
'#  #   o iiii #',
'#         # G #',
'###############']},

{name:'THIN CONTENT SWAMP',mat:'concrete',par:28,grid:[
'###############',
'#S mmm #     *#',
'#  mmm #      #',
'#      #  ### #',
'#### o    #   #',
'#   #   mmm   #',
'# * #   mmm ###',
'#   #     o   #',
'#      ##   G #',
'###############'],
movers:[{x:6,y:1,w:1,h:2,ax:'y',dist:5,spd:.5,ph:.4}]},

{name:'COMPETITOR SPIN',mat:'metal',par:30,grid:[
'###############',
'#S      #    *#',
'#       #     #',
'#   #####     #',
'#             #',
'#     o    ####',
'#  ###        #',
'#   #    *    #',
'# G #         #',
'###############'],
spinners:[{x:11.5,y:3.5,len:2.4,spd:1.15,ph:0},
          {x:7.5,y:7.5,len:2.0,spd:-1.5,ph:1.2}]},

{name:'PAGE ONE',mat:'concrete',par:38,grid:[
'###############',
'#S  o  #  iii #',
'#      #  iii #',
'#  #####      #',
'#  #    o   ###',
'#  #  mmm     #',
'#     mmm  *  #',
'####       ####',
'# *    o    G #',
'###############'],
movers:[{x:9,y:1,w:1,h:3,ax:'y',dist:3,spd:.75,ph:0},
        {x:3,y:8,w:2,h:1,ax:'x',dist:2,spd:.6,ph:1}],
spinners:[{x:10.5,y:3.5,len:2.2,spd:1.3,ph:.5}]}
];

var lv=0,cols=0,rows=0,CS=0,OX=0,OY=0;
var solid=[],surf=[],holes=[],gems=[],goal=null,startPt=null;
var movers=[],spinners=[];
var ball={x:0,y:0,vx:0,vy:0,r:0,dead:0};
var running=false,won=false,t0=0,elapsed=0,best={},cleared={};
var ax=0,ay=0,tiltOn=false,tiltZero=null,parts=[];
var keys={},dragOn=false,dragX=0,dragY=0;
var stat=document.createElement('canvas'),sctx=stat.getContext('2d');
var last=0,raf=0;

var $=function(id){return document.getElementById(id)};
var elLvl=$('mzLvl'),elName=$('mzName'),elGems=$('mzGems'),elTime=$('mzTime'),elBest=$('mzBest');
var ov=$('mzOverlay'),ovT=$('mzOvTitle'),ovX=$('mzOvText'),ovB=$('mzOvBtn'),ovB2=$('mzOvBtn2');

var TEX={};
function buildTex(){
  TEX.wood=mk(function(c,x){
    x.fillStyle='#8a5a30';x.fillRect(0,0,96,96);
    for(var i=0;i<40;i++){
      x.strokeStyle='rgba(60,34,14,'+(0.05+Math.random()*0.16).toFixed(3)+')';
      x.lineWidth=0.6+Math.random()*2.2;x.beginPath();
      var y=Math.random()*96;x.moveTo(0,y);
      for(var px=0;px<=96;px+=8)x.lineTo(px,y+Math.sin(px*0.09+i)*2.2);
      x.stroke();
    }
    for(var k=0;k<2;k++){
      var kx=Math.random()*96,ky=Math.random()*96;
      var gr=x.createRadialGradient(kx,ky,1,kx,ky,7);
      gr.addColorStop(0,'rgba(52,28,10,.55)');gr.addColorStop(1,'rgba(52,28,10,0)');
      x.fillStyle=gr;x.beginPath();x.arc(kx,ky,7,0,6.3);x.fill();
    }
  });
  TEX.metal=mk(function(c,x){
    var lg=x.createLinearGradient(0,0,0,96);
    lg.addColorStop(0,'#99a2ad');lg.addColorStop(.5,'#7e8792');lg.addColorStop(1,'#8d96a1');
    x.fillStyle=lg;x.fillRect(0,0,96,96);
    for(var i=0;i<160;i++){
      x.strokeStyle='rgba(255,255,255,'+(Math.random()*0.07).toFixed(3)+')';
      x.lineWidth=Math.random()*1.4;var px=Math.random()*96;
      x.beginPath();x.moveTo(px,0);x.lineTo(px,96);x.stroke();
    }
    for(var j=0;j<70;j++){
      x.strokeStyle='rgba(30,36,44,'+(Math.random()*0.09).toFixed(3)+')';
      x.lineWidth=Math.random();var qx=Math.random()*96;
      x.beginPath();x.moveTo(qx,0);x.lineTo(qx,96);x.stroke();
    }
  });
  TEX.concrete=mk(function(c,x){
    x.fillStyle='#8f8f88';x.fillRect(0,0,96,96);
    for(var i=0;i<900;i++){
      var v=Math.random();
      x.fillStyle=v>.5?'rgba(255,255,255,'+(Math.random()*.14).toFixed(3)+')'
                      :'rgba(40,40,38,'+(Math.random()*.20).toFixed(3)+')';
      x.fillRect(Math.random()*96,Math.random()*96,1+Math.random()*1.8,1+Math.random()*1.8);
    }
    for(var b=0;b<8;b++){
      var bx=Math.random()*96,by=Math.random()*96,br=6+Math.random()*16;
      var gr=x.createRadialGradient(bx,by,1,bx,by,br);
      gr.addColorStop(0,'rgba(120,120,114,.28)');gr.addColorStop(1,'rgba(120,120,114,0)');
      x.fillStyle=gr;x.beginPath();x.arc(bx,by,br,0,6.3);x.fill();
    }
  });
}
function mk(fn){var c=document.createElement('canvas');c.width=c.height=96;fn(c,c.getContext('2d'));return c}
var SIDE={wood:'#4a2f16',metal:'#3f464f',concrete:'#4c4c47'};
var FLOOR={wood:'#2a1d12',metal:'#161a20',concrete:'#1d1d1b'};

function load(n){
  lv=Math.max(0,Math.min(LEVELS.length-1,n));
  var L=LEVELS[lv],grid=L.grid;
  rows=grid.length;cols=grid[0].length;
  CS=Math.floor(Math.min(cv.width/cols,cv.height/rows));
  OX=Math.floor((cv.width-cols*CS)/2);OY=Math.floor((cv.height-rows*CS)/2);

  solid=[];surf=[];holes=[];gems=[];goal=null;startPt=null;parts=[];
  for(var r=0;r<rows;r++){
    solid[r]=[];surf[r]=[];
    for(var c=0;c<cols;c++){
      var ch=grid[r][c]||' ';
      solid[r][c]=(ch==='#');
      surf[r][c]=(ch==='i')?'ice':(ch==='m')?'mud':'';
      var cx=OX+c*CS+CS/2, cy=OY+r*CS+CS/2;
      if(ch==='S') startPt={x:cx,y:cy};
      if(ch==='G') goal={x:cx,y:cy};
      if(ch==='o') holes.push({x:cx,y:cy,r:CS*0.34});
      if(ch==='*') gems.push({x:cx,y:cy,got:false});
    }
  }
  movers=(L.movers||[]).map(function(m){
    return {x0:OX+m.x*CS,y0:OY+m.y*CS,w:m.w*CS,h:m.h*CS,ax:m.ax,
            dist:m.dist*CS,spd:m.spd,ph:m.ph,x:0,y:0,vx:0,vy:0};
  });
  spinners=(L.spinners||[]).map(function(s){
    return {cx:OX+s.x*CS,cy:OY+s.y*CS,len:s.len*CS,spd:s.spd,ph:s.ph,a:s.ph,th:CS*0.17};
  });

  ball.r=CS*0.30;reset(false);
  bakeStatic();
  elLvl.textContent=lv+1;elName.textContent=L.name;
  elBest.textContent=best[lv]?best[lv].toFixed(1):'—';
  paintLevelRail();updateGems();
}

function reset(keepTime){
  ball.x=startPt.x;ball.y=startPt.y;ball.vx=ball.vy=0;ball.dead=0;
  won=false;
  gems.forEach(function(m){m.got=false});
  if(!keepTime){elapsed=0;t0=performance.now()}
  updateGems();
}

function bakeStatic(){
  var L=LEVELS[lv];
  stat.width=cv.width;stat.height=cv.height;
  var x=sctx;
  x.clearRect(0,0,cv.width,cv.height);

  x.fillStyle=FLOOR[L.mat];x.fillRect(OX,OY,cols*CS,rows*CS);
  var fp=x.createPattern(TEX[L.mat],'repeat');
  x.save();x.globalAlpha=.14;x.fillStyle=fp;x.fillRect(OX,OY,cols*CS,rows*CS);x.restore();
  x.strokeStyle='rgba(255,255,255,.028)';x.lineWidth=1;
  for(var i=0;i<=cols;i++){x.beginPath();x.moveTo(OX+i*CS,OY);x.lineTo(OX+i*CS,OY+rows*CS);x.stroke()}
  for(var j=0;j<=rows;j++){x.beginPath();x.moveTo(OX,OY+j*CS);x.lineTo(OX+cols*CS,OY+j*CS);x.stroke()}

  for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
    if(!surf[r][c])continue;
    var px=OX+c*CS,py=OY+r*CS;
    if(surf[r][c]==='ice'){
      var lg=x.createLinearGradient(px,py,px+CS,py+CS);
      lg.addColorStop(0,'rgba(191,233,255,.55)');lg.addColorStop(1,'rgba(124,199,239,.35)');
      x.fillStyle=lg;x.fillRect(px,py,CS,CS);
      x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1;
      x.beginPath();x.moveTo(px+CS*.15,py+CS*.7);x.lineTo(px+CS*.5,py+CS*.2);x.lineTo(px+CS*.8,py+CS*.62);x.stroke();
    } else {
      x.fillStyle='rgba(90,74,44,.72)';x.fillRect(px,py,CS,CS);
      for(var k=0;k<9;k++){
        x.fillStyle='rgba(58,46,26,'+(0.2+Math.random()*0.3).toFixed(2)+')';
        x.beginPath();x.arc(px+Math.random()*CS,py+Math.random()*CS,CS*0.06+Math.random()*CS*0.07,0,6.3);x.fill();
      }
    }
  }

  holes.forEach(function(h){
    var gr=x.createRadialGradient(h.x-h.r*.2,h.y-h.r*.25,h.r*.12,h.x,h.y,h.r*1.08);
    gr.addColorStop(0,'#000');gr.addColorStop(.62,'#05070b');gr.addColorStop(1,'rgba(0,0,0,.15)');
    x.fillStyle=gr;x.beginPath();x.arc(h.x,h.y,h.r*1.08,0,6.3);x.fill();
    x.strokeStyle='rgba(255,255,255,.10)';x.lineWidth=1.6;
    x.beginPath();x.arc(h.x,h.y,h.r,Math.PI*1.05,Math.PI*1.95);x.stroke();
  });

  var D=Math.max(3,Math.round(CS*0.20));   // extrusion depth
  x.save();x.globalAlpha=.42;x.fillStyle='#000';
  each(function(px,py){x.fillRect(px+D*0.9,py+D*1.15,CS,CS)});
  x.restore();
  x.fillStyle=SIDE[L.mat];
  each(function(px,py){x.fillRect(px+D,py+D,CS,CS)});
  x.save();x.fillStyle=x.createPattern(TEX[L.mat],'repeat');
  each(function(px,py){x.fillRect(px,py,CS,CS)});
  x.restore();
  for(var rr=0;rr<rows;rr++)for(var cc=0;cc<cols;cc++){
    if(!solid[rr][cc])continue;
    var bx=OX+cc*CS,by=OY+rr*CS;
    var up=isSolid(rr-1,cc),dn=isSolid(rr+1,cc),lf=isSolid(rr,cc-1),rt=isSolid(rr,cc+1);
    x.lineWidth=Math.max(1.5,CS*0.06);
    if(!up){x.strokeStyle='rgba(255,255,255,.30)';x.beginPath();x.moveTo(bx,by+x.lineWidth/2);x.lineTo(bx+CS,by+x.lineWidth/2);x.stroke()}
    if(!lf){x.strokeStyle='rgba(255,255,255,.18)';x.beginPath();x.moveTo(bx+x.lineWidth/2,by);x.lineTo(bx+x.lineWidth/2,by+CS);x.stroke()}
    if(!dn){x.strokeStyle='rgba(0,0,0,.40)';x.beginPath();x.moveTo(bx,by+CS-x.lineWidth/2);x.lineTo(bx+CS,by+CS-x.lineWidth/2);x.stroke()}
    if(!rt){x.strokeStyle='rgba(0,0,0,.30)';x.beginPath();x.moveTo(bx+CS-x.lineWidth/2,by);x.lineTo(bx+CS-x.lineWidth/2,by+CS);x.stroke()}
  }
  x.strokeStyle='rgba(249,115,22,.20)';x.lineWidth=2;
  x.strokeRect(OX+1,OY+1,cols*CS-2,rows*CS-2);

  function each(fn){for(var r2=0;r2<rows;r2++)for(var c2=0;c2<cols;c2++)if(solid[r2][c2])fn(OX+c2*CS,OY+r2*CS)}
}
function isSolid(r,c){return r>=0&&r<rows&&c>=0&&c<cols&&solid[r][c]}

window.addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].indexOf(k)>-1){
    keys[k]=1;
    if(running&&(document.activeElement===cv||nearView()))e.preventDefault();
  }
});
window.addEventListener('keyup',function(e){keys[e.key.toLowerCase()]=0});
function nearView(){var r=cv.getBoundingClientRect();return r.top<window.innerHeight*0.8&&r.bottom>0}

cv.addEventListener('pointerdown',function(e){dragOn=true;dragX=e.clientX;dragY=e.clientY;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',function(e){
  if(!dragOn)return;
  ax=Math.max(-1,Math.min(1,(e.clientX-dragX)/90));
  ay=Math.max(-1,Math.min(1,(e.clientY-dragY)/90));
});
cv.addEventListener('pointerup',function(){dragOn=false;if(!tiltOn){ax=ay=0}});
cv.addEventListener('pointercancel',function(){dragOn=false;if(!tiltOn){ax=ay=0}});

document.querySelectorAll('[data-mzd]').forEach(function(b){
  var d=b.getAttribute('data-mzd');
  var on=function(e){e.preventDefault();keys[{up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}[d]]=1;b.classList.add('hit')};
  var off=function(){keys[{up:'arrowup',down:'arrowdown',left:'arrowleft',right:'arrowright'}[d]]=0;b.classList.remove('hit')};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);
  b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);
});
$('mzPadBtn').addEventListener('click',function(){
  var p=$('mzPad');p.classList.toggle('show');
  this.classList.toggle('on',p.classList.contains('show'));
});

function onTilt(e){
  if(e.gamma==null&&e.beta==null)return;
  if(!tiltZero)tiltZero={g:e.gamma||0,b:e.beta||0};
  ax=Math.max(-1,Math.min(1,((e.gamma||0)-tiltZero.g)/22));
  ay=Math.max(-1,Math.min(1,((e.beta ||0)-tiltZero.b)/22));
}
$('mzTiltBtn').addEventListener('click',function(){
  var btn=this;
  if(tiltOn){
    window.removeEventListener('deviceorientation',onTilt);
    tiltOn=false;tiltZero=null;ax=ay=0;
    btn.textContent='📱 TILT: OFF';btn.classList.remove('on');
    $('mzHint').innerHTML='Tip: on a phone, tap <strong>TILT</strong> and hold the device flat to calibrate.';
    return;
  }
  var go=function(){
    window.addEventListener('deviceorientation',onTilt);
    tiltOn=true;tiltZero=null;
    btn.textContent='📱 TILT: ON';btn.classList.add('on');
    $('mzHint').innerHTML='Hold your phone flat, then tilt to roll. Tap <strong>TILT</strong> again to recalibrate.';
  };
  if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
    DeviceOrientationEvent.requestPermission().then(function(res){
      if(res==='granted')go();
      else $('mzHint').textContent='Motion access was declined — use the D-pad or arrow keys instead.';
    }).catch(function(){$('mzHint').textContent='Motion unavailable on this device — use the D-pad instead.'});
  } else if('ondeviceorientation' in window){ go(); }
  else { $('mzHint').textContent='No motion sensor here — use the D-pad, arrow keys, or drag the board.'; }
});

var ACC=1750, MAXV=560;
function surfaceAt(px,py){
  var c=Math.floor((px-OX)/CS),r=Math.floor((py-OY)/CS);
  if(r<0||r>=rows||c<0||c>=cols)return '';
  return surf[r][c];
}
function step(dt){
  if(!running||won||ball.dead)return;
  var kx=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0);
  var ky=(keys.arrowdown ||keys.s?1:0)-(keys.arrowup  ||keys.w?1:0);
  var iax=kx||ax, iay=ky||ay;

  var s=surfaceAt(ball.x,ball.y);
  var fr=s==='ice'?0.996:s==='mud'?0.84:0.945;
  var pw=s==='mud'?0.45:s==='ice'?0.75:1;

  ball.vx+=iax*ACC*pw*dt; ball.vy+=iay*ACC*pw*dt;
  ball.vx*=Math.pow(fr,dt*60); ball.vy*=Math.pow(fr,dt*60);
  var sp=Math.hypot(ball.vx,ball.vy);
  if(sp>MAXV){ball.vx=ball.vx/sp*MAXV;ball.vy=ball.vy/sp*MAXV}

  var steps=Math.max(1,Math.ceil(sp*dt/(ball.r*0.7)));
  for(var i=0;i<steps;i++){
    ball.x+=ball.vx*dt/steps; ball.y+=ball.vy*dt/steps;
    collideWalls(); collideMovers(); collideSpinners();
  }
  for(var h=0;h<holes.length;h++){
    if(Math.hypot(ball.x-holes[h].x,ball.y-holes[h].y)<holes[h].r*0.62){fall();return}
  }
  gems.forEach(function(m){
    if(!m.got&&Math.hypot(ball.x-m.x,ball.y-m.y)<ball.r+CS*0.2){
      m.got=true;burst(m.x,m.y,'#f5c518',14);updateGems();
    }
  });
  if(goal&&allGot()&&Math.hypot(ball.x-goal.x,ball.y-goal.y)<CS*0.34)win();
}
function allGot(){return gems.every(function(m){return m.got})}
function updateGems(){
  var got=gems.filter(function(m){return m.got}).length;
  elGems.textContent=got+'/'+gems.length;
}
function circleRect(bx,by,br,rx,ry,rw,rh){
  var nx=Math.max(rx,Math.min(bx,rx+rw)), ny=Math.max(ry,Math.min(by,ry+rh));
  var dx=bx-nx, dy=by-ny, d2=dx*dx+dy*dy;
  if(d2>br*br||d2===0)return null;
  var d=Math.sqrt(d2);
  return {nx:dx/d,ny:dy/d,pen:br-d};
}
function collideWalls(){
  var c0=Math.floor((ball.x-ball.r-OX)/CS),c1=Math.floor((ball.x+ball.r-OX)/CS);
  var r0=Math.floor((ball.y-ball.r-OY)/CS),r1=Math.floor((ball.y+ball.r-OY)/CS);
  for(var r=r0;r<=r1;r++)for(var c=c0;c<=c1;c++){
    if(!isSolid(r,c))continue;
    var hit=circleRect(ball.x,ball.y,ball.r,OX+c*CS,OY+r*CS,CS,CS);
    if(!hit)continue;
    ball.x+=hit.nx*hit.pen; ball.y+=hit.ny*hit.pen;
    var dot=ball.vx*hit.nx+ball.vy*hit.ny;
    if(dot<0){ball.vx-=1.42*dot*hit.nx; ball.vy-=1.42*dot*hit.ny}
  }
}
function collideMovers(){
  movers.forEach(function(m){
    var hit=circleRect(ball.x,ball.y,ball.r,m.x,m.y,m.w,m.h);
    if(!hit)return;
    ball.x+=hit.nx*hit.pen; ball.y+=hit.ny*hit.pen;
    var rvx=ball.vx-m.vx, rvy=ball.vy-m.vy;
    var dot=rvx*hit.nx+rvy*hit.ny;
    if(dot<0){ball.vx-=1.42*dot*hit.nx; ball.vy-=1.42*dot*hit.ny}
    ball.vx+=m.vx*0.55; ball.vy+=m.vy*0.55;
  });
}
function collideSpinners(){
  spinners.forEach(function(s){
    var hx=Math.cos(s.a)*s.len/2, hy=Math.sin(s.a)*s.len/2;
    var x1=s.cx-hx,y1=s.cy-hy,x2=s.cx+hx,y2=s.cy+hy;
    var vx=x2-x1,vy=y2-y1,L2=vx*vx+vy*vy;
    var t=L2?Math.max(0,Math.min(1,((ball.x-x1)*vx+(ball.y-y1)*vy)/L2)):0;
    var px=x1+vx*t,py=y1+vy*t;
    var dx=ball.x-px,dy=ball.y-py,d=Math.hypot(dx,dy),rad=ball.r+s.th;
    if(d>=rad||d===0)return;
    var nx=dx/d,ny=dy/d;
    ball.x+=nx*(rad-d); ball.y+=ny*(rad-d);
    var dot=ball.vx*nx+ball.vy*ny;
    if(dot<0){ball.vx-=1.5*dot*nx; ball.vy-=1.5*dot*ny}
    var arm=Math.hypot(px-s.cx,py-s.cy);
    ball.vx+=-Math.sin(s.a)*s.spd*arm*0.55;
    ball.vy+= Math.cos(s.a)*s.spd*arm*0.55;
  });
}

function fall(){
  ball.dead=1;burst(ball.x,ball.y,'#334155',18);
  setTimeout(function(){
    reset(true);
    if(running)t0=performance.now()-elapsed*1000;
  },620);
}
function win(){
  won=true;running=false;
  cleared[lv]=true;
  var tm=elapsed;
  if(!best[lv]||tm<best[lv])best[lv]=tm;
  elBest.textContent=best[lv].toFixed(1);
  burst(goal.x,goal.y,'#00e676',34);
  paintLevelRail();
  var lastLevel=(lv===LEVELS.length-1);
  var reward=(lv===3)?{c:'MAZE100',d:'$100 off a custom branded game build'}
            :lastLevel?{c:'MAZEBOSS',d:'A free branded-game concept session — we sketch your version, no charge'}
            :null;
  showOv(lastLevel?'ALL 8 CLEARED':'LEVEL CLEAR',
    (reward
      ? 'Finished in '+tm.toFixed(1)+'s. You unlocked <strong style="color:#f5c518">'+reward.c+'</strong> — '+reward.d+'. Mention it when you call.'
      : 'Finished in '+tm.toFixed(1)+'s. Par was '+LEVELS[lv].par+'s.'),
    lastLevel?'↺ PLAY AGAIN':'NEXT LEVEL ▶',
    function(){ lastLevel?load(0):load(lv+1); begin(); },
    '↺ REPLAY', function(){ load(lv); begin(); });
}
function showOv(title,html,b1,f1,b2,f2){
  ovT.textContent=title;ovX.innerHTML=html;
  ovB.textContent=b1;ovB.onclick=function(){hideOv();f1()};
  if(b2){ovB2.style.display='';ovB2.textContent=b2;ovB2.onclick=function(){hideOv();f2()}}
  else ovB2.style.display='none';
  ov.classList.add('show');
}
function hideOv(){ov.classList.remove('show')}
function begin(){running=true;won=false;t0=performance.now();elapsed=0;hideOv()}

function burst(x,y,col,n){
  for(var i=0;i<n;i++){
    var a=Math.random()*6.3,sp=40+Math.random()*190;
    parts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,col:col,sz:2+Math.random()*4});
  }
}

function draw(now){
  g.clearRect(0,0,cv.width,cv.height);
  g.drawImage(stat,0,0);

  var L=LEVELS[lv],D=Math.max(3,Math.round(CS*0.20));

  movers.forEach(function(m){
    g.save();
    g.globalAlpha=.4;g.fillStyle='#000';g.fillRect(m.x+D*.9,m.y+D*1.15,m.w,m.h);g.globalAlpha=1;
    g.fillStyle='#7a3208';g.fillRect(m.x+D,m.y+D,m.w,m.h);
    var lg=g.createLinearGradient(m.x,m.y,m.x,m.y+m.h);
    lg.addColorStop(0,'#ff9d5c');lg.addColorStop(1,'#e0500f');
    g.fillStyle=lg;g.fillRect(m.x,m.y,m.w,m.h);
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=Math.max(1.5,CS*.05);
    g.strokeRect(m.x+g.lineWidth/2,m.y+g.lineWidth/2,m.w-g.lineWidth,m.h-g.lineWidth);
    g.save();g.beginPath();g.rect(m.x,m.y,m.w,m.h);g.clip();
    g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=CS*.16;
    for(var i=-m.h;i<m.w+m.h;i+=CS*.42){g.beginPath();g.moveTo(m.x+i,m.y);g.lineTo(m.x+i+m.h,m.y+m.h);g.stroke()}
    g.restore();g.restore();
  });

  spinners.forEach(function(s){
    var hx=Math.cos(s.a)*s.len/2,hy=Math.sin(s.a)*s.len/2;
    g.save();
    g.lineCap='round';
    g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=s.th*2;
    g.beginPath();g.moveTo(s.cx-hx+D*.8,s.cy-hy+D*.8);g.lineTo(s.cx+hx+D*.8,s.cy+hy+D*.8);g.stroke();
    var lg=g.createLinearGradient(s.cx-hx,s.cy-hy,s.cx+hx,s.cy+hy);
    lg.addColorStop(0,'#c084fc');lg.addColorStop(.5,'#8b5cf6');lg.addColorStop(1,'#c084fc');
    g.strokeStyle=lg;g.lineWidth=s.th*2;
    g.beginPath();g.moveTo(s.cx-hx,s.cy-hy);g.lineTo(s.cx+hx,s.cy+hy);g.stroke();
    g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=Math.max(1,s.th*.35);
    g.beginPath();g.moveTo(s.cx-hx,s.cy-hy-s.th*.4);g.lineTo(s.cx+hx,s.cy+hy-s.th*.4);g.stroke();
    g.fillStyle='#2d1b52';g.beginPath();g.arc(s.cx,s.cy,s.th*.9,0,6.3);g.fill();
    g.strokeStyle='rgba(196,181,253,.7)';g.lineWidth=2;g.stroke();
    g.restore();
  });

  var pulse=1+Math.sin(now*0.005)*0.12;
  gems.forEach(function(m){
    if(m.got)return;
    g.save();g.translate(m.x,m.y);g.scale(pulse,pulse);
    g.shadowColor='#f5c518';g.shadowBlur=CS*.55;
    var gr=g.createRadialGradient(-CS*.05,-CS*.06,CS*.02,0,0,CS*.2);
    gr.addColorStop(0,'#fff8d8');gr.addColorStop(.55,'#f5c518');gr.addColorStop(1,'#b8880a');
    g.fillStyle=gr;g.beginPath();g.arc(0,0,CS*.2,0,6.3);g.fill();
    g.shadowBlur=0;g.fillStyle='rgba(255,255,255,.75)';
    g.beginPath();g.arc(-CS*.06,-CS*.07,CS*.05,0,6.3);g.fill();
    g.restore();
  });

  if(goal){
    var open=allGot();
    var col=open?'#00e676':'#64748b';
    g.save();g.translate(goal.x,goal.y);
    g.shadowColor=col;g.shadowBlur=open?CS*.9:CS*.25;
    g.strokeStyle=col;g.lineWidth=Math.max(2,CS*.09);
    g.beginPath();g.arc(0,0,CS*.32*(open?pulse:1),0,6.3);g.stroke();
    g.shadowBlur=0;
    var gg=g.createRadialGradient(0,0,1,0,0,CS*.3);
    gg.addColorStop(0,open?'rgba(0,230,118,.5)':'rgba(15,23,42,.85)');
    gg.addColorStop(1,'rgba(0,0,0,.85)');
    g.fillStyle=gg;g.beginPath();g.arc(0,0,CS*.28,0,6.3);g.fill();
    if(!open){
      g.fillStyle='rgba(255,255,255,.5)';g.font='bold '+Math.round(CS*.3)+'px Inter,sans-serif';
      g.textAlign='center';g.textBaseline='middle';g.fillText('🔒',0,CS*.02);
    }
    g.restore();
  }

  if(!ball.dead){
    g.save();
    g.fillStyle='rgba(0,0,0,.45)';
    g.beginPath();g.ellipse(ball.x+ball.r*.42,ball.y+ball.r*.52,ball.r*.95,ball.r*.72,0,0,6.3);g.fill();
    var bg=g.createRadialGradient(ball.x-ball.r*.36,ball.y-ball.r*.4,ball.r*.06,ball.x,ball.y,ball.r*1.05);
    bg.addColorStop(0,'#ffffff');bg.addColorStop(.22,'#e9eef5');
    bg.addColorStop(.55,'#aab4c2');bg.addColorStop(.82,'#697485');bg.addColorStop(1,'#39424f');
    g.fillStyle=bg;g.beginPath();g.arc(ball.x,ball.y,ball.r,0,6.3);g.fill();
    g.strokeStyle='rgba(255,255,255,.30)';g.lineWidth=Math.max(1,ball.r*.12);
    g.beginPath();g.arc(ball.x,ball.y,ball.r*.93,Math.PI*.15,Math.PI*.85);g.stroke();
    g.fillStyle='rgba(255,255,255,.95)';
    g.beginPath();g.ellipse(ball.x-ball.r*.34,ball.y-ball.r*.38,ball.r*.19,ball.r*.13,-0.6,0,6.3);g.fill();
    g.restore();
  }

  for(var i=parts.length-1;i>=0;i--){
    var p=parts[i];
    g.globalAlpha=Math.max(0,p.life);
    g.fillStyle=p.col;g.beginPath();g.arc(p.x,p.y,p.sz,0,6.3);g.fill();
    g.globalAlpha=1;
  }

  if(running){
    var bx=cv.width-46,by=cv.height-46;
    g.save();g.globalAlpha=.5;
    g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1.5;
    g.beginPath();g.arc(bx,by,17,0,6.3);g.stroke();
    g.fillStyle='#00e5ff';
    g.beginPath();g.arc(bx+ax*11,by+ay*11,4.5,0,6.3);g.fill();
    g.restore();
  }
}

function frame(now){
  var dt=Math.min(0.033,(now-last)/1000||0);last=now;
  movers.forEach(function(m){
    var o=Math.sin(now/1000*m.spd+m.ph)*0.5+0.5, prev;
    if(m.ax==='x'){prev=m.x;m.x=m.x0+o*m.dist;m.y=m.y0;m.vx=(m.x-prev)/Math.max(dt,.001);m.vy=0}
    else{prev=m.y;m.y=m.y0+o*m.dist;m.x=m.x0;m.vy=(m.y-prev)/Math.max(dt,.001);m.vx=0}
  });
  spinners.forEach(function(s){s.a+=s.spd*dt});
  step(dt);
  for(var i=parts.length-1;i>=0;i--){
    var p=parts[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.94;p.vy*=.94;p.life-=dt*1.6;
    if(p.life<=0)parts.splice(i,1);
  }
  if(running&&!won&&!ball.dead){elapsed=(now-t0)/1000;elTime.textContent=elapsed.toFixed(1)}
  draw(now);
  raf=requestAnimationFrame(frame);
}

function paintLevelRail(){
  var w=$('mzLevels');w.innerHTML='';
  LEVELS.forEach(function(L,i){
    var b=document.createElement('button');
    b.className='mz-lv'+(cleared[i]?' done':'')+(i===lv?' cur':'');
    b.textContent=i+1;b.type='button';
    b.title=L.name;
    b.addEventListener('click',function(){load(i);begin()});
    w.appendChild(b);
  });
}
$('mzRetryBtn').addEventListener('click',function(){load(lv);begin()});
$('mzPrevBtn').addEventListener('click',function(){load(lv-1);begin()});
$('mzNextBtn').addEventListener('click',function(){load(lv+1);begin()});
ovB.onclick=function(){hideOv();begin()};

if('IntersectionObserver' in window){
  new IntersectionObserver(function(en){
    if(!en[0].isIntersecting&&running){running=false;showOv('PAUSED','Scrolled away, so the board is paused.','▶ RESUME',function(){running=true;t0=performance.now()-elapsed*1000})}
  },{threshold:0.12}).observe(cv);
}

buildTex();
load(0);
last=performance.now();
raf=requestAnimationFrame(frame);
})();




(function(){
'use strict';
var COLS=20,ROWS=20;
var REWARDS={
 3:{icon:'💰',title:'LEVEL 3 UNLOCK',desc:'$100 off your first SEO/AIO campaign',code:'SNAKE100OFF'},
 5:{icon:'🚀',title:'LEVEL 5 UNLOCK',desc:'15% off a full SEO campaign setup',code:'SNAKE15PCT'},
 7:{icon:'🎨',title:'LEVEL 7 UNLOCK',desc:'$100 off a custom logo design package',code:'SNAKELOGO100'},
 9:{icon:'📣',title:'LEVEL 9 UNLOCK',desc:'One month free group marketplace advertising',code:'SNAKEMKT'},
 10:{icon:'🖼️',title:'LEVEL 10 UNLOCK',desc:'Free group cover photo in our private marketplace',code:'SNAKECVR'},
 12:{icon:'👑',title:'GRAND PRIZE',desc:'VIP member pricing on your first two months, membership fee waived',code:'SNAKEGRAND'}
};
var MKT_ITEMS=[
 {sym:'📈',lbl:'Page 1 of Google! Rankings UP!',pts:4,color:'#00e676'},
 {sym:'💰',lbl:'New lead just came in!',pts:3,color:'#f5c518'},
 {sym:'🤖',lbl:'Found on ChatGPT & AI!',pts:5,color:'#00e5ff'},
 {sym:'⭐',lbl:'5-Star review just landed!',pts:2,color:'#f5c518'},
 {sym:'📧',lbl:'Email opened & clicked!',pts:2,color:'#bb86fc'},
 {sym:'🔗',lbl:'Backlink earned — authority up!',pts:3,color:'#00e5ff'},
 {sym:'🏆',lbl:'You beat your competitor!',pts:5,color:'#f5c518'},
 {sym:'📍',lbl:'Google Business Profile win!',pts:2,color:'#ff6b35'},
 {sym:'💼',lbl:'Deal closed — new client!',pts:4,color:'#00e676'},
 {sym:'🎯',lbl:'New sales funnel built!',pts:3,color:'#ff4081'},
 {sym:'📰',lbl:'Content went viral!',pts:3,color:'#bb86fc'},
 {sym:'🚀',lbl:'Revenue is accelerating!',pts:4,color:'#00e5ff'}];
var MKT_OBS=[
 {sym:'🧱',lbl:'Algorithm change! Slow down.',effect:'slow',color:'#ff4757'},
 {sym:'🦠',lbl:'Bad review hit!',effect:'shrink',color:'#ff4757'},
 {sym:'😈',lbl:'Competitor stole your ranking!',effect:'die',color:'#ff0000'},
 {sym:'🌊',lbl:'Market flood — navigate around!',effect:'slow',color:'#3b82f6'}];
var DISCO_ITEMS=[
 {sym:'🪩',lbl:'Disco Ball!',pts:3,color:'#ff4081'},{sym:'💫',lbl:'Star Power!',pts:2,color:'#f5c518'},
 {sym:'🎶',lbl:'Beat Drop!',pts:4,color:'#bb86fc'},{sym:'🕺',lbl:'Groove!',pts:2,color:'#00e5ff'},
 {sym:'💃',lbl:'Dance!',pts:3,color:'#ff6b35'},{sym:'🌈',lbl:'Rainbow!',pts:5,color:'#00e676'},
 {sym:'⚡',lbl:'Electric!',pts:2,color:'#f5c518'},{sym:'🔥',lbl:'On Fire!',pts:4,color:'#ff4757'},
 {sym:'💎',lbl:'Diamond!',pts:6,color:'#00e5ff'}];
var KIDS_DATA={
 letters:{items:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(l){return {sym:l,lbl:'Great! Letter '+l+'!',pts:1}})},
 words:{items:['CAT','DOG','SUN','FUN','HOP','JOY','RED','BIG','TOP','MAP','ZIP','FLY'].map(function(w){return {sym:w,lbl:w,pts:w.length}})},
 math:{items:[
  {answer:2,question:'1+1=?',lbl:'1+1=2 ✓',pts:2},{answer:4,question:'2+2=?',lbl:'2+2=4 ✓',pts:2},
  {answer:6,question:'3+3=?',lbl:'3+3=6 ✓',pts:3},{answer:5,question:'2+3=?',lbl:'2+3=5 ✓',pts:2},
  {answer:8,question:'4+4=?',lbl:'4+4=8 ✓',pts:3},{answer:9,question:'3×3=?',lbl:'3×3=9 ✓',pts:4},
  {answer:3,question:'6÷2=?',lbl:'6÷2=3 ✓',pts:3},{answer:7,question:'10-3=?',lbl:'10-3=7 ✓',pts:3},
  {answer:10,question:'5+5=?',lbl:'5+5=10 ✓',pts:3},{answer:12,question:'3×4=?',lbl:'3×4=12 ✓',pts:4}],
  answerPool:[2,3,4,5,6,7,8,9,10,12]},
 phonics:{items:[
  {sym:'Aa',lbl:'A says "ay"',pts:1,sound:'a'},{sym:'Bb',lbl:'B says "buh"',pts:1,sound:'b'},
  {sym:'Cc',lbl:'C says "kuh"',pts:1,sound:'k'},{sym:'Dd',lbl:'D says "duh"',pts:1,sound:'d'},
  {sym:'Ee',lbl:'E says "eh"',pts:1,sound:'e'},{sym:'Ff',lbl:'F says "fff"',pts:1,sound:'f'},
  {sym:'Gg',lbl:'G says "guh"',pts:1,sound:'g'},{sym:'Hh',lbl:'H says "huh"',pts:1,sound:'h'},
  {sym:'Ii',lbl:'I says "ih"',pts:1,sound:'i'},{sym:'Jj',lbl:'J says "juh"',pts:1,sound:'j'},
  {sym:'Kk',lbl:'K says "kuh"',pts:1,sound:'k'},{sym:'Ll',lbl:'L says "lll"',pts:1,sound:'l'},
  {sym:'Mm',lbl:'M says "mmm"',pts:1,sound:'m'},{sym:'Nn',lbl:'N says "nnn"',pts:1,sound:'n'},
  {sym:'Oo',lbl:'O says "oh"',pts:1,sound:'o'},{sym:'Pp',lbl:'P says "puh"',pts:1,sound:'p'},
  {sym:'Qq',lbl:'Q says "kwuh"',pts:1,sound:'kw'},{sym:'Rr',lbl:'R says "rrr"',pts:1,sound:'r'},
  {sym:'Ss',lbl:'S says "sss"',pts:1,sound:'s'},{sym:'Tt',lbl:'T says "tuh"',pts:1,sound:'t'}]},
 animals:{items:[
  {sym:'🐶',lbl:'Woof! Dog!',pts:2},{sym:'🐱',lbl:'Meow! Cat!',pts:2},{sym:'🐸',lbl:'Ribbit! Frog!',pts:3},
  {sym:'🦊',lbl:'Clever Fox!',pts:3},{sym:'🐼',lbl:'Rare Panda!',pts:4},{sym:'🦁',lbl:'Roar! Lion!',pts:4},
  {sym:'🐘',lbl:'Big Elephant!',pts:3},{sym:'🦋',lbl:'Butterfly!',pts:5},{sym:'🐬',lbl:'Smart Dolphin!',pts:5},
  {sym:'🦒',lbl:'Tall Giraffe!',pts:3},{sym:'🐯',lbl:'Tiger! Run!',pts:4},{sym:'🦜',lbl:'Polly Parrot!',pts:3},
  {sym:'🐧',lbl:'Cool Penguin!',pts:3},{sym:'🦄',lbl:'Unicorn! Rare!',pts:6}]}};
var KIDS_OBS=[{sym:'🌵',effect:'slow',color:'#22c55e'},{sym:'⛈️',effect:'slow',color:'#3b82f6'},
 {sym:'🌊',effect:'slow',color:'#06b6d4'},{sym:'🪨',effect:'slow',color:'#78716c'}];
var KIDS_DECO=['🌴','🌺','🎋','🌸','🍀'];
var OBSTACLE_SHAPES=[
 function(x,y){return [{x:x,y:y},{x:x,y:y+1},{x:x,y:y+2},{x:x+1,y:y+2}]},
 function(x,y){return [{x:x-1,y:y},{x:x,y:y},{x:x+1,y:y},{x:x,y:y+1}]},
 function(x,y){return [{x:x,y:y},{x:x+1,y:y},{x:x+2,y:y},{x:x+3,y:y}]},
 function(x,y){return [{x:x,y:y},{x:x,y:y+1},{x:x,y:y+2}]},
 function(x,y){return [{x:x,y:y},{x:x+1,y:y},{x:x,y:y+1},{x:x+1,y:y+1}]},
 function(x,y){return [{x:x,y:y},{x:x+1,y:y},{x:x+1,y:y+1},{x:x+2,y:y+1}]},
 function(x,y){return [{x:x,y:y+1},{x:x+1,y:y},{x:x+1,y:y+1},{x:x+2,y:y+1},{x:x+1,y:y+2}]}];

var gameMode='marketing',skin='modern',kidsSubject='letters',ctrlMode='dpad';
var difficulty=0,soundOn=true,fxOn=true,flashMode=false,volLevel=.4;
var snake=[],dir={x:1,y:0},nextDir={x:1,y:0},foods=[],obstacles=[];
var score=0,level=1,lives=3,hiScore=0;
var running=false,paused=false,loopId=null,rewardedLevels={};
var kidsCurrentWord='',kidsEaten=[],kidsWordIdx=0,currentMathQ=null;
var touchStartX=0,touchStartY=0,frameCount=0,particles=[],adbotTimer=null;

var TRACKS=[
 {name:'🕹️ CHIPTUNE HERO',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
 {name:'🎮 ARCADE BLAST',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},
 {name:'🌈 NEON GROOVE',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'},
 {name:'🏆 VICTORY MARCH',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'},
 {name:'🚀 SPACE RACE',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'},
 {name:'💃 DISCO FEVER',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'},
 {name:'🐍 SNAKE CHARMER',url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'}];
var currentTrack=0,audioEl=null,musicPlaying=false;

var canvas=document.getElementById('gameCanvas'),ctx=canvas.getContext('2d');
var pCanvas=document.getElementById('particleCanvas'),pCtx=pCanvas.getContext('2d');
var scoreEl=document.getElementById('scoreVal'),levelEl=document.getElementById('levelVal');
var livesEl=document.getElementById('livesVal'),hiEl=document.getElementById('hiVal');
var stars=document.querySelectorAll('.star'),speech=document.getElementById('speechBubble');
var wordDisplay=document.getElementById('wordDisplay'),kidsBar=document.getElementById('kidsBar');
var consoleEl=document.getElementById('console'),dpadWrap=document.getElementById('dpadWrap');
var bbDisplay=document.getElementById('bbDisplay'),tapeLabel=document.getElementById('tapeLabel');
var reel1=document.getElementById('reel1'),reel2=document.getElementById('reel2');
var robotTextMini=document.getElementById('robotTextMini'),robotTextLarge=document.getElementById('robotTextLarge');
var robotMouthMini=document.getElementById('robotMouthMini'),robotMouthLarge=document.getElementById('robotMouthLarge');
var lossModal=document.getElementById('lossModal'),rewardModal=document.getElementById('rewardModal');
var rewardToast=document.getElementById('rewardToast');
var phoneTop=document.querySelector('.phone-top'),phoneBrand=document.querySelector('.phone-brand');
var handheldBrand=document.querySelector('.handheld-brand');

function initAudio(){if(!audioEl){audioEl=new Audio();audioEl.loop=true;audioEl.volume=volLevel}}
function loadTrack(i){initAudio();var t=TRACKS[i%TRACKS.length];audioEl.src=t.url;
 document.getElementById('trackName').textContent=t.name;if(musicPlaying)audioEl.play().catch(function(){})}
function toggleMusic(){
 initAudio();
 if(!audioEl.src||audioEl.src===window.location.href)loadTrack(currentTrack);
 if(musicPlaying){audioEl.pause();musicPlaying=false;
  document.getElementById('playMusicBtn').textContent='▶';
  document.getElementById('playMusicBtn').classList.remove('playing');stopSpeakerPump();
 }else{audioEl.play().then(function(){musicPlaying=true;
  document.getElementById('playMusicBtn').textContent='⏸';
  document.getElementById('playMusicBtn').classList.add('playing');startSpeakerPump();
 }).catch(function(){robotSay('🎵 Tap ▶ again to start music!',2000)})}}
function startSpeakerPump(){document.getElementById('leftSpeaker').classList.add('pumping');document.getElementById('rightSpeaker').classList.add('pumping')}
function stopSpeakerPump(){document.getElementById('leftSpeaker').classList.remove('pumping');document.getElementById('rightSpeaker').classList.remove('pumping')}
document.getElementById('playMusicBtn').addEventListener('click',toggleMusic);
document.getElementById('prevTrack').addEventListener('click',function(){currentTrack=(currentTrack-1+TRACKS.length)%TRACKS.length;loadTrack(currentTrack);robotSay('🎵 '+TRACKS[currentTrack].name,2000)});
document.getElementById('nextTrack').addEventListener('click',function(){currentTrack=(currentTrack+1)%TRACKS.length;loadTrack(currentTrack);robotSay('🎵 '+TRACKS[currentTrack].name,2000)});
document.getElementById('volSlider').addEventListener('input',function(e){volLevel=parseInt(e.target.value)/100;if(audioEl)audioEl.volume=volLevel});

var audioCtx=null;
function getAC(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx}
function beep(f,d,t,v){if(!soundOn)return;t=t||'square';v=v||.04;
 try{var ac=getAC(),o=ac.createOscillator(),g2=ac.createGain();o.type=t;o.frequency.value=f;g2.gain.value=v;
 o.connect(g2);g2.connect(ac.destination);o.start();g2.gain.setTargetAtTime(0,ac.currentTime+d/1000*.7,.05);
 o.stop(ac.currentTime+d/1000)}catch(e){}}
function eatSound(){beep(880,60,'square',.05);setTimeout(function(){beep(1100,60,'square',.04)},70)}
function dieSound(){beep(200,200,'sawtooth',.08);setTimeout(function(){beep(150,300,'sawtooth',.06)},200)}
function levelSound(){[660,880,1100,1320].forEach(function(f,i){setTimeout(function(){beep(f,100,'square',.05)},i*100)})}
function rewardSound(){[440,554,659,880,1100].forEach(function(f,i){setTimeout(function(){beep(f,150,'sine',.06)},i*120)})}
function wrongSound(){beep(200,120,'sawtooth',.05)}
function speakText(t){if(!soundOn)return;try{var u=new SpeechSynthesisUtterance(t);u.rate=.8;u.pitch=1.2;u.volume=.9;window.speechSynthesis.speak(u)}catch(e){}}

function syncParticleCanvas(){var cr=canvas.closest('.screen-wrap').getBoundingClientRect();
 pCanvas.width=cr.width;pCanvas.height=cr.height;pCanvas.style.width=cr.width+'px';pCanvas.style.height=cr.height+'px'}
var CASINO_SYMBOLS=['🌟','💎','💰','🎰','🃏','🎲','🏆','⚡','💥','🌈','✨','🎊'];
function spawnParticles(gx,gy,color,count,emoji){
 if(!fxOn||particles.length>60)return;
 var cell=canvas.width/COLS,pw=pCanvas.width,ph=pCanvas.height;
 var sx=(gx+.5)*cell*(pw/canvas.width),sy=(gy+.5)*cell*(ph/canvas.height);
 var n=Math.min(count||14,6),i;
 for(i=0;i<n;i++){var a=(i/n)*Math.PI*2+Math.random()*.3,sp=Math.random()*4+1.5;
  particles.push({x:sx,y:sy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,life:1,decay:.028+Math.random()*.02,
   color:color,size:Math.random()*8+3,emoji:Math.random()<.3?emoji:''})}
 for(i=0;i<2;i++){var a2=Math.random()*Math.PI*2,s2=Math.random()*3+1;
  particles.push({x:sx,y:sy,vx:Math.cos(a2)*s2,vy:Math.sin(a2)*s2-3,life:1,decay:.022,color:color,
   size:32+Math.random()*12,emoji:CASINO_SYMBOLS[Math.floor(Math.random()*CASINO_SYMBOLS.length)],
   spin:Math.random()*.3-.15,rotation:Math.random()*Math.PI*2})}
 for(i=0;i<2;i++)particles.push({x:sx+Math.random()*10-5,y:sy,vx:Math.random()*3-1.5,vy:-Math.random()*5-2,
  life:1,decay:.022,color:'#f5c518',size:22+Math.random()*8,emoji:'💰',isCoin:true,spin:Math.random()*.4-.2,rotation:0})}
function spawnCasinoBurst(gx,gy){
 if(!fxOn||particles.length>80)return;
 var cell=canvas.width/COLS,sx=(gx+.5)*cell*(pCanvas.width/canvas.width),sy=(gy+.5)*cell*(pCanvas.height/canvas.height);
 ['🌟','💎','🏆','💰','🎊'].forEach(function(e,i){var a=(i/5)*Math.PI*2,sp=3+Math.random()*3;
  particles.push({x:sx,y:sy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-3,life:1,decay:.016+Math.random()*.008,
   color:'#f5c518',size:38+Math.random()*14,emoji:e,spin:.15+Math.random()*.1,rotation:a})});
 for(var i=0;i<10;i++){var hue=Math.random()*360;
  particles.push({x:sx+Math.random()*16-8,y:sy,vx:Math.random()*12-6,vy:Math.random()*-10-2,life:1,decay:.018,
   color:'hsl('+hue+',100%,65%)',size:7+Math.random()*6,emoji:'',spin:Math.random()*.4,rotation:Math.random()*Math.PI*2,isRect:true})}}
function spawnStarBurst(gx,gy){
 if(!fxOn||particles.length>60)return;
 var cell=canvas.width/COLS,sx=(gx+.5)*cell*(pCanvas.width/canvas.width),sy=(gy+.5)*cell*(pCanvas.height/canvas.height);
 ['⭐','🌟','✨','💫'].forEach(function(e,i){var a=(i/4)*Math.PI*2;
  particles.push({x:sx,y:sy,vx:Math.cos(a)*6,vy:Math.sin(a)*6-4,life:1,decay:.014,color:'#f5c518',
   size:42+Math.random()*16,emoji:e,spin:.18,rotation:a})});
 spawnCasinoBurst(gx,gy)}
function updateParticles(){
 pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
 particles=particles.filter(function(p){
  p.x+=p.vx;p.y+=p.vy;p.vy+=p.isCoin?.22:.16;p.vx*=.98;
  if(p.spin)p.rotation=(p.rotation||0)+p.spin;
  p.life-=p.decay;if(p.life<=0)return false;
  pCtx.save();pCtx.globalAlpha=Math.max(0,Math.min(1,p.life));
  if(p.isRect){pCtx.fillStyle=p.color;pCtx.shadowColor=p.color;pCtx.shadowBlur=6;
   pCtx.translate(p.x,p.y);pCtx.rotate(p.rotation||0);pCtx.fillRect(-p.size/2,-p.size*.4,p.size,p.size*.8)}
  else if(p.emoji){pCtx.translate(p.x,p.y);pCtx.rotate(p.rotation||0);
   pCtx.globalAlpha=Math.max(0,p.life)*.3;pCtx.font=p.size+'px serif';pCtx.textAlign='center';pCtx.textBaseline='middle';
   pCtx.fillText(p.emoji,3,3);pCtx.globalAlpha=Math.max(0,p.life);pCtx.fillText(p.emoji,0,0)}
  else{pCtx.fillStyle=p.color;pCtx.shadowColor=p.color;pCtx.shadowBlur=p.size*.8;
   pCtx.beginPath();pCtx.arc(p.x,p.y,p.size/2,0,Math.PI*2);pCtx.fill();
   pCtx.fillStyle='rgba(255,255,255,.4)';pCtx.shadowBlur=0;
   pCtx.beginPath();pCtx.arc(p.x-p.size*.12,p.y-p.size*.12,p.size*.22,0,Math.PI*2);pCtx.fill()}
  pCtx.restore();return true})}

var robotMsgTimeout=null,botVoiceOn=false;
function robotSpeak(t){if(!botVoiceOn||!soundOn)return;
 try{window.speechSynthesis.cancel();
 var clean=t.replace(/<[^>]*>/g,'').replace(/[^\x20-\x7E]/g,'');
 var u=new SpeechSynthesisUtterance(clean);u.rate=1;u.pitch=.7;u.volume=.85;
 var v=window.speechSynthesis.getVoices().find(function(x){return /google uk english male|alex|daniel/i.test(x.name)});
 if(v)u.voice=v;window.speechSynthesis.speak(u)}catch(e){}}
function robotSay(msg,ms){
 ms=ms||4000;
 if(robotTextMini)robotTextMini.innerHTML=msg;
 if(robotTextLarge)robotTextLarge.innerHTML=msg;
 robotSpeak(msg);
 [robotMouthMini,robotMouthLarge].forEach(function(m){
  if(!m)return;var bars=m.querySelectorAll('.robot-mbar,.robot-mbar-lg'),t=0;
  var an=setInterval(function(){bars.forEach(function(b){b.style.height=(Math.random()*10+2)+'px'});if(++t>25)clearInterval(an)},80)});
 clearTimeout(robotMsgTimeout);
 robotMsgTimeout=setTimeout(function(){[robotMouthMini,robotMouthLarge].forEach(function(m){
  if(m)m.querySelectorAll('.robot-mbar,.robot-mbar-lg').forEach(function(b){b.style.height='5px'})})},ms)}
var ADBOT_MSGS={
 marketing:['Eat the <strong>📈</strong> to rank higher on Google!','<strong>⭐</strong> reviews build trust — eat them up!',
  'Avoid the <strong>🧱</strong> — that is an algorithm change!','The <strong>🤖</strong> means AI search visibility — huge!',
  'Every lead you eat compounds over time!','<strong>😈</strong> = your competitor. Dodge it!',
  'A <strong>🎯</strong> funnel turns visitors into buyers!','Real business growth looks just like this snake!'],
 classic:['Classic mode — pure snake, pure focus.','No distractions. Just you and the game.','The original. Simple but timeless.','How long can you grow?'],
 neon:['Feel the groove! 🪩 Eat the beat!','<strong>🎶</strong> = beat drop bonus points!','Disco never dies — neither does good marketing!','Ride the neon wave! 🌈'],
 kids:['Hi friend! Let us learn together! 🌟','Eat the letters to spell words!','Math time! Can you find the right answer?','Amazing job! You are so smart! ⭐','Keep going — you are doing great!']};
function scheduleAdbot(){clearTimeout(adbotTimer);if(!running||paused)return;
 adbotTimer=setTimeout(function(){if(running&&!paused){var m=ADBOT_MSGS[gameMode]||ADBOT_MSGS.classic;
  robotSay(m[Math.floor(Math.random()*m.length)],3500);scheduleAdbot()}},8000+Math.random()*7000)}

var eqBars=document.querySelectorAll('.eq-bar');
setInterval(function(){
 if((running&&!paused)||musicPlaying){var it=musicPlaying?1:.6;
  eqBars.forEach(function(b){b.style.height=(Math.random()*90*it+10)+'%'});
  reel1.classList.add('playing');reel2.classList.add('playing')}
 else{eqBars.forEach(function(b){b.style.height='10%'});reel1.classList.remove('playing');reel2.classList.remove('playing')}},100);

var SH_MKT=['🏆 TOP OF GOOGLE!','💰 NEW LEAD!','🚀 DEAL CLOSED!','⭐ 5-STAR WIN!','🤖 AI FOUND YOU!','🎯 FUNNEL BUILT!','📈 RANKINGS UP!','💼 NEW CLIENT!','🔥 ON FIRE!','💎 DIAMOND ROI!'];
var SH_KIDS=['⭐ AMAZING!','🎉 GREAT JOB!','🌟 GENIUS!','🏅 WINNER!','🦸 HERO!','🎊 BRILLIANT!'];
var SH_DISCO=['🕺 GROOVY!','💫 STELLAR!','🎶 VIBE!','🌈 EPIC!','🪩 BOOGALOO!'];
var SH_CLASSIC=['🐍 SLITHERING!','📏 LENGTH UP!','💪 GROWING!','🎯 NICE MOVE!'];
function showShoutout(text,color){
 var el=document.createElement('div');el.className='shoutout';el.style.color=color||'#f5c518';el.textContent=text;
 var r=canvas.getBoundingClientRect();
 el.style.left=(r.left+r.width/2-120+Math.random()*80-40)+'px';
 el.style.top=(r.top+r.height*.2+window.scrollY-40)+'px';
 document.body.appendChild(el);setTimeout(function(){el.remove()},2200)}
function showCasinoSpin(emoji,x,y){
 [emoji,CASINO_SYMBOLS[Math.floor(Math.random()*CASINO_SYMBOLS.length)]].forEach(function(s,i){
  var el=document.createElement('div');el.className='casino-spin';el.textContent=s;
  el.style.cssText='left:'+(x-40+i*60)+'px;top:'+(y+window.scrollY-40)+'px;font-size:'+(4.5+i*.5)+'rem;animation-delay:'+(i*.12)+'s';
  document.body.appendChild(el);setTimeout(function(){el.remove()},1800)});
 var f=document.createElement('div');
 f.style.cssText='position:fixed;inset:0;background:rgba(245,197,24,.12);pointer-events:none;z-index:9998;animation:flashFade .4s ease forwards';
 document.body.appendChild(f);setTimeout(function(){f.remove()},500)}
var spTimer=null;
function showSpeech(t,ms){speech.textContent=t;speech.classList.add('show');clearTimeout(spTimer);
 spTimer=setTimeout(function(){speech.classList.remove('show')},ms||1600)}
function updateHUD(){
 scoreEl.textContent=score;levelEl.textContent=level;livesEl.textContent=lives;
 if(score>hiScore){hiScore=score;hiEl.textContent=hiScore}
 var lit=Math.min(10,Math.floor(score/3));
 stars.forEach(function(s,i){s.classList.toggle('lit',i<lit)});
 if(lit===10)spawnStarBurst(10,10)}
function applySkin(s){
 skin=s;consoleEl.className='console skin-'+s;
 var isOld=s==='oldschool',isHeld=s==='handheld';
 if(phoneTop)phoneTop.style.display=isOld?'flex':'none';
 if(phoneBrand)phoneBrand.style.display=isOld?'block':'none';
 if(handheldBrand)handheldBrand.style.display=isHeld?'block':'none';
 canvas.width=canvas.height=(isOld?320:480);syncParticleCanvas()}
function getSpeed(){var base=[280,180,115,65][difficulty]||180;return Math.max(45,base-(level-1)*8)}
function getItems(){
 if(gameMode==='marketing')return MKT_ITEMS;
 if(gameMode==='neon')return DISCO_ITEMS;
 if(gameMode==='kids'){if(kidsSubject==='math')return buildMathFood();return KIDS_DATA[kidsSubject].items}
 return [{sym:'🍎',lbl:'+1',pts:1,color:'#ff4757'}]}
function buildMathFood(){
 var q=KIDS_DATA.math.items[Math.floor(Math.random()*KIDS_DATA.math.items.length)];
 currentMathQ=q;wordDisplay.textContent=q.question;wordDisplay.classList.add('show');
 robotSay('🤖 What is <strong>'+q.question+'</strong>? Eat the correct number!',6000);
 var pool=KIDS_DATA.math.answerPool.filter(function(a){return a!==q.answer});
 var ch=pool.sort(function(){return Math.random()-.5}).slice(0,3);
 ch.push(q.answer);ch.sort(function(){return Math.random()-.5});
 return ch.map(function(a){return {sym:String(a),lbl:a===q.answer?q.lbl:'Wrong! Try a different number!',
  pts:a===q.answer?q.pts:-1,color:a===q.answer?'#00e676':'#ff4757',isMathAnswer:true,isCorrect:a===q.answer,mathDisplay:true}})}
function randomEmpty(){
 var t=0;while(t++<400){var x=Math.floor(Math.random()*COLS),y=Math.floor(Math.random()*ROWS);
  if(!snake.some(function(s){return s.x===x&&s.y===y})&&!foods.some(function(f){return f.x===x&&f.y===y})
   &&!obstacles.some(function(o){return o.x===x&&o.y===y}))return {x:x,y:y}}
 return null}
function spawnFood(n){
 if(gameMode==='kids'&&kidsSubject==='math'){
  buildMathFood().forEach(function(item){var p=randomEmpty();if(p)foods.push(Object.assign({},p,item))});return}
 var items=getItems();
 for(var i=0;i<(n||1);i++){var p=randomEmpty();if(!p)return;
  foods.push(Object.assign({},p,items[Math.floor(Math.random()*items.length)]))}}
function spawnObstacles(){
 if(gameMode==='classic'&&skin==='oldschool')return;
 if(level===1)return;
 var src=(gameMode==='marketing')?MKT_OBS:(gameMode==='kids')?KIDS_OBS:null;
 if(!src)return;
 var n=Math.min(Math.floor(level/2)+1,3);
 for(var s=0;s<n;s++){
  var si=Math.floor(Math.random()*OBSTACLE_SHAPES.length);
  var bx=2+Math.floor(Math.random()*(COLS-6)),by=2+Math.floor(Math.random()*(ROWS-6));
  var cells=OBSTACLE_SHAPES[si](bx,by),tpl=src[Math.floor(Math.random()*src.length)];
  var valid=cells.every(function(c){return c.x>=0&&c.x<COLS&&c.y>=0&&c.y<ROWS&&
   !snake.some(function(sn){return sn.x===c.x&&sn.y===c.y})&&
   !obstacles.some(function(o){return o.x===c.x&&o.y===c.y})});
  if(valid){var isLake=si>=4;
   cells.forEach(function(c){obstacles.push(Object.assign({},c,tpl,
    {sym:isLake?'🌊':tpl.sym,color:isLake?'#3b82f6':tpl.color,shapeGroup:s}))})}}}
function initSnake(){
 var cx=Math.floor(COLS/2),cy=Math.floor(ROWS/2);
 snake=[{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}];
 dir={x:1,y:0};nextDir={x:1,y:0};foods=[];obstacles=[];particles=[];
 kidsEaten=[];kidsWordIdx=0;currentMathQ=null;
 if(gameMode==='kids'){
  if(kidsSubject==='words')pickKidsWord();
  else if(kidsSubject==='math')spawnFood(4);
  else spawnFood(3)}
 else spawnFood(gameMode==='neon'?3:2);
 spawnObstacles();syncParticleCanvas()}
function pickKidsWord(){
 var w=KIDS_DATA.words.items[kidsWordIdx%KIDS_DATA.words.items.length];kidsWordIdx++;
 kidsCurrentWord=w.sym;kidsEaten=[];
 wordDisplay.textContent=w.sym.split('').map(function(){return '_'}).join(' ');
 wordDisplay.classList.add('show');
 robotSay('🌟 Spell: <strong>'+w.sym+'</strong>! Eat letters in order!',4000);
 if(soundOn)speakText('Spell '+w.sym);
 spawnFirstLetter()}
function spawnFirstLetter(){
 foods=[];var nl=kidsCurrentWord[kidsEaten.length];if(!nl)return;
 var p=randomEmpty();if(!p)return;
 var cols=['#ff4081','#00e676','#00e5ff','#f5c518','#bb86fc','#ff6b35'];
 foods.push(Object.assign({},p,{sym:nl,lbl:nl,pts:1,color:cols[Math.floor(Math.random()*cols.length)]}));
 for(var i=0;i<2;i++){var p2=randomEmpty();if(!p2)continue;
  var dl='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(function(l){return l!==nl})[Math.floor(Math.random()*25)];
  foods.push(Object.assign({},p2,{sym:dl,lbl:'Not that one!',pts:0,color:'#555',isDistractor:true}))}}

function draw(){
 var W=canvas.width,H=canvas.height,cell=W/COLS;
 ctx.clearRect(0,0,W,H);drawBackground(W,H,cell);drawObstacles(cell);drawFoods(cell);drawSnake(cell);
 if(paused)drawPaused(W,H);
 if(!running&&!paused)drawStartScreen(W,H);
 frameCount++;updateParticles()}
function drawBackground(W,H,cell){
 var i,j;
 if(skin==='oldschool'||gameMode==='classic'){
  ctx.fillStyle='#9bac6a';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(0,0,0,.07)';ctx.lineWidth=.5;
  for(i=0;i<=COLS;i++){ctx.beginPath();ctx.moveTo(i*cell,0);ctx.lineTo(i*cell,H);ctx.stroke()}
  for(j=0;j<=ROWS;j++){ctx.beginPath();ctx.moveTo(0,j*cell);ctx.lineTo(W,j*cell);ctx.stroke()}return}
 if(skin==='neon'||gameMode==='neon'){
  ctx.fillStyle='#0a0010';ctx.fillRect(0,0,W,H);
  var t=frameCount*.04;
  ctx.strokeStyle='rgba(187,134,252,'+(.04+Math.sin(t)*.02)+')';ctx.lineWidth=1;
  for(i=0;i<=COLS;i++){ctx.beginPath();ctx.moveTo(i*cell,0);ctx.lineTo(i*cell,H);ctx.stroke()}
  for(j=0;j<=ROWS;j++){ctx.beginPath();ctx.moveTo(0,j*cell);ctx.lineTo(W,j*cell);ctx.stroke()}
  var sy=(frameCount*1.2)%H,sg=ctx.createLinearGradient(0,sy-3,0,sy+3);
  sg.addColorStop(0,'transparent');sg.addColorStop(.5,'rgba(0,229,255,.08)');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.fillRect(0,sy-3,W,6);return}
 if(gameMode==='kids'||skin==='kids'){
  var grd=ctx.createLinearGradient(0,0,W,H);grd.addColorStop(0,'#1a0a3e');grd.addColorStop(1,'#0a1a3e');
  ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  for(i=0;i<40;i++){if(Math.sin(frameCount*.08+i*1.3)>.65){
   var sx2=(i*67+13)%W,sy2=(i*83+17)%H,sz=Math.sin(frameCount*.1+i)*.5+1.5;
   ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.arc(sx2,sy2,sz,0,Math.PI*2);ctx.fill()}}
  ctx.font='18px serif';ctx.globalAlpha=.07;ctx.textAlign='center';
  KIDS_DECO.forEach(function(e,i2){ctx.fillText(e,i2*W*.2+W*.1,(i2%3)*H*.25+H*.15)});
  ctx.globalAlpha=1;return}
 if(flashMode&&running&&!paused){ctx.fillStyle='hsl('+((frameCount*3)%360)+',60%,8%)';ctx.fillRect(0,0,W,H)}
 else{ctx.fillStyle='#080c14';ctx.fillRect(0,0,W,H)}
 ctx.strokeStyle='rgba(255,255,255,.025)';ctx.lineWidth=1;
 for(i=0;i<=COLS;i++){ctx.beginPath();ctx.moveTo(i*cell,0);ctx.lineTo(i*cell,H);ctx.stroke()}
 for(j=0;j<=ROWS;j++){ctx.beginPath();ctx.moveTo(0,j*cell);ctx.lineTo(W,j*cell);ctx.stroke()}
 var vig=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.8);
 vig.addColorStop(0,'transparent');vig.addColorStop(1,'rgba(0,0,0,.4)');
 ctx.fillStyle=vig;ctx.fillRect(0,0,W,H)}
function drawObstacles(cell){
 obstacles.forEach(function(o){
  var x=o.x*cell,y=o.y*cell;
  if(skin==='oldschool'){ctx.fillStyle='#1a1a1a';ctx.fillRect(x+1,y+1,cell-2,cell-2);
   ctx.strokeStyle='#333';ctx.lineWidth=1;ctx.strokeRect(x+1,y+1,cell-2,cell-2);return}
  if(o.sym==='🌊'){
   ctx.fillStyle='rgba(30,80,180,.6)';ctx.fillRect(x,y,cell,cell);
   ctx.fillStyle='rgba(59,130,246,.3)';
   var wv=Math.sin(frameCount*.08+o.x+o.y)*.3;
   ctx.beginPath();ctx.arc(x+cell*.5,y+cell*.5+wv*3,cell*.35,0,Math.PI*2);ctx.fill();
   ctx.save();ctx.shadowColor='#3b82f6';ctx.shadowBlur=12;
   ctx.font=Math.floor(cell*.65)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.fillText('🌊',x+cell/2,y+cell/2);ctx.restore();return}
  if(o.sym==='🧱'){
   ctx.fillStyle='#7f1d1d';ctx.fillRect(x+1,y+1,cell-2,cell-2);
   ctx.strokeStyle='#450a0a';ctx.lineWidth=1;
   ctx.beginPath();ctx.moveTo(x+1,y+cell*.5);ctx.lineTo(x+cell-1,y+cell*.5);ctx.stroke();
   ctx.beginPath();ctx.moveTo(x+cell*.5,y+1);ctx.lineTo(x+cell*.5,y+cell*.5);ctx.stroke();
   ctx.beginPath();ctx.moveTo(x+cell*.25,y+cell*.5);ctx.lineTo(x+cell*.25,y+cell-1);ctx.stroke();
   ctx.beginPath();ctx.moveTo(x+cell*.75,y+cell*.5);ctx.lineTo(x+cell*.75,y+cell-1);ctx.stroke();
   ctx.save();ctx.shadowColor='#ff4757';ctx.shadowBlur=10;
   ctx.font=Math.floor(cell*.55)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.fillText('🧱',x+cell/2,y+cell/2);ctx.restore();return}
  ctx.save();ctx.shadowColor=o.color||'#ff4757';ctx.shadowBlur=16;
  ctx.font=Math.floor(cell*.65)+'px serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(o.sym,x+cell/2,y+cell/2);
  ctx.strokeStyle=o.color||'#ff4757';ctx.lineWidth=2;ctx.globalAlpha=.4;
  ctx.strokeRect(x+1,y+1,cell-2,cell-2);ctx.globalAlpha=1;ctx.restore()})}
function drawFoods(cell){
 foods.forEach(function(f){
  var x=f.x*cell,y=f.y*cell;
  if(skin==='oldschool'&&gameMode==='classic'){ctx.fillStyle='#1a1a1a';
   ctx.fillRect(x+cell*.25,y+cell*.25,cell*.5,cell*.5);return}
  var pulse=1+Math.sin(frameCount*.14+f.x*1.9+f.y*1.3)*.09;
  var glow=Math.sin(frameCount*.07+f.x+f.y)*.5+.5,col=f.color||'#00e676';
  ctx.save();
  ctx.globalAlpha=.2+glow*.18;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=cell*1.2;
  ctx.beginPath();ctx.arc(x+cell/2,y+cell/2,cell*.48,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;ctx.shadowBlur=0;
  ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.globalAlpha=.5+glow*.3;ctx.shadowColor=col;ctx.shadowBlur=8;
  ctx.beginPath();ctx.arc(x+cell/2,y+cell/2,cell*.43,0,Math.PI*2);ctx.stroke();
  ctx.globalAlpha=1;ctx.shadowBlur=0;
  if(f.isMathAnswer){var rc=f.isCorrect?'#00e676':'#ff4757';
   ctx.strokeStyle=rc;ctx.lineWidth=3;ctx.shadowColor=rc;ctx.shadowBlur=20;
   ctx.beginPath();ctx.arc(x+cell/2,y+cell/2,cell*.44,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0}
  ctx.translate(x+cell/2,y+cell/2);ctx.scale(pulse,pulse);ctx.shadowBlur=0;
  if(f.isMathAnswer||f.mathDisplay){
   ctx.font='900 '+Math.floor(cell*.7)+"px 'Nunito',sans-serif";
   var nc=f.isCorrect?'#00e676':'#ff6060';
   ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillText(f.sym,2,2);
   ctx.fillStyle=nc;ctx.shadowColor=nc;ctx.shadowBlur=cell*.8;ctx.fillText(f.sym,0,0)}
  else{ctx.font=Math.floor(cell*(gameMode==='kids'?.78:.82))+'px serif';
   ctx.textAlign='center';ctx.textBaseline='middle';
   ctx.globalAlpha=.35;ctx.fillText(f.sym,2,2);
   ctx.globalAlpha=1;ctx.shadowColor=col;ctx.shadowBlur=cell*.5;ctx.fillText(f.sym,0,0)}
  ctx.restore()})}
function drawSnake(cell){
 snake.forEach(function(seg,i){
  var x=seg.x*cell,y=seg.y*cell,fill;
  if(skin==='oldschool'||gameMode==='classic'){
   ctx.fillStyle=i===0?'#1a1a1a':'#2a2a2a';ctx.fillRect(x+1,y+1,cell-2,cell-2);
   if(i>0){ctx.fillStyle='rgba(255,255,255,.05)';ctx.fillRect(x+1,y+1,cell*.5,cell*.5)}
   if(i===0)drawPixelEyes(x,y,cell);return}
  if(gameMode==='neon')fill='hsl('+((frameCount*2+i*15)%360)+',100%,60%)';
  else if(flashMode&&running&&!paused)fill='hsl('+((frameCount*4+i*20)%360)+',100%,'+(i===0?70:55)+'%)';
  else if(gameMode==='kids'||skin==='kids'){var kc=['#ff4081','#00e676','#00e5ff','#f5c518','#bb86fc','#ff6b35'];
   fill=i===0?'#00e676':kc[i%kc.length]}
  else{var t=i/Math.max(snake.length,1);
   fill=i===0?'#00e676':'rgb('+Math.round(20+t*20)+','+Math.round(200-t*80)+','+Math.round(100-t*60)+')'}
  ctx.save();ctx.fillStyle=fill;ctx.shadowColor=fill;ctx.shadowBlur=i===0?22:10;
  ctx.beginPath();ctx.roundRect(x+1,y+1,cell-2,cell-2,cell*.25);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.16)';
  ctx.beginPath();ctx.roundRect(x+2,y+2,cell*.55,cell*.3,cell*.12);ctx.fill();ctx.restore();
  if(i===0)drawHead(x,y,cell)})}
function drawPixelEyes(x,y,cell){
 ctx.fillStyle='#9bac6a';var es=Math.floor(cell*.12),e1x,e1y,e2x,e2y;
 if(dir.x===1){e1x=x+cell*.65;e1y=y+cell*.25;e2x=x+cell*.65;e2y=y+cell*.65}
 else if(dir.x===-1){e1x=x+cell*.2;e1y=y+cell*.25;e2x=x+cell*.2;e2y=y+cell*.65}
 else if(dir.y===1){e1x=x+cell*.25;e1y=y+cell*.65;e2x=x+cell*.65;e2y=y+cell*.65}
 else{e1x=x+cell*.25;e1y=y+cell*.2;e2x=x+cell*.65;e2y=y+cell*.2}
 ctx.fillRect(e1x-es/2,e1y-es/2,es,es);ctx.fillRect(e2x-es/2,e2y-es/2,es,es)}
function drawHead(x,y,cell){
 var es=cell*.11,e1x,e1y,e2x,e2y;
 if(dir.x===1){e1x=x+cell*.76;e1y=y+cell*.28;e2x=x+cell*.76;e2y=y+cell*.65}
 else if(dir.x===-1){e1x=x+cell*.2;e1y=y+cell*.28;e2x=x+cell*.2;e2y=y+cell*.65}
 else if(dir.y===1){e1x=x+cell*.28;e1y=y+cell*.76;e2x=x+cell*.65;e2y=y+cell*.76}
 else{e1x=x+cell*.28;e1y=y+cell*.2;e2x=x+cell*.65;e2y=y+cell*.2}
 ctx.save();ctx.fillStyle='#000';
 ctx.beginPath();ctx.arc(e1x,e1y,es,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(e2x,e2y,es,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#fff';
 ctx.beginPath();ctx.arc(e1x-1,e1y-1,es*.38,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(e2x-1,e2y-1,es*.38,0,Math.PI*2);ctx.fill();ctx.restore();
 if(running&&!paused&&frameCount%6<4){
  ctx.save();ctx.strokeStyle='#ff4081';ctx.lineWidth=Math.max(1,cell*.06);ctx.lineCap='round';
  var tdx=dir.x*cell*.75,tdy=dir.y*cell*.75,tx=x+cell/2,ty=y+cell/2;
  ctx.shadowColor='#ff4081';ctx.shadowBlur=6;
  ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tx+tdx,ty+tdy);
  ctx.moveTo(tx+tdx,ty+tdy);ctx.lineTo(tx+tdx+dir.y*cell*.22,ty+tdy+dir.x*cell*.22);
  ctx.moveTo(tx+tdx,ty+tdy);ctx.lineTo(tx+tdx-dir.y*cell*.22,ty+tdy-dir.x*cell*.22);
  ctx.stroke();ctx.restore()}}
function drawPaused(W,H){
 ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f5c518';
 ctx.font='bold '+(W/12)+"px 'Press Start 2P',monospace";
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('PAUSED',W/2,H/2)}
function drawStartScreen(W,H){
 ctx.fillStyle='rgba(0,0,0,.65)';ctx.fillRect(0,0,W,H);
 ctx.fillStyle='#f5c518';ctx.font=(W/12)+"px 'Bebas Neue',sans-serif";
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('PRESS START',W/2,H*.42);
 ctx.fillStyle='rgba(255,255,255,.35)';ctx.font=(W/26)+"px 'Inter',sans-serif";
 ctx.fillText('Arrow Keys · D-Pad · Swipe',W/2,H*.55);
 var mc={marketing:'#00e676',classic:'#9bac6a',neon:'#ff4081',kids:'#ff9a9e'};
 ctx.fillStyle=mc[gameMode]||'#f5c518';ctx.font='bold '+(W/22)+"px 'Bebas Neue',sans-serif";
 ctx.fillText(gameMode.toUpperCase()+' MODE',W/2,H*.65)}

function gameLoop(){if(!running||paused)return;step();draw();loopId=setTimeout(gameLoop,getSpeed())}
function step(){
 dir={x:nextDir.x,y:nextDir.y};
 var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
 if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){loseLife();return}
 if(snake.some(function(s){return s.x===head.x&&s.y===head.y})){loseLife();return}
 var oi=-1;
 for(var k=0;k<obstacles.length;k++)if(obstacles[k].x===head.x&&obstacles[k].y===head.y){oi=k;break}
 if(oi>=0){
  var obs=obstacles[oi];
  obstacles=obstacles.filter(function(o){return o.shapeGroup===undefined||o.shapeGroup!==obs.shapeGroup});
  if(obs.effect==='die'){loseLife();return}
  showSpeech('⚠️ '+obs.lbl);
  if(obs.effect==='shrink'&&snake.length>3)snake.pop();
  spawnParticles(head.x,head.y,obs.color||'#ff4757',8,'💥');
  snake.unshift(head);snake.pop();updateHUD();draw();return}
 snake.unshift(head);
 var fi=-1;
 for(var m=0;m<foods.length;m++)if(foods[m].x===head.x&&foods[m].y===head.y){fi=m;break}
 if(fi>=0){
  var food=foods[fi];foods.splice(fi,1);
  if(food.isMathAnswer&&!food.isCorrect){
   showSpeech('❌ Wrong! Try again!');wrongSound();
   robotSay('🤖 Not quite! Try a different number!',3000);
   snake.pop();updateHUD();draw();return}
  score+=Math.max(0,food.pts||1);eatSound();
  spawnParticles(food.x,food.y,food.color||'#00e676',14,food.sym);
  if(food.pts>=4){var r=canvas.getBoundingClientRect();
   showCasinoSpin(CASINO_SYMBOLS[Math.floor(Math.random()*CASINO_SYMBOLS.length)],r.left+r.width/2,r.top+r.height*.3)}
  if(gameMode==='marketing')showShoutout(SH_MKT[Math.floor(Math.random()*SH_MKT.length)],'#f5c518');
  else if(gameMode==='kids')showShoutout(SH_KIDS[Math.floor(Math.random()*SH_KIDS.length)],'#ff9a9e');
  else if(gameMode==='neon')showShoutout(SH_DISCO[Math.floor(Math.random()*SH_DISCO.length)],'#ff4081');
  else showShoutout(SH_CLASSIC[Math.floor(Math.random()*SH_CLASSIC.length)],'#9bac6a');
  showSpeech(food.lbl||'+'+food.pts,1800);robotSay('🤖 '+food.lbl,2500);
  if(gameMode==='kids'&&kidsSubject==='phonics'&&food.sound)setTimeout(function(){speakText(food.lbl)},200);
  if(gameMode==='kids'&&kidsSubject==='words'){
   if(!food.isDistractor){
    kidsEaten.push(food.sym);
    wordDisplay.textContent=kidsCurrentWord.split('').map(function(l,i2){return kidsEaten[i2]||'_'}).join(' ');
    if(kidsEaten.join('')===kidsCurrentWord){
     score+=10;levelSound();
     robotSay('🌟 AMAZING! You spelled <strong>'+kidsCurrentWord+'</strong>! +10!',3500);
     showShoutout('🎉 SPELLED IT!','#00e676');spawnStarBurst(10,10);
     if(soundOn)speakText(kidsCurrentWord+' Great job!');
     setTimeout(pickKidsWord,1500)}
    else spawnFirstLetter();
    updateHUD();return}
   else{showSpeech('Not that one! 😅');snake.pop();updateHUD();draw();return}}
  if(food.isCorrect){
   robotSay('✅ Correct! '+food.lbl,3000);if(soundOn)speakText('Correct!');
   spawnCasinoBurst(food.x,food.y);
   setTimeout(function(){foods=[];spawnFood(4);draw()},800)}
  else spawnFood(1);
  var nl=Math.floor(score/8)+1;
  if(nl>level){level=nl;levelSound();spawnStarBurst(COLS/2,ROWS/2);
   showShoutout('⭐ LEVEL '+level+'!','#00e5ff');checkReward(level);
   obstacles=[];spawnObstacles();
   robotSay('🚀 Level <strong>'+level+'</strong>! Speed UP!',2500)}
  updateHUD();return}
 snake.pop();updateHUD()}
function loseLife(){
 dieSound();clearTimeout(loopId);lives--;
 spawnParticles(snake[0].x,snake[0].y,'#ff4757',18,'💥');updateHUD();
 if(lives<=0){
  running=false;clearTimeout(adbotTimer);draw();
  var msg=gameMode==='marketing'?'Your snake hit a wall — just like a business without a marketing strategy. Let us fix that.'
   :gameMode==='kids'?'Oops! Good try! Every great learner practices a lot. Want to play again?'
   :'Game over! Even the best players restart. The key is to keep growing.';
  document.getElementById('lossMsg').textContent=msg;
  setTimeout(function(){openModal(lossModal)},700)}
 else{
  showSpeech('❤️ '+lives+' left! Respawning…');
  robotSay('💪 You have '+lives+' lives left! Shake it off!',3000);
  var cx=Math.floor(COLS/2),cy=Math.floor(ROWS/2);
  snake=[{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}];dir={x:1,y:0};nextDir={x:1,y:0};
  setTimeout(function(){if(running){draw();gameLoop()}},700)}}
function checkReward(lv){
 if(rewardedLevels[lv])return;
 var r=REWARDS[lv];if(!r)return;
 rewardedLevels[lv]=1;rewardSound();spawnStarBurst(COLS/2,ROWS/2);showToast(r);
 robotSay('🎁 REWARD UNLOCKED! <strong>'+r.title+'</strong>',4000)}
var toastDismissTimer=null;
function showToast(r){
 document.getElementById('toastIcon').textContent=r.icon;
 document.getElementById('toastTitle').textContent=r.title;
 document.getElementById('toastDesc').textContent=r.desc;
 var c=document.getElementById('toastCode');c.textContent=r.code;c.className='toast-code';
 c.onclick=function(){copyCode(r.code,c)};
 rewardToast.classList.add('show');
 document.getElementById('toastDismiss').onclick=function(){
  rewardToast.classList.remove('show');paused=true;draw();
  setTimeout(function(){openRewardModal(r)},300)};
 clearTimeout(toastDismissTimer);
 toastDismissTimer=setTimeout(function(){
  if(rewardToast.classList.contains('show')){rewardToast.classList.remove('show');paused=true;draw();
   setTimeout(function(){openRewardModal(r)},300)}},5000)}
function openRewardModal(r){
 document.getElementById('rewardIcon').textContent=r.icon;
 document.getElementById('rewardTitle').textContent=r.title;
 document.getElementById('rewardDesc').textContent=r.desc;
 var c=document.getElementById('rewardCode');c.textContent=r.code;
 c.onclick=function(){copyCode(r.code,c)};openModal(rewardModal)}
function copyCode(code,el){
 navigator.clipboard.writeText(code).then(function(){
  el.textContent='✓ COPIED!';el.classList.add('copied');
  setTimeout(function(){el.textContent=code;el.classList.remove('copied')},2000)
 }).catch(function(){el.textContent='✓ COPIED!';setTimeout(function(){el.textContent=code},2000)})}
function openModal(m){m.classList.add('show')}
function closeModal(m){m.classList.remove('show')}
function startGame(){
 if(running&&!paused)return;
 if(paused){paused=false;scheduleAdbot();gameLoop();return}
 running=true;paused=false;score=0;level=1;lives=3;rewardedLevels={};
 wordDisplay.classList.remove('show');
 updateHUD();initSnake();draw();gameLoop();scheduleAdbot();
 robotSay('🚀 Game ON! Eat everything with a <strong>glow</strong>!',3000)}
function pauseGame(){
 if(!running)return;paused=!paused;
 if(!paused){scheduleAdbot();gameLoop()}else{clearTimeout(adbotTimer);draw()}}
function resetGame(){
 clearTimeout(loopId);clearTimeout(adbotTimer);
 running=false;paused=false;score=0;level=1;lives=3;rewardedLevels={};
 snake=[];foods=[];obstacles=[];particles=[];
 wordDisplay.classList.remove('show');updateHUD();draw();
 robotSay('🔄 Ready! Pick a mode and hit <strong>START</strong>!',3000)}
var DIRS={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},
 w:{x:0,y:-1},s:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0}};
document.addEventListener('keydown',function(e){
 var d=DIRS[e.key];
 if(d&&!(d.x===-dir.x&&d.y===0)&&!(d.y===-dir.y&&d.x===0)){
  var r=canvas.getBoundingClientRect();
  if(r.top<window.innerHeight&&r.bottom>0){nextDir=d;e.preventDefault();if(!running&&!paused)startGame()}}
 if(e.key===' '){var r2=canvas.getBoundingClientRect();
  if(r2.top<window.innerHeight&&r2.bottom>0){pauseGame();e.preventDefault()}}});
document.querySelectorAll('.dpad-btn[data-dir]').forEach(function(btn){
 var press=function(){
  if(!running&&!paused)startGame();
  var map={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
  var d=map[btn.dataset.dir];
  if(d&&!(d.x===-dir.x&&d.y===0)&&!(d.y===-dir.y&&d.x===0))nextDir=d;
  btn.classList.add('pressed');setTimeout(function(){btn.classList.remove('pressed')},150)};
 btn.addEventListener('touchstart',function(e){e.preventDefault();press()},{passive:false});
 btn.addEventListener('mousedown',press)});
canvas.addEventListener('touchstart',function(e){touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY;e.preventDefault()},{passive:false});
canvas.addEventListener('touchend',function(e){
 var dx=e.changedTouches[0].clientX-touchStartX,dy=e.changedTouches[0].clientY-touchStartY;
 if(!running&&!paused)startGame();
 if(Math.abs(dx)>Math.abs(dy)){
  if(dx>20&&dir.x===0)nextDir={x:1,y:0};else if(dx<-20&&dir.x===0)nextDir={x:-1,y:0}}
 else{if(dy>20&&dir.y===0)nextDir={x:0,y:1};else if(dy<-20&&dir.y===0)nextDir={x:0,y:-1}}
 e.preventDefault()},{passive:false});
document.querySelectorAll('.ctrl-btn').forEach(function(btn){
 btn.addEventListener('click',function(){
  document.querySelectorAll('.ctrl-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');ctrlMode=btn.dataset.ctrl;
  dpadWrap.style.display=(ctrlMode==='arrows')?'none':'block'})});
var MODE_LABELS={marketing:'📈 MARKETING MODE',classic:'🐍 OLD SCHOOL SNAKE',neon:'🪩 DISCO NEON',kids:'🎨 KIDS LEARNING'};
var MODE_TAPES={marketing:'MARKETING\nGROWTH',classic:'OLD SCHOOL\nSNAKE',neon:'DISCO\nNEON',kids:'KIDS\nLEARN'};
var MODE_ADBOT={
 marketing:'📈 Marketing mode! Eat leads, rankings and reviews. Dodge algorithm changes and bad reviews!',
 classic:'🐍 Old School Snake! Pure and simple.',
 neon:'🪩 Disco mode! Ride the rainbow waves and eat the beat!',
 kids:'🎨 Kids mode! Learn letters, words, math and animals while playing!'};
document.querySelectorAll('#modeButtons .bb-btn').forEach(function(btn){
 btn.addEventListener('click',function(){
  document.querySelectorAll('#modeButtons .bb-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');gameMode=btn.dataset.mode;
  bbDisplay.textContent=MODE_LABELS[gameMode]||gameMode.toUpperCase();
  tapeLabel.textContent=MODE_TAPES[gameMode]||gameMode.toUpperCase();
  kidsBar.classList.toggle('show',gameMode==='kids');
  wordDisplay.classList.remove('show');
  robotSay(MODE_ADBOT[gameMode],4000);resetGame();draw()})});
var SKIN_ACTIVE={modern:'active-blue',oldschool:'active',handheld:'active-purple',neon:'active-pink',kids:'active-green'};
document.querySelectorAll('#skinButtons .bb-btn').forEach(function(btn){
 btn.addEventListener('click',function(){
  document.querySelectorAll('#skinButtons .bb-btn').forEach(function(b){
   b.classList.remove('active','active-blue','active-purple','active-pink','active-green')});
  btn.classList.add(SKIN_ACTIVE[btn.dataset.skin]||'active');
  applySkin(btn.dataset.skin);draw()})});
document.getElementById('diffSlider').addEventListener('input',function(e){
 difficulty=parseInt(e.target.value);
 var l=['EASY — CHILL','MEDIUM — FOCUSED','HARD — INTENSE','EXPERT — BEAST MODE'];
 bbDisplay.textContent=l[difficulty];
 setTimeout(function(){bbDisplay.textContent=MODE_LABELS[gameMode]||gameMode.toUpperCase()},1500)});
document.querySelectorAll('.kids-btn').forEach(function(btn){
 btn.addEventListener('click',function(){
  document.querySelectorAll('.kids-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');kidsSubject=btn.dataset.subject;
  kidsWordIdx=0;wordDisplay.classList.remove('show');resetGame();draw();
  var msgs={letters:'🔤 Eat every letter of the alphabet!',words:'📚 Spell words! Eat letters in order!',
   math:'🔢 Math time! Eat the correct answer!',phonics:'🔊 Phonics! Your device will speak the sounds!',
   animals:'🐾 Collect every animal! Watch for the rare unicorn!'};
  robotSay(msgs[kidsSubject]||'Go!',3500)})});
document.getElementById('soundKnob').addEventListener('click',function(){
 soundOn=!soundOn;this.classList.toggle('active-knob',soundOn);
 this.style.transform=soundOn?'':'rotate(180deg)';
 robotSay(soundOn?'🔊 Sound ON!':'🔇 Sound OFF.',2000)});
document.getElementById('fxKnob').addEventListener('click',function(){
 fxOn=!fxOn;this.classList.toggle('active-knob',fxOn);
 robotSay(fxOn?'✨ Particle FX ON!':'Particles off.',2000)});
document.getElementById('volKnob').addEventListener('click',function(){
 volLevel=volLevel>.5?.2:.6;if(audioEl)audioEl.volume=volLevel;
 document.getElementById('volSlider').value=Math.round(volLevel*100);
 robotSay('🔊 Volume '+(volLevel>.5?'UP':'DOWN')+'!',1500)});
document.getElementById('flashKnob').addEventListener('click',function(){
 flashMode=!flashMode;this.classList.toggle('active-knob',flashMode);
 robotSay(flashMode?'⚡ FLASH MODE ON! The snake goes rainbow!':'Flash mode off.',2000)});
var CTRL_MODES=['dpad','arrows','swipe'],ctrlKnobIdx=0;
document.getElementById('ctrlKnob').addEventListener('click',function(){
 ctrlKnobIdx=(ctrlKnobIdx+1)%CTRL_MODES.length;ctrlMode=CTRL_MODES[ctrlKnobIdx];
 document.querySelectorAll('.ctrl-btn').forEach(function(b){b.classList.toggle('active',b.dataset.ctrl===ctrlMode)});
 dpadWrap.style.display=(ctrlMode==='arrows')?'none':'block';
 this.classList.toggle('active-knob',ctrlMode!=='arrows');
 robotSay({dpad:'🕹️ D-PAD mode!',arrows:'⌨️ Arrow Keys mode!',swipe:'👆 Swipe mode!'}[ctrlMode],2000)});
document.getElementById('voiceKnob').addEventListener('click',function(){
 botVoiceOn=!botVoiceOn;this.classList.toggle('active-knob',botVoiceOn);
 if(botVoiceOn)robotSay('🔊 ADBOT voice is ON! I will speak to you!',3000);
 else{if(window.speechSynthesis)window.speechSynthesis.cancel();robotSay('🔇 ADBOT voice off.',1500)}});
[document.getElementById('robotBodyMini'),document.getElementById('robotBodyLarge')].forEach(function(el){
 if(!el)return;
 el.addEventListener('click',function(){
  var msgs=['👋 Hi! I am ADBOT 3000 — your marketing guide!',
   '🧠 This game uses real behavioural mechanics to make brands memorable!',
   '📞 Want a game like this for YOUR business? Call (720) 249-6588!',
   '🎮 An ad you choose to play beats an ad that interrupts you.',
   '🚀 Eye To Ad Media builds custom branded games for any business!',
   '⭐ A reward you earned gets used. One you were handed gets binned.'];
  robotSay(msgs[Math.floor(Math.random()*msgs.length)],4000)})});
document.getElementById('startBtn').addEventListener('click',startGame);
document.getElementById('pauseBtn').addEventListener('click',pauseGame);
document.getElementById('resetBtn').addEventListener('click',resetGame);
document.getElementById('closeLoss').addEventListener('click',function(){closeModal(lossModal)});
document.getElementById('tryAgainBtn').addEventListener('click',function(){closeModal(lossModal);resetGame();startGame()});
document.getElementById('closeReward').addEventListener('click',function(){closeModal(rewardModal);paused=false;gameLoop();scheduleAdbot()});
document.getElementById('keepPlayingBtn').addEventListener('click',function(){closeModal(rewardModal);paused=false;gameLoop();scheduleAdbot()});
[lossModal,rewardModal].forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeModal(m)})});
window.addEventListener('scroll',function(){
 var ge=document.getElementById('game');if(!ge)return;
 var pa=document.getElementById('playAnchor');if(!pa)return;
 pa.style.display=ge.getBoundingClientRect().top<0?'none':'block'},{passive:true});
applySkin('modern');
bbDisplay.textContent=MODE_LABELS[gameMode];
tapeLabel.textContent=MODE_TAPES[gameMode];
syncParticleCanvas();
window.addEventListener('resize',function(){syncParticleCanvas();if(!running)draw()});
updateHUD();draw();
document.getElementById('soundKnob').classList.add('active-knob');
document.getElementById('fxKnob').classList.add('active-knob');
setTimeout(function(){robotSay('👋 Welcome to the <strong>Ad Lab!</strong> Pick a mode and hit START. 🎮',6000)},900);
})();




(function(){
'use strict';
var PUZZLES={"marketing":{"easy":{"rows":10,"cols":10,"sol":[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,"B",0,0,0,0,0],[0,0,0,0,"R","E","A","C","H",0],[0,"O",0,0,"A",0,0,0,0,0],[0,"F","U","N","N","E","L",0,0,0],[0,"F",0,0,"D",0,"E",0,0,0],[0,"E",0,0,0,0,"A",0,0,0],[0,"R",0,0,0,0,"D",0,0,0],[0,0,0,0,0,0,"S",0,0,0],[0,0,0,0,0,0,0,0,0,0]],"across":[{"num":2,"row":2,"col":4,"len":5,"clue":"How many people actually saw it"},{"num":4,"row":4,"col":1,"len":6,"clue":"Path that turns a prospect into a buyer"}],"down":[{"num":1,"row":1,"col":4,"len":5,"clue":"Your identity \u2014 name, logo, voice"},{"num":3,"row":3,"col":1,"len":5,"clue":"The deal that makes someone act now"},{"num":5,"row":4,"col":6,"len":5,"clue":"Potential customers in your pipeline"}]},"hard":{"rows":13,"cols":17,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,"M",0,0,0,0,0,0,0,0,0,0,0,0],[0,"C",0,0,"A",0,0,0,0,0,"C",0,0,0,0,0,0],[0,"A","T","T","R","I","B","U","T","I","O","N",0,0,0,0,0],[0,"D",0,0,"G",0,0,0,0,0,"N",0,0,0,0,0,0],[0,"E",0,0,"I",0,0,0,"S",0,"V",0,0,0,0,0,0],[0,"N",0,0,"N",0,0,"R","E","T","E","N","T","I","O","N",0],[0,"C",0,0,0,0,0,0,"G",0,"R",0,0,0,0,0,0],[0,"E",0,0,0,0,0,0,"M",0,"S",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,"E",0,"I",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,"N",0,"O",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,"T",0,"N",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":4,"row":3,"col":1,"len":11,"clue":"Knowing which channel produced the sale"},{"num":6,"row":6,"col":7,"len":9,"clue":"Keeping the customers you already paid to get"}],"down":[{"num":1,"row":1,"col":4,"len":6,"clue":"What is left after cost of delivery"},{"num":2,"row":2,"col":1,"len":7,"clue":"How often you publish or send"},{"num":3,"row":2,"col":10,"len":10,"clue":"Turning a visitor into a customer"},{"num":5,"row":5,"col":8,"len":7,"clue":"A defined slice of your audience"}]}},"seo":{"easy":{"rows":10,"cols":7,"sol":[[0,0,0,0,0,0,0],[0,"T",0,0,0,0,0],[0,"I","N","D","E","X",0],[0,"T",0,0,0,0,0],[0,"L","O","C","A","L",0],[0,"E",0,"R",0,"I",0],[0,0,0,"A",0,"N",0],[0,0,0,"W",0,"K",0],[0,0,0,"L",0,0,0],[0,0,0,0,0,0,0]],"across":[{"num":2,"row":2,"col":1,"len":5,"clue":"Google catalogue your page must be in"},{"num":3,"row":4,"col":1,"len":5,"clue":"Type of SEO aimed at one city"}],"down":[{"num":1,"row":1,"col":1,"len":5,"clue":"The clickable headline in search results"},{"num":4,"row":4,"col":3,"len":5,"clue":"What a search bot does to your site"},{"num":5,"row":4,"col":5,"len":4,"clue":"A pointer from another site to yours"}]},"hard":{"rows":10,"cols":11,"sol":[[0,0,0,0,0,0,0,0,0,0,0],[0,"S",0,"S",0,0,"S",0,"B",0,0],[0,"C","A","N","O","N","I","C","A","L",0],[0,"H",0,"I",0,0,"T",0,"C",0,0],[0,"E",0,"P",0,0,"E",0,"K",0,0],[0,"M",0,"P",0,0,"M",0,"L",0,0],[0,"A",0,"E",0,0,"A",0,"I",0,0],[0,0,0,"T",0,0,"P",0,"N",0,0],[0,0,0,0,0,0,0,0,"K",0,0],[0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":5,"row":2,"col":1,"len":9,"clue":"Tag that resolves duplicate versions of a page"}],"down":[{"num":1,"row":1,"col":1,"len":6,"clue":"Structured data that explains a page to machines"},{"num":2,"row":1,"col":3,"len":7,"clue":"The text shown under your result"},{"num":3,"row":1,"col":6,"len":7,"clue":"XML file that guides crawlers"},{"num":4,"row":1,"col":8,"len":8,"clue":"An inbound link from another domain"}]}},"science":{"easy":{"rows":8,"cols":9,"sol":[[0,0,0,0,0,0,0,0,0],[0,"C",0,0,"O",0,0,0,0],[0,"E","N","E","R","G","Y",0,0],[0,"L",0,0,"B",0,0,"A",0],[0,"L",0,"L","I","G","H","T",0],[0,0,0,0,"T",0,0,"O",0],[0,0,0,0,0,0,0,"M",0],[0,0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":2,"col":1,"len":6,"clue":"What cannot be created or destroyed"},{"num":5,"row":4,"col":3,"len":5,"clue":"Travels about 300,000 km per second"}],"down":[{"num":1,"row":1,"col":1,"len":4,"clue":"Basic unit of every living thing"},{"num":2,"row":1,"col":4,"len":5,"clue":"Path one body takes around another"},{"num":4,"row":3,"col":7,"len":4,"clue":"Smallest unit of an element"}]},"hard":{"rows":10,"cols":15,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,"E","N","Z","Y","M","E",0,0,0,0,0,0,0,0],[0,0,0,0,0,"I",0,0,0,"I",0,0,0,0,0],[0,0,0,"C","A","T","A","L","Y","S","T",0,0,0,0],[0,0,0,0,0,"O",0,0,0,"O",0,0,0,0,0],[0,0,0,0,0,"S",0,"E","N","T","R","O","P","Y",0],[0,0,0,0,0,"I",0,0,0,"O",0,0,0,0,0],[0,0,0,0,0,"S",0,0,0,"P",0,0,0,0,0],[0,0,0,0,0,0,0,0,"N","E","U","R","O","N",0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":1,"row":1,"col":1,"len":6,"clue":"Protein that speeds a reaction"},{"num":4,"row":3,"col":3,"len":8,"clue":"Speeds a reaction without being consumed"},{"num":5,"row":5,"col":7,"len":7,"clue":"Measure of disorder in a system"},{"num":6,"row":8,"col":8,"len":6,"clue":"Cell that carries an electrical signal"}],"down":[{"num":2,"row":1,"col":5,"len":7,"clue":"Cell division making two identical cells"},{"num":3,"row":2,"col":9,"len":7,"clue":"Same element, different neutron count"}]}},"nature":{"easy":{"rows":13,"cols":12,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,"R",0,0,0,0,0,0,0],[0,0,0,0,"I",0,0,0,0,0,0,0],[0,0,0,0,"V",0,0,0,0,0,0,0],[0,0,0,0,"E",0,0,0,0,0,0,0],[0,0,"F","O","R","E","S","T",0,0,0,0],[0,0,0,0,0,0,0,"U",0,0,0,0],[0,0,0,0,0,"C","A","N","Y","O","N",0],[0,0,0,0,0,"O",0,"D",0,0,0,0],[0,0,0,0,0,"R",0,"R",0,0,0,0],[0,"D","E","L","T","A",0,"A",0,0,0,0],[0,0,0,0,0,"L",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":2,"row":5,"col":2,"len":6,"clue":"Dense stand of trees"},{"num":4,"row":7,"col":5,"len":6,"clue":"Deep gorge cut by water"},{"num":5,"row":10,"col":1,"len":5,"clue":"Where a river fans into the sea"}],"down":[{"num":1,"row":1,"col":4,"len":5,"clue":"Freshwater flowing toward the sea"},{"num":3,"row":5,"col":7,"len":6,"clue":"Treeless biome over permafrost"},{"num":4,"row":7,"col":5,"len":5,"clue":"Reef builder bleached by warm water"}]},"hard":{"rows":12,"cols":16,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,"E",0,0,0,0,0,"W","E","T","L","A","N","D",0],[0,0,"R",0,0,"M",0,"C",0,"C",0,0,0,0,0,0],[0,"P","O","L","L","I","N","A","T","O","R",0,0,0,0,0],[0,0,"S",0,0,"G",0,"N",0,"S",0,0,0,0,0,0],[0,0,"I",0,0,"R",0,"O",0,"Y",0,0,0,0,0,0],[0,0,"O",0,0,"A",0,"P",0,"S",0,0,0,0,0,0],[0,0,"N",0,0,"T",0,"Y",0,"T",0,0,0,0,0,0],[0,0,0,0,0,"I",0,0,0,"E",0,0,0,0,0,0],[0,0,0,0,0,"O",0,0,0,"M",0,0,0,0,0,0],[0,0,0,0,0,"N",0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":2,"row":1,"col":8,"len":7,"clue":"Marsh that filters water and buffers floods"},{"num":6,"row":3,"col":1,"len":10,"clue":"Bee, bat or bird that moves pollen"}],"down":[{"num":1,"row":1,"col":2,"len":7,"clue":"Wearing away of rock and soil"},{"num":3,"row":1,"col":9,"len":9,"clue":"Community of organisms plus their environment"},{"num":4,"row":2,"col":5,"len":9,"clue":"Seasonal movement of a species"},{"num":5,"row":2,"col":7,"len":6,"clue":"Upper layer of a rainforest"}]}},"life":{"easy":{"rows":12,"cols":8,"sol":[[0,0,0,0,0,0,0,0],[0,0,"H",0,0,0,"F",0],[0,0,"A",0,0,0,"O",0],[0,0,"B",0,0,0,"C",0],[0,0,"I",0,0,0,"U",0],[0,"S","T","R","E","S","S",0],[0,0,0,0,0,"L",0,0],[0,0,"W","A","T","E","R",0],[0,0,"A",0,0,"E",0,0],[0,0,"L",0,0,"P",0,0],[0,0,"K",0,0,0,0,0],[0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":5,"col":1,"len":6,"clue":"What raises cortisol"},{"num":5,"row":7,"col":2,"len":5,"clue":"Drink more of it"}],"down":[{"num":1,"row":1,"col":2,"len":5,"clue":"Behaviour repeated until automatic"},{"num":2,"row":1,"col":6,"len":5,"clue":"What notifications destroy"},{"num":4,"row":5,"col":5,"len":5,"clue":"Rest your brain cannot skip"},{"num":5,"row":7,"col":2,"len":4,"clue":"Simplest daily exercise there is"}]},"hard":{"rows":13,"cols":17,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,"C",0,"M",0,0,0,0,0,0,0,0,0,0],[0,"R","E","S","I","L","I","E","N","C","E",0,0,0,0,0,0],[0,0,0,0,"R",0,"C",0,0,0,0,0,0,0,0,0,0],[0,0,0,0,"C","O","R","T","I","S","O","L",0,0,0,0,0],[0,0,0,0,"A",0,"O",0,"M",0,0,0,0,0,0,0,0],[0,0,0,0,"D",0,"B",0,"M",0,0,0,0,0,0,0,0],[0,0,0,0,"I",0,"I",0,"U",0,0,0,0,0,0,0,0],[0,0,0,0,"A",0,"O",0,"N","U","T","R","I","E","N","T",0],[0,0,0,0,"N",0,"M",0,"I",0,0,0,0,0,0,0,0],[0,0,0,0,0,0,"E",0,"T",0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,"Y",0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":2,"col":1,"len":10,"clue":"Capacity to recover from setbacks"},{"num":4,"row":4,"col":4,"len":8,"clue":"Hormone released under stress"},{"num":6,"row":8,"col":8,"len":8,"clue":"What food actually delivers"}],"down":[{"num":1,"row":1,"col":4,"len":9,"clue":"Relating to the daily body clock"},{"num":2,"row":1,"col":6,"len":10,"clue":"Community of gut bacteria"},{"num":5,"row":4,"col":8,"len":8,"clue":"Your defence against infection"}]}},"history":{"easy":{"rows":11,"cols":13,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,"C",0,0,0,0,0,0],[0,"T",0,0,0,0,"A",0,0,0,0,0,0],[0,"R",0,0,0,0,"S","C","R","O","L","L",0],[0,"A",0,0,0,0,"T",0,0,0,0,0,0],[0,"D",0,0,0,0,"L",0,0,0,0,0,0],[0,"E","M","P","I","R","E",0,0,0,0,0,0],[0,0,0,0,0,"O",0,0,0,0,0,0,0],[0,0,0,0,0,"M",0,0,0,0,0,0,0],[0,0,0,0,0,"E",0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":3,"col":6,"len":6,"clue":"How texts were stored before books"},{"num":4,"row":6,"col":1,"len":6,"clue":"Many territories, one ruler"}],"down":[{"num":1,"row":1,"col":6,"len":6,"clue":"Fortified medieval residence"},{"num":2,"row":2,"col":1,"len":5,"clue":"Exchange that built early cities"},{"num":5,"row":6,"col":5,"len":4,"clue":"Empire centred on the Tiber"}]},"hard":{"rows":14,"cols":13,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,"A",0,0,0,0,0,0,"D",0,0,0,0],[0,"R","E","V","O","L","U","T","I","O","N",0,0],[0,"C",0,0,0,0,0,0,"P",0,0,0,0],[0,"H",0,0,0,0,0,0,"L",0,0,0,0],[0,"I",0,0,0,0,0,0,"O",0,0,0,0],[0,"V",0,0,0,0,"D",0,"M",0,0,0,0],[0,"E",0,0,0,"P","Y","R","A","M","I","D",0],[0,0,0,0,0,0,"N",0,"C",0,0,0,0],[0,0,0,"T","R","E","A","T","Y",0,0,0,0],[0,0,0,0,0,0,"S",0,0,0,0,0,0],[0,0,0,0,0,0,"T",0,0,0,0,0,0],[0,0,0,0,0,0,"Y",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":2,"col":1,"len":10,"clue":"Overthrow of an established order"},{"num":5,"row":7,"col":5,"len":7,"clue":"Monumental Egyptian tomb"},{"num":6,"row":9,"col":3,"len":6,"clue":"Formal agreement ending a conflict"}],"down":[{"num":1,"row":1,"col":1,"len":7,"clue":"Where primary sources are kept"},{"num":2,"row":1,"col":8,"len":9,"clue":"Negotiation between states"},{"num":4,"row":6,"col":6,"len":7,"clue":"Succession of rulers from one family"}]}},"space":{"easy":{"rows":10,"cols":9,"sol":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,"C",0,0,0,0],[0,0,0,"S","O","L","A","R",0],[0,0,0,0,"M",0,0,0,0],[0,0,"O",0,"E",0,0,0,0],[0,"C","R","A","T","E","R",0,0],[0,0,"B",0,0,0,0,0,0],[0,0,"I",0,0,0,0,0,0],[0,"S","T","A","R",0,0,0,0],[0,0,0,0,0,0,0,0,0]],"across":[{"num":2,"row":2,"col":3,"len":5,"clue":"Relating to our sun"},{"num":4,"row":5,"col":1,"len":6,"clue":"Impact scar on a moon"},{"num":5,"row":8,"col":1,"len":4,"clue":"Ball of burning gas"}],"down":[{"num":1,"row":1,"col":4,"len":5,"clue":"Icy body with a tail"},{"num":3,"row":4,"col":2,"len":5,"clue":"Path around a larger body"}]},"hard":{"rows":11,"cols":15,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,"Q",0,0,"G",0,0,0,0,0,0,0,0,0],[0,"S","U","P","E","R","N","O","V","A",0,0,0,0,0],[0,0,"A",0,0,"A",0,0,0,"S",0,0,0,0,0],[0,0,"S",0,0,"V",0,0,0,"T",0,0,0,0,0],[0,0,"A",0,0,"I",0,0,"N","E","B","U","L","A",0],[0,0,"R",0,0,"T",0,0,0,"R",0,0,0,0,0],[0,0,0,0,0,"Y",0,0,0,"O",0,0,0,0,0],[0,0,0,0,0,0,"E","C","L","I","P","S","E",0,0],[0,0,0,0,0,0,0,0,0,"D",0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":3,"row":2,"col":1,"len":9,"clue":"Explosive death of a massive star"},{"num":5,"row":5,"col":8,"len":6,"clue":"Cloud of gas where stars are born"},{"num":6,"row":8,"col":6,"len":7,"clue":"One body shadowing another"}],"down":[{"num":1,"row":1,"col":2,"len":6,"clue":"Blazing active galactic nucleus"},{"num":2,"row":1,"col":5,"len":7,"clue":"Attraction between masses"},{"num":4,"row":2,"col":9,"len":8,"clue":"Rocky body between Mars and Jupiter"}]}},"food":{"easy":{"rows":10,"cols":9,"sol":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,"G",0,0,0,0],[0,0,0,0,"R",0,0,0,0],[0,"B","R","E","A","D",0,0,0],[0,0,0,0,"I",0,"S",0,0],[0,0,0,"K","N","E","A","D",0],[0,0,0,0,0,0,"U",0,0],[0,0,0,0,0,0,"C",0,0],[0,0,0,0,0,0,"E",0,0],[0,0,0,0,0,0,0,0,0]],"across":[{"num":2,"row":3,"col":1,"len":5,"clue":"Baked staple in a loaf"},{"num":4,"row":5,"col":3,"len":5,"clue":"Work dough to build gluten"}],"down":[{"num":1,"row":1,"col":4,"len":5,"clue":"Rice and wheat, broadly"},{"num":3,"row":4,"col":6,"len":5,"clue":"Liquid that carries flavour"}]},"hard":{"rows":11,"cols":14,"sol":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,"U",0,0,0],[0,"F",0,"B",0,"E",0,0,0,0,"M",0,0,0],[0,"E",0,"R",0,"M","A","R","I","N","A","D","E",0],[0,"R",0,"A",0,"U",0,0,0,0,"M",0,0,0],[0,"M","A","I","L","L","A","R","D",0,"I",0,0,0],[0,"E",0,"S",0,"S",0,0,0,0,0,0,0,0],[0,"N",0,"E",0,"I",0,0,0,0,0,0,0,0],[0,"T",0,0,0,"O",0,0,0,0,0,0,0,0],[0,0,0,0,0,"N",0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"across":[{"num":5,"row":3,"col":5,"len":8,"clue":"Seasoned soak before cooking"},{"num":6,"row":5,"col":1,"len":8,"clue":"Browning reaction behind seared flavour"}],"down":[{"num":1,"row":1,"col":10,"len":5,"clue":"The savoury fifth taste"},{"num":2,"row":2,"col":1,"len":7,"clue":"Preserve using bacteria or yeast"},{"num":3,"row":2,"col":3,"len":6,"clue":"Sear, then cook slowly in liquid"},{"num":4,"row":2,"col":5,"len":8,"clue":"Stable blend of oil and water"}]}}};
var topic='marketing',diff='easy',data=null,cellMap={},userData={},timerInt=null,timerSec=0,activeDir='across',activeRef=null;
var grid=document.getElementById('cwGrid');
if(!grid)return;
function get(){return (PUZZLES[topic]&&PUZZLES[topic][diff])||PUZZLES.marketing.easy}
function build(){
 data=get();var rows=data.rows,cols=data.cols,sol=data.sol;
 cellMap={};userData={};grid.innerHTML='';
 var nums={};
 data.across.concat(data.down).forEach(function(cl){var k=cl.row+'_'+cl.col;if(nums[k]===undefined)nums[k]=cl.num});
 for(var r=0;r<rows;r++){
  var rowEl=document.createElement('div');rowEl.className='cw-row';
  for(var c=0;c<cols;c++){
   var cd=document.createElement('div');cd.className='cw-cell';
   var v=sol[r][c];
   if(!v||v===0)cd.classList.add('black');
   else{
    var inp=document.createElement('input');
    inp.type='text';inp.maxLength=1;inp.autocomplete='off';
    inp.setAttribute('autocorrect','off');inp.setAttribute('spellcheck','false');
    inp.setAttribute('aria-label','Row '+(r+1)+' column '+(c+1));
    inp.dataset.row=r;inp.dataset.col=c;
    var key=r+'_'+c;cellMap[key]=inp;
    (function(rr,cc,kk,el){
     el.addEventListener('focus',function(){highlight(rr,cc)});
     el.addEventListener('input',function(e){
      var val=e.target.value.toUpperCase().replace(/[^A-Z]/g,'');
      e.target.value=val;if(val){userData[kk]=val;move(activeDir==='across'?rr:rr+1,activeDir==='across'?cc+1:cc)}});
     el.addEventListener('keydown',function(e){
      if(e.key==='Backspace'){if(el.value){el.value='';delete userData[kk]}
       else move(activeDir==='across'?rr:rr-1,activeDir==='across'?cc-1:cc);e.preventDefault()}
      if(e.key==='ArrowRight'){move(rr,cc+1);e.preventDefault()}
      if(e.key==='ArrowLeft'){move(rr,cc-1);e.preventDefault()}
      if(e.key==='ArrowDown'){move(rr+1,cc);e.preventDefault()}
      if(e.key==='ArrowUp'){move(rr-1,cc);e.preventDefault()}});
    })(r,c,key,inp);
    cd.appendChild(inp);
    if(nums[key]!==undefined){var n=document.createElement('span');n.className='cw-num';n.textContent=nums[key];cd.appendChild(n)}
   }
   rowEl.appendChild(cd)}
  grid.appendChild(rowEl)}
 buildClues();startTimer();document.getElementById('cwStatus').textContent=''}
function highlight(r,c){
 document.querySelectorAll('.cw-cell.cw-hl').forEach(function(e){e.classList.remove('cw-hl')});
 document.querySelectorAll('.cw-clue.active').forEach(function(e){e.classList.remove('active')});
 var ac=data.across.filter(function(cl){return cl.row===r&&c>=cl.col&&c<cl.col+cl.len})[0];
 var dn=data.down.filter(function(cl){return cl.col===c&&r>=cl.row&&r<cl.row+cl.len})[0];
 var ch=null;
 if(ac&&dn){
  if(activeRef&&activeRef.dir==='across'&&activeRef.clue===ac)ch={dir:'down',clue:dn};
  else if(activeRef&&activeRef.dir==='down'&&activeRef.clue===dn)ch={dir:'across',clue:ac};
  else ch=activeDir==='across'?{dir:'across',clue:ac}:{dir:'down',clue:dn}}
 else if(ac)ch={dir:'across',clue:ac};
 else if(dn)ch={dir:'down',clue:dn};
 if(!ch)return;
 activeRef=ch;activeDir=ch.dir;
 var cl=ch.clue,h=ch.dir==='across';
 for(var i=0;i<cl.len;i++){
  var k=h?(cl.row+'_'+(cl.col+i)):((cl.row+i)+'_'+cl.col);
  if(cellMap[k])cellMap[k].parentElement.classList.add('cw-hl')}
 document.querySelectorAll('#'+(h?'cwAcross':'cwDown')+' .cw-clue').forEach(function(e){
  if(parseInt(e.dataset.num)===cl.num)e.classList.add('active')})}
function move(r,c){var k=r+'_'+c;if(cellMap[k])cellMap[k].focus()}
function buildClues(){
 var a=document.getElementById('cwAcross'),d=document.getElementById('cwDown');
 a.innerHTML='';d.innerHTML='';
 function add(list,el,dir){
  list.forEach(function(cl){
   var x=document.createElement('div');x.className='cw-clue';x.dataset.num=cl.num;
   x.innerHTML='<strong>'+cl.num+'.</strong> '+cl.clue;
   x.addEventListener('click',function(){activeDir=dir;activeRef={dir:dir,clue:cl};move(cl.row,cl.col)});
   el.appendChild(x)})}
 add(data.across,a,'across');add(data.down,d,'down')}
function startTimer(){
 clearInterval(timerInt);timerSec=0;
 var el=document.getElementById('cwTimer');if(el)el.textContent='⏱ 0:00';
 timerInt=setInterval(function(){timerSec++;
  var m=Math.floor(timerSec/60),s=timerSec%60;
  if(el)el.textContent='⏱ '+m+':'+(s<10?'0':'')+s},1000)}
function check(){
 var correct=0,total=0;
 for(var r=0;r<data.rows;r++)for(var c=0;c<data.cols;c++){
  var v=data.sol[r][c];if(!v||v===0)continue;total++;
  var inp=cellMap[r+'_'+c];if(!inp)continue;
  inp.parentElement.classList.remove('correct','wrong');
  if(inp.value===v){correct++;inp.parentElement.classList.add('correct')}
  else if(inp.value)inp.parentElement.classList.add('wrong')}
 var st=document.getElementById('cwStatus');
 if(correct===total&&total>0){clearInterval(timerInt);
  var m=Math.floor(timerSec/60),s=timerSec%60;
  st.textContent='🏆 PERFECT! Solved in '+(m>0?m+'m ':'')+s+'s!';st.style.color='var(--green)'}
 else{st.textContent=correct+'/'+total+' correct — keep going!';st.style.color='var(--gold)'}}
function reveal(){
 for(var r=0;r<data.rows;r++)for(var c=0;c<data.cols;c++){
  var v=data.sol[r][c];if(!v||v===0)continue;
  var inp=cellMap[r+'_'+c];
  if(inp){inp.value=v;userData[r+'_'+c]=v;inp.parentElement.classList.add('correct')}}
 clearInterval(timerInt);
 document.getElementById('cwStatus').textContent='💡 Revealed! Try another topic.'}
function reset(){
 userData={};
 Object.keys(cellMap).forEach(function(k){
  cellMap[k].value='';cellMap[k].parentElement.classList.remove('correct','wrong')});
 document.getElementById('cwStatus').textContent='';startTimer()}
document.getElementById('cwCheck').addEventListener('click',check);
document.getElementById('cwReveal').addEventListener('click',reveal);
document.getElementById('cwReset').addEventListener('click',reset);
document.getElementById('cwNew').addEventListener('click',build);
document.querySelectorAll('[data-cwtopic]').forEach(function(b){
 b.addEventListener('click',function(){
  document.querySelectorAll('[data-cwtopic]').forEach(function(x){x.classList.remove('active')});
  b.classList.add('active');topic=b.dataset.cwtopic;build()})});
document.querySelectorAll('[data-cwdiff]').forEach(function(b){
 b.addEventListener('click',function(){
  document.querySelectorAll('[data-cwdiff]').forEach(function(x){x.classList.remove('active')});
  b.classList.add('active');diff=b.dataset.cwdiff;build()})});
build();
})();

(function(){
'use strict';
var PZ=['530070000600195000098000060800060003400803001700020006060000280000419005000080079',
 '010020300000305600040070010500000020070050030060000007090030060008604000006010090',
 '200080300060070084030500209000105408000000000402706000301007040720040060004010003'];
var cur=0,board=[],given={},sel=null;
var grid=document.getElementById('sudokuGrid'),status=document.getElementById('sudokuStatus'),els=[];
if(!grid)return;
function load(i){
 var s=PZ[i%PZ.length];board=[];given={};
 for(var k=0;k<81;k++){board.push(parseInt(s[k])||0);if(s[k]!=='0')given[k]=1}
 render();status.textContent=''}
function render(){
 grid.innerHTML='';els.length=0;
 for(var i=0;i<81;i++){
  var cell=document.createElement('div');cell.className='sudoku-cell';
  var r=Math.floor(i/9),c=i%9;
  if(r===2||r===5)cell.style.borderBottom='2px solid rgba(255,255,255,.3)';
  if(c===2||c===5)cell.style.borderRight='2px solid rgba(255,255,255,.3)';
  var inp=document.createElement('input');
  inp.type='text';inp.maxLength=1;inp.autocomplete='off';
  inp.setAttribute('aria-label','Sudoku cell '+(r+1)+','+(c+1));
  if(given[i]){cell.classList.add('given');inp.value=board[i]||'';inp.readOnly=true}
  else{
   inp.value=board[i]?board[i]:'';
   (function(idx,cl){
    inp.addEventListener('input',function(e){
     var v=parseInt(e.target.value);
     if(v>=1&&v<=9){board[idx]=v;e.target.value=v}else{board[idx]=0;e.target.value=''}
     validate(idx,cl)});
    inp.addEventListener('focus',function(){
     if(sel!==null&&els[sel])els[sel].classList.remove('selected');
     sel=idx;cl.classList.add('selected')})})(i,cell)}
  cell.appendChild(inp);grid.appendChild(cell);els[i]=cell}}
function ok(idx,v){
 var r=Math.floor(idx/9),c=idx%9,j;
 for(j=0;j<9;j++){if(j!==c&&board[r*9+j]===v)return false;if(j!==r&&board[j*9+c]===v)return false}
 var br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
 for(var dr=0;dr<3;dr++)for(var dc=0;dc<3;dc++){
  var ni=(br+dr)*9+(bc+dc);if(ni!==idx&&board[ni]===v)return false}
 return true}
function validate(idx,cell){
 var v=board[idx];if(!v){cell.classList.remove('error','correct-cell');return}
 var good=ok(idx,v);cell.classList.toggle('error',!good);cell.classList.toggle('correct-cell',good)}
document.getElementById('sudokuCheck').addEventListener('click',function(){
 var complete=true,errs=0;
 for(var i=0;i<81;i++){
  if(!board[i]){complete=false;continue}
  validate(i,els[i]);if(els[i].classList.contains('error'))errs++}
 if(!complete)status.textContent='Keep going! Some cells are empty.';
 else if(errs)status.textContent='❌ '+errs+' conflict(s). Check the red cells.';
 else{status.textContent='🏆 PERFECT! Solved.';status.style.color='var(--green)'}});
document.getElementById('sudokuHint').addEventListener('click',function(){
 var empt=[];for(var i=0;i<81;i++)if(!board[i]&&!given[i])empt.push(i);
 if(!empt.length){status.textContent='Board is full!';return}
 var idx=empt[Math.floor(Math.random()*empt.length)];
 for(var v=1;v<=9;v++)if(ok(idx,v)){
  board[idx]=v;var inp=els[idx].querySelector('input');if(inp)inp.value=v;
  els[idx].classList.add('given');given[idx]=1;validate(idx,els[idx]);
  status.textContent='💡 Hint placed!';return}});
document.getElementById('sudokuNew').addEventListener('click',function(){
 cur=(cur+1)%PZ.length;load(cur);status.textContent='🔀 New puzzle loaded!'});
document.getElementById('sudokuSolve').addEventListener('click',function(){
 var b=board.slice();
 function solve(){
  for(var i=0;i<81;i++)if(!b[i]){
   for(var v=1;v<=9;v++){
    var r=Math.floor(i/9),c=i%9,good=true,j;
    for(j=0;j<9;j++){if(j!==c&&b[r*9+j]===v){good=false;break}}
    if(good)for(j=0;j<9;j++){if(j!==r&&b[j*9+c]===v){good=false;break}}
    if(good){var br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
     for(var dr=0;dr<3&&good;dr++)for(var dc=0;dc<3;dc++){
      var ni=(br+dr)*9+(bc+dc);if(ni!==i&&b[ni]===v){good=false;break}}}
    if(good){b[i]=v;if(solve())return true;b[i]=0}}
   return false}
  return true}
 if(solve()){board=b;render();status.textContent='👁 Solved. Study the pattern.'}
 else status.textContent='No solution found.'});
load(0);
})();

(function(){
'use strict';
var cv=document.getElementById('bdCanvas');if(!cv)return;
var g=cv.getContext('2d');
var nx=document.getElementById('bdNext'),nc=nx.getContext('2d');
var hd=document.getElementById('bdHold'),hc=hd.getContext('2d');
var scoreEl=document.getElementById('bdScore'),levelEl=document.getElementById('bdLevel');
var linesEl=document.getElementById('bdLines'),comboEl=document.getElementById('bdCombo');
var statusEl=document.getElementById('bdStatus'),badge=document.getElementById('bdLevelBadge');
var COLS=10,ROWS=20,CELL=30;
function calcCell(){var w=cv.parentElement?Math.min(cv.parentElement.offsetWidth,320):300;return Math.max(24,Math.floor(w/COLS))}
CELL=calcCell();cv.width=COLS*CELL;cv.height=ROWS*CELL;
window.addEventListener('resize',function(){
 var n2=calcCell();if(n2!==CELL){CELL=n2;cv.width=COLS*CELL;cv.height=ROWS*CELL;
  drawBoard();if(nextPiece)drawNext();if(holdPiece)drawHold()}});
var SKINS={
 neon:{bg:'#000',grid:'rgba(0,229,255,0.05)',colors:['','#00e5ff','#f5c518','#bb86fc','#00e676','#ff4081','#F97316','#ef4444']},
 classic:{bg:'#111',grid:'rgba(255,255,255,0.03)',colors:['','#4dd0e1','#ffd54f','#ce93d8','#a5d6a7','#f48fb1','#ffb74d','#ef9a9a']},
 candy:{bg:'#1a0030',grid:'rgba(255,100,255,0.05)',colors:['','#ff80ab','#ea80fc','#b388ff','#69f0ae','#ff6e40','#ffd740','#ff5252']},
 matrix:{bg:'#001400',grid:'rgba(0,255,70,0.05)',colors:['','#00ff41','#39ff14','#7fff00','#adff2f','#b2ff59','#ccff90','#f0ff80']}};
var skin=SKINS.neon;
var LEVEL_NAMES=['Startup','Local Biz','Page 2','Page 1','Maps Pack','AI Search','GEO Ranked','Authority','Dominator','SEO Legend','SERP God','AI Master','Domain King','Rank Wizard','Top 0.1%'];
var LEVEL_MSGS=['🚀 Business is live!','📈 Getting traction!','😅 Stuck on page 2…','😎 Page 1 vibes!','📍 Maps Pack!','🤖 AI Search mode!','🌎 GEO Ranked!','💎 Authority!','⚡ Dominator!','🏆 SEO LEGEND!','🔱 SERP GOD!','🧠 AI Master!','👑 Domain King!','🧙 Rank Wizard!','🌟 TOP 0.1%!'];
var PIECES=[[[1,1,1,1]],[[2,2],[2,2]],[[0,3,0],[3,3,3]],[[0,4,4],[4,4,0]],[[5,5,0],[0,5,5]],[[6,0],[6,0],[6,6]],[[0,7],[0,7],[7,7]]];
var board,piece,px,py,nextPiece,holdPiece,canHold,score,lines,level,running,paused,raf,dropTimer,dropInt,combo,comboOn,flashRows;
function empty(){var a=[];for(var r=0;r<ROWS;r++){a.push([]);for(var c=0;c<COLS;c++)a[r].push(0)}return a}
function rnd(){return PIECES[Math.floor(Math.random()*PIECES.length)]}
function rot(p){return p[0].map(function(_,i){return p.map(function(r){return r[i]}).reverse()})}
function rotCCW(p){return p[0].map(function(_,i){return p.map(function(r){return r[r.length-1-i]})})}
function kick(p,ox,oy){var ks=[0,-1,1,-2,2];for(var i=0;i<ks.length;i++)if(valid(p,ox+ks[i],oy))return ox+ks[i];return null}
function valid(p,ox,oy){
 for(var r=0;r<p.length;r++)for(var c=0;c<p[r].length;c++){
  if(!p[r][c])continue;
  var X=ox+c,Y=oy+r;
  if(X<0||X>=COLS||Y>=ROWS)return false;
  if(Y>=0&&board[Y][X])return false}
 return true}
function lock(){
 for(var r=0;r<piece.length;r++)for(var c=0;c<piece[r].length;c++){
  if(!piece[r][c])continue;
  var Y=py+r;if(Y<0){end();return}
  board[Y][px+c]=piece[r][c]}
 clear();canHold=true;spawn()}
function clear(){
 var rowsC=[];
 for(var r=ROWS-1;r>=0;r--)if(board[r].every(function(c){return c!==0}))rowsC.push(r);
 if(!rowsC.length){comboOn=false;combo=0;comboEl.textContent='0';return}
 flashRows=rowsC;drawBoard();
 setTimeout(function(){
  rowsC.sort(function(a,b){return b-a}).forEach(function(r){board.splice(r,1);board.unshift(new Array(COLS).fill(0))});
  flashRows=null;
  var pts=[0,100,300,500,800][Math.min(rowsC.length,4)]||800;
  score+=pts*level*(comboOn?combo+1:1);
  if(comboOn)combo++;else{comboOn=true;combo=1}
  comboEl.textContent=combo+'×';lines+=rowsC.length;
  var nl=Math.min(15,Math.floor(lines/10)+1);
  if(nl>level){level=nl;dropInt=Math.max(50,900-((level-1)*60));
   levelEl.textContent=level;badge.textContent='LVL '+level;
   statusEl.textContent=(LEVEL_MSGS[level-1]||'🔥 LEVEL UP!')+'  '+LEVEL_NAMES[level-1].toUpperCase();
   setTimeout(function(){if(running&&!paused)statusEl.textContent=''},2500);
   tick()}
  scoreEl.textContent=score;linesEl.textContent=lines;drawBoard()},120)}
function spawn(){
 piece=nextPiece||rnd();nextPiece=rnd();
 px=Math.floor((COLS-piece[0].length)/2);py=0;
 if(!valid(piece,px,py)){end();return}
 drawNext()}
function hold(){
 if(!canHold)return;canHold=false;
 if(!holdPiece){holdPiece=piece;spawn()}
 else{var t=holdPiece;holdPiece=piece;piece=t;
  px=Math.floor((COLS-piece[0].length)/2);py=0;
  if(!valid(piece,px,py)){end();return}}
 drawHold();drawBoard()}
function end(){
 running=false;cancelAnimationFrame(raf);clearInterval(dropTimer);
 var r=0;
 var fill=setInterval(function(){
  if(r>=ROWS){clearInterval(fill);statusEl.textContent='GAME OVER — Score: '+score+' | Press START to retry';return}
  for(var c=0;c<COLS;c++)board[r][c]=Math.floor(Math.random()*7)+1;
  r++;drawBoard()},40)}
function cellDraw(cx,x,y,ci,s,a){
 if(!ci)return;var col=skin.colors[ci];
 cx.save();if(a!=null)cx.globalAlpha=a;
 cx.fillStyle=col;cx.shadowColor=col;cx.shadowBlur=8;
 cx.fillRect(x*s+1,y*s+1,s-2,s-2);cx.shadowBlur=0;
 cx.fillStyle='rgba(255,255,255,0.28)';cx.fillRect(x*s+1,y*s+1,s-2,3);cx.fillRect(x*s+1,y*s+1,3,s-2);
 cx.fillStyle='rgba(0,0,0,0.35)';cx.fillRect(x*s+s-3,y*s+1,2,s-2);cx.fillRect(x*s+1,y*s+s-3,s-2,2);
 cx.restore()}
function ghost(){
 var gy=py;while(valid(piece,px,gy+1))gy++;
 if(gy===py)return;
 for(var r=0;r<piece.length;r++)for(var c=0;c<piece[r].length;c++)
  if(piece[r][c])cellDraw(g,px+c,gy+r,piece[r][c],CELL,.15)}
function drawBoard(){
 g.fillStyle=skin.bg;g.fillRect(0,0,cv.width,cv.height);
 g.strokeStyle=skin.grid;g.lineWidth=1;
 var r,c;
 for(r=0;r<ROWS;r++){g.beginPath();g.moveTo(0,r*CELL);g.lineTo(COLS*CELL,r*CELL);g.stroke()}
 for(c=0;c<COLS;c++){g.beginPath();g.moveTo(c*CELL,0);g.lineTo(c*CELL,ROWS*CELL);g.stroke()}
 for(r=0;r<ROWS;r++){
  if(flashRows&&flashRows.indexOf(r)>-1){g.fillStyle='rgba(255,255,255,0.88)';g.fillRect(0,r*CELL,cv.width,CELL)}
  else for(c=0;c<COLS;c++)cellDraw(g,c,r,board[r][c],CELL,1)}
 if(running&&!paused&&piece){
  ghost();
  for(r=0;r<piece.length;r++)for(c=0;c<piece[r].length;c++)
   if(piece[r][c])cellDraw(g,px+c,py+r,piece[r][c],CELL,1)}
 if(!running&&!board.some(function(row){return row.some(function(x){return x})})){
  g.fillStyle='rgba(0,0,0,0.5)';g.fillRect(0,0,cv.width,cv.height);
  g.fillStyle=skin.colors[1];g.font=(CELL*.9)+"px 'Press Start 2P',monospace";
  g.textAlign='center';g.textBaseline='middle';
  g.fillText('BLOCK',cv.width/2,cv.height*.38);
  g.fillStyle=skin.colors[3];g.fillText('DROP',cv.width/2,cv.height*.52);
  g.fillStyle='rgba(255,255,255,.4)';g.font=(CELL*.35)+"px 'Press Start 2P',monospace";
  g.fillText('PRESS START',cv.width/2,cv.height*.68)}
 if(paused){
  g.fillStyle='rgba(0,0,0,.65)';g.fillRect(0,0,cv.width,cv.height);
  g.fillStyle='#f5c518';g.font='bold '+(CELL*.85)+"px 'Press Start 2P',monospace";
  g.textAlign='center';g.textBaseline='middle';g.fillText('PAUSED',cv.width/2,cv.height/2)}}
function small(cx,p,w,h){
 cx.fillStyle=skin.bg||'#111';cx.fillRect(0,0,w,h);
 if(!p)return;
 var s=Math.min(Math.floor(w/6),20);
 var ox=Math.floor((w-p[0].length*s)/2),oy=Math.floor((h-p.length*s)/2);
 for(var r=0;r<p.length;r++)for(var c=0;c<p[r].length;c++)if(p[r][c]){
  var col=skin.colors[p[r][c]];
  cx.fillStyle=col;cx.shadowColor=col;cx.shadowBlur=6;
  cx.fillRect(ox+c*s+1,oy+r*s+1,s-2,s-2);cx.shadowBlur=0;
  cx.fillStyle='rgba(255,255,255,0.25)';cx.fillRect(ox+c*s+1,oy+r*s+1,s-2,3)}}
function drawNext(){small(nc,nextPiece,100,100)}
function drawHold(){small(hc,holdPiece,100,100)}
function tick(){
 clearInterval(dropTimer);
 dropTimer=setInterval(function(){
  if(!running||paused)return;
  if(valid(piece,px,py+1))py++;else lock();
  drawBoard()},dropInt)}
function start(){
 board=empty();score=0;lines=0;level=1;combo=0;comboOn=false;canHold=true;holdPiece=null;flashRows=null;
 dropInt=900;running=true;paused=false;
 scoreEl.textContent='0';levelEl.textContent='1';linesEl.textContent='0';comboEl.textContent='0';
 badge.textContent='LVL 1';statusEl.textContent='';
 nextPiece=rnd();spawn();drawNext();drawHold();tick();
 cancelAnimationFrame(raf);
 (function loop(){if(running){drawBoard();raf=requestAnimationFrame(loop)}})();
 document.getElementById('bdPause').textContent='⏸ PAUSE'}
document.addEventListener('keydown',function(e){
 if(!running||paused)return;
 var r=cv.getBoundingClientRect();
 if(!(r.top<window.innerHeight&&r.bottom>0))return;
 var k=e.key,p2,n2;
 if(['ArrowLeft','ArrowRight','ArrowDown','ArrowUp',' '].indexOf(k)>-1)e.preventDefault();
 if(k==='ArrowLeft'&&valid(piece,px-1,py)){px--;drawBoard()}
 else if(k==='ArrowRight'&&valid(piece,px+1,py)){px++;drawBoard()}
 else if(k==='ArrowDown'){if(valid(piece,px,py+1))py++;else lock();drawBoard()}
 else if(k==='ArrowUp'||k==='x'){p2=rot(piece);n2=kick(p2,px,py);if(n2!=null){piece=p2;px=n2}drawBoard()}
 else if(k==='z'){p2=rotCCW(piece);n2=kick(p2,px,py);if(n2!=null){piece=p2;px=n2}drawBoard()}
 else if(k===' '){while(valid(piece,px,py+1))py++;lock();drawBoard()}
 else if(k==='c'||k==='C')hold()});
function bind(id,fn){var el=document.getElementById(id);if(el)el.addEventListener('click',function(){if(!running||paused)return;fn();drawBoard()})}
bind('bdTLeft',function(){if(valid(piece,px-1,py))px--});
bind('bdTRight',function(){if(valid(piece,px+1,py))px++});
bind('bdTRotate',function(){var p2=rot(piece),n2=kick(p2,px,py);if(n2!=null){piece=p2;px=n2}});
bind('bdTDown',function(){if(valid(piece,px,py+1))py++;else lock()});
bind('bdTHold',hold);
bind('bdTDrop',function(){while(valid(piece,px,py+1))py++;lock()});
document.getElementById('bdStart').addEventListener('click',start);
document.getElementById('bdPause').addEventListener('click',function(){
 if(!running)return;paused=!paused;
 this.textContent=paused?'▶ RESUME':'⏸ PAUSE';
 statusEl.textContent=paused?'— PAUSED —':'';
 if(!paused)tick();drawBoard()});
document.getElementById('bdSkinSelect').addEventListener('change',function(){
 skin=SKINS[this.value]||SKINS.neon;drawBoard();drawNext();drawHold()});
board=empty();drawBoard();statusEl.textContent='Press START to play!';
})();

document.querySelectorAll('.af-q').forEach(function(btn){
 btn.addEventListener('click',function(){
  var item=btn.closest('.af-item'),was=item.classList.contains('open');
  document.querySelectorAll('.af-item.open').forEach(function(el){
   el.classList.remove('open');el.querySelector('.af-q').setAttribute('aria-expanded',false)});
  if(!was){item.classList.add('open');btn.setAttribute('aria-expanded',true)}})});


