// ═══════════════════════════════════════════════════════════
// ASSESSMENT DATA — All questions, categories, pillars, packages
// Edit this file to change question content, scoring, or structure
// ═══════════════════════════════════════════════════════════

export interface Question {
  /** Category index (0-5) */
  c: number;
  /** Question text */
  t: string;
  /** Pillar key: G=Growth, M=Management, D=Development */
  p: string;
  /** High-impact flag */
  m: boolean;
  /** Revenue leak min $/mo */
  mn: number;
  /** Revenue leak max $/mo */
  mx: number;
  /** Why-this-matters tip */
  tip: string;
  /** Package key mapping */
  pk: string;
}

export interface Category {
  id: number;
  name: string;
  short: string;
  weight: number;
  color: string;
  icon: string;
  desc: string;
}

export interface Pillar {
  key: string;
  name: string;
  color: string;
  bg: string;
  icon: string;
  desc: string;
  low: string;
  mid: string;
  high: string;
}

export interface Package {
  name: string;
  setup: number;
  mo: number;
  roi: string;
}

export interface ServiceStatus {
  label: string;
  color: string;
  bg: string;
}

export interface PhaseMeta {
  num: number;
  name: string;
  timeline: string;
  desc: string;
}

// ── DESIGN TOKENS ──
export const T = {
  bg:      "#07090f",
  bgMid:   "#0d1220",
  amber:   "#F5A623",
  amberDim:"rgba(245,166,35,0.35)",
  amberGlow:"rgba(245,166,35,0.12)",
  amberFaint:"rgba(245,166,35,0.05)",
  amberBorder:"rgba(245,166,35,0.22)",
  textMain:"#dde3ee",
  textMid: "#8899b8",
  textDim: "#4a5568",
  border:  "rgba(255,255,255,0.07)",
  grn:     "#4ade80",
  grnBg:   "rgba(74,222,128,0.08)",
  red:     "#f87171",
  redBg:   "rgba(248,113,113,0.08)",
  amb:     "#fb923c",
  ambBg:   "rgba(251,146,60,0.08)",
  blue:    "#60a5fa",
  blueBg:  "rgba(96,165,250,0.08)",
  pG:  "#4ade80",  pGb: "rgba(74,222,128,0.08)",
  pM:  "#60a5fa",  pMb: "rgba(96,165,250,0.08)",
  pD:  "#c084fc",  pDb: "rgba(192,132,252,0.08)",
};

// ── CATEGORIES (6) ──
export const CATS: Category[] = [
  {id:0,name:"Marketing & Lead Generation",short:"Marketing",weight:20,color:"#3B82F6",icon:"📣",desc:"How patients find you online and whether your marketing generates predictable inquiries."},
  {id:1,name:"Speed-to-Lead & Booking",short:"Speed-to-Lead",weight:15,color:"#8B5CF6",icon:"⚡",desc:"What happens after a lead comes in — response speed, follow-up, and getting patients scheduled."},
  {id:2,name:"Case Acceptance & Chairside",short:"Case Acceptance",weight:20,color:"#EC4899",icon:"🦷",desc:"How you present treatment, handle finances, and follow up on undecided patients."},
  {id:3,name:"Operations & Back Office",short:"Operations",weight:20,color:"#F59E0B",icon:"⚙️",desc:"Scheduling, collections, recall, and the financial engine of your practice."},
  {id:4,name:"Team, Training & Culture",short:"Team & Culture",weight:15,color:"#10B981",icon:"👥",desc:"Whether your people are trained, accountable, and set up to succeed."},
  {id:5,name:"Reporting, KPIs & Technology",short:"KPIs & Tech",weight:10,color:"#6366F1",icon:"📊",desc:"Whether you run on data or gut feel."},
];

