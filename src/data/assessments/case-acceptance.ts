// src/data/assessments/case-acceptance.ts

export interface AssessmentQuestion {
  id: string;
  text: string;
}

export interface AssessmentPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  colorDim: string;
  description: string;
  solution: string;
  solutionDetail: string;
  questions: AssessmentQuestion[];
}

export interface ScoreBand {
  min: number;
  label: string;
  color: string;
  emoji: string;
  summary: string;
}

export interface ProductionTier {
  label: string;
  value: number;
}

export const PILLARS: AssessmentPillar[] = [
  {
    id: 'diagnosis',
    title: 'Clinical Diagnosis & Handoff',
    subtitle: 'Doctor → Treatment Coordinator',
    icon: '🔬',
    color: '#2D5A7B',
    colorDim: 'rgba(45,90,123,0.08)',
    description:
      'How well does the clinical team identify, document, and communicate findings to the person presenting treatment?',
    solution: 'Narrative',
    solutionDetail:
      'Structured tooth chart, condition catalog, diagnosis-to-treatment mapping, and warm handoff workflow',
    questions: [
      {
        id: 'd1',
        text: 'Every tooth is charted with a current condition at each comprehensive exam — not just problem teeth',
      },
      {
        id: 'd2',
        text: 'Clinical findings are documented with intraoral photos, radiographs, or CBCT — not just CDT codes in the chart',
      },
      {
        id: 'd3',
        text: "The doctor explains the 'why' to the patient before handing off (e.g., 'Here\u2019s what I\u2019m seeing and why it matters')",
      },
      {
        id: 'd4',
        text: "There is a structured warm handoff from doctor to TC — verbal summary, co-presence, or shared screen — not just 'go see the front desk'",
      },
      {
        id: 'd5',
        text: 'Findings are prioritized by clinical urgency (urgent / soon / plan / monitor) before reaching the TC',
      },
      {
        id: 'd6',
        text: "The doctor frames consequences of delay during the exam ('If we wait, this becomes\u2026')",
      },
      {
        id: 'd7',
        text: 'There is a consistent clinical language the TC can reliably translate into patient-friendly terms',
      },
      {
        id: 'd8',
        text: "Specific treatment recommendations are mapped to each finding before the TC presents — the TC doesn't have to guess what the doctor wants",
      },
      {
        id: 'd9',
        text: 'Complex cases (full arch, multi-unit, implant-supported) are discussed in a pre-appointment huddle or case review',
      },
      {
        id: 'd10',
        text: "The doctor actively endorses the TC's role to the patient ('My TC is exceptional — they'll walk you through everything')",
      },
    ],
  },
  {
    id: 'presentation',
    title: 'Treatment Presentation Experience',
    subtitle: 'What the Patient Sees',
    icon: '✨',
    color: '#4EADC5',
    colorDim: 'rgba(78,173,197,0.12)',
    description:
      'How is the treatment plan actually presented to the patient? Is it a clinical document or a guided experience?',
    solution: 'Narrative',
    solutionDetail:
      "Present Mode with Five Yes's framework, visual journey, phased care, plan variants, and patient education",
    questions: [
      {
        id: 'p1',
        text: 'Treatment is presented visually — images, diagrams, or a guided journey — not as a printed code-and-fee schedule',
      },
      {
        id: 'p2',
        text: 'The patient sees their own clinical photos and radiographs during the treatment presentation',
      },
      {
        id: 'p3',
        text: 'Condition-specific patient education is provided for each diagnosis (what it is, why it matters, what happens if they wait)',
      },
      {
        id: 'p4',
        text: 'Treatment options are presented as variants (Plan A / B / C or Good / Better / Best) — not one plan, take it or leave it',
      },
      {
        id: 'p5',
        text: 'Care is phased into priorities (Phase 1 / 2 / 3) so the patient sees a sequence, not one overwhelming list',
      },
      {
        id: 'p6',
        text: "The presentation connects treatment to the patient's personal goals — their smile, comfort, confidence, or function",
      },
      {
        id: 'p7',
        text: 'There is a consistent presentation framework or methodology (not dependent on which TC happens to be presenting)',
      },
      {
        id: 'p8',
        text: 'The presentation runs on a screen the patient can see and follow — not the TC reading from their own monitor',
      },
      {
        id: 'p9',
        text: 'Presentation language is calibrated to a general audience — no clinical jargon, CDT codes, or assumed dental literacy',
      },
      {
        id: 'p10',
        text: "The presentation includes a 'cost of delay' or escalation comparison (e.g., '$340 filling now vs. $3,300 root canal later')",
      },
    ],
  },
  {
    id: 'financial',
    title: 'Financial Presentation & Clarity',
    subtitle: 'The Investment Conversation',
    icon: '💰',
    color: '#C9A86A',
    colorDim: 'rgba(201,168,106,0.12)',
    description:
      'How well does the practice remove financial barriers and present cost as an investment with clear pathways?',
    solution: 'Narrative',
    solutionDetail:
      'Membership pricing engine, phased investment view, financing calculator, and side-by-side savings comparison',
    questions: [
      {
        id: 'f1',
        text: 'The total investment is broken into phases — the patient sees Phase 1 cost first, not the full treatment total',
      },
      {
        id: 'f2',
        text: 'Multiple payment pathways are presented side-by-side (pay in full, monthly financing, phased payments)',
      },
      {
        id: 'f3',
        text: 'A same-day / pay-in-full incentive is offered (e.g., 5% courtesy discount)',
      },
      {
        id: 'f4',
        text: 'Third-party financing is available and actively presented (CareCredit, Cherry, Affirm, Proceed, or similar)',
      },
      {
        id: 'f5',
        text: "Monthly payment amounts are calculated and shown — the patient doesn't have to ask 'what would my monthly be?'",
      },
      {
        id: 'f6',
        text: 'If the practice has a membership or savings plan, member vs. non-member pricing is shown side-by-side during presentation',
      },
      {
        id: 'f7',
        text: "The TC presents the cost of delay / escalation in dollar terms ('This will cost 3-5\u00d7 more if we wait 12 months')",
      },
      {
        id: 'f8',
        text: "The financial conversation has its own dedicated moment — it's not awkwardly merged into the clinical explanation",
      },
      {
        id: 'f9',
        text: 'The patient leaves with a clear written or digital summary of their financial options — not just a verbal overview',
      },
      {
        id: 'f10',
        text: 'Insurance benefits (if applicable) are pre-verified and incorporated into the cost presentation before the patient sits down',
      },
    ],
  },
  {
    id: 'team',
    title: 'Team Readiness & Consistency',
    subtitle: 'The Human Factor',
    icon: '👥',
    color: '#3A8B5C',
    colorDim: 'rgba(58,139,92,0.08)',
    description:
      'How prepared, trained, and consistent is the team across every patient interaction?',
    solution: 'FD & TC Performance',
    solutionDetail:
      'Training frameworks, role-specific playbooks, acceptance rate tracking, and case review protocols',
    questions: [
      {
        id: 't1',
        text: "The TC has a defined presentation framework or script they follow — it's not improvised differently each time",
      },
      {
        id: 't2',
        text: "The TC is trained on the top 5 patient objections (cost, fear, time, need for spousal buy-in, 'let me think about it') and has practiced responses",
      },
      {
        id: 't3',
        text: "The doctor actively reinforces the TC's authority and expertise during the patient handoff",
      },
      {
        id: 't4',
        text: 'There is a daily morning huddle or pre-appointment review where complex cases and high-value opportunities are discussed',
      },
      {
        id: 't5',
        text: 'The TC can present confidently on high-ticket cases (full arch, veneers, implant packages) — not just basic fillings and crowns',
      },
      {
        id: 't6',
        text: 'Front desk staff are trained on financial conversations and can answer payment/financing questions — not just hand over a printout',
      },
      {
        id: 't7',
        text: 'Individual TC case acceptance rates are tracked as a KPI and reviewed regularly',
      },
      {
        id: 't8',
        text: 'The team debriefs on lost or stalled cases to identify recurring patterns and presentation gaps',
      },
      {
        id: 't9',
        text: 'New team members go through a defined case presentation onboarding program — not just shadow-and-figure-it-out',
      },
      {
        id: 't10',
        text: 'The practice has a documented standard operating procedure for the full diagnosis \u2192 presentation \u2192 acceptance workflow',
      },
    ],
  },
  {
    id: 'followup',
    title: 'Follow-Up & Re-Engagement',
    subtitle: 'After They Leave the Chair',
    icon: '🔄',
    color: '#C45B5B',
    colorDim: 'rgba(196,91,91,0.08)',
    description:
      "What happens when the patient doesn't say yes on the spot? Is there a system, or does the plan die?",
    solution: 'Speed-to-Lead + Recall Engine',
    solutionDetail:
      'Automated reactivation campaigns, unbooked treatment pipelines, and re-engagement workflows across email, SMS, and phone',
    questions: [
      {
        id: 'r1',
        text: 'The patient leaves with a digital or printed treatment summary they can review at home or share with family',
      },
      {
        id: 'r2',
        text: 'There is an automated follow-up sequence (email, text, or call) for patients with unaccepted treatment',
      },
      {
        id: 'r3',
        text: 'First follow-up contact happens within 48 hours of the appointment — not days or weeks later',
      },
      {
        id: 'r4',
        text: "Follow-up messages include the actual treatment details and financial options — not just a generic 'schedule your appointment'",
      },
      {
        id: 'r5',
        text: 'The patient can easily share their treatment plan digitally with a spouse, parent, or other decision-maker',
      },
      {
        id: 'r6',
        text: 'Unaccepted treatment value is tracked as a pipeline metric — the practice knows exactly how much revenue is sitting in limbo',
      },
      {
        id: 'r7',
        text: 'There is a structured reactivation campaign for patients with unbooked treatment older than 30, 60, and 90 days',
      },
      {
        id: 'r8',
        text: 'High-value unaccepted cases ($5K+) are flagged for personal TC callback — not just automated messages',
      },
      {
        id: 'r9',
        text: 'The practice can identify which patients opened, viewed, or engaged with their treatment summary after the visit',
      },
      {
        id: 'r10',
        text: "There is a defined 'second chance' workflow — a re-consultation offer or treatment coordinator callback for patients who said 'let me think about it'",
      },
    ],
  },
];

