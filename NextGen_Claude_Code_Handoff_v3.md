# NextGen Practice Solutions — Claude Code Master Handoff Brief
**Version 3 — March 2026**
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Supabase + Vercel
**Routing:** React Router v6 (BrowserRouter)
**State:** React Context (no Redux/Zustand)
**Icons:** Lucide React | **Charts:** Recharts

---

## CURRENT BUILD STATUS (as of March 17, 2026)

### Done (7 routes with real UI)
`/` landing, `/assessment`, `/pricing`, `/book`, `/login`, `/signup`, `/auth/callback`

### Scaffold only (route exists, placeholder UI)
`/dashboard`, `/scorecard`, `/progress`, `/settings`, `/growth`, `/management`, `/development`, `/academy`, `/onboard`

### Missing entirely
`/auth/forgot-password`, `/auth/reset-password`, `/admin/prospects`, `/admin/practices`, `/admin/kpi-entry`

### Supabase tables — connected
`users`, `practices`, `assessment_results`

### Supabase tables — schema exists, NOT wired to UI
`kpi_snapshots`, `kpi_definitions`, `pillar_scores`, `system_toggles`, `cases`

### NOT deployed
Vercel project does not exist yet. **This is the first task.**

---

## TASK 0 — DEPLOY TO VERCEL (do this before anything else)

```bash
# In project root
vercel link         # Create/link Vercel project named nextgen-portal
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod       # First production deploy
```

Confirm the build passes and the URL resolves before continuing.

---

## DESIGN TOKENS (canonical — do not deviate)

```typescript
// src/lib/tokens.ts
export const T = {
  bg:      "#0D0E14",
  bgMid:   "#111921",
  bgCard:  "rgba(255,255,255,0.03)",
  bgHov:   "rgba(255,255,255,0.05)",
  border:  "rgba(255,255,255,0.06)",
  bHov:    "rgba(255,255,255,0.12)",
  text:    "#F9FAFB",
  dim:     "#9CA3AF",
  muted:   "#4B5563",
  amber:   "#F5A623",   // global accent
  giselle: "#10b981",  // emerald
  miles:   "#f43f5e",  // rose
  devon:   "#6366f1",  // indigo
  alma:    "#f59e0b",  // warm amber
} as const;

// Typography
// Display: Instrument Serif (italic for hero moments)
// Body: DM Sans
// Mono: DM Mono (labels, KPI values, codes, statuses)
```

**Agent colors are fixed.** Giselle = emerald, Miles = rose, Devon = indigo, Alma = warm amber. Do not change.

---

## ROUTE STRUCTURE (canonical — reconciled)

```
PUBLIC (no auth)
  /                          Landing page
  /assessment                Assessment engine
  /pricing                   Spark / Ignite / Blaze tiers
  /book                      Calendly embed

AUTH
  /login
  /signup
  /auth/callback
  /auth/forgot-password      [MISSING — add]
  /auth/reset-password       [MISSING — add]

PORTAL — guarded (PortalAuthGuard)
  /portal/onboard            Onboarding wizard — 6 steps (see Section 5)
                             NOTE: /portal/create IS DELETED — absorbed into Step 1 of /portal/onboard
  /portal                    Dashboard — dual mode (prospect / client)
  /portal/growth             Giselle — dual mode
  /portal/management         Miles — dual mode
  /portal/development        Devon — dual mode
  /portal/academy            Alma — dual mode
  /portal/narrative          Narrative — demo mode (prospect) / full app (Blaze client)
  /portal/team               Agent team session
  /portal/timeline           Milestone timeline
  /portal/requests           Support requests (client only)
  /portal/settings           Account settings

ADMIN — guarded (admin role only)
  /admin                     Prospect/client roster table
  /admin/prospects           Assessment results table — sortable, filterable
  /admin/:practiceId         Per-practice drill-down + impersonation
  /admin/kpi-entry           [MISSING — add] Manual KPI entry per practice/month
```

---

## CRITICAL ARCHITECTURE — DUAL RENDER MODE

**Every pillar page renders in one of two modes.** This is the core sales mechanic.

