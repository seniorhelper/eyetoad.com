// /product-design/  targets: product design agency denver, packaging design denver, label design, brand identity design, vehicle wrap design, product mockup generator
// Pricing: NOT stated ("quoted per project"). No AI vendor names. Concept brands are invented and labeled as such.
// Gallery mockups are inline SVG (no photos). Mockup Studio runs client-side only (inline script at the bottom).

const F = 'font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif"';
const OURS = 'Our brand';
const MOCK = 'Concept / mock brand, not a client';

const tile = (tag, brand, item, svg, mock) => `<figure class="pd-tile${mock ? ' pd-mock' : ''}"><div class="pd-art">${svg}</div><figcaption><span class="pd-tag">${tag}</span><b>${brand}</b><span class="pd-item">${item}</span></figcaption></figure>`;
const art = (label, body) => `<svg viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="${label}" ${F}>${body}</svg>`;
const rainbow = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#DC2626"/><stop offset=".2" stop-color="#F97316"/><stop offset=".4" stop-color="#FACC15"/><stop offset=".6" stop-color="#16A34A"/><stop offset=".8" stop-color="#2563EB"/><stop offset="1" stop-color="#7C3AED"/></linearGradient>`;
const RB = ['#DC2626', '#F97316', '#FACC15', '#16A34A', '#2563EB', '#7C3AED'];
// rounded waveform bars centered on y
const wave = (x0, y, step, w, hs, colors) => hs.map((h, i) => `<rect x="${x0 + i * step}" y="${y - h / 2}" width="${w}" height="${h}" rx="${w / 2}" fill="${colors[i % colors.length]}"/>`).join('');

// ---------- hero design board ----------
const HERO = `<svg class="pd-board" viewBox="0 0 520 440" width="520" height="440" role="img" aria-label="Design board: a product box, a can and a phone app screen in Eye To Ad Media brand colors, with the six brand color swatches" ${F}>
<defs><pattern id="hb-grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#1E293B" stroke-width="1"/></pattern>${rainbow('hb-rb')}
<linearGradient id="hb-can" x1="0" x2="1"><stop offset="0" stop-color="#9A3412"/><stop offset=".3" stop-color="#F97316"/><stop offset=".55" stop-color="#FDBA74"/><stop offset=".75" stop-color="#F97316"/><stop offset="1" stop-color="#7C2D12"/></linearGradient>
<radialGradient id="hb-sh"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
<rect width="520" height="440" rx="18" fill="#0B1220"/><rect width="520" height="440" rx="18" fill="url(#hb-grid)"/><rect x=".5" y=".5" width="519" height="439" rx="18" fill="none" stroke="#1F2A44"/>
<text x="28" y="40" font-size="11" font-weight="700" letter-spacing="2.2" fill="#94A3B8">DESIGN BOARD &#183; 01</text><circle cx="480" cy="36" r="5" fill="#22C55E"/>
<ellipse cx="140" cy="306" rx="96" ry="12" fill="url(#hb-sh)"/><ellipse cx="290" cy="306" rx="54" ry="10" fill="url(#hb-sh)"/><ellipse cx="415" cy="318" rx="66" ry="10" fill="url(#hb-sh)"/>
<polygon points="60,150 102,128 222,128 180,150" fill="#60A5FA"/><polygon points="180,150 222,128 222,278 180,300" fill="#1E40AF"/><rect x="60" y="150" width="120" height="150" fill="#2563EB"/>
${wave(86, 192, 9, 5, [10, 20, 30, 18, 34, 22, 14, 26], ['#fff'])}
<text x="120" y="236" text-anchor="middle" font-size="14" font-weight="900" letter-spacing="1" fill="#fff">EYE TO AD</text><text x="120" y="252" text-anchor="middle" font-size="7.5" font-weight="700" letter-spacing="2" fill="#DBEAFE">MEDIA &#183; DENVER</text>
<rect x="60" y="282" width="120" height="10" fill="url(#hb-rb)"/>
<rect x="250" y="120" width="80" height="180" fill="url(#hb-can)"/><ellipse cx="290" cy="120" rx="40" ry="8" fill="#E2E8F0"/><ellipse cx="290" cy="120" rx="33" ry="5.5" fill="#94A3B8"/><ellipse cx="290" cy="300" rx="40" ry="7" fill="#7C2D12"/>
${wave(262, 178, 8, 4.5, [10, 22, 32, 22, 30, 16, 8], RB)}
<text x="290" y="232" text-anchor="middle" font-size="20" font-weight="900" letter-spacing="2" fill="#fff">TOAD</text><text x="290" y="248" text-anchor="middle" font-size="6.5" font-weight="700" letter-spacing="1.4" fill="#FFF7ED">TALKS BACK</text>
<rect x="360" y="90" width="110" height="222" rx="18" fill="#020617" stroke="#334155" stroke-width="2"/><rect x="367" y="98" width="96" height="206" rx="12" fill="#fff"/>
<path d="M367 110a12 12 0 0 1 12-12h72a12 12 0 0 1 12 12v40h-96z" fill="#7C3AED"/><text x="379" y="126" font-size="10" font-weight="800" fill="#fff">Your brand</text><text x="379" y="140" font-size="7" font-weight="600" fill="#EDE9FE">Open today &#183; Denver</text>
<rect x="377" y="160" width="76" height="46" rx="6" fill="#F1F5F9"/><circle cx="398" cy="183" r="12" fill="#FACC15"/><rect x="416" y="175" width="30" height="5" rx="2.5" fill="#CBD5E1"/><rect x="416" y="186" width="22" height="5" rx="2.5" fill="#E2E8F0"/>
<rect x="377" y="214" width="76" height="5" rx="2.5" fill="#CBD5E1"/><rect x="377" y="225" width="60" height="5" rx="2.5" fill="#E2E8F0"/><rect x="377" y="236" width="68" height="5" rx="2.5" fill="#E2E8F0"/>
<rect x="377" y="262" width="76" height="26" rx="13" fill="#15803D"/><text x="415" y="279" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">Book now</text>
<path d="M60 334v10M180 334v10M60 339h120" stroke="#64748B" stroke-width="1.5"/><text x="120" y="358" text-anchor="middle" font-size="10" font-weight="600" fill="#94A3B8">120 &#215; 150 &#215; 60 mm</text>
<path d="M486 98v206M481 98h10M481 304h10" stroke="#64748B" stroke-width="1.5"/>
${RB.map((c, i) => `<circle cx="${62 + i * 79}" cy="388" r="12" fill="${c}"/><text x="${62 + i * 79}" y="418" text-anchor="middle" font-size="9" font-weight="600" fill="#94A3B8">${c}</text>`).join('')}
</svg>`;

// ---------- our brands ----------
const agingSign = art('Aging Safely yard sign mockup: navy and teal sign reading Walk-in tubs and roll-in showers, Denver, agingsafelybaths.com, staked in a lawn', `
<defs><linearGradient id="as-sky" x2="0" y2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset="1" stop-color="#EFF6FF"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#as-sky)"/><circle cx="330" cy="62" r="26" fill="#FEF3C7"/>
<path d="M0 232Q120 214 220 228T400 224V300H0Z" fill="#65A30D"/><path d="M0 252Q160 238 400 250V300H0Z" fill="#4D7C0F"/>
<ellipse cx="200" cy="262" rx="96" ry="6" fill="#1A2E05" opacity=".35"/>
<rect x="148" y="196" width="5" height="66" fill="#64748B"/><rect x="247" y="196" width="5" height="66" fill="#64748B"/>
<rect x="104" y="62" width="200" height="150" rx="6" fill="#0F172A" opacity=".18"/><rect x="100" y="56" width="200" height="150" rx="6" fill="#fff"/>
<path d="M100 62a6 6 0 0 1 6-6h188a6 6 0 0 1 6 6v40H100z" fill="#0F3D5E"/>
<path d="M114 88l13-12 13 12v12h-26z" fill="#5EEAD4"/><rect x="123" y="91" width="8" height="9" fill="#0F3D5E"/>
<text x="150" y="85" font-size="17" font-weight="900" letter-spacing="1.4" fill="#fff">AGING SAFELY</text>
<text x="200" y="130" text-anchor="middle" font-size="17" font-weight="800" fill="#0F3D5E">Walk-in tubs</text>
<text x="200" y="150" text-anchor="middle" font-size="17" font-weight="800" fill="#0F3D5E">&amp; roll-in showers</text>
<rect x="170" y="160" width="60" height="2" fill="#14B8A6"/>
<text x="200" y="180" text-anchor="middle" font-size="10" font-weight="700" letter-spacing=".6" fill="#0E7490">DENVER &#183; AGINGSAFELYBATHS.COM</text>
<path d="M100 192h200v8a6 6 0 0 1-6 6H106a6 6 0 0 1-6-6z" fill="#14B8A6"/>`);

