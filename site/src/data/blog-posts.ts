export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-case-acceptance-is-the-highest-roi-metric",
    title: "Why Case Acceptance Is the Highest-ROI Metric in Your Practice",
    excerpt:
      "Most practices focus on new patients. But the fastest path to revenue growth is closing the treatment you've already diagnosed. Here's why — and what to do about it.",
    category: "Case Acceptance",
    author: "NextGen Practice Solutions",
    date: "2026-03-10",
    readTime: "6 min read",
    featured: true,
    content: [
      "Every dental practice obsesses over new patient numbers. And they should — growth matters. But there's a metric hiding in plain sight that has 3-5x the revenue impact of a new patient campaign: **case acceptance rate**.",
      "The average dental practice has a case acceptance rate between 40-60%. That means for every $1M in diagnosed treatment, $400K-$600K walks out the door. Not because patients don't need the treatment — but because the practice didn't present it in a way that made the patient say yes.",
      "## The Math Is Simple",
      "Let's say your practice diagnoses $2M in treatment annually. At 50% acceptance, you're collecting on $1M. If you move that to 70% acceptance — not even best-in-class — you've added $400K in production without spending a single dollar on marketing, without hiring, without adding a single new patient.",
      "Compare that to a new patient campaign. At $300 cost per new patient and $500 average first-year value, you need **2,000 new patients** to generate $400K in net revenue. That's unrealistic for most practices.",
      "## Why Acceptance Rates Are Low",
      "The problem is almost never clinical. Doctors diagnose well. The breakdown happens in three places:",
      "**1. The Handoff.** Most practices have no structured process for transitioning a patient from the clinical diagnosis to the treatment coordinator. The doctor says \"you need a crown,\" the patient walks to the front desk confused, and the financial conversation happens cold.",
      "**2. The Presentation.** Patients don't understand clinical language. They don't know what a crown is, why it matters, or what happens if they wait. Without visual aids, plain-language explanations, and phased options, the default answer is \"let me think about it.\"",
      "**3. The Follow-Up.** When a patient says \"let me think about it,\" most practices do nothing. No call, no text, no personalized follow-up. The patient forgets, life gets busy, and the treatment never happens.",
      "## What High-Performing Practices Do Differently",
      "Practices with 80%+ case acceptance rates aren't luckier — they have systems. Specifically:",
      "- A structured warm handoff protocol from doctor to TC\n- Visual, patient-friendly treatment presentations\n- Financial presentations with pre-calculated options (insurance, financing, phased plans)\n- Take-home materials that continue the conversation at home\n- Automated follow-up sequences at 7, 30, and 90 days for unaccepted treatment",
      "This is exactly what the Narrative system was built to do. Not a script — a complete system that transforms how patients experience the decision to say yes.",
      "## Take the First Step",
      "If you're not tracking your case acceptance rate, start there. Pull a report from your PMS for the last 90 days: total treatment diagnosed vs. total treatment accepted. If the number is below 70%, you have a six-figure opportunity sitting in your existing patient base.",
      "Want to see exactly where your case acceptance process breaks down? Take our free Case Acceptance Readiness Assessment — 50 questions, 10 minutes, actionable results.",
    ],
  },
  {
    slug: "speed-to-lead-the-metric-you-are-ignoring",
    title: "Speed-to-Lead: The Metric You're Ignoring That's Costing You Patients",
    excerpt:
      "78% of patients book with the first practice to respond. If your response time is measured in hours, you're losing patients before you even know they exist.",
    category: "Patient Acquisition",
    author: "NextGen Practice Solutions",
    date: "2026-03-03",
    readTime: "5 min read",
    content: [
      "Here's a stat that should keep you up at night: **78% of patients book with the first practice to respond to their inquiry**. Not the best practice, not the cheapest, not the one with the most Google reviews — the first one to answer.",
      "And the average dental practice takes **4+ hours** to respond to a new patient inquiry. On evenings and weekends? Most never respond at all.",
      "## The Window Is Minutes, Not Hours",
      "Research across industries shows that lead response time has a dramatic, non-linear impact on conversion:",
      "- Responding within **5 minutes** makes you **21x more likely** to qualify the lead\n- After **30 minutes**, the likelihood drops by 100x\n- After **1 hour**, the lead is essentially cold",
      "For dental practices, this means every web form, missed call, and social media DM that sits unanswered for hours is a patient booking somewhere else.",
      "## The After-Hours Problem",
      "Here's the uncomfortable truth: patients don't search for dentists during your office hours. They search at night, on weekends, and during lunch breaks. The majority of your inbound lead volume happens when nobody is there to answer.",
      "If your after-hours strategy is a voicemail recording that says \"leave a message and we'll call you back during business hours\" — you're losing 30-50% of your potential new patients to the practice that answers at 8pm on a Tuesday.",
      "## What Instant Response Looks Like",
      "The practices winning the speed game have systems, not just staff:",
      "- **Instant text reply** to every web form submission (\"Thanks for reaching out! We'd love to help. Can we schedule a visit?\")\n- **AI-powered call handling** that answers overflow and after-hours calls naturally\n- **Webchat** on their website that engages visitors in real-time\n- **Lead nurture sequences** for inquiries that don't convert immediately",
      "Notice what all of these have in common: they're automated. You can't hire your way to 60-second response times 24/7. You need systems.",
      "## The ROI Calculation",
      "Let's say you get 50 new patient inquiries per month and currently convert 40% to booked appointments (20 patients). If faster response times increase your conversion to 55%, that's 7-8 additional patients per month — at a $500 average first-year value, that's **$3,500-$4,000/month in additional revenue**, or nearly $45K per year.",
      "And the cost of implementing instant response? A fraction of a single marketing campaign.",
      "## Start Here",
      "This week, track every inbound inquiry and note the time between the inquiry and your first response. If the average is over 15 minutes, you have a speed-to-lead problem. Take our Speed-to-Lead Assessment to identify exactly where leads are falling through the cracks.",
    ],
  },
  {
    slug: "the-real-cost-of-team-turnover",
    title: "The Real Cost of Team Turnover (And What Actually Fixes It)",
    excerpt:
      "Replacing a dental team member costs 50-200% of their annual salary. Yet most practices have zero systems for retention. Here's the infrastructure that keeps your best people.",
    category: "Team Management",
    author: "NextGen Practice Solutions",
    date: "2026-02-24",
    readTime: "7 min read",
    content: [
      "When a hygienist or treatment coordinator leaves, most practice owners feel the pain immediately — scrambling to cover shifts, losing patient relationships, the months-long ramp-up of a new hire. But few calculate the actual cost.",
      "## The True Cost of Turnover",
      "Industry research puts the cost of replacing an employee at **50-200% of their annual salary**. For a dental practice, here's what that looks like:",
      "- **Hygienist** ($75K salary): $37K-$150K in total replacement cost\n- **Treatment Coordinator** ($45K salary): $22K-$90K in total replacement cost\n- **Front Desk** ($38K salary): $19K-$76K in total replacement cost",
      "These numbers include recruiting, onboarding, training, lost productivity during vacancy, reduced production during ramp-up, and the downstream effects on patient experience and retention.",
      "A practice that loses 2-3 team members per year is spending **$50K-$150K annually** on turnover — and most of it is invisible because it never shows up as a line item on the P&L.",
      "## Why People Actually Leave",
      "Exit interview data across hundreds of dental practices reveals consistent patterns. People don't leave because of money (though underpaying accelerates the decision). They leave because of:",
      "**1. Role Ambiguity.** \"I don't know what I'm supposed to be doing\" or \"I'm doing three people's jobs.\" When roles aren't clearly defined, everyone is frustrated — the team member, their manager, and their colleagues.",
      "**2. No Growth Path.** \"I've been doing the same thing for 3 years with no opportunity to advance.\" Without defined career paths, ambitious team members eventually look elsewhere.",
      "**3. Poor Communication.** \"I never know what's going on\" or \"I find out about changes after they've already happened.\" Lack of structured communication breeds disengagement.",
      "**4. No Recognition.** \"Nobody notices when I do great work, but everyone notices when something goes wrong.\" Recognition isn't praise — it's a system that consistently acknowledges contribution.",
      "## Systems, Not Sentiment",
      "The solution to turnover isn't pizza parties and \"we're a family\" culture. It's infrastructure:",
      "- **Written role descriptions** with clear KPIs for every position\n- **Structured onboarding** with 30/60/90 day milestones (not \"shadow Sarah for a week\")\n- **Regular performance reviews** (quarterly minimum) with two-way feedback\n- **Defined career paths** showing what advancement looks like in your practice\n- **Meeting cadence** that keeps the team informed and aligned (daily huddles, weekly team meetings)\n- **Compensation benchmarking** against your market annually",
      "This is organizational infrastructure — the people equivalent of your clinical systems and financial controls. Most practices have neither.",
      "## The Team OS Approach",
      "Team OS builds all of this infrastructure for your practice: role architecture, KPI systems, onboarding programs, meeting frameworks, and retention systems. It's not a one-time consulting engagement — it's the operating system your team runs on.",
      "Start by understanding where you stand. The Team Performance & Culture Assessment evaluates your practice across 40 questions in 4 critical pillars: role clarity, training, communication, and culture.",
    ],
  },
  {
    slug: "5-kpis-every-practice-owner-should-check-weekly",
    title: "5 KPIs Every Practice Owner Should Check Weekly (Not Monthly)",
    excerpt:
      "Monthly financial reviews are too late to catch problems. Here are the 5 numbers you should be looking at every week — and what they tell you.",
    category: "Data & Analytics",
    author: "NextGen Practice Solutions",
    date: "2026-02-17",
    readTime: "5 min read",
    content: [
      "Most practice owners review their numbers monthly — if at all. They sit down with their bookkeeper or accountant, look at last month's P&L, and react to whatever happened 30-45 days ago.",
      "By then, it's too late. A bad month is already in the books. A trend that started 6 weeks ago has been compounding. The opportunity to course-correct in real-time has passed.",
      "## The Weekly Five",
      "These are the 5 KPIs that, when monitored weekly, give you the earliest possible signal that something needs attention:",
      "### 1. Production vs. Goal",
      "Not monthly production — **weekly** production against your weekly target. If you need $40K/week to hit your monthly goal, you should know by Friday whether you're on track. Falling behind in week 1 gives you 3 weeks to adjust. Discovering it at the end of the month gives you zero.",
      "### 2. Collection Rate",
      "Your collection rate (collections ÷ adjusted production) should be 98%+. Tracking it weekly catches dips immediately — whether it's a billing backlog, a coding issue, or an insurance delay. If your rate drops below 95% for two consecutive weeks, something systemic is wrong.",
      "### 3. New Patient Count",
      "How many new patients were seen this week? Not inquiries, not scheduled — seen. This is your growth pulse. Compare it to your weekly target and your marketing spend. A sudden drop means your acquisition funnel has a leak somewhere.",
      "### 4. Schedule Utilization",
      "What percentage of your available appointment slots were filled? Track this by provider. If a hygienist is at 70% utilization while another is at 95%, you have a scheduling or recall problem — not a demand problem.",
      "### 5. Cancellation & No-Show Rate",
      "Track cancellations and no-shows as a percentage of scheduled appointments. The industry benchmark is under 10%. If you're above that, your confirmation process needs work. If certain days or providers spike, the data tells you exactly where to focus.",
      "## Why Weekly Matters",
      "The difference between weekly and monthly tracking is the difference between **managing** and **reacting**. Weekly data gives you:",
      "- Early warning signals (a declining trend over 3 weeks is a pattern, not a blip)\n- The ability to adjust mid-month (reallocate marketing, adjust schedules, address billing delays)\n- Team accountability (sharing weekly numbers in your team meeting keeps everyone focused)\n- Compounding improvements (52 course corrections per year vs. 12)",
      "## Getting Started",
      "If you don't have a dashboard that shows these 5 numbers in real-time, start with a simple spreadsheet. Update it every Friday. Within a month, you'll wonder how you ever managed without it.",
      "Better yet, build a real-time dashboard that pulls from your PMS automatically. That's exactly what the Data & Dashboard solution provides — but even a manual weekly review is 10x better than monthly.",
      "Take the Data & Visibility Assessment to see how your practice scores on KPI tracking, reporting infrastructure, and data-driven decision making.",
    ],
  },
  {
    slug: "patient-retention-the-invisible-revenue-engine",
    title: "Patient Retention: The Invisible Revenue Engine",
    excerpt:
      "You spend thousands acquiring new patients but have no system for keeping them. Here's why retention is the most underinvested area in dentistry — and the math that proves it.",
    category: "Patient Retention",
    author: "NextGen Practice Solutions",
    date: "2026-02-10",
    readTime: "6 min read",
    content: [
      "Ask any practice owner their new patient goal and they'll give you a number instantly. Ask them their patient retention rate and you'll get silence — or a guess.",
      "This blind spot is the most expensive mistake in practice management.",
      "## The Retention Math",
      "The average dental practice loses **15-20% of its patient base annually**. On a practice with 2,000 active patients, that's 300-400 patients walking away every year.",
      "At an average patient lifetime value of $500/year (and much higher for patients who accept treatment), that's **$150K-$200K in recurring annual revenue** — gone.",
      "Now compare the cost of keeping a patient vs. acquiring a new one:",
      "- Cost to retain (recall systems, communication, experience): **$15-25/patient/year**\n- Cost to acquire a new patient: **$200-400/patient**",
      "That's a **10-20x cost difference**. Every dollar invested in retention has an order of magnitude more impact than the same dollar spent on acquisition.",
      "## Where Patients Fall Off",
      "Patient attrition isn't usually dramatic. Patients rarely call to say \"I'm leaving.\" They simply... stop coming. The lifecycle looks like this:",
      "1. Patient completes their visit\n2. Leaves without their next appointment scheduled (or schedules and later cancels)\n3. Gets a reminder call or text 6 months later\n4. Ignores it or says \"I'll call back to schedule\"\n5. Never calls back\n6. Eventually finds another dentist when they have a problem",
      "The two critical failure points are **pre-scheduling at checkout** (if they leave without the next appointment, you've already lost momentum) and **reactivation follow-up** (if your outreach is a single reminder, it's not enough).",
      "## What Retention Infrastructure Looks Like",
      "High-retention practices (85%+ recall compliance) have systems at every stage:",
      "**Before the visit:** Multi-channel confirmations (text, email, call) at 2 weeks, 48 hours, and day-of. Personalized messages, not generic reminders.",
      "**At checkout:** The next hygiene appointment is scheduled before the patient leaves. This single habit is the #1 predictor of retention.",
      "**After the visit:** Same-day follow-up (\"How are you feeling?\"), satisfaction surveys, and review requests. The patient feels cared for, not processed.",
      "**When overdue:** Structured reactivation campaigns at 30, 60, and 90+ days overdue. Multi-channel (text, email, call, even mail). Personalized with treatment context (\"It's been 8 months since your cleaning with Dr. Smith\").",
      "**For high-value patients:** Personal phone calls from the hygienist or doctor for patients with significant treatment history or those overdue for perio maintenance.",
      "## The Compounding Effect",
      "Retention improvements compound. If you reduce attrition from 18% to 10%, after 3 years your active patient base is 25% larger than it would have been — without acquiring a single additional new patient.",
      "This is the invisible revenue engine: patients who keep coming back, who refer friends, who accept treatment, who don't need to be re-acquired.",
      "Start with the Patient Retention & Recall Assessment to identify the specific gaps in your retention infrastructure.",
    ],
  },
  {
    slug: "how-to-build-a-revenue-cycle-that-doesnt-leak",
    title: "How to Build a Revenue Cycle That Doesn't Leak",
    excerpt:
      "The gap between production and collections is where most practices lose $50K-$150K annually. Here's the systematic approach to closing it.",
    category: "Revenue Cycle",
    author: "NextGen Practice Solutions",
    date: "2026-02-03",
    readTime: "6 min read",
    content: [
      "Your practice produced $180K last month. You collected $165K. That $15K gap? It's not a rounding error — it's a systems failure. And it happens every single month.",
      "Over a year, a 5-7% collection gap on a $2M practice is **$100K-$140K** in revenue that was earned but never collected. It's the equivalent of doing the work for free for 3-4 weeks a year.",
      "## Where the Leaks Are",
      "Revenue cycle leaks fall into five categories, and most practices have multiple:",
      "### 1. Checkout Collections",
      "The #1 leak: patients leaving without paying their portion. Whether it's a co-pay, a balance, or a patient-portion estimate — if it doesn't get collected at checkout, the cost to collect later is 10-20x higher (statements, calls, time).",
      "**Fix:** Credit card on file policy for all patients. Same-day payment collection protocol. Patient portion estimated and communicated before treatment, collected at checkout.",
      "### 2. Insurance Claim Delays",
      "Claims that sit unsubmitted, claims with errors that get rejected, claims that need additional documentation. Every day a clean claim isn't submitted is a day you're financing the insurance company's cash flow.",
      "**Fix:** Same-day claim submission. Automated claim scrubbing before submission. 14-day follow-up protocol for unpaid claims.",
      "### 3. AR Aging",
      "The longer a receivable ages, the less likely it is to be collected. At 90+ days, you'll collect less than 50 cents on the dollar. Yet many practices have 20-30% of their AR in the 90+ bucket.",
      "**Fix:** Weekly AR aging review. Aging buckets assigned to specific team members. Documented protocols for 30, 60, and 90+ day accounts. Bad debt write-off policy with approval thresholds.",
      "### 4. Undercoding",
      "Conservative coding leaves money on the table. If you're doing a D4341 (scaling and root planing) but coding it as a D1110 (prophy), you're giving away $200-400 per procedure. Multiply that across hundreds of procedures per year.",
      "**Fix:** Annual coding audit. Provider education on proper CDT coding. Procedure-level production analysis to identify coding patterns.",
      "### 5. Fee Schedule Neglect",
      "If you haven't updated your fee schedule in 2+ years, you're likely 10-20% below UCR for your market. Insurance reimbursements are based on a percentage of your submitted fee — a low fee schedule means lower payments even from insurance.",
      "**Fix:** Annual UCR benchmarking. Fee schedule updated based on market data, not gut feel. Carrier analysis to identify which payers are underpaying relative to your fees.",
      "## Building the System",
      "Revenue cycle management isn't a project — it's an operating system. The practices that collect 98%+ have:",
      "- Daily posting and claim submission\n- Weekly AR reviews with assigned ownership\n- Monthly collections analysis (production vs. collections, adjustment categorization)\n- Quarterly fee schedule reviews\n- Annual UCR benchmarking and carrier negotiations",
      "Take the Revenue Cycle Health Assessment to identify exactly where your revenue cycle is leaking — and how much it's costing you.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured);
}

export function getRecentPosts(count: number = 6): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}
