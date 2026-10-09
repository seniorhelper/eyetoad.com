

var PORTRAITS = (function(){
  function wrap(inner, bg){
    return '<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">'
      + '<defs><clipPath id="pc"><rect x="0" y="0" width="64" height="64" rx="10"/></clipPath></defs>'
      + '<g clip-path="url(#pc)"><rect width="64" height="64" fill="' + bg + '"/>' + inner + '</g></svg>';
  }
  var P = {};

  P['\uD83D\uDCBC'] = wrap(
    '<circle cx="32" cy="26" r="13" fill="#E8B48C"/>' +
    '<path d="M19 24c0-8 6-13 13-13s13 5 13 13c0-5-6-7-13-7s-13 2-13 7z" fill="#3B2C21"/>' +
    '<rect x="26" y="24" width="4" height="4" rx="2" fill="#22303F"/>' +
    '<rect x="34" y="24" width="4" height="4" rx="2" fill="#22303F"/>' +
    '<path d="M27 33q5 3 10 0" stroke="#8A5A3B" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 64v-9c0-7 8-11 18-11s18 4 18 11v9z" fill="#2F4A6B"/>' +
    '<path d="M32 44l-5 20h10z" fill="#F3F6FA"/>' +
    '<path d="M32 46l-3 5 3 4 3-4z" fill="#C0392B"/>', '#16202E');

  P['\uD83E\uDDD9'] = wrap(
    '<path d="M32 2L16 26h32z" fill="#5B3FA8"/>' +
    '<circle cx="32" cy="10" r="3" fill="#FDE047"/>' +
    '<circle cx="32" cy="32" r="12" fill="#EFC09A"/>' +
    '<rect x="26" y="30" width="4" height="4" rx="2" fill="#1E2A38"/>' +
    '<rect x="34" y="30" width="4" height="4" rx="2" fill="#1E2A38"/>' +
    '<path d="M22 40q10 10 20 0q-4 16-10 16t-10-16z" fill="#E8E8F0"/>' +
    '<path d="M12 64v-8c0-7 9-12 20-12s20 5 20 12v8z" fill="#5B3FA8"/>' +
    '<circle cx="32" cy="54" r="5" fill="none" stroke="#FDE047" stroke-width="2"/>' +
    '<circle cx="32" cy="54" r="1.8" fill="#FDE047"/>', '#241844');

  P['\uD83E\uDD16'] = wrap(
    '<rect x="16" y="18" width="32" height="26" rx="7" fill="#C7D2DE"/>' +
    '<rect x="20" y="24" width="24" height="12" rx="4" fill="#16202E"/>' +
    '<circle cx="27" cy="30" r="3.2" fill="#4DA3FF"/><circle cx="37" cy="30" r="3.2" fill="#4DA3FF"/>' +
    '<rect x="30" y="10" width="4" height="8" fill="#8C9AAB"/><circle cx="32" cy="9" r="3.4" fill="#4DA3FF"/>' +
    '<rect x="12" y="26" width="4" height="10" rx="2" fill="#8C9AAB"/>' +
    '<rect x="48" y="26" width="4" height="10" rx="2" fill="#8C9AAB"/>' +
    '<path d="M18 64v-8c0-6 6-10 14-10s14 4 14 10v8z" fill="#8C9AAB"/>', '#101A26');

  P['\uD83D\uDE24'] = wrap(
    '<circle cx="32" cy="30" r="15" fill="#6FA043"/>' +
    '<path d="M18 22q6-10 14-10t14 10q-8-4-14-4t-14 4z" fill="#3F5F26"/>' +
    '<rect x="24" y="27" width="5" height="4" rx="1" fill="#1B1B1B"/>' +
    '<rect x="35" y="27" width="5" height="4" rx="1" fill="#1B1B1B"/>' +
    '<path d="M24 25l6 3M40 25l-6 3" stroke="#2C3E16" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M25 38q7 5 14 0q-3 6-7 6t-7-6z" fill="#2B1414"/>' +
    '<path d="M27 38l2 4M37 38l-2 4" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M14 64v-7c0-7 8-12 18-12s18 5 18 12v7z" fill="#4A6B2C"/>', '#20180E');

  P['\uD83D\uDE08'] = wrap(
    '<circle cx="32" cy="27" r="13" fill="#D9A87E"/>' +
    '<path d="M19 24q4-12 13-12t13 12q-6-6-13-6t-13 6z" fill="#171717"/>' +
    '<path d="M25 26l5 2M39 26l-5 2" stroke="#171717" stroke-width="2" stroke-linecap="round"/>' +
    '<rect x="26" y="28" width="4" height="3" rx="1.5" fill="#111"/>' +
    '<rect x="34" y="28" width="4" height="3" rx="1.5" fill="#111"/>' +
    '<path d="M27 35q5 4 10 0" stroke="#7A4A2C" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#1A1A1A"/>' +
    '<path d="M32 44l-5 20h10z" fill="#fff"/>' +
    '<path d="M32 46l-3 5 3 4 3-4z" fill="#7C1D1D"/>', '#140E14');

  P['\uD83C\uDF1F'] = wrap(
    '<circle cx="32" cy="27" r="13" fill="#F0C39C"/>' +
    '<path d="M19 25q3-13 13-13t13 13q-6-7-13-7t-13 7z" fill="#7A4A20"/>' +
    '<rect x="26" y="25" width="4" height="4" rx="2" fill="#26313F"/>' +
    '<rect x="34" y="25" width="4" height="4" rx="2" fill="#26313F"/>' +
    '<path d="M26 33q6 6 12 0" stroke="#8A5A3B" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#2E7D57"/>' +
    '<path d="M32 47l2.2 4.4 4.8.7-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8-3.5-3.4 4.8-.7z" fill="#FDE047"/>', '#0F2A1E');

  P['\uD83D\uDC64'] = wrap(
    '<circle cx="32" cy="27" r="13" fill="#E3B489"/>' +
    '<path d="M19 26q4-14 13-14t13 14q-6-8-13-8t-13 8z" fill="#4A3526"/>' +
    '<rect x="26" y="26" width="4" height="4" rx="2" fill="#26313F"/>' +
    '<rect x="34" y="26" width="4" height="4" rx="2" fill="#26313F"/>' +
    '<path d="M27 34q5 4 10 0" stroke="#8A5A3B" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#3E6E8E"/>', '#101E2A');

  P['\u26A0\uFE0F'] = wrap(
    '<circle cx="32" cy="27" r="13" fill="#CFA684"/>' +
    '<path d="M19 25q4-13 13-13t13 13q-6-7-13-7t-13 7z" fill="#3A3A3A"/>' +
    '<rect x="26" y="26" width="4" height="4" rx="2" fill="#2A2A2A"/>' +
    '<rect x="34" y="26" width="4" height="4" rx="2" fill="#2A2A2A"/>' +
    '<path d="M27 36q5-4 10 0" stroke="#6B4A32" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
    '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#5A5A5A"/>', '#1C1C1C');

  P['\uD83D\uDCCA'] = wrap(
    '<circle cx="32" cy="26" r="12" fill="#E8BE97"/>' +
    '<path d="M20 24q4-12 12-12t12 12q-5-6-12-6t-12 6z" fill="#2E2116"/>' +
    '<rect x="23" y="23" width="8" height="6" rx="2" fill="none" stroke="#22303F" stroke-width="1.6"/>' +
    '<rect x="33" y="23" width="8" height="6" rx="2" fill="none" stroke="#22303F" stroke-width="1.6"/>' +
    '<path d="M31 26h2" stroke="#22303F" stroke-width="1.6"/>' +
    '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#274B6B"/>' +
    '<rect x="24" y="50" width="4" height="10" fill="#7DD3FC"/>' +
    '<rect x="30" y="46" width="4" height="14" fill="#4ADE80"/>' +
    '<rect x="36" y="42" width="4" height="18" fill="#FDE047"/>', '#0E1B28');

  P['\uD83D\uDC51'] = wrap(
    '<path d="M12 40l4-20 8 10 8-16 8 16 8-10 4 20z" fill="#D8B44A"/>' +
    '<rect x="12" y="40" width="40" height="7" rx="2" fill="#B8922F"/>' +
    '<circle cx="24" cy="30" r="2.4" fill="#7C1D1D"/>' +
    '<circle cx="32" cy="26" r="2.4" fill="#1D4ED8"/>' +
    '<circle cx="40" cy="30" r="2.4" fill="#166534"/>' +
    '<path d="M16 64v-9c0-5 7-8 16-8s16 3 16 8v9z" fill="#2A2438"/>', '#181228');

  return P;
})();

function portraitFor(glyph){
  var svg = PORTRAITS[glyph];
  if (svg) return svg;
  return '<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">'
    + '<rect width="64" height="64" rx="10" fill="#1B2534"/>'
    + '<circle cx="32" cy="26" r="12" fill="#4A5A6E"/>'
    + '<path d="M14 64v-8c0-7 8-12 18-12s18 5 18 12v8z" fill="#4A5A6E"/></svg>';
}




'use strict';
// ═══════════════════════════════════════════════════════════
//  SEO QUEST v3 — SIDE-SCROLLING PLATFORMER
//  Eye To Ad Media · eyetoad.com · (720) 249-6588
// ═══════════════════════════════════════════════════════════

const cv = document.getElementById('gc');
const cx = cv.getContext('2d');
const W = cv.width;   // 900
const H = cv.height;  // 440
const TILE = 40;
const GRAVITY = 0.52;
const JUMP_FORCE = -11.5;
const PLAYER_SPEED = 3.4;

// ── STATE ──────────────────────────────────────────────────
let gs = 'title'; // title|playing|dialog|paused|gameover|reward
let zone = 0, animId = null, fc = 0, lastT = 0;
let cam = {x:0}, clientsNeeded = 5;

// Player
let P = {};
// Arrays
let platforms=[], enemies=[], bullets=[], pickups=[], particles=[], npcs=[], goalFlags=[];
let currentBoss = null, bossSpawned = false;

// Input
const K = {};
let mob = {x:0, y:0, jump:false, attack:false};
let jumpPressed = false, jumpHeld = false;

// Stats
let S = {hp:100,maxHp:100,xp:0,xpNext:80,level:1,gold:0,atk:20,def:4,kills:0,clients:0,codes:[]};

// Combat
let atkTimer=0, atkActive=false, iFrames=0, combo=0, comboTimer=0;
let shakeX=0,shakeY=0,shakeMag=0,shakeDur=0;
let zoneHintMsg='', zoneHintTimer=0;
let dashActive=false, dashTimer=0, dashCD=0;
const DASH_SPD=10, DASH_DUR=180, DASH_MAX_CD=1400;

// Dialog
let dlgQ=[], dlgCb=null, dlgTyping=false, dlgTimer=null, dlgFull='', dlgLen=0;

// ── ZONE DEFINITIONS ──────────────────────────────────────
const ZONES = [
{
  id:0, name:'THE GHOST TOWN', sub:'Nobody Can Find You',
  sky:['#020412','#050920'],
  ground:'#0d1025', wall:'#141830', accent:'#3b82f6',
  bgBuildings: true, stars: true, fogColor:'rgba(0,15,60,0.3)',
  clientsNeeded:5, enemies:['ghost','shadow','crawler'],
  boss:'the_void', bossKey:'the_void',
  reward:{code:'SEOQUEST100',title:'GHOST TOWN CLEARED!',desc:'$100 OFF your first SEO campaign',icon:'🏚️'},
  intro:[
    {p:'💼',n:'YOU',t:'I poured everything into this business. My savings, my nights, my weekends. And nobody can find me on Google. <hl>It\'s like I don\'t exist.</hl>'},
    {p:'🧙',n:'MENTOR ZACH',t:'That\'s because shadow forces are burying you. Ghost listings, invisible rankings. But your first customers are out here — they just need to find you. <hl>Go get them.</hl>'},
    {p:'💼',n:'YOU',t:'I didn\'t build this to stay invisible. Let\'s go.'},
  ],
  endDialog:[
    {p:'🧙',n:'MENTOR ZACH',t:'5 customers found! Word is spreading. But now the <hl>trolls</hl> are coming for your reviews. Zone 2 — the Review Battlefield.'},
  ],
},
{
  id:1, name:'REVIEW BATTLEFIELD', sub:'Your Reputation Under Attack',
  sky:['#100404','#1c0808'],
  ground:'#200a0a', wall:'#2d1010', accent:'#ff4757',
  bgBuildings:false, stars:false, fogColor:'rgba(180,0,0,0.1)',
  clientsNeeded:6, enemies:['bad_review','troll','star_bomber'],
  boss:'troll_king', bossKey:'troll_king',
  reward:{code:'REVIEWS50PCT',title:'REVIEW WARS WON!',desc:'50% OFF reputation + SEO campaign',icon:'⭐'},
  intro:[
    {p:'😤',n:'TROLL KING',t:'Nice little business you have there. Be a shame if someone gave it <hl>50 one-star reviews</hl>. I\'ve done it before.'},
    {p:'🧙',n:'MENTOR ZACH',t:'He\'s been attacking local businesses for years. Unhappy customers are walking around confused by his fake reviews. Get them back — each one you rescue removes a bad review.'},
    {p:'💼',n:'YOU',t:'You messed with the wrong business owner.'},
  ],
  endDialog:[
    {p:'🌟',n:'HAPPY CUSTOMER',t:'We found you because of your reviews! 5 stars, no question. <hl>Next stop: Algorithm Dungeon.</hl>'},
  ],
},
{
  id:2, name:'ALGORITHM DUNGEON', sub:'Google\'s Shifting Maze',
  sky:['#01050c','#030a14'],
  ground:'#050d18', wall:'#081525', accent:'#00e5ff',
  bgBuildings:false, stars:false, fogColor:'rgba(0,80,120,0.12)',
  clientsNeeded:7, enemies:['algo_bot','penalty_trap','crawl_error'],
  boss:'core_update', bossKey:'core_update',
  reward:{code:'TECHNICAL200',title:'DUNGEON CLEARED!',desc:'$200 OFF technical SEO audit',icon:'🧱'},
  intro:[
    {p:'🤖',n:'CORE UPDATE',t:'INITIATING PENALTY. Thin content detected. Slow mobile speed. Missing schema. <hl>Your rankings are dropping to page 47.</hl>'},
    {p:'🧙',n:'MENTOR ZACH',t:'Every penalty has a fix. Collect the Schema Crystals — they\'re scattered through the dungeon. Each one you grab fixes a technical issue on your site.'},
    {p:'💼',n:'YOU',t:'Schema? Fine. I\'ll learn it. Whatever it takes.'},
  ],
  endDialog:[
    {p:'🤖',n:'GOOGLE BOT',t:'Technical audit passed. Schema valid. Page speed: A+. <hl>Competitor Castle unlocked.</hl>'},
  ],
},
{
  id:3, name:'COMPETITOR CASTLE', sub:'They Own Page 1. Take It.',
  sky:['#07001a','#0e0030'],
  ground:'#100028', wall:'#180040', accent:'#bb86fc',
  bgBuildings:false, stars:true, fogColor:'rgba(80,0,180,0.1)',
  clientsNeeded:7, enemies:['rival_agent','keyword_thief','ad_spammer'],
  boss:'the_rival', bossKey:'the_rival',
  reward:{code:'DOMINATE500',title:'COMPETITOR CRUSHED!',desc:'$500 OFF 3-month domination campaign',icon:'😈'},
  intro:[
    {p:'😈',n:'THE RIVAL',t:'You? Taking MY Page 1? I\'ve been here <hl>five years</hl>. I outspend you 10 to 1. Go back to your little website.'},
    {p:'💼',n:'YOU',t:'Your customers are YOUR customers until someone gives them a reason to switch. Guess that\'s me.'},
    {p:'🧙',n:'MENTOR ZACH',t:'His customers are frustrated — high prices, bad service. They\'re wandering the castle looking for an exit. <hl>Show them yours.</hl>'},
  ],
  endDialog:[
    {p:'😈',n:'THE RIVAL',t:'No... my keyword rankings... my leads... <hl>HOW?!</hl>'},
    {p:'💼',n:'YOU',t:'Authority beats ad spend. Every time.'},
  ],
},
{
  id:4, name:'PAGE 1 SUMMIT', sub:'The Final Climb',
  sky:['#010406','#030810'],
  ground:'#050a14', wall:'#08101e', accent:'#f5c518',
  bgBuildings:false, stars:true, fogColor:'rgba(150,120,0,0.07)',
  clientsNeeded:8, enemies:['old_guard_minion','guardian','fortress_bot'],
  boss:'old_guard_boss', bossKey:'old_guard_boss',
  reward:{code:'PAGE1GRAND',title:'PAGE 1 CONQUERED!',desc:'Half off 2 months SEO — champion discount!',icon:'👑'},
  intro:[
    {p:'👑',n:'THE OLD GUARD',t:'I have held this position since 2009. I have survived Panda, Penguin, every BERT update. <hl>You are nothing.</hl>'},
    {p:'🧙',n:'MENTOR ZACH',t:'His content hasn\'t been updated since 2015. His site fails on mobile. His reviews are fake. Hit him with everything and he doesn\'t stand a chance.'},
    {p:'💼',n:'YOU',t:'I\'m not here to compete. I\'m here to win.'},
  ],
  endDialog:[
    {p:'👑',n:'THE OLD GUARD',t:'Impossible... I had 10,000 backlinks...'},
    {p:'💼',n:'YOU',t:'Authority. Relevance. Trust. That\'s modern SEO. And I have all three now.'},
    {p:'🧙',n:'MENTOR ZACH',t:'<hl>PAGE 1. You made it.</hl> Now the calls will come. The leads will flow. This is what we built together.'},
  ],
},
];

