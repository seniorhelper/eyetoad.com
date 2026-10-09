
(function(){
  var hdr=document.getElementById('hdr');
  var burger=document.getElementById('burger');
  var mobNav=document.getElementById('mobNav');

  function measureHeader(){
    var r=hdr.getBoundingClientRect();
    mobNav.style.top=Math.max(0,r.bottom)+'px';
  }
  var _sc=null;
  window.addEventListener('scroll',function(){
    var s=window.scrollY>30; if(s===_sc) return; _sc=s;
    hdr.classList.toggle('scrolled',s);
    requestAnimationFrame(measureHeader);
  },{passive:true});
  window.addEventListener('resize',measureHeader);
  measureHeader();

  burger.addEventListener('click',function(){
    measureHeader();
    var o=mobNav.classList.toggle('open');
    burger.classList.toggle('open',o);
    burger.setAttribute('aria-expanded',o);
    document.body.classList.toggle('nav-open',o);
    document.body.style.overflow=o?'hidden':'';
    if(o)mobNav.scrollTop=0;
  });

  var mobClose=document.getElementById('mobClose');
  if(mobClose)mobClose.addEventListener('click',function(){burger.click();});
  mobNav.querySelectorAll('.mob-acc').forEach(function(btn){
    btn.addEventListener('click',function(){
      var grp=document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen=btn.getAttribute('aria-expanded')==='true';
      mobNav.querySelectorAll('.mob-acc').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        var g=document.getElementById(b.getAttribute('aria-controls'));
        if(g)g.classList.remove('open');
      });
      if(!isOpen){btn.setAttribute('aria-expanded','true');if(grp)grp.classList.add('open');}
    });
  });

  mobNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded',false);
      document.body.classList.remove('nav-open');
      document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&mobNav.classList.contains('open')){burger.click();}
  });

  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(el){
        el.classList.remove('open');
        el.querySelector('.faq-q').setAttribute('aria-expanded',false);
      });
      if(!wasOpen){item.classList.add('open');btn.setAttribute('aria-expanded',true);}
    });
  });
})();
(function(){
  var bar=document.getElementById('askbar');
  var composer=document.getElementById('ask');
  if(!bar||!composer||!('IntersectionObserver' in window))return;
  new IntersectionObserver(function(e){
    var show=!e[0].isIntersecting;
    bar.classList.toggle('show',show);
    bar.setAttribute('aria-hidden',show?'false':'true');
  },{threshold:0}).observe(composer);
  var btn=document.getElementById('askbarBtn');
  if(btn) btn.addEventListener('click',function(){
    setTimeout(function(){ var q=document.getElementById('q'); if(q&&window.innerWidth>480) q.focus(); },420);
  });
})();

(function(){
  var q = document.getElementById('gd-q'), a = document.getElementById('gd-a'),
      box = document.getElementById('gd-box');
  if (!q || !a) return;

  var EX = [
    {q:'Do I need an LLC before I start?',
     a:'<b>Usually not on day one.</b> You can trade as a sole proprietor while you test whether the thing works. Form the LLC when you have real revenue, real liability, or a customer who asks for it \u2014 with the state filing link attached.'},
    {q:'How do I price my work without guessing?',
     a:'<b>Start from your costs and your target margin, not the competition.</b> Their price reflects their cost structure, which you cannot see. Full walkthrough, with the break-even arithmetic done for you.'},
    {q:'What should I fix first?',
     a:'<b>Find the constraint.</b> It is almost always one of four \u2014 cash, leads, conversion or capacity \u2014 and fixing anything downstream of it changes nothing at all.'},
    {q:'Where do I get free help for my business?',
     a:'<b>SBA, SCORE and your local SBDC.</b> Free mentoring, free plan review, often free training \u2014 funded already, and almost nobody uses them. Direct links included.'}
  ];

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}

  if (reduce){
    q.textContent = EX[0].q; a.innerHTML = EX[0].a; a.classList.add('on');
    q.style.setProperty('--none','1');
    return;
  }

  var i = 0, timers = [];
  function t(fn, ms){ timers.push(setTimeout(fn, ms)); }
  function clear(){ timers.forEach(clearTimeout); timers = []; }

  function run(){
    clear();
    var ex = EX[i % EX.length]; i++;
    a.classList.remove('on'); a.innerHTML = ''; q.textContent = '';
    var n = 0;
    (function type(){
      if (n <= ex.q.length){
        q.textContent = ex.q.slice(0, n); n++;
        t(type, 55);
      } else {
        t(function(){ a.innerHTML = ex.a; a.classList.add('on'); }, 380);
        t(run, 6200);
      }
    })();
  }

  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ if (e.isIntersecting) run(); else clear(); });
    }, {threshold:.2});
    io.observe(box);
  } else { run(); }
})();

(function(){
  var links=document.querySelectorAll('a.eml[data-u][data-d]');
  for(var i=0;i<links.length;i++){(function(a){
    a.addEventListener('click',function(e){e.preventDefault();
      window.location.href='mailto:'+a.getAttribute('data-u')+'@'+a.getAttribute('data-d');});
  })(links[i]);}
})();


var _TO = ('inf' + 'o') + '@' + 'eyetoad' + '.com';

const CATS = [
  {id:'growth',  name:'Growing revenue'},
  {id:'money',   name:'Cash, pricing & funding'},
  {id:'start',   name:'Starting out'},
  {id:'plan',    name:'Business plans'},
  {id:'legal',   name:'Structure & registration'},
  {id:'license', name:'Licenses & permits'},
  {id:'tax',     name:'Taxes'},
  {id:'books',   name:'Banking & bookkeeping'},
  {id:'insure',  name:'Insurance & risk'},
  {id:'hire',    name:'Hiring & team'},
  {id:'market',  name:'Marketing & customers'},
  {id:'mind',    name:'Owner, mindset & exit'}
];

const SYN = {
  'ein':'ein tax id employer identification',
  'tin':'ein tax id',
  'tax id':'ein tax id',
  'llc':'llc limited liability entity structure',
  's corp':'scorp s-corporation entity structure',
  's-corp':'scorp s-corporation entity structure',
  'scorp':'scorp s-corporation entity structure',
  'c corp':'ccorp corporation entity structure',
  'inc':'corporation entity structure',
  'dba':'dba trade name fictitious',
  'doing business as':'dba trade name',
  'sole prop':'sole proprietor',
  'sole proprietorship':'sole proprietor',
  'biz':'business',
  'co':'colorado',
  'sos':'secretary of state',
  'gbp':'google business profile',
  'gmb':'google business profile',
  'seo':'seo search rankings google',
  'ppc':'ads advertising paid',
  'adwords':'google ads advertising paid',
  '1099':'1099 contractor freelancer',
  'w2':'w2 employee payroll',
  'w-2':'w2 employee payroll',
  'p and l':'profit loss income statement',
  'p&l':'profit loss income statement',
  'cogs':'cost of goods margin',
  'roi':'return on investment',
  'ltv':'lifetime value customer worth',
  'cac':'acquisition cost customer',
  'kpi':'metrics numbers track',
  'ar':'receivable invoice payment',
  'startup':'start starting new',
  'wanna':'want',
  'gonna':'going',
  'how much':'cost price',
  'do i need':'need required',
  'is it required':'need required',
  'am i required':'need required',
  'scale up':'scale grow growth',
  'level up':'grow growth',
  'blow up':'grow growth',
  'take off':'grow growth'
};

const STOP = new Set(('a an the and or but if is are was were be been being of for to in on at by with about as it its i my me we our you your do does did can could should would will shall have has had how what when where why who which that this there here get got need needs any some so than then just really very much more most also from into out up down over under again further too only own same s t just don now business businesses my me im ive').split(' '));

