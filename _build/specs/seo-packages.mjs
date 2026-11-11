// /seo-packages/  Custom-first: a custom SEO plan up top (quick plan form + free 15-minute consult), then ready-made packages,
// then "Pick what you need": a priced service menu across everything Eye To Ad Media / Search Converts does, feeding one order form
// (with the EARTH movie ticket 3x SEO Match and a receipt upload). Nothing on this page takes payment except the existing
// Authorize.Net checkout on /seo-a-la-carte/ for $100 tasks (linked, not duplicated). Everything else is a request a person confirms.
// Confirmed posted prices (ok:1): $100 tasks, SEO $100-$5,000/mo, GBP $1,000/$1,800/$2,500, AI audit $297/$750, Local Launch Kit
// $497 + $97/mo, Review Booster $59/mo, websites from $99/mo, dashboards $500/$1,000/$2,500 a month. All other prices are DRAFTS
// from Nov 10 2026 market research for Zach to confirm (see _overnight-reports/2026-11-10-eyetoad-packages.md).
//   cd _build && node newpage.mjs specs/seo-packages.mjs && node apply-header.mjs
const URL = 'https://eyetoad.com/seo-packages/';
const TICKET = 'https://buy.stripe.com/eVqdR8br7blt1PCfUv1B600';
const ALC = '/seo-a-la-carte/#ac-b-h';

const PK = [
  { k: 'starter', name: 'Starter', price: '$500', per: 'per month', pick: { seo: 500 },
    best: 'One service or one area, done properly',
    work: ['Technical cleanup first, then one money page at a time', 'Local signals Google checks before it trusts a business', 'A plain-English report each month'],
    first: 'Search Console impressions: often 30 to 90 days', phone: 'Low-competition markets can see calls by months 4 to 6. Crowded ones take longer.' },
  { k: 'growth', name: 'Local Growth', price: '$2,000', per: 'per month', pick: { seo: 1000, gbp: 1000 }, tag: 'A strong start for most local service businesses',
    math: '$1,000 SEO + $1,000 Google Business Profile management',
    best: 'Service businesses that live and die by the map pack',
    work: ['Website SEO and your Google Business Profile, worked together', 'Reviews, photos, services and posts kept active', 'Calls and form leads tracked to the source'],
    first: 'Map views often move within weeks', phone: 'The map pack is usually the fastest route to the phone for a local business.' },
  { k: 'leader', name: 'Market Leader', price: '$4,300', per: 'per month', pick: { seo: 2500, gbp: 1800 },
    math: '$2,500 SEO + $1,800 aggressive local profile management',
    best: 'Crowded metro categories: legal, medical, home services',
    work: ['More pages, more depth and more of the market each month', 'Aggressive map-pack work across your service area', 'Conversion fixes so the traffic actually calls'],
    first: 'Early movement in 30 to 90 days', phone: 'Built for markets where page one is a fight. Expect a 6 to 12 month climb.' },
  { k: 'dominance', name: 'Dominance', price: '$7,500', per: 'per month + $750 once', pick: { seo: 5000, gbp: 2500, items: ['ai-dfy'] },
    math: '$5,000 SEO + $2,500 profiles for up to 3 locations + $750 AI search audit with fixes',
    best: 'Multi-location and regional businesses',
    work: ['The widest, fastest version of the work we do', 'Up to three locations in the map pack', 'AI answers (ChatGPT, Gemini, AI Overviews) checked and fixed up front'],
    first: 'Early movement in 30 to 90 days', phone: 'More markets covered at once, so more chances to ring. Still no shortcuts past Google.' },
  { k: 'fixit', name: 'Fix-It', price: '$100', per: 'per task, one time', pick: { items: ['fixit'] },
    best: 'A tight budget and a site with broken basics',
    work: ['One foundational fix per task: titles, schema, tracking, tappable phone, working forms', 'Done 24 to 72 hours after we get access', 'Pay by card now on the task page'],
    first: 'Day 1 to 3 after access', phone: 'Stops leaks. Calls and forms you were already losing can start arriving.', pay: ALC },
  { k: 'global', name: 'Enterprise & Global', price: 'Custom', per: 'quoted to the market', pick: null,
    best: 'National and international brands, and the most competitive keywords',
    work: ['Many markets, many keywords, many languages', 'AI agents, agentic commerce and custom tools built for you', 'Freelance specialists added as the campaign needs them'],
    first: 'Planned per market', phone: 'The hardest national terms, attorneys and finance among them, can take tens of thousands a month and a year or more.' },
];

const pkCards = PK.map((p) => `<article class="pk-card${p.tag ? ' pk-hot' : ''}" data-k="${p.k}">
${p.tag ? `<p class="pk-tag">${p.tag}</p>` : ''}
<h3 class="pk-name">${p.name}</h3>
<p class="pk-price"><b>${p.price}</b> <span>${p.per}</span></p>
${p.math ? `<p class="pk-math">${p.math}</p>` : ''}
<p class="pk-best">${p.best}</p>
<ul class="pk-work">${p.work.map((w) => `<li>${w}</li>`).join('')}</ul>
<dl class="pk-when"><div><dt>First signs</dt><dd>${p.first}</dd></div><div><dt>Your phone</dt><dd>${p.phone}</dd></div></dl>
<div class="pk-btns">${p.pick ? `<button type="button" class="pk-pick" data-pick='${JSON.stringify(p.pick)}'>Start with ${p.name}</button>${p.pay ? `<a class="pk-pay" href="${p.pay}">Pay by card now</a>` : ''}` : `<a class="pk-pick" href="#plan">Get a custom quote</a>`}</div>
</article>`).join('\n');