```typescript
// In PracticeContext
const isClient = practice?.status === 'active' && profile?.role === 'client';
// isClient = false → Prospect Mode
// isClient = true  → Client Mode
```

### Prospect Mode (isClient = false)
Shown to any authenticated user who has completed assessment but is NOT yet a paying client.

Each pillar page shows:
- Their **real assessment score** for that pillar (from `assessment_results`)
- **Gaps highlighted** — which questions they scored low on
- **Industry benchmarks** beside each metric
- **"What NextGen fixes"** — one-liner per gap
- **Locked preview** of the paid dashboard — blurred overlay with sample data, NOT an empty state
- **Book a call CTA** — prominent, amber button

### Client Mode (isClient = true)
Shown after Jonathan activates their account and onboarding wizard completes.

Each pillar page shows:
- **Live KPI dashboards** from `kpi_snapshots`
- **Trendlines** (baseline → current → target)
- **Active agent widgets** — checklist items, action queues, insights
- **No CTA** — they're already a client

### Implementation pattern

```typescript
// Every pillar page component
function GrowthPage() {
  const { isClient, isDemo } = usePractice();
  const { assessmentData } = useAssessmentResults();

  if (!isClient) return <GrowthProspectView scores={assessmentData} />;
  return <GrowthClientView />;
}
```

### Locked preview pattern (prospect mode)
Do NOT show empty states. Show blurred/dimmed sample data with a lock overlay:

```tsx
<div style={{ position: 'relative' }}>
  <div style={{ filter: 'blur(4px)', opacity: 0.4, pointerEvents: 'none' }}>
    <SampleKPIDashboard />   {/* Real-looking sample data */}
  </div>
  <div style={{ position: 'absolute', inset: 0, display: 'flex', 
    alignItems: 'center', justifyContent: 'center' }}>
    <UnlockCard tier="Ignite" onCTA={() => navigate('/book')} />
  </div>
</div>
```

---

## SECTION 5 — ONBOARDING WIZARD (/portal/onboard)

**Delete `/portal/create` entirely.** Its content becomes Step 1 of the wizard.
**6 steps total. Single canonical route: `/portal/onboard`**

### Step 1 — Practice Info (replaces /portal/create)
Fields: Practice name, Lead doctor/owner, Location, Phone, Email, PMS (dropdown: Eaglesoft, Dentrix, Carestream, OpenDental, Curve, Fuse, Other), Number of providers (1/2/3/4/5+), Primary specialties (multi-select), Years in operation.

**Note:** Plan tier (Spark/Ignite/Blaze) is set by Jonathan in admin — NOT by the practice during onboarding. Remove any self-serve tier selector from onboarding.

### Step 2 — Giselle Audit (Growth Systems + KPI Baseline)
**Dual-section layout:**

**Section A — Systems & Assets (12 toggles → writes to system_toggles)**
IDs: ga_1 Google Ads, ga_2 Meta Ads, ga_3 Retargeting, ga_4 GBP Optimization, ga_5 Email Campaigns, ga_6 Social Content, ga_7 Online Booking, ga_8 Lead Magnet, ga_9 Smile Simulator, ga_10 Before/After Gallery, ga_11 Testimonials, ga_12 Doctor Video

**Section B — Growth KPI Baseline (11 KPIs → writes to kpi_snapshots as month 0)**

| KPI | current_placeholder | target_placeholder |
|---|---|---|
| New patient leads / mo | avg 20–30 | top 50–80+ |
| Lead-to-appointment rate | avg 30–40% | top 60–70% |
| Cost per lead | avg $50–$150 | top $25–$50 |
| New patients booked / mo | avg 10–15 | top 35–50 |
| Google review count | — | — |
| Google rating | — | — |
| Website conversion rate | avg 2–3% | top 8–12% |
| Referral rate | avg 10–15% | top 25–35% |
| Ad spend / mo | — | — |
| Social post frequency / mo | avg 2–4 | top 12–16 |
| GBP completeness % | avg 60–70% | top 95–100% |

