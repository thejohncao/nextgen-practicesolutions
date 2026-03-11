import { getPillar } from '../data/pillars';
import {
  giselleHeroKPIs,
  giselleDetailKPIs,
  packages,
  insights,
  giselleAssets as mockGiselleAssets,
  newPatientTrend,
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
import { usePractice } from '../context/PracticeContext';
import { usePracticeData } from '../hooks/usePracticeData';

export default function GisellePage() {
  const pillar = getPillar('giselle')!;
  const gisellePackages = packages.filter((p) => p.pillarSlug === 'giselle');
  const giselleInsights = insights.filter((i) => i.pillarSlug === 'giselle');
  const { isDemo, getItemEnabled, toggleItem } = usePractice();
  const { giselleAssets } = usePracticeData();

  const checklistItems = mockGiselleAssets.map((a) => ({
    id: a.id,
    name: a.name,
    enabled: getItemEnabled('giselle', a.id),
  }));

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <div data-tour="giselle-hero"><PillarHero pillar={pillar} kpis={giselleHeroKPIs} /></div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gisellePackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

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
      <div className="space-y-3">
        {giselleInsights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>

      {/* CTA */}
      <CTACard
        title="Ask Giselle to launch or improve something"
        buttonLabel="Create growth request"
        accent="giselle"
      />
    </div>
  );
}
