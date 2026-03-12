&nbsp;

# Require Signup Before Starting the Assessment

## Current State

- The assessment lives in `src/App.tsx` as a single-page app with its own auth system (`AuthModal`)
- Clicking "Take the 100-Point Assessment" immediately starts the assessment (no auth check)
- An `AuthModal` exists but is only triggered via the TopBar "Sign In" button
- Progress saving already works for logged-in users via `assessment_progress` table
- The `AuthModal` supports login and signup with first/last name

## Plan

### 1. Gate the assessment behind authentication

In `src/App.tsx`, modify the `onStart` handler on line 1338. Instead of immediately navigating to the first category intro, check if `user` is null. If not logged in, open the `AuthModal`. Once authenticated, automatically proceed to the assessment.

Specifically:

- Change `onStart` to: if `user` is null, set `authOpen = true` and store a flag (e.g. `pendingStart`) so that after auth completes, the assessment begins
- Add a `useEffect` that watches for `user` becoming non-null while `pendingStart` is true, then starts the assessment and clears the flag
- Update the `AuthModal`'s `onAuth` callback to also trigger the start if `pendingStart` is set

### 2. Update AuthModal copy

Change the signup copy from "Save your progress and get your report" to something like "Create an account to take the assessment" to make the intent clearer.

### 3. No database changes needed

The `assessment_progress` table and `profiles` trigger already handle everything. Signup creates a profile automatically via the `handle_new_user` trigger.

## Technical Details

- Add `pendingStart` state (`useState<boolean>(false)`) to the main component
- Modify line 1338: `onStart={() => { if (!user) { setPendingStart(true); setAuthOpen(true); return; } setCi(0); setQi(0); setView(VIEW.INTRO); scroll(); }}`
- Add effect: when `user` changes to non-null and `pendingStart` is true, start the assessment and set `pendingStart(false)`
- Update `AuthModal` default mode to "signup" when opened from the CTA button (pass a prop or set mode externally)  
  
**One thing to add that's not in the plan:** After they sign up and start the assessment, save their practice name and doctor name from the signup form to the `profiles` table immediately. That way when you log in as admin, you can see "Dr. Kansagra — Bespoke Dental Studios — Assessment In Progress" before they've even finished. You'll know who's taking it in real time.