// ── PILLARS (3) ──
export const PILS: Pillar[] = [
  {key:"G",name:"Practice Growth",color:T.pG,bg:T.pGb,icon:"📈",
    desc:"How effectively you attract the right patients and generate demand for high-value treatment.",
    low:"You're in the 'Needs attention' range — your patient pipeline depends on luck instead of a system.",
    mid:"Practice Growth is 'In progress' — some channels work, but gaps in consistency leave demand on the table.",
    high:"Practice Growth is a 'Growth engine' — your marketing generates consistent, predictable demand."},
  {key:"M",name:"Practice Management",color:T.pM,bg:T.pMb,icon:"⚙️",
    desc:"How strong your systems and operations are at turning interest into completed, collected treatment.",
    low:"You're in the 'Needs attention' range — significant revenue is being left on the table due to systems gaps.",
    mid:"Practice Management is 'In progress' — some systems exist but aren't connected or consistently followed.",
    high:"Practice Management is a 'Growth engine' — your systems catch what people miss and keep revenue flowing."},
  {key:"D",name:"Practice Development",color:T.pD,bg:T.pDb,icon:"🎯",
    desc:"How well your team presents treatment, handles money conversations, and is trained day-to-day.",
    low:"You're in the 'Needs attention' range — your team's skills are the bottleneck on acceptance.",
    mid:"Practice Development is 'In progress' — your team has talent but needs more structure and coaching.",
    high:"Practice Development is a 'Growth engine' — your team presents with confidence and closes consistently."},
];

// ── PACKAGES ──
export const PKGS: Record<string, Package> = {
  "PAE":{name:"Patient Acquisition Engine",setup:3000,mo:2500,roi:"For every $1 invested, expect $3–$8 back in new patient revenue within 90 days."},
  "WCS":{name:"Website & Conversion Stack",setup:5000,mo:500,roi:"A high-converting website pays for itself with just 2–3 additional booked patients per month."},
  "STL":{name:"Speed-to-Lead Automation",setup:2500,mo:1000,roi:"You're losing $5K–$15K/mo in leads nobody follows up. This fixes that for $1K/mo."},
  "AFD":{name:"AI Front Desk Agent",setup:2000,mo:800,roi:"Every after-hours call you miss is a patient your competitor gets. AI catches them for under $1K/mo."},
  "RRE":{name:"Recall & Retention Engine",setup:2000,mo:800,roi:"Every 5% bump in recall = $50K–$100K/year. This system costs less than one hygiene chair day."},
  "RCO":{name:"Revenue Cycle OS",setup:4000,mo:500,roi:"Going from 95% to 98% collection on $1.5M production = $45K recovered. Pays for itself in month 1."},
  "DDL":{name:"Data & Dashboard Layer",setup:3000,mo:1000,roi:"You can't fix what you can't see. The dashboard pays for itself by showing you where to focus."},
  "TOS":{name:"Team Operating System",setup:5000,mo:500,roi:"One prevented turnover ($30K–$50K saved) pays for the entire system twice over."},
  "CAS":{name:"Case Acceptance System",setup:4000,mo:1000,roi:"A 10% improvement in acceptance on existing patients = $8K–$25K/mo on a $1K investment."},
  "FTP":{name:"Front Desk & TC Performance",setup:1500,mo:1500,roi:"A 20% improvement in phone conversion or case acceptance pays for training many times over."},
};

// ── SERVICE STATUS ──
export const SERVICE_STATUS: Record<string, ServiceStatus> = {
  PAE:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  WCS:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  STL:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  AFD:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  RRE:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  CAS:{label:"Ready",color:"#16A34A",bg:"#F0FDF4"},
  DDL:{label:"Partial",color:"#EA580C",bg:"#FFF7ED"},
  FTP:{label:"Partial",color:"#EA580C",bg:"#FFF7ED"},
  RCO:{label:"In Build",color:"#2563EB",bg:"#EFF6FF"},
  TOS:{label:"In Build",color:"#2563EB",bg:"#EFF6FF"},
};

// ── PHASE MAP ──
export const PHASE_MAP: Record<string, number> = {
  STL:1, DDL:1, RRE:1,
  PAE:2, WCS:2, CAS:2, AFD:2,
  RCO:3, TOS:3, FTP:3,
};

