import {
  Practice,
  PortalUser,
  Package,
  KPI,
  Insight,
  Milestone,
  ClientRequest,
  WorkflowItem,
  SystemAsset,
  Notification,
} from '../types';

// ── Practice & User ─────────────────────────────────────────────────

export const demoPractice: Practice = {
  id: 'prac_001',
  name: 'Bright Smile Dental',
  locations: ['Downtown', 'Westside'],
  ownerName: 'Dr. Sarah Chen',
  ownerEmail: 'sarah@brightsmile.com',
  plan: 'Scale',
  onboardedAt: '2025-09-15',
};

export const demoUser: PortalUser = {
  id: 'usr_001',
  name: 'Dr. Sarah Chen',
  email: 'sarah@brightsmile.com',
  role: 'owner',
  practiceId: 'prac_001',
};

// ── Global KPIs (hero) ─────────────────────────────────────────────

export const globalKPIs: KPI[] = [
  {
    id: 'gk_1',
    label: 'New Patients from Marketing',
    value: '47',
    change: '+12%',
    changeDirection: 'up',
    pillarSlug: 'giselle',
  },
  {
    id: 'gk_2',
    label: 'Speed-to-Lead',
    value: '2m 14s',
    change: '-41%',
    changeDirection: 'up',
    pillarSlug: 'miles',
  },
  {
    id: 'gk_3',
    label: 'Case Acceptance Rate',
    value: '72%',
    change: '+5%',
    changeDirection: 'up',
    pillarSlug: 'devon',
  },
];

// ── Giselle KPIs ────────────────────────────────────────────────────

export const giselleHeroKPIs: KPI[] = [
  { id: 'gh_1', label: 'New Patients from Marketing', value: '47', change: '+12%', changeDirection: 'up', pillarSlug: 'giselle' },
  { id: 'gh_2', label: 'Cost per Acquired Patient', value: '$187', change: '-8%', changeDirection: 'up', pillarSlug: 'giselle' },
  { id: 'gh_3', label: 'Website Conversion Rate', value: '4.2%', change: '+0.6%', changeDirection: 'up', pillarSlug: 'giselle' },
];

export const giselleDetailKPIs = {
  newPatientVolume: [
    { id: 'gd_1', label: 'Total New Patients', value: '63' },
    { id: 'gd_2', label: 'Marketing-Sourced', value: '47' },
    { id: 'gd_3', label: 'Referral New Patients', value: '16' },
    { id: 'gd_4', label: 'Trend vs Prior Period', value: '+12%', changeDirection: 'up' as const },
  ],
  marketingPerformance: [
    { id: 'gd_5', label: 'Ad Spend', value: '$8,790' },
    { id: 'gd_6', label: 'Leads', value: '124' },
    { id: 'gd_7', label: 'Cost per Lead', value: '$71' },
    { id: 'gd_8', label: 'Cost per Acquired Patient', value: '$187' },
    { id: 'gd_9', label: 'Estimated ROAS', value: '6.2x' },
  ],
  websiteConversion: [
    { id: 'gd_10', label: 'Site Visitors', value: '2,940' },
    { id: 'gd_11', label: 'Leads', value: '124' },
    { id: 'gd_12', label: 'Conversion Rate', value: '4.2%' },
    { id: 'gd_13', label: 'Online Booking', value: 'Enabled' },
  ],
  reputationPresence: [
    { id: 'gd_14', label: 'Google Rating', value: '4.8' },
    { id: 'gd_15', label: 'Review Count', value: '312' },
    { id: 'gd_16', label: 'GBP Calls', value: '89' },
    { id: 'gd_17', label: 'GBP Views', value: '4,210' },
  ],
};

// ── Miles KPIs ──────────────────────────────────────────────────────

export const milesHeroKPIs: KPI[] = [
  { id: 'mh_1', label: 'Speed-to-Lead', value: '2m 14s', change: '-41%', changeDirection: 'up', pillarSlug: 'miles' },
  { id: 'mh_2', label: 'New Patient Show Rate', value: '87%', change: '+3%', changeDirection: 'up', pillarSlug: 'miles' },
  { id: 'mh_3', label: 'Collections vs Production', value: '96%', change: '+2%', changeDirection: 'up', pillarSlug: 'miles' },
];

