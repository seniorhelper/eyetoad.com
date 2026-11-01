import { hbars } from './chart-helpers.mjs';
// Post: video and AI search for local businesses. Facts read live 2026-11-01 (Ahrefs Mar 2026, Peec Mar 2026, Wyzowl late-2024 survey).
const css = `.gx-fig{margin:26px 0 30px;padding:18px 18px 14px;background:#FFFFFF;border:1.5px solid #E4E7EC;border-radius:16px;color:#101828}.gx-fig figcaption{font-size:.86rem;color:#475467;line-height:1.5;margin-top:10px}.gx-fig figcaption b{color:#101828}.gx-fig svg{display:block;width:100%;height:auto}
.vq{margin:24px 0 30px;padding:20px;background:#FFF7ED;border:1.5px solid #FDBA74;border-radius:16px}.vq h3{margin:0 0 6px}.vq p.n{font-size:.88rem;color:#475467;margin:0 0 12px}.vq-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px}.vq select,.vq input{flex:1 1 180px;min-width:0;padding:10px 12px;border-radius:10px;border:1.5px solid #98A2B3;font:15px system-ui,sans-serif;color:#101828;background:#fff}.vq button{font:700 .95rem system-ui,sans-serif;padding:10px 16px;border-radius:10px;border:2px solid #9A3412;background:#C2410C;color:#fff;cursor:pointer}.vq ol{margin:12px 0 0;padding-left:22px}.vq li{margin:0 0 12px;line-height:1.5;color:#344054}.vq li b{color:#101828}.vq li i{display:block;font-style:normal;font-size:.9rem;color:#475467;margin-top:3px}.vq .vq-cta{margin-top:10px;font-size:.92rem;color:#344054}
.vt{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin:18px 0 26px}.vt div{background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;padding:14px 16px;font-size:.93rem;line-height:1.5;color:#344054}.vt b{display:block;color:#101828;font-size:1rem;margin-bottom:4px}
.bl-src{margin:40px 0 0;padding:18px 20px;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:16px}.bl-src h2{font-size:1.1rem;margin:0 0 10px}.bl-src ol{margin:0;padding-left:20px;font-size:.9rem;color:#475467}.bl-src li{margin:0 0 6px;line-height:1.5;overflow-wrap:anywhere}`;

const chart = hbars({
  id: 'ytshare',
  title: 'How often the cited page is a YouTube video',
  desc: 'Ahrefs, March 2026: YouTube URLs were 5.6% of all AI Overview citations, and 18.2% of citations to pages that did not rank in the top 100 for the same keyword.',
  max: 20,
  rows: [
    { label: 'All AI Overview citations', values: [{ v: 5.6, text: '5.6%', color: '#94A3B8' }] },
    { label: 'Citations to pages NOT in the top 100 organic results', values: [{ v: 18.2, text: '18.2%', color: '#EA580C' }] },
  ],
});

