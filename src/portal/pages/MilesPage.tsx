import { getPillar } from '../data/pillars';
import {
  milesWorkflows as mockMilesWorkflows,
} from '../data/mock';
import PillarHero from '../components/PillarHero';
import SectionHeader from '../components/SectionHeader';
import MetricGrid from '../components/MetricGrid';
import PackageCard from '../components/PackageCard';
import InsightCard from '../components/InsightCard';
import { WorkflowStatusBoard } from '../components/SystemsStatusBoard';
import MiniChart from '../components/MiniChart';
import CTACard from '../components/CTACard';
import PillarChecklist from '../components/PillarChecklist';
import NeedsSetupBanner from '../components/NeedsSetupBanner';
import { usePractice } from '../context/PracticeContext';
import { usePracticeData } from '../hooks/usePracticeData';

export default function MilesPage() {
  const pillar = getPillar('miles')!;
  const { isDemo, getItemEnabled, toggleItem } = usePractice();
  const {
    milesWorkflows,
    milesHeroKPIs,
    milesDetailKPIs,
    packages,
    insights,
    speedToLeadTrend,
  } = usePracticeData();

  const milesPackages = packages.filter((p) => p.pillarSlug === 'miles');
  const milesInsights = insights.filter((i) => i.pillarSlug === 'miles');

  const checklistItems = mockMilesWorkflows.map((w) => ({
    id: w.id,
    name: w.name,
    enabled: getItemEnabled('miles', w.id),
  }));

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <div data-tour="miles-hero"><PillarHero pillar={pillar} kpis={milesHeroKPIs} /></div>

      {!isDemo && <NeedsSetupBanner />}

      {/* Operations Overview */}
      <SectionHeader title="Operations Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricGrid title="Speed-to-Lead" metrics={milesDetailKPIs.speedToLead} />
        <MetricGrid title="Booking & Show Performance" metrics={milesDetailKPIs.bookingShow} />
        <MetricGrid title="Recall & Retention" metrics={milesDetailKPIs.recallRetention} />
        <MetricGrid title="Revenue & AR" metrics={milesDetailKPIs.revenueAR} />
        <MetricGrid title="Team Systems" metrics={milesDetailKPIs.teamSystems} />
        <MiniChart data={speedToLeadTrend} color="#E11D48" title="Speed-to-Lead Trend (min)" />
      </div>

      {/* Active Packages */}
      <SectionHeader title="Active Packages" />
      {milesPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milesPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5">
          <p className="text-sm text-[#6B7280] text-center py-4">No active packages yet.</p>
        </div>
      )}

      {/* Onboarding Checklist (non-demo only) */}
      {!isDemo && (
        <PillarChecklist
          title="Workflow Activation Checklist"
          items={checklistItems}
          onToggle={(id) => toggleItem('miles', id)}
        />
      )}

      {/* Workflow Status Board */}
      <WorkflowStatusBoard title="Systems / Workflow Status" workflows={milesWorkflows} />

      {/* Insights */}
      <SectionHeader title="Insights" />
      {milesInsights.length > 0 ? (
        <div className="space-y-3">
          {milesInsights.map((ins) => (
            <InsightCard key={ins.id} insight={ins} />
          ))}
        </div>
      ) : (
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5">
          <p className="text-sm text-[#6B7280] text-center py-4">No insights yet. Complete onboarding to receive insights.</p>
        </div>
      )}

      {/* CTA */}
      <CTACard
        title="Ask Miles to fix an operational issue"
        buttonLabel="Create ops request"
        accent="miles"
      />
    </div>
  );
}