// ---------- the service menu ----------
// id, category, name, what it is, once $, monthly $, flags: f = "from" price, q = custom quote, x = can order more than one,
// ok = price already posted on eyetoad.com, pay = pay-by-card link (existing Authorize.Net checkout), a = more info link
const CATS = [
  ['consult', 'Consulting'], ['seo', 'SEO work'], ['content', 'Content & pages'], ['ai', 'AI search'], ['local', 'Maps & reviews'],
  ['web', 'Websites'], ['ads', 'Ads'], ['social', 'Social & email'], ['video', 'Video & voice-over'], ['agents', 'AI agents & calls'], ['big', 'Done-for-you'],
];
const I = (id, c, n, d, once, mo, fl = {}) => ({ id, c, n, d, once: once || 0, mo: mo || 0, ...fl });
const MENU = [
  // consulting
  I('c15', 'consult', 'Free 15-minute intro call', 'A quick call with a real strategist: where you are, what would move the needle, and whether we are a fit. No pitch deck.', 0, 0, { ok: 1, free: 1, a: '#consult' }),
  I('c1h', 'consult', 'Strategy hour with Zach', 'One focused hour with our founder on SEO, Google Maps, ads, AI search or your sales process. You leave with a written action list.', 500, 0),
  I('c2h', 'consult', '2-hour strategy block', 'Two hours to use in one session or split in two. Good for a full marketing review.', 950, 0),
  I('c5h', 'consult', '5-hour strategy block', 'Five hours to use over 90 days: planning, check-ins, reviewing your vendors and your numbers.', 2250, 0),
  I('cwork', 'consult', 'Half-day planning workshop', 'Four hours with you and your team, in Denver or by video. Ends with a 90-day plan and owners for each task.', 1800, 0),
  I('cplan', 'consult', '12-month marketing plan, written', 'Budget split, channels, timeline and the numbers to watch, written for your business and market.', 1500, 0),
  I('ccall', 'consult', 'Sales call and lead-handling audit', 'We review 10 recorded calls or lead replies and show where jobs slip away, with scripts to fix it.', 400, 0),
  I('ctrain', 'consult', 'Team training session (2 hours)', 'Your staff learns Google Business Profile posts, review requests, AI tools or lead follow-up.', 750, 0),
  I('cadv', 'consult', 'Monthly advisor', 'Two hours a month with Zach plus email access. A second brain on every marketing decision and vendor quote.', 0, 900),
  // seo work
  I('fixit', 'seo', 'Fix-It task (pick from 18)', 'One foundational fix: titles, schema, tracking, Search Console, tappable phone, working forms. Done 24 to 72 hours after access.', 100, 0, { ok: 1, x: 1, pay: ALC }),
  I('kw1', 'seo', 'Keyword research, one page', 'The searches one page should win, picked by intent and difficulty.', 100, 0, { ok: 1, x: 1, pay: ALC }),
  I('meta1', 'seo', 'Title + meta description, one page', 'What your Google listing says, rewritten to earn the click.', 100, 0, { ok: 1, x: 1, pay: ALC }),
  I('ga4', 'seo', 'Google Analytics 4 install', 'Tracking installed and tested, so you can see what is working.', 100, 0, { ok: 1, pay: ALC }),
  I('gsc', 'seo', 'Search Console setup + sitemap', 'Google told your site exists, sitemap submitted, errors visible.', 100, 0, { ok: 1, pay: ALC }),
  I('ctc', 'seo', 'Click-to-call + form test', 'Every phone number tappable and every form test-sent to make sure leads arrive.', 100, 0, { ok: 1, pay: ALC }),
  I('tech', 'seo', 'Technical SEO audit (up to 100 pages)', 'Crawl, indexing, speed, mobile, schema and duplicate issues, ranked by what costs you calls first.', 750, 0),
  I('techL', 'seo', 'Technical SEO audit (100 to 1,000 pages)', 'The same audit for bigger sites and stores, with a fix plan your developer can follow.', 1500, 0, { f: 1 }),
  I('kwmap', 'seo', 'Keyword research + site page map', 'Up to 25 target searches mapped to the page that should rank for each, plus the pages you are missing.', 450, 0),
  I('gap', 'seo', 'Competitor gap report', 'Your top 3 rivals: what they rank for that you do not, and the fastest gaps to close.', 400, 0),
  I('onpage', 'seo', 'On-page optimization, per page', 'Title, headings, copy, internal links, images and schema tuned on one existing page.', 150, 0, { x: 1 }),
  I('cwv', 'seo', 'Page speed / Core Web Vitals fix', 'Faster loading on phones: images, scripts, fonts and caching cleaned up.', 400, 0, { f: 1 }),
  I('schema', 'seo', 'Full-site schema markup', 'LocalBusiness, Service, FAQ and Breadcrumb structured data across the whole site.', 350, 0),
  I('links', 'seo', 'Internal linking overhaul', 'Links rebuilt so your money pages get found and carry weight.', 300, 0),
  I('redir', 'seo', '404 + redirect cleanup', 'Broken pages and old links redirected so you stop leaking visitors and link value.', 250, 0),
  I('migr', 'seo', 'Site move without losing rankings', 'Redirect map, before and after checks and monitoring when you change platform or domain.', 1200, 0, { f: 1 }),
  I('rank', 'seo', 'Rank tracking + monthly report', 'Your key searches and map positions tracked, with a plain-English monthly summary.', 0, 49),
  I('mon', 'seo', 'Technical monitoring', 'Weekly checks for downtime, broken pages, indexing drops and speed problems.', 0, 99),
  I('pr', 'seo', 'Link outreach and digital PR', 'Earned mentions on relevant sites, pitched by hand. No paid link schemes.', 0, 500, { f: 1 }),
  I('pen', 'seo', 'Spam or penalty recovery', 'Diagnosis and cleanup after a Google manual action or a big traffic drop.', 0, 0, { q: 1 }),
  I('intl', 'seo', 'Multi-language or international SEO', 'Language versions, hreflang and country targeting, planned per market.', 0, 0, { q: 1 }),
  // content
  I('post', 'content', 'SEO blog post (about 1,200 words)', 'Researched, written in your voice, linked into your site and formatted for AI answers.', 250, 0, { x: 1 }),
  I('pillar', 'content', 'Pillar guide (2,500+ words)', 'The definitive page on one topic in your industry, built to earn links and citations.', 600, 0, { x: 1 }),
  I('svcpg', 'content', 'New service page, written + built', 'One page for one thing you sell: copy, design, schema and a clear call button.', 350, 0, { x: 1 }),
  I('citypg', 'content', 'New city or area page, written + built', 'A genuinely local page for a place you serve. No copy-paste city spam.', 300, 0, { x: 1 }),
  I('faqhub', 'content', 'FAQ hub (20 answers + schema)', 'The questions customers really ask, answered straight and marked up for Google and AI.', 400, 0),
  I('refresh', 'content', 'Refresh an old post or page', 'Updated facts, better structure and new internal links on a page that used to perform.', 150, 0, { x: 1 }),
  I('copy', 'content', 'Website copywriting, per page', 'Clear, persuasive copy for one page, written to turn readers into calls.', 175, 0, { x: 1 }),
  I('cplan90', 'content', '90-day content plan', 'What to publish, in what order and why, tied to searches that bring buyers.', 500, 0),
  I('case', 'content', 'Customer case study', 'An interview with one happy customer turned into a proof page with real numbers.', 450, 0, { x: 1 }),
  I('press', 'content', 'Press release, written + published', 'A newsworthy release written for you and published on our press network.', 299, 0, { x: 1 }),
  I('cpack2', 'content', 'Content pack: 2 posts a month', 'Two researched posts every month, published and linked for you.', 0, 450),
  I('cpack4', 'content', 'Content pack: 4 posts a month', 'Four posts a month for faster topic coverage.', 0, 850),
  // ai search
  I('ai297', 'ai', 'AI search visibility audit (report)', 'How ChatGPT, Gemini, Perplexity and Google AI Overviews describe you, with a fix list. Five business days.', 297, 0, { ok: 1, a: '/ai-search-visibility-audit/' }),
  I('ai-dfy', 'ai', 'AI search audit + fixes done for you', 'The audit plus the top fixes done, and the answers re-checked 30 days later.', 750, 0, { ok: 1, a: '/ai-search-visibility-audit/' }),
  I('llms', 'ai', 'llms.txt + AI crawler file', 'A plain file that tells AI tools who you are and which pages matter.', 100, 0, { ok: 1, pay: ALC }),
  I('facts', 'ai', 'AI-readable business facts page', 'Hours, prices, service area and proof in a format AI assistants can quote.', 100, 0, { ok: 1, pay: ALC }),
  I('faqs', 'ai', 'FAQ block + FAQ schema', 'Question-and-answer section on one page with schema.', 100, 0, { ok: 1, x: 1, pay: ALC }),
  I('aimon', 'ai', 'AI answer monitoring', '25 buyer questions checked in ChatGPT, Gemini, Perplexity and AI Overviews every month, with changes flagged.', 0, 150),
  I('entity', 'ai', 'Business identity cleanup', 'Name, address, phone, hours and description made consistent across the top 40 sources AI tools read.', 400, 0),
  I('geopg', 'ai', 'AI-answer rewrite, per page', 'One page restructured so AI tools can lift a clean, correct answer about you.', 200, 0, { x: 1 }),
  I('agentbk', 'ai', 'Agent-ready booking setup', 'Online booking, Reserve with Google or a quote tool, so AI assistants can book you.', 500, 0, { f: 1 }),
  // maps & reviews
  I('gbpset', 'local', 'Google Business Profile setup + optimization', 'Categories, services, products, photos, Q&A and description done right once.', 350, 0),
  I('gbpfix', 'local', 'Profile suspension or verification help', 'We work the appeal or video verification with you until the profile is live.', 350, 0),
  I('kit', 'local', 'Local Launch Kit', 'For newer businesses: listings, a press release and review requests to get on the map.', 497, 97, { ok: 1, a: '/local-launch-kit/' }),
  I('rb', 'local', 'Review Booster', 'Automatic, honest review requests after every job.', 0, 59, { ok: 1, a: '/review-booster/' }),
  I('rresp', 'local', 'Review responses written for you', 'Every Google review answered within two business days, in your voice.', 0, 150),
  I('cite', 'local', 'Citation cleanup + build (50 listings)', 'Your business listed correctly on 50 directories and data sources.', 300, 0, { x: 1 }),
  I('apple', 'local', 'Apple Business Connect + Bing Places', 'Get found in Apple Maps, Siri and Bing with matching details.', 150, 0),
  I('lsa', 'local', 'Local Services Ads setup', 'Google Guaranteed or Screened: application, background checks, budget and service areas.', 500, 0),
  I('lsam', 'local', 'Local Services Ads management', 'Disputing bad leads, adjusting budget and keeping your ranking factors up.', 0, 300),
  I('photo', 'local', 'Photo and video shoot for your profile', 'Real photos of your team, trucks and jobs. Priced by location and time.', 0, 0, { q: 1 }),
  // websites
  I('sub', 'web', 'Custom-coded website, subscribe to own', 'A hand-coded site built to rank and ring, paid monthly instead of a big upfront fee.', 0, 99, { ok: 1, f: 1, a: '/custom-website-design/' }),
  I('lp', 'web', 'Landing page (one page)', 'A single page built for one offer or ad campaign, with tracking and a form.', 750, 0, { x: 1 }),
  I('site5', 'web', '5-page small business website', 'Home, services, about, reviews and contact, custom designed and SEO-ready.', 2500, 0),
  I('site10', 'web', 'Custom website, 10+ pages', 'A larger custom site with service and area pages, built for speed and search.', 5000, 0, { f: 1 }),
  I('shop', 'web', 'Online store', 'Products, checkout and shipping set up on the right platform for you.', 6000, 0, { f: 1 }),
  I('redesign', 'web', 'Redesign of your current site', 'Keep what ranks, fix what does not. Priced after we see the site.', 0, 0, { q: 1 }),
  I('care', 'web', 'Website care plan', 'Updates, backups, security checks and up to 1 hour of edits a month.', 0, 149),
  I('host', 'web', 'Managed hosting + SSL', 'Fast hosting, SSL and uptime monitoring handled for you.', 0, 29),
  I('edits', 'web', 'Website edits, 1-hour block', 'Text, photo, page and layout changes on your existing site.', 125, 0, { x: 1 }),
  I('ada', 'web', 'Accessibility check + fixes', 'WCAG checks for contrast, keyboard use, labels and alt text, with fixes made.', 400, 0, { f: 1 }),
  I('book', 'web', 'Online booking / scheduler setup', 'Customers book or request times from your site, synced to your calendar.', 350, 0),
  I('quote', 'web', 'Instant quote calculator', 'A price estimator on your site that captures the lead before showing the number.', 1200, 0, { f: 1 }),
  I('route', 'web', 'Lead form + CRM routing', 'Forms that send leads to your inbox, phone and CRM at the same time.', 250, 0),
  I('cro', 'web', 'Conversion review', 'Why visitors leave without calling, with a fix list ranked by impact.', 500, 0),
  I('email', 'web', 'Domain + business email setup', 'Your domain, branded email and the DNS records that keep it out of spam.', 150, 0),
  // ads
  I('gads', 'ads', 'Google Ads setup', 'Campaigns, keywords, negatives, ads and call and form conversion tracking.', 750, 0),
  I('gadsm', 'ads', 'Google Ads management', 'Weekly tuning and a monthly report. $500 a month, or 15% of ad spend if higher.', 0, 500, { f: 1 }),
  I('meta', 'ads', 'Facebook + Instagram ads setup', 'Audiences, creative, pixel and lead forms.', 500, 0),
  I('metam', 'ads', 'Facebook + Instagram ads management', 'Creative refreshes, audience tests and budget moves. $500 a month, or 15% of spend if higher.', 0, 500, { f: 1 }),
  I('retarg', 'ads', 'Retargeting setup', 'Ads that follow up with people who visited your site but did not call.', 400, 0),
  I('calltr', 'ads', 'Call tracking', 'Tracking numbers that show which ad, page or listing made the phone ring.', 150, 30),
  I('abtest', 'ads', 'Landing page A/B test', 'Two versions of your ad landing page tested until one clearly wins.', 500, 0),
  I('adaudit', 'ads', 'Ad account audit', 'Where your current ad spend is wasted and what to fix first.', 350, 0),
  I('yt', 'ads', 'YouTube video ads setup', 'Your video in front of local viewers, with targeting and tracking.', 500, 0),
  // social & email
  I('soc2', 'social', 'Social media management (2 platforms)', '12 posts a month, written and designed, with comments watched.', 0, 800),
  I('soc4', 'social', 'Social media management (4 platforms)', '20 posts plus 4 short videos a month across your main platforms.', 0, 1800),
  I('socset', 'social', 'Social profile setup (5 platforms)', 'Profiles created or cleaned up with matching branding and links.', 300, 0),
  I('news', 'social', 'Monthly email newsletter', 'Written, designed and sent to your list every month.', 0, 400),
  I('seq', 'social', 'Email follow-up sequence (5 emails)', 'Automatic follow-up for new leads or past customers.', 750, 0),
  I('sms', 'social', 'Text message follow-up setup', 'Opt-in text follow-up for quotes and appointments, set up compliantly.', 350, 0),
  I('brand', 'social', 'Brand kit refresh', 'Logo cleanup, colors and fonts so everything looks like one company.', 750, 0, { f: 1 }),
  I('print', 'social', 'Flyer, postcard or door hanger design', 'Print-ready design with a tracked phone number or QR code.', 150, 0, { x: 1 }),
  // video & voice
  I('tv30', 'video', '30-second commercial', 'Script, voice, music and edit for TV, streaming or YouTube, made in our Madwackd studio.', 2500, 0, { f: 1 }),
  I('spot15', 'video', '15-second social spot', 'A short ad cut for Reels, Shorts and pre-roll.', 750, 0),
  I('short', 'video', 'Short-form vertical video', 'One Reel, TikTok or Short from your footage or ours.', 250, 0, { x: 1 }),
  I('explain', 'video', 'Explainer video (60 to 90 seconds)', 'How your service works, told simply, for your site and Google Business Profile.', 3500, 0, { f: 1 }),
  I('vo', 'video', 'Professional voice-over (30-second spot)', 'Human voice-over for an ad, phone greeting or video.', 150, 0, { x: 1 }),
  I('gbpvid', 'video', 'Video pack for your Google profile (5 clips)', 'Short clips of your work and team, sized for Google Business Profile.', 400, 0),
  I('ytseo', 'video', 'YouTube channel + video SEO setup', 'Channel, titles, descriptions, chapters and schema so videos get found.', 300, 0),
  I('mv', 'video', 'Music video or brand anthem', 'Original song and video for your brand. Priced per project.', 0, 0, { q: 1, a: 'https://www.madwackd.ai/' }),
  // AI agents & calls
  I('agentplan', 'agents', 'Free AI agent plan', 'Where an AI agent would save you time or catch more leads, written up free.', 0, 0, { ok: 1, free: 1, a: '/free-ai-agent-plan/' }),
  I('chat', 'agents', 'Website AI chat assistant', 'Answers questions about your services, prices and hours 24/7 and hands you the lead.', 750, 99),
  I('rcpt', 'agents', 'AI phone receptionist', 'Answers your calls 24/7 in a natural voice, books or qualifies, and texts you the lead. Call volume affects the monthly.', 1500, 297, { f: 1 }),
  I('mctb', 'agents', 'Missed-call text-back', 'Every missed call gets an instant text so the lead does not call the next company.', 250, 49),
  I('toad', 'agents', 'Toad: a talking assistant for your website', 'A voice your visitors can talk to, trained on your business.', 0, 0, { q: 1, a: '/toad/' }),
  I('voiceint', 'agents', 'Voice agent tied into your CRM, calendar or phone system', 'Call handling that books into your real calendar and logs to your CRM. Scoped per system.', 0, 0, { q: 1 }),
  I('outbound', 'agents', 'Outbound AI calls (reminders, reactivation)', 'Appointment reminders and past-customer calls, set up within calling and consent rules.', 0, 0, { q: 1 }),
  I('speed', 'agents', 'Speed-to-lead replies', 'New web leads answered in seconds by text and email, day or night.', 0, 0, { q: 1, a: 'https://aispeedtoleads.com/' }),
  I('auto', 'agents', 'Workflow automation, per workflow', 'One busywork process automated: lead to CRM, invoice to sheet, review request after payment.', 350, 0, { x: 1 }),
  I('agent', 'agents', 'Custom AI agent build', 'An agent that does a real job in your business, human-approved where it counts.', 5000, 0, { f: 1, a: '/ai-agents-for-business/' }),
  I('dashK', 'agents', 'Custom dashboard: Keep-Alive', 'Monitoring, hosting and connector fixes, with up to 2 hours of changes a month.', 0, 500, { ok: 1, a: '/custom-business-dashboards/' }),
  I('dashG', 'agents', 'Custom dashboard: Growth', 'Up to 6 hours a month, including one new view or report every month.', 0, 1000, { ok: 1, a: '/custom-business-dashboards/' }),
  I('dashP', 'agents', 'Custom dashboard: Partner', 'Up to 16 hours a month, a monthly review call and priority on every change.', 0, 2500, { ok: 1, a: '/custom-business-dashboards/' }),
  // done-for-you
  I('bib', 'big', 'Business in a Box', 'We build and run a lead site for you and you keep a negotiated share. Terms in writing.', 0, 0, { q: 1, a: '/business-in-a-box/' }),
  I('lock', 'big', 'Industry Lockdown', 'A lead site for your industry and city on a domain we own, its calls sent to you.', 0, 0, { q: 1, a: '#lockdown' }),
  I('ent', 'big', 'Enterprise and global SEO', 'Many markets, many languages, the hardest keywords.', 0, 0, { q: 1, a: '/national-seo-company/' }),
  I('wl', 'big', 'White-label SEO for agencies', 'Your brand on the reports, our team doing the work.', 0, 0, { q: 1, a: '/white-label-seo/' }),
];