export const milesDetailKPIs = {
  speedToLead: [
    { id: 'md_1', label: 'Median Response Time', value: '2m 14s' },
    { id: 'md_2', label: '% Under 5 Minutes', value: '91%' },
    { id: 'md_3', label: 'Unbooked Leads Open', value: '8' },
  ],
  bookingShow: [
    { id: 'md_4', label: 'Booking Rate', value: '68%' },
    { id: 'md_5', label: 'Show Rate', value: '87%' },
    { id: 'md_6', label: 'Cancel Rate', value: '9%' },
    { id: 'md_7', label: 'No-Show Rate', value: '4%' },
  ],
  recallRetention: [
    { id: 'md_8', label: 'Recall Rate', value: '74%' },
    { id: 'md_9', label: 'Overdue Recall Count', value: '142' },
    { id: 'md_10', label: 'Reactivation Status', value: 'Active' },
  ],
  revenueAR: [
    { id: 'md_11', label: 'Collections %', value: '96%' },
    { id: 'md_12', label: 'AR Over 90 Days', value: '$18,400' },
    { id: 'md_13', label: 'Pending Treatment Value', value: '$124,000' },
    { id: 'md_14', label: 'Unscheduled Treatment', value: '$87,000' },
  ],
  teamSystems: [
    { id: 'md_15', label: 'SOP Completion', value: '82%' },
    { id: 'md_16', label: 'Huddle Compliance', value: '90%' },
    { id: 'md_17', label: 'Training Status', value: 'On Track' },
    { id: 'md_18', label: 'Open Process Issues', value: '3' },
  ],
};

// ── Devon KPIs ──────────────────────────────────────────────────────

export const devonHeroKPIs: KPI[] = [
  { id: 'dh_1', label: 'Overall Case Acceptance', value: '72%', change: '+5%', changeDirection: 'up', pillarSlug: 'devon' },
  { id: 'dh_2', label: 'High-Ticket Acceptance', value: '48%', change: '+3%', changeDirection: 'up', pillarSlug: 'devon' },
  { id: 'dh_3', label: 'Inquiry-to-Book Rate', value: '61%', change: '+4%', changeDirection: 'up', pillarSlug: 'devon' },
];

export const devonDetailKPIs = {
  caseAcceptance: [
    { id: 'dd_1', label: 'Overall Acceptance %', value: '72%' },
    { id: 'dd_2', label: 'High-Ticket Acceptance', value: '48%' },
    { id: 'dd_3', label: 'Same-Day Start Rate', value: '34%' },
  ],
  treatmentOpportunity: [
    { id: 'dd_4', label: 'Pending Treatment Value', value: '$124,000' },
    { id: 'dd_5', label: 'Unscheduled Treatment', value: '$87,000' },
    { id: 'dd_6', label: '24-Hour Follow-Up Compliance', value: '68%' },
  ],
  frontDeskConversion: [
    { id: 'dd_7', label: 'Call-to-Book Rate', value: '61%' },
    { id: 'dd_8', label: 'Missed Call Recovery', value: '79%' },
    { id: 'dd_9', label: 'Script Adherence Score', value: '85%' },
  ],
  trainingCoaching: [
    { id: 'dd_10', label: 'Last Training Date', value: 'Feb 28, 2026' },
    { id: 'dd_11', label: 'Coaching Completion', value: '76%' },
    { id: 'dd_12', label: 'Active Modules', value: '4' },
    { id: 'dd_13', label: 'Open Improvement Areas', value: '2' },
  ],
};

// ── Packages ────────────────────────────────────────────────────────