### Step 3 — Miles Audit (Management Systems + KPI Baseline)
**Section A — 12 workflow toggles**
IDs: wf_1 Missed call text-back, wf_2 5-minute lead response, wf_3 Lead nurture sequence, wf_4 No-show recovery, wf_5 Cancel recovery, wf_6 Waitlist management, wf_7 Welcome sequence, wf_8 AI voice/chat coverage, wf_9 Recall automation, wf_10 Retention campaign, wf_11 KPI dashboard delivery, wf_12 Team SOP rollout

**Section B — 17 Management KPI baselines**

| KPI | current_placeholder | target_placeholder |
|---|---|---|
| Monthly collections | avg $150k–$250k | top $400k+ |
| Monthly production | avg $160k–$270k | top $420k+ |
| Collection rate | avg 94–96% | top 98–99% |
| Schedule utilization | avg 80–85% | top 95–98% |
| Speed to lead (min) | avg 240–480 | top <5 |
| Missed call rate | avg 20–30% | top <8% |
| Leads contacted <60s | avg 5–10% | top 60–80% |
| Recall compliance | avg 55–65% | top 85–92% |
| No-show rate | avg 12–18% | top <4% |
| Treatment acceptance | avg 40–50% | top 75–85% |
| AR days outstanding | avg 35–50 | top <18 |
| Claim denial rate | avg 8–12% | top <3% |
| Same-day treatment rate | avg 15–25% | top 40–55% |
| New patient show rate | avg 75–82% | top 93–97% |
| Reactivation rate | avg 15–25% | top 40–50% |
| Patient retention (1yr) | avg 65–75% | top 88–92% |
| Avg production / visit | avg $250–$350 | top $500–$700 |

### Step 4 — Devon Audit (Development Systems + KPI Baseline)
**Section A — 10 tool/program toggles**
IDs: dt_1 Narrative, dt_2 Financing Presentation, dt_3 Smile Simulation, dt_4 Consultation Scripts, dt_5 Doctor-to-TC Handoff, dt_6 Objection Handling, dt_7 Pending Treatment Review SOP, dt_8 Follow-Up Workflow, dt_9 Training Curriculum, dt_10 Certification Progress

**Section B — 8 Development KPI baselines**

| KPI | current_placeholder | target_placeholder |
|---|---|---|
| High-value case acceptance | avg 25–35% | top 55–70% |
| Avg case value presented | avg $3,000–$5,000 | top $7,000–$10,000 |
| Avg case value accepted | avg $1,200–$2,000 | top $4,000–$6,000 |
| FD booking conversion | avg 45–55% | top 80–90% |
| TC presentation-to-close | avg 38–48% | top 70–80% |
| Patient satisfaction (NPS) | avg 7–8 | top 9.5+ |
| Training hours / mo | avg 0–1 | top 4–6 |
| Follow-up compliance | avg 40–55% | top 85–95% |

### Step 5 — Alma Audit (Toggles only — no KPI entry for Academy)

**Training Programs (5 toggles)**
IDs: prg_1 Front Desk Conversion Foundations, prg_2 TC Case Presentation, prg_3 Speed-to-Lead & Phones Essentials, prg_4 Morning Huddle and Team OS Basics, prg_5 New Hire 2-Week Onboarding

**SOP Library (12 toggles)**
IDs: sop_1 Inbound Call Script, sop_2 New Patient Scheduling, sop_3 Case Presentation Checklist, sop_4 Insurance Verification, sop_5 Recall Outreach, sop_6 Morning Huddle, sop_7 AR Follow-Up, sop_8 Patient Check-In, sop_9 Treatment Follow-Up, sop_10 Patient Checkout, sop_11 No-Show Recovery, sop_12 Billing & Payment

**Role Learning Modules (25 toggles across 6 roles)**
- Front Desk (rl_1–rl_5): Phone Scripts, Scheduling, Speed-to-Lead, Missed Call Recovery, Insurance Verification
- Treatment Coordinator (rl_6–rl_10): Consultation Framework, Case Presentation, Financing, Objection Handling, High-Ticket
- Hygiene (rl_11–rl_14): Perio Protocol, Patient Education, Recall Scripts, Co-Diagnosis
- Assistant (rl_15–rl_17): Chairside Systems, Patient Comfort, Treatment Documentation
- Office Manager (rl_18–rl_21): KPI Dashboard, Team Accountability, Revenue Cycle, Hiring SOPs
- Doctor (rl_22–rl_25): Morning Huddle, Case Handoff, KPI Review, Team Coaching