const money = (n) => '$' + Number(n).toLocaleString('en-US');
function priceText(it) {
  if (it.free) return 'Free';
  if (it.q) return 'Custom quote';
  const fr = it.f ? 'From ' : '';
  if (it.once && it.mo) return `${fr}${money(it.once)} + ${money(it.mo)}/mo`;
  if (it.mo) return `${fr}${money(it.mo)}/mo`;
  return `${fr}${money(it.once)}${it.x ? ' each' : ''}`;
}
const esc = (s) => s.replace(/&/g, '&amp;');
const menuHtml = MENU.map((it) => `<li class="sm-i" data-c="${it.c}" data-id="${it.id}"><div class="sm-t"><h3>${esc(it.n)}</h3><p>${esc(it.d)}${it.a ? ` <a href="${it.a}"${/^https?:/.test(it.a) ? ' target="_blank" rel="noopener"' : ''}>How it works</a>` : ''}</p></div><div class="sm-b"><b class="sm-p${it.q ? ' sm-q' : ''}">${priceText(it)}</b>${it.free && it.a ? `<a class="sm-add" href="${it.a}">${it.id === 'c15' ? 'Book it' : 'Get it'}</a>` : `<button type="button" class="sm-add" aria-pressed="false" data-id="${it.id}">${it.q ? 'Add to quote' : 'Add'}</button>`}${it.pay ? `<a class="sm-pay" href="${it.pay}">Pay by card now</a>` : ''}</div></li>`).join('\n');
const tabs = `<button type="button" class="sm-tab" aria-pressed="true" data-c="all">All <span>${MENU.length}</span></button>` + CATS.map(([k, n]) => `<button type="button" class="sm-tab" aria-pressed="false" data-c="${k}">${n} <span>${MENU.filter((m) => m.c === k).length}</span></button>`).join('');
const menuData = JSON.stringify(Object.fromEntries(MENU.map((m) => [m.id, [m.n, m.once, m.mo, m.f ? 1 : 0, m.q ? 1 : 0, m.x ? 1 : 0, m.c]])));

// ---------- hero: custom first ----------
const hero = `<section class="pk-hero" aria-labelledby="pk-h1">
<div class="wrap pk-hg">
<div class="pk-copy">
<p class="pk-eb">Custom plans &middot; packages &middot; service menu</p>
<h1 id="pk-h1">A custom SEO plan, built around your budget. <span class="pk-hand">Or pick a package.<svg viewBox="0 0 300 24" aria-hidden="true" preserveAspectRatio="none"><path d="M4 16C70 6 150 4 296 12"/></svg></span></h1>
<p class="pk-sub">Most clients get a plan made for their business, budget and goals, with every price in writing before anything starts. Rather choose yourself? Ready-made packages and a ${MENU.length}-item service menu are right below.</p>
<div class="pk-ctas"><a class="pk-go" href="#plan">Get my custom plan <span aria-hidden="true">&rarr;</span></a><a class="pk-alt" href="#consult">Free 15-minute consult</a><a class="pk-call" href="tel:18004818638"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>1-800-481-8638</a></div>
<p class="pk-jump">Jump to: <a href="#packages">Packages</a> <a href="#menu">Service menu</a> <a href="/match/" class="pk-earth">EARTH movie ticket = 3x your SEO</a></p>
<ul class="pk-proof" aria-label="Why people trust us"><li><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 5.0 from 60 Google reviews</li><li>A+ BBB accredited</li><li>Founder-led since 2012</li></ul>
</div>
<form class="pk-plan" id="plan" data-eta="lead" aria-labelledby="pk-plan-h" novalidate>
<p class="pk-plan-k">Free &middot; no obligation</p>
<h2 class="pk-plan-h" id="pk-plan-h">Get my custom plan</h2>
<label>Monthly budget<select name="budget" required><option value="">Pick a range</option><option>Under $500 a month</option><option>$500 to $1,500 a month</option><option>$1,500 to $3,000 a month</option><option>$3,000 to $7,500 a month</option><option>$7,500+ a month</option><option>Not sure yet</option></select></label>
<label>Main goal<select name="goal" required><option value="">Pick one</option><option>More phone calls</option><option>Show up in the Google map pack</option><option>Get named in AI answers (ChatGPT, Gemini)</option><option>A new or better website</option><option>Ads that pay for themselves</option><option>All of it, in the right order</option></select></label>
<div class="pk-plan-2"><label>Name<input name="name" autocomplete="name" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel" required></label></div>
<label>Email<input name="email" type="email" autocomplete="email"></label>
<label>Website (if you have one)<input name="website" inputmode="url" placeholder="yourbusiness.com"></label>
<p class="ob-hp" aria-hidden="true"><label>Leave this empty <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
<input type="hidden" name="_subject" value="Custom SEO plan request (seo-packages hero)">
<button type="submit" class="pk-plan-go">Send me my plan <span aria-hidden="true">&rarr;</span></button>
<p class="pk-plan-n">A real person replies within one business day with questions and a written plan. <a href="/privacy-policy/">Privacy</a></p>
</form>
</div>
</section>`;