export const PHASE_META: PhaseMeta[] = [
  {num:1, name:"Foundation", timeline:"Month 1–2", desc:"Quick wins: capture more leads, recover lost revenue, get visibility into your numbers."},
  {num:2, name:"Growth", timeline:"Month 3–4", desc:"Revenue acceleration: drive new patients, convert more cases, add AI coverage."},
  {num:3, name:"Scale", timeline:"Month 5–6", desc:"Long-term operations: systematize revenue cycle, team processes, and training."},
];

// ── INTRO GRADIENTS (per category) ──
export const INTRO_GRADIENTS: string[][] = [
  ["#3B82F6", "#60A5FA", "#1E40AF"],
  ["#8B5CF6", "#A78BFA", "#6D28D9"],
  ["#EC4899", "#F472B6", "#BE185D"],
  ["#F59E0B", "#FBBF24", "#D97706"],
  ["#10B981", "#34D399", "#065F46"],
  ["#6366F1", "#818CF8", "#4338CA"],
];

// ── HERO AGENTS ──
export const AGENTS = [
  {id:"growth", ref:"P-01", pillar:"Practice Growth", name:"GISELLE",
    tagline:"Drives new patient acquisition through paid ads, SEO, social, and reputation — bringing the right patients to your door.",
    microcopy:"Your AI growth partner for patient acquisition.", num:"01",
    role:"Growth Agent — Patient Acquisition", tools:["Google Ads","Meta Ads","SEO","GBP","Reputation"],
    caps:["Launch and manage Google and Meta ad campaigns","Optimize Google Business Profile weekly","Monitor and respond to reviews across platforms","Build SEO content strategy for local search dominance","Track cost per lead and ROAS across all channels"]},
  {id:"management", ref:"P-02", pillar:"Practice Management", name:"MILES",
    tagline:"Handles speed-to-lead, booking automation, recall, and front-office systems — so nothing slips through the cracks.",
    microcopy:"Your AI concierge for front-office and operations.", num:"02",
    role:"Management Agent — Front Office", tools:["CRM","Booking Engine","Recall OS","AI Phone","Analytics"],
    caps:["Respond to every new lead within 60 seconds","Automate booking, confirmation, and follow-up sequences","Run recall campaigns that re-engage dormant patients","Handle after-hours calls with AI phone agent","Track call-to-booking conversion and no-show rates"]},
  {id:"development", ref:"P-03", pillar:"Practice Development", name:"DEVON",
    tagline:"Boosts case acceptance, financing approvals, and post-consult follow-up so more patients say yes to better care.",
    microcopy:"Your AI strategist for case acceptance and follow-up.", num:"03",
    role:"Development Agent — Case Acceptance", tools:["Narrative App","Claude AI","Claude Code","Perplexity","PDF Builder"],
    caps:["Power the Narrative app — your TC's case presentation layer","Generate personalized treatment summaries and take-home PDFs","Coach TC performance using accepted vs. declined case data","Build financial presentation scripts tailored to patient thresholds","Use Claude Code to build and iterate tools your team uses daily"]},
  {id:"academy", ref:"P-04", pillar:"Practice Academy", name:"ALMA",
    tagline:"Empowers your team with onboarding, training, and playbooks — turning everyday staff into a high-performing practice crew.",
    microcopy:"Your AI coach for training and playbooks.", num:"04",
    role:"Academy Agent — Team Development", tools:["Playbook Builder","Onboarding OS","Claude AI","Call Coaching","SOP Generator"],
    caps:["Build onboarding tracks for new front desk hires in days not weeks","Generate role-specific SOPs and training playbooks automatically","Coach from real call recordings to improve booking conversion","Create accountability scorecards tied to team KPIs","Deliver ongoing training that evolves with your practice"]},
];

export const AGENT_COLOR: Record<string, string> = {
  growth: "#4ade80",
  management: "#60a5fa",
  development: "#c084fc",
  academy: "#fb7185",
};

