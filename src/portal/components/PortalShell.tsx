import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import PortalSidebar from './PortalSidebar';
import PortalHeader from './PortalHeader';
import GuidedTour from './GuidedTour';
import { usePractice } from '../context/PracticeContext';
import { ArrowRight } from 'lucide-react';

export default function PortalShell() {
  const [tourActive, setTourActive] = useState(false);
  const { isDemo, onboardingState } = usePractice();
  const showOnboardingBanner = !isDemo && onboardingState && onboardingState.currentStep < 6 && !onboardingState.completedAt;

  return (
    <div className="flex min-h-screen bg-[#0D0E14]">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader onStartTour={() => setTourActive(true)} />
        {showOnboardingBanner && (
          <div className="bg-[#F5A623]/10 border-b border-[#F5A623]/20 px-4 lg:px-8 py-2.5 flex items-center justify-between">
            <span className="text-xs text-[#F5A623] font-medium">
              Onboarding in progress — step {onboardingState.currentStep + 1} of 6
            </span>
            <Link
              to="/portal/onboard"
              className="flex items-center gap-1 text-xs font-semibold text-[#F5A623] hover:text-[#E09800] transition"
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {tourActive && <GuidedTour onClose={() => setTourActive(false)} />}
    </div>
  );
}
