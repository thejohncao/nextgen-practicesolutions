import { useNavigate, Link } from 'react-router-dom';
import { usePractice } from '../context/PracticeContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GROWTH_KPIS, MANAGEMENT_KPIS, DEVELOPMENT_KPIS } from '../data/kpiDefinitions';
import OnboardingProgress from '../components/onboarding/OnboardingProgress';
import StepPracticeInfo, { getPracticeFormData } from '../components/onboarding/StepPracticeInfo';
import StepGiselleAudit from '../components/onboarding/StepGiselleAudit';
import StepMilesAudit from '../components/onboarding/StepMilesAudit';
import StepDevonAudit from '../components/onboarding/StepDevonAudit';
import StepAlmaAudit from '../components/onboarding/StepAlmaAudit';
import StepReviewLaunch from '../components/onboarding/StepReviewLaunch';

const STEP_COMPONENTS = [
  StepPracticeInfo,
  StepGiselleAudit,
  StepMilesAudit,
  StepDevonAudit,
  StepAlmaAudit,
  StepReviewLaunch,
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { onboardingState, setOnboardingStep, completeOnboarding, isDemo, createPractice } = usePractice();

  // Determine the current step — for new practices (demo mode), start at 0
  const step = onboardingState?.currentStep ?? 0;
  const StepComponent = STEP_COMPONENTS[step] || STEP_COMPONENTS[0];
  const isLast = step === STEP_COMPONENTS.length - 1;

  // Count total KPIs entered across all pillars (for the global top bar)
  const allKpis = onboardingState?.kpis ?? {};
  const allDefs = [...GROWTH_KPIS, ...MANAGEMENT_KPIS, ...DEVELOPMENT_KPIS];
  const totalKpis = allDefs.length;
  const kpisEntered = allDefs.filter(d => allKpis[d.id]?.current != null).length;

  const handleNext = async () => {
    if (step === 0 && isDemo) {
      // Step 1: Create the practice from form data
      const data = getPracticeFormData();
      if (!data) return; // validation failed
      await createPractice({
        name: data.name,
        ownerName: data.doctor,
        ownerEmail: data.email,
        locations: [data.location],
        plan: '',
        phone: data.phone,
        pms: data.pms,
        providers: data.providers,
        specialties: data.specialties,
        yearsInOperation: data.years,
      });
      // After creating, the context will switch to the new practice
      // and onboardingState will be available. Step advances to 1.
      setOnboardingStep(1);
      return;
    }
    if (isLast) {
      completeOnboarding();
      navigate('/portal');
    } else {
      setOnboardingStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setOnboardingStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex flex-col">
      {/* Global top bar */}
      <div className="border-b border-white/[0.06] px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-[#0B0C10] font-bold text-[10px]">NG</span>
          </div>
          <span className="text-sm font-semibold text-[#F9FAFB]">Practice Onboarding</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#6B7280]">
            <span className="text-[#F9FAFB] font-semibold">{kpisEntered}</span>/{totalKpis} KPIs entered
          </span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left sidebar — step indicator */}
        <div className="hidden md:flex flex-col w-64 border-r border-white/[0.06] p-6">
          <OnboardingProgress currentStep={step} />
          <div className="mt-auto">
            <Link
              to="/portal"
              className="text-xs text-[#6B7280] hover:text-[#9CA3AF] transition"
            >
              Skip to Portal →
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile step indicator */}
          <div className="md:hidden px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-[#6B7280]">Step {step + 1} of {STEP_COMPONENTS.length}</span>
            <Link to="/portal" className="text-xs text-[#F5A623]">Skip</Link>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 max-w-3xl">
            <StepComponent />
          </div>

          {/* Bottom nav */}
          <div className="border-t border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between flex-shrink-0">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[#9CA3AF] hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm ${
                isLast
                  ? 'text-white bg-[#10B981] hover:bg-[#059669]'
                  : 'text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800]'
              }`}
            >
              {isLast ? (
                <>
                  Create Practice Profile
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
