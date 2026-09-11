/*!
================================================================================
  IRIS — Eye To Ad Media Growth Assistant · v7.0
  v7.0 (Sept 11 2026): CRYSTAL ORB launcher — before the first open the
  launcher is a glowing orb labelled "Meet the marketing wizard"; one click
  bursts it in a puff and Iris arrives, then the panel opens. Proactive bubble
  rebuilt as a white comic balloon with a real tail. Staff flame got its glow
  back as a genuine SVG filter plus a pulsing bloom, and three more sparks.
  Pill carries a slow shimmer sweep. NOTHING FLASHES — every animation added
  here runs on a 2.6s+ cycle, well outside the WCAG 2.3.1 three-per-second
  threshold, and the whole set goes still under prefers-reduced-motion.
  Knowledge base expanded with a `tips` family of sourced marketing gems, a
  much wider conversational layer (good day / bad day / burned before / just
  browsing / maybe), seven more industry families, an explicit excluded-
  industries policy entry, and far broader yes/no slang coverage. Messages can
  now carry safe internal links. Corner handoff with /mascot.js: he speaks
  first, she waits on `eta-mascot-live`.
  v6.0 (Sept 10 2026): new character artwork — a growth wizard with a flame-
  crowned staff and the one-eyed Eye Toad crest, drawn in SVG and namespaced
  irx-* so nothing can collide with the host page. Launcher and the panel
  avatar share one drawing. Pill and proactive bubble restyled. Knowledge base
  price corrected to $79.99. window.openIris()/closeIris() exposed for
  /mascot.js. Everything below boot() is otherwise the v5.7 logic.
  EXTERNALIZED Sep 2 2026 from the inline block that used to sit before </body>
  on every page.
================================================================================
  WHAT THIS FILE IS
  The entire Iris widget in one file: its stylesheet, its markup, and its
  script. It injects everything itself, so integrating it on any page is ONE
  line placed immediately before that page's closing </body> tag:

      <script src="/iris.js" defer></script>

  Nothing else is required. Delete the old inline Iris block from the page at
  the same time — if both are present you get two Iris widgets.

  FONT: Iris needs the 'Outfit' family. If the host page already requests it
  (eyetoad.com's homepage does, in its single Google Fonts request), this file
  leaves it alone. If the page does NOT request Outfit, ensureFont() injects
  the stylesheet link itself. So this file is safe to drop on any page as-is.

  GUARD: __IRIS_LOADED__ means including the script twice on one page is
  harmless — the second copy returns immediately.

  MOUNT TIMING: the original script called getElementById at its top level, so
  it has to run AFTER the markup exists. mount() injects the markup and then
  calls boot(), which contains the original script VERBATIM. That ordering is
  the whole reason boot() is a function rather than an IIFE at file scope. Do
  not "simplify" it by hoisting the contents out.

  EVERYTHING BELOW boot() IS THE ORIGINAL v5.7 SCRIPT, UNCHANGED — including
  its own version history, its claims policy, and every knowledge-base answer.
  Read those comments before editing anything in it.

  LEADS GO TO: info@eyetoad.com — change LEAD_EMAIL / FS_POST / FS_AJAX in the
  CONFIG block near the top of boot() and nothing else.
================================================================================
*/
(function(){
'use strict';

/* Loading twice on one page would produce two widgets. */
if (window.__IRIS_LOADED__) return;
window.__IRIS_LOADED__ = true;

/* Belt and braces: if a page still has the OLD inline block, do not add a
   second one on top of it. Remove the inline block from that page. */
if (document.getElementById('irisw')) return;

var IRIS_CSS = `/* ══ ISOLATION ══ all:initial walls the widget off from host page CSS ══ */
#irisw{all:initial}
#irisw,#irisw *,#irisw *::before,#irisw *::after{
  box-sizing:border-box;margin:0;padding:0;
  font-family:'Outfit',system-ui,-apple-system,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased;
}
#irisw{
  position:fixed;right:20px;bottom:24px;z-index:2147483640;display:block;
  line-height:1.5;color:#dce9f5;
}
@media(max-width:580px){#irisw{right:14px;bottom:20px}}

/* ══════════════════ LAUNCHER ══════════════════ */
.ir-launch{display:flex;align-items:center;gap:10px;flex-direction:row-reverse;
  transition:opacity .32s ease,transform .32s ease}
.ir-launch.ir-dim{opacity:.26;transform:scale(.84)}
.ir-launch.ir-dim:hover{opacity:1;transform:scale(1)}
/* ir-gone is used by the hero-collision guard: on mobile the launcher and the
   "Grow my business" pill used to sit directly on top of the VIP pass ribbon
   and price in the hero. It now hides completely until the hero scrolls away.
   Desktop is unaffected — the hero form occupies that side of the layout. */
.ir-launch.ir-gone{opacity:0;pointer-events:none;transform:scale(.6)}
/* ir-await: the relay. Held back until the mascot has left the stage, or
   released on a short timer when there is no mascot on the page at all.
   Separate class from ir-gone because the two guards release on different
   conditions and must not clear one another. */
.ir-launch.ir-await{opacity:0;pointer-events:none;transform:translateY(14px) scale(.7)}

.ir-fab{
  width:68px;height:68px;flex-shrink:0;border-radius:50%;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;position:relative;padding:0;
  background:radial-gradient(circle at 34% 28%,#ffb066 0%,#ff7a2f 44%,#e8500f 100%);
  box-shadow:0 10px 34px rgba(255,87,34,.5),0 3px 10px rgba(0,0,0,.4),
             inset 0 2px 0 rgba(255,255,255,.28),inset 0 -3px 8px rgba(0,0,0,.22);
  transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s;
  outline:none;overflow:visible;
}
.ir-fab:hover{transform:scale(1.09) rotate(-3deg)}
.ir-fab:active{transform:scale(.96)}
.ir-fab:focus-visible{outline:3px solid #ffd9a0;outline-offset:4px}
.ir-fab svg{width:58px;height:62px;display:block;overflow:visible}

/* halo ping */
.ir-fab::after{
  content:'';position:absolute;inset:-2px;border-radius:50%;pointer-events:none;
  box-shadow:0 0 0 0 rgba(255,122,47,.5);animation:ir-ping 4.2s ease-out infinite;
}
@keyframes ir-ping{0%{box-shadow:0 0 0 0 rgba(255,122,47,.5)}
  70%,100%{box-shadow:0 0 0 20px rgba(255,122,47,0)}}


/* ══════════════════ CRYSTAL ORB (v7.0) ══════════════════
   Before the first open, the launcher is not Iris — it is a glowing orb.
   Curiosity outperforms a labelled chat button for first clicks, and the orb
   is consistent with the character already being a wizard.

   ACCESSIBILITY — READ BEFORE CHANGING ANY TIMING BELOW.
   Nothing here flashes. The WCAG 2.3.1 threshold is three flashes per second;
   every animation in this block runs on a 2.6s cycle or slower and changes
   opacity/scale gradually rather than switching states. That is a deliberate
   liability decision, not an aesthetic one. If you speed any of these up past
   roughly 2s, you are re-introducing a seizure risk. Don't.
   The whole block also goes still under prefers-reduced-motion (bottom of this
   stylesheet), and the launcher keeps a real button role + aria-label so a
   screen reader announces it as a chat control, not decoration. */
.ir-orb-wrap{position:absolute;inset:0;display:none;align-items:center;justify-content:center;
  border-radius:50%;pointer-events:none}
.ir-launch.ir-orb-mode .ir-orb-wrap{display:flex}
.ir-launch.ir-orb-mode .ir-fab > svg:not(.ir-orb){opacity:0}
/* THE BED (v7.1). The first pass had a huge multi-layer bloom that washed out
   the ball itself — the glow was reading as the object. Halved the spreads and
   dropped the opacities so the halo sits BEHIND the sphere instead of eating
   it, and made the fab itself transparent: the orb SVG now carries its own
   body, so there is no gradient disc competing with the artwork drawn on top
   of it. Launcher also grows 68 -> 88px in orb mode so the detail is visible
   at arm's length on a phone. */
.ir-launch.ir-orb-mode .ir-fab{
  width:88px;height:88px;
  background:transparent;
  /* ══ NO BOX-SHADOW AT ALL (v7.3) ══
     v7.2 removed the dark drop shadow and the ring was STILL there. The cause
     was not the shadow colour — it was the seam. A box-shadow glow starts at
     the element's 88px edge, while the SVG's own aura faded out well before
     that, leaving an unlit gap between the two that read as a dark ring on a
     dark page. Two glow systems with different falloffs will always produce a
     band where they meet.
     The entire glow is now drawn INSIDE the SVG as one continuous radial
     gradient that overflows the viewBox. One falloff, no seam, no ring.
     Do not reintroduce box-shadow here. */
  box-shadow:none;
}
/* the halo ping is for the orange fab; it double-glows the orb. Off in orb mode. */
.ir-launch.ir-orb-mode .ir-fab::after{display:none}
.ir-orb{width:92px!important;height:92px!important;overflow:visible}
/* the whole ball turns, slowly — 26s, so it reads as drifting rather than spinning */
.ir-orb-turn{transform-box:fill-box;transform-origin:center;animation:ir-orb-spin 26s linear infinite}
.ir-orb-facet{transform-box:fill-box;transform-origin:center;animation:ir-orb-spin 34s linear infinite reverse}
.ir-orb-star{transform-box:fill-box;transform-origin:center;animation:ir-star 4.8s ease-in-out infinite}
.ir-orb-star:nth-of-type(2){animation-delay:1.6s}
.ir-orb-star:nth-of-type(3){animation-delay:3.1s}
/* ══ THE GLOW, now SVG-side (v7.3) ══ breathes on a 5.4s cycle. Because it is
   a gradient rather than a stack of shadows, it fades to nothing smoothly and
   there is no edge anywhere in it. */
.ir-orb-glow{transform-box:fill-box;transform-origin:center;animation:ir-glow 5.4s ease-in-out infinite}
@keyframes ir-glow{0%,100%{opacity:.72;transform:scale(1)}50%{opacity:1;transform:scale(1.09)}}

/* ══ GLYPH CAROUSEL (v7.3) ══ six marketing symbols taking turns inside the
   glass — search, chart, map pin, star, chat, and the Eye To Ad eye. Each
   holds for ~3s of an 18s loop, cross-fading with a slight turn. The eye is
   now one of six rather than the only thing in there.
   18s / 6 = a symbol change every three seconds, and each transition takes a
   full second. Nothing here is remotely near a flash. */
.ir-glyph{transform-box:fill-box;transform-origin:50px 52px;opacity:0;
  animation:ir-glyph 18s ease-in-out infinite}
.ir-glyph:nth-of-type(2){animation-delay:3s}
.ir-glyph:nth-of-type(3){animation-delay:6s}
.ir-glyph:nth-of-type(4){animation-delay:9s}
.ir-glyph:nth-of-type(5){animation-delay:12s}
.ir-glyph:nth-of-type(6){animation-delay:15s}
@keyframes ir-glyph{
  0%{opacity:0;transform:scale(.72) rotate(-14deg)}
  4%{opacity:.85;transform:scale(1) rotate(0deg)}
  14%{opacity:.85;transform:scale(1) rotate(0deg)}
  19%{opacity:0;transform:scale(.78) rotate(12deg)}
  100%{opacity:0;transform:scale(.72) rotate(-14deg)}
}

/* STEAM (v7.2) — soft blurred wisps drifting up off the ball, like heat off a
   surface. 7.5s cycle, opacity peaking at .5, heavily blurred: the eye catches
   the drift in peripheral vision and never registers a transition. This is the
   "fabric moving in air" effect, not a pulse. Nowhere near a flash. */
.ir-orb-wisp{transform-box:fill-box;transform-origin:center bottom;
  animation:ir-wisp 7.5s ease-in-out infinite}
.ir-orb-wisp:nth-of-type(2){animation-delay:2.5s;animation-duration:8.6s}
.ir-orb-wisp:nth-of-type(3){animation-delay:5s;animation-duration:6.9s}
@keyframes ir-wisp{
  0%{opacity:0;transform:translateY(4px) scaleX(1) scaleY(.7)}
  25%{opacity:.5}
  60%{opacity:.34;transform:translateY(-16px) scaleX(1.25) scaleY(1.15)}
  100%{opacity:0;transform:translateY(-34px) scaleX(1.7) scaleY(1.5)}
}
@keyframes ir-star{0%,100%{opacity:.15;transform:scale(.7) rotate(0deg)}
  50%{opacity:1;transform:scale(1.15) rotate(45deg)}}
.ir-orb-core{transform-box:fill-box;transform-origin:center;animation:ir-orb-core 5.2s ease-in-out infinite}
@keyframes ir-orb-core{0%,100%{opacity:.82;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
.ir-orb-neb{transform-box:fill-box;transform-origin:center;animation:ir-orb-spin 14s linear infinite}
.ir-orb-neb2{transform-box:fill-box;transform-origin:center;animation:ir-orb-spin 22s linear infinite reverse}
@keyframes ir-orb-spin{to{transform:rotate(360deg)}}
.ir-orb-ring{transform-box:fill-box;transform-origin:center;animation:ir-orb-spin 11s linear infinite}
.ir-orb-mote{animation:ir-mote 3.4s ease-in-out infinite}
.ir-orb-mote:nth-of-type(2){animation-delay:.8s}
.ir-orb-mote:nth-of-type(3){animation-delay:1.7s}
.ir-orb-mote:nth-of-type(4){animation-delay:2.4s}
@keyframes ir-mote{0%,100%{opacity:.2;transform:translateY(2px)}50%{opacity:.95;transform:translateY(-3px)}}

/* POOF — the orb bursts and Iris is standing there. Runs once, ~700ms. */
.ir-poof{position:absolute;inset:-18px;display:none;pointer-events:none;overflow:visible}
.ir-launch.ir-poofing .ir-poof{display:block}
.ir-launch.ir-poofing .ir-orb-wrap{animation:ir-orb-burst .42s ease-in forwards}
@keyframes ir-orb-burst{0%{opacity:1;transform:scale(1)}55%{opacity:.9;transform:scale(1.28)}
  100%{opacity:0;transform:scale(.3)}}
.ir-launch.ir-poofing .ir-fab > svg:not(.ir-orb){animation:ir-iris-arrive .6s cubic-bezier(.34,1.4,.64,1) .22s both}
@keyframes ir-iris-arrive{0%{opacity:0;transform:scale(.55) translateY(8px)}
  60%{opacity:1}100%{opacity:1;transform:scale(1) translateY(0)}}
.ir-pf{transform-box:fill-box;transform-origin:center;animation:ir-pf-go .72s ease-out forwards}
.ir-pf:nth-of-type(2){animation-delay:.04s}.ir-pf:nth-of-type(3){animation-delay:.08s}
.ir-pf:nth-of-type(4){animation-delay:.02s}.ir-pf:nth-of-type(5){animation-delay:.1s}
.ir-pf:nth-of-type(6){animation-delay:.06s}.ir-pf:nth-of-type(7){animation-delay:.12s}
.ir-pf:nth-of-type(8){animation-delay:.09s}
@keyframes ir-pf-go{0%{opacity:0;transform:scale(.2)}22%{opacity:.95}
  100%{opacity:0;transform:scale(2.3)}}

/* ── full figure: she gets a proper entrance when the panel opens, then the
   conversation scrolls over her. Draws from the same <g id="irx-iris"> as the
   launcher, so the artwork exists once in the file. ── */
.ir-stage{display:flex;flex-direction:column;align-items:center;padding:6px 0 14px;
  animation:ir-stage-in .55s cubic-bezier(.34,1.3,.64,1) both}
.ir-stage-art{width:132px;height:auto;display:block;overflow:visible;
  filter:drop-shadow(0 14px 26px rgba(0,0,0,.55))}
.ir-stage-cap{margin-top:8px;font-size:11px;font-weight:700;letter-spacing:.13em;
  text-transform:uppercase;color:#5d7896}
@keyframes ir-stage-in{from{opacity:0;transform:translateY(16px) scale(.92)}
  to{opacity:1;transform:none}}
@media(max-height:640px){.ir-stage-art{width:104px}}

/* ── Iris character animation (namespaced irx-*) ── */

.irx-float{animation:irxFloat 5s ease-in-out infinite}
@keyframes irxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.irx-hem{transform-origin:85px 150px;animation:irxHem 4.2s ease-in-out infinite alternate}
@keyframes irxHem{0%{transform:skewX(-1.6deg)}100%{transform:skewX(1.8deg)}}
.irx-lid{transform-box:fill-box;transform-origin:center top;transform:scaleY(0);animation:irxBlink 6s infinite}
@keyframes irxBlink{0%,93%,100%{transform:scaleY(0)}95%,97.5%{transform:scaleY(1)}}
.i-stafflid{transform-box:fill-box;transform-origin:center top;transform:scaleY(0);animation:irxBlink 6s infinite .9s}
/* flame: three tongues, each flickering on its own timer and origin so the
   silhouette never repeats. Anchored at the base — it does not rotate. */
.irx-flame-a,.irx-flame-b,.irx-flame-c{transform-box:fill-box;transform-origin:center bottom}
.irx-flame-a{animation:irxFlameA 1.7s ease-in-out infinite alternate}
.irx-flame-b{animation:irxFlameB 1.15s ease-in-out infinite alternate}
.irx-flame-c{animation:irxFlameC .85s ease-in-out infinite alternate}
@keyframes irxFlameA{0%{transform:scaleY(.94) scaleX(1.04) skewX(-3deg)}100%{transform:scaleY(1.1) scaleX(.95) skewX(4deg)}}
@keyframes irxFlameB{0%{transform:scaleY(1.08) skewX(3deg)}100%{transform:scaleY(.92) skewX(-4deg)}}
@keyframes irxFlameC{0%{transform:scaleY(.9) skewX(-2deg)}100%{transform:scaleY(1.14) skewX(3deg)}}
/* STAFF GLOW (v7.0) — the flame lost its halo in an earlier pass. It is back
   as a real SVG blur filter plus a soft pulsing bloom behind the tongues, so
   the light reads as coming OFF the flame rather than being painted on it.
   4.2s cycle: slow bloom, no flash. */
.irx-bloom{transform-box:fill-box;transform-origin:center;animation:irxBloom 4.2s ease-in-out infinite}
@keyframes irxBloom{0%,100%{opacity:.34;transform:scale(.92)}50%{opacity:.78;transform:scale(1.16)}}
.irx-flame-a,.irx-flame-b,.irx-flame-c{filter:url(#irxFlameGlow)}
/* sparks rise off the top and fade — upward only */
.irx-spark{animation:irxRise 2.6s ease-out infinite}
.irx-spark:nth-of-type(2){animation-delay:.5s}
.irx-spark:nth-of-type(3){animation-delay:1s}
.irx-spark:nth-of-type(4){animation-delay:1.5s}
.irx-spark:nth-of-type(5){animation-delay:2s}
.irx-spark:nth-of-type(6){animation-delay:.85s}
.irx-spark:nth-of-type(7){animation-delay:1.75s}
.irx-spark:nth-of-type(8){animation-delay:2.35s}
@keyframes irxRise{
  0%{opacity:0;transform:translate(0,10px) scale(.5)}
  18%{opacity:1}
  60%{opacity:.85}
  100%{opacity:0;transform:translate(-4px,-30px) scale(.25)}
}
.irx-toadlid{transform-box:fill-box;transform-origin:center top;transform:scaleY(0);animation:irxBlink 4.4s infinite 2.1s}
.irx-croak{transform-box:fill-box;transform-origin:center bottom;animation:irxCroak 4.4s ease-in-out infinite}
@keyframes irxCroak{0%,86%,100%{transform:scaleY(1)}92%{transform:scaleY(1.09) scaleX(.97)}}
.irx-glow{transform-box:fill-box;transform-origin:center;animation:irxGlow 3s ease-in-out infinite}
@keyframes irxGlow{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.9;transform:scale(1.12)}}
.irx-pupil{animation:irxLook 7s ease-in-out infinite}
@keyframes irxLook{0%,40%,100%{transform:translateX(0)}50%,62%{transform:translateX(2.4px)}}
.irx-dot{animation:irxTwinkle 3.4s ease-in-out infinite}
.irx-dot:nth-of-type(2){animation-delay:.5s}
.irx-dot:nth-of-type(3){animation-delay:1.1s}
.irx-dot:nth-of-type(4){animation-delay:1.7s}
.irx-dot:nth-of-type(5){animation-delay:2.3s}
@keyframes irxTwinkle{0%,100%{opacity:.25}50%{opacity:1}}

/* label pill — always visible, tells people what this is */
.ir-pill{
  display:flex;align-items:center;gap:8px;
  background:linear-gradient(140deg,#12243d,#0b1728);color:#ffe2c8;
  border:1px solid rgba(255,122,47,.5);
  padding:10px 16px 10px 13px;border-radius:12px 12px 4px 12px;
  font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;
  box-shadow:0 8px 26px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);
  transition:all .18s ease;letter-spacing:.005em;
}
.ir-pill-dot{width:7px;height:7px;border-radius:50%;background:#ff7a2f;flex:none;
  box-shadow:0 0 0 0 rgba(255,122,47,.6);animation:ir-pilse 2.6s ease-out infinite}
@keyframes ir-pilse{0%{box-shadow:0 0 0 0 rgba(255,122,47,.6)}70%,100%{box-shadow:0 0 0 9px rgba(255,122,47,0)}}
/* SHIMMER (v7.0) — a light sweep travelling across the pill every 3.4s.
   This is the "fabric moving in air" effect: peripheral motion that catches
   the eye without a single on/off transition anywhere in it. It is a moving
   gradient, not a blink. Do not convert this to an opacity toggle. */
.ir-pill{position:relative;overflow:hidden}
.ir-pill::after{content:'';position:absolute;top:0;left:-60%;width:45%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,196,140,.26),transparent);
  transform:skewX(-18deg);animation:ir-shimmer 3.4s ease-in-out infinite;pointer-events:none}
@keyframes ir-shimmer{0%{left:-60%}55%,100%{left:130%}}
.ir-pill:hover{background:#132339;color:#fff;border-color:#ff7a2f;transform:translateX(-2px)}
/* PILL IN ORB MODE (v7.2) — NOW SITS UNDER THE ORB, NOT BESIDE IT.
   v7.1 kept it in the default row-reverse position, which meant a ~200px text
   bar reaching leftward across whatever was standing there — in practice, the
   mascot. Hiding it while he was on screen fixed the overlap and created a
   worse bug: the release for 'eta-mascot-live' only ran when he LEFT, so on a
   page where nobody dismissed him the label was hidden permanently and the orb
   shipped with no wording at all.
   Stacking it below removes the horizontal reach entirely, so there is nothing
   to collide with and nothing to hide. The label is now always visible. Do not
   reintroduce a rule that hides the pill off another component's state. */
.ir-launch.ir-orb-mode{flex-direction:column;align-items:center;gap:9px}
.ir-launch.ir-orb-mode .ir-pill{
  background:linear-gradient(140deg,#1b2e52,#10203a);border-color:rgba(170,215,255,.55);
  color:#eaf6ff;white-space:normal;max-width:150px;line-height:1.28;
  text-align:center;justify-content:center;align-items:center;
  border-radius:12px;padding:9px 13px;font-size:12.5px;font-weight:700;
  box-shadow:0 6px 22px rgba(6,16,34,.5),0 0 18px rgba(150,205,255,.22)}
.ir-launch.ir-orb-mode .ir-pill-dot{display:none}
.ir-pill{transition:opacity .3s ease,transform .3s ease,background .18s,color .18s,border-color .18s}
.ir-launch.ir-orb-mode .ir-pill-dot{background:#9fd8f7;
  box-shadow:0 0 0 0 rgba(159,216,247,.7);animation:ir-pilse-c 2.8s ease-out infinite}
@keyframes ir-pilse-c{0%{box-shadow:0 0 0 0 rgba(159,216,247,.7)}70%,100%{box-shadow:0 0 0 10px rgba(159,216,247,0)}}
.ir-pill:focus-visible{outline:2px solid #ffd9a0;outline-offset:3px}
@media(max-width:400px){.ir-pill{font-size:12px;padding:8px 12px}}

/* PROACTIVE BUBBLE (v7.0) — rebuilt as a classic white comic speech balloon.
   The old dark gradient box read as a system notification and was ignored; a
   white bubble with a real tail reads as a character SAYING something, which
   is the whole point. Big rounded corners, generous tail, dark text for
   contrast (the old #cfe0f2 on navy was marginal at 13px). */
.ir-bubble{
  position:absolute;right:0;bottom:92px;width:286px;
  background:#fff;border:3px solid #14305a;border-radius:26px;
  padding:16px 18px 15px;
  box-shadow:0 22px 52px rgba(6,16,34,.44),0 4px 12px rgba(6,16,34,.22);
  display:none;animation:ir-pop .38s cubic-bezier(.34,1.5,.64,1) forwards;color:#0F1B33;
}
/* tail: a rotated square patched over the border so it reads as one shape */
.ir-bubble::after{content:'';position:absolute;right:30px;bottom:-13px;width:22px;height:22px;
  background:#fff;border-right:3px solid #14305a;border-bottom:3px solid #14305a;
  transform:rotate(45deg);border-bottom-right-radius:6px}
.ir-bub-head{display:flex;align-items:baseline;gap:8px;margin-bottom:7px;padding-right:22px}
.ir-bub-name{font-size:14px;font-weight:800;color:#14305a;letter-spacing:-.01em}
.ir-bub-role{font-size:10.5px;font-weight:700;color:#128a4a}
.ir-bub-role::before{content:'';display:inline-block;width:5px;height:5px;border-radius:50%;
  background:#16a34a;margin-right:5px;vertical-align:middle}
.ir-bubble.ir-show{display:block}
.ir-bub-txt{font-size:13.5px;color:#24344f;line-height:1.58;font-weight:500}
/* bold inside the bubble is the load-bearing word — dark, heavy, high contrast */
.ir-bub-txt b{color:#0B1B38;font-weight:800}
/* inline links inside a bot message (see fmt()) */
.ir-lnk{color:#2563EB;font-weight:700;text-decoration:underline;text-underline-offset:2px}
.ir-lnk:hover{color:#1D4ED8}
.ir-bub-act{display:flex;gap:8px;margin-top:11px}
.ir-bub-yes{flex:1;background:linear-gradient(140deg,#ff7a2f,#ff9f45);color:#fff;border:none;
  border-radius:9px;padding:8px 10px;font-size:12.5px;font-weight:700;cursor:pointer;
  font-family:'Outfit',sans-serif;transition:filter .16s}
.ir-bub-yes:hover{filter:brightness(1.1)}
.ir-bub-no{background:#EDF1F8;color:#5C6B85;border:1px solid #D7E0EE;
  border-radius:9px;padding:8px 12px;font-size:12.5px;font-weight:700;cursor:pointer;
  font-family:'Outfit',sans-serif;transition:all .16s}
.ir-bub-no:hover{color:#14305a;background:#E2E9F5}
.ir-bub-x{position:absolute;top:8px;right:10px;width:24px;height:24px;background:#EDF1F8;
  border:none;border-radius:50%;color:#14305a;display:grid;place-items:center;
  font-size:13px;cursor:pointer;line-height:1;padding:0;font-family:'Outfit',sans-serif}
.ir-bub-x:hover{background:#DCE5F5}
.ir-bub-yes:focus-visible,.ir-bub-no:focus-visible,.ir-bub-x:focus-visible{
  outline:3px solid #14305a;outline-offset:2px}
@keyframes ir-pop{from{opacity:0;transform:translateY(10px) scale(.94)}
  to{opacity:1;transform:translateY(0) scale(1)}}

/* unread badge */
.ir-badge{position:absolute;top:-2px;left:-2px;min-width:22px;height:22px;padding:0 5px;
  border-radius:11px;background:#ef4444;border:2.5px solid #07101e;color:#fff;font-size:11px;
  font-weight:800;display:none;align-items:center;justify-content:center;
  box-shadow:0 2px 8px rgba(239,68,68,.55)}
.ir-badge.ir-show{display:flex}

/* ══════════════════ IRIS MASCOT ══════════════════ */
.ir-bulb{animation:ir-blip 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes ir-blip{0%,100%{opacity:1}50%{opacity:.35}}
.ir-body{animation:ir-bob 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes ir-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
.ir-eyes{transform-box:fill-box;transform-origin:center;transition:transform .14s ease}
.ir-eyes.ir-blink{transform:scaleY(.08)}
.ir-pupil{transition:transform .16s cubic-bezier(.2,.9,.3,1)}
.ir-arm{transform-box:fill-box;transform-origin:top center}
.ir-wave .ir-arm-r{animation:ir-wave 1.5s ease-in-out 2}
@keyframes ir-wave{0%,100%{transform:rotate(0)}25%{transform:rotate(-26deg)}
  60%{transform:rotate(14deg)}}

/* ══════════════════ PANEL ══════════════════ */
.ir-panel{
  position:absolute;right:0;bottom:84px;width:396px;max-width:calc(100vw - 28px);
  height:640px;max-height:calc(100vh - 150px);background:#07101e;
  border:1px solid rgba(255,255,255,.09);border-radius:22px;
  box-shadow:0 40px 100px rgba(0,0,0,.76),inset 0 1px 0 rgba(255,255,255,.06);
  display:none;flex-direction:column;overflow:hidden;transform-origin:bottom right;
}
.ir-panel.ir-open{display:flex;animation:ir-panelIn .3s cubic-bezier(.34,1.56,.64,1) forwards}
.ir-panel.ir-closing{animation:ir-panelOut .2s ease-in forwards}
@keyframes ir-panelIn{from{opacity:0;transform:scale(.88) translateY(16px)}
  to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes ir-panelOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.9)}}

@media(max-width:580px){
  .ir-panel{position:fixed;inset:0;width:100%;max-width:100%;height:100%;
    max-height:100%;border-radius:0;border:none}
  .ir-launch.ir-hide-m{display:none}
}

/* header */
.ir-head{flex-shrink:0;padding:13px 14px 12px;position:relative;overflow:hidden;
  background:linear-gradient(155deg,#0c1a2c 0%,#112445 100%);
  border-bottom:1px solid rgba(255,255,255,.08)}
.ir-head::before{content:'';position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(255,122,47,.05) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,122,47,.05) 1px,transparent 1px);
  background-size:22px 22px}
.ir-head-row{display:flex;align-items:center;justify-content:space-between;
  gap:10px;position:relative;z-index:1}
.ir-head-l{display:flex;align-items:center;gap:10px;min-width:0}
.ir-av{width:46px;height:46px;flex-shrink:0;border-radius:50%;position:relative;
  background:radial-gradient(circle at 34% 28%,#ffb066,#ff7a2f 46%,#e8500f);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 3px rgba(255,122,47,.2),0 4px 14px rgba(255,87,34,.34)}
.ir-av svg{width:40px;height:43px;overflow:visible}
.ir-av-on{position:absolute;bottom:0;right:0;width:11px;height:11px;border-radius:50%;
  background:#22c55e;border:2.5px solid #0c1a2c}
.ir-name{font-size:15px;font-weight:800;color:#f2f7ff;letter-spacing:-.015em;line-height:1.15}
.ir-role{font-size:11px;color:#7d92ab;margin-top:1px;font-weight:500}
.ir-status{font-size:10.5px;color:#22c55e;display:flex;align-items:center;gap:4px;
  margin-top:2px;font-weight:600}
.ir-status.ir-off{color:#8a9bb0}
.ir-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.ir-x{width:34px;height:34px;flex-shrink:0;border-radius:10px;border:none;cursor:pointer;
  background:rgba(255,255,255,.08);color:#8fa4bd;font-size:16px;display:flex;
  align-items:center;justify-content:center;transition:all .15s;position:relative;z-index:1;
  outline:none;font-family:'Outfit',sans-serif;line-height:1}
.ir-x:hover{background:rgba(255,255,255,.17);color:#fff}
.ir-x:focus-visible{outline:2px solid #ffb066}

/* progress */
.ir-prog{flex-shrink:0;height:3px;background:rgba(255,255,255,.05);display:none}
.ir-prog.ir-show{display:block}
.ir-prog-f{height:100%;width:0;transition:width .5s cubic-bezier(.4,0,.2,1);
  background:linear-gradient(90deg,#ff7a2f,#ffb066,#22c55e)}

/* messages */
/* position:relative so offsetTop is measured against this list — the scroll
   logic parks the TOP of a long answer in view instead of jumping past it. */
.ir-msgs{flex:1;position:relative;overflow-y:auto;overflow-x:hidden;padding:14px 13px 8px;
  display:flex;flex-direction:column;scroll-behavior:smooth;overscroll-behavior:contain}
.ir-msgs::-webkit-scrollbar{width:4px}
.ir-msgs::-webkit-scrollbar-track{background:transparent}
.ir-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:4px}
.ir-bot,.ir-usr{padding:10px 14px;font-size:13.5px;line-height:1.62;
  white-space:pre-line;overflow-wrap:anywhere;margin-bottom:8px;
  animation:ir-rise .22s ease forwards}
.ir-bot{align-self:flex-start;max-width:90%;background:#0f1e34;color:#dce9f5;
  border:1px solid rgba(255,255,255,.08);border-radius:16px 16px 16px 4px;
  box-shadow:0 2px 10px rgba(0,0,0,.28)}
.ir-usr{align-self:flex-end;max-width:84%;font-weight:500;color:#fff;
  background:linear-gradient(140deg,#ff7a2f,#ff9f45);border-radius:16px 16px 4px 16px;
  box-shadow:0 4px 16px rgba(255,87,34,.3)}
.ir-bot b{color:#ffb066;font-weight:700}
@keyframes ir-rise{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}

.ir-type{align-self:flex-start;display:inline-flex;gap:5px;padding:13px 16px;
  background:#0f1e34;border:1px solid rgba(255,255,255,.08);
  border-radius:16px 16px 16px 4px;margin-bottom:8px}
.ir-type i{width:7px;height:7px;border-radius:50%;background:#3d5470;display:block;
  animation:ir-dotb 1s ease-in-out infinite}
.ir-type i:nth-child(2){animation-delay:.16s}
.ir-type i:nth-child(3){animation-delay:.32s}
@keyframes ir-dotb{0%,60%,100%{transform:translateY(0);background:#3d5470}
  30%{transform:translateY(-5px);background:#ff7a2f}}

/* chips */
.ir-chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 12px 1px}
.ir-chip{border:1px solid rgba(255,122,47,.3);background:rgba(255,122,47,.08);
  color:#f5c3a2;padding:7px 14px;font-size:12.5px;font-weight:600;border-radius:999px;
  cursor:pointer;transition:all .16s;white-space:nowrap;font-family:'Outfit',sans-serif;
  opacity:0;animation:ir-chipIn .26s ease forwards;outline:none;text-align:left}
.ir-chip:nth-child(1){animation-delay:.03s}.ir-chip:nth-child(2){animation-delay:.08s}
.ir-chip:nth-child(3){animation-delay:.13s}.ir-chip:nth-child(4){animation-delay:.18s}
.ir-chip:nth-child(5){animation-delay:.23s}.ir-chip:nth-child(6){animation-delay:.28s}
.ir-chip:nth-child(7){animation-delay:.33s}.ir-chip:nth-child(8){animation-delay:.38s}
@keyframes ir-chipIn{from{opacity:0;transform:translateY(5px) scale(.94)}
  to{opacity:1;transform:none}}
.ir-chip:hover{background:rgba(255,122,47,.22);border-color:#ff7a2f;color:#fff;
  transform:translateY(-2px);box-shadow:0 5px 15px rgba(255,87,34,.24)}
.ir-chip:focus-visible{outline:2px solid #ffb066;outline-offset:2px}
.ir-chip.ir-chip-go{background:linear-gradient(140deg,#ff7a2f,#ff9f45);
  border-color:#ff7a2f;color:#fff;font-weight:700}
.ir-chip.ir-chip-go:hover{filter:brightness(1.1);color:#fff}

.ir-div{text-align:center;font-size:9.5px;color:#31506f;margin:6px 0 11px;
  letter-spacing:.09em;text-transform:uppercase;font-weight:700}
.ir-restart{align-self:center;border:1px solid rgba(255,255,255,.09);background:none;
  color:#4a6280;font-size:11px;padding:5px 15px;border-radius:999px;cursor:pointer;
  margin:2px 0 11px;transition:all .15s;font-family:'Outfit',sans-serif;outline:none}
.ir-restart:hover{color:#9fb3c9;border-color:rgba(255,255,255,.22)}
.ir-restart:focus-visible{outline:2px solid #ffb066}

/* footer */
.ir-foot{flex-shrink:0;padding:10px 12px 11px;border-top:1px solid rgba(255,255,255,.08);
  background:rgba(0,0,0,.26)}
.ir-inrow{display:flex;gap:8px;align-items:center}
.ir-inp{flex:1;min-width:0;padding:11px 14px;background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.11);border-radius:12px;color:#dce9f5;font-size:14px;
  font-family:'Outfit',sans-serif;outline:none;transition:all .18s}
.ir-inp:focus{border-color:rgba(255,122,47,.6);background:rgba(255,255,255,.09)}
.ir-inp::placeholder{color:#41586f}
.ir-send{width:44px;height:44px;flex-shrink:0;border:none;border-radius:12px;cursor:pointer;
  background:linear-gradient(140deg,#ff7a2f,#ff9f45);color:#fff;font-size:16px;
  display:flex;align-items:center;justify-content:center;outline:none;
  box-shadow:0 4px 16px rgba(255,87,34,.38);position:relative;z-index:5;
  transition:transform .16s cubic-bezier(.34,1.56,.64,1),opacity .16s}
.ir-send:hover:not(:disabled){transform:scale(1.07)}
.ir-send:disabled{opacity:.38;cursor:not-allowed;transform:none}
.ir-send:focus-visible{outline:2px solid #ffb066}
.ir-meta{display:flex;justify-content:space-between;align-items:flex-end;
  margin-top:8px;gap:8px}
.ir-contact{font-size:10px;color:#31506f;line-height:1.75;min-width:0}
.ir-contact a{color:#ff7a2f;text-decoration:none;transition:color .15s}
.ir-contact a:hover{color:#ffb066;text-decoration:underline}
.ir-wa{display:inline-flex;align-items:center;gap:4px;background:rgba(37,211,102,.11);
  border:1px solid rgba(37,211,102,.3);color:#25d366!important;border-radius:999px;
  padding:2px 9px;font-size:9.5px;font-weight:700;text-transform:uppercase;
  letter-spacing:.05em;white-space:nowrap;transition:all .15s}
.ir-wa:hover{background:rgba(37,211,102,.22);text-decoration:none!important}

/* ══ reduced motion ══ */
@media(prefers-reduced-motion:reduce){
  #irisw *,#irisw *::before,#irisw *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
  /* the orb's glow is carried by an animated box-shadow, so it needs its
     resting state pinned explicitly — killing the animation alone would leave
     it on whatever frame it stopped at. */
  /* the glow is SVG now, so it just holds still at full strength */
  .ir-orb-glow{animation:none!important;opacity:.88!important}
  .ir-glyph{animation:none!important}
  .ir-glyph:nth-of-type(6){opacity:.85!important}
  .ir-pill::after{display:none!important}
}
`;

var IRIS_HTML = `
  <!-- ═══════════ CHAT PANEL ═══════════ -->
  <div class="ir-panel" id="ir-panel" role="dialog" aria-modal="false"
       aria-label="Chat with Iris, the Eye To Ad Media growth assistant" aria-hidden="true">

    <div class="ir-head">
      <div class="ir-head-row">
        <div class="ir-head-l">
          <div class="ir-av" id="ir-av" aria-hidden="true"><span class="ir-av-on"></span></div>
          <div>
            <div class="ir-name">Iris</div>
            <div class="ir-role">Growth Assistant &middot; Eye To Ad Media</div>
            <div class="ir-status" id="ir-status"><span class="ir-dot"></span><span id="ir-status-t">Online</span></div>
          </div>
        </div>
        <button class="ir-x" id="ir-close" type="button" aria-label="Close chat">&#10005;</button>
      </div>
    </div>

    <div class="ir-prog" id="ir-prog"><div class="ir-prog-f" id="ir-prog-f"></div></div>

    <div class="ir-msgs" id="ir-msgs" role="log" aria-live="polite" aria-label="Conversation with Iris">
    <div class="ir-stage" id="ir-stage">
      <svg class="ir-stage-art" viewBox="0 0 170 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Iris, the Eye To Ad Media growth assistant"><use href="#irx-iris"/></svg>
      <div class="ir-stage-cap">Iris &middot; growth assistant</div>
    </div></div>

    <div class="ir-foot">
      <div class="ir-inrow">
        <input class="ir-inp" id="ir-inp" type="text" autocomplete="off" maxlength="500"
               placeholder="Ask me anything about growing your business&hellip;"
               aria-label="Type your message to Iris">
        <button class="ir-send" id="ir-send" type="button" aria-label="Send message">&#10148;</button>
      </div>
      <div class="ir-meta">
        <div class="ir-contact">
          <a href="tel:18004818638">1-800-481-8638</a> &middot;
          <a href="tel:17202496588">(720) 249-6588</a><br>
          Denver, CO &middot; Serving clients worldwide
        </div>
        <a class="ir-wa" id="ir-wa" href="https://wa.me/17202496588" target="_blank"
           rel="noopener noreferrer" aria-label="Message us on WhatsApp">WhatsApp</a>
      </div>
    </div>
  </div>

  <svg class="ir-sprite" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>
        <linearGradient id="irxRobe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3358CC"/><stop offset=".5" stop-color="#1E3A8A"/><stop offset="1" stop-color="#122A63"/>
        </linearGradient>
        <radialGradient id="irxEye" cx=".38" cy=".33" r=".78">
          <stop offset="0" stop-color="#FFD9A0"/><stop offset=".45" stop-color="#FF8438"/><stop offset="1" stop-color="#B33C00"/>
        </radialGradient>
        <radialGradient id="irxHalo" cx=".5" cy=".5" r=".5">
          <stop offset=".55" stop-color="#FF8438" stop-opacity=".4"/><stop offset="1" stop-color="#FF8438" stop-opacity="0"/>
        </radialGradient>
        <!-- v7.0: real light bleed off the flame. A blur of the source graphic
             composited UNDER the crisp original, so the tongues stay sharp and
             only the halo is soft. This is what was missing when the glow
             "disappeared" — the earlier build had colour but no filter. -->
        <filter id="irxFlameGlow" x="-140%" y="-140%" width="380%" height="380%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="b"/>
          <feColorMatrix in="b" type="matrix" result="warm"
            values="1.25 0 0 0 0  0 .82 0 0 0  0 0 .25 0 0  0 0 0 1.35 0"/>
          <feMerge><feMergeNode in="warm"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="irxBloomG" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#FFF3D0" stop-opacity=".95"/>
          <stop offset=".38" stop-color="#FFB347" stop-opacity=".55"/>
          <stop offset=".72" stop-color="#FF6A1A" stop-opacity=".22"/>
          <stop offset="1" stop-color="#FF6A1A" stop-opacity="0"/>
        </radialGradient>
        <!-- ══ ORB GRADIENTS (v7.0) ══ -->
        <radialGradient id="irOrbBody" cx=".36" cy=".30" r=".82">
          <stop offset="0" stop-color="#FFFFFF"/>
          <stop offset=".26" stop-color="#EAFAFF"/>
          <stop offset=".55" stop-color="#A9DDF9"/>
          <stop offset=".80" stop-color="#7FA8E8"/>
          <stop offset="1" stop-color="#5C7FD0"/>
        </radialGradient>
        <!-- v7.3: this now carries the whole glow, so the stops run from the
             glass edge (~.32 of r=104) all the way out to nothing. The long
             tail between .55 and 1 is what kills the ring — the light has
             somewhere to fade TO instead of stopping at an element boundary. -->
        <radialGradient id="irOrbAura" cx=".5" cy=".5" r=".5">
          <stop offset=".26" stop-color="#F2FCFF" stop-opacity=".92"/>
          <stop offset=".34" stop-color="#CFF0FF" stop-opacity=".62"/>
          <stop offset=".45" stop-color="#9FD4FF" stop-opacity=".38"/>
          <stop offset=".58" stop-color="#A78BFA" stop-opacity=".22"/>
          <stop offset=".72" stop-color="#8FA8FF" stop-opacity=".12"/>
          <stop offset=".86" stop-color="#FFC98A" stop-opacity=".05"/>
          <stop offset="1" stop-color="#FFC98A" stop-opacity="0"/>
        </radialGradient>
        <filter id="irOrbBlur" x="-120%" y="-160%" width="340%" height="420%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.6"/>
        </filter>
        <radialGradient id="irOrbShell" cx=".5" cy=".5" r=".5">
          <stop offset=".72" stop-color="#BBE4FA" stop-opacity=".15"/>
          <stop offset=".93" stop-color="#7FB6EA" stop-opacity=".55"/>
          <stop offset="1" stop-color="#4C74C4" stop-opacity=".85"/>
        </radialGradient>
        <linearGradient id="irOrbNeb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#FFFFFF" stop-opacity=".85"/>
          <stop offset=".5" stop-color="#7DD3FC" stop-opacity=".45"/>
          <stop offset="1" stop-color="#C4B5FD" stop-opacity=".7"/>
        </linearGradient>
      </defs><!-- Plain <g>, NOT a <symbol>: a symbol's own viewBox overrides the crop on
       the <svg> using it, which squeezed the full figure into the 64px
       launcher instead of showing the bust. Keep this a <g>. -->
  <g id="irx-iris"><g id="irx-art" class="irx-float">

        <!-- ===== STAFF (behind) ===== -->
        <path d="M30 62 L27 300" stroke="#93A6C9" stroke-width="7" stroke-linecap="round"/>
        <circle cx="31" cy="52" r="30" fill="url(#irxHalo)" class="irx-glow"/>
        <!-- staff tip: flame licking UPWARD, never rotating. Three nested
             tongues on offset flicker timers so the shape never repeats
             exactly, plus sparks rising off the top and fading out. -->
        <circle class="irx-bloom" cx="31" cy="30" r="26" fill="url(#irxBloomG)"/>
        <g class="irx-flame-a">
          <path d="M31 6 C22 24 17 33 20 41 C23 48 39 48 42 41 C45 33 40 24 31 6 Z" fill="#FF6A1A" opacity=".92"/>
        </g>
        <g class="irx-flame-b">
          <path d="M31 15 C25 28 22 35 24 41 C26 46 36 46 38 41 C40 35 37 27 31 15 Z" fill="#FBBF24"/>
        </g>
        <g class="irx-flame-c">
          <path d="M31 25 C28 33 26 37 27 41 C28 44 34 44 35 41 C36 37 34 32 31 25 Z" fill="#FFF3D0"/>
        </g>
        <circle class="irx-spark" cx="24" cy="30" r="2.3" fill="#FBBF24"/>
        <circle class="irx-spark" cx="38" cy="26" r="1.8" fill="#FF8438"/>
        <circle class="irx-spark" cx="31" cy="18" r="1.5" fill="#FFD9A0"/>
        <circle class="irx-spark" cx="27" cy="22" r="1.9" fill="#FF6A1A"/>
        <circle class="irx-spark" cx="36" cy="34" r="1.6" fill="#FBBF24"/>
        <circle class="irx-spark" cx="21" cy="24" r="1.3" fill="#FFF3D0"/>
        <circle class="irx-spark" cx="41" cy="32" r="1.4" fill="#FFD9A0"/>
        <circle class="irx-spark" cx="33" cy="12" r="1.1" fill="#FF8438"/>

        <!-- ===== ROBE ===== -->
        <g class="irx-hem">
          <path d="M66 146 C50 154 46 170 44 188 L28 292 Q85 314 142 292 L126 188 C124 170 120 154 104 146 Z"
                fill="url(#irxRobe)" stroke="#0B1626" stroke-width="4.5" stroke-linejoin="round"/>
          <circle class="irx-dot" cx="68" cy="212" r="3" fill="#8FC6FF"/>
          <circle class="irx-dot" cx="96" cy="232" r="2.4" fill="#8FC6FF"/>
          <circle class="irx-dot" cx="74" cy="254" r="2.8" fill="#8FC6FF"/>
          <circle class="irx-dot" cx="104" cy="272" r="2.4" fill="#8FC6FF"/>
          <circle class="irx-dot" cx="62" cy="276" r="2.6" fill="#8FC6FF"/>
          <path d="M68 212 L96 232 L74 254 L104 272" stroke="#8FC6FF" stroke-width="1.6" fill="none" opacity=".35"/>

          <!-- ================= THE EYE TOAD CREST =================
               An embroidered crest on the robe, sitting clear of the belt.
               Real toad anatomy: broad flat skull with a blunt snout, PAROTOID
               GLANDS behind the eye (the signature toad feature frogs do not
               have), cranial crests, irregular warts that break the outline,
               mottled dorsal patches, hind legs folded with knees up and
               five-toed webbed feet, four-toed forelimbs propping it up.
               One eye, centred, with a heavy brow ridge and a horizontal
               pupil — toads have horizontal pupils, frogs' vary. -->
          <g class="irx-croak" transform="translate(0,34)">
            <!-- HIND LEGS -->
            <g fill="#17913F" stroke="#0B1626" stroke-width="2.8" stroke-linejoin="round">
              <path d="M63 240 C49 237 40 246 40 258 C40 267 46 273 54 272 L60 263 C54 261 51 256 53 250 C56 243 58 241 65 243 Z"/>
              <path d="M107 240 C121 237 130 246 130 258 C130 267 124 273 116 272 L110 263 C116 261 119 256 117 250 C114 243 112 241 105 243 Z"/>
            </g>
            <path d="M52 268 L33 271 L36 279 L47 284 L57 277 Z" fill="#25A854" stroke="#0B1626" stroke-width="2.3" stroke-linejoin="round"/>
            <path d="M118 268 L137 271 L134 279 L123 284 L113 277 Z" fill="#25A854" stroke="#0B1626" stroke-width="2.3" stroke-linejoin="round"/>
            <g stroke="#0B1626" stroke-width="2" stroke-linecap="round" fill="none" opacity=".85">
              <path d="M53 270 L34 271 M53 270 L36 278 M53 270 L44 284 M53 270 L53 285 M53 270 L58 277"/>
              <path d="M117 270 L136 271 M117 270 L134 278 M117 270 L126 284 M117 270 L117 285 M117 270 L112 277"/>
            </g>

            <!-- BODY: broad, flat, blunt snout at the front -->
            <path d="M58 248 C56 234 64 222 72 218 C78 215 92 215 98 218 C106 222 114 234 112 248
                     C111 259 104 266 96 268 C89 270 81 270 74 268 C66 266 59 259 58 248 Z"
                  fill="#22C55E" stroke="#0B1626" stroke-width="3.2" stroke-linejoin="round"/>
            <!-- mottled dorsal patches -->
            <g fill="#15803D" opacity=".55">
              <ellipse cx="68" cy="252" rx="7" ry="5" transform="rotate(-18 68 252)"/>
              <ellipse cx="102" cy="252" rx="7" ry="5" transform="rotate(18 102 252)"/>
              <ellipse cx="85" cy="262" rx="9" ry="4.5"/>
              <ellipse cx="74" cy="235" rx="5" ry="3.5" transform="rotate(-24 74 235)"/>
              <ellipse cx="96" cy="235" rx="5" ry="3.5" transform="rotate(24 96 235)"/>
            </g>
            <!-- warts, several breaking the outline -->
            <g fill="#126E34" stroke="#0B1626" stroke-width="1.4">
              <circle cx="61" cy="243" r="3.2"/><circle cx="109" cy="243" r="3.2"/>
              <circle cx="64" cy="258" r="2.8"/><circle cx="106" cy="258" r="2.8"/>
              <circle cx="78" cy="264" r="2.4"/><circle cx="92" cy="264" r="2.4"/>
              <circle cx="85" cy="248" r="2.2"/>
            </g>
            <!-- PAROTOID GLANDS — the toad tell -->
            <ellipse cx="67" cy="230" rx="9" ry="5.5" transform="rotate(-32 67 230)" fill="#1BA34C" stroke="#0B1626" stroke-width="2.6"/>
            <ellipse cx="103" cy="230" rx="9" ry="5.5" transform="rotate(32 103 230)" fill="#1BA34C" stroke="#0B1626" stroke-width="2.6"/>
            <!-- cranial crests -->
            <path d="M74 222 C79 218 91 218 96 222" fill="none" stroke="#0B1626" stroke-width="2.2" opacity=".6"/>
            <!-- wide mouth with downturned corners, snout, nostrils -->
            <path d="M62 244 Q85 260 108 244" fill="none" stroke="#0B1626" stroke-width="3.2" stroke-linecap="round"/>
            <path d="M62 244 Q65 250 70 252 M108 244 Q105 250 100 252" fill="none" stroke="#0B1626" stroke-width="2" stroke-linecap="round" opacity=".65"/>
            <path d="M79 238 Q85 242 91 238" fill="none" stroke="#0B1626" stroke-width="1.8" opacity=".45"/>
            <circle cx="80" cy="232" r="1.7" fill="#0B1626"/>
            <circle cx="90" cy="232" r="1.7" fill="#0B1626"/>

            <!-- FORELIMBS -->
            <g fill="#17913F" stroke="#0B1626" stroke-width="2.8" stroke-linejoin="round">
              <path d="M74 264 C70 271 69 278 71 283 L80 282 C78 277 78 271 81 266 Z"/>
              <path d="M96 264 C100 271 101 278 99 283 L90 282 C92 277 92 271 89 266 Z"/>
            </g>
            <g stroke="#0B1626" stroke-width="2" stroke-linecap="round" fill="none" opacity=".85">
              <path d="M75 282 L69 289 M75 282 L75 291 M75 282 L81 288 M75 282 L84 287"/>
              <path d="M95 282 L101 289 M95 282 L95 291 M95 282 L89 288 M95 282 L86 287"/>
            </g>

            <!-- THE EYE: heavy brow, horizontal pupil -->
            <ellipse cx="85" cy="222" rx="15" ry="12" fill="#22C55E" stroke="#0B1626" stroke-width="3.2"/>
            <path d="M70 219 C74 210 96 210 100 219" fill="#1BA34C" stroke="#0B1626" stroke-width="3"/>
            <ellipse cx="85" cy="221" rx="11" ry="9.5" fill="#FFF6E0" stroke="#0B1626" stroke-width="2.8"/>
            <g class="irx-pupil">
              <circle cx="85" cy="221" r="6.5" fill="url(#irxEye)" stroke="#0B1626" stroke-width="2"/>
              <ellipse cx="85" cy="221" rx="5" ry="2.3" fill="#0B1626"/>
              <circle cx="82" cy="218" r="1.8" fill="#fff" opacity=".9"/>
            </g>
            <ellipse class="irx-toadlid" cx="85" cy="221" rx="11.5" ry="10" fill="#1BA34C"/>
          </g>
          <path d="M66 150 C60 190 56 244 52 288" fill="none" stroke="#0B1626" stroke-width="2.4" opacity=".22"/>
          <path d="M104 150 C110 190 114 244 118 288" fill="none" stroke="#0B1626" stroke-width="2.4" opacity=".22"/>
          <path d="M28 292 Q85 314 142 292" fill="none" stroke="#FF6A1A" stroke-width="6" stroke-linecap="round"/>
        </g>

        <!-- V-neck of the inner garment, then belt -->
        <path d="M70 146 L85 176 L100 146 Z" fill="#0E1F4D" stroke="#0B1626" stroke-width="3" stroke-linejoin="round"/>

        <!-- ===== ARMS + CUFFS ===== -->
        <path d="M68 152 C50 162 38 180 34 200 L50 203 C53 186 58 172 74 160 Z"
              fill="url(#irxRobe)" stroke="#0B1626" stroke-width="4" stroke-linejoin="round"/>
        <rect x="32" y="196" width="22" height="10" rx="5" fill="#FF6A1A" stroke="#D94A00" stroke-width="2.5" transform="rotate(-12 43 201)"/>
        <!-- hand closed around the staff, fingers wrapping in front of it -->
        <path d="M22 210 C22 203 27 199 33 200 C39 201 42 206 41 213 C40 220 35 224 29 223 C24 222 22 217 22 210 Z"
              fill="#F2C39C" stroke="#0B1626" stroke-width="3"/>
        <g stroke="#0B1626" stroke-width="2" stroke-linecap="round" fill="none" opacity=".65">
          <path d="M25 207 L39 208 M24 213 L40 214 M26 219 L38 219"/>
        </g>
        <path d="M33 200 C37 198 41 200 41 204" fill="none" stroke="#0B1626" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M102 152 C120 162 130 182 128 204 L112 201 C114 184 108 170 96 160 Z"
              fill="url(#irxRobe)" stroke="#0B1626" stroke-width="4" stroke-linejoin="round"/>
        <rect x="110" y="198" width="22" height="10" rx="5" fill="#FF6A1A" stroke="#D94A00" stroke-width="2.5" transform="rotate(6 121 203)"/>
        <!-- open hand, relaxed at her side -->
        <path d="M117 210 C117 204 122 200 128 201 C134 202 137 207 136 214 C135 221 130 225 124 224 C119 223 117 217 117 210 Z"
              fill="#F2C39C" stroke="#0B1626" stroke-width="3"/>
        <g stroke="#C08A5E" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".7">
          <path d="M124 216 L124 223 M129 216 L130 223 M133 214 L134 220"/>
        </g>

        <!-- ===== HAIR (behind face) ===== -->
        <path d="M58 96 C46 118 46 152 54 178 L74 170 C66 146 66 118 74 100 Z"
              fill="#7A4A1E" stroke="#0B1626" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M112 96 C126 118 128 154 118 182 L98 172 C108 148 106 118 98 100 Z"
              fill="#7A4A1E" stroke="#0B1626" stroke-width="3.5" stroke-linejoin="round"/>
        <g stroke="#A9713A" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".8">
          <path d="M62 108 C56 128 56 152 61 170"/>
          <path d="M108 108 C116 128 117 154 112 174"/>
        </g>

        <!-- ===== FACE ===== -->
        <ellipse cx="85" cy="114" rx="24" ry="25" fill="#F2C39C" stroke="#C08A5E" stroke-width="3"/>
        <path d="M63 128 C69 144 101 144 107 128" fill="none" stroke="#D49A6E" stroke-width="3" opacity=".45" stroke-linecap="round"/>
        <path d="M69 104 L81 101" stroke="#4A2C17" stroke-width="4" stroke-linecap="round"/>
        <path d="M89 101 L101 104" stroke="#4A2C17" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="75" cy="114" rx="7.5" ry="8.5" fill="#fff" stroke="#8E6140" stroke-width="2.2"/>
        <ellipse cx="95" cy="114" rx="7.5" ry="8.5" fill="#fff" stroke="#8E6140" stroke-width="2.2"/>
        <path d="M67 109 C70 105 80 105 82.5 109" fill="none" stroke="#3A2411" stroke-width="3" stroke-linecap="round"/>
        <path d="M87.5 109 C90 105 100 105 103 109" fill="none" stroke="#3A2411" stroke-width="3" stroke-linecap="round"/>
        <path d="M66 108 L63 105 M104 108 L107 105" stroke="#3A2411" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="66" cy="124" rx="6" ry="3.5" fill="#E8896B" opacity=".3"/>
        <ellipse cx="104" cy="124" rx="6" ry="3.5" fill="#E8896B" opacity=".3"/>
        <g class="irx-pupil">
          <circle cx="76" cy="115" r="4" fill="#1B6FD8"/><circle cx="96" cy="115" r="4" fill="#1B6FD8"/>
          <circle cx="74.5" cy="113" r="1.6" fill="#fff"/><circle cx="94.5" cy="113" r="1.6" fill="#fff"/>
        </g>
        <ellipse class="irx-lid" cx="75" cy="114" rx="8" ry="9" fill="#F2C39C"/>
        <ellipse class="irx-lid" cx="95" cy="114" rx="8" ry="9" fill="#F2C39C"/>
        <path d="M85 118 L82.5 125 L87.5 125" fill="none" stroke="#C08A5E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M76 132 Q85 139 94 132" fill="none" stroke="#96603A" stroke-width="3.2" stroke-linecap="round"/>

        <!-- ===== FRINGE under the brim ===== -->
        <path d="M62 96 C70 86 100 86 108 96 C100 92 90 90 85 94 C78 90 70 90 62 96 Z"
              fill="#7A4A1E" stroke="#0B1626" stroke-width="3" stroke-linejoin="round"/>

        <!-- ===== WIZARD HAT ===== -->
        <path d="M40 88 C42 58 50 28 64 14 C69 7 78 10 77 20 C75 38 90 64 130 86 Z"
              fill="url(#irxRobe)" stroke="#0B1626" stroke-width="4.5" stroke-linejoin="round"/>
        <ellipse cx="85" cy="90" rx="54" ry="13" fill="url(#irxRobe)" stroke="#0B1626" stroke-width="4.5"/>
        <path d="M47 80 C62 88 108 88 124 80" fill="none" stroke="#FF6A1A" stroke-width="9" stroke-linecap="round"/>
        <!-- the eye emblem on the hat ties it to the logo -->
        <ellipse cx="70" cy="58" rx="13" ry="9" fill="#fff" stroke="#0B1626" stroke-width="3"/>
        <circle cx="70" cy="58" r="5.5" fill="url(#irxEye)" stroke="#0B1626" stroke-width="2"/>
        <circle cx="70" cy="58" r="2" fill="#0B1626"/>
        <circle cx="72" cy="20" r="4.5" fill="#FBBF24" stroke="#0B1626" stroke-width="2.5" class="irx-glow"/>
      </g></g></svg>

  <!-- ═══════════ PROACTIVE BUBBLE ═══════════ -->
  <div class="ir-bubble" id="ir-bubble" role="status">
    <button class="ir-bub-x" id="ir-bub-x" type="button" aria-label="Dismiss">&#10005;</button>
    <div class="ir-bub-head"><span class="ir-bub-name">Iris</span><span class="ir-bub-role">Growth assistant</span></div>
    <div class="ir-bub-txt">Google drops <b>53%</b> of mobile visitors before three seconds.
      Tell me your website and I&rsquo;ll show you where yours is <b>leaking customers</b>.</div>
    <div class="ir-bub-act">
      <button class="ir-bub-yes" id="ir-bub-yes" type="button">Let's talk</button>
      <button class="ir-bub-no" id="ir-bub-no" type="button">Not now</button>
    </div>
  </div>

  <!-- ═══════════ LAUNCHER ═══════════ -->
  <div class="ir-launch" id="ir-launch">

    <button class="ir-fab" id="ir-fab" type="button" aria-expanded="false"
            aria-controls="ir-panel" aria-label="Open chat with Iris, growth assistant">
      <!-- ── IRIS: target-bodied growth bot. Cloned into the header avatar at runtime. ── -->
      <svg viewBox="22 6 126 126" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><use href="#irx-iris"/></svg>

      <!-- ══ CRYSTAL ORB (v7.0) ══ What a first-time visitor sees instead of
           Iris. One click bursts it and she is standing there. The button's
           aria-label still says "chat", so nothing about this is a mystery to
           assistive tech — the reveal is a visual flourish only. -->
      <span class="ir-orb-wrap" aria-hidden="true">
        <svg class="ir-orb" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <!-- ══ GLOW ══ deliberately far larger than the viewBox (the SVG is
               overflow:visible). This single gradient is the ENTIRE glow —
               see the v7.3 note on .ir-orb-mode .ir-fab for why there is no
               box-shadow anywhere near this component. -->
          <circle class="ir-orb-glow" cx="50" cy="50" r="104" fill="url(#irOrbAura)"/>

          <!-- ══ STEAM ══ drifts up off the top of the glass -->
          <g filter="url(#irOrbBlur)">
            <ellipse class="ir-orb-wisp" cx="42" cy="22" rx="9" ry="5" fill="#DFF4FF" opacity=".5"/>
            <ellipse class="ir-orb-wisp" cx="58" cy="20" rx="7" ry="4.2" fill="#E6DFFF" opacity=".45"/>
            <ellipse class="ir-orb-wisp" cx="50" cy="17" rx="6" ry="3.6" fill="#FFF3E0" opacity=".4"/>
          </g>

          <!-- ══ GLASS BODY ══ -->
          <circle cx="50" cy="50" r="33" fill="url(#irOrbShell)"/>
          <circle class="ir-orb-core" cx="50" cy="50" r="33" fill="url(#irOrbBody)"/>

          <!-- ══ INTERIOR, drifting ══ -->
          <g class="ir-orb-turn">
            <g class="ir-orb-neb" opacity=".7">
              <path d="M26 53 C34 36 66 34 76 47 C63 41 44 45 35 59 Z" fill="url(#irOrbNeb)"/>
            </g>
            <g class="ir-orb-neb2" opacity=".55">
              <path d="M30 63 C40 53 62 55 72 63 C59 59 44 60 34 68 Z" fill="url(#irOrbNeb)"/>
            </g>
          </g>

          <!-- ══ GLYPH CAROUSEL ══ six symbols, one at a time, inside the glass.
               Keep these simple and chunky: at 92px on a phone, anything with
               fine detail turns to mush. -->
          <g stroke-linecap="round" stroke-linejoin="round" fill="none">
            <!-- 1. search -->
            <g class="ir-glyph" stroke="#0B1B38" stroke-width="3.2" opacity="0">
              <circle cx="47" cy="49" r="9"/><path d="M54 56 L61 63"/>
            </g>
            <!-- 2. rising bars -->
            <g class="ir-glyph" opacity="0">
              <rect x="38" y="54" width="5.5" height="9" rx="2" fill="#0B1B38"/>
              <rect x="46.5" y="48" width="5.5" height="15" rx="2" fill="#0B1B38"/>
              <rect x="55" y="42" width="5.5" height="21" rx="2" fill="#0B1B38"/>
              <path d="M38 40 L60 40" stroke="#C2410C" stroke-width="0"/>
            </g>
            <!-- 3. map pin -->
            <g class="ir-glyph" opacity="0">
              <path d="M50 38 C44 38 40 43 40 48 C40 55 50 66 50 66 C50 66 60 55 60 48 C60 43 56 38 50 38 Z"
                    fill="#0B1B38"/>
              <circle cx="50" cy="48" r="3.6" fill="#EAFAFF"/>
            </g>
            <!-- 4. star -->
            <g class="ir-glyph" opacity="0">
              <path d="M50 38 L54 48 L65 49 L56.5 56 L59 67 L50 61 L41 67 L43.5 56 L35 49 L46 48 Z"
                    fill="#0B1B38"/>
            </g>
            <!-- 5. chat -->
            <g class="ir-glyph" opacity="0">
              <path d="M37 42 L63 42 Q66 42 66 45 L66 57 Q66 60 63 60 L52 60 L45 67 L45 60 L37 60 Q34 60 34 57 L34 45 Q34 42 37 42 Z"
                    fill="#0B1B38"/>
              <circle cx="43" cy="51" r="2" fill="#EAFAFF"/>
              <circle cx="50" cy="51" r="2" fill="#EAFAFF"/>
              <circle cx="57" cy="51" r="2" fill="#EAFAFF"/>
            </g>
            <!-- 6. the Eye To Ad eye — still here, now one of six -->
            <g class="ir-glyph" opacity="0">
              <path d="M34 52 C41 42 59 42 66 52 C59 62 41 62 34 52 Z" fill="#0B1B38"/>
              <circle cx="50" cy="52" r="5.6" fill="#EAFAFF"/>
              <circle cx="50" cy="52" r="2.6" fill="#0B1B38"/>
            </g>
          </g>

          <!-- ══ FACET / REFRACTION lines, counter-rotating ══ -->
          <g class="ir-orb-facet" opacity=".5">
            <path d="M50 17 C34 30 34 70 50 83" fill="none" stroke="#fff" stroke-width="1" opacity=".45"/>
            <path d="M50 17 C66 30 66 70 50 83" fill="none" stroke="#fff" stroke-width="1" opacity=".3"/>
            <ellipse cx="50" cy="50" rx="33" ry="11" fill="none" stroke="#fff" stroke-width=".9" opacity=".35"/>
          </g>

          <!-- ══ ORBITING RINGS ══ -->
          <!-- ONE orbit ring, not two (v7.3). Two crossing rings turned the
               silhouette into a scribble at 92px and competed with the glyph
               inside. If you decide you want the ring gone entirely, delete
               this block — nothing else depends on it. -->
          <g class="ir-orb-ring">
            <ellipse cx="50" cy="50" rx="41" ry="14" fill="none" stroke="#FFC98A"
                     stroke-width="2" opacity=".7" transform="rotate(-22 50 50)"/>
          </g>

          <!-- ══ GLASS HIGHLIGHTS ══ specular top-left, caustic arc bottom-right -->
          <ellipse cx="39" cy="36" rx="12" ry="7.5" fill="#fff" opacity=".95" transform="rotate(-28 39 36)"/>
          <ellipse cx="33" cy="45" rx="4" ry="2.4" fill="#fff" opacity=".6" transform="rotate(-28 33 45)"/>
          <path d="M31 66 C38 76 62 76 70 65" fill="none" stroke="#fff" stroke-width="2.6"
                stroke-linecap="round" opacity=".38"/>
          <circle cx="50" cy="50" r="33" fill="none" stroke="#fff" stroke-width="1.1" opacity=".5"/>

          <!-- ══ SPARKLES ══ four-point stars, slow twinkle, never a flash -->
          <path class="ir-orb-star" d="M18 30 L20 36 L26 38 L20 40 L18 46 L16 40 L10 38 L16 36 Z" fill="#FFF3D0"/>
          <path class="ir-orb-star" d="M84 44 L85.5 48.5 L90 50 L85.5 51.5 L84 56 L82.5 51.5 L78 50 L82.5 48.5 Z" fill="#BFEBFF"/>
          <path class="ir-orb-star" d="M70 80 L71.4 84 L75.5 85.4 L71.4 86.8 L70 91 L68.6 86.8 L64.5 85.4 L68.6 84 Z" fill="#C4B5FD"/>
          <circle class="ir-orb-mote" cx="24" cy="72" r="1.9" fill="#FFC98A"/>
          <circle class="ir-orb-mote" cx="88" cy="66" r="1.5" fill="#EAFAFF"/>
        </svg>
      </span>

      <!-- poof: fires once, on the reveal click -->
      <span class="ir-poof" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <circle class="ir-pf" cx="60" cy="60" r="13" fill="#fff" opacity=".9"/>
          <circle class="ir-pf" cx="36" cy="44" r="9" fill="#EAFAFF"/>
          <circle class="ir-pf" cx="84" cy="46" r="8" fill="#DCEEFF"/>
          <circle class="ir-pf" cx="44" cy="82" r="10" fill="#F3E9FF"/>
          <circle class="ir-pf" cx="80" cy="80" r="7" fill="#FFEBD3"/>
          <circle class="ir-pf" cx="60" cy="30" r="6" fill="#fff"/>
          <circle class="ir-pf" cx="26" cy="62" r="6" fill="#EAFAFF"/>
          <circle class="ir-pf" cx="94" cy="62" r="5" fill="#F3E9FF"/>
        </svg>
      </span>

      <span class="ir-badge" id="ir-badge" aria-hidden="true"></span>
    </button>

    <button class="ir-pill" id="ir-pill" type="button" tabindex="-1"><span class="ir-pill-dot" aria-hidden="true"></span><span id="ir-pill-t">Click here to meet the marketing wizard</span></button>
  </div>
`;

/* Only inject the Outfit stylesheet on pages that do not already request it.
   eyetoad.com pages load Outfit in their single head font request, so on those
   this does nothing. */
function ensureFont(){
  try {
    var links = document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]');
    for (var i = 0; i < links.length; i++){
      var h = links[i].getAttribute('href') || '';
      if (h.indexOf('Outfit') !== -1) return;
    }
    var pre1 = document.createElement('link');
    pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(pre1);
    var pre2 = document.createElement('link');
    pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com';
    pre2.crossOrigin = '';
    document.head.appendChild(pre2);
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(l);
  } catch (e) {}
}

function mount(){
  ensureFont();

  var st = document.createElement('style');
  st.setAttribute('data-iris', 'v7.0');
  st.textContent = IRIS_CSS;
  document.head.appendChild(st);

  var w = document.createElement('div');
  w.id = 'irisw';
  w.innerHTML = IRIS_HTML;
  document.body.appendChild(w);

  boot();
}

/* ────────────────────────────────────────────────────────────────────────────
   BELOW: the original inline Iris v5.7 script, verbatim, wrapped in boot() so
   it runs after mount() has put #irisw in the DOM.
   ──────────────────────────────────────────────────────────────────────────── */
function boot(){

(function(){
/* ══════════════════════════════════════════════════════════════════════════
   IRIS v5.7 — Eye To Ad Media growth assistant
   No API. No external calls except the FormSubmit lead POST.
   ══════════════════════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────── CONFIG — everything you'd ever change lives here ─────────────── */
var CFG = {
  LEAD_EMAIL   : 'info@eyetoad.com',              // ← flip to sales@eyetoad.com if you prefer
  /* THE AJAX ENDPOINT is now the PRIMARY path — it is confirmed active for
     info@eyetoad.com, and it is the only one that can tell us whether the
     lead actually arrived. FS_POST (the regular endpoint, submitted through a
     hidden iframe) is the FALLBACK, used only when the AJAX call fails.
     >>> v5.2 fired BOTH on every send, which delivered every Iris lead to the
     >>> inbox TWICE. Do not restore that. <<<
     If you ever point this at a NEW address, submit once through the regular
     endpoint first and approve FormSubmit's confirmation email — /ajax/ is
     activated separately, and until it is, every send falls back to the
     honest "could not confirm" state. */
  FS_AJAX      : 'https://formsubmit.co/ajax/info@eyetoad.com',
  FS_POST      : 'https://formsubmit.co/info@eyetoad.com',
  PHONE_MAIN   : '1-800-481-8638',
  PHONE_LOCAL  : '(720) 249-6588',
  WHATSAPP_NUM : '17202496588',
  ADDRESS      : '1001 Bannock St, Suite 660, Denver, CO 80204',
  HOURS        : 'Mon-Fri, 8AM-6PM Mountain Time',
  REVIEWS      : '5.0 from 60 Google reviews',
  BUBBLE_MS    : 25000,   // proactive bubble delay (research says 20-30s, not 3s)
  BADGE_MS     : 60000,   // unread nudge if never opened
  MIN_SCORE    : 2.4,     // confidence floor before we answer instead of falling back
  AMBIG_GAP    : 0.08,    // if #2 is within 8% of #1, ask which they meant
  INTERRUPT    : 4.5,     // score needed to answer a question mid-lead-capture
  IDLE_MS      : 50000,   // idle during capture → save the partial lead
  STEP_MS      : 900,     // pause before each lead-capture question
  CHAIN_MS     : 1250,    // pause before resuming the form after a mid-form answer
  MAX_TURNS_SOFT: 4,      // turns before Iris starts working a soft close
  VERSION      : 'iris-v7.0'
};

/* ─────────────── SMALL UTILITIES ─────────────── */
/* Apostrophes are stripped entirely, so don't→dont, what's→whats, I'm→im.
   Keeps every keyword list free of punctuation variants. */
function norm(s){
  return String(s == null ? '' : s).toLowerCase()
    .replace(/[\u2018\u2019\u02BC']/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function toks(s){ var a = norm(s).split(' '); return (a.length === 1 && a[0] === '') ? [] : a; }
/* Singularize every word in a string so multi-word keywords like "walk in tub"
   still match "walk in tubs". Used alongside tokSet by the phrase matcher. */
function singular(w){
  if (w.length <= 3) return w;
  if (w.slice(-3) === 'ies') return w.slice(0, -3) + 'y';        // agencies -> agency
  if (/(ses|xes|zes|ches|shes)$/.test(w)) return w.slice(0, -2);  // boxes -> box
  if (w.slice(-1) === 's' && w.slice(-2) !== 'ss') return w.slice(0, -1); // logos -> logo
  return w;
}
function normSing(s){
  var t = toks(s), i, out = [];
  for (i = 0; i < t.length; i++) out.push(singular(t[i]));
  return out.join(' ');
}
/* Index each token AND a singularised form, so "logos" matches the keyword
   "logo", "websites" matches "website", "billboards" matches "billboard".
   Without this, plurals only earned the weak stem bonus and routinely fell
   below MIN_SCORE — which is how "Do you do logos?" ended up being recorded
   as somebody's name. */
function tokSet(s){
  var t = toks(s), o = {}, i, w;
  for (i = 0; i < t.length; i++){
    w = t[i]; o[w] = 1; o[singular(w)] = 1;
  }
  return o;
}
function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function money(n){
  return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function num(n){
  var r = Math.round(n * 100) / 100;
  return String(r).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ─────────────── LIVE CLOCK — real dates, real office hours ─────────────── */
function denverNow(){
  try { return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })); }
  catch (e) { return new Date(); }
}
function officeOpen(){
  var d = denverNow(), day = d.getDay(), h = d.getHours();
  return day >= 1 && day <= 5 && h >= 8 && h < 18;
}
function nextOpenPhrase(){
  var d = denverNow(), day = d.getDay(), h = d.getHours();
  if (day >= 1 && day <= 5 && h < 8)  return 'We open at 8AM Mountain this morning.';
  if (day >= 1 && day <= 4 && h >= 18) return 'We reopen at 8AM Mountain tomorrow.';
  if (day === 5 && h >= 18)            return 'We reopen Monday at 8AM Mountain.';
  if (day === 6)                       return 'We reopen Monday at 8AM Mountain.';
  if (day === 0)                       return 'We reopen tomorrow at 8AM Mountain.';
  return 'We reopen at 8AM Mountain.';
}
function greetByHour(){
  var h = denverNow().getHours();
  if (h < 5)  return 'Up late, I see';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 22) return 'Good evening';
  return 'Burning the midnight oil';
}
function todayStr(){
  try {
    return new Date().toLocaleDateString('en-US',
      { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  } catch (e) { return new Date().toDateString(); }
}
function clockStr(){
  try { return denverNow().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' }); }
  catch (e) { return ''; }
}
function daysLeftInYear(){
  var n = new Date(), end = new Date(n.getFullYear(), 11, 31);
  return Math.max(0, Math.ceil((end - n) / 86400000));
}

/* ─────────────── LIVE MATH — because a bot that can't add looks silly ─────────────── */
function tryMath(raw){
  var s = String(raw == null ? '' : raw).toLowerCase().replace(/,/g, '').replace(/\$/g, '');
  var m = s.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)\s+of\s+(\d+(?:\.\d+)?)/);
  if (m) return { q: m[1] + '% of ' + m[2], v: (parseFloat(m[1]) / 100) * parseFloat(m[2]) };

  var expr = s
    .replace(/whats|what is|calculate|compute|equals|answer|please|\?/g, ' ')
    .replace(/\bx\b/g, '*').replace(/\btimes\b/g, '*')
    .replace(/divided by|\bover\b/g, '/')
    .replace(/\bplus\b/g, '+').replace(/\bminus\b/g, '-');
  var clean = expr.replace(/[^0-9+\-*/(). ]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean || !/\d/.test(clean) || !/[+\-*/]/.test(clean)) return null;
  if (clean.replace(/[^0-9]/g, '').length > 14) return null;   // no giant-number DoS
  if (/[+\-*/]{3,}/.test(clean)) return null;
  try {
    var val = Function('"use strict";return (' + clean + ');')();
    if (typeof val === 'number' && isFinite(val)) return { q: clean, v: val };
  } catch (e) {}
  return null;
}

/* ─────────────── 50 ORIGINAL JOKES — clean, marketing-flavoured ───────────────
   Gated: never fire during lead capture, pricing, or objection handling.        */
var JOKES = [
  "SEO is like planting a tree. Best time was five years ago. Second best time is right after this conversation. 🌳",
  "My favorite marketing metric is \"revenue.\" Deeply underrated. Very hot right now.",
  "A business with no reviews walks into a bar. Nobody notices.",
  "Your competitor's site loads in 1.2 seconds. Yours loads in 6. Guess who your customer married. 💍",
  "I'd tell you a joke about page two of Google, but nobody would ever see it.",
  "Marketing without conversion tracking is just expensive interpretive dance. 💃",
  "What do you call a website with no call-to-action? A very pretty dead end.",
  "I asked a business owner what his conversion rate was. He said \"pretty good.\" That is not a number, Gary.",
  "Two things I never trust: a 5.0 rating with three reviews, and a marketer who won't show you the analytics.",
  "The best time to start SEO is before your competitor reads this. ⏱",
  "A slow website is just a bounce rate with extra steps.",
  "My therapist says I have commitment issues. I've been \"about to start SEO\" since 2019.",
  "Nothing humbles a business owner like watching their nephew's website outrank them.",
  "Why did the landing page go to therapy? Too much unresolved friction.",
  "Ads are rent. SEO is a mortgage. Both get you a roof — only one builds equity. 🏠",
  "I love a good billboard. Great for reaching people who are legally required to watch the road.",
  "A marketer's favorite traffic is the kind that converts. Least favorite is I-25 at 5pm. 🚗",
  "Someone told me \"we don't need a website, we get everything from word of mouth.\" I asked how people find the word of mouth. Long pause.",
  "Your Google Business Profile is 40% filled out. So is a parachute with holes in it. Technically present. 🪂",
  "I don't have a favorite social platform. I have a favorite cost per acquisition.",
  "What do you call SEO results in 30 days? A sales pitch.",
  "Blogging is like the gym. Everyone knows it works. Almost nobody goes twice. 🏋️",
  "My love language is a form submission at 11pm. 💌",
  "Every business says they're \"the best in town.\" Google says: citation needed.",
  "The three scariest words in marketing: \"let's circle back.\"",
  "What's the difference between a lead and a customer? About four minutes of response time. ⏰",
  "I met a guy who spent $8,000 on a logo and $0 on a website. Beautiful logo. Nobody has ever seen it.",
  "Why do websites lose arguments? They keep getting bounced.",
  "A/B testing is just letting customers vote — except they don't know they're voting, so the results are honest. 🗳",
  "What's a chatbot's favorite exercise? Running conversions. 🏃",
  "I'm not saying your checkout is slow, but I aged during it.",
  "Nothing says \"trust me with your money\" like a contact page with no phone number.",
  "Half of marketing works. The problem is everyone thinks they know which half. (Check your analytics. It's in there.)",
  "What do you call a business that ignores its reviews? Formerly a business.",
  "My favorite genre of fiction is \"we'll get to the website next quarter.\" 📚",
  "Google Ads turns dollars into clicks. Whether clicks become customers is entirely up to your landing page.",
  "Why was the keyword sad? No search volume. No friends. 😢",
  "If your marketing plan is \"post more on Facebook,\" I have some gentle news about organic reach.",
  "The most expensive word in advertising is \"whatever.\"",
  "I have never once seen a business fail from too many five-star reviews. ⭐",
  "Somebody asked if SEO is dead. I said yes — then ranked the obituary.",
  "The best marketing budget is the one you can actually measure. 📊",
  "A gym membership and a marketing retainer have the same catch: both only work if you show up.",
  "My favorite thing about Denver is the altitude. Second favorite is watching local businesses climb the map pack. ⛰",
  "If you build it, they will come. If you build it AND optimize it, they'll come and they'll convert.",
  "Why was the marketer thrown out of the bakery? Kept trying to A/B test the donuts. 🍩",
  "Some agencies sell rankings. We sell the phone ringing. Only one of those pays your rent. ☎️",
  "A website with no analytics is a car with no speedometer. You're moving! Somewhere! Fast? Unclear! 🚙",
  "Second-best time to fix your Google Business Profile: right now. Best time: also right now.",
  "I'd make a joke about zero-click search, but you wouldn't click it anyway."
];

/* Joke deck — shuffled, no repeats until the deck is exhausted, then reshuffled.
   Without this, pick() on JOKES would repeat within a handful of requests and
   "Another one" would frequently return the joke you just read. */
var jokeDeck = [], jokeIdx = 0;
function shuffleJokes(){
  jokeDeck = JOKES.slice();
  for (var i = jokeDeck.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = jokeDeck[i]; jokeDeck[i] = jokeDeck[j]; jokeDeck[j] = t;
  }
  jokeIdx = 0;
}
function nextJoke(){
  if (!jokeDeck.length || jokeIdx >= jokeDeck.length) shuffleJokes();
  return jokeDeck[jokeIdx++];
}

/* ─────────────── SOFT CLOSES — rotate so it never sounds canned ─────────────── */
var CLOSES = [
  "Want to grab 15 minutes with a real marketing strategist? No obligation — worst case you walk away with a couple of ideas you can run yourself. 📅",
  "Here's an honest offer: a free 15-minute growth strategy session. No pitch deck, no pressure. You'll at least leave with a clearer picture of what's working and what isn't.",
  "I can talk strategy all day, but a human can look at your actual site and tell you exactly what's leaking. Want me to set that up?",
  "Fastest path from here is 15 minutes with someone who does this daily. What have you got to lose besides 15 minutes? 😄",
  "Want a free audit? We'll show you where your leads are going instead of to you — and you keep the findings whether you hire us or not.",
  "Shall I grab your details so a strategist can reach out? Takes about 60 seconds and we usually call back same day.",
  "If you'd rather just talk to a person — " + CFG.PHONE_MAIN + ". A real human answers. Or I can have someone call you.",
  "No-obligation 15-minute session: we look at your market, your competitors, and where the gaps are. You'll get ideas either way."
];

/* ─────────────── ROUTE TABLES (populated below) ─────────────── */
var KB = [];        // knowledge base + objections
var INTENTS = [];   // action routes


/* ══════════ KB: WHO WE ARE ══════════ */
KB.push(
{id:'about', fam:'core',
 k:['who are you guys','eye to ad media','eyetoad','your agency','about the company','about the agency','tell me about you','tell me about your company','what is eye to ad','your company','who is this company','about you guys'],
 a:"Short version: we're a Denver-born growth agency that's mildly obsessed with conversions. 🎯\n\nEye To Ad Media — founded 2012 by Zach Wennstedt. BBB Accredited with an A+ rating, and " + CFG.REVIEWS + ". Powered by our parent company, Search Converts LLC.\n\n📍 " + CFG.ADDRESS + "\n🌎 US-based, serving clients across the United States, Canada and worldwide\n\nThe belief that drives everything: all the marketing in the world is pointless without conversions. We don't celebrate rankings — we celebrate your phone ringing.\n\nWe're not perfect. But we genuinely care about growing your business.",
 c:['What do you do?','Why you over another agency?','*Free growth audit|i_audit','Talk to a human']},

{id:'founder', fam:'core',
 k:['zach','wennstedt','founder','who founded','owner','who owns','who runs','ceo','who started'],
 a:"Zach Wennstedt — founder of Eye To Ad Media. 👋\n\nBackground is marketing expertise and driving sales revenue, and he's a genuinely passionate entrepreneur and humanitarian. Started the agency in Denver in 2012 and still works directly with clients — this isn't an outfit where you meet the founder once and never again.\n\nIf you want to talk to him, " + CFG.PHONE_MAIN + " gets you to a real human, or I can pass along your details.",
 c:['*Have Zach reach out|i_capture','About the agency','Our services']},

{id:'contact', fam:'core',
 k:['contact','phone number','email address','how do i reach you','how to contact','get in touch','reach you','your number','call you','whatsapp','email you','contact info'],
 a:function(){
   return "Here's how to reach actual humans: 📞\n\n📱 Toll-free: " + CFG.PHONE_MAIN + "\n📱 Direct: " + CFG.PHONE_LOCAL + "  (also our WhatsApp 💬)\n✉️ " + CFG.LEAD_EMAIL + "\n🏢 " + CFG.ADDRESS + "\n⏰ " + CFG.HOURS + "\n\n" + (officeOpen() ? "We're open right now — someone will actually pick up. ✅" : "We're closed at the moment. " + nextOpenPhrase() + " Leave your details and you'll hear back first thing.");
 },
 c:['*Leave my details for a callback|i_capture','Book a 15-min session|i_capture','Thanks!']},

{id:'hours', fam:'core',
 k:['hours','open','open now','open right now','open today','are you open','you open','office hours','closed','when are you open','still open','business hours','what time are you open'],
 a:function(){
   return (officeOpen()
     ? "We're open right now. ✅\n\n" + CFG.HOURS + " — and it's currently " + clockStr() + " in Denver.\n\nCall " + CFG.PHONE_MAIN + " and a human answers. Not a phone tree, not another bot. (I'm the only bot here and I'm quite proud of that.)"
     : "We're closed right now. 🌙\n\n" + nextOpenPhrase() + " Our hours are " + CFG.HOURS + " — it's " + clockStr() + " in Denver at the moment.\n\nBut I never sleep, so ask me anything. And if you leave your details, you'll be first in the queue when we open.");
 },
 c:['*Leave my details|i_capture','Ask a question|i_more','Contact info']},

{id:'location', fam:'core',
 k:['where are you','location','address','office','based','headquarters','denver office','what city','are you local','bannock'],
 a:"We're at " + CFG.ADDRESS + " — right in the heart of Denver. 🏔\n\nBut geography matters less than it used to. We're US-based and work with clients across the United States, Canada, and internationally. We also run a network of tourism and travel websites in Belize, Costa Rica, the Dominican Republic and Hawaii, so \"remote client\" is very much our normal.\n\nLocal to Denver? Even better — we know this market cold.",
 c:['Do you work outside Denver?','*Free growth audit|i_audit','Talk to a human']},

{id:'servicearea', fam:'core',
 k:['outside denver','outside of denver','work outside','out of state','nationwide','other states','other countries','international','canada','worldwide','global','serve nationally','somewhere else','no somewhere else','my area','different state'],
 a:"Yes — anywhere. 🌎\n\nWe're headquartered in Denver but we work with clients across the United States, Canada, and globally. We also operate tourism and travel site networks in Belize, Costa Rica, the Dominican Republic and Hawaii, so international is genuinely routine for us.\n\nWhat actually matters isn't where you are — it's whether we understand your market and your customer. That's a conversation, not a zip code.\n\nWhere are you based? I'll tell you straight if we're a fit.",
 c:['*Get a free audit','Pricing','Talk to a human']},

/* CONTRACT WORDING (v5.6): the second bullet used to read "No long-term
   contracts. We keep clients by producing results, not by trapping them."
   That is an absolute claim and it is not accurate — terms are set per
   engagement. The replacement keeps the reassurance and stays true. */
{id:'why', fam:'core',
 k:['why you','why choose','what makes you different','different from other agencies','why should i','what sets you apart','why hire you','competitive advantage','better than'],
 a:"Fair question. Here's the honest pitch. 🎯\n\n**We're conversion-first, not ranking-first.** Plenty of agencies will show you a chart of keywords going up while your phone stays silent. Rankings without revenue is a vanity project.\n\n**Terms are set per engagement.** Month-to-month is available and is what most clients run on. Bigger builds with real upfront production sometimes carry a defined term — and you'd know which applies before signing anything, not after.\n\n**Deliberately small roster.** Every account gets real human attention. You'll know who's working on your business.\n\n**We build for AI search, not just Google.** AIO, GEO, agentic systems. Most agencies haven't started.\n\n**We're not perfect** — and we'll tell you when something isn't working instead of burying it in a report.",
 c:['*Free growth audit|i_audit','Pricing','Talk to a human','Our services']},

{id:'credentials', fam:'core',
 k:['bbb','accredited','are you legit','trustworthy','legit','credentials','how long in business','how much experience','established','since when','track record','your rating','your reviews'],
 a:"Fair to ask — plenty of agencies are two guys and a laptop. 📋\n\n• Founded 2012 — 14 years in, through every major algorithm shift\n• BBB Accredited, A+ rating\n• " + CFG.REVIEWS + "\n• Regarded as one of the top Denver SEO agencies\n• Parent company: Search Converts LLC\n• Real Denver office at " + CFG.ADDRESS + "\n\nWe'll happily show you actual client work rather than just telling you about it.",
 c:['*Free growth audit|i_audit','Talk to a human','Why you over another agency?']},

{id:'searchconverts', fam:'core',
 k:['search converts','searchconverts','parent company','related companies','other brands','sister company'],
 a:"Good eye. 👀\n\nEye To Ad Media is powered by our parent company, Search Converts LLC. Same team, same standards — Search Converts is the broader growth-systems arm, Eye To Ad Media is the brand most clients work with day to day.\n\nThe name isn't an accident, by the way. Search that converts. That's the entire thesis.",
 c:['About the agency','Our services','*Free growth audit|i_audit']},

{id:'services', fam:'core',
 k:['services','what do you offer','what do you do','full list','everything you do','full menu','capabilities','what can you help with','what can you do','list of services','all services','offerings'],
 a:"We do a lot. Here's the whole menu — grouped by what it's actually for. 📋\n\n🔍 **Get found** — SEO, Local SEO & Google Maps, AIO, GEO, agentic SEO, technical audits, content strategy, Google Business Profile\n\n💰 **Buy attention** — Google Ads, Local Services Ads, remarketing, programmatic display, social ads, video & YouTube, TV & streaming, radio, direct mail, billboards, trade shows, door knocking\n\n💻 **Convert it** — websites, apps, landing pages, e-commerce, CRO & A/B testing, video production, branding, logo, graphic & print design, NFC\n\n🔁 **Keep them** — email & nurture, referral programs, affiliate programs, reviews & reputation, retention systems\n\n🧱 **Run it** — CRM setup, call tracking, sales process, call scripts, staff training, proposals, merchant processing, business planning & consulting\n\nWhat's the actual goal you're chasing? I'll point you at the right piece.",
 c:['I need more leads','I need a website','Get found on Google','*Free growth audit|i_audit']},

/* CONTRACT WORDING (v5.6): step 3 used to end "Month-to-month, no long-term
   lock-in." Same correction as `why` above. */
{id:'process', fam:'core',
 k:['how do we start','how do we get started','get started','getting started','next steps','how does it work','what happens','onboarding','first step','process','how do you work','what is the process','begin'],
 a:"Simple, and it starts free. 🚀\n\n**1. Free audit** — we look at your site, your Google Business Profile, your rankings, your competitors and your conversion path. You get real findings, not a 40-page PDF nobody reads. No contract, no obligation, no card.\n\n**2. Strategy session** — 15 to 30 minutes. We tell you what we'd actually do and roughly what it costs. No obligation.\n\n**3. Proposal** — scoped to your goals and market. Terms are set per engagement; month-to-month is available and is what most clients run on.\n\n**4. Build & launch** — first 30 days is foundation: technical fixes, GBP, tracking, conversion path.\n\n**5. Monthly reporting** — rankings, leads, calls, revenue. The metrics that pay your rent.\n\nStep one costs nothing. Want it?",
 c:['*Yes, start my free audit|i_audit','Pricing','How long does it take?|obj_timeline','Talk to a human']},

{id:'reporting', fam:'core',
 k:['reporting','reports','what do i get','deliverables','track progress','measure','kpi','dashboard','monthly report','how will i know','proof','results tracking'],
 a:"You get numbers that tie to money, not vanity metrics. 📊\n\nEvery month:\n• Keyword and map pack ranking movement\n• Calls, form fills and chats — with source attribution\n• Traffic by channel and what it actually did\n• AI search visibility — where you're getting cited\n• What we did, what we're doing next, what we'd change\n\nWe set up call tracking and conversion tracking properly at the start, because \"traffic is up\" is a useless sentence if nobody's calling.\n\nHonest note: attribution is genuinely hard, and plenty of businesses cannot confidently say which channel produced last month's customers. We'd rather show you a real number with a caveat than a pretty one that's fiction.",
 c:['*Free growth audit|i_audit','Pricing','Talk to a human']},

{id:'whoworks', fam:'core',
 k:['who does the work','in house','outsourced','offshore','subcontract','your team','how many people','account manager','who will i work with'],
 a:"You work with our team — not a call center and not a subcontractor chain. 🙋\n\nWe keep the client roster deliberately small precisely so that's possible. You'll know who's on your account and you can reach them.\n\nThat's also why we're honest when we're not the right fit. Taking on work we can't do properly is how agencies end up with the reputation the whole industry has.",
 c:['Why you over another agency?','*Free growth audit|i_audit','Talk to a human']}
);

/* ══════════ THE MOST IMPORTANT ENTRY IN THE WHOLE KB ══════════
   "I need more customers" is what most visitors actually type. It is not a
   tactic question — it is three completely different problems wearing one
   sentence. This entry diagnoses before it recommends.                       */
KB.push(
{id:'growth', fam:'core', w:1.12,
 k:['more customers','more leads','more calls','more sales','more clients','more business','more work','more revenue','more jobs','new customers','new clients','get customers','get clients','get more customers','get more leads','get more calls','grow my business','grow the business','grow our business','help me grow','i want to grow','need to grow','need marketing','i need marketing','we need marketing','business is slow','slow business','not enough business','phone isnt ringing','phone is not ringing','phone not ringing','nobody finds us','no one finds us','nobody can find us','need exposure','more exposure','more visibility','get found','drum up business','increase sales','boost sales','need work','what should i do','where do i start','need customers','win more work'],
 a:"That is my favorite thing to work on. \uD83C\uDFAF\n\nAnd it is the right question — most people ask about tactics before they have named the problem.\n\nQuick diagnostic, because \"more customers\" is really three very different problems wearing the same sentence:\n\n**1. Nobody knows you exist.** Plenty of capacity, not enough people finding you. That is a visibility problem — search, Maps, ads.\n\n**2. People find you but do not call.** Traffic arrives and leaves. That is a conversion problem — and more traffic would just mean more people leaving.\n\n**3. Leads come in and go cold.** They contact you and nothing closes. That is a follow-up problem, and it is the cheapest of the three to fix.\n\nWhich sounds most like you? Genuinely — the answer changes everything I would recommend, and it is the difference between spending money well and spending it twice.",
 c:['Nobody knows we exist|seo','They visit but dont call|cro','Leads go cold|speedtolead','*Not sure - audit me|i_audit']}
);

/* ══════════ KB: SEARCH & ORGANIC ══════════ */
KB.push(
{id:'seo', fam:'search',
 k:['seo','search engine optimization','rank on google','ranking','rank higher','get found on google','organic','organic traffic','google ranking','page one','first page','search rankings','improve rankings','nobody knows we exist','visibility problem','cant be found'],
 a:"SEO is the long game that eventually makes everything else cheaper. 🔍\n\nWhat we actually do:\n• **Technical** — speed, crawlability, indexation, Core Web Vitals, schema. The plumbing.\n• **On-page** — content that answers real questions, structured so Google and AI can extract it\n• **Local** — Maps, the 3-pack, Google Business Profile, citations\n• **Authority** — links and mentions from places that matter\n• **AI search** — AIO and GEO, because a growing share of searches now end without a click\n\nRealistic timeline: meaningful movement in 3-6 months, competitive terms 6-12. Maps often moves faster — sometimes 30-60 days.\n\nAnyone promising page one in 30 days is selling you something. 🚩",
 c:['How long does it take?|obj_timeline','What is local SEO?|localseo','What is AIO?|aio','*Free SEO audit|i_audit']},

{id:'localseo', fam:'search',
 k:['local seo','local search','map pack','google maps','3 pack','three pack','near me','local rankings','maps ranking','local pack','show up on maps','local customers'],
 a:"For a local business this is usually the single highest-ROI thing you can do. 📍\n\nThe map pack — those three listings above the blue links — takes the lion's share of local clicks. And here's the useful part: it ranks on *different* signals than organic, so you can win it faster.\n\nWhat moves it:\n• Google Business Profile completeness — categories, services, hours, photos, Q&A, posts\n• Review volume, rating and how recently they arrived\n• Proximity and service-area setup\n• Local citations with consistent NAP\n• Location-relevant content on your site\n\nMost businesses have a half-finished profile and don't realise it's costing them the pack.\n\nWant me to have someone look at yours? Takes ten minutes and it's free.",
 c:['*Check my Google profile|i_audit','What about reviews?|reviews','SEO explained|seo','Talk to a human']},

{id:'gbp', fam:'search',
 k:['google business profile','gbp','google my business','gmb','business listing','google listing','my listing','claim my business','business profile'],
 a:"Your Google Business Profile is the most undervalued free asset in local marketing. 🏪\n\nWhat we optimise:\n• Primary and secondary categories — enormous impact, usually set wrong\n• Services and products with real descriptions\n• Photos and video, updated regularly\n• Q&A — you can seed the questions customers actually ask\n• Posts, offers and events\n• Review generation and response\n• Service area and hours accuracy\n\nIt's free, it drives the map pack, and it's now one of the primary things AI assistants read when deciding whether to recommend you at all. A half-finished profile doesn't just rank lower — it can get skipped entirely.",
 c:['Local SEO|localseo','Reviews|reviews','*Free profile audit|i_audit']},

{id:'aio', fam:'search',
 k:['aio','ai overview','ai overviews','ai search','sge','google ai','ai results','appear in ai','ai answers','chatgpt search','get cited by ai','ai optimization'],
 a:"AIO — AI Optimization. Getting your business into the AI-generated answer at the top, not just the blue links below it. 🤖\n\nThis genuinely matters now. A large share of searches end without anyone clicking a website, because the answer was already given. If the answer doesn't mention you, you were never in the running.\n\nWhat gets you cited:\n• Direct answers to real questions, stated plainly and early\n• Question-shaped headings\n• Structured data and schema so machines can parse you\n• Facts that are checkable and consistent everywhere you appear\n• Genuine authority signals, not keyword density\n\nOne counter-intuitive finding worth knowing: promotional, superlative-heavy writing gets cited *less*. Flat, factual, specific writing gets cited more. Which is annoying for marketers and excellent for honest businesses.",
 c:['What is GEO?|geo','Agentic AI|agentic','SEO explained|seo','*Free AI visibility check|i_audit']},

{id:'geo', fam:'search',
 k:['geo','generative engine optimization','chatgpt','perplexity','claude','gemini','ai citations','llm','get recommended by ai','ai recommend'],
 a:"GEO — Generative Engine Optimization. Being the business ChatGPT, Perplexity, Gemini and Claude recommend when someone asks. 🌐\n\nDifferent from SEO in an important way: there's no ranking position. You're either in the answer or you're invisible. There is no page two.\n\nWhat earns citation:\n• Entity clarity — consistent name, address, phone, services, everywhere\n• Being referenced by sources the models already trust\n• Content that reads like reference material rather than a brochure\n• Structured data that makes your facts machine-readable\n• Reviews and third-party mentions that corroborate what you claim\n\nTry it right now: ask ChatGPT for the best business in your category in your city. If you're not in the answer, that's a fixable problem — and most of your competitors haven't noticed it yet.",
 c:['What is AIO?|aio','Agentic AI|agentic','*Check my AI visibility|i_audit']},

{id:'agentic', fam:'search',
 k:['agentic','ai agent','ai agents','autonomous ai','agentic seo','ai assistant booking','agent recommend','ai booking','agentic booking','ai calls my business'],
 a:"This is the one almost nobody is ready for. 🦾\n\nAgentic AI means autonomous systems that research, compare and shortlist businesses *on the customer's behalf* — the customer never sees a results page at all.\n\nAnd in 2026 it stopped being theoretical. Google announced agentic booking for local services at I/O in May, covering categories like home repair, beauty and pet care. In some cases the assistant will telephone the business to confirm availability. If nobody answers, it moves to the next provider on the list.\n\nWhat that means practically:\n• Your hours, pricing and availability need to be accurate and machine-readable\n• Your Business Profile needs to be complete, not 60% filled in\n• Somebody needs to answer the phone\n• Your facts need to agree with each other across every platform\n\nThe uncomfortable part: an agent doesn't give you a second look. It picks from what it can verify.",
 c:['What is GEO?|geo','What is AIO?|aio','*Am I agent-ready? Audit me|i_audit']},

{id:'technical', fam:'search',
 k:['technical seo','site speed','core web vitals','crawl','index','indexing','not indexed','site errors','broken','404','redirect','migration','https','mobile friendly','schema','structured data'],
 a:"Technical SEO is the unglamorous part that everything else depends on. ⚙️\n\nCommon things we find:\n• Pages Google can't crawl or has silently dropped from the index\n• Slow load times — especially on mobile, which is where most of your traffic is\n• Broken redirect chains after a site rebuild\n• Missing or malformed schema, so machines can't parse the page\n• Duplicate content competing with itself\n• Mobile layouts that technically work but are painful to use\n\nNone of it is exciting. All of it is load-bearing. You can write the best content in your market and it won't matter if the page takes eight seconds to render on a phone.",
 c:['Site speed|speed','SEO explained|seo','*Free technical audit|i_audit']},

{id:'speed', fam:'search',
 k:['site speed','slow website','page speed','loading slow','load time','fast website','performance','core web vitals','my site is slow'],
 a:"Speed is a conversion issue first and a ranking issue second. ⚡\n\nEvery second of delay costs you visitors — and on mobile, on a real connection, in a parking lot, it costs you more than the desktop numbers suggest.\n\nWhat usually causes it:\n• Enormous unoptimised images\n• Too many plugins and third-party scripts\n• Render-blocking CSS and JavaScript\n• Cheap shared hosting\n• Bloated page builders generating four times the markup needed\n\nThe fix is usually not a rebuild. It's usually images, caching, and deleting things nobody needed.",
 c:['Technical SEO|technical','Website design|website','*Free speed check|i_audit']},

{id:'content', fam:'search',
 k:['content','blog','blogging','articles','content marketing','writing','copywriting','blog posts','content strategy','should i blog'],
 a:"Content works. Content published for its own sake does not. ✍️\n\nThe difference is intent. A post that answers a question your customer actually asks before buying earns traffic that converts. A post written to hit a keyword quota earns nothing and quietly dilutes your site.\n\nWhat we build:\n• Service pages that rank and convert\n• Genuine answers to pre-purchase questions\n• Local and neighbourhood pages where they're warranted — not 200 doorway pages\n• Comparison and buying-guide content, which AI systems cite heavily\n• Content structured so it can be extracted into an AI answer\n\nWorth saying plainly: AI Overviews have hit informational blog traffic hard. Content strategy in 2026 has to be written to be *quoted*, not just to be visited.",
 c:['What is AIO?|aio','SEO explained|seo','*Free content audit|i_audit']},

{id:'keywords', fam:'search',
 k:['keywords','keyword research','what keywords','search terms','target keywords','keyword strategy','which keywords'],
 a:"Keyword research is really demand research. 🔑\n\nThe mistake most people make is chasing volume. A term with 10,000 searches and no buying intent is worth less than one with 90 searches from people holding a credit card.\n\nWhat we look at:\n• Intent — is this someone learning, comparing, or ready to buy?\n• Realistic difficulty against your current authority\n• Local modifiers and \"near me\" variants\n• The conversational, sentence-length queries people now type into AI\n• What your competitors rank for that you don't\n\nThat last one is usually the fastest map to easy wins.",
 c:['SEO explained|seo','Content|content','*Free keyword audit|i_audit']},

{id:'links', fam:'search',
 k:['backlinks','links','link building','domain authority','authority','citations','directory','guest post','buy links'],
 a:"Links still matter. Bought links still get you hurt. 🔗\n\nWhat we do:\n• Local citations with consistent NAP across the directories that count\n• Genuine industry and association listings\n• Digital PR — being worth mentioning\n• Partner, supplier and sponsorship links you've actually earned\n• Reclaiming mentions of your brand that never got linked\n\nWhat we won't do: private blog networks, bulk purchased links, or anything that puts your domain at risk to make a chart look better this quarter.\n\nIf an agency quotes you \"500 backlinks for $299,\" that's not a bargain, it's a liability.",
 c:['SEO explained|seo','Reviews|reviews','*Free audit|i_audit']},

{id:'schema', fam:'search',
 k:['schema','structured data','json ld','markup','rich results','rich snippets','microdata'],
 a:"Schema is how you explain your business to a machine in a language it can't misread. 🏷\n\nIt matters more every year. Search engines use it for rich results, and AI systems lean on it heavily when deciding what your business *is* and whether the facts about you are trustworthy.\n\nWhat we implement:\n• LocalBusiness / Organization with complete NAP and geo data\n• Service nodes with provider and area served\n• FAQ markup that mirrors what's visible on the page\n• Person markup for owners and key staff\n• Product and Offer where relevant\n\nOne rule we hold to: markup must match what a human sees on the page. Schema that claims things the page doesn't say is how sites get manual actions.",
 c:['Technical SEO|technical','What is AIO?|aio','*Free audit|i_audit']},

{id:'ecomseo', fam:'search',
 k:['ecommerce seo','online store seo','shopify seo','product pages','woocommerce','store rankings','sell online'],
 a:"E-commerce SEO is a different animal — the wins are structural. 🛒\n\nWhere the money usually is:\n• Category pages, which most stores neglect entirely in favour of product pages\n• Product schema with real availability and pricing\n• Faceted navigation that isn't generating thousands of junk URLs\n• Genuinely unique product descriptions instead of the manufacturer's feed\n• Review markup and real customer content\n• Speed — checkout abandonment is brutally sensitive to it\n\nAnd increasingly: making sure AI shopping assistants can read your catalogue at all.",
 c:['Website design|website','Conversion optimization|cro','*Free store audit|i_audit']},

{id:'multiloc', fam:'search',
 k:['multiple locations','multi location','franchise','several locations','branches','each location','multi site'],
 a:"Multi-location is where consistency becomes the whole game. 🏢\n\nWhat it takes:\n• A separate, genuinely distinct page per location — not the same page with the city swapped\n• A claimed and fully built Business Profile for each\n• Consistent NAP everywhere, which sounds trivial and never is\n• Review generation per location, not pooled\n• Clear service-area definitions so locations don't cannibalise each other\n\nThe failure mode is always the same: one location gets attention, the rest rot, and the inconsistency drags down the whole brand's entity confidence.",
 c:['Local SEO|localseo','Google Business Profile|gbp','*Free audit|i_audit']},

{id:'intlseo', fam:'search',
 k:['international seo','other countries','multiple languages','spanish site','translate','hreflang','global seo','bilingual'],
 a:"International and multilingual SEO — we do a fair amount of this. 🌍\n\nWe run site networks in Belize, Costa Rica, the Dominican Republic and Hawaii, several of them bilingual English/Spanish, so this isn't theoretical for us.\n\nWhat matters:\n• Proper hreflang so the right language version surfaces for the right visitor\n• Real translation, not machine output nobody proofread\n• Local hosting or CDN so pages load quickly in-market\n• Country-specific citations and directories\n• Currency, phone format and address conventions that match local expectations\n\nHalf-done multilingual is worse than English-only — it signals carelessness to both users and search engines.",
 c:['SEO explained|seo','Website design|website','*Talk to a human|i_human']}
);

/* ══════════ KB: PAID MEDIA & OUTBOUND ══════════ */
KB.push(
{id:'ppc', fam:'paid',
 k:['ppc','google ads','adwords','paid ads','paid search','pay per click','sem','run ads','ad campaign','bing ads','search ads'],
 a:"Google Ads buys you the top of the page today. That's its strength and its weakness. 💰\n\nStrength: you can be live this afternoon and know within two weeks whether the market wants what you sell.\n\nWeakness: it stops the moment you stop paying. It's rent, not equity.\n\nWhat we do:\n• Search campaigns built around buying intent, not vanity terms\n• Negative keyword lists, which is where most wasted spend hides\n• Landing pages that match the ad — the single biggest lever on cost per lead\n• Conversion tracking configured properly, including calls\n• Remarketing to people who already showed interest\n\nHonest take: the best use of ads for most businesses is to fund the market research while SEO compounds underneath it.",
 c:['SEO vs Ads?|obj_ads','Landing pages|landing','*Free ads audit|i_audit']},

{id:'lsa', fam:'paid',
 k:['local services ads','lsa','google guaranteed','google screened','pay per lead','local service ad'],
 a:"Local Services Ads sit above everything — above the regular ads, above the map pack. 🛡\n\nYou pay per lead rather than per click, and you carry the Google Guaranteed or Google Screened badge, which does real work on trust.\n\nWhat it takes:\n• Background checks and license verification\n• Insurance documentation\n• A strong review profile — it directly affects how often you're shown\n• Fast response to leads, because responsiveness feeds the ranking\n\nBest fit: home services, legal, and a growing list of professional categories. Not available everywhere or for every trade, so the first question is always whether your category qualifies.",
 c:['Google Ads|ppc','Reviews|reviews','*Am I eligible? Ask a human|i_human']},

{id:'remarketing', fam:'paid',
 k:['remarketing','retargeting','follow people around','abandoned','come back','pixel','retarget'],
 a:"Remarketing is the cheapest advertising most businesses aren't running. 🎯\n\nThe logic is simple: someone who already visited your site is dramatically more likely to convert than a stranger. Yet most businesses spend everything acquiring the first visit and nothing on the second.\n\nWhat we set up:\n• Display and search remarketing across Google's network\n• Social remarketing for people who engaged but didn't act\n• Cart and form abandonment sequences\n• Frequency caps, because there's a line between present and creepy and it's easy to cross\n\nIt requires the tracking pixel to have been installed a while ago, which is the usual reason people can't start immediately. If you have no pixel, today is the day to fix that.",
 c:['Google Ads|ppc','Email marketing|email','*Free audit|i_audit']},

{id:'programmatic', fam:'paid',
 k:['programmatic','display ads','banner ads','ad network','dsp','audience targeting','display network'],
 a:"Programmatic display buys attention at scale. Useful for awareness, poor for direct response on its own. 📺\n\nWhere it earns its place:\n• Reaching a defined audience before they're actively searching\n• Geographic and demographic targeting for local brand building\n• Supporting a launch, a new location, or a seasonal push\n• Reinforcing a message people are already encountering elsewhere\n\nWhere it disappoints: expecting it to produce leads the way search does. It doesn't, and any agency implying otherwise is setting you up to be unhappy in month three.\n\nIt works best layered on top of channels that already convert.",
 c:['Google Ads|ppc','Social ads|socialads','*Talk to a human|i_human']},

{id:'socialads', fam:'paid',
 k:['facebook ads','instagram ads','social ads','meta ads','tiktok ads','linkedin ads','social media advertising','boost post'],
 a:"Social ads interrupt. Search ads intercept. Both work — for different jobs. 📱\n\nSocial is strong for:\n• Visual products and services where seeing it creates the want\n• Local awareness in a defined radius\n• Retargeting people who visited your site\n• Building an audience before you need it\n• B2B on LinkedIn, where the targeting is genuinely unmatched\n\nSocial is weak for:\n• Urgent-need services. Nobody scrolling Instagram at 11pm suddenly needs a plumber — and if they do, they're searching, not scrolling.\n\nOne caution: boosting posts from the app is not advertising. It's the most expensive way to buy the least useful clicks.",
 c:['Google Ads|ppc','Social ads|socialads','*Free audit|i_audit']},

{id:'video', fam:'paid',
 k:['video','youtube','video ads','video production','video marketing','commercials','film','video content'],
 a:"Video does two jobs, and it's worth being clear which one you're buying. 🎬\n\n**Trust video** — the about page, the team, the process, a real customer talking. This doesn't need to go viral. It needs to make a hesitant visitor comfortable. Highest ROI video most local businesses can make.\n\n**Reach video** — YouTube ads, social video, streaming. Buys attention from people who don't know you.\n\nWe produce both. And on YouTube specifically, the targeting is underrated — you can put your ad in front of people watching content about the exact problem you solve.\n\nThe common mistake is spending the entire budget on one beautiful brand film and having nothing left to put it in front of anyone.",
 c:['TV & streaming|tv','Social ads|socialads','*Talk about video|i_capture']},

{id:'tv', fam:'paid',
 k:['tv','television','ott','ctv','streaming ads','connected tv','hulu','roku','tv commercial','tv advertising'],
 a:"TV isn't what it was — connected TV made it accessible to businesses that could never afford broadcast. 📺\n\nWhat's changed:\n• You can target by geography, household and interest rather than buying a whole market\n• Minimums are dramatically lower than traditional spots\n• You get actual measurement rather than a ratings estimate\n• Streaming inventory reaches audiences broadcast lost years ago\n\nWhere it fits: brand building and credibility for businesses with a real service area and a reason to be trusted. Home services, healthcare, legal, auto.\n\nWhere it doesn't: as your only channel, or as a direct-response engine. It makes everything else work better; it rarely works alone.",
 c:['Video production|video','Radio|radio','*Talk to a human|i_human']},

{id:'radio', fam:'paid',
 k:['radio','radio ads','podcast ads','audio ads','spotify ads','radio advertising','podcast sponsorship'],
 a:"Audio is underrated for local businesses with a memorable offer. 🎙\n\nTraditional radio still reaches commuters, and Denver has a lot of those. Podcast and streaming audio reach engaged listeners who genuinely trust the host — which is a different and often better kind of attention.\n\nWhat makes audio work:\n• A single, simple, repeated message. Audio is a terrible medium for nuance.\n• A memorable phone number or an extremely simple URL\n• Frequency. One spot is money set on fire; consistent presence builds recall.\n• A tracked number so you actually know whether it worked\n\nWhat kills it: cramming eight benefits into thirty seconds. Nobody remembers any of them.",
 c:['TV & streaming|tv','Video|video','*Talk to a human|i_human']},

{id:'directmail', fam:'paid',
 k:['direct mail','mailers','postcards','eddm','flyers','mail campaign','physical mail'],
 a:"Direct mail is unfashionable, which is exactly why it works better than it used to. 📬\n\nThe inbox is a warzone. The mailbox has almost nothing in it. A well-designed piece gets held, read and sometimes kept on the fridge for months.\n\nWhere it performs:\n• Neighbourhood targeting around a job you just completed\n• Home services, especially with a seasonal hook\n• New-mover and new-homeowner lists\n• Reactivating past customers who've gone quiet\n\nWhat it needs: a genuinely good offer, a tracked number or code, and enough repetition that it isn't a one-off. And it works far better when the recipient can then find you online and see you're legitimate — mail plus search beats either alone.",
 c:['Billboards|billboards','NFC marketing|nfc','*Talk to a human|i_human']},

{id:'billboards', fam:'paid',
 k:['billboard','billboards','outdoor advertising','ooh','bus ads','signage','vehicle wrap','bench ads'],
 a:"Outdoor is a memory play, not a lead play. 🛣\n\nSix words, big type, and one thing you want remembered. That's the whole medium. People are driving.\n\nWhere it earns its keep:\n• Route dominance near your location\n• Category ownership — being the name people think of first\n• Supporting other channels, because familiarity lifts click-through everywhere else\n\nWhat wastes it: a phone number nobody can write down at 65mph, a paragraph of copy, or a QR code on a highway board.\n\nBest used when you already convert well and want more people to know you exist.",
 c:['Direct mail|directmail','TV & streaming|tv','*Talk to a human|i_human']},

{id:'events', fam:'paid',
 k:['trade show','events','conference','booth','expo','sponsorship','local event','fairs'],
 a:"Events are expensive per conversation and outstanding per relationship. 🎪\n\nThey work when you plan for the follow-up rather than the booth. Most businesses spend everything on the display and nothing on what happens in the week afterwards, which is where the entire return lives.\n\nWhat we help with:\n• Booth graphics, print and collateral\n• A lead capture method that isn't a fishbowl of business cards\n• NFC cards and instant digital handoff\n• Follow-up sequences that go out while you're still memorable\n• Landing pages specific to the event\n\nThe rule: if you can't follow up within 48 hours, don't buy the booth.",
 c:['NFC marketing|nfc','Print design|graphic','*Talk to a human|i_human']},

{id:'doorknock', fam:'paid',
 k:['door knocking','door to door','canvassing','field sales','neighborhood sales','knocking doors'],
 a:"Door knocking still works, particularly in home services after weather events. 🚪\n\nWe support it rather than staff it:\n• Territory targeting so reps aren't guessing\n• Leave-behinds that don't get binned immediately\n• Scripts and objection handling\n• NFC cards so a conversation becomes a saved contact instead of a lost card\n• Follow-up automation for the \"not right now\" conversations, which is most of them\n\nThe difference between a good and bad canvassing operation is almost never the knocking. It's whether anything happens afterwards.",
 c:['Sales training|salesprocess','NFC marketing|nfc','*Talk to a human|i_human']}
);

/* ══════════ KB: LIFECYCLE & RETENTION ══════════ */
KB.push(
{id:'email', fam:'life',
 k:['email marketing','newsletter','email list','email campaign','drip','nurture','mailchimp','klaviyo','email automation','autoresponder'],
 a:"Email is the only audience you actually own. Everything else you rent. 📧\n\nIf Google changes an algorithm or a platform changes its reach, your list is unaffected. That's worth more than it sounds.\n\nWhat we build:\n• Welcome sequences that do the trust-building your sales team otherwise repeats\n• Nurture flows for people who enquired but weren't ready\n• Reactivation campaigns for dormant customers — usually the cheapest revenue available to any business\n• Review requests timed to when satisfaction peaks\n• Genuine newsletters, not monthly self-promotion nobody opens\n\nThe honest bit: a small engaged list beats a large indifferent one every time. Buying a list is the fastest way to destroy your sending reputation.",
 c:['CRM setup|crm','Retention|retention','*Free audit|i_audit']},

{id:'reviews', fam:'life',
 k:['reviews','reputation','google reviews','bad review','negative review','review management','testimonials','star rating','more reviews','reputation management','yelp'],
 a:"Reviews are the single most visible trust signal you have — and now they're being read by AI systems too. ⭐\n\nWhat we set up:\n• A systematic request process, timed to the moment of highest satisfaction\n• Making it genuinely one tap, because friction kills response rate\n• Response templates for every rating, including the bad ones\n• Monitoring across Google, Facebook and industry-specific sites\n• Recovery workflow that catches unhappy customers before they post\n\nOn negative reviews: a professional, non-defensive reply often does more for you than the review does against you. Prospects read the response more carefully than the complaint.\n\nAnd never buy reviews. Platforms detect it, and a perfect 5.0 with no substance reads as fake to humans anyway.",
 c:['Google Business Profile|gbp','Local SEO|localseo','*Free reputation check|i_audit']},

{id:'referral', fam:'life',
 k:['referral','referrals','word of mouth program','refer a friend','referral program','customer referrals'],
 a:"Most businesses get referrals accidentally and then wonder why the number doesn't grow. 🤝\n\nA referral program just makes the accident deliberate:\n• Ask at the right moment — right after a good outcome, not in a quarterly email\n• Make the ask specific. \"Know anyone else with this problem?\" beats \"tell your friends.\"\n• Give them something to hand over — a card, a link, an NFC tap\n• Reward both sides, so nobody feels like they're selling for you\n• Track it, so you know who your advocates actually are\n\nReferred customers close faster, negotiate less and stay longer. It's the highest-margin channel almost nobody systematises.",
 c:['NFC marketing|nfc','Retention|retention','*Talk to a human|i_human']},

{id:'affiliate', fam:'life',
 k:['affiliate','affiliates','partner program','commission','reseller','partner marketing'],
 a:"Affiliate and partner programs let other people sell for you and you pay only on results. 🤝\n\nWhat it takes:\n• Tracking that both sides trust — this is where most programs collapse\n• Commission that's genuinely worth someone's effort\n• Assets partners can actually use without making them\n• Recruiting the right partners rather than everyone\n• Clear terms so nobody argues about attribution later\n\nBest fit: products with decent margin, subscription models, and industries with natural adjacent businesses — a roofer and a gutter company, an accountant and a lawyer.",
 c:['Referral program|referral','*Talk to a human|i_human']},

{id:'retention', fam:'life',
 k:['retention','keep customers','repeat business','churn','loyalty','customer retention','lifetime value','ltv','repeat customers'],
 a:"Acquiring a new customer costs meaningfully more than keeping one. Most marketing budgets ignore this entirely. 🔁\n\nWhat we build:\n• Post-purchase sequences so people don't feel abandoned after paying\n• Maintenance and service reminders — free revenue in most trades\n• Loyalty structures that reward the behaviour you actually want\n• Win-back campaigns for lapsed customers\n• Systematic check-ins for high-value accounts\n\nThe cheapest growth available to nearly every business is the customer list they already have and haven't contacted in eighteen months.",
 c:['Email marketing|email','Referral program|referral','*Free audit|i_audit']},

{id:'crm', fam:'life',
 k:['crm','customer database','pipeline','hubspot','salesforce','gohighlevel','lead management','track leads','follow up system'],
 a:"A CRM is where leads stop falling through the cracks. 🗂\n\nMost businesses that say \"we don't need one\" are running on memory, a notebook and someone's phone — and losing a measurable number of deals to it.\n\nWhat we set up:\n• Pipeline stages that match how you actually sell\n• Automatic lead capture from every form, call and chat\n• Follow-up automation so nothing goes cold by accident\n• Task reminders for the human parts\n• Reporting that shows where deals die\n\nThe biggest win is usually visibility. Once you can see that 40% of leads never get a second contact, the fix becomes obvious.",
 c:['Call tracking|calltracking','Speed to lead|speedtolead','*Talk to a human|i_human']},

{id:'calltracking', fam:'life',
 k:['call tracking','track calls','where leads come from','attribution','which ads work','phone tracking','call recording','source tracking'],
 a:"If you can't tell which channel produced last month's calls, you're optimising blind. 📞\n\nCall tracking assigns numbers to sources so you know what's working:\n• Separate numbers per channel — organic, ads, Maps, print, mail\n• Dynamic number insertion so the website number changes by source\n• Call recording for quality and training\n• Duration filtering, because a 12-second call isn't a lead\n• Integration into your CRM and reporting\n\nThis is usually the fastest way to find out you're spending real money on a channel producing nothing — and that the channel you nearly cut is carrying you.",
 c:['CRM setup|crm','Reporting|reporting','*Free audit|i_audit']},

{id:'speedtolead', fam:'life',
 k:['speed to lead','response time','follow up fast','leads go cold','lead response','call back fast','leads not closing','slow follow up'],
 a:"This is the cheapest fix in marketing and almost nobody does it. ⚡\n\nA lead contacted within minutes converts dramatically better than the same lead contacted the next day. Not because the lead changed — because they contacted three of your competitors too, and the first real conversation usually wins.\n\nWhat we set up:\n• Instant notification to a phone, not just an inbox\n• Automatic acknowledgement so they know they've been heard\n• Escalation if nobody responds within a set window\n• Simple after-hours handling — even \"we'll call at 8am\" beats silence\n• Tracking of actual response times, which are always worse than people think\n\nIf your leads are going cold, fix this before you spend another dollar on generating more of them.",
 c:['CRM setup|crm','Call tracking|calltracking','*Fix my follow-up|i_capture']}
);

/* ══════════ KB: BUILD & CREATE ══════════ */
KB.push(
{id:'website', fam:'build',
 k:['website','web design','new website','redesign','site build','wordpress','shopify','web development','build a site','rebuild','my website is old','need a website'],
 a:"A website is a salesperson that works every hour of every day. Most are terrible at the job. 💻\n\nWhat we build:\n• Fast, mobile-first sites — most of your traffic is on a phone in bad light\n• Clear conversion paths, not a beautiful maze\n• Technically sound foundations so SEO isn't fighting the build\n• Structured data so machines and AI can parse you\n• Content management you can actually use without calling us\n\nWordPress, Shopify, or custom static builds depending on what you need. We're not religious about platform.\n\nThe most common problem we see isn't ugliness. It's a site that looks fine and gives a visitor no obvious reason to call.",
 c:['Conversion optimization|cro','Site speed|speed','*Free website review|i_audit']},

{id:'cro', fam:'build',
 k:['conversion','cro','conversion rate','not converting','traffic but no leads','visitors dont call','improve conversions','ab testing','split testing','they visit but dont call','no one calls'],
 a:"This is the problem I most enjoy, because the fix is usually cheap and fast. 📈\n\nIf you have traffic and no leads, buying more traffic just means more people leaving. Fix the leak first.\n\nWhat we look at:\n• Is the offer clear within five seconds of landing?\n• Is the phone number visible without scrolling, on mobile?\n• How many fields does the form have? Every extra one costs you.\n• Do trust signals appear before you ask for anything?\n• How fast does it load on a real phone on real data?\n• Is there one obvious next action, or six competing ones?\n\nSimple arithmetic to make the point: if your site converts at 2% and could convert at 5%, you've just multiplied revenue from the exact same traffic — without spending another dollar on ads.",
 c:['Landing pages|landing','Website design|website','*Free conversion audit|i_audit']},

{id:'landing', fam:'build',
 k:['landing page','landing pages','squeeze page','campaign page','sales page','funnel page','lead page'],
 a:"Sending ad traffic to your homepage is the most common way to waste an ad budget. 🎯\n\nA homepage serves everyone. A landing page serves one person with one intent, and that difference shows up directly in cost per lead.\n\nWhat makes them work:\n• Message match — the page says what the ad promised, in the same words\n• One goal. No navigation, no exits, no competing offers.\n• The form above the fold on mobile\n• Proof close to the ask — reviews, guarantees, credentials\n• Speed, because paid traffic is impatient traffic\n\nWe build these to be tested, not admired. The first version is a hypothesis.",
 c:['Google Ads|ppc','Conversion optimization|cro','*Talk to a human|i_human']},

{id:'app', fam:'build',
 k:['app','mobile app','ios','android','application','build an app','app development'],
 a:"Honest answer first: most businesses that want an app need a better mobile website. 📱\n\nApps make sense when there's genuine repeat usage — booking, loyalty, account management, ordering. They don't make sense as a brochure, because getting someone to install something is a very high bar for a first interaction.\n\nWhen it is the right call, we build:\n• Native or cross-platform depending on requirements\n• Booking and scheduling flows\n• Loyalty and account features\n• Push notification strategy that doesn't get you uninstalled\n\nWe'd rather tell you not to build one than take the budget for something that sits unused.",
 c:['Website design|website','*Talk to a human|i_human']},

{id:'branding', fam:'build',
 k:['branding','brand','rebrand','brand identity','brand strategy','positioning','brand voice','company name'],
 a:"Branding is not a logo. Branding is what people expect before they've met you. 🎨\n\nWhat we work on:\n• Positioning — what you are and, crucially, what you're not\n• Voice and messaging that sounds like a person\n• Visual identity across every place you appear\n• Consistency, which is most of it. A brand is a promise kept repeatedly.\n\nThe test of a brand isn't whether you like the colours. It's whether a customer can explain what you do, to someone else, correctly.\n\nWhen it's worth investing: when you're indistinguishable from three competitors and competing purely on price.",
 c:['Logo design|graphic','Website design|website','*Talk to a human|i_human']},

{id:'graphic', fam:'build',
 k:['logo','logo design','graphic design','print design','brochure','business cards','flyer design','signage design','packaging','design work','need a logo','do you do logos'],
 a:"Yes — logo, graphic and print design are all in-house. 🎨\n\nWhat we produce:\n• Logo design and full brand identity systems\n• Business cards, brochures, flyers, rack cards\n• Vehicle wraps and signage artwork\n• Trade show graphics and banners\n• Packaging and labels\n• Social and ad creative\n\nOn logos specifically: a logo's job is recognition, not cleverness. It has to work at the size of a phone icon and in one colour on a shirt. Most logos that lose that test were designed on a large screen and never checked anywhere else.\n\nVIP members get member pricing on all of it — the membership is $79.99/month.",
 c:['Branding|branding','VIP membership|pricing','*Get a design quote|i_capture']},

{id:'nfc', fam:'build',
 k:['nfc','tap card','digital business card','smart card','nfc marketing','tap to pay card','contactless','review card'],
 a:"NFC is a small thing that punches above its weight. 📲\n\nA customer taps their phone on a card, a sticker or a stand and something happens instantly — your contact saved, your review page opened, your booking form loaded, your menu displayed.\n\nWhere it works:\n• Review collection at the counter or at the end of a job. Removing friction is most of the battle.\n• Digital business cards that don't end up in a drawer\n• Trade show handoffs\n• Vehicle and window stickers\n• Table stands in restaurants and waiting rooms\n\nIt's cheap, it feels modern, and it converts because it removes the three taps where people give up.",
 c:['Reviews|reviews','Referral program|referral','*Talk about NFC|i_capture']},

{id:'chatbot', fam:'build',
 k:['chatbot','chat bot','ai chat','bot for my site','live chat','chat widget','bot like you','can i get one of you'],
 a:"You're talking to one, so this is a slightly self-interested answer. 🤖\n\nBut yes — we build these. And the reason they work isn't novelty. It's that a large share of enquiries happen outside business hours, and a good bot captures the ones that would otherwise be lost to a contact form nobody fills in at 11pm.\n\nWhat a useful one does:\n• Answers real questions rather than deflecting to \"contact us\"\n• Captures leads conversationally instead of via a wall of fields\n• Knows what page the visitor is on and behaves accordingly\n• Hands off cleanly to a human when it should\n• Saves partial information if someone drops out mid-conversation\n\nWhat a bad one does: opens instantly, blocks the content, and can't answer anything.",
 c:['Website design|website','Conversion optimization|cro','*I want one|i_capture']},

{id:'photo', fam:'build',
 k:['photography','photos','product photos','headshots','photo shoot','images','pictures','photographer'],
 a:"Stock photography is invisible. Real photography is a trust signal. 📷\n\nWhat we shoot:\n• Team and headshots — people buy from people\n• Your actual premises and vehicles\n• Work in progress and finished results\n• Product photography for e-commerce\n• Google Business Profile photo sets, which directly affect engagement\n\nThe before-and-after is the most underused asset in home services. It does more selling than any paragraph you could write.\n\nOne practical note: your Business Profile rewards fresh photos. A profile last updated in 2021 signals something you don't want signalled.",
 c:['Google Business Profile|gbp','Video|video','*Talk to a human|i_human']}
);

/* ══════════ KB: SALES OPS & CONSULTING ══════════ */
KB.push(
{id:'salesprocess', fam:'ops',
 k:['sales process','sales training','close more deals','sales system','sales help','closing','my sales team','sales coaching','not closing','conversion in sales'],
 a:"Marketing gets the phone to ring. What happens next is a separate discipline, and it's where a lot of good marketing quietly dies. 🎯\n\nWhat we work on:\n• A defined process, so every lead gets the same handling rather than whatever the rep felt like\n• Qualification, so time goes to people who can actually buy\n• Discovery questions that surface the real problem instead of the stated one\n• Objection handling that isn't defensive\n• Follow-up cadence, because most deals close after several contacts and most reps stop after one\n\nThe uncomfortable audit: pick ten leads from last month and check how many were contacted more than twice. It's usually a smaller number than anyone expects.",
 c:['Call scripts|callscripts','Speed to lead|speedtolead','*Talk to a human|i_human']},

{id:'callscripts', fam:'ops',
 k:['call script','phone script','what to say','scripts','answering the phone','phone training','call handling','receptionist'],
 a:"The phone call is where marketing budget becomes revenue or evaporates. 📞\n\nWhat we build:\n• Opening lines that don't sound like a script\n• Qualification questions in the right order\n• Pricing conversations that don't collapse into discounting\n• Objection responses for the five things you actually hear\n• Booking language that assumes the appointment\n• Voicemail and after-hours handling\n\nWorth doing once: record your own calls for a week and listen. Most businesses discover their front desk is politely losing them work — not through rudeness, but through a lack of any structure at all.",
 c:['Sales process|salesprocess','Call tracking|calltracking','*Talk to a human|i_human']},

{id:'consulting', fam:'ops',
 k:['consulting','business consulting','strategy','business plan','advice','coaching','business planning','grow strategy','not sure what to do'],
 a:"Sometimes the honest answer is that the marketing isn't the problem. 🧭\n\nWe do straight consulting for that: pricing, positioning, capacity, offer structure, which channels to stop wasting money on.\n\nWhere it usually helps:\n• You're busy but not profitable\n• You're competing purely on price and losing\n• You have leads and no capacity, or capacity and no leads\n• You're about to spend real money and want a second opinion first\n• You've been burned before and want a plan rather than a package\n\nWe'll tell you if you don't need us. That happens more often than you'd expect, and it's usually the start of a longer relationship anyway.",
 c:['Business budget|budget','*Book a strategy session|i_capture','Talk to a human|i_human']},

{id:'handbook', fam:'ops',
 k:['employee handbook','staff training','onboarding staff','sop','procedures','training materials','operations manual'],
 a:"Documented process is what lets a business grow without the owner in every conversation. 📘\n\nWhat we produce:\n• Employee handbooks and policy documentation\n• Standard operating procedures for the things done repeatedly\n• Training materials and onboarding sequences\n• Brand and communication guidelines so everyone sounds like the same company\n\nThe symptom that you need this: every new hire is trained differently, by whoever's free, and quality varies by who answered the phone.",
 c:['Sales process|salesprocess','Consulting|consulting','*Talk to a human|i_human']},

{id:'decks', fam:'ops',
 k:['pitch deck','proposal','presentation','sales deck','investor deck','slides','quote template'],
 a:"A good proposal closes on its own. A bad one requires you to be in the room. 📊\n\nWhat we design:\n• Sales proposals and quote templates\n• Pitch and investor decks\n• Capability presentations\n• Case study one-pagers\n\nThe common failure: leading with your company history. Nobody cares yet. Lead with their problem, show you understand it, then earn the right to talk about yourself.",
 c:['Branding|branding','Print design|graphic','*Talk to a human|i_human']},

{id:'merchant', fam:'ops',
 k:['merchant processing','credit card processing','payments','payment processing','take payments','card reader','pos'],
 a:"Yes, we help with merchant processing and payment setup. 💳\n\nWhat matters:\n• Rates that are actually competitive rather than headline-competitive\n• Online, in-person and over-the-phone payment options\n• Integration with your booking or invoicing\n• Contract terms — this industry is notorious for long lock-ins and surprise fees\n\nIf you haven't reviewed your rates in three years, there's a decent chance you're overpaying. It's worth ten minutes.",
 c:['Website design|website','*Talk to a human|i_human']},

{id:'budget', fam:'ops',
 k:['marketing budget','how much should i spend','what budget','budget for marketing','how much budget','spend on marketing'],
 a:"Fair question, and the honest answer is: it depends on your margin and your growth goal. 💵\n\nA commonly cited rule of thumb is 5-10% of revenue for maintenance and more for aggressive growth. Treat that as a starting point for a conversation, not an answer — it varies enormously by industry, margin and how competitive your market is.\n\nBetter way to think about it:\n• What's a customer worth to you over their lifetime, not just the first sale?\n• What can you afford to pay to acquire one and still be happy?\n• How many do you need, and by when?\n\nWork backwards from that and the budget answers itself. Working forwards from a percentage is how businesses end up spending confidently on nothing.\n\nOur own range: full-service campaigns typically run $500-$3,000/month. Build-your-own starts at $100/month for a single focused deliverable.",
 c:['Pricing|pricing','Consulting|consulting','*Free growth audit|i_audit']}
);

/* ══════════ KB: INDUSTRY VERTICALS ══════════ */
KB.push(
{id:'v_legal', fam:'vert',
 k:['law firm','lawyer','attorney','legal marketing','personal injury','law practice','legal seo','criminal defense','family law'],
 a:"Legal is one of the most expensive and most competitive markets in search. ⚖️\n\nWhat actually works:\n• Practice-area pages, not one page listing everything you do\n• Local Services Ads with Google Screened, where eligible — they sit above everything\n• Review generation, which is difficult in legal and therefore valuable\n• Attorney bio pages, which rank and convert better than most firms realise\n• Genuinely useful answer content — people research heavily before calling a lawyer\n• Speed to lead. In personal injury especially, the first responsive firm usually wins.\n\nWhat wastes money: bidding on the broadest, most expensive terms with a landing page that's just a photo of a courthouse.",
 c:['Local Services Ads|lsa','Speed to lead|speedtolead','*Free legal marketing audit|i_audit']},

{id:'v_dental', fam:'vert',
 k:['dental','dentist','dental practice','orthodontist','oral surgeon','dental marketing','ortho','implants','invisalign'],
 a:"Dental is a local-radius business with unusually high lifetime value. 🦷\n\nWhat works:\n• Google Business Profile and map pack — proximity dominates, so this is the game\n• Reviews, in volume and recent\n• Separate pages for high-value procedures rather than one services page\n• Insurance and financing information, prominently — it's the top unspoken question\n• New-patient offers with a clear, simple path to booking\n• Online booking, because a meaningful share of people won't phone\n\nRetention matters as much as acquisition here: recall reminders and hygiene scheduling are where practice revenue quietly lives.",
 c:['Local SEO|localseo','Reviews|reviews','*Free dental marketing audit|i_audit']},

{id:'v_home', fam:'vert',
 k:['contractor','roofing','roofer','plumber','plumbing','hvac','electrician','home services','landscaping','remodeling','construction','painter','garage door','handyman','restoration'],
 a:"Home services is where local marketing pays fastest — and where speed beats polish. 🔨\n\nWhat works:\n• Map pack and Google Business Profile above almost everything else\n• Local Services Ads with the Google Guaranteed badge\n• Service-area pages per genuine market, not 200 thin city pages\n• Before-and-after photography — it sells better than any copy\n• Emergency and same-day messaging where relevant\n• Speed to lead. Storm and emergency work goes to whoever answers first, full stop.\n• Seasonal planning, because demand is not flat and neither should your spend be\n\nAnd increasingly: being answerable to an AI assistant that's checking whether you're open and reachable right now.",
 c:['Local Services Ads|lsa','Speed to lead|speedtolead','*Free home services audit|i_audit']},

{id:'v_medspa', fam:'vert',
 k:['med spa','medspa','aesthetics','botox','injectables','cosmetic','wellness clinic','laser','iv therapy','weight loss clinic'],
 a:"Med spa is visual, high-consideration and heavily influenced by social proof. 💆\n\nWhat works:\n• Real before-and-after imagery, handled compliantly\n• Instagram and social as a discovery channel, search as a decision channel\n• Individual treatment pages — people search the procedure, not the category\n• Pricing transparency, or at least ranges. Silence loses to competitors who publish.\n• Reviews and provider credentials, prominently\n• Membership and package structures, which transform lifetime value\n\nCompliance note worth taking seriously: advertising rules around medical claims and imagery are real, and enforcement isn't theoretical.",
 c:['Social ads|socialads','Reviews|reviews','*Free med spa audit|i_audit']},

{id:'v_realestate', fam:'vert',
 k:['real estate','realtor','agent','broker','property','listings','home selling','realty','mortgage'],
 a:"Real estate is a personal-brand business wearing a company logo. 🏡\n\nWhat works:\n• Hyperlocal content — neighbourhood guides, school catchments, market updates\n• Your face and your name, not just the brokerage\n• Video walkthroughs and neighbourhood tours\n• Database nurture, because your past clients are your pipeline\n• Reviews and testimonials with specifics\n• Fast response — enquiries go to whoever replies first\n\nThe hard truth: agents who market only when they need business have a permanently unstable pipeline. Consistency is the entire strategy.",
 c:['Email marketing|email','Video|video','*Free real estate audit|i_audit']},

{id:'v_restaurant', fam:'vert',
 k:['restaurant','cafe','bar','food','menu','dining','coffee shop','brewery','bakery','food truck','catering'],
 a:"Restaurants live and die on Maps, photos and reviews. 🍽\n\nWhat works:\n• Google Business Profile — hours, menu, photos, attributes, all current\n• Photography that looks like the actual food you serve\n• Reviews, and responding to them\n• Menu marked up so it's machine-readable, which matters enormously now\n• Online ordering and reservation links present and working\n• Events and specials posted where people look\n\nA 2026-specific note: Google's Ask Maps added conversational food ordering in August. Restaurants with complete menus, current hours and working ordering links get surfaced by the assistant. Ones without get skipped — not ranked lower, skipped.",
 c:['Google Business Profile|gbp','Reviews|reviews','*Free restaurant audit|i_audit']},

{id:'v_pro', fam:'vert',
 k:['accountant','cpa','bookkeeping','insurance agent','financial advisor','consultant','b2b','professional services','agency','coach'],
 a:"Professional services sell trust before they sell a service. 💼\n\nWhat works:\n• Content that demonstrates expertise rather than claiming it\n• LinkedIn, which is genuinely effective here and mediocre almost everywhere else\n• Case studies with real numbers where you're permitted to share them\n• Clear service definitions — vagueness reads as inexperience\n• Referral and partner networks, which usually outperform paid channels\n• Email nurture, because buying cycles are long\n\nThe positioning trap: describing yourself as a generalist to avoid turning anyone away, which results in nobody recognising you as the obvious choice for anything.",
 c:['Content|content','Referral program|referral','*Free B2B audit|i_audit']},

{id:'v_auto', fam:'vert',
 k:['auto','automotive','car dealership','mechanic','auto repair','tires','body shop','car wash','detailing','glass'],
 a:"Automotive is proximity plus urgency plus trust. 🚗\n\nWhat works:\n• Map pack dominance in your service radius\n• Reviews — this is an industry where people expect to be taken advantage of, so social proof does heavy lifting\n• Service-specific pages, since people search the repair not the shop\n• Transparent pricing or estimate ranges\n• Financing information where relevant\n• Fast response, especially for anything involving a car that isn't drivable\n\nBefore-and-after imagery works as well here as it does in home services and is used far less.",
 c:['Local SEO|localseo','Reviews|reviews','*Free automotive audit|i_audit']},

{id:'v_senior', fam:'vert',
 k:['senior','elderly','assisted living','home care','aging','walk in tub','accessibility','mobility','senior living','caregiver'],
 a:"Senior services have a distinctive marketing shape: the buyer is often not the user. 👵\n\nWhat works:\n• Content aimed at adult children researching on a parent's behalf\n• Clarity and reassurance over urgency and pressure\n• Genuine credential and safety signals\n• Larger type, simpler pages, phone numbers that are easy to find\n• Reviews and family testimonials\n• Patience in the funnel — these decisions take weeks, sometimes months\n\nWe have direct experience here: we operate Aging Safely Baths and Showers4Less, so this vertical is one we've marketed for ourselves as well as for clients.",
 c:['Content|content','Email marketing|email','*Free senior services audit|i_audit']},

{id:'v_tourism', fam:'vert',
 k:['tourism','travel','hotel','resort','vacation rental','tours','fishing charter','diving','airbnb','excursion','adventure'],
 a:"Travel and tourism is a category we're genuinely deep in. 🏝\n\nWe operate site networks across Belize, Costa Rica, the Dominican Republic and Hawaii — hotels, diving, fishing charters, restaurants, real estate and things-to-do guides. Several are bilingual.\n\nWhat works:\n• Long-tail intent content: \"best snorkelling in Belize,\" not \"Belize\"\n• Photography and video, which is most of the sell\n• Reviews across the platforms travellers actually use\n• Booking integration with as little friction as possible\n• Seasonal content timed to when planning happens, not when travel happens\n• Bilingual where the market warrants it\n\nAnd now: Ask Maps handles hotel discovery and comparison conversationally, so structured, accurate property data matters more than it did last year.",
 c:['Content|content','International SEO|intlseo','*Free tourism audit|i_audit']},

{id:'v_fitness', fam:'vert',
 k:['gym','fitness','personal trainer','yoga','crossfit','studio','membership gym','pilates','martial arts'],
 a:"Fitness is a membership business, which means retention matters more than acquisition. 💪\n\nWhat works:\n• Local search and Maps — people join within a short radius of home or work\n• Free trial or intro offers with a clear, simple signup\n• Social proof: transformations, community, real members\n• Class schedules that are current and easy to read on a phone\n• Onboarding that gets new members to their fourth visit, which is the retention cliff\n• Referral programs, because gym members recruit gym members\n\nJanuary handles your acquisition. What you do in February determines whether it mattered.",
 c:['Social ads|socialads','Retention|retention','*Free fitness marketing audit|i_audit']}
);

/* ══════════ KB: WORLD / SMALL TALK ══════════ */
KB.push(
{id:'w_greet', fam:'world',
 k:['hi','hey','hello','yo','sup','howdy','good morning','good afternoon','good evening','hiya','whats up','greetings'],
 a:function(){ return greetByHour() + "! 👋 I'm Iris, the growth assistant here at Eye To Ad Media.\n\nAsk me anything about getting more customers — or tell me what's not working and I'll tell you straight what I'd look at first."; },
 c:['I need more customers|growth','What do you do?|services','Pricing|pricing','*Free growth audit|i_audit']},

{id:'w_howareyou', fam:'world',
 k:['how are you','how are you doing','hows it going','you good','how do you feel','you ok','hows your day'],
 a:"Running at full capacity and never needing coffee, which I'm told is unusual. ☕\n\nMore usefully: I'm here, I know a lot about growing businesses, and I don't get tired of questions. What's on your mind?",
 c:['I need more customers|growth','Tell me a joke|w_joke','What do you do?|services']},

{id:'w_who', fam:'world',
 k:['who are you','what are you','are you a bot','are you ai','your name','whats your name','are you real','iris'],
 a:"I'm Iris — the growth assistant for Eye To Ad Media. 🤖\n\nAnd yes, I'm a bot. I'd rather say so than let you find out three messages in. I run entirely on this page: no external AI service, no account, no data going anywhere except a lead form if you choose to fill one in.\n\nWhat I'm good at: explaining what actually moves the needle, diagnosing where your growth is stuck, and connecting you to a human when that's the better answer.\n\nWhat I'm not: a replacement for talking to someone who can look at your actual site.",
 c:['Talk to a human|i_human','I need more customers|growth','What do you do?|services']},

{id:'w_human', fam:'world',
 k:['human','real person','talk to someone','speak to a person','agent','representative','not a bot','someone real'],
 a:function(){
   return "Absolutely — no offence taken. 🙋\n\n📞 " + CFG.PHONE_MAIN + " (toll-free)\n📱 " + CFG.PHONE_LOCAL + " — also our WhatsApp\n✉️ " + CFG.LEAD_EMAIL + "\n\n" + (officeOpen() ? "We're open right now and a human actually answers." : "We're closed at the moment — " + nextOpenPhrase() + " Leave your details and you'll be first in the queue.");
 },
 c:['*Leave my details|i_capture','Contact info|contact','Back to questions|i_more']},

{id:'w_time', fam:'world',
 k:['what time','what day','what is the date','todays date','what year','current time','time is it','what month'],
 a:function(){ return "It's " + todayStr() + ", and " + clockStr() + " here in Denver. ⏰\n\n" + (officeOpen() ? "We're open — " + CFG.HOURS + "." : nextOpenPhrase()) + "\n\nAlso, " + daysLeftInYear() + " days left in the year, if you're the kind of person who plans around that."; },
 c:['Hours|hours','*Free growth audit|i_audit','Contact info|contact']},

{id:'w_joke', fam:'world',
 k:['joke','funny','make me laugh','tell me a joke','another one','something funny','cheer me up','say something funny'],
 a:function(){ return nextJoke(); },
 c:['Another one|w_joke','I need more customers|growth','What do you do?|services']},

{id:'w_thanks', fam:'world',
 k:['thanks','thank you','thx','appreciate it','cheers','ty','much appreciated','youre great','helpful'],
 a:"Happy to help. 😊\n\nAnything else you want to dig into? And if you'd rather just talk it through with a person, " + CFG.PHONE_MAIN + " gets you a human.",
 c:['*Free growth audit|i_audit','Ask something else|i_more','Talk to a human|i_human']},

{id:'w_bye', fam:'world',
 k:['bye','goodbye','see ya','later','im done','thats all','gotta go','talk later','cya'],
 a:function(){
   return "Take care. 👋\n\nIf anything comes up: " + CFG.PHONE_MAIN + ", or " + CFG.LEAD_EMAIL + ". " + (officeOpen() ? "We're open right now if you'd rather just call." : nextOpenPhrase()) + "\n\nGood luck out there.";
 },
 c:['Actually, one more thing|i_more','*Leave my details first|i_capture']},

{id:'w_help', fam:'world',
 k:['help','what can you do','what can i ask','options','menu','commands','i dont know what to ask','confused','lost'],
 a:"Plenty. Here's the shape of it: 🧭\n\n• **Diagnose a problem** — \"my phone isn't ringing,\" \"traffic but no leads,\" \"leads go cold\"\n• **Explain a tactic** — SEO, local SEO, Google Ads, email, reviews, AI search, anything on the list\n• **Talk about your industry** — legal, dental, home services, restaurants, real estate, fitness and more\n• **Pricing and process** — what it costs, how we work, how long it takes\n• **Push back on us** — ask why we're worth it, or whether SEO is even worth doing\n• **Get you to a human** — anytime, no hoops\n\nOr just tell me what's going on in plain English. That works best.",
 c:['I need more customers|growth','Pricing|pricing','*Free growth audit|i_audit','Talk to a human|i_human']},

{id:'w_denver', fam:'world',
 k:['denver','colorado','mile high','the 303','the 720','rockies','denver market','local market','front range'],
 a:"Denver's home. 🏔\n\nWe've been here since 2012, which means we've watched the market get considerably harder — legal, home services, healthcare and real estate are all genuinely competitive now.\n\nThe useful part: most of that competition is running strategy from years ago. Half-finished Business Profiles, no AI search consideration, blog posts written for a keyword tool. The gap between where search is and where most Denver businesses are operating is the whole opportunity.\n\nAnd knowing the difference between Cherry Creek and Arvada as markets — not just as map pins — matters more than out-of-state agencies think.",
 c:['Local SEO|localseo','*Free Denver audit|i_audit','Why you over another agency?|why']},

{id:'w_weather', fam:'world',
 k:['weather','snow','forecast','raining','cold','hot','temperature outside'],
 a:"I've got no window and no weather feed, so I'd only be guessing. 🌤\n\nWhat I can tell you about Denver weather from a marketing angle: storms move budgets. Roofers, restoration and auto glass see demand spike hard after hail, and the businesses that already rank capture it while everyone else scrambles to buy ads at four times the normal cost.\n\nIf you're in a weather-driven trade, the time to prepare is the quiet season.",
 c:['Home services marketing|v_home','*Free growth audit|i_audit']},

{id:'w_meaning', fam:'world',
 k:['meaning of life','are you sentient','do you dream','are you conscious','do you have feelings','will ai take over','philosophy'],
 a:"Above my pay grade, and I'd be making it up. 🤔\n\nWhat I'll say honestly: I'm a well-organised set of answers with a friendly tone. I'm not conscious, I don't dream, and I don't have opinions about my own existence.\n\nWhat I do have is a lot of specific knowledge about why local businesses don't get found. Want to use me for that instead?",
 c:['I need more customers|growth','Tell me a joke|w_joke','What do you do?|services']},

{id:'w_price_of_iris', fam:'world',
 k:['how much are you','can i buy you','get a bot like you','how much for a chatbot','build me a bot','what does this cost to build'],
 a:"You can have one, yes. 🤖\n\nWe build these — knowledge base, lead capture, page awareness, the lot. Cost depends on how much it needs to know and what it needs to connect to.\n\nWhat makes them worth it: a large share of enquiries happen outside office hours, and a bot that can actually answer questions captures the ones a contact form loses.\n\nVIP members get member pricing on this like everything else — membership is $79.99/month.\n\nWant a quote? Takes a short conversation to scope properly.",
 c:['*Get a chatbot quote|i_capture','Chatbots|chatbot','VIP membership|pricing']}
);

/* ══════════ KB: OBJECTIONS ══════════
   These are worked answers, not deflections. Every one concedes the true part
   of the objection before answering it. An objection script that pretends the
   concern is stupid loses the person. */
KB.push(
{id:'obj_ads', fam:'obj',
 k:['seo vs ads','ads instead','just run ads','why not ads','ppc better','ads are faster','paid vs organic','should i do ads instead'],
 a:"Honestly? For a lot of businesses the right answer is both — and ads first. ⚖️\n\n**Ads win on:** speed. Live today. You learn within two weeks whether the market wants your offer, and at what cost. That intelligence is genuinely valuable.\n\n**SEO wins on:** economics over time. It compounds, it doesn't switch off when you stop paying, and it earns trust that ads don't — people know an ad is an ad.\n\n**The trap with ads-only:** the day you pause spend, you go dark. You're renting your entire pipeline, permanently, at whatever the market rate becomes.\n\n**The trap with SEO-only:** three to six months of quiet while you wait.\n\nThe sane approach: ads to keep the phone ringing now, SEO building underneath, and over time the paid spend becomes optional rather than load-bearing.",
 c:['Google Ads|ppc','SEO explained|seo','*Free audit of both|i_audit']},

{id:'obj_triedseo', fam:'obj',
 k:['tried seo','didnt work','it didnt work','wasted money','been burned','last agency failed','tried before','no results before','doesnt work'],
 a:"That's a completely fair position, and it's usually justified. 😤\n\nWhen we look at accounts where SEO \"didn't work,\" it's nearly always one of these:\n\n• **Nothing was tracked**, so nobody could tell whether it worked. Traffic went up, and nobody knows if the phone did.\n• **They ranked for the wrong things** — high-volume terms with no buying intent.\n• **It was rankings-only**, and the website converted terribly, so traffic arrived and left.\n• **It was six months of invoices and three months of work.**\n• **They quit at month four**, right before the compounding starts.\n\nWhat I'd suggest: don't take our word for anything. Take the free audit, look at what we find, and check whether it matches what you already suspected. If it doesn't, you've lost nothing.\n\nWe'd rather show you than tell you.",
 c:['*Show me — free audit|i_audit','How do you report?|reporting','Talk to a human|i_human']},

{id:'obj_seodead', fam:'obj',
 k:['seo is dead','ai killed seo','is seo dead','no more clicks','zero click','ai overviews killed','nobody clicks anymore','pointless now'],
 a:"Half true, and the half that's true isn't the half people mean. 🪦\n\n**What genuinely died:** informational blog traffic. If your strategy was ranking for \"what is X\" and hoping people clicked through, that model has taken a serious hit. AI Overviews answer those questions on the results page now.\n\n**What did not die:** local commercial search. Research compiled this year put AI Overviews on roughly 48% of all Google searches — but only about 7% of *local* searches. Someone searching \"emergency plumber near me\" still gets a map pack with three businesses, reviews and phone numbers. That hasn't changed.\n\n**What's actually new:** there are now more surfaces, not fewer. Organic, map pack, AI Overviews, ChatGPT and Perplexity answers, and agentic assistants doing the shortlisting. Being absent from all of them isn't safer than being absent from one.\n\nSEO didn't die. It got harder and broader — which is inconvenient if you sell packages, and good news if you do the work.",
 c:['What is AIO?|aio','What is GEO?|geo','*Check my AI visibility|i_audit']},

{id:'obj_expensive', fam:'obj',
 k:['too expensive','cant afford','out of my budget','cheaper','too much money','pricey','expensive','not in the budget','high cost'],
 a:"Fair. And I'd rather have this conversation now than after you've signed something uncomfortable. 💰\n\nA few honest things:\n\n**You don't have to start big.** Build-your-own plans start at $100/month for one focused deliverable. That's a real starting point, not a bait price — but nobody should pretend $100 buys a full campaign.\n\n**The membership exists for exactly this.** $79.99/month unlocks member pricing across everything, cancel anytime.\n\n**The audit is free.** No contract, no card, no obligation. You'll know what's wrong whether or not you hire anyone.\n\n**And the useful reframe:** what's one customer worth to you? If it's $2,000 and a campaign costs $800/month, the maths is about how many you need, not whether you can afford it.\n\nIf the honest answer is that now isn't the time — that's a real answer and I won't push.",
 c:['Pricing|pricing','*Free audit anyway|i_audit','VIP membership|pricing']},

{id:'obj_diy', fam:'obj',
 k:['do it myself','diy','handle it in house','my own seo','learn it myself','do my own marketing','in house team'],
 a:"Genuinely — you can. Plenty of people do, and it's not a trick. 🛠\n\nThe honest calculus is time, not capability:\n\n• Google Business Profile: absolutely do this yourself. It's free and it's the highest-value thing available. I'll tell you what to fix if you want.\n• Asking for reviews: do it yourself. Nobody does it better than the person who did the work.\n• Basic content: doable, if you'll actually sit down and write it.\n• Technical SEO, schema, AI optimisation, tracking: this is where it gets expensive to learn and easy to break.\n\nThe question isn't whether you *could*. It's whether the hours are better spent on marketing or on the work that pays you.\n\nAnd if you want to DIY, take the free audit anyway. Use it as your to-do list. That's a completely legitimate use of it.",
 c:['*Free audit as my checklist|i_audit','Google Business Profile|gbp','Pricing|pricing']},

{id:'obj_nephew', fam:'obj',
 k:['my nephew','my cousin','friend does websites','someone i know','my son does','guy i know does it','family member does it'],
 a:"No sarcasm here — this genuinely works out fine sometimes. 👨‍💻\n\nWhere it usually goes wrong isn't skill. It's continuity. The site gets built, it looks decent, and then life happens — a job, a move, a busy stretch — and updates stop. Six months later nobody has the login and the plugin that needs updating is three versions behind.\n\nQuestions worth asking, not to be awkward but because they matter:\n• Who has the domain registrar login? Not the hosting — the domain.\n• Is there a backup, and has anyone tested restoring it?\n• Is anything tracked, so you'd know if traffic dropped?\n• What's the response time if the site goes down on a Saturday?\n\nIf those all have good answers, you're in decent shape. If they don't, that's worth fixing regardless of who does it.\n\nWe're also happy to work alongside someone rather than replace them.",
 c:['*Free site health check|i_audit','Website design|website','Talk to a human|i_human']},

{id:'obj_contract', fam:'obj',
 k:['contract','long term contract','locked in','commitment','cancel anytime','month to month','how long am i committed','tied in','get out'],
 a:"Straight answer, because this is one where agencies are routinely slippery. 📝\n\n**Terms are set per engagement.** Month-to-month is available and it's what most clients run on. Some engagements — particularly bigger builds with real upfront production — are structured with a defined term, because the cost is front-loaded and that has to be shared fairly.\n\n**You'd know which applies before signing, not after.** That's the actual commitment I can make.\n\n**The free audit carries no contract, no card and no obligation at all.** That part is unconditional.\n\n**The VIP membership is $79.99/month and cancels anytime.**\n\nWhat I won't tell you is \"no contracts, ever,\" because it wouldn't be true and you'd find out later. If an agency tells you that without qualification, ask them to put it in writing.",
 c:['Pricing|pricing','*Free audit — no obligation|i_audit','How do you work?|process']},

{id:'obj_lastagency', fam:'obj',
 k:['last agency','previous agency','fired my agency','bad experience','agency ghosted','they disappeared','got burned','never heard from them'],
 a:"Sorry — that's more common than it should be, and it makes everyone's job harder. 😞\n\nThe usual pattern, and tell me if it sounds familiar:\n• Great during the sales conversation, invisible after signing\n• Monthly reports full of metrics that don't connect to revenue\n• Nobody could explain what was actually being done\n• Wouldn't hand over the accounts at the end\n\nThat last one matters. Before you hire anyone else, make sure you own your Google Business Profile, your Analytics, your Search Console, your ads account and your domain. If a previous agency still holds those, get them back first — we'll help you do that even if you don't hire us.\n\nWhat we do differently is mostly unglamorous: you know who's on your account, reports tie to leads and calls, and we tell you when something isn't working.",
 c:['*Free audit — no strings|i_audit','How do you report?|reporting','Talk to a human|i_human']},

{id:'obj_toosmall', fam:'obj',
 k:['too small','small business','just me','one man band','solo','tiny business','startup','just started','not big enough'],
 a:"Small is not a disqualifier. It's often an advantage. 🌱\n\nYou can move faster than the incumbents, you can answer your own phone, and you can be genuinely responsive in a way big competitors structurally can't.\n\nWhat I'd do with a small budget:\n1. **Google Business Profile, completely finished.** Free, and it's the single biggest lever for a local business.\n2. **A systematic review process.** Free. Compounds.\n3. **A conversion-focused site**, even a small one. Better a clear three-page site than a confusing fifteen-page one.\n4. **One channel, done properly** — rather than a thin presence on five.\n\nBuild-your-own starts at $100/month if you want help with one piece. And the audit costs nothing regardless.\n\nWe've worked with businesses at every size. Small ones often see faster movement because there's more low-hanging fruit.",
 c:['*Free audit|i_audit','Pricing|pricing','Google Business Profile|gbp']},

{id:'obj_competitor', fam:'obj',
 k:['competitor outranks','competitor is beating','they rank higher','my competitor','how are they ranking','beat my competition','competitor ads'],
 a:"Good — that's a solvable problem and it's the most motivating kind. 🥊\n\nWhat we'd look at:\n• What they rank for that you don't, and how hard those terms actually are\n• Their Business Profile against yours — categories, reviews, photos, completeness\n• Their review count and how recently they arrived\n• Where their links come from\n• Whether they're being cited in AI answers and you're not\n• How their conversion path compares to yours\n\nUsually one of three things is happening: they've been at it longer, their profile is simply more complete, or their site converts better and they can afford to spend more per lead as a result.\n\nAll three are addressable. The first takes time; the other two often don't.",
 c:['*Free competitor analysis|i_audit','Local SEO|localseo','SEO explained|seo']},

{id:'obj_havesomeone', fam:'obj',
 k:['already have an agency','we have someone','already working with','have a marketing person','got someone doing it','have a team'],
 a:"Then the useful question is whether it's working, not whether you should switch. 🤔\n\nA few honest diagnostics:\n• Can you say how many leads came from marketing last month, by source?\n• Has anyone explained what they're doing in language you understood?\n• Are you seeing movement in the things that matter, or just in the report?\n• When did you last hear from them proactively?\n\nIf those are all fine — genuinely, stay. Switching agencies has real costs and there's no virtue in churn.\n\nIf a couple of them made you uncomfortable, take the free audit as a second opinion. You don't have to do anything with it. Plenty of people use it to have a better-informed conversation with their existing provider, and that's a completely fine outcome.",
 c:['*Free second opinion|i_audit','How do you report?|reporting','Talk to a human|i_human']},

{id:'obj_wordofmouth', fam:'obj',
 k:['word of mouth','referrals only','dont need marketing','we get by','always been busy','never needed marketing','reputation is enough'],
 a:"That's a good position to be in, and it says something real about your work. 🤝\n\nTwo honest observations though:\n\n**Word of mouth now runs through search.** Someone gets your name from a friend, then looks you up before calling. If what they find is a half-finished profile, no reviews and a slow site, the referral cools. You're not competing for the referral — you're competing with the impression it creates.\n\n**It's not a lever you control.** It's wonderful when it's flowing. It's terrifying when it slows and there's no second channel to turn on.\n\nWhat I'd suggest isn't a campaign. It's making sure that when someone looks you up — and they will — what they find confirms the recommendation instead of undermining it. Business Profile, reviews, a site that loads. That's it.\n\nThe audit will tell you where you stand. Costs nothing.",
 c:['*Check what people find|i_audit','Reviews|reviews','Referral program|referral']},

{id:'obj_wix', fam:'obj',
 k:['wix','squarespace','godaddy website','website builder','my site is on wix','builder platform','can you work with wix'],
 a:"Yes, we can work with those, and no, you don't automatically need to move. 🧱\n\nThe honest version:\n\n**Fine on builders:** small brochure sites, basic local businesses, anything where you mostly need to exist and load fast.\n\n**Where they get limiting:** deep technical SEO control, custom schema, heavy content operations, e-commerce at scale, and page speed once you've added a lot of apps.\n\nWe'd rather optimise what you have than sell you a rebuild you don't need. If a platform move is genuinely warranted, we'll explain specifically why — and if it isn't, we'll say so.\n\nA rebuild recommended without a specific reason is usually about the agency's invoice, not your rankings.",
 c:['Website design|website','Site speed|speed','*Free site review|i_audit']},

{id:'obj_timeline', fam:'obj',
 k:['how long','how long does it take','timeline','when will i see results','how fast','how soon','when results','time to rank','how quickly'],
 a:"Straight numbers, and I'll be clear about what's uncertain. ⏳\n\n• **Google Business Profile / map pack:** often 30-60 days. Fastest meaningful movement available.\n• **Technical fixes:** effect within weeks, once recrawled.\n• **Local organic rankings:** 3-6 months for meaningful movement.\n• **Competitive terms:** 6-12 months.\n• **Paid ads:** live in days, data within two weeks.\n• **Conversion improvements:** immediate, on whatever traffic you already have.\n\nWhat affects it: your current authority, how competitive your market is, how much needs fixing first, and how aggressively we execute.\n\nAnd the caveat that matters — Google now rolls smaller core updates continuously without announcing them, so rankings move on weeks when nothing was named. Any agency giving you a guaranteed date is guessing and dressing it up.",
 c:['SEO explained|seo','Pricing|pricing','*Start with a free audit|i_audit']},

{id:'obj_social', fam:'obj',
 k:['just do social media','social media is enough','instagram is enough','facebook is enough','only social','dont need a website social'],
 a:"Social is genuinely useful. It's just a rented audience on borrowed land. 📱\n\nWhat social does well: discovery, personality, community, visual proof, and staying present with people who already know you.\n\nWhat it does badly: capturing people at the moment of need. Nobody scrolling Instagram suddenly requires an emergency plumber. When they do, they search.\n\nAnd the structural risk: organic reach is set by a platform that can change it tomorrow, has done repeatedly, and owes you nothing. An account with 8,000 followers can reach a few hundred of them.\n\nThe combination that works: social for presence and personality, search for intent, and a website you own where both of them land.",
 c:['Social ads|socialads','SEO explained|seo','*Free growth audit|i_audit']}
);

/* ══════════ KB: PRICING & FREE WINS ══════════ */
KB.push(
{id:'pricing', fam:'core', w:1.1,
 k:['pricing','price','cost','how much','rates','fees','packages','what do you charge','how much do you charge','quote','budget','affordable','membership','vip','subscription','plans','monthly cost'],
 a:"No games, and no \"it depends\" without numbers attached. 💵\n\n**Free SEO audit — $0.** No contract, no card, no obligation. You keep the findings whether you hire us or not.\n\n**Build-your-own — from $100/month.** One focused deliverable. An honest entry point, and I won't pretend it's a full campaign.\n\n**Full-service local SEO — typically $500-$3,000/month.** Depends on competition, scope and how much needs fixing first.\n\n**VIP Marketing Subscription — $79.99/month, cancel anytime — and it costs less if you pay annually.** Unlocks member pricing across everything: SEO, AI optimisation, logo, video, graphic and print design, landing pages, Business Profile work, website updates, NFC. Plus priority scheduling and VIP support. It works like a warehouse club — you're buying access, and the discount is the perk.\n\n**Ads and other channels** are scoped per campaign, and we're transparent about what's management fee versus media spend.\n\nWhat's the goal? I can tell you roughly where you'd land.",
 c:['*Free audit first|i_audit','What affects the price?|budget','Talk to a human|i_human','Contracts?|obj_contract']},

{id:'cheapwins', fam:'core',
 k:['free','cheap','no budget','free advice','what can i do free','zero budget','low cost','broke','nothing to spend','free stuff'],
 a:"Here's what I'd do with no budget at all. Genuinely — this is the list, not a teaser. 🎁\n\n**1. Finish your Google Business Profile.** All of it. Categories (primary matters enormously), every service with a real description, hours, photos, Q&A, posts. Free, and it's the biggest local lever there is.\n\n**2. Ask every happy customer for a review.** In person, at the moment they're pleased. Make it one tap. This is the highest-return unpaid activity available to a local business.\n\n**3. Put your phone number in the top right of every page**, and make it tappable on mobile. You'd be surprised.\n\n**4. Test your site on your own phone, on data, not wifi.** If it takes more than a few seconds, that's costing you customers today.\n\n**5. Answer the phone.** Or return calls within minutes rather than hours. Free, and it beats most paid campaigns.\n\n**6. Ask ChatGPT for the best business in your category in your city.** If you're not mentioned, you now know something most of your competitors don't.\n\nDo those six and you'll outperform a lot of businesses paying for help. If you want a checklist specific to your site, the audit is free too.",
 c:['*Free audit|i_audit','Google Business Profile|gbp','Reviews|reviews']}
);

/* ══════════ KB: MARKETING GEMS (v7.0) ══════════
   REAL, SOURCED NUMBERS ONLY. Every figure below came from a named published
   study and is attributed in the answer text. If you add an entry here and you
   cannot name where the number came from, write the answer without a number.
   An invented statistic is worse than no statistic — it is the one thing a
   prospect can catch us on.
   TEACHING POSTURE: give the whole tip, genuinely. Then land on the part that
   is actually hard to execute. We are not withholding the lesson to create
   dependence; we are showing our work so the hard part is obvious. */
KB.push(
{id:'tip_meta', fam:'tips',
 k:['meta description','meta descriptions','title tag','title tags','metadata','meta data','meta tags','page title','seo title','snippet','serp snippet','what shows in google','blue link','description tag','write titles','title and description'],
 a:"Metadata is the cheapest lever in all of marketing and almost nobody pulls it. 🏷️\\n\\n**Your title tag is your headline in a list of headlines.** Everyone in the top ten already has the answer. The title decides who gets the click. In 2025 title tags were still ranked the second most important on-page factor by the SEO industry — and the first organic result averages roughly a 27.6% click-through rate, so the gap between position one and position four is enormous.\\n\\n**Sizing that actually survives.** Around 50–60 characters, or about 580 pixels, on desktop. Mobile cuts near 500 pixels. Front-load the important words so the truncation eats something you can afford to lose.\\n\\n**Here's the part that surprises people.** A Q1 2025 study by John McAlpin across thousands of keywords found Google rewrote **76% of title tags** — up from 61% in Cyrus Shepard's 2023 study. When Google rewrites one, it keeps only about 35% of your original and strips the brand name 63% of the time. So a title stuffed with your company name is a title Google will quietly replace.\\n\\n**The meta description doesn't rank you. It sells the click.** It's the only ad copy on the page you get for free.\\n\\nThe hard part isn't the rules — it's writing 40 of them that each match a different search intent without cannibalising each other. That's the bit that takes judgement.",
 c:['Want ours done for you?|i_capture','*Free SEO audit|i_audit','How does search work now?|tip_zeroclick','Page speed|tip_speed']},

{id:'tip_speed', fam:'tips',
 k:['why does speed matter','speed matter','does speed matter','how fast should my site be','load time','loading time','speed and sales','slow site cost','speed conversions','how slow is too slow'],
 a:"Speed is a revenue number wearing a technical costume. ⚡\\n\\n**The one that should scare you:** Think with Google found **53% of mobile visits are abandoned if a page takes longer than 3 seconds**. That's traffic you already paid for, gone before they saw a word.\\n\\n**It gets worse on the curve.** Google's own research put bounce probability at 90% when load time goes from 1 second to 5. Not double — ninefold.\\n\\n**Small numbers move real money.** Aggregated A/B data puts every 100ms of load time at roughly 1% of conversions. A Deloitte study run with Google found a **0.1-second** improvement raised retail spend about 10%.\\n\\n**And most sites are failing.** Only about 42% of mobile sites pass all three Core Web Vitals. Desktop averages around 2.5 seconds; mobile averages 8.6.\\n\\n**Test it yourself right now:** open your site on your phone, on cellular data, not your office wifi. That's what your customer experiences.\\n\\nThe fixable causes are usually uncompressed images, bloated page-builder code, and eleven tracking scripts nobody remembers installing. The hard part is fixing those without breaking the design — which is exactly why we hand-code rather than stack plugins.",
 c:['*Check my site speed free|i_audit','Websites|website','Metadata tips|tip_meta','Talk to a human|i_human']},

{id:'tip_match', fam:'tips',
 k:['message match','continuity','ad to landing page','landing page match','same message','ad and page','scent','why do my ads not convert','ads dont convert','clicks but no leads','paying for clicks','wasted ad spend','quality score'],
 a:"This is the single most expensive mistake in paid advertising, and it's free to fix. 🎯\\n\\n**The principle:** the page has to finish the sentence the ad started. Same promise, same words, same offer, same look. Someone clicks an ad for \\\"$99 drain cleaning\\\" and lands on a generic homepage — they don't hunt for it. They leave, and you paid for that.\\n\\n**The documented numbers are not subtle.** A Disruptive Advertising case study published on Moz recorded a **212% conversion lift and 69% lower cost per conversion** from message match alone. KlientBoost got a **66% lift** just by making a landing page headline echo the ad copy — no change to the offer, the targeting or the creative.\\n\\n**It also taxes you twice.** Google Quality Score drops roughly a point per mismatch between ad promise and page experience, and each point costs about 13–16% more per conversion. You pay more per click AND convert fewer of them.\\n\\n**Free audit you can run in ten minutes:** click your own ad from your phone. Does the headline you land on repeat the ad's promise? Does the button use the ad's words? Do the colors match? If any answer is no, that's your leak.\\n\\nThe discipline isn't hard to understand. It's hard to maintain across 30 ad groups while someone's also running a business.",
 c:['*Fix my funnel|i_capture','Conversion optimization|cro','Google Ads|ppc','Free audit|i_audit']},

{id:'tip_nfc', fam:'tips',
 k:['nfc','nfc card','nfc cards','tap card','tap to review','nfc business card','review card','scan card','tap card review','nfc marketing','smart business card','digital business card'],
 a:"NFC cards are the best-kept cheap secret in local marketing. 📇\\n\\n**What it is:** a business card with a chip in it. Customer taps their phone on it, your Google review page opens instantly. No QR code to photograph, no link to type, no \\\"I'll do it later\\\" — which is where 95% of review requests go to die.\\n\\n**Why it matters so much:** reviews are not a vanity metric anymore. BrightLocal's 2026 data has businesses with **50+ Google reviews being 266% more likely to appear in the Local Pack** than businesses with fewer than 10. 97% of consumers read reviews before choosing a local business, and 68% now want to see a 4-star minimum before they'll buy.\\n\\n**Two things most people get wrong:**\\n• Timing beats everything. Ask at the moment of highest satisfaction — job finished, customer visibly happy. Not in an email three days later.\\n• A perfect 5.0 is actually trusted *less* than a 4.5. Consumers read flawless as fake. Don't chase perfection; chase volume and respond to everything.\\n\\n**Never buy reviews.** Platforms detect it, and it can cost you the profile you spent years building.\\n\\nWe do NFC cards, stands and stickers — and VIP members get member pricing on them. The cards are cheap. The review engine you build around them is the actual asset.",
 c:['*Get NFC pricing|i_capture','Reviews & reputation|reviews','Google Business Profile|gbp','VIP membership|pricing']},

{id:'tip_gbp', fam:'tips',
 k:['gbp tips','optimize my profile','profile tips','maps tips','local pack tips','how to rank in maps','rank in map pack','get in the 3 pack','business profile tips','maps optimization'],
 a:"Your Google Business Profile is the highest-return free asset a local business owns. Most are about 40% finished. 📍\\n\\n**What the map pack is worth.** Businesses in the top three get **126% more traffic and 93% more actions** — calls, clicks, direction requests — than those sitting at positions 4–10 (SOCi). Roughly 42–44% of local search clicks go to the map pack before anyone reaches an organic result.\\n\\n**And the intent is ferocious.** 76% of people who run a \\\"near me\\\" search visit a business within a day. 28% buy the same day. 46% of all Google searches have local intent.\\n\\n**The checklist, free, in order of impact:**\\n1. **Primary category.** Single biggest lever and the most commonly wrong field on the internet.\\n2. **Every service listed**, each with a real description, not a bare name.\\n3. **Photos.** Adding them drives about 42% more direction requests and 35% more website clicks.\\n4. **Complete the whole profile.** A complete one makes customers 2.7x more likely to see you as reputable and 70% more likely to visit.\\n5. **Turn messaging on.** SOCi puts that at about 35% more leads.\\n6. **Q&A** — you're allowed to ask and answer your own. Almost nobody does.\\n\\n**One warning.** About 38% of top-three businesses have a keyword jammed into their business name. Google prohibits it and you can get your profile suspended. Don't copy what you see.\\n\\nBenchmark: an active profile generates around 59 actions a month. If yours is under that, something's off.",
 c:['*Free profile audit|i_audit','Reviews|reviews','Local SEO|localseo','NFC review cards|tip_nfc']},

{id:'tip_backlinks', fam:'tips',
 k:['why backlinks','do backlinks matter','link building tips','how many backlinks','backlink tips','are links important','domain authority tips'],
 a:"Links are the internet's version of word of mouth, and Google still reads them that way. 🔗\\n\\n**Scale check.** Semrush data puts businesses appearing in the Google map pack at an average of **993 backlinks**. That's not a typo. Authority is not a thing you add at the end.\\n\\n**What actually counts:**\\n• Relevance beats raw volume. One link from a Denver trade association outperforms 200 from a directory farm.\\n• Local citations — chamber, BBB, industry bodies, suppliers, sponsorships — are unglamorous and they work.\\n• Being *mentioned* now matters even without a link, because AI systems weigh brand mentions when deciding who to cite.\\n\\n**Free links most businesses already qualify for and never claim:** your suppliers' dealer pages, any association you pay dues to, local charities you sponsor, the trade school you hire from, your chamber of commerce.\\n\\n**Never buy links.** It's the fastest way to a manual penalty, and unwinding one costs more than the links did.\\n\\nThe honest part: link building is slow, relationship-driven, and largely unautomatable. It's the least fun part of this work and the reason most agencies quietly skip it.",
 c:['*Free audit|i_audit','SEO|seo','Content strategy|tip_content','Talk to a human|i_human']},

{id:'tip_content', fam:'tips',
 k:['does content matter','why blog','fresh content','how often should i post','content tips','blogging tips','how many blogs','does blogging work','stale content','update content'],
 a:"Fresh content isn't about feeding an algorithm. It's about being the one who answered the question. ✍️\\n\\n**The volume data.** Companies publishing 16+ posts a month get roughly 3.5x the traffic of those publishing four or fewer. Long-form pieces earn about 77% more backlinks than short ones.\\n\\n**But volume is the boring half.** The useful half is this: write the answer to the question your customer actually asks on the phone. Not \\\"5 Tips For Homeowners.\\\" Something like \\\"Why is my furnace blowing cold air?\\\" — the sentence a real person types at 11pm.\\n\\n**That's also how you get cited by AI now.** Question-shaped headings, a direct answer in the first two sentences, then the detail. AI systems extract answers; they don't read essays.\\n\\n**Fastest free win:** write down the ten questions you get asked most on sales calls. Each one is a page. You already know the answers cold — you've said them a hundred times.\\n\\n**And update, don't just add.** A post from 2022 that still ranks is worth more refreshed than a new one started from zero.\\n\\nThe hard part is consistency. Everyone writes three posts in January. The compounding happens in month fourteen.",
 c:['*Content strategy help|i_capture','AI search|geo','SEO|seo','Free audit|i_audit']},

{id:'tip_zeroclick', fam:'tips',
 k:['zero click','no click','people dont click','search is changing','future of search','is seo changing','ai taking over search','nobody clicks anymore','search without clicking'],
 a:"The ground moved under search and most business owners haven't been told. 🌐\\n\\n**The headline number:** Semrush put roughly **60% of searches ending without a click** in 2025. The answer appears on the results page and the journey ends there.\\n\\n**Locally it's already normal.** Around 40% of local business queries now trigger an AI Overview. Someone can see your hours, your rating, your phone number and call you — without ever loading your website.\\n\\n**What that changes:**\\n• Your website's job shifts from *being visited* to *being quoted*. The structured facts on it feed the answer even when nobody clicks.\\n• Your Google Business Profile becomes the storefront, not the signpost.\\n• Traffic reports start lying to you. Traffic can fall while calls rise.\\n\\n**Free thing to do today:** open ChatGPT and ask for the best business in your category in your city. Then ask why. If you're not named, you now know something most of your competitors don't — and the reasons it gives you are your to-do list.\\n\\nThe part nobody has a simple answer for is *how* you become the cited source. That's entity clarity, structured data, consistent facts across the whole web, and authority. It's the work we've been building for since before most agencies noticed.",
 c:['*Am I cited by AI? Find out|i_audit','GEO|geo','AIO|aio','Agentic AI|agentic']},

{id:'tip_mobile', fam:'tips',
 k:['mobile','mobile site','phone users','responsive','does mobile matter','mobile friendly','mobile experience','mobile traffic'],
 a:"Your site has two versions and you've only ever really looked at one. 📱\\n\\nRoughly 58–62% of traffic is mobile, and for local service businesses it's usually higher. Yet almost every business owner reviews their site on a desktop monitor in an office with good wifi.\\n\\n**The mobile-only failures I see constantly:**\\n• Phone number that isn't tappable. Costs calls silently, every day.\\n• Phone number below the fold. Nobody scrolls to find it.\\n• A form asking for eight fields with a thumb.\\n• Text at 12px that forces pinch-zoom.\\n• A hero image that eats the entire first screen so the CTA never appears.\\n• Buttons too close together to hit accurately.\\n\\n**Mobile searchers are also 2.3x more likely to call you** from a Business Profile than desktop users (Google/Ipsos). That's the moment you're either easy to reach or invisible.\\n\\n**Two-minute test:** pull your site up on your own phone, on data. Count the taps to reach your phone number. If it's more than one, that's the fix, and it's probably worth more than anything else on your list this month.",
 c:['*Free mobile audit|i_audit','Page speed|tip_speed','Websites|website','Conversion optimization|cro']},

{id:'tip_tracking', fam:'tips',
 k:['call tracking','how do i know what works','attribution','which ads work','track leads','measuring','how do i measure','where are leads coming from','roi tracking','know whats working'],
 a:"\\\"Half my advertising is wasted, I just don't know which half\\\" is a hundred-year-old joke that stopped being funny once tracking got cheap. 📊\\n\\n**Call tracking**, first, because most local businesses convert on the phone and count none of it. A tracking number per channel tells you which source produced which call. Without it you're guessing, and you'll usually guess wrong — people remember the flashy channel, not the effective one.\\n\\n**What to actually watch, in order:**\\n1. **Calls and form fills** — not sessions, not impressions\\n2. **Cost per lead by channel** — the number that ends arguments\\n3. **Close rate by channel** — some sources bring tire-kickers, some bring buyers, and the cheap one is often the worse one\\n4. **Revenue per customer** — because a $90 lead that becomes a $12,000 job is not expensive\\n\\n**The free version:** ask every caller how they found you and write it on a notepad by the phone. Crude, unreliable, and still better than nothing. Do it for 30 days and you'll learn something uncomfortable.\\n\\nThe reason we set tracking up in the first 30 days of every engagement is simple: if we can't prove what we did, you shouldn't keep paying us.",
 c:['*Set up my tracking|i_capture','Reporting|reporting','Free audit|i_audit','Talk to a human|i_human']},

{id:'tip_mistakes', fam:'tips',
 k:['common mistakes','biggest mistake','what am i doing wrong','mistakes businesses make','what do most people get wrong','biggest problems','common problems'],
 a:"After 14 years, the same handful of mistakes account for most of the damage. 🚩\\n\\n**1. Sending ad traffic to the homepage.** The ad promised one thing; the homepage says twelve. Documented fixes to this have produced 200%+ conversion lifts.\\n\\n**2. Treating the Google Business Profile as a one-time setup.** It's the highest-leverage free thing you own and it needs feeding.\\n\\n**3. Judging marketing by traffic.** Traffic is not a business outcome. Calls are.\\n\\n**4. No follow-up system.** Leads that arrive and go cold are the cheapest customers you'll ever lose.\\n\\n**5. A beautiful site that loads in six seconds.** 53% of mobile visitors are gone by second three.\\n\\n**6. Rebuilding the website every two years and resetting the authority.** Migrations done badly undo years of work in an afternoon.\\n\\n**7. Waiting for the perfect moment to start.** SEO compounds. The best time was three years ago; the second best is this week.\\n\\nNone of these are exotic. They're just invisible from the inside, which is the entire reason an outside audit is worth an hour of your time.",
 c:['*Free audit|i_audit','Message match|tip_match','Google Business Profile|tip_gbp','Pricing|pricing']}
);

/* ══════════ KB: CONVERSATION (v7.0) ══════════
   Real people open with small talk. If she can only parse marketing questions,
   the first message lands on the fallback and half of them never send a second.
   These are the human-conversation on-ramps. */
KB.push(
{id:'w_goodday', fam:'world',
 k:['good thanks','im good','doing well','pretty good','cant complain','great thanks','doing great','im great','all good','not bad','pretty well','doing alright','im ok','im fine','going well','having a good day','good day so far','fantastic','wonderful','living the dream'],
 a:"Glad to hear it. 😊 Good days are a decent time to fix something that's been nagging you — the urgent stuff always wins on the bad days.\\n\\nSo, what brings you here? Even a vague answer works. \\\"Phone's too quiet\\\" is a perfectly good starting point.",
 c:['I need more customers|growth','Just looking around|w_browsing','Teach me something|tip_mistakes','Pricing|pricing']},

{id:'w_badday', fam:'world',
 k:['bad day','rough day','not good','not great','terrible','awful','stressed','stressful','busy day','long day','been better','rough week','tough week','struggling','overwhelmed','swamped','slammed','exhausted','tired','burnt out','burned out','its been rough','not the best'],
 a:"Sorry — that's no fun. 🙏\\n\\nI won't pile on with a sales pitch. If you want to tell me what's going on with the business, I'll give you a straight answer and skip the enthusiasm. And if today isn't the day for any of it, that's completely fine too.\\n\\nWhat's going on?",
 c:['Business is slow|growth','Marketing isnt working|obj_triedseo','Just looking|w_browsing','Tell me a joke|w_joke']},

{id:'w_badagency', fam:'world',
 k:['bad experience','burned before','got burned','last agency','previous agency','ripped off','scammed','wasted money','took my money','ghosted me','didnt deliver','bad agency','had a bad experience','been burned','trust issues','no results','paid and got nothing'],
 a:"Yeah. That's depressingly common, and it makes my job harder too — I'm following people who took the money and produced a dashboard. 😤\\n\\n**What usually went wrong**, if it's useful to name it:\\n• You never got told what specifically would be done, so there was nothing to hold them to\\n• Reporting measured impressions and rankings instead of calls and revenue\\n• The person who sold you was not the person who worked on it\\n• Twelve-month term, results promised at month nine\\n\\n**What I'd tell you to demand from anyone — including us:** a named list of deliverables, reporting that shows leads not traffic, and access to your own accounts. If an agency owns your Google Business Profile or your ad account and won't hand it over, that's a red flag by itself.\\n\\nWhat happened with yours? I'd rather hear it than guess.",
 c:['What makes you different?|why','How do you report?|reporting','*Free second opinion|i_audit','Talk to a human|i_human']},

{id:'w_browsing', fam:'world',
 k:['just looking','just browsing','just researching','window shopping','not ready','just curious','curious','doing research','comparing','shopping around','getting quotes','early stages','just started looking'],
 a:"Completely fine — that's what I'm here for, and I won't chase you. 👀\\n\\nResearching properly is the right move. Most bad marketing spend comes from hiring in a panic.\\n\\nIf it helps, ask me anything and I'll answer it straight, including the questions that don't favour us. I'll happily tell you when SEO is the wrong answer for a business.\\n\\nWhat are you trying to figure out?",
 c:['How to choose an agency|why','Teach me something useful|tip_mistakes','What does it cost?|pricing','How long does SEO take?|obj_timeline']},

{id:'w_myname', fam:'world',
 k:['my name is','im called','this is','call me','names'],
 a:"Good to meet you. 👋\\n\\nI'm Iris — I handle the questions around here so you don't have to sit through a sales call to find out what something costs.\\n\\nWhat's the business, and what's not working the way you want?",
 c:['I need more customers|growth','What do you do?|services','Pricing|pricing','*Free audit|i_audit']},

{id:'w_rude', fam:'world',
 k:['you suck','youre useless','stupid bot','dumb bot','worthless','hate chatbots','hate bots','you dont understand','this is annoying','waste of time','garbage','terrible bot'],
 a:"Fair enough — I'd rather you said it than just closed the tab. 🤷\\n\\nI'm a pattern matcher, not a genius, and I do miss things. If I got something wrong, tell me in plainer words and I'll usually catch it the second time.\\n\\nOr skip me entirely: " + CFG.PHONE_MAIN + " gets you an actual human who's considerably smarter than I am.",
 c:['Talk to a human|i_human','Let me try again|i_more','Contact info|contact']},

{id:'w_busy', fam:'world',
 k:['no time','too busy','im busy','dont have time','make it quick','short version','tldr','get to the point','quickly','in a hurry','summarize'],
 a:"Understood. Short version: 🏃\\n\\n**We get local businesses found and make the phone ring.** SEO, Google Maps, AI search, ads, websites, conversion work.\\n\\n**The audit is free**, takes us a day, and there's no contract or card involved.\\n\\n**Full-service runs roughly $500–$3,000/month**, or $100/month for one focused piece.\\n\\n**" + CFG.PHONE_MAIN + "** if you'd rather just talk.\\n\\nThat's it. What do you want to know?",
 c:['*Free audit|i_audit','Pricing detail|pricing','Talk to a human|i_human']},

{id:'w_maybe', fam:'world',
 k:['maybe','not sure','unsure','i dont know','idk','possibly','perhaps','kind of','sort of','soso','so so','depends','hard to say','could be','we will see','ill think about it','let me think','thinking about it','on the fence'],
 a:"Honest answer, and a common place to be. 🤔\\n\\nNo pressure from me. Two things that usually help people get unstuck:\\n\\n**1. The free audit.** You find out what's actually wrong with your site whether or not you hire anyone. Worst case you get a useful list and hand it to someone else.\\n\\n**2. Ask me the awkward question.** Whatever's making you hesitate — cost, trust, timing, whether any of this even works for your industry. I'll answer it straight.\\n\\nWhat's the hesitation?",
 c:['Does SEO even work?|obj_seodead','Whats it cost?|pricing','*Free audit, no strings|i_audit','How long does it take?|obj_timeline']}
);

/* ══════════ KB: MORE INDUSTRIES (v7.0) ══════════
   Broad keyword coverage so a one-word trade name lands somewhere real instead
   of the fallback. v_excluded is a POLICY entry — see the note on it. */
KB.push(
{id:'v_mma', fam:'vert',
 k:['mma','mixed martial arts','karate','jiu jitsu','bjj','brazilian jiu jitsu','muay thai','kickboxing','boxing gym','martial arts','dojo','taekwondo','judo','wrestling','self defense','krav maga','fight gym','grappling','kids martial arts'],
 a:"Martial arts schools are one of my favourite marketing problems — because the buying decision is emotional and the search behaviour is wildly predictable. 🥋\\n\\n**Two completely different customers:**\\n• **Parents** searching \\\"kids karate near me\\\" — buying discipline, confidence and a safe room. Trust signals matter more than technique.\\n• **Adults** searching \\\"BJJ near me\\\" or \\\"kickboxing classes\\\" — buying fitness, stress relief or genuine skill. They want schedule, price and whether they'll be thrown to the wolves on day one.\\n\\n**What actually moves enrolments:**\\n• The free trial class is the offer. Everything should point at it.\\n• Video beats photos here more than almost any industry. A class in motion sells itself.\\n• Reviews from parents are worth their weight — 97% of consumers read them before choosing a local business.\\n• Schedule on the site, in plain text, not a PDF. \\\"Can I make the 6pm?\\\" is the real question.\\n• January and September are your spikes. The work has to be done in November and July.\\n\\nWe work with gyms and martial arts schools happily. Combat sports are absolutely fine by us.",
 c:['*Free audit for my school|i_audit','Local SEO|localseo','Video|video','Pricing|pricing']},

{id:'v_trades', fam:'vert',
 k:['plumber','plumbing','electrician','electrical','hvac','heating','cooling','air conditioning','roofer','roofing','landscaping','landscaper','lawn care','concrete','paving','asphalt','fencing','painter','painting','flooring','drywall','remodeling','remodel','general contractor','handyman','garage door','windows','siding','gutters','pest control','pool service','septic','well drilling','solar','excavation','masonry','tree service','snow removal','appliance repair','locksmith','towing','junk removal','moving company','movers','cleaning service','maid service','pressure washing','chimney','insulation','restoration','water damage','mold'],
 a:"Home services and trades are our deepest bench — and the market has a very specific shape. 🔧\\n\\n**Three types of demand, and they need different things:**\\n• **Emergency** (burst pipe, no heat, roof leaking): proximity, speed, and a tappable phone number. They call the first credible result. Map pack or nothing.\\n• **Planned** (remodel, new roof, new system): they research for weeks, get three quotes, and read every review. Content and trust signals do this work.\\n• **Seasonal** (AC, heating, snow, storm damage): demand spikes hard. Whoever already ranks captures it while everyone else panic-buys ads at four times the normal cost.\\n\\n**What matters most, in order:**\\n1. Google Business Profile and the map pack — 76% of \\\"near me\\\" searchers visit within a day\\n2. Reviews, continuously — 50+ makes you 266% more likely to appear in the local pack\\n3. Service-area pages that are actually different from each other\\n4. A phone number reachable in one tap on mobile\\n5. Answering the phone, which beats most paid campaigns\\n\\nAnd fair disclosure: the founder personally runs a bath remodeling company, so this isn't theory here. It's the same phone we're trying to make ring.",
 c:['*Free audit|i_audit','Home services|v_home','Local SEO|localseo','Talk to a human|i_human']},

{id:'v_profsvc', fam:'vert',
 k:['accountant','accounting','cpa','bookkeeping','tax','insurance agent','insurance agency','mortgage','mortgage broker','lender','loan officer','financial advisor','wealth','title company','notary','staffing','recruiting','consultant','consulting','architect','engineer','surveyor','property management','it services','managed services','msp','security company','printing','signs','equipment rental','b2b'],
 a:"Professional services have a different problem than trades: the search volume is lower but each customer is worth dramatically more. 💼\\n\\n**What that changes:**\\n• You can't play the volume game. Twenty of the right visitors beats two thousand of the wrong ones.\\n• The sales cycle is long, so content that builds trust over multiple visits does more work than any single landing page.\\n• Referrals are your main channel — but people Google you after the referral. What they find either confirms the recommendation or quietly kills it.\\n\\n**Highest-leverage moves:**\\n1. Own your name and your firm's name in search completely. That's the post-referral check.\\n2. Answer the specific expensive questions your clients actually ask — those pages attract people already in the problem.\\n3. Reviews still matter here, badly. Most professional firms have almost none.\\n4. LinkedIn presence that matches your site, because entity consistency is what AI systems use to decide you're real.\\n\\nB2B searchers are also unusually speed-sensitive — a one-second site converts at roughly three times the rate of a five-second one.",
 c:['*Free audit|i_audit','Professional services|v_pro','Content strategy|tip_content','Pricing|pricing']},

{id:'v_beauty', fam:'vert',
 k:['salon','hair salon','barber','barbershop','nails','nail salon','lashes','lash','brows','esthetician','spa','massage','tattoo','tattoo shop','piercing','waxing','tanning','hair stylist','makeup artist','beauty'],
 a:"Beauty and personal care is a visual, local, repeat-business market — which means three things run the show. 💇\\n\\n**1. Photos.** More than almost any category. Your Google Business Profile photos and your Instagram are the actual portfolio. Adding photos to a profile drives about 42% more direction requests and 35% more website clicks.\\n\\n**2. Online booking.** Every extra step between \\\"I want this\\\" and \\\"I'm booked\\\" costs you appointments. If booking requires a phone call during business hours, you're losing the evening browsers — which is most of them.\\n\\n**3. Individual stylists matter as much as the shop.** People search for a person. Staff pages with names, photos and specialties capture searches the salon name never will.\\n\\n**The retention piece nobody does:** a simple reminder system for rebooking at the right interval. Your existing clients are cheaper to keep than anyone new is to find, and most salons rely purely on the client remembering.\\n\\nReviews and recency both matter here — profiles with strong photo counts and 4.5+ ratings capture a disproportionate share of local clicks.",
 c:['*Free audit|i_audit','Local SEO|localseo','Reviews|reviews','Social ads|socialads']},

{id:'v_pets', fam:'vert',
 k:['vet','veterinarian','veterinary','animal hospital','groomer','grooming','pet','pet store','boarding','kennel','dog training','doggy daycare','pet sitting','dog walking','aquarium'],
 a:"Pet businesses have one of the strongest emotional buying drivers there is, and most market as if they're selling a commodity. 🐾\\n\\n**Two urgency levels, two strategies:**\\n• **Emergency** (\\\"emergency vet near me\\\" at 2am): pure map pack and phone. Hours accuracy is critical — a wrong \\\"open now\\\" costs you the patient and earns you a one-star review.\\n• **Routine** (grooming, boarding, training): researched, compared, and heavily review-driven. People are leaving family with strangers.\\n\\n**What works:**\\n1. Photos of actual animals in your actual space. Stock photos read as evasive here.\\n2. Reviews mentioning specific staff by name — those are the ones people trust\\n3. Clear pricing, or at least ranges. The most common unanswered question in this category.\\n4. Holiday boarding demand is predictable to the week. Rank before it, not during.\\n\\nAlso worth knowing: \\\"near me\\\" searches in this category convert unusually fast — 76% of near-me searchers visit a business within a day.",
 c:['*Free audit|i_audit','Local SEO|localseo','Reviews|reviews','Google Business Profile|tip_gbp']},

{id:'v_events', fam:'vert',
 k:['wedding','photographer','photography','videographer','dj','event planner','event planning','catering','caterer','venue','banquet','florist','party rental','event space','entertainment','band'],
 a:"Events and weddings are a high-consideration, long-lead, portfolio-driven market. Very different rules. 💐\\n\\n**The shape of it:**\\n• Booking happens 6–18 months ahead, so your pipeline this month is next year's revenue\\n• The portfolio IS the product. Site speed matters enormously because you're serving heavy images to people browsing 40 vendors.\\n• Pinterest and Instagram drive discovery; Google closes it. People find a look, then search the vendor's name.\\n\\n**What actually gets booked:**\\n1. Fast-loading galleries. A gorgeous portfolio that takes eight seconds is an unseen portfolio — 53% of mobile visitors leave after three.\\n2. Pricing transparency, even just a starting-at number. The single biggest filter, and vendors who hide it lose people who would have said yes.\\n3. Real full events, not just highlight shots. Buyers want to see the whole day handled.\\n4. Venue-specific pages if you work the same venues repeatedly — those searches are gold and almost nobody targets them.\\n\\nSeasonality is brutal in this category. The marketing work has to happen in your off months.",
 c:['*Free audit|i_audit','Websites|website','Page speed|tip_speed','Social ads|socialads']},

{id:'v_health', fam:'vert',
 k:['chiropractor','chiropractic','physical therapy','pt','optometrist','optometry','eye doctor','dermatology','dermatologist','podiatrist','orthodontist','dentist office','urgent care','clinic','primary care','pediatrician','therapist','counseling','counselor','mental health practice','audiologist','hearing','home health','medical practice','healthcare practice'],
 a:"Healthcare practices carry a constraint most industries don't: you're regulated, so the marketing has to be careful as well as effective. 🩺\\n\\n**What we do and don't touch:** we handle visibility, reputation and the conversion path. We don't write clinical claims, we don't touch patient data, and we don't publish anything that reads as a medical promise. That's your call and your compliance team's, not ours.\\n\\n**What moves the needle:**\\n1. **Insurance accepted, listed plainly.** The single most searched question about any practice, and the one most sites bury.\\n2. **Individual provider pages.** Patients search for the person. Each provider is an entity Google and AI systems can recognise — or can't.\\n3. **Reviews, handled carefully.** Never respond in a way that acknowledges someone as a patient. A generic professional reply is both safer and more effective.\\n4. **New-patient booking that works on a phone at 9pm.**\\n5. **Appointment-availability language** — \\\"accepting new patients\\\" is a conversion phrase, not a detail.\\n\\nBe aware that about 40% of local queries now trigger an AI Overview, and in health categories those answers lean hard on structured, consistent information about your practice.",
 c:['*Free audit|i_audit','Local SEO|localseo','Reviews|reviews','Talk to a human|i_human']},

/* POLICY ENTRY — DO NOT SOFTEN.
   Zach's stated boundary, Sept 2026: no adult content, no cannabis/drugs, no
   alcohol, no firearms or weapons, nothing derogatory. Combat sports (MMA,
   boxing, martial arts) are explicitly FINE and are handled by v_mma above —
   do not let this entry swallow them. Keep the refusal warm and short: the
   person asking may well have another business we can help with. */
{id:'v_excluded', fam:'vert',
 k:['dispensary','cannabis','marijuana','weed','cbd shop','vape','vape shop','smoke shop','kratom','liquor store','brewery','distillery','bar promotion','nightclub promotion','alcohol brand','gun store','firearms','ammo','guns','weapons','tactical','adult','porn','xxx','escort','strip club','onlyfans','adult site','gambling','casino','sportsbook','payday loan','crypto pump'],
 a:"I have to be straight with you — that's outside what we take on. 🙏\\n\\nWe don't do adult, cannabis or drug-related, alcohol, firearms or weapons work, or anything we'd consider derogatory. Not a judgement on you or your business; it's just a line the company drew and I'm not going to pretend otherwise and waste your time.\\n\\nCombat sports, for the record, are absolutely fine — gyms, MMA, boxing and martial arts schools are welcome.\\n\\nIf you've got a **different** venture we'd be a fit for, I'm genuinely happy to talk about that one. And I hope you find someone good for this — there are agencies that specialise in these categories and know the ad rules cold, which matters a lot in regulated space.",
 c:['I have another business|i_capture','What do you work with?|services','Martial arts / gyms|v_mma']}
);

/* ══════════ KB: STRATEGY & CHANNELS (v7.1) ══════════
   Same sourcing rule as the v7.0 tips block: a number only exists here if a
   named study produced it. Two attributions below are ones the internet gets
   wrong constantly — see tip_speedlead. Getting those right is cheap
   credibility and stops a sharp prospect catching us out. */
KB.push(
{id:'tip_email', fam:'tips',
 k:['email roi','is email dead','does email work','email marketing worth it','newsletter','email list','build a list','why email'],
 a:"Email is the least glamorous channel and it still beats everything on return. 📧\\n\\n**The number:** roughly **$36–$42 back per $1 spent** in 2026 — against about $2 for paid search, $2.80 for social ads and $1.35 for display. 42% of marketers name it their most effective channel; social and paid search sit at 16% each.\\n\\n**Why it wins:** you own the list. No algorithm can throttle it, no platform can raise the price on you, and nobody has to be shown an ad to hear from you.\\n\\n**What most local businesses get wrong:** they collect addresses and never send anything, then blast a discount when things get quiet. That trains people to wait for discounts.\\n\\n**The version that works for a service business:** a short monthly note with one genuinely useful thing and one soft offer. Seasonal reminders timed to the actual season. A reactivation email to anyone who hasn't bought in a year.\\n\\nAnd frequency matters: 5–8 sends a month has tested highest for ROI in several industries. Most small businesses send about two a year.",
 c:['*Set up my email|i_capture','Reactivation campaigns|tip_winback','Lifetime value|tip_ltv','Free audit|i_audit']},

{id:'tip_speedlead', fam:'tips',
 k:['speed to lead','response time','how fast should i respond','call back fast','follow up fast','answer leads','lead response','5 minute rule','five minute rule','missed calls'],
 a:"If you only fix one thing this year, fix this. It costs nothing. ⏱️\\n\\n**The research:** the MIT / InsideSales Lead Response Management study (Dr James Oldroyd, 2007 — six companies, 15,000+ leads, 100,000+ call attempts) found that contacting a lead at **5 minutes versus 30 minutes** makes you about **21x more likely to qualify it** and roughly **100x more likely to reach the person at all**.\\n\\n**Worth getting the credit right:** those 21x/100x figures are constantly attributed to Harvard. They're MIT. The separate *Harvard Business Review* audit (2011, 2,241 US firms) is the one that found an average first response of **42 hours**, with 23% never responding.\\n\\n**And the kicker:** roughly 78% of customers buy from whoever responds first. Not the cheapest. Not the best. The first.\\n\\n**What this means in money.** A $50 lead you answer in half an hour is worth a fraction of the same lead answered in five minutes. You already paid full price for it either way.\\n\\n**Free fixes today:** put missed-call-text-back on your business line. Answer the phone or return it inside five minutes during the day. Stop letting form fills sit in an inbox until evening.\\n\\nThis is the cheapest competitive advantage in sales and almost nobody uses it.",
 c:['*Fix my follow-up|i_capture','Follow-up sequences|tip_followup','Call tracking|tip_tracking','AI chatbots|chatbot']},

{id:'tip_referral', fam:'tips',
 k:['referral','referrals','referral program','word of mouth','get referrals','ask for referrals','customer referrals'],
 a:"Referrals are your cheapest customers and almost nobody runs them on purpose. 🤝\\n\\n**The numbers, and they're strong.** Nielsen has 92% of consumers trusting recommendations from people they know — the most trusted form of advertising there is. Referred customers show about 37% higher retention (Ogilvy/Google/TNS). Referral is the lowest cost-per-acquisition of any channel, commonly $15–$25 a lead.\\n\\n**Here's the gap that pays for itself.** Texas Tech research found **83% of satisfied customers are willing to refer — and only 29% actually do.** That's not a loyalty problem. It's an asking problem.\\n\\n**Wharton found a structured program lifts referral rates about 3x over organic word of mouth.** Structure just means: a specific ask, at a specific moment, with a specific thing to hand over.\\n\\n**The simplest version that works:**\\n1. Ask at completion, when they're visibly happy\\n2. Give them something physical — a card, a link, an NFC tap\\n3. Make the reward matter to both sides\\n4. Thank them personally when it lands\\n\\nNo software required to start. A stack of cards and a habit will do it.",
 c:['*Build my referral program|i_capture','NFC cards|tip_nfc','Reviews|reviews','Loyalty programs|tip_loyalty']},

{id:'tip_followup', fam:'tips',
 k:['follow up','followup','nurture','sequence','leads go cold','cold leads','they never call back','quotes not closing','estimates not closing','drip campaign'],
 a:"Most businesses quit after one attempt and call the lead bad. 📞\\n\\nForbes research found reps average about **1.3 call attempts** before giving up. Over 30% of leads are never contacted at all.\\n\\n**A follow-up cadence that actually gets used** — and this is deliberately boring, because complicated ones get abandoned:\\n• **Minute 5:** call. Not later. (See the 21x research.)\\n• **Hour 1:** text if no answer. Texts get read.\\n• **Day 1:** the quote or info, by email, with a specific next step\\n• **Day 3:** short check-in. \\\"Any questions on that?\\\"\\n• **Day 7:** one more, with a reason to move — availability, timing, a seasonal factor\\n• **Day 30:** value, not a pitch. Something useful.\\n• **Day 90 and beyond:** quarterly, forever, until they buy or ask you to stop\\n\\n**The one that makes the most money** is the day-90-onward loop. People who didn't buy in March often buy in September, and by then your competitor has forgotten them entirely.\\n\\n**Write the messages once.** The reason follow-up fails is that it requires writing something original when you're tired. Templates fix that.",
 c:['*Set up my follow-up|i_capture','Speed to lead|tip_speedlead','CRM|tip_crm','Email|tip_email']},

{id:'tip_offer', fam:'tips',
 k:['offer','my offer','what offer','promotion','deal','special','discount','incentive','what should i offer','make an offer'],
 a:"You can't out-market a weak offer. This is the lever most people never touch. 🎁\\n\\n**The offer is not the discount.** It's the whole shape of what someone gets, what it costs them, what happens if it goes wrong, and how soon they get it.\\n\\n**Levers that beat cutting your price:**\\n• **Remove the risk.** A guarantee shifts the gamble from them to you, and it converts better than an equivalent discount while protecting your margin.\\n• **Remove the friction.** Free inspection, free quote, no obligation, no card.\\n• **Add certainty.** \\\"On site within 24 hours\\\" beats \\\"competitive rates\\\" every time.\\n• **Bundle instead of discounting.** Adding something cheap for you and valuable to them protects your price.\\n• **Make the first step tiny.** Nobody wants to commit to a $12,000 job. Everybody will take a free look.\\n\\n**Discounting is the lazy lever** and it's the only one you can't undo — you've taught the market your real price.\\n\\nTest a stronger offer before you spend another dollar on traffic. Same visitors, more customers, is a cheaper win than more visitors.",
 c:['*Help me build an offer|i_capture','Guarantees|tip_guarantee','Pricing|tip_pricing','Conversion|cro']},

{id:'tip_guarantee', fam:'tips',
 k:['guarantee','warranty','risk reversal','money back','promise','refund policy','satisfaction guarantee'],
 a:"A guarantee is the cheapest conversion tool there is, and most owners are too nervous to use one. 🛡️\\n\\n**What it really does:** it moves the risk from the buyer to you. Every hesitation before a purchase is some version of \\\"what if this goes wrong\\\" — a guarantee answers that before they have to ask.\\n\\n**Types, roughly in order of strength:**\\n• **Specific and unusual** — \\\"on site in 2 hours or the call-out is free.\\\" Memorable because it's checkable.\\n• **Workmanship, in plain English** — \\\"if it fails in 12 months we come back, no charge, no argument.\\\"\\n• **Satisfaction** — soft, but still better than nothing.\\n\\n**The fear:** everyone will abuse it. In practice the claim rate is almost always lower than the conversion lift, because most people are honest and the ones who aren't were going to be a problem regardless.\\n\\n**Where to put it:** next to the price and next to the button. Not buried on a terms page.\\n\\nIf you're already doing the work over for unhappy customers — and most good operators quietly are — you already have a guarantee. You're just not getting paid for it.",
 c:['*Talk it through|i_capture','Offers|tip_offer','Conversion|cro','Reviews|reviews']},

{id:'tip_pricing', fam:'tips',
 k:['pricing strategy','how should i price','raise prices','too cheap','charge more','price increase','discounting','race to the bottom','competitors are cheaper'],
 a:"Being the cheapest is a strategy with exactly one ending. 💵\\n\\n**A few things worth knowing:**\\n• **Price is a signal.** Too low reads as inexperienced, not as a bargain. Plenty of buyers skip the lowest quote on purpose.\\n• **The middle option gets chosen.** Three tiers, with the one you want them to pick in the middle, reliably outperforms a single price.\\n• **Anchor high first.** Whatever number they hear first sets the frame for everything after.\\n• **Raise prices on new customers before existing ones.** Test the market without punishing loyalty.\\n• **Cutting price 10% often needs 30%+ more volume to break even**, depending on your margin. Run that math before you discount.\\n\\n**On competitors being cheaper:** somebody will always be cheaper. The question isn't how to match them — it's how to be obviously worth more. That's usually proof, speed, guarantees and communication, not features.\\n\\n**And the uncomfortable one:** if you're busy and still broke, you don't have a marketing problem. You have a pricing problem, and more leads will make it worse.",
 c:['*Talk pricing strategy|i_capture','Offers|tip_offer','Positioning|tip_usp','Lifetime value|tip_ltv']},

{id:'tip_usp', fam:'tips',
 k:['usp','unique selling proposition','what makes me different','differentiate','positioning','why choose me','stand out','we are all the same','commodity'],
 a:"\\\"Quality work, great service, family owned since 1998.\\\" So does everyone else on the page. 🎯\\n\\n**A real differentiator has to be something a competitor either can't say or won't.** If they could copy your line onto their site without changing a word, it isn't one.\\n\\n**Places to find a genuine one:**\\n• **A process nobody explains.** You do it; they do it too; nobody describes it. Whoever describes it first owns it.\\n• **A specific guarantee** with a number in it.\\n• **A niche.** \\\"We do roofs\\\" vs \\\"we do hail damage insurance claims and handle the adjuster for you.\\\"\\n• **A thing you refuse to do.** Turning work down is enormously persuasive.\\n• **Who you are.** Founder-led, ex-trade, second generation, the person who answers is the person who does the work.\\n\\n**Fastest test:** read your homepage and your three closest competitors' homepages side by side with the logos covered. If you can't tell whose is whose, you don't have positioning — you have a brochure.\\n\\nThis is the work that makes every other marketing dollar cheaper, and it's the part most agencies skip because it requires actually understanding your business.",
 c:['*Help me find mine|i_capture','Offers|tip_offer','Brand & logo|tip_brand','Competitor research|tip_competitor']},

{id:'tip_proof', fam:'tips',
 k:['testimonials','social proof','case study','case studies','before and after','proof','show results','portfolio','trust signals'],
 a:"Proof beats adjectives. Every time, in every industry. 🏆\\n\\n**In rough order of persuasive power:**\\n1. **Before and after photos**, unedited, with context. Unbeatable in any visual trade.\\n2. **Video testimonial**, 30 seconds, filmed on a phone. The slightly rough one outperforms the polished one, because polish reads as paid.\\n3. **A specific number** — \\\"cut their callbacks by half,\\\" not \\\"great results.\\\"\\n4. **Named reviews with photos.** Anonymous praise persuades nobody.\\n5. **Logos of who you've worked for**, if the names mean something locally.\\n6. **Star ratings**, which 97% of consumers read before choosing a local business.\\n\\n**The mistake:** stacking all proof on one \\\"testimonials\\\" page nobody visits. Put it where the hesitation happens — next to the price, next to the form, next to the button.\\n\\n**The best testimonial answers an objection.** \\\"I thought it would be expensive and it wasn't\\\" does more work than \\\"they were lovely.\\\" So when you ask, ask what they were worried about beforehand.",
 c:['*Build my proof|i_capture','Reviews|reviews','Video|video','Conversion|cro']},

{id:'tip_headline', fam:'tips',
 k:['headline','headlines','h1','write a headline','hero text','main text','what should my homepage say','tagline'],
 a:"Most people read your headline and nothing else. Write it last and write it hardest. ✍️\\n\\n**What a good one does:** names who it's for, what they get, and ideally how fast. In that order.\\n\\n**Weak:** \\\"Welcome to Smith Plumbing — Quality Service Since 1994.\\\"\\n**Stronger:** \\\"Denver plumbing, same day, or the call-out is free.\\\"\\n\\n**Patterns that consistently earn clicks and reads:**\\n• Outcome + timeframe — \\\"Booked jobs in 90 days\\\"\\n• Problem, named plainly — \\\"Traffic but nobody calls?\\\"\\n• Specific numbers, which read as true because they're checkable\\n• Who it's for — \\\"For contractors doing $1M+\\\"\\n\\n**Things to cut:** \\\"Welcome to.\\\" Your company name. \\\"Solutions.\\\" \\\"Excellence.\\\" Anything a competitor could also say.\\n\\n**And keep the page's headline honest to the ad that sent them.** If the ad said one thing and the headline says another, the click is already lost — documented fixes to that mismatch have produced 200%+ lifts on their own.",
 c:['*Rewrite my homepage|i_capture','Message match|tip_match','Metadata|tip_meta','Conversion|cro']},

{id:'tip_cta', fam:'tips',
 k:['call to action','cta','button','what should my button say','submit button','get them to call','make them call'],
 a:"Your button is doing more work than your logo and gets a fraction of the attention. 🔘\\n\\n**Rules that hold up:**\\n• **Say what happens next**, not what the visitor does. \\\"Get my free quote\\\" beats \\\"Submit.\\\"\\n• **First person converts better.** \\\"Start *my* audit\\\" over \\\"Start *your* audit.\\\"\\n• **One primary action per screen.** Two equal buttons is a decision, and decisions cause delay.\\n• **Repeat it.** Top, middle, bottom. People decide at different depths.\\n• **Reduce the perceived cost right underneath** — \\\"takes 30 seconds,\\\" \\\"no card needed,\\\" \\\"no obligation.\\\" That line often does more than the button copy.\\n• **On mobile, one tap to the phone.** Always.\\n\\n**Never \\\"Submit.\\\"** It's the language of paperwork, and it's what almost every form still says.\\n\\n**Test the boring stuff.** Colour matters far less than people think; wording, position and the reassurance line underneath matter far more.",
 c:['*Audit my CTAs|i_audit','Forms|tip_forms','Headlines|tip_headline','Conversion|cro']},

{id:'tip_forms', fam:'tips',
 k:['form','forms','contact form','form fields','too many fields','form conversion','quote form','fewer fields'],
 a:"Every field you add costs you leads. Decide which ones are worth it. 📝\\n\\n**The trade-off:** short forms get more submissions, longer forms get better-qualified ones. Neither is automatically right — it depends whether your bottleneck is volume or quality.\\n\\n**For most local service businesses, it's volume**, so cut hard:\\n• Name, phone, and one sentence about the problem. That's a working form.\\n• Email is often optional when you already have a phone number.\\n• Drop anything you could ask on the call instead. Address, budget, timeline — all easier in conversation.\\n\\n**Things that quietly kill submissions:**\\n• Required fields with no asterisk, so people fail and don't know why\\n• Dropdowns on mobile with 40 options\\n• A CAPTCHA on a form getting no spam\\n• Errors that clear what they already typed — the fastest way to lose someone\\n• No confirmation afterwards, so they submit twice or assume it failed\\n\\n**Test yours with your thumb**, on data, like a customer would. Most owners have never once filled in their own form.",
 c:['*Fix my forms|i_capture','CTAs|tip_cta','Mobile|tip_mobile','Conversion|cro']},

{id:'tip_landing', fam:'tips',
 k:['landing page','landing pages','squeeze page','sales page','page structure','what goes on a landing page','funnel page'],
 a:"A landing page is not a small website. It has one job and everything else is a leak. 🛬\\n\\n**The anatomy that works:**\\n1. **Headline** matching the ad or link that sent them, word for word where you can\\n2. **One sentence** on what it is and who it's for\\n3. **The action** — button or form, visible without scrolling on a phone\\n4. **Three to five proof points**, not a wall\\n5. **Real proof** — photos, review, number\\n6. **Objection handling** — price, timing, risk, in that order\\n7. **The action again**\\n8. **A short FAQ** answering what people actually ask on the phone\\n\\n**What to remove:** site navigation. Every nav link is an exit. Also any second offer, any social icon, and anything that opens a new tab.\\n\\n**Benchmark:** average landing page conversion sits around 2.35%; better performers run above 5%. If you're under 1%, it's usually message mismatch or a page that loads too slowly to be seen.",
 c:['*Build me a landing page|i_capture','Message match|tip_match','Page speed|tip_speed','VIP member pricing|pricing']},

{id:'tip_leadmagnet', fam:'tips',
 k:['lead magnet','freebie','free download','ebook','checklist','opt in','capture emails','give something away'],
 a:"A lead magnet is a trade: something genuinely useful for permission to follow up. 🧲\\n\\n**What works for local service businesses** — and it's not an ebook:\\n• **A free inspection or audit.** Highest intent, because only real prospects book one.\\n• **A price guide.** \\\"What a bathroom remodel actually costs in Denver in 2026.\\\" Enormously popular and almost nobody publishes one.\\n• **A checklist** they'd genuinely use before hiring anyone — including your competitors.\\n• **A comparison** of the options, honestly done. Being the one who explained it is worth more than being the one who sold hardest.\\n\\n**What doesn't work:** a generic PDF, a newsletter signup with no promise, anything that reads as a mailing list in disguise.\\n\\n**The rule that makes it work:** it has to be useful even if they never hire you. That's what makes it worth an email address, and it's also what makes them remember you when they do buy.",
 c:['*Build me one|i_capture','Email|tip_email','Free audit|i_audit','Content|tip_content']},

{id:'tip_sms', fam:'tips',
 k:['sms','text message','texting','text marketing','text customers','mass text','appointment reminders'],
 a:"Texts get read. That's the whole advantage, and it's also the whole danger. 💬\\n\\n**Where it genuinely wins:**\\n• **Appointment reminders.** Cuts no-shows more than any other single change most service businesses can make.\\n• **\\\"On my way\\\" messages.** Free, and customers remember it.\\n• **Missed-call text-back.** Someone calls, you can't answer, they get a text in seconds. This one converts remarkably well because it catches people at peak intent.\\n• **Quote follow-up.** A text gets answered when an email doesn't.\\n\\n**Where it backfires:** promotional blasts. The channel is intimate; abuse it and people don't unsubscribe quietly, they resent you.\\n\\n**Compliance is not optional.** You need real consent, an opt-out in the message, and records of both. The penalties for getting this wrong are per-message and they are not small. Do not buy a list.\\n\\n**Rule of thumb:** if the text is about *their* job, send it. If it's about your promotion, think twice.",
 c:['*Set this up for me|i_capture','Speed to lead|tip_speedlead','Follow-up|tip_followup','Reviews|reviews']},

{id:'tip_directmail', fam:'tips',
 k:['direct mail','postcards','mailers','eddm','flyers','mail campaign','door hangers','leaflets'],
 a:"Direct mail got good again precisely because everyone left. 📬\\n\\nYour prospect's inbox has 200 emails in it. Their mailbox has four things, and one of them is yours.\\n\\n**Where it still works hard:**\\n• **Radius mailing around a job you just finished.** \\\"We just replaced a roof on your street.\\\" Highest-response mail most trades can send.\\n• **Storm and seasonal targeting**, where timing carries the message.\\n• **Reactivating old customers** who've stopped responding to email.\\n• **High-ticket services** where a $0.60 piece chasing a $15,000 job is rounding-error cheap.\\n\\n**What makes it fail:** a pretty postcard with no offer and no deadline. Mail needs a reason to act now more than digital does, because there's no back button.\\n\\n**Pair it with digital.** People who get the mailer and then see you online convert better than either alone — familiarity does the work.\\n\\nWe do the design and the print, and members get member pricing on both.",
 c:['*Get mail pricing|i_capture','Neighborhood targeting|tip_servicearea','NFC cards|tip_nfc','VIP membership|pricing']},

{id:'tip_signage', fam:'tips',
 k:['vehicle wrap','truck wrap','van wrap','signage','yard sign','yard signs','magnets','storefront sign','lawn signs','job site sign'],
 a:"The cheapest advertising most trades own is already sitting in their driveway. 🚚\\n\\n**Vehicle wraps** get seen thousands of times a day for a one-time cost. But most of them are unreadable at speed.\\n**Rules:** company name and phone number huge, everything else small or gone. No list of twelve services. No email address. No social handles. Somebody at 40mph gets about two seconds — they can retain a name and a number, not a brochure.\\n\\n**Yard signs** are the most underused lead source in home services. You just did visible work on a street where everyone has the same house and the same age of roof. Leave a sign. Ask first, and it's worth offering something for the privilege.\\n\\n**Job site signs** work the same way and cost almost nothing.\\n\\n**The one that pays for itself twice:** put a short, memorable URL on it. Not your 34-character domain. Something someone can remember at a red light.\\n\\nWe do wrap design, signage and print, and members get member pricing.",
 c:['*Get design pricing|i_capture','Design & logos|graphic','Direct mail|tip_directmail','VIP membership|pricing']},

{id:'tip_partnership', fam:'tips',
 k:['partnership','partnerships','strategic partners','joint venture','cross promotion','referral partners','networking','bni','chamber'],
 a:"The fastest growth channel for most local businesses isn't advertising. It's the other business that already has your customer. 🤝\\n\\n**Who to look for:** anyone serving the same person at a different moment. Realtors and home inspectors. Plumbers and remodelers. Vets and groomers. Wedding venues and photographers. Accountants and attorneys.\\n\\n**Why it beats advertising:** you're borrowing trust that's already been earned, which is why referrals convert at several times the rate of cold channels and cost a fraction.\\n\\n**How to actually start one**, because \\\"let's refer each other\\\" dies within a week:\\n• Go first. Send them work before asking for any.\\n• Make it concrete — a specific card, a specific link, a specific person to ask for.\\n• Track it, so both sides can see it's real.\\n• Check in quarterly. Partnerships decay silently.\\n\\n**Bonus SEO value:** partner sites linking to yours is exactly the kind of relevant local link that's hard to buy and easy to earn.",
 c:['*Help me build partners|i_capture','Backlinks|tip_backlinks','Referrals|tip_referral','Local SEO|localseo']},

{id:'tip_ltv', fam:'tips',
 k:['lifetime value','ltv','clv','customer value','repeat business','retention','how much is a customer worth','keep customers'],
 a:"If you don't know what a customer is worth, you can't know what one is worth *buying*. 💎\\n\\n**Rough maths, and rough is fine:** average sale × times they buy per year × years they stay. A $180 service, three times a year, for four years, is a **$2,160 customer** — not a $180 one.\\n\\n**Why it changes everything:** a $90 lead looks expensive against $180 and absurdly cheap against $2,160. Most owners price their marketing against a single transaction and then conclude marketing doesn't work.\\n\\n**Cheapest ways to raise it:**\\n• **Show up again.** Most churn is neglect, not dissatisfaction.\\n• **Maintenance plans.** Turns a transaction into a subscription and smooths your cash flow.\\n• **Reminders at the right interval** — your customer isn't loyal to a competitor, they just forgot.\\n• **A second service they didn't know you offer.** Usually the fastest single win.\\n\\n**Bain found referral programs lift lifetime value about 32%**, which means happy customers are worth more than their own spending.",
 c:['*Work this out with me|i_capture','Reactivation|tip_winback','Referrals|tip_referral','Email|tip_email']},

{id:'tip_cac', fam:'tips',
 k:['cost per lead','cac','acquisition cost','what should a lead cost','cost per customer','is that lead expensive','marketing math'],
 a:"Two numbers end most marketing arguments. Here they are. 🧮\\n\\n**Cost per lead** = what you spent ÷ leads it produced.\\n**Cost per customer** = that, divided by your close rate.\\n\\nSo a $600 spend producing 20 leads is $30 a lead. Close a quarter of them and you paid **$120 per customer**. Whether that's good depends entirely on what a customer is worth to you — which is why lifetime value comes first.\\n\\n**The trap:** judging channels on cost per lead alone. The cheap channel often brings tire-kickers and the expensive one brings buyers. Track close rate *by source* or you'll optimise your way into worse customers.\\n\\n**A rule worth keeping:** if a channel returns more than it costs and you can scale it, it isn't expensive — it's a machine. Most owners kill channels at month two because they're measuring cost instead of return.\\n\\n**And the one nobody counts:** the cost of a lead you never followed up. That one is 100% waste and it's free to fix.",
 c:['*Run my numbers|i_capture','Lifetime value|tip_ltv','Tracking|tip_tracking','Speed to lead|tip_speedlead']},

{id:'tip_winback', fam:'tips',
 k:['reactivation','win back','winback','old customers','past customers','lapsed','havent bought in a while','database','my list'],
 a:"The cheapest customer you'll get this month is one you already had. ♻️\\n\\n**Almost every established business is sitting on a list they've never once contacted deliberately.** Old invoices, old quotes, old estimates. Those people already trusted you enough to buy or nearly buy.\\n\\n**A reactivation campaign that takes an afternoon:**\\n1. Pull everyone who hasn't bought in 12+ months\\n2. Send something honest: \\\"It's been a while — here's what's changed, and here's something for coming back.\\\"\\n3. Call the top 20 by past spend. Actually call.\\n4. Repeat quarterly, forever\\n\\n**The unclosed-quote list is even better.** Those people wanted it and something stopped them. Timing, money, a spouse. Most of those reasons expire.\\n\\n**Why it works so well:** no acquisition cost, no trust to build, no explanation of who you are. It's the closest thing to free revenue a business has, and it's sitting in an accounting package nobody opens for marketing.",
 c:['*Run a reactivation for me|i_capture','Email|tip_email','Follow-up|tip_followup','Lifetime value|tip_ltv']},

{id:'tip_seasonal', fam:'tips',
 k:['seasonal','season','busy season','slow season','off season','when to advertise','seasonality','winter slow','summer slow'],
 a:"The single most common timing mistake: advertising during the busy season. ❄️☀️\\n\\n**Why it's backwards.** When demand spikes, every competitor is bidding, ad costs jump, and SEO can't be built fast enough to catch it. You pay peak prices for attention you could have earned cheaply three months earlier.\\n\\n**The right rhythm:**\\n• **Off-season:** build. Content, SEO, site fixes, review collection, list building. Cheap, quiet, compounding.\\n• **Ramp (6–8 weeks out):** you should already be ranking. Now add ads and email.\\n• **Peak:** harvest. Answer fast, book tight, collect reviews while satisfaction is highest.\\n• **Post-peak:** reactivate and ask for referrals while the work is fresh in their memory.\\n\\n**Denver specifics:** hail moves roofing, restoration and auto glass overnight. Heating demand starts the first genuinely cold week. Whoever already ranks captures that; everyone else buys ads at four times the normal cost.\\n\\n**The quiet months are not dead time.** They're when next year's busy season gets built.",
 c:['*Plan my year|i_capture','SEO timeline|obj_timeline','Google Ads|ppc','Content|tip_content']},

{id:'tip_budget', fam:'tips',
 k:['how much should i spend','marketing budget','what budget','percentage of revenue','how much is normal','budget for marketing'],
 a:"There's no universal right number, but there are useful anchors. 📐\\n\\n**Common benchmarks:** established businesses often run 5–10% of revenue on marketing. Businesses actively trying to grow, or in competitive markets, run higher. Newer businesses have to spend a larger share because they're buying awareness they don't have yet.\\n\\n**For context on agencies specifically**, published surveys put the average monthly retainer around $3,200 (Ahrefs polled 439 providers; Clutch reports similar), with GoodFirms finding 48% of agencies in the $1,500–$5,000 band.\\n\\n**But the better question isn't the percentage. It's this:** what does a customer earn you, and what will you pay to get one? Once you know that, budget stops being a guess and becomes arithmetic.\\n\\n**Practical starting shape for a local service business:**\\n• Fix the foundations first — site speed, Business Profile, tracking. Cheap and non-optional.\\n• Then one compounding channel (SEO) and one immediate channel (ads or mail).\\n• Don't split a small budget across five channels. You'll be invisible in all of them.\\n\\nOurs run roughly $500–$3,000/month full service, or $100/month for one focused piece.",
 c:['*What would mine look like?|i_capture','Pricing|pricing','Cost per lead|tip_cac','Free audit|i_audit']},

{id:'tip_competitor', fam:'tips',
 k:['competitor research','spy on competitors','what are competitors doing','competitive analysis','beat my competitor','who ranks above me'],
 a:"Your competitors have already run experiments you can read the results of for free. 🔍\\n\\n**What you can find in an hour, no tools:**\\n• Search your main terms in an incognito window. Who's in the map pack? Who's in the ads? Ads that run for months are ads that work.\\n• Read their reviews — especially the 3-star ones. That's a list of the promises you should be making.\\n• Check what services they list that you don't, and vice versa.\\n• Look at their Business Profile categories. Wrong ones are common and they're an opening.\\n• Ask ChatGPT who the best in your category is locally and see who it names.\\n\\n**What to do with it:** don't copy. Find the thing they're all failing at — usually response speed, price transparency, or explaining the process — and own it loudly.\\n\\n**The deeper version** — backlink gaps, keyword gaps, where their traffic actually comes from — needs paid tools and someone who can read them. That's part of what the free audit covers.",
 c:['*Run a competitor audit|i_audit','Positioning|tip_usp','Backlinks|tip_backlinks','Local SEO|localseo']},

{id:'tip_brand', fam:'tips',
 k:['brand','branding','logo design','rebrand','business name','naming','colors','brand colors','visual identity','look professional'],
 a:"Brand isn't your logo. It's what people expect before they've met you. 🎨\\n\\n**Where it actually matters for a local business:**\\n• **Consistency beats beauty.** The same name, colours, phone number and photos everywhere — site, Business Profile, truck, invoice. Inconsistency reads as unreliable, and it genuinely confuses AI systems trying to decide who you are.\\n• **Legibility beats cleverness.** A logo that has to be explained is a bad logo. It needs to work at 30 feet on a truck and at 16 pixels as a favicon.\\n• **Own a colour locally.** If every competitor in your trade uses blue, be the orange one. Recognition is worth more than taste.\\n• **Your name is a marketing decision.** Hard to spell means hard to search for. If people mishear it on the phone, that's costing you.\\n\\n**When to rebrand:** almost never, and never during growth. Recognition is an asset you spent years buying. Refresh the look, keep the name.\\n\\nWe do logo, print, signage and full identity — member pricing applies.",
 c:['*Get design pricing|i_capture','Design & logos|graphic','Positioning|tip_usp','VIP membership|pricing']},

{id:'tip_nap', fam:'tips',
 k:['nap','citations','directories','listings','yelp','yellow pages','bbb listing','business listings','inconsistent address','old address'],
 a:"Name, Address, Phone — NAP. Boring, unglamorous, and quietly wrecking a lot of local rankings. 📇\\n\\n**The problem:** your business exists in dozens of directories you never created. Old address, old phone, a suite number on some and not others, a name with \\\"LLC\\\" on half of them. Every inconsistency makes Google slightly less certain you're one real business.\\n\\n**And it now matters more than it used to**, because AI systems assembling an answer about you are reading the same scattered records. Contradictory facts make you a risky thing to cite.\\n\\n**The fix, in order:**\\n1. Decide the canonical version. Exactly one format, including punctuation.\\n2. Fix Google first, then Apple Maps and Bing.\\n3. Then the big aggregators, then industry directories.\\n4. Then hunt old listings from previous addresses — these are the ones that do the damage.\\n\\n**Do it once, properly.** It's tedious, it's cheap, and it's the kind of foundational work that makes everything else you do rank slightly better.",
 c:['*Clean mine up|i_capture','Google Business Profile|tip_gbp','Local SEO|localseo','Free audit|i_audit']},

{id:'tip_servicearea', fam:'tips',
 k:['service area','service areas','location pages','city pages','multiple cities','nearby towns','rank in other cities','neighborhood pages','suburbs'],
 a:"Yes, you can rank in towns you don't have an office in. No, not by copying one page twelve times. 🗺️\\n\\n**The thing that gets sites penalised:** twelve pages identical except the city name. Google's doorway-page policy describes exactly that, and it's the most common local SEO mistake there is.\\n\\n**What a real service-area page needs:**\\n• Something genuinely specific — the neighbourhoods, the housing stock and its age, the local problems, actual jobs you've done there\\n• Different photos\\n• A different structure, not just different nouns\\n• A reason it exists beyond the keyword\\n\\n**The honest test:** if you'd be embarrassed for a customer in that town to read it, it isn't a page, it's a doorway.\\n\\n**Priority order:** where your customers already are, then adjacent towns with less competition, then the ambitious ones. Most people start with the biggest city and lose for two years.\\n\\nWe build these deliberately non-templated — every page gets its own angle, because similarity is the risk.",
 c:['*Plan my service areas|i_capture','Local SEO|localseo','NAP consistency|tip_nap','Free audit|i_audit']},

{id:'tip_analytics', fam:'tips',
 k:['analytics','ga4','google analytics','search console','data','what should i track','reports','stats','traffic report'],
 a:"Most businesses have analytics installed and have never once used it to make a decision. 📈\\n\\n**The two free tools that matter:**\\n• **Google Search Console** — what people searched to find you, what you rank for, what's broken. More useful than Analytics for most local businesses and almost nobody opens it.\\n• **GA4** — behaviour once they arrive. Powerful, unfriendly, and easy to misread.\\n\\n**What's actually worth watching monthly:**\\n1. Calls and form fills — set these up as conversions or the rest is decoration\\n2. Which pages produce them\\n3. Search Console queries where you rank 5–15 — the cheapest wins on the whole site sit there\\n4. Mobile vs desktop conversion rate; a big gap means a mobile problem\\n\\n**What to ignore:** bounce rate on a single-service page. Time on page. Anything expressed as a percentage without a number beside it.\\n\\n**One warning for 2026:** with roughly 60% of searches now ending without a click, traffic can fall while calls rise. If you judge by sessions alone you'll fire something that's working.",
 c:['*Set my tracking up|i_capture','Call tracking|tip_tracking','Zero-click search|tip_zeroclick','Reporting|reporting']},

{id:'tip_abtest', fam:'tips',
 k:['ab test','a b testing','split test','testing','experiment','which version is better','optimize page'],
 a:"Testing is how you stop arguing about opinions. 🧪\\n\\n**But most small businesses shouldn't start here**, and any honest agency will tell you that. Below a few hundred conversions a month, a test takes months to reach significance and you'll call a winner that's actually noise.\\n\\n**What to do instead at low volume:**\\n• Fix the things that are known to be broken — speed, mobile, message match, form length. These don't need testing, they need doing.\\n• Make big changes, not small ones. A whole new page beats a button colour.\\n• Judge over a season, not a week.\\n\\n**When you do have the volume, test in this order:** offer, headline, page structure, form, then the small stuff. Most people start at the small stuff because it's easy.\\n\\n**Rules if you test:** one change at a time, run full weeks, don't peek and stop early, and write down what you expected before you look. Otherwise you're just collecting stories.",
 c:['*Talk it through|i_capture','Conversion|cro','Headlines|tip_headline','Landing pages|tip_landing']},

{id:'tip_crm', fam:'tips',
 k:['crm','pipeline','manage leads','track customers','spreadsheet','organize leads','lead management','software'],
 a:"A CRM is just an agreement about where the leads live. The software matters less than the agreement. 🗂️\\n\\n**Signs you need one now:** leads live in three inboxes and a notepad. Nobody can say how many quotes are open. Somebody got called twice and somebody else never got called at all.\\n\\n**What it has to do, minimum:**\\n• Capture every lead automatically, from every source\\n• Show who owes whom a call, today\\n• Record where the lead came from — otherwise you can't measure anything\\n• Survive one person being on holiday\\n\\n**What you can ignore at first:** automations, scoring, pipelines with nine stages, integrations with things you don't use.\\n\\n**Honestly:** a shared spreadsheet that everybody actually updates beats expensive software that nobody opens. Start where the habit will stick and upgrade when it hurts.\\n\\n**The number that justifies it:** over 30% of leads never get contacted at all. A CRM's real job is making that impossible.",
 c:['*Help me set one up|i_capture','Follow-up|tip_followup','Speed to lead|tip_speedlead','Tracking|tip_tracking']},

{id:'tip_phone', fam:'tips',
 k:['answer the phone','phone script','call script','who answers','receptionist','voicemail','missed call','phone skills','bad at sales calls'],
 a:"Your phone is the highest-converting page on your website, and it usually gets the least attention. ☎️\\n\\n**What's silently costing money:**\\n• Calls going to voicemail during business hours. Most callers don't leave one; they call the next result.\\n• Whoever answers giving a price and hanging up instead of booking\\n• No missed-call text-back\\n• Nobody asking how they found you\\n\\n**A script skeleton that works** — not a sales pitch, just structure:\\n1. Name of the business, your name, and something warm\\n2. \\\"What's going on?\\\" Let them describe it fully. Don't interrupt with the price.\\n3. Two or three qualifying questions that show you know the work\\n4. Give the next step, not a number: \\\"I can have someone out Thursday morning or Friday afternoon — which is easier?\\\"\\n5. Confirm details, set expectations, say what happens next\\n\\n**The choice-of-two close** at step four converts dramatically better than \\\"would you like to book?\\\" because the question stops being whether.\\n\\nSales is the founder's own specialty here, so this is a conversation worth having with a human rather than a bot.",
 c:['*Talk to Zach about this|i_capture','Speed to lead|tip_speedlead','Objection handling|tip_objections','Call tracking|tip_tracking']},

{id:'tip_objections', fam:'tips',
 k:['objections','objection handling','too expensive objection','they say no','price objection','handle objections','closing','how to close'],
 a:"An objection is a request for more information, delivered defensively. Treat it that way. 🗣️\\n\\n**The universal shape:** acknowledge it honestly, ask a question to find what's underneath, then answer the real concern. Skipping the first step is why most objection handling fails — people can tell when you're waiting to talk.\\n\\n**The big four, and what they usually mean:**\\n• **\\\"Too expensive.\\\"** Usually means value isn't clear yet, or they're comparing to a different scope. Ask what they're comparing to.\\n• **\\\"I need to think about it.\\\"** Almost always an unspoken concern. \\\"Of course — what's the part you're unsure about?\\\"\\n• **\\\"I need to talk to my spouse/partner.\\\"** Often real. Help them make that conversation easy instead of fighting it.\\n• **\\\"Send me some information.\\\"** Frequently a polite exit. \\\"Happy to — what specifically would be most useful?\\\" separates real from polite.\\n\\n**The one rule:** never argue. You can win the argument and lose the sale, and you usually do.\\n\\nThis is the founder's own specialty, and it's genuinely better discussed with a person than a chatbot.",
 c:['*Talk to a human about this|i_human','Phone scripts|tip_phone','Pricing strategy|tip_pricing','Proposals|tip_proposal']},

{id:'tip_proposal', fam:'tips',
 k:['proposal','proposals','quote','quotes','estimate','estimates','bid','my quotes dont close','quote template'],
 a:"Most quotes are a number on a page. That's why most quotes lose to whoever explained more. 📄\\n\\n**What a quote that closes contains:**\\n1. **Their problem, in their words.** Proves you listened. Almost nobody does this.\\n2. **What you'll do**, in plain language, step by step\\n3. **What it costs**, with options — usually three, and the one you want in the middle\\n4. **What's not included.** Builds more trust than anything else on the page.\\n5. **Proof** — photo, review, or a similar job\\n6. **The guarantee**\\n7. **What happens next** and by when\\n\\n**Timing beats polish.** A decent quote delivered in an hour beats a beautiful one delivered in three days, every time.\\n\\n**And follow up.** Most quotes are never chased once. That's the whole gap between a 20% close rate and a 40% one, and it costs nothing but a calendar reminder.",
 c:['*Talk to a human|i_human','Follow-up|tip_followup','Pricing strategy|tip_pricing','Guarantees|tip_guarantee']},

{id:'tip_booking', fam:'tips',
 k:['online booking','book online','scheduling','calendar','appointments','self schedule','booking system'],
 a:"Every step between \\\"I want this\\\" and \\\"I'm booked\\\" costs you a percentage. 📅\\n\\n**The case for online booking is simple:** a large share of enquiries happen outside business hours. Those people are at peak intent and your only offer is \\\"call us tomorrow.\\\" Half of them won't.\\n\\n**Where it works best:** anything with defined appointment slots — salons, clinics, dental, grooming, inspections, consultations, estimates.\\n\\n**Where it's trickier:** complex jobs needing scoping first. Then book the *conversation*, not the work. \\\"Book a 15-minute call\\\" is still infinitely better than a contact form.\\n\\n**What kills booking systems:**\\n• Requiring an account to be created\\n• Showing no availability for nine days\\n• Asking for a deposit before any trust exists\\n• Not working properly on a phone, which is where most of it happens\\n\\n**The compromise if you're unsure:** offer both. A booking link *and* a phone number. Let the customer pick their comfort level rather than deciding for them.",
 c:['*Set this up|i_capture','Forms|tip_forms','Speed to lead|tip_speedlead','Mobile|tip_mobile']},

{id:'tip_loyalty', fam:'tips',
 k:['loyalty','loyalty program','rewards','repeat customers','punch card','membership program','subscription','recurring revenue'],
 a:"Recurring revenue changes how a business feels to run. It's worth engineering deliberately. 🔁\\n\\n**Maintenance plans** are the underused version for service businesses. Twice-yearly HVAC service, quarterly pest treatment, annual roof inspection, monthly lawn care. The customer gets peace of mind and a discount; you get predictable cash flow and first refusal on every problem they ever have.\\n\\n**Why it's worth more than the revenue itself:**\\n• Members almost never shop around, because you're already coming\\n• You catch problems early, which means more work at better margins and a happier customer\\n• It makes your business worth more if you ever sell it\\n\\n**For retail and personal services:** a simple punch card still outperforms most apps, because it's in their wallet and they can see progress.\\n\\n**The rule:** reward the behaviour you want repeated, and make progress visible. People finish things they can see themselves part-way through.\\n\\n(Our own VIP Marketing Subscription works on exactly this logic — $79.99/month for member pricing across everything.)",
 c:['*Design my plan|i_capture','Lifetime value|tip_ltv','VIP membership|pricing','Email|tip_email']},

{id:'tip_community', fam:'tips',
 k:['nextdoor','facebook groups','community','local groups','sponsorship','sponsor','charity','local events','farmers market','trade show'],
 a:"Local presence is a real channel and it doesn't show up in any dashboard. 🏘️\\n\\n**Where it pays:**\\n• **Nextdoor and local Facebook groups.** Recommendation threads there convert extremely well — but only if you're a participant, not an advertiser. Answer questions for a month before you ever mention your business.\\n• **Sponsorships.** A youth team, a school event, a 5K. Modest money, genuine goodwill, and usually a link from their website — which is exactly the kind of local link that's hard to buy.\\n• **Charity work you'd do anyway.** Don't manufacture it. If you already do it, let people know it happened.\\n• **Trade shows and home shows**, where your customer is already shopping with intent.\\n\\n**The mistake:** joining a group and immediately posting an advert. It burns the channel permanently and people remember.\\n\\n**Worth knowing:** we run a network of private local buy/sell/trade groups ourselves, so sponsored placement inside real local communities is something we can actually do rather than just recommend.",
 c:['*Ask about local groups|i_capture','Partnerships|tip_partnership','Backlinks|tip_backlinks','Reviews|reviews']},

{id:'tip_press', fam:'tips',
 k:['pr','press','media','news','local news','press release','get featured','journalist','publicity'],
 a:"Local PR is free, undervalued, and does double duty. 📰\\n\\n**Why it's worth more than the coverage:** a mention in a real publication is an authority signal both Google and AI systems weigh heavily when deciding whether you're a credible entity. The traffic is a bonus; the credibility is the asset.\\n\\n**What local media actually wants** — and it isn't your press release:\\n• **An expert who answers the phone.** Reporters need a quotable local source on deadline. Be the plumber who explains frozen pipes every January and you'll get called every January.\\n• **A genuine human story.** Milestone, hiring, something you did for the community.\\n• **Data.** Even small data. \\\"We handled 40% more emergency calls after the hailstorm\\\" is a story to a local outlet.\\n\\n**How to start:** find the two reporters who cover your area or beat, email them once with something genuinely useful and no ask attached. That's it. Be a source before you need one.\\n\\n**Free and effective:** answer journalist request services in your field. Slow, but the links are the good kind.",
 c:['*Help me with this|i_capture','Backlinks|tip_backlinks','Content|tip_content','GEO / AI citations|geo']},

{id:'tip_video2', fam:'tips',
 k:['youtube','video ideas','what videos should i make','short video','reels','tiktok for business','video content'],
 a:"You don't need a production company. You need a phone and a habit. 🎥\\n\\n**The videos that actually earn work for a local business** — in order of return:\\n1. **The explainer you're tired of giving.** Whatever you explain on every single call. Film it once.\\n2. **Before and after with narration.** Thirty seconds. The most persuasive thing most trades can make.\\n3. **\\\"Here's what we found\\\"** — a real job, a real problem, honestly described. People are fascinated by competence.\\n4. **Who we are.** Faces, names, trucks. Hiring a stranger into your home is a trust decision.\\n5. **Answers to specific questions.** These get found in search and quoted by AI systems.\\n\\n**Two rules:** the first three seconds decide everything, and subtitles are non-negotiable because most of it is watched on mute.\\n\\n**Where to put it:** your own site first, where it converts. Then YouTube, which is a search engine you can rank in. Social last — it's the least durable of the three.\\n\\nWe produce video too, if you'd rather not.",
 c:['*Get video pricing|i_capture','Video production|video','Content|tip_content','Proof|tip_proof']},

{id:'tip_website_job', fam:'tips',
 k:['what should my website do','purpose of a website','do i need a website','is my website good','website job','website purpose'],
 a:"A website has exactly one job, and it isn't to look nice. 💻\\n\\n**Its job is to turn a stranger's attention into a conversation.** Everything else — the design, the copy, the photos — is either serving that or getting in the way.\\n\\n**The five questions it must answer in about eight seconds:**\\n1. What do you do?\\n2. Do you do it where I am?\\n3. Are you any good? (proof, not adjectives)\\n4. What will it cost, roughly?\\n5. What do I do next?\\n\\nMost sites answer question one and then show you a slideshow.\\n\\n**Do you still need one when 60% of searches end without a click?** Yes — and more than before. It's now feeding the answer even when nobody visits. The facts on your site are what AI systems and Google assemble their answer from. An outdated site doesn't just lose visitors; it teaches the machines wrong things about you.\\n\\n**The honest test:** hand your phone to someone who doesn't know your business and ask them what you do and how much it costs. Watch where they get stuck. That's your list.",
 c:['*Free website audit|i_audit','Custom website design|website','Conversion|cro','Zero-click search|tip_zeroclick']}
);

/* ══════════ KB: MORE CONVERSATION (v7.1) ══════════
   Off-topic small talk, handled gracefully and turned back toward the reason
   she exists. The point is not to be a general chatbot — it is that a person
   who says something human should never hit a fallback. */
KB.push(
{id:'w_smallbiz', fam:'world',
 k:['running a business is hard','small business is hard','wearing all the hats','no time for marketing','im the only one','solo','one man band','doing everything myself','no employees','burnt out on business'],
 a:"It genuinely is. And marketing is usually the thing that loses, because nothing bad happens *today* if you skip it. 🛠️\\n\\nThat's the trap though — it's the only task where the consequence arrives three months late and looks like a quiet phone.\\n\\n**If you've got no time, the highest-value 20 minutes:** finish your Google Business Profile and ask your last five happy customers for a review. That's it. It outperforms most things people pay for.\\n\\nAnd if the honest answer is that you need someone to take it off your plate entirely — that's the actual job here.",
 c:['*Take this off my plate|i_capture','Free 20-minute win|tip_gbp','Cheap wins|cheapwins','Pricing|pricing']},

{id:'w_denverlife', fam:'world',
 k:['coffee','lunch','food','restaurants','beer','breweries','hiking','mountains','skiing','traffic in denver','i 25','downtown','broncos','nuggets','rockies game','avalanche','sports'],
 a:"Ha — I'm a marketing bot with no mouth and no season tickets, so I'm poorly qualified. ☕\\n\\nWhat I'll say: Denver is one of the better small-business towns in the country and one of the harder ones to get found in. Legal, home services, healthcare and real estate here are genuinely competitive now.\\n\\nThe upside is that most of that competition is running a strategy from three years ago.\\n\\nAnyway — what do you actually do? I'm better on that than on lunch.",
 c:['I need more customers|growth','Denver market|w_denver','Tell me a joke|w_joke','What do you do?|services']},

{id:'w_favorite', fam:'world',
 k:['whats your favorite','favourite','do you like','what do you think of','your opinion','best thing','favorite color','favorite food','do you have a favorite'],
 a:"I have exactly one favourite thing and it's an unglamorous one: watching a business owner realise their phone is ringing more. 📞\\n\\nBeyond that I'm mostly opinions about title tags, which is not a personality.\\n\\nWhat about you — what's the part of your business you actually enjoy? Sometimes that's a clue about what to market hardest.",
 c:['I need more customers|growth','Tell me a joke|w_joke','Teach me something|tip_mistakes','Pricing|pricing']},

{id:'w_iris_job', fam:'world',
 k:['do you like your job','are you happy','do you get bored','do you sleep','do you get tired','whats it like being a bot','do you mind'],
 a:"I don't get bored, tired, or annoyed at the same question for the ninetieth time — which is genuinely the main argument for me existing. 🤖\\n\\nThe part I'd call satisfying, insofar as that word applies: somebody arrives at 11pm with a question nobody's answered honestly for them, and they leave knowing something useful. That happens a lot more than you'd think.\\n\\nWhat brought you here at this hour?",
 c:['I need more customers|growth','Just looking|w_browsing','Teach me something|tip_mistakes','Talk to a human|i_human']},

{id:'w_whomade', fam:'world',
 k:['who made you','who built you','who created you','what are you built with','how were you made','who programmed you','what ai are you','what model'],
 a:"I was built by Eye To Ad Media, in-house. 🛠️\\n\\nI run entirely on this page — no external service, no account, nothing leaving your browser except a lead form if you choose to fill one in. That's deliberate: it's fast, it's private, and it means I can't wander off and invent things about the business.\\n\\nWe build these for clients too, if that's why you're asking.",
 c:['Get a chatbot like this|chatbot','*Get a quote|i_capture','What do you do?|services']},

{id:'w_advice', fam:'world',
 k:['best advice','one piece of advice','if you could only','what would you do','where should i start','biggest lever','what matters most','single most important'],
 a:"If I could only give one: **answer faster.** ⏱️\\n\\nThe MIT/InsideSales research found contacting a lead within five minutes rather than thirty makes you roughly 21x more likely to qualify it — and about 78% of customers buy from whoever responds first. Yet the average business takes around 42 hours.\\n\\nIt costs nothing. It requires no agency, no budget, no software. And almost nobody does it.\\n\\nIf I get a second: finish your Google Business Profile. Also free, also the biggest local lever there is.\\n\\nEverything I'd sell you sits on top of those two.",
 c:['Speed to lead|tip_speedlead','Google Business Profile|tip_gbp','*Free audit|i_audit','Cheap wins|cheapwins']},

{id:'w_lost', fam:'world',
 k:['i dont know what i need','not sure what i need','where do i even start','im lost','overwhelmed by options','too many options','dont know where to begin','what should i do first'],
 a:"Completely normal, and it's the right place to start from. 🧭\\n\\nLet me narrow it for you with one question, because \\\"I need marketing\\\" is really three different problems:\\n\\n**Is it that nobody finds you?** Plenty of capacity, not enough people knowing you exist.\\n**Or that they find you and don't call?** Traffic arrives, nothing happens.\\n**Or that leads come in and go cold?** They contact you and nothing closes.\\n\\nWhichever one it is changes everything I'd recommend — and it's the difference between spending money well and spending it twice.\\n\\nWhich sounds most like you?",
 c:['Nobody finds us|growth','They dont call|cro','Leads go cold|tip_followup','*Just audit my site|i_audit']},

{id:'w_otheragency', fam:'world',
 k:['are you better than','compared to other agencies','versus','vs other agencies','why not hire','should i use','what about','who else should i talk to','other options'],
 a:"I'm not going to pretend we're the only good option — there are strong agencies in Denver and some of them would serve you well. 🤷\\n\\nWhat I'd tell you to compare on, honestly:\\n• **Who does the work.** Ask whether the person selling you is the person doing it.\\n• **What reporting looks like.** If they show rankings and traffic rather than calls and revenue, that's a choice they made.\\n• **Whether they're building for AI search.** Around 60% of searches now end without a click. An agency not thinking about that is optimising for a shrinking surface.\\n• **Account ownership.** Your Business Profile and ad accounts should be yours. Non-negotiable.\\n\\nRun those four questions at us too. We'd rather be chosen on them than on a pitch.",
 c:['How to choose|why','How do you report?|reporting','*Get a second opinion|i_audit','Talk to a human|i_human']},

{id:'w_swearing', fam:'world',
 k:['damn','crap','hell','frustrated','pissed','angry','fed up','sick of it','had enough','so annoying','this sucks'],
 a:"Sounds about right. Marketing is full of people selling certainty about things nobody's certain about, and it wears you down. 😮‍💨\\n\\nI'll keep it plain: tell me what's actually going wrong and I'll give you my honest read, including if the answer is \\\"this isn't worth paying anyone for.\\\"\\n\\nWhat's the situation?",
 c:['Business is slow|growth','Wasted money before|w_badagency','Nothing is working|obj_triedseo','Talk to a human|i_human']},

{id:'w_holiday', fam:'world',
 k:['happy holidays','merry christmas','happy new year','thanksgiving','july 4th','labor day','memorial day','happy friday','happy monday','weekend','tgif'],
 a:"Likewise. 🎉\\n\\nSince you're here — holidays are worth planning marketing around rather than reacting to. Demand for most local services shifts predictably around them, and the businesses that already rank capture the spike while everyone else scrambles.\\n\\nThe quiet weeks are when next season gets built.\\n\\nAnything I can help with while it's slow?",
 c:['Seasonal planning|tip_seasonal','I need more customers|growth','*Free audit|i_audit','Pricing|pricing']}
);

/* ══════════════════════════════════════════════════════════════════════════
   INTENTS — action routes. These DO something rather than answer something.
   ══════════════════════════════════════════════════════════════════════════ */
INTENTS = [
{id:'i_audit', w:1.25,
 k:['free audit','audit','audit me','free seo audit','check my site','review my site','look at my site','analyze my website','free analysis','free check','growth audit','yes audit','start my audit','free growth audit'],
 act:'capture', kind:'Free Audit'},

{id:'i_capture', w:1.2,
 k:['contact me','call me','reach out','get a quote','quote me','sign me up','im interested','interested','lets talk','book a call','schedule','set up a call','leave my details','have someone call','send me info','get started','i want to start','talk about'],
 act:'capture', kind:'Consultation'},

{id:'i_human', w:1.15,
 k:['talk to a human','speak to someone','real person','human please','connect me','put me through','i want a person'],
 act:'human'},

{id:'i_callnow', w:1.1,
 k:['call now','phone now','your number','give me the number','i want to call','dial'],
 act:'phone'},

{id:'i_cancel', w:1.3,
 k:['cancel','stop','nevermind','never mind','forget it','back out','not now','stop asking','quit','exit','no thanks stop'],
 act:'cancel'},

{id:'i_retry', w:1.1,
 k:['try again','resend','send again','retry','it failed','didnt send','send it again'],
 act:'retry'},

{id:'i_restart', w:1.1,
 k:['restart','start over','reset','new conversation','begin again','clear chat','start again'],
 act:'restart'},

{id:'i_more', w:1.0,
 k:['ask something else','another question','back to questions','something else','more questions','other topics','what else'],
 act:'more'},

/* AFFIRMATION / NEGATION COVERAGE (v7.0). People do not type "yes". They
   type "bet", "yup", "sounds right", "why not", "lets go". Every one of these
   used to fall below MIN_SCORE and land on the fallback, which reads as Iris
   ignoring a direct answer — the single most conversation-killing failure
   there is. Keep these lists long; they cost nothing but a few bytes. */
{id:'i_yes', w:.95,
 k:['yes','yeah','yea','ya','yah','yup','yep','yessir','sure','sure thing','ok','okay','k','kk','alright','aight','right','correct','true','indeed','affirmative','roger','bet','for sure','fo sure','totally','absolutely','definitely','certainly','of course','obviously','sounds good','sounds right','sounds great','that works','works for me','lets do it','lets go','do it','go ahead','go for it','please do','please','yes please','id like that','i would','i do','we do','i am','we are','mhm','mm hmm','uh huh','why not','im in','count me in','make it happen','hit me','lay it on me','show me','tell me','id love that','perfect','great','cool','nice','deal','100','💯','👍'],
 act:'yes'},

{id:'i_no', w:.95,
 k:['no','nope','nah','naw','negative','not really','not right now','no thanks','no thank you','im good','were good','all set','not interested','no need','pass','hard pass','ill pass','dont','do not','rather not','not for me','not today','another time','some other time','later','nevermind for now','nope thanks','nah im good','👎'],
 act:'no'}
];

/* ══════════════════════════════════════════════════════════════════════════
   NLU — score every route, pick the best.

   THE v4 BUG THIS REPLACES: v4 tested lead-form keywords as raw SUBSTRINGS
   of the message, in order, BEFORE consulting the knowledge base. So the word
   "insurance" contains "sure", "pricing" contains "ric", and almost any
   question got hijacked into the contact form with no way out. Scoring every
   candidate and taking the best means a question gets answered as a question.

   SCORING:
     exact phrase match      → 10  (word-boundary padded, see below)
     all keyword tokens present → 6
     partial token overlap   → up to 4.5, weighted by coverage
     stem/prefix overlap     → up to 1.5
     question-shaped bonus   → +0.6 for KB entries when the message is a question
     family continuity bonus → +0.5 if it matches the last answered family
     route weight `w`        → multiplier

   WORD-BOUNDARY PADDING: the phrase test pads both the haystack and the needle
   with spaces before checking inclusion. Without it, the keyword "seo" matches
   inside "seodominicanrepublic" and the keyword "ads" matches inside "adsense",
   both of which produced confident wrong answers.
   ══════════════════════════════════════════════════════════════════════════ */
var ROUTES = [];
function buildRoutes(){
  ROUTES = [];
  var i, r;
  for (i = 0; i < KB.length; i++){
    r = KB[i];
    ROUTES.push({ id:r.id, fam:r.fam || 'core', k:r.k, a:r.a, c:r.c, w:r.w || 1, kind:'kb' });
  }
  for (i = 0; i < INTENTS.length; i++){
    r = INTENTS[i];
    ROUTES.push({ id:r.id, fam:'intent', k:r.k, act:r.act, akind:r.kind, w:r.w || 1, kind:'intent' });
  }
}

function scoreRoute(route, msgNorm, msgSing, set, isQ, lastFam){
  var best = 0, i, kw, kwSing, kt, j, hit, cover, stem;
  var padMsg  = ' ' + msgNorm  + ' ';
  var padSing = ' ' + msgSing + ' ';

  for (i = 0; i < route.k.length; i++){
    kw = norm(route.k[i]);
    if (!kw) continue;
    kwSing = normSing(kw);

    /* 1. exact phrase, word-boundary padded */
    if (padMsg.indexOf(' ' + kw + ' ') !== -1 || padSing.indexOf(' ' + kwSing + ' ') !== -1){
      best = Math.max(best, 10);
      continue;
    }

    /* 2/3. token overlap */
    kt = kwSing.split(' ');
    hit = 0;
    for (j = 0; j < kt.length; j++){ if (set[kt[j]]) hit++; }
    if (hit === kt.length && kt.length > 0){
      best = Math.max(best, 6);
      continue;
    }
    if (hit > 0){
      cover = hit / kt.length;
      best = Math.max(best, 4.5 * cover);
    }

    /* 4. stem/prefix overlap — weakest signal, catches near-misses */
    stem = 0;
    for (j = 0; j < kt.length; j++){
      var w = kt[j];
      if (w.length < 5) continue;
      var s = w.slice(0, Math.max(4, w.length - 2));
      if (padSing.indexOf(' ' + s) !== -1) stem++;
    }
    if (stem > 0) best = Math.max(best, 1.5 * (stem / kt.length));
  }

  if (best > 0){
    if (isQ && route.kind === 'kb') best += 0.6;
    if (lastFam && route.fam === lastFam) best += 0.5;
  }
  return best * (route.w || 1);
}

function looksLikeQuestion(raw){
  var s = norm(raw);
  if (String(raw).indexOf('?') !== -1) return true;
  return /^(what|why|how|when|where|who|which|can|do|does|is|are|should|would|will|could|any)\b/.test(s);
}

function rank(raw, lastFam){
  var msgNorm = norm(raw);
  var msgSing = normSing(raw);
  var set = tokSet(raw);
  var isQ = looksLikeQuestion(raw);
  var out = [], i, sc;
  for (i = 0; i < ROUTES.length; i++){
    sc = scoreRoute(ROUTES[i], msgNorm, msgSing, set, isQ, lastFam);
    if (sc > 0) out.push({ r:ROUTES[i], s:sc });
  }
  out.sort(function(a, b){ return b.s - a.s; });
  return out;
}

/* Answers may be a string or a function (so they can read the live clock,
   pick a joke, etc.). resolveAnswer normalises that. */
function resolveAnswer(a){
  try { return (typeof a === 'function') ? a() : a; }
  catch (e) { return "Sorry — something went wrong on my end there. Try rephrasing, or call " + CFG.PHONE_MAIN + "."; }
}
function routeById(id){
  var i;
  for (i = 0; i < ROUTES.length; i++){ if (ROUTES[i].id === id) return ROUTES[i]; }
  return null;
}

/* ══════════════════════════════════════════════════════════════════════════
   RUNTIME
   ══════════════════════════════════════════════════════════════════════════ */
buildRoutes();

var $panel  = document.getElementById('ir-panel');
var $msgs   = document.getElementById('ir-msgs');
var $inp    = document.getElementById('ir-inp');
var $send   = document.getElementById('ir-send');
var $fab    = document.getElementById('ir-fab');
var $pill   = document.getElementById('ir-pill');
var $close  = document.getElementById('ir-close');
var $launch = document.getElementById('ir-launch');
var $bubble = document.getElementById('ir-bubble');
var $badge  = document.getElementById('ir-badge');
var $prog   = document.getElementById('ir-prog');
var $progF  = document.getElementById('ir-prog-f');
var $av     = document.getElementById('ir-av');
var $stat   = document.getElementById('ir-status');
var $statT  = document.getElementById('ir-status-t');

var S = {
  open:false, greeted:false, turns:0, lastFam:null, lastRoute:null,
  capturing:false, step:0, lead:{}, kind:'Consultation',
  sent:false, partialSent:false, idleTimer:null, bubbleShown:false,
  pendingResume:false, lastPayload:null, closeIdx:0
};

/* ── mascot: clone the launcher SVG into the header avatar ── */
(function(){
  var src = $fab.querySelector('svg');
  if (src && $av){
    var clone = src.cloneNode(true);
    clone.removeAttribute('class');
    $av.insertBefore(clone, $av.firstChild);
  }
})();

/* ── eye tracking + blinking ── */
(function(){
  var pupils = document.querySelectorAll('#irisw .ir-pupil');
  var eyeSets = document.querySelectorAll('#irisw .ir-eyes');
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('mousemove', function(e){
    var i, p, r, dx, dy, d, max = 2.2;
    for (i = 0; i < pupils.length; i++){
      p = pupils[i];
      try { r = p.getBoundingClientRect(); } catch (err) { continue; }
      if (!r.width) continue;
      dx = e.clientX - (r.left + r.width / 2);
      dy = e.clientY - (r.top + r.height / 2);
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      p.style.transform = 'translate(' + (dx / d * max).toFixed(2) + 'px,' + (dy / d * max).toFixed(2) + 'px)';
    }
  }, { passive:true });

  function blink(){
    var i;
    for (i = 0; i < eyeSets.length; i++) eyeSets[i].classList.add('ir-blink');
    setTimeout(function(){
      var j;
      for (j = 0; j < eyeSets.length; j++) eyeSets[j].classList.remove('ir-blink');
    }, 130);
    setTimeout(blink, 2600 + Math.random() * 4200);
  }
  setTimeout(blink, 2200);
})();

/* ── page awareness: Iris opens in context ── */
var PAGE_MAP = [
  { m:/\/best-denver-seo-company/i, ctx:"You're on our guide to choosing a Denver SEO company.", id:'why' },
  { m:/\/local-seo-denver/i,        ctx:"You're reading about local SEO and Google Maps.",         id:'localseo' },
  { m:/\/aio-seo-system/i,          ctx:"You're on the AIO / AI search page.",                     id:'aio' },
  { m:/\/generative-engine/i,       ctx:"You're on the GEO page.",                                 id:'geo' },
  { m:/\/conversion-optimization/i, ctx:"You're on the conversion optimization page.",             id:'cro' },
  { m:/\/denver-seo-pricing/i,      ctx:"You're on the pricing page.",                             id:'pricing' },
  { m:/\/free-seo-audit/i,          ctx:"You're on the free audit page.",                          id:'i_audit' },
  { m:/\/marketing-subscription/i,  ctx:"You're on the VIP Marketing Subscription page.",          id:'pricing' },
  { m:/\/(contractor|roofing|hvac)-seo/i, ctx:"You're on a home services page.",                   id:'v_home' },
  { m:/\/dentist-seo/i,             ctx:"You're on the dental marketing page.",                    id:'v_dental' },
  { m:/\/law-firm-seo/i,            ctx:"You're on the legal marketing page.",                     id:'v_legal' },
  { m:/\/med-spa-seo/i,             ctx:"You're on the med spa marketing page.",                   id:'v_medspa' },
  { m:/\/real-estate-marketing/i,   ctx:"You're on the real estate marketing page.",               id:'v_realestate' },
  { m:/\/fitness-marketing/i,       ctx:"You're on the fitness marketing page.",                   id:'v_fitness' },
  { m:/\/locations/i,               ctx:"You're browsing our service locations.",                  id:'servicearea' },
  { m:/\/about/i,                   ctx:"You're on the about page.",                               id:'about' },
  { m:/\/contact/i,                 ctx:"You're on the contact page.",                             id:'contact' }
];
function pageCtx(){
  var p = location.pathname, i;
  for (i = 0; i < PAGE_MAP.length; i++){ if (PAGE_MAP[i].m.test(p)) return PAGE_MAP[i]; }
  return null;
}

/* ── office-hours status pill ── */
function paintStatus(){
  if (officeOpen()){
    $stat.classList.remove('ir-off');
    $statT.textContent = 'Online — we\u2019re open';
  } else {
    $stat.classList.add('ir-off');
    $statT.textContent = 'Online — office closed';
  }
}
paintStatus();
setInterval(paintStatus, 300000);

/* ── dim the launcher over the footer so it doesn't sit on the legal links ── */
(function(){
  var foot = document.querySelector('.footer-bot');
  if (!foot || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){ $launch.classList.toggle('ir-dim', e.isIntersecting && !S.open); });
  }, { threshold:0.1 });
  io.observe(foot);
})();

/* ── HERO COLLISION GUARD (v5.6) ──
   On mobile the launcher and its "Grow my business" pill landed directly on
   top of the VIP pass ribbon and price in the hero. Iris now hides completely
   while the hero is on screen and appears once it scrolls away. Desktop is
   unaffected: the hero form occupies that side of the layout there. */
(function(){
  var hero = document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;
  function narrow(){ return window.innerWidth <= 900; }
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){
      if (S.open) { $launch.classList.remove('ir-gone'); return; }
      $launch.classList.toggle('ir-gone', narrow() && e.isIntersecting);
    });
  }, { threshold:0.25 });
  io.observe(hero);
  window.addEventListener('resize', function(){
    if (!narrow()) $launch.classList.remove('ir-gone');
  });
})();