export const packages: Package[] = [
  // Giselle
  {
    id: 'pkg_g1',
    pillarSlug: 'giselle',
    name: 'Patient Acquisition Engine',
    status: 'active',
    tier: 'growth',
    scope: 'Google Ads, Meta Ads, retargeting, GBP, reputation management, lead magnets',
    keyResults: ['47 marketing-sourced patients', '$187 cost per acquisition', '6.2x ROAS'],
    nextMilestone: 'Implant landing page A/B test launch',
  },
  {
    id: 'pkg_g2',
    pillarSlug: 'giselle',
    name: 'Website & Conversion Stack',
    status: 'active',
    tier: 'growth',
    scope: 'Website optimization, online booking, smile simulator, before/after gallery, testimonials',
    keyResults: ['4.2% conversion rate', '2,940 monthly visitors', 'Online booking enabled'],
    nextMilestone: 'Smile simulator integration go-live',
  },
  // Miles
  {
    id: 'pkg_m1',
    pillarSlug: 'miles',
    name: 'Speed-to-Lead Automation',
    status: 'active',
    tier: 'scale',
    scope: 'Instant lead response, 5-minute follow-up, missed call text-back, lead nurture sequences',
    keyResults: ['2m 14s median response', '91% under 5 min', '8 unbooked leads open'],
    nextMilestone: 'After-hours AI routing optimization',
    kpiSnippet: '2m 14s avg response',
  },
  {
    id: 'pkg_m2',
    pillarSlug: 'miles',
    name: 'AI Front Desk Agent',
    status: 'active',
    tier: 'growth',
    scope: 'AI voice & chat, appointment scheduling, FAQ handling, after-hours coverage',
    keyResults: ['24/7 coverage active', '340 calls handled/mo', '92% resolution rate'],
    nextMilestone: 'Spanish language support rollout',
    kpiSnippet: '92% resolution',
  },
  {
    id: 'pkg_m3',
    pillarSlug: 'miles',
    name: 'Recall & Retention Engine',
    status: 'active',
    tier: 'growth',
    scope: 'Automated recall, overdue patient outreach, reactivation campaigns, retention tracking',
    keyResults: ['74% recall rate', '142 overdue patients', 'Reactivation campaign active'],
    nextMilestone: 'Overdue patient priority segmentation',
    kpiSnippet: '74% recall rate',
  },
  {
    id: 'pkg_m4',
    pillarSlug: 'miles',
    name: 'Revenue Cycle OS',
    status: 'active',
    tier: 'growth',
    scope: 'Collections tracking, AR management, insurance verification, payment plan automation',
    keyResults: ['96% collections', '$18.4K AR >90 days', 'Payment plans automated'],
    nextMilestone: 'Insurance verification automation phase 2',
    kpiSnippet: '96% collections',
  },
  {
    id: 'pkg_m5',
    pillarSlug: 'miles',
    name: 'Data & Dashboard Layer',
    status: 'active',
    tier: 'growth',
    scope: 'KPI dashboards, automated reporting, trend analysis, custom alerts',
    keyResults: ['Daily KPI delivery', 'Weekly trend reports', 'Custom alert system live'],
    nextMilestone: 'Provider-level performance dashboard',
    kpiSnippet: 'Daily delivery',
  },
  {
    id: 'pkg_m6',
    pillarSlug: 'miles',
    name: 'Team Operating System',
    status: 'onboarding',
    tier: 'starter',
    scope: 'SOPs, huddle system, training tracking, process documentation',
    keyResults: ['82% SOP completion', '90% huddle compliance', '3 open issues'],
    nextMilestone: 'Morning huddle template finalization',
    kpiSnippet: '82% SOP done',
  },
  // Devon
  {
    id: 'pkg_d1',
    pillarSlug: 'devon',
    name: 'Case Acceptance System',
    status: 'active',
    tier: 'growth',
    scope: 'Presentation tools, financing integration, narrative system, follow-up workflows',
    keyResults: ['72% acceptance rate', '48% high-ticket', '34% same-day starts'],
    nextMilestone: 'Financing presentation upgrade',
  },
  {
    id: 'pkg_d2',
    pillarSlug: 'devon',
    name: 'Front Desk & TC Performance',
    status: 'active',
    tier: 'growth',
    scope: 'Call scripts, objection handling, TC coaching, performance tracking, certification',
    keyResults: ['61% call-to-book', '85% script adherence', '76% coaching complete'],
    nextMilestone: 'Objection handling module completion',
  },
];

