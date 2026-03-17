

# NextGen Portal — Comprehensive Architecture Breakdown

## 1. Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router v6 (BrowserRouter)
- **Styling**: Tailwind CSS (dark theme, `#0D0E14` base, amber `#F5A623` accent)
- **Backend**: Supabase (auth, Postgres DB, RLS policies)
- **State**: React Context (no Redux/Zustand)
- **Icons**: Lucide React

---

## 2. Route Structure

```text
/                          → Landing page (App.tsx — monolith with assessment engine)
/assessments               → AssessmentsHub
/assessments/case-acceptance → CaseAcceptanceAssessmentPage

/portal/login              → PortalLogin (public)
/portal/signup             → PortalSignup (public)
/portal/forgot-password    → ForgotPassword (public)
/portal/reset-password     → ResetPassword (public)

/portal/create             → CreatePractice (guarded, no shell)
/portal/onboard            → OnboardingWizard (guarded, no shell)

/portal                    → PortalShell layout (guarded)
  /portal          (index) → Dashboard
  /portal/giselle          → GisellePage
  /portal/miles            → MilesPage
  /portal/devon            → DevonPage
  /portal/alma             → AlmaPage
  /portal/team             → TeamPage
  /portal/timeline         → TimelinePage
  /portal/requests         → RequestsPage
  /portal/settings         → SettingsPage

/narrative                 → NarrativeDashboard (guarded)
/narrative/new             → NewPlanPage
/narrative/:planId         → NarrativeLayout
  /build, /timeline, /present, /checkout, /commit, /export

/admin                     → AdminLayout
  /admin          (index)  → AdminPracticeList
  /admin/:userId           → AdminPracticeDetail
```

---

## 3. Context / Provider Hierarchy

Every guarded portal route wraps components in:
```text
PortalAuthProvider → PortalAuthGuard → PracticeProvider → [Page]
```

### PortalAuthContext
- Manages Supabase `auth.onAuthStateChange` + `getSession`
- Fetches `profiles` row for current user
- Exposes: `user`, `profile` (id, email, name, role, practice_id), `isAdmin`, `isLoading`, `activePracticeId`, `setActivePracticeId`, `signOut`, `refreshProfile`

### PracticeContext
- Depends on `PortalAuthContext`
- Fetches `portal_practices` row for `activePracticeId`
- Fetches `system_toggles` and `kpi_snapshots` for active practice
- Admin can switch practices; non-admin locked to their `practice_id`
- `isDemo` = `!activePracticeId` (no real practice linked)
- Exposes: `activePractice`, `activeUser`, `isDemo`, `allPractices`, `switchPractice`, `createPractice`, `deletePractice`, onboarding state/step controls, toggle/KPI management functions.

### PortalAuthGuard
- Shows spinner while `isLoading`
- Redirects to `/portal/login` if no `user`
- Redirects to `/portal/create` if authenticated non-admin with no `practice_id`

---

## 4. Database Schema (Portal-Relevant Tables)

### `profiles`
- `id` (uuid, PK, matches `auth.users.id`), `email`, `first_name`, `last_name`, `name`, `role` (default `'patient'`), `practice_id` (nullable FK to `portal_practices`), `practice_name`, `phone`, `tenant_id`, timestamps
- Auto-created via `handle_new_user()` trigger on `auth.users` INSERT
- Signup passes `portal_role` in metadata → stored as `role`

### `portal_practices`
- `id`, `name`, `doctor`, `email`, `location`, `phone`, `pms`, `providers`, `specialties`, `years_open`, `plan_tier`, `status` (default `'onboarding'`), `baseline_score`, `current_score`, `onboarded_at`, timestamps
- RLS: admin full access, authenticated INSERT, owner SELECT/UPDATE via `portal_user_practice_id()`

### `system_toggles`
- `id`, `practice_id`, `pillar`, `category`, `item_name`, `is_active`, timestamps
- Tracks which systems/assets/workflows are enabled per practice per pillar
- RLS: admin full, owner INSERT/UPDATE/SELECT on own practice

### `kpi_definitions`
- `id`, `key`, `pillar`, `unit`, `format`, `sort_order`, `invert`, `benchmark_floor`, `benchmark_ceiling`, `benchmark_avg`, `benchmark_top`
- Public SELECT (read-only reference data)

### `kpi_snapshots`
- `id`, `practice_id`, `kpi_definition_id`, `month`, `value`, `target`, `snapshot_date`
- RLS: admin full, owner INSERT/UPDATE/SELECT on own practice

