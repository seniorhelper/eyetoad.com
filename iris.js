/*!
================================================================================
  IRIS — Eye To Ad Media Growth Assistant · v5.7
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

/* label pill — always visible, tells people what this is */
.ir-pill{
  background:#0d1a2c;color:#ffd0ad;border:1px solid rgba(255,122,47,.42);
  padding:9px 15px;border-radius:999px;font-size:13px;font-weight:600;
  white-space:nowrap;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.45);
  transition:all .18s ease;letter-spacing:.005em;
}
.ir-pill:hover{background:#132339;color:#fff;border-color:#ff7a2f;transform:translateX(-2px)}
.ir-pill:focus-visible{outline:2px solid #ffd9a0;outline-offset:3px}
@media(max-width:400px){.ir-pill{font-size:12px;padding:8px 12px}}

/* proactive bubble — fires once, ~25s, dismissible */
.ir-bubble{
  position:absolute;right:0;bottom:84px;width:262px;background:#0d1a2c;
  border:1px solid rgba(255,122,47,.4);border-radius:16px 16px 4px 16px;
  padding:14px 16px 13px;box-shadow:0 18px 50px rgba(0,0,0,.6);
  display:none;animation:ir-pop .34s cubic-bezier(.34,1.56,.64,1) forwards;
}
.ir-bubble.ir-show{display:block}
.ir-bub-txt{font-size:13px;color:#cfe0f2;line-height:1.55}
.ir-bub-txt b{color:#ffb066;font-weight:700}
.ir-bub-act{display:flex;gap:8px;margin-top:11px}
.ir-bub-yes{flex:1;background:linear-gradient(140deg,#ff7a2f,#ff9f45);color:#fff;border:none;
  border-radius:9px;padding:8px 10px;font-size:12.5px;font-weight:700;cursor:pointer;
  font-family:'Outfit',sans-serif;transition:filter .16s}
.ir-bub-yes:hover{filter:brightness(1.1)}
.ir-bub-no{background:rgba(255,255,255,.07);color:#7d92ab;border:1px solid rgba(255,255,255,.1);
  border-radius:9px;padding:8px 12px;font-size:12.5px;font-weight:600;cursor:pointer;
  font-family:'Outfit',sans-serif;transition:color .16s}
.ir-bub-no:hover{color:#dce9f5}
.ir-bub-x{position:absolute;top:7px;right:9px;background:none;border:none;color:#41586f;
  font-size:15px;cursor:pointer;line-height:1;padding:3px;font-family:'Outfit',sans-serif}
.ir-bub-x:hover{color:#dce9f5}
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

    <div class="ir-msgs" id="ir-msgs" role="log" aria-live="polite" aria-label="Conversation with Iris"></div>

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

  <!-- ═══════════ PROACTIVE BUBBLE ═══════════ -->
  <div class="ir-bubble" id="ir-bubble" role="status">
    <button class="ir-bub-x" id="ir-bub-x" type="button" aria-label="Dismiss">&#10005;</button>
    <div class="ir-bub-txt">Want <b>more customers</b>? I can probably help &mdash; ask me anything
      about growing your business. &#128075;</div>
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
      <svg viewBox="0 0 120 128" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
        <g class="ir-body">
          <!-- antenna -->
          <path d="M60 34 V17" stroke="#0B1626" stroke-width="4.5" stroke-linecap="round" fill="none"/>
          <circle class="ir-bulb" cx="60" cy="11" r="6" fill="#22c55e" stroke="#0B1626" stroke-width="3"/>
          <!-- legs + feet -->
          <path d="M50 100 V115" stroke="#0B1626" stroke-width="6" stroke-linecap="round"/>
          <path d="M70 100 V115" stroke="#0B1626" stroke-width="6" stroke-linecap="round"/>
          <path d="M44 119 H55" stroke="#0B1626" stroke-width="6" stroke-linecap="round"/>
          <path d="M65 119 H76" stroke="#0B1626" stroke-width="6" stroke-linecap="round"/>
          <!-- arms -->
          <path class="ir-arm ir-arm-l" d="M24 70 C12 74 8 83 10 91" stroke="#0B1626"
                stroke-width="5.5" stroke-linecap="round" fill="none"/>
          <path class="ir-arm ir-arm-r" d="M96 70 C108 74 112 83 110 91" stroke="#0B1626"
                stroke-width="5.5" stroke-linecap="round" fill="none"/>
          <!-- target body -->
          <circle cx="60" cy="68" r="38" fill="#FFFFFF"/>
          <circle cx="60" cy="68" r="31" fill="#E8500F"/>
          <circle cx="60" cy="68" r="24" fill="#FFFFFF"/>
          <circle cx="60" cy="68" r="18" fill="#0B1626"/>
          <!-- face -->
          <g class="ir-eyes">
            <circle cx="50" cy="66" r="6.5" fill="#FFFFFF"/>
            <circle cx="70" cy="66" r="6.5" fill="#FFFFFF"/>
            <circle class="ir-pupil" cx="50" cy="66" r="3.2" fill="#0B1626"/>
            <circle class="ir-pupil" cx="70" cy="66" r="3.2" fill="#0B1626"/>
          </g>
          <!-- glasses -->
          <g stroke="#FFC98A" stroke-width="2.4" fill="none" stroke-linecap="round">
            <circle cx="50" cy="66" r="8.5"/>
            <circle cx="70" cy="66" r="8.5"/>
            <path d="M58.5 65.4 Q60 63.6 61.5 65.4"/>
            <path d="M41.6 63.6 L35 60.6"/>
            <path d="M78.4 63.6 L85 60.6"/>
          </g>
          <!-- smile -->
          <path d="M53 77 Q60 83.5 67 77" stroke="#FFC98A" stroke-width="2.8"
                fill="none" stroke-linecap="round"/>
        </g>
      </svg>
      <span class="ir-badge" id="ir-badge" aria-hidden="true"></span>
    </button>

    <button class="ir-pill" id="ir-pill" type="button" tabindex="-1">Grow my business &rarr;</button>
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
  st.setAttribute('data-iris', 'v5.7');
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
  VERSION      : 'iris-v5.7'
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
 c:['Google Ads|ppc','Social media|social','*Free audit|i_audit']},

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
 a:"Yes — logo, graphic and print design are all in-house. 🎨\n\nWhat we produce:\n• Logo design and full brand identity systems\n• Business cards, brochures, flyers, rack cards\n• Vehicle wraps and signage artwork\n• Trade show graphics and banners\n• Packaging and labels\n• Social and ad creative\n\nOn logos specifically: a logo's job is recognition, not cleverness. It has to work at the size of a phone icon and in one colour on a shirt. Most logos that lose that test were designed on a large screen and never checked anywhere else.\n\nVIP members get member pricing on all of it — the membership is $69.99/month.",
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
 a:"You can have one, yes. 🤖\n\nWe build these — knowledge base, lead capture, page awareness, the lot. Cost depends on how much it needs to know and what it needs to connect to.\n\nWhat makes them worth it: a large share of enquiries happen outside office hours, and a bot that can actually answer questions captures the ones a contact form loses.\n\nVIP members get member pricing on this like everything else — membership is $69.99/month.\n\nWant a quote? Takes a short conversation to scope properly.",
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
 a:"Fair. And I'd rather have this conversation now than after you've signed something uncomfortable. 💰\n\nA few honest things:\n\n**You don't have to start big.** Build-your-own plans start at $100/month for one focused deliverable. That's a real starting point, not a bait price — but nobody should pretend $100 buys a full campaign.\n\n**The membership exists for exactly this.** $69.99/month unlocks member pricing across everything, cancel anytime.\n\n**The audit is free.** No contract, no card, no obligation. You'll know what's wrong whether or not you hire anyone.\n\n**And the useful reframe:** what's one customer worth to you? If it's $2,000 and a campaign costs $800/month, the maths is about how many you need, not whether you can afford it.\n\nIf the honest answer is that now isn't the time — that's a real answer and I won't push.",
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
 a:"Straight answer, because this is one where agencies are routinely slippery. 📝\n\n**Terms are set per engagement.** Month-to-month is available and it's what most clients run on. Some engagements — particularly bigger builds with real upfront production — are structured with a defined term, because the cost is front-loaded and that has to be shared fairly.\n\n**You'd know which applies before signing, not after.** That's the actual commitment I can make.\n\n**The free audit carries no contract, no card and no obligation at all.** That part is unconditional.\n\n**The VIP membership is $69.99/month and cancels anytime.**\n\nWhat I won't tell you is \"no contracts, ever,\" because it wouldn't be true and you'd find out later. If an agency tells you that without qualification, ask them to put it in writing.",
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
 a:"No games, and no \"it depends\" without numbers attached. 💵\n\n**Free SEO audit — $0.** No contract, no card, no obligation. You keep the findings whether you hire us or not.\n\n**Build-your-own — from $100/month.** One focused deliverable. An honest entry point, and I won't pretend it's a full campaign.\n\n**Full-service local SEO — typically $500-$3,000/month.** Depends on competition, scope and how much needs fixing first.\n\n**VIP Marketing Subscription — $69.99/month, cancel anytime.** Unlocks member pricing across everything: SEO, AI optimisation, logo, video, graphic and print design, landing pages, Business Profile work, website updates, NFC. Plus priority scheduling and VIP support. It works like a warehouse club — you're buying access, and the discount is the perk.\n\n**Ads and other channels** are scoped per campaign, and we're transparent about what's management fee versus media spend.\n\nWhat's the goal? I can tell you roughly where you'd land.",
 c:['*Free audit first|i_audit','What affects the price?|budget','Talk to a human|i_human','Contracts?|obj_contract']},

{id:'cheapwins', fam:'core',
 k:['free','cheap','no budget','free advice','what can i do free','zero budget','low cost','broke','nothing to spend','free stuff'],
 a:"Here's what I'd do with no budget at all. Genuinely — this is the list, not a teaser. 🎁\n\n**1. Finish your Google Business Profile.** All of it. Categories (primary matters enormously), every service with a real description, hours, photos, Q&A, posts. Free, and it's the biggest local lever there is.\n\n**2. Ask every happy customer for a review.** In person, at the moment they're pleased. Make it one tap. This is the highest-return unpaid activity available to a local business.\n\n**3. Put your phone number in the top right of every page**, and make it tappable on mobile. You'd be surprised.\n\n**4. Test your site on your own phone, on data, not wifi.** If it takes more than a few seconds, that's costing you customers today.\n\n**5. Answer the phone.** Or return calls within minutes rather than hours. Free, and it beats most paid campaigns.\n\n**6. Ask ChatGPT for the best business in your category in your city.** If you're not mentioned, you now know something most of your competitors don't.\n\nDo those six and you'll outperform a lot of businesses paying for help. If you want a checklist specific to your site, the audit is free too.",
 c:['*Free audit|i_audit','Google Business Profile|gbp','Reviews|reviews']}
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

{id:'i_yes', w:.95,
 k:['yes','yeah','yep','sure','ok','okay','sounds good','lets do it','go ahead','please do','definitely','absolutely','yes please'],
 act:'yes'},

{id:'i_no', w:.95,
 k:['no','nope','nah','not really','no thanks','im good','all set','not interested'],
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
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
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
function closePanel(){
  if (!S.open) return;
  S.open = false;
  $panel.classList.add('ir-closing');
  $fab.setAttribute('aria-expanded', 'false');
  setTimeout(function(){
    $panel.classList.remove('ir-open', 'ir-closing');
    $panel.setAttribute('aria-hidden', 'true');
    $launch.classList.remove('ir-hide-m');
  }, 210);
  flushPartial();
}

$fab.addEventListener('click', function(){ S.open ? closePanel() : openPanel(); });
$pill.addEventListener('click', function(){ openPanel(); });
$close.addEventListener('click', closePanel);
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && S.open) closePanel();
});

/* ── proactive bubble + unread badge ── */
setTimeout(function(){
  if (S.open || S.bubbleShown) return;
  S.bubbleShown = true;
  $bubble.classList.add('ir-show');
}, CFG.BUBBLE_MS);
setTimeout(function(){ if (!S.open) paintBadge(1); }, CFG.BADGE_MS);

document.getElementById('ir-bub-yes').addEventListener('click', function(){ openPanel(); });
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