const agingAd = art('Aging Safely social ad mockup: a sponsored post with an illustrated walk-in tub, the line Stay in the home you love, and a Learn more button', `
<rect width="400" height="300" fill="#E0E7FF"/>
<rect x="96" y="14" width="208" height="272" rx="12" fill="#fff" stroke="#C7D2FE"/>
<circle cx="116" cy="36" r="10" fill="#0F3D5E"/><path d="M110 38l6-6 6 6v5h-12z" fill="#5EEAD4"/>
<text x="132" y="34" font-size="9" font-weight="800" fill="#0F172A">Aging Safely</text><text x="132" y="45" font-size="7" font-weight="600" fill="#64748B">Sponsored</text>
<rect x="96" y="56" width="208" height="150" fill="#CCFBF1"/>
<rect x="96" y="56" width="208" height="96" fill="#F0FDFA"/><path d="M96 92h208M96 124h208M148 56v96M200 56v96M252 56v96" stroke="#CCFBF1" stroke-width="2"/>
<rect x="118" y="132" width="164" height="58" rx="10" fill="#fff" stroke="#94A3B8" stroke-width="2"/>
<rect x="128" y="140" width="40" height="44" rx="5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/><circle cx="160" cy="162" r="2.5" fill="#64748B"/>
<path d="M176 146h96" stroke="#7DD3FC" stroke-width="6" stroke-linecap="round"/>
<path d="M270 102v26M262 102h16" stroke="#475569" stroke-width="3" stroke-linecap="round"/><rect x="250" y="112" width="32" height="5" rx="2.5" fill="#94A3B8"/>
<text x="108" y="226" font-size="13" font-weight="900" fill="#0F172A">Stay in the home you love.</text>
<text x="108" y="242" font-size="8.5" font-weight="600" fill="#475569">Walk-in tubs and roll-in showers, Denver.</text>
<rect x="108" y="254" width="184" height="22" rx="6" fill="#0F3D5E"/><text x="200" y="269" text-anchor="middle" font-size="9" font-weight="800" fill="#fff">Learn more</text>`);

const s4l = art('Showers4Less door hanger mockup hanging on a wooden door knob: blue hanger with a shower head icon, New shower, less hassle, and showers4less.com', `
<defs><linearGradient id="s4-door" x1="0" x2="1"><stop offset="0" stop-color="#7C4A2D"/><stop offset=".5" stop-color="#9A5F3B"/><stop offset="1" stop-color="#6B3F26"/></linearGradient>
<linearGradient id="s4-h" x2="0" y2="1"><stop offset="0" stop-color="#0EA5E9"/><stop offset="1" stop-color="#075985"/></linearGradient>
<radialGradient id="s4-k" cx=".35" cy=".35"><stop offset="0" stop-color="#FEF3C7"/><stop offset=".6" stop-color="#D4A017"/><stop offset="1" stop-color="#7C5A0B"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#s4-door)"/>
<rect x="40" y="20" width="110" height="120" rx="4" fill="none" stroke="#5B341F" stroke-width="4"/><rect x="40" y="160" width="110" height="140" rx="4" fill="none" stroke="#5B341F" stroke-width="4"/>
<rect x="157" y="40" width="106" height="246" rx="12" fill="#0F172A" opacity=".25"/>
<path fill-rule="evenodd" fill="url(#s4-h)" d="M162 36h96a12 12 0 0 1 12 12v226a12 12 0 0 1-12 12h-96a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12zM210 52a16 16 0 1 0 0.01 0z"/>
<path d="M150 210h120v64a12 12 0 0 1-12 12h-96a12 12 0 0 1-12-12z" fill="#fff"/>
<path d="M190 104h22v8" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M199 112h26l-4 9h-18z" fill="#fff"/>
<path d="M204 128v8M212 128v10M220 128v8M208 142v6M216 142v6" stroke="#BAE6FD" stroke-width="2.5" stroke-linecap="round"/>
<text x="210" y="172" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">Showers4Less</text>
<text x="210" y="192" text-anchor="middle" font-size="10" font-weight="700" fill="#E0F2FE">New shower. Less hassle.</text>
<text x="210" y="236" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0C4A6E">Shower makeovers</text>
<text x="210" y="256" text-anchor="middle" font-size="10" font-weight="700" fill="#0369A1">showers4less.com</text>
<circle cx="210" cy="68" r="11" fill="url(#s4-k)"/><rect x="206" y="60" width="8" height="2" rx="1" fill="#FEF9C3" opacity=".8"/>`);

const painter = art('Painter Hotline paint can mockup: black and yellow label reading Painter Hotline, six crews, one hotline, with a red paint drip on the rim', `
<defs><radialGradient id="ph-bg" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#FEF9C3"/><stop offset="1" stop-color="#FCD34D"/></radialGradient>
<linearGradient id="ph-m" x1="0" x2="1"><stop offset="0" stop-color="#64748B"/><stop offset=".25" stop-color="#E2E8F0"/><stop offset=".45" stop-color="#F8FAFC"/><stop offset=".75" stop-color="#94A3B8"/><stop offset="1" stop-color="#475569"/></linearGradient>
<linearGradient id="ph-s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#ph-bg)"/>
<ellipse cx="200" cy="268" rx="104" ry="12" fill="#78350F" opacity=".25"/>
<path d="M122 112Q200 26 278 112" fill="none" stroke="#475569" stroke-width="3.5"/>
<rect x="120" y="96" width="160" height="166" fill="url(#ph-m)"/><ellipse cx="200" cy="262" rx="80" ry="12" fill="#64748B"/>
<rect x="120" y="126" width="160" height="108" fill="#111827"/><rect x="120" y="126" width="160" height="8" fill="#FACC15"/><rect x="120" y="226" width="160" height="8" fill="#FACC15"/>
<text x="200" y="168" text-anchor="middle" font-size="23" font-weight="900" letter-spacing="1" fill="#FACC15">PAINTER</text>
<text x="200" y="193" text-anchor="middle" font-size="23" font-weight="900" letter-spacing="1" fill="#fff">HOTLINE</text>
<text x="200" y="214" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="1.6" fill="#FDE68A">SIX CREWS &#183; ONE HOTLINE</text>
<rect x="120" y="96" width="160" height="166" fill="url(#ph-s)"/>
<ellipse cx="200" cy="96" rx="80" ry="14" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2"/><ellipse cx="200" cy="96" rx="66" ry="10" fill="#E2E8F0"/>
<path d="M134 90q8 2 10 12v26a5.5 5.5 0 0 1-11 0v-16q0-10-6-18z" fill="#DC2626"/><path d="M134 90q30-6 52-2l-6 6q-24-2-46 2z" fill="#DC2626"/>`);

const stl = art('Speed to Leads phone screen mockup: Lily, the voice agent, calling a new lead back, with a live waveform and call timer', `
<defs><linearGradient id="st-bg" x2="0" y2="1"><stop offset="0" stop-color="#1E1B4B"/><stop offset="1" stop-color="#0B1220"/></linearGradient>
<radialGradient id="st-g"><stop offset="0" stop-color="#6366F1" stop-opacity=".55"/><stop offset="1" stop-color="#6366F1" stop-opacity="0"/></radialGradient>
<linearGradient id="st-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#6366F1"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#st-bg)"/><circle cx="200" cy="150" r="140" fill="url(#st-g)"/>
<rect x="135" y="16" width="130" height="270" rx="22" fill="#020617" stroke="#334155" stroke-width="3"/><rect x="142" y="24" width="116" height="254" rx="16" fill="#0F172A"/>
<rect x="182" y="30" width="36" height="8" rx="4" fill="#020617"/>
<text x="200" y="60" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="1.4" fill="#94A3B8">SPEED TO LEADS</text>
<circle cx="200" cy="100" r="30" fill="none" stroke="#22D3EE" stroke-opacity=".35" stroke-width="4"/><circle cx="200" cy="100" r="25" fill="url(#st-a)"/>
<text x="200" y="109" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">L</text>
<text x="200" y="150" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">Lily</text>
<text x="200" y="166" text-anchor="middle" font-size="8.5" font-weight="600" fill="#A5B4FC">Calling your new lead</text>
${wave(160, 194, 6, 3.5, [6, 12, 20, 14, 26, 18, 10, 22, 30, 16, 24, 12, 18, 8], ['#22D3EE', '#818CF8'])}
<text x="200" y="224" text-anchor="middle" font-size="11" font-weight="700" fill="#E2E8F0">00:07</text>
<circle cx="176" cy="252" r="13" fill="#EF4444"/><rect x="169" y="250" width="14" height="4" rx="2" fill="#fff"/>
<circle cx="224" cy="252" r="13" fill="#334155"/><rect x="221" y="244" width="6" height="11" rx="3" fill="#fff"/><path d="M218 252a6 6 0 0 0 12 0" fill="none" stroke="#fff" stroke-width="1.6"/>`);

const toadTee = art('Toad t-shirt mockup: navy tee printed with a rainbow waveform mouth and the words Toad, the website that talks back', `
<defs><linearGradient id="td-bg" x2="0" y2="1"><stop offset="0" stop-color="#E2E8F0"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient>
<linearGradient id="td-s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#td-bg)"/><path d="M170 30h60" stroke="#64748B" stroke-width="3" stroke-linecap="round"/><path d="M200 30v14" stroke="#64748B" stroke-width="2"/>
<path d="M152 48L120 60 82 98l24 30 22-16v152h144V112l22 16 24-30-38-38-32-12q-48 30-96 0z" fill="#0B1220"/>
<path d="M152 48L120 60 82 98l24 30 22-16v152h144V112l22 16 24-30-38-38-32-12q-48 30-96 0z" fill="url(#td-s)"/>
<path d="M152 48q48 30 96 0" fill="none" stroke="#1E293B" stroke-width="6"/>
${wave(158, 146, 7.5, 5, [10, 18, 28, 38, 30, 44, 34, 24, 36, 26, 16, 10], RB)}
<text x="200" y="206" text-anchor="middle" font-size="27" font-weight="900" letter-spacing="5" fill="#fff">TOAD</text>
<text x="200" y="222" text-anchor="middle" font-size="6.6" font-weight="700" letter-spacing="1.3" fill="#94A3B8">THE WEBSITE THAT TALKS BACK</text>`);