const KB = [

{id:'grow-how', cat:'growth',
 q:'How do I grow my business?',
 alt:['How can I grow?','I want to grow my business','Help me grow'],
 kw:['grow my business','how do i grow','want to grow','help me grow','growing my business','business growth','grow the business','increase revenue','grow revenue','expand my business','take my business to the next level','next level'],
 a:`<p>There are only <strong>four ways</strong> to increase revenue. Everything else is one of these four wearing a costume.</p>
 <ol>
 <li><strong>Raise prices.</strong> No new customers, no extra delivery cost. The whole increase becomes profit on your next invoice.</li>
 <li><strong>Sell more to each customer.</strong> They already trust you, so the expensive part is paid for.</li>
 <li><strong>Get them buying more often.</strong> Most repeat business is lost to silence, not dissatisfaction.</li>
 <li><strong>Find more customers.</strong> The slowest and priciest lever &mdash; and where nearly everyone starts.</li>
 </ol>
 <p>They are listed cheapest first on purpose. Work them in that order and you spend less for faster results.</p>
 <div class="callout"><strong>The compounding bit:</strong> improve leads, close rate, average sale and repeat rate by 10% each and you multiply to roughly a <strong>46% revenue increase</strong>. Four boring changes beat one heroic one.</div>
 <p>Before picking a lever, though, find your constraint &mdash; the first stage of your funnel that is genuinely broken. Fixing anything downstream of it changes nothing.</p>`,
 links:[['SBA business guide — grow your business','https://www.sba.gov/business-guide/grow-your-business','sba.gov'],
        ['SCORE free mentoring','https://www.score.org/','score.org']],
 next:['constraint','pricing','grow-existing','speed-to-lead'], cap:true},

{id:'constraint', cat:'growth',
 q:'What is actually holding my business back?',
 alt:['Why am I stuck?','My business is stuck','What is my bottleneck?'],
 kw:['stuck','plateau','bottleneck','constraint','holding me back','whats wrong','flat revenue','not growing','stalled','hit a ceiling','cant grow','why am i stuck','business is flat'],
 a:`<p>Businesses break at one link at a time. Walk the ladder in order and stop at the first honest "no."</p>
 <ol>
 <li><strong>Visibility</strong> &mdash; do enough of the right people know you exist?</li>
 <li><strong>Conversion</strong> &mdash; do the people who find you actually contact you?</li>
 <li><strong>Sales</strong> &mdash; do the people who contact you buy?</li>
 <li><strong>Delivery</strong> &mdash; can you serve them well at volume?</li>
 <li><strong>Retention</strong> &mdash; do they come back and refer?</li>
 <li><strong>Margin</strong> &mdash; does any of that leave you money?</li>
 </ol>
 <p>The first broken rung is your constraint. Everything downstream is decoration until it is fixed.</p>
 <div class="callout"><strong>The two classic misdiagnoses:</strong> "I need more leads" when the close rate is 15% (double the leads, double the waste), and "I need to work harder" when the margin is broken (more hours, more unprofitable work).</div>
 <p>There is a quieter third one. Sometimes the constraint is you &mdash; every decision routes through the owner, so the business cannot move faster than one person thinks. That is the ceiling most owner-operated businesses hit.</p>`,
 links:[['SCORE free mentoring','https://www.score.org/','score.org']],
 next:['grow-how','cro','pricing','owner-bottleneck'], cap:true},

{id:'grow-existing', cat:'growth',
 q:'How do I sell more to the customers I already have?',
 alt:['Upsell','Increase average order value','Sell more per customer'],
 kw:['sell more','existing customers','upsell','cross sell','average order','average sale','increase order value','more per customer','repeat customers','current customers'],
 a:`<p>This is the cheapest revenue in your business, and most owners leave it sitting there.</p>
 <p>An existing customer already trusts you. They already said yes. Consequently, the expensive part &mdash; earning the relationship &mdash; is a sunk cost you already paid.</p>
 <p><strong>What actually works:</strong></p>
 <ul>
 <li><strong>The obvious next thing.</strong> What will they need in six months anyway? Offer it now, before a competitor does.</li>
 <li><strong>Maintenance and service plans.</strong> Turns a one-time transaction into recurring revenue, which also smooths your cash flow.</li>
 <li><strong>Good-better-best packaging.</strong> Most people choose the middle. Adding a premium tier raises the average even when few buy it.</li>
 <li><strong>Bundles.</strong> Two things together at a small discount beats one thing at full price, almost every time.</li>
 <li><strong>Simply asking.</strong> Genuinely. Most customers do not know your full service list.</li>
 </ul>
 <p>Acquiring a new customer costs roughly 5 to 25 times what keeping one costs. So before you buy attention, check whether the money is already in your customer list.</p>`,
 links:[['SBA — grow your business','https://www.sba.gov/business-guide/grow-your-business','sba.gov']],
 next:['retention','pricing','referrals','grow-how']},

{id:'retention', cat:'growth',
 q:'How do I get customers to come back more often?',
 alt:['Repeat business','Customer retention','They only buy once'],
 kw:['come back','repeat business','retention','churn','loyalty','buy again','one time customers','keep customers','stay customers','frequency'],
 a:`<p>Start with the uncomfortable diagnosis: most customers do not leave because they were unhappy. They leave because you went quiet and they forgot.</p>
 <p><strong>What brings them back:</strong></p>
 <ul>
 <li><strong>A reason and a reminder.</strong> Seasonal service, annual check-up, replacement cycle. Put it in the calendar at the point of sale, not later.</li>
 <li><strong>Proactive contact.</strong> Call before they need you. It costs an hour a week and it is startlingly effective.</li>
 <li><strong>Subscriptions or plans</strong> where the model allows &mdash; predictable revenue changes how you run everything.</li>
 <li><strong>Onboarding that reduces early churn.</strong> Most cancellations happen in the first 90 days, before the value lands.</li>
 <li><strong>Win-back campaigns</strong> for customers who went dormant. They already know you; the ask is small.</li>
 </ul>
 <div class="callout">A 5% improvement in retention can move profit substantially, because retained customers cost nothing to acquire and tend to spend more over time. Meanwhile, most marketing budgets aim entirely at the front door.</div>`,
 links:[['SBA — grow your business','https://www.sba.gov/business-guide/grow-your-business','sba.gov']],
 next:['grow-existing','referrals','reviews','speed-to-lead']},

{id:'speed-to-lead', cat:'growth',
 q:'How fast should I respond to a new lead?',
 alt:['Response time','Leads go cold','Follow up speed'],
 kw:['respond to leads','response time','speed to lead','follow up','leads go cold','call back','how fast should i respond','slow to respond','missed calls','not following up'],
 a:`<p>Minutes, not hours. If you take one thing from this entire page, take this one &mdash; it is free and it works immediately.</p>
 <ul>
 <li>Responding within about <strong>five minutes</strong> makes you dramatically more likely to reach and qualify a lead than waiting even thirty.</li>
 <li>Most businesses take <strong>hours or days</strong>, and honestly believe they are faster than that.</li>
 <li>Whoever responds first usually wins the job, regardless of who was better.</li>
 <li>A meaningful share of inbound leads are <strong>never contacted at all</strong>. Not late &mdash; never.</li>
 </ul>
 <p><strong>How to fix it this week:</strong> instant alerts on every form and call, one named person responsible, an automated first touch within 60 seconds while a human gets to the phone, and a simple log so you can actually measure it.</p>
 <div class="callout">Measure your real response time for one week before you spend another dollar on traffic. If it is measured in hours, fix that first &mdash; more leads into a slow follow-up system just creates more waste.</div>`,
 links:[],
 next:['cro','crm','grow-how','sales-process'], cap:true},

{id:'owner-bottleneck', cat:'mind',
 q:'How do I stop being the bottleneck in my own business?',
 alt:['Everything runs through me','I cannot step away','Delegation'],
 kw:['bottleneck','everything goes through me','cant step away','delegate','delegation','burnout','working too much','no time','wearing all the hats','cant take a vacation','owner dependent'],
 a:`<p>This is the ceiling most owner-operated businesses hit, and it rarely feels like a business problem. It feels like being busy.</p>
 <p>The test: could the business run for two weeks without you? If not, you do not own a business &mdash; you own a demanding job with worse benefits.</p>
 <p><strong>How to get out of the middle:</strong></p>
 <ol>
 <li><strong>Track your time for a week.</strong> Genuinely, in writing. Most owners are shocked by the split between $15/hour work and $500/hour work.</li>
 <li><strong>List everything only you can do.</strong> Then challenge each item honestly. Usually about half is habit rather than necessity.</li>
 <li><strong>Document before you delegate.</strong> A written process turns "they cannot do it like me" into "they can now."</li>
 <li><strong>Delegate outcomes, not tasks.</strong> Handing over a task keeps the decision with you, which keeps the bottleneck intact.</li>
 <li><strong>Accept 80%.</strong> Waiting for someone to do it exactly your way guarantees you keep doing it.</li>
 </ol>
 <p>Worth noting: reducing owner dependence is also the single biggest driver of what your business is worth if you ever sell it. A company that requires you is difficult to sell at any price.</p>`,
 links:[['SCORE free mentoring','https://www.score.org/','score.org']],
 next:['hire-first','systems','exit','constraint']},

{id:'systems', cat:'mind',
 q:'How do I build systems so the business runs without me?',
 alt:['SOPs','Document processes','Standard operating procedures'],
 kw:['systems','sop','processes','document','procedures','operations','consistency','runs without me','playbook','standardize'],
 a:`<p>A system is just a decision you only have to make once. That is the whole idea.</p>
 <p><strong>Where to start, in order of payback:</strong></p>
 <ul>
 <li><strong>The thing you explain most often.</strong> If you have said it three times, write it down.</li>
 <li><strong>The thing that goes wrong most often.</strong> Errors are almost always a missing checklist rather than a careless person.</li>
 <li><strong>Anything a customer touches.</strong> Consistency is a brand asset. If the experience depends on which employee they get, your brand is a coin flip.</li>
 <li><strong>Anything involving money.</strong> Quoting, invoicing, collections, refunds.</li>
 </ul>
 <p>Keep it light. A one-page checklist that people use beats a 40-page manual nobody opens. Record a screen video and transcribe it if writing feels like a chore.</p>
 <div class="callout">Practical trick: the next time you do a repeatable task, write the steps as you go. Documentation is nearly free when it happens during the work and expensive when scheduled separately.</div>`,
 links:[['SBA — manage your business','https://www.sba.gov/business-guide/manage-your-business','sba.gov']],
 next:['owner-bottleneck','hire-first','exit']},

{id:'numbers', cat:'growth',
 q:'What numbers should I be tracking?',
 alt:['KPIs','Business metrics','What should I measure?'],
 kw:['numbers','metrics','kpi','track','measure','dashboard','what should i measure','reporting','scorecard'],
 a:`<p>Five numbers cover most decisions. If you know these, you can diagnose almost anything.</p>
 <ul>
 <li><strong>Leads per month</strong> &mdash; is visibility working?</li>
 <li><strong>Close rate</strong> &mdash; is sales working?</li>
 <li><strong>Average transaction value</strong> &mdash; is pricing and packaging working?</li>
 <li><strong>Repeat rate</strong> &mdash; is retention working?</li>
 <li><strong>Cash runway in weeks</strong> &mdash; how long do you have to fix any of the above?</li>
 </ul>
 <p>Two more that govern every marketing decision you will ever make:</p>
 <ul>
 <li><strong>Customer lifetime value</strong> &mdash; average sale &times; purchases per year &times; years retained, minus cost to deliver.</li>
 <li><strong>Cost to acquire a customer</strong> &mdash; total acquisition spend &divide; customers gained. A healthy ratio is roughly 3:1 lifetime value to acquisition cost.</li>
 </ul>
 <div class="callout">Improve leads, close rate, average sale and repeat rate by 10% each and you compound to about <strong>+46% revenue</strong>. That is the argument for tracking rather than guessing.</div>`,
 links:[['SCORE financial templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org']],
 next:['breakeven','pricing','market-budget','constraint']},

{id:'referrals', cat:'growth',
 q:'How do I get more referrals?',
 alt:['Referral program','Word of mouth','Get people to refer me'],
 kw:['referral','referrals','word of mouth','refer a friend','recommendations','introductions','referral program'],
 a:`<p>Most businesses say referrals are their best channel, then do absolutely nothing to encourage them. That is a lot of money left to chance.</p>
 <p><strong>What turns luck into a system:</strong></p>
 <ul>
 <li><strong>Ask specifically.</strong> "Send people my way" produces nothing. "Do you know one person dealing with this right now?" produces names.</li>
 <li><strong>Ask at the peak.</strong> Right after a great outcome, while the feeling is fresh.</li>
 <li><strong>Make it easy.</strong> Give them something forwardable &mdash; a link, a short description, a card.</li>
 <li><strong>Close the loop.</strong> Tell the referrer what happened and thank them. People who feel appreciated refer again.</li>
 <li><strong>Build referral partnerships.</strong> Businesses serving the same customer without competing. A plumber and an electrician can feed each other work for decades.</li>
 </ul>
 <p>Keep any incentive modest and legal &mdash; and never offer anything in exchange for a public review, which violates platform policy and FTC guidance.</p>`,
 links:[['FTC endorsement guides','https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides','ftc.gov']],
 next:['reviews','retention','grow-existing']},

{id:'exit', cat:'mind',
 q:'How do I increase what my business is worth?',
 alt:['Selling my business','Business valuation','Exit planning'],
 kw:['sell my business','worth','valuation','exit','buyer','sell the company','what is my business worth','retire'],
 a:`<p>Buyers pay for predictable profit that continues after you leave. So value is built by removing yourself, not by adding revenue.</p>
 <p><strong>What raises the multiple:</strong></p>
 <ul>
 <li><strong>Low owner dependence.</strong> If the business needs you, a buyer is purchasing a job. That is worth far less.</li>
 <li><strong>Recurring or contracted revenue.</strong> Predictability is worth more than size.</li>
 <li><strong>Customer concentration under control.</strong> If one client is 40% of revenue, that is a discount, not an asset.</li>
 <li><strong>Clean books.</strong> Three years of accurate, separated financials. Commingled personal spending destroys valuations.</li>
 <li><strong>Documented systems</strong> so operations transfer with the keys.</li>
 <li><strong>A management layer</strong> that already makes decisions without you.</li>
 </ul>
 <p>Start three years before you intend to sell. Every item above takes time and none can be faked during due diligence.</p>`,
 links:[['SBA — closing or selling your business','https://www.sba.gov/business-guide/manage-your-business/close-or-sell-your-business','sba.gov'],
        ['SCORE free mentoring','https://www.score.org/','score.org']],
 next:['owner-bottleneck','systems','bookkeeping']},

{id:'compete', cat:'growth',
 q:'How do I compete with a bigger competitor?',
 alt:['Big competitor','Competing with a chain','They have more money'],
 kw:['competitor','competition','bigger competitor','chain','franchise competitor','outspend me','compete','they are bigger','national competitor'],
 a:`<p>Do not fight on their ground. Large competitors win on price, breadth and recognition, so pick terrain where size is a liability.</p>
 <p><strong>What a big company genuinely struggles to copy:</strong></p>
 <ul>
 <li><strong>Speed.</strong> They have approval chains. You have a phone.</li>
 <li><strong>Specialization.</strong> Being the obvious choice for one narrow thing beats being an option for everything.</li>
 <li><strong>Owner access.</strong> "You will work with me directly" is a genuine differentiator to a lot of buyers.</li>
 <li><strong>Local knowledge and relationships.</strong> Difficult to replicate from a regional office.</li>
 <li><strong>Flexibility.</strong> You can say yes to something unusual without a committee.</li>
 </ul>
 <p>In local search specifically, ranking rewards relevance, proximity and signals like reviews rather than company size. That is exactly why a well-run small business regularly outranks a national chain in its own city.</p>`,
 links:[],
 next:['gbp','reviews','pricing','seo-worth']}
];