// ── 100 QUESTIONS ──
export const Q: Question[] = [
  // Category 0: Marketing & Lead Generation (20 questions)
  {c:0,t:"Are you running Google Ads with conversion tracking connected to your PMS?",p:"G",m:true,mn:2000,mx:5000,tip:"Tracked Google Ads generate 15–40 new patient inquiries/mo.",pk:"PAE"},
  {c:0,t:"Are you running Meta/Facebook ads targeting cosmetic or implant cases?",p:"G",m:true,mn:1500,mx:4000,tip:"Meta ads are the #1 driver of high-ticket cosmetic/implant leads.",pk:"PAE"},
  {c:0,t:"Is your GBP fully optimized — photos, posts, services, Q&A updated monthly?",p:"G",m:false,mn:800,mx:2500,tip:"Optimized profiles get 7x more clicks than incomplete ones.",pk:"PAE"},
  {c:0,t:"Does your website load under 3 seconds on mobile?",p:"G",m:false,mn:400,mx:1200,tip:"53% of mobile visitors abandon slow sites.",pk:"WCS"},
  {c:0,t:"Can patients book online 24/7 without calling?",p:"G",m:false,mn:800,mx:2500,tip:"67% of patients prefer online booking.",pk:"WCS"},
  {c:0,t:"Do you have a smile simulator or before/after gallery capturing leads?",p:"G",m:false,mn:400,mx:1200,tip:"Interactive tools increase engagement 3–5x.",pk:"WCS"},
  {c:0,t:"Is your practice posting to social media 3x/week?",p:"G",m:false,mn:200,mx:800,tip:"3x/week posting doubles engagement.",pk:"PAE"},
  {c:0,t:"Are you sending at least one email/month to your patient base?",p:"G",m:false,mn:400,mx:1500,tip:"Monthly email reactivates dormant patients.",pk:"PAE"},
  {c:0,t:"Do you have a referral program with tracking?",p:"G",m:false,mn:800,mx:2500,tip:"Referred patients have 40% higher LTV.",pk:"PAE"},
  {c:0,t:"Is there a doctor video live on your website?",p:"G",m:false,mn:200,mx:800,tip:"Video builds instant trust.",pk:"WCS"},
  {c:0,t:"Are your listings on Healthgrades, Zocdoc, Yelp, WebMD claimed and updated?",p:"G",m:false,mn:300,mx:1000,tip:"Unclaimed listings erode trust.",pk:"PAE"},
  {c:0,t:"Is your star rating 4.7+ across platforms?",p:"G",m:false,mn:800,mx:2500,tip:"Below 4.5 stars you disappear from searches.",pk:"PAE"},
  {c:0,t:"Do you have 50+ Google reviews?",p:"G",m:false,mn:400,mx:1200,tip:"Review volume signals legitimacy.",pk:"PAE"},
  {c:0,t:"Are you running seasonal campaigns quarterly?",p:"G",m:false,mn:300,mx:1000,tip:"Seasonal campaigns re-engage patients.",pk:"PAE"},
  {c:0,t:"Do you have patient testimonials on your website?",p:"G",m:false,mn:200,mx:800,tip:"Testimonials are the #1 trust signal after ratings.",pk:"WCS"},
  {c:0,t:"Is your branding consistent across all touchpoints?",p:"G",m:false,mn:200,mx:600,tip:"Inconsistent branding looks disorganized.",pk:"WCS"},
  {c:0,t:"Do you have a before/after gallery with your actual cases?",p:"G",m:false,mn:400,mx:1500,tip:"Real cases convert; stock photos don't.",pk:"WCS"},
  {c:0,t:"Are you involved in community events or local press 2x/year?",p:"G",m:false,mn:200,mx:800,tip:"Community presence drives referrals and SEO.",pk:"PAE"},
  {c:0,t:"Are you running retargeting ads?",p:"G",m:false,mn:400,mx:1500,tip:"97% of visitors leave without booking. Retargeting brings them back.",pk:"PAE"},
  {c:0,t:"Do you have a new patient offer or lead magnet on your homepage?",p:"G",m:false,mn:400,mx:1200,tip:"A lead magnet converts browsers into leads.",pk:"WCS"},

  // Category 1: Speed-to-Lead & Booking (16 questions)
  {c:1,t:"Does someone contact new leads within 5 minutes?",p:"M",m:true,mn:2000,mx:5000,tip:"First responder wins 78% of patients.",pk:"STL"},
  {c:1,t:"Does an auto text go out within 60 seconds of a missed call?",p:"M",m:false,mn:800,mx:2500,tip:"Instant text-back recovers 25–40% of missed calls.",pk:"STL"},
  {c:1,t:"Does an AI or live service handle after-hours calls?",p:"M",m:true,mn:1200,mx:3500,tip:"40% of inquiries come outside business hours.",pk:"AFD"},
  {c:1,t:"Is online booking synced with your chair schedule?",p:"M",m:false,mn:300,mx:1000,tip:"Double-bookings destroy trust.",pk:"STL"},
  {c:1,t:"Do patients complete intake forms digitally before arrival?",p:"M",m:false,mn:200,mx:600,tip:"Paper forms waste 15–20 min of chair time.",pk:"STL"},
  {c:1,t:"Do unbooked leads get follow-up on days 1, 3, 7, 14, 30?",p:"M",m:true,mn:1500,mx:4000,tip:"80% need 3–5 touches before booking.",pk:"STL"},
  {c:1,t:"Does a no-show recovery message fire same day?",p:"M",m:false,mn:800,mx:2000,tip:"Same-day recovery recaptures 30–40% of no-shows.",pk:"STL"},
  {c:1,t:"Does an auto sequence try to rebook cancellations?",p:"M",m:false,mn:600,mx:1800,tip:"Cancellations without recovery become permanent attrition.",pk:"STL"},
  {c:1,t:"Do you have a waitlist that fills last-minute openings?",p:"M",m:false,mn:400,mx:1500,tip:"Without a waitlist, cancellation revenue is gone.",pk:"STL"},
  {c:1,t:"Does every patient get 48hr + 24hr confirmation?",p:"M",m:false,mn:400,mx:1200,tip:"Two-touch reduces no-shows 30–50%.",pk:"STL"},
  {c:1,t:"Do you offer and promote same-day availability?",p:"G",m:false,mn:400,mx:1500,tip:"Same-day captures high-intent leads.",pk:"STL"},
  {c:1,t:"Does every new patient get a welcome message before visit?",p:"M",m:false,mn:200,mx:600,tip:"Pre-visit communication reduces no-shows 40%.",pk:"STL"},
  {c:1,t:"Does front desk have a phone script, trained in last 90 days?",p:"D",m:false,mn:800,mx:2500,tip:"Untrained handling loses 30–50% of callers.",pk:"FTP"},
  {c:1,t:"Do you track call-to-booking conversion rate monthly?",p:"M",m:false,mn:400,mx:1200,tip:"Most practices don't know they lose 40%+ of callers.",pk:"DDL"},
  {c:1,t:"Do you know which channel sent each new patient?",p:"M",m:false,mn:400,mx:1200,tip:"Without tracking, you're spending blind.",pk:"DDL"},

  // Category 2: Case Acceptance & Chairside (20 questions)
  {c:2,t:"Do you use a digital case presentation tool?",p:"D",m:true,mn:1500,mx:4000,tip:"Digital tools increase acceptance 25–40%.",pk:"CAS"},
  {c:2,t:"Do you show smile simulation for implant/veneer consults?",p:"G",m:true,mn:2500,mx:7000,tip:"Patients are 2–3x more likely to accept when they see results.",pk:"CAS"},
  {c:2,t:"Is financing presented for every case over $1K?",p:"D",m:true,mn:1500,mx:5000,tip:"60% who decline cite cost but weren't shown payments.",pk:"CAS"},
  {c:2,t:"Does a TC handle the financial conversation?",p:"M",m:false,mn:800,mx:2500,tip:"TC protects the doctor-patient relationship.",pk:"FTP"},
  {c:2,t:"Do you have a documented consultation script?",p:"D",m:false,mn:600,mx:2000,tip:"Scripts ensure consistent experience.",pk:"CAS"},
  {c:2,t:"Is a before photo taken at every cosmetic consult?",p:"G",m:false,mn:300,mx:1000,tip:"Photos anchor reality and build your gallery.",pk:"CAS"},
  {c:2,t:"Does TC review pending treatment weekly?",p:"M",m:true,mn:1500,mx:4000,tip:"Most practices have $500K–$2M nobody follows up on.",pk:"CAS"},
  {c:2,t:"Do unaccepted patients enter automated follow-up?",p:"M",m:false,mn:1200,mx:3500,tip:"Automated follow-up recovers 15–25% of cases.",pk:"STL"},
  {c:2,t:"Do you offer and track same-day starts?",p:"D",m:false,mn:600,mx:2000,tip:"Same-day starts have near-100% completion.",pk:"CAS"},
  {c:2,t:"Do you track acceptance rate by provider monthly?",p:"M",m:false,mn:800,mx:2500,tip:"Provider tracking reveals who needs coaching.",pk:"DDL"},
  {c:2,t:"Have front desk/TC practiced objection handling in 90 days?",p:"D",m:false,mn:600,mx:2000,tip:"Rehearsed responses prevent lost cases.",pk:"FTP"},
  {c:2,t:"Do you use education materials chairside?",p:"D",m:false,mn:300,mx:1000,tip:"Visual tools increase acceptance.",pk:"CAS"},
  {c:2,t:"Is general dentistry acceptance above 70%?",p:"M",m:false,mn:800,mx:2500,tip:"70% is the healthy practice benchmark.",pk:"DDL"},
  {c:2,t:"Is high-ticket acceptance above 50%?",p:"M",m:true,mn:2000,mx:6000,tip:"10% improvement = $100K+ annually.",pk:"CAS"},
  {c:2,t:"Does someone follow up with undecided patients within 24hr?",p:"M",m:false,mn:800,mx:2500,tip:"24hr follow-up catches patients before they cool off.",pk:"STL"},
  {c:2,t:"Has TC had case presentation training in 6 months?",p:"D",m:false,mn:600,mx:2000,tip:"TCs who train regularly close 20–30% more.",pk:"FTP"},
  {c:2,t:"Do you track financing approval rate?",p:"M",m:false,mn:300,mx:1200,tip:"Below 70% approval = add a second financing option.",pk:"DDL"},
  {c:2,t:"Do you show total and monthly payment side by side?",p:"D",m:false,mn:800,mx:2500,tip:"Monthly anchoring makes large cases accessible.",pk:"CAS"},
  {c:2,t:"Do doctor and TC have a documented handoff script?",p:"M",m:false,mn:600,mx:2000,tip:"Smooth handoff maintains trust.",pk:"FTP"},
  {c:2,t:"Do you know unscheduled treatment $ and review weekly?",p:"M",m:true,mn:2000,mx:6000,tip:"$500K–$2M sits unscheduled in the average practice.",pk:"CAS"},

  // Category 3: Operations & Back Office (20 questions)
  {c:3,t:"Is schedule built around daily production goal per provider?",p:"M",m:true,mn:1500,mx:4000,tip:"Goal-based scheduling prevents feast-or-famine.",pk:"RCO"},
  {c:3,t:"Does team hold a morning huddle every day?",p:"M",m:false,mn:600,mx:2000,tip:"Huddles increase production 10–20%.",pk:"TOS"},
  {c:3,t:"Is hygiene recall automated?",p:"M",m:true,mn:1500,mx:4000,tip:"Automated recall increases reappointment 20–30%.",pk:"RRE"},
  {c:3,t:"Do you have an enforced cancellation policy?",p:"M",m:false,mn:400,mx:1200,tip:"Clear policy reduces no-shows 20–40%.",pk:"RCO"},
  {c:3,t:"Is insurance verified 48hr before appointments?",p:"M",m:false,mn:300,mx:1000,tip:"Prevents day-of surprises.",pk:"RCO"},
  {c:3,t:"Are claims submitted same day?",p:"M",m:false,mn:600,mx:2000,tip:"Delayed claims = delayed payment.",pk:"RCO"},
  {c:3,t:"Is AR over 90 days worked weekly?",p:"M",m:false,mn:1000,mx:3000,tip:"After 90 days, collection drops below 50%.",pk:"RCO"},
  {c:3,t:"Is collection rate 98%+?",p:"M",m:true,mn:1500,mx:4000,tip:"Each point below 98% = pure loss on completed work.",pk:"RCO"},
  {c:3,t:"Is overhead under 65% and tracked?",p:"M",m:false,mn:1200,mx:3500,tip:"Above 65% = working harder for less profit.",pk:"DDL"},
  {c:3,t:"Do you track new patient count monthly?",p:"M",m:false,mn:300,mx:1000,tip:"Without it, you won't see decline until crisis.",pk:"DDL"},
  {c:3,t:"Do you track provider production vs target?",p:"M",m:false,mn:600,mx:2000,tip:"Aggregates hide individual underperformance.",pk:"DDL"},
  {c:3,t:"Does team follow standardized checkout?",p:"M",m:false,mn:400,mx:1200,tip:"Skipped steps = uncollected copays.",pk:"RCO"},
  {c:3,t:"Is recall rate above 85%?",p:"M",m:true,mn:1500,mx:4000,tip:"5% drop = $50K–$100K lost annually.",pk:"RRE"},
  {c:3,t:"Do you review P&L monthly vs budget?",p:"M",m:false,mn:600,mx:2000,tip:"Monthly review catches problems early.",pk:"DDL"},
  {c:3,t:"Do you track cancel and no-show rates separately?",p:"M",m:false,mn:300,mx:1000,tip:"Different causes need different fixes.",pk:"DDL"},
  {c:3,t:"Do you compare planned vs completed treatment monthly?",p:"M",m:false,mn:800,mx:2500,tip:"Shows where $200K vanishes.",pk:"DDL"},
  {c:3,t:"Do you track time from acceptance to completion and flag 30+ day gaps?",p:"M",m:false,mn:1000,mx:3000,tip:"Aging treatment has high fall-off rate.",pk:"RRE"},
  {c:3,t:"Do you know average patient lifetime value?",p:"M",m:false,mn:300,mx:1000,tip:"LTV informs acquisition spending.",pk:"DDL"},
  {c:3,t:"Do you track patient retention rate (12-month active %)?",p:"M",m:false,mn:600,mx:2000,tip:"You track how they come in but not if they stayed.",pk:"RRE"},
  {c:3,t:"Do you hold 1–2 emergency slots per day?",p:"M",m:false,mn:400,mx:1500,tip:"Emergency patients go elsewhere without reserved slots.",pk:"RCO"},

  // Category 4: Team, Training & Culture (15 questions)
  {c:4,t:"Does every team member have a written job description?",p:"M",m:false,mn:200,mx:800,tip:"People can't meet undocumented expectations.",pk:"TOS"},
  {c:4,t:"Does every role have KPIs each person knows?",p:"M",m:false,mn:400,mx:1500,tip:"Measured front desk behaves differently.",pk:"TOS"},
  {c:4,t:"Do you have structured onboarding for new hires?",p:"D",m:false,mn:400,mx:1200,tip:"Clear program = productive in days, not months.",pk:"TOS"},
  {c:4,t:"Does team meet monthly for metrics and goals?",p:"M",m:false,mn:300,mx:1000,tip:"Meetings create shared accountability.",pk:"TOS"},
  {c:4,t:"Are core workflows documented as SOPs?",p:"M",m:false,mn:800,mx:2500,tip:"Without SOPs, everyone invents their own process.",pk:"TOS"},
  {c:4,t:"Do you conduct quarterly performance reviews?",p:"D",m:false,mn:200,mx:800,tip:"Quarterly catches issues early.",pk:"TOS"},
  {c:4,t:"Do you coach from real call recordings, not just scripts?",p:"D",m:false,mn:600,mx:2000,tip:"Real-call coaching is where booking rates actually improve.",pk:"FTP"},
  {c:4,t:"Does TC have a career path with milestones?",p:"D",m:false,mn:500,mx:1500,tip:"TC with growth trajectory stays longer and performs better.",pk:"FTP"},
  {c:4,t:"Has front desk trained on converting inquiries in 90 days?",p:"D",m:false,mn:800,mx:2500,tip:"Answering ≠ converting.",pk:"FTP"},
  {c:4,t:"Is daily huddle structured with accountability?",p:"M",m:false,mn:300,mx:1000,tip:"Huddle without accountability is just a meeting.",pk:"TOS"},
  {c:4,t:"Can a new hire be competent in 2 weeks?",p:"D",m:false,mn:400,mx:1200,tip:"If it takes months, training is inadequate.",pk:"TOS"},
  {c:4,t:"Do you measure team satisfaction annually?",p:"D",m:false,mn:200,mx:800,tip:"Satisfaction surveys give early warning.",pk:"TOS"},
  {c:4,t:"Does doctor communicate vision quarterly?",p:"D",m:false,mn:200,mx:800,tip:"Teams need to know where they're going.",pk:"TOS"},
  {c:4,t:"Is staff turnover under 20%?",p:"M",m:false,mn:800,mx:2500,tip:"Each departure costs $30K–$50K.",pk:"TOS"},
  {c:4,t:"Are 2+ people cross-trained on critical roles?",p:"M",m:false,mn:400,mx:1500,tip:"One sick day from chaos without it.",pk:"TOS"},

  // Category 5: Reporting, KPIs & Technology (10 questions)
  {c:5,t:"Is your PMS cloud-based?",p:"M",m:false,mn:200,mx:800,tip:"Server-based locks you to one location.",pk:"DDL"},
  {c:5,t:"Do you use a CRM tracking every lead?",p:"M",m:true,mn:1200,mx:3500,tip:"Without CRM, leads vanish into voicemails.",pk:"DDL"},
  {c:5,t:"Does someone review KPIs weekly?",p:"M",m:false,mn:600,mx:2000,tip:"Weekly catches problems in days.",pk:"DDL"},
  {c:5,t:"Do you know cost per lead for every channel?",p:"M",m:false,mn:400,mx:1200,tip:"Without CPL you can't optimize spend.",pk:"DDL"},
  {c:5,t:"Do you calculate cost per acquired patient monthly?",p:"M",m:false,mn:400,mx:1200,tip:"Track what actually matters.",pk:"DDL"},
  {c:5,t:"Do you review marketing ROI monthly?",p:"M",m:false,mn:600,mx:2000,tip:"No ROI review = gambling.",pk:"DDL"},
  {c:5,t:"Is Google Analytics installed and reviewed monthly?",p:"M",m:false,mn:200,mx:800,tip:"Without analytics, you're blind.",pk:"DDL"},
  {c:5,t:"Do you use call tracking with recordings reviewed monthly?",p:"M",m:false,mn:400,mx:1500,tip:"One coaching session from recordings improves booking 20%+.",pk:"DDL"},
  {c:5,t:"Can you trace every patient to exact marketing source?",p:"M",m:false,mn:600,mx:2000,tip:"Full attribution closes the loop.",pk:"DDL"},
  {c:5,t:"Do you share monthly performance report with team?",p:"D",m:false,mn:300,mx:1000,tip:"When the team sees numbers, they own results.",pk:"DDL"},
];

// ── DERIVED: question counts per category ──
export const CC = CATS.map(c => Q.filter(q => q.c === c.id).length);
