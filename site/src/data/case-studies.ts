export interface CaseStudy {
  slug: string;
  title: string;
  practiceType: string;
  location: string;
  challenge: string;
  solutionsUsed: string[];
  results: { metric: string; before: string; after: string }[];
  summary: string;
  testimonial?: { quote: string; name: string; role: string };
  content: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "solo-gp-case-acceptance-transformation",
    title: "Solo GP Increases Case Acceptance from 42% to 78%",
    practiceType: "Solo General Practice",
    location: "Southern California",
    challenge:
      "Dr. Martinez was producing $1.8M annually but collecting on only 42% of diagnosed treatment. High-value cases (crowns, implants, ortho) were routinely declined or never followed up on.",
    solutionsUsed: ["Narrative", "FD & TC Performance"],
    results: [
      { metric: "Case Acceptance Rate", before: "42%", after: "78%" },
      { metric: "Annual Production", before: "$1.8M", after: "$2.6M" },
      { metric: "Large Case Conversion", before: "18%", after: "52%" },
      { metric: "Treatment Follow-Up Rate", before: "0%", after: "100%" },
    ],
    summary:
      "By implementing a structured handoff protocol, visual treatment presentations, and automated follow-up sequences, this solo practice added $800K in annual production from their existing patient base — without a single additional marketing dollar.",
    testimonial: {
      quote:
        "I was diagnosing the treatment correctly — I just had no system for helping patients say yes. Narrative changed how my entire team presents and follows up on treatment. The ROI was immediate.",
      name: "Dr. R. Martinez",
      role: "Practice Owner",
    },
    content: [
      "## The Challenge",
      "Dr. Martinez had been in practice for 12 years with a loyal patient base of 1,800 active patients. Production was solid at $1.8M, but the case acceptance rate told a different story: only 42% of diagnosed treatment was being accepted.",
      "The problem wasn't clinical. Dr. Martinez was diagnosing comprehensively and correctly. The breakdown was happening in three places: the handoff from doctor to front desk (no treatment coordinator role existed), the financial conversation (ad-hoc and uncomfortable), and the follow-up (nonexistent).",
      "## The Approach",
      "We implemented a two-solution strategy:",
      "**Narrative** provided the case acceptance infrastructure: structured warm handoff protocol, visual treatment presentations with phased options, financial presentation engine with pre-calculated insurance and financing options, and automated follow-up sequences at 7, 30, and 90 days.",
      "**FD & TC Performance** trained a senior front desk team member to step into a treatment coordinator role. Over 8 weeks, she received training in case presentation, financial conversations, objection handling, and follow-up protocols.",
      "## The Results",
      "Within 90 days, case acceptance moved from 42% to 61%. By month 6, it had stabilized at 78%. The largest impact was on cases over $3,000 — previously accepted at just 18%, now converting at 52%.",
      "The $800K increase in annual production came entirely from the existing patient base. No additional marketing spend, no new patients required. The treatment was already being diagnosed — it just wasn't being accepted.",
      "## Key Takeaway",
      "Case acceptance is a systems problem, not a clinical problem. The highest-ROI investment most practices can make isn't marketing — it's giving patients the tools and context to say yes to the treatment they already need.",
    ],
  },
  {
    slug: "multi-location-recall-recovery",
    title: "Multi-Location Group Recovers $320K from Lapsed Patients",
    practiceType: "3-Location Group Practice",
    location: "Texas",
    challenge:
      "With 6,200 patients across 3 locations, this group practice had a 58% recall compliance rate and over 2,600 patients overdue for hygiene visits. No systematic reactivation existed.",
    solutionsUsed: ["Recall Engine", "Data & Dashboard"],
    results: [
      { metric: "Recall Compliance", before: "58%", after: "84%" },
      { metric: "Patients Reactivated", before: "0/quarter", after: "180/quarter" },
      { metric: "Hygiene Utilization", before: "71%", after: "93%" },
      { metric: "Recovered Annual Revenue", before: "—", after: "$320K" },
    ],
    summary:
      "Systematic recall and reactivation campaigns across 3 locations brought back 720 lapsed patients in the first year and pushed hygiene utilization from 71% to 93%, recovering $320K in annual recurring revenue.",
    testimonial: {
      quote:
        "We knew we had patients falling off, but we had no idea the scale. The Recall Engine showed us exactly who was overdue and automated the outreach. We recovered an entire hygienist's worth of production.",
      name: "Dr. A. Patel",
      role: "Managing Partner",
    },
    content: [
      "## The Challenge",
      "This 3-location group practice in Texas had grown to 6,200 active patients across 8 providers (5 dentists, 3 hygienists). But growth had masked a serious retention problem: only 58% of patients were returning for scheduled recall visits.",
      "Over 2,600 patients were overdue — some by months, others by years. The front desk would occasionally call overdue patients when the schedule had openings, but there was no systematic approach and no tracking of results.",
      "Hygiene utilization averaged 71% across the 3 locations, meaning the hygienists had open chairs while thousands of patients weren't being seen.",
      "## The Approach",
      "**Recall Engine** was deployed across all 3 locations simultaneously:",
      "- Complete patient audit identifying 2,600+ overdue patients, segmented by time overdue and patient value\n- Automated multi-channel recall reminders (text, email, call) for patients approaching their recall date\n- Structured reactivation campaigns at 30, 60, 90, and 180+ day intervals\n- Cancellation recovery workflows with same-day fill automation\n- Pre-scheduling protocols enforced at checkout",
      "**Data & Dashboard** provided real-time visibility into recall compliance, reactivation rates, and hygiene utilization across all locations — broken down by provider and location.",
      "## The Results",
      "The initial reactivation blitz brought back 320 patients in the first 90 days. By end of year, 720 lapsed patients had returned — an average of 180 per quarter.",
      "Recall compliance climbed from 58% to 84%. Hygiene utilization went from 71% to 93%. The recovered revenue — $320K annually — was the equivalent of adding a full-time hygienist's production without hiring anyone.",
      "## Key Takeaway",
      "Patient retention is the highest-leverage, lowest-cost growth strategy available. These patients were already in the system — they just needed systematic outreach to bring them back.",
    ],
  },
  {
    slug: "startup-practice-full-stack-growth",
    title: "Startup Practice Hits $1.2M in Year One with Full-Stack Growth",
    practiceType: "De Novo Startup",
    location: "Arizona",
    challenge:
      "A brand-new practice with zero patients needed to build a patient base from scratch while establishing operational infrastructure. Most startups take 2-3 years to reach profitability.",
    solutionsUsed: ["Patient Acquisition Engine", "Website & Conversion Stack", "Speed-to-Lead", "AI Front Desk"],
    results: [
      { metric: "Year 1 Production", before: "$0", after: "$1.2M" },
      { metric: "New Patients/Month (avg)", before: "0", after: "38" },
      { metric: "Lead Response Time", before: "N/A", after: "<90 seconds" },
      { metric: "Website Conversion Rate", before: "N/A", after: "8.2%" },
    ],
    summary:
      "By launching with integrated acquisition, conversion, and response systems from day one, this startup practice achieved $1.2M in production in its first year — reaching profitability 12-18 months ahead of typical de novo timelines.",
    testimonial: {
      quote:
        "Starting from zero is terrifying. But having a complete system — website, ads, instant response, AI answering — from day one meant we never lost a lead. We were profitable by month 8.",
      name: "Dr. K. Thompson",
      role: "Practice Owner",
    },
    content: [
      "## The Challenge",
      "Dr. Thompson was opening a brand-new general practice in a competitive suburban market in Arizona. No patient base, no reputation, no referral network. The lease was signed, equipment installed, and staff hired — now came the hardest part: filling the schedule.",
      "Most de novo practices take 18-24 months to break even and 2-3 years to reach full production capacity. Dr. Thompson needed to compress that timeline dramatically.",
      "## The Approach",
      "We implemented a full-stack growth system before the doors opened:",
      "**Website & Conversion Stack** launched a conversion-optimized website 60 days before opening. Service pages for every procedure, online scheduling, virtual tour, team bios, and a \"Grand Opening\" landing page for the local campaign.",
      "**Patient Acquisition Engine** ran pre-launch campaigns: Google Ads targeting high-intent searches (\"dentist near me,\" \"new dentist accepting patients\"), Meta campaigns targeting the practice's 5-mile radius, and a Google Business Profile optimized from day one.",
      "**Speed-to-Lead** ensured every inquiry got a response within 90 seconds — web forms triggered instant text replies, and a follow-up call was made within 5 minutes during business hours.",
      "**AI Front Desk** handled overflow calls and after-hours inquiries from the start, ensuring the practice never missed a potential patient, even with a skeleton staff during ramp-up.",
      "## The Results",
      "Month 1 saw 22 new patients. By month 3, the practice was averaging 35-40 new patients per month. The website converted visitors at 8.2% (vs. a typical 2-3% for dental sites). Lead response time averaged under 90 seconds.",
      "Year 1 production hit $1.2M — breaking even by month 8 and reaching profitability well ahead of the typical startup curve. The practice was on pace for $1.8M in year 2.",
      "## Key Takeaway",
      "Startups that launch with integrated acquisition and response systems from day one can compress the growth timeline by 12-18 months. The cost of these systems is a fraction of the revenue lost by a slow ramp-up.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