const script = `(function(){var T={"plumber": [["How much does a water heater replacement cost in {c}?", "In {c}, replacing a standard tank water heater usually runs [low] to [high]. Here is what moves the price."], ["How long does it take to clear a main sewer line?", "Most main-line clogs take us [time]. Here is what happens start to finish."], ["Repair or replace: is my water heater worth fixing?", "Here is the honest rule we use with customers in {c}."], ["Tankless vs. tank water heaters: which is right for you?", "Short answer: [one sentence]. Here is who each one fits."], ["Water leaking under the sink: what should you do right now?", "First, turn off the shut-off valve. Then here is what to check."], ["What happens when you call us for a plumbing job?", "I am [name], I own [business] in {c}. Here is exactly what happens from the first call."]], "hvac": [["How much does a new furnace cost in {c}?", "In {c}, a furnace replacement usually runs [low] to [high]. Here is what changes the price."], ["How long does an AC installation take?", "Most installs take us [time]. Here is the day, step by step."], ["Repair or replace: is my AC worth fixing?", "Here is the rule we use: [your rule]."], ["Heat pump vs. furnace: which works better in {c}?", "Short answer: [one sentence]. Here is who each one fits."], ["Furnace not turning on: what to check first", "Before you call anyone, check these three things."], ["What happens when you hire us for an HVAC job?", "I am [name], I own [business] in {c}. Here is what happens from the first call."]], "roofer": [["How much does a new roof cost in {c}?", "In {c}, a full roof replacement usually runs [low] to [high]. Here is what moves the price."], ["How long does a roof replacement take?", "Most roofs take us [time]. Here is what happens each day."], ["Repair or replace: does my roof need a full replacement?", "Here is the honest rule we use: [your rule]."], ["Asphalt vs. metal roofing: which is better here?", "Short answer: [one sentence]. Here is who each one fits."], ["Hail damage on your roof: what to do first", "First, take photos from the ground. Then here is what to do before you call insurance."], ["What happens when you hire us for a roof?", "I am [name], I own [business] in {c}. Here is exactly what happens from the inspection."]], "remodeler": [["How much does a bathroom remodel cost in {c}?", "In {c}, a bathroom remodel usually runs [low] to [high]. Here is what changes the price."], ["How long does a walk-in shower conversion take?", "Most conversions take us [time]. Here is the schedule, day by day."], ["Remodel or refresh: is a full remodel worth it?", "Here is the honest rule we use with homeowners: [your rule]."], ["Tub-to-shower vs. walk-in tub: which is right for you?", "Short answer: [one sentence]. Here is who each one fits."], ["Do you need a permit for a bathroom remodel in {c}?", "Short answer: [yes or no and when]. Here is how it works."], ["What happens when you hire us for a remodel?", "I am [name], I own [business] in {c}. Here is what happens from the first visit."]], "dentist": [["How much does a dental implant cost in {c}?", "In {c}, a single implant usually runs [low] to [high]. Here is what is included."], ["How long does Invisalign take?", "Most of our patients finish in [time]. Here is what the months look like."], ["Crown or filling: which does my tooth need?", "Here is how we decide: [your rule]."], ["Implant vs. bridge: which is right for you?", "Short answer: [one sentence]. Here is who each one fits."], ["Chipped a tooth? What to do right now", "First, save any pieces and rinse with warm water. Then here is what to do next."], ["What happens at your first visit with us?", "I am Dr. [name] at [practice] in {c}. Here is exactly what your first visit looks like."]], "lawyer": [["How much does a lawyer cost for [case type] in {c}?", "Most [case type] cases are handled on [fee structure]. Here is exactly how fees work."], ["How long does a [case type] case take?", "Most of our cases take [time]. Here is each stage."], ["Do I need a lawyer for [case type], or can I handle it myself?", "Here is the honest answer: [your rule]."], ["Will vs. trust: which do you need?", "Short answer: [one sentence]. Here is who each one fits."], ["Just had a car accident? What to do in the first 24 hours", "First, get medical care and photos. Then here is what not to say."], ["What happens in a free consultation with us?", "I am [name], an attorney at [firm] in {c}. Here is what we cover in the first meeting."]], "salon": [["How much does balayage cost in {c}?", "At our salon, balayage runs [low] to [high]. Here is what changes the price."], ["How long does a color correction take?", "Most corrections take [time], sometimes two visits. Here is why."], ["Is a keratin treatment worth it?", "Here is who it helps and who should skip it."], ["Balayage vs. highlights: what is the difference?", "Short answer: [one sentence]. Here is who each one fits."], ["Box dye went wrong? What to do before your appointment", "First, do not re-dye it. Here is what to do instead."], ["What happens at your first appointment with us?", "I am [name] at [salon] in {c}. Here is what your first visit looks like."]], "restaurant": [["How much does catering cost for a party in {c}?", "Our catering runs [low] to [high] per person. Here is what is included."], ["How far ahead should you book private dining?", "For groups of [size], book [time] ahead. Here is why."], ["What is our most ordered dish, and why?", "This is [dish]. Here is how we make it."], ["Do you have gluten-free options?", "Yes, and here is how we keep them separate in the kitchen."], ["Planning a large group dinner? What to know first", "Call ahead with your headcount. Here is what helps us most."], ["What is it like to eat here?", "I am [name], I own [restaurant] in {c}. Here is what a night here looks like."]]};var f=document.getElementById('vqf');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var t=document.getElementById('vqt').value,c=(document.getElementById('vqc').value||'your city').trim().slice(0,40);var L=T[t]||T.plumber,o=document.getElementById('vqo');o.innerHTML='';L.forEach(function(q){var li=document.createElement('li'),b=document.createElement('b'),i=document.createElement('i');b.textContent=q[0].split('{c}').join(c);i.textContent='Open with: \\u201c'+q[1].split('{c}').join(c)+'\\u201d';li.appendChild(b);li.appendChild(i);o.appendChild(li)});document.getElementById('vqx').hidden=false;});})();`;