KB.push(
{id:'pricing', cat:'money',
 q:'Am I charging enough? How should I price?',
 alt:['What should I charge?','How do I raise my prices?','Pricing strategy'],
 kw:['pricing','price','what to charge','how much to charge','charging enough','undercharging','raise prices','raise my rates','my rates','set prices','too cheap','price increase'],
 a:`<p>Probably not, and working harder will never fix it. Underpricing is the most common self-inflicted wound in small business.</p>
 <p><strong>Three approaches:</strong></p>
 <ul>
 <li><strong>Cost-plus</strong> &mdash; total cost plus target margin. A floor, not a strategy, but you must know it.</li>
 <li><strong>Market-based</strong> &mdash; what comparable providers charge. A useful reference; being cheapest is a fragile position.</li>
 <li><strong>Value-based</strong> &mdash; what the outcome is worth to the customer. Highest ceiling, hardest to execute, because it requires you to articulate the outcome clearly.</li>
 </ul>
 <p><strong>Build your floor honestly.</strong> Materials, your own time at a real hourly rate, overhead allocation, taxes, and profit as a deliberate line item &mdash; not whatever happens to be left over. If that floor sits near your current price, you have bought yourself a job.</p>
 <div class="callout"><strong>Raising prices:</strong> new customers first, existing customers with notice and a reason. Expect to lose some, and expect them to be your least profitable. A 10% price rise usually beats a 10% volume rise, because it costs nothing to deliver.</div>`,
 links:[['SBA — pricing and marketing','https://www.sba.gov/business-guide/manage-your-business/marketing-sales','sba.gov']],
 next:['breakeven','margin','grow-how','numbers'], cap:true},

{id:'cashflow', cat:'money',
 q:'Why am I profitable but always out of cash?',
 alt:['Cash flow problems','Profitable but broke','No money in the bank'],
 kw:['cash flow','cashflow','profitable but broke','out of cash','no cash','short on cash','money problems','cant make payroll','tight on cash','cash crunch'],
 a:`<p>Because profit and cash are different things measured on different clocks. This surprises almost everyone, and it closes otherwise-healthy businesses.</p>
 <p>Profit records a sale when you <em>earn</em> it. Cash arrives when the customer actually <em>pays</em>. Those events can be sixty days apart, and rent does not care about accrual accounting.</p>
 <p><strong>Where the cash actually goes:</strong></p>
 <ul>
 <li><strong>Receivables</strong> &mdash; work delivered, invoice unpaid.</li>
 <li><strong>Inventory</strong> &mdash; money converted into things on a shelf.</li>
 <li><strong>Loan principal</strong> &mdash; drains cash without appearing as an expense on your P&amp;L.</li>
 <li><strong>Owner draws</strong> taken on feel rather than on a schedule.</li>
 <li><strong>Sales tax</strong> spent because it was sitting in the account. It was never yours.</li>
 </ul>
 <div class="callout"><strong>The fix:</strong> a rolling <strong>13-week cash forecast</strong> beside your P&amp;L. Every dollar in and out, week by week, updated each Monday in fifteen minutes. It converts surprises into problems you can see coming two months out.</div>
 <p>Cash flow is the most commonly cited cause of small business failure. Not bad ideas &mdash; timing.</p>`,
 links:[['SCORE financial templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org'],
        ['SBA — manage your finances','https://www.sba.gov/business-guide/manage-your-business/manage-your-finances','sba.gov']],
 next:['getting-paid','breakeven','funding','bookkeeping'], cap:true},

{id:'getting-paid', cat:'money',
 q:'How do I get clients to pay on time?',
 alt:['Late payments','Clients not paying','Invoicing'],
 kw:['get paid','late payment','invoice','clients not paying','collect payment','payment terms','chasing payment','unpaid invoice','deadbeat client'],
 a:`<p>Most late payment is a systems problem, not a character problem. Fix the system before you fix the relationship.</p>
 <ul>
 <li><strong>Take deposits.</strong> 30&ndash;50% up front on project work filters out people who were never going to pay.</li>
 <li><strong>Shorten terms.</strong> Net 15 rather than Net 30. There is rarely a reason for 30 days on small work.</li>
 <li><strong>Invoice immediately.</strong> Every day you delay adds a day to payment.</li>
 <li><strong>Remove friction.</strong> Card and ACH links in the invoice. Processing fees cost less than a 45-day wait.</li>
 <li><strong>Automate reminders</strong> &mdash; before the due date, then at 3, 7 and 14 days after.</li>
 <li><strong>Put a late fee in the contract and apply it.</strong> Unenforced terms simply train customers to ignore you.</li>
 <li><strong>Stop work on non-payment</strong>, and say so in the contract so it is never a surprise.</li>
 </ul>
 <p>For genuinely delinquent accounts, escalate on a schedule rather than emotionally: formal demand letter, then small claims for smaller amounts, then collections.</p>`,
 links:[],
 next:['cashflow','contracts','pricing']},

{id:'breakeven', cat:'money',
 q:'How do I calculate my break-even point?',
 alt:['Break even analysis','How much do I need to sell?'],
 kw:['break even','breakeven','how much do i need to sell','cover my costs','break-even point','minimum sales'],
 a:`<p>Break-even is the point where you stop losing money. Three inputs, and you should know all three without looking them up.</p>
 <ul>
 <li><strong>Fixed costs</strong> &mdash; rent, insurance, software, salaries. These happen whether you sell anything or not.</li>
 <li><strong>Variable costs</strong> &mdash; materials, job labor, processing fees. These scale with sales.</li>
 <li><strong>Contribution margin</strong> &mdash; price minus variable cost, per job or unit.</li>
 </ul>
 <p><strong>Break-even units = fixed costs &divide; contribution margin.</strong></p>
 <p><em>Example:</em> $6,000/month fixed, average job $900 with $400 variable. Contribution margin is $500. Therefore you need <strong>12 jobs a month</strong> to reach zero.</p>
 <div class="callout">Now the useful follow-up: can you deliver 12 jobs a month, and do you have a channel that reliably produces 12? If either answer is no, the problem is pricing or capacity &mdash; not effort.</div>`,
 links:[['SBA startup cost calculator','https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs','sba.gov']],
 next:['pricing','margin','numbers','cashflow']},

{id:'margin', cat:'money',
 q:'How do I improve my profit margin?',
 alt:['Low margins','Not making money','Improve profitability'],
 kw:['margin','profit margin','profitability','not making money','low margin','improve profit','make more profit','thin margins'],
 a:`<p>Margin is the difference between a business and an expensive hobby. Four levers, roughly in order of speed:</p>
 <ol>
 <li><strong>Raise prices.</strong> Fastest, and the entire increase is margin.</li>
 <li><strong>Cut cost of delivery</strong> &mdash; better suppliers, less rework, less waste, tighter scheduling. Rework is usually the quiet killer.</li>
 <li><strong>Fire unprofitable work.</strong> Most businesses have customers or service lines that lose money and have never checked which. Run the numbers by job type.</li>
 <li><strong>Reduce overhead</strong> &mdash; last, because it is the smallest lever and the most demoralising.</li>
 </ol>
 <p>Do the analysis before the action. Calculate profit by job type, by customer, and by service line. Nearly every business finds something surprising, and it is frequently the thing they are proudest of.</p>
 <div class="callout">Volume never fixes a broken margin. It multiplies it. Selling more of something unprofitable simply loses money faster.</div>`,
 links:[],
 next:['pricing','breakeven','numbers','cashflow']},

{id:'funding', cat:'money',
 q:'How do I get funding or capital to grow?',
 alt:['Business loan','Where can I get money?','Raise capital'],
 kw:['funding','loan','business loan','capital','financing','raise money','borrow','investors','need money','line of credit','sba loan'],
 a:`<p>Ranked by how accessible each genuinely is, rather than how exciting it sounds:</p>
 <ul>
 <li><strong>Retained profit.</strong> Unglamorous and by far the cheapest. Many service businesses never need anything else.</li>
 <li><strong>Better terms.</strong> Deposits, shorter payment windows, faster invoicing. This is capital you already earned and have not collected.</li>
 <li><strong>Personal savings.</strong> Still the most common startup source, and lenders read it as a commitment signal.</li>
 <li><strong>A line of credit opened before you need it.</strong> The SBA identifies access to capital as a leading barrier to growth. Apply while things are going well &mdash; that is when you qualify.</li>
 <li><strong>SBA-guaranteed loans.</strong> Government-backed through banks. Better terms than conventional, but slower and paperwork-heavy. Microloans reach $50,000.</li>
 <li><strong>Bank or credit union lending.</strong> Realistic with two years of returns and consistent revenue.</li>
 <li><strong>Grants.</strong> Real but narrow. Every legitimate federal grant is free to search on Grants.gov.</li>
 <li><strong>Investors.</strong> Only if you are building toward a large exit. Wrong tool for most local businesses.</li>
 </ul>
 <div class="callout">Your local SBDC and SCORE will prepare your loan package at no cost. That is the highest-value free resource in this entire category and almost nobody uses it.</div>`,
 links:[['SBA loan programs','https://www.sba.gov/funding-programs/loans','sba.gov'],
        ['SBA Lender Match','https://www.sba.gov/funding-programs/loans/lender-match','sba.gov'],
        ['Grants.gov','https://www.grants.gov/','grants.gov'],
        ['Find your local SBDC','https://americassbdc.org/','americassbdc.org']],
 next:['loan-req','grants','credit','cashflow']},

{id:'loan-req', cat:'money',
 q:'What do lenders look for in a loan application?',
 alt:['Qualify for a business loan','What does a bank want?'],
 kw:['qualify for a loan','lender requirements','loan application','what banks want','approved for a loan','loan denied'],
 a:`<p>Six questions, roughly in this order:</p>
 <ol>
 <li><strong>What is your credit?</strong> Personal and business. This gate decides whether the rest gets read.</li>
 <li><strong>What will you use it for?</strong> Specificity wins. "Working capital to cover a 60-day receivables gap" beats "growth."</li>
 <li><strong>How will you repay?</strong> Cash flow projections that service the debt with margin to spare.</li>
 <li><strong>What collateral?</strong> Important for bank and SBA lending.</li>
 <li><strong>Will you personally guarantee it?</strong> Nearly always yes &mdash; which means your LLC does not shield you from this particular debt.</li>
 <li><strong>What experience do you have?</strong> Industry track record carries real weight.</li>
 </ol>
 <p>Bring: business plan, three years of projections, personal and business tax returns, bank statements, a debt schedule, and your entity documents. An SBDC will help you assemble all of it free of charge.</p>`,
 links:[['SBA Lender Match','https://www.sba.gov/funding-programs/loans/lender-match','sba.gov'],
        ['Find your local SBDC','https://americassbdc.org/','americassbdc.org']],
 next:['funding','credit','plan-projections','plan-need']},

{id:'grants', cat:'money',
 q:'Are there grants for small businesses?',
 alt:['Free money','Small business grants','Government grants'],
 kw:['grants','free money','grant money','government grants','grant funding','apply for a grant'],
 a:`<p>Yes, but far fewer than the internet implies &mdash; and almost none for "starting a general small business."</p>
 <p><strong>Where real grants exist:</strong></p>
 <ul>
 <li>Federal research grants (SBIR/STTR) for technology and R&amp;D</li>
 <li>State and local economic development programs, often tied to job creation</li>
 <li>Industry-specific programs &mdash; agriculture, energy, rural development, exporting</li>
 <li>Targeted programs for veteran, minority, women-owned and rural businesses</li>
 <li>Private and corporate grant competitions, which are genuine but highly competitive</li>
 </ul>
 <div class="callout"><strong>Scam filter:</strong> every legitimate federal grant is listed free on Grants.gov. The government never charges to apply. Anyone charging a fee to "get you grant money" or guaranteeing approval is selling you a public database.</div>
 <p>Start with your local SBDC. They track state and regional programs that never surface in search results.</p>`,
 links:[['Grants.gov','https://www.grants.gov/','grants.gov'],
        ['SBIR/STTR research grants','https://www.sbir.gov/','sbir.gov'],
        ['Find your local SBDC','https://americassbdc.org/','americassbdc.org']],
 next:['funding','loan-req']},

{id:'credit', cat:'money',
 q:'How do I build business credit?',
 alt:['Business credit score','Separate business credit'],
 kw:['business credit','credit score','build credit','duns','credit profile','establish credit'],
 a:`<p>Business credit builds separately from personal credit, and it takes time. Start before you need it.</p>
 <ol>
 <li>Form a legal entity and get an EIN.</li>
 <li>Open a business bank account in the entity's name.</li>
 <li>Get a free D-U-N-S number from Dun &amp; Bradstreet.</li>
 <li>Open accounts with vendors who report payment history &mdash; many suppliers do.</li>
 <li>Get a business card in the business name and pay it in full monthly.</li>
 <li>Pay everything early. Business credit scoring weights payment timing heavily.</li>
 </ol>
 <p>Realistic expectation: for the first few years lenders will still check your personal credit and require a personal guarantee. Business credit reduces that dependence gradually rather than eliminating it quickly.</p>`,
 links:[['Dun & Bradstreet D-U-N-S (free)','https://www.dnb.com/duns.html','dnb.com'],
        ['SBA — launch your business','https://www.sba.gov/business-guide/launch-your-business','sba.gov']],
 next:['bank-account','funding','loan-req']}
);

KB.push(
{id:'first-steps', cat:'start',
 q:'What are the first steps to start a business?',
 alt:['How do I start a business?','Where do I begin?'],
 kw:['start a business','first step','how do i start','begin a business','starting out','launch a business','get started','new business','open a business'],
 a:`<p>The order matters more than the speed. Doing these out of sequence creates rework, and rework is expensive when you are undercapitalised.</p>
 <ol>
 <li><strong>Validate the idea.</strong> Talk to 15&ndash;20 real potential customers before spending money. Look for people who already pay someone to solve this.</li>
 <li><strong>Price it and model it.</strong> What is one sale worth, and how many do you need monthly to cover costs?</li>
 <li><strong>Pick a structure</strong> and register with your Secretary of State.</li>
 <li><strong>Get an EIN</strong> free from the IRS &mdash; about ten minutes online.</li>
 <li><strong>Open a business bank account.</strong> Never run business money through a personal account.</li>
 <li><strong>Handle licenses and sales tax</strong> at state, county and city level.</li>
 <li><strong>Get insurance</strong> before your first customer, not after your first claim.</li>
 <li><strong>Set up how you get found</strong> &mdash; website, Google Business Profile, one or two channels you will actually work.</li>
 </ol>
 <div class="callout">Most people do step 8 first and step 1 never. Reversing that is most of the advantage available to a new business.</div>`,
 links:[['SBA — 10 steps to start a business','https://www.sba.gov/business-guide/plan-your-business','sba.gov'],
        ['SCORE free mentoring','https://www.score.org/','score.org'],
        ['Find your local SBDC','https://americassbdc.org/','americassbdc.org']],
 next:['validate','llc-vs-sole','startup-cost','plan-need'], cap:true},

{id:'validate', cat:'start',
 q:'How do I know if my business idea is any good?',
 alt:['Validate my idea','Will my idea work?'],
 kw:['good idea','validate','idea work','test my idea','is my idea','market research','will it work','viable'],
 a:`<p>An idea is validated when strangers pay you &mdash; not when friends say they like it. Three tests, cheapest first:</p>
 <ul>
 <li><strong>The competitor test.</strong> If nobody else does this, that is usually bad news rather than a gap. Find five businesses already charging for it and study how they sell.</li>
 <li><strong>The search test.</strong> Check whether people search for the problem. Real monthly demand in your city is cheap proof that a market exists.</li>
 <li><strong>The pre-sale test.</strong> Ask 20 target customers to commit &mdash; a deposit, a signed letter of intent, a booked slot. Verbal enthusiasm is worth nothing.</li>
 </ul>
 <p>Then answer the boring question honestly: can you reach these people repeatedly and affordably? A great idea with no cost-effective route to buyers is a hobby with extra steps.</p>`,
 links:[['SBA market research guide','https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis','sba.gov'],
        ['Census business data','https://www.census.gov/programs-surveys/susb.html','census.gov']],
 next:['startup-cost','pricing','market-first']},

{id:'startup-cost', cat:'start',
 q:'How much money do I need to start?',
 alt:['Startup costs','How much savings do I need?'],
 kw:['how much money','startup cost','cost to start','need to save','how much do i need to start','capital to start','savings'],
 a:`<p>Two numbers, and people almost always miss the second one.</p>
 <ol>
 <li><strong>One-time startup costs</strong> &mdash; registration, equipment, deposits, initial inventory, website, licenses, insurance.</li>
 <li><strong>Runway</strong> &mdash; enough cash to cover business expenses <em>and</em> your personal living expenses for 6 to 12 months with little revenue.</li>
 </ol>
 <p>Service businesses can often start for a few thousand dollars. Anything with a lease, inventory or vehicles climbs into the tens of thousands quickly.</p>
 <div class="callout">The most common failure is not a bad idea. It is running out of cash before the idea gained traction. Build the budget, then add 30%.</div>`,
 links:[['SBA startup cost calculator','https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs','sba.gov']],
 next:['funding','bank-account','plan-need','cashflow']},

{id:'quit-job', cat:'start',
 q:'Should I quit my job to start a business?',
 alt:['Side hustle','Go full time?'],
 kw:['quit my job','side hustle','part time business','full time','keep my job','while employed','leave my job'],
 a:`<p>Usually not yet. Starting on the side removes the biggest source of pressure &mdash; needing revenue immediately &mdash; which is what pushes people into bad pricing and worse clients.</p>
 <p><strong>Reasonable triggers for going full time:</strong></p>
 <ul>
 <li>The business covers your minimum living expenses for three consecutive months.</li>
 <li>You have 6+ months of personal runway saved separately.</li>
 <li>You are turning down work purely for lack of hours &mdash; a real ceiling, not a hoped-for one.</li>
 </ul>
 <p>Two cautions. Check your employment agreement for non-compete and moonlighting clauses. And never use employer time, equipment or client lists &mdash; that is how a side business becomes a lawsuit.</p>`,
 links:[],
 next:['startup-cost','llc-vs-sole','first-steps']}
);

