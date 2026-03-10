import { getPillar } from '../data/pillars';
import {
  devonHeroKPIs,
  devonDetailKPIs,
  packages,
  insights,
  devonTools,
  caseAcceptanceTrend,
} from '../data/mock';
import PillarHero from '../components/PillarHero';
import SectionHeader from '../components/SectionHeader';
import MetricGrid from '../components/MetricGrid';
import PackageCard from '../components/PackageCard';
import InsightCard from '../components/InsightCard';
import { AssetStatusBoard } from '../components/SystemsStatusBoard';
import MiniChart from '../components/MiniChart';
import CTACard from '../components/CTACard';

export default function DevonPage() {
  const pillar = getPillar('devon')!;
  const devonPackages = packages.filter((p) => p.pillarSlug === 'devon');
  const devonInsights = insights.filter((i) => i.pillarSlug === 'devon');

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <PillarHero pillar={pillar} kpis={devonHeroKPIs} />

      {/* Development Overview */}
      <SectionHeader title="Development Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricGrid title="Case Acceptance Performance" metrics={devonDetailKPIs.caseAcceptance} />
        <MetricGrid title="Treatment Opportunity" metrics={devonDetailKPIs.treatmentOpportunity} />
        <MetricGrid title="Front Desk Conversion" metrics={devonDetailKPIs.frontDeskConversion} />
        <MetricGrid title="Training & Coaching" metrics={devonDetailKPIs.trainingCoaching} />
      </div>

      {/* Chart */}
      <MiniChart data={caseAcceptanceTrend} color="#8B5CF6" title="Case Acceptance Trend (%)" />

      {/* Active Packages */}
      <SectionHeader title="Active Packages" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devonPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Tools & Programs */}
      <AssetStatusBoard title="Tools & Programs" assets={devonTools} />

      {/* Recommendations */}
      <SectionHeader title="Recommendations" />
      <div className="space-y-3">
        {devonInsights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>

      {/* CTA */}
      <CTACard
        title="Ask Devon to improve conversions"
        buttonLabel="Create development request"
        accent="devon"
      />
    </div>
  );
}
