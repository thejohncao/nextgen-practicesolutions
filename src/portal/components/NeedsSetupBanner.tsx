import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NeedsSetupBanner() {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-center space-y-3">
      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
      <h3 className="text-sm font-semibold text-[#F9FAFB]">Complete onboarding to see your data</h3>
      <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
        Your practice hasn't been set up yet. Complete the onboarding process to activate your dashboard and start tracking KPIs.
      </p>
      <Link
        to="/portal/onboarding"
        className="inline-block px-5 py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm no-underline"
      >
        Start Onboarding
      </Link>
    </div>
  );
}