KB.push(
{id:'plan-need', cat:'plan',
 q:'Do I need a business plan?',
 alt:['Is a business plan necessary?','Do I have to write a business plan?'],
 kw:['need a business plan','business plan required','do i need a plan','necessary business plan','have to write a plan','business plan'],
 a:`<p><strong>Yes &mdash; but probably not the 40-page kind you are picturing.</strong> There are two documents doing two different jobs, and confusing them is why most people stall.</p>
 <ul>
 <li><strong>A one-page working plan.</strong> Everyone needs this. Who the customer is, what you sell, what it costs to deliver, what you charge, how people find you, and your monthly break-even. It takes an afternoon and it actually changes decisions.</li>
 <li><strong>A full formal plan.</strong> Required only when someone else's money is involved &mdash; a bank or SBA loan, an investor, a commercial landlord, a grant, or certain licenses. Expect 15&ndash;30 pages with three years of projections.</li>
 </ul>
 <p>The real value is not the document. Writing it forces real numbers onto assumptions you have been carrying loosely. Most people discover their pricing is wrong or their acquisition cost is unknown &mdash; and finding that on paper costs a lot less than finding it in month eight.</p>
 <div class="callout">Self-funding a service business? Start with the one-pager. Write the formal plan when a lender asks.</div>`,
 links:[['SBA — write your business plan (free templates)','https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan','sba.gov'],
        ['SCORE plan and financial templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org'],
        ['Free SBDC plan review','https://americassbdc.org/','americassbdc.org']],
 next:['plan-whats-in','plan-projections','loan-req']},

{id:'plan-whats-in', cat:'plan',
 q:'What goes in a business plan?',
 alt:['Business plan sections','What should a plan include?'],
 kw:['what goes in a business plan','business plan sections','plan include','parts of a business plan','business plan outline','plan structure'],
 a:`<p>The standard lender-ready structure, in order:</p>
 <ol>
 <li><strong>Executive summary</strong> &mdash; write it last, one page, must stand alone.</li>
 <li><strong>Company description</strong> &mdash; what you do, structure, location, ownership.</li>
 <li><strong>Market analysis</strong> &mdash; size, target customer, competitors, and honestly why you win.</li>
 <li><strong>Organization and management</strong> &mdash; who does what, and their track record.</li>
 <li><strong>Products or services</strong> &mdash; what you sell, cost to deliver, pricing.</li>
 <li><strong>Marketing and sales</strong> &mdash; how customers find you and what one costs to acquire.</li>
 <li><strong>Funding request</strong> &mdash; amount, use of funds, repayment plan.</li>
 <li><strong>Financial projections</strong> &mdash; three years: income statement, cash flow, balance sheet.</li>
 <li><strong>Appendix</strong> &mdash; resumes, permits, leases, letters of intent.</li>
 </ol>
 <p>Lenders read the summary, the financials and the management section. Everything else is supporting evidence.</p>`,
 links:[['SBA plan templates','https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan','sba.gov'],
        ['SCORE templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org']],
 next:['plan-projections','loan-req','plan-need']},

{id:'plan-projections', cat:'plan',
 q:'How do I do financial projections with no history?',
 alt:['Forecast revenue','Projections for a new business'],
 kw:['financial projection','forecast revenue','projections no history','pro forma','three year projection','forecast','projections'],
 a:`<p>Build them <strong>bottom-up from units</strong>, never top-down from market share. "We will capture 1% of a $2B market" is the fastest way to lose a lender's confidence.</p>
 <p>Bottom-up looks like this:</p>
 <ul>
 <li>How many customers can you realistically serve per week, given hours and capacity?</li>
 <li>What is the average sale, and how often do they repeat?</li>
 <li>Multiply to monthly revenue, and ramp it &mdash; month one is not month twelve.</li>
 <li>Subtract cost of delivery, then fixed overhead, then owner pay.</li>
 </ul>
 <p>Show three scenarios &mdash; conservative, expected, optimistic &mdash; and write the assumptions behind each. Lenders trust a defensible low number far more than an exciting high one.</p>`,
 links:[['SCORE financial projection templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org'],
        ['SBA startup costs','https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs','sba.gov']],
 next:['breakeven','loan-req','bookkeeping']}
);

KB.push(
{id:'llc-vs-sole', cat:'legal',
 q:'Should I be a sole proprietor, an LLC, or an S-corp?',
 alt:['Do I need an LLC?','LLC vs sole proprietorship','Business structure'],
 kw:['llc or sole','need an llc','business structure','sole proprietor or llc','s corp or llc','entity structure','which structure','should i form an llc','incorporate'],
 a:`<p>Short version: <strong>sole proprietor</strong> is the default and costs nothing, <strong>LLC</strong> buys liability separation, and <strong>S-corp</strong> is a tax election you add later once profit justifies it.</p>
 <ul>
 <li><strong>Sole proprietor</strong> &mdash; no filing needed to exist, simplest taxes. But there is no legal line between you and the business, so a debt or lawsuit reaches your personal assets.</li>
 <li><strong>LLC</strong> &mdash; the common answer. Separates personal assets from business liability, taxed like a sole proprietor by default, modest filing cost. That protection only holds if you keep finances genuinely separate.</li>
 <li><strong>S-corp election</strong> &mdash; not a structure but a tax status an LLC or corporation can elect. It can reduce self-employment tax once net profit is consistently high enough to justify payroll and extra accounting. Below roughly $50&ndash;60K of net profit it usually costs more than it saves.</li>
 <li><strong>C-corp</strong> &mdash; for raising venture capital or issuing stock. Rare for local small business.</li>
 </ul>
 <div class="callout">Liability protection is the real reason to form an LLC. The tax savings people talk about come from the S-corp election, which is a separate decision made later.</div>
 <p>Worth 30 minutes with a CPA before you file. Converting later costs more.</p>`,
 links:[['SBA — choose a business structure','https://www.sba.gov/business-guide/launch-your-business/choose-business-structure','sba.gov'],
        ['IRS business structures','https://www.irs.gov/businesses/small-businesses-self-employed/business-structures','irs.gov']],
 next:['ein','register','scorp-when','bank-account']},

{id:'register', cat:'legal',
 q:'How do I register my business?',
 alt:['Register an LLC','Business registration','File with the state'],
 kw:['register a business','registration','file an llc','secretary of state','articles of organization','form an llc','register my company','mybizcolorado','colorado llc'],
 a:`<p>Registration happens at the <strong>state</strong> level, through your Secretary of State, and it is almost entirely online everywhere now.</p>
 <ol>
 <li><strong>Check your name</strong> is available in the state business database.</li>
 <li><strong>File Articles of Organization</strong> (LLC) or Incorporation (corporation).</li>
 <li><strong>Name a registered agent</strong> with a physical street address in that state &mdash; can be you.</li>
 <li><strong>Get your EIN</strong> free from the IRS.</li>
 <li><strong>Register for state taxes</strong> &mdash; sales tax, withholding and unemployment if you will have employees.</li>
 <li><strong>Register with your city or county</strong> if required. This is a separate step and the most commonly missed one.</li>
 <li><strong>File your annual or periodic report</strong> to stay in good standing.</li>
 </ol>
 <p>Operating under a name different from your legal entity name? File a trade name (DBA) too.</p>
 <div class="callout">Registering an entity and getting licensed are different things. Forming an LLC does not license you to do anything.</div>
 <p><strong>Colorado specifically:</strong> <a href="https://mybiz.colorado.gov/" target="_blank" rel="noopener">MyBizColorado</a> handles state registration, sales tax license, unemployment insurance and FAMLI in one portal.</p>`,
 links:[['SBA — register your business','https://www.sba.gov/business-guide/launch-your-business/register-your-business','sba.gov'],
        ['MyBizColorado','https://mybiz.colorado.gov/','mybiz.colorado.gov'],
        ['Colorado Secretary of State','https://www.coloradosos.gov/','coloradosos.gov']],
 next:['ein','licenses','llc-vs-sole','sales-tax']},

{id:'ein', cat:'legal',
 q:'What is an EIN and do I need one?',
 alt:['Employer Identification Number','Tax ID number','How do I get an EIN?'],
 kw:['ein','employer identification number','tax id number','federal tax id','get an ein','need an ein'],
 a:`<p>An EIN is a federal tax ID for your business &mdash; the business equivalent of a Social Security number. It is <strong>free</strong> and takes about ten minutes on the IRS site.</p>
 <p><strong>You must have one if you:</strong></p>
 <ul>
 <li>Formed a multi-member LLC, a corporation, or a partnership</li>
 <li>Have employees, or will run payroll</li>
 <li>File certain excise or employment tax returns</li>
 </ul>
 <p><strong>Get one anyway</strong> as a single-member LLC or sole proprietor. Banks generally require it to open a business account, clients ask for it on W-9 forms, and it keeps your SSN off documents circulating among vendors.</p>
 <div class="callout">Apply directly at irs.gov. Sites charging $79 to "file" your EIN are reselling a free government form.</div>`,
 links:[['IRS — apply for an EIN online (free)','https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online','irs.gov']],
 next:['bank-account','register','sales-tax']},

{id:'scorp-when', cat:'legal',
 q:'When does an S-corp election make sense?',
 alt:['Should I elect S-corp?','S-corp tax savings'],
 kw:['s corp election','elect s corp','s corporation savings','self employment tax savings','reasonable salary'],
 a:`<p>An S-corp election splits your income into a reasonable W-2 salary plus distributions, and only the salary is subject to self-employment tax. That is where the savings come from.</p>
 <p><strong>The offsetting costs are real:</strong></p>
 <ul>
 <li>You must run actual payroll, with filings and deposits</li>
 <li>A separate business tax return each year</li>
 <li>Higher accounting fees, typically $1,500&ndash;$3,000+ annually</li>
 <li>The IRS requires the salary to be "reasonable" &mdash; paying yourself $10K and taking $150K in distributions invites an audit</li>
 </ul>
 <p>As a rough screen, the maths starts working somewhere above roughly $50&ndash;60K in consistent net profit. Below that, compliance costs eat the savings. Run the actual numbers with a CPA rather than following a rule of thumb.</p>`,
 links:[['IRS S corporations','https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations','irs.gov']],
 next:['llc-vs-sole','taxes','cpa']},

{id:'contracts', cat:'legal',
 q:'Do I need written contracts with clients?',
 alt:['Client agreement','Should I use a contract?'],
 kw:['contract','client agreement','written agreement','terms of service','do i need a contract','scope creep'],
 a:`<p>Yes, on every job, including for friends &mdash; especially for friends. A contract's real job is not winning a lawsuit. It is preventing the disagreement that leads to one.</p>
 <p><strong>At minimum, put in writing:</strong></p>
 <ul>
 <li><strong>Scope</strong> &mdash; what is included, plus a line naming what is not</li>
 <li><strong>Price and payment terms</strong> &mdash; deposit, schedule, late consequences</li>
 <li><strong>Timeline</strong> &mdash; and what happens if either side causes a delay</li>
 <li><strong>Change orders</strong> &mdash; how extra work gets approved and priced</li>
 <li><strong>Termination</strong> &mdash; how either party exits and what is owed</li>
 <li><strong>Ownership</strong> &mdash; who owns the work product when it is done</li>
 </ul>
 <p>Have a lawyer draft your standard template once. You will reuse it for years, which makes it one of the better returns on legal spend available.</p>`,
 links:[['SCORE free mentoring','https://www.score.org/','score.org']],
 next:['getting-paid','insurance','hire-1099']},

{id:'trademark', cat:'legal',
 q:'Should I trademark my business name?',
 alt:['Protect my business name','Trademark vs registration'],
 kw:['trademark','protect my name','brand protection','uspto','copyright my name','name conflict'],
 a:`<p>State registration and trademarking are unrelated. Registering with your state stops another entity in that state filing the identical name. It does not stop a company elsewhere using it, and it does not protect a logo or slogan.</p>
 <p><strong>A federal trademark is worth pursuing when:</strong></p>
 <ul>
 <li>You sell across state lines or online nationally</li>
 <li>The brand name is a real asset you are investing in</li>
 <li>You are franchising or licensing</li>
 </ul>
 <p>Before committing to a name, search the USPTO database and check domain and social handle availability. Discovering a conflict after printing signage and wrapping a vehicle is an expensive way to learn this.</p>`,
 links:[['USPTO trademark search','https://www.uspto.gov/trademarks/search','uspto.gov'],
        ['USPTO trademark basics','https://www.uspto.gov/trademarks/basics','uspto.gov']],
 next:['register','domain']}
);

