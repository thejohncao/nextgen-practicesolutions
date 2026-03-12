import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { NarrativePlanProvider, useNarrativePlan } from '../context/NarrativePlanContext';
import NarrativeNav from './NarrativeNav';
import ModeToggle from './ModeToggle';
import '../styles/narrative.css';

function NarrativeLayoutInner() {
  const { plan, patient, mode, setMode, loading } = useNarrativePlan();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="narrative-root flex items-center justify-center min-h-screen" data-narrative-mode="build">
        <div className="animate-pulse text-[var(--narrative-text-secondary)]">Loading plan...</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="narrative-root flex items-center justify-center min-h-screen" data-narrative-mode="build">
        <div className="text-center">
          <p className="text-[var(--narrative-text-secondary)] mb-4">Plan not found</p>
          <button
            onClick={() => navigate('/narrative')}
            className="text-narrative-gold hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const patientName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : 'Unknown Patient';

  // Present mode: full-screen with no chrome
  if (mode === 'present') {
    return (
      <div className="narrative-root" data-narrative-mode="present">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle mode={mode} onToggle={setMode} />
        </div>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="narrative-root" data-narrative-mode="build">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--narrative-border)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/narrative')}
            className="p-2 rounded-lg hover:bg-black/5 transition narrative-touch"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--narrative-text-secondary)]" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-[var(--narrative-text)]">
              {patientName}
            </h1>
            <p className="text-sm text-[var(--narrative-text-secondary)]">
              {plan.provider_name} &middot; Treatment Plan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle mode={mode} onToggle={setMode} />
        </div>
      </header>

      {/* Step Navigation */}
      <div className="border-b border-[var(--narrative-border)] py-2">
        <NarrativeNav />
      </div>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function NarrativeLayout() {
  const { planId } = useParams<{ planId: string }>();

  if (!planId) {
    return <div>Missing plan ID</div>;
  }

  return (
    <NarrativePlanProvider planId={planId}>
      <NarrativeLayoutInner />
    </NarrativePlanProvider>
  );
}