// ── ENEMY TEMPLATES ───────────────────────────────────────
const ET = {
  ghost:{label:'GHOST',w:34,h:34,hp:38,atk:8,spd:1.0,xp:14,gold:4,color:'#4488ff',glow:'#1133aa',ai:'float',loot:'xp_orb',dt:'TRAFFIC GAINED!'},
  shadow:{label:'SHADOW',w:38,h:38,hp:55,atk:12,spd:0.85,xp:20,gold:6,color:'#224466',glow:'#112233',ai:'chase',loot:'xp_orb',dt:'LISTING CLAIMED!'},
  crawler:{label:'CRAWLER',w:28,h:22,hp:28,atk:5,spd:2.0,xp:11,gold:3,color:'#882222',glow:'#441111',ai:'patrol',loot:'hp_drop',dt:'ERROR FIXED!'},
  bad_review:{label:'1-STAR',w:32,h:32,hp:48,atk:14,spd:1.2,xp:22,gold:7,color:'#cc3333',glow:'#881111',ai:'chase',loot:'xp_orb',dt:'REVIEW REMOVED!'},
  troll:{label:'TROLL',w:38,h:38,hp:70,atk:18,spd:0.8,xp:30,gold:9,color:'#aa4400',glow:'#662200',ai:'chase_shoot',loot:'hp_drop',dt:'TROLL BANNED!'},
  star_bomber:{label:'BOMBER',w:30,h:30,hp:38,atk:10,spd:2.0,xp:24,gold:6,color:'#bb2222',glow:'#771111',ai:'rush',loot:'xp_orb',dt:'BLOCKED!'},
  algo_bot:{label:'ALGO BOT',w:36,h:40,hp:88,atk:16,spd:0.9,xp:38,gold:11,color:'#006699',glow:'#003355',ai:'patrol_shoot',loot:'schema',dt:'ALGO BEATEN!'},
  penalty_trap:{label:'PENALTY',w:44,h:24,hp:55,atk:22,spd:0,xp:28,gold:8,color:'#ff8800',glow:'#884400',ai:'static',loot:'hp_drop',dt:'PENALTY LIFTED!'},
  crawl_error:{label:'404',w:30,h:30,hp:42,atk:9,spd:1.5,xp:20,gold:5,color:'#cc4444',glow:'#882222',ai:'bounce',loot:'xp_orb',dt:'404 FIXED!'},
  rival_agent:{label:'RIVAL',w:34,h:40,hp:95,atk:21,spd:1.15,xp:44,gold:13,color:'#6622bb',glow:'#331166',ai:'chase_shoot',loot:'keyword',dt:'RIVAL DOWN!'},
  keyword_thief:{label:'THIEF',w:30,h:34,hp:62,atk:15,spd:2.2,xp:32,gold:10,color:'#4422aa',glow:'#221166',ai:'rush',loot:'keyword',dt:'KEYWORDS BACK!'},
  ad_spammer:{label:'SPAMMER',w:30,h:30,hp:55,atk:12,spd:0.95,xp:28,gold:8,color:'#8844bb',glow:'#442266',ai:'patrol_shoot',loot:'xp_orb',dt:'SPAM BLOCKED!'},
  old_guard_minion:{label:'GUARD',w:38,h:44,hp:125,atk:24,spd:0.65,xp:58,gold:16,color:'#886600',glow:'#554400',ai:'chase',loot:'coin',dt:'OUTRANKED!'},
  guardian:{label:'GUARDIAN',w:36,h:40,hp:108,atk:20,spd:0.95,xp:48,gold:13,color:'#7a6000',glow:'#4a4000',ai:'patrol_shoot',loot:'schema',dt:'GUARDIAN DOWN!'},
  fortress_bot:{label:'FORTRESS',w:42,h:42,hp:145,atk:28,spd:0.55,xp:65,gold:19,color:'#556600',glow:'#334400',ai:'chase_shoot',loot:'keyword',dt:'BREACHED!'},
};

// ── BOSS TEMPLATES ────────────────────────────────────────
const BT = {
  the_void:{label:'⬛ THE VOID',w:88,h:88,hp:700,atk:26,spd:0.5,color:'#1122aa',glow:'#0000cc',
    phases:[{t:.7,pat:'spiral',c:'#2233cc'},{t:.4,pat:'ring',c:'#4455ee'},{t:.15,pat:'chaos',c:'#6677ff',enrage:true}],
    dt:'THE VOID DEFEATED! YOUR BUSINESS IS VISIBLE!'},
  troll_king:{label:'TROLL KING',w:110,h:110,hp:850,atk:32,spd:0.7,color:'#441100',glow:'#cc3300',
    phases:[{t:.7,pat:'aimed',c:'#cc3300'},{t:.4,pat:'spread',c:'#ff5500'},{t:.15,pat:'berserker',c:'#ff2200',enrage:true}],
    dt:'TROLL KING BANNED! YOUR REPUTATION IS RESTORED!'},
  core_update:{label:'CORE UPDATE',w:120,h:82,hp:950,atk:35,spd:0.4,color:'#003344',glow:'#0088cc',
    phases:[{t:.6,pat:'grid',c:'#0088cc'},{t:.35,pat:'laser',c:'#00aaff'},{t:.1,pat:'chaos',c:'#00ccff',enrage:true}],
    dt:'CORE UPDATE DEFEATED! FULLY OPTIMIZED!'},
  the_rival:{label:'THE RIVAL',w:82,h:96,hp:1050,atk:38,spd:0.95,color:'#330055',glow:'#9900ee',
    phases:[{t:.65,pat:'aimed',c:'#8800cc'},{t:.35,pat:'teleport',c:'#aa22ff'},{t:.1,pat:'chaos',c:'#cc44ff',enrage:true}],
    dt:'THE RIVAL DETHRONED! PAGE 1 KEYWORDS ARE YOURS!'},
  old_guard_boss:{label:'OLD GUARD',w:130,h:118,hp:1400,atk:44,spd:0.32,color:'#443300',glow:'#dd9900',
    phases:[{t:.7,pat:'stomp',c:'#cc9900'},{t:.45,pat:'laser',c:'#ffbb00'},{t:.2,pat:'chaos',c:'#ffd700',enrage:true}],
    dt:'THE OLD GUARD FALLS! PAGE 1 IS YOURS! 👑'},
};

// ── PICKUP TYPES ──────────────────────────────────────────
const PK = {
  hp_drop:   {sym:'❤️',lbl:'+30 HP',   fx:'heal',  val:30, col:'#ff4757'},
  xp_orb:    {sym:'📈',lbl:'+XP',      fx:'xp',    val:30, col:'#00e676'},
  schema:    {sym:'💎',lbl:'+SCHEMA',  fx:'xp',    val:50, col:'#00e5ff'},
  keyword:   {sym:'🔑',lbl:'+KEYWORD', fx:'gold',  val:22, col:'#bb86fc'},
  coin:      {sym:'💰',lbl:'+GOLD',    fx:'gold',  val:15, col:'#f5c518'},
  customer:  {sym:'👤',lbl:'NEW CLIENT!',fx:'client',val:1,col:'#00e676'},
};

// ── LEVEL REWARDS ─────────────────────────────────────────
const LVL_REWARDS = {
  3:{code:'QUEST3',   title:'LEVEL 3!',  desc:'$50 OFF any SEO service',    icon:'⚡'},
  5:{code:'QUEST5',   title:'LEVEL 5!',  desc:'Free GBP optimization',      icon:'📍'},
  8:{code:'QUEST8',   title:'LEVEL 8!',  desc:'$150 OFF monthly SEO',       icon:'🚀'},
  10:{code:'QUESTMAX',title:'MAX LEVEL!',desc:'1 Month free SEO management', icon:'👑'},
};

// ══════════════════════════════════════════════════════════
//  LEVEL BUILDER — each zone gets a unique hand-crafted level
// ══════════════════════════════════════════════════════════

function buildLevel(zIdx) {
  platforms = []; enemies = []; pickups = []; npcs = []; goalFlags = []; bullets = []; particles = [];
  bossSpawned = false; currentBoss = null;
  S.clients = 0;
  document.getElementById('bossBar').classList.remove('show');
  updateHUD();

  const z = ZONES[zIdx];
  clientsNeeded = z.clientsNeeded;
  const LW = 4800; // level width

  // ── FLOOR ──
  // Main ground
  addPlatform(0, H-TILE, LW, TILE, 'ground');

  if(zIdx===0) buildGhostTown(z, LW);
  else if(zIdx===1) buildReviewBattlefield(z, LW);
  else if(zIdx===2) buildAlgorithmDungeon(z, LW);
  else if(zIdx===3) buildCompetitorCastle(z, LW);
  else if(zIdx===4) buildPage1Summit(z, LW);

  // Goal flag always at end
  // Goal flag: wide trigger zone so it's easy to touch
  goalFlags.push({x: LW-280, y: H-TILE-140, w:160, h:140, reached:false, flagAnim:0});

  // Spawn customers scattered through level
  spawnCustomers(zIdx, LW, z.clientsNeeded);
}

function addPlatform(x,y,w,h,type='solid',color=null){
  platforms.push({x,y,w,h,type:type||'solid',color});
}

function spawnCustomers(zIdx, LW, count) {
  for(let i=0;i<count;i++){
    const px = 400 + (i/count)*(LW-600);
    const py = H - TILE - 18;
    pickups.push({type:'customer',x:px,y:py,t:PK.customer,bob:Math.random()*Math.PI*2,collected:false,age:0,
      label:['👔 Business Owner','👩 Entrepreneur','🧑 Local Customer','💼 Executive','👩‍💼 Manager','🏪 Shop Owner','💪 Startup Founder','🎯 Marketing Lead'][i%8]
    });
  }
}

// ── ZONE 0: GHOST TOWN ────────────────────────────────────
function buildGhostTown(z, LW) {
  // Raised platforms, rooftop jumps
  addPlatform(320,  H-TILE-80,  120, 20, 'solid');
  addPlatform(520,  H-TILE-140, 100, 20, 'solid');
  addPlatform(720,  H-TILE-80,  120, 20, 'solid');
  addPlatform(900,  H-TILE-160, 80,  20, 'solid');
  addPlatform(1100, H-TILE-100, 120, 20, 'solid');
  addPlatform(1350, H-TILE-180, 100, 20, 'solid');
  addPlatform(1550, H-TILE-80,  120, 20, 'solid');
  addPlatform(1750, H-TILE-200, 80,  20, 'solid');
  addPlatform(1950, H-TILE-120, 140, 20, 'solid');
  addPlatform(2200, H-TILE-160, 100, 20, 'solid');
  addPlatform(2450, H-TILE-80,  120, 20, 'solid');
  addPlatform(2700, H-TILE-200, 80,  20, 'solid');
  addPlatform(2900, H-TILE-140, 100, 20, 'solid');
  addPlatform(3150, H-TILE-80,  160, 20, 'solid');
  addPlatform(3400, H-TILE-220, 80,  20, 'solid');
  addPlatform(3700, H-TILE-100, 120, 20, 'solid');
  addPlatform(4000, H-TILE-160, 80,  20, 'solid');
  // Boss arena
  addPlatform(4300, H-TILE-100, 120, 20, 'solid');
  addPlatform(4500, H-TILE-180, 80,  20, 'solid');

  // Enemies
  spawnE('ghost',  700,  H-TILE-50);
  spawnE('shadow', 950,  H-TILE-50);
  spawnE('crawler',1200, H-TILE-50);
  spawnE('ghost',  1500, H-TILE-50);
  spawnE('shadow', 1800, H-TILE-50);
  spawnE('crawler',2100, H-TILE-50);
  spawnE('ghost',  2400, H-TILE-50);
  spawnE('shadow', 2700, H-TILE-50);
  spawnE('ghost',  3000, H-TILE-50);
  spawnE('crawler',3300, H-TILE-50);
  spawnE('shadow', 3600, H-TILE-50);
  spawnE('ghost',  3900, H-TILE-50);

  // NPC hint
  npcs.push({x:200, y:H-TILE-44, w:28,h:44,emoji:'🧙', name:'Mentor Zach', talked:false,
    dialog:[{p:'🧙',n:'MENTOR ZACH',t:'Jump with SPACE or the UP button. Attack with Z or ⚔. Collect the <hl>glowing customers</hl> to build your reputation!'}]});
}

// ── ZONE 1: REVIEW BATTLEFIELD ────────────────────────────
function buildReviewBattlefield(z, LW) {
  // Moving platforms feel like a battlefield
  addPlatform(350,  H-TILE-100, 100, 20, 'solid');
  addPlatform(550,  H-TILE-60,  140, 20, 'solid');
  addPlatform(780,  H-TILE-160, 80,  20, 'solid');
  addPlatform(1000, H-TILE-80,  120, 20, 'solid');
  addPlatform(1200, H-TILE-200, 80,  20, 'solid');
  addPlatform(1500, H-TILE-100, 140, 20, 'solid');
  addPlatform(1750, H-TILE-180, 80,  20, 'solid');
  addPlatform(2000, H-TILE-60,  160, 20, 'solid');
  addPlatform(2300, H-TILE-220, 80,  20, 'solid');
  addPlatform(2600, H-TILE-140, 100, 20, 'solid');
  addPlatform(2850, H-TILE-80,  120, 20, 'solid');
  addPlatform(3100, H-TILE-200, 80,  20, 'solid');
  addPlatform(3350, H-TILE-120, 140, 20, 'solid');
  addPlatform(3600, H-TILE-60,  120, 20, 'solid');
  addPlatform(3900, H-TILE-180, 80,  20, 'solid');
  addPlatform(4200, H-TILE-100, 120, 20, 'solid');
  // Wide boss arena
  addPlatform(4400, H-TILE-80,  200, 20, 'solid');

  spawnE('bad_review',700,  H-TILE-50);
  spawnE('troll',     950,  H-TILE-50);
  spawnE('bad_review',1250, H-TILE-50);
  spawnE('star_bomber',1550,H-TILE-50);
  spawnE('troll',     1850, H-TILE-50);
  spawnE('bad_review',2150, H-TILE-50);
  spawnE('star_bomber',2400,H-TILE-50);
  spawnE('troll',     2700, H-TILE-50);
  spawnE('bad_review',3000, H-TILE-50);
  spawnE('star_bomber',3300,H-TILE-50);
  spawnE('troll',     3600, H-TILE-50);
  spawnE('bad_review',3900, H-TILE-50);

  npcs.push({x:200, y:H-TILE-44, w:28,h:44,emoji:'📊', name:'SEO Analyst', talked:false,
    dialog:[{p:'📊',n:'SEO ANALYST',t:'Each customer you rescue <hl>removes one bad review</hl>. Get all of them before you face the Troll King — you\'ll need the momentum.'}]});
}

// ── ZONE 2: ALGORITHM DUNGEON ─────────────────────────────
function buildAlgorithmDungeon(z, LW) {
  // Dungeon feel — tighter passages, hazard traps
  addPlatform(0,    H-TILE-80, 200, 20, 'solid'); // raised section near start
  // Ceiling ledge
  addPlatform(400,  H-TILE-240,200, 20, 'solid');
  // Staircase ascending
  addPlatform(700,  H-TILE-80,  80, 20, 'solid');
  addPlatform(850,  H-TILE-120, 80, 20, 'solid');
  addPlatform(1000, H-TILE-160, 80, 20, 'solid');
  addPlatform(1150, H-TILE-200, 80, 20, 'solid');
  // Drop
  addPlatform(1400, H-TILE-80,  140,20, 'solid');
  addPlatform(1650, H-TILE-60,  80, 20, 'solid');
  addPlatform(1850, H-TILE-180, 80, 20, 'solid');
  addPlatform(2050, H-TILE-100, 120,20, 'solid');
  // Gap jump section
  addPlatform(2350, H-TILE-80,  80, 20, 'solid');
  addPlatform(2500, H-TILE-140, 80, 20, 'solid');
  addPlatform(2650, H-TILE-200, 80, 20, 'solid');
  addPlatform(2900, H-TILE-60,  140,20, 'solid');
  addPlatform(3150, H-TILE-160, 80, 20, 'solid');
  addPlatform(3350, H-TILE-100, 120,20, 'solid');
  addPlatform(3600, H-TILE-220, 80, 20, 'solid');
  addPlatform(3850, H-TILE-80,  140,20, 'solid');
  addPlatform(4100, H-TILE-160, 80, 20, 'solid');
  // Boss arena
  addPlatform(4350, H-TILE-200, 100,20, 'solid');
  addPlatform(4500, H-TILE-120, 100,20, 'solid');

  spawnE('algo_bot',   700,  H-TILE-50);
  spawnE('crawl_error',950,  H-TILE-50);
  spawnE('penalty_trap',1200,H-TILE-50);
  spawnE('algo_bot',  1500,  H-TILE-50);
  spawnE('crawl_error',1800, H-TILE-50);
  spawnE('algo_bot',  2100,  H-TILE-50);
  spawnE('penalty_trap',2400,H-TILE-50);
  spawnE('crawl_error',2700, H-TILE-50);
  spawnE('algo_bot',  3000,  H-TILE-50);
  spawnE('crawl_error',3300, H-TILE-50);
  spawnE('algo_bot',  3600,  H-TILE-50);
  spawnE('penalty_trap',3900,H-TILE-50);

  // Extra schema crystals
  for(let i=0;i<5;i++) pickups.push({type:'schema',x:600+i*700,y:H-TILE-100,t:PK.schema,bob:i*1.2,collected:false,age:0});

  npcs.push({x:200, y:H-TILE-44, w:28,h:44,emoji:'🤖', name:'Google Bot', talked:false,
    dialog:[{p:'🤖',n:'GOOGLE BOT',t:'This is the Algorithm Dungeon. The penalty traps are <hl>stationary but deadly</hl>. Jump over them. Collect Schema Crystals to power up your SEO authority.'}]});
}