// ── Insights ────────────────────────────────────────────────────────

export const insights: Insight[] = [
  // Giselle
  {
    id: 'ins_g1',
    pillarSlug: 'giselle',
    title: 'Implant landing page conversion below site average',
    description: 'The implant-specific landing page converts at 2.1% vs the site average of 4.2%. Consider A/B testing headline and CTA placement.',
    priority: 'high',
    createdAt: '2026-03-08',
  },
  {
    id: 'ins_g2',
    pillarSlug: 'giselle',
    title: 'Retargeting is active but under-spending',
    description: 'Current retargeting budget is 40% below recommended spend. Increasing budget could capture 15-20 additional leads per month.',
    priority: 'medium',
    createdAt: '2026-03-06',
  },
  {
    id: 'ins_g3',
    pillarSlug: 'giselle',
    title: 'GBP profile should be refreshed this month',
    description: 'Google Business Profile photos and service descriptions haven\'t been updated in 90+ days. Fresh content improves local search ranking.',
    priority: 'low',
    createdAt: '2026-03-04',
  },
  // Miles
  {
    id: 'ins_m1',
    pillarSlug: 'miles',
    title: 'Response time improved 41% vs last month',
    description: 'Speed-to-lead automation is performing well. Median response time dropped from 3m 47s to 2m 14s since workflow optimization.',
    priority: 'low',
    createdAt: '2026-03-09',
  },
  {
    id: 'ins_m2',
    pillarSlug: 'miles',
    title: 'Recall campaign live but overdue patients remain high',
    description: '142 patients are overdue for recall. Consider adding a direct outreach layer with personal phone calls for high-value patients.',
    priority: 'high',
    createdAt: '2026-03-07',
  },
  {
    id: 'ins_m3',
    pillarSlug: 'miles',
    title: 'Collections strong, but AR >90 days needs review',
    description: 'Overall collections at 96% is excellent. However, $18,400 in AR over 90 days suggests a few accounts need targeted follow-up.',
    priority: 'medium',
    createdAt: '2026-03-05',
  },
  // Devon
  {
    id: 'ins_d1',
    pillarSlug: 'devon',
    title: 'High-ticket acceptance is below target',
    description: 'High-ticket case acceptance at 48% is below the 55% target. Review presentation flow and financing options for implant and full-arch cases.',
    priority: 'high',
    createdAt: '2026-03-08',
  },
  {
    id: 'ins_d2',
    pillarSlug: 'devon',
    title: 'Treatment follow-up within 24 hours is inconsistent',
    description: 'Only 68% of pending treatments receive follow-up within 24 hours. Automating the first touchpoint could increase this to 90%+.',
    priority: 'medium',
    createdAt: '2026-03-06',
  },
  {
    id: 'ins_d3',
    pillarSlug: 'devon',
    title: 'TC training active but objection handling needs reinforcement',
    description: 'Coaching completion is at 76%, but objection handling scores are lagging. Consider adding role-play sessions to the next training cycle.',
    priority: 'medium',
    createdAt: '2026-03-03',
  },
];

// ── Milestones (Timeline) ───────────────────────────────────────────