### `pillar_scores`
- `id`, `practice_id`, `pillar`, `month`, `score`

### Helper Functions
- `portal_has_role(uuid, text)` — checks `profiles.role`
- `portal_user_practice_id(uuid)` — returns `profiles.practice_id`
- `handle_new_user()` — trigger on auth.users to auto-insert profile

---

## 5. Auth Flow

```text
Signup (/portal/signup)
  → supabase.auth.signUp with metadata { first_name, last_name, name, portal_role }
  → trigger creates profile row (role = portal_role, practice_id = null)
  → shows "check your email" confirmation screen

Login (/portal/login)
  → supabase.auth.signInWithPassword
  → useEffect watches PortalAuthContext (user, profile, isLoading)
  → if admin or has practice_id → /portal
  → if no practice_id → /portal/create

Create Practice (/portal/create)
  → form: name, doctor, email, location, phone, PMS, providers, specialties, years
  → INSERT into portal_practices, UPDATE profiles.practice_id
  → refreshProfile(), navigate to /portal/onboard

Onboarding (/portal/onboard)
  → 6-step wizard: PracticeInfo (demo only), GiselleAudit, MilesAudit, DevonAudit, AlmaAudit, ReviewLaunch
  → Non-demo users start at step 1 (skip practice info)
  → Final step sets portal_practices.status = 'active'
```

---

## 6. Four-Pillar Architecture

Each pillar has an agent persona, color, and dedicated page:

| Pillar | Agent | Color | Route | Focus |
|--------|-------|-------|-------|-------|
| Practice Growth | Giselle | emerald | /portal/giselle | Marketing, leads, website, reputation |
| Practice Management | Miles | rose | /portal/miles | Operations, speed-to-lead, recall, revenue |
| Practice Development | Devon | indigo | /portal/devon | Case acceptance, training, front desk |
| Practice Academy | Alma | amber | /portal/alma | Team training, SOPs, role paths, certifications |

### Each Pillar Page Structure
1. **PillarHero** — agent name, description, 3 hero KPIs
2. **NeedsSetupBanner** — shown for non-demo practices
3. **MetricGrid sections** — grouped detail KPIs (4-5 metrics per card)
4. **MiniChart** — trend line (6-month sparkline via Recharts)
5. **Active Packages** — PackageCard grid
6. **PillarChecklist** — toggle items on/off (writes to `system_toggles`)
7. **SystemsStatusBoard** — asset/workflow status display
8. **Insights/Recommendations** — InsightCard list
9. **CTACard** — "Ask [Agent] to..." action button

---

## 7. Data Layer

### Demo vs Real Practice
- `usePracticeData()` hook returns either mock data or empty/placeholder data based on `isDemo`
- When `isDemo = true`: full mock data from `src/portal/data/mock.ts` (878 lines of realistic demo data)
- When `isDemo = false`: KPIs show "—", packages/milestones/insights are empty arrays, toggles come from DB

### KPI Definitions (Client-Side)
`src/portal/data/kpiDefinitions.ts` defines 36 KPIs across 3 categories:
- **GROWTH_KPIS** (11): new patient leads, lead-to-appt rate, cost per lead, Google reviews, etc.
- **MANAGEMENT_KPIS** (17): collections, production, collection rate, speed-to-lead, recall compliance, etc.
- **DEVELOPMENT_KPIS** (8): high-value case acceptance, avg case value, FD booking conversion, etc.

### Mock Data Includes
- `demoPractice`, `demoUser`
- `globalKPIs`, per-pillar hero + detail KPIs
- `packages` (6 items with status, tier, scope, key results)
- `milestones` (timeline events)
- `insights` (per-pillar recommendations)
- `clientRequests` (support tickets)
- `giselleAssets`, `milesWorkflows`, `devonTools` (system status items)
- `academyPrograms`, `rolePaths`, `sopLibrary` (Alma-specific)
- Trend data arrays for charts
- `notifications`
- `pillarSummaries` (dashboard card data)

---

## 8. Key UI Components

### Layout
- **PortalShell** — flex layout: sidebar + header + main (Outlet) + optional guided tour + onboarding banner
- **PortalSidebar** — 10 nav items, admin link to /admin, sign out
- **PortalHeader** — practice switcher, search, tour button, notifications, user avatar, sign out
- **PortalMobileNav** — slide-out nav for mobile
- **PracticeSwitcher** — dropdown for admin to switch between practices

