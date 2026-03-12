// Assessment question definitions — mirrored from App.tsx for admin scoring
export interface Question {
  c: number;
  t: string;
  p: string;
  m: boolean;
  mn: number;
  mx: number;
  tip: string;
  pk: string;
}

export const CATS = [
  { id: 0, name: "Marketing & Lead Generation", short: "Marketing", weight: 20, color: "#3B82F6", icon: "📣" },
  { id: 1, name: "Speed-to-Lead & Booking", short: "Speed-to-Lead", weight: 15, color: "#8B5CF6", icon: "⚡" },
  { id: 2, name: "Case Acceptance & Chairside", short: "Case Acceptance", weight: 20, color: "#EC4899", icon: "🦷" },
  { id: 3, name: "Operations & Back Office", short: "Operations", weight: 20, color: "#F59E0B", icon: "⚙️" },
  { id: 4, name: "Team, Training & Culture", short: "Team & Culture", weight: 15, color: "#10B981", icon: "👥" },
  { id: 5, name: "Reporting, KPIs & Technology", short: "KPIs & Tech", weight: 10, color: "#6366F1", icon: "📊" },
];

export const Q: Question[] = [
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

export const CC = CATS.map(c => Q.filter(q => q.c === c.id).length);

export function computeScore(ans: Record<string, number>) {
  let total = 0, answered = 0;
  const cd = CATS.map(c => ({ earned: 0, ans: 0, cnt: CC[c.id] }));

  Q.forEach(q => {
    const cQs = Q.filter(qq => qq.c === q.c);
    const li = cQs.indexOf(q);
    const k = `${q.c}-${li}`;
    const a = ans[k];
    if (a !== undefined) {
      total += a;
      answered++;
      cd[q.c].earned += a;
      cd[q.c].ans++;
    }
  });

  return { total: Math.round(total * 10) / 10, answered, categories: cd };
}

export function getGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "High Performer", color: "#4ade80" };
  if (score >= 65) return { label: "Growth Ready", color: "#60a5fa" };
  if (score >= 45) return { label: "At Risk", color: "#fb923c" };
  return { label: "Critical", color: "#f87171" };
}

export function getQuestionAnswer(ans: Record<string, number>, catIdx: number, qIdx: number) {
  return ans[`${catIdx}-${qIdx}`];
}