// ── ZONE 3: COMPETITOR CASTLE ─────────────────────────────
function buildCompetitorCastle(z, LW) {
  // Castle: turrets, ramparts, inner courtyard
  addPlatform(300,  H-TILE-80,  120, 20, 'solid');
  addPlatform(500,  H-TILE-160, 80,  20, 'solid');
  // Castle wall section
  addPlatform(700,  H-TILE-240, 40,  80, 'solid'); // wall pillar
  addPlatform(750,  H-TILE-240, 200, 20, 'solid'); // rampart
  addPlatform(1000, H-TILE-240, 40,  80, 'solid');
  addPlatform(900,  H-TILE-120, 80,  20, 'solid');
  addPlatform(1100, H-TILE-80,  120, 20, 'solid');
  addPlatform(1350, H-TILE-200, 80,  20, 'solid');
  addPlatform(1550, H-TILE-120, 100, 20, 'solid');
  addPlatform(1800, H-TILE-80,  120, 20, 'solid');
  addPlatform(2050, H-TILE-240, 200, 20, 'solid');
  addPlatform(2300, H-TILE-80,  80,  20, 'solid');
  addPlatform(2500, H-TILE-160, 80,  20, 'solid');
  addPlatform(2700, H-TILE-80,  140, 20, 'solid');
  addPlatform(2950, H-TILE-220, 80,  20, 'solid');
  addPlatform(3150, H-TILE-120, 120, 20, 'solid');
  addPlatform(3400, H-TILE-80,  160, 20, 'solid');
  addPlatform(3700, H-TILE-200, 80,  20, 'solid');
  addPlatform(3950, H-TILE-100, 100, 20, 'solid');
  addPlatform(4200, H-TILE-160, 80,  20, 'solid');
  addPlatform(4400, H-TILE-80,  200, 20, 'solid'); // boss platform

  spawnE('rival_agent',   700,  H-TILE-50);
  spawnE('keyword_thief', 950,  H-TILE-50);
  spawnE('ad_spammer',    1200, H-TILE-50);
  spawnE('rival_agent',   1500, H-TILE-50);
  spawnE('keyword_thief', 1800, H-TILE-50);
  spawnE('ad_spammer',    2100, H-TILE-50);
  spawnE('rival_agent',   2400, H-TILE-50);
  spawnE('keyword_thief', 2700, H-TILE-50);
  spawnE('rival_agent',   3000, H-TILE-50);
  spawnE('ad_spammer',    3300, H-TILE-50);
  spawnE('rival_agent',   3600, H-TILE-50);
  spawnE('keyword_thief', 3900, H-TILE-50);

  npcs.push({x:180, y:H-TILE-44, w:28,h:44,emoji:'💼', name:'Ex-Customer', talked:false,
    dialog:[{p:'💼',n:'EX-CUSTOMER',t:'The Rival overcharged me and never delivered. I\'ve been looking for an alternative for months. <hl>Can you help my business?</hl>',choices:[{t:'Of course! Come with us.',cb:()=>{S.clients++;updateHUD();closeDialog();}}]}]});
}

// ── ZONE 4: PAGE 1 SUMMIT ─────────────────────────────────
function buildPage1Summit(z, LW) {
  // Mountain climb feel — ascending platforms, treacherous gaps
  addPlatform(300,  H-TILE-80,  100, 20, 'solid');
  addPlatform(500,  H-TILE-160, 80,  20, 'solid');
  addPlatform(700,  H-TILE-240, 80,  20, 'solid');
  addPlatform(900,  H-TILE-160, 80,  20, 'solid');
  addPlatform(1100, H-TILE-80,  100, 20, 'solid');
  addPlatform(1350, H-TILE-200, 80,  20, 'solid');
  addPlatform(1550, H-TILE-280, 80,  20, 'solid');
  addPlatform(1750, H-TILE-200, 80,  20, 'solid');
  addPlatform(1950, H-TILE-120, 100, 20, 'solid');
  addPlatform(2200, H-TILE-80,  120, 20, 'solid');
  addPlatform(2450, H-TILE-200, 80,  20, 'solid');
  addPlatform(2650, H-TILE-300, 80,  20, 'solid');
  addPlatform(2850, H-TILE-200, 80,  20, 'solid');
  addPlatform(3050, H-TILE-120, 100, 20, 'solid');
  addPlatform(3300, H-TILE-80,  140, 20, 'solid');
  addPlatform(3550, H-TILE-200, 80,  20, 'solid');
  addPlatform(3750, H-TILE-300, 80,  20, 'solid');
  addPlatform(3950, H-TILE-200, 80,  20, 'solid');
  addPlatform(4150, H-TILE-120, 100, 20, 'solid');
  // Final summit
  addPlatform(4400, H-TILE-200, 250, 20, 'solid'); // wide boss arena
  addPlatform(4500, H-TILE-300, 80,  20, 'solid'); // high platform

  spawnE('old_guard_minion',700,  H-TILE-50);
  spawnE('guardian',        950,  H-TILE-50);
  spawnE('fortress_bot',    1200, H-TILE-50);
  spawnE('old_guard_minion',1500, H-TILE-50);
  spawnE('guardian',        1800, H-TILE-50);
  spawnE('fortress_bot',    2100, H-TILE-50);
  spawnE('old_guard_minion',2400, H-TILE-50);
  spawnE('guardian',        2700, H-TILE-50);
  spawnE('old_guard_minion',3000, H-TILE-50);
  spawnE('fortress_bot',    3300, H-TILE-50);
  spawnE('guardian',        3600, H-TILE-50);
  spawnE('old_guard_minion',3900, H-TILE-50);

  npcs.push({x:180, y:H-TILE-44, w:28,h:44,emoji:'🧙', name:'Mentor Zach', talked:false,
    dialog:[{p:'🧙',n:'MENTOR ZACH',t:'This is it. The Old Guard is at the summit. Defeat his minions, collect your final clients, and then face him. <hl>You\'ve earned this.</hl>'}]});
}

function spawnE(type, x, y, isBoss=false) {
  const t = isBoss ? BT[type] : ET[type];
  if(!t) return null;
  const e={...JSON.parse(JSON.stringify(t)),type,x,y:y-(t.h||40),vx:0,vy:0,isBoss,alive:true,onGround:false,
    maxHp:t.hp,phase:0,pTimer:0,sTimer:Math.random()*120,wFrame:0,wTimer:0,
    stunTimer:0,flashTimer:0,patDir:Math.random()<.5?1:-1,patTimer:0,
    id:Math.random()+Date.now()};
  enemies.push(e);
  if(isBoss) currentBoss=e;
  return e;
}

// ── PLAYER INIT ────────────────────────────────────────────
function initPlayer() {
  P={x:80,y:H-TILE-50,vx:0,vy:0,w:28,h:42,dir:1,onGround:false,alive:true,
    wFrame:0,wTimer:0,coyote:0,jumpBuffer:0};
  cam.x=0;
}

// ── PHYSICS ───────────────────────────────────────────────
function applyGravity(e) {
  e.vy += GRAVITY;
  if(e.vy > 16) e.vy = 16;
}

function resolveCollisions(e, isPlayer=false) {
  // Horizontal
  e.x += e.vx;
  const LW = platforms.length>0 ? Math.max(...platforms.map(p=>p.x+p.w))+100 : 5000;
  if(e.x < 0) {e.x=0; e.vx=0;}
  if(e.x > LW-e.w) {e.x=LW-e.w; e.vx=0;}

  // Vertical
  e.y += e.vy;
  e.onGround = false;

  for(const p of platforms) {
    if(p.type==='pass-through' && e.vy<0) continue;
    if(e.x+e.w > p.x+4 && e.x < p.x+p.w-4) {
      // Landing on top
      if(e.vy >= 0 && e.y+e.h > p.y && e.y+e.h < p.y+p.h+18) {
        e.y = p.y - e.h;
        e.vy = 0;
        e.onGround = true;
      }
      // Ceiling
      else if(e.vy < 0 && e.y < p.y+p.h && e.y > p.y) {
        e.y = p.y + p.h;
        e.vy = 0;
      }
    }
  }

  // Kill zone — fall into pit
  if(e.y > H+60) {
    if(isPlayer) {
      takeDmg(30);
      e.y = H-TILE-(e.h||42)-10;
      e.vy = 0; e.vx = 0;
      e.x = Math.max(100, e.x - 50); // push back slightly
    } else {
      // Enemies that fall off screen - respawn at level
      e.y = H-TILE-(e.h||40);
      e.vy = 0;
    }
  }
}

// ── PLAYER UPDATE ─────────────────────────────────────────
function updatePlayer(dt) {
  if(!P.alive) return;

  let dx=0;
  if(K['ArrowLeft']||K['a']||K['A']||mob.x<-0.15) dx=-1;
  if(K['ArrowRight']||K['d']||K['D']||mob.x>0.15) dx=1;

  const spd = PLAYER_SPEED;

  // Dash
  if(dashActive){
    dashTimer-=16;
    P.vx=P.dir*DASH_SPD;
    if(dashTimer<=0){dashActive=false;iFrames=Math.max(iFrames,20);}
  } else {
    P.vx = dx * spd;
  }
  if(dashCD>0) dashCD-=16;
  if(dx) P.dir = dx>0?1:-1;
  P.moving = !!dx;

  // Coyote time
  if(P.onGround) P.coyote=8;
  else if(P.coyote>0) P.coyote--;

  // Jump buffer
  const wantJump = K['ArrowUp']||K['w']||K['W']||K[' ']||mob.y<-0.3||mob.jump;
  if(wantJump && !jumpHeld) {P.jumpBuffer=12; jumpHeld=true;}
  if(!wantJump) jumpHeld=false;
  if(P.jumpBuffer>0) P.jumpBuffer--;

  if(P.jumpBuffer>0 && P.coyote>0) {
    P.vy = JUMP_FORCE;
    P.coyote=0; P.jumpBuffer=0;
    spawnBurst(P.x+P.w/2, P.y+P.h, '#ffffff', 8, {vy:2,decay:.05,size:4});
    playBeep(500,60,'sine',.03);
  }

  // Variable jump height
  if(!wantJump && P.vy<-4) P.vy += 0.9;

  applyGravity(P);
  resolveCollisions(P, true);

  if(P.moving) {P.wTimer++;if(P.wTimer>6){P.wTimer=0;P.wFrame++;}}
  else P.wFrame=0;

  if(atkTimer>0) atkTimer-=dt; else atkActive=false;
  if(iFrames>0) iFrames--;
  if(comboTimer>0) comboTimer-=dt; else if(combo>0) combo=0;

  // Camera
  const targetCX = P.x - W*0.35;
  cam.x += (targetCX - cam.x) * 0.1;
  const maxCX = Math.max(...platforms.map(p=>p.x+p.w)) - W + 200;
  cam.x = Math.max(0, Math.min(maxCX||0, cam.x));
}

// ── ENEMY AI ──────────────────────────────────────────────
function updateEnemy(e, dt) {
  if(!e.alive) return;
  if(e.stunTimer>0){e.stunTimer-=dt*.06;return;}
  if(e.flashTimer>0) e.flashTimer--;

  const px=P.x+P.w/2, py=P.y+P.h/2;
  const ex=e.x+e.w/2, ey=e.y+e.h/2;
  const dist=Math.hypot(px-ex, py-ey);
  const angle=Math.atan2(py-ey, px-ex);
  const spd=e.spd||1;

  e.sTimer--;
  e.wTimer++;
  if(e.wTimer>7){e.wTimer=0;e.wFrame=(e.wFrame+1)%8;}

  switch(e.ai){
    case 'float':
      if(dist<420){e.vx+=Math.cos(angle)*.06;e.vy+=Math.sin(angle)*.06;}
      e.vy+=Math.sin(fc*.04+e.id*3)*.06;
      break;
    case 'chase':
      if(dist<480){e.vx+=Math.cos(angle)*.12*spd;e.vy+=Math.sin(angle)*.1*spd;}
      break;
    case 'rush':
      if(dist<550){e.vx+=Math.cos(angle)*.22*spd;e.vy+=Math.sin(angle)*.18*spd;}
      break;
    case 'patrol':
      e.patTimer++;if(e.patTimer>100){e.patDir*=-1;e.patTimer=0;}
      e.vx+=e.patDir*.08*spd;
      if(e.onGround && e.patDir*(P.x-e.x)>0 && dist<180){e.vy=JUMP_FORCE*.7;}
      break;
    case 'static': e.vx=0; e.vy=0; break;
    case 'bounce':
      e.vx+=(Math.random()-.5)*.6;e.vy+=(Math.random()-.5)*.3;
      break;
    case 'chase_shoot':
      if(dist<500){e.vx+=Math.cos(angle)*.1*spd;e.vy+=Math.sin(angle)*.08*spd;}
      if(dist<380&&e.sTimer<=0){fireBullet(e,angle,e.glow||'#ff4757');e.sTimer=80+Math.random()*55;}
      break;
    case 'patrol_shoot':
      e.patTimer++;if(e.patTimer>85){e.patDir*=-1;e.patTimer=0;}
      e.vx+=e.patDir*.07*spd;
      if(dist<420&&e.sTimer<=0){fireBullet(e,angle,e.glow||'#0088cc');e.sTimer=65+Math.random()*50;}
      break;
  }

  if(e.isBoss) updateBossAI(e, angle, dist);

  e.vx *= .80; e.vy *= .82;
  const ms=spd*3.5;const sp=Math.hypot(e.vx,e.vy);
  if(sp>ms){e.vx=e.vx/sp*ms;e.vy=e.vy/sp*ms;}

  if(!e.isBoss) {
    applyGravity(e);
    resolveCollisions(e);
  } else {
    // Bosses hover/float
    e.x+=e.vx; e.y+=e.vy;
    const LW=4800;
    e.x=Math.max(100,Math.min(LW-e.w-100,e.x));
    e.y=Math.max(50,Math.min(H-e.h-60,e.y));
  }

  // Touch damage
  if(e.alive && P.x+P.w>e.x+4 && P.x<e.x+e.w-4 && P.y+P.h>e.y+4 && P.y<e.y+e.h-4) {
    takeDmg(e.atk*.35+Math.random()*3);
  }
}