// ---------- custom first: how it works + consults ----------
const sCustom = `<div class="k-chip">How a custom plan works</div>
<h2 class="k-h" id="pk-h2a">Tell us the budget and the goal. <em>We build the plan around both.</em></h2>
<ol class="pk-steps">
<li><b>15-minute call, free.</b> Your market, your numbers, what you have tried and what one new customer is worth to you.</li>
<li><b>A written plan with prices.</b> Where each dollar goes (SEO, Google Maps, AI search, website, ads, video, AI agents), what it can realistically do and when.</li>
<li><b>Start month to month.</b> Nothing is billed until you approve the scope. Change it any month as results come in.</li>
</ol>
<div class="pk-inc">
<div><h3>Every custom plan includes</h3><ul><li>A look at your market and your top 3 competitors</li><li>A 30, 90 and 180-day timeline in plain English</li><li>Your own dashboard: the work we do, rankings, calls and billing in one place</li><li>Our advertising tools, free for every SEO client</li><li>One founder-led team, not a call center</li></ul></div>
<div><h3>Budgets we build for</h3><ul><li><b>Under $500 a month:</b> fix the leaks, then one page or one map listing at a time</li><li><b>$500 to $3,000:</b> local SEO plus your Google Business Profile, worked together</li><li><b>$3,000 to $10,000:</b> more of your market at once, plus content, ads or video</li><li><b>$10,000+:</b> multi-location, national or global campaigns</li></ul></div>
</div>
<div class="pk-cons" id="consult">
<div class="pk-cons-l">
<p class="pk-plan-k">Talk it through first</p>
<h3 class="pk-cons-h">Free 15-minute consult</h3>
<p>Ask anything: SEO, Google Maps, AI search, websites, ads, AI voice agents. If we are not the right fit, we will tell you who is.</p>
<p class="pk-cons-paid"><b>Want more time?</b> Strategy sessions with our founder are $500 an hour, or in 2-hour ($950) and 5-hour ($2,250) blocks. <a href="#menu" data-cat="consult">See consulting options</a></p>
</div>
<form class="pk-cf" id="pkConsult" data-eta="lead" novalidate aria-label="Request a free 15-minute consult">
<div class="pk-plan-2"><label>Name<input name="name" autocomplete="name" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel" required></label></div>
<label>Email<input name="email" type="email" autocomplete="email" required></label>
<div class="pk-plan-2"><label>Best time to call<select name="best_time"><option>Weekday morning (MT)</option><option>Weekday midday (MT)</option><option>Weekday afternoon (MT)</option><option>Any time</option></select></label>
<label>Topic<select name="topic"><option>Not sure yet</option><option>SEO and rankings</option><option>Google Business Profile and maps</option><option>AI search (ChatGPT, Gemini)</option><option>Website</option><option>Ads</option><option>AI phone or chat agent</option><option>Video or commercials</option><option>Consulting</option></select></label></div>
<label>Website<input name="website" inputmode="url" placeholder="yourbusiness.com"></label>
<p class="ob-hp" aria-hidden="true"><label>Leave this empty <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
<input type="hidden" name="_subject" value="Free 15-minute consult request (seo-packages)">
<button type="submit" class="pk-plan-go">Request my free 15 minutes</button>
<p class="pk-plan-n">We call you to set a time, usually within one business day. Mountain Time, Monday to Friday.</p>
</form>
</div>`;

const sPackages = `<section class="k-sec k-sec-off" id="packages" aria-labelledby="pk-pk-h"><div class="wrap">
<div class="k-chip">Ready-made</div>
<h2 class="k-h" id="pk-pk-h">Prefer a package? <em>Pick one and go.</em></h2>
<p class="k-p">Each package is built from our published prices, so you can see exactly where the money goes. Start with one and change anything you like in the order below.</p>
<div class="pk-grid">
${pkCards}
</div>
<p class="pk-fine">Monthly plans renew each month until you cancel with 30 days&rsquo; written notice. All sales are final. Read the <a href="/purchase-terms/">purchase terms</a>. VIP members get 25% off SEO: <a href="/vip-marketing/">how VIP works</a>.</p>
</div></section>`;

const sMenu = `<section class="k-sec pk-bsec" id="menu" aria-labelledby="pk-m-h"><div class="wrap">
<div class="k-chip">Pick what you need</div>
<h2 class="k-h" id="pk-m-h">The service menu. <em>${MENU.length} things we do, priced.</em></h2>
<p class="k-p">Everything Eye To Ad Media and Search Converts do, from a $100 fix to a TV commercial. Add what you want, set your monthly SEO, and send it. A real person confirms the scope before anything is billed. Bigger or unusual jobs say <b>Custom quote</b>: add them and we price them for you.</p>
<form class="pb" id="pkOrder" data-eta="lead" novalidate>
<div class="pb-grid">
<div class="pb-picks">
<fieldset class="pb-f"><legend>Monthly SEO</legend>
<label class="pb-l" for="pbSeo">SEO each month: <output id="pbSeoOut" for="pbSeo">$0</output></label>
<input type="range" id="pbSeo" name="seo_monthly" min="0" max="5000" step="100" value="0">
<div class="pb-scale" aria-hidden="true"><span>$0</span><span>$5,000</span></div>
<p class="pb-hint">In $100 steps. More budget mostly means more of the same work, done wider and faster. <a href="/what-you-get/">How it scales</a></p>
<p class="pb-l pb-l2">Google Business Profile management</p>
<div class="pb-opts pb-opts-r">
<label><input type="radio" name="gbp" value="0" checked> None</label>
<label><input type="radio" name="gbp" value="1000"> One location <b>$1,000/mo</b></label>
<label><input type="radio" name="gbp" value="1800"> Aggressive <b>$1,800/mo</b></label>
<label><input type="radio" name="gbp" value="2500"> Up to 3 locations <b>$2,500/mo</b></label>
</div>
</fieldset>
<div class="sm" role="region" aria-label="Service menu">
<div class="sm-top"><label class="sm-s" for="smQ"><span class="sr">Search the menu</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg><input id="smQ" type="search" placeholder="Search: video, reviews, AI phone, landing page&hellip;" autocomplete="off"></label></div>
<div class="sm-tabs" role="group" aria-label="Menu categories">${tabs}</div>
<p class="sm-none" id="smNone" hidden>Nothing matches. Add a note below and we will price it, or call 1-800-481-8638.</p>
<ul class="sm-list" id="smList">
${menuHtml}
</ul>
</div>
</div>
<div class="pb-sum" aria-live="polite">
<p class="pb-sum-k">Your order</p>
<div class="pb-tot"><div><small>Each month</small><b id="pbMo">$0</b></div><div><small>One time</small><b id="pbOnce">$0</b></div><div><small>First month</small><b id="pbFirst">$0</b></div></div>
<p class="pb-match" id="pbPkg"></p>
<ul class="pb-list" id="pbList"><li class="pb-empty">Nothing yet. Add items from the menu or pick a package.</li></ul>
<p class="pb-qn" id="pbQn" hidden></p>
<p class="pb-fromn" id="pbFromN" hidden>&ldquo;From&rdquo; prices are starting points. We confirm the exact number before billing.</p>
<div class="pb-be">
<label for="pbVal">One new customer is worth</label>
<div class="pb-be-in"><span>$</span><input id="pbVal" type="number" min="0" step="50" value="1500" inputmode="numeric"></div>
<p id="pbBe"></p>
</div>
<a class="pb-jump" href="#pbYou">Send this order &darr;</a>
</div>
</div>
<div class="pb-you" id="pbYou">
<h3 class="pb-h3">Where should we send it?</h3>
<div class="pb-fields">
<label>Your name<input name="name" autocomplete="name" required></label>
<label>Business name<input name="business" autocomplete="organization" required></label>
<label>Email<input name="email" type="email" autocomplete="email" required></label>
<label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
<label>Website<input name="website" id="pbWeb" inputmode="url" placeholder="yourbusiness.com"></label>
<label>Industry and city<input name="industry_city" placeholder="e.g. roofing, Aurora CO"></label>
</div>
<div class="pb-earth" id="pbEarth">
<label class="pb-chk"><input type="checkbox" name="earth_match" id="pbMatch" value="yes"> <span><b>I have an EARTH movie ticket.</b> Apply <a href="/match/">the EARTH SEO Match</a>: we add SEO credit worth 2x what you pay for SEO, so your SEO work is tripled (up to $100,000 in credit, one per business, through January 1, 2027).</span></label>
<div class="pb-rc" id="pbRc" hidden>
<p class="pb-rc-x" id="pbMatchX"></p>
<label>Upload your ticket receipt (photo or PDF, up to 5 MB)<input type="file" name="attachment" id="pbRcFile" accept="image/*,application/pdf"></label>
<label>Or type the receipt or order number<input name="ticket_receipt_number" id="pbRcNum" autocomplete="off"></label>
<p class="pb-hint">No ticket yet? <a href="${TICKET}" target="_blank" rel="noopener">Buy an EARTH ticket</a>, then come back and attach the receipt. Credit is for SEO services only, has no cash value and is confirmed by our team. <a href="/match/#mt-terms">Full terms</a></p>
</div>
</div>
<label class="pb-chk"><input type="checkbox" name="industry_lockdown" id="pbLock" value="yes"> <span>Ask about an <a href="#lockdown">Industry Lockdown</a> for my industry and city</span></label>
<label class="pb-notes">Anything we should know? Something not on the menu?<textarea name="notes" rows="3"></textarea></label>
<p class="ob-hp" aria-hidden="true"><label>Leave this empty <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
<input type="hidden" name="_subject" value="SEO package order">
<input type="hidden" name="order_summary"><input type="hidden" name="monthly_total"><input type="hidden" name="one_time_total"><input type="hidden" name="quote_items">
<div class="pb-acts"><button type="submit" class="pb-send">Send my order to the team <span aria-hidden="true">&rarr;</span></button><a class="pb-pay" href="${ALC}">Only $100 tasks? Pay by card now</a></div>
<p class="pb-note" id="pbNote">No payment on this button. A real person checks your order, confirms the scope and prices any custom quotes, then sends a secure payment link, usually within one business day. We use your details only to reply about this order. <a href="/privacy-policy/">Privacy policy</a></p>
</div>
<div class="pb-done" id="pbDone" tabindex="-1" hidden><h3 class="pb-h3">Your order is with our team.</h3><p id="pbDoneSum"></p><p>A real person reviews it, usually within one business day. Want to talk now? <a href="tel:18004818638">Call 1-800-481-8638</a>.</p></div>
</form>
</div></section>`;

// What each piece of SEO can realistically do. Hedged on purpose.
const PIECES = [
  ['Click-to-call and form fixes', 'Day 1', 'Phone numbers become tappable and every form is test-sent.', 'Leads you were already losing can start reaching you the same day.'],
  ['Conversion fixes', 'Day 1', 'Clearer offer, stronger buttons, less friction on the pages people already visit.', 'More of today’s visitors call. No ranking change needed.'],
  ['Google Analytics 4 + Search Console', 'Day 1 to 3', 'Tracking installed and Google told your site exists.', 'No new calls by itself. You finally see what is working.'],
  ['Page speed and mobile', 'Day 1 for visitors', 'Pages load fast and work on phones.', 'Fewer people give up before they call. The ranking effect is usually small.'],
  ['Meta titles and descriptions', 'Days to weeks', 'What your listing says in Google, rewritten for searchers.', 'Can raise clicks from searches you already show up for.'],
  ['Schema markup', 'Weeks, after Google re-reads the page', 'Structured data that tells Google and AI what each page is.', 'Makes rich results possible. Google decides whether to show them.'],
  ['Internal linking', 'Weeks', 'Links between your pages so the important ones get found.', 'Helps your money pages carry more weight.'],
  ['Google Business Profile work', 'Often weeks', 'Categories, services, photos, posts and reviews kept active.', 'For local businesses, usually the fastest path to calls.'],
  ['Review system', 'Builds month by month', 'A steady, honest way to ask happy customers for reviews.', 'More reviews and recent ones help people choose you.'],
  ['New service and city pages', 'Indexed in days to weeks, ranking usually 3 to 6 months', 'A real page for each thing you sell and each place you serve.', 'Each page is another way in. Competitive terms take longer.'],
  ['AI search visibility', 'Months', 'Clear facts, llms.txt and structure AI tools can quote.', 'More chances to be named when someone asks ChatGPT or Gemini.'],
  ['Authority and mentions', 'Months', 'Press releases and mentions on relevant sites, including ones we own.', 'Trust builds slowly, and it lasts.'],
];
const pieces = PIECES.map((p) => `<tr><th scope="row">${p[0]}</th><td class="pk-t" data-l="When">${p[1]}</td><td data-l="What it is">${p[2]}</td><td data-l="For your phone">${p[3]}</td></tr>`).join('\n');
const sPieces = `<section class="k-sec k-sec-off" aria-labelledby="pk-pieces-h"><div class="wrap">
<div class="k-chip">Outcomes first</div>
<h2 class="k-h" id="pk-pieces-h">What each piece can realistically do. And when.</h2>
<p class="k-p">We start from the result you need: calls and form leads from real buyers. Here is what each kind of work can do for that, and roughly when. These are typical windows we see, not promises.</p>
<div class="pk-tw" tabindex="0" role="region" aria-label="SEO work, timing and impact table">
<table class="pk-table"><thead><tr><th scope="col">The work</th><th scope="col">When you might see it</th><th scope="col">What it is</th><th scope="col">What it can mean for your phone</th></tr></thead>
<tbody>
${pieces}
</tbody></table></div>
<p class="pk-fine">Google&rsquo;s own advice to business owners: expect an SEO to need <a href="https://www.seroundtable.com/google-give-seos-4-12-months-23419.html" rel="noopener" target="_blank">four months to a year</a> to make changes and see the benefit. Want a date for your budget? Try the <a href="/seo-time-machine/">SEO Time Machine</a>.</p>
</div></section>`;