export default {
  type: 'post',
  path: '/blog/video-ai-search-local-business/',
  date: '2026-11-01',
  dateText: 'November 1, 2026',
  read: 11,
  section: 'AI search',
  title: 'Does Video Help You Show Up in AI Search? (2026 Data)',
  description: 'YouTube is the most-cited domain in Google AI Overviews and 18.2% of citations to pages outside the top 100 are videos. What that means for a local business, which videos to make, and where to put them.',
  eyebrow: 'AI search &middot; Video',
  h1: 'Does video help a local business show up in AI search?',
  lede: 'Owners ask us this every week, usually right after they notice a YouTube video sitting inside a Google AI answer where their website should have been. The short version: yes, video is one of the few ways a smaller business can get cited by AI without first out-ranking everyone on page one. But only a certain kind of video, published a certain way.',
  key: 'Yes. In Ahrefs&rsquo; March 2026 study of about 4 million AI Overview citations, YouTube was the single most-cited domain, and 18.2% of the cited pages that did not rank in the top 100 for that search were YouTube videos. AI systems read a video&rsquo;s transcript and description, not the picture, so the videos that get cited are ones where a person clearly says the question and the answer out loud.',
  toc: ['What the 2026 data shows', 'Why video is a back door', 'AI reads what you say, not what you show', 'The six videos a local business should make', 'Where to publish so AI can find it', 'What does not work', 'Do customers even want video?'],
  body: `<h2 id="s1">What does the 2026 data say about video in AI search?</h2>
<p>Two large studies published in March 2026 point the same direction.</p>
<p><b>Ahrefs</b> looked at roughly 863,000 Google results pages and about 4 million URLs cited inside AI Overviews. YouTube was the most-cited domain in AI Overviews, and its share had grown 34% over the previous six months according to Ahrefs Brand Radar. Across all citations, 5.6% were YouTube URLs.</p>
<p><b>Peec AI</b> analyzed about 30 million sources cited across AI search tools in the US and found YouTube was the second most-cited domain overall, and by far the biggest video source. They also confirmed something that matters for how you make the video: the AI pulled from the video description in some answers and the auto-generated transcript in others.</p>
<figure class="gx-fig">${chart}<figcaption><b>The number that matters for a smaller business is the orange one.</b> When Google cites a page that does not rank anywhere in the top 100 for that search, almost one time in five it is a YouTube video. Source: Ahrefs, March 2026.</figcaption></figure>
<p>One honest caveat: Peec notes that ChatGPT does not give video the same pathway Google does. Google owns YouTube and leans on it in AI Overviews and <a href="/blog/google-ai-mode-local-business-guide/">AI Mode</a>. ChatGPT and Perplexity cite videos less, so video is a Google-first play, with the website still doing the heavy lifting for <a href="/blog/how-to-get-cited-by-chatgpt/">getting cited by ChatGPT</a>.</p>

<h2 id="s2">Why is video a back door into AI answers?</h2>
<p>For most local searches, the first page of Google is crowded with directories, national lead sites and agencies that have been building links for a decade. A new or small business can spend a year climbing that ladder.</p>
<p>The Ahrefs finding says AI Overviews do not only cite the pages that won that race. When Google needs an answer that the top-ranking pages do not give clearly, it reaches further out, and a disproportionate share of what it grabs is video. A plumber who records a clear two-minute answer to &ldquo;how much does a water heater cost to replace in Denver&rdquo; is competing on clarity, not on backlinks.</p>
<p>This does not replace a well-built website or a strong <a href="/google-business-profile-management/">Google Business Profile</a>. It is a second door into the same room, and right now it is less crowded.</p>

<h2 id="s3">Does AI watch the video?</h2>
<p>Not the way a person does. What AI systems reliably use is text: the title, the description and the transcript. Peec&rsquo;s research found Google AI Mode building answers from both the description and the transcript.</p>
<p>That changes how you should film:</p>
<ul>
<li><b>Say the question out loud in the first ten seconds,</b> in the words a customer would type. &ldquo;How much does a new roof cost in Aurora?&rdquo; not &ldquo;Hey guys, welcome back.&rdquo;</li>
<li><b>Answer it in the next sentence,</b> with a real range or a real rule. An answer the AI can lift in one sentence is an answer it can cite.</li>
<li><b>Say your business name and city once,</b> naturally. The transcript is how the AI connects the answer to you.</li>
<li><b>Fix the auto-captions.</b> YouTube&rsquo;s automatic transcript misspells trade terms and street names constantly. Five minutes of editing makes the transcript accurate, and the transcript is the part being read.</li>
</ul>
<p>A beautiful drone shot with music and no voice gives the AI almost nothing to quote. A phone video of the owner explaining one thing clearly gives it everything.</p>

<div class="vq"><h3>Video question finder</h3><p class="n">Pick your trade and city. You get six video titles shaped like the questions people ask AI, plus the first sentence to say on camera. Runs entirely in your browser; nothing is sent anywhere.</p>
<form id="vqf"><div class="vq-row"><select id="vqt" aria-label="Your trade"><option value="plumber">Plumber</option><option value="hvac">HVAC</option><option value="roofer">Roofer</option><option value="remodeler">Bath or kitchen remodeler</option><option value="dentist">Dentist</option><option value="lawyer">Law firm</option><option value="salon">Salon</option><option value="restaurant">Restaurant</option></select><input id="vqc" type="text" placeholder="Your city" aria-label="Your city" maxlength="40"><button type="submit">Give me six videos</button></div></form>
<ol id="vqo" aria-live="polite"></ol>
<p class="vq-cta" id="vqx" hidden>Fill in the brackets with your real numbers before you film. Want us to script, shoot and publish these the right way? <a href="/video-seo/">See how our video SEO works</a> or call 1-800-481-8638.</p></div>

<h2 id="s4">Which videos should a local business make?</h2>
<p>The videos that get cited answer one specific question each. Six formats cover most of what customers ask AI:</p>
<div class="vt">
<div><b>The price range</b>What it usually costs here, what pushes it up or down. The hardest question to find answered anywhere, which is why it gets cited. (More on <a href="/blog/publish-price-ranges-ai-search/">publishing price ranges</a>.)</div>
<div><b>The timeline</b>How long the job takes, step by step. Customers ask it, AI repeats it.</div>
<div><b>Repair or replace</b>The honest rule you use. Builds trust faster than any testimonial.</div>
<div><b>This vs. that</b>Two options compared plainly. &ldquo;Tankless vs. tank,&rdquo; &ldquo;implant vs. bridge.&rdquo;</div>
<div><b>What to do right now</b>The safe first step in an emergency. Gets watched at the moment of highest intent.</div>
<div><b>What happens when you hire us</b>The owner, on camera, walking through the first call. The one that turns viewers into calls.</div>
</div>
<p>Keep each one short. Two to four minutes is plenty for a question video, and a 30&ndash;60 second Short cut from the same footage gives you a second asset that YouTube also indexes.</p>

<h2 id="s5">Where should the video be published so AI finds it?</h2>
<p>The same video should live in three places, each doing a different job:</p>
<ol>
<li><b>YouTube</b>, on a channel named exactly like your business, with the question as the title, a description that answers it in the first two lines, your city, your phone number, and a link to the matching page on your site. This is the copy AI Overviews cite.</li>
<li><b>Your Google Business Profile.</b> Profiles accept video uploads, and a real video of real work is a trust signal for the people comparing you in the map pack.</li>
<li><b>The matching page on your website,</b> embedded near the answer it supports, with the transcript printed on the page and <code>VideoObject</code> structured data describing it. That lets Google connect the video, the page and the business as one entity. Google&rsquo;s own video SEO documentation lays out the required fields.</li>
</ol>
<p>That last step is where most businesses stop short, and it is the part we do on our <a href="/video-seo/">video SEO</a> work alongside <a href="/aio-seo-system/">AI Overviews optimization</a> and <a href="/generative-engine-optimization-system/">ChatGPT citations</a>.</p>

<h2 id="s6">What does not work?</h2>
<ul>
<li><b>Slideshows with music.</b> No voice means no useful transcript.</li>
<li><b>One long &ldquo;about us&rdquo; video</b> that answers ten questions vaguely. AI cites one clear answer, not a tour.</li>
<li><b>Uploading and walking away.</b> An untouched auto-caption track with your business name spelled three ways makes it harder for AI to attach the answer to you.</li>
<li><b>Buying views.</b> Inflated numbers do nothing for AI citations and can get a channel penalized.</li>
<li><b>Expecting a guarantee.</b> Nobody can promise an AI citation, including us. What you can control is being the clearest answer available when the AI goes looking.</li>
</ul>

<h2 id="s7">Do customers even want to watch video?</h2>
<p>In Wyzowl&rsquo;s late-2024 survey, 78% of respondents said a short video was how they would most like to learn about a product or service, far ahead of text articles at 9%. It is a small survey and Wyzowl itself flags the results as dated, so treat it as direction rather than gospel. It matches what we see on our own home-services sites: the visitors who watch the owner explain the job are the ones who call.</p>
<p>So the same video does two jobs. It gives AI something to cite, and it gives the person who clicks through a reason to trust you before they ever pick up the phone. That second job is the one that pays, which is why we track <a href="/blog/track-ai-search-traffic-and-leads/">AI traffic through to calls</a>, not just views.</p>
<p>If you are a Denver business and want to see where you stand first, our <a href="/">Denver SEO</a> team can look at your site, your profile and your channel together.</p>`,
  cta: ['Want videos that AI actually cites?', 'We script the questions, coach you on camera or shoot it for you, fix the transcript, publish to YouTube and your profile, and build the page and schema around it.', 'See video SEO', '/video-seo/'],
  faq: [
    { q: 'Does Google AI Overviews really cite YouTube videos?', a: 'Yes. Ahrefs&rsquo; March 2026 study of about 4 million AI Overview citations found YouTube was the most-cited domain, and 5.6% of all cited URLs were YouTube videos.' },
    { q: 'Can a video get cited even if my website does not rank?', a: 'It can. In the same Ahrefs data, 18.2% of cited pages that did not rank in the top 100 for that search were YouTube videos. Video is one of the ways a smaller business gets into AI answers without winning page one first. There is no guarantee of a citation.' },
    { q: 'Does ChatGPT cite videos the same way?', a: 'Less so. Peec AI&rsquo;s 2026 research notes ChatGPT does not offer the same video pathway Google does, so video is mainly a Google AI Overviews and AI Mode play. Your website still matters most for ChatGPT.' },
    { q: 'How long should a local business video be?', a: 'Two to four minutes for a single-question video is plenty, with a 30 to 60 second Short cut from the same footage. Say the question in the first ten seconds and answer it in the next sentence.' },
    { q: 'Do I need professional video production?', a: 'Not to get cited. AI reads the transcript and description, so a clear phone video of the owner answering one question can do the job. Production quality helps the human viewer trust you, which is what turns a view into a call.' },
  ],
  sources: [
    ['Ahrefs: AI Overview citations study (March 2026)', 'https://ahrefs.com/blog/ai-overview-citations-top-10', '863K SERPs, about 4M cited URLs'],
    ['Peec AI: YouTube in AI search (March 2026)', 'https://docs.peec.ai/research/youtube-in-ai-search', 'about 30M sources, US'],
    ['Wyzowl: State of Video Marketing survey', 'https://wyzowl.com/sovm-results-2025/', 'fielded late 2024, 205 respondents'],
    ['Google Search Central: Video SEO best practices', 'https://developers.google.com/search/docs/appearance/video', 'VideoObject structured data'],
  ],
  more: [['How to get cited by ChatGPT', '/blog/how-to-get-cited-by-chatgpt/', 'The website side of AI'], ['Google AI Mode for local businesses', '/blog/google-ai-mode-local-business-guide/', 'Where video shows up'], ['Publish your price ranges', '/blog/publish-price-ranges-ai-search/', 'The video that gets cited most']],
  style: css,
  script,
};