**Toggle key format for Alma:** `alma_${category}_${id}` e.g. `alma_programs_prg_1`, `alma_rolePaths_rl_6`, `alma_sops_sop_1`

### Step 6 — Review & Launch
Shows merged scorecard: pillar-by-pillar summary of systems activated + KPIs entered. Baseline health score calculated and displayed. Single button: **"Create Practice Profile"**

### 7-DB Write Sequence on Submit (execute in order, in a single async function)

```typescript
async function submitOnboarding(data: OnboardingData) {
  // 1. INSERT practice record
  const { data: practice } = await supabase
    .from('portal_practices')
    .insert({ name, doctor, email, location, phone, pms, providers, 
               specialties, years_open, status: 'onboarding', plan_tier })
    .select().single();

  // 2. UPDATE profiles.practice_id
  await supabase.from('profiles')
    .update({ practice_id: practice.id })
    .eq('id', userId);

  // 3. INSERT system_toggles — all 4 pillars
  const toggleRows = buildToggleRows(practice.id, data.toggles); // pillar, category, item_name, is_active
  await supabase.from('system_toggles').insert(toggleRows);

  // 4. INSERT kpi_snapshots — Month 0 current values (up to 36 rows)
  const month0Rows = buildKPIRows(practice.id, data.kpis, 'current', month0Date);
  await supabase.from('kpi_snapshots').insert(month0Rows);

  // 5. INSERT kpi_snapshots — 6-month target values
  const targetRows = buildKPIRows(practice.id, data.kpis, 'target', targetDate);
  await supabase.from('kpi_snapshots').insert(targetRows);

  // 6. CALCULATE + INSERT pillar_scores (month 0)
  const pillarScores = calculatePillarScores(data.kpis, data.toggles);
  await supabase.from('pillar_scores').insert([
    { practice_id: practice.id, pillar: 'growth',      month: month0, score: pillarScores.growth },
    { practice_id: practice.id, pillar: 'management',  month: month0, score: pillarScores.management },
    { practice_id: practice.id, pillar: 'development', month: month0, score: pillarScores.development },
    { practice_id: practice.id, pillar: 'academy',     month: month0, score: pillarScores.academy },
  ]);

  // 7. SET baseline_score + status = 'active' on practice
  const overallScore = Math.round(Object.values(pillarScores).reduce((a,b) => a+b, 0) / 4);
  await supabase.from('portal_practices')
    .update({ baseline_score: overallScore, current_score: overallScore, status: 'active' })
    .eq('id', practice.id);

  // Redirect
  navigate('/portal');
}
```

---

## SECTION 6 — DASHBOARD (/portal)

The dashboard is the most important page. Reference file: `NextGen_Dashboard_Command_Center.jsx` (uploaded). Use that file as the visual and data target.

### Prospect mode dashboard
- Score ring (SVG animated circle, overall score from assessment_results)
- Revenue leak estimate (calculated from assessment gap scores)
- 4 pillar score cards with breakdown
- Recommended package card (Spark/Ignite/Blaze based on score)
- Locked blurred preview of the Command Center
- "Book a strategy call" CTA — prominent amber button

### Client mode dashboard
Full Practice Command Center with:
- Period toggle: week / month / 30-day / quarter
- KPI sparklines strip across the top (from kpi_snapshots)
- Pillar score cards with baseline → current → target trajectory
- Radar chart (6 dimensions: Lead gen, Conversion, Operations, Case value, Retention, Team)
- Acquisition funnel with conversion rates
- Case acceptance gauges by provider (Ashwin / Autumn)
- Revenue cycle health metrics
- Production trend chart (Recharts AreaChart)
- Revenue impact banner: $[X] recovered over [N] months
- Agent insight bubbles (Giselle / Miles / Devon / Alma — one each)
- Activity feed tab (recent GHL events surfaced to portal)
- Narrative tab (cases presented/accepted, decline reasons, Storybook engagement) — visible only if `plan_tier = 'blaze'`

