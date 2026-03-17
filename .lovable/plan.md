

## Plan: Add Quick-Create Practice Page + Onboarding Redirect

### What exists today
- `/portal/signup` — creates an auth account with a profile (name, email, role). No practice is created.
- `/portal/onboard` — multi-step wizard. Step 1 collects practice info and calls `createPractice()`, steps 2-5 are pillar audits, step 6 is review/launch.
- After signup, users must manually navigate to `/portal/onboard`. There's no automatic redirect for users without a practice.

### What we'll build

**1. New `/portal/create` route — Quick Practice Creator**
A single-page form (similar to StepPracticeInfo) where the user enters practice details: name, doctor, location, phone, email, PMS, providers, specialties, years. On submit, it calls `createPractice()` and redirects to `/portal/onboard` (starting at step 1, skipping the practice info step since it's already done).

**2. Auto-redirect logic in PortalAuthGuard**
After login, if the authenticated user has no `practice_id` and is not an admin, redirect them to `/portal/create` instead of letting them into the portal dashboard with demo data.

### Technical details

- **New file**: `src/portal/pages/CreatePractice.tsx`
  - Protected route (wrapped in PortalAuthProvider + PortalAuthGuard + PracticeProvider)
  - Reuses the same form fields and styling as StepPracticeInfo
  - On submit: calls `createPractice()`, then `navigate('/portal/onboard')` with step set to 1

- **Edit `src/main.tsx`**: Add route `/portal/create` with the same provider wrapping as `/portal/onboard`

- **Edit `src/portal/components/PortalAuthGuard.tsx`**: After auth check, if `profile.practice_id` is null and role is not `admin`, redirect to `/portal/create` (except if already on `/portal/create`)

- **Edit `src/portal/pages/OnboardingWizard.tsx`**: When practice already exists (not demo), start at step 1 (skip step 0) so users don't re-enter practice info

### No database changes needed
The existing `portal_practices` table and `createPractice()` function handle everything.