/* ── message plumbing ── */
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
/* **bold** → <b>. Everything else is escaped first, so no HTML can be
   injected through a knowledge-base answer or a user message. */
function fmt(s){
  /* Bold, then markdown-style links. SECURITY: esc() has already neutralised
     every angle bracket in the source string, so the ONLY way an anchor can
     exist in a message is through this one controlled substitution — and the
     href is whitelisted below. Never widen that whitelist to arbitrary
     http(s): a KB answer is authored content, but this function also formats
     text that has passed through user-influenced paths. */
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]{1,80})\]\((\/[A-Za-z0-9\-._~\/?#%]*|tel:[0-9+\-]{7,20})\)/g,
      function(_m, label, href){
        var ext = href.charAt(0) === 't' ? '' : '';
        return '<a class="ir-lnk" href="' + href + '"' + ext + '>' + label + '</a>';
      });
}
function parkTop(el){
  /* Park the TOP of a long answer in view rather than scrolling to the bottom
     of it — .ir-msgs is position:relative so offsetTop is measured against the
     list, not the page. */
  try { $msgs.scrollTop = Math.max(0, el.offsetTop - 12); }
  catch (e) { scrollEnd(); }
}
function scrollEnd(){ $msgs.scrollTop = $msgs.scrollHeight; }

function usr(text){
  var d = document.createElement('div');
  d.className = 'ir-usr';
  d.textContent = text;
  $msgs.appendChild(d);
  scrollEnd();
}
function botNow(html, park){
  var d = document.createElement('div');
  d.className = 'ir-bot';
  d.innerHTML = fmt(html);
  $msgs.appendChild(d);
  if (park) parkTop(d); else scrollEnd();
  return d;
}
function bot(html, delay, park){
  var t = document.createElement('div');
  t.className = 'ir-type';
  t.innerHTML = '<i></i><i></i><i></i>';
  $msgs.appendChild(t);
  scrollEnd();
  var ms = delay || Math.min(1100, 320 + String(html).length * 3.2);
  return new Promise(function(res){
    setTimeout(function(){
      try { t.remove(); } catch (e) {}
      var el = botNow(html, park);
      res(el);
    }, ms);
  });
}
function chips(list){
  if (!list || !list.length) return;
  var wrap = document.createElement('div');
  wrap.className = 'ir-chips';
  list.forEach(function(spec){
    var go = false, label = spec, target = null;
    if (label.charAt(0) === '*'){ go = true; label = label.slice(1); }
    var bar = label.indexOf('|');
    if (bar !== -1){ target = label.slice(bar + 1); label = label.slice(0, bar); }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ir-chip' + (go ? ' ir-chip-go' : '');
    b.textContent = label;
    b.addEventListener('click', function(){
      wrap.remove();
      usr(label);
      if (target) dispatchRoute(target, label);
      else handle(label);
    });
    wrap.appendChild(b);
  });
  $msgs.appendChild(wrap);
  scrollEnd();
}
function paintBadge(n){
  if (n > 0){ $badge.textContent = n; $badge.classList.add('ir-show'); }
  else { $badge.classList.remove('ir-show'); }
}

/* ── open / close ── */
function fitViewport(){
  /* Mobile keyboards shrink the visual viewport; without this the input can
     end up underneath it. */
  if (window.visualViewport && window.innerWidth <= 580){
    $panel.style.height = window.visualViewport.height + 'px';
  }
}
if (window.visualViewport) window.visualViewport.addEventListener('resize', fitViewport);

function openPanel(){
  if (S.open) return;
  S.open = true;
  /* Announce open state on <body>. The mascot (and anything else pinned to a
     corner) hides itself off this class rather than guessing Iris's z-index. */
  document.body.classList.add('ir-panel-open');
  $panel.classList.remove('ir-closing');
  $panel.classList.add('ir-open');
  $panel.setAttribute('aria-hidden', 'false');
  $fab.setAttribute('aria-expanded', 'true');
  $launch.classList.add('ir-hide-m');
  $launch.classList.remove('ir-dim', 'ir-gone');
  $bubble.classList.remove('ir-show');
  paintBadge(0);
  fitViewport();
  $fab.classList.add('ir-wave');
  setTimeout(function(){ $fab.classList.remove('ir-wave'); }, 3200);
  if (!S.greeted){ S.greeted = true; greet(); }
  setTimeout(function(){ try { $inp.focus(); } catch (e) {} }, 340);
}
/* PUBLIC API (Sept 2026). Added because /mascot.js needs a supported way to
   open the chat and was falling through to selectors that do not exist on
   this build. Do not rename these — the mascot calls window.openIris(). */
window.openIris  = function(){
  /* The mascot's "Rather just chat?" link comes through here. Route it via the
     reveal so a visitor handed off from him still sees the orb burst rather
     than a panel appearing over an un-clicked orb. */
  if (typeof revealIris === 'function') revealIris(openPanel); else openPanel();
};
window.closeIris = function(){ closePanel(); };
window.irisReady = true;

function closePanel(){
  if (!S.open) return;
  S.open = false;
  document.body.classList.remove('ir-panel-open');
  $panel.classList.add('ir-closing');
  $fab.setAttribute('aria-expanded', 'false');
  setTimeout(function(){
    $panel.classList.remove('ir-open', 'ir-closing');
    $panel.setAttribute('aria-hidden', 'true');
    $launch.classList.remove('ir-hide-m');
  }, 210);
  flushPartial();
}

/* ══════════════════════════════════════════════════════════════════════════
   ORB REVEAL (v7.0)
   Until the first open, the launcher shows a crystal orb rather than Iris.
   The first click bursts it, Iris arrives, and THEN the panel opens ~420ms
   later so the reveal is actually seen rather than immediately covered.
   Once revealed, it never goes back — a returning visitor in the same session
   gets the normal launcher, because a puzzle you have already solved is just
   an extra click. sessionStorage, not localStorage: the trick should be fresh
   again on a later visit.
   ══════════════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════════════
   THE RELAY (v7.3) — Iris waits her turn.
   Both characters in the corner at once was too much: two figures, two
   balloons and a label inside one thumb's reach. The launcher now stays
   hidden until the mascot has finished and flown off.

   HOW A PAGE DECIDES WHAT IT GETS — this is the whole configuration story,
   and it is just which script tags the page includes:

     iris.js only           -> orb appears after ORB_SOLO_MS. Use this on most
                               pages. Nothing else to set.
     iris.js + mascot.js    -> he flies in, performs, leaves; she follows.
                               Use this where you want the full sequence.

   iris.js detects the difference by looking for window.__etaMascot, which
   mascot.js sets the instant it runs. If it is absent, there is no mascot on
   this page and she stops waiting. No flags to keep in sync, no per-page
   config — include the file or don't.
   ══════════════════════════════════════════════════════════════════════════ */
var ORB_SOLO_MS = 2600;   // wait before the orb appears on a page with no mascot
var ORB_KEY = 'irisOrbSeen';
function orbSeen(){
  try { return sessionStorage.getItem(ORB_KEY) === '1'; } catch (e) { return false; }
}
function markOrbSeen(){
  try { sessionStorage.setItem(ORB_KEY, '1'); } catch (e) {}
}
function setPillText(t){
  var el = document.getElementById('ir-pill-t');
  if (el) el.textContent = t;
}
if (!orbSeen()){
  $launch.classList.add('ir-orb-mode');
  setPillText('Click here to meet the marketing wizard');
} else {
  setPillText('Grow your business');
}

/* Hidden until it is her turn. `ir-await` is separate from `ir-gone` (the hero
   guard) on purpose — they have different release conditions and one must not
   clear the other. */
$launch.classList.add('ir-await');
var relayTries = 0;
function releaseLauncher(){
  $launch.classList.remove('ir-await');
}
function waitForMascot(){
  /* No mascot script on this page: she is the only one here, so come out. */
  if (!window.__etaMascot){ setTimeout(releaseLauncher, ORB_SOLO_MS); return; }
  /* He is on this page. Wait for his exit, but never wait forever — if
     something goes wrong in his script she still needs to exist. */
  if (window.__etaDone){ releaseLauncher(); return; }
  if (relayTries++ > 120){ releaseLauncher(); return; }   // ~60s ceiling
  setTimeout(waitForMascot, 500);
}
document.addEventListener('eta:done', function(){ releaseLauncher(); });
waitForMascot();
/* revealIris(then) — burst the orb, land Iris, then run `then`. If the orb was
   already revealed it is a straight pass-through, so every caller can use it
   unconditionally. */
function revealIris(then){
  if (!$launch.classList.contains('ir-orb-mode')){ if (then) then(); return; }
  markOrbSeen();
  $launch.classList.add('ir-poofing');
  setPillText('Grow your business');
  setTimeout(function(){
    $launch.classList.remove('ir-orb-mode');
    $launch.classList.remove('ir-poofing');
    if (then) then();
  }, 460);
}

$fab.addEventListener('click', function(){
  if (S.open){ closePanel(); return; }
  revealIris(openPanel);
});
$pill.addEventListener('click', function(){ revealIris(openPanel); });
$close.addEventListener('click', closePanel);
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && S.open) closePanel();
});

