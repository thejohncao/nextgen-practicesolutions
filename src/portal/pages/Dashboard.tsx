import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Settings2, GraduationCap, BookOpen, AlertCircle } from 'lucide-react';
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
  alma: BookOpen,
};

const pillarGradients: Record<string, string> = {
  giselle: 'from-emerald-500 to-emerald-400',
  miles: 'from-rose-600 to-rose-400',
  devon: 'from-indigo-500 to-indigo-400',
  alma: 'from-amber-500 to-amber-400',
};

const pillarBorderAccent: Record<string, string> = {
  giselle: 'border-l-emerald-500/40',
  miles: 'border-l-rose-500/40',
  devon: 'border-l-indigo-500/40',
  alma: 'border-l-amber-500/40',
};

const pillarGlowHover: Record<string, string> = {
  giselle: 'hover:shadow-glow-giselle',
  miles: 'hover:shadow-glow-miles',
  devon: 'hover:shadow-glow-devon',
  alma: 'hover:shadow-glow-alma',
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
        <h1 className="text-2xl font-bold text-[#F9FAFB]">NextGen Portal</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">Your practice operating system</p>
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

      {/* 60/40 Split — Metrics & Timeline | Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 60% — Chart, Timeline, Requests */}
        <div className="lg:col-span-7 space-y-6">
          <MiniChart data={newPatientTrend} color="#1EC97F" title="New Patient Trend" />

          <SectionHeader title="Recent Timeline" action={
            <Link to="/portal/timeline" className="text-xs font-medium text-[#6B7280] hover:text-[#F9FAFB] transition">
              View all
            </Link>
          } />
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5">
            {recentMilestones.map((ms, i) => (
              <TimelineItem key={ms.id} milestone={ms} isLast={i === recentMilestones.length - 1} />
            ))}
          </div>

          <SectionHeader title="Open Requests" action={
            <Link to="/portal/requests" className="text-xs font-medium text-[#6B7280] hover:text-[#F9FAFB] transition">
              View all
            </Link>
          } />
          <RequestTable requests={openRequests} compact />
        </div>

        {/* Right 40% — Stacked Pillar Cards */}
        <div className="lg:col-span-5 space-y-4">
          <SectionHeader title="Pillar Performance" />

          {/* Mobile: 2x2 grid, Desktop: stacked */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {pillars.map((pillar, idx) => {
              const summary = pillarSummaries.find((s) => s.slug === pillar.slug);
              const Icon = pillarIcons[pillar.slug];
              if (!summary) return null;

              return (
                <Link
                  key={pillar.slug}
                  to={`/portal/${pillar.slug}`}
                  className={cn(
                    'bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] border-l-2 p-4 lg:p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/[0.10] no-underline',
                    pillarBorderAccent[pillar.slug],
                    pillarGlowHover[pillar.slug]
                  )}
                  style={{ zIndex: pillars.length - idx }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white',
                        pillarGradients[pillar.slug]
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#F9FAFB]">{pillar.agentName}</h3>
                      <p className="text-[11px] text-[#6B7280]">{pillar.name}</p>
                    </div>
                    <span className="hidden lg:flex items-center gap-1 text-[11px] text-[#6B7280]">
                      {summary.activePackages} pkg{summary.activePackages !== 1 && 's'}
                    </span>
                  </div>

                  {/* Top KPIs — hide on mobile for compact cards */}
                  <div className="hidden lg:block space-y-1.5">
                    {summary.topKPIs.map((kpi, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-[#9CA3AF]">{kpi.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#F9FAFB]">{kpi.value}</span>
                          <span className="text-[11px] font-medium text-emerald-400">{kpi.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Alert — desktop only */}
                  <div className="hidden lg:flex items-start gap-2 bg-white/[0.03] rounded-lg p-2.5 border border-white/[0.04]">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-[#9CA3AF] leading-relaxed">{summary.alert}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-medium text-[#9CA3AF] mt-auto">
                    Open {pillar.agentName}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
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
    </div>
  );
}
