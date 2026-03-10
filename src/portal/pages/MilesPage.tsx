import { getPillar } from '../data/pillars';
import {
  milesHeroKPIs,
  milesDetailKPIs,
  packages,
  insights,
  milesWorkflows,
  speedToLeadTrend,
} from '../data/mock';
import PillarHero from '../components/PillarHero';
import SectionHeader from '../components/SectionHeader';
import MetricGrid from '../components/MetricGrid';
import PackageCard from '../components/PackageCard';
import InsightCard from '../components/InsightCard';
import { WorkflowStatusBoard } from '../components/SystemsStatusBoard';
import MiniChart from '../components/MiniChart';
import CTACard from '../components/CTACard';

export default function MilesPage() {
  const pillar = getPillar('miles')!;
  const milesPackages = packages.filter((p) => p.pillarSlug === 'miles');
  const milesInsights = insights.filter((i) => i.pillarSlug === 'miles');

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <PillarHero pillar={pillar} kpis={milesHeroKPIs} />

      {/* Operations Overview */}
      <SectionHeader title="Operations Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricGrid title="Speed-to-Lead" metrics={milesDetailKPIs.speedToLead} />
        <MetricGrid title="Booking & Show Performance" metrics={milesDetailKPIs.bookingShow} />
        <MetricGrid title="Recall & Retention" metrics={milesDetailKPIs.recallRetention} />
        <MetricGrid title="Revenue & AR" metrics={milesDetailKPIs.revenueAR} />
        <MetricGrid title="Team Systems" metrics={milesDetailKPIs.teamSystems} />
        <MiniChart data={speedToLeadTrend} color="#3B82F6" title="Speed-to-Lead Trend (min)" />
      </div>

      {/* Active Packages */}
      <SectionHeader title="Active Packages" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milesPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Workflow Status Board */}
      <WorkflowStatusBoard title="Systems / Workflow Status" workflows={milesWorkflows} />

      {/* Insights */}
      <SectionHeader title="Insights" />
      <div className="space-y-3">
        {milesInsights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>

      {/* CTA */}
      <CTACard
        title="Ask Miles to fix an operational issue"
        buttonLabel="Create ops request"
        accent="miles"
      />
    </div>
  );
}