function updateBossAI(e, angle, dist) {
  const bt = BT[e.type]; if(!bt) return;
  const ph = bt.phases[e.phase-1]||{pat:'aimed'};
  e.pTimer++;
  const col = ph.c||e.color;

  switch(ph.pat||'aimed'){
    case 'spiral':
      if(e.sTimer<=0){for(let i=0;i<8;i++) fireBullet(e,(i/8)*Math.PI*2+e.pTimer*.03,col,5.5);e.sTimer=24;}
      e.vx+=Math.cos(angle)*.05;e.vy+=Math.sin(angle)*.03;break;
    case 'ring':
      if(e.sTimer<=0){for(let i=0;i<12;i++) fireBullet(e,(i/12)*Math.PI*2,col,5.5);e.sTimer=20;}
      e.vx+=Math.cos(angle)*.06;e.vy+=Math.sin(angle)*.04;break;
    case 'aimed':
      if(e.sTimer<=0){fireBullet(e,angle,col,6.5);e.sTimer=48;}
      e.vx+=Math.cos(angle)*.08;e.vy+=Math.sin(angle)*.05;break;
    case 'spread':
      if(e.sTimer<=0){[-0.4,0,0.4].forEach(a=>fireBullet(e,angle+a,col,5.5));e.sTimer=38;}
      e.vx+=Math.cos(angle)*.09;e.vy+=Math.sin(angle)*.05;break;
    case 'grid':
      if(e.sTimer<=0){[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach(a=>fireBullet(e,a,col,5));e.sTimer=38;}break;
    case 'laser':
      if(e.sTimer<=0){for(let i=0;i<5;i++) fireBullet(e,angle+(i-2)*.3,col,6);e.sTimer=32;}
      e.vx+=Math.cos(angle)*.07;e.vy+=Math.sin(angle)*.04;break;
    case 'stomp':
      if(e.sTimer<=0){for(let i=0;i<10;i++) fireBullet(e,(i/10)*Math.PI*2+e.pTimer*.04,col,6);e.sTimer=20;}
      e.vx+=Math.cos(angle)*.06;break;
    case 'berserker':
      if(e.sTimer<=0){for(let i=0;i<14;i++) fireBullet(e,(i/14)*Math.PI*2+e.pTimer*.09,col,7);e.sTimer=14;}
      e.vx+=Math.cos(angle)*.2;e.vy+=Math.sin(angle)*.1;break;
    case 'teleport':
      if(e.pTimer%180===0){e.x=P.x+Math.random()*250-125;e.y=P.y+Math.random()*180-90;
        spawnBurst(e.x+e.w/2,e.y+e.h/2,col,16);}
      if(e.sTimer<=0){fireBullet(e,angle,col,7);e.sTimer=32;}break;
    case 'chaos':
      if(e.sTimer<=0){for(let i=0;i<16;i++) fireBullet(e,Math.random()*Math.PI*2,col,5+Math.random()*3);e.sTimer=16;}
      e.vx+=Math.cos(angle)*.1;e.vy+=Math.sin(angle)*.05;break;
  }
}

function fireBullet(src, angle, color, spd=5.5) {
  bullets.push({x:src.x+src.w/2, y:src.y+src.h/2,
    vx:Math.cos(angle)*spd, vy:Math.sin(angle)*spd,
    color, r:src.isBoss?9:5, dmg:src.atk*.5, alive:true, age:0});
}

// ── COMBAT ────────────────────────────────────────────────
function doDash() {
  if(dashActive||dashCD>0) return;
  dashActive=true; dashTimer=DASH_DUR; dashCD=DASH_MAX_CD;
  iFrames=Math.max(iFrames,30);
  spawnBurst(P.x+P.w/2, P.y+P.h/2, '#00e5ff', 10, {vx:-P.dir*2,decay:.06,size:5});
  playBeep(330,80,'sine',.04);
}

function doAttack() {
  if(atkTimer>0) return;
  atkActive=true; atkTimer=280;
  const atkAngle = P.dir>0?0:Math.PI;
  let hit=false;
  enemies.forEach(e=>{
    if(!e.alive) return;
    const dist=Math.hypot(e.x+e.w/2-(P.x+P.w/2), e.y+e.h/2-(P.y+P.h/2));
    const angle=Math.atan2(e.y+e.h/2-(P.y+P.h/2), e.x+e.w/2-(P.x+P.w/2));
    const diff=Math.abs(normAngle(angle-atkAngle));
    if(dist<85 && diff<Math.PI*.55){hitEnemy(e);hit=true;}
  });
  spawnBurst(P.x+P.w/2+(P.dir*40), P.y+P.h/2, '#f5c518', 8, {vx:P.dir*3,decay:.07,size:5});
  playBeep(hit?280:440, 60, 'square', .04);
  if(hit) setTimeout(()=>playBeep(660,40,'square',.03),55);
}

function normAngle(a){while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a;}

function hitEnemy(e, dmgOverride) {
  if(!e.alive||e.stunTimer>0) return;
  let dmg = dmgOverride??(S.atk+Math.floor(Math.random()*12));
  combo++; comboTimer=3500;
  if(combo>=3) dmg=Math.floor(dmg*1.3);
  if(combo>=5) dmg=Math.floor(dmg*1.6);
  if(combo>=8) dmg=Math.floor(dmg*2.0);
  e.hp-=dmg; e.stunTimer=100; e.flashTimer=8;
  e.vx+=P.dir*3.5; if(!e.isBoss) e.vy-=2;

  const cr=cv.getBoundingClientRect();
  const sx=e.x-cam.x+e.w/2+cr.left, sy=e.y+cr.top;
  spawnDmgNum(sx,sy,dmg,'#ff4757',combo>=3);
  spawnBurst(e.x+e.w/2,e.y+e.h/2,'#ff4757',8);
  shake(3,120);
  playBeep(200,70,'sawtooth',.03);

  if(combo===3) spawnShout(sx-60,sy-35,'COMBO!','#f5c518');
  if(combo===5) spawnShout(sx-70,sy-35,'CRUSHING IT!','#ff4081');
  if(combo>=8)  spawnShout(sx-80,sy-35,'UNSTOPPABLE!','#00e5ff');

  if(e.hp<=0) killEnemy(e);
  else if(e.isBoss) checkBossPhase(e);
  updateHUD();
}

function killEnemy(e) {
  e.alive=false;
  S.xp+=e.xp; S.gold+=e.gold; S.kills++;
  spawnBlast(e.x+e.w/2, e.y+e.h/2, e.color);
  for(let i=0;i<3;i++) spawnParticle(e.x+e.w/2,e.y+e.h/2,{emoji:'💰',size:16+Math.random()*8,vx:Math.random()*5-2.5,vy:-3-Math.random()*3,decay:.018,spin:.2,grav:.14});
  shake(e.isBoss?20:5, e.isBoss?900:200);
  if(e.isBoss){flash('rgba(255,200,0,.3)');document.getElementById('bossBar').classList.remove('show');}
  else flash('rgba(255,71,87,.12)');
  if(e.loot&&Math.random()<.55) spawnPickup(e.loot, e.x+e.w/2, e.y+e.h/2);
  if(Math.random()<.3) spawnPickup('coin', e.x, e.y);
  const cr=cv.getBoundingClientRect();
  spawnShout(e.x-cam.x+e.w/2+cr.left-70,e.y+cr.top,e.dt||'DEFEATED!','#00e676');
  playBeep(100,180,'sawtooth',.06);
  setTimeout(()=>playBeep(80,280,'sawtooth',.04),180);
  updateHUD(); checkLevelUp();
  if(e.isBoss) setTimeout(()=>zoneWin(),1600);
}

function checkBossPhase(e) {
  const bt=BT[e.type];if(!bt) return;
  bt.phases.forEach((ph,i)=>{
    if(e.phase<=i&&e.hp/e.maxHp<=ph.t){
      e.phase=i+1; e.color=ph.c;
      if(ph.enrage){e.spd*=1.6;e.atk=Math.floor(e.atk*1.35);flash('rgba(255,0,0,.25)');
        const cr=cv.getBoundingClientRect();
        spawnShout(e.x-cam.x+e.w/2+cr.left-80,e.y+cr.top-40,'⚡ ENRAGED!','#ff4757');}
      spawnBurst(e.x+e.w/2,e.y+e.h/2,ph.c,22);
    }
  });
  const fill=document.getElementById('bossBarFill');
  if(fill) fill.style.width=Math.max(0,e.hp/e.maxHp*100)+'%';
}

function takeDmg(dmg) {
  if(iFrames>0) return;
  const actual=Math.max(1,Math.floor(dmg)-S.def);
  S.hp=Math.max(0,S.hp-actual); iFrames=90;
  const cr=cv.getBoundingClientRect();
  spawnDmgNum(P.x-cam.x+P.w/2+cr.left,P.y+cr.top,actual,'#ff4757');
  shake(5,200); flash('rgba(255,0,0,.2)'); playBeep(150,200,'sawtooth',.07);
  updateHUD();
  if(S.hp<=0) gameOver();
}

function checkLevelUp() {
  if(S.xp<S.xpNext) return;
  S.xp-=S.xpNext; S.level++;
  S.xpNext=Math.floor(S.xpNext*1.45);
  S.maxHp+=22; S.hp=Math.min(S.maxHp,S.hp+35);
  S.atk+=5; S.def+=1;
  spawnLvlBurst(P.x+P.w/2,P.y+P.h/2);
  const cr=cv.getBoundingClientRect();
  spawnShout(P.x-cam.x+cr.left,P.y+cr.top-55,`LEVEL ${S.level}!`,'#f5c518');
  flash('rgba(245,197,24,.22)');
  playBeep(880,100,'square',.06);
  [1100,1320,1760].forEach((f,i)=>setTimeout(()=>playBeep(f,100,'square',.06),i*110+120));
  updateHUD();
  const r=LVL_REWARDS[S.level];
  if(r) showReward(r,null);
}

// ── BOSS SPAWN ────────────────────────────────────────────
function checkBossSpawn() {
  if(bossSpawned) return;
  const aliveRegular = enemies.filter(e=>e.alive&&!e.isBoss);
  // Boss spawns when all regular enemies dead AND enough clients collected
  if(aliveRegular.length===0 && S.clients>=clientsNeeded) {
    bossSpawned=true;
    spawnBossIntro();
  }
}

function spawnBossIntro() {
  const z=ZONES[zone];
  const bt=BT[z.bossKey];
  flash('rgba(255,80,0,.4)'); shake(18,800); playBeep(55,1000,'sawtooth',.14);
  showDialog([{p:'⚠️',n:'⚠ BOSS INCOMING',t:`<hl>${bt?.label||z.boss.toUpperCase()}</hl> has appeared! Defeat the boss to clear this zone!`}],()=>{
    const bx=cam.x+W*0.65;
    const by=H-bt.h-TILE-20;
    const boss=spawnE(z.bossKey, bx, by, true);
    const bar=document.getElementById('bossBar');
    document.getElementById('bossBarName').textContent=bt?.label||'BOSS';
    document.getElementById('bossBarFill').style.width='100%';
    bar.classList.add('show');
  });
}

function zoneWin() {
  const z=ZONES[zone];
  S.codes.push(z.reward.code);
  playBeep(660,130,'square',.07);
  [880,1100,1320,1760].forEach((f,i)=>setTimeout(()=>playBeep(f,130,'square',.07),i*120+170));
  flash('rgba(245,197,24,.3)');
  spawnLvlBurst(P.x+P.w/2, P.y+P.h/2);

  const banner=document.getElementById('storyBanner');
  document.getElementById('storyTitle').textContent='ZONE CLEAR! 🏆';
  document.getElementById('storySub').textContent=z.name+' — COMPLETE!';
  banner.classList.add('show');
  setTimeout(()=>banner.classList.remove('show'),2500);

  setTimeout(()=>showDialog(z.endDialog||[{p:'🧙',n:'MENTOR ZACH',t:'Zone complete! Ready for the next challenge?'}],()=>{
    showReward(z.reward,()=>{
      if(zone<ZONES.length-1){zone++;gs='playing';loadZone(zone);}
      else{
        showReward({icon:'👑',title:'YOU REACHED PAGE 1!',desc:'You beat all 5 zones. Eye To Ad Media will make this your REAL story.',code:'PAGE1LEGEND'},()=>returnToTitle());
      }
    });
  }),2700);
}

function loadZone(idx) {
  zone=idx;
  initPlayer();
  buildLevel(idx);
  updateHUD();
  showDialog(ZONES[idx].intro,()=>{gs='playing';});
}

// ── PICKUPS ───────────────────────────────────────────────
function spawnPickup(type,x,y) {
  const t=PK[type];if(!t) return;
  pickups.push({type,x:x-8,y:y-8,t,bob:Math.random()*Math.PI*2,collected:false,age:0});
}

function updatePickups() {
  pickups.forEach(pk=>{
    pk.age++; pk.bob+=.07;
    if(pk.collected) return;
    const dist=Math.hypot(P.x+P.w/2-pk.x, P.y+P.h/2-pk.y);
    if(dist<32){pk.collected=true;collectPickup(pk);}
  });
  pickups=pickups.filter(p=>!p.collected);
}

function collectPickup(pk) {
  const t=pk.t;
  switch(t.fx){
    case 'heal':S.hp=Math.min(S.maxHp,S.hp+t.val);spawnHeal(pk.x,pk.y);break;
    case 'xp':S.xp+=t.val;checkLevelUp();break;
    case 'gold':S.gold+=t.val;break;
    case 'client':
      S.clients++;
      const cr=cv.getBoundingClientRect();
      spawnShout(pk.x-cam.x+cr.left,pk.y+cr.top-20,'NEW CLIENT! 👥','#00e676');
      playBeep(800,100,'sine',.06);
      setTimeout(()=>playBeep(1200,100,'sine',.06),110);
      // Show story popup for first client
      if(S.clients===1&&zone===0){
        setTimeout(()=>showDialog([{p:'👤',n:'NEW CUSTOMER',t:'I\'ve been looking for a good local business forever. Your name finally popped up! <hl>You got a new customer!</hl>'}],null),200);
      }
      break;
  }
  const cr=cv.getBoundingClientRect();
  spawnShout(pk.x-cam.x+cr.left,pk.y+cr.top-20,t.lbl,t.col);
  playBeep(660,55,'sine',.04);
  updateHUD();
}

// ── BULLETS ───────────────────────────────────────────────
function updateBullets() {
  bullets=bullets.filter(b=>b.alive);
  bullets.forEach(b=>{
    b.x+=b.vx; b.y+=b.vy; b.age++;
    if(b.age>240||b.y>H+50||b.y<-50){b.alive=false;return;}
    if(P.x+P.w>b.x-b.r&&P.x<b.x+b.r&&P.y+P.h>b.y-b.r&&P.y<b.y+b.r){
      b.alive=false; takeDmg(b.dmg); spawnBurst(b.x,b.y,b.color,8);
    }
    if(b.age%3===0) spawnParticle(b.x,b.y,{vx:-b.vx*.15+(Math.random()-.5),vy:-b.vy*.15+(Math.random()-.5),size:b.r*.7,color:b.color,decay:.1,grav:0,glow:true});
  });
}

// ── GOAL FLAGS ────────────────────────────────────────────
function updateGoalFlags() {
  goalFlags.forEach(g=>{
    g.flagAnim=(g.flagAnim+1)%120;
    if(g.reached) return;
    // Wide overlap check
    const overlap = P.x+P.w > g.x && P.x < g.x+g.w && P.y+P.h > g.y && P.y < g.y+g.h;
    if(overlap){
      const need=Math.max(0,clientsNeeded-S.clients);
      const enemyLeft=enemies.filter(e=>e.alive&&!e.isBoss).length;
      if(need===0 && enemyLeft===0){
        g.reached=true;
        if(!bossSpawned){bossSpawned=true;spawnBossIntro();}
      } else {
        // Show clear persistent message on the canvas (not just a shout)
        zoneHintMsg = need>0
          ? `COLLECT ${need} MORE CLIENT${need>1?'S':''}! 👥`
          : `DEFEAT ${enemyLeft} MORE ENEM${enemyLeft>1?'IES':'Y'}!`;
        zoneHintTimer = 180; // show for 3 seconds
      }
    }
  });
}

// ── PARTICLES ─────────────────────────────────────────────
function spawnParticle(x,y,o={}){
  particles.push({x,y,vx:o.vx??(Math.random()-.5)*6,vy:o.vy??(Math.random()-.5)*6-2,
    size:o.size??6,color:o.color??'#f5c518',life:1,decay:o.decay??.025,
    grav:o.grav??0.14,emoji:o.emoji??'',rotation:o.rotation??0,spin:o.spin??0,glow:o.glow??false});
}
function spawnBurst(x,y,color,count=14,o={}){
  for(let i=0;i<count;i++){const a=(i/count)*Math.PI*2+Math.random()*.4,s=2+Math.random()*5;
    spawnParticle(x,y,{vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,color,size:4+Math.random()*8,decay:.02+Math.random()*.02,glow:true,...o});}
}
function spawnBlast(x,y,c){spawnBurst(x,y,c,18,{decay:.028});spawnParticle(x,y,{emoji:'💥',size:36,vx:0,vy:-2,decay:.04,spin:.1});}
function spawnHeal(x,y){
  ['❤️','✨','💚'].forEach(e=>{spawnParticle(x+Math.random()*30-15,y,{emoji:e,size:20,vx:Math.random()*2-1,vy:-2.5-Math.random()*2,decay:.02,grav:.04});});
  spawnBurst(x,y,'#00e676',8,{decay:.022});
}
function spawnLvlBurst(x,y){
  ['⭐','🌟','✨','💫','🏆','👑'].forEach((e,i)=>{const a=(i/6)*Math.PI*2;
    spawnParticle(x,y,{emoji:e,size:34+Math.random()*14,vx:Math.cos(a)*5,vy:Math.sin(a)*5-4,decay:.012,spin:.15,rotation:a,grav:.07});});
  spawnBurst(x,y,'#f5c518',26,{decay:.014});
}
function shake(mag,dur){shakeMag=mag;shakeDur=dur;}
function flash(col){const el=document.createElement('div');el.className='scrflash';el.style.background=col;document.body.appendChild(el);setTimeout(()=>el.remove(),420);}
function spawnDmgNum(x,y,val,col,big){const el=document.createElement('div');el.className='dmg-float';el.textContent=val>0?'-'+val:'+'+Math.abs(val);el.style.cssText=`left:${x}px;top:${y}px;font-size:${big?'16px':'10px'};color:${col}`;document.body.appendChild(el);setTimeout(()=>el.remove(),1500);}
function spawnShout(x,y,text,col){const el=document.createElement('div');el.className='shout';el.textContent=text;el.style.cssText=`left:${x-60}px;top:${y}px;color:${col};text-shadow:0 0 18px ${col}`;document.body.appendChild(el);setTimeout(()=>el.remove(),2200);}

// ── DRAW ──────────────────────────────────────────────────
function drawScene() {
  const z=ZONES[zone];
  cx.save();
  if(shakeDur>0){shakeDur-=16;const s=shakeMag*(shakeDur/200);cx.translate((Math.random()-.5)*s,(Math.random()-.5)*s);if(shakeDur<=0){shakeMag=0;}}

  // Sky gradient
  const grad=cx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,z.sky[0]);grad.addColorStop(1,z.sky[1]);
  cx.fillStyle=grad;cx.fillRect(0,0,W,H);

  // Background details
  drawBgDetails(z);

  // Draw platforms
  drawPlatforms(z);

  // Draw pickups
  pickups.forEach(pk=>drawPickup(pk));

  // Draw NPCs
  npcs.forEach(n=>drawNPC(n));

  // Draw goal flags
  goalFlags.forEach(g=>drawGoalFlag(g));

  // Draw enemies
  enemies.filter(e=>e.alive).forEach(e=>drawEnemy(e));

  // Draw bullets
  bullets.forEach(b=>drawBullet(b));

  // Draw player
  drawPlayer();

  // Draw particles
  particles.forEach(p=>drawParticle(p));

  cx.restore();

  // HUD canvas overlay
  drawHUDCanvas();
}