KB.push(
{id:'licenses', cat:'license',
 q:'What licenses and permits do I need?',
 alt:['Business license','Do I need a permit?'],
 kw:['business license','what licenses','need a license','permits','licensing requirements','license requirements','permit'],
 a:`<p>There is no single answer, because licensing happens in up to four separate layers. Check all four.</p>
 <ol>
 <li><strong>State sales tax license</strong> &mdash; required if you sell taxable goods or certain services.</li>
 <li><strong>Professional or occupational license</strong> &mdash; for regulated trades: contractors, cosmetology, real estate, healthcare and many more.</li>
 <li><strong>City or county license</strong> &mdash; varies enormously, and this is the layer people miss.</li>
 <li><strong>Federal permits</strong> &mdash; only for regulated industries such as alcohol, firearms, aviation or transportation.</li>
 </ol>
 <div class="callout"><strong>Colorado note:</strong> the state issues no general business license, but 70+ home-rule municipalities collect their own sales tax and require separate registration. Your state license does not cover them. This is the most common compliance gap here, and it usually surfaces years later with penalties attached.</div>`,
 links:[['SBA — apply for licenses and permits','https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits','sba.gov'],
        ['MyBizColorado','https://mybiz.colorado.gov/','mybiz.colorado.gov'],
        ['Colorado Dept of Revenue','https://tax.colorado.gov/','tax.colorado.gov']],
 next:['sales-tax','register','home-business']},

{id:'sales-tax', cat:'license',
 q:'Do I need to collect sales tax?',
 alt:['Sales tax license','Do I charge sales tax?'],
 kw:['sales tax','collect sales tax','retail license','do i charge sales tax','sales tax permit','tax license'],
 a:`<p>If you sell tangible goods at retail, generally yes. Most services are untaxed at the state level in many states, but exceptions exist and rules have been shifting &mdash; verify your specific category rather than assuming.</p>
 <p><strong>How it works:</strong></p>
 <ul>
 <li>Apply through your state revenue department. A retail license usually covers wholesale too.</li>
 <li>Then register separately with any local jurisdiction that self-collects.</li>
 <li>File on the schedule assigned to you, even in months with no sales.</li>
 </ul>
 <div class="callout"><strong>The rule that keeps people out of trouble:</strong> sales tax you collect is not revenue. It is money you are holding for the state. Keep it in a separate account so it is there on the filing date. Spending it is one of the most common ways small businesses end up owing penalties they cannot pay.</div>`,
 links:[['Colorado Dept of Revenue — sales tax','https://tax.colorado.gov/sales-use-tax','tax.colorado.gov'],
        ['MyBizColorado','https://mybiz.colorado.gov/','mybiz.colorado.gov']],
 next:['licenses','taxes','bookkeeping']},

{id:'home-business', cat:'license',
 q:'Can I run a business out of my home?',
 alt:['Home based business','Work from home rules'],
 kw:['home business','work from home','home occupation','run from my house','hoa business','zoning'],
 a:`<p>Usually yes, with three things to check first:</p>
 <ul>
 <li><strong>Zoning and home occupation rules.</strong> Most cities allow it but limit signage, customer traffic, on-site employees, deliveries and outdoor storage.</li>
 <li><strong>HOA covenants.</strong> Often stricter than city code, and enforced by neighbours &mdash; a different kind of enforcement entirely.</li>
 <li><strong>Lease terms</strong> if you rent.</li>
 </ul>
 <p>Also note: homeowners insurance generally excludes business activity, business equipment, and anyone visiting for business reasons. You need a rider or a separate policy.</p>
 <p>One practical caution &mdash; if you use your home address on your Google Business Profile it becomes publicly visible. Service-area businesses can hide the address, and should.</p>`,
 links:[['SBA — manage your business','https://www.sba.gov/business-guide/manage-your-business','sba.gov']],
 next:['insurance','licenses','gbp']},

{id:'taxes', cat:'tax',
 q:'How do taxes work when I am self-employed?',
 alt:['Quarterly taxes','Estimated taxes','How much should I set aside?'],
 kw:['quarterly taxes','estimated tax','self employment tax','how much to set aside','taxes as self employed','pay taxes quarterly','tax bill','owe taxes'],
 a:`<p>Nobody withholds for you anymore, so you do it yourself &mdash; usually four times a year.</p>
 <ul>
 <li><strong>Self-employment tax</strong> of 15.3% covers Social Security and Medicare, <em>on top of</em> ordinary income tax. This is the number that ambushes people in year one.</li>
 <li><strong>Estimated payments</strong> are generally due quarterly if you expect to owe $1,000 or more. Missing them triggers penalties even if you pay in full at filing.</li>
 <li><strong>State income tax</strong> has its own rules and its own schedule.</li>
 </ul>
 <div class="callout">Set aside <strong>25&ndash;30% of every payment</strong> that comes in, in a separate savings account, from day one. Adjust once a CPA has real numbers. Businesses that get into tax trouble are almost always the ones that spent the tax money.</div>`,
 links:[['IRS estimated taxes','https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes','irs.gov'],
        ['IRS self-employed tax center','https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center','irs.gov']],
 next:['deductions','cpa','bookkeeping','cashflow']},

{id:'deductions', cat:'tax',
 q:'What can I deduct as a business expense?',
 alt:['Write offs','Tax deductions'],
 kw:['deduct','write off','deductions','business expense','tax write offs','what can i expense','deductible'],
 a:`<p>The standard is that an expense must be <strong>ordinary and necessary</strong> for your business. Common legitimate categories:</p>
 <ul>
 <li>Home office &mdash; if used regularly and exclusively for business</li>
 <li>Vehicle mileage or actual costs for business use, with a contemporaneous log</li>
 <li>Equipment, software and tools</li>
 <li>Marketing, advertising and your website</li>
 <li>Professional services &mdash; legal, accounting, consulting</li>
 <li>Insurance premiums, including self-employed health insurance in many cases</li>
 <li>Business travel, and the deductible portion of business meals</li>
 <li>Education that maintains or improves skills for your current business</li>
 <li>Retirement contributions &mdash; often the largest lever available and the most overlooked</li>
 </ul>
 <p>Two rules keep you out of trouble: keep receipts and a contemporaneous record, and never run personal expenses through the business. A clean business bank account makes both nearly automatic.</p>`,
 links:[['IRS deducting business expenses','https://www.irs.gov/businesses/small-businesses-self-employed/deducting-business-expenses','irs.gov'],
        ['IRS home office deduction','https://www.irs.gov/businesses/small-businesses-self-employed/home-office-deduction','irs.gov']],
 next:['taxes','cpa','bookkeeping']},

{id:'cpa', cat:'tax',
 q:'Do I need an accountant or bookkeeper?',
 alt:['When should I hire a CPA?','Do it myself taxes'],
 kw:['accountant','cpa','bookkeeper','do my own taxes','hire an accountant','need a cpa','tax preparer'],
 a:`<p>Separate the two roles &mdash; they are different jobs and people frequently hire the wrong one.</p>
 <ul>
 <li><strong>Bookkeeper</strong> &mdash; keeps transactions categorized month to month. Worth outsourcing early; cheap relative to the time it eats and the errors it prevents.</li>
 <li><strong>CPA</strong> &mdash; files returns and, more importantly, does tax <em>planning</em>. A good one saves more than the fee through entity structure, retirement contributions and timing.</li>
 </ul>
 <p>Do it yourself while you are a simple sole proprietor with straightforward income. Get help once you have employees, inventory, multiple states, an S-corp election, or revenue past roughly $100K.</p>
 <div class="callout">Ask a prospective CPA whether they hold planning meetings during the year or only file in April. The second kind is a compliance service, not an advisor.</div>`,
 links:[['IRS — choosing a tax professional','https://www.irs.gov/tax-professionals/choosing-a-tax-professional','irs.gov']],
 next:['bookkeeping','taxes','scorp-when']}
);

KB.push(
{id:'bank-account', cat:'books',
 q:'Do I need a separate business bank account?',
 alt:['Business checking','Can I use my personal account?'],
 kw:['business bank account','separate account','business checking','personal account for business','commingling','open a bank account'],
 a:`<p><strong>Yes, without exception.</strong> This is the cheapest and most important administrative decision you will make.</p>
 <ul>
 <li><strong>It preserves liability protection.</strong> Mixing personal and business funds is the primary way courts pierce the corporate veil and hold owners personally liable despite an LLC.</li>
 <li><strong>It makes taxes tractable.</strong> Deductions become obvious rather than archaeological.</li>
 <li><strong>It survives an audit.</strong> Commingled accounts are the fastest route to disallowed deductions.</li>
 <li><strong>Lenders require it.</strong> No clean business banking history, no loan.</li>
 </ul>
 <p>Bring your EIN, formation documents and trade name filing. Then pay yourself by transferring business to personal on a schedule &mdash; an owner's draw &mdash; rather than paying personal bills from the business account.</p>`,
 links:[['SBA — open a business bank account','https://www.sba.gov/business-guide/launch-your-business/open-business-bank-account','sba.gov']],
 next:['bookkeeping','ein','deductions']},

{id:'bookkeeping', cat:'books',
 q:'How do I set up bookkeeping?',
 alt:['Accounting software','Track expenses'],
 kw:['bookkeeping','accounting software','track expenses','quickbooks','books','record keeping','accounting'],
 a:`<p>Set it up in week one. Retroactive bookkeeping is miserable and expensive.</p>
 <ol>
 <li><strong>Separate bank account and card.</strong> This alone does 80% of the work.</li>
 <li><strong>Pick software</strong> and connect the accounts so transactions import automatically. Any mainstream option is fine &mdash; consistency beats features.</li>
 <li><strong>Set a categorization schedule</strong> &mdash; 20 minutes weekly, not four hours in April.</li>
 <li><strong>Save receipts digitally</strong>, photographed at the moment of purchase.</li>
 <li><strong>Reconcile monthly</strong> against your bank statement.</li>
 <li><strong>Read two reports each month</strong> &mdash; profit and loss, and cash flow.</li>
 </ol>
 <div class="callout">If you only look at your bank balance, you are flying blind. Profit and cash are not the same thing, and profitable businesses fail from cash timing constantly.</div>`,
 links:[['IRS recordkeeping requirements','https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping','irs.gov'],
        ['SCORE financial templates','https://www.score.org/resource/business-planning-financial-statements-template-gallery','score.org']],
 next:['cashflow','breakeven','cpa','numbers']},

{id:'insurance', cat:'insure',
 q:'What insurance does my business need?',
 alt:['Business insurance','Liability insurance'],
 kw:['insurance','liability insurance','business insurance','do i need insurance','coverage','general liability'],
 a:`<p>Depends on the work, but these are the common ones:</p>
 <ul>
 <li><strong>General liability</strong> &mdash; third-party injury and property damage. The baseline; many clients and landlords require proof before you start.</li>
 <li><strong>Professional liability / E&amp;O</strong> &mdash; claims that your advice or work caused financial harm. Essential for consultants, agencies and licensed professionals.</li>
 <li><strong>Workers' compensation</strong> &mdash; legally required in most states as soon as you have employees.</li>
 <li><strong>Commercial auto</strong> &mdash; personal policies exclude business use. This gap catches a lot of contractors.</li>
 <li><strong>Commercial property / business owner's policy</strong> &mdash; equipment and inventory, often bundled with general liability at a lower combined cost.</li>
 <li><strong>Cyber liability</strong> &mdash; if you hold customer data or take payments.</li>
 </ul>
 <div class="callout">Homeowners insurance does not cover business activity, business equipment, or people injured at your home for business reasons. Working from home? Tell your agent.</div>`,
 links:[['SBA — get business insurance','https://www.sba.gov/business-guide/launch-your-business/get-business-insurance','sba.gov']],
 next:['workers-comp','home-business','contracts']},

{id:'workers-comp', cat:'insure',
 q:'Do I need workers compensation insurance?',
 alt:['Workers comp requirement'],
 kw:['workers comp','workers compensation','injured employee','comp insurance'],
 a:`<p>In most states, employers must carry workers' compensation as soon as they have employees &mdash; often the threshold is effectively one, including part-time. Narrow exemptions exist, but assume the requirement applies unless a professional confirms otherwise.</p>
 <p><strong>Points that trip people up:</strong></p>
 <ul>
 <li><strong>Owners and officers</strong> may be able to reject coverage for themselves, but that is a formal filing, not an assumption.</li>
 <li><strong>Misclassified contractors.</strong> If a "1099 contractor" is really an employee by the state's test, you are liable retroactively, plus penalties.</li>
 <li><strong>Uninsured subcontractors</strong> can become your responsibility. Collect certificates of insurance from every sub, every year.</li>
 </ul>
 <p>Penalties for operating without required coverage are significant and typically accrue daily.</p>`,
 links:[['Colorado Division of Workers Compensation','https://cdle.colorado.gov/dwc','cdle.colorado.gov'],
        ['SBA — hire and manage employees','https://www.sba.gov/business-guide/manage-your-business/hire-manage-employees','sba.gov']],
 next:['hire-1099','hire-first','insurance']},

{id:'hire-first', cat:'hire',
 q:'When should I hire my first employee?',
 alt:['Am I ready to hire?','First hire'],
 kw:['first employee','when to hire','ready to hire','hire someone','first hire','need help','too busy'],
 a:`<p>Three signals separate genuine readiness from temporary busyness:</p>
 <ul>
 <li>You are <strong>consistently</strong> turning down profitable work on capacity &mdash; not during one strong month.</li>
 <li>You could cover the full cost of the role for <strong>six months</strong> from current cash flow, assuming the hire generates nothing.</li>
 <li>You have <strong>written down</strong> what the person will actually do. A job you cannot describe is a job you cannot manage or evaluate.</li>
 </ul>
 <p>Budget the real cost: wages plus roughly 20&ndash;30% for payroll taxes, workers' comp, unemployment insurance, benefits, equipment, and the time you will spend training.</p>
 <div class="callout">Consider intermediate steps first &mdash; a contractor for a defined scope, a part-time hire, or automation. Many "I need to hire" problems are really pricing problems: raising rates 15% and serving fewer clients often beats adding headcount.</div>`,
 links:[['SBA — hire and manage employees','https://www.sba.gov/business-guide/manage-your-business/hire-manage-employees','sba.gov'],
        ['DOL — hiring guidance','https://www.dol.gov/general/topic/hiring','dol.gov']],
 next:['hire-1099','payroll','pricing','owner-bottleneck']},

{id:'hire-1099', cat:'hire',
 q:'Can I pay someone as a 1099 contractor instead of an employee?',
 alt:['1099 vs W2','Contractor or employee'],
 kw:['1099 or w2','contractor vs employee','independent contractor','classify a worker','misclassification','1099'],
 a:`<p>Only if the working relationship genuinely meets the legal test &mdash; and the <em>relationship</em> decides, not the paperwork or what both sides agreed.</p>
 <p>The core question is <strong>control</strong>. Signs of an employee:</p>
 <ul>
 <li>You set their hours and where they work</li>
 <li>You direct how the work is done, not just the outcome</li>
 <li>You provide the tools and equipment</li>
 <li>The work is ongoing and central to your business</li>
 <li>They work only for you</li>
 </ul>
 <p>Signs of a genuine contractor: their own business and clients, own tools, own methods, a defined scope with a defined deliverable, and the ability to profit or lose on the job.</p>
 <div class="callout">Misclassification is aggressively enforced. Consequences include back payroll taxes, penalties, interest, back workers' comp premiums and unemployment liability. A signed agreement calling someone a contractor does not protect you.</div>`,
 links:[['IRS — independent contractor or employee','https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee','irs.gov']],
 next:['payroll','workers-comp','hire-first']},

{id:'payroll', cat:'hire',
 q:'What do I need before I run payroll?',
 alt:['Set up payroll','Payroll requirements'],
 kw:['payroll','pay employees','payroll setup','withholding','famli','payroll taxes'],
 a:`<p>Sequence before the first paycheck:</p>
 <ol>
 <li><strong>EIN</strong> from the IRS.</li>
 <li><strong>State wage withholding account</strong> and <strong>unemployment insurance account</strong>.</li>
 <li><strong>Paid leave registration</strong> where your state requires it &mdash; Colorado's FAMLI program is mandatory, and rates change, so check the current year.</li>
 <li><strong>Workers' compensation</strong> policy in force.</li>
 <li><strong>New hire paperwork</strong> &mdash; I-9, W-4, state withholding form, and report the hire to the state directory.</li>
 <li><strong>A payroll service.</strong> Use one. The filing calendar and deposit deadlines are where DIY payroll goes wrong, and the penalties exceed what a service costs.</li>
 </ol>
 <p>Also confirm the current state minimum wage and any local minimum &mdash; several cities set their own, higher than the state.</p>`,
 links:[['IRS employment taxes','https://www.irs.gov/businesses/small-businesses-self-employed/employment-taxes','irs.gov'],
        ['Colorado FAMLI','https://famli.colorado.gov/','famli.colorado.gov'],
        ['MyBizColorado','https://mybiz.colorado.gov/','mybiz.colorado.gov']],
 next:['hire-1099','workers-comp','hire-first']},

{id:'sales-process', cat:'hire',
 q:'How do I close more of the leads I get?',
 alt:['Sales process','Not closing','Improve close rate'],
 kw:['close more','close rate','sales process','not closing','sales training','objections','quotes not closing','proposals','win more'],
 a:`<p>Close rate is usually the cheapest number to improve, because the leads are already paid for.</p>
 <p><strong>Where deals actually get lost:</strong></p>
 <ul>
 <li><strong>Response time.</strong> Covered elsewhere on this page, and it is the biggest one.</li>
 <li><strong>Follow-up.</strong> Most sales need five or more touches. Most people stop at two, then conclude the lead was cold.</li>
 <li><strong>Talking instead of asking.</strong> Discovery questions surface the real problem. Pitching before you understand it loses winnable deals.</li>
 <li><strong>Price presented without value.</strong> A number in isolation is always too high. A number attached to an outcome is a decision.</li>
 <li><strong>No clear next step.</strong> Every conversation should end with a scheduled something.</li>
 </ul>
 <div class="callout">Track your close rate for a month before changing anything. Most owners guess it 15&ndash;20 points too high, which means they misdiagnose a sales problem as a lead problem.</div>`,
 links:[['SBA — marketing and sales','https://www.sba.gov/business-guide/manage-your-business/marketing-sales','sba.gov']],
 next:['speed-to-lead','crm','pricing','numbers'], cap:true},

{id:'crm', cat:'hire',
 q:'Do I need a CRM to track leads?',
 alt:['Lead tracking','Leads falling through the cracks'],
 kw:['crm','lead tracking','pipeline','organize leads','leads falling through','follow up system','database','track customers'],
 a:`<p>If leads currently live in your inbox, your phone and your memory, then yes &mdash; and this is usually a bigger revenue lever than more marketing.</p>
 <p><strong>What a working setup does:</strong></p>
 <ul>
 <li>Captures every lead into one pipeline instead of three places</li>
 <li>Assigns an owner and alerts them immediately</li>
 <li>Runs follow-up sequences whether or not anyone remembers</li>
 <li>Records the source, so you learn which channel actually produces customers</li>
 <li>Reports by stage, so you can see where deals die</li>
 </ul>
 <div class="callout">Marketing spend without lead tracking is a bucket with a hole in it. Fix the bucket first &mdash; it is considerably cheaper than more water.</div>`,
 links:[],
 next:['speed-to-lead','sales-process','numbers']}
);