---

## SECTION 7 — SYSTEM_TOGGLES MECHANIC

This is how the portal stays intelligent. Every pillar page reads the same toggles written during onboarding.

```typescript
// Reading toggles in a pillar page
const { getItemEnabled } = usePractice();

// Returns true/false based on system_toggles table
const googleAdsActive = getItemEnabled('growth', 'ga_1');

// Demo mode: all items return true by default
// isDemo = !activePracticeId (no real practice linked)
```

The `PillarChecklist` component renders toggle items and allows them to be turned on/off post-onboarding. Each toggle change upserts to `system_toggles`:

```typescript
// system_toggles schema
{ id, practice_id, pillar, category, item_name, is_active, created_at, updated_at }

// Example rows:
{ practice_id: 'xxx', pillar: 'growth',     category: 'assets',     item_name: 'ga_1',  is_active: true  }
{ practice_id: 'xxx', pillar: 'management', category: 'workflows',  item_name: 'wf_2',  is_active: false }
{ practice_id: 'xxx', pillar: 'academy',    category: 'programs',   item_name: 'prg_1', is_active: true  }
```

The count of active toggles per pillar feeds into pillar scoring. Inactive items show in the checklist as gray/disabled — they're the gaps Jonathan still needs to activate.

---

## SECTION 8 — NARRATIVE (/portal/narrative and standalone)

### In the portal — prospect mode
Demo mode. Shows the Five Yes's walkthrough with a sample patient. Feature overview. "Included in Blaze tier" CTA. Treatment cost estimator widget.

### In the portal — Blaze client mode
Full chairside app. Real patient data. Case library. Builder Mode + Present Mode.

### Narrative data contract — 5 webhook events

| Event | Trigger | Fires to |
|---|---|---|
| `case_created` | TC completes Step 1 (patient + first finding) | GHL: creates opportunity, tags treatment type |
| `case_presented` | TC launches Present Mode | GHL: updates case value + stage → "Tx Presented" |
| `decision_captured` | Patient accepts or declines on Decision screen | GHL: pipeline move + Slack #bespoke-alerts |
| `export_generated` | PDF Storybook downloaded | GHL: texts Storybook link to patient |
| `followup_triggered` | Decline exits Present Mode | GHL: Campaign 2 (any decline) or Campaign 3 (>$5K) |

### `cases` table — 8-section data model

```typescript
interface NarrativeCase {
  // 1. Patient context
  patient_first_name: string;
  journey_type: 'new_patient' | 'existing' | 'emergency';
  membership_status: 'none' | 'glow' | 'luminate' | 'radiate';
  visit_date: string;

  // 2. Smile goals
  smile_goals: string[];  // patient's stated priorities

  // 3. Tooth chart
  tooth_chart: ToothEntry[];  // 32 teeth, each with: number, diagnosis, condition, urgency (P1/P2/P3)

  // 4. Findings
  findings: FindingCard[];    // tooth number, diagnosis, plain-language explanation, consequence, recommendation

  // 5. Treatment plan
  plan_items: PlanItem[];     // CDT code, procedure, fee, phase (P1/P2/P3), provider, duration
                              // Supports plan variants A/B/C

  // 6. Financial breakdown
  total_investment: number;
  insurance_estimate: number;
  patient_responsibility: number;
  membership_discount: number;
  financing_options: FinancingOption[];   // CareCredit / Cherry / Proceed / in-house
  payment_option_selected: string;

  // 7. Decision + signature
  decision: 'accepted' | 'declined' | 'pending';
  decline_reasons: string[];
  signature_captured: boolean;
  consent_acknowledged: boolean;
  decision_timestamp: string;

  // 8. Storybook
  storybook_token: string;
  storybook_opens: number;
  storybook_open_timestamps: string[];
  storybook_converted: boolean;
}
```

### KPIs Narrative writes to portal (via Supabase direct write on decision_captured)
- Case acceptance rate (per provider and overall)
- Avg case value presented
- Avg case value accepted
- High-value case acceptance rate
- TC presentation-to-close rate
- Decline reason frequency (used by Devon for pattern analysis)
- Storybook open rate and conversion rate