### Shared Components
- **KPIStatCard** — single KPI with label, value, change indicator
- **MetricGrid** — titled card with list of metric rows
- **MiniChart** — Recharts area/line chart with trend data
- **PackageCard** — package status, tier, scope, key results, next milestone
- **InsightCard** — priority-colored recommendation card
- **TimelineItem** — milestone with icon, date, status dot
- **RequestTable** — tabular request list with status badges
- **StatusBadge** — colored pill for status values
- **SectionHeader** — section title + optional subtitle + action slot
- **CTACard** — accent-colored call-to-action card
- **PillarChecklist** — toggle list for system/asset activation
- **SystemsStatusBoard** — AssetStatusBoard + WorkflowStatusBoard variants
- **NeedsSetupBanner** — prompts non-demo users to complete setup
- **GuidedTour** — step-by-step overlay tour using `data-tour` attributes

### Onboarding Components (src/portal/components/onboarding/)
- **OnboardingProgress** — step indicator sidebar
- **StepPracticeInfo** — practice details form (demo only)
- **StepGiselleAudit** — growth systems checklist + KPI entry
- **StepMilesAudit** — management systems checklist + KPI entry
- **StepDevonAudit** — development systems checklist + KPI entry
- **StepAlmaAudit** — academy programs/SOPs checklist
- **StepReviewLaunch** — summary + launch button

### Team Components (src/portal/components/team/)
- **TeamHeader** — session name, lead agent, progress bar, stop button
- **TeamMemberGrid** — 4 agent cards with status
- **TaskBoard** — Kanban-style task management
- **ActivityFeed** — inter-agent message feed

---

## 9. Team Session (Agent Collaboration)

- **useTeamSession** hook — localStorage-persisted session state
- 4 agents (miles, giselle, devon, alma) form a team with a designated lead
- Features: create tasks, assign/claim tasks, update status, send messages between agents, track blocked tasks
- Types defined in `src/portal/types/team.ts`
- Entirely client-side (no DB persistence)

---

## 10. Assessment Engine (Landing Page)

`src/App.tsx` is a 1395-line monolith containing:
- Hero section with animated gradient background
- 100-point practice assessment with 6 categories, ~60 questions
- Each question maps to a service package (PAE, WCS, STL, AFD, RRE, RCO, DDL, TOS, CAS, FTP)
- Scoring engine calculates revenue leakage per gap
- Results view with phased implementation roadmap (3 phases)
- Auth modal for signup/login from landing page
- Saves assessment responses to `portal_assessments` + `assessment_responses` tables

---

## 11. Design System / Tokens

- **Background**: `#0D0E14` (near-black), cards use `bg-white/[0.04]` with `backdrop-blur-sm`
- **Borders**: `border-white/[0.06]`
- **Primary accent**: `#F5A623` (amber/gold)
- **Text**: `#F9FAFB` (primary), `#9CA3AF` (secondary), `#6B7280` (tertiary)
- **Pillar colors**: emerald (Giselle), rose (Miles), indigo (Devon), amber (Alma), cyan (Team)
- **Glass effect**: `shadow-glass` custom shadow class
- **Animations**: `animate-breathe-glow` for active pillar dots
- **Typography**: system defaults via Tailwind, no custom fonts loaded

---

## 12. Additional Modules (Outside Portal)

### Admin Dashboard (`src/admin/`)
- `AdminLayout` with guard (admin role only)
- `AdminPracticeList` — all practices table
- `AdminPracticeDetail` — per-practice KPI entry, notes, user management

### Narrative Module (`src/narrative/`)
- Treatment acceptance presentation builder
- Routes: dashboard, new plan, builder, timeline, present, checkout, decision, export
- Uses same auth guard and practice context

---

## 13. Known Quirks / Technical Debt

1. **PortalAuthProvider is duplicated** at every route level in `main.tsx` instead of wrapping once
2. **`portal_practices` has a permissive SELECT RLS** (`USING(true)`) — needed for create flow but overly broad
3. **Team session is localStorage-only** — no DB persistence, lost on clear
4. **App.tsx is a 1395-line monolith** — landing page + full assessment engine in one file
5. **Request form doesn't actually submit** — `NewRequestForm` calls `onClose` without saving
6. **Notification data is static** — imported from mock, not from DB `notifications` table
7. **Sign out in sidebar** just navigates to `/portal/login` instead of calling `signOut()`
8. **No password reset page verification** — ForgotPassword and ResetPassword pages exist but weren't verified in testing

