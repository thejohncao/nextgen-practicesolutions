import { getPillar } from '../data/pillars';
import {
  giselleAssets as mockGiselleAssets,
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

export default function GisellePage() {
  const pillar = getPillar('giselle')!;
  const { isDemo, getItemEnabled, toggleItem } = usePractice();
  const {
    giselleAssets,
    giselleHeroKPIs,
    giselleDetailKPIs,
    packages,
    insights,
    newPatientTrend,
  } = usePracticeData();

  const gisellePackages = packages.filter((p) => p.pillarSlug === 'giselle');
  const giselleInsights = insights.filter((i) => i.pillarSlug === 'giselle');

  const checklistItems = mockGiselleAssets.map((a) => ({
    id: a.id,
    name: a.name,
    enabled: getItemEnabled('giselle', a.id),
  }));

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <div data-tour="giselle-hero"><PillarHero pillar={pillar} kpis={giselleHeroKPIs} /></div>

      {!isDemo && <NeedsSetupBanner />}

      {/* Growth Overview */}
      <SectionHeader title="Growth Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricGrid title="New Patient Volume" metrics={giselleDetailKPIs.newPatientVolume} />
        <MetricGrid title="Marketing Performance" metrics={giselleDetailKPIs.marketingPerformance} />
        <MetricGrid title="Website Conversion" metrics={giselleDetailKPIs.websiteConversion} />
        <MetricGrid title="Reputation & Presence" metrics={giselleDetailKPIs.reputationPresence} />
      </div>

      {/* Chart */}
      <MiniChart data={newPatientTrend} color="#1EC97F" title="New Patient Trend (6 months)" />

      {/* Active Packages */}
      <SectionHeader title="Active Packages" />
      {gisellePackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gisellePackages.map((pkg) => (
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
          title="Growth Systems Checklist"
          items={checklistItems}
          onToggle={(id) => toggleItem('giselle', id)}
        />
      )}

      {/* Systems & Assets */}
      <AssetStatusBoard title="Systems & Assets" assets={giselleAssets} />

      {/* Recommendations */}
      <SectionHeader title="Recommendations" />
      {giselleInsights.length > 0 ? (
        <div className="space-y-3">
          {giselleInsights.map((ins) => (
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
        title="Ask Giselle to launch or improve something"
        buttonLabel="Create growth request"
        accent="giselle"
      />
    </div>
  );
}