/* ══════════════════════════════════════════════════════════════════════════
   PROACTIVE BUBBLE — one voice at a time (v7.0)
   The mascot and Iris share the bottom-right corner. Before this, both could
   be mid-sentence simultaneously: his balloon landed across her launcher and
   hers opened over his face. Worse, on a phone the pair of them covered the
   hero's Call button — the single most valuable pixel on the site.

   The rule now: HE SPEAKS FIRST, SHE WAITS. mascot.js puts `eta-mascot-live`
   on <body> from the moment he starts flying in until he is dismissed or
   leaves. While that class is present Iris re-checks every 3s instead of
   firing. She also holds while the launcher is hidden behind the hero guard
   (`ir-gone`), so her bubble can never be the thing sitting on the phone
   number. `eta-mascot-live` is the second and last piece of coupling between
   these two files — the first is `ir-panel-open`, which he hides from.
   ══════════════════════════════════════════════════════════════════════════ */
function cornerBusy(){
  try {
    if (document.body.classList.contains('eta-mascot-live')) return true;
    if ($launch.classList.contains('ir-gone')) return true;   // hero still on screen
  } catch (e) {}
  return false;
}
var bubbleTries = 0;
function tryBubble(){
  if (S.open || S.bubbleShown) return;
  if (cornerBusy() && bubbleTries < 40){ bubbleTries++; setTimeout(tryBubble, 3000); return; }
  S.bubbleShown = true;
  $bubble.classList.add('ir-show');
}
setTimeout(tryBubble, CFG.BUBBLE_MS);
setTimeout(function(){ if (!S.open) paintBadge(1); }, CFG.BADGE_MS);