### Standalone Narrative (separate repo/product)
Narrative can be sold as a standalone product at ~$400–600/mo independent of the portal. It shares Supabase auth (same `cases` table, same user record) but renders in its own shell without the portal sidebar. The `/narrative/*` routes in the portal and the standalone app point to the same underlying components — the shell/layout differs, not the core app. Plan for this: wrap Narrative's core components to accept a `standalone: boolean` prop that switches between portal-embedded and fullscreen shell layouts.

---

## SECTION 9 — GHL LEAD LIFECYCLE (10 stages — reference for KPI wiring)

GHL is invisible to the client. It runs in the background. These are the events that fire and how they affect portal KPIs:

| Stage | Event | Portal KPI impact |
|---|---|---|
| 01 | Form submission | — |
| 02 | First contact | — |
| 03 | Appointment booked | — |
| 04 | Show / No-show | Miles: show rate, no-show rate |
| 05 | Treatment presented | Devon: cases presented count |
| 06a | **Accepted** | Devon: acceptance rate ↑, avg case value ↑. Miles: revenue projections ↑ |
| 06b | **Declined** | Devon: unscheduled treatment $ ↑, decline reason logged. Campaign 2 or 3 auto-fires |
| 07 | Treatment scheduled | — |
| 08 | Treatment completed | Miles: production ↑, collections ↑, collection rate recalculates |
| 09 | Review posted | Giselle: Google review count ↑, rating updates |
| 10 | Recall / reactivation | Miles: recall compliance %, reactivation rate |

**The critical branch: Stage 06a vs 06b**
- Any decline → Campaign 2 (unclosed treatment plan, 14-day 10-touch sequence)
- Decline AND case value >$5K → Campaign 3 (high-ticket, financing-focused, more aggressive)
- No human trigger needed. GHL decides based on custom field `case_value_presented`

**Slack alerts (all auto-fired by GHL webhooks):**
```
🟢 New Lead: [Name] — Website Intake — [Phone]          → #bespoke-alerts
📅 Booked: [Name] — [Type] — [Date/Time]                → #bespoke-alerts
✅ Showed: [Name]  OR  ⚠️ No-Show: [Name]               → #bespoke-alerts
🎉 Accepted: [Name] — [Treatment] — $[Value]            → #bespoke-alerts
🔴 Declined: [Name] — $[Value] — Reason: [cost/fear]    → #bespoke-alerts
✅ Completed: [Name] — [Treatment] — $[Value collected]  → #bespoke-alerts
⭐ Review: [Name] — Google — [N] stars                  → #bespoke-alerts
```

---

## SECTION 10 — ADMIN (/admin)

### /admin — Prospect/client roster

Sortable table. Each row is a practice (prospect or client).

| Column | Source |
|---|---|
| Practice Name | portal_practices.name |
| Score | assessment_results.overall_score OR pillar_scores avg |
| Grade | Calculated from score: 80+ Optimized, 60–79 Healthy, 40–59 Needs Attention, <40 Critical |
| Package rec | assessment_results.recommended_package |
| Revenue leak | assessment_results.revenue_leak_estimate |
| Status | portal_practices.status (new_lead / nurturing / call_scheduled / closed / active) |
| Tier | portal_practices.plan_tier |

**Admin actions per row:**
- View full assessment report (all question responses, per-category breakdown)
- Add internal notes
- Set pipeline stage
- **Set plan_tier** — this is how Jonathan activates a client at the right tier
- Trigger manual GHL workflow
- **Impersonate** — opens portal AS that practice (admin view of their dashboard)

### Impersonation — Phase 1 sales requirement (not Phase 2)

Jonathan needs to screen-share a prospect's portal during the discovery call. This is the close.

```typescript
// In PracticeContext
const [activePracticeId, setActivePracticeId] = useState<string | null>(null);

// Admin sets this via URL param or dropdown — switches whose data renders
// /admin/[practiceId] → sets activePracticeId → all portal pages render that practice's data
// The prospect's /portal renders their own activePracticeId from their profile
```

