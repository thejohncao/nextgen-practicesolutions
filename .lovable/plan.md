

# Comprehensive Checklist, Timeline & Requests Breakdown for Claude Code

This document covers three critical gaps: (1) every checklist item per pillar and how they connect from onboarding to pillar pages via the `system_toggles` table, (2) the Timeline page, and (3) the Requests page. I'll export this as a downloadable markdown file.

## What to Export

### 1. Checklist System — End-to-End Flow

**How it works:**
- During onboarding (Steps 2-5), users toggle items ON/OFF via `AuditToggleList`
- Each toggle calls `toggleItem(pillar, itemId)` or `toggleAlmaItem(category, id)` in PracticeContext
- This upserts a row in `system_toggles` table: `{ practice_id, pillar, category, item_name, is_active }`
- On each pillar page (Giselle, Miles, Devon, Alma), a `PillarChecklist` component reads the same toggles
- Demo mode (`isDemo=true`): all items default to `true` (enabled)
- Real mode: items read from `system_toggles` via `getItemEnabled(pillar, itemId)`

**Every checklist item per pillar with exact IDs:**

**Giselle — Growth Systems (12 items, `SystemAsset[]`):**
ga_1 Google Ads, ga_2 Meta Ads, ga_3 Retargeting, ga_4 GBP Optimization, ga_5 Email Campaigns, ga_6 Social Content, ga_7 Online Booking, ga_8 Lead Magnet, ga_9 Smile Simulator, ga_10 Before/After Gallery, ga_11 Testimonials, ga_12 Doctor Video

**Miles — Workflow Activation (12 items, `WorkflowItem[]`):**
wf_1 Missed call text-back, wf_2 5-minute lead response, wf_3 Lead nurture sequence, wf_4 No-show recovery, wf_5 Cancel recovery, wf_6 Waitlist management, wf_7 Welcome sequence, wf_8 AI voice/chat coverage, wf_9 Recall automation, wf_10 Retention campaign, wf_11 KPI dashboard delivery, wf_12 Team SOP rollout

**Devon — Tools & Programs (10 items, `SystemAsset[]`):**
dt_1 Narrative, dt_2 Financing Presentation, dt_3 Smile Simulation, dt_4 Consultation Scripts, dt_5 Doctor-to-TC Handoff, dt_6 Objection Handling, dt_7 Pending Treatment Review SOP, dt_8 Follow-Up Workflow, dt_9 Training Curriculum, dt_10 Certification Progress

**Alma — 3 separate checklist groups:**

Training Programs (5 items, `AcademyProgram[]`):
prg_1 Front Desk Conversion Foundations, prg_2 Treatment Coordinator Case Presentation, prg_3 Speed-to-Lead & Phones Essentials, prg_4 Morning Huddle and Team OS Basics, prg_5 New Hire 2-Week Onboarding

Role Learning Modules (25 items across 6 roles, `RolePath[]`):
- Front Desk: rl_1–rl_5 (Phone Scripts, Scheduling, Speed-to-Lead, Missed Call Recovery, Insurance Verification)
- Treatment Coordinator: rl_6–rl_10 (Consultation Framework, Case Presentation, Financing, Objection Handling, High-Ticket)
- Hygiene: rl_11–rl_14 (Perio Protocol, Patient Education, Recall Scripts, Co-Diagnosis)
- Assistant: rl_15–rl_17 (Chairside Systems, Patient Comfort, Treatment Documentation)
- Office Manager: rl_18–rl_21 (KPI Dashboard, Team Accountability, Revenue Cycle, Hiring SOPs)
- Doctor: rl_22–rl_25 (Morning Huddle, Case Handoff, KPI Review, Team Coaching)

SOP Library (12 items, `SOPEntry[]`):
sop_1–sop_12 covering Inbound Call Script, New Patient Scheduling, Case Presentation Checklist, Insurance Verification, Recall Outreach, Morning Huddle, AR Follow-Up, Patient Check-In, Treatment Follow-Up, Patient Checkout, No-Show Recovery, Billing & Payment

**Alma toggle key format:** `alma_${category}_${id}` (e.g. `alma_programs_prg_1`, `alma_rolePaths_rl_1`, `alma_sops_sop_1`)

**Toggle DB schema:** `system_toggles(id, practice_id, pillar, category, item_name, is_active)`

### 2. Timeline Page

- Route: `/portal/timeline`
- Dual filter bar: Pillar (All/Giselle/Miles/Devon/Alma) + Status (All/Completed/In Progress/Upcoming)
- Sorted by date descending
- 12 milestone items in mock data covering package launches, workflow activations, training completions, website milestones, dashboard deliveries, and recommendations
- Each `TimelineItem` renders: icon (by type), title, StatusBadge, description, pillar dot + label, formatted date
- Type→Icon map: package_activated→Rocket, workflow_launched→Zap, training_completed→GraduationCap, review_meeting→Users, website_milestone→Globe, dashboard_delivered→BarChart3, recommendation→Lightbulb
- Status colors: completed→emerald border, in_progress→blue border, upcoming→white/10 border

### 3. Requests Page

- Route: `/portal/requests`
- Status filter bar: All/New/Reviewing/In Progress/Waiting/Done
- "New Request" button toggles inline form
- Form fields: Title (text), Pillar (select), Request Type (general/feature/support/bug/strategy), Priority (low/medium/high/urgent), Description (textarea)
- Form does NOT persist (calls `onClose` without saving — known tech debt)
- `RequestTable` renders: Title, Pillar label, Priority badge, Status badge, Updated date
- 6 mock requests spanning giselle/miles/devon pillars

### 4. Guided Tour (10 steps)

Steps navigate across routes with spotlight overlay:
1. nav-sidebar on /portal — Portal Navigation
2. kpi-cards on /portal — Practice KPIs
3. pillar-tabs on /portal — Your AI Agents
4. giselle-hero on /portal/giselle — Giselle intro
5. miles-hero on /portal/miles — Miles intro
6. devon-hero on /portal/devon — Devon intro
7. alma-hero on /portal/alma — Alma intro
8. timeline-container on /portal/timeline — Unified Timeline
9. requests-table on /portal/requests — Request Center
10. dashboard-full on /portal — Ready to Start

Spotlight uses `data-tour` attributes and CSS box-shadow cutout technique.

## Implementation Plan

1. Export all of the above as a comprehensive markdown document to `/mnt/documents/nextgen-checklists-timeline-requests.md`
2. Include exact mock data arrays, type definitions, component prop interfaces, and DB persistence logic