const sAssets = `<section class="k-sec" aria-labelledby="pk-own-h"><div class="wrap">
<div class="k-chip">Unfair advantages</div>
<h2 class="k-h" id="pk-own-h">We already own part of the road you need.</h2>
<p class="k-p">We built our own sites and networks, and we test every tactic on our own companies first. When one fits your business, it goes to work for you.</p>
<div class="pk-own">
<div><h3>Business directories</h3><p>Listings on <a href="https://usabusinesssearch.com/" rel="noopener" target="_blank">USA Business Search</a> nationwide and <a href="https://cobusinesslist.com/" rel="noopener" target="_blank">CO Business List</a> in Colorado.</p></div>
<div><h3>Industry networks</h3><p>Restaurants on <a href="https://restaurantsseo.com/" rel="noopener" target="_blank">our restaurant network</a>. Contractors on <a href="https://advertisingforcontractors.com/" rel="noopener" target="_blank">Advertising for Contractors</a>.</p></div>
<div><h3>Press and news</h3><p>Releases published through <a href="https://pressreleaseforbusiness.com/" rel="noopener" target="_blank">Press Release for Business</a>.</p></div>
<div><h3>AI agents and speed to lead</h3><p>Instant replies to new leads with <a href="https://aispeedtoleads.com/" rel="noopener" target="_blank">AI Speed to Leads</a>, and custom agents from <a href="https://myaiagentarmy.com/" rel="noopener" target="_blank">My AI Agent Army</a>.</p></div>
<div><h3>TV-quality video</h3><p>Commercials and explainers made in <a href="https://www.madwackd.ai/" rel="noopener" target="_blank">Madwackd</a> studios.</p></div>
<div><h3>Your own site, built by us</h3><p>Custom-coded sites from $99/mo through <a href="/custom-website-design/">subscribe-to-own</a>, and sites we build in your industry (below).</p></div>
</div>
<p class="pk-fine">Placement on our sites means exposure to their visitors. It is not a promise of rankings, and we follow Google&rsquo;s link rules on every one of them.</p>
</div></section>`;

const sLock = `<section class="k-sec pk-lock" id="lockdown" aria-labelledby="pk-lock-h"><div class="wrap pk-lock-g">
<div>
<div class="k-chip">Industry Lockdown</div>
<h2 class="k-h" id="pk-lock-h">Don&rsquo;t see your industry? <em>Lock it down.</em></h2>
<p class="k-p">We build a lead site for your industry in your city, on a domain we own. While you are the business on it, its calls and forms go to you. One business per industry per area.</p>
<ul class="pk-lock-l">
<li><b>Short on budget?</b> We may build it anyway, at our cost. You pay nothing up front.</li>
<li><b>We own the site.</b> We keep the asset, and we may keep it long term.</li>
<li><b>Terms in writing first.</b> How you pay for what it sends is agreed before anything goes live.</li>
</ul>
<p class="pk-fine">Availability depends on the industry and the area. A site we own is not a substitute for ranking your own website, so we usually pair the two. Want us to run the whole thing? See <a href="/business-in-a-box/">Business in a Box</a>.</p>
</div>
<div class="pk-lock-card">
<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="22" y="52" width="76" height="56" rx="10"/><path d="M38 52V38a22 22 0 0 1 44 0v14"/><circle cx="60" cy="78" r="8"/><path d="M60 86v10"/></svg>
<p>Check if your industry and city are open.</p>
<button type="button" class="pk-lock-go" id="pkLockGo">Ask about a Lockdown</button>
</div>
</div></section>`;

const sHonest = `<section class="k-sec k-sec-off" aria-labelledby="pk-hon-h"><div class="wrap pk-hon-g">
<div>
<div class="k-chip">The honest part</div>
<h2 class="k-h" id="pk-hon-h">Nobody can promise you page one. Including us.</h2>
<p class="k-p">Google changes its systems constantly. AI search changes even faster. Your competitors move too. Anyone who guarantees rankings is guessing. Google says it plainly in its own guide to hiring an SEO: <a href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo" rel="noopener" target="_blank">no one can guarantee a #1 ranking</a>.</p>
<p class="k-p">What we do promise: we treat your business like it is ours, we show you what we did and what it is doing for calls and leads, and we tell you straight when something isn&rsquo;t working.</p>
</div>
<div class="pk-scar" aria-labelledby="pk-scar-q">
<p class="pk-scar-q" id="pk-scar-q">How many SEO companies have let you down?</p>
<div class="pk-scar-b" role="group" aria-label="Pick one"><button type="button" data-n="0">0</button><button type="button" data-n="1">1</button><button type="button" data-n="2">2</button><button type="button" data-n="3">3+</button></div>
<p class="pk-scar-a" id="pkScarA" aria-live="polite">Tap a number.</p>
<a class="pk-scar-go" href="#plan">Get a plan built the honest way <span aria-hidden="true">&rarr;</span></a>
</div>
</div></section>`;

const FAQ = [
  { q: 'Do I have to pick a package?', a: 'No. Most clients get a custom plan built around their budget and goals, with every price in writing before anything starts. Packages and the service menu are there for people who would rather choose for themselves.' },
  { q: 'How much do SEO packages cost?', a: 'Ready-made packages run from $500 a month to $7,500 a month plus a one-time $750 for multi-location campaigns. Single fixes start at $100. Monthly SEO alone runs $100 to $5,000 a month in $100 steps. National and international campaigns are quoted to the market.' },
  { q: 'Is the free 15-minute consult really free?', a: 'Yes. It is a short call to understand your business and tell you honestly what would help. Longer strategy sessions with our founder are $500 an hour, or $950 for two hours and $2,250 for five.' },
  { q: 'What does the service menu cover?', a: 'SEO work, content, AI search, Google Business Profile and reviews, websites, Google and Facebook ads, social and email, video and voice-over, AI chat and phone agents, dashboards, consulting and done-for-you programs. Items marked Custom quote are priced after we see the job.' },
  { q: 'Can an AI agent answer my business phone?', a: 'Yes. An AI phone receptionist can answer 24/7, book or qualify callers and text you the lead. Simple setups have a starting price on the menu. Anything tied into your CRM, calendar or phone system, and outbound calling, is quoted per system.' },
  { q: 'How does the EARTH movie ticket offer work?', a: 'Buy any EARTH movie ticket, then send the receipt with your SEO order. We add SEO service credit worth twice what you pay for SEO, up to $100,000 per business, through January 1, 2027. Upload the receipt in the order form or type the receipt number. Full terms are on the EARTH SEO Match page.' },
  { q: 'Can I pay online?', a: 'The $100 Fix-It tasks can be paid by card right away on the SEO a la carte page. For everything else, send your order and we email a secure payment link after a real person confirms the scope.' },
  { q: 'How long does SEO take to work?', a: 'Some fixes help the same day, like tappable phone numbers and working forms. Rankings usually take months. Google tells business owners to expect four months to a year, and crowded markets can take longer.' },
  { q: 'Do you guarantee rankings or leads?', a: 'No. Nobody controls Google or AI search, and Google warns against anyone who guarantees a #1 ranking. We show you what we did and what it is doing for calls and leads every month.' },
  { q: 'Is there a contract?', a: 'Monthly plans run month to month. They renew until you cancel with 30 days&rsquo; written notice, and all sales are final. We still suggest giving SEO six months to a year, because stopping early resets much of the work.' },
];

// schema: only real, posted-or-listed prices; quotes and free items left out
const offers = [
  ...[['Starter SEO package', 500], ['Local Growth SEO package', 2000], ['Market Leader SEO package', 4300], ['Dominance SEO package', 7500]].map(([n, p]) => ({ '@type': 'Offer', name: n, priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p), priceCurrency: 'USD', unitCode: 'MON' } })),
  ...MENU.filter((m) => !m.q && !m.free && (m.once || m.mo)).map((m) => m.mo && !m.once
    ? { '@type': 'Offer', name: m.n, priceSpecification: { '@type': 'UnitPriceSpecification', ...(m.f ? { minPrice: String(m.mo) } : { price: String(m.mo) }), priceCurrency: 'USD', unitCode: 'MON' } }
    : { '@type': 'Offer', name: m.n, priceSpecification: { '@type': 'PriceSpecification', ...(m.f ? { minPrice: String(m.once) } : { price: String(m.once) }), priceCurrency: 'USD' } }),
];
const SVC = {
  '@type': 'Service', '@id': URL + '#service', name: 'Custom SEO plans, SEO packages and marketing services', serviceType: 'Search engine optimization',
  alternateName: ['SEO packages', 'custom SEO plan', 'SEO packages for small business', 'marketing service menu'],
  provider: { '@id': 'https://eyetoad.com/#organization' }, areaServed: { '@type': 'Place', name: 'Worldwide' }, url: URL,
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'SEO packages and service menu', itemListElement: offers },
};