export const SCORE_BANDS: ScoreBand[] = [
  {
    min: 80,
    label: 'Case Acceptance Leader',
    color: '#3A8B5C',
    emoji: '🏆',
    summary:
      'Your systems are strong. Narrative will amplify what\u2019s already working and give you the presentation layer your clinical excellence deserves.',
  },
  {
    min: 60,
    label: 'Solid Foundation with Gaps',
    color: '#4EADC5',
    emoji: '📈',
    summary:
      'You have good instincts and some processes in place, but inconsistent execution is costing you. The gaps in your workflow are where revenue leaks live.',
  },
  {
    min: 40,
    label: 'Revenue Leaking',
    color: '#C9A86A',
    emoji: '⚠️',
    summary:
      'Your clinical work is likely excellent, but significant case acceptance opportunities are being lost to presentation, financial clarity, and follow-up failures.',
  },
  {
    min: 20,
    label: 'Critical System Gaps',
    color: '#C45B5B',
    emoji: '🔴',
    summary:
      "Every accepted case in your practice is happening despite the process, not because of it. There\u2019s massive upside waiting to be captured with the right systems.",
  },
  {
    min: 0,
    label: 'Starting from Scratch',
    color: '#C45B5B',
    emoji: '🚨',
    summary:
      "You\u2019re not alone — most practices have never been taught how to systematically present and close treatment. The good news: the biggest gains come from building the foundation.",
  },
];

export const PRODUCTION_TIERS: ProductionTier[] = [
  { label: '$500K – $1M', value: 750000 },
  { label: '$1M – $2M', value: 1500000 },
  { label: '$2M – $3M', value: 2500000 },
  { label: '$3M – $5M', value: 4000000 },
  { label: '$5M+', value: 6000000 },
];

export const TOTAL_QUESTIONS = PILLARS.reduce(
  (s, p) => s + p.questions.length,
  0
);
export const MAX_SCORE = TOTAL_QUESTIONS * 2;