const etaCards = art('Eye To Ad Media NFC business card mockup: two dark navy cards with the rainbow brand stripe, a tap-to-connect symbol and the line Denver since 2012', `
<defs>${rainbow('ec-rb')}<radialGradient id="ec-g" cx=".7" cy=".3" r=".8"><stop offset="0" stop-color="#1E293B"/><stop offset="1" stop-color="#060B16"/></radialGradient></defs>
<rect width="400" height="300" fill="url(#ec-g)"/>
<g transform="rotate(-9 170 128)"><rect x="66" y="66" width="208" height="124" rx="10" fill="#111827" stroke="#273244"/><rect x="66" y="176" width="208" height="6" fill="url(#ec-rb)"/>
${wave(128, 122, 10, 6, [14, 26, 40, 30, 48, 34, 22, 36, 18], RB)}</g>
<rect x="140" y="124" width="208" height="124" rx="10" fill="#000" opacity=".35" transform="rotate(5 244 186) translate(4 6)"/>
<g transform="rotate(5 244 186)"><rect x="140" y="124" width="208" height="124" rx="10" fill="#0B1220" stroke="#273244"/><rect x="140" y="124" width="6" height="124" fill="url(#ec-rb)"/>
<text x="160" y="160" font-size="15" font-weight="900" fill="#fff">Eye To Ad Media</text>
<text x="160" y="176" font-size="8" font-weight="600" fill="#94A3B8">Denver &#183; since 2012</text>
<text x="160" y="226" font-size="8" font-weight="700" fill="#E2E8F0">1-800-481-8638</text>
<path d="M300 196a10 10 0 0 1 0 14M307 190a19 19 0 0 1 0 26M314 184a28 28 0 0 1 0 38" fill="none" stroke="#FACC15" stroke-width="2.6" stroke-linecap="round"/><circle cx="294" cy="203" r="3" fill="#FACC15"/>
<text x="330" y="236" text-anchor="end" font-size="6.5" font-weight="800" letter-spacing="1.4" fill="#FACC15">TAP TO CONNECT</text></g>`);

const winbuild = art('WinBuild AI tablet app mockup with sample data: estimate approved, a job pipeline, invoices and a weekly bar chart for contractors', `
<rect width="400" height="300" fill="#E2E8F0"/><ellipse cx="200" cy="262" rx="160" ry="10" fill="#0F172A" opacity=".18"/>
<rect x="44" y="36" width="312" height="220" rx="16" fill="#0F172A"/><rect x="56" y="48" width="288" height="196" rx="8" fill="#fff"/>
<path d="M56 56a8 8 0 0 1 8-8h52v196H64a8 8 0 0 1-8-8z" fill="#172554"/>
<rect x="66" y="60" width="14" height="14" rx="3" fill="#F97316"/><path d="M69 70l2.5-6 2 4 2-4 2.5 6" fill="none" stroke="#fff" stroke-width="1.5"/>
<text x="84" y="71" font-size="8.5" font-weight="900" fill="#fff">WinBuild</text>
<rect x="66" y="92" width="40" height="5" rx="2.5" fill="#F97316"/><rect x="66" y="108" width="34" height="5" rx="2.5" fill="#3B5BA9"/><rect x="66" y="124" width="38" height="5" rx="2.5" fill="#3B5BA9"/><rect x="66" y="140" width="30" height="5" rx="2.5" fill="#3B5BA9"/>
<text x="128" y="72" font-size="11" font-weight="800" fill="#0F172A">Estimate #1042</text>
<rect x="222" y="62" width="50" height="14" rx="7" fill="#DCFCE7"/><text x="247" y="72" text-anchor="middle" font-size="7" font-weight="800" fill="#166534">Approved</text>
<text x="334" y="72" text-anchor="end" font-size="6.5" font-weight="700" fill="#64748B">SAMPLE DATA</text>
${[['Leads', '12'], ['Estimates', '8'], ['Jobs won', '5']].map((k, i) => `<rect x="${128 + i * 70}" y="86" width="62" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/><text x="${136 + i * 70}" y="100" font-size="6.5" font-weight="700" fill="#64748B">${k[0]}</text><text x="${136 + i * 70}" y="118" font-size="14" font-weight="900" fill="#0F172A">${k[1]}</text>`).join('')}
<rect x="128" y="136" width="132" height="98" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
${[34, 48, 40, 60, 52, 72, 66].map((h, i) => `<rect x="${138 + i * 17}" y="${224 - h}" width="10" height="${h}" rx="2" fill="${i === 6 ? '#F97316' : '#93C5FD'}"/>`).join('')}
<rect x="268" y="136" width="66" height="98" rx="6" fill="#FFF7ED" stroke="#FED7AA"/>
<text x="276" y="152" font-size="6.5" font-weight="800" fill="#9A3412">NEXT UP</text>
<rect x="276" y="162" width="50" height="5" rx="2.5" fill="#FDBA74"/><rect x="276" y="176" width="42" height="5" rx="2.5" fill="#FED7AA"/><rect x="276" y="190" width="46" height="5" rx="2.5" fill="#FED7AA"/>
<rect x="276" y="210" width="50" height="16" rx="8" fill="#C2410C"/><text x="301" y="221" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">Send invoice</text>`);

// ---------- concept brands (invented) ----------
const brewlark = art('Concept coffee pouch for Brewlark Coffee Roasters, an invented brand: kraft stand-up bag with a dark label, a lark icon and medium roast 12 ounce', `
<defs><linearGradient id="bl-k" x1="0" x2="1"><stop offset="0" stop-color="#9C6F48"/><stop offset=".35" stop-color="#D2AE84"/><stop offset=".65" stop-color="#C39A6E"/><stop offset="1" stop-color="#8A5F3C"/></linearGradient></defs>
<rect width="400" height="300" fill="#E7E5E4"/><rect y="236" width="400" height="64" fill="#D6D3D1"/>
<ellipse cx="200" cy="258" rx="92" ry="9" fill="#44403C" opacity=".3"/>
<path d="M138 50h124l10 202q-72 14-144 0z" fill="url(#bl-k)"/>
<rect x="138" y="40" width="124" height="18" fill="#A47148"/><path d="M146 40v18M154 40v18M162 40v18M170 40v18M178 40v18M186 40v18M194 40v18M202 40v18M210 40v18M218 40v18M226 40v18M234 40v18M242 40v18M250 40v18" stroke="#8A5F3C" stroke-width="1.2"/>
<circle cx="236" cy="80" r="6" fill="#78350F" opacity=".45"/>
<rect x="150" y="104" width="100" height="118" rx="4" fill="#1C1917"/>
<path d="M186 140q10-14 26-10l10-6-4 10q-2 14-18 16l-10 8 2-8q-8-2-6-10z" fill="#FCD34D"/><circle cx="214" cy="133" r="1.6" fill="#1C1917"/>
<text x="200" y="182" text-anchor="middle" font-size="14" font-weight="900" letter-spacing="1.5" fill="#FDE68A">BREWLARK</text>
<text x="200" y="196" text-anchor="middle" font-size="6.5" font-weight="700" letter-spacing="1.8" fill="#E7E5E4">COFFEE ROASTERS</text>
<text x="200" y="212" text-anchor="middle" font-size="6.5" font-weight="700" letter-spacing="1" fill="#FCD34D">MEDIUM ROAST &#183; 12 OZ</text>`);

const scorch = art('Concept hot sauce bottle for Scorchwell, an invented brand: red sauce in a tall bottle with a cream label, flame mark and ghost pepper flavor', `
<defs><radialGradient id="sw-bg" cx=".5" cy=".35" r=".9"><stop offset="0" stop-color="#991B1B"/><stop offset="1" stop-color="#3F0A0A"/></radialGradient>
<linearGradient id="sw-g" x1="0" x2="1"><stop offset="0" stop-color="#7F1D1D"/><stop offset=".4" stop-color="#DC2626"/><stop offset="1" stop-color="#7F1D1D"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#sw-bg)"/><ellipse cx="200" cy="272" rx="70" ry="8" fill="#000" opacity=".4"/>
<rect x="184" y="24" width="32" height="24" rx="4" fill="#111827"/><rect x="188" y="46" width="24" height="48" fill="url(#sw-g)"/><rect x="186" y="58" width="28" height="16" fill="#FACC15"/>
<path d="M188 92q-30 18-30 52v116q0 10 10 10h64q10 0 10-10V144q0-34-30-52z" fill="url(#sw-g)"/>
<rect x="166" y="120" width="8" height="140" rx="4" fill="#fff" opacity=".22"/>
<rect x="162" y="152" width="76" height="90" rx="3" fill="#FEF3C7"/>
<path d="M200 160q14 12 6 26 8-4 8-12 10 14-2 26-12 8-24 0-12-12 0-30 0 8 6 10-4-12 6-20z" fill="#EA580C"/>
<text x="200" y="212" text-anchor="middle" font-size="12" font-weight="900" letter-spacing="1" fill="#7F1D1D">SCORCH</text>
<text x="200" y="226" text-anchor="middle" font-size="12" font-weight="900" letter-spacing="1" fill="#C2410C">WELL</text>
<text x="200" y="237" text-anchor="middle" font-size="5.5" font-weight="800" letter-spacing="1.2" fill="#7F1D1D">GHOST PEPPER</text>`);