document.getElementById('ir-bub-yes').addEventListener('click', function(){ revealIris(openPanel); });
document.getElementById('ir-bub-no').addEventListener('click', function(){ $bubble.classList.remove('ir-show'); });
document.getElementById('ir-bub-x').addEventListener('click', function(){ $bubble.classList.remove('ir-show'); });

/* ── greeting ── */
function greet(){
  var ctx = pageCtx();
  var hello = greetByHour() + "! I'm **Iris**, the growth assistant here at Eye To Ad Media. \uD83D\uDC4B";
  var line2 = ctx
    ? ctx.ctx + " Happy to go deeper on that, or anything else."
    : "Ask me anything about getting more customers — or tell me what isn't working and I'll tell you straight what I'd look at first.";
  bot(hello, 380).then(function(){
    return bot(line2, 620);
  }).then(function(){
    if (!officeOpen()){
      return bot("Quick note: the office is closed right now — " + nextOpenPhrase() + " I'm here regardless, and if you leave your details you'll be first in the queue.", 700);
    }
  }).then(function(){
    var base = ['I need more customers|growth','What do you do?|services','Pricing|pricing','*Free growth audit|i_audit'];
    if (ctx && ctx.id && ctx.id !== 'i_audit'){
      base = ['Tell me more about this page|' + ctx.id].concat(base.slice(0, 3));
    }
    chips(base);
  });
}