export const milestones: Milestone[] = [
  {
    id: 'ms_1',
    pillarSlug: 'giselle',
    type: 'package_activated',
    title: 'Patient Acquisition Engine — Go Live',
    description: 'Google Ads, Meta Ads, and retargeting campaigns launched across both locations.',
    date: '2025-10-01',
    status: 'completed',
  },
  {
    id: 'ms_2',
    pillarSlug: 'giselle',
    type: 'website_milestone',
    title: 'Website redesign launched',
    description: 'New conversion-optimized website with online booking, smile simulator placeholder, and before/after gallery.',
    date: '2025-11-15',
    status: 'completed',
  },
  {
    id: 'ms_3',
    pillarSlug: 'miles',
    type: 'workflow_launched',
    title: 'Speed-to-Lead automation activated',
    description: '5-minute lead response, missed call text-back, and lead nurture sequences all live.',
    date: '2025-10-15',
    status: 'completed',
  },
  {
    id: 'ms_4',
    pillarSlug: 'miles',
    type: 'package_activated',
    title: 'AI Front Desk Agent — Go Live',
    description: 'AI voice and chat agent handling calls, scheduling, and FAQ 24/7.',
    date: '2025-12-01',
    status: 'completed',
  },
  {
    id: 'ms_5',
    pillarSlug: 'miles',
    type: 'dashboard_delivered',
    title: 'KPI dashboard delivered',
    description: 'Daily automated KPI delivery with weekly trend analysis reports.',
    date: '2026-01-10',
    status: 'completed',
  },
  {
    id: 'ms_6',
    pillarSlug: 'devon',
    type: 'training_completed',
    title: 'TC Consultation Script Training',
    description: 'Front desk and treatment coordinator team completed initial consultation script training.',
    date: '2026-01-20',
    status: 'completed',
  },
  {
    id: 'ms_7',
    pillarSlug: 'devon',
    type: 'package_activated',
    title: 'Case Acceptance System — Go Live',
    description: 'Presentation tools, Narrative integration, and follow-up workflows activated.',
    date: '2026-02-01',
    status: 'completed',
  },
  {
    id: 'ms_8',
    pillarSlug: 'miles',
    type: 'workflow_launched',
    title: 'Recall & retention automation activated',
    description: 'Automated recall reminders, overdue outreach, and reactivation campaigns launched.',
    date: '2026-02-15',
    status: 'completed',
  },
  {
    id: 'ms_9',
    pillarSlug: 'giselle',
    type: 'recommendation',
    title: 'Implant landing page A/B test',
    description: 'New A/B test for implant landing page headline and CTA to improve conversion rate.',
    date: '2026-03-15',
    status: 'in_progress',
  },
  {
    id: 'ms_10',
    pillarSlug: 'miles',
    type: 'workflow_launched',
    title: 'Team Operating System onboarding',
    description: 'SOP documentation, morning huddle templates, and training tracking rollout.',
    date: '2026-03-20',
    status: 'in_progress',
  },
  {
    id: 'ms_11',
    pillarSlug: 'devon',
    type: 'training_completed',
    title: 'Objection handling module',
    description: 'Advanced objection handling training for treatment coordinators.',
    date: '2026-04-01',
    status: 'upcoming',
  },
  {
    id: 'ms_12',
    pillarSlug: 'giselle',
    type: 'website_milestone',
    title: 'Smile simulator integration',
    description: 'Interactive smile simulator tool integrated into website and consultation flow.',
    date: '2026-04-15',
    status: 'upcoming',
  },
];

// ── Client Requests ─────────────────────────────────────────────────

export const clientRequests: ClientRequest[] = [
  {
    id: 'req_1',
    title: 'Add Invisalign landing page',
    pillarSlug: 'giselle',
    requestType: 'feature',
    description: 'We want a dedicated landing page for Invisalign with before/after photos and a special offer CTA.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-08',
  },
  {
    id: 'req_2',
    title: 'Review no-show recovery sequence',
    pillarSlug: 'miles',
    requestType: 'support',
    description: 'We\'re still seeing 4% no-shows. Can we review and tighten the recovery sequence timing?',
    priority: 'medium',
    status: 'reviewing',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-07',
  },
  {
    id: 'req_3',
    title: 'Update financing presentation for implants',
    pillarSlug: 'devon',
    requestType: 'feature',
    description: 'We added a new financing partner. Please update the case presentation flow with their payment options.',
    priority: 'high',
    status: 'new',
    createdAt: '2026-03-09',
    updatedAt: '2026-03-09',
  },
  {
    id: 'req_4',
    title: 'GBP photo refresh',
    pillarSlug: 'giselle',
    requestType: 'general',
    description: 'Please update our Google Business Profile with new office photos and team headshots.',
    priority: 'low',
    status: 'waiting_on_client',
    createdAt: '2026-02-20',
    updatedAt: '2026-03-05',
  },
  {
    id: 'req_5',
    title: 'Morning huddle template customization',
    pillarSlug: 'miles',
    requestType: 'support',
    description: 'We want to customize the morning huddle template to include production goals by provider.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-03-05',
    updatedAt: '2026-03-10',
  },
  {
    id: 'req_6',
    title: 'Add Spanish-language call scripts',
    pillarSlug: 'devon',
    requestType: 'feature',
    description: 'About 30% of our patients prefer Spanish. We need translated consultation and follow-up scripts.',
    priority: 'medium',
    status: 'reviewing',
    createdAt: '2026-03-07',
    updatedAt: '2026-03-09',
  },
];

