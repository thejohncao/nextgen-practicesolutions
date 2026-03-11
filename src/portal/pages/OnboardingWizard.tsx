import { useNavigate, Link } from 'react-router-dom';
import { usePractice } from '../context/PracticeContext';
import { ArrowLeft, ArrowRight, Rocket } from 'lucide-react';
import OnboardingProgress from '../components/onboarding/OnboardingProgress';
import StepPracticeInfo from '../components/onboarding/StepPracticeInfo';
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
  const { onboardingState, setOnboardingStep, completeOnboarding, isDemo } = usePractice();

  // If no active practice or demo, redirect
  if (isDemo || !onboardingState) {
    return (
      <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#9CA3AF] mb-4">No practice selected for onboarding.</p>
          <Link to="/portal/create" className="text-[#F5A623] hover:underline text-sm">Create a practice</Link>
        </div>
      </div>
    );
  }

  const step = onboardingState.currentStep;
  const StepComponent = STEP_COMPONENTS[step] || STEP_COMPONENTS[0];
  const isLast = step === STEP_COMPONENTS.length - 1;

  const handleNext = () => {
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
    <div className="min-h-screen bg-[#0D0E14] flex">
      {/* Left sidebar — step indicator */}
      <div className="hidden md:flex flex-col w-64 border-r border-white/[0.06] p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-[#0B0C10] font-bold text-xs">NG</span>
          </div>
          <span className="text-sm font-semibold text-[#F9FAFB]">Onboarding</span>
        </div>
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
      <div className="flex-1 flex flex-col">
        {/* Mobile step indicator */}
        <div className="md:hidden px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">Step {step + 1} of {STEP_COMPONENTS.length}</span>
          <Link to="/portal" className="text-xs text-[#F5A623]">Skip</Link>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 max-w-2xl">
          <StepComponent />
        </div>

        {/* Bottom nav */}
        <div className="border-t border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between">
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
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm"
          >
            {isLast ? (
              <>
                Launch Practice
                <Rocket className="w-4 h-4" />
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
  );
}