function drawBgDetails(z) {
  const px1=cam.x*.12, px2=cam.x*.22, px3=cam.x*.32;

  // ── STARS (zone 0 + 4 + 5) ──
  if(z.stars||zone===4||zone===0){
    cx.fillStyle='rgba(255,255,255,.85)';
    for(let i=0;i<50;i++){
      const sx2=((i*137+123-px1*.4)%(W+40))-20;
      const sy2=(i*61+20)%(H*.6);
      const sz=.4+Math.sin(i+fc*.025)*.35;
      cx.beginPath();cx.arc(sx2,sy2,sz,0,Math.PI*2);cx.fill();
    }
  }

  // ── MOON / SUN per zone ──
  if(zone===0){
    // Crescent moon
    const mx=W*.82-px1*.06;const my=H*.12;
    cx.fillStyle='#c8d8f0';cx.shadowColor='#c8d8f0';cx.shadowBlur=22;
    cx.beginPath();cx.arc(mx,my,28,0,Math.PI*2);cx.fill();
    cx.fillStyle=z.sky[0];cx.shadowBlur=0;
    cx.beginPath();cx.arc(mx+11,my-4,24,0,Math.PI*2);cx.fill();
  } else if(zone===4){
    // Evil moon
    const mx=W*.15-px1*.04;const my=H*.1;
    cx.fillStyle='#cc44ff';cx.shadowColor='#cc44ff';cx.shadowBlur=30;
    cx.beginPath();cx.arc(mx,my,24,0,Math.PI*2);cx.fill();cx.shadowBlur=0;
  } else if(zone===2){
    // Stormy sun behind clouds
    const sx2=W*.7-px1*.05;const sy2=H*.1;
    cx.fillStyle='rgba(200,80,80,.5)';cx.shadowColor='#cc3333';cx.shadowBlur=40;
    cx.beginPath();cx.arc(sx2,sy2,30,0,Math.PI*2);cx.fill();cx.shadowBlur=0;
  }

  // ── FAR MOUNTAINS (slowest parallax) ──
  if(zone===0||zone===4||zone===2){
    const mtColors=zone===0?['rgba(15,18,45,.9)','rgba(20,24,60,.85)']:
                   zone===4?['rgba(30,8,40,.9)','rgba(40,10,55,.85)']:
                            ['rgba(45,10,10,.85)','rgba(35,8,8,.8)'];
    cx.fillStyle=mtColors[0];
    for(let i=0;i<8;i++){
      const bx=((i*220-px1*.18)%(W+260))-130;
      const bh=80+((i*53)%90);
      cx.beginPath();cx.moveTo(bx,H-TILE);cx.lineTo(bx+60,H-TILE-bh);cx.lineTo(bx+130,H-TILE);cx.fill();
    }
    cx.fillStyle=mtColors[1];
    for(let i=0;i<6;i++){
      const bx=((i*270+140-px1*.14)%(W+300))-150;
      const bh=60+((i*71)%80);
      cx.beginPath();cx.moveTo(bx,H-TILE);cx.lineTo(bx+70,H-TILE-bh);cx.lineTo(bx+150,H-TILE);cx.fill();
    }
    // Snow caps on zone 0 & 4
    if(zone===0||zone===4){
      const capCol=zone===4?'rgba(200,150,255,.4)':'rgba(200,220,255,.35)';
      cx.fillStyle=capCol;
      for(let i=0;i<8;i++){
        const bx=((i*220-px1*.18)%(W+260))-130;
        const bh=80+((i*53)%90);
        cx.beginPath();cx.moveTo(bx+45,H-TILE-bh+18);cx.lineTo(bx+60,H-TILE-bh);cx.lineTo(bx+75,H-TILE-bh+18);cx.fill();
      }
    }
  }

  // ── CITY SKYLINE (zone 0) ──
  if(z.bgBuildings){
    cx.fillStyle='rgba(8,10,26,.9)';
    for(let i=0;i<22;i++){
      const bx=((i*175-px2*.9)%(W+200))-100;
      const bh=55+((i*73)%130);
      const bw=38+((i*41)%50);
      cx.fillRect(bx,H-TILE-bh,bw,bh);
      // Windows
      for(let wy=H-TILE-bh+8;wy<H-TILE-14;wy+=15){
        for(let wx=bx+5;wx<bx+bw-5;wx+=10){
          const lit=Math.sin(wx*1.3+wy*0.8+i+fc*.003)>.15;
          if(lit){cx.fillStyle='rgba(120,160,255,.35)';cx.fillRect(wx,wy,5,7);}
        }
      }
      cx.fillStyle='rgba(8,10,26,.9)';
    }
    // Antenna lights
    cx.fillStyle='rgba(255,60,60,.8)';
    for(let i=0;i<6;i++){
      const bx=((i*290-px2*.9)%(W+300))-140;
      if(fc%40<20) {cx.shadowColor='#ff3c3c';cx.shadowBlur=8;cx.beginPath();cx.arc(bx+20,H-TILE-120-((i*73)%50),3,0,Math.PI*2);cx.fill();cx.shadowBlur=0;}
    }
  }

  // ── CASTLE SILHOUETTE (zone 4) ──
  if(zone===4){
    cx.fillStyle='rgba(20,5,35,.95)';
    const castleX=W*.5-px2*.6;
    // Main tower
    cx.fillRect(castleX-25,H-TILE-160,50,160);
    // Battlements
    for(let i=0;i<5;i++) cx.fillRect(castleX-28+i*14,H-TILE-168,10,12);
    // Side towers
    cx.fillRect(castleX-65,H-TILE-110,30,110);cx.fillRect(castleX+35,H-TILE-110,30,110);
    for(let i=0;i<3;i++){cx.fillRect(castleX-68+i*12,H-TILE-118,9,10);cx.fillRect(castleX+32+i*12,H-TILE-118,9,10);}
    // Windows glow
    cx.fillStyle='rgba(200,0,255,.4)';cx.shadowColor='#aa00ff';cx.shadowBlur=10;
    cx.fillRect(castleX-8,H-TILE-140,16,22);cx.fillRect(castleX-48,H-TILE-90,12,16);cx.fillRect(castleX+36,H-TILE-90,12,16);
    cx.shadowBlur=0;
  }

  // ── DUNGEON / TECH GRID (zone 2) ──
  if(zone===2){
    cx.strokeStyle='rgba(0,120,200,.1)';cx.lineWidth=1;
    const gOff=px2*.4%50;
    for(let x=-(gOff%50);x<W;x+=50) {cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke();}
    for(let y=0;y<H;y+=50) {cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke();}
    // Floating data fragments
    for(let i=0;i<8;i++){
      const fx=((i*180+70-px3*.5)%(W+100))-50;
      const fy=40+(i*57)%(H*.5)+Math.sin(fc*.04+i)*12;
      cx.fillStyle='rgba(0,180,255,.18)';cx.font="7px 'Press Start 2P',monospace";
      cx.textAlign='center';cx.fillText(['404','301','NaN','ERR','???','418','503','null'][i],fx,fy);
    }
    cx.textAlign='left';
  }

  // ── TREES (zone 0 and zone 3) ──
  if(zone===0||zone===3){
    const treeCol=zone===0?'rgba(8,15,30,.85)':'rgba(20,8,5,.8)';
    const trunkCol=zone===0?'rgba(20,10,5,.7)':'rgba(15,5,3,.7)';
    for(let i=0;i<12;i++){
      const tx=((i*210+40-px2*.7)%(W+240))-120;
      const th=55+((i*37)%55);
      const tw=28+((i*19)%20);
      // Trunk
      cx.fillStyle=trunkCol;cx.fillRect(tx+tw*.4,H-TILE-th*.35,tw*.2,th*.35);
      // Canopy — layered triangles
      cx.fillStyle=treeCol;
      cx.beginPath();cx.moveTo(tx,H-TILE-th*.5);cx.lineTo(tx+tw/2,H-TILE-th);cx.lineTo(tx+tw,H-TILE-th*.5);cx.fill();
      cx.beginPath();cx.moveTo(tx+4,H-TILE-th*.3);cx.lineTo(tx+tw/2,H-TILE-th*.72);cx.lineTo(tx+tw-4,H-TILE-th*.3);cx.fill();
      // Leaf shimmer
      if(zone===0){cx.fillStyle='rgba(30,60,120,.3)';cx.beginPath();cx.arc(tx+tw/2,H-TILE-th*.78,tw*.28,0,Math.PI*2);cx.fill();}
    }
  }

  // ── FLYING PARTICLES (zone-specific) ──
  if(zone===1){
    // Floating red stars / review bombs drifting
    for(let i=0;i<6;i++){
      const fxx=((i*190+fc*0.3-px1*.2)%(W+80))-40;
      const fyy=30+(i*70)%(H*.55)+Math.sin(fc*.05+i*1.3)*18;
      cx.fillStyle='rgba(220,50,50,.35)';cx.shadowColor='#ff4757';cx.shadowBlur=6;
      cx.font='14px serif';cx.textAlign='center';cx.fillText('★',fxx,fyy);cx.shadowBlur=0;
    }
    cx.textAlign='left';
  }
  if(zone===2){
    // Floating binary / code particles
    for(let i=0;i<5;i++){
      const fxx=((i*160+fc*0.4-px1*.15)%(W+60))-30;
      const fyy=20+(i*80)%(H*.5)+Math.sin(fc*.06+i)*14;
      cx.fillStyle='rgba(0,200,255,.22)';cx.font="8px 'Press Start 2P',monospace";
      cx.textAlign='center';cx.fillText(['01','10','0x','//','<>'][i],fxx,fyy);
    }
    cx.textAlign='left';
  }
  if(zone===3||zone===4){
    // Purple dollar signs / keyword fragments drifting
    for(let i=0;i<5;i++){
      const fxx=((i*200+fc*0.25-px1*.18)%(W+80))-40;
      const fyy=25+(i*65)%(H*.5)+Math.sin(fc*.04+i*1.7)*16;
      cx.fillStyle=zone===4?'rgba(180,50,255,.28)':'rgba(150,50,255,.22)';
      cx.shadowColor=zone===4?'#aa00ff':'#8800cc';cx.shadowBlur=5;
      cx.font='12px serif';cx.textAlign='center';cx.fillText(zone===4?'$':'🔑',fxx,fyy);cx.shadowBlur=0;
    }
    cx.textAlign='left';
  }
  if(zone===4){
    // Flying bats
    for(let i=0;i<4;i++){
      const bx=((i*240+fc*0.6-px2*.3)%(W+100))-50;
      const by=30+(i*55)%(H*.4)+Math.sin(fc*.08+i*2)*20;
      const wing=Math.sin(fc*.15+i)*.3;
      cx.fillStyle='rgba(120,30,180,.6)';
      cx.save();cx.translate(bx,by);cx.rotate(wing);
      cx.beginPath();cx.ellipse(-8,0,10,5,Math.PI*.15,0,Math.PI*2);cx.fill();
      cx.beginPath();cx.ellipse(8,0,10,5,-Math.PI*.15,0,Math.PI*2);cx.fill();
      cx.fillStyle='rgba(80,20,130,.8)';cx.beginPath();cx.arc(0,0,4,0,Math.PI*2);cx.fill();
      cx.restore();
    }
  }

  // ── FOG ──
  if(z.fogColor){cx.fillStyle=z.fogColor;cx.fillRect(0,0,W,H);}

  // ── ZONE WATERMARK ──
  cx.font="bold 11px 'Press Start 2P',monospace";
  cx.fillStyle='rgba(255,255,255,.07)';
  cx.textAlign='center';
  cx.fillText('ZONE '+(zone+1)+': '+ZONES[zone].name,W/2,H-12);
  cx.textAlign='left';
}

function drawPlatforms(z) {
  platforms.forEach(p=>{
    const sx=p.x-cam.x;
    if(sx>-p.w-10&&sx<W+10){
      if(p.type==='ground'){
        cx.fillStyle=z.ground;
        cx.fillRect(sx,p.y,p.w,p.h);
        // Bright accent top edge — critical readability
        cx.shadowColor=z.accent; cx.shadowBlur=6;
        cx.fillStyle=z.accent;
        cx.fillRect(sx,p.y,p.w,3);
        cx.shadowBlur=0;
        // Tile grid lines
        cx.strokeStyle='rgba(255,255,255,.07)';cx.lineWidth=1;
        for(let tx=0;tx<p.w;tx+=TILE) cx.strokeRect(sx+tx,p.y,TILE,p.h);
      } else {
        // Floating platform — very visible
        cx.fillStyle=z.wall;
        cx.fillRect(sx,p.y,p.w,p.h);
        // Big glowing top
        cx.shadowColor=z.accent; cx.shadowBlur=12;
        cx.fillStyle=z.accent;
        cx.fillRect(sx,p.y,p.w,4);
        cx.shadowBlur=0;
        // Light face
        cx.fillStyle='rgba(255,255,255,.1)';
        cx.fillRect(sx+2,p.y+4,p.w-4,p.h-5);
        // Dark underside
        cx.fillStyle='rgba(0,0,0,.6)';
        cx.fillRect(sx,p.y+p.h-3,p.w,3);
        // Glow drip
        const gg=cx.createLinearGradient(0,p.y+p.h,0,p.y+p.h+20);
        gg.addColorStop(0,z.accent+'55'); gg.addColorStop(1,'transparent');
        cx.fillStyle=gg; cx.fillRect(sx,p.y+p.h,p.w,20);
      }
    }
  });
}

function drawPlayer() {
  const sx=P.x-cam.x;
  if(iFrames>0&&Math.floor(iFrames/4)%2===0) return;
  cx.save();
  cx.translate(sx+P.w/2,P.y+P.h/2);
  if(P.dir<0) cx.scale(-1,1);
  cx.translate(-P.w/2,-P.h/2);

  const wf=P.wFrame%4;
  const ls=[0,5,0,-5][wf]*(P.moving?1:0);
  const bb=P.moving?[0,-1.5,0,1.5][wf]:0;
  const inAir=!P.onGround;
  const airBend=inAir?(P.vy<0?-5:3):0; // body tilt in air

  // Jump squash/stretch
  const scaleY=inAir?(P.vy<0?1.12:.93):1;
  const scaleX=inAir?(P.vy<0?.9:1.06):1;
  cx.save();
  cx.translate(P.w/2,P.h*.8);
  cx.scale(scaleX,scaleY);
  cx.translate(-P.w/2,-P.h*.8);

  // Shadow
  if(P.onGround){
    cx.fillStyle='rgba(0,0,0,.3)';
    cx.beginPath();cx.ellipse(P.w/2,P.h+4,P.w*.4,5,0,0,Math.PI*2);cx.fill();
  }

  // LEGS
  cx.fillStyle='#1a3a8a';
  cx.fillRect(3,24+bb,10,14+ls);
  cx.fillRect(17,24+bb,10,14-ls);
  cx.fillStyle='#111';
  cx.fillRect(1,37+bb+Math.max(0,ls),13,4);
  cx.fillRect(15,37+bb+Math.max(0,-ls),13,4);

  // TORSO
  cx.fillStyle='#1e5ccc';
  cx.fillRect(2,12+bb,24,14);
  cx.fillStyle='#0a0a18';
  cx.fillRect(2,24+bb,24,2);
  cx.fillStyle='rgba(255,255,255,.13)';
  cx.fillRect(4,12+bb,20,3);

  // E2A logo
  cx.fillStyle='rgba(249,115,22,.65)';
  cx.font='bold 6px sans-serif';cx.textAlign='center';
  cx.fillText('E2A',P.w/2,20+bb);

  // ARMS & SWORD
  const atkSw=atkActive?Math.sin((280-atkTimer)/280*Math.PI)*18:0;
  cx.fillStyle='#1e5ccc';
  cx.fillRect(-5,12+bb+atkSw,7,12);
  cx.fillRect(26,12+bb,7,12);
  cx.fillStyle='#d0d0e8';
  cx.fillRect(-13-atkSw*.4,7+bb+atkSw,5,22);
  cx.fillStyle='#888';
  cx.fillRect(-17-atkSw*.4,15+bb+atkSw,15,3);
  if(atkActive){
    cx.shadowColor='#f5c518';cx.shadowBlur=22;
    cx.fillStyle='rgba(245,197,24,.55)';
    cx.fillRect(-17-atkSw*.4,4+bb+atkSw,6,28);
    cx.shadowBlur=0;
  }
  cx.fillStyle='#f5c5a3';
  cx.fillRect(-6,23+bb+atkSw,7,6);
  cx.fillRect(26,23+bb,7,6);

  // HEAD (with air tilt)
  cx.save();cx.translate(P.w/2,4);cx.rotate(airBend*Math.PI/180);cx.translate(-P.w/2,-4);
  cx.fillStyle='#f5c5a3';cx.fillRect(4,0+bb,20,14);
  cx.fillStyle='#2a1408';cx.fillRect(4,0+bb,20,6);cx.fillRect(4,6+bb,3,6);
  cx.fillStyle='#111';cx.fillRect(8,5+bb,4,4);cx.fillRect(18,5+bb,4,4);
  cx.fillStyle='#fff';cx.fillRect(9,5+bb,2,2);cx.fillRect(19,5+bb,2,2);
  // Expression
  if(S.hp<S.maxHp*.3){cx.fillStyle='rgba(255,0,0,.4)';cx.fillRect(4,0+bb,20,14);}
  cx.restore();

  cx.restore(); // squash/stretch
  cx.restore(); // flip
}

