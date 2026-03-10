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
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pillar</span>
          <div className="flex gap-1">
            {pillarFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setPillarFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  pillarFilter === f.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
          <div className="flex gap-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  statusFilter === f.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No milestones match the selected filters.</p>
        ) : (
          filtered.map((ms, i) => (
            <TimelineItem key={ms.id} milestone={ms} isLast={i === filtered.length - 1} />
          ))
        )}
      </div>
    </div>
  );
}