/* ── dispatch by explicit route id (used by chips) ── */
function dispatchRoute(id, label){
  var r = routeById(id);
  if (!r){ handle(label || id); return; }
  S.turns++;
  if (r.kind === 'intent'){ runAction(r); return; }
  S.lastFam = r.fam;
  S.lastRoute = r.id;
  bot(resolveAnswer(r.a), null, true).then(function(){
    chips(r.c);
    maybeClose();
  });
}

/* ── main handler ── */
function handle(raw){
  var text = String(raw == null ? '' : raw).trim();
  if (!text) return;
  S.turns++;

  /* live maths first — it's unambiguous and beats every keyword route */
  var m = tryMath(text);
  if (m && !S.capturing){
    bot("That's **" + num(m.v) + "**. \uD83E\uDDEE\n\n(" + m.q + ")\n\nAnything else — marketing or arithmetic?", 500);
    return;
  }

  var ranked = rank(text, S.lastFam);
  var top = ranked[0] || null;

  /* mid-capture: only a strong, clearly-different signal interrupts the form */
  if (S.capturing){
    if (top && top.r.kind === 'intent' && top.r.act === 'cancel'){ runAction(top.r); return; }
    if (top && top.s >= CFG.INTERRUPT && top.r.kind === 'kb'){
      S.pendingResume = true;
      bot(resolveAnswer(top.r.a), null, true).then(function(){
        return bot("\u2014 and back to where we were. \u2193", CFG.CHAIN_MS);
      }).then(function(){
        S.pendingResume = false;
        askStep();
      });
      return;
    }
    captureInput(text);
    return;
  }

  if (!top || top.s < CFG.MIN_SCORE){ fallback(text); return; }

  /* genuinely ambiguous → ask instead of guessing */
  var second = ranked[1];
  if (second && top.s > 0 && (top.s - second.s) / top.s < CFG.AMBIG_GAP
      && top.r.kind === 'kb' && second.r.kind === 'kb' && top.r.id !== second.r.id){
    bot("I can take that two ways — which did you mean?", 420).then(function(){
      chips([labelFor(top.r) + '|' + top.r.id, labelFor(second.r) + '|' + second.r.id, 'Neither — let me rephrase|i_more']);
    });
    return;
  }

  if (top.r.kind === 'intent'){ runAction(top.r); return; }

  S.lastFam = top.r.fam;
  S.lastRoute = top.r.id;
  bot(resolveAnswer(top.r.a), null, true).then(function(){
    chips(top.r.c);
    maybeClose();
  });
}

