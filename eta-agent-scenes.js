/* Before -> After AI agent scenes. Plays each scene when scrolled into view (scroll position check, no IntersectionObserver).
   Without JS or with reduced motion the markup already shows the finished "after" state. */
(function(){
var S=[].slice.call(document.querySelectorAll('.as-scene'));
if(!S.length||!window.requestAnimationFrame)return;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var TAG=['Before','AI agent arrives','Sorting it out','After'];
function phase(s,p){
  s.classList.remove('as-p0','as-p1','as-p2','as-p3');s.classList.add('as-p'+p);
  var t=s.querySelector('.as-tag');if(t)t.textContent=TAG[p];
}
function stop(s){(s._t||[]).forEach(clearTimeout);s._t=[];if(s._c){clearInterval(s._c);s._c=0}}
function reset(s){stop(s);s.classList.add('as-noanim');phase(s,0);s.getBoundingClientRect();s.classList.remove('as-noanim');var c=s.querySelector('.as-count');if(c)c.textContent='1';}
function play(s){
  reset(s);s._on=1;
  var c=s.querySelector('.as-count'),n=1;
  if(c)s._c=setInterval(function(){if(n<9)c.textContent=String(++n)},170);
  s._t=[setTimeout(function(){phase(s,1)},1600),setTimeout(function(){if(s._c){clearInterval(s._c);s._c=0}phase(s,2)},2400),setTimeout(function(){phase(s,3)},3500)];
}
S.forEach(function(s){
  reset(s);s._on=0;
  var b=s.querySelector('.as-replay');
  if(b){b.hidden=false;b.addEventListener('click',function(){play(s)})}
});
var q=0;
function check(){
  q=0;var vh=window.innerHeight||document.documentElement.clientHeight;
  S.forEach(function(s){
    var r=s.getBoundingClientRect();
    if(r.top<vh*0.82&&r.bottom>vh*0.12){if(!s._on)play(s)}
    else if(r.bottom<-40||r.top>vh+40){if(s._on){s._on=0;reset(s)}}
  });
}
function onS(){if(!q){q=1;requestAnimationFrame(check)}}
window.addEventListener('scroll',onS,{passive:true});
window.addEventListener('resize',onS);
window.addEventListener('load',check);
check();
})();
