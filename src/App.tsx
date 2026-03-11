import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import AuthModal from "@/components/AuthModal";

/* ═══════════════════════════════════════════════════════════
   NEXTGEN PRACTICE SOLUTIONS — CONSOLIDATED v1
   Home hero shell (home-v2) + full assessment engine (v5)
   ═══════════════════════════════════════════════════════════ */

// ── DESIGN TOKENS (dark amber system) ──
const T = {
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

const CATS = [
  {id:0,name:"Marketing & Lead Generation",short:"Marketing",weight:20,color:"#3B82F6",icon:"📣",desc:"How patients find you online and whether your marketing generates predictable inquiries."},
  {id:1,name:"Speed-to-Lead & Booking",short:"Speed-to-Lead",weight:15,color:"#8B5CF6",icon:"⚡",desc:"What happens after a lead comes in — response speed, follow-up, and getting patients scheduled."},
  {id:2,name:"Case Acceptance & Chairside",short:"Case Acceptance",weight:20,color:"#EC4899",icon:"🦷",desc:"How you present treatment, handle finances, and follow up on undecided patients."},
  {id:3,name:"Operations & Back Office",short:"Operations",weight:20,color:"#F59E0B",icon:"⚙️",desc:"Scheduling, collections, recall, and the financial engine of your practice."},
  {id:4,name:"Team, Training & Culture",short:"Team & Culture",weight:15,color:"#10B981",icon:"👥",desc:"Whether your people are trained, accountable, and set up to succeed."},
  {id:5,name:"Reporting, KPIs & Technology",short:"KPIs & Tech",weight:10,color:"#6366F1",icon:"📊",desc:"Whether you run on data or gut feel."},
];

const PILS = [
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

const PKGS: Record<string, {name:string;setup:number;mo:number;roi:string}> = {
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

const BUNDLES = [
  {name:"Growth Engine",who:"If your biggest pain is getting enough new patients and making sure every lead gets followed up.",
    pkgs:["PAE","STL","DDL"],setup:8500,mo:4000,fy:56500,
    line:"Everything you need to consistently generate and capture high-value new patients — without hiring more staff or guessing what's working."},
  {name:"Case Acceptance Accelerator",who:"If your bigger problem is that consults and treatment plans aren't converting like they should.",
    pkgs:["CAS","FTP","STL"],setup:8000,mo:3000,fy:44000,
    line:"Turn more of your existing leads and consults into accepted treatment — without increasing ad spend or chair time."},
  {name:"Full Operating System",who:"If you need a ground-up build across marketing, systems, training, and reporting.",
    pkgs:["STL","CAS","RRE","DDL","TOS","RCO"],setup:18500,mo:6300,fy:94100,
    line:"The complete NextGen implementation — every system, every automation, every training program your practice needs to run at full capacity."},
];

interface Question {
  c: number;
  t: string;
  p: string;
  m: boolean;
  mn: number;
  mx: number;
  tip: string;
  pk: string;
}

const Q: Question[] = [
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

const CC = CATS.map(c => Q.filter(q => q.c === c.id).length);
const fmt = (n: number) => n.toLocaleString("en-US");

function getTier(s: number) {
  if (s >= 85) return {label:"HIGH PERFORMER",color:T.grn,bg:T.grnBg,body:"Your practice has strong systems and a clear growth engine. You're doing what most practices never get around to.",bullets:["Consistent new patient flow and solid reputation.","Team follows defined processes and tracks metrics.","Main opportunity: leverage through automation and AI."],focus:"We focus on AI agents, deeper automation, and advanced reporting so you grow without more stress.",cta:"We can walk through your score and map how an AI-powered operating system could free up your team."};
  if (s >= 65) return {label:"GROWTH READY",color:T.blue,bg:T.blueBg,body:"Solid foundation. The gaps that remain are fixable and highly leverageable — improvements that meaningfully increase production without starting over.",bullets:["Pieces of a strong system, but not fully connected.","Some leads, cases, or patients slipping through cracks.","A few missing systems holding you back."],focus:"We tighten front-office systems, plug the biggest leaks in follow-up and acceptance, then automate.",cta:"We can review your results and build an action plan to turn this score into predictable growth."};
  if (s >= 45) return {label:"AT RISK",color:T.amb,bg:T.ambBg,body:"Serious revenue slipping through the cracks. This doesn't mean bad dentistry — it means the business systems around your clinical work need to catch up.",bullets:["Opportunities lost before they reach the chair.","Treatment stalling or never getting started.","Key processes live in people's heads, not systems."],focus:"We build a true operating system: clear patient journeys, consistent follow-up, automation over heroics.",cta:"We can walk through your gaps and outline what closing a few of them means for your monthly production."};
  return {label:"CRITICAL",color:T.red,bg:T.redBg,body:"From a business and systems perspective, your practice carries unnecessary risk and avoidable loss. The good news: biggest wins come from practices starting here.",bullets:["No reliable system for generating and converting patients.","Acceptance, recall, collections depend on a few people.","Working hard but the practice isn't giving the return it should."],focus:"We get fundamentals in fast: lead handling, follow-up, acceptance structure, recall, and basic automation.",cta:"We can review your assessment and map a step-by-step plan to move out of the critical zone."};
}

const VIEW = {HOME:0, INTRO:1, Q:2, CHECKPOINT:3, RESULTS:4, REPORT:5} as const;

// ── SHARED STYLE HELPERS ──
const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background:"rgba(255,255,255,0.025)",
  border:`1px solid ${T.border}`,
  borderRadius:4,
  padding:28,
  ...extra,
});
const amberCard = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  ...card(),
  background:"rgba(245,166,35,0.04)",
  border:`1px solid ${T.amberBorder}`,
  ...extra,
});
const btn = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background:"transparent",
  border:`1px solid ${T.amber}`,
  color:T.amber,
  padding:"13px 28px",
  fontFamily:"'DM Mono',monospace",
  fontSize:11,
  letterSpacing:"0.2em",
  textTransform:"uppercase" as const,
  cursor:"pointer",
  ...extra,
});
const mono: React.CSSProperties = { fontFamily:"'DM Mono',monospace" };
const bebas: React.CSSProperties = { fontFamily:"'Bebas Neue',sans-serif" };
const sans: React.CSSProperties = { fontFamily:"'DM Sans',sans-serif" };

// ── RING COMPONENT ──
function Ring({pct, size=90, stroke=6, color=T.amber}: {pct:number;size?:number;stroke?:number;color?:string}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ} strokeLinecap="round"
        style={{transition:"stroke-dashoffset 0.8s cubic-bezier(.23,1,.32,1)"}}/>
    </svg>
  );
}