KB.push(
{id:'market-first', cat:'market',
 q:'How do I get my first customers?',
 alt:['Find customers','No customers yet'],
 kw:['first customers','get customers','find clients','no customers','get leads','win clients','need customers','more leads','customer acquisition'],
 a:`<p>Early customers come from reach you already have, not from broad advertising. In order of what actually works:</p>
 <ol>
 <li><strong>Direct outreach to people who already know you.</strong> Not a blast &mdash; individual, specific messages naming the problem you solve.</li>
 <li><strong>Referral partners.</strong> Businesses serving the same customer without competing. A plumber and an electrician feed each other work for decades.</li>
 <li><strong>Google Business Profile.</strong> Free, and for local service businesses it is usually the highest-intent source of calls you will have.</li>
 <li><strong>Show up where they already ask.</strong> Local groups, trade associations, community boards, industry forums.</li>
 <li><strong>Do a few jobs exceptionally well and ask for reviews immediately.</strong> Reviews compound; little else in local marketing compounds as reliably.</li>
 <li><strong>Paid ads.</strong> Fastest, but only after you know your close rate and what a customer is worth.</li>
 </ol>
 <div class="callout">Pick two channels and work them for 90 days. Six channels worked casually beats none of them.</div>`,
 links:[['Google Business Profile','https://www.google.com/business/','google.com'],
        ['SBA — marketing and sales','https://www.sba.gov/business-guide/manage-your-business/marketing-sales','sba.gov']],
 next:['gbp','reviews','market-budget','website'], cap:true},

{id:'gbp', cat:'market',
 q:'How do I show up on Google Maps?',
 alt:['Google Business Profile','Google My Business','Local pack'],
 kw:['google business profile','google my business','google maps','map pack','local listing','show up on maps','local pack','gbp','maps ranking'],
 a:`<p>For a local business this is the highest-return free asset you have. Claim it, then optimize deliberately.</p>
 <p><strong>Setup:</strong> claim and verify the listing, choose the most specific primary category available, set a service area if you do not want your home address public, and add accurate hours.</p>
 <p><strong>What actually moves ranking:</strong></p>
 <ul>
 <li><strong>Primary category.</strong> The single biggest lever, and most businesses choose something far too broad.</li>
 <li><strong>Review volume, recency and responses.</strong> A steady flow beats a burst.</li>
 <li><strong>Proximity to the searcher</strong> &mdash; which you cannot change, so target areas you can realistically win.</li>
 <li><strong>Consistent name, address and phone</strong> everywhere online. Inconsistency actively suppresses ranking.</li>
 <li><strong>Photos posted regularly</strong>, services filled out completely, Q&amp;A populated.</li>
 <li><strong>A real website</strong> with location-specific content backing the listing up.</li>
 </ul>
 <p>Common self-inflicted problems: keyword-stuffing the business name (a suspension risk), listing a fake address, and leaving duplicate listings unclaimed.</p>`,
 links:[['Google Business Profile','https://www.google.com/business/','google.com'],
        ['Google Business Profile Help','https://support.google.com/business/','support.google.com'],
        ['Our local SEO approach','/local-seo-denver/','eyetoad.com']],
 next:['reviews','website','seo-worth','compete']},

{id:'reviews', cat:'market',
 q:'How do I get more customer reviews?',
 alt:['Asking for reviews','Bad review','Reputation'],
 kw:['reviews','google reviews','ask for a review','more reviews','bad review','testimonials','reputation','star rating','negative review'],
 a:`<p>Reviews drive both ranking and conversion. Businesses that get them have a system; the rest are waiting to be asked.</p>
 <ul>
 <li><strong>Ask at the peak moment</strong> &mdash; right when the customer says something nice, not next week.</li>
 <li><strong>Ask in person, follow up by text.</strong> Text response rates comfortably beat email.</li>
 <li><strong>Send the direct link.</strong> Every extra tap loses people.</li>
 <li><strong>Make it someone's job</strong> with a specific weekly target.</li>
 <li><strong>Respond to every review</strong>, good and bad. Most businesses do not, and both customers and Google notice.</li>
 </ul>
 <p><strong>Negative reviews:</strong> reply publicly, calmly and briefly, then move the resolution offline. Never argue in the thread. A well-handled bad review often converts better than an unbroken wall of five stars, which reads as fake.</p>
 <div class="callout">Never buy reviews or offer discounts in exchange for them. Both violate platform policy and FTC endorsement rules, and detection has improved considerably.</div>`,
 links:[['Google review policy','https://support.google.com/business/answer/2622994','support.google.com'],
        ['FTC endorsement guides','https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides','ftc.gov']],
 next:['gbp','referrals','retention']},

{id:'website', cat:'market',
 q:'Do I need a website if I have social media?',
 alt:['Is a website necessary?','Can I just use Facebook?'],
 kw:['need a website','website necessary','just use facebook','social media instead','do i need a site','website'],
 a:`<p>Yes. Social profiles are rented; a website is owned. Three concrete reasons:</p>
 <ul>
 <li><strong>Google Business Profile performance depends on it.</strong> A profile with no supporting website underperforms one that has it.</li>
 <li><strong>Platform risk is real.</strong> A suspension or algorithm change can remove your entire pipeline overnight, with no appeal and no export.</li>
 <li><strong>AI assistants cite websites.</strong> When someone asks ChatGPT or Google's AI for a recommendation, those systems pull from crawlable sites and structured data &mdash; not from your Instagram grid.</li>
 </ul>
 <p><strong>What a small business site genuinely needs:</strong> what you do, where you do it, proof (reviews, photos, credentials), clear pricing signals, and an obvious way to contact you that works on a phone. Five good pages beat fifty thin ones.</p>
 <p>Keep doing social. Just point it at something you own.</p>`,
 links:[['Google Search Essentials','https://developers.google.com/search/docs/essentials','google.com'],
        ['Free marketing audit','/free-seo-audit/','eyetoad.com']],
 next:['cro','seo-worth','gbp','domain']},

{id:'cro', cat:'market',
 q:'People visit my website but never call. Why?',
 alt:['Not converting','Traffic but no leads','Conversion rate'],
 kw:['not converting','traffic but no leads','visitors dont call','conversion','conversion rate','bounce rate','nobody calls','low conversion','no inquiries'],
 a:`<p>This is a conversion problem, and doubling your traffic would simply double your disappointment.</p>
 <p><strong>Where sites leak, roughly in order of frequency:</strong></p>
 <ul>
 <li><strong>Speed.</strong> Mobile visitors abandon slow pages quickly, and every fraction of a second costs conversions.</li>
 <li><strong>Unclear offer.</strong> A visitor should know what you do, where you do it, and what to do next within about five seconds.</li>
 <li><strong>No visible phone number.</strong> Sounds absurd. Happens constantly.</li>
 <li><strong>Missing proof.</strong> Reviews, photos of real work, credentials, named people.</li>
 <li><strong>Forms that ask too much.</strong> Every extra field costs completions.</li>
 <li><strong>Mobile experience.</strong> Most local traffic is phones. Test it on a phone, on cellular, not on your desktop.</li>
 </ul>
 <div class="callout">Average site conversion sits around 2&ndash;3%; strong ones exceed 10%. Same traffic, three times the leads, no extra ad spend. Fix conversion before buying more visitors.</div>`,
 links:[['Free conversion audit','/conversion-optimization/','eyetoad.com'],
        ['Google PageSpeed Insights','https://pagespeed.web.dev/','pagespeed.web.dev']],
 next:['website','speed-to-lead','market-budget'], cap:true},

{id:'seo-worth', cat:'market',
 q:'Is SEO worth it for a small business?',
 alt:['Does SEO work?','Should I invest in SEO?'],
 kw:['is seo worth it','does seo work','invest in seo','seo for small business','worth doing seo','seo','search engine optimization','rank on google'],
 a:`<p>It depends on one thing: whether people search for what you sell. If they do, the long-run economics are usually the best in local marketing. If they do not, it is the wrong channel and effort will not fix that.</p>
 <p><strong>SEO fits when</strong> customers actively search, your average customer value justifies a 4&ndash;9 month ramp, and you can commit for a year.</p>
 <p><strong>SEO does not fit when</strong> you need customers this month, you sell something nobody searches for yet, or your margins cannot support the wait.</p>
 <p>Realistic expectations: meaningful movement in 3&ndash;6 months, substantial results in 6&ndash;12. Anyone promising page one in 30 days is either lying or bidding on your brand name in ads and calling it SEO.</p>
 <div class="callout">Honest framing, given we sell this: ads buy attention while you pay and stop the day you stop. SEO builds an asset that keeps producing. Most businesses that can afford both should run ads for cash flow now and SEO for cost per lead later.</div>`,
 links:[['Google Search Essentials','https://developers.google.com/search/docs/essentials','google.com'],
        ['Denver SEO services','/denver-seo-services/','eyetoad.com'],
        ['Free marketing audit','/free-seo-audit/','eyetoad.com']],
 next:['ads-vs-seo','ai-search','market-budget','gbp']},

{id:'ads-vs-seo', cat:'market',
 q:'Should I run ads or do SEO?',
 alt:['Paid ads vs SEO','Which is better?'],
 kw:['ads or seo','google ads vs seo','ppc vs seo','paid ads','which is better ads','advertising','google ads'],
 a:`<p>They solve different problems, and sequencing matters more than choosing.</p>
 <ul>
 <li><strong>Ads</strong> &mdash; instant visibility, precise targeting, and a fast read on which messages and keywords convert. Stop paying and the traffic stops. Costs rise as competitors bid.</li>
 <li><strong>SEO</strong> &mdash; slower to start, compounding over time, lower cost per lead once established. An asset rather than a rental.</li>
 </ul>
 <p><strong>Practical sequence for most local businesses:</strong> start ads to generate revenue and, more importantly, <em>data</em> on which searches actually produce paying customers. Feed that into SEO targeting. As organic matures, shift budget toward it and keep ads on the few terms where you must appear.</p>
 <p>Before spending on either, know your close rate and customer lifetime value. Without those you cannot tell whether a channel worked.</p>`,
 links:[['Google Ads','https://ads.google.com/','ads.google.com'],
        ['Denver SEO pricing','/denver-seo-pricing/','eyetoad.com']],
 next:['market-budget','seo-worth','cro','numbers']},

{id:'ai-search', cat:'market',
 q:'How do I show up in ChatGPT and AI search results?',
 alt:['AI search','Get recommended by AI','GEO'],
 kw:['chatgpt','ai search','ai results','generative search','get recommended by ai','llm','perplexity','ai overviews','gemini','ai assistant'],
 a:`<p>AI assistants recommend businesses by pulling from sources they can crawl and verify. Related to SEO, but not identical.</p>
 <p><strong>What matters:</strong></p>
 <ul>
 <li><strong>Be crawlable.</strong> AI crawlers must be permitted in robots.txt. Blocking them removes you from consideration entirely.</li>
 <li><strong>Answer questions directly.</strong> Content structured as clear question-and-answer gets quoted. Marketing prose does not.</li>
 <li><strong>Be consistent everywhere.</strong> These systems cross-reference. Conflicting hours, addresses or service descriptions reduce confidence in citing you.</li>
 <li><strong>Structured data.</strong> Schema markup tells machines exactly what you are, where you are and what you sell.</li>
 <li><strong>Third-party corroboration.</strong> Directories, reviews, local press. AI systems weight what others say about you more heavily than what you say about yourself.</li>
 <li><strong>Specificity.</strong> "Serving Arvada, Wheat Ridge and northwest Denver" is citable. "Serving the metro area" is not.</li>
 </ul>
 <div class="callout">Test it yourself right now: ask two or three AI assistants for a recommendation in your category and city. See whether you appear, and where they got their information.</div>`,
 links:[['AIO SEO system','/aio-seo-system/','eyetoad.com'],
        ['Generative engine optimization','/generative-engine-optimization-system/','eyetoad.com'],
        ['Google Search Essentials','https://developers.google.com/search/docs/essentials','google.com']],
 next:['seo-worth','website','gbp']},

{id:'market-budget', cat:'market',
 q:'How much should I spend on marketing?',
 alt:['Marketing budget','What percent of revenue?'],
 kw:['marketing budget','how much to spend on marketing','advertising budget','percent of revenue marketing','budget'],
 a:`<p>Benchmarks put it around <strong>5&ndash;10% of revenue</strong> for an established business and <strong>12&ndash;20%</strong> in growth mode. Treat those as sanity checks, not targets.</p>
 <p>The number that actually governs the decision is <strong>what a customer is worth</strong>:</p>
 <ol>
 <li>Average sale &times; purchases per year &times; years retained = lifetime value.</li>
 <li>Decide what you will pay to acquire one &mdash; often 10&ndash;20% of that value.</li>
 <li>Multiply by how many new customers you need monthly.</li>
 </ol>
 <p>That produces a defensible budget instead of a guess. It also tells you instantly whether a channel is affordable: if leads cost $40 and you close one in five, your cost per customer is $200 &mdash; fine at a $3,000 lifetime value, fatal at $250.</p>
 <div class="callout">Track leads by source from day one. Marketing spend without attribution is not a budget, it is a donation.</div>`,
 links:[['SBA — marketing and sales','https://www.sba.gov/business-guide/manage-your-business/marketing-sales','sba.gov'],
        ['Denver SEO pricing','/denver-seo-pricing/','eyetoad.com']],
 next:['numbers','ads-vs-seo','pricing','cro']},

{id:'domain', cat:'market',
 q:'How do I choose a domain name?',
 alt:['Website address','Buy a domain'],
 kw:['domain name','website address','url','pick a domain','buy a domain','domain'],
 a:`<p>Two viable strategies serving different goals:</p>
 <ul>
 <li><strong>Brand domain</strong> &mdash; your business name. Right if you are building something people will remember and search for by name.</li>
 <li><strong>Keyword domain</strong> &mdash; describes what you do and where. Weaker as a brand, but it communicates instantly in an ad, on a truck or in a search result.</li>
 </ul>
 <p><strong>Practical rules:</strong> prefer .com when available, keep it short and unambiguous when spoken aloud, avoid hyphens and numbers, check trademark conflicts before buying, and secure matching social handles at the same time.</p>
 <p>One habit worth keeping: register the obvious misspellings and the .net if cheap, then point them at your main site.</p>`,
 links:[['USPTO trademark search','https://www.uspto.gov/trademarks/search','uspto.gov']],
 next:['website','trademark','seo-worth']},

{id:'social', cat:'market',
 q:'Is social media worth my time?',
 alt:['Do I need social media?','Facebook for business'],
 kw:['social media','facebook','instagram','tiktok','linkedin','posting','social','organic social'],
 a:`<p>Worth doing, with realistic expectations. Organic reach on a business page reaches only a small fraction of your followers, so a page with 1,000 followers may reach a few dozen people per post.</p>
 <p>That makes organic social a <strong>trust and proof</strong> channel rather than a traffic channel. Anyone selling it as lead generation is selling you a story.</p>
 <p><strong>Where it genuinely earns its place:</strong></p>
 <ul>
 <li>People check your profile before buying &mdash; an abandoned page costs you deals</li>
 <li>Paid targeting and retargeting audiences built from site visitors</li>
 <li>Short-form video, currently the strongest-performing format</li>
 <li>Brand familiarity that lifts conversion on your other channels</li>
 </ul>
 <p>Post consistently on one platform rather than sporadically on four. And always point it at something you own.</p>`,
 links:[],
 next:['website','market-budget','reviews']},

{id:'email-marketing', cat:'market',
 q:'Should I be doing email marketing?',
 alt:['Newsletter','Email list'],
 kw:['email marketing','email','newsletter','nurture','email list','mailing list'],
 a:`<p>Yes, and it is consistently among the highest-return channels available &mdash; largely because you own the list rather than renting the audience.</p>
 <p><strong>What to build, in order:</strong></p>
 <ul>
 <li><strong>A welcome sequence</strong> for new contacts, sent automatically.</li>
 <li><strong>Segmentation</strong> by behavior and lifecycle stage &mdash; a past customer and a cold lead need different messages.</li>
 <li><strong>Abandoned quote or cart recovery.</strong> Frequently the highest-return automation in the whole stack.</li>
 <li><strong>Reactivation campaigns</strong> for dormant customers.</li>
 <li><strong>Review requests</strong>, automated after job completion.</li>
 </ul>
 <div class="callout">If you have a customer list sitting in a spreadsheet doing nothing, that is money on the table right now. Retention is cheaper than acquisition by a wide margin, and email is the cheapest retention tool there is.</div>`,
 links:[['FTC CAN-SPAM compliance guide','https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business','ftc.gov']],
 next:['retention','referrals','crm']}
);