### /admin/kpi-entry — Manual KPI entry
For practices that don't have PMS integration. Jonathan enters monthly KPI values here. Form: select practice, select month, enter values for each KPI definition. Writes to `kpi_snapshots`.

---

## SECTION 11 — USER FLOW (7 steps, prospect → client)

This is the sales pipeline. Every page should support this flow.

1. **T+0** — Prospect lands on `/assessment` from ad / Jonathan's link. Signs up.
2. **T+1 min** — Assessment begins. Score ring updates live. 8–12 min to complete.
3. **T+12 min** — Results revealed. Dashboard populates with their score. GHL fires: contact created + speed-to-lead SMS from Jonathan.
4. **T+12 min** — Self-guided exploration. All pillar pages show their real scores + gaps + locked previews. Narrative shows demo. Timeline shows 3-week onboarding preview.
5. **T+12 min** — Jonathan gets GHL alert. Calls/texts within 5 minutes.
6. **Discovery call** — Jonathan screen-shares THEIR portal (impersonation view). Walks through Dashboard (their scores), clicks into weak pillars, shows locked previews. "We just need to turn this on."
7. **Post-sign** — Jonathan sets `plan_tier` in admin, changes `role` to 'client'. Practice runs `/portal/onboard`. 7-DB write fires. Portal switches to client mode. Everything comes alive.

---

## SECTION 12 — CONTEXT / PROVIDER HIERARCHY

```
PortalAuthProvider
  → PortalAuthGuard
    → PracticeProvider
      → [Page Component]
```

### PortalAuthContext exposes
`user`, `profile` (id, email, name, role, practice_id), `isAdmin`, `isLoading`, `signOut`, `refreshProfile`

### PracticeContext exposes
`activePractice`, `activeUser`, `isDemo`, `isClient`, `allPractices` (admin only), `switchPractice` (admin), `createPractice`, `getItemEnabled(pillar, itemId)`, `toggleItem(pillar, itemId)`, onboarding step controls, KPI management functions

### isDemo flag
`isDemo = !activePracticeId` — when no real practice is linked, all mock data shows and all toggles default to `true`. This is how the sales demo works without a real practice account.

---

## SECTION 13 — KNOWN TECH DEBT (fix in this order)

1. **Request form doesn't submit** — `NewRequestForm` calls `onClose` without saving. Wire to Supabase.
2. **Sign out doesn't call signOut()** — sidebar just navigates to `/portal/login`. Fix to call `supabase.auth.signOut()` then navigate.
3. **Team session is localStorage-only** — `useTeamSession` state dies on refresh. Wire to Supabase if the Team page is being built out.
4. **Duplicate PortalAuthProvider** — wrapped at every route in main.tsx. Move to a single root wrapper.
5. **Permissive SELECT RLS on portal_practices** — `USING(true)` exists for the create flow. Scope it properly once `/portal/create` is deleted and onboard handles practice creation.
6. **No password reset verification** — pages exist but weren't tested.

---

## SECTION 14 — BUILD SEQUENCE

Execute in this order. Do not skip steps.

### Sprint 1 (this session)
1. **Deploy to Vercel** — link repo, set env vars, confirm build
2. **Delete `/portal/create`** — remove route, component, and any nav links
3. **Build `/portal/onboard`** — 6-step wizard, dual-section layout per pillar, 7-DB write on submit
4. **Build `/portal` (Dashboard)** — dual mode. Prospect: score + gaps + locked preview. Client: full Command Center (reference: `NextGen_Dashboard_Command_Center.jsx`)

### Sprint 2
5. **Build `/portal/growth`** (Giselle) — dual mode, 12-item checklist, KPI dashboard, action queue
6. **Build `/portal/management`** (Miles) — dual mode, 12-workflow checklist, call tracking, recall trend
7. **Build `/portal/development`** (Devon) — dual mode, 10-tool checklist, team performance, open plans
8. **Build `/portal/academy`** (Alma) — dual mode, 3-group checklists (programs/SOPs/role paths)

