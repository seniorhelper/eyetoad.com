/*! Eye To Ad Media - homepage mascot v2.0
    v2.0 (Sept 11 2026):
      - CORNER HANDOFF. He now owns `eta-mascot-live` on <body> for as long as
        he is on screen. iris.js waits on that class before firing her own
        proactive bubble, so the two of them can never talk over each other.
        Combined with the existing `ir-panel-open` (which HE hides from), that
        is the complete contract between these two files. Two classes, both
        documented, nothing else shared.
      - HERO CTA GUARD. On a narrow screen his speech balloon used to land
        across the hero's Call button. He now stays silent while the hero is
        still on screen and only speaks once it has scrolled away. Landing is
        unaffected — he still flies in on time, he just holds his tongue.
        Desktop is untouched: the hero form occupies that side there.
      - More hook lines, and reduced-motion respected on the fly-in (already
        was) plus the new talk delay.
*/
/*! Eye To Ad Media - homepage mascot v1.0
    Integration: add a deferred script tag pointing at /mascot.js, just before the
    closing body tag.  src="/mascot.js" defer
    Optional overrides on the tag:
      data-delay="2600"      ms after page load before he flies in
      data-right="104"       px from the right edge where he lands
      data-max="2"           max appearances per browser session
      data-cta="Take a look"
*/
(function(){
  if (window.__etaMascot) return;
  window.__etaMascot = true;
  /* Presence marker. iris.js checks this to decide whether to wait for a
     handoff or just show the orb immediately. A page that does NOT include
     mascot.js gets the orb straight away — which is exactly what most pages
     should do. See the note in iris.js under ORB REVEAL. */
  window.__etaDone = false;

  var tag   = document.currentScript || (function(){var s=document.getElementsByTagName('script');return s[s.length-1];})();
  var DELAY = parseInt(tag.getAttribute('data-delay') || '2600', 10);
  var RIGHT = tag.getAttribute('data-right') || (window.innerWidth < 620 ? '64' : '104');
  /* CLEARANCE (v2.0.1). Iris's launcher grew to 88px in orb mode and sits at
     the right edge, so a mascot parked at right:104 on a phone ends up
     shoulder-to-shoulder with the ball. Enforce a floor on narrow screens
     regardless of what data-right says — the page author set that number
     before the orb existed, and this is not worth an edit on every page. */
  if (window.innerWidth < 760 && parseInt(RIGHT, 10) < 138) RIGHT = '138';
  var MAX   = parseInt(tag.getAttribute('data-max') || '2', 10);
  var CTA   = tag.getAttribute("data-cta") || "Take a look";

  var LINES = [
  "When someone asks ChatGPT for a Denver contractor, is it saying your name?",
  "Traffic without phone calls is just expensive scenery. Let's fix that.",
  "Your competitor is on page one. Want to know what they did?",
  "Google Maps sends more calls than your website. Is your profile working?",
  "Page 3 is where good companies go to be ignored.",
  "AI search is quoting somebody for your service. It should be you.",
  "Most sites lose the visitor in the first eight seconds. Does yours?",
  "Ranking for your own company name isn't SEO. Ranking for the work is.",
  "Ask me what your top three competitors rank for. I'll tell you.",
  "Reviews move the needle more than almost anything else you're paying for.",
  "If your site takes five seconds to load, half your visitors already left.",
  "Every month you wait, somebody else takes the spot you wanted.",
  "You don't need more traffic. You need the right traffic.",
  "Curious how your site actually looks to Google right now?",
  "Nobody scrolls to the bottom to find your phone number. Move it up.",
  "Leads should show up while you're on a jobsite, not after you chase them.",
  "The cheapest lead you'll ever get is the one already searching for you.",
  "Is your business showing up in the map pack, or just below it?",
  "Half your visitors are on a phone. Does your site treat them that way?",
  "Great work and no visibility is the most expensive combination there is.",
  "Want a straight answer about what your site is missing? Ask away.",
  "Ranking takes months. Starting takes about ninety seconds.",
  "Your website should be your best salesperson. Most aren't even trying.",
  "Somebody in Denver is searching for exactly what you do. Right now.",
  "Most Google Business Profiles are about 40% finished. Want to know yours?",
  "Fifty reviews makes you far likelier to land in the map pack. Got fifty?",
  "Your competitors are not better. They are just easier to find.",
  "The map pack takes more local clicks than the blue links under it.",
  "Three seconds. That is how long a phone visitor gives your site.",
  "Ads stop the day you stop paying. Rankings do not. Worth knowing.",
  "If your ad and your landing page disagree, you are paying twice.",
  "Most quotes never get followed up. That is free money on the floor.",
  "Nobody has ever said yes to a form with nine fields on a phone.",
  "Your best salesperson works nights and weekends. It is your website.",
  "Good news: the fix is usually cheaper than the problem."
];

  var CSS = "\n#etaMascot,#etaMascot *,#etaMascot *:before,#etaMascot *:after{box-sizing:border-box}\n/* Iris shares this corner and its panel is the larger element, so the mascot yields whenever the chat is open. iris.js sets ir-panel-open on <body>; that class is the only coupling between these two files. */\nbody.ir-panel-open #etaMascot{\n  opacity:0 !important;\n  visibility:hidden !important;\n  pointer-events:none !important;\n  transform:translateY(14px) scale(.94) !important;\n}\n#etaMascot{transition:opacity .24s ease, transform .24s ease, visibility .24s}\n#etaMascot{\n  --suit:#1B3FA0; --suit-dk:#122C74; --suit-lt:#3A6BD8;\n  --orange:#FF6A1A; --orange-dk:#D94A00;\n  --silver:#DCE5F5; --skin:#F2C39C; --skin-dk:#D8A077;\n  --hair:#6B4326; --hair-lt:#8C5C36; --glow:#3FC8FF;\n  position:fixed; bottom:0; z-index:2147483000;\n  width:230px; pointer-events:none; opacity:0; visibility:hidden;\n  will-change:transform,opacity; font:16px/1.5 \"Segoe UI\",system-ui,-apple-system,sans-serif;\n}\n#etaMascot.eta-live{visibility:visible}\n/* ══ FLIGHT (v3.0) ══ The old fly-in was a diagonal slide with a bit of tilt.\n   This is an actual flight path: he enters low and far, climbs, banks hard\n   through the middle of the arc, overshoots his mark, then settles. The body\n   rotation follows the direction of travel, which is what sells it — a cape\n   alone does not read as flying if the figure stays upright the whole way.\n   3.1s is long, deliberately. A fast entrance reads as a popup. */\n#etaMascot.eta-fly{animation:etaFlyIn 3.1s cubic-bezier(.22,.68,.28,1) forwards}\n#etaMascot.eta-leaving{animation:etaFlyOut 1.05s cubic-bezier(.5,0,.78,.3) forwards}\n@keyframes etaFlyIn{\n  0%{opacity:0;transform:translate(-124vw,-6vh) rotate(-4deg) scale(.44)}\n  10%{opacity:1}\n  26%{transform:translate(-78vw,-38vh) rotate(-19deg) scale(.6)}\n  48%{transform:translate(-42vw,-52vh) rotate(-25deg) scale(.78)}\n  68%{transform:translate(-14vw,-34vh) rotate(-12deg) scale(.95)}\n  82%{transform:translate(-2vw,-9vh) rotate(7deg) scale(1.06)}\n  91%{transform:translate(1vw,2vh) rotate(-4deg) scale(.99)}\n  96%{transform:translate(0,-1vh) rotate(2deg) scale(1.015)}\n  100%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}\n}\n/* exits the way he came in — climbing away, not sliding off */\n@keyframes etaFlyOut{\n  0%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}\n  22%{transform:translate(3vw,4vh) rotate(-8deg) scale(.97)}\n  100%{opacity:0;transform:translate(64vw,-42vh) rotate(26deg) scale(.5)}\n}\n/* IN-FLIGHT POSTURE — the cape streams back hard and the whole figure\n   stretches slightly along its axis. Removed the moment he lands. */\n#etaMascot.eta-airborne .eta-cape{animation:none;transform:skewX(22deg) scaleY(1.1) scaleX(1.14);\n  transform-origin:130px 118px;transition:transform .5s ease}\n#etaMascot.eta-airborne .eta-fold{opacity:.7}\n#etaMascot.eta-airborne .eta-bob{animation:none}\n/* speed lines, visible only while airborne */\n#etaMascot .eta-trail{opacity:0;transition:opacity .3s}\n#etaMascot.eta-airborne .eta-trail{opacity:.75;animation:etaTrail .55s linear infinite}\n@keyframes etaTrail{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-34}}\n/* ══ LANDING SHOUT ══ he plants, compresses, throws his arms up, and the\n   balloon punches out on the same beat. One event, three parts. */\n#etaMascot.eta-shout .eta-bob{animation:etaLand .7s cubic-bezier(.3,1.6,.5,1) 1}\n@keyframes etaLand{\n  0%{transform:translateY(0) scaleY(1) scaleX(1)}\n  22%{transform:translateY(6px) scaleY(.9) scaleX(1.08)}\n  55%{transform:translateY(-13px) scaleY(1.08) scaleX(.95)}\n  78%{transform:translateY(2px) scaleY(.98) scaleX(1.02)}\n  100%{transform:translateY(0) scaleY(1) scaleX(1)}\n}\n#etaMascot.eta-shout .eta-armL{animation:etaRaiseL .7s cubic-bezier(.3,1.5,.5,1) both}\n#etaMascot.eta-shout .eta-armR{animation:etaRaiseR .7s cubic-bezier(.3,1.5,.5,1) both}\n@keyframes etaRaiseL{0%{transform:rotate(0)}60%{transform:rotate(-34deg)}100%{transform:rotate(-26deg)}}\n@keyframes etaRaiseR{0%{transform:rotate(0)}60%{transform:rotate(30deg)}100%{transform:rotate(22deg)}}\n#etaMascot .eta-armL,#etaMascot .eta-armR{transform-box:fill-box;transform-origin:top center}\n/* the shout rings — two expanding arcs, one pass only, then gone */\n#etaMascot .eta-ring-shout{opacity:0}\n#etaMascot.eta-shout .eta-ring-shout{animation:etaShoutRing .9s ease-out .1s 1}\n#etaMascot.eta-shout .eta-ring-shout:nth-of-type(2){animation-delay:.24s}\n@keyframes etaShoutRing{0%{opacity:.6;transform:scale(.4)}100%{opacity:0;transform:scale(1.9)}}\n#etaMascot .eta-ring-shout{transform-box:fill-box;transform-origin:center}\n#etaMascot.eta-shout .eta-say{animation:etaSayPunch .55s cubic-bezier(.3,1.7,.5,1) both}\n@keyframes etaSayPunch{0%{opacity:0;transform:translateY(16px) scale(.6)}\n  55%{opacity:1;transform:translateY(-3px) scale(1.06)}\n  100%{opacity:1;transform:translateY(0) scale(1)}}\n#etaMascot .eta-svg{display:block;width:100%;height:auto;overflow:visible}\n#etaMascot .eta-bob{animation:etaBob 3.4s ease-in-out infinite}\n@keyframes etaBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}\n#etaMascot .eta-cape{transform-origin:130px 118px;animation:etaCape 2.9s ease-in-out infinite alternate}\n@keyframes etaCape{0%{transform:skewX(-3.5deg) scaleY(.985)}100%{transform:skewX(4deg) scaleY(1.02)}}\n#etaMascot .eta-fold{opacity:.55;animation:etaFold 2.9s ease-in-out infinite alternate}\n@keyframes etaFold{0%{opacity:.2}100%{opacity:.6}}\n#etaMascot .eta-lid{transform-box:fill-box;transform-origin:center top;transform:scaleY(0);animation:etaBlink 5.2s infinite}\n@keyframes etaBlink{0%,92%,100%{transform:scaleY(0)}94%,97%{transform:scaleY(1)}}\n#etaMascot .eta-orb{transform-box:fill-box;transform-origin:center;animation:etaPulse 2.2s ease-in-out infinite}\n@keyframes etaPulse{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.09);opacity:1}}\n#etaMascot .eta-ring{transform-box:fill-box;transform-origin:center;animation:etaSpin 9s linear infinite}\n@keyframes etaSpin{to{transform:rotate(360deg)}}\n#etaMascot .eta-spark{animation:etaSpark 1.9s ease-in-out infinite}\n@keyframes etaSpark{0%,100%{opacity:.25}50%{opacity:1}}\n#etaMascot .eta-circuit{stroke-dasharray:5 9;animation:etaFlow 2.6s linear infinite}\n@keyframes etaFlow{to{stroke-dashoffset:-28}}\n#etaMascot .eta-say{\n  position:absolute; bottom:100%; right:-6px; width:230px; margin-bottom:16px;\n  background:#fff; border:3px solid var(--suit); border-radius:24px;\n  padding:15px 17px 14px; box-shadow:0 12px 30px rgba(15,27,51,.18);\n  opacity:0; transform:translateY(10px) scale(.9); transform-origin:bottom center;\n  transition:opacity .3s ease,transform .35s cubic-bezier(.2,1.5,.4,1);\n  pointer-events:auto; color:#0F1B33; text-align:left;\n}\n#etaMascot.eta-talking .eta-say{opacity:1;transform:translateY(0) scale(1)}\n#etaMascot .eta-say:after{\n  content:\"\";position:absolute;right:calc(50% - 10px);bottom:-13px;width:20px;height:20px;\n  background:#fff;border-right:3px solid var(--suit);border-bottom:3px solid var(--suit);\n  transform:rotate(45deg);border-bottom-right-radius:5px;\n}\n#etaMascot .eta-line{margin:0 0 11px;padding-right:28px;font-size:.92rem;line-height:1.45;font-weight:600}\n#etaMascot .eta-cta{\n  display:block;width:100%;font:inherit;font-size:.88rem;font-weight:700;cursor:pointer;\n  background:var(--orange);border:2px solid var(--orange-dk);color:#fff;\n  border-radius:10px;padding:9px 10px;\n}\n#etaMascot .eta-cta:hover{filter:brightness(1.08)}\n#etaMascot .eta-cta:focus-visible,#etaMascot .eta-x:focus-visible{outline:3px solid var(--suit);outline-offset:2px}\n#etaMascot .eta-x{\n  position:absolute;top:8px;right:9px;width:24px;height:24px;padding:0;cursor:pointer;\n  border-radius:50%;background:#EDF1F8;color:var(--suit);border:0;\n  font:700 15px/1 system-ui;display:grid;place-items:center;\n}\n#etaMascot .eta-x:hover{background:#DCE5F5}\n#etaMascot .eta-hit{position:absolute;inset:auto 0 0 0;height:74%;pointer-events:auto;cursor:pointer}\n#etaMascot .eta-field{\n  width:100%;font:inherit;font-size:.9rem;padding:10px 12px;margin:0 0 9px;\n  border:2px solid var(--silver);border-radius:10px;background:#fff;color:#0F1B33;\n}\n#etaMascot .eta-field:focus{outline:none;border-color:var(--suit)}\n#etaMascot .eta-field::placeholder{color:#9AA8C0}\n#etaMascot .eta-alt{\n  display:block;width:100%;margin:10px 0 0;padding:0;background:none;border:0;cursor:pointer;\n  font:inherit;font-size:.8rem;color:var(--suit);text-decoration:underline;\n}\n#etaMascot .eta-note{margin:9px 0 0;font-size:.76rem;color:#5C6B85;line-height:1.4}\n#etaMascot .eta-err{display:none;margin:0 0 8px;font-size:.79rem;font-weight:600;color:#C0392B}\n#etaMascot .eta-err.on{display:block}\n#etaMascot .eta-hp{position:absolute;left:-9999px;width:0;height:0;overflow:hidden}\n#etaMascot .eta-step[hidden]{display:none}\n#etaMascot .eta-cta[disabled]{opacity:.6;cursor:progress}\n@media (max-width:620px){\n  #etaMascot{width:150px}\n  #etaMascot .eta-say{width:190px;max-width:calc(100vw - 26px);right:-12px;border-radius:20px;padding:12px 14px 11px}\n  #etaMascot .eta-line{font-size:.86rem}\n  @keyframes etaFlyIn{\n    0%{opacity:0;transform:translate(-60vw,-26vh) rotate(-16deg) scale(.6)}\n    18%{opacity:1}\n    60%{transform:translate(-16vw,-24vh) rotate(-8deg) scale(.9)}\n    86%{transform:translate(2vw,2vh) rotate(-3deg) scale(1)}\n    100%{opacity:1;transform:translate(0,0) rotate(0) scale(1)}\n  }\n}\n@media (prefers-reduced-motion:reduce){\n  #etaMascot.eta-fly{animation:etaFade .45s ease forwards}\n  #etaMascot.eta-leaving{animation:etaFadeOut .4s ease forwards}\n  @keyframes etaFadeOut{to{opacity:0}}\n  #etaMascot.eta-shout .eta-bob,#etaMascot.eta-shout .eta-armL,\n  #etaMascot.eta-shout .eta-armR,#etaMascot.eta-shout .eta-say,\n  #etaMascot.eta-shout .eta-ring-shout,#etaMascot.eta-airborne .eta-trail{animation:none}\n  #etaMascot.eta-shout .eta-say{opacity:1;transform:none}\n  #etaMascot .eta-bob,#etaMascot .eta-cape,#etaMascot .eta-fold,#etaMascot .eta-lid,\n  #etaMascot .eta-orb,#etaMascot .eta-ring,#etaMascot .eta-spark,#etaMascot .eta-circuit{animation:none}\n  @keyframes etaFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}\n}\n";
  var SVG = "<svg class=\"eta-svg\" viewBox=\"0 0 260 400\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Cartoon marketing superhero holding a glowing data orb\">\n    <defs>\n      <linearGradient id=\"etaCapeG\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n        <stop offset=\"0\" stop-color=\"#FF8438\"/><stop offset=\"1\" stop-color=\"#D94A00\"/>\n      </linearGradient>\n      <linearGradient id=\"etaSuitG\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n        <stop offset=\"0\" stop-color=\"#3A6BD8\"/><stop offset=\".55\" stop-color=\"#1B3FA0\"/><stop offset=\"1\" stop-color=\"#122C74\"/>\n      </linearGradient>\n      <radialGradient id=\"etaOrbG\" cx=\".38\" cy=\".33\" r=\".78\">\n        <stop offset=\"0\" stop-color=\"#BFF0FF\"/><stop offset=\".45\" stop-color=\"#3FC8FF\"/><stop offset=\"1\" stop-color=\"#0A5FB8\"/>\n      </radialGradient>\n      <radialGradient id=\"etaHalo\" cx=\".5\" cy=\".5\" r=\".5\">\n        <stop offset=\".62\" stop-color=\"#3FC8FF\" stop-opacity=\".38\"/>\n        <stop offset=\"1\" stop-color=\"#3FC8FF\" stop-opacity=\"0\"/>\n      </radialGradient>\n    </defs>\n\n    <g class=\"eta-bob\">\n\n      <!-- ============ CAPE ============ -->\n      <g class=\"eta-cape\">\n        <path d=\"M98 118 C58 168 44 282 58 348 Q90 372 122 348 Q152 372 184 348 Q210 334 204 282 C210 200 190 152 164 118 Z\"\n              fill=\"url(#etaCapeG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n        <path class=\"eta-fold\" d=\"M120 124 C104 200 106 288 116 344\" fill=\"none\" stroke=\"#B33C00\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n        <path class=\"eta-fold\" d=\"M170 126 C182 202 180 288 172 342\" fill=\"none\" stroke=\"#B33C00\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      </g>\n\n      <!-- ============ LEGS ============ -->\n      <path d=\"M100 228 L92 300 L88 352 L122 352 L124 298 L128 228 Z\" fill=\"url(#etaSuitG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <path d=\"M134 228 L138 298 L142 352 L176 352 L172 300 L162 228 Z\" fill=\"url(#etaSuitG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <path d=\"M104 262 L98 316\" fill=\"none\" stroke=\"var(--glow)\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".7\"/>\n      <path d=\"M158 262 L164 316\" fill=\"none\" stroke=\"var(--glow)\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".7\"/>\n      <path d=\"M96 268 L118 262 L120 284 L98 290 Z\" fill=\"var(--silver)\" stroke=\"var(--suit-dk)\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n      <path d=\"M166 268 L144 262 L142 284 L164 290 Z\" fill=\"var(--silver)\" stroke=\"var(--suit-dk)\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n\n      <!-- ============ BOOTS ============ -->\n      <path d=\"M84 346 L124 346 L126 372 Q126 382 114 382 L80 382 Q70 382 72 371 Z\" fill=\"var(--suit-dk)\" stroke=\"#0B1F55\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <path d=\"M140 346 L180 346 L192 371 Q194 382 184 382 L150 382 Q138 382 138 372 Z\" fill=\"var(--suit-dk)\" stroke=\"#0B1F55\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <rect x=\"80\" y=\"342\" width=\"46\" height=\"10\" rx=\"5\" fill=\"var(--orange)\" stroke=\"var(--orange-dk)\" stroke-width=\"2.5\"/>\n      <rect x=\"138\" y=\"342\" width=\"46\" height=\"10\" rx=\"5\" fill=\"var(--orange)\" stroke=\"var(--orange-dk)\" stroke-width=\"2.5\"/>\n\n      <!-- ============ TORSO ============ -->\n      <path d=\"M130 104 C100 104 80 122 76 150 L88 234 L172 234 L184 150 C180 122 160 104 130 104 Z\"\n            fill=\"url(#etaSuitG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4.5\" stroke-linejoin=\"round\"/>\n      <!-- shoulder plates -->\n      <path d=\"M84 128 C94 112 108 106 120 105 L116 126 C106 128 96 134 90 142 Z\" fill=\"var(--silver)\" stroke=\"var(--suit-dk)\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/>\n      <path d=\"M176 128 C166 112 152 106 140 105 L144 126 C154 128 164 134 170 142 Z\" fill=\"var(--silver)\" stroke=\"var(--suit-dk)\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/>\n      <circle cx=\"94\" cy=\"122\" r=\"7\" fill=\"var(--orange)\" stroke=\"var(--suit-dk)\" stroke-width=\"3\"/>\n      <circle cx=\"166\" cy=\"122\" r=\"7\" fill=\"var(--orange)\" stroke=\"var(--suit-dk)\" stroke-width=\"3\"/>\n      <!-- circuit lines -->\n      <path class=\"eta-circuit\" d=\"M90 168 L90 196 L100 206\" fill=\"none\" stroke=\"var(--glow)\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n      <path class=\"eta-circuit\" d=\"M170 168 L170 196 L160 206\" fill=\"none\" stroke=\"var(--glow)\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n\n      <!-- ============ CHEST LOGO: eye + rising arrow ============ -->\n      <path d=\"M100 158 C112 140 148 140 160 158 C148 176 112 176 100 158 Z\" fill=\"#0B1F55\" stroke=\"var(--silver)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <circle cx=\"130\" cy=\"158\" r=\"9\" fill=\"url(#etaOrbG)\"/>\n      <circle cx=\"127\" cy=\"155\" r=\"3\" fill=\"#fff\" opacity=\".85\"/>\n      <path d=\"M96 152 C112 132 152 130 166 142\" fill=\"none\" stroke=\"var(--orange)\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <path d=\"M158 132 L170 140 L160 150\" fill=\"none\" stroke=\"var(--orange)\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\n      <!-- ============ BAR CHART ON ABS ============ -->\n      <rect x=\"106\" y=\"200\" width=\"8\" height=\"12\" rx=\"2\" fill=\"var(--glow)\" opacity=\".85\"/>\n      <rect x=\"118\" y=\"194\" width=\"8\" height=\"18\" rx=\"2\" fill=\"var(--glow)\" opacity=\".85\"/>\n      <rect x=\"130\" y=\"187\" width=\"8\" height=\"25\" rx=\"2\" fill=\"var(--glow)\" opacity=\".85\"/>\n      <rect x=\"142\" y=\"180\" width=\"8\" height=\"32\" rx=\"2\" fill=\"var(--glow)\" opacity=\".85\"/>\n\n      <!-- ============ BELT ============ -->\n      <path d=\"M86 214 L174 214 L172 232 L88 232 Z\" fill=\"var(--orange)\" stroke=\"var(--orange-dk)\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/>\n      <circle cx=\"130\" cy=\"223\" r=\"10\" fill=\"var(--silver)\" stroke=\"var(--suit-dk)\" stroke-width=\"3.5\"/>\n      <circle cx=\"130\" cy=\"223\" r=\"5\" fill=\"url(#etaOrbG)\"/>\n\n      <!-- speed lines behind him, only visible while airborne -->\n      <g class=\"eta-trail\" stroke=\"#9FD8FF\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-dasharray=\"18 16\" fill=\"none\">\n        <path d=\"M196 150 L268 138\"/>\n        <path d=\"M200 196 L282 188\"/>\n        <path d=\"M188 244 L252 240\"/>\n      </g>\n      <!-- shout rings, one pass on landing -->\n      <circle class=\"eta-ring-shout\" cx=\"130\" cy=\"64\" r=\"58\" fill=\"none\" stroke=\"#FFC98A\" stroke-width=\"4\"/>\n      <circle class=\"eta-ring-shout\" cx=\"130\" cy=\"64\" r=\"58\" fill=\"none\" stroke=\"#9FD8FF\" stroke-width=\"3\"/>\n\n      <!-- ============ LEFT ARM (on hip) ============ -->\n      <g class=\"eta-armL\"><path d=\"M172 126 C194 138 206 172 198 200 C192 222 176 232 160 228 L156 210 C170 210 180 198 180 182 C180 164 172 148 162 138 Z\"\n            fill=\"url(#etaSuitG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <path d=\"M158 208 C170 206 174 216 172 226 C166 232 154 232 150 226 C148 216 150 208 158 208 Z\"\n            fill=\"var(--suit-dk)\" stroke=\"#0B1F55\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/>\n      <rect x=\"176\" y=\"192\" width=\"24\" height=\"10\" rx=\"5\" fill=\"var(--orange)\" stroke=\"var(--orange-dk)\" stroke-width=\"2.5\" transform=\"rotate(12 188 197)\"/></g>\n\n      <!-- ============ RIGHT ARM (raised, holding orb) ============ -->\n      <g class=\"eta-armR\"><path d=\"M88 126 C68 124 50 110 42 92 L22 100 C30 130 56 154 84 156 Z\"\n            fill=\"url(#etaSuitG)\" stroke=\"var(--suit-dk)\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n      <rect x=\"26\" y=\"94\" width=\"22\" height=\"10\" rx=\"5\" fill=\"var(--orange)\" stroke=\"var(--orange-dk)\" stroke-width=\"2.5\" transform=\"rotate(-22 37 99)\"/>\n      <path d=\"M40 90 C30 82 18 82 12 90 C6 98 10 110 20 112 C30 114 40 104 40 90 Z\"\n            fill=\"var(--suit-dk)\" stroke=\"#0B1F55\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/></g>\n\n      <!-- ============ ORB ============ -->\n      <circle cx=\"34\" cy=\"60\" r=\"46\" fill=\"url(#etaHalo)\"/>\n      <circle class=\"eta-orb\" cx=\"34\" cy=\"60\" r=\"30\" fill=\"url(#etaOrbG)\" stroke=\"#9FE4FF\" stroke-width=\"2.5\" opacity=\".9\"/>\n      <g class=\"eta-ring\">\n        <ellipse cx=\"34\" cy=\"60\" rx=\"34\" ry=\"12\" fill=\"none\" stroke=\"var(--orange)\" stroke-width=\"3\" opacity=\".85\" transform=\"rotate(-18 34 60)\"/>\n      </g>\n      <!-- icons floating inside -->\n      <circle cx=\"24\" cy=\"49\" r=\"6\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.5\"/>\n      <path d=\"M28 53 L33 58\" stroke=\"#fff\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n      <rect x=\"40\" y=\"50\" width=\"3.5\" height=\"9\" rx=\"1.5\" fill=\"#fff\"/>\n      <rect x=\"46\" y=\"45\" width=\"3.5\" height=\"14\" rx=\"1.5\" fill=\"#fff\"/>\n      <rect x=\"52\" y=\"41\" width=\"3.5\" height=\"18\" rx=\"1.5\" fill=\"#fff\"/>\n      <circle cx=\"26\" cy=\"72\" r=\"4\" fill=\"#fff\"/>\n      <circle cx=\"34\" cy=\"74\" r=\"3\" fill=\"#fff\" opacity=\".8\"/>\n      <circle cx=\"46\" cy=\"71\" r=\"7\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.5\"/>\n      <circle cx=\"46\" cy=\"71\" r=\"2.5\" fill=\"#fff\"/>\n      <path class=\"eta-spark\" d=\"M6 34 L12 40 M62 30 L56 37 M4 88 L11 83\" stroke=\"var(--orange)\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n\n      <!-- ============ NECK + HEAD ============ -->\n      <path d=\"M118 92 L142 92 L142 110 L118 110 Z\" fill=\"var(--skin-dk)\"/>\n      <path d=\"M130 26 C108 26 96 44 96 64 C96 84 112 100 130 100 C148 100 164 84 164 64 C164 44 152 26 130 26 Z\"\n            fill=\"var(--skin)\" stroke=\"#B9835C\" stroke-width=\"3.5\"/>\n      <!-- ears -->\n      <circle cx=\"97\" cy=\"66\" r=\"7\" fill=\"var(--skin)\" stroke=\"#B9835C\" stroke-width=\"3\"/>\n      <circle cx=\"163\" cy=\"66\" r=\"7\" fill=\"var(--skin)\" stroke=\"#B9835C\" stroke-width=\"3\"/>\n      <!-- jaw shade -->\n      <path d=\"M104 78 C112 96 148 96 156 78\" fill=\"none\" stroke=\"var(--skin-dk)\" stroke-width=\"3\" opacity=\".5\" stroke-linecap=\"round\"/>\n      <!-- brows -->\n      <path d=\"M106 52 L122 49\" stroke=\"var(--hair)\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <path d=\"M138 49 L154 52\" stroke=\"var(--hair)\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <!-- eyes -->\n      <ellipse cx=\"114\" cy=\"62\" rx=\"8\" ry=\"9\" fill=\"#fff\" stroke=\"#B9835C\" stroke-width=\"2\"/>\n      <ellipse cx=\"146\" cy=\"62\" rx=\"8\" ry=\"9\" fill=\"#fff\" stroke=\"#B9835C\" stroke-width=\"2\"/>\n      <circle cx=\"115\" cy=\"63\" r=\"4.5\" fill=\"#1B6FD8\"/>\n      <circle cx=\"147\" cy=\"63\" r=\"4.5\" fill=\"#1B6FD8\"/>\n      <circle cx=\"113\" cy=\"60\" r=\"1.8\" fill=\"#fff\"/>\n      <circle cx=\"145\" cy=\"60\" r=\"1.8\" fill=\"#fff\"/>\n      <ellipse class=\"eta-lid\" cx=\"114\" cy=\"62\" rx=\"9\" ry=\"10\" fill=\"var(--skin)\"/>\n      <ellipse class=\"eta-lid\" cx=\"146\" cy=\"62\" rx=\"9\" ry=\"10\" fill=\"var(--skin)\"/>\n      <!-- nose + smile -->\n      <path d=\"M130 66 L127 74 L133 74\" fill=\"none\" stroke=\"#B9835C\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M118 82 Q130 92 142 82\" fill=\"none\" stroke=\"#8E5B3A\" stroke-width=\"3.5\" stroke-linecap=\"round\"/>\n      <!-- hair -->\n      <path d=\"M96 60 C92 34 112 18 132 18 C154 18 168 34 164 58 C158 44 148 38 136 40 C124 42 116 34 116 34 C112 44 104 50 96 60 Z\"\n            fill=\"var(--hair)\" stroke=\"#4E2F18\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/>\n      <path d=\"M120 30 C130 24 146 26 154 36\" fill=\"none\" stroke=\"var(--hair-lt)\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n    </g>\n  </svg>";

  function store(k, v){
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); }
    catch(e){ return null; }
  }

  /* shuffled queue so lines don't repeat until the whole pool is used */
  function nextLine(){
    var q;
    try { q = JSON.parse(store('etaQ') || '[]'); } catch(e){ q = []; }
    if (!q.length){
      q = LINES.map(function(_,i){return i;});
      for (var i = q.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var t = q[i]; q[i] = q[j]; q[j] = t;
      }
    }
    var idx = q.shift();
    store('etaQ', JSON.stringify(q));
    return LINES[idx];
  }

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var box = document.createElement('div');
  box.id = 'etaMascot';
  box.setAttribute('aria-hidden','true');
  box.style.right = RIGHT + 'px';
  box.innerHTML =
    '<div class="eta-say" role="dialog" aria-label="Message from Eye To Ad Media">' +
      '<button class="eta-x" type="button" aria-label="Dismiss">&times;</button>' +
      '<div class="eta-step" data-step="1">' +
        '<p class="eta-line"></p>' +
        '<input class="eta-field" data-site type="text" inputmode="url" autocomplete="url" ' +
               'aria-label="Your website address" placeholder="yoursite.com">' +
        '<button class="eta-cta" type="button" data-go></button>' +
        '<button class="eta-alt" type="button" data-chat>Rather just chat?</button>' +
      '</div>' +
      '<div class="eta-step" data-step="2" hidden>' +
        '<p class="eta-line">Got it. Where do I send what I find?</p>' +
        '<p class="eta-err"></p>' +
        '<input class="eta-field" data-contact type="text" autocomplete="email" ' +
               'aria-label="Your email or phone number" placeholder="Email or phone">' +
        '<div class="eta-hp"><input type="text" name="_honey" tabindex="-1" autocomplete="off"></div>' +
        '<button class="eta-cta" type="button" data-send>Send it over</button>' +
        '<p class="eta-note">No newsletter, no spam. Just a look at your site.</p>' +
      '</div>' +
      '<div class="eta-step" data-step="3" hidden>' +
        '<p class="eta-line" data-result></p>' +
        '<button class="eta-alt" type="button" data-chat>Open the chat instead</button>' +
      '</div>' +
    '</div>' +
    '<div class="eta-hit" role="button" tabindex="0" aria-label="Open message"></div>' +
    SVG;
  document.body.appendChild(box);

  var say    = box.querySelector('[data-step="1"] .eta-line');
  var result = box.querySelector('[data-result]');
  var err    = box.querySelector('.eta-err');
  var site   = box.querySelector('[data-site]');
  var contact= box.querySelector('[data-contact]');
  var goBtn  = box.querySelector('[data-go]');
  var sendBtn= box.querySelector('[data-send]');
  var hit    = box.querySelector('.eta-hit');
  var xBtn   = box.querySelector('.eta-x');
  var steps  = box.querySelectorAll('.eta-step');
  goBtn.textContent = CTA;

  var live = false, talkT, born = Date.now(), shownLine = '', sent = false;

  /* fires only if GA4 is present on the page; silent no-op otherwise */
  function track(name, data){
    try { if (typeof window.gtag === 'function') window.gtag('event', name, data || {}); } catch(e){}
  }

  function step(n){
    for (var i = 0; i < steps.length; i++){
      steps[i].hidden = (steps[i].getAttribute('data-step') !== String(n));
    }
  }

  /* NOTE: narrow() and heroInView() are declared below but used inside land()
     above. Function declarations hoist, so this works — it is not an oversight.
     ── HERO CTA GUARD (v2.0) ──────────────────────────────────────────────
     On a phone the hero's Call button spans nearly the full width, and his
     balloon is anchored to the same corner. Speaking while the hero is on
     screen put a white box over a tappable phone number — which is the one
     thing on this page that is worth actual money today.
     He still LANDS on schedule. He just does not open his mouth until the
     hero has scrolled out of view. If the page has no .hero (every page that
     is not the homepage), this is a no-op and he behaves as before. */
  function narrow(){ return window.innerWidth < 900; }
  function heroInView(){
    if (!narrow()) return false;
    var h = document.querySelector('.hero');
    if (!h) return false;
    try {
      var r = h.getBoundingClientRect();
      return r.bottom > 90;           // any meaningful part of it still showing
    } catch (e) { return false; }
  }

  /* `eta-mascot-live` tells iris.js the corner is occupied. See the v2.0 note
     at the top of this file — she polls for it before showing her bubble. */
  function claimCorner(on){
    try { document.body.classList.toggle('eta-mascot-live', !!on); } catch (e) {}
  }

  var talkTries = 0;
  var holdT = null, exitWatch = null, landScroll = 0, engaged = false;

  /* ══════════════════════════════════════════════════════════════════════
     THE RELAY (v3.0)
     v2 let both characters occupy the corner at once and it was overwhelming
     — his balloon, her balloon, her label and two figures inside one thumb's
     reach. They now take turns and never overlap:

        he flies in  ->  lands and shouts  ->  holds  ->  flies out
                                                              |
                                                              v
                                            iris.js reveals the orb

     He leaves on whichever comes first: the visitor scrolling EXIT_SCROLL of
     the page since he landed, or EXIT_MS elapsing. Either way he signals
     __etaDone and drops `eta-mascot-live`, which is Iris's cue.

     If the visitor ENGAGES — taps him, types in the field, opens the chat —
     he stops the exit timer entirely. Never yank a widget out from under
     somebody mid-sentence.
     ══════════════════════════════════════════════════════════════════════ */
  var EXIT_SCROLL = 0.28;   // 28% of page height scrolled since landing
  var EXIT_MS     = 36000;  // ...or this long, whichever lands first
  /* Lengthened from 20%/26s on Sept 11 2026 — he was leaving before people had
     finished reading him. These two numbers are the whole dwell-time dial; if
     he ever feels clingy, lower them rather than touching the relay logic. */

  function markEngaged(){
    engaged = true;
    clearTimeout(holdT); clearInterval(exitWatch);
  }

  function docH(){
    var d = document.documentElement, b = document.body;
    return Math.max(d.scrollHeight, b ? b.scrollHeight : 0, window.innerHeight);
  }

  function beginExitWatch(){
    landScroll = window.pageYOffset || 0;
    clearInterval(exitWatch);
    exitWatch = setInterval(function(){
      if (!live || engaged){ clearInterval(exitWatch); return; }
      var moved = Math.abs((window.pageYOffset || 0) - landScroll);
      if (moved >= docH() * EXIT_SCROLL){ clearInterval(exitWatch); leave(); }
    }, 400);
    clearTimeout(holdT);
    holdT = setTimeout(function(){ if (live && !engaged) leave(); }, EXIT_MS);
  }

  function tryTalk(){
    if (!live) return;
    if (heroInView() && talkTries < 60){ talkTries++; talkT = setTimeout(tryTalk, 1000); return; }
    box.classList.remove('eta-airborne');
    box.classList.add('eta-talking','eta-shout');
    track('mascot_open', {hook_line: shownLine});
    setTimeout(function(){ box.classList.remove('eta-shout'); }, 1000);
    beginExitWatch();
  }

  var landTries = 0;
  function land(){
    if (live) return;
    /* HERO GUARD, PART TWO (v2.0.1). Holding his SPEECH was not enough — at
       230px wide and pinned to bottom:0 he physically covers the hero's Call
       button on a phone, which is the most valuable tappable element on the
       page. He now waits to fly in at all until the hero has scrolled away.
       He is an attention-getter for people who did not act on the fold; he is
       not supposed to compete with the fold itself. Desktop is unaffected —
       narrow() gates the whole thing. */
    if (heroInView() && landTries < 90){ landTries++; setTimeout(land, 900); return; }
    var count = parseInt(store('etaSeen') || '0', 10);
    if (count >= MAX) return;
    store('etaSeen', count + 1);
    live = true;
    claimCorner(true);
    shownLine = nextLine();
    say.textContent = shownLine;
    window.__etaDone = false;
    engaged = false;
    box.classList.remove('eta-leaving');
    box.classList.add('eta-live','eta-fly','eta-airborne');
    box.setAttribute('aria-hidden','false');
    track('mascot_appear', {page_path: location.pathname});
    clearTimeout(talkT);
    talkTries = 0;
    /* 3.1s flight, then he lands and shouts */
    talkT = setTimeout(tryTalk, 3000);
  }

  function leave(){
    box.classList.remove('eta-talking','eta-shout');
    box.classList.add('eta-leaving','eta-airborne');   // cape streams again on the way out
    clearTimeout(talkT);
    clearTimeout(holdT);
    clearInterval(exitWatch);
    claimCorner(false);
    setTimeout(function(){
      box.classList.remove('eta-fly','eta-leaving','eta-live','eta-airborne');
      box.setAttribute('aria-hidden','true');
      live = false;
      /* HANDOFF. iris.js polls this flag and brings the orb out. It is the
         third and final piece of contract between these two files, alongside
         `ir-panel-open` and `eta-mascot-live`. */
      window.__etaDone = true;
      try { document.dispatchEvent(new CustomEvent('eta:done')); } catch (e) {}
    }, 1050);
  }

  function openChat(){
    markEngaged();
    box.classList.remove('eta-talking');
    claimCorner(false);
    /* Handing straight to Iris — he should not still be standing there while
       her panel is open, so he exits on his way out the door. */
    leave();
    track('mascot_to_chat', {});
    if (typeof window.openIris === 'function') { window.openIris(); return; }
    var b = document.querySelector('#iris-launcher,.iris-launcher,[data-iris-open]');
    if (b) b.click();
  }

  function valid(v){
    v = (v || '').trim();
    if (v.indexOf('@') > 0 && v.indexOf('.') > v.indexOf('@')) return true;
    return (v.replace(/\D/g,'').length >= 10);
  }

  function payload(){
    return {
      website:  (site.value || '').trim() || 'not given',
      contact:  contact.value.trim(),
      hook_line: shownLine,
      page:     location.href,
      page_title: document.title,
      submitted: new Date().toLocaleString(),
      source:   'homepage mascot',
      _subject: 'Mascot lead - ' + ((site.value || '').trim() || location.hostname),
      _template:'table',
      _captcha: 'false'
    };
  }

  /* endpoint assembled at submit time, never sitting in the source as a whole string */
  function endpoint(ajax){
    return 'https://formsubmit.co/' + (ajax ? 'ajax/' : '') + ['info','eyetoad.com'].join('@');
  }

  /* stage two: hidden form post into an iframe. delivery cannot be confirmed from here */
  function fallbackPost(data){
    var frame = document.createElement('iframe');
    frame.name = 'etaSink_' + Date.now();
    frame.style.display = 'none';
    document.body.appendChild(frame);
    var f = document.createElement('form');
    f.method = 'POST';
    f.action = endpoint(false);
    f.target = frame.name;
    f.style.display = 'none';
    for (var k in data){
      if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
      var i = document.createElement('input');
      i.type = 'hidden'; i.name = k; i.value = data[k];
      f.appendChild(i);
    }
    document.body.appendChild(f);
    f.submit();
  }

  function finish(state){
    step(3);
    if (state === 'confirmed'){
      result.textContent = 'Sent. I will take a look at your site and get back to you.';
      track('mascot_lead', {status:'confirmed', hook_line: shownLine});
    } else if (state === 'unconfirmed'){
      result.textContent = 'Sent, but I could not confirm it landed. If you do not hear back, call 1-800-481-8638.';
      track('mascot_lead', {status:'unconfirmed', hook_line: shownLine});
    } else {
      result.textContent = 'That did not go through. Call or text 1-800-481-8638 and I will take care of it.';
      track('mascot_lead', {status:'failed', hook_line: shownLine});
    }
  }

  function send(){
    if (sent) return;
    if (box.querySelector('[name="_honey"]').value !== '') { finish('confirmed'); return; }
    if (Date.now() - born < 3000) { finish('confirmed'); return; }
    if (!valid(contact.value)){
      err.textContent = 'Need a full email address or a 10-digit phone number.';
      err.classList.add('on');
      contact.focus();
      return;
    }
    err.classList.remove('on');
    sent = true;
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    var data = payload();

    var done = false;
    var guard = setTimeout(function(){
      if (done) return;
      done = true;
      try { fallbackPost(data); finish('unconfirmed'); } catch(e){ finish('failed'); }
    }, 8000);

    try {
      fetch(endpoint(true), {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        body: JSON.stringify(data)
      }).then(function(r){ return r.ok ? r.json() : null; })
        .then(function(j){
          if (done) return;
          done = true; clearTimeout(guard);
          if (j && (j.success === true || j.success === 'true')) finish('confirmed');
          else { try { fallbackPost(data); finish('unconfirmed'); } catch(e){ finish('failed'); } }
        })
        .catch(function(){
          if (done) return;
          done = true; clearTimeout(guard);
          try { fallbackPost(data); finish('unconfirmed'); } catch(e){ finish('failed'); }
        });
    } catch(e){
      done = true; clearTimeout(guard);
      try { fallbackPost(data); finish('unconfirmed'); } catch(e2){ finish('failed'); }
    }
  }

  goBtn.addEventListener('click', function(){
    markEngaged();
    step(2);
    track('mascot_step2', {has_site: !!(site.value || '').trim()});
    setTimeout(function(){ contact.focus(); }, 60);
  });
  sendBtn.addEventListener('click', send);
  site.addEventListener('keydown', function(e){ if (e.key === 'Enter') goBtn.click(); });
  contact.addEventListener('keydown', function(e){ if (e.key === 'Enter') send(); });

  /* Tapping him re-opens the balloon; while it is open he holds the floor
     again, and releases 15s after it closes or immediately when he is
     dismissed. Same contract, driven by the visitor instead of a timer. */
  function toggleSay(){
    markEngaged();
    var open = box.classList.toggle('eta-talking');
    if (open) claimCorner(true); else { claimCorner(false); leave(); }
  }
  hit.addEventListener('click', toggleSay);
  hit.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleSay(); }
  });
  var chatBtns = box.querySelectorAll('[data-chat]');
  for (var c = 0; c < chatBtns.length; c++) chatBtns[c].addEventListener('click', openChat);
  xBtn.addEventListener('click', leave);

  setTimeout(land, DELAY);

  /* manual hooks for testing or custom triggers */
  window.etaMascot = { show: land, hide: leave, replay: function(){
    try{ sessionStorage.removeItem('etaSeen'); }catch(e){}
    box.classList.remove('eta-fly','eta-talking','eta-leaving','eta-live');
    claimCorner(false);
    live = false; sent = false; sendBtn.disabled = false; sendBtn.textContent = 'Send it over';
    err.classList.remove('on'); site.value = ''; contact.value = ''; step(1);
    void box.offsetWidth; land();
  }};
})();