export default {
  path: '/seo-packages/',
  prefix: 'pk',
  date: '2026-11-10',
  title: 'SEO Packages & Custom SEO Plans | Every Price Up Front',
  description: `Custom SEO plans built around your budget, ready-made SEO packages, and a ${MENU.length}-item priced service menu: SEO, AI search, maps, websites, ads, video, AI phone agents. Free 15-minute consult.`,
  crumbs: [['Services', 'https://eyetoad.com/services/']],
  h1: 'Custom SEO plans and SEO packages',
  heroHtml: hero,
  extraNodes: [SVC],
  capsule: `Eye To Ad Media builds most SEO plans custom, around each client&rsquo;s budget and goals, with every price in writing first and a free 15-minute consult. For people who prefer to choose, ready-made SEO packages run from $500 to $7,500 a month, single fixes start at $100, and a ${MENU.length}-item service menu prices SEO, AI search, Google Business Profile, websites, ads, video, AI phone agents and consulting ($500 an hour). No rankings are guaranteed. Call 1-800-481-8638.`,
  sections: [sCustom, sPackages, sMenu, sPieces, sLock, sAssets, sHonest],
  faqH2: 'Questions about plans, packages and the menu.',
  faq: FAQ,
  related: [['SEO &agrave; la carte (pay by card)', '/seo-a-la-carte/'], ['SEO pricing ranges', '/denver-seo-pricing/'], ['SEO Time Machine', '/seo-time-machine/'], ['What you get', '/what-you-get/'], ['The EARTH SEO Match', '/match/'], ['AI phone and chat agents', '/ai-agents-for-business/'], ['Guaranteed SEO: the red flag', '/blog/guaranteed-seo-red-flag/']],
  band: ['Rather just talk it through?', 'Tell us your budget and your goal. We will build the plan around both.', ['Get my custom plan', '#plan']],
  headExtra: `<link rel="preload" href="/fonts/caveat-700.woff2" as="font" type="font/woff2" crossorigin>`,
  style: `
@font-face{font-family:Caveat;font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/caveat-700.woff2) format("woff2")}
main .k-h em{color:#C2410C!important}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.pk-hero{position:relative;overflow:hidden;background:#FFFBF5;border-bottom:1px solid #F2E6D8;padding:30px 0 34px}
.pk-hero:before{content:"";position:absolute;inset:-30% -10% auto auto;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.16),rgba(249,115,22,0) 65%);pointer-events:none}
.pk-hg{position:relative;display:grid;grid-template-columns:1.2fr .9fr;gap:40px;align-items:start}
.pk-eb{display:inline-block;margin:0 0 12px;font:800 .76rem/1 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#C2410C;background:#FFEDD5;border:1px solid #FED7AA;padding:7px 11px;border-radius:6px}
.pk-hero h1{margin:0;font:800 clamp(1.95rem,3.9vw,3rem)/1.06 Inter,system-ui,sans-serif;letter-spacing:-.03em;color:#101828;max-width:18ch}
.pk-hand{position:relative;display:inline-block;font-family:Caveat,"Segoe Print",cursive;font-weight:700;color:#EA580C;font-size:1.1em;letter-spacing:0;white-space:nowrap;transform:rotate(-2deg)}
.pk-hand svg{position:absolute;left:0;right:0;bottom:-6px;width:100%;height:14px;overflow:visible}
.pk-hand path{fill:none;stroke:#DC2626;stroke-width:5;stroke-linecap:round;stroke-dasharray:320;stroke-dashoffset:320;animation:pkdraw 1.1s .5s ease-out forwards}
@keyframes pkdraw{to{stroke-dashoffset:0}}
.pk-sub{margin:14px 0 0;font:500 1.08rem/1.5 Inter,system-ui,sans-serif;color:#344054;max-width:46ch}
.pk-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.pk-go,.pk-alt,.pk-call{display:inline-flex;align-items:center;gap:8px;min-height:50px;padding:0 20px;border-radius:10px;font:800 1rem Inter,system-ui,sans-serif;text-decoration:none!important}
.pk-go{background:#C2410C;color:#fff!important;box-shadow:0 10px 24px rgba(194,65,12,.28)}
.pk-go:hover{background:#9A3412}
.pk-alt{background:#101828;color:#fff!important}
.pk-alt:hover{background:#1D4ED8}
.pk-call{background:#fff;color:#101828!important;border:2px solid #101828}
.pk-call svg{width:18px;height:18px}
.pk-jump{margin:14px 0 0;display:flex;flex-wrap:wrap;gap:6px 14px;font:600 .92rem Inter,system-ui,sans-serif;color:#475467}
.pk-jump a{color:#1D4ED8;font-weight:700}
.pk-jump .pk-earth{color:#047857}
.pk-proof{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px 18px;font:600 .88rem Inter,system-ui,sans-serif;color:#475467}
.pk-proof span{color:#B45309;letter-spacing:1px}
.pk-plan,.pk-cf{display:grid;gap:10px;background:#fff;border:2px solid #101828;border-radius:18px;padding:20px 20px 16px;box-shadow:10px 10px 0 #FED7AA}
.pk-plan label,.pk-cf label{display:grid;gap:5px;font:700 .86rem Inter,system-ui,sans-serif;color:#1D2939}
.pk-plan input,.pk-plan select,.pk-cf input,.pk-cf select{min-height:44px;border:1.5px solid #D0D5DD;border-radius:9px;padding:8px 11px;font:500 .98rem Inter,system-ui,sans-serif;color:#101828;background:#fff;width:100%;box-sizing:border-box}
.pk-plan-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pk-plan-k{margin:0;font:800 .74rem Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#047857}
.pk-plan-h{margin:-4px 0 2px;font:800 1.35rem Inter,system-ui,sans-serif;color:#101828}
.pk-plan-go{min-height:50px;border:0;border-radius:10px;background:#C2410C;color:#fff;font:800 1.02rem Inter,system-ui,sans-serif;cursor:pointer}
.pk-plan-go:hover{background:#9A3412}
.pk-plan-n{margin:0;font-size:.8rem;line-height:1.45;color:#475467}
.pk-steps{list-style:none;counter-reset:s;margin:22px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pk-steps li{counter-increment:s;position:relative;background:#fff;border:1.5px solid #E4E7EC;border-radius:14px;padding:18px 18px 18px 60px;font-size:.96rem;line-height:1.5;color:#344054}
.pk-steps li:before{content:counter(s);position:absolute;left:16px;top:16px;width:32px;height:32px;border-radius:50%;background:#101828;color:#fff;display:grid;place-items:center;font:800 1rem Inter,system-ui,sans-serif}
.pk-steps b{display:block;color:#101828;margin-bottom:2px}
.pk-inc{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.pk-inc>div{background:#F9FAFB;border-radius:14px;padding:18px 20px}
.pk-inc h3{margin:0 0 8px;font:800 1.05rem Inter,system-ui,sans-serif;color:#101828}
.pk-inc ul{margin:0;padding-left:18px;font-size:.95rem;line-height:1.55;color:#344054}
.pk-cons{display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:center;margin-top:26px;background:#ECFDF3;border:1.5px solid #ABEFC6;border-radius:18px;padding:24px}
.pk-cons-h{margin:4px 0 8px;font:800 1.5rem Inter,system-ui,sans-serif;color:#101828}
.pk-cons-l p{font-size:.98rem;line-height:1.55;color:#344054;margin:0 0 10px}
.pk-cons .pk-cf{box-shadow:8px 8px 0 #ABEFC6}
.pk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
.pk-card{position:relative;display:flex;flex-direction:column;background:#fff;border:1.5px solid #E4E7EC;border-radius:16px;padding:24px 22px}
.pk-hot{border:2px solid #F97316;box-shadow:0 14px 34px rgba(249,115,22,.14)}
.pk-tag{position:absolute;top:-13px;left:20px;margin:0;background:#C2410C;color:#fff;font:800 .74rem Inter,system-ui,sans-serif;padding:6px 10px;border-radius:6px}
.pk-name{margin:4px 0 6px;font:800 1.25rem Inter,system-ui,sans-serif;color:#101828}
.pk-price{margin:0;color:#475467;font:500 .92rem Inter,system-ui,sans-serif}
.pk-price b{font:800 2rem Inter,system-ui,sans-serif;color:#101828;letter-spacing:-.02em;margin-right:4px}
.pk-math{margin:6px 0 0;font:500 .84rem/1.4 Inter,system-ui,sans-serif;color:#475467}
.pk-best{margin:12px 0 0;font:700 .96rem/1.4 Inter,system-ui,sans-serif;color:#1D2939}
.pk-work{margin:12px 0 0;padding-left:18px;color:#344054;font-size:.94rem;line-height:1.5}
.pk-work li{margin:4px 0}
.pk-when{margin:14px 0 0;padding:12px 14px;background:#F9FAFB;border-radius:10px;font-size:.88rem;line-height:1.45}
.pk-when div+div{margin-top:8px}
.pk-when dt{font-weight:800;color:#101828}
.pk-when dd{margin:2px 0 0;color:#475467}
.pk-btns{margin-top:auto;padding-top:16px;display:flex;flex-direction:column;gap:8px}
.pk-pick,.pk-pay,.pb-send,.pb-pay,.pk-lock-go{display:inline-flex;justify-content:center;align-items:center;min-height:48px;padding:0 18px;border-radius:10px;font:800 .98rem Inter,system-ui,sans-serif;text-decoration:none!important;cursor:pointer;border:0;text-align:center}
.pk-pick{background:#101828;color:#fff!important}
.pk-pick:hover{background:#C2410C}
.pk-pay,.pb-pay{background:#fff;color:#1D4ED8!important;border:2px solid #1D4ED8}
.pb-you[hidden],.pb-done[hidden],.pb-rc[hidden],.sm-i[hidden],.sm-none[hidden],.pb-qn[hidden],.pb-fromn[hidden]{display:none!important}
.pk-fine{margin:18px 0 0;font-size:.88rem;line-height:1.55;color:#475467;max-width:80ch}
.pk-tw{margin-top:22px;overflow-x:auto;border:1.5px solid #E4E7EC;border-radius:14px;background:#fff}
.pk-table{width:100%;min-width:760px;border-collapse:collapse;font-size:.93rem;line-height:1.45}
.pk-table th,.pk-table td{padding:13px 14px;border-bottom:1px solid #EAECF0;text-align:left;vertical-align:top;color:#344054}
.pk-table thead th{background:#101828;color:#fff;font-weight:800;font-size:.84rem}
.pk-table tbody th{color:#101828;font-weight:800;width:22%}
.pk-table .pk-t{font-weight:700;color:#B42318;width:17%}
.pk-table tbody tr:last-child>*{border-bottom:0}
.pb{margin-top:24px}
.pb-grid{display:grid;grid-template-columns:1.35fr .8fr;gap:22px;align-items:start}
.pb-grid>*,.sm,.sm-t{min-width:0}
.pb-f{margin:0 0 16px;border:1.5px solid #E4E7EC;border-radius:14px;padding:16px 18px;background:#fff}
.pb-f legend{padding:0 6px;font:800 1rem Inter,system-ui,sans-serif;color:#101828}
.pb-l{display:block;font:700 .95rem Inter,system-ui,sans-serif;color:#1D2939;margin:0 0 8px}
.pb-l2{margin-top:16px}
.pb-l output{color:#B42318}
.pb input[type=range]{width:100%;accent-color:#C2410C;height:30px}
.pb-scale{display:flex;justify-content:space-between;font-size:.8rem;color:#475467}
.pb-hint{margin:8px 0 0;font-size:.86rem;color:#475467;line-height:1.45}
.pb-opts{display:grid;gap:8px;margin-top:6px}
.pb-opts-r{grid-template-columns:1fr 1fr}
.pb-opts label,.pb-chk{display:flex;gap:10px;align-items:flex-start;font-size:.95rem;color:#344054;line-height:1.35;cursor:pointer}
.pb-opts input,.pb-chk input{width:20px;height:20px;margin:0;flex:none;accent-color:#C2410C}
.pb-chk{margin-top:12px}
.sm{border:1.5px solid #E4E7EC;border-radius:14px;background:#fff;padding:14px}
.sm-s{display:flex;align-items:center;gap:8px;border:1.5px solid #D0D5DD;border-radius:10px;padding:0 12px;min-height:46px}
.sm-s svg{width:18px;height:18px;flex:none;fill:none;stroke:#475467;stroke-width:2.4;stroke-linecap:round}
.sm-s input{flex:1;border:0;outline:0;font:500 1rem Inter,system-ui,sans-serif;min-height:42px;background:none;color:#101828;min-width:0}
.sm-s:focus-within{border-color:#1D4ED8;box-shadow:0 0 0 3px rgba(29,78,216,.15)}
.sm-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}
.sm-tab{border:1.5px solid #D0D5DD;background:#F9FAFB;border-radius:999px;padding:7px 12px;font:700 .86rem Inter,system-ui,sans-serif;color:#1D2939;cursor:pointer}
.sm-tab span{font-weight:600;color:#475467;margin-left:2px}
.sm-tab[aria-pressed=true]{background:#101828;border-color:#101828;color:#fff}
.sm-tab[aria-pressed=true] span{color:#D0D5DD}
.sm-list{list-style:none;margin:0;padding:0;display:grid;gap:8px;max-height:720px;overflow:auto;overscroll-behavior:contain;padding-right:4px}
.sm-i{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;border:1.5px solid #EAECF0;border-radius:12px;padding:12px 14px}
.sm-i.on{border-color:#C2410C;background:#FFF7ED}
.sm-t h3{margin:0;font:800 .98rem/1.3 Inter,system-ui,sans-serif;color:#101828}
.sm-t p{margin:3px 0 0;font-size:.88rem;line-height:1.45;color:#475467}
.sm-t a{color:#1D4ED8;font-weight:700}
.sm-b{display:flex;flex-direction:column;align-items:flex-end;gap:6px;text-align:right;min-width:128px}
.sm-p{font:800 .98rem Inter,system-ui,sans-serif;color:#101828;white-space:nowrap}
.sm-q{color:#6941C6}
.sm-add{min-height:38px;padding:0 14px;border-radius:9px;border:2px solid #101828;background:#fff;color:#101828!important;font:800 .88rem Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none!important;display:inline-flex;align-items:center}
.sm-add[aria-pressed=true]{background:#101828;color:#fff!important}
.sm-pay{font:700 .8rem Inter,system-ui,sans-serif;color:#1D4ED8}
.sm-none{margin:6px 0;font-size:.95rem;color:#344054}
.pb-sum{position:sticky;top:76px;background:#101828;color:#fff;border-radius:16px;padding:20px 18px}
.pb-sum a{color:#FDBA74}
.pb-sum-k{margin:0 0 10px;font:800 .8rem Inter,system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:#FDBA74}
.pb-tot{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pb-tot div{background:rgba(255,255,255,.08);border-radius:10px;padding:10px 8px}
.pb-tot small{display:block;font-size:.74rem;color:#D0D5DD}
.pb-tot b{font:800 1.2rem Inter,system-ui,sans-serif;color:#fff}
.pb-match{min-height:1.2em;margin:10px 0 8px;font:700 .9rem Inter,system-ui,sans-serif;color:#86EFAC}
.pb-list{list-style:none;margin:0;padding:0;display:grid;gap:6px;max-height:300px;overflow:auto}
.pb-list li{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;background:rgba(255,255,255,.06);border-radius:8px;padding:7px 9px;font-size:.86rem;line-height:1.3;color:#F2F4F7}
.pb-list .pb-empty{display:block;background:none;padding:0;color:#D0D5DD}
.pb-list em{font-style:normal;font-weight:700;color:#FDBA74;white-space:nowrap}
.pb-list button{width:28px;height:28px;border:0;border-radius:6px;background:rgba(255,255,255,.14);color:#fff;font:800 .95rem Inter,system-ui,sans-serif;cursor:pointer}
.pb-qty{display:inline-flex;gap:4px;align-items:center}
.pb-qn,.pb-fromn{margin:10px 0 0;font-size:.84rem;line-height:1.45;color:#E9D7FE}
.pb-fromn{color:#D0D5DD}
.pb-be{margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.16)}
.pb-be label{font:700 .9rem Inter,system-ui,sans-serif;color:#F2F4F7}
.pb-be-in{display:flex;align-items:center;gap:6px;margin-top:6px}
.pb-be-in span{font-weight:800}
.pb-be-in input{width:120px;height:42px;border-radius:8px;border:0;padding:0 10px;font:800 1rem Inter,system-ui,sans-serif;color:#101828}
.pb-be p{margin:10px 0 0;font-size:.88rem;line-height:1.45;color:#F2F4F7}
.pb-jump{display:block;margin-top:14px;text-align:center;background:#FDBA74;color:#101828!important;border-radius:10px;padding:12px;font:800 .95rem Inter,system-ui,sans-serif;text-decoration:none!important}
.pb-you,.pb-done{margin-top:22px;background:#fff;border:2px solid #101828;border-radius:16px;padding:22px}
.pb-h3{margin:0 0 14px;font:800 1.25rem Inter,system-ui,sans-serif;color:#101828}
.pb-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pb-fields label,.pb-notes,.pb-rc label{display:grid;gap:6px;font:700 .9rem Inter,system-ui,sans-serif;color:#1D2939}
.pb-fields input,.pb-notes textarea,.pb-rc input{min-height:46px;border:1.5px solid #D0D5DD;border-radius:10px;padding:10px 12px;font:500 1rem Inter,system-ui,sans-serif;color:#101828;width:100%;box-sizing:border-box;background:#fff}
.pb-earth{margin-top:16px;background:#ECFDF3;border:1.5px solid #ABEFC6;border-radius:12px;padding:4px 14px 14px}
.pb-earth a{color:#047857;font-weight:700}
.pb-rc{display:grid;gap:10px;margin-top:12px}
.pb-rc-x{margin:0;font:800 .95rem Inter,system-ui,sans-serif;color:#054F31}
.pb-notes{margin-top:12px}
.ob-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.pb-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.pb-send{background:#C2410C;color:#fff;min-height:54px;font-size:1.05rem}
.pb-send:hover{background:#9A3412}
.pb-note{margin:12px 0 0;font-size:.85rem;color:#475467;line-height:1.5}
.pk-own{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
.pk-own>div{background:#fff;border:1.5px solid #E4E7EC;border-radius:14px;padding:18px}
.pk-own h3{margin:0 0 6px;font:800 1.02rem Inter,system-ui,sans-serif;color:#101828}
.pk-own p{margin:0;font-size:.93rem;line-height:1.5;color:#344054}
.pk-lock{background:#FFF7ED}
.pk-lock-g,.pk-hon-g{display:grid;grid-template-columns:1.4fr .8fr;gap:30px;align-items:center}
.pk-lock-l{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.pk-lock-l li{padding:12px 14px;background:#fff;border-left:4px solid #F97316;border-radius:8px;font-size:.96rem;line-height:1.45;color:#344054}
.pk-lock-l b{color:#101828}
.pk-lock-card{background:#fff;border:2px solid #101828;border-radius:18px;padding:24px;text-align:center;box-shadow:10px 10px 0 #BFDBFE}
.pk-lock-card svg{width:96px;height:96px;fill:none;stroke:#101828;stroke-width:6;stroke-linecap:round;stroke-linejoin:round}
.pk-lock-card svg rect{fill:#FDBA74}
.pk-lock-card p{margin:10px 0 14px;font:700 1rem Inter,system-ui,sans-serif;color:#101828}
.pk-lock-go{background:#1D4ED8;color:#fff;width:100%}
.pk-scar{background:#fff;border:2px solid #101828;border-radius:18px;padding:22px 20px;box-shadow:10px 10px 0 #FED7AA}
.pk-scar-q{margin:0 0 14px;font:800 1.2rem/1.25 Inter,system-ui,sans-serif;color:#101828}
.pk-scar-b{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.pk-scar-b button{min-height:54px;border:2px solid #D0D5DD;border-radius:12px;background:#F9FAFB;font:800 1.3rem Inter,system-ui,sans-serif;color:#101828;cursor:pointer}
.pk-scar-b button[aria-pressed="true"]{background:#101828;color:#fff;border-color:#101828}
.pk-scar-a{min-height:3.2em;margin:14px 0 10px;font:500 .98rem/1.45 Inter,system-ui,sans-serif;color:#344054}
.pk-scar-go{font:800 .98rem Inter,system-ui,sans-serif;color:#B42318}
@media (max-width:1000px){.pk-grid,.pk-own{grid-template-columns:1fr 1fr}.pb-grid,.pk-lock-g,.pk-hon-g,.pk-cons,.pk-hg{grid-template-columns:1fr}.pb-sum{position:static}.pk-steps{grid-template-columns:1fr}}
@media (max-width:760px){.pk-hero{padding:18px 0 26px}.pk-hero h1{font-size:clamp(1.75rem,8vw,2.3rem)}.pk-sub{font-size:1rem;margin-top:10px}.pk-ctas{margin-top:14px;gap:8px}.pk-go,.pk-alt{flex:1 1 100%;justify-content:center}.pk-call{flex:1 1 100%;justify-content:center}.pk-grid,.pk-own,.pb-fields,.pk-inc,.pb-opts-r{grid-template-columns:1fr}.pb-tot b{font-size:1.02rem}.pk-plan,.pk-cf,.pk-scar{box-shadow:6px 6px 0 #FED7AA}.pk-cons{padding:16px}.sm{padding:10px}.sm-i{grid-template-columns:1fr}.sm-b{flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between;text-align:left;min-width:0}.sm-list{max-height:none;overflow:visible}.sm-tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px}.sm-tab{flex:none}}
@media (max-width:420px){.pk-plan-2{grid-template-columns:1fr}}
@media (min-width:1061px) and (max-height:720px){.pk-hero{padding-top:18px}.pk-hero h1{font-size:2.5rem}.pk-sub{margin-top:10px}}
@media (min-width:761px) and (max-width:1000px){.pk-plan{max-width:560px}}
@media (prefers-reduced-motion:reduce){.pk-hand path{animation:none;stroke-dashoffset:0}}
`,
  script: String.raw`(function(){
var M=${menuData};
function $(i){return document.getElementById(i);}
function m(n){return '$'+Math.round(n).toLocaleString('en-US');}
/* scar counter */
var SAY={'0':'Lucky you. Let’s keep it that way: every price and timeline is on this page.','1':'One is enough. This time you see the price, the work and the timeline before you pay.','2':'Twice hurts. No long-term contract, no promises we can’t keep, and a real person on the phone.','3':'We get it. Our founder lost tens of thousands of dollars to agencies before starting this one. That is why this page exists.'};
[].forEach.call(document.querySelectorAll('.pk-scar-b button'),function(b){b.addEventListener('click',function(){
[].forEach.call(document.querySelectorAll('.pk-scar-b button'),function(x){x.setAttribute('aria-pressed','false');});
b.setAttribute('aria-pressed','true');$('pkScarA').textContent=SAY[b.getAttribute('data-n')];});});
/* menu filter + search */
var tabs=[].slice.call(document.querySelectorAll('.sm-tab')),items=[].slice.call(document.querySelectorAll('.sm-i')),q=$('smQ'),cat='all';
function filt(){var s=(q.value||'').trim().toLowerCase(),n=0;items.forEach(function(li){var ok=(s?li.textContent.toLowerCase().indexOf(s)>=0:(cat==='all'||li.getAttribute('data-c')===cat));li.hidden=!ok;if(ok)n++;});$('smNone').hidden=n>0;}
function setCat(c){cat=c;q.value='';tabs.forEach(function(t){t.setAttribute('aria-pressed',t.getAttribute('data-c')===c?'true':'false');});filt();}
tabs.forEach(function(t){t.addEventListener('click',function(){setCat(t.getAttribute('data-c'));});});
q.addEventListener('input',filt);
q.addEventListener('keydown',function(e){if(e.key==='Enter')e.preventDefault();});
[].forEach.call(document.querySelectorAll('[data-cat]'),function(a){a.addEventListener('click',function(){setCat(a.getAttribute('data-cat'));});});
/* order */
var f=$('pkOrder');if(!f)return;
var PK=[['starter','Starter',500,0,''],['growth','Local Growth',1000,1000,''],['leader','Market Leader',2500,1800,''],['dominance','Dominance',5000,2500,'ai-dfy']];
var sel={};/* id -> qty */
function val(n){var c=f.querySelector('input[name="'+n+'"]:checked');return c?+c.value:0;}
var last={};
function syncBtns(){items.forEach(function(li){var id=li.getAttribute('data-id'),on=!!sel[id],b=li.querySelector('button.sm-add');li.classList.toggle('on',on);if(b){b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'Added ✓':(M[id][4]?'Add to quote':'Add');}});}
function calc(){
var seo=+$('pbSeo').value||0,gbp=val('gbp');
$('pbSeoOut').textContent=m(seo);
var mo=seo+gbp,once=0,quotes=[],froms=0,L=[],seoPaid=seo+gbp;
var ul=$('pbList');ul.innerHTML='';
if(seo)L.push('Monthly SEO '+m(seo)+'/mo');if(gbp)L.push('Google Business Profile '+m(gbp)+'/mo');
Object.keys(sel).forEach(function(id){var it=M[id],k=sel[id],o=it[1]*k,p=it[2]*k;once+=o;mo+=p;if(it[3])froms++;if(it[4])quotes.push(it[0]);
if(/^(seo|ai|content|local)$/.test(it[6])&&!it[4]){seoPaid+=p+o;}
var pt=it[4]?'Quote':(it[3]?'from ':'')+(o?m(o):'')+(o&&p?' + ':'')+(p?m(p)+'/mo':'')+(!o&&!p?'$0':'');
L.push(it[0]+(k>1?' x'+k:'')+': '+pt);
var li=document.createElement('li');var nm=document.createElement('span');nm.textContent=it[0];li.appendChild(nm);
var qd=document.createElement('span');qd.className='pb-qty';
if(it[5]){var mi=document.createElement('button');mi.type='button';mi.textContent='−';mi.setAttribute('aria-label','One less: '+it[0]);mi.onclick=function(){sel[id]--;if(sel[id]<1)delete sel[id];syncBtns();calc();};var pl=document.createElement('button');pl.type='button';pl.textContent='+';pl.setAttribute('aria-label','One more: '+it[0]);pl.onclick=function(){sel[id]=Math.min(50,sel[id]+1);calc();};var ct=document.createElement('b');ct.textContent=k;qd.appendChild(mi);qd.appendChild(ct);qd.appendChild(pl);}
else{var x=document.createElement('button');x.type='button';x.textContent='×';x.setAttribute('aria-label','Remove '+it[0]);x.onclick=function(){delete sel[id];syncBtns();calc();};qd.appendChild(x);}
var pr=document.createElement('em');pr.textContent=pt;li.appendChild(pr);li.appendChild(qd);ul.appendChild(li);});
if(!ul.children.length){var e=document.createElement('li');e.className='pb-empty';e.textContent=seo||gbp?'Monthly plan set. Add anything else from the menu.':'Nothing yet. Add items from the menu or pick a package.';ul.appendChild(e);}
$('pbMo').textContent=m(mo);$('pbOnce').textContent=m(once);$('pbFirst').textContent=m(mo+once);
$('pbQn').hidden=!quotes.length;$('pbQn').textContent=quotes.length?quotes.length+' custom quote'+(quotes.length>1?'s':'')+' added. We price '+(quotes.length>1?'them':'it')+' before billing.':'';
$('pbFromN').hidden=!froms;
var key='',name='',ids=Object.keys(sel);PK.forEach(function(p){if(seo===p[2]&&gbp===p[3]&&ids.join()===p[4]&&(!p[4]||sel[p[4]]===1)){key=p[0];name=p[1];}});
$('pbPkg').textContent=name?'This matches the '+name+' package.':'';
var v=+$('pbVal').value||0;$('pbBe').textContent=mo&&v?'At '+m(mo)+' a month, about '+(Math.ceil(mo/v*10)/10)+' new customer'+(mo/v>1?'s':'')+' a month covers it. Anything past that is growth.':'Enter what one new customer is worth to you.';
var mx=$('pbMatchX');if(mx){var fm=seoPaid;mx.textContent=fm?'Estimated for this first month: you pay '+m(fm)+' for SEO, we add '+m(Math.min(fm*2,100000))+' in SEO credit, so '+m(fm+Math.min(fm*2,100000))+' of SEO work. Our team confirms which items count.':'Add monthly SEO or SEO work to see your match.';}
last={mo:mo,once:once,L:L,name:name,quotes:quotes};}
f.addEventListener('input',function(e){if(e.target.id!=='smQ')calc();});f.addEventListener('change',function(e){if(e.target.id!=='smQ')calc();});
[].forEach.call(document.querySelectorAll('button.sm-add'),function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-id');if(sel[id])delete sel[id];else sel[id]=1;syncBtns();calc();});});
function setPick(p){$('pbSeo').value=p.seo||0;var g=f.querySelector('input[name="gbp"][value="'+(p.gbp||0)+'"]');if(g)g.checked=true;(p.items||[]).forEach(function(i){sel[i]=1;});syncBtns();calc();}
[].forEach.call(document.querySelectorAll('.pk-pick[data-pick]'),function(b){b.addEventListener('click',function(){setPick(JSON.parse(b.getAttribute('data-pick')));$('menu').scrollIntoView({behavior:'smooth'});});});
var lg=$('pkLockGo');if(lg)lg.addEventListener('click',function(){$('pbLock').checked=true;$('pbYou').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(function(){var n=f.querySelector('input[name=industry_city]');if(n)n.focus({preventScroll:true});},700);});
/* EARTH match + receipt */
var mt=$('pbMatch'),rc=$('pbRc');function rcShow(){rc.hidden=!mt.checked;f.setAttribute('enctype','multipart/form-data');}
mt.addEventListener('change',rcShow);if(/[?&]earth=1|#earth/.test(location.href)){mt.checked=true;rcShow();}
f.addEventListener('submit',function(e){calc();
var file=$('pbRcFile').files[0];
if(mt.checked&&!file&&!$('pbRcNum').value.trim()){e.preventDefault();e.stopImmediatePropagation();var n=$('pbNote');n.textContent='To apply the EARTH SEO Match, attach your ticket receipt or type the receipt number. Or untick the box and email it later.';n.style.color='#B42318';$('pbRcNum').focus();return;}
if(file&&file.size>5*1024*1024){e.preventDefault();e.stopImmediatePropagation();var n2=$('pbNote');n2.textContent='That receipt file is over 5 MB. Please attach a smaller photo or PDF, or type the receipt number instead.';n2.style.color='#B42318';return;}
var w=$('pbWeb');if(w.value&&!/^https?:\/\//i.test(w.value.trim()))w.value='https://'+w.value.trim();
f.elements.order_summary.value=(last.name?'Package: '+last.name+'\n':'Custom order\n')+(last.L.join('\n')||'Nothing picked, wants to talk')+'\nMonthly: '+m(last.mo)+'\nOne time: '+m(last.once)+(mt.checked?'\nEARTH SEO Match requested (receipt '+(file?'attached':'number given')+')':'')+($('pbLock').checked?'\nAsked about an Industry Lockdown':'');
f.elements.monthly_total.value=m(last.mo);f.elements.one_time_total.value=m(last.once);f.elements.quote_items.value=last.quotes.join('; ');
f.elements._subject.value='SEO order: '+(last.name||'custom')+' '+m(last.mo)+'/mo'+(last.quotes.length?' + '+last.quotes.length+' quote':'')+(mt.checked?' + EARTH match':'')+' ('+(f.elements.business.value||'').slice(0,60)+')';
f.dataset.sum=(last.name?last.name+' package: ':'Your order: ')+m(last.mo)+' a month'+(last.once?' plus '+m(last.once)+' one time':'')+(last.quotes.length?', plus '+last.quotes.length+' item'+(last.quotes.length>1?'s':'')+' to quote':'')+'.';});
var mo=new MutationObserver(function(){var ok=f.querySelector('.eta-msg[data-kind="ok"]');if(!ok)return;mo.disconnect();
$('pbYou').hidden=true;$('pbDoneSum').textContent=f.dataset.sum||'';var d=$('pbDone');d.hidden=false;d.focus();});
mo.observe(f,{subtree:true,childList:true,attributes:true,attributeFilter:['data-kind']});
syncBtns();calc();})();`,
};