const norm = s => (' '+String(s).toLowerCase()
  .replace(/[^a-z0-9\s]/g,' ')
  .replace(/\s+/g,' ').trim()+' ');

function expand(s){
  let out = norm(s);
  const keys = Object.keys(SYN).sort((a,b)=>b.length-a.length);
  for(const k of keys){
    if(out.indexOf(' '+k+' ') !== -1) out = out + ' ' + SYN[k] + ' ';
  }
  return norm(out);
}
const toks = s => norm(s).split(' ').filter(w=>w && w.length>1 && !STOP.has(w));

KB.forEach(e=>{
  e._bag = {};
  const add = (txt,wt)=>toks(txt).forEach(t=>{e._bag[t]=(e._bag[t]||0)+wt;});
  add(e.q,3);
  (e.alt||[]).forEach(a=>add(a,3));
  (e.kw||[]).forEach(k=>add(k,4));
  add(e.cat,1);
});

function score(entry, qLit, qToks){
  let s = 0;
  for(const phrase of (entry.kw||[])){
    const p = norm(phrase);
    if(qLit.indexOf(p) !== -1) s += 14 + (p.trim().split(' ').length * 4);
  }
  const qn = norm(entry.q);
  if(qLit.indexOf(qn.trim()) !== -1) s += 40;
  for(const t of qToks){ if(entry._bag[t]) s += entry._bag[t]; }
  return s / Math.sqrt(Math.max(qToks.length,1));
}

var SAYINGS = [
  {t:'Businesses that do business like businesses of yesterday won\u2019t be doing business tomorrow.', w:'A guiding principle at Eye To Ad Media'},
  {t:'Find out what your competition is doing, then do something different and better.', w:'Also ours, and it has never once failed us'},
  {t:'The best time to plant a tree was twenty years ago. The second best time is now.', w:'Proverb'},
  {t:'Revenue is vanity, profit is sanity, but cash is king.', w:'Old accounting saying'},
  {t:'You cannot read the label from inside the jar.', w:'Why outside eyes are worth paying for'},
  {t:'If you are the smartest person in the room, find another room.', w:'Attributed widely, origin unclear'},
  {t:'Nobody ever went broke taking a profit.', w:'Trader\u2019s proverb'},
  {t:'A goal without a date is a wish with better branding.', w:'Ours'},
  {t:'Your margin is my opportunity.', w:'Jeff Bezos'},
  {t:'Whether you think you can or you think you can\u2019t, you\u2019re right.', w:'Henry Ford'},
  {t:'Do what you do so well that they will want to see it again and bring their friends.', w:'Walt Disney'},
  {t:'The money is in the follow-up. It always was.', w:'Every salesperson who lasted'},
  {t:'Price is what you pay. Value is what you get.', w:'Warren Buffett'},
  {t:'Slow is smooth and smooth is fast.', w:'Applies to business more than people expect'},
  {t:'You do not rise to the level of your goals. You fall to the level of your systems.', w:'James Clear'}
];

var CHAT = [
  { k:['hi','hello','hey','yo','hiya','howdy','hey there','hi there','hello there','good morning','good afternoon','good evening','morning','evening'],
    a:'<p>Hey. Good to see you.</p><p><strong>What are you working on today?</strong> Ask me anything about growing, pricing, funding, hiring, registering or marketing a business and you will get a straight answer with the real forms attached &mdash; no signup, nothing stored.</p>' },

  { k:['how are you','how are you doing','how you doing','hows it going','how is it going','how goes it','you good','how r u','whats up','what up','sup','wassup'],
    a:'<p>Doing well, thanks for asking &mdash; and genuinely more useful than I look.</p><p><strong>How is business?</strong> If something is stuck, tell me what it is. If you are just having a look around, try <em>&ldquo;how do I grow my business&rdquo;</em> or <em>&ldquo;do I need an LLC&rdquo;</em> and see what comes back.</p>' },

  { k:['im good','i am good','doing good','doing ok','doing okay','im ok','im okay','im great','im fine','im alright','im well','pretty good','not bad','cant complain','all good','good thanks','great thanks','unbelievable','never better','living the dream'],
    a:'<p>Glad to hear it. Let\u2019s keep it that way.</p><p><strong>What would make today measurably better for the business?</strong> More leads, better prices, cleaner books, one less thing on fire? Name it and I will point you at what actually moves it.</p>' },

  { k:['bet','aight','word','facts','fair','fair enough','sounds good','sounds great','cool','nice','sweet','right on','for sure','forsure','yessir','lets go','lets do it','im in','okay','ok','k','mhm','yep','yeah','yup','sure'],
    a:'<p>Alright then.</p><p>Pick a starting point &mdash; <em>&ldquo;what should I fix first&rdquo;</em> is usually the highest-value question anyone asks here, because spending money on the wrong constraint is the most common way growth money disappears.</p>' },

  { k:['rough','tough','not great','been better','struggling','its been rough','tired','exhausted','stressed','overwhelmed','burnt out','burned out','slow month','slow','quiet','no','nope','nah','not really'],
    a:'<p>That is a normal season and it is not a verdict on you.</p><p>Most of what feels like a business problem is one constraint wearing a costume &mdash; cash, leads, conversion or capacity. It is almost always <strong>one</strong> of them, not all four. Ask <em>&ldquo;what should I fix first&rdquo;</em> and let us narrow it before you spend anything.</p>' },

  { k:['thanks','thank you','thx','ty','appreciate it','appreciate you','much appreciated','cheers','thanks a lot','thank u'],
    a:'<p>Any time. That is what this is for.</p><p>Ask as many as you like &mdash; nothing here is metered, gated or stored.</p>' },

  { k:['who are you','what are you','are you a bot','are you real','are you human','are you ai','who is this','what is this','whats this'],
    a:'<p>A free answer desk built by <strong>Eye To Ad Media</strong>, a Denver marketing company that has been at this since 2012. No API and no account &mdash; every answer ships inside this page, which is why nothing you type leaves your browser.</p><p>If you want to talk to an actual person instead, <a href="tel:18004818638">1-800-481-8638</a> reaches one.</p>' },

  { k:['who is iris','wheres iris','what about iris','iris','talk to iris','the chatbot','chat bot','your chatbot'],
    a:'<p>Iris is our growth assistant &mdash; she lives in the corner of every page on this site, including this one. <strong>Tap the launcher at the bottom right</strong> and she will pick up.</p><p>Different job from this desk: I answer business questions with forms attached, she handles questions about <em>us</em> &mdash; what we do, what it costs, whether we are a fit.</p>' },

  { k:['motivate me','motivation','inspire me','need motivation','give me a quote','quote','saying','say something','pump me up','encourage me','motivational quote','business quote'],
    a:'__SAYING__' },

  { k:['are you free','is this free','how much is this','does this cost','whats the catch','is there a catch','do i have to sign up','do you need my email','will you spam me','free'],
    a:'<p>Free, and there is no catch worth worrying about.</p><p>No signup, no email field, nothing stored, no follow-up call. <strong>The whole knowledge base ships inside this page</strong> &mdash; there is no server to send your question to even if we wanted one.</p><p>We built it because business owners get listicles when they need forms. If it helps and you later want marketing done properly, you know where we are. That is the entire business model.</p>' },

  { k:['can you help me','help','help me','i need help','need help','can you help'],
    a:'<p>Probably, yes. Tell me what is actually going on and I will be specific.</p><p>If you are not sure how to phrase it, these get asked most: <em>&ldquo;what should I fix first&rdquo;</em>, <em>&ldquo;how do I get more customers&rdquo;</em>, <em>&ldquo;do I need an LLC&rdquo;</em>, <em>&ldquo;how do I price my work&rdquo;</em>.</p>' },

  { k:['bye','goodbye','see ya','later','gotta go','talk later','cya','peace'],
    a:'<p>Go get it. Come back any time &mdash; nothing here expires and nothing needs logging into.</p>' },

  { k:['youre wrong','thats wrong','bad answer','not helpful','useless','that didnt help','wrong'],
    a:'<p>Fair enough, and worth saying rather than sitting on.</p><p>Try rephrasing with the specific situation in it &mdash; the matching works far better on <em>&ldquo;how do I price a bathroom remodel&rdquo;</em> than on <em>&ldquo;pricing&rdquo;</em>. If it is still not landing, a human will beat me: <a href="tel:18004818638">1-800-481-8638</a>.</p>' },

  { k:['love this','this is great','this is cool','nice tool','good tool','this is awesome','impressive','well done'],
    a:'<p>Thank you &mdash; that is genuinely nice to hear.</p><p>If it saved you a search, the best thing you could do is ask it something harder. It holds up better than people expect.</p>' }
];

function chatReply(raw){
  var q = (' ' + String(raw).toLowerCase()
            .replace(/[^a-z0-9\s]/g,' ')
            .replace(/\s+/g,' ').trim() + ' ');
  var bare = q.trim();
  for (var i = 0; i < CHAT.length; i++){
    for (var j = 0; j < CHAT[i].k.length; j++){
      var k = CHAT[i].k[j];
      var hit = (bare === k) ||
                (bare.split(' ').length <= 6 && q.indexOf(' ' + k + ' ') !== -1);
      if (hit){
        var a = CHAT[i].a;
        if (a === '__SAYING__'){
          var s = SAYINGS[Math.floor(Math.random() * SAYINGS.length)];
          a = '<blockquote class="say"><p>&ldquo;' + s.t + '&rdquo;</p>' +
              '<cite>&mdash; ' + s.w + '</cite></blockquote>' +
              '<p>Now go do something with it. If you want the unsentimental version, ask ' +
              '<em>&ldquo;what should I fix first&rdquo;</em>.</p>';
        }
        return a;
      }
    }
  }
  return null;
}

