/* SEO Time Machine v1 (Eye To Ad Media). One engine, two sizes.
   Usage: <div data-tm="full"></div> or <div data-tm="compact"></div>, then <script src="/time-machine.js?v=1" defer></script>
   A planning model, not a promise: more consistent work gets a site there sooner, newer sites and tougher markets take longer,
   and some time (crawling, trust, a natural link pace) cannot be bought. No network calls, no storage. */
(function () {
  'use strict';
  if (window.__etaTM) return; window.__etaTM = 1;

  var STEPS = [100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000];
  var START = [
    ['new', 'Brand-new website', 1.5, 2],
    ['some', 'A few years old', 1.15, 1.5],
    ['est', 'Established &amp; trusted', 0.85, 1]
  ];
  var GOAL = [
    ['map', 'Top 3 on Google Maps', 6],
    ['p1', 'Page 1 on Google', 9],
    ['calls', 'Steady calls from search', 8]
  ];
  var COMP = [['low', 'Low', 0.6], ['med', 'Medium', 1], ['high', 'High', 1.7]];
  var IND = [
    ['', 'Pick your industry (optional)', ''], ['plumb', 'Plumbing', 'high'], ['hvac', 'HVAC', 'high'], ['roof', 'Roofing', 'high'],
    ['law', 'Law firm', 'high'], ['dent', 'Dentist', 'high'], ['medspa', 'Med spa', 'med'], ['remod', 'Remodeling', 'med'],
    ['paint', 'Painting', 'med'], ['auto', 'Auto repair', 'med'], ['clean', 'Cleaning', 'med'], ['rest', 'Restaurant', 'med'],
    ['ecom', 'E-commerce', 'high'], ['realty', 'Real estate', 'high'], ['niche', 'Niche or rural service', 'low'], ['other', 'Something else', 'med']
  ];
  var PACE = [
    [299, 'Foundation pace', 'A steady trickle of fixes on your most important page and profile. Good for holding ground or a very small market. It will not make the phone ring in the next couple of months.'],
    [799, 'Steady build', 'Your core pages and Google Business Profile keep moving every week, and new content is added over time. Real progress, at a patient speed.'],
    [1999, 'Growth pace', 'More pages, local content, citations and link work every month, with AI search optimization built in. This is where most growing local businesses land.'],
    [3499, 'Acceleration', 'Several fronts at once: content, links, the map pack, AI answers and conversion fixes, all pulling the same direction.'],
    [1e9, 'Market takeover', 'A full campaign across every channel your plan calls for, built to close the gap on established leaders. Custom-quoted after research.']
  ];
  var CMP = [300, 1000, 2000, 3000];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function find(arr, k) { for (var i = 0; i < arr.length; i++) if (arr[i][0] === k) return arr[i]; return arr[0]; }
  function rate(b) { return Math.pow(b / 1000, 0.55); }
  function months(s, b) {
    var st = find(START, s.start), g = find(GOAL, s.goal), c = find(COMP, s.comp);
    var dist = g[2] * c[2] * st[2];
    return st[3] + dist / rate(b);
  }
  function range(m) {
    var lo = Math.max(1, Math.round(m * 0.75)), hi = Math.max(lo + 1, Math.round(m * 1.35));
    return [lo, hi];
  }
  function fmtM(n) { if (n > 60) return '5+ yrs'; if (n >= 24 && n % 12 === 0) return (n / 12) + ' yrs'; return n + ' mo'; }
  function fmtRange(r) { if (r[0] > 60) return '5+ years'; if (r[1] > 60) return r[0] + ' months to 5+ years'; return r[0] + '–' + r[1] + ' months'; }
  function dateAt(n) { var d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + n); return MON[d.getMonth()] + ' ' + d.getFullYear(); }
  function money(n) { return '$' + n.toLocaleString('en-US'); }
  function pace(b) { for (var i = 0; i < PACE.length; i++) if (b <= PACE[i][0]) return PACE[i]; return PACE[PACE.length - 1]; }

  var CSS = '.tm{--tm-ink:#101828;--tm-mute:#475467;--tm-line:#E4E7EC;--tm-blue:#2563EB;--tm-vio:#7C3AED;--tm-org:#F97316;--tm-yel:#FACC15;--tm-grn:#16A34A;font-family:Outfit,Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--tm-ink);background:#fff;border:1px solid var(--tm-line);border-radius:18px;box-shadow:0 24px 60px -28px rgba(16,24,40,.35);overflow:hidden;text-align:left}' +
    '.tm *{box-sizing:border-box}' +
    '.tm-top{display:flex;align-items:center;gap:10px;padding:14px 20px;background:linear-gradient(90deg,#1D4ED8,#7C3AED 55%,#F97316);color:#fff;font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:13px}' +
    '.tm-top i{width:9px;height:9px;border-radius:50%;background:#FACC15;box-shadow:0 0 0 4px rgba(250,204,21,.25);flex:none}' +
    '.tm-top span{margin-left:auto;font-weight:600;text-transform:none;letter-spacing:0;opacity:.95}' +
    '.tm-body{display:grid;grid-template-columns:1fr 1fr;gap:0}' +
    '.tm-ctl{padding:22px 22px 24px;border-right:1px solid var(--tm-line);display:grid;gap:18px;align-content:start}' +
    '.tm-q{font-size:15px;font-weight:700;margin:0 0 8px;display:flex;align-items:center;gap:8px}' +
    '.tm-q b{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:6px;background:#EEF2FF;color:var(--tm-blue);font-size:12px}' +
    '.tm-seg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}' +
    '.tm-seg button{font:inherit;font-size:14px;font-weight:600;line-height:1.2;padding:10px 8px;border:2px solid var(--tm-line);border-radius:10px;background:#fff;color:var(--tm-ink);cursor:pointer;min-height:48px;transition:border-color .2s,background .2s}' +
    '.tm-seg button:hover{border-color:#A5B4FC}' +
    '.tm-seg button[aria-pressed="true"]{border-color:var(--tm-blue);background:#EFF6FF;color:#1E3A8A;box-shadow:inset 0 -3px 0 var(--tm-blue)}' +
    '.tm-seg button:focus-visible,.tm select:focus-visible,.tm input:focus-visible,.tm a:focus-visible{outline:3px solid #F97316;outline-offset:2px}' +
    '.tm select{font:inherit;font-size:15px;width:100%;padding:11px 12px;border:2px solid var(--tm-line);border-radius:10px;background:#fff;color:var(--tm-ink);margin-bottom:8px;min-height:46px}' +
    '.tm-bud{display:flex;align-items:baseline;justify-content:space-between;gap:8px}' +
    '.tm-bud output{font-size:28px;font-weight:800;color:var(--tm-ink);font-variant-numeric:tabular-nums}' +
    '.tm-bud small{color:var(--tm-mute);font-size:13px}' +
    '.tm input[type=range]{width:100%;height:34px;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}' +
    '.tm input[type=range]::-webkit-slider-runnable-track{height:10px;border-radius:6px;background:linear-gradient(90deg,#93C5FD,#2563EB 40%,#7C3AED 70%,#F97316)}' +
    '.tm input[type=range]::-moz-range-track{height:10px;border-radius:6px;background:linear-gradient(90deg,#93C5FD,#2563EB 40%,#7C3AED 70%,#F97316)}' +
    '.tm input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;margin-top:-9px;border-radius:8px;background:#fff;border:3px solid #101828;box-shadow:0 4px 10px rgba(0,0,0,.25)}' +
    '.tm input[type=range]::-moz-range-thumb{width:24px;height:24px;border-radius:8px;background:#fff;border:3px solid #101828}' +
    '.tm-ticks{position:relative;height:16px;font-size:12px;color:var(--tm-mute);margin:2px 14px 0}.tm-ticks span{position:absolute;top:0;transform:translateX(-50%);white-space:nowrap}' +
    '.tm-out{padding:22px;display:grid;gap:16px;align-content:start;background:radial-gradient(120% 80% at 100% 0,#F5F3FF 0,#fff 60%)}' +
    '.tm-arr{border-radius:14px;padding:16px 18px;background:#0B1437;color:#fff;position:relative;overflow:hidden}' +
    '.tm-arr:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 22px);pointer-events:none}' +
    '.tm-arr p{margin:0;position:relative}' +
    '.tm-lbl{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#FDE68A;font-weight:700}' +
    '.tm-big{font-family:Unbounded,Outfit,Inter,system-ui,sans-serif;font-weight:800;font-size:clamp(26px,3.4vw,38px);line-height:1.1;margin:6px 0 4px!important;font-variant-numeric:tabular-nums;color:#fff}' +
    '.tm-date{color:#C7D2FE;font-size:15px}' +
    '.tm-date b{color:#fff}' +
    '.tm-line{position:relative;height:56px;margin:4px 2px 0}' +
    '.tm-line .tr{position:absolute;left:0;right:0;top:20px;height:6px;border-radius:4px;background:#E4E7EC}' +
    '.tm-line .fl{position:absolute;left:0;top:20px;height:6px;border-radius:4px;background:linear-gradient(90deg,#2563EB,#7C3AED,#F97316);transition:width .5s ease}' +
    '.tm-line .ms{position:absolute;top:0;transform:translateX(-50%);text-align:center;font-size:11px;color:var(--tm-mute);width:84px;transition:left .5s ease}' +
    '.tm-line .ms i{display:block;width:14px;height:14px;margin:13px auto 4px;border-radius:50%;background:#fff;border:3px solid #7C3AED}' +
    '.tm-line .ms.end i{border-color:#F97316;background:#FACC15}' +
    '.tm-pace{border:1px solid var(--tm-line);border-radius:12px;padding:12px 14px;background:#fff}' +
    '.tm-pace h4{margin:0 0 4px;font-size:16px;font-weight:800}' +
    '.tm-pace p{margin:0;font-size:14.5px;line-height:1.5;color:var(--tm-mute)}' +
    '.tm-cmp{display:grid;gap:7px}' +
    '.tm-cmp h4{margin:0 0 2px;font-size:14px;font-weight:700;color:var(--tm-ink)}' +
    '.tm-row{display:grid;grid-template-columns:62px 1fr 64px;align-items:center;gap:8px;font-size:13.5px}' +
    '.tm-row .b{height:12px;border-radius:6px;background:#E4E7EC;position:relative;overflow:hidden}' +
    '.tm-row .b i{position:absolute;left:0;top:0;bottom:0;border-radius:6px;background:#94A3B8;transition:width .5s ease}' +
    '.tm-row.me{font-weight:800}.tm-row.me .b i{background:linear-gradient(90deg,#2563EB,#7C3AED,#F97316)}' +
    '.tm-row span:last-child{text-align:right;font-variant-numeric:tabular-nums;color:var(--tm-ink)}' +
    '.tm-note{font-size:12.5px;line-height:1.5;color:var(--tm-mute);margin:0}' +
    '.tm-cta{display:flex;flex-wrap:wrap;gap:8px}' +
    '.tm-cta a{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:48px;padding:12px 18px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;flex:1 1 auto}' +
    '.tm-cta .c{background:#EA580C;color:#fff}.tm-cta .c:hover{background:#C2410C}' +
    '.tm-cta .g{border:2px solid #101828;color:#101828;background:#fff}.tm-cta .g:hover{background:#F2F4F7}' +
    '.tm.cmpct .tm-body{grid-template-columns:1fr 1.1fr}' +
    '@media (max-width:820px){.tm-body,.tm.cmpct .tm-body{grid-template-columns:1fr}.tm-ctl{border-right:0;border-bottom:1px solid var(--tm-line)}}' +
    '@media (max-width:420px){.tm-ctl,.tm-out{padding:18px 16px}.tm-seg button{font-size:13px;padding:9px 5px}.tm-top{padding:12px 16px;font-size:12px}.tm-line .ms{width:64px;font-size:10px}}' +
    '@media (prefers-reduced-motion:reduce){.tm *{transition:none!important}}';

  function seg(name, opts, cur) {
    return '<div class="tm-seg" role="group" data-k="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-v="' + o[0] + '" aria-pressed="' + (o[0] === cur) + '">' + o[1] + '</button>';
    }).join('') + '</div>';
  }

  function build(el, n) {
    var compact = el.getAttribute('data-tm') === 'compact';
    var s = {
      start: el.getAttribute('data-start') || 'some',
      goal: el.getAttribute('data-goal') || 'p1',
      comp: el.getAttribute('data-comp') || 'med',
      bud: +(el.getAttribute('data-budget') || 1000)
    };
    var bi = STEPS.indexOf(s.bud); if (bi < 0) bi = 5;
    var id = 'tm' + n;
    var head = compact ? 'SEO Time Machine' : 'SEO Time Machine &middot; set your trip';
    var h = '<div class="tm' + (compact ? ' cmpct' : '') + '" role="region" aria-label="SEO Time Machine">' +
      '<div class="tm-top"><i aria-hidden="true"></i>' + head + '<span>Departure: today</span></div>' +
      '<div class="tm-body"><div class="tm-ctl">' +
      (compact ? '' : '<div><p class="tm-q"><b>1</b>Where are you starting?</p>' + seg('start', START, s.start) + '</div>') +
      '<div><p class="tm-q"><b>' + (compact ? 1 : 2) + '</b>Where do you want to go?</p>' + seg('goal', GOAL, s.goal) + '</div>' +
      '<div><p class="tm-q"><b>' + (compact ? 2 : 3) + '</b>How tough is your market?</p>' +
      (compact ? '' : '<label class="sr" for="' + id + 'i" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Industry</label><select id="' + id + 'i">' + IND.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('') + '</select>') +
      seg('comp', COMP, s.comp) + '</div>' +
      '<div><p class="tm-q"><b>' + (compact ? 3 : 4) + '</b><label for="' + id + 'b">Monthly investment</label></p>' +
      '<div class="tm-bud"><output id="' + id + 'o" for="' + id + 'b">' + money(s.bud) + '</output><small>per month</small></div>' +
      '<input type="range" id="' + id + 'b" min="0" max="' + (STEPS.length - 1) + '" step="1" value="' + bi + '" aria-valuetext="' + money(s.bud) + ' per month">' +
      '<div class="tm-ticks" aria-hidden="true"><span style="left:0">$100</span><span style="left:50%">$1,000</span><span style="left:70%">$2,000</span><span style="left:100%">$5,000</span></div></div>' +
      '</div><div class="tm-out" aria-live="polite">' +
      '<div class="tm-arr"><p class="tm-lbl">Estimated arrival window</p><p class="tm-big" data-o="big"></p><p class="tm-date" data-o="date"></p></div>' +
      (compact ? '' : '<div class="tm-line" aria-hidden="true"><div class="tr"></div><div class="fl" data-o="fl"></div><div class="ms" data-o="m1" style="left:9%"><i></i>Plan &amp; foundation</div><div class="ms" data-o="m2"><i></i>First movement</div><div class="ms" data-o="m3"><i></i>Leads start</div><div class="ms end" data-o="m4" style="left:93%"><i></i>Arrival</div></div>') +
      '<div class="tm-pace"><h4 data-o="pt"></h4><p data-o="pd"></p></div>' +
      '<div class="tm-cmp"><h4>Same trip at different speeds</h4><div data-o="cmp"></div></div>' +
      '<p class="tm-note">A planning model, not a promise. It reflects how SEO generally behaves: steadier work gets there sooner, newer sites and tougher markets take longer, and some time can&rsquo;t be bought. Your real route is custom-quoted after we research your market.</p>' +
      '<div class="tm-cta"><a class="c" href="tel:18004818638">Map my real route: 1-800-481-8638</a>' +
      (compact ? '<a class="g" href="/seo-time-machine/">Open the full Time Machine</a>' : '<a class="g" href="/free-seo-audit/">Get a free SEO audit</a>') + '</div>' +
      '</div></div></div>';
    el.innerHTML = h;
    var q = function (k) { return el.querySelector('[data-o="' + k + '"]'); };
    var range_ = el.querySelector('#' + id + 'b'), out = el.querySelector('#' + id + 'o'), ind = el.querySelector('#' + id + 'i');

    function render() {
      var m = months(s, s.bud), r = range(m), big = q('big');
      big.textContent = fmtRange(r);
      q('date').innerHTML = r[0] > 60 ? 'At this speed, this trip is <b>more than 5 years</b> away.' : 'Somewhere between <b>' + dateAt(r[0]) + '</b> and <b>' + (r[1] > 60 ? 'beyond ' + dateAt(60) : dateAt(r[1])) + '</b>';
      var p = pace(s.bud); q('pt').textContent = money(s.bud) + '/mo: ' + p[1]; q('pd').textContent = p[2];
      if (!compact) {
        var tot = Math.min(m, 60), st = find(START, s.start)[3];
        var a = Math.min(92, Math.max(16, (st + (tot - st) * 0.3) / tot * 100)), b2 = Math.min(94, Math.max(a + 18, (st + (tot - st) * 0.6) / tot * 100));
        if (b2 > 80) { a = Math.min(a, 40); b2 = 66; }
        q('m2').style.left = a + '%'; q('m3').style.left = b2 + '%';
        q('fl').style.width = '100%';
      }
      var list = CMP.slice(); if (list.indexOf(s.bud) < 0) list.push(s.bud); list.sort(function (x, y) { return x - y; });
      var max = 0, vals = list.map(function (b) { var v = Math.min(66, months(s, b)); if (v > max) max = v; return v; });
      q('cmp').innerHTML = list.map(function (b, i) {
        var r2 = range(months(s, b)), w = Math.max(6, vals[i] / max * 100);
        return '<div class="tm-row' + (b === s.bud ? ' me' : '') + '"><span>' + money(b) + '</span><span class="b"><i style="width:' + w.toFixed(1) + '%"></i></span><span>' + (r2[0] > 60 ? '5+ yrs' : '~' + fmtM(Math.round(months(s, b)))) + '</span></div>';
      }).join('');
      try { window.dispatchEvent(new CustomEvent('tm:change', { detail: { speed: rate(s.bud), months: m } })); } catch (e) {}
    }
    el.addEventListener('click', function (e) {
      var bt = e.target.closest('.tm-seg button'); if (!bt) return;
      var g = bt.parentNode, k = g.getAttribute('data-k');
      [].forEach.call(g.children, function (x) { x.setAttribute('aria-pressed', x === bt ? 'true' : 'false'); });
      s[k] = bt.getAttribute('data-v'); if (k === 'comp' && ind) ind.value = ''; render();
    });
    range_.addEventListener('input', function () {
      s.bud = STEPS[+range_.value]; out.textContent = money(s.bud); range_.setAttribute('aria-valuetext', money(s.bud) + ' per month'); render();
    });
    if (ind) ind.addEventListener('change', function () {
      var c = find(IND, ind.value)[2]; if (!c) return; s.comp = c;
      [].forEach.call(el.querySelectorAll('[data-k="comp"] button'), function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-v') === c ? 'true' : 'false'); });
      render();
    });
    render();
  }

  function init() {
    var els = document.querySelectorAll('[data-tm]'); if (!els.length) return;
    var st = document.createElement('style'); st.id = 'tm-css'; st.textContent = CSS; document.head.appendChild(st);
    [].forEach.call(els, build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