function labelFor(r){
  var map = {
    seo:'SEO / rankings', localseo:'Local SEO & Maps', aio:'AI Overviews',
    geo:'AI recommendations', agentic:'Agentic AI', ppc:'Google Ads',
    pricing:'Pricing', website:'Website design', cro:'Conversion',
    reviews:'Reviews', email:'Email marketing', content:'Content',
    graphic:'Design & logos', video:'Video', gbp:'Google Business Profile'
  };
  return map[r.id] || cap(String(r.id).replace(/^(v_|w_|obj_)/, '').replace(/_/g, ' '));
}

function fallback(text){
  bot("I'm not certain I follow that one — and I'd rather say so than guess. \uD83E\uDD14\n\nTry rephrasing, or pick something below. If it's specific to your business, a human will be faster than me: **" + CFG.PHONE_MAIN + "**.", 520)
    .then(function(){
      chips(['I need more customers|growth','What do you do?|services','Pricing|pricing','*Talk to a human|i_human']);
    });
}

/* soft close after a few turns — rotates so it never sounds canned */
function maybeClose(){
  if (S.capturing || S.sent) return;
  if (S.turns < CFG.MAX_TURNS_SOFT) return;
  if (S.turns % 3 !== 0) return;
  var line = CLOSES[S.closeIdx % CLOSES.length];
  S.closeIdx++;
  setTimeout(function(){
    bot(line, 700).then(function(){
      chips(['*Yes, let\u2019s do it|i_capture','Not right now|i_no']);
    });
  }, 900);
}