function lookup(raw){
  const qLit = norm(raw), qExp = expand(raw), qToks = toks(qExp);
  if(!qToks.length) return {kind:'miss', near:[]};
  const ranked = KB.map(e=>({e, s:score(e,qLit,qToks)}))
                   .sort((a,b)=>b.s-a.s);
  const best = ranked[0], second = ranked[1];
  if(!best || best.s < 6) return {kind:'miss', near:ranked.slice(0,3).filter(r=>r.s>1).map(r=>r.e)};
  if(second && second.s > best.s * 0.86 && best.s < 22)
    return {kind:'clarify', options:ranked.slice(0,3).map(r=>r.e)};
  return {kind:'hit', entry:best.e, alsoSee:ranked.slice(1,3).filter(r=>r.s>best.s*0.4).map(r=>r.e)};
}

const $ = id => document.getElementById(id);
const log = $('log'), form = $('ask'), ta = $('q'), sendBtn = $('send');
const byId = id => KB.find(e=>e.id===id);
const esc = s => String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
const catName = id => (CATS.find(c=>c.id===id)||{}).name || 'General';

const SUGGESTED = ['grow-how','constraint','pricing','cashflow','market-first','speed-to-lead','first-steps','funding'];

$('chips').innerHTML = SUGGESTED.map(id=>{
  const e = byId(id); if(!e) return '';
  return `<button class="gchip" data-jump="${e.id}">${esc(e.q)}</button>`;
}).join('');

$('browse').innerHTML = CATS.map(c=>{
  const items = KB.filter(e=>e.cat===c.id);
  if(!items.length) return '';
  return `<div class="cat">
    <button class="cat-h" aria-expanded="false">
      <span>${esc(c.name)}</span>
      <span class="n">${items.length} answer${items.length===1?'':'s'}</span>
    </button>
    <ul class="cat-list">${items.map(e=>`<li><button data-jump="${e.id}">${esc(e.q)}</button></li>`).join('')}</ul>
  </div>`;
}).join('');

$('browseToggle').addEventListener('click', function(){
  const b = $('browse'), open = b.classList.toggle('open');
  this.setAttribute('aria-expanded', open);
  this.textContent = open ? 'Hide the question list' : 'Browse every question by topic';
});
$('browse').addEventListener('click', e=>{
  const h = e.target.closest('.cat-h');
  if(h){ const c = h.parentElement, o = c.classList.toggle('open'); h.setAttribute('aria-expanded',o); }
});

document.addEventListener('click', e=>{
  const b = e.target.closest('[data-jump]');
  if(!b) return;
  e.preventDefault();
  const entry = byId(b.dataset.jump);
  if(entry) submit(entry.q, entry);
});

document.addEventListener('click', e=>{
  const a = e.target.closest('.qidx a[href^="?q="]');
  if(!a) return;
  e.preventDefault();
  const q = decodeURIComponent(a.getAttribute('href').slice(3).replace(/\+/g,' '));
  document.getElementById('main').scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(function(){ submit(q); }, 260);
});

function autosize(){ ta.style.height='auto'; ta.style.height=Math.min(ta.scrollHeight,170)+'px'; }
ta.addEventListener('input', ()=>{ autosize(); sendBtn.disabled = !ta.value.trim(); });
ta.addEventListener('keydown', e=>{
  if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); if(ta.value.trim()) form.requestSubmit(); }
});
form.addEventListener('submit', e=>{ e.preventDefault(); const v=ta.value.trim(); if(v) submit(v); });

function submit(text, forced){
  document.body.classList.add('engaged');
  ta.value=''; autosize(); sendBtn.disabled=true;

  const turn = document.createElement('section');
  turn.className='turn';
  turn.innerHTML = `<div class="ask"><span>${esc(text)}</span></div>
    <div class="ans"><div class="typing"><i></i><i></i><i></i></div></div>`;
  log.appendChild(turn);
  turn.scrollIntoView({behavior:'smooth',block:'start'});

  var _chat = forced ? null : chatReply(text);
  const result = forced ? {kind:'hit', entry:forced, alsoSee:[]}
                        : (_chat ? {kind:'chat', html:_chat} : lookup(text));
  setTimeout(()=>{ render(turn, result, text); }, 420);
}

function resBlock(links){
  if(!links || !links.length) return '';
  return `<div class="res"><p class="res-h">Go straight to the source</p><div class="res-list">${
    links.map(([label,url,note])=>{
      const ext = /^https?:/.test(url);
      return `<a href="${url}"${ext?' target="_blank" rel="noopener"':''}>${label}${note?` <span class="ext">${esc(note)}</span>`:''}</a>`;
    }).join('')}</div></div>`;
}
function nextBlock(ids, heading){
  const list = (ids||[]).map(byId).filter(Boolean);
  if(!list.length) return '';
  return `<div class="next"><p class="next-h">${heading||'People ask next'}</p><div class="next-list">${
    list.map(e=>`<button data-jump="${e.id}">${esc(e.q)}</button>`).join('')}</div></div>`;
}

function render(turn, result, asked){
  const box = turn.querySelector('.ans');
  turn.classList.remove('clarify','miss');

  if(result.kind==='chat'){
    box.innerHTML = `<div class="ans-tab chat"><span class="dot"></span>Answer desk</div>
      <div class="ans-body">${result.html}</div>`;
    return;
  }

  if(result.kind==='hit'){
    const e = result.entry;
    const followUps = (e.next||[])
      .concat((result.alsoSee||[]).map(x=>x.id))
      .filter((v,i,a)=>a.indexOf(v)===i && v!==e.id)
      .slice(0,4);
    box.innerHTML = `<div class="ans-tab"><span class="dot"></span>${esc(catName(e.cat))}</div>
      <div class="ans-body"><h3>${esc(e.q)}</h3>${e.a}</div>
      ${resBlock(e.links)}
      ${nextBlock(followUps)}
      <div class="rate">Did this answer it?
        <button data-rate="y">Yes</button>
        <button data-rate="n">Not quite &mdash; ask a human</button></div>`;
    if(e.cap) box.insertAdjacentHTML('afterend', handoffHTML(asked, true));
  } else if(result.kind==='clarify'){
    turn.classList.add('clarify');
    box.innerHTML = `<div class="ans-tab"><span class="dot"></span>Which one did you mean?</div>
      <div class="ans-body"><p>That could go a few directions. Pick the closest and I will give you the full answer:</p></div>
      ${nextBlock(result.options.map(e=>e.id),'Closest matches')}`;
  } else {
    turn.classList.add('miss');
    box.innerHTML = `<div class="ans-tab"><span class="dot"></span>Not in the desk yet</div>
      <div class="ans-body"><p>No answer filed for that one yet, and I would rather say so than invent something. Two options: try a related question below, or send it over and we will answer you directly &mdash; then add it to the desk for the next person.</p></div>
      ${nextBlock(result.near.map(e=>e.id),'Closest we have')}
      <div class="rate"><button data-rate="n">Send my question to a human</button></div>`;
  }

  box.addEventListener('click', ev=>{
    const r = ev.target.closest('[data-rate]'); if(!r) return;
    const bar = r.closest('.rate');
    if(r.dataset.rate==='y'){ bar.innerHTML = '<span class="done">Good &mdash; glad that helped.</span>'; }
    else { bar.remove(); box.insertAdjacentHTML('afterend', handoffHTML(asked)); }
  });
}

let hoN = 0;
function handoffHTML(asked, soft){
  const n = ++hoN;
  const head = soft
    ? `<h4>Want a human to look at your specific situation?</h4>
       <p>Optional, obviously &mdash; the answer above is complete on its own. But if you want a real read on your numbers, send it over. We reply personally, usually same business day.</p>`
    : `<h4>Send it to a human</h4>
       <p>We will email you a real answer, usually same business day. No sales call unless you ask for one.</p>`;
  return `<form class="handoff" id="ho${n}" data-u="info" data-d="eyetoad.com" novalidate>
    ${head}
    <div class="f-row">
      <input type="text" name="name" placeholder="Your name" required autocomplete="name">
      <input type="email" name="email" placeholder="Email" required autocomplete="email">
    </div>
    <textarea name="question" placeholder="Your question or situation">${esc(asked||'')}</textarea>
    <div class="hp"><label>Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>
    <input type="hidden" name="_subject" value="Grow My Business — question from the answer desk">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_loadtime" value="${Date.now()}">
    <input type="hidden" name="page_url" value="${esc(location.href)}">
    <button class="go" type="submit">Send my question</button>
    <p class="f-note">Goes to ${_TO}. We do not sell, share or list your address.</p>
    <p class="f-msg" role="status"></p>
  </form>`;
}

function ajaxURL(to){ return ['https:','','formsubmit.co','ajax',to].join('/'); }
function plainURL(to){ return ['https:','','formsubmit.co',to].join('/'); }

function postViaIframe(to, data){
  try{
    var name = 'fs_sink_' + Date.now();
    var ifr = document.createElement('iframe');
    ifr.name = name; ifr.style.display = 'none';
    document.body.appendChild(ifr);
    var f = document.createElement('form');
    f.method = 'POST'; f.action = plainURL(to); f.target = name; f.style.display = 'none';
    data.forEach(function(v,k){
      var i = document.createElement('input');
      i.type = 'hidden'; i.name = k; i.value = v;
      f.appendChild(i);
    });
    document.body.appendChild(f);
    f.submit();
    setTimeout(function(){ try{ f.remove(); ifr.remove(); }catch(e){} }, 20000);
    return true;
  }catch(e){ return false; }
}
function deliver(to, fd){
  var fired = postViaIframe(to, fd);
  if(!window.fetch) return Promise.resolve(fired ? 'unsure' : 'failed');
  return fetch(ajaxURL(to), {method:'POST', body:fd})
    .then(function(r){ return r.ok ? 'sent' : (fired ? 'unsure' : 'failed'); })
    .catch(function(){ return fired ? 'unsure' : 'failed'; });
}

document.addEventListener('submit', function(ev){
  const f = ev.target.closest('.handoff'); if(!f) return;
  ev.preventDefault();
  const msg = f.querySelector('.f-msg'), btn = f.querySelector('.go');
  const val = n => (f.querySelector(`[name="${n}"]`)||{}).value || '';
  const fail = t => { msg.style.color='#B42318'; msg.innerHTML = t; };

  if(val('_honey')) return;
  if(Date.now() - Number(val('_loadtime')) < 4000) return fail('Give it a moment, then send again.');
  if(val('name').trim().length < 2) return fail('Add your name so we know who to reply to.');
  if(!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email'))) return fail('That email address does not look right.');
  if(val('question').trim().length < 8) return fail('Add a sentence or two about what you need.');

  btn.disabled = true; btn.textContent = 'Sending...';
  deliver(f.dataset.fs, new FormData(f)).then(function(state){
    if(state === 'sent'){
      f.innerHTML = '<h4>Sent.</h4><p>We have your question and will reply by email, usually the same business day. Check the spam folder if you do not see it.</p>';
      return;
    }
    if(state === 'unsure'){
      f.innerHTML = '<h4>Sent.</h4><p>Your question is on its way. We cannot get a delivery receipt back from here, so to be safe: if you have not heard from us within one business day, email <a href="mailto:${_TO}">${_TO}</a> or call (720) 249-6588 and mention the answer desk. We will find it.</p>';
      return;
    }
    btn.disabled = false; btn.textContent = 'Send my question';
    fail('That did not go through, and we are not going to pretend otherwise. Email <a href="mailto:' + _TO + '">' + _TO + '</a> or call (720) 249-6588 and we will sort it out.');
  });
});

document.querySelectorAll('.cap-form').forEach(f=>{
  const lt = f.querySelector('[name="_loadtime"]');
  if(lt) lt.value = Date.now();
  f.addEventListener('submit', function(ev){
    ev.preventDefault();
    const msg = f.querySelector('.cmsg'), btn = f.querySelector('button[type="submit"]');
    const val = n => (f.querySelector(`[name="${n}"]`)||{}).value || '';
    const fail = t => { msg.style.color='#FCA5A5'; msg.innerHTML = t; };
    msg.textContent='';

    if(val('_honey')) return;
    if(Date.now() - Number(val('_loadtime')) < 4000) return fail('Give it a moment, then send again.');
    if(val('name').trim().length < 2) return fail('Add your name so we know who to reply to.');
    if(!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val('email'))) return fail('That email address does not look right.');

    btn.disabled = true; btn.textContent = 'Sending...';
    const fd = new FormData(f);
    fd.append('_subject', f.dataset.label || 'Grow My Business — request');
    fd.append('_captcha','false');
    fd.append('_template','table');
    fd.append('page_url', location.href);
    deliver(f.dataset.fs, fd).then(function(state){
      if(state === 'sent'){
        f.innerHTML = '<h3 style="color:#fff;margin:0 0 6px">Sent &mdash; thank you.</h3><p style="color:rgba(255,255,255,.82);margin:0">We will be in touch by email, usually the same business day.</p>';
        return;
      }
      if(state === 'unsure'){
        f.innerHTML = '<h3 style="color:#fff;margin:0 0 6px">Sent.</h3><p style="color:rgba(255,255,255,.82);margin:0">On its way &mdash; though we cannot confirm delivery from here. If you have not heard back within one business day, email ${_TO} or call (720) 249-6588.</p>';
        return;
      }
      btn.disabled=false; btn.textContent='Send it →';
      fail('That did not go through. Email <a href="mailto:' + _TO + '" style="color:inherit">' + _TO + '</a> or call (720) 249-6588.');
    });
  });
});

document.querySelectorAll('.gfaq-q').forEach(btn=>{
  btn.addEventListener('click', function(){
    const item = btn.closest('.gfaq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.gfaq-item.open').forEach(el=>{
      el.classList.remove('open');
      el.querySelector('.gfaq-q').setAttribute('aria-expanded', false);
    });
    if(!wasOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded', true); }
  });
});

(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window) ||
     (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{rootMargin:'0px 0px -60px 0px', threshold:.08});
  els.forEach(el=>io.observe(el));
})();

(function(){
  const q = new URLSearchParams(location.search).get('q');
  if(q) submit(q);
})();