// ── Workflow Statuses ───────────────────────────────────────────────

export const milesWorkflows: WorkflowItem[] = [
  { id: 'wf_1', pillarSlug: 'miles', name: 'Missed call text-back', status: 'live' },
  { id: 'wf_2', pillarSlug: 'miles', name: '5-minute lead response', status: 'live' },
  { id: 'wf_3', pillarSlug: 'miles', name: 'Lead nurture sequence', status: 'live' },
  { id: 'wf_4', pillarSlug: 'miles', name: 'No-show recovery', status: 'live' },
  { id: 'wf_5', pillarSlug: 'miles', name: 'Cancel recovery', status: 'live' },
  { id: 'wf_6', pillarSlug: 'miles', name: 'Waitlist management', status: 'in_progress' },
  { id: 'wf_7', pillarSlug: 'miles', name: 'Welcome sequence', status: 'live' },
  { id: 'wf_8', pillarSlug: 'miles', name: 'AI voice/chat coverage', status: 'live' },
  { id: 'wf_9', pillarSlug: 'miles', name: 'Recall automation', status: 'live' },
  { id: 'wf_10', pillarSlug: 'miles', name: 'Retention campaign', status: 'live' },
  { id: 'wf_11', pillarSlug: 'miles', name: 'KPI dashboard delivery', status: 'live' },
  { id: 'wf_12', pillarSlug: 'miles', name: 'Team SOP rollout', status: 'in_progress' },
];

// ── Giselle System Assets ───────────────────────────────────────────

export const giselleAssets: SystemAsset[] = [
  { id: 'ga_1', pillarSlug: 'giselle', name: 'Google Ads', enabled: true, status: 'Active' },
  { id: 'ga_2', pillarSlug: 'giselle', name: 'Meta Ads', enabled: true, status: 'Active' },
  { id: 'ga_3', pillarSlug: 'giselle', name: 'Retargeting', enabled: true, status: 'Under-spending' },
  { id: 'ga_4', pillarSlug: 'giselle', name: 'GBP Optimization', enabled: true, status: 'Needs refresh' },
  { id: 'ga_5', pillarSlug: 'giselle', name: 'Email Campaigns', enabled: true, status: 'Active' },
  { id: 'ga_6', pillarSlug: 'giselle', name: 'Social Content', enabled: true, status: 'Active' },
  { id: 'ga_7', pillarSlug: 'giselle', name: 'Online Booking', enabled: true, status: 'Enabled' },
  { id: 'ga_8', pillarSlug: 'giselle', name: 'Lead Magnet', enabled: true, status: 'Active' },
  { id: 'ga_9', pillarSlug: 'giselle', name: 'Smile Simulator', enabled: false, status: 'Planned' },
  { id: 'ga_10', pillarSlug: 'giselle', name: 'Before/After Gallery', enabled: true, status: 'Live' },
  { id: 'ga_11', pillarSlug: 'giselle', name: 'Testimonials', enabled: true, status: 'Live' },
  { id: 'ga_12', pillarSlug: 'giselle', name: 'Doctor Video', enabled: false, status: 'Planned' },
];

// ── Devon Tools ─────────────────────────────────────────────────────

