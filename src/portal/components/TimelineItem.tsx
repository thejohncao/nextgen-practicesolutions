import { Milestone } from '../types';
import StatusBadge from './StatusBadge';
import {
  Rocket,
  Zap,
  GraduationCap,
  Users,
  Globe,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ElementType> = {
  package_activated: Rocket,
  workflow_launched: Zap,
  training_completed: GraduationCap,
  review_meeting: Users,
  website_milestone: Globe,
  dashboard_delivered: BarChart3,
  recommendation: Lightbulb,
};

const pillarDots: Record<string, string> = {
  giselle: 'bg-emerald-500',
  miles: 'bg-blue-500',
  devon: 'bg-violet-500',
};

const pillarLabels: Record<string, string> = {
  giselle: 'Giselle',
  miles: 'Miles',
  devon: 'Devon',
};

interface Props {
  milestone: Milestone;
  isLast?: boolean;
}

export default function TimelineItem({ milestone, isLast }: Props) {
  const Icon = typeIcons[milestone.type] || Lightbulb;

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white',
            milestone.status === 'completed' ? 'border-emerald-300' : milestone.status === 'in_progress' ? 'border-blue-300' : 'border-gray-200'
          )}
        >
          <Icon
            className={cn(
              'w-4 h-4',
              milestone.status === 'completed' ? 'text-emerald-500' : milestone.status === 'in_progress' ? 'text-blue-500' : 'text-gray-400'
            )}
          />
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-200 my-1" />}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="text-sm font-medium text-gray-900">{milestone.title}</h4>
          <StatusBadge status={milestone.status} />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{milestone.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn('w-2 h-2 rounded-full', pillarDots[milestone.pillarSlug])} />
          <span className="text-[11px] text-gray-400 font-medium">{pillarLabels[milestone.pillarSlug]}</span>
          <span className="text-[11px] text-gray-300">·</span>
          <span className="text-[11px] text-gray-400">
            {new Date(milestone.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