function drawEnemy(e) {
  const sx=e.x-cam.x;
  if(sx<-e.w-60||sx>W+60) return;
  cx.save();
  if(e.flashTimer>0&&e.flashTimer%2===0){
    // Flash: draw a glow ring instead of white box
    cx.globalAlpha=0.7;
    cx.strokeStyle='#ffffff';
    cx.lineWidth=e.isBoss?6:3;
    cx.shadowColor='#ffffff';cx.shadowBlur=e.isBoss?30:14;
    cx.beginPath();
    cx.arc(sx+e.w/2,e.y+e.h/2,e.w*.52,0,Math.PI*2);
    cx.stroke();
    cx.shadowBlur=0;
    cx.globalAlpha=1;
    cx.restore();
    return;
  }
  cx.shadowColor=e.glow||e.color;cx.shadowBlur=e.isBoss?30:10;
  e.isBoss?drawBossSprite(e,sx,e.y):drawEnemySprite(e,sx,e.y);
  cx.shadowBlur=0;

  // HP bar
  if(e.isBoss||e.hp<e.maxHp){
    const bw=e.w+(e.isBoss?22:6),bh=e.isBoss?10:5;
    const bx=sx-2,by=e.y-(e.isBoss?18:11);
    cx.fillStyle='rgba(0,0,0,.7)';cx.fillRect(bx,by,bw,bh);
    const pct=Math.max(0,e.hp/e.maxHp);
    cx.fillStyle=pct>.5?'#00e676':pct>.25?'#f5c518':'#ff4757';
    cx.fillRect(bx,by,bw*pct,bh);
    cx.strokeStyle='rgba(255,255,255,.12)';cx.lineWidth=1;cx.strokeRect(bx,by,bw,bh);
    if(!e.isBoss&&e.hp<e.maxHp){
      cx.font="7px 'Nunito',sans-serif";cx.fillStyle=e.color;cx.textAlign='center';
      cx.fillText(e.label||e.type,sx+e.w/2,e.y-13);cx.textAlign='left';
    }
  }
  cx.restore();
}

function drawEnemySprite(e,SX,SY){
  const sx=SX, sy=SY; // keep for shadow
  const bob=Math.sin(fc*.07+e.id*2)*3;
  const wf=(e.wFrame||0)%4;const ls=[0,5,0,-5][wf];
  const flip=e.vx<-0.1;

  cx.save();
  cx.translate(sx,sy);
  if(flip){cx.translate(e.w/2,e.h/2);cx.scale(-1,1);cx.translate(-e.w/2,-e.h/2);}

  // Shadow
  cx.fillStyle='rgba(0,0,0,.3)';
  cx.beginPath();cx.ellipse(e.w/2,e.h+4,e.w*.4,5,0,0,Math.PI*2);cx.fill();

  if(e.type==='ghost'){
    // GHOST: wispy floating spirit with eerie glow
    cx.globalAlpha=.88;
    const gg=cx.createRadialGradient(e.w/2,e.h*.4+bob,2,e.w/2,e.h*.4+bob,e.w*.48);
    gg.addColorStop(0,'#6699ff');gg.addColorStop(1,'#2244aa');
    cx.fillStyle=gg;
    cx.beginPath();cx.arc(e.w/2,e.h*.4+bob,e.w*.44,Math.PI,0,false);
    // Wavy bottom
    cx.lineTo(e.w,e.h*.84+bob);
    for(let i=4;i>=0;i--){
      const wx=e.w*(i/4);
      const wy=e.h*.84+bob+Math.sin(i*1.5+fc*.1)*5;
      cx.lineTo(wx,wy);
    }
    cx.closePath();cx.fill();cx.globalAlpha=1;
    // Inner glow
    cx.fillStyle='rgba(100,180,255,.3)';
    cx.beginPath();cx.arc(e.w/2,e.h*.4+bob,e.w*.28,0,Math.PI*2);cx.fill();
    // Eyes — big black with white shine
    cx.fillStyle='#001133';
    cx.fillRect(e.w*.2,e.h*.3+bob,9,10);cx.fillRect(e.w*.58,e.h*.3+bob,9,10);
    cx.fillStyle='#cceeff';
    cx.fillRect(e.w*.22,e.h*.32+bob,4,5);cx.fillRect(e.w*.6,e.h*.32+bob,4,5);
    // Mouth
    cx.fillStyle='rgba(0,0,0,.6)';
    cx.fillRect(e.w*.32,e.h*.56+bob,e.w*.36,4);
    // Chains dangling
    cx.fillStyle='rgba(150,170,220,.4)';
    for(let c=0;c<3;c++){const cx2=e.w*.2+c*(e.w*.28);
      for(let l=0;l<3;l++) cx.fillRect(cx2+Math.sin(l+fc*.05)*2,e.h*.7+bob+l*8,4,5);}
  }
  else if(e.type==='shadow'){
    // SHADOW: dark morphing blob with red slits for eyes
    cx.globalAlpha=.92;
    cx.fillStyle='#112244';
    // Body — irregular jagged shape
    cx.beginPath();cx.moveTo(e.w*.1,e.h*.5+bob);
    cx.bezierCurveTo(0,e.h*.2+bob,e.w*.2,0+bob,e.w*.5,e.h*.1+bob);
    cx.bezierCurveTo(e.w*.8,0+bob,e.w,e.h*.2+bob,e.w*.9,e.h*.5+bob);
    cx.bezierCurveTo(e.w,e.h*.8+bob,e.w*.85,e.h+bob,e.w*.5,e.h*.95+bob);
    cx.bezierCurveTo(e.w*.15,e.h+bob,0,e.h*.8+bob,e.w*.1,e.h*.5+bob);
    cx.closePath();cx.fill();cx.globalAlpha=1;
    // Tendrils
    cx.fillStyle='#0a1830';
    for(let t=0;t<4;t++){
      cx.fillRect(e.w*.15+t*(e.w*.22),e.h*.88+bob+Math.sin(fc*.06+t)*3,5,12);
    }
    // Red glowing eyes
    cx.fillStyle='#ff2200';cx.shadowColor='#ff2200';cx.shadowBlur=10;
    cx.fillRect(e.w*.25,e.h*.38+bob,12,5);cx.fillRect(e.w*.6,e.h*.38+bob,12,5);
    cx.shadowBlur=0;
    // Purple rune marks
    cx.fillStyle='rgba(180,100,255,.5)';cx.font='10px serif';cx.textAlign='center';
    cx.fillText('⬡',e.w/2,e.h*.65+bob);cx.textAlign='left';
  }
  else if(e.type==='crawler'){
    // CRAWLER: mechanical spider with 8 legs
    cx.fillStyle='#550000';
    // Body — oval
    cx.beginPath();cx.ellipse(e.w/2,e.h*.55+bob,e.w*.38,e.h*.28,0,0,Math.PI*2);cx.fill();
    cx.fillStyle='#881111';
    cx.beginPath();cx.ellipse(e.w/2,e.h*.3+bob,e.w*.28,e.h*.2,0,0,Math.PI*2);cx.fill();
    // 8 legs — 4 each side
    cx.strokeStyle='#991111';cx.lineWidth=2.5;
    [-1,1].forEach(side=>{
      for(let i=0;i<4;i++){
        const lx=e.w/2;const ly=e.h*.5+bob;
        const angle=side*(0.3+i*.25);const len=e.w*.55;
        const kx=lx+side*e.w*.3;const ky=ly-5+i*4;
        cx.beginPath();cx.moveTo(lx+side*e.w*.35,ly-2+i*4);
        cx.quadraticCurveTo(kx+side*len*.5,ky+8+Math.sin(fc*.1+i)*3,lx+side*len,ly+8+i*3);
        cx.stroke();
      }
    });
    // Eyes — 4 red dots
    cx.fillStyle='#ff3300';cx.shadowColor='#ff3300';cx.shadowBlur=6;
    [.28,.42,.56,.7].forEach(ex2=>{cx.beginPath();cx.arc(e.w*ex2,e.h*.26+bob,2.5,0,Math.PI*2);cx.fill();});
    cx.shadowBlur=0;
    // Fangs
    cx.fillStyle='#ffaaaa';cx.fillRect(e.w*.38,e.h*.38+bob,3,5);cx.fillRect(e.w*.56,e.h*.38+bob,3,5);
  }
  else if(e.type==='bad_review'){
    // BAD REVIEW: angry keyboard warrior with 1-star bomb
    // Body
    cx.fillStyle='#aa2222';cx.fillRect(4,e.h*.25,e.w-8,e.h*.52);
    // Head — round face
    cx.fillStyle='#f4a070';cx.beginPath();cx.arc(e.w/2,e.h*.15+bob,e.w*.3,0,Math.PI*2);cx.fill();
    // Angry eyebrows
    cx.fillStyle='#4a1500';cx.lineWidth=3;cx.lineCap='round';
    cx.beginPath();cx.moveTo(e.w*.22,e.h*.08+bob);cx.lineTo(e.w*.42,e.h*.13+bob);cx.stroke();
    cx.beginPath();cx.moveTo(e.w*.58,e.h*.13+bob);cx.lineTo(e.w*.78,e.h*.08+bob);cx.stroke();
    // Eyes
    cx.fillStyle='#000';cx.fillRect(e.w*.27,e.h*.12+bob,5,5);cx.fillRect(e.w*.63,e.h*.12+bob,5,5);
    // Open angry mouth
    cx.fillStyle='#5a0000';cx.beginPath();cx.arc(e.w/2,e.h*.22+bob,e.w*.15,0,Math.PI);cx.fill();
    cx.fillStyle='#ffeeee';cx.fillRect(e.w*.38,e.h*.22+bob,e.w*.24,4);
    // 1-star sign
    cx.fillStyle='#ffcc00';cx.shadowColor='#ffcc00';cx.shadowBlur=8;
    cx.font='bold 12px serif';cx.textAlign='center';cx.fillText('1★',e.w/2,e.h*.72);cx.shadowBlur=0;
    // Legs
    cx.fillStyle='#aa2222';cx.fillRect(4,e.h*.75,9,e.h*.24+ls);cx.fillRect(e.w-13,e.h*.75,9,e.h*.24-ls);
    cx.textAlign='left';
  }
  else if(e.type==='troll'){
    // TROLL: big green warty troll carrying a phone
    cx.fillStyle='#557722';cx.fillRect(3,e.h*.2+bob,e.w-6,e.h*.55);
    // Big lumpy head
    cx.fillStyle='#668833';cx.beginPath();cx.arc(e.w/2,e.h*.14+bob,e.w*.34,0,Math.PI*2);cx.fill();
    // Warts
    cx.fillStyle='#445522';
    [.2,.65,.4,.8].forEach((wx,i)=>cx.beginPath()&&cx.arc(e.w*wx,e.h*.1+bob+i*4,3,0,Math.PI*2)&&cx.fill());
    cx.fillStyle='#445522';
    cx.beginPath();cx.arc(e.w*.2,e.h*.1+bob,3,0,Math.PI*2);cx.fill();
    cx.beginPath();cx.arc(e.w*.65,e.h*.14+bob,2.5,0,Math.PI*2);cx.fill();
    cx.beginPath();cx.arc(e.w*.38,e.h*.08+bob,2,0,Math.PI*2);cx.fill();
    // Small angry eyes
    cx.fillStyle='#ff4400';cx.fillRect(e.w*.22,e.h*.1+bob,7,6);cx.fillRect(e.w*.6,e.h*.1+bob,7,6);
    cx.fillStyle='#000';cx.fillRect(e.w*.25,e.h*.12+bob,3,4);cx.fillRect(e.w*.63,e.h*.12+bob,3,4);
    // Tusks
    cx.fillStyle='#ffffcc';cx.fillRect(e.w*.35,e.h*.22+bob,4,8);cx.fillRect(e.w*.58,e.h*.22+bob,4,8);
    // Phone in hand
    cx.fillStyle='#222';cx.fillRect(-6,e.h*.32+bob,10,14);cx.fillStyle='#44ff44';cx.fillRect(-5,e.h*.33+bob,8,10);
    // Legs
    cx.fillStyle='#446622';cx.fillRect(4,e.h*.73,12,e.h*.26+ls);cx.fillRect(e.w-16,e.h*.73,12,e.h*.26-ls);
  }
  else if(e.type==='star_bomber'){
    // STAR BOMBER: flying bomb with star fuse
    cx.fillStyle='#660000';
    cx.beginPath();cx.arc(e.w/2,e.h*.5+bob,e.w*.4,0,Math.PI*2);cx.fill();
    // Shine
    cx.fillStyle='rgba(255,100,100,.25)';
    cx.beginPath();cx.arc(e.w*.35,e.h*.35+bob,e.w*.2,0,Math.PI*2);cx.fill();
    // Star symbol
    cx.fillStyle='#ffcc00';cx.shadowColor='#ffcc00';cx.shadowBlur=8;
    cx.font='bold 14px serif';cx.textAlign='center';cx.fillText('★',e.w/2,e.h*.57+bob);cx.shadowBlur=0;
    // Fuse
    cx.strokeStyle='#ffaa00';cx.lineWidth=2.5;cx.lineCap='round';
    cx.beginPath();cx.moveTo(e.w*.62,e.h*.14+bob);
    cx.quadraticCurveTo(e.w*.82,e.h*.02+bob,e.w*.72,-e.h*.08+bob+Math.sin(fc*.15)*4);cx.stroke();
    // Spark
    cx.fillStyle='#ffee00';cx.shadowColor='#ffee00';cx.shadowBlur=12;
    cx.beginPath();cx.arc(e.w*.72,-e.h*.08+bob+Math.sin(fc*.15)*4,4,0,Math.PI*2);cx.fill();cx.shadowBlur=0;
    cx.textAlign='left';
  }
  else if(e.type==='algo_bot'){
    // ALGO BOT: sleek robot with Google G on chest
    cx.fillStyle='#003366';cx.fillRect(3,e.h*.2+bob,e.w-6,e.h*.56);
    // Head — square with visor
    cx.fillStyle='#004488';cx.fillRect(5,bob,e.w-10,e.h*.22);
    // Antenna
    cx.fillStyle='#0088ff';cx.fillRect(e.w/2-1,bob-10,2,12);
    cx.beginPath();cx.arc(e.w/2,bob-12,4,0,Math.PI*2);cx.fill();
    // Visor — wide glowing bar
    cx.fillStyle='#00ccff';cx.shadowColor='#00ccff';cx.shadowBlur=10;
    cx.fillRect(6,e.h*.06+bob,e.w-12,9);cx.shadowBlur=0;
    // Google G on chest
    cx.fillStyle='#4285F4';cx.font='bold 12px sans-serif';cx.textAlign='center';
    cx.fillText('G',e.w/2,e.h*.5+bob);cx.textAlign='left';
    // Body panels
    cx.fillStyle='rgba(0,180,255,.15)';cx.fillRect(5,e.h*.26+bob,e.w-10,2);cx.fillRect(5,e.h*.42+bob,e.w-10,2);
    // Arms
    cx.fillStyle='#003366';cx.fillRect(-6,e.h*.24+bob,8,e.h*.28);cx.fillRect(e.w-2,e.h*.24+bob,8,e.h*.28);
    // Claw hands
    cx.fillStyle='#0055aa';cx.fillRect(-8,e.h*.5+bob,12,8);cx.fillRect(e.w-4,e.h*.5+bob,12,8);
    // Legs
    cx.fillStyle='#002255';cx.fillRect(4,e.h*.74,12,e.h*.24+ls);cx.fillRect(e.w-16,e.h*.74,12,e.h*.24-ls);
  }
  else if(e.type==='penalty_trap'){
    // PENALTY TRAP: red warning sign that spins
    const rot=Math.sin(fc*.03)*0.2;
    cx.save();cx.translate(e.w/2,e.h/2);cx.rotate(rot);
    cx.fillStyle='#ff2200';cx.strokeStyle='#ffffff';cx.lineWidth=3;
    // Triangle warning
    cx.beginPath();cx.moveTo(0,-e.h*.45);cx.lineTo(e.w*.48,e.h*.38);cx.lineTo(-e.w*.48,e.h*.38);cx.closePath();
    cx.fill();cx.stroke();
    cx.fillStyle='#ffee00';cx.font='bold 18px sans-serif';cx.textAlign='center';cx.fillText('!',0,e.h*.28);
    cx.fillStyle='rgba(255,0,0,.2)';
    cx.beginPath();cx.arc(0,0,e.w*.55,0,Math.PI*2);cx.fill();
    cx.restore();cx.textAlign='left';
  }
  else if(e.type==='crawl_error'){
    // CRAWL ERROR: broken robot with 404 display
    cx.fillStyle='#cc3333';cx.fillRect(2,e.h*.2+bob,e.w-4,e.h*.55);
    // Head — cracked
    cx.fillStyle='#dd4444';cx.fillRect(4,bob,e.w-8,e.h*.22);
    // Crack lines
    cx.strokeStyle='#000';cx.lineWidth=1.5;
    cx.beginPath();cx.moveTo(e.w*.4,bob);cx.lineTo(e.w*.3,e.h*.1+bob);cx.lineTo(e.w*.45,e.h*.22+bob);cx.stroke();
    // 404 screen
    cx.fillStyle='#330000';cx.fillRect(5,e.h*.06+bob,e.w-10,10);
    cx.fillStyle='#ff4444';cx.font='bold 7px monospace';cx.textAlign='center';cx.fillText('404',e.w/2,e.h*.14+bob);cx.textAlign='left';
    // Sparks
    if(fc%6<3){cx.fillStyle='#ffff00';cx.shadowColor='#ffff00';cx.shadowBlur=6;cx.fillRect(e.w*.65,bob-4,4,4);cx.shadowBlur=0;}
    // Legs
    cx.fillStyle='#cc3333';cx.fillRect(3,e.h*.73,10,e.h*.25+ls);cx.fillRect(e.w-13,e.h*.73,10,e.h*.25-ls);
  }
  else if(e.type==='rival_agent'){
    // RIVAL AGENT: slick businessman in purple suit
    cx.fillStyle='#5522aa';cx.fillRect(3,e.h*.25+bob,e.w-6,e.h*.52);
    // Head
    cx.fillStyle='#f4c088';cx.beginPath();cx.arc(e.w/2,e.h*.14+bob,e.w*.28,0,Math.PI*2);cx.fill();
    // Slick hair
    cx.fillStyle='#110022';cx.fillRect(e.w*.2,bob,e.w*.6,e.h*.1);
    cx.beginPath();cx.moveTo(e.w*.2,e.h*.08+bob);cx.quadraticCurveTo(e.w*.5,e.h*.02+bob,e.w*.78,e.h*.1+bob);cx.lineTo(e.w*.78,bob);cx.lineTo(e.w*.2,bob);cx.closePath();cx.fill();
    // Smug eyes
    cx.fillStyle='#1a0030';cx.fillRect(e.w*.28,e.h*.1+bob,6,4);cx.fillRect(e.w*.6,e.h*.1+bob,6,4);
    // Purple tie
    cx.fillStyle='#8800ff';cx.beginPath();cx.moveTo(e.w*.46,e.h*.25+bob);cx.lineTo(e.w*.54,e.h*.25+bob);cx.lineTo(e.w*.5,e.h*.52+bob);cx.closePath();cx.fill();
    // $ sign
    cx.fillStyle='#ffdd00';cx.shadowColor='#ffdd00';cx.shadowBlur=6;cx.font='bold 11px sans-serif';cx.textAlign='center';cx.fillText('$',e.w/2,e.h*.42+bob);cx.shadowBlur=0;
    // Legs
    cx.fillStyle='#3311aa';cx.fillRect(3,e.h*.75,11,e.h*.23+ls);cx.fillRect(e.w-14,e.h*.75,11,e.h*.23-ls);cx.textAlign='left';
  }
  else if(e.type==='keyword_thief'){
    // KEYWORD THIEF: sneaky ninja with key
    cx.fillStyle='#222244';cx.fillRect(3,e.h*.25+bob,e.w-6,e.h*.5);
    // Ninja mask head
    cx.fillStyle='#111133';cx.beginPath();cx.arc(e.w/2,e.h*.15+bob,e.w*.3,0,Math.PI*2);cx.fill();
    cx.fillStyle='#3333aa';cx.fillRect(4,e.h*.12+bob,e.w-8,9);
    // Eye slot (only eyes visible)
    cx.fillStyle='#cc44ff';cx.shadowColor='#cc44ff';cx.shadowBlur=6;
    cx.fillRect(e.w*.25,e.h*.1+bob,8,5);cx.fillRect(e.w*.6,e.h*.1+bob,8,5);cx.shadowBlur=0;
    // Key weapon
    cx.fillStyle='#ffdd00';cx.shadowColor='#ffdd00';cx.shadowBlur=8;
    cx.fillRect(-8,e.h*.35+bob,12,4);
    cx.beginPath();cx.arc(-10,e.h*.37+bob,5,0,Math.PI*2);cx.stroke();
    cx.strokeStyle='#ffdd00';cx.lineWidth=2;
    cx.fillRect(-8,e.h*.37+bob,3,5);cx.fillRect(-4,e.h*.37+bob,3,5);
    cx.shadowBlur=0;
    // Legs
    cx.fillStyle='#222244';cx.fillRect(3,e.h*.73,10,e.h*.25+ls);cx.fillRect(e.w-13,e.h*.73,10,e.h*.25-ls);
  }
  else if(e.type==='ad_spammer'){
    // AD SPAMMER: old guy in suit throwing spam envelopes
    cx.fillStyle='#7744aa';cx.fillRect(4,e.h*.28+bob,e.w-8,e.h*.48);
    // Head
    cx.fillStyle='#f0c080';cx.beginPath();cx.arc(e.w/2,e.h*.16+bob,e.w*.28,0,Math.PI*2);cx.fill();
    // Toupee
    cx.fillStyle='#cc9900';cx.fillRect(e.w*.2,bob,e.w*.6,e.h*.08);
    // Eyes
    cx.fillStyle='#2a1800';cx.fillRect(e.w*.28,e.h*.12+bob,5,5);cx.fillRect(e.w*.6,e.h*.12+bob,5,5);
    // Spam envelope mid-throw
    cx.fillStyle='#ffffff';cx.fillRect(e.w+2,e.h*.3+bob-ls*.5,14,10);
    cx.strokeStyle='#cc0000';cx.lineWidth=1.5;
    cx.beginPath();cx.moveTo(e.w+2,e.h*.3+bob-ls*.5);cx.lineTo(e.w+9,e.h*.35+bob-ls*.5);cx.lineTo(e.w+16,e.h*.3+bob-ls*.5);cx.stroke();
    cx.fillStyle='#ff0000';cx.font='5px sans-serif';cx.textAlign='center';cx.fillText('SPAM',e.w+9,e.h*.36+bob-ls*.5+5);cx.textAlign='left';
    // Legs
    cx.fillStyle='#553388';cx.fillRect(4,e.h*.74,10,e.h*.24+ls);cx.fillRect(e.w-14,e.h*.74,10,e.h*.24-ls);
  }
  else {
    // DEFAULT ENEMY (old_guard_minion, guardian, fortress_bot)
    // Draw a knight/guard figure
    cx.fillStyle=e.color;
    // Armored body
    cx.fillRect(3,e.h*.25+bob,e.w-6,e.h*.5);
    // Helmet
    cx.fillStyle='rgba(255,255,255,.15)';cx.fillRect(3,e.h*.25+bob,e.w-6,4);
    cx.fillStyle=e.color;cx.fillRect(4,bob,e.w-8,e.h*.27);
    // Visor slit
    cx.fillStyle='rgba(0,0,0,.8)';cx.fillRect(6,e.h*.1+bob,e.w-12,5);
    cx.fillStyle=e.glow||'#ffaa00';cx.fillRect(6,e.h*.11+bob,e.w-12,3);
    // Shield
    cx.fillStyle='rgba(255,255,255,.2)';
    cx.beginPath();cx.moveTo(-4,e.h*.28+bob);cx.lineTo(-4,e.h*.62+bob);cx.lineTo(-10,e.h*.55+bob);cx.lineTo(-10,e.h*.35+bob);cx.closePath();cx.fill();
    // Sword
    cx.fillStyle='#ccccdd';cx.fillRect(e.w+2,e.h*.14+bob,5,e.h*.45);
    cx.fillStyle='#888';cx.fillRect(e.w-2,e.h*.26+bob,14,4);
    // Legs
    cx.fillStyle=e.color;cx.fillRect(4,e.h*.73,11,e.h*.25+ls);cx.fillRect(e.w-15,e.h*.73,11,e.h*.25-ls);
  }

  cx.restore();
}