const ridgekeep = art('Concept van wrap for Ridgekeep Roofing, an invented roofing company: white van with navy mountain-ridge graphics and a fictional 555 phone number', `
<defs><linearGradient id="rk-sky" x2="0" y2="1"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#F0F9FF"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#rk-sky)"/><rect y="236" width="400" height="64" fill="#475569"/><path d="M0 268h60M100 268h60M200 268h60M300 268h60" stroke="#E2E8F0" stroke-width="4"/>
<ellipse cx="200" cy="240" rx="170" ry="8" fill="#0F172A" opacity=".35"/>
<path d="M36 100h236q30 0 48 30l34 30q10 6 10 18v44H36z" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>
<path d="M280 110h18q10 0 22 22l12 18h-52z" fill="#1E293B"/>
<path d="M36 222V188l44-26 26 16 46-34 40 30 30-18 40 30 32-22 22 14v44z" fill="#3B82F6"/>
<path d="M36 222V200l50-24 30 18 52-30 42 26 34-14 44 26 30-16 46 18v24z" fill="#1E3A8A"/>
<text x="52" y="134" font-size="27" font-weight="900" letter-spacing="1" fill="#1E3A8A">RIDGEKEEP</text>
<text x="53" y="150" font-size="8" font-weight="800" letter-spacing="1.6" fill="#475569">ROOFING &#183; REPAIR &#183; REPLACEMENT</text>
<text x="140" y="214" font-size="14" font-weight="900" fill="#fff">555-0142</text>
<rect x="340" y="176" width="14" height="8" rx="2" fill="#FDE68A"/>
<circle cx="98" cy="224" r="20" fill="#111827"/><circle cx="98" cy="224" r="9" fill="#94A3B8"/><circle cx="296" cy="224" r="20" fill="#111827"/><circle cx="296" cy="224" r="9" fill="#94A3B8"/>`);

const barkbite = art('Concept dog treat box for Barkbite, an invented brand: orange carton with a bone icon, a window showing biscuits, and peanut butter crunch', `
<rect width="400" height="300" fill="#115E59"/><circle cx="70" cy="60" r="90" fill="#134E4A"/>
<ellipse cx="215" cy="262" rx="112" ry="10" fill="#000" opacity=".3"/>
<polygon points="118,92 168,70 302,70 252,92" fill="#FDBA74"/><polygon points="252,92 302,70 302,238 252,260" fill="#C2410C"/><rect x="118" y="92" width="134" height="168" fill="#F97316"/>
<path d="M150 118a7 7 0 1 1 10-6h50a7 7 0 1 1 10 6 7 7 0 1 1-10 6h-50a7 7 0 1 1-10-6z" fill="#fff"/>
<text x="185" y="158" text-anchor="middle" font-size="19" font-weight="900" letter-spacing="1" fill="#fff">BARKBITE</text>
<text x="185" y="172" text-anchor="middle" font-size="6.8" font-weight="800" letter-spacing="1.2" fill="#FFF7ED">PEANUT BUTTER CRUNCH</text>
<rect x="140" y="184" width="90" height="56" rx="10" fill="#7C2D12"/>
<path d="M152 202a4 4 0 1 1 6-3h18a4 4 0 1 1 6 3 4 4 0 1 1-6 3h-18a4 4 0 1 1-6-3zM190 222a4 4 0 1 1 6-3h18a4 4 0 1 1 6 3 4 4 0 1 1-6 3h-18a4 4 0 1 1-6-3zM160 228a4 4 0 1 1 6-3h12a4 4 0 1 1 6 3 4 4 0 1 1-6 3h-12a4 4 0 1 1-6-3zM196 198a4 4 0 1 1 6-3h12a4 4 0 1 1 6 3 4 4 0 1 1-6 3h-12a4 4 0 1 1-6-3z" fill="#E9B872"/>
<g fill="#FDBA74"><circle cx="277" cy="150" r="6"/><circle cx="268" cy="138" r="3"/><circle cx="276" cy="133" r="3"/><circle cx="285" cy="136" r="3"/></g>`);

const lumaya = art('Concept skincare set for Lumaya, an invented brand: a white carton and a pink glass dropper bottle labeled vitamin C serum, 30 milliliters', `
<defs><linearGradient id="lm-bg" x2="0" y2="1"><stop offset="0" stop-color="#FCE7F3"/><stop offset="1" stop-color="#F9A8D4"/></linearGradient>
<linearGradient id="lm-gl" x1="0" x2="1"><stop offset="0" stop-color="#BE185D"/><stop offset=".45" stop-color="#F472B6"/><stop offset="1" stop-color="#9D174D"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#lm-bg)"/><rect y="244" width="400" height="56" fill="#F472B6" opacity=".35"/>
<ellipse cx="200" cy="262" rx="120" ry="8" fill="#831843" opacity=".25"/>
<polygon points="110,96 134,84 214,84 190,96" fill="#FDF2F8"/><polygon points="190,96 214,84 214,248 190,260" fill="#F5D0E4"/><rect x="110" y="96" width="80" height="164" fill="#fff"/>
<text transform="rotate(-90 150 178)" x="150" y="182" text-anchor="middle" font-size="13" font-weight="800" letter-spacing="4" fill="#831843">LUMAYA</text>
<rect x="122" y="236" width="56" height="1.5" fill="#DB2777"/><text x="150" y="250" text-anchor="middle" font-size="6.5" font-weight="700" fill="#9D174D">30 ml</text>
<ellipse cx="248" cy="104" rx="12" ry="18" fill="#111827"/><rect x="230" y="118" width="36" height="28" rx="4" fill="#1F2937"/>
<rect x="216" y="144" width="64" height="112" rx="12" fill="url(#lm-gl)"/><rect x="224" y="152" width="6" height="96" rx="3" fill="#fff" opacity=".35"/>
<rect x="226" y="180" width="44" height="52" rx="3" fill="#fff"/>
<text x="248" y="200" text-anchor="middle" font-size="7" font-weight="800" letter-spacing="1" fill="#831843">LUMAYA</text>
<text x="248" y="212" text-anchor="middle" font-size="4.8" font-weight="700" letter-spacing=".6" fill="#9D174D">VITAMIN C</text><text x="248" y="220" text-anchor="middle" font-size="4.8" font-weight="700" letter-spacing=".6" fill="#9D174D">SERUM</text>`);

const fizzpine = art('Concept soda can for Fizzpine, an invented brand: lime green can with a pine tree mark and sparkling pine and lime flavor, with bubbles', `
<defs><radialGradient id="fp-bg" cx=".5" cy=".4" r=".9"><stop offset="0" stop-color="#166534"/><stop offset="1" stop-color="#052E16"/></radialGradient>
<linearGradient id="fp-c" x1="0" x2="1"><stop offset="0" stop-color="#3F6212"/><stop offset=".3" stop-color="#A3E635"/><stop offset=".5" stop-color="#D9F99D"/><stop offset=".7" stop-color="#84CC16"/><stop offset="1" stop-color="#365314"/></linearGradient></defs>
<rect width="400" height="300" fill="url(#fp-bg)"/>
<g fill="#fff" opacity=".18"><circle cx="90" cy="70" r="8"/><circle cx="112" cy="110" r="4"/><circle cx="300" cy="80" r="6"/><circle cx="320" cy="160" r="10"/><circle cx="80" cy="190" r="5"/><circle cx="330" cy="230" r="4"/></g>
<ellipse cx="200" cy="268" rx="62" ry="8" fill="#000" opacity=".4"/>
<path d="M156 66q4-12 44-12t44 12v196q0 8-44 8t-44-8z" fill="url(#fp-c)"/>
<ellipse cx="200" cy="58" rx="40" ry="7" fill="#E5E7EB"/><ellipse cx="200" cy="58" rx="33" ry="4.5" fill="#9CA3AF"/><rect x="194" y="54" width="14" height="5" rx="2.5" fill="#D1D5DB"/>
<path d="M200 92l16 22h-8l14 18h-9l15 20h-56l15-20h-9l14-18h-8z" fill="#14532D"/><rect x="197" y="152" width="6" height="8" fill="#14532D"/>
<text x="200" y="190" text-anchor="middle" font-size="21" font-weight="900" letter-spacing="1" fill="#052E16">FIZZ</text>
<text x="200" y="212" text-anchor="middle" font-size="21" font-weight="900" letter-spacing="1" fill="#052E16">PINE</text>
<rect x="156" y="224" width="88" height="20" fill="#14532D"/><text x="200" y="237" text-anchor="middle" font-size="6.2" font-weight="800" letter-spacing="1" fill="#ECFCCB">SPARKLING PINE &amp; LIME</text>`);

