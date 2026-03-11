import { useState } from 'react';
import { milestones } from '../data/mock';
import { PillarSlug, MilestoneStatus } from '../types';
import SectionHeader from '../components/SectionHeader';
import TimelineItem from '../components/TimelineItem';
import { cn } from '@/lib/utils';

const pillarFilters: { label: string; value: PillarSlug | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Giselle', value: 'giselle' },
  { label: 'Miles', value: 'miles' },
  { label: 'Devon', value: 'devon' },
  { label: 'Alma', value: 'alma' },
];

const statusFilters: { label: string; value: MilestoneStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Upcoming', value: 'upcoming' },
];

export default function TimelinePage() {
  const [pillarFilter, setPillarFilter] = useState<PillarSlug | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<MilestoneStatus | 'all'>('all');

  const filtered = milestones
    .filter((m) => pillarFilter === 'all' || m.pillarSlug === pillarFilter)
    .filter((m) => statusFilter === 'all' || m.status === statusFilter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      <SectionHeader
        title="Timeline"
        subtitle="Unified engagement tracker across all pillars"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Pillar</span>
          <div className="flex gap-1">
            {pillarFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setPillarFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  pillarFilter === f.value
                    ? 'bg-white/[0.08] text-[#F9FAFB]'
                    : 'bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.10]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Status</span>
          <div className="flex gap-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  statusFilter === f.value
                    ? 'bg-white/[0.08] text-[#F9FAFB]'
                    : 'bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.10]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-[#6B7280] text-center py-8">No milestones match the selected filters.</p>
        ) : (
          filtered.map((ms, i) => (
            <TimelineItem key={ms.id} milestone={ms} isLast={i === filtered.length - 1} />
          ))
        )}
      </div>
    </div>
  );
}
