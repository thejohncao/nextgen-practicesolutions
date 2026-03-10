import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Settings2, GraduationCap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pillars } from '../data/pillars';
import {
  globalKPIs,
  pillarSummaries,
  packages,
  milestones,
  clientRequests,
  newPatientTrend,
} from '../data/mock';
import KPIStatCard from '../components/KPIStatCard';
import SectionHeader from '../components/SectionHeader';
import PackageCard from '../components/PackageCard';
import TimelineItem from '../components/TimelineItem';
import RequestTable from '../components/RequestTable';
import MiniChart from '../components/MiniChart';

const pillarIcons: Record<string, React.ElementType> = {
  giselle: TrendingUp,
  miles: Settings2,
  devon: GraduationCap,
};

const pillarGradients: Record<string, string> = {
  giselle: 'from-emerald-600 to-emerald-400',
  miles: 'from-blue-600 to-blue-400',
  devon: 'from-violet-600 to-violet-400',
};

const pillarBgs: Record<string, string> = {
  giselle: 'bg-emerald-50/50 border-emerald-100',
  miles: 'bg-blue-50/50 border-blue-100',
  devon: 'bg-violet-50/50 border-violet-100',
};

export default function Dashboard() {
  const recentMilestones = [...milestones]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const openRequests = clientRequests.filter((r) => r.status !== 'done').slice(0, 4);

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">NextGen Portal</h1>
        <p className="text-sm text-gray-500 mt-1">Your practice operating system</p>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {globalKPIs.map((kpi) => (
          <KPIStatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeDirection={kpi.changeDirection}
          />
        ))}
      </div>

      {/* Pillar Performance Cards */}
      <SectionHeader title="Pillar Performance" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const summary = pillarSummaries.find((s) => s.slug === pillar.slug);
          const Icon = pillarIcons[pillar.slug];
          if (!summary) return null;

          return (
            <div
              key={pillar.slug}
              className={cn(
                'rounded-xl border p-5 flex flex-col gap-4',
                pillarBgs[pillar.slug]
              )}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-white',
                    pillarGradients[pillar.slug]
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{pillar.agentName}</h3>
                  <p className="text-xs text-gray-500">{pillar.name}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{pillar.description}</p>

              {/* Top KPIs */}
              <div className="space-y-2">
                {summary.topKPIs.map((kpi, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{kpi.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{kpi.value}</span>
                      <span className="text-[11px] font-medium text-emerald-600">{kpi.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                {summary.activePackages} active {summary.activePackages === 1 ? 'package' : 'packages'}
              </div>

              {/* Alert */}
              <div className="flex items-start gap-2 bg-white/60 rounded-lg p-3 border border-gray-100">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-gray-600 leading-relaxed">{summary.alert}</span>
              </div>

              <Link
                to={`/portal/${pillar.slug}`}
                className={cn(
                  'inline-flex items-center justify-center gap-2 mt-auto px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r transition-all shadow-sm',
                  pillarGradients[pillar.slug]
                )}
              >
                Open {pillar.agentName}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Active Engagements */}
      <SectionHeader
        title="Active Engagements"
        subtitle={`${packages.filter((p) => p.status === 'active').length} active packages across all pillars`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages
          .filter((p) => p.status === 'active')
          .slice(0, 6)
          .map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
      </div>

      {/* Charts + Timeline + Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <div>
          <SectionHeader title="Recent Timeline" className="mb-4" action={
            <Link to="/portal/timeline" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition">
              View all
            </Link>
          } />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            {recentMilestones.map((ms, i) => (
              <TimelineItem key={ms.id} milestone={ms} isLast={i === recentMilestones.length - 1} />
            ))}
          </div>
        </div>

        {/* Right side — chart + requests */}
        <div className="space-y-6">
          <MiniChart data={newPatientTrend} color="#10B981" title="New Patient Trend" />

          <SectionHeader title="Open Requests" className="mb-0" action={
            <Link to="/portal/requests" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition">
              View all
            </Link>
          } />
          <RequestTable requests={openRequests} compact />
        </div>
      </div>
    </div>
  );
}
