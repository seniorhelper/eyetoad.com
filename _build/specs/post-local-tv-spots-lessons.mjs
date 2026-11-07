// /blog/local-tv-commercial-lessons/  First-hand post: three 30-second spots made for our own brands. Facts from the Madwackd launch brief (Nov 6, 2026); FCC CALM Act and Ad-ID facts read live 2026-11-06.
const css = `.tv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin:22px 0 28px}.tv-grid figure{margin:0;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:14px;overflow:hidden}.tv-grid img{display:block;width:100%;height:auto}.tv-grid figcaption{padding:10px 14px 12px;font-size:.88rem;line-height:1.45;color:#475467}.tv-grid figcaption b{display:block;color:#101828;font-size:.95rem}
.tv-tbl{margin:22px 0 28px;overflow-x:auto}.tv-tbl table{width:100%;border-collapse:collapse;font-size:.93rem;min-width:560px}.tv-tbl caption{text-align:left;font-weight:700;color:#101828;padding-bottom:8px}.tv-tbl th,.tv-tbl td{border:1px solid #E4E7EC;padding:9px 12px;text-align:left;vertical-align:top;line-height:1.45;color:#344054}.tv-tbl th{background:#F2F4F7;color:#101828}
.tv-note{margin:22px 0;padding:16px 18px;background:#FFF7ED;border:1.5px solid #FDBA74;border-radius:14px;color:#344054;line-height:1.55}.tv-note b{color:#101828}
.bl-src{margin:40px 0 0;padding:18px 20px;background:#F9FAFB;border:1.5px solid #E4E7EC;border-radius:16px}.bl-src h2{font-size:1.1rem;margin:0 0 10px}.bl-src ol{margin:0;padding-left:20px;font-size:.9rem;color:#475467}.bl-src li{margin:0 0 6px;line-height:1.5;overflow-wrap:anywhere}`;