function drawBossSprite(e,sx,sy){
  const bob=Math.sin(fc*.065)*6;
  const p=e.phase;
  cx.globalAlpha=.15+Math.sin(fc*.06)*.08;
  cx.strokeStyle=e.color;cx.lineWidth=7;
  cx.beginPath();cx.arc(sx+e.w/2,sy+e.h/2+bob,e.w*.62,0,Math.PI*2);cx.stroke();
  cx.globalAlpha=1;

  const BOSS_DRAW = {
    the_void:()=>{
      const g=cx.createRadialGradient(sx+e.w/2,sy+e.h/2+bob,4,sx+e.w/2,sy+e.h/2+bob,e.w*.52);
      g.addColorStop(0,p>0?'#3344cc':'#1122aa');g.addColorStop(1,'#00000a');
      cx.fillStyle=g;
      cx.beginPath();
      for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2;const r=e.w*.52+Math.sin(fc*.08+i)*8;i===0?cx.moveTo(sx+e.w/2+Math.cos(a)*r,sy+e.h/2+bob+Math.sin(a)*r):cx.lineTo(sx+e.w/2+Math.cos(a)*r,sy+e.h/2+bob+Math.sin(a)*r);}
      cx.closePath();cx.fill();
      cx.fillStyle=p>1?'#ff4757':'#88ddff';cx.shadowColor=cx.fillStyle;cx.shadowBlur=18;
      cx.fillRect(sx+e.w*.22,sy+e.h*.36+bob,16,12);cx.fillRect(sx+e.w*.58,sy+e.h*.36+bob,16,12);
      cx.fillStyle='#000';cx.shadowBlur=0;
      cx.fillRect(sx+e.w*.25,sy+e.h*.38+bob,9,8);cx.fillRect(sx+e.w*.61,sy+e.h*.38+bob,9,8);
    },
    troll_king:()=>{
      cx.fillStyle=e.color;
      cx.fillRect(sx+8,sy+bob,e.w-16,e.h*.36);cx.fillRect(sx+4,sy+e.h*.33+bob,e.w-8,e.h*.48);
      cx.fillStyle='#ff5500';
      cx.fillRect(sx+e.w*.16,sy+e.h*.08+bob,e.w*.22,e.h*.24);cx.fillRect(sx+e.w*.62,sy+e.h*.08+bob,e.w*.22,e.h*.24);
      cx.fillStyle='#000';
      cx.fillRect(sx+e.w*.18,sy+e.h*.1+bob,e.w*.17,e.h*.18);cx.fillRect(sx+e.w*.64,sy+e.h*.1+bob,e.w*.17,e.h*.18);
      cx.font='19px serif';cx.textAlign='center';cx.fillText('⭐💢⭐',sx+e.w/2,sy-5+bob);cx.textAlign='left';
      cx.fillStyle=e.color;cx.fillRect(sx,sy+e.h*.78,e.w*.36,e.h*.22);cx.fillRect(sx+e.w*.64,sy+e.h*.78,e.w*.36,e.h*.22);
    },
    core_update:()=>{
      cx.fillStyle=e.color;cx.fillRect(sx+4,sy+bob,e.w-8,e.h*.5);cx.fillRect(sx,sy+e.h*.47+bob,e.w,e.h*.47);
      cx.fillStyle='rgba(0,200,255,.8)';
      for(let i=0;i<5;i++) cx.fillRect(sx+7+i*20,sy-14+bob+Math.sin(fc*.06+i)*.3,4,16);
      cx.fillStyle='#00ffff';cx.shadowColor='#00ffff';cx.shadowBlur=14;
      for(let i=0;i<3;i++) cx.fillRect(sx+10+i*28,sy+e.h*.12+bob,18,8);
      cx.shadowBlur=0;cx.fillStyle='rgba(255,255,255,.1)';
      cx.fillRect(sx+3,sy+e.h*.55+bob,e.w-6,4);cx.fillRect(sx+3,sy+e.h*.68+bob,e.w-6,4);
    },
    the_rival:()=>{
      cx.fillStyle='#111';cx.fillRect(sx+8,sy+bob,e.w-16,e.h*.3);
      cx.fillStyle=e.color;cx.fillRect(sx+4,sy+e.h*.28+bob,e.w-8,e.h*.52);
      cx.fillStyle='#f4c88a';cx.fillRect(sx+12,sy+bob,e.w-24,e.h*.3);
      cx.fillStyle='#9900ee';cx.fillRect(sx+e.w/2-3,sy+e.h*.28+bob,6,e.h*.35);
      cx.fillStyle='#222';cx.fillRect(sx+14,sy+e.h*.08+bob,8,8);cx.fillRect(sx+e.w-22,sy+e.h*.08+bob,8,8);
      cx.fillStyle='#9900ee';cx.shadowColor='#9900ee';cx.shadowBlur=14;
      cx.font='bold 13px serif';cx.textAlign='center';cx.fillText('#1',sx+e.w/2,sy+e.h*.92+bob);
      cx.shadowBlur=0;cx.textAlign='left';
    },
    old_guard_boss:()=>{
      cx.fillStyle='#887700';cx.fillRect(sx+6,sy+bob,e.w-12,e.h*.32);
      cx.fillStyle='#aa8800';cx.fillRect(sx+4,sy+e.h*.3+bob,e.w-8,e.h*.52);
      cx.fillStyle='#f5c518';cx.shadowColor='#f5c518';cx.shadowBlur=22;
      cx.font='bold 19px serif';cx.textAlign='center';cx.fillText('👑',sx+e.w/2,sy-2+bob);
      cx.shadowBlur=0;
      cx.fillStyle='#886600';cx.fillRect(sx-12,sy+e.h*.34+bob,18,30);
      cx.fillStyle='#cccce0';cx.fillRect(sx+e.w+3,sy+e.h*.1+bob,7,38);
      cx.fillStyle='#888';cx.fillRect(sx+e.w-4,sy+e.h*.22+bob,20,4);
      cx.fillStyle='rgba(245,197,24,.8)';cx.shadowColor='#f5c518';cx.shadowBlur=14;
      cx.fillRect(sx+e.w+3,sy+e.h*.1+bob,7,38);cx.shadowBlur=0;cx.textAlign='left';
    }
  };
  (BOSS_DRAW[e.type]||BOSS_DRAW.the_void)();
  cx.shadowBlur=0;
}

function drawPickup(pk) {
  const sx=pk.x-cam.x;
  if(sx<-40||sx>W+40) return;
  const by=Math.sin(pk.bob)*5;
  cx.save();
  cx.shadowColor=pk.t.col;cx.shadowBlur=18;
  cx.font='20px serif';cx.textAlign='center';
  cx.fillText(pk.t.sym,sx+8,pk.y+by);
  cx.globalAlpha=.25+Math.sin(pk.bob)*.12;
  cx.strokeStyle=pk.t.col;cx.lineWidth=2;
  cx.beginPath();cx.arc(sx+8,pk.y+by+6,16,0,Math.PI*2);cx.stroke();
  cx.globalAlpha=1;cx.shadowBlur=0;cx.textAlign='left';cx.restore();
}

function drawNPC(n) {
  const sx=n.x-cam.x;
  if(sx<-60||sx>W+60) return;
  cx.save();
  cx.shadowColor='#00e676';cx.shadowBlur=14;
  cx.font='28px serif';cx.textAlign='center';cx.fillText(n.emoji,sx+n.w/2,n.y+n.h);
  cx.shadowBlur=0;
  // Talk bubble
  if(!n.talked&&Math.abs(P.x-n.x)<120){
    cx.font="7px 'Press Start 2P',monospace";
    cx.fillStyle='#00e676';
    cx.textAlign='center';
    cx.fillText('TALK',sx+n.w/2,n.y-6);
  }
  cx.textAlign='left';cx.restore();

  // Auto-talk on proximity
  if(!n.talked&&Math.abs(P.x+P.w/2-(n.x+n.w/2))<55&&gs==='playing'){
    n.talked=true;
    if(n.dialog) showDialog(n.dialog,null);
  }
}

