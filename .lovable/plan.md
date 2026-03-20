

# Plan: Export Complete Portal Mega-Document

Export every source file from the portal module into a single comprehensive markdown document at `/mnt/documents/nextgen-portal-complete-rebuild.md`. This will be a ~4000+ line file containing:

## Document Structure

1. **Architecture Overview** - File tree, routing, data flow diagram
2. **TypeScript Types** - `src/portal/types/index.ts` (full source)
3. **Data Layer** - `pillars.ts`, `kpiDefinitions.ts`, `mock.ts` (all 878 lines)
4. **Scoring Engine** - `kpiScoring.ts` (full source)
5. **Context Providers** - `PortalAuthContext.tsx`, `PracticeContext.tsx` (full source)
6. **Data Hook** - `usePracticeData.ts` (full source)
7. **Shell & Navigation** - `PortalShell.tsx`, `PortalSidebar.tsx`, `PortalMobileNav.tsx`, `PortalHeader.tsx`, `PracticeSwitcher.tsx`, `PortalAuthGuard.tsx`
8. **Shared UI Components** - `KPIStatCard`, `MetricGrid`, `MiniChart`, `PackageCard`, `InsightCard`, `CTACard`, `StatusBadge`, `SectionHeader`, `PillarHero`, `PillarChecklist`, `SystemsStatusBoard`, `TimelineItem`, `RequestTable`, `NeedsSetupBanner`
9. **Onboarding Wizard** - `OnboardingWizard.tsx`, `OnboardingProgress.tsx`, `AuditToggleList.tsx`, `KPIEntrySection.tsx`, `StepPracticeInfo.tsx`, `StepGiselleAudit.tsx`, `StepMilesAudit.tsx`, `StepDevonAudit.tsx`, `StepAlmaAudit.tsx`, `StepReviewLaunch.tsx`
10. **Pages** - `Dashboard.tsx`, `GisellePage.tsx`, `MilesPage.tsx`, `DevonPage.tsx`, `AlmaPage.tsx`, `TimelinePage.tsx`, `RequestsPage.tsx`
11. **Guided Tour** - `GuidedTour.tsx` (full source)
12. **Checklist-to-Toggle Mapping** - How onboarding connects to pillar pages via `system_toggles`
13. **Database Schema Reference** - Tables, RLS policies, toggle key formats

Every file will be included as a complete, copy-pasteable code block with its exact file path. No truncation.

## Technical Details

- Output: single markdown file at `/mnt/documents/nextgen-portal-complete-rebuild.md`
- All 40+ source files included verbatim
- Includes architecture notes, data flow explanations, and toggle key mapping between each section
- Dependencies noted: `recharts`, `lucide-react`, `react-router-dom`, `@supabase/supabase-js`, `tailwindcss`