export const devonTools: SystemAsset[] = [
  { id: 'dt_1', pillarSlug: 'devon', name: 'Narrative', enabled: true, status: 'Active' },
  { id: 'dt_2', pillarSlug: 'devon', name: 'Financing Presentation', enabled: true, status: 'Active' },
  { id: 'dt_3', pillarSlug: 'devon', name: 'Smile Simulation', enabled: false, status: 'Planned' },
  { id: 'dt_4', pillarSlug: 'devon', name: 'Consultation Scripts', enabled: true, status: 'Active' },
  { id: 'dt_5', pillarSlug: 'devon', name: 'Doctor-to-TC Handoff', enabled: true, status: 'Active' },
  { id: 'dt_6', pillarSlug: 'devon', name: 'Objection Handling', enabled: true, status: 'In training' },
  { id: 'dt_7', pillarSlug: 'devon', name: 'Pending Treatment Review SOP', enabled: true, status: 'Active' },
  { id: 'dt_8', pillarSlug: 'devon', name: 'Follow-Up Workflow', enabled: true, status: 'Active' },
  { id: 'dt_9', pillarSlug: 'devon', name: 'Training Curriculum', enabled: true, status: '76% complete' },
  { id: 'dt_10', pillarSlug: 'devon', name: 'Certification Progress', enabled: true, status: 'In progress' },
];

// ── Notifications ───────────────────────────────────────────────────

export const notifications: Notification[] = [
  { id: 'n_1', title: 'New insight from Giselle', message: 'Implant page conversion is below average', read: false, createdAt: '2026-03-10T09:00:00' },
  { id: 'n_2', title: 'Milestone completed', message: 'Recall automation is now live', read: false, createdAt: '2026-03-09T14:30:00' },
  { id: 'n_3', title: 'Request updated', message: 'Invisalign landing page is in progress', read: true, createdAt: '2026-03-08T11:00:00' },
];

// ── Pillar Summary (for dashboard cards) ────────────────────────────

export const pillarSummaries = [
  {
    slug: 'giselle' as const,
    topKPIs: [
      { label: 'New Patients', value: '47', change: '+12%' },
      { label: 'Cost / Patient', value: '$187', change: '-8%' },
      { label: 'Web Conversion', value: '4.2%', change: '+0.6%' },
    ],
    activePackages: 2,
    alert: 'Implant landing page conversion below average — A/B test recommended',
  },
  {
    slug: 'miles' as const,
    topKPIs: [
      { label: 'Speed-to-Lead', value: '2m 14s', change: '-41%' },
      { label: 'Show Rate', value: '87%', change: '+3%' },
      { label: 'Collections', value: '96%', change: '+2%' },
    ],
    activePackages: 6,
    alert: 'Recall campaign active but 142 overdue patients need attention',
  },
  {
    slug: 'devon' as const,
    topKPIs: [
      { label: 'Case Acceptance', value: '72%', change: '+5%' },
      { label: 'High-Ticket', value: '48%', change: '+3%' },
      { label: 'Call-to-Book', value: '61%', change: '+4%' },
    ],
    activePackages: 2,
    alert: 'High-ticket acceptance below target — review financing presentation',
  },
];

// ── Chart Data (for simple visualizations) ──────────────────────────

export const newPatientTrend = [
  { month: 'Oct', value: 31 },
  { month: 'Nov', value: 36 },
  { month: 'Dec', value: 34 },
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 42 },
  { month: 'Mar', value: 47 },
];

export const caseAcceptanceTrend = [
  { month: 'Oct', value: 62 },
  { month: 'Nov', value: 65 },
  { month: 'Dec', value: 64 },
  { month: 'Jan', value: 68 },
  { month: 'Feb', value: 69 },
  { month: 'Mar', value: 72 },
];

export const speedToLeadTrend = [
  { month: 'Oct', value: 5.2 },
  { month: 'Nov', value: 4.8 },
  { month: 'Dec', value: 4.1 },
  { month: 'Jan', value: 3.5 },
  { month: 'Feb', value: 3.1 },
  { month: 'Mar', value: 2.2 },
];