function drawGoalFlag(g) {
  const sx=g.x-cam.x;
  if(sx<-200||sx>W+200) return;
  const ready=S.clients>=clientsNeeded&&enemies.filter(e=>e.alive&&!e.isBoss).length===0&&!g.reached;
  const col=ready?'#00e676':'#ff4757';
  const pulse=Math.sin(g.flagAnim*.08)*0.15;

  // Draw large glowing END ZONE area
  const zoneGrad=cx.createLinearGradient(sx,g.y,sx,g.y+g.h);
  zoneGrad.addColorStop(0,ready?'rgba(0,230,118,.18)':'rgba(255,71,87,.10)');
  zoneGrad.addColorStop(1,'transparent');
  cx.fillStyle=zoneGrad;
  cx.fillRect(sx,g.y,g.w,g.h);

  // Vertical glowing border
  cx.strokeStyle=col;cx.lineWidth=3;cx.globalAlpha=.7+pulse;
  cx.beginPath();cx.moveTo(sx,g.y);cx.lineTo(sx,g.y+g.h);cx.stroke();
  cx.globalAlpha=1;

  // Tall flagpole in center
  const poleX=sx+g.w*.35;
  cx.fillStyle='#aaaacc';cx.fillRect(poleX-2,g.y-20,4,g.h+20);

  // Animated waving flag
  const wave=Math.sin(g.flagAnim*.12)*12;
  cx.fillStyle=col;cx.shadowColor=col;cx.shadowBlur=ready?18:8;
  cx.beginPath();
  cx.moveTo(poleX+2,g.y-18);
  cx.quadraticCurveTo(poleX+32+wave,g.y-8, poleX+52+wave,g.y+2);
  cx.quadraticCurveTo(poleX+32+wave,g.y+12, poleX+2,g.y+22);
  cx.closePath();cx.fill();
  cx.shadowBlur=0;

  // Flag text
  cx.font="bold 8px 'Press Start 2P',monospace";cx.fillStyle='#000';cx.textAlign='center';
  cx.fillText(ready?'GO!':'END',poleX+28+wave*.4,g.y+9);

  // Big label above
  cx.font="bold 9px 'Press Start 2P',monospace";
  cx.fillStyle=col;cx.shadowColor=col;cx.shadowBlur=10;
  cx.textAlign='center';cx.fillText(ready?'▶ TOUCH TO FIGHT BOSS':'END ZONE',sx+g.w*.5,g.y-30);
  cx.shadowBlur=0;

  // Requirements shown on flag zone
  if(!ready&&!g.reached){
    const need=Math.max(0,clientsNeeded-S.clients);
    const en=enemies.filter(e=>e.alive&&!e.isBoss).length;
    cx.font="7px 'Press Start 2P',monospace";cx.fillStyle='rgba(255,255,255,.5)';
    let line1=en>0?`⚔ ${en} ENEMIES LEFT`:'✓ ENEMIES CLEAR';
    let line2=need>0?`👥 ${need} CLIENTS NEEDED`:'✓ CLIENTS READY';
    cx.fillText(line1,sx+g.w*.5,g.y-14);
    cx.fillText(line2,sx+g.w*.5,g.y-2);
  }
  cx.textAlign='left';
}

function drawBullet(b) {
  const sx=b.x-cam.x;
  if(sx<-20||sx>W+20) return;
  cx.save();cx.shadowColor=b.color;cx.shadowBlur=14;
  cx.fillStyle=b.color;cx.beginPath();cx.arc(sx,b.y,b.r,0,Math.PI*2);cx.fill();
  cx.fillStyle='#fff';cx.beginPath();cx.arc(sx,b.y,b.r*.4,0,Math.PI*2);cx.fill();
  cx.shadowBlur=0;cx.restore();
}

function drawParticle(p) {
  if(p.emoji){
    cx.save();cx.globalAlpha=p.life;cx.font=p.size+'px serif';cx.textAlign='center';
    cx.translate(p.x-cam.x,p.y);if(p.rotation) cx.rotate(p.rotation);
    cx.fillText(p.emoji,0,0);cx.restore();
  } else {
    const sx=p.x-cam.x;if(sx<-20||sx>W+20) return;
    cx.save();cx.globalAlpha=p.life;
    if(p.glow){cx.shadowColor=p.color;cx.shadowBlur=10;}
    cx.fillStyle=p.color;cx.beginPath();cx.arc(sx,p.y,p.size*.5,0,Math.PI*2);cx.fill();
    cx.shadowBlur=0;cx.restore();
  }
}

function drawHUDCanvas() {
  // Progress bar for client collection
  const progressX=12, progressY=14;
  const pct=Math.min(1,S.clients/clientsNeeded);
  cx.fillStyle='rgba(0,0,0,.5)';
  cx.fillRect(progressX,progressY,160,12);
  cx.fillStyle='rgba(0,230,118,.8)';
  cx.fillRect(progressX,progressY,160*pct,12);
  cx.strokeStyle='rgba(0,230,118,.3)';cx.lineWidth=1;
  cx.strokeRect(progressX,progressY,160,12);
  cx.font="7px 'Press Start 2P',monospace";cx.fillStyle='#fff';cx.textAlign='left';
  cx.fillText('CLIENTS '+S.clients+'/'+clientsNeeded,progressX+5,progressY+9);

  // Zone hint message (shown when touching flag without meeting requirements)
  if(zoneHintTimer>0){
    zoneHintTimer--;
    const alpha=Math.min(1,zoneHintTimer/30);
    cx.globalAlpha=alpha;
    cx.fillStyle='rgba(0,0,0,.75)';
    cx.fillRect(W/2-200,H/2-26,400,44);
    cx.strokeStyle='#ff4757';cx.lineWidth=2;
    cx.strokeRect(W/2-200,H/2-26,400,44);
    cx.font="bold 10px 'Press Start 2P',monospace";
    cx.fillStyle='#ff4757';cx.textAlign='center';
    cx.fillText(zoneHintMsg,W/2,H/2+4);
    cx.textAlign='left';cx.globalAlpha=1;
  }
  // Enemy count
  const aliveEn=enemies.filter(e=>e.alive&&!e.isBoss).length;
  if(aliveEn>0&&!bossSpawned){
    cx.fillStyle='rgba(255,71,87,.15)';cx.fillRect(progressX,progressY+16,100,11);
    cx.fillStyle='rgba(255,255,255,.6)';cx.font="6px 'Press Start 2P',monospace";
    cx.fillText('ENEMIES: '+aliveEn,progressX+5,progressY+24);
  }
  cx.textAlign='left';

  // Combo
  if(combo>=2){
    document.getElementById('comboEl').classList.add('show');
    document.getElementById('comboNum').textContent=combo+'x';
  } else document.getElementById('comboEl').classList.remove('show');
}

// ── MAIN LOOP ─────────────────────────────────────────────
function mainLoop(ts) {
  const dt=Math.min(ts-lastT,80); lastT=ts; fc++;

  cx.clearRect(0,0,W,H);
  drawScene();

  if(gs==='playing'){
    updatePlayer(dt);
    enemies.forEach(e=>updateEnemy(e,dt));
    updateBullets();
    updatePickups();
    updateGoalFlags();
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=p.grav;
      if(p.spin) p.rotation+=p.spin;
      p.life-=p.decay;p.vx*=.94;p.vy*=.95;
    });
    particles=particles.filter(p=>p.life>0);
    checkBossSpawn();
  }

  animId=requestAnimationFrame(mainLoop);
}

// ── HUD ───────────────────────────────────────────────────
function updateHUD() {
  document.getElementById('hpBar').style.width=Math.max(0,S.hp/S.maxHp*100)+'%';
  document.getElementById('xpBar').style.width=Math.max(0,S.xp/S.xpNext*100)+'%';
  document.getElementById('hpVal').textContent=Math.ceil(S.hp);
  document.getElementById('hudGold').textContent='💰'+S.gold;
  document.getElementById('hudClients').textContent='👥'+S.clients+'/'+clientsNeeded;
  document.getElementById('hudLevel').textContent='LVL '+S.level;
}

// ── DIALOG ────────────────────────────────────────────────
function showDialog(lines, cb) {
  if(!lines||!lines.length){if(cb) cb();return;}
  gs='dialog';dlgQ=[...lines];dlgCb=cb;
  advDlg();
  document.getElementById('dlgWrap').classList.add('show');
}

function advDlg() {
  if(dlgQ.length===0){closeDlg();return;}
  const l=dlgQ.shift();
  document.getElementById('dlgPortrait').innerHTML=portraitFor(l.p||'\uD83D\uDC64');
  document.getElementById('dlgName').textContent=l.n||'???';
  document.getElementById('dlgChoices').style.display='none';
  document.getElementById('dlgContinue').style.display='block';
  dlgFull=l.t||'';dlgLen=0;dlgTyping=true;
  clearInterval(dlgTimer);
  const el=document.getElementById('dlgText');el.innerHTML='';
  dlgTimer=setInterval(()=>{
    dlgLen++;
    let d=dlgFull.substring(0,dlgLen);
    d=d.replace(/<hl>(.*?)<\/hl>/g,'<span class="hl">$1</span>');
    el.innerHTML=d+(dlgLen<dlgFull.length?'<span class="dlg-cursor"></span>':'');
    if(dlgLen>=dlgFull.length){clearInterval(dlgTimer);dlgTyping=false;
      // Handle choices
      if(l.choices&&l.choices.length){
        const cc=document.getElementById('dlgChoices');cc.innerHTML='';cc.style.display='flex';
        l.choices.forEach(ch=>{const b=document.createElement('button');b.className='dlg-choice';b.textContent=ch.t;b.onclick=()=>{closeDlg();if(ch.cb) ch.cb();};cc.appendChild(b);});
        document.getElementById('dlgContinue').style.display='none';
      }
    }
  },18);
}

function closeDlg(){
  clearInterval(dlgTimer);dlgTyping=false;
  document.getElementById('dlgWrap').classList.remove('show');
  if(dlgCb){const c=dlgCb;dlgCb=null;c();}
  gs='playing';
}

document.getElementById('dlgWrap').addEventListener('click',e=>{
  if(e.target.classList.contains('dlg-choice')) return;
  if(gs!=='dialog') return;
  if(dlgTyping){
    clearInterval(dlgTimer);dlgTyping=false;
    let d=dlgFull;d=d.replace(/<hl>(.*?)<\/hl>/g,'<span class="hl">$1</span>');
    document.getElementById('dlgText').innerHTML=d;
    const choices=dlgQ.length>0?null:null; // simplified
    return;
  }
  if(dlgQ.length>0) advDlg(); else closeDlg();
});

// ── REWARD MODAL ──────────────────────────────────────────
let rewardCb=null;
function showReward(r, cb) {
  rewardCb=cb;
  gs='reward';
  if(animId) cancelAnimationFrame(animId);
  document.getElementById('rIcon').textContent=r.icon||'🏆';
  document.getElementById('rTitle').textContent=r.title||'REWARD!';
  document.getElementById('rSub').textContent=r.desc||'';
  const el=document.getElementById('rCode');el.textContent=r.code||'EYETOAD';
  el.className='modal-code';el.onclick=()=>copyCode(el);
  document.getElementById('rewardModal').classList.add('show');
  playBeep(880,100,'square',.07);
  [1100,1320,1760].forEach((f,i)=>setTimeout(()=>playBeep(f,100,'square',.07),i*110+140));
}

function copyCode(el){
  const c=el.textContent;
  navigator.clipboard?.writeText(c).then(()=>{el.textContent='✓ COPIED!';el.classList.add('copied');setTimeout(()=>{el.textContent=c;el.classList.remove('copied');},2e3);})
  .catch(()=>{el.textContent='✓ COPIED!';setTimeout(()=>el.textContent=c,2e3);});
}

function dismissReward(){
  document.getElementById('rewardModal').classList.remove('show');
  gs='playing';lastT=performance.now();animId=requestAnimationFrame(mainLoop);
  if(rewardCb){const c=rewardCb;rewardCb=null;c();}
}

document.getElementById('keepPlaying').onclick=dismissReward;
document.getElementById('closeReward').onclick=dismissReward;

// ── GAME FLOW ─────────────────────────────────────────────
function gameOver(){
  gs='gameover';
  document.getElementById('gameOverOv').classList.add('show');
  flash('rgba(255,0,0,.4)');
}
function pauseGame(){if(gs!=='playing') return;gs='paused';document.getElementById('pauseOv').classList.add('show');}
function resumeGame(){gs='playing';document.getElementById('pauseOv').classList.remove('show');lastT=performance.now();}
function restartGame(){
  document.getElementById('pauseOv').classList.remove('show');
  document.getElementById('gameOverOv').classList.remove('show');
  S={hp:100,maxHp:100,xp:0,xpNext:80,level:1,gold:0,atk:20,def:4,kills:0,clients:0,codes:[]};
  zone=0;fc=0;combo=0;
  updateHUD();loadZone(0);
  gs='playing';lastT=performance.now();
}
function returnToTitle(){
  if(animId) cancelAnimationFrame(animId);
  document.getElementById('gameSection').classList.remove('show');
  document.getElementById('heroSection').style.display='';
  ['pauseOv','gameOverOv'].forEach(id=>document.getElementById(id).classList.remove('show'));
  gs='title';
}

document.getElementById('pauseBtn').onclick=pauseGame;
document.getElementById('resumeBtn').onclick=resumeGame;
document.getElementById('restartBtn').onclick=restartGame;
document.getElementById('menuBtn').onclick=returnToTitle;
document.getElementById('goRestartBtn').onclick=restartGame;
document.getElementById('goMenuBtn').onclick=returnToTitle;
document.getElementById('mobPauseBtn').onclick=pauseGame;
document.getElementById('mapBtn').onclick=()=>{
  if(gs==='playing') pauseGame();
};

// ── INPUT ─────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  K[e.key]=true;
  if(gs==='dialog'){
    if(['Space','Enter'].includes(e.code)||e.key==='z'||e.key==='Z'){e.preventDefault();}
    return;
  }
  if(gs==='playing'){
    if(e.code==='Space'||e.key==='z'||e.key==='Z'){doAttack();e.preventDefault();}
    if(e.key==='Shift'||e.key==='x'||e.key==='X'){doDash();e.preventDefault();}
    if(e.key==='Escape') pauseGame();
  }
  if(gs==='paused') if(e.key==='Escape') resumeGame();
});
document.addEventListener('keyup',e=>{K[e.key]=false;});

// ── JOYSTICK ──────────────────────────────────────────────
(function(){
  const wrap=document.getElementById('joyWrap');
  const knob=document.getElementById('joyKnob');
  let touching=false,jx0=0,jy0=0;const R=46;
  function joyStart(tx,ty){touching=true;const r=wrap.getBoundingClientRect();jx0=r.left+r.width/2;jy0=r.top+r.height/2;joyMove(tx,ty);}
  function joyMove(tx,ty){if(!touching) return;let dx=tx-jx0,dy=ty-jy0;const d=Math.hypot(dx,dy);if(d>R){dx=dx/d*R;dy=dy/d*R;}
    knob.style.transform=`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    mob.x=dx/R;mob.y=dy/R;}
  function joyEnd(){touching=false;knob.style.transform='translate(-50%,-50%)';mob.x=0;mob.y=0;}
  wrap.addEventListener('touchstart',e=>{e.preventDefault();joyStart(e.touches[0].clientX,e.touches[0].clientY);},{passive:false});
  wrap.addEventListener('touchmove',e=>{e.preventDefault();joyMove(e.touches[0].clientX,e.touches[0].clientY);},{passive:false});
  wrap.addEventListener('touchend',e=>{e.preventDefault();joyEnd();},{passive:false});
  wrap.addEventListener('mousedown',e=>joyStart(e.clientX,e.clientY));
  document.addEventListener('mousemove',e=>{if(touching) joyMove(e.clientX,e.clientY);});
  document.addEventListener('mouseup',()=>{if(touching) joyEnd();});
})();

document.getElementById('mobJump').addEventListener('touchstart',e=>{e.preventDefault();mob.jump=true;jumpHeld=false;},{passive:false});
document.getElementById('mobJump').addEventListener('touchend',e=>{e.preventDefault();mob.jump=false;},{passive:false});
document.getElementById('mobJump').addEventListener('mousedown',()=>{mob.jump=true;jumpHeld=false;});
document.getElementById('mobJump').addEventListener('mouseup',()=>mob.jump=false);
document.getElementById('mobAttack').addEventListener('touchstart',e=>{e.preventDefault();if(gs==='playing') doAttack();},{passive:false});
document.getElementById('mobAttack').addEventListener('click',()=>{if(gs==='playing') doAttack();});

// ── AUDIO ─────────────────────────────────────────────────
let audioCtx;
function getAC(){if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx;}
function playBeep(freq=440,dur=80,type='square',vol=.04){
  try{const ac=getAC();const o=ac.createOscillator(),g=ac.createGain();
    o.type=type;o.frequency.value=freq;g.gain.value=vol;
    o.connect(g);g.connect(ac.destination);o.start();
    g.gain.setTargetAtTime(0,ac.currentTime+dur/1000*.7,.04);
    o.stop(ac.currentTime+dur/1000+.05);}catch(e){}
}

// ── HEADER ────────────────────────────────────────────────
window.addEventListener('scroll',()=>{document.getElementById('hdr').style.boxShadow=window.scrollY>20?'0 4px 26px rgba(0,0,0,.7)':'';},{passive:true});
const burger=document.getElementById('burger'),mobNav=document.getElementById('mobNav');
burger.addEventListener('click',()=>{const o=mobNav.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});
mobNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobNav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';}));

// ── STARS ─────────────────────────────────────────────────
function buildStars(){const bg=document.getElementById('starsBg');if(!bg) return;for(let i=0;i<80;i++){const d=document.createElement('div');d.className='star-dot';const s=Math.random()*2.5+.5;d.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:#fff;--d:${2+Math.random()*4}s;--dl:${Math.random()*4}s;`;bg.appendChild(d);}}
buildStars();

// ── START ─────────────────────────────────────────────────
document.getElementById('startBtn').addEventListener('click',()=>{
  try{getAC();}catch(e){}
  document.getElementById('heroSection').style.display='none';
  document.getElementById('gameSection').classList.add('show');
  document.getElementById('gameSection').scrollIntoView({behavior:'smooth',block:'start'});
  // Show mobile controls on mobile
  if('ontouchstart' in window||window.matchMedia('(max-width:860px)').matches){
    document.getElementById('mobZone').style.display='block';
  }
  S={hp:100,maxHp:100,xp:0,xpNext:80,level:1,gold:0,atk:20,def:4,kills:0,clients:0,codes:[]};
  zone=0;fc=0;combo=0;
  setTimeout(()=>{
    updateHUD();loadZone(0);
    lastT=performance.now();
    if(animId) cancelAnimationFrame(animId);
    animId=requestAnimationFrame(mainLoop);
  },350);
});


