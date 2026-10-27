// /get-booked-by-ai-agents/  targets: get booked by ai agents, agentic booking setup, ai booking for service business, make my business bookable by chatgpt
// Pricing: the setup is CALL FOR A QUOTE. Only existing posted prices are quoted here ($100/task a la carte, $297/$750 audit, $497+$97 Launch Kit, $500-$3,000/mo campaigns). Doorhanger.ai's own plan price is NOT stated (it lives on their site).
export default {
  path: '/get-booked-by-ai-agents/',
  prefix: 'gba',
  date: '2026-10-27',
  title: 'Get Booked by AI Agents | Agentic Booking Setup in Denver',
  description: 'Agentic booking setup for Denver businesses: one identity, price ranges, live availability, a booking rail, a one-minute confirmation. Quoted per business.',
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  eyebrow: 'Agentic booking setup &middot; Denver service businesses &middot; Quoted per business',
  h1: 'Get booked by AI agents: the setup that turns <em>&ldquo;they recommended you&rdquo; into a job on the calendar.</em>',
  kick: 'We make your business something an assistant can quote and book without a phone call, on the rail that fits your trade, and we wire the booking to a human who answers in a minute.',
  sub: 'ChatGPT books restaurants and salons through OpenTable, Resy, Yelp and Booksy. Google AI Mode books restaurants worldwide and announced local service booking and calling agents for U.S. users in May 2026. Tool-reading agents book through a business&rsquo;s own endpoint. Every one of them needs the same five things from you, and most Denver businesses have two. This is the service that supplies the other three.',
  cta2: ['Get a quote', '/free-seo-audit/'],
  facts: [
    ['What it is', 'Identity, price ranges, availability, a booking rail and a one-minute confirmation'],
    ['Who it fits', 'Trades, clinics, salons, restaurants and studios in the Denver metro; others by phone'],
    ['Price', 'Quoted per business after a free readiness pass; posted-price pieces listed below'],
    ['Time', 'Most setups live in 2 to 4 weeks after access'],
    ['Guarantees', 'None on bookings or rankings; we show you what the assistants say before and after'],
  ],
  factsChip: 'At a glance',
  capsule: 'Agentic booking setup is the work of making a business bookable by AI assistants and agents: one consistent identity across listings and schema, published price ranges per service, live availability an agent can read, a booking method that is not a static form (a Reserve with Google partner, a platform app such as Booksy, or a private MCP booking endpoint for trades), and a confirmation to the customer within a minute. Eye To Ad Media sets it up for Denver service businesses and quotes it per business after a free readiness pass; the pieces with posted prices are the schema and page fixes at $100 a task on the <a href="/seo-a-la-carte/">&agrave; la carte menu</a> and the <a href="/ai-readiness-audit/">readiness audit</a> at $297 or $750.',
  sections: [
    `<div class="k-chip">The five pieces</div>
<h2 class="k-h" id="gba-h2a">What an agent needs before it will <em>open your calendar.</em></h2>
<p class="k-lead">We laid out the platform-by-platform picture in <a href="/blog/ai-agents-booking-denver-service-businesses/">how AI agents book Denver service businesses</a>. Whatever the platform, the inputs are the same five. The setup supplies each one, in order, and you get an email as each goes live.</p>
<div class="k-grid3 gba-parts">
<div class="k-card"><p class="k-num">1</p><h3 class="k-h3">One identity</h3><p>Name, phone, address or service area (towns and ZIPs), hours and services made identical across your website, Google Business Profile, Apple Business Connect, Bing Places, Yelp, Facebook and the directories, with LocalBusiness schema and sameAs links on the site. Agents run a consensus check first and drop businesses with conflicting hours or services. <b>Live within 5 business days.</b></p></div>
<div class="k-card"><p class="k-num">2</p><h3 class="k-h3">Price ranges the agent can repeat</h3><p>A sentence per service with the range and the variables that move it, on the service page and in Offer schema with a min and max price. Not a commitment to a number; the thing the assistant reads aloud instead of &ldquo;call for a quote.&rdquo; <b>Written with you from your price book; live within 7 business days.</b></p></div>
<div class="k-card"><p class="k-num">3</p><h3 class="k-h3">Availability an agent can read</h3><p>Online booking with real slots turned on in your scheduler (Jobber, Housecall Pro, ServiceTitan, Mindbody, Boulevard, Booksy, OpenTable, SevenRooms and others), or an availability endpoint connected to your calendar for trades without a partner rail. <b>Live within 10 business days of access.</b></p></div>
<div class="k-card"><p class="k-num">4</p><h3 class="k-h3">A booking rail, not a form</h3><p>For restaurants, salons and clinics: the Reserve with Google integration and the platform app confirmed live and tested from a logged-out browser and from AI Mode. For trades: a private booking endpoint (an MCP server, the open standard assistants use to connect to tools) that answers service area, quote and next open slots and takes the booking with the customer&rsquo;s approval. ReserveAction schema on every service page. <b>Live within 2 to 4 weeks.</b></p></div>
<div class="k-card"><p class="k-num">5</p><h3 class="k-h3">A confirmation within a minute</h3><p>Every booking texted to you and confirmed to the customer in seconds, with an instant reply for the hours nobody is at the desk and, if you want it, a disclosed AI assistant that calls the customer back within about a minute on the same system behind our Local Launch Kit. <b>Live with piece 4.</b></p></div>
<div class="k-card"><p class="k-num">&#10003;</p><h3 class="k-h3">The test</h3><p>We ask ChatGPT, Gemini, Claude and Google AI Mode, in plain words, to find a business like yours in your suburb, quote the job and book it, and we send you the transcripts before and after. That transcript is the deliverable. If an assistant still gives up at a stage, the report says which one and why.</p></div>
</div>`,

    `<section class="k-sec k-sec-off" aria-labelledby="gba-h2b"><div class="wrap">
<div class="k-chip">By trade</div>
<h2 class="k-h" id="gba-h2b">The rail depends on <em>what you sell.</em></h2>
<p class="k-lead">A restaurant has a table and a salon has a chair; both fit a calendar slot and both have partner rails the assistants already read. A water heater replacement needs a price, an area check and a yes from a dispatcher. The setup is different for each.</p>
<div class="gba-scroll"><table class="gba-tbl">
<caption class="gba-cap">Which rail, by business type (checked October 27, 2026)</caption>
<thead><tr><th scope="col">Business</th><th scope="col">Where agents book today</th><th scope="col">What we set up</th><th scope="col">What is still coming</th></tr></thead>
<tbody>
<tr><th scope="row">Restaurant, bar, cafe</th><td>ChatGPT via OpenTable, Resy, Yelp (Aug 10, 2026); Google AI Mode via Reserve with Google partners, worldwide (Apr 10, 2026)</td><td>Partner integration confirmed live on your profile, menu and hours consistent, prices in text, the Google &ldquo;Bookings and inquiries&rdquo; setting checked</td><td>Direct checkout in Gemini through Google&rsquo;s Universal Commerce Protocol for food delivery (May 2026)</td></tr>
<tr><th scope="row">Salon, barber, spa, studio</th><td>ChatGPT via Booksy (Oct 20, 2026); Google AI Mode via Booksy, Mindbody, Boulevard and other partners; wellness appointments in U.S. Labs since Nov 2025</td><td>Platform profile complete (services, hours, photos), Reserve with Google live, price list in text and schema</td><td>Broader AI Mode rollout of appointment booking outside Labs</td></tr>
<tr><th scope="row">Dentist, chiropractor, med spa, clinic</th><td>Yelp Assistant via Zocdoc (Apr 2026); Google AI Mode wellness appointments in Labs</td><td>Scheduler&rsquo;s Google integration confirmed with the vendor, procedure pages with price ranges and insurance facts, consistent service names everywhere</td><td>ChatGPT and Gemini healthcare booking apps</td></tr>
<tr><th scope="row">Plumber, HVAC, electrician, roofer, locksmith, garage door</th><td>Google announced local service booking and calling agents for U.S. users at I/O (May 2026); Google&rsquo;s AI already calls businesses for availability and pricing (since Jul 2025); tool-reading agents via a business&rsquo;s own endpoint</td><td>All five pieces, with a private booking endpoint connected to your price book and calendar, ReserveAction schema, and the call script for when Google&rsquo;s AI phones you</td><td>Formal ChatGPT and Gemini rails for trades</td></tr>
<tr><th scope="row">Auto repair, detailing, towing</th><td>Google&rsquo;s calling feature launched with auto repair in its first categories (2025); tool-reading agents via endpoint</td><td>Same as trades, plus hours and service list by location</td><td>Partner rails</td></tr>
</tbody></table></div>
<p class="k-p">For trades, the endpoint is the piece that turns a recommendation into a job today rather than when a rail opens. Our sister product <a href="https://doorhanger.ai/">Doorhanger.ai</a> runs it: a private MCP server and booking link per business that quotes from your price book, offers only real open slots, reads the price and time back to the customer before anything is booked, and texts you when a job comes in, with a choice between auto-confirm and approving each request. It publishes its own pricing and a 30-day trial on its site. We set it up and connect it as part of this service, or you can run it yourself and have us do the other four pieces.</p>
</div></section>`,

    `<section class="k-sec" aria-labelledby="gba-h2c"><div class="wrap">
<div class="k-chip">How it works</div>
<h2 class="k-h" id="gba-h2c">From a phone call to <em>bookable in two to four weeks.</em></h2>
<ol class="k-steps gba-steps">
<li class="k-step"><div><h3>The readiness pass (free)</h3><p>Call 1-800-481-8638 or send the <a href="/free-seo-audit/">free audit form</a>. We run the fifteen readiness checks, try to get an assistant to book you, and tell you which of the five pieces you already have. For some businesses the answer is &ldquo;turn on online booking in your scheduler and you are done,&rdquo; and we say so.</p></div></li>
<li class="k-step"><div><h3>The quote (within 2 business days)</h3><p>One fixed price for the pieces you need, in writing, with the dates. The posted-price parts are itemized: schema, FAQ schema, llms.txt and page fixes at $100 a task; the written audit at $297 if you want the full transcript set first. Booking endpoint and scheduler work are quoted per business because the vendors differ.</p></div></li>
<li class="k-step"><div><h3>Intake and access (day 1)</h3><p>Your services, the suburbs you serve, hours, license and insurance, your price book or your best ranges, and a secure way to share website, profile and scheduler access. Never type passwords into a form.</p></div></li>
<li class="k-step"><div><h3>Pieces 1 to 3 (days 1 to 10)</h3><p>Identity cleanup across listings and schema, price ranges written and published, online booking or the availability endpoint connected to your calendar.</p></div></li>
<li class="k-step"><div><h3>Pieces 4 and 5 (days 10 to 20)</h3><p>The booking rail confirmed or the endpoint live, ReserveAction schema on every service page, confirmations and instant replies wired, and the office briefed on what an agent-sourced booking looks like and how to honor a quoted range.</p></div></li>
<li class="k-step"><div><h3>The test and the handoff (day 20 to 30)</h3><p>The before-and-after transcripts from each assistant, the Google automated-calls settings checked, a one-page runbook for the office, and a &ldquo;how did you find us&rdquo; field with an AI option in your confirmation so you can count the jobs.</p></div></li>
</ol>
<p class="k-p">Dates count from the day we have your intake and access. If something on our side slips, we tell you before the date, not after.</p>
</div></section>`,

    `<section class="k-sec k-sec-off" aria-labelledby="gba-h2d"><div class="wrap">
<div class="k-chip">The fine print, up front</div>
<h2 class="k-h" id="gba-h2d">What it costs, <em>and what we will not promise.</em></h2>
<div class="k-grid2">
<div class="k-card"><h3 class="k-h3">What you pay</h3><p>The setup is quoted per business after the free readiness pass, as one fixed price in writing. The pieces with posted prices on this site are the schema and page fixes at $100 a task on the <a href="/seo-a-la-carte/">&agrave; la carte menu</a>, the <a href="/ai-readiness-audit/">readiness audit</a> at $297 or $750, and, for newer businesses, the <a href="/local-launch-kit/">Local Launch Kit</a> at $497 setup plus $97 a month, which includes the instant lead reply. Third-party scheduler and endpoint subscriptions are billed by those vendors at their own posted prices. One-time work is charged at order and all sales are final. Any recurring plan from us renews monthly until cancelled with 30 days&rsquo; written notice, online at <a href="https://eyetoad.com/cancel/">eyetoad.com/cancel</a> or by email to info@eyetoad.com. Seller: Search Converts LLC dba Eye To Ad Media.</p></div>
<div class="k-card"><h3 class="k-h3">What we commit to</h3><p>The five pieces, live, on the dates in your quote, which are our good-faith estimates, and the before-and-after transcripts. We do not guarantee that any assistant will book you, a number of bookings, or a ranking, because the platforms decide and they change the rules month to month. We will not publish fake availability, hidden prices or an endpoint that books without the customer hearing the price and time, and we will tell you plainly if your trade&rsquo;s rail is not open yet and the honest move is to wait on one piece.</p></div>
</div>
<p class="k-p">Already running a full SEO campaign with us? Most of this is in it; campaigns run $500 to $3,000 a month with AI search work included rather than billed separately, and the booking endpoint is the one add-on we quote. Want to check your own readiness first? Ask our AI assistant in the header what it can find about your business, or run the <a href="/blog/ai-readiness-checklist-local-business-2026/">fifteen checks</a> yourself.</p>
</div></section>`,
  ],
  faqH2: 'About getting booked by AI agents.',
  faq: [
    { q: 'Can an AI agent really book my business today?', a: 'For restaurants, salons, barbers, spas and clinics on a partner platform, yes: ChatGPT books through OpenTable, Resy, Yelp and Booksy, and Google AI Mode books through Reserve with Google partners. For trades, Google announced local service booking and calling agents for U.S. users in May 2026, Google&rsquo;s AI already phones businesses for availability and pricing, and tool-reading agents can book through a business&rsquo;s own endpoint now. What is not yet open is a formal ChatGPT or Gemini rail for a plumber; the endpoint is how a trade gets booked in the meantime.' },
    { q: 'What does the setup cost?', a: 'It is quoted per business after a free readiness pass, as one fixed price in writing. The pieces with posted prices are schema and page fixes at $100 a task, the readiness audit at $297 or $750, and the Local Launch Kit at $497 plus $97 a month for newer businesses. Scheduler and endpoint subscriptions are billed by those vendors at their own prices. We do not publish a package price because the work ranges from &ldquo;turn on online booking&rdquo; to a full five-piece build.' },
    { q: 'Do you guarantee bookings?', a: 'No, and be careful of anyone who does. The assistants decide whom to recommend and book, and their rules change month to month. We commit to the five pieces being live on the quoted dates and to showing you, in transcripts, what each assistant said before and after. That is the honest measure.' },
    { q: 'Will I have to publish my prices?', a: 'Ranges, with the variables named: &ldquo;$1,650 to $3,200 depending on tank size and venting.&rdquo; A range is not a promise of a number; it is the sentence the assistant reads aloud instead of &ldquo;call for a quote,&rdquo; which agents treat as a dead end. We write the ranges with you from your price book and your judgment, and we train the office on walking a customer from the range to the number.' },
    { q: 'What is a booking endpoint and do I need one?', a: 'A small private server, built on MCP (the open standard assistants use to connect to tools), that answers three questions for an agent: do you cover this ZIP, what does this job cost, and when can you come, then takes the booking with the customer&rsquo;s approval. Restaurants and salons do not need one because they have partner rails. Trades do, if they want to be booked before the formal rails open. Our sister product Doorhanger.ai runs it; you can use it with or without the rest of this service.' },
    { q: 'What happens when the booking arrives?', a: 'You get a text, the customer gets a confirmation in seconds, and if you choose it a disclosed AI assistant calls the customer within about a minute to confirm details. You can set the endpoint to auto-confirm real open slots or to hold each request for your approval. The office gets a one-page runbook, including how to honor a quoted range and how to record that the job came from an AI.' },
    { q: 'Which Google setting lets Google&rsquo;s AI book me?', a: 'In your Google Business Profile: Business Profile settings, then Advanced settings, under &ldquo;Google automated calls and text messages,&rdquo; the toggle &ldquo;Bookings and inquiries from customers.&rdquo; Your profile must be verified to change it. We check it as part of the setup, along with the other two toggles.' },
    { q: 'Do you need my passwords?', a: 'We need access to your website, your profiles and your scheduler for the pieces you order. After the quote we email a secure way to share it, or we work with your web person and your scheduler vendor directly. Please never put a password in a form or an email.' },
  ],
  related: [['AI readiness audit', '/ai-readiness-audit/'], ['SEO &agrave; la carte', '/seo-a-la-carte/'], ['AI agents for business', '/ai-agents-for-business/'], ['Google Business Profile management', '/google-business-profile-management/'], ['Local Launch Kit', '/local-launch-kit/']],
  band: ['Want to know which of the five pieces you are missing?', 'Call and tell us what you do and where. We will run the readiness pass while you are on the phone and tell you whether the setup is worth quoting.', ['Send a message', '/contact/']],
  service: {
    name: 'Agentic Booking Setup', types: ['AI agent booking setup', 'Agentic booking optimization', 'AI readiness implementation'], alt: ['Get booked by AI agents', 'AI booking setup for service businesses'],
    area: { '@type': 'City', name: 'Denver', containedInPlace: { '@type': 'State', name: 'Colorado' } },
  },
  style: `:root{--k-hbg:#0B1220}.gba-hero{background:radial-gradient(900px 500px at 82% 12%,rgba(249,115,22,.28),transparent 60%),radial-gradient(600px 400px at 8% 96%,rgba(37,99,235,.24),transparent 60%),#0B1220}
.gba-parts{margin-top:24px}.gba-parts .k-num{font-size:1.8rem}
.gba-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:22px;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.gba-tbl{width:100%;min-width:760px;border-collapse:collapse;font-size:.92rem}.gba-tbl th,.gba-tbl td{padding:12px 14px;border-bottom:1px solid #EEF0F3;text-align:left;vertical-align:top;line-height:1.5}
.gba-tbl thead th{background:#101828;color:#fff;font-weight:800}.gba-tbl tbody th{font-weight:700;color:#101828;min-width:160px}.gba-tbl td{color:#344054}.gba-tbl td:nth-child(3){background:#FFF7ED}.gba-tbl tbody tr:last-child>*{border-bottom:0}
.gba-cap{caption-side:top;text-align:left;padding:12px 14px 0;font-weight:600;font-size:.86rem;color:#475467}
.gba-steps{margin:24px 0 0;padding:0;list-style:none;max-width:860px}`,
};