export default {
  type: 'post',
  path: '/blog/local-tv-commercial-lessons/',
  date: '2026-11-06',
  dateText: 'November 6, 2026',
  read: 9,
  section: 'Video',
  title: 'What We Learned Making Three 30-Second TV Spots (2026)',
  description: 'Hook in 3 seconds, one promise, proof, a phone number, an end card. What we learned making three 30-second TV spots for local brands.',
  eyebrow: 'Video &middot; Local TV commercials',
  h1: 'What we learned making three 30-second TV spots for local brands',
  lede: 'This week we made three TV commercials for our own brands, and we made them the way a local business would want to: one script, one promise, one phone number, delivered in files a station can run. Here is the structure that held up, the compliance details that would have bitten us, and where the money actually goes.',
  key: 'A local TV or video ad works when it does five things in thirty seconds: a hook in the first three, one promise, one piece of proof, one phone number, and an end card that stays on screen long enough to read. We built three spots that way for Eye To Ad Media, Aging Safely Baths and Search Converts. The expensive parts of a commercial are crews, locations and reshoots, and a studio workflow that locks the look before animating anything removes most of them. The parts you cannot cut are the script and the compliance checks.',
  toc: ['What were the three spots?', 'How do you structure a 30-second spot?', 'What belongs in the script, and what does not?', 'What compliance details trip up a first-time advertiser?', 'What made it cheaper?', 'What would we do differently?', 'Can your business do this?'],
  body: `<h2 id="s1">What were the three spots?</h2>
<p>We run three brands: Eye To Ad Media (this site), Aging Safely Baths and Search Converts. On November 6, 2026 our sister studio, <a href="https://www.madwackd.ai/" target="_blank" rel="noopener">Madwackd Studio</a>, launched, and one of its launch projects was a spot for each brand. Madwackd is an AI video studio with human producers, so people are in the loop on every project.</p>
<div class="tv-grid">
<figure><img src="/images/work/madwackd/eye-to-ad-media-make-the-phone-ring-tv-spot-640.webp" srcset="/images/work/madwackd/eye-to-ad-media-make-the-phone-ring-tv-spot-640.webp 640w, /images/work/madwackd/eye-to-ad-media-make-the-phone-ring-tv-spot-1280.webp 1280w" sizes="(max-width:700px) 90vw, 280px" width="640" height="360" alt="Poster frame from the Eye To Ad Media TV spot Make the Phone Ring" loading="lazy"><figcaption><b>Make the Phone Ring (0:30)</b>Eye To Ad Media</figcaption></figure>
<figure><img src="/images/work/madwackd/aging-safely-baths-stay-home-tv-spot-640.webp" srcset="/images/work/madwackd/aging-safely-baths-stay-home-tv-spot-640.webp 640w, /images/work/madwackd/aging-safely-baths-stay-home-tv-spot-1280.webp 1280w" sizes="(max-width:700px) 90vw, 280px" width="640" height="360" alt="Poster frame from the Aging Safely Baths TV spot Stay Home" loading="lazy"><figcaption><b>Stay Home (0:30)</b>Aging Safely Baths</figcaption></figure>
<figure><img src="/images/work/madwackd/search-converts-where-did-they-go-tv-spot-640.webp" srcset="/images/work/madwackd/search-converts-where-did-they-go-tv-spot-640.webp 640w, /images/work/madwackd/search-converts-where-did-they-go-tv-spot-1280.webp 1280w" sizes="(max-width:700px) 90vw, 280px" width="640" height="360" alt="Poster frame from the Search Converts TV spot Where Did They Go" loading="lazy"><figcaption><b>Where Did They Go? (0:26)</b>Search Converts</figcaption></figure>
</div>
<p>You can watch all three on <a href="/our-work/#madwackd">our work page</a>. Two run exactly thirty seconds; the third is twenty-six because the story ended there, and padding it would have made it worse. That was lesson one: the length is a ceiling, not a target.</p>

<h2 id="s2">How do you structure a 30-second spot?</h2>
<p>Every spot used the same skeleton. It is not a law of television; it is the shape that kept us honest, and it gave the editor a place to cut when something ran long.</p>
<div class="tv-tbl"><table>
<caption>The skeleton we used for all three spots</caption>
<thead><tr><th>Seconds</th><th>Beat</th><th>Job</th><th>Mistake we avoided</th></tr></thead>
<tbody>
<tr><td>0 to 3</td><td>Hook</td><td>Show the problem the viewer already has, in a picture, before anyone talks</td><td>Opening on a logo</td></tr>
<tr><td>3 to 10</td><td>Problem</td><td>One situation, one person, recognizable in a second</td><td>Listing three problems</td></tr>
<tr><td>10 to 20</td><td>Promise and proof</td><td>One promise, backed by one fact that exists on the live site</td><td>Claims we could not point to</td></tr>
<tr><td>20 to 26</td><td>Call to action</td><td>Say the phone number out loud and show it large</td><td>&ldquo;Visit us online&rdquo; with no number</td></tr>
<tr><td>26 to 30</td><td>End card</td><td>Logo, number and one line, held long enough to read</td><td>A card that flashes by in a second</td></tr>
</tbody></table></div>
<p>The three-second hook is our rule, not a published statistic, and we would rather say so than invent a study. The reasoning is plain: a viewer on a couch or a phone decides almost immediately whether the next few seconds are about them. A picture of the problem, such as a phone that never rings, does that faster than a voice saying a company name.</p>
<p>The plan also forced a second decision early. Each spot got a 16:9 cut for TV and a 9:16 cut for social, planned together. A vertical cut made as an afterthought crops off the phone number, and the number is the point.</p>

<h2 id="s3">What belongs in the script, and what does not?</h2>
<p>A thirty-second spot is about seventy-five spoken words at a natural pace. That sounds like plenty until you try to fit a service list, a guarantee, a location and a phone number into it. We cut hard.</p>
<h3>One promise</h3>
<p>Eye To Ad Media is about making the phone ring. Aging Safely Baths is about staying home. Search Converts asks where visitors went. Each spot says one thing, once, and repeats it at the end card.</p>
<h3>Proof that exists</h3>
<p>Every claim in every spot came from that brand&rsquo;s live website. If a line could not be pointed at a page, it came out. That meant no ranking promises, no review counts, no prices and no health claims in the spots. It also kept the review simple, because there was nothing in the spot to substantiate that we had not already published.</p>
<h3>People are dramatizations, and the screen says so</h3>
<p>The people in the spots are dramatizations. A &ldquo;Dramatization&rdquo; super sits on screen where they appear, and exports are marked as AI-generated. Viewers should never wonder whether a person on screen is a real customer. If you advertise a service where testimonials carry weight, do not make up a customer. Use a real one with a release, or use a dramatization and label it.</p>
<h3>No lip sync, on purpose</h3>
<p>A narrator off camera reads the voiceover, and nobody on screen has to match it. That removes the most obvious tell of a synthetic commercial, and it matches how plenty of real local TV works: a pleasant voice over footage. Text is the other tell. Every phone number, super and logo was added in the editing step with real fonts, never generated inside the picture, so the digits are always right. The Eye To Ad Media number is 1-800-481-8638 and the Search Converts number is 720-712-8615, and a typo in a phone number is the most expensive typo in advertising.</p>

<h2 id="s4">What compliance details trip up a first-time advertiser?</h2>
<p>The creative is the fun part. The delivery specs are where a first-time advertiser gets a file bounced.</p>
<h3>Loudness</h3>
<p>Since December 13, 2012, FCC rules under the CALM Act have required TV stations and pay-TV providers to keep a commercial&rsquo;s average volume the same as the program around it, per the <a href="https://www.fcc.gov/consumers/guides/loud-commercials-tv" target="_blank" rel="noopener">FCC&rsquo;s loud commercials guide</a>. The standard is about average loudness, not peaks, and it does not set an absolute cap. In practice stations ask for a loudness target in the delivery file. We mixed our broadcast masters at -24 LKFS, the ATSC A/85 reference level that broadcast delivery specs commonly use, and the web copies at -16 LUFS, which suits phones and laptops. Your station may ask for something slightly different, so ask before you mix.</p>
<h3>Format</h3>
<p>The broadcast masters are 1920x1080. The web copies are 1280x720. Stations may also want 29.97 frames per second, and many want to supply their own slate. Ask for the spec sheet from the station or the buyer before you finish, not after.</p>
<h3>Ad ID</h3>
<p>Stations track spots by a commercial identification code. The industry standard is <a href="https://www.ana.net/content/show/id/pr-2007-industry-standard" target="_blank" rel="noopener">Ad-ID, which replaced the older ISCI system</a>. Some stations assign their own codes on the slate, so your spot may need theirs. Do not bake a code into the picture until you know which one the station wants.</p>
<div class="tv-note"><b>Check this before you pay for a spot.</b> Ask the station or media buyer for three things in writing: the loudness target, the frame rate and file format, and who supplies the slate and ISCI or Ad-ID code. Our files are built to be re-exported, but it is cheaper to ask first.</div>

<h2 id="s5">What made it cheaper?</h2>
<p>Traditional commercial costs come from people and places: a crew, talent, a location, equipment, reshoots when the weather or an actor does not cooperate. Our workflow removes most of those line items and keeps the work that actually makes an ad good. I am not going to put a number on what a traditional shoot would have cost for these specific spots, because we did not get quotes for them, but here is where the savings come from.</p>
<ol>
<li><b>Approved stills before any motion.</b> We lock the look and the characters in still images first. A still is cheap to change. A finished animated clip is not. Changing a character after animation means redoing clips.</li>
<li><b>Short clips, not long takes.</b> Each approved still is animated into an eight-second clip. Short clips are easier to fix, swap or cut than one long shot.</li>
<li><b>One edit, two cuts.</b> The TV master and the vertical social cut come out of the same assets. Nothing is reshot for the second format.</li>
<li><b>Text in the edit.</b> Phone numbers, logos and supers added with real fonts mean no regenerating a clip because a digit came out wrong.</li>
</ol>
<p>What did not get cheaper was the thinking. The script, the shot list, the decision about what the one promise is: that took the same time it always does, and it should. If you are buying a commercial, that is the part to pay attention to. Madwackd&rsquo;s done-for-you commercial spots start at $2,500, and you can see the studio&rsquo;s other work and producers at <a href="https://www.madwackd.ai/producers/" target="_blank" rel="noopener">madwackd.ai/producers</a>.</p>

<h2 id="s6">What would we do differently?</h2>
<p>Three things, honestly.</p>
<p><b>We would settle the call to action before the script.</b> Every line you write should push toward one action. When the action is vague, the script wanders, so pick the number to call first.</p>
<p><b>We would ask the station for specs first.</b> We built to common broadcast specs, and a spec sheet in hand on day one removes a whole category of risk.</p>
<p><b>We would pair every spot with a landing page.</b> A commercial sends people to search for you, and the page they land on is what turns the view into a call. A TV spot that points to a slow, vague home page wastes most of its effect. That is the gap <a href="/video-seo/">our video SEO work</a> closes, and it is why video also matters for search: see <a href="/blog/video-ai-search-local-business/">what the 2026 data says about video in AI search</a>.</p>

<h2 id="s7">Can your business do this?</h2>
<p>If you have a clear offer, a phone that someone answers, and a website that backs up what the spot says, yes. If any of those three is missing, fix that first, because the spot will only amplify it. Start by writing the one-sentence promise and the phone number. If you cannot do that in two minutes, you are not ready to shoot, and no studio can fix it for you. If you can, bring it to us or to a producer you trust, and ask to see the stills before anything is animated.</p>`,
  cta: ['Want a spot that makes your phone ring?', 'Tell us the one promise and the number to call. We will tell you honestly whether a thirty-second spot is the right move or whether your website needs the work first.', 'See our video work', '/our-work/#madwackd'],
  faq: [
    { q: 'How long should a local TV commercial be?', a: 'Thirty seconds is the standard slot for local TV, and fifteen works for a tight offer. Treat the length as a ceiling. One of our three spots runs twenty-six seconds because the story was finished, and extra seconds would have weakened it. Plan a vertical 9:16 social cut at the same time.' },
    { q: 'What goes in the first three seconds?', a: 'A picture of the viewer&rsquo;s problem, before anyone speaks or a logo appears. A phone that never rings does the job faster than a company name. This is our working rule from making these spots, not a published statistic.' },
    { q: 'Do TV stations have loudness rules for commercials?', a: 'Yes. Since December 13, 2012, FCC rules under the CALM Act require stations and pay-TV providers to keep a commercial&rsquo;s average volume the same as the program it runs in. Ask your station for its target. We delivered broadcast masters at -24 LKFS and web copies at -16 LUFS.' },
    { q: 'What file specs does a station usually want?', a: 'Our broadcast masters are 1920x1080 at -24 LKFS. Stations may also want 29.97 frames per second and their own slate and ISCI or Ad-ID code. Requirements vary by station, so get the spec sheet in writing before you finish the edit.' },
    { q: 'Should the people in an ad be real customers?', a: 'If you show a testimonial, use a real customer with a signed release. If you show a dramatization, label it. Our three spots use dramatized people with a &ldquo;Dramatization&rdquo; super on screen, and the exports are marked AI-generated.' },
    { q: 'Why add the phone number in the edit instead of generating it?', a: 'Because a wrong digit costs you calls. We add phone numbers, logos and supers in the edit with real fonts, so they are exact and can be changed without remaking a clip.' },
    { q: 'How much does a commercial like this cost?', a: 'Madwackd&rsquo;s done-for-you commercial spots start at $2,500, with music videos from $5,000, and prices are shown before every render. Media buying (what the station charges to run the spot) is separate, so get that quote too.' },
  ],
  sources: [
    ['FCC: Loud Commercials on TV (consumer guide)', 'https://www.fcc.gov/consumers/guides/loud-commercials-tv', 'CALM Act rules effective December 13, 2012; average volume, not an absolute cap'],
    ['ANA: Ad-ID replaces ISCI as the official industry standard', 'https://www.ana.net/content/show/id/pr-2007-industry-standard', 'commercial identification codes'],
  ],
  more: [['Does video help you show up in AI search?', '/blog/video-ai-search-local-business/', 'The search side of video'], ['Video SEO services', '/video-seo/', 'Pages and schema around your video'], ['AI agents for business', '/ai-agents-for-business/', 'Answer the calls the spot brings in']],
  style: css,
};