// ---------- what we design: icons ----------
const ico = (d) => `<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SVC = [
  ['Packaging', 'Boxes, pouches, mailers and retail cartons, laid out on your manufacturer&rsquo;s dieline.', 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10'],
  ['Labels', 'Bottle, jar, can and bag labels with the required panels set cleanly, not crammed.', 'M7 3h10v4l2 3v11H5V10l2-3zM8 13h8M8 16h5'],
  ['Brand identity', 'Logo, color system, type and a one-page guide your team and printer can follow.', 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.3l6-.7z'],
  ['Print', 'Door hangers, flyers, postcards, menus and brochures, set up press-ready.', 'M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z'],
  ['Signage', 'Yard signs, banners, storefronts and trade-show displays you can read from the street.', 'M4 4h16v10H4zM9 14v7M15 14v7M7 8h10'],
  ['Vehicle wraps', 'Vans and trucks laid out on the real vehicle template, with the phone number first.', 'M2 16V7h12v9M14 10h4l4 4v2M6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  ['NFC cards', 'Tap-to-connect business cards, stickers and table tents. See the <a href="/vip-marketing/">NFC marketing kit</a>.', 'M4 6h16v12H4zM14 10a3 3 0 0 1 0 4M16.5 8.5a6 6 0 0 1 0 7'],
  ['Web &amp; app UI', 'Product pages, landing pages and app screens. See <a href="/custom-website-design/">custom website design</a>.', 'M3 4h18v12H3zM8 20h8M12 16v4'],
  ['Ad creative', 'Social, display and search ad sets, sized for every placement and written to be clicked.', 'M4 10v4h3l6 4V6l-6 4zM17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10'],
];

const chip = (id, name, val, label, checked) => `<label class="pd-chip"><input type="radio" name="${name}" value="${val}"${checked ? ' checked' : ''}><span>${label}</span></label>`;
const PRODUCTS = [['box', 'Box'], ['bottle', 'Bottle'], ['can', 'Can'], ['tee', 'Tee'], ['card', 'Business card'], ['sign', 'Yard sign'], ['app', 'App screen']];
const PALETTES = [['eta', 'Eye To Ad', '#2563EB', '#FACC15'], ['citrus', 'Citrus', '#EA580C', '#FDE047'], ['forest', 'Forest', '#166534', '#BEF264'], ['midnight', 'Midnight', '#0B1220', '#22D3EE'], ['blush', 'Blush', '#BE185D', '#FBCFE8'], ['mono', 'Mono', '#111827', '#E5E7EB']];
const MARKS = [['circle', 'Circle'], ['leaf', 'Leaf'], ['bolt', 'Bolt'], ['peak', 'Peak'], ['drop', 'Drop'], ['star', 'Star']];

export default {
  path: '/product-design/',
  prefix: 'pd',
  date: '2026-10-27',
  title: 'Product & Packaging Design | Denver | Eye To Ad Media',
  description: 'Packaging, labels, brand identity, signs, vehicle wraps, NFC cards and app screens from a Denver studio that also builds the sites they sell on. Try the free Mockup Studio.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'Product, packaging &amp; brand design &middot; Denver',
  h1: 'Design that sells <span class="pd-g">on the shelf and on the screen.</span>',
  kick: 'Packaging, labels, signs, wraps, cards and app screens, from the Denver team that also builds the websites they sell on.',
  sub: '',
  cta2: ['Try the Mockup Studio', '#pd-studio'],
  asideHtml: `<div class="pd-hart">${HERO}</div>`,
  capsule: 'Eye To Ad Media designs product packaging, labels, brand identities, print, signage, vehicle wraps, NFC business cards, web and app screens, and ad creative from Denver. You get concepts shown on realistic mockups, revisions, print-ready files your printer can run and web-ready images for your product pages. Every project is quoted after a short brief.',
  style: `@font-face{font-family:"Inter";font-style:normal;font-weight:800;font-display:optional;src:url(/fonts/inter-800.woff2) format("woff2")}
