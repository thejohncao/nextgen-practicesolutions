import type { Pillar } from "./solutions";

export interface SolutionPageData {
  slug: string;
  pillar: Pillar;
  pillarLabel: string;
  headline: string;
  subheadline: string;
  problems: { stat: string; description: string }[];
  problemHeadline: string;
  problemSubheadline: string;
  capabilities: { title: string; description: string }[];
  capabilitiesHeadline: string;
  capabilitiesSubheadline: string;
  steps: { number: string; title: string; description: string }[];
  stepsHeadline: string;
  stepsSubheadline: string;
  metrics: { value: string; label: string }[];
  relatedAssessment: {
    slug: string;
    name: string;
    description: string;
  };
}

export const solutionPages: Record<string, SolutionPageData> = {
  acquisition: {
    slug: "acquisition",
    pillar: "growth",
    pillarLabel: "Practice Growth",
    headline: "Full-funnel patient growth: SEO, paid ads, and referral systems that fill your schedule.",
    subheadline:
      "The Patient Acquisition Engine combines organic search, paid advertising, and referral infrastructure into a single system that delivers predictable new patient flow.",
    problemHeadline: "Most practices are flying blind on marketing.",
    problemSubheadline:
      "You're spending on ads, SEO, and mailers — but have no idea what's actually working. Every dollar without attribution is a gamble.",
    problems: [
      { stat: "60%", description: "of practices can't attribute new patients to a specific marketing channel" },
      { stat: "$2K-10K/mo", description: "spent on marketing with no clear ROI measurement" },
      { stat: "No system", description: "connecting marketing spend to booked, treated, and collected revenue" },
    ],
    capabilitiesHeadline: "What the Patient Acquisition Engine does",
    capabilitiesSubheadline:
      "Six integrated capabilities that turn marketing from a cost center into a growth engine with measurable returns.",
    capabilities: [
      {
        title: "SEO & Local Search",
        description:
          "Google Business Profile optimization, local keyword targeting, and content strategy that puts your practice at the top of search results when patients need you.",
      },
      {
        title: "Paid Advertising Management",
        description:
          "Google Ads and Meta campaigns managed for cost-per-booked-patient, not vanity metrics. Every dollar tracked from click to collection.",
      },
      {
        title: "Referral System Infrastructure",
        description:
          "Structured internal and external referral programs with tracking, incentives, and automation. Turn your best patients into your best marketing channel.",
      },
      {
        title: "Reputation & Review Engine",
        description:
          "Automated review requests, monitoring, and response management across Google, Yelp, and Healthgrades. Build the social proof that drives organic growth.",
      },
      {
        title: "Campaign Attribution",
        description:
          "Call tracking, form source attribution, and end-to-end ROI reporting. Know exactly which campaigns produce booked patients, not just clicks.",
      },
      {
        title: "Competitive Intelligence",
        description:
          "Market analysis of your competitive landscape — who's advertising what, where the gaps are, and how to position your practice for maximum visibility.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From audit to optimization — a systematic approach to patient growth.",
    steps: [
      {
        number: "01",
        title: "Market & Practice Audit",
        description:
          "We analyze your current marketing spend, patient acquisition costs, online presence, and competitive landscape to identify the highest-ROI opportunities.",
      },
      {
        number: "02",
        title: "Channel Strategy & Launch",
        description:
          "Build and launch optimized campaigns across the channels that make sense for your market — SEO, Google Ads, Meta, referral programs, or all of the above.",
      },
      {
        number: "03",
        title: "Attribution & Tracking Setup",
        description:
          "Install call tracking, form attribution, and patient source tracking so every new patient is connected back to the campaign that brought them in.",
      },
      {
        number: "04",
        title: "Optimize & Scale",
        description:
          "Monthly performance reviews, budget reallocation to top performers, and continuous testing. Scale what works, cut what doesn't.",
      },
    ],
    metrics: [
      { value: "3-5x", label: "Return on marketing investment" },
      { value: "40%", label: "Reduction in cost per new patient" },
      { value: "25+", label: "New patients per month (typical)" },
      { value: "100%", label: "Attribution on marketing spend" },
    ],
    relatedAssessment: {
      slug: "acquisition",
      name: "Patient Acquisition Readiness Assessment",
      description:
        "Evaluate your online presence, website conversion, paid advertising, and referral systems across 40 questions. See exactly where your marketing is leaking.",
    },
  },

  website: {
    slug: "website",
    pillar: "growth",
    pillarLabel: "Practice Growth",
    headline: "High-converting practice websites built to turn visitors into booked patients.",
    subheadline:
      "Your website is your #1 sales tool. The Website & Conversion Stack ensures every visitor has a clear, compelling path to booking — not just browsing.",
    problemHeadline: "Your website is costing you patients.",
    problemSubheadline:
      "Most dental websites are digital brochures — pretty but passive. They inform, but they don't convert. Every month, hundreds of potential patients visit and leave.",
    problems: [
      { stat: "97%", description: "of website visitors leave without booking — on a typical dental practice site" },
      { stat: "3-5 sec", description: "is all you have to make a first impression before a visitor bounces" },
      { stat: "No tracking", description: "on what visitors do, where they drop off, or why they don't book" },
    ],
    capabilitiesHeadline: "What the Website & Conversion Stack does",
    capabilitiesSubheadline:
      "Every element designed with one goal: turn the visitor into a booked patient.",
    capabilities: [
      {
        title: "Conversion-Optimized Design",
        description:
          "Every page built around a single goal: get the visitor to take the next step. Strategic CTAs, trust signals, and frictionless booking paths.",
      },
      {
        title: "Online Scheduling Integration",
        description:
          "Real-time booking embedded directly on your site. Patients schedule in seconds without calling, and your team gets notified instantly.",
      },
      {
        title: "Service Page Architecture",
        description:
          "Individual pages for every service you offer, optimized for search and designed to educate and convert. Not a generic services list — dedicated landing pages.",
      },
      {
        title: "Mobile-First Experience",
        description:
          "70%+ of your traffic is mobile. Every interaction is designed for thumbs first — fast loading, easy navigation, tap-to-call, tap-to-book.",
      },
      {
        title: "Trust & Social Proof",
        description:
          "Review feeds, before/after galleries, team bios, and patient testimonials integrated throughout. Build credibility before they ever walk in.",
      },
      {
        title: "Analytics & Heatmapping",
        description:
          "Know exactly how visitors interact with your site. Click tracking, scroll depth, form abandonment — data to continuously improve conversion rates.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From strategy to launch in weeks, not months.",
    steps: [
      {
        number: "01",
        title: "Strategy & Content Audit",
        description:
          "Review your current site performance, competitor sites, and patient demographics to define the conversion strategy and page architecture.",
      },
      {
        number: "02",
        title: "Design & Build",
        description:
          "Custom design aligned with your brand, built on modern infrastructure with speed and SEO baked in from the start.",
      },
      {
        number: "03",
        title: "Integration & Launch",
        description:
          "Connect online scheduling, forms, tracking, and review feeds. Launch with analytics from day one.",
      },
      {
        number: "04",
        title: "Optimize & Iterate",
        description:
          "Monthly conversion rate analysis, A/B testing on key pages, and content updates to keep improving results.",
      },
    ],
    metrics: [
      { value: "2-3x", label: "Increase in website booking rate" },
      { value: "50%", label: "More online appointment requests" },
      { value: "<3s", label: "Page load time (mobile)" },
      { value: "40%", label: "Reduction in bounce rate" },
    ],
    relatedAssessment: {
      slug: "acquisition",
      name: "Patient Acquisition Readiness Assessment",
      description:
        "Evaluate your online presence, website conversion, and digital marketing effectiveness across 40 questions.",
    },
  },

  "speed-to-lead": {
    slug: "speed-to-lead",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "Instant response systems that ensure no lead goes unanswered — day, night, or weekend.",
    subheadline:
      "Speed-to-Lead closes the gap between when a patient reaches out and when they get a response. Because the practice that responds first wins the patient.",
    problemHeadline: "Slow response is killing your growth.",
    problemSubheadline:
      "Patients contact 2-3 practices and book with whoever responds first. If your team takes hours — or until Monday — you've already lost.",
    problems: [
      { stat: "78%", description: "of patients book with the first practice to respond to their inquiry" },
      { stat: "4+ hours", description: "is the average response time for dental practice leads" },
      { stat: "50%", description: "of after-hours and weekend inquiries never get a response at all" },
    ],
    capabilitiesHeadline: "What Speed-to-Lead does",
    capabilitiesSubheadline:
      "Instant response systems across every channel — phone, web, text, and social — so no opportunity slips through.",
    capabilities: [
      {
        title: "Instant Lead Response",
        description:
          "Automated acknowledgment within 60 seconds of any inquiry — web form, text, or missed call. Patients know they're heard immediately.",
      },
      {
        title: "After-Hours Coverage",
        description:
          "AI-powered responses for evenings, weekends, and holidays. Patients get answers and booking options 24/7, not a voicemail.",
      },
      {
        title: "Multi-Channel Intake",
        description:
          "Centralized lead management across phone, web forms, chat, text, social media DMs, and email. One dashboard, every channel.",
      },
      {
        title: "Smart Call Routing",
        description:
          "Route calls based on type, urgency, and availability. New patient calls get priority handling; emergencies reach on-call providers.",
      },
      {
        title: "Lead Nurture Sequences",
        description:
          "For leads who inquire but don't book immediately — automated text and email sequences that keep your practice top of mind.",
      },
      {
        title: "Response Analytics",
        description:
          "Track response times by channel, time of day, and team member. See exactly where leads are falling through the cracks.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From missed calls to instant response in days.",
    steps: [
      {
        number: "01",
        title: "Audit Your Lead Flow",
        description:
          "Map every way patients contact you — phone, web, text, social. Identify gaps in response time, coverage, and conversion.",
      },
      {
        number: "02",
        title: "Build Response Protocols",
        description:
          "Create instant response templates, after-hours workflows, and escalation rules for every channel and scenario.",
      },
      {
        number: "03",
        title: "Activate Automation",
        description:
          "Deploy AI-powered instant responses, smart routing, and lead nurture sequences. Your team handles the complex conversations; automation handles the rest.",
      },
      {
        number: "04",
        title: "Monitor & Improve",
        description:
          "Weekly response time reports, conversion tracking, and optimization. Close the loop between lead response and booked patients.",
      },
    ],
    metrics: [
      { value: "<60s", label: "Average response time to new leads" },
      { value: "35%", label: "Increase in lead-to-appointment conversion" },
      { value: "24/7", label: "Coverage across all channels" },
      { value: "Zero", label: "Missed leads per month" },
    ],
    relatedAssessment: {
      slug: "speed-to-lead",
      name: "Speed-to-Lead & Front Desk Assessment",
      description:
        "Evaluate your call handling, lead response speed, multi-channel coverage, and booking conversion across 40 questions.",
    },
  },

  "ai-front-desk": {
    slug: "ai-front-desk",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "AI-powered phone and chat that handles scheduling, FAQs, and routing 24/7.",
    subheadline:
      "AI Front Desk augments your team with intelligent automation — handling routine calls, scheduling, and patient questions so your team focuses on high-value interactions.",
    problemHeadline: "Your front desk is overwhelmed.",
    problemSubheadline:
      "Between phone calls, check-ins, insurance questions, and scheduling — your front desk team is stretched thin. Something always gets dropped.",
    problems: [
      { stat: "30-40%", description: "of inbound calls go unanswered during busy periods" },
      { stat: "70%", description: "of phone calls are routine questions that don't need a human" },
      { stat: "$45K+/yr", description: "cost per additional front desk staff member (salary + benefits)" },
    ],
    capabilitiesHeadline: "What AI Front Desk does",
    capabilitiesSubheadline:
      "Intelligent automation that handles the routine so your team handles the relationship.",
    capabilities: [
      {
        title: "AI Phone Answering",
        description:
          "Natural-language AI that answers calls, understands context, and handles scheduling, FAQs, and routing — indistinguishable from a trained team member.",
      },
      {
        title: "Smart Scheduling",
        description:
          "AI books, reschedules, and confirms appointments directly in your PMS. Understands provider availability, procedure duration, and scheduling rules.",
      },
      {
        title: "Patient FAQ Handling",
        description:
          "Answers common questions about hours, insurance, services, directions, and pre-visit instructions. Trained on your specific practice information.",
      },
      {
        title: "Intelligent Escalation",
        description:
          "Knows when to hand off to a human. Clinical questions, upset patients, and complex situations route to your team with full context.",
      },
      {
        title: "Webchat & Text",
        description:
          "Same AI capabilities on your website chat and SMS. Patients get instant responses on the channel they prefer.",
      },
      {
        title: "Call Analytics",
        description:
          "Transcripts, sentiment analysis, and call categorization. Understand call volume patterns and identify training opportunities for your team.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From setup to live in under a week.",
    steps: [
      {
        number: "01",
        title: "Practice Knowledge Import",
        description:
          "We train the AI on your practice — services, providers, insurance, hours, policies, and FAQs. It learns how your practice operates.",
      },
      {
        number: "02",
        title: "Workflow Configuration",
        description:
          "Define routing rules, escalation triggers, and scheduling permissions. Set up exactly how the AI should handle every scenario.",
      },
      {
        number: "03",
        title: "Soft Launch & Tuning",
        description:
          "Go live on overflow calls first. Review transcripts, refine responses, and tune the AI based on real patient interactions.",
      },
      {
        number: "04",
        title: "Full Deployment",
        description:
          "Expand to primary answering, after-hours, webchat, and text. Continuous learning from every interaction.",
      },
    ],
    metrics: [
      { value: "100%", label: "Call answer rate (zero missed calls)" },
      { value: "65%", label: "Of routine calls handled without human intervention" },
      { value: "$35K+", label: "Annual savings vs. additional FTE" },
      { value: "24/7", label: "Coverage without overtime or night staff" },
    ],
    relatedAssessment: {
      slug: "speed-to-lead",
      name: "Speed-to-Lead & Front Desk Assessment",
      description:
        "Evaluate your call handling, response speed, and front desk efficiency across 40 questions.",
    },
  },

  recall: {
    slug: "recall",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "Automated recare and reactivation that keeps your hygiene schedule full and patients compliant.",
    subheadline:
      "The Recall Engine systematizes patient retention — from pre-appointment reminders to overdue reactivation campaigns — so your hygiene schedule runs at capacity.",
    problemHeadline: "You're losing patients you've already won.",
    problemSubheadline:
      "Every patient who doesn't come back for their recall visit is revenue walking out the door — and eventually, a patient lost to another practice.",
    problems: [
      { stat: "15-20%", description: "of your patient base is lost every year to attrition" },
      { stat: "$500+", description: "average annual value per patient lost — gone forever" },
      { stat: "5-7x", description: "more expensive to acquire a new patient than retain an existing one" },
    ],
    capabilitiesHeadline: "What the Recall Engine does",
    capabilitiesSubheadline:
      "Automated systems that keep patients engaged, compliant, and coming back.",
    capabilities: [
      {
        title: "Smart Recall Scheduling",
        description:
          "Pre-appointment scheduling at checkout with automated reminders. The next visit is booked before the patient leaves the chair.",
      },
      {
        title: "Multi-Channel Reminders",
        description:
          "Text, email, and call reminders at 2 weeks, 48 hours, and day-of. Personalized by patient preference with one-tap confirmation.",
      },
      {
        title: "Overdue Reactivation Campaigns",
        description:
          "Automated 30/60/90+ day reactivation sequences for patients who've fallen off schedule. Segmented by time overdue and patient value.",
      },
      {
        title: "Cancellation Recovery",
        description:
          "Same-day fill protocols activated automatically when cancellations happen. Waitlist management and automated outreach to fill the slot.",
      },
      {
        title: "Hygiene Schedule Optimization",
        description:
          "Utilization tracking, production-per-hour analysis, and schedule template optimization to maximize hygiene revenue.",
      },
      {
        title: "Retention Analytics",
        description:
          "Track recall compliance rate, reactivation conversion, patient attrition, and hygiene production trends. Know exactly where patients are falling off.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From reactive to proactive patient management.",
    steps: [
      {
        number: "01",
        title: "Patient Base Audit",
        description:
          "Analyze your current recall compliance, overdue patient list, and attrition patterns. Identify the size of the opportunity.",
      },
      {
        number: "02",
        title: "System Configuration",
        description:
          "Set up reminder sequences, reactivation campaigns, and cancellation recovery workflows customized to your practice.",
      },
      {
        number: "03",
        title: "Reactivation Blitz",
        description:
          "Launch targeted campaigns to your overdue patient list. Recover patients who've already drifted with personalized outreach.",
      },
      {
        number: "04",
        title: "Ongoing Automation",
        description:
          "Systems run continuously — new patients enter the recall engine automatically, overdue patients get reactivated, cancellations get filled.",
      },
    ],
    metrics: [
      { value: "85%+", label: "Recall compliance rate (from typical 60-65%)" },
      { value: "30%", label: "Of overdue patients reactivated" },
      { value: "$150K+", label: "Recovered annual revenue from retained patients" },
      { value: "95%+", label: "Hygiene schedule utilization" },
    ],
    relatedAssessment: {
      slug: "retention",
      name: "Patient Retention & Recall Assessment",
      description:
        "Evaluate your recall compliance, reactivation systems, schedule optimization, and patient experience across 40 questions.",
    },
  },

  "revenue-cycle": {
    slug: "revenue-cycle",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "End-to-end billing optimization: collections, AR management, and fee schedule intelligence.",
    subheadline:
      "Revenue Cycle OS eliminates the gap between what you produce and what you collect — through systematic billing processes, AR management, and financial controls.",
    problemHeadline: "You're producing more than you're collecting.",
    problemSubheadline:
      "The gap between production and collections is where practices bleed money. Most don't even know how much they're losing.",
    problems: [
      { stat: "5-7%", description: "of production lost to billing inefficiency at the average practice" },
      { stat: "$100K+/yr", description: "lost on a $2M practice collecting 93% instead of 98%" },
      { stat: "90+ days", description: "AR aging that's silently eroding your cash flow" },
    ],
    capabilitiesHeadline: "What Revenue Cycle OS does",
    capabilitiesSubheadline:
      "Six integrated systems that close the gap between production and collections.",
    capabilities: [
      {
        title: "Collections Optimization",
        description:
          "Same-day collection protocols, credit card on file policies, and patient balance follow-up systems that push your collection rate to 98%+.",
      },
      {
        title: "AR Management System",
        description:
          "Weekly AR aging reviews, claim follow-up protocols, denial management with root cause tracking, and aging bucket ownership assignments.",
      },
      {
        title: "Insurance Verification Engine",
        description:
          "Real-time eligibility checking, pre-authorization workflows, and coordination of benefits protocols. No surprises at checkout.",
      },
      {
        title: "Fee Schedule Intelligence",
        description:
          "Annual UCR benchmarking, carrier analysis for underpayment detection, and strategic fee schedule updates that maximize revenue.",
      },
      {
        title: "Claims Optimization",
        description:
          "Clean claim submission, narrative and documentation support, and appeal management for underpayments and denials.",
      },
      {
        title: "Financial Reporting",
        description:
          "Production vs. collections analysis, overhead ratio monitoring, provider-level profitability, and procedure-level revenue tracking.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From billing chaos to financial clarity.",
    steps: [
      {
        number: "01",
        title: "Revenue Cycle Audit",
        description:
          "Analyze collection rates, AR aging, write-off patterns, and fee schedules. Quantify exactly how much revenue is being left on the table.",
      },
      {
        number: "02",
        title: "Process & Protocol Design",
        description:
          "Build same-day collection workflows, AR management protocols, insurance verification checklists, and claim submission standards.",
      },
      {
        number: "03",
        title: "Team Training & Implementation",
        description:
          "Train your billing team on new protocols, set up tracking dashboards, and assign accountability for AR aging buckets.",
      },
      {
        number: "04",
        title: "Ongoing Optimization",
        description:
          "Monthly revenue cycle reviews, fee schedule updates, carrier performance analysis, and continuous process improvement.",
      },
    ],
    metrics: [
      { value: "98%+", label: "Collection rate (up from typical 91-93%)" },
      { value: "50%", label: "Reduction in 60+ day AR" },
      { value: "$100K+", label: "Recovered annual revenue" },
      { value: "<30 days", label: "Average days in accounts receivable" },
    ],
    relatedAssessment: {
      slug: "revenue-cycle",
      name: "Revenue Cycle Health Assessment",
      description:
        "Examine your billing, collections, AR management, and financial controls across 40 questions.",
    },
  },

  "team-os": {
    slug: "team-os",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "Organizational infrastructure: role clarity, performance tracking, and accountability systems.",
    subheadline:
      "Team OS builds the people infrastructure your practice needs — from role definitions and KPIs to performance reviews and culture systems.",
    problemHeadline: "Your team problems are systems problems.",
    problemSubheadline:
      "Turnover, unclear roles, inconsistent performance — these aren't people problems. They're infrastructure problems. You can't manage what you haven't defined.",
    problems: [
      { stat: "50-200%", description: "of annual salary — the cost of replacing one team member" },
      { stat: "2-3", description: "team members lost per year at the average practice" },
      { stat: "No system", description: "for onboarding, performance tracking, or accountability at most practices" },
    ],
    capabilitiesHeadline: "What Team OS does",
    capabilitiesSubheadline:
      "The organizational infrastructure that turns a group of employees into a high-performing team.",
    capabilities: [
      {
        title: "Role Architecture",
        description:
          "Written role descriptions, daily checklists, and clear reporting structures for every position. Everyone knows exactly what they own.",
      },
      {
        title: "KPI & Performance Systems",
        description:
          "Role-specific KPIs, quarterly performance reviews, and compensation tied to measurable outcomes. Manage with data, not feelings.",
      },
      {
        title: "Onboarding Programs",
        description:
          "Structured 30/60/90 day onboarding per role — not just shadowing. New hires reach full productivity in half the time.",
      },
      {
        title: "Meeting Cadence & Communication",
        description:
          "Daily huddles, weekly team meetings, and monthly all-hands with structured agendas. Consistent communication that keeps everyone aligned.",
      },
      {
        title: "Career Pathing",
        description:
          "Defined growth paths for every role. Team members see a future at your practice, which is the #1 driver of retention.",
      },
      {
        title: "Culture & Retention Systems",
        description:
          "Employee satisfaction surveys, exit interviews, recognition programs, and culture-building activities. Retain your best people intentionally.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From ad-hoc management to organizational clarity.",
    steps: [
      {
        number: "01",
        title: "Organizational Audit",
        description:
          "Map your current team structure, identify role gaps, assess communication patterns, and benchmark compensation against your market.",
      },
      {
        number: "02",
        title: "Build the Infrastructure",
        description:
          "Create role descriptions, KPI frameworks, onboarding programs, and meeting cadences. Design the system before asking people to follow it.",
      },
      {
        number: "03",
        title: "Train & Launch",
        description:
          "Roll out new systems with team buy-in. Train managers on performance conversations, KPI reviews, and accountability frameworks.",
      },
      {
        number: "04",
        title: "Sustain & Improve",
        description:
          "Quarterly pulse checks, annual compensation reviews, ongoing coaching, and system refinements based on team feedback and performance data.",
      },
    ],
    metrics: [
      { value: "60%", label: "Reduction in team turnover" },
      { value: "50%", label: "Faster time-to-productivity for new hires" },
      { value: "$50K+", label: "Annual savings from reduced turnover costs" },
      { value: "90%+", label: "Team satisfaction scores" },
    ],
    relatedAssessment: {
      slug: "team",
      name: "Team Performance & Culture Assessment",
      description:
        "Assess role clarity, training, communication, and culture — the people infrastructure behind your practice — across 40 questions.",
    },
  },

  dashboard: {
    slug: "dashboard",
    pillar: "management",
    pillarLabel: "Practice Management",
    headline: "Real-time practice analytics that turn raw data into actionable decisions.",
    subheadline:
      "Data & Dashboard gives you a single source of truth for every KPI that matters — production, collections, new patients, marketing ROI, and more.",
    problemHeadline: "You can't improve what you don't measure.",
    problemSubheadline:
      "Most practice owners rely on gut feel, PMS reports they never read, or monthly bookkeeper calls. By the time you see the problem, you've already lost months of revenue.",
    problems: [
      { stat: "80%", description: "of practice owners can't name their top 5 KPIs on the spot" },
      { stat: "Monthly", description: "is how often most practices review data — if at all" },
      { stat: "2-3x", description: "faster growth rate for practices with real-time dashboards vs. those flying blind" },
    ],
    capabilitiesHeadline: "What Data & Dashboard does",
    capabilitiesSubheadline:
      "One dashboard, every metric that matters — updated in real time and built for decisions, not just display.",
    capabilities: [
      {
        title: "Real-Time KPI Dashboard",
        description:
          "Production, collections, new patients, case acceptance, hygiene utilization, and more — all on one screen, updated daily or in real time.",
      },
      {
        title: "Provider-Level Reporting",
        description:
          "See production, collections, and utilization by provider. Identify coaching opportunities and celebrate top performers with data.",
      },
      {
        title: "Marketing ROI Tracking",
        description:
          "Connect marketing spend to booked patients and collected revenue. Know your cost per lead, cost per patient, and ROI by channel.",
      },
      {
        title: "Trend & Benchmark Analysis",
        description:
          "Month-over-month and year-over-year trends with industry benchmarks. Know not just where you are, but where you stand relative to top performers.",
      },
      {
        title: "Team Scorecards",
        description:
          "Automated weekly scorecards for every team member with their KPIs. Accountability without micromanagement.",
      },
      {
        title: "Custom Reports & Alerts",
        description:
          "Set up custom reports for board meetings, partners, or your CPA. Automated alerts when KPIs drop below thresholds.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From data chaos to decision clarity.",
    steps: [
      {
        number: "01",
        title: "Data Audit & Integration",
        description:
          "Connect your PMS, accounting software, marketing platforms, and other data sources. Map the KPIs that matter most to your goals.",
      },
      {
        number: "02",
        title: "Dashboard Design",
        description:
          "Build your custom dashboard with the views you need — practice-wide, provider-level, marketing, and financial. Designed for your workflow.",
      },
      {
        number: "03",
        title: "Team Rollout",
        description:
          "Grant access to team leads and managers. Train everyone on reading their KPIs and using data in daily huddles and weekly meetings.",
      },
      {
        number: "04",
        title: "Ongoing Intelligence",
        description:
          "Monthly data reviews, quarterly benchmark updates, and continuous refinement of what you track as your practice evolves.",
      },
    ],
    metrics: [
      { value: "2-3x", label: "Faster practice growth rate" },
      { value: "Daily", label: "KPI visibility (vs. monthly)" },
      { value: "100%", label: "Team accountability with visible scorecards" },
      { value: "15 min", label: "Monthly reporting time (vs. hours of manual pulls)" },
    ],
    relatedAssessment: {
      slug: "data",
      name: "Data & Visibility Assessment",
      description:
        "Measure your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making across 40 questions.",
    },
  },

  "tc-performance": {
    slug: "tc-performance",
    pillar: "development",
    pillarLabel: "Practice Development",
    headline: "Training frameworks and performance systems for front desk and treatment coordinators.",
    subheadline:
      "FD & TC Performance transforms your patient-facing team from order-takers into revenue drivers — through structured training, coaching, and performance tracking.",
    problemHeadline: "Untrained teams cost you more than you think.",
    problemSubheadline:
      "Your front desk and treatment coordinators are the most important revenue-influencing roles in your practice — and they typically get the least training.",
    problems: [
      { stat: "40-60%", description: "case acceptance rate at practices without TC training (vs. 80%+ with)" },
      { stat: "30%", description: "of new patient calls lost to poor phone skills and no booking protocol" },
      { stat: "$0", description: "annual training budget allocated at most practices for non-clinical staff" },
    ],
    capabilitiesHeadline: "What FD & TC Performance does",
    capabilitiesSubheadline:
      "Structured training and performance systems that turn your patient-facing team into your competitive advantage.",
    capabilities: [
      {
        title: "Phone Skills Training",
        description:
          "Call scripts, objection handling, new patient booking protocols, and recorded call reviews. Turn your front desk into a booking machine.",
      },
      {
        title: "Case Presentation Training",
        description:
          "Structured presentation frameworks, financial conversation scripts, and role-playing exercises for treatment coordinators.",
      },
      {
        title: "Financial Conversation Mastery",
        description:
          "Train your team to discuss costs confidently — insurance breakdowns, financing options, phased treatment, and value framing.",
      },
      {
        title: "Performance Tracking",
        description:
          "Individual KPIs for every front desk and TC role: booking rate, case acceptance rate, collection rate, patient satisfaction scores.",
      },
      {
        title: "Coaching & Development",
        description:
          "Weekly 1:1 coaching sessions with structured agendas, call reviews, case reviews, and skill development plans.",
      },
      {
        title: "Ongoing CE & Skill Building",
        description:
          "Monthly training modules on communication, technology, patient psychology, and practice management. Continuous improvement, not one-time events.",
      },
    ],
    stepsHeadline: "How it works",
    stepsSubheadline: "From untrained staff to confident, high-performing team members.",
    steps: [
      {
        number: "01",
        title: "Skills Assessment",
        description:
          "Evaluate current phone skills, presentation abilities, and financial conversation comfort. Identify specific gaps and training priorities.",
      },
      {
        number: "02",
        title: "Training Program Design",
        description:
          "Build a customized training curriculum for your front desk and TC teams — phone scripts, presentation frameworks, and financial conversation guides.",
      },
      {
        number: "03",
        title: "Intensive Training & Practice",
        description:
          "Hands-on training sessions with role-playing, call recording reviews, and real-case practice. Skills are built through repetition, not lecture.",
      },
      {
        number: "04",
        title: "Ongoing Coaching & Measurement",
        description:
          "Weekly coaching, monthly KPI reviews, and quarterly skill assessments. Track improvement and continuously raise the bar.",
      },
    ],
    metrics: [
      { value: "80%+", label: "Case acceptance rate (from typical 40-60%)" },
      { value: "50%", label: "Increase in new patient booking rate" },
      { value: "$200K+", label: "Additional annual production from improved acceptance" },
      { value: "90%", label: "Team confidence scores in financial conversations" },
    ],
    relatedAssessment: {
      slug: "team",
      name: "Team Performance & Culture Assessment",
      description:
        "Assess training, development, and performance systems for your team across 40 questions.",
    },
  },
};

export function getSolutionPageData(slug: string): SolutionPageData | undefined {
  return solutionPages[slug];
}