// ── TOPBAR ──
function TopBar({answered, catColor, user, onLoginClick, onLogout}: {answered:number;catColor?:string;user:User|null;onLoginClick:()=>void;onLogout:()=>void}) {
  const pct = Math.round((answered/100)*100);
  const col = catColor || T.amber;
  return (
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(7,9,15,0.95)",borderBottom:`1px solid ${T.border}`,backdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"14px 32px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:col,opacity:.7,animation:"blink 2s ease-in-out infinite"}}/>
          <span style={{...bebas,fontSize:14,letterSpacing:"0.35em",color:T.amber}}>NEXT</span>
          <span style={{...bebas,fontSize:14,letterSpacing:"0.35em",color:T.textMain}}>GEN</span>
          <span style={{...mono,fontSize:9,color:T.textDim,letterSpacing:"0.2em",marginLeft:4}}>PRACTICE SOLUTIONS</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          {answered > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:120,height:1,background:"rgba(255,255,255,0.06)",position:"relative"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",background:col,width:`${pct}%`,transition:"width 0.4s"}}/>
              </div>
              <span style={{...mono,fontSize:9,color:col,letterSpacing:"0.15em"}}>{pct}% COMPLETE</span>
            </div>
          )}
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.1em"}}>{user.email?.split("@")[0]}</span>
              <button onClick={onLogout} style={{...mono,background:"none",border:`1px solid ${T.border}`,color:T.textDim,fontSize:8,letterSpacing:"0.12em",textTransform:"uppercase",padding:"5px 10px",cursor:"pointer"}}>Sign Out</button>
            </div>
          ) : (
            <button onClick={onLoginClick} style={{...mono,background:"none",border:`1px solid ${T.amber}`,color:T.amber,fontSize:8,letterSpacing:"0.12em",textTransform:"uppercase",padding:"5px 10px",cursor:"pointer"}}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── STACKED CARDS (hero right side) ──
const AGENTS = [
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

const AGENT_COLOR: Record<string, string> = {
  growth: "#4ade80",
  management: "#60a5fa",
  development: "#c084fc",
  academy: "#fb7185",
};

function AgentCard({activeAgent}: {activeAgent: string}) {
  const [flipped, setFlipped] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const prevAgent = useRef(activeAgent);

  useEffect(() => {
    if (prevAgent.current !== activeAgent) {
      setFlipped(false);
      setFadeKey(k => k + 1);
      prevAgent.current = activeAgent;
    }
  }, [activeAgent]);

  const a = AGENTS.find(x => x.id === activeAgent)!;
  const col = AGENT_COLOR[a.id];

  return (
    <>
      <div style={{width:440,height:340,position:"relative",perspective:2000,cursor:"pointer",flexShrink:0}}
        onClick={() => setFlipped(f => !f)}>
        <div key={fadeKey} style={{
          position:"absolute",inset:0,
          animation:"cardFadeIn 0.4s ease both",
          transformStyle:"preserve-3d" as const,
        }}>
          <div style={{
            position:"relative",width:"100%",height:"100%",
            transformStyle:"preserve-3d" as const,
            transition:"transform 0.7s cubic-bezier(.23,1,.32,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}>
            {/* FRONT */}
            <div style={{
              position:"absolute",inset:0,borderRadius:3,padding:24,overflow:"hidden",
              backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",
              background:`rgba(245,166,35,0.07)`,
              border:`1px solid ${col}44`,
              boxShadow:`0 0 48px ${col}1a, 0 8px 32px rgba(0,0,0,0.4)`,
              backdropFilter:"blur(20px)",
              display:"flex",flexDirection:"column",justifyContent:"space-between",
            }}>
              {/* Breathing background orb */}
              <div style={{
                position:"absolute",top:"50%",left:"50%",width:200,height:200,
                borderRadius:"50%",background:col,filter:"blur(80px)",
                animation:"orb-bg-breathe 5s cubic-bezier(0.4,0,0.6,1) infinite",
                pointerEvents:"none",zIndex:0,willChange:"transform,opacity",
              }}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",zIndex:1}}>
                <span style={{...mono,fontSize:8,letterSpacing:"0.2em",color:T.textDim,textTransform:"uppercase"}}>{a.ref}</span>
                <span style={{...mono,fontSize:7,color:`${col}88`,letterSpacing:"0.18em",textTransform:"uppercase"}}>CLICK TO EXPLORE ›</span>
              </div>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{...mono,fontSize:8,letterSpacing:"0.25em",color:col,textTransform:"uppercase",marginBottom:6}}>{a.pillar}</div>
                <div style={{...bebas,fontSize:"2.6rem",lineHeight:.85,letterSpacing:"0.04em",color:T.textMain}}>{a.name}</div>
                <p style={{...sans,fontSize:11,color:T.textMid,lineHeight:1.6,marginTop:10}}>{a.tagline}</p>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",position:"relative",zIndex:1}}>
                <p style={{...mono,fontSize:9,color:col,lineHeight:1.55,borderLeft:`2px solid ${col}66`,paddingLeft:10,fontStyle:"italic",maxWidth:"78%",opacity:.85}}>{a.microcopy}</p>
                <span style={{...bebas,fontSize:"3rem",color:`${col}09`,lineHeight:1}}>{a.num}</span>
              </div>
            </div>
            {/* BACK */}
            <div style={{
              position:"absolute",inset:0,borderRadius:3,padding:22,
              backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",
              transform:"rotateY(180deg)",
              background:"rgba(8,11,20,0.98)",
              border:`1px solid ${col}44`,
              boxShadow:`0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${col}18`,
              display:"flex",flexDirection:"column",gap:10,overflow:"hidden",
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{...bebas,fontSize:"1.7rem",color:col,lineHeight:.9}}>{a.name}</div>
                  <div style={{...mono,fontSize:7,letterSpacing:"0.18em",color:T.textDim,textTransform:"uppercase",marginTop:4}}>{a.role}</div>
                </div>
                <button onClick={(e)=>{e.stopPropagation();setFlipped(false);}}
                  style={{...mono,background:"none",border:`1px solid ${T.border}`,color:T.textDim,fontSize:8,letterSpacing:"0.15em",textTransform:"uppercase",padding:"5px 8px",cursor:"pointer"}}>✕</button>
              </div>
              <div style={{width:"100%",height:1,background:`${col}33`}}/>
              <div style={{...mono,fontSize:7,letterSpacing:"0.22em",color:col,textTransform:"uppercase"}}>Tools</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {a.tools.map(t=><span key={t} style={{...mono,fontSize:7,letterSpacing:"0.1em",textTransform:"uppercase",border:`1px solid ${col}33`,color:col,padding:"3px 8px",background:`${col}06`}}>{t}</span>)}
              </div>
              <div style={{...mono,fontSize:7,letterSpacing:"0.22em",color:col,textTransform:"uppercase"}}>Capabilities</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:5}}>
                {a.caps.map((c,ci)=>(
                  <li key={ci} style={{...sans,fontSize:10,color:T.textMid,lineHeight:1.45,paddingLeft:12,position:"relative"}}>
                    <span style={{position:"absolute",left:0,color:col,fontFamily:"monospace"}}>›</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes breathe-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 var(--agent-color, #4ade80); opacity: 0.85; }
          50% { transform: scale(1.4); box-shadow: 0 0 6px 2px var(--agent-color, #4ade80); opacity: 1; }
        }
        @keyframes ripple-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }
        @keyframes orb-bg-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.08; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.16; }
        }
      `}</style>
    </>
  );
}

// ── HOME VIEW ──
function HomeView({onStart}: {onStart:()=>void}) {
  const [activeAgent, setActiveAgent] = useState<string>("growth");

  const agentTags = [
    {name:"Giselle",copy:"Leads & Growth",color:"#4ade80",id:"growth"},
    {name:"Miles",copy:"Front Office",color:"#60a5fa",id:"management"},
    {name:"Devon",copy:"Case Acceptance",color:"#c084fc",id:"development"},
    {name:"Alma",copy:"Training & Playbooks",color:"#fb7185",id:"academy"},
  ];

  return (
    <div style={{flex:1,display:"flex",alignItems:"center",maxWidth:1160,margin:"0 auto",padding:"40px 48px",gap:48,width:"100%"}}>
      <div style={{flex:"0 0 54%",display:"flex",flexDirection:"column",gap:20}}>
        <div style={{...mono,fontSize:9,letterSpacing:"0.28em",color:T.amber,textTransform:"uppercase",display:"flex",alignItems:"center",gap:10}}>
          <span style={{display:"inline-block",width:18,height:1,background:T.amberDim,flexShrink:0}}/>
          AI Operating System for Dental Practices
        </div>
        <h1 style={{...bebas,fontSize:"clamp(2.6rem,4.2vw,4rem)",lineHeight:.9,letterSpacing:"0.03em",color:T.textMain,margin:0}}>
          The World's First<br/><span style={{color:T.amber}}>AI Team</span><br/>for Dental Practices
        </h1>
        <p style={{...sans,fontSize:15,fontWeight:500,color:T.textMain,lineHeight:1.6,maxWidth:480,opacity:.88}}>
          Run your front desk, nurture leads, close treatments, and train your staff — all powered by a coordinated AI system.
        </p>
        <p style={{...sans,fontSize:13,color:T.textMid,lineHeight:1.75,maxWidth:460}}>
          Meet Miles, Giselle, Devon, and Alma — four specialized AI agents that grow your practice, protect your time, and help you scale without extra staff.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {agentTags.map(a=>{
            const isActive = activeAgent === a.id;
            return (
              <button key={a.name} onClick={() => setActiveAgent(a.id)}
                style={{
                  display:"flex",alignItems:"center",gap:6,
                  border: isActive ? `1px solid ${a.color}66` : `1px solid ${a.color}33`,
                  padding:"5px 12px",borderRadius:2,cursor:"pointer",
                  background: isActive ? `${a.color}14` : `${a.color}06`,
                  boxShadow: isActive ? `0 0 12px ${a.color}18` : "none",
                  transition:"all 0.25s ease",
                }}>
                <span style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",width:15,height:15,flexShrink:0,overflow:"visible"}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:a.color,animation:"breathe-glow 3s cubic-bezier(0.4,0,0.6,1) infinite",willChange:"transform,opacity",["--agent-color" as any]:a.color}}/>
                  {isActive && [0,1.5].map(d=>(
                    <span key={d} style={{position:"absolute",top:"50%",left:"50%",width:5,height:5,borderRadius:"50%",border:`1px solid ${a.color}`,animation:`ripple-ring 3s cubic-bezier(0,0,0.2,1) ${d}s infinite`,opacity:0,pointerEvents:"none"}}/>
                  ))}
                </span>
                <span style={{...mono,fontSize:8,letterSpacing:"0.15em",color:a.color,textTransform:"uppercase"}}>{a.name}</span>
                <span style={{...mono,fontSize:8,color: isActive ? a.color : T.textDim,letterSpacing:"0.08em",transition:"color 0.25s ease"}}>— {a.copy}</span>
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,marginTop:6,flexWrap:"wrap"}}>
          <button onClick={onStart} style={{
            ...btn(),
            display:"inline-flex",alignItems:"center",gap:12,
            width:"fit-content",position:"relative",overflow:"hidden",
          }}>
            <span>Take the 100-Point Assessment</span>
            <span style={{fontSize:15}}>→</span>
          </button>
          <span style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.12em"}}>15–20 MIN · FREE</span>
        </div>
      </div>
      <div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <AgentCard activeAgent={activeAgent} />
      </div>
    </div>
  );
}

// ── SECTION INTRO ──
interface ScoreData {
  total: number;
  answered: number;
  lkMn: number;
  lkMx: number;
  cd: {earned:number;ans:number;cnt:number;lkMn:number;lkMx:number}[];
  pd: Record<string, {earned:number;possible:number;lkMn:number;lkMx:number}>;
  gaps: (Question & {li:number;a:number})[];
}

function IntroView({ci, sc, onBegin, onJump}: {ci:number;sc:ScoreData;onBegin:()=>void;onJump:(i:number)=>void}) {
  const cat = CATS[ci];
  const cs = sc.cd[ci];
  const col = cat.color;
  return (
    <div style={{maxWidth:640,margin:"0 auto",padding:"48px 32px",textAlign:"center"}}>
      <div style={{fontSize:42,marginBottom:14}}>{cat.icon}</div>
      <div style={{...mono,fontSize:9,letterSpacing:"0.25em",color:T.textDim,marginBottom:8,textTransform:"uppercase"}}>Category {ci+1} of 6</div>
      <div style={{...bebas,fontSize:"2.4rem",color:col,letterSpacing:"0.04em",marginBottom:10}}>{cat.name}</div>
      <p style={{...sans,fontSize:14,color:T.textMid,lineHeight:1.75,marginBottom:28,maxWidth:480,margin:"0 auto 28px"}}>{cat.desc}</p>
      <div style={{display:"inline-flex",gap:20,background:`${col}08`,border:`1px solid ${col}33`,borderRadius:3,padding:"16px 28px",marginBottom:28}}>
        <div style={{textAlign:"center"}}>
          <div style={{...bebas,fontSize:"1.8rem",color:col,lineHeight:1}}>{CC[ci]}</div>
          <div style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.18em",textTransform:"uppercase",marginTop:2}}>Questions</div>
        </div>
        <div style={{width:1,background:`${col}33`}}/>
        <div style={{textAlign:"center"}}>
          <div style={{...bebas,fontSize:"1.8rem",color:col,lineHeight:1}}>{cat.weight}</div>
          <div style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.18em",textTransform:"uppercase",marginTop:2}}>Points</div>
        </div>
        {cs.ans > 0 && <>
          <div style={{width:1,background:`${col}33`}}/>
          <div style={{textAlign:"center"}}>
            <div style={{...bebas,fontSize:"1.8rem",color:T.grn,lineHeight:1}}>{cs.earned%1===0?cs.earned:cs.earned.toFixed(1)}</div>
            <div style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.18em",textTransform:"uppercase",marginTop:2}}>Earned</div>
          </div>
        </>}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:28}}>
        {CATS.map((c,i) => {
          const done = sc.cd[i].ans === CC[i];
          const active = i === ci;
          return (
            <button key={i} onClick={() => onJump(i)} style={{
              width:34,height:34,borderRadius:2,cursor:"pointer",
              border:`1px solid ${active?c.color:done?"rgba(74,222,128,0.4)":T.border}`,
              background:active?`${c.color}18`:done?"rgba(74,222,128,0.08)":"transparent",
              ...mono,fontSize:10,fontWeight:600,
              color:active?c.color:done?T.grn:T.textDim,
            }}>{i+1}</button>
          );
        })}
      </div>
      <button onClick={onBegin} style={{
        background:col,color:T.bg,border:"none",padding:"14px 36px",
        fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"0.2em",
        textTransform:"uppercase",cursor:"pointer",
      }}>{cs.ans > 0 ? "Continue →" : "Begin Section →"}</button>
    </div>
  );
}

// ── QUESTION VIEW ──
function QuestionView({ci, qi, ans, sc, onAnswer, onNext, onPrev, onFinish, onResults}: {
  ci:number;qi:number;ans:Record<string,number>;sc:ScoreData;
  onAnswer:(key:string,val:number)=>void;onNext:(i?:number)=>void;onPrev:()=>void;onFinish:()=>void;onResults:()=>void;
}) {
  const [tipOn, setTipOn] = useState(false);
  const catQs = Q.filter(q => q.c === ci);
  const cur = catQs[qi];
  const curKey = `${ci}-${qi}`;
  const cat = CATS[ci];
  const col = cat.color;
  const cs = sc.cd[ci];
  const catPct = Math.round((cs.ans / CC[ci]) * 100);
  const isLast = qi === catQs.length - 1;

  useEffect(() => setTipOn(false), [ci, qi]);

  const opts = [
    {label:"Yes — we have this",v:1,icon:"✓",color:T.grn,bg:T.grnBg},
    {label:"Partial — started but inconsistent",v:0.5,icon:"~",color:T.amb,bg:T.ambBg},
    {label:"No — we don't have this",v:0,icon:"✗",color:T.red,bg:T.redBg},
  ];

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"24px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8,...mono}}>
          <span style={{fontSize:16}}>{cat.icon}</span>
          <span style={{fontSize:10,color:col,letterSpacing:"0.15em",fontWeight:600}}>{cat.short}</span>
          <span style={{fontSize:9,color:T.textDim}}>·</span>
          <span style={{fontSize:9,color:T.textDim,letterSpacing:"0.1em"}}>{cs.ans}/{CC[ci]} answered</span>
        </div>
        <span style={{...mono,fontSize:9,color:T.textDim,letterSpacing:"0.12em"}}>{cs.earned%1===0?cs.earned:cs.earned.toFixed(1)} / {cat.weight} pts</span>
      </div>

      <div style={{width:"100%",height:2,background:"rgba(255,255,255,0.06)",marginBottom:20,position:"relative",borderRadius:1}}>
        <div style={{position:"absolute",left:0,top:0,height:"100%",background:col,width:`${catPct}%`,transition:"width 0.4s",borderRadius:1}}/>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:20,flexWrap:"wrap"}}>
        {catQs.map((_, i) => {
          const k = `${ci}-${i}`;
          const a = ans[k];
          const active = i === qi;
          const bg = a===1?T.grn:a===0.5?T.amb:a===0?T.red:active?col:"rgba(255,255,255,0.06)";
          return (
            <button key={i} onClick={() => onNext(i)} style={{
              width:24,height:24,borderRadius:2,border:active?`1px solid ${col}`:"none",
              background:bg,color:"rgba(255,255,255,0.9)",fontSize:9,...mono,cursor:"pointer",
            }}>{i+1}</button>
          );
        })}
      </div>

      <div style={{background:`${col}08`,border:`1px solid ${col}33`,borderRadius:4,padding:28,marginBottom:16}}>
        <div style={{...mono,fontSize:9,color:T.textDim,letterSpacing:"0.12em",marginBottom:12}}>Q{qi+1}/{catQs.length}</div>
        <div style={{...sans,fontSize:16,fontWeight:500,color:T.textMain,lineHeight:1.6,marginBottom:18}}>{cur.t}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
          <span style={{...mono,fontSize:9,color:T.textDim,letterSpacing:"0.12em",textTransform:"uppercase"}}>Revenue at risk</span>
          <span style={{...bebas,fontSize:"1.55rem",color:col,lineHeight:1,letterSpacing:"0.03em"}}>${fmt(cur.mn)}–${fmt(cur.mx)}</span>
          <span style={{...mono,fontSize:9,color:`${col}88`,letterSpacing:"0.08em"}}>/mo</span>
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {opts.map(o => {
          const sel = ans[curKey] === o.v;
          return (
            <button key={o.v} onClick={() => onAnswer(curKey, o.v)} style={{
              display:"flex",alignItems:"center",gap:12,padding:"14px 18px",width:"100%",
              background:sel?o.bg:"transparent",
              border:`1px solid ${sel?o.color:T.border}`,
              borderRadius:2,cursor:"pointer",textAlign:"left",
              transition:"all 0.2s",
            }}>
              <span style={{width:22,height:22,borderRadius:"50%",border:`1px solid ${sel?o.color:"rgba(255,255,255,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",...mono,fontSize:10,color:sel?o.color:T.textDim,flexShrink:0}}>{o.icon}</span>
              <span style={{...sans,fontSize:14,fontWeight:sel?600:400,color:sel?o.color:T.textMid,flex:1}}>{o.label}</span>
              {sel && <span style={{...mono,fontSize:9,color:o.color,letterSpacing:"0.1em"}}>{o.v===1?"+1":o.v===0.5?"+0.5":"0 pts"}</span>}
            </button>
          );
        })}
      </div>

      <button onClick={() => setTipOn(!tipOn)} style={{...mono,background:"transparent",border:`1px solid ${T.border}`,color:T.textDim,padding:"6px 14px",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",marginBottom:tipOn?10:0}}>
        {tipOn ? "Hide Context ▲" : "Why This Matters ▼"}
      </button>
      {tipOn && (
        <div style={{background:`${col}06`,border:`1px solid ${col}22`,borderLeft:`2px solid ${col}`,borderRadius:4,padding:16,marginTop:10,marginBottom:16,...sans,fontSize:13,color:T.textMid,lineHeight:1.75}}>
          {cur.tip}
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
        <button onClick={onPrev} style={{...mono,background:"transparent",border:`1px solid ${T.border}`,color:T.textDim,padding:"10px 18px",fontSize:10,letterSpacing:"0.15em",cursor:"pointer"}}>← Prev</button>
        <div style={{display:"flex",gap:10}}>
          {sc.answered >= 50 && (
            <button onClick={onResults} style={{...mono,background:"transparent",border:`1px solid ${col}`,color:col,padding:"10px 16px",fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer"}}>
              See Results
            </button>
          )}
          {isLast
            ? <button onClick={onFinish} style={{...btn({background:ci===5?T.amber:cat.color,color:T.bg,border:"none",padding:"11px 24px",fontSize:10})}}><span>{ci===5?"Finish → Report":"Next Section →"}</span></button>
            : <button onClick={() => onNext()} style={{...btn({background:cat.color,color:T.bg,border:"none",padding:"11px 24px",fontSize:10})}}><span>Next →</span></button>
          }
        </div>
      </div>
    </div>
  );
}

// ── RESULTS VIEW ──
function ResultsView({sc, onReport, onRetake, onContinue}: {sc:ScoreData;onReport:()=>void;onRetake:()=>void;onContinue:()=>void}) {
  const score = sc.total;
  const tier = getTier(score);
  const pillarScores = PILS.map(pil => {
    const d = sc.pd[pil.key];
    return {...pil, earned:d.earned, possible:d.possible, pct:d.possible>0?Math.round((d.earned/d.possible)*100):0, lkMn:d.lkMn, lkMx:d.lkMx};
  });
  const weakest = [...pillarScores].sort((a,b) => a.pct-b.pct)[0];
  const strongest = [...pillarScores].sort((a,b) => b.pct-a.pct)[0];
  const bandLabel = (pct: number) => pct>=70?{text:"Growth Engine",color:T.grn,bg:T.grnBg}:pct>=40?{text:"In Progress",color:T.amb,bg:T.ambBg}:{text:"Needs Attention",color:T.red,bg:T.redBg};

  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"32px"}}>
      <div style={{...mono,fontSize:9,letterSpacing:"0.25em",color:T.amber,textTransform:"uppercase",marginBottom:24,display:"flex",alignItems:"center",gap:10}}>
        <span style={{width:16,height:1,background:T.amberDim,display:"inline-block"}}/>
        Practice Health Report · {sc.answered} of 100 Questions Answered
      </div>

      <div style={{...amberCard({padding:28,marginBottom:16,display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"})}}>
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Ring pct={score} size={110} stroke={7} color={tier.color}/>
          <div style={{position:"absolute",textAlign:"center"}}>
            <div style={{...bebas,fontSize:"2.2rem",color:tier.color,lineHeight:1}}>{score%1===0?score:score.toFixed(1)}</div>
            <div style={{...mono,fontSize:8,color:T.textDim,letterSpacing:"0.12em"}}>/100</div>
          </div>
        </div>
        <div style={{flex:1,minWidth:200}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"4px 14px",borderRadius:2,background:tier.bg,border:`1px solid ${tier.color}30`,marginBottom:10}}>
            <span style={{...mono,fontSize:10,fontWeight:700,color:tier.color,letterSpacing:"0.15em",textTransform:"uppercase"}}>{tier.label}</span>
          </div>
          <p style={{...mono,fontSize:11,color:T.textMid,lineHeight:1.7,marginBottom:12}}>{tier.body}</p>
          <div style={{borderLeft:`2px solid ${T.amber}`,paddingLeft:14}}>
            <div style={{...mono,fontSize:8,color:T.amber,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:4}}>What We Would Focus On</div>
            <div style={{...mono,fontSize:10,color:T.textMid,lineHeight:1.65}}>{tier.focus}</div>
          </div>
        </div>
      </div>

      {sc.lkMn > 0 && (
        <div style={{...card({padding:20,marginBottom:16,borderColor:"rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.04)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16})}}>
          <span style={{...mono,fontSize:9,color:T.red,letterSpacing:"0.18em",textTransform:"uppercase"}}>Estimated Revenue at Risk</span>
          <div style={{textAlign:"right"}}>
            <div style={{...bebas,fontSize:"1.8rem",color:T.red,lineHeight:1}}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)}<span style={{...mono,fontSize:10,fontWeight:400}}>/mo</span></div>
            <div style={{...mono,fontSize:9,color:T.red,opacity:.6}}>${fmt(sc.lkMn*12)}–${fmt(sc.lkMx*12)} / year</div>
          </div>
        </div>
      )}

      <div style={{...amberCard({padding:24,marginBottom:16})}}>
        <div style={{...bebas,fontSize:"1.4rem",color:T.textMain,letterSpacing:"0.04em",marginBottom:4}}>Practice Growth Scorecard</div>
        <div style={{...mono,fontSize:9,color:T.textDim,marginBottom:20,letterSpacing:"0.1em"}}>Three pillars of a next-generation practice</div>
        {sc.answered >= 20 && (
          <div style={{...mono,fontSize:10,color:T.textMid,lineHeight:1.7,borderLeft:`2px solid ${T.amber}`,paddingLeft:14,marginBottom:20}}>
            Strongest in <strong style={{color:strongest.color}}>{strongest.name}</strong>. Biggest opportunity: <strong style={{color:weakest.color}}>{weakest.name}</strong>.
          </div>
        )}
        {pillarScores.map((pil, i) => {
          const band = bandLabel(pil.pct);
          return (
            <div key={i} style={{marginBottom:i<2?20:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14}}>{pil.icon}</span>
                  <span style={{...mono,fontSize:11,color:pil.color,letterSpacing:"0.08em"}}>{pil.name}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{...bebas,fontSize:"1.6rem",color:pil.color,lineHeight:1}}>{pil.pct}%</span>
                  <span style={{...mono,fontSize:8,color:band.color,background:band.bg,padding:"2px 8px",border:`1px solid ${band.color}30`,letterSpacing:"0.1em"}}>{band.text}</span>
                </div>
              </div>
              <div style={{height:2,background:"rgba(255,255,255,0.05)",borderRadius:1,marginBottom:8}}>
                <div style={{height:"100%",width:`${pil.pct}%`,background:pil.color,borderRadius:1,transition:"width 0.8s"}}/>
              </div>
              <div style={{...mono,fontSize:9,color:band.color,fontStyle:"italic",letterSpacing:"0.04em"}}>{pil.pct>=70?pil.high:pil.pct>=40?pil.mid:pil.low}</div>
            </div>
          );
        })}
      </div>

      {sc.gaps.length > 0 && (
        <div style={{...amberCard({padding:24,marginBottom:16})}}>
          <div style={{...bebas,fontSize:"1.4rem",color:T.textMain,letterSpacing:"0.04em",marginBottom:4}}>Top Gaps — Ranked by Impact</div>
          <div style={{...mono,fontSize:9,color:T.textDim,marginBottom:18,letterSpacing:"0.1em"}}>Sorted by revenue at risk</div>
          {sc.gaps.slice(0,7).map((g, i) => {
            const cm = CATS[g.c];
            const pl = PILS.find(p => p.key === g.p)!;
            const pkg = PKGS[g.pk];
            const loss = g.a===0?`$${fmt(g.mn)}–$${fmt(g.mx)}/mo`:`$${fmt(Math.round(g.mn*.5))}–$${fmt(Math.round(g.mx*.5))}/mo`;
            return (
              <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<6?`1px solid ${T.border}`:"none"}}>
                <div style={{...bebas,fontSize:"1.1rem",color:g.m?T.red:T.amber,width:20,flexShrink:0,lineHeight:1,paddingTop:2}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{...mono,fontSize:8,color:cm.color,background:`${cm.color}11`,padding:"1px 6px",letterSpacing:"0.1em"}}>{cm.short}</span>
                    <span style={{...mono,fontSize:8,color:pl.color,background:pl.bg,padding:"1px 6px",letterSpacing:"0.1em"}}>{pl.name.replace("Practice ","")}</span>
                    {g.m && <span style={{...mono,fontSize:8,color:T.red,background:T.redBg,padding:"1px 6px",letterSpacing:"0.1em"}}>HIGH IMPACT</span>}
                  </div>
                  <div style={{...mono,fontSize:10,color:T.textMain,marginBottom:4,lineHeight:1.45}}>{g.t.length>88?g.t.slice(0,88)+"...":g.t}</div>
                  <div style={{...mono,fontSize:9}}>
                    <span style={{color:T.red}}>{loss}</span>
                    <span style={{color:T.textDim}}> → </span>
                    <span style={{color:T.amber}}>{pkg.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {sc.gaps.length > 7 && <div style={{...mono,fontSize:9,color:T.textDim,paddingTop:10,fontStyle:"italic"}}>+ {sc.gaps.length-7} more gaps in full report</div>}
        </div>
      )}

      <div style={{...amberCard({padding:28,marginBottom:16,textAlign:"center"})}}>
        <div style={{...bebas,fontSize:"1.6rem",color:T.amber,letterSpacing:"0.04em",marginBottom:8}}>Get Your Full Report</div>
        <p style={{...mono,fontSize:10,color:T.textMid,lineHeight:1.7,marginBottom:20}}>Pillar-by-pillar breakdown with package recommendations, pricing, and ROI for every gap identified.</p>
        <button onClick={onReport} style={{...btn({background:T.amber,color:T.bg,border:"none",padding:"14px 32px",fontSize:11})}}>View & Download Full Report →</button>
      </div>

      <div style={{...card({padding:28,marginBottom:16})}}>
        <p style={{...mono,fontSize:11,color:T.textMid,lineHeight:1.75,marginBottom:20}}>{tier.cta}</p>
        <button style={{...btn({background:T.amber,color:T.bg,border:"none",padding:"14px 24px",fontSize:11,width:"100%"})}}>Book Your NextGen Roadmap Call →</button>
        <div style={{...mono,fontSize:8,color:T.textDim,textAlign:"center",marginTop:10,letterSpacing:"0.12em"}}>No pitch, no pressure. Just a conversation about your practice.</div>
      </div>

      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:40}}>
        {sc.answered < 100 && <button onClick={onContinue} style={{...btn({fontSize:9,padding:"10px 18px"})}}>Complete Remaining ({100-sc.answered} left)</button>}
        <button onClick={onRetake} style={{...mono,background:"transparent",border:`1px solid ${T.border}`,color:T.textDim,padding:"10px 18px",fontSize:9,cursor:"pointer",letterSpacing:"0.15em",textTransform:"uppercase"}}>Retake Assessment</button>
      </div>
    </div>
  );
}

// ── REPORT VIEW ──
function ReportView({sc, onBack}: {sc:ScoreData;onBack:()=>void}) {
  const score = sc.total;
  const tier = getTier(score);
  const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  const pillarScores = PILS.map(pil => {
    const d = sc.pd[pil.key];
    return {...pil, earned:d.earned, possible:d.possible, pct:d.possible>0?Math.round((d.earned/d.possible)*100):0, lkMn:d.lkMn, lkMx:d.lkMx};
  });
  const gapsByPillar: Record<string, (Question & {li:number;a:number})[]> = {G:[],M:[],D:[]};
  sc.gaps.forEach(g => gapsByPillar[g.p].push(g));
  const weakest = [...pillarScores].sort((a,b)=>a.pct-b.pct)[0];
  const bandLabel = (pct: number) => pct>=70?"Growth Engine":pct>=40?"In Progress":"Needs Attention";

  return (
    <div style={{background:"white",color:"#1a1a1a",fontFamily:"'DM Mono',monospace",minHeight:"100vh"}}>
      <style>{`
        @media print{body{margin:0;}.no-print{display:none!important;}.pg{page-break-before:always;}}
        .rpt{padding:40px 48px;max-width:800px;margin:0 auto;}
        .tbl{width:100%;border-collapse:collapse;font-size:11px;margin:14px 0;}
        .tbl th{background:#1B2A4A;color:white;padding:8px 10px;text-align:left;font-weight:600;font-size:10px;letter-spacing:0.1em;}
        .tbl td{padding:8px 10px;border-bottom:1px solid #E2E5EB;vertical-align:top;}
        .tbl tr:nth-child(even){background:#F9FAFB;}
      `}</style>

      <div className="no-print" style={{position:"sticky",top:0,zIndex:100,background:"#1B2A4A",padding:"12px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:"white",fontWeight:700,fontSize:13,letterSpacing:"0.1em"}}>NEXTGEN // FULL REPORT</span>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onBack} style={{padding:"8px 18px",background:"transparent",color:"#C9A84C",border:"1px solid rgba(201,168,76,0.4)",fontSize:11,cursor:"pointer",letterSpacing:"0.1em"}}>← Back to Results</button>
          <button onClick={()=>window.print()} style={{padding:"8px 18px",background:"#C9A84C",color:"#1B2A4A",border:"none",fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:"0.1em"}}>Download PDF ↓</button>
        </div>
      </div>

      <div className="rpt">
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:10,letterSpacing:4,color:"#C9A84C",fontWeight:600,marginBottom:8}}>NEXTGEN PRACTICE SOLUTIONS</div>
          <div style={{fontSize:26,fontWeight:800,color:"#1B2A4A",marginBottom:4}}>Practice Health Report</div>
          <div style={{fontSize:11,color:"#6B7280"}}>Assessment Date: {today}</div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:24,padding:20,border:`2px solid ${tier.color}22`,borderRadius:8,marginBottom:20}}>
          <Ring pct={score} size={85} stroke={6} color={tier.color}/>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:12,background:tier.bg,marginBottom:6}}>
              <span style={{fontSize:11,fontWeight:700,color:tier.color,letterSpacing:"0.1em"}}>{tier.label}</span>
            </div>
            <div style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>{tier.body}</div>
          </div>
        </div>

        {sc.lkMn > 0 && (
          <div style={{background:"#FEF2F2",borderRadius:8,padding:18,textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:10,fontWeight:600,color:"#6B7280",letterSpacing:"0.1em",marginBottom:4}}>TOTAL ESTIMATED REVENUE AT RISK</div>
            <div style={{fontSize:20,fontWeight:800,color:"#DC2626"}}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)} / month</div>
            <div style={{fontSize:11,color:"#DC2626",marginTop:2}}>${fmt(sc.lkMn*12)}–${fmt(sc.lkMx*12)} / year</div>
          </div>
        )}

        <div style={{fontSize:13,fontWeight:700,color:"#1B2A4A",marginBottom:12}}>Pillar Score Summary</div>
        {pillarScores.map((pil,i) => (
          <div key={i} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:11,fontWeight:600,color:pil.color}}>{pil.icon} {pil.name}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:15,fontWeight:800,color:pil.color}}>{pil.pct}%</span>
                <span style={{fontSize:9,color:pil.pct>=70?"#16A34A":pil.pct>=40?"#EA580C":"#DC2626",background:pil.pct>=70?"#F0FDF4":pil.pct>=40?"#FFF7ED":"#FEF2F2",padding:"2px 8px",borderRadius:8,fontWeight:600}}>{bandLabel(pil.pct)}</span>
              </div>
            </div>
            <div style={{height:5,background:"#F1F5F9",borderRadius:3}}><div style={{height:"100%",width:`${pil.pct}%`,background:pil.color,borderRadius:3}}/></div>
          </div>
        ))}
      </div>

      {pillarScores.map((pil, pi) => {
        const pilGaps = gapsByPillar[pil.key].slice(0,8);
        if (pilGaps.length === 0 && pil.pct >= 70) return null;
        return (
          <div key={pi} className="pg rpt">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,borderBottom:`2px solid ${pil.color}`,paddingBottom:10}}>
              <div style={{fontSize:17,fontWeight:700,color:pil.color}}>{pil.icon} {pil.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18,fontWeight:800,color:pil.color}}>{pil.pct}%</span>
                <span style={{fontSize:9,fontWeight:600,color:pil.pct>=70?"#16A34A":pil.pct>=40?"#EA580C":"#DC2626",background:pil.pct>=70?"#F0FDF4":pil.pct>=40?"#FFF7ED":"#FEF2F2",padding:"3px 10px",borderRadius:8}}>{bandLabel(pil.pct)}</span>
              </div>
            </div>
            <div style={{fontSize:11,color:"#6B7280",lineHeight:1.65,marginBottom:14}}>{pil.desc}</div>
            {pil.lkMn > 0 && <div style={{background:"#FEF2F2",borderRadius:6,padding:12,marginBottom:14,fontSize:11}}><span style={{fontWeight:600,color:"#DC2626"}}>Estimated monthly leak from this pillar: ${fmt(pil.lkMn)}–${fmt(pil.lkMx)}</span></div>}
            {pilGaps.length > 0 && (
              <table className="tbl">
                <thead><tr><th style={{width:"36%"}}>Gap</th><th>Leak/mo</th><th>Package</th><th style={{width:"28%"}}>ROI</th></tr></thead>
                <tbody>
                  {pilGaps.map((g,gi) => {
                    const pkg = PKGS[g.pk];
                    const loss = g.a===0?`$${fmt(g.mn)}–$${fmt(g.mx)}`:`$${fmt(Math.round(g.mn*.5))}–$${fmt(Math.round(g.mx*.5))}`;
                    return (
                      <tr key={gi}>
                        <td style={{fontWeight:500}}>{g.t.length>68?g.t.slice(0,68)+"...":g.t}{g.m&&<span style={{color:"#DC2626",fontSize:9}}> ★ HIGH</span>}</td>
                        <td style={{color:"#DC2626",fontWeight:600,whiteSpace:"nowrap"}}>{loss}</td>
                        <td style={{fontWeight:600,fontSize:10}}>{pkg.name}</td>
                        <td style={{fontSize:10,color:"#6B7280"}}>{pkg.roi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}

      <div className="pg rpt">
        <div style={{fontSize:17,fontWeight:700,color:"#1B2A4A",marginBottom:16}}>What This Means — Recommended Path</div>
        <div style={{fontSize:12,color:"#2D2D2D",lineHeight:1.7,marginBottom:20,padding:16,background:"#FBF6E8",borderRadius:8,borderLeft:"3px solid #C9A84C"}}>
          Your biggest opportunity is in <strong style={{color:weakest.color}}>{weakest.name}</strong> at <strong>{weakest.pct}%</strong>.
          {sc.lkMn>0&&<> You're leaving an estimated <strong style={{color:"#DC2626"}}>${fmt(sc.lkMn)}–${fmt(sc.lkMx)}/month</strong> in preventable leaks.</>}
        </div>
        {BUNDLES.slice(0,2).map((b,i) => (
          <div key={i} style={{border:"1px solid #E2E5EB",borderRadius:8,padding:18,marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:"#1B2A4A",marginBottom:4}}>{b.name}</div>
            <div style={{fontSize:11,color:"#6B7280",marginBottom:10}}>{b.who}</div>
            <div style={{fontSize:11,marginBottom:10}}><strong>Includes:</strong> {b.pkgs.map(pk=>PKGS[pk].name).join(" + ")}</div>
            <div style={{fontSize:11,fontStyle:"italic",color:"#6B7280"}}>{b.line}</div>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:28,padding:24,background:"#1B2A4A",borderRadius:8}}>
          <div style={{fontSize:14,fontWeight:700,color:"#C9A84C",marginBottom:8}}>Ready to see what this looks like in your practice?</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginBottom:4}}>Book a 45-minute NextGen Roadmap Session.</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:8}}>nextgenpractice.org/roadmap</div>
        </div>
        <div style={{textAlign:"center",marginTop:24,fontSize:10,color:"#9CA3AF"}}>NextGen Practice Solutions · nextgenpractice.org</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════
export default function App() {
  const [ans, setAns] = useState<Record<string, number>>({});
  const [ci, setCi] = useState(0);
  const [qi, setQi] = useState(0);
  const [view, setView] = useState<number>(VIEW.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useCallback(() => ref.current?.scrollIntoView({behavior:"smooth",block:"start"}), []);

  // Auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load progress when user logs in
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase.from("assessment_progress").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        const savedAns = (data.answers as Record<string, number>) || {};
        setAns(savedAns);
        setCi(data.current_category);
        setQi(data.current_question);
        if (Object.keys(savedAns).length > 0) {
          setView(data.current_view);
        }
      }
    };
    load();
  }, [user]);

  // Save progress (debounced)
  const saveProgress = useCallback((newAns: Record<string, number>, newCi: number, newQi: number, newView: number) => {
    if (!user) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await supabase.from("assessment_progress").upsert({
        user_id: user.id,
        answers: newAns,
        current_category: newCi,
        current_question: newQi,
        current_view: newView,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }, 500);
  }, [user]);

  const catQs = useMemo(() => Q.filter(q => q.c === ci), [ci]);

  const sc = useMemo((): ScoreData => {
    let total=0, answered=0, lkMn=0, lkMx=0;
    const cd = CATS.map(c => ({earned:0,ans:0,cnt:CC[c.id],lkMn:0,lkMx:0}));
    const pd: Record<string, {earned:number;possible:number;lkMn:number;lkMx:number}> = {G:{earned:0,possible:0,lkMn:0,lkMx:0},M:{earned:0,possible:0,lkMn:0,lkMx:0},D:{earned:0,possible:0,lkMn:0,lkMx:0}};
    const gaps: (Question & {li:number;a:number})[] = [];
    Q.forEach(q => { pd[q.p].possible += 1; });
    Q.forEach(q => {
      const cQs = Q.filter(qq => qq.c === q.c);
      const li = cQs.indexOf(q);
      const k = `${q.c}-${li}`;
      const a = ans[k];
      if (a !== undefined) {
        total += a; answered++;
        cd[q.c].earned += a; cd[q.c].ans++;
        pd[q.p].earned += a;
        if (a === 0) { lkMn+=q.mn; lkMx+=q.mx; cd[q.c].lkMn+=q.mn; cd[q.c].lkMx+=q.mx; pd[q.p].lkMn+=q.mn; pd[q.p].lkMx+=q.mx; gaps.push({...q,li,a}); }
        else if (a === 0.5) { const mn2=Math.round(q.mn*.5),mx2=Math.round(q.mx*.5); lkMn+=mn2; lkMx+=mx2; cd[q.c].lkMn+=mn2; cd[q.c].lkMx+=mx2; pd[q.p].lkMn+=mn2; pd[q.p].lkMx+=mx2; gaps.push({...q,li,a}); }
      }
    });
    gaps.sort((a,b) => b.mx-a.mx);
    return {total:Math.round(total*10)/10, answered, lkMn, lkMx, cd, pd, gaps};
  }, [ans]);

  const handleAnswer = useCallback((key: string, val: number) => {
    setAns(p => {
      const next = {...p,[key]:val};
      saveProgress(next, ci, qi, VIEW.Q);
      return next;
    });
    setTimeout(() => {
      const cQs = Q.filter(q => q.c === ci);
      if (qi < cQs.length - 1) { setQi(qi+1); scroll(); }
    }, 280);
  }, [ci, qi, scroll, saveProgress]);

  const jumpCat = useCallback((c: number) => {
    setCi(c); setQi(0); setView(VIEW.INTRO); scroll();
    saveProgress(ans, c, 0, VIEW.INTRO);
  }, [scroll, ans, saveProgress]);

  const nextSection = useCallback(() => {
    if (ci < 5) {
      const n=ci+1;
      const nv = n===3&&sc.answered>0?VIEW.CHECKPOINT:VIEW.INTRO;
      setCi(n); setQi(0); setView(nv); scroll();
      saveProgress(ans, n, 0, nv);
    } else {
      setView(VIEW.RESULTS); scroll();
      saveProgress(ans, ci, qi, VIEW.RESULTS);
    }
  }, [ci, sc.answered, scroll, ans, qi, saveProgress]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <div ref={ref} style={{minHeight:"100vh",background:T.bg,color:T.textMain,display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,500;1,300&family=DM+Sans:wght@400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:${T.bg};}
        @keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
        button{font-family:'DM Mono',monospace;}
      `}</style>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={() => setAuthOpen(false)} />

      {view === VIEW.HOME && (
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
          <div style={{position:"absolute",width:800,height:500,left:"50%",top:"50%",transform:"translate(-50%,-50%)",background:`radial-gradient(ellipse,${T.amberGlow} 0%,transparent 65%)`,animation:"breathe 8s ease-in-out infinite"}}/>
          <style>{`@keyframes breathe{0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}}`}</style>
        </div>
      )}

      <div style={{position:"fixed",left:28,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,rgba(245,166,35,0.18) 30%,rgba(245,166,35,0.18) 70%,transparent)`,zIndex:5,pointerEvents:"none"}}/>

      {view === VIEW.REPORT ? (
        <ReportView sc={sc} onBack={() => { setView(VIEW.RESULTS); scroll(); }}/>
      ) : (
        <>
          <TopBar answered={sc.answered} catColor={view !== VIEW.HOME ? CATS[ci].color : undefined} user={user} onLoginClick={() => setAuthOpen(true)} onLogout={handleLogout}/>
          <div style={{flex:1,display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
            {view === VIEW.HOME && <HomeView onStart={() => { setCi(0); setQi(0); setView(VIEW.INTRO); scroll(); }}/>}
            {view === VIEW.INTRO && <IntroView ci={ci} sc={sc} onBegin={() => { setQi(0); setView(VIEW.Q); scroll(); }} onJump={jumpCat}/>}
            {view === VIEW.Q && (
              <QuestionView
                ci={ci} qi={qi} ans={ans} sc={sc}
                onAnswer={handleAnswer}
                onNext={(i?: number) => { const next = i!==undefined?i:qi+1; setQi(next); scroll(); }}
                onPrev={() => { if(qi>0){setQi(qi-1);scroll();}else if(ci>0)jumpCat(ci-1); }}
                onFinish={nextSection}
                onResults={() => { setView(VIEW.RESULTS); scroll(); }}
              />
            )}
            {view === VIEW.CHECKPOINT && (
              <div style={{maxWidth:560,margin:"0 auto",padding:"60px 32px",textAlign:"center"}}>
                <div style={{...bebas,fontSize:"3rem",color:CATS[ci].color,marginBottom:8}}>HALFWAY</div>
                <div style={{...bebas,fontSize:"1.8rem",color:T.textMain,marginBottom:16}}>THERE.</div>
                <p style={{...sans,fontSize:15,color:T.textMid,lineHeight:1.75,marginBottom:28}}>3 of 6 categories complete. Your progress is saved — take a break or keep going.</p>
                <button onClick={() => { setView(VIEW.INTRO); scroll(); }} style={{background:CATS[ci].color,color:T.bg,border:"none",padding:"14px 36px",...mono,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer"}}>Continue to Category 4 →</button>
              </div>
            )}
            {view === VIEW.RESULTS && (
              <ResultsView
                sc={sc}
                onReport={() => { setView(VIEW.REPORT); scroll(); }}
                onRetake={() => { setAns({}); setCi(0); setQi(0); setView(VIEW.HOME); scroll(); saveProgress({}, 0, 0, VIEW.HOME); }}
                onContinue={() => {
                  for(let i=0;i<6;i++){if(sc.cd[i].ans<CC[i]){jumpCat(i);return;}}
                }}
              />
            )}
          </div>

          {view === VIEW.HOME && (
            <div style={{...mono,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 48px",borderTop:`1px solid ${T.border}`,maxWidth:1100,margin:"0 auto",width:"100%"}}>
              <div style={{fontSize:8,color:T.textDim,letterSpacing:"0.15em",textTransform:"uppercase",lineHeight:1.9}}>
                NextGen Practice Solutions — Cao Consulting LLC<br/>
                <span style={{color:"rgba(245,166,35,0.4)"}}>■</span> Giselle · Miles · Devon
              </div>
              <div style={{fontSize:8,color:T.textDim,letterSpacing:"0.15em",textTransform:"uppercase",textAlign:"right"}}>
                nextgenpractice.org<br/>
                <span style={{color:T.amberBorder}}>100-Point Practice Assessment</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