.pd-hero{--k-acc:#FB923C}
.pd-hero h1,.k-hero.pd-hero h1{font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-weight:800;letter-spacing:-.04em;line-height:1.02;font-size:clamp(2.3rem,4.8vw,3.9rem);max-width:none;text-wrap:balance}
.pd-g{display:block;background:linear-gradient(90deg,#F43F5E,#F97316 50%,#FACC15);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.k-hero.pd-hero .k-kick{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-style:normal;font-weight:500;font-size:clamp(1.05rem,1.6vw,1.25rem);line-height:1.5;color:#CBD5E1;max-width:44ch}
.pd-hero .k-sub:empty{display:none}
.pd-hero .k-btn-a{background:#C2410C}.pd-hero .k-btn-a:hover{background:#9A3412}
.pd-hart{max-width:520px;width:100%;justify-self:end}.pd-hart svg{display:block;width:100%;height:auto;filter:drop-shadow(0 30px 50px rgba(0,0,0,.45))}
.k-h,.k-band h2{font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;font-weight:800!important;letter-spacing:-.035em!important;line-height:1.04!important}
.k-h em,h2.k-h em{font-style:normal;color:#C2410C}.k-sec-ink h2.k-h em{color:#FB923C}
.k-band .k-btn-w{color:#9A3412}
.pd-svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:26px}
.pd-svc>div{background:#fff;border:1px solid #E4E7EC;border-radius:12px;padding:20px 20px 18px;position:relative;overflow:hidden}
.pd-svc>div::after{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#DC2626,#F97316,#FACC15,#16A34A,#2563EB,#7C3AED);opacity:.9}
.pd-svc svg{color:#1D4ED8;display:block;margin-bottom:10px}
.pd-svc h3{font:800 1.1rem/1.2 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;margin:0 0 6px;color:#101828}
.pd-svc p{margin:0;color:#475467;font-size:.95rem;line-height:1.55}
.pd-gal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:28px}
.pd-gal.c3{grid-template-columns:repeat(3,minmax(0,1fr))}
.pd-tile{margin:0;background:#fff;border:1px solid #E4E7EC;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.pd-tile:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(16,24,40,.14)}
.pd-art svg{display:block;width:100%;height:auto}
.pd-tile figcaption{padding:14px 16px 16px;display:grid;gap:4px;line-height:1.35}
.pd-tile figcaption b{font:800 1.05rem/1.2 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#101828}
.pd-item{color:#475467;font-size:.9rem}
.pd-tag{justify-self:start;font:800 .68rem/1 system-ui,-apple-system,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:5px 9px;border-radius:20px;background:#DCFCE7;color:#14532D;margin-bottom:4px}
.pd-mock .pd-tag{background:#FEF3C7;color:#78350F;text-transform:none;letter-spacing:.02em}
.k-sec-ink .pd-tile{background:#0F172A;border-color:#1E293B}.k-sec-ink .pd-tile figcaption b{color:#fff}.k-sec-ink .pd-item{color:#CBD5E1}
.pd-note{margin:20px 0 0;font-size:.92rem;color:#475467;max-width:80ch}.k-sec-ink .pd-note{color:#CBD5E1}

/* studio */
.pd-studio{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:24px;margin-top:28px;align-items:start}
.pd-ctrl{background:#fff;border:1px solid #E4E7EC;border-radius:14px;padding:20px;display:grid;gap:16px}
.pd-ctrl label.pd-l,.pd-ctrl legend{display:block;font:800 .78rem/1.2 system-ui,-apple-system,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#344054;margin:0 0 7px;padding:0}
.pd-ctrl fieldset{border:0;margin:0;padding:0;min-width:0}
.pd-ctrl input[type=text],.pd-ctrl select{width:100%;box-sizing:border-box;min-height:46px;padding:10px 12px;border:1.5px solid #98A2B3;border-radius:10px;font:500 1rem system-ui,-apple-system,sans-serif;color:#101828;background:#fff}
.pd-ctrl input[type=text]:focus-visible,.pd-ctrl select:focus-visible,.pd-ctrl input[type=color]:focus-visible{outline:3px solid #2563EB;outline-offset:2px}
.pd-chips{display:flex;flex-wrap:wrap;gap:8px}
.pd-chip{position:relative;cursor:pointer}
.pd-chip input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
.pd-chip span{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 13px;border:1.5px solid #98A2B3;border-radius:999px;font:700 .9rem/1 system-ui,-apple-system,sans-serif;color:#344054;background:#fff}
.pd-chip input:checked+span{background:#101828;border-color:#101828;color:#fff}
.pd-chip input:focus-visible+span{outline:3px solid #2563EB;outline-offset:2px}
.pd-sw{display:inline-flex}.pd-sw i{width:13px;height:13px;border-radius:50%;border:1px solid rgba(0,0,0,.2)}.pd-sw i+i{margin-left:-4px}
.pd-colors{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.pd-colors input[type=color]{width:100%;height:46px;padding:3px;border:1.5px solid #98A2B3;border-radius:10px;background:#fff;cursor:pointer;box-sizing:border-box}
.pd-btns{display:flex;flex-wrap:wrap;gap:10px}
.pd-b{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:10px;font:800 .98rem/1 system-ui,-apple-system,sans-serif;cursor:pointer;border:2px solid #101828;background:#fff;color:#101828;text-decoration:none}
.pd-b.go{background:#1D4ED8;border-color:#1D4ED8;color:#fff}
.pd-b:hover{transform:translateY(-1px)}.pd-b:focus-visible{outline:3px solid #F97316;outline-offset:2px}
.pd-status{min-height:1.4em;margin:0;font-size:.9rem;color:#166534;font-weight:600}
.pd-view{position:sticky;top:90px;display:grid;gap:14px}
.pd-out{background:#fff;border:1px solid #E4E7EC;border-radius:14px;overflow:hidden;box-shadow:0 24px 50px rgba(16,24,40,.12)}
.pd-out svg{display:block;width:100%;height:auto}
.pd-pcta{background:#0B1220;color:#E2E8F0;border-radius:14px;padding:20px 22px}
.pd-pcta h3{margin:0 0 6px;font:800 1.25rem/1.2 Inter,system-ui,-apple-system,sans-serif;letter-spacing:-.02em;color:#fff}
.pd-pcta p{margin:0 0 14px;color:#CBD5E1;font-size:.95rem}
.pd-pcta .pd-b{border-color:#fff}.pd-pcta .pd-b.go{background:#C2410C;border-color:#C2410C}
.pd-priv{margin:0;font-size:.85rem;color:#475467}
/* steps + seo */
.pd-steps{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;counter-reset:s}
.pd-steps li{background:#fff;border:1px solid #E4E7EC;border-radius:12px;padding:20px;counter-increment:s}
.pd-steps li::before{content:counter(s,decimal-leading-zero);display:block;font:800 1.7rem/1 Inter,system-ui,sans-serif;letter-spacing:-.04em;background:linear-gradient(90deg,#DC2626,#F97316);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:10px}
.pd-steps h3{margin:0 0 6px;font:800 1.08rem/1.2 system-ui,-apple-system,sans-serif;color:#101828}
.pd-steps p{margin:0;color:#475467;font-size:.94rem;line-height:1.55}
.pd-seo{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:26px}
.pd-seo>div{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:22px}
.pd-seo h3{margin:0 0 8px;font:800 1.12rem/1.2 system-ui,-apple-system,sans-serif;color:#fff}
.pd-seo p{margin:0;color:#CBD5E1;font-size:.95rem;line-height:1.6}
.k-sec-ink a:not([class]){color:#FDBA74}
@media (max-width:1100px){.pd-gal{grid-template-columns:repeat(2,minmax(0,1fr))}.pd-gal.c3{grid-template-columns:repeat(2,minmax(0,1fr))}.pd-steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:900px){.pd-studio{grid-template-columns:1fr}.pd-view{display:contents}.pd-out{position:sticky;top:8px;z-index:3;order:-1}.pd-pcta{order:2}.pd-svc,.pd-seo{grid-template-columns:1fr 1fr}.pd-hart{justify-self:center}}
@media (max-width:600px){.pd-gal,.pd-gal.c3,.pd-svc,.pd-seo,.pd-steps{grid-template-columns:1fr}.pd-colors{grid-template-columns:1fr 1fr}.k-hero.pd-hero{padding:48px 0 44px}}
@media (prefers-reduced-motion:reduce){.pd-tile,.pd-b{transition:none}.pd-tile:hover,.pd-b:hover{transform:none}}`,
  sections: [
    `<div class="k-chip">What we design</div>
<h2 class="k-h" id="pd-h2a">Everything your customer <em>holds, reads or taps.</em></h2>
<p class="k-lead">One studio for the box, the label, the sign out front, the van and the product page. The look stays consistent because the same team makes all of it.</p>
<div class="pd-svc">
${SVC.map((s) => `<div>${ico(s[2])}<h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('\n')}
</div>`,

    `<section class="k-sec k-sec-ink" aria-labelledby="pd-h2b" id="pd-brands"><div class="wrap">
<div class="k-chip">Our brands</div>
<h2 class="k-h" id="pd-h2b">We design for our own brands <em>first.</em></h2>
<p class="k-lead">These are businesses we own and run. Their signs, hangers, cans, screens and merch come out of the same studio you would be hiring.</p>
<div class="pd-gal">
${tile(OURS, 'Aging Safely', 'Yard sign &middot; walk-in tubs &amp; roll-in showers, Denver', agingSign)}
${tile(OURS, 'Aging Safely', 'Social ad creative', agingAd)}
${tile(OURS, 'Showers4Less', 'Door hanger', s4l)}
${tile(OURS, 'Painter Hotline', 'Paint can label &amp; brand mark', painter)}
${tile(OURS, 'Speed to Leads', 'App screen &middot; Lily calling a new lead back', stl)}
${tile(OURS, 'Toad', 'Merch tee with the rainbow waveform mouth', toadTee)}
${tile(OURS, 'Eye To Ad Media', 'NFC tap-to-connect business cards', etaCards)}
${tile(OURS, 'WinBuild AI', 'Contractor app UI (sample data)', winbuild)}
</div>
<p class="pd-note">The mockups on this page are drawn in code, so they load in a blink. Production files are built separately at full print resolution for your printer, sign shop or manufacturer.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="pd-h2c" id="pd-concepts"><div class="wrap">
<div class="k-chip">Concept work</div>
<h2 class="k-h" id="pd-h2c">Made-up brands. <em>Real craft.</em></h2>
<p class="k-lead">We invented these six brands to show range across categories. None of them is a client, and any resemblance to a real company is unintended.</p>
<div class="pd-gal c3">
${tile(MOCK, 'Brewlark Coffee Roasters', 'Stand-up coffee pouch', brewlark, 1)}
${tile(MOCK, 'Scorchwell', 'Hot sauce bottle, label &amp; neck band', scorch, 1)}
${tile(MOCK, 'Ridgekeep Roofing', 'Van wrap (fictional 555 number)', ridgekeep, 1)}
${tile(MOCK, 'Barkbite', 'Dog treat carton with window', barkbite, 1)}
${tile(MOCK, 'Lumaya', 'Skincare carton &amp; dropper bottle', lumaya, 1)}
${tile(MOCK, 'Fizzpine', 'Sparkling soda can', fizzpine, 1)}
</div>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="pd-h2d" id="pd-studio"><div class="wrap">
<div class="k-chip">Free tool</div>
<h2 class="k-h" id="pd-h2d">Mockup Studio: <em>see your brand on a product.</em></h2>
<p class="k-lead">Type a name, pick colors and a product, and watch it update. Download a PNG to show your partner, then let us design the real thing.</p>
<div class="pd-studio">
<form class="pd-ctrl" id="pd-form" aria-label="Mockup Studio controls" novalidate>
<div><label class="pd-l" for="pd-name">Brand name</label><input type="text" id="pd-name" maxlength="22" value="Mile High Pickle Co." autocomplete="off" spellcheck="false"></div>
<div><label class="pd-l" for="pd-tagl">Tagline</label><input type="text" id="pd-tagl" maxlength="40" value="Small batch. Big flavor." autocomplete="off"></div>
<fieldset><legend>Product</legend><div class="pd-chips">${PRODUCTS.map((p, i) => chip('', 'pd-prod', p[0], p[1], i === 0)).join('')}</div></fieldset>
<fieldset><legend>Palette</legend><div class="pd-chips">${PALETTES.map((p, i) => chip('', 'pd-pal', p[0], `<span class="pd-sw" aria-hidden="true"><i style="background:${p[2]}"></i><i style="background:${p[3]}"></i></span>${p[1]}`, i === 0)).join('')}</div></fieldset>
<div class="pd-colors">
<div><label class="pd-l" for="pd-c1">Main</label><input type="color" id="pd-c1" value="#2563EB"></div>
<div><label class="pd-l" for="pd-c2">Accent</label><input type="color" id="pd-c2" value="#FACC15"></div>
<div><label class="pd-l" for="pd-bg">Backdrop</label><select id="pd-bg"><option value="light">Light</option><option value="dark">Dark</option><option value="tint">Tinted</option></select></div>
</div>
<fieldset><legend>Logo mark</legend><div class="pd-chips">${MARKS.map((m, i) => chip('', 'pd-mark', m[0], m[1], i === 2)).join('')}</div></fieldset>
<div><label class="pd-l" for="pd-font">Type style</label><select id="pd-font"><option value="sans">Bold sans</option><option value="serif">Classic serif</option><option value="mono">Mono</option></select></div>
<div class="pd-btns"><button type="button" class="pd-b go" id="pd-dl">Download PNG</button><button type="button" class="pd-b" id="pd-rand">Surprise me</button></div>
<p class="pd-status" id="pd-status" role="status" aria-live="polite"></p>
<p class="pd-priv">Runs entirely in your browser. Nothing you type leaves this page.</p>
</form>
<div class="pd-view">
<div class="pd-out" id="pd-out"><svg viewBox="0 0 600 450" width="600" height="450" role="img" aria-label="Mockup preview"><rect width="600" height="450" fill="#F1F5F9"/></svg></div>
<div class="pd-pcta"><h3>Like it? Have our team design the real thing.</h3><p>Concepts on real mockups, revisions, and print-ready files. Quoted per project.</p><div class="pd-btns"><a class="pd-b go" href="/contact/">Start a design brief</a><a class="pd-b" href="tel:18004818638" style="background:transparent;color:#fff">Call 1-800-481-8638</a></div></div>
</div>
</div>
</div></section>`,

    `<section class="k-sec" aria-labelledby="pd-h2e"><div class="wrap">
<div class="k-chip">How it works</div>
<h2 class="k-h" id="pd-h2e">Brief to print-ready, <em>in four steps.</em></h2>
<ol class="pd-steps">
<li><h3>Brief</h3><p>A short call or form: what you sell, who buys it, where it sits (shelf, truck, screen), your printer&rsquo;s specs and your deadline.</p></li>
<li><h3>Concepts</h3><p>Usually two or three distinct directions, shown on realistic mockups so you judge the product, not a flat logo on white.</p></li>
<li><h3>Revisions</h3><p>We refine the direction you pick. The number of revision rounds is written into your quote up front.</p></li>
<li><h3>Files</h3><p>Print-ready PDFs with bleed on your dieline, color specs for your printer, plus web assets: SVG logos, WebP and AVIF images, social sizes.</p></li>
</ol>
</div></section>`,

    `<section class="k-sec k-sec-ink" aria-labelledby="pd-h2f"><div class="wrap">
<div class="k-chip">Design + search</div>
<h2 class="k-h" id="pd-h2f">Design that ranks <em>and converts.</em></h2>
<p class="k-lead">We are an SEO shop first, so the design work is built to be found and to sell online, not just to look good on a shelf.</p>
<div class="pd-seo">
<div><h3>Product pages search engines understand</h3><p>Product and Organization schema, real descriptions, descriptive file names and alt text, so your products can show up in image and shopping results. We build the pages too: <a href="/custom-website-design/">custom website design</a>.</p></div>
<div><h3>Photos and renders that load fast</h3><p>Renders exported as AVIF or WebP at the exact sizes the page shows, with width and height set so nothing jumps while it loads. Fast pages keep shoppers and help rankings.</p></div>
<div><h3>One message, one clear next step</h3><p>The box, the ad and the product page tell the same story and point to one action, then we measure and improve it with <a href="/conversion-optimization/">conversion optimization</a>.</p></div>
</div>
<p class="k-p" style="margin-top:24px">Want the whole engine? <a href="/business-in-a-box/">Business in a Box</a> pairs the design with a site we run, and <a href="/toad/">Toad</a> gives that site a voice. See more on <a href="/our-work/">our work</a>.</p>
</div></section>`,
  ],
  faqChip: 'Questions people ask',
  faqH2: 'About product and packaging design.',
  faq: [
    { q: 'What does product design cost?', a: 'It is quoted per project after a short brief. The quote depends on how many products or SKUs, how many concepts and revision rounds, and which files you need (print, signage, web). You see the scope and price in writing before any work starts.' },
    { q: 'Do you deliver print-ready files?', a: 'Yes. You get press-ready PDFs with bleed set on your printer&rsquo;s or manufacturer&rsquo;s dieline, color specs for print, and editable source files where the project calls for them, plus web-ready logos and images.' },
    { q: 'Can you work with my printer, sign shop or co-packer?', a: 'Yes. Send us their template or dieline and specs, and we build to it. If you do not have a printer yet, we can tell you what to ask for so the files fit.' },
    { q: 'Are the brands on this page real clients?', a: 'The ones marked &ldquo;Our brand&rdquo; are businesses we own and operate. The ones marked &ldquo;Concept / mock brand&rdquo; are invented to show range; they are not clients and not real companies.' },
    { q: 'Does the Mockup Studio save or send what I type?', a: 'No. It runs entirely in your browser. Your brand name, colors and downloads never leave your device, and there are no tracking scripts inside the tool.' },
    { q: 'Can you also build the website or store where the product sells?', a: 'Yes, that is our core business. We design and code product pages and full sites, and run SEO on them, so the packaging and the page match and the page gets found.' },
  ],
  related: [['Custom website design', '/custom-website-design/'], ['Conversion optimization', '/conversion-optimization/'], ['NFC marketing kit', '/vip-marketing/'], ['Business in a Box', '/business-in-a-box/'], ['Toad', '/toad/'], ['Our work', '/our-work/']],
  band: ['Have a product that needs a look?', 'Tell us what you sell and where it sells. We will come back with a plan and a quote for the design work.', ['Start a design brief', '/contact/']],
  service: { name: 'Product and Packaging Design', types: ['Packaging design', 'Label design', 'Brand identity design', 'Print design', 'Signage design', 'Vehicle wrap design', 'NFC business card design', 'Web and app UI design', 'Ad creative design'], alt: ['Product design', 'Packaging and label design'] },
  script: `(function(){
var f=document.getElementById('pd-form'),out=document.getElementById('pd-out');if(!f||!out)return;
var PAL={eta:['#2563EB','#FACC15'],citrus:['#EA580C','#FDE047'],forest:['#166534','#BEF264'],midnight:['#0B1220','#22D3EE'],blush:['#BE185D','#FBCFE8'],mono:['#111827','#E5E7EB']};
var FONTS={sans:'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif',serif:'Georgia,Times New Roman,serif',mono:'ui-monospace,Cascadia Mono,Consolas,Menlo,monospace'};
var NAMES={box:'box',bottle:'bottle',can:'can',tee:'t-shirt',card:'business cards',sign:'yard sign',app:'app screen'};
function g(id){return document.getElementById(id)}
function rv(n){var r=f.querySelector('input[name='+n+']:checked');return r?r.value:''}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function hx(c){c=String(c||'#000').replace('#','');if(c.length===3)c=c.replace(/(.)/g,'$1$1');var n=parseInt(c,16)||0;return[n>>16&255,n>>8&255,n&255]}
function th(a){return'#'+a.map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return(v<16?'0':'')+v.toString(16)}).join('')}
function mix(a,b,t){var x=hx(a),y=hx(b);return th([0,1,2].map(function(i){return x[i]+(y[i]-x[i])*t}))}
function sh(c,t){return t<0?mix(c,'#000000',-t):mix(c,'#ffffff',t)}
function lum(c){var a=hx(c).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]}
function cr(a,b){var x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function ink(c){return cr(c,'#FFFFFF')>=cr(c,'#0B1220')?'#FFFFFF':'#0B1220'}
function on(bg,want){return cr(bg,want)>=2.6?want:ink(bg)}
function fit(t,w,mx,r){return Math.max(9,Math.min(mx,w/(Math.max(String(t).length,1)*(r||.62)))).toFixed(1)}
function wrap(t,n){var w=String(t).split(/\\s+/),l=[''],i;for(i=0;i<w.length;i++){var c=l[l.length-1];if(c&&(c+' '+w[i]).length>n){if(l.length===2){l[1]=(l[1]+' '+w.slice(i).join(' ')).slice(0,n+2);break}l.push(w[i])}else l[l.length-1]=c?c+' '+w[i]:w[i]}return l}
var FF='';
function T(x,y,s,size,fill,wt,anc,ls,ex){return'<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+(wt||800)+'" fill="'+fill+'" text-anchor="'+(anc||'middle')+'" letter-spacing="'+(ls||0)+'" font-family="'+FF+'"'+(ex||'')+'>'+esc(s)+'</text>'}
function TL(x,y,lines,size,fill,wt,lh,anc){var o='';for(var i=0;i<lines.length;i++)o+=T(x,y+i*lh,lines[i],size,fill,wt,anc);return o}
function star(){var p=[],i;for(i=0;i<10;i++){var r=i%2?.45:1,a=Math.PI/5*i-Math.PI/2;p.push((Math.cos(a)*r).toFixed(3)+' '+(Math.sin(a)*r).toFixed(3))}return'M'+p.join('L')+'Z'}
var MK={leaf:'M0 -1C.85 -.55 .85 .55 0 1C-.85 .55 -.85 -.55 0 -1Z',bolt:'M.25 -1L-.65 .15H-.05L-.3 1L.65 -.2H.05Z',peak:'M-1 .7L-.3 -.55L.05 .05L.38 -.3L1 .7Z',drop:'M0 -1C.45 -.4 .75 0 .75 .3A.75 .75 0 0 1 -.75 .3C-.75 0 -.45 -.4 0 -1Z',star:star()};
function mark(k,x,y,s,fill){if(k==='circle')return'<circle cx="'+x+'" cy="'+y+'" r="'+s+'" fill="'+fill+'"/>';return'<path transform="translate('+x+' '+y+') scale('+s+')'+(k==='leaf'?' rotate(30)':'')+'" d="'+MK[k]+'" fill="'+fill+'"/>'}
function slug(n){return(String(n).toLowerCase().replace(/[^a-z0-9]+/g,'')||'yourbrand')}
function render(){
var name=(g('pd-name').value.trim()||'Your Brand'),tag=g('pd-tagl').value.trim(),c1=g('pd-c1').value,c2=g('pd-c2').value,bgk=g('pd-bg').value,p=rv('pd-prod')||'box',mk=rv('pd-mark')||'bolt';
FF=FONTS[g('pd-font').value]||FONTS.sans;
var b1,b2,wm;if(bgk==='dark'){b1='#1E293B';b2='#0B1220'}else if(bgk==='tint'){b1=mix(c1,'#ffffff',.82);b2=mix(c1,'#ffffff',.62)}else{b1='#F8FAFC';b2='#E2E8F0'}
wm=ink(b2)==='#FFFFFF'?'#CBD5E1':'#475467';
var tl=wrap(tag,18),o='',i1=ink(c1),i2=ink(c2),ac=on(c1,c2);
o+='<defs><linearGradient id="pdbg" x2="0" y2="1"><stop offset="0" stop-color="'+b1+'"/><stop offset="1" stop-color="'+b2+'"/></linearGradient><linearGradient id="pdsh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".48" stop-color="#fff" stop-opacity=".22"/><stop offset=".68" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient><radialGradient id="pdso"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><clipPath id="pdscr"><rect x="222" y="38" width="156" height="374" rx="24"/></clipPath></defs>';
o+='<rect width="600" height="450" fill="url(#pdbg)"/>';
if(p==='box'){
o+='<ellipse cx="305" cy="372" rx="170" ry="16" fill="url(#pdso)"/><polygon points="190,120 250,88 430,88 370,120" fill="'+sh(c1,.28)+'"/><polygon points="370,120 430,88 430,328 370,360" fill="'+sh(c1,-.28)+'"/><rect x="190" y="120" width="180" height="240" fill="'+c1+'"/>';
o+=mark(mk,280,180,30,ac)+T(280,250,name,fit(name,160,34),i1,900)+TL(280,276,tl,13,i1,600,17)+'<rect x="190" y="318" width="180" height="26" fill="'+c2+'"/>'+T(280,336,'NET WT 12 OZ',10,i2,800,'middle',2)+mark(mk,400,214,16,ac);
}else if(p==='bottle'){
o+='<ellipse cx="300" cy="384" rx="90" ry="12" fill="url(#pdso)"/><rect x="268" y="74" width="64" height="40" rx="7" fill="'+c2+'"/><path d="M276 112V150Q240 168 240 206V352Q240 378 266 378H334Q360 378 360 352V206Q360 168 324 150V112Z" fill="'+sh(c1,-.15)+'"/><path d="M276 112V150Q240 168 240 206V352Q240 378 266 378H334Q360 378 360 352V206Q360 168 324 150V112Z" fill="url(#pdsh)"/>';
o+='<rect x="248" y="218" width="104" height="124" rx="4" fill="'+c2+'"/>'+mark(mk,300,250,18,on(c2,c1))+T(300,296,name,fit(name,92,22),i2,900)+TL(300,316,wrap(tag,15),9.5,i2,600,12)+'<rect x="254" y="176" width="9" height="180" rx="4.5" fill="#fff" opacity=".25"/>';
}else if(p==='can'){
o+='<ellipse cx="300" cy="380" rx="90" ry="12" fill="url(#pdso)"/><rect x="232" y="100" width="136" height="264" fill="'+c1+'"/><rect x="232" y="300" width="136" height="34" fill="'+c2+'"/>';
o+=mark(mk,300,168,26,ac)+T(300,238,name,fit(name,118,30),i1,900)+TL(300,262,wrap(tag,17),10.5,i1,600,14)+T(300,322,'12 FL OZ',10,i2,800,'middle',2);
o+='<rect x="232" y="100" width="136" height="264" fill="url(#pdsh)"/><ellipse cx="300" cy="364" rx="68" ry="12" fill="'+sh(c1,-.35)+'"/><ellipse cx="300" cy="100" rx="68" ry="13" fill="#E5E7EB"/><ellipse cx="300" cy="100" rx="58" ry="9" fill="#9CA3AF"/><rect x="290" y="94" width="22" height="7" rx="3.5" fill="#D1D5DB"/>';
}else if(p==='tee'){
var tp='M238 70L192 88L132 142L170 190L204 166V396H396V166L430 190L468 142L408 88L362 70Q300 110 238 70Z';
o+='<ellipse cx="300" cy="404" rx="150" ry="10" fill="url(#pdso)"/><path d="'+tp+'" fill="'+c1+'"/><path d="'+tp+'" fill="url(#pdsh)" opacity=".7"/><path d="M238 70Q300 110 362 70" fill="none" stroke="'+sh(c1,-.25)+'" stroke-width="8"/>';
o+=mark(mk,300,192,30,ac)+T(300,262,name,fit(name,170,36),i1,900)+TL(300,288,tl,12,i1,600,16);
}else if(p==='card'){
o+='<g transform="rotate(-7 250 190)"><rect x="104" y="104" width="300" height="172" rx="14" fill="#000" opacity=".18" transform="translate(5 8)"/><rect x="104" y="104" width="300" height="172" rx="14" fill="'+c1+'"/>'+mark(mk,166,166,34,ac)+'</g>';
o+='<g transform="rotate(5 360 270)"><rect x="200" y="186" width="300" height="172" rx="14" fill="#000" opacity=".2" transform="translate(5 8)"/><rect x="200" y="186" width="300" height="172" rx="14" fill="#FFFFFF"/><rect x="200" y="186" width="12" height="172" fill="'+c1+'"/>'+mark(mk,246,226,16,c1)+T(272,233,name,fit(name,200,22),'#0B1220',900,'start')+T(232,262,tag,fit(tag,250,12),'#475467',600,'start')+T(232,312,'Jordan Lee  \\u00b7  Founder',12,'#0B1220',700,'start')+T(232,332,'(555) 010-0123  \\u00b7  '+slug(name)+'.com',10.5,'#475467',600,'start')+'<circle cx="470" cy="326" r="9" fill="'+c2+'"/></g>';
}else if(p==='sign'){
var gb=bgk==='dark'?'#14532D':'#65A30D';o+='<path d="M0 352Q300 330 600 352V450H0Z" fill="'+gb+'"/><ellipse cx="300" cy="390" rx="150" ry="8" fill="#000" opacity=".25"/><rect x="222" y="300" width="7" height="92" fill="#64748B"/><rect x="371" y="300" width="7" height="92" fill="#64748B"/>';
var st=lum(c1)>.55?'#0B1220':c1;
o+='<rect x="156" y="92" width="300" height="214" rx="8" fill="#000" opacity=".15"/><rect x="150" y="86" width="300" height="214" rx="8" fill="#FFFFFF"/><path d="M150 94a8 8 0 0 1 8-8h284a8 8 0 0 1 8 8v62H150z" fill="'+c1+'"/>'+mark(mk,186,121,18,ac)+T(216,131,name,fit(name,220,30),i1,900,'start');
o+=TL(300,196,wrap(tag,22),20,st,800,26)+'<path d="M150 266h300v26a8 8 0 0 1-8 8H158a8 8 0 0 1-8-8z" fill="'+c2+'"/>'+T(300,288,slug(name)+'.com',14,i2,800);
}else{
o+='<ellipse cx="300" cy="428" rx="120" ry="10" fill="url(#pdso)"/><rect x="212" y="28" width="176" height="394" rx="32" fill="#0B1220"/><g clip-path="url(#pdscr)"><rect x="222" y="38" width="156" height="374" fill="#FFFFFF"/><rect x="222" y="38" width="156" height="140" fill="'+c1+'"/>';
o+=mark(mk,300,92,18,ac)+T(300,138,name,fit(name,132,22),i1,900)+T(300,158,tag,fit(tag,140,10.5,.55),i1,600);
o+='<rect x="236" y="194" width="128" height="74" rx="10" fill="#F1F5F9"/>'+mark(mk,270,231,16,c1)+'<rect x="294" y="220" width="56" height="7" rx="3.5" fill="#CBD5E1"/><rect x="294" y="234" width="40" height="7" rx="3.5" fill="#E2E8F0"/><rect x="236" y="282" width="128" height="7" rx="3.5" fill="#CBD5E1"/><rect x="236" y="296" width="96" height="7" rx="3.5" fill="#E2E8F0"/><rect x="236" y="310" width="110" height="7" rx="3.5" fill="#E2E8F0"/>';
o+='<rect x="236" y="336" width="128" height="34" rx="17" fill="'+c2+'"/>'+T(300,358,'Shop now',13,i2,800)+'<rect x="222" y="384" width="156" height="28" fill="#F8FAFC"/></g><rect x="276" y="44" width="48" height="10" rx="5" fill="#0B1220"/>';
}
o+=T(588,438,'Concept mockup \\u00b7 eyetoad.com',10,wm,600,'end');
var lab='Mockup preview: '+NAMES[p]+' for '+name+(tag?', tagline '+tag:'');
out.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450" role="img" aria-label="'+esc(lab)+'">'+o+'</svg>';
}
f.addEventListener('input',function(e){if(e.target&&(e.target.id==='pd-c1'||e.target.id==='pd-c2')){var r=f.querySelector('input[name=pd-pal]:checked');if(r)r.checked=false}else if(e.target&&e.target.name==='pd-pal'){var c=PAL[e.target.value];if(c){g('pd-c1').value=c[0];g('pd-c2').value=c[1]}}render()});
f.addEventListener('change',render);
f.addEventListener('submit',function(e){e.preventDefault()});
function pick(n){var a=f.querySelectorAll('input[name='+n+']');var r=a[Math.floor(Math.random()*a.length)];r.checked=true;return r}
g('pd-rand').addEventListener('click',function(){var r=pick('pd-pal');var c=PAL[r.value];g('pd-c1').value=c[0];g('pd-c2').value=c[1];pick('pd-prod');pick('pd-mark');var fs=g('pd-font');fs.selectedIndex=Math.floor(Math.random()*fs.options.length);render();g('pd-status').textContent='New combination: '+NAMES[rv('pd-prod')]+', '+r.value+' palette.'});
g('pd-dl').addEventListener('click',function(){var st=g('pd-status');try{var svg=out.querySelector('svg');var s=new XMLSerializer().serializeToString(svg);var img=new Image();img.onload=function(){try{var c=document.createElement('canvas');c.width=1200;c.height=900;c.getContext('2d').drawImage(img,0,0,1200,900);var fn=slug(g('pd-name').value)+'-'+(rv('pd-prod')||'mockup')+'-mockup.png';c.toBlob(function(b){if(!b){st.textContent='Sorry, this browser could not make the PNG.';return}var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);st.textContent='Saved '+fn+' (1200 x 900).'},'image/png')}catch(err){st.textContent='Sorry, this browser could not make the PNG.'}};img.onerror=function(){st.textContent='Sorry, this browser could not make the PNG.'};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}catch(err){st.textContent='Sorry, this browser could not make the PNG.'}});
render();
})();`,
};
