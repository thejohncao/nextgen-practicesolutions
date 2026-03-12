

# NextGen Practice Solutions — Backend & Auth System

## Current State

The portal currently runs entirely on **localStorage** via `useLocalStorage` hook. There is no real authentication — the login page accepts any credentials and navigates to the portal. Practice data, onboarding state, KPI values, and toggle states are all stored client-side in a single JSON blob.

There is also a pre-existing `profiles` table in the database with `role`, `practice_id` fields (but `practice_id` doesn't reference anything yet), and an `assessment_progress` table for the landing page assessment.

## Build Error Fix (Immediate)

The `emptyMetrics` function in `usePracticeData.ts` has a `changeDirection?: string` parameter type that doesn't match `MetricItem`'s `'up' | 'down' | 'flat'` union. Fix: cast the parameter type properly.

---

## Phase 1: Database Schema

Create a single migration with these new tables and changes:

### New Tables
- **`practices`** — id, name, doctor, location, phone, email, pms, providers, specialties, years_open, plan_tier, baseline_score, current_score, status (default 'onboarding'), onboarded_at, created_at, updated_at
- **`system_toggles`** — id, practice_id (FK), pillar, category, item_name, is_active (default false), created_at, updated_at
- **`kpi_definitions`** — id, key (unique), pillar, unit, format, invert (default false), benchmark_avg, benchmark_top, benchmark_floor, benchmark_ceiling, sort_order, created_at. Seeded with all 36 KPI rows.
- **`kpi_snapshots`** — id, practice_id (FK), kpi_definition_id (FK), month, value, target, snapshot_date, created_at. UNIQUE on (practice_id, kpi_definition_id, month).
- **`pillar_scores`** — id, practice_id (FK), pillar, month, score, created_at. UNIQUE on (practice_id, pillar, month).
- **`assessments`** — id, practice_name, doctor_name, email, phone, location, status, submitted_at, reviewed_at, created_at. Public insert, admin select.
- **`assessment_responses`** — id, assessment_id (FK), section, question_key, question_text, response_type, response_value, created_at.

### Modify Existing
- **`profiles`** — add `name` column (TEXT), ensure `practice_id` references `practices(id)`. Keep existing `role` column but update allowed values conceptually to 'admin', 'owner', 'manager', 'viewer'.

### RLS Policies
- **practices**: Admin can CRUD all. Users with matching `practice_id` in profiles can SELECT/UPDATE their own.
- **kpi_snapshots**: Admin can CRUD all. Practice users can SELECT own. Admin + owner can INSERT/UPDATE.
- **system_toggles**: Same as kpi_snapshots.
- **pillar_scores**: Admin + practice users can SELECT own. Admin can INSERT/UPDATE.
- **assessments**: Public can INSERT (anon). Admin can SELECT all.
- **assessment_responses**: Public can INSERT (anon). Admin can SELECT all.
- **kpi_definitions**: Public SELECT (read-only reference data).

A `has_role` security definer function will be used to check admin status without recursive RLS issues.

### Seed Data
- All 36 KPI definitions inserted in the migration.
- Admin profile for `jonathan@caoconsulting.com` will need to be created manually after signup (or via a trigger that checks email).

---

## Phase 2: Authentication Pages

### `/portal/login`
- Replace the current fake login with real email+password auth via the existing `supabase.auth` client.
- After login: fetch profile, check `practice_id`. If null → redirect `/portal/onboard`. If set → redirect `/portal/dashboard`.

### `/portal/signup`
- New page with email, password, name fields + role selector ("Practice Owner/Doctor" or "Office Manager").
- On signup, the `handle_new_user` trigger creates the profile row. We update it with `name` and `role` after signup.
- Redirect to `/portal/onboard`.

### `/portal/forgot-password`
- New page calling `supabase.auth.resetPasswordForEmail` with redirect to `/portal/reset-password`.

### `/portal/reset-password`
- New page that reads the recovery token from URL hash and calls `supabase.auth.updateUser({ password })`.

### Route Protection
- Create a `PortalAuthGuard` wrapper component that checks auth state. If not authenticated, redirect to `/portal/login`. Wrap all `/portal/*` routes except login/signup/forgot-password.

---

## Phase 3: Auth Context for Portal

Create a `PortalAuthContext` that provides:
- Current user + profile (with role, practice_id)
- `isAdmin` flag
- `activePracticeId` (for admin practice switching)
- `switchPractice(id)` for admin

This replaces the localStorage-based `PracticeContext` identity management while keeping the existing UI structure.

---

## Phase 4: Refactor PracticeContext to Use Database

Replace `useLocalStorage` with database-backed operations:
- **`createPractice`** → INSERT into `practices` table, UPDATE `profiles.practice_id`
- **`toggleItem`** → UPSERT into `system_toggles`
- **`getItemEnabled`** → SELECT from `system_toggles`
- **`setKPI`** → UPSERT into `kpi_snapshots` (month=0 for onboarding)
- **`completeOnboarding`** → Calculate pillar scores, INSERT into `pillar_scores`, UPDATE `practices.status` to 'active', set `baseline_score` and `current_score`

The `PracticeSwitcher` dropdown will query all practices (for admin) or show just the user's practice.

---

## Phase 5: Dashboard & Scorecard Integration

- Dashboard reads `kpi_snapshots` + `pillar_scores` for the active practice
- Scorecard page shows full KPI history across months
- Admin can enter new month data → new `kpi_snapshots` rows → recalculate `pillar_scores`

---

## File Changes Summary

```text
NEW FILES:
  src/portal/pages/PortalSignup.tsx
  src/portal/pages/ForgotPassword.tsx
  src/portal/pages/ResetPassword.tsx
  src/portal/components/PortalAuthGuard.tsx
  src/portal/context/PortalAuthContext.tsx
  src/portal/hooks/usePortalAuth.ts
  supabase/migrations/XXXX_portal_schema.sql

MODIFIED FILES:
  src/portal/pages/PortalLogin.tsx         — real auth
  src/portal/context/PracticeContext.tsx    — DB-backed
  src/portal/hooks/usePracticeData.ts      — DB reads
  src/portal/hooks/useLocalStorage.ts      — remove/deprecate
  src/portal/components/PortalShell.tsx     — auth guard
  src/portal/components/PortalHeader.tsx    — sign out, admin switcher
  src/portal/components/PracticeSwitcher.tsx — DB query
  src/portal/pages/OnboardingWizard.tsx    — DB writes
  src/main.tsx                              — new routes + auth provider
  src/portal/hooks/usePracticeData.ts      — fix emptyMetrics type (build error)
```

---

## Implementation Order

1. Fix the build error in `usePracticeData.ts` (type cast fix)
2. Run the database migration (all tables + seed KPI definitions + RLS)
3. Create auth pages (login, signup, forgot-password, reset-password)
4. Create `PortalAuthGuard` + `PortalAuthContext`
5. Wire up routes in `main.tsx`
6. Refactor `PracticeContext` to use database
7. Update onboarding wizard to write to DB
8. Update dashboard/pillar pages to read from DB