### Sprint 3
9. **Build `/admin`** — prospect table, drill-down, impersonation, tier setter, KPI entry
10. **Wire `kpi_snapshots`** — real data flowing to pillar dashboards
11. **Build `/portal/narrative`** — demo mode + Blaze full access, case library
12. **Add missing auth routes** — forgot-password, reset-password

### Sprint 4 (Narrative standalone)
13. **Build Narrative app** — Builder Mode, Present Mode (8 steps), Storybook PDF, analytics
14. **Wire 5 webhook events** — case_created, case_presented, decision_captured, export_generated, followup_triggered
15. **Narrative standalone shell** — same components, fullscreen layout, no portal sidebar

---

## VISUAL REFERENCE

The portal demo built in Claude.ai (file: `nextgen-portal-v2.jsx`) is the canonical visual reference for all pillar pages. Key patterns to replicate:

- **Page hero:** agent name in Instrument Serif at 44–52px with colored period, agent role label in DM Mono above
- **Ambient glow:** `radial-gradient` from agent color at top-right of each pillar page
- **Stat strip:** 4 cards across top, DM Mono values, trend arrows in green/rose
- **Cards:** `rgba(255,255,255,0.03)` background, `rgba(255,255,255,0.06)` border, 16px border-radius, `backdrop-filter: blur(8px)`
- **Toggles:** 36×20px pill, white thumb slides left/right, agent color when active
- **Agent bubbles:** left-border accent in agent color, italic initial avatar, agent name in DM Mono
- **Charts:** Recharts, agent color for current bar/line, 40% opacity for historical bars
- **Sidebar:** 230px width, sticky, practice health score footer, tier badge with pulse dot

---

*End of brief. All sections are canonical. If anything conflicts with an earlier document, this brief takes precedence.*

---

## SECTION 15 — CRITICAL: STACK CORRECTION (read before writing any code)

### GitHub repo
```
https://github.com/thejohncao/nextgen-practicesolutions.git
```
Pull this repo. Do not scaffold a new project.

### What already exists — DO NOT MODIFY
`src/App.tsx` (1,395 lines) contains the polished homepage AND the 100-point assessment engine. This is the most important file in the project. Jonathan likes it. Do not rewrite, restructure, or move it. The assessment and homepage are already production-quality.

### Actual stack (from Lovable — overrides Section 1 of this brief)
- **Vite + React 18 + TypeScript** — correct
- **Supabase** — correct
- **React Router v6** — correct
- **NO Tailwind CSS** — Lovable uses inline CSS-in-JS throughout. Do not add Tailwind.
- **Styling pattern:** All styles are inline style objects or CSS-in-JS, matching the existing pattern in App.tsx

### Correct design tokens (from existing Lovable codebase — overrides Section 3)
```typescript
// Match these exactly — do not use the tokens from Section 3
const T = {
  bg:      "#07090f",    // NOT #0D0E14
  bgMid:   "#0d1018",
  bgCard:  "rgba(255,255,255,0.03)",
  border:  "rgba(255,255,255,0.07)",
  text:    "#e8eaf0",
  dim:     "#8a8fa8",
  muted:   "#4a4f62",
  amber:   "#F5A623",
  giselle: "#10b981",
  miles:   "#f43f5e",
  devon:   "#6366f1",
  alma:    "#f59e0b",
}
```

### Correct font stack (from existing Lovable codebase — overrides Section 3)
- **Display/Hero headings:** Bebas Neue (already loaded in project)
- **Body:** DM Sans
- **Mono/labels/KPI values:** DM Mono

Do NOT use Instrument Serif. That was from the demo artifact, not the actual codebase.

### How to build portal pages to match
Look at how App.tsx styles its components — inline style objects, no Tailwind classes. Build all new portal pages using the same pattern. Reference the `nextgen-portal-v2.jsx` demo for layout and component structure, but implement styling as inline objects matching the existing codebase pattern.

### What Claude Code should do first (before writing any new code)
1. Clone the GitHub repo
2. Read `src/App.tsx` fully — understand the homepage + assessment structure
3. Read `src/main.tsx` — understand the current route setup
4. Read `src/portal/` directory — understand what Lovable already built for the portal
5. Check `package.json` — note every dependency already installed
6. THEN start building, extending what exists rather than replacing it
