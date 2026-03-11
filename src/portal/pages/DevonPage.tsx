import { getPillar } from '../data/pillars';
import {
  devonTools as mockDevonTools,
} from '../data/mock';
import PillarHero from '../components/PillarHero';
import SectionHeader from '../components/SectionHeader';
import MetricGrid from '../components/MetricGrid';
import PackageCard from '../components/PackageCard';
import InsightCard from '../components/InsightCard';
import { AssetStatusBoard } from '../components/SystemsStatusBoard';
import MiniChart from '../components/MiniChart';
import CTACard from '../components/CTACard';
import PillarChecklist from '../components/PillarChecklist';
import NeedsSetupBanner from '../components/NeedsSetupBanner';
import { usePractice } from '../context/PracticeContext';
import { usePracticeData } from '../hooks/usePracticeData';

export default function DevonPage() {
  const pillar = getPillar('devon')!;
  const { isDemo, getItemEnabled, toggleItem } = usePractice();
  const {
    devonTools,
    devonHeroKPIs,
    devonDetailKPIs,
    packages,
    insights,
    caseAcceptanceTrend,
  } = usePracticeData();

  const devonPackages = packages.filter((p) => p.pillarSlug === 'devon');
  const devonInsights = insights.filter((i) => i.pillarSlug === 'devon');

  const checklistItems = mockDevonTools.map((t) => ({
    id: t.id,
    name: t.name,
    enabled: getItemEnabled('devon', t.id),
  }));

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <div data-tour="devon-hero"><PillarHero pillar={pillar} kpis={devonHeroKPIs} /></div>

      {!isDemo && <NeedsSetupBanner />}

      {/* Development Overview */}
      <SectionHeader title="Development Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricGrid title="Case Acceptance Performance" metrics={devonDetailKPIs.caseAcceptance} />
        <MetricGrid title="Treatment Opportunity" metrics={devonDetailKPIs.treatmentOpportunity} />
        <MetricGrid title="Front Desk Conversion" metrics={devonDetailKPIs.frontDeskConversion} />
        <MetricGrid title="Training & Coaching" metrics={devonDetailKPIs.trainingCoaching} />
      </div>

      {/* Chart */}
      <MiniChart data={caseAcceptanceTrend} color="#6366F1" title="Case Acceptance Trend (%)" />

      {/* Active Packages */}
      <SectionHeader title="Active Packages" />
      {devonPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devonPackages.map((pkg) => (
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
          title="Tools & Programs Checklist"
          items={checklistItems}
          onToggle={(id) => toggleItem('devon', id)}
        />
      )}

      {/* Tools & Programs */}
      <AssetStatusBoard title="Tools & Programs" assets={devonTools} />

      {/* Recommendations */}
      <SectionHeader title="Recommendations" />
      {devonInsights.length > 0 ? (
        <div className="space-y-3">
          {devonInsights.map((ins) => (
            <InsightCard key={ins.id} insight={ins} />
          ))}
        </div>
      ) : (
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5">
          <p className="text-sm text-[#6B7280] text-center py-4">No recommendations yet. Complete onboarding to receive insights.</p>
        </div>
      )}

      {/* CTA */}
      <CTACard
        title="Ask Devon to improve conversions"
        buttonLabel="Create development request"
        accent="devon"
      />
    </div>
  );
}