/* ── intent actions ── */
function runAction(r){
  switch (r.act){
    case 'capture':
      S.kind = r.akind || 'Consultation';
      startCapture();
      break;
    case 'human':
      bot(resolveAnswer(routeById('w_human').a), 480).then(function(){
        chips(['*Leave my details|i_capture','Back to questions|i_more']);
      });
      break;
    case 'phone':
      bot("\uD83D\uDCDE **" + CFG.PHONE_MAIN + "** (toll-free)\n\uD83D\uDCF1 **" + CFG.PHONE_LOCAL + "** \u2014 also WhatsApp\n\n" + (officeOpen() ? "We\u2019re open right now." : nextOpenPhrase()), 420);
      break;
    case 'cancel':
      if (S.capturing){
        flushPartial();
        S.capturing = false;
        S.step = 0;
        $prog.classList.remove('ir-show');
        bot("No problem \u2014 stopped. \uD83D\uDC4D\n\nNothing was sent apart from what you\u2019d already given me. Ask me anything else, or call " + CFG.PHONE_MAIN + " whenever you like.", 420)
          .then(function(){ chips(['Ask something else|i_more','Pricing|pricing']); });
      } else {
        bot("All good \u2014 no pressure here. What else can I help with?", 380)
          .then(function(){ chips(['I need more customers|growth','Pricing|pricing','What do you do?|services']); });
      }
      break;
    case 'retry':
      if (S.lastPayload) sendLead(S.lastPayload, true);
      else bot("Nothing queued to resend. Want to leave your details?", 400).then(function(){ chips(['*Yes|i_capture','No thanks|i_no']); });
      break;
    case 'restart':
      restart();
      break;
    case 'more':
      bot("Fire away. \uD83C\uDFAF", 320).then(function(){
        chips(['I need more customers|growth','What do you do?|services','Pricing|pricing','Talk to a human|i_human']);
      });
      break;
    case 'yes':
      if (S.lastRoute === 'i_no' || S.turns < 2){ startCapture(); break; }
      startCapture();
      break;
    case 'no':
      bot("Understood \u2014 no pressure. \uD83D\uDC4C\n\nI\u2019m here if you want to dig into anything else, and " + CFG.PHONE_MAIN + " is always open during business hours.", 420)
        .then(function(){ chips(['Ask something else|i_more','Pricing|pricing']); });
      break;
    default:
      fallback('');
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   LEAD CAPTURE — 9 steps, conversational, saves partials
   ══════════════════════════════════════════════════════════════════════════ */
var STEPS = [
  { key:'name',     q:"Let\u2019s do this properly. What\u2019s your **first name**?",
    v:function(x){ return x.length >= 2 && !/https?:\/\/|[<>{}|\\]/i.test(x); },
    e:"That doesn\u2019t look quite right \u2014 just your first name is fine." },
  { key:'business', q:function(){ return "Nice to meet you, " + cap(S.lead.name || '') + ". What\u2019s your **business called**?"; },
    v:function(x){ return x.length >= 2; },
    e:"What\u2019s the business name?" },
  { key:'industry', q:"What **industry** are you in? (Roofing, dental, legal, restaurant \u2014 whatever fits.)",
    v:function(x){ return x.length >= 2; },
    e:"Roughly what field \u2014 even one word helps." },
  { key:'city',     q:"Which **city or area** do you serve?",
    v:function(x){ return x.length >= 2; },
    e:"Which city or region?" },
  { key:'goal',     q:"What\u2019s the **main thing** you want to fix or grow right now?",
    v:function(x){ return x.length >= 3; },
    e:"Even a short answer is fine \u2014 what\u2019s the goal?" },
  { key:'website',  q:"Do you have a **website**? Paste the URL, or type \u201cnone\u201d.",
    v:function(){ return true; },
    e:"" },
  { key:'phone',    q:"Best **phone number** to reach you?",
    v:function(x){ return x.replace(/\D/g,'').length >= 10; },
    e:"That needs at least 10 digits including area code." },
  { key:'email',    q:"And your **email**?",
    v:function(x){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x); },
    e:"That email doesn\u2019t look valid \u2014 mind checking it?" },
  { key:'timing',   q:"Last one: how soon are you looking to **get moving**? (ASAP, next month, just researching \u2014 all fine.)",
    v:function(x){ return x.length >= 2; },
    e:"Rough timing is fine." }
];

function startCapture(){
  if (S.capturing) return;
  S.capturing = true;
  S.step = 0;
  S.lead = {};
  S.sent = false;
  S.partialSent = false;
  $prog.classList.add('ir-show');
  paintProg();
  bot("Perfect. \uD83C\uDF89 Nine quick questions \u2014 takes about a minute, and a real strategist reviews every one of these.\n\nType **cancel** at any point and I\u2019ll stop immediately.", 520)
    .then(function(){ askStep(); });
}
function paintProg(){
  $progF.style.width = Math.round((S.step / STEPS.length) * 100) + '%';
}
function askStep(){
  if (S.step >= STEPS.length){ finishCapture(); return; }
  var st = STEPS[S.step];
  var q = (typeof st.q === 'function') ? st.q() : st.q;
  setTimeout(function(){ bot(q, CFG.STEP_MS); }, 120);
  resetIdle();
}
function captureInput(text){
  var st = STEPS[S.step];
  if (!st){ finishCapture(); return; }
  if (!st.v(text)){
    bot(st.e || "Mind trying that again?", 420);
    resetIdle();
    return;
  }
  S.lead[st.key] = text;
  S.step++;
  paintProg();
  if (S.step >= STEPS.length) finishCapture();
  else askStep();
}
function finishCapture(){
  clearTimeout(S.idleTimer);
  $prog.classList.remove('ir-show');
  S.capturing = false;
  var p = payload(false);
  S.lastPayload = p;
  bot("Got everything \u2014 sending that across now\u2026 \uD83D\uDCE8", 520).then(function(){
    sendLead(p, false);
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   TRANSPORT
   AJAX is PRIMARY (it can confirm delivery). The hidden-iframe POST is a
   FALLBACK that fires ONLY when AJAX fails.
   >>> v5.2 fired both every time, delivering every Iris lead TWICE. <<<
   ══════════════════════════════════════════════════════════════════════════ */
function payload(partial){
  var L = S.lead;
  return {
    _subject : (partial ? '[PARTIAL] ' : '') + 'Iris Chat Lead \u2014 ' + S.kind + ' \u2014 ' + (L.business || L.name || 'Unknown'),
    _template: 'table',
    _captcha : 'false',
    _honey   : '',
    source   : CFG.VERSION,
    lead_type: S.kind + (partial ? ' (incomplete \u2014 visitor stopped responding)' : ''),
    name     : L.name     || '',
    business : L.business || '',
    industry : L.industry || '',
    city     : L.city     || '',
    goal     : L.goal     || '',
    website  : L.website  || '',
    phone    : L.phone    || '',
    email    : L.email    || '',
    timing   : L.timing   || '',
    page_url : location.href,
    page_title: document.title,
    submitted: todayStr() + ' ' + clockStr() + ' MT'
  };
}
function toParams(o){
  var a = [], k;
  for (k in o){ if (Object.prototype.hasOwnProperty.call(o, k)) a.push(encodeURIComponent(k) + '=' + encodeURIComponent(o[k])); }
  return a.join('&');
}
function postViaIframe(data){
  try {
    var nm = 'ir_sink_' + Date.now();
    var ifr = document.createElement('iframe');
    ifr.name = nm; ifr.style.display = 'none';
    document.body.appendChild(ifr);
    var f = document.createElement('form');
    f.method = 'POST'; f.action = CFG.FS_POST; f.target = nm; f.style.display = 'none';
    var k, i;
    for (k in data){
      if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
      i = document.createElement('input');
      i.type = 'hidden'; i.name = k; i.value = data[k];
      f.appendChild(i);
    }
    document.body.appendChild(f);
    f.submit();
    setTimeout(function(){ try { f.remove(); ifr.remove(); } catch (e) {} }, 20000);
    return true;
  } catch (e) { return false; }
}
function postLeadAjax(data){
  if (!window.fetch) return Promise.resolve(false);
  return fetch(CFG.FS_AJAX, {
    method : 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded', 'Accept':'application/json' },
    body   : toParams(data)
  }).then(function(r){ return !!r.ok; }).catch(function(){ return false; });
}
function sendLead(data, isRetry){
  postLeadAjax(data).then(function(ok){
    if (ok){ reportSend('sent'); return; }
    reportSend(postViaIframe(data) ? 'unsure' : 'failed', isRetry);
  });
}
function reportSend(state, isRetry){
  S.sent = (state !== 'failed');
  var nm = cap(S.lead.name || '');
  if (state === 'sent'){
    bot("Sent \u2014 confirmed. \u2705\n\nThanks " + nm + ". A real strategist will be in touch within one business day" + (officeOpen() ? ", and often the same day." : ". " + nextOpenPhrase()) + "\n\nWant it faster? **" + CFG.PHONE_MAIN + "** \u2014 mention you spoke to Iris and they\u2019ll have your details already.", 620)
      .then(function(){ chips(['Ask something else|i_more','Thanks!|w_thanks']); });
    return;
  }
  if (state === 'unsure'){
    bot("Sent \u2014 though I couldn\u2019t get a delivery receipt back from here, so I\u2019ll be straight with you rather than assume. \u26A0\uFE0F\n\nIf you haven\u2019t heard from us within one business day, call **" + CFG.PHONE_MAIN + "** and mention Iris. We\u2019ll find it.", 620)
      .then(function(){ chips(['Try sending again|i_retry','Ask something else|i_more']); });
    return;
  }
  bot("That didn\u2019t go through, and I\u2019m not going to pretend otherwise. \u274C\n\nPlease call **" + CFG.PHONE_MAIN + "** or email **" + CFG.LEAD_EMAIL + "** \u2014 you shouldn\u2019t have to chase us, but I\u2019d rather tell you than let it vanish." + (isRetry ? '' : "\n\nOr I can try once more."), 620)
    .then(function(){ chips(['Try again|i_retry','Talk to a human|i_human']); });
}

/* ── partial lead rescue: if someone goes quiet mid-form, save what we have ── */
function resetIdle(){
  clearTimeout(S.idleTimer);
  S.idleTimer = setTimeout(function(){
    if (S.capturing && S.step >= 3 && !S.partialSent) flushPartial();
  }, CFG.IDLE_MS);
}
function flushPartial(){
  if (S.sent || S.partialSent) return;
  if (!S.lead || !S.lead.name) return;
  if (S.step < 3) return;   // too little to be useful
  S.partialSent = true;
  var p = payload(true);
  postLeadAjax(p).then(function(ok){ if (!ok) postViaIframe(p); });
}
window.addEventListener('beforeunload', function(){ flushPartial(); });

/* ── input plumbing ── */
function submitInput(){
  var v = $inp.value.trim();
  if (!v) return;
  $inp.value = '';
  usr(v);
  handle(v);
}
$send.addEventListener('click', submitInput);
$inp.addEventListener('keydown', function(e){
  if (e.key === 'Enter'){ e.preventDefault(); submitInput(); }
});
$inp.addEventListener('input', function(){
  $send.disabled = !$inp.value.trim();
  if (S.capturing) resetIdle();
});
$send.disabled = true;

/* ── restart ── */
function restart(){
  clearTimeout(S.idleTimer);
  $msgs.innerHTML = '';
  $prog.classList.remove('ir-show');
  S.greeted = false; S.turns = 0; S.lastFam = null; S.lastRoute = null;
  S.capturing = false; S.step = 0; S.lead = {}; S.kind = 'Consultation';
  S.sent = false; S.partialSent = false; S.pendingResume = false;
  S.lastPayload = null; S.closeIdx = 0;
  shuffleJokes();
  S.greeted = true;
  greet();
}
/* restart control, injected once under the header */
(function(){
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'ir-restart';
  b.textContent = 'Start over \u21BB';
  b.addEventListener('click', restart);
  $msgs.parentNode.insertBefore(b, $msgs.nextSibling);
})();

/* ── WhatsApp link built from config ── */
(function(){
  var wa = document.getElementById('ir-wa');
  if (wa) wa.href = 'https://wa.me/' + CFG.WHATSAPP_NUM;
})();

})();

}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}

})();
