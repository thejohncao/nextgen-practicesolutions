import { cn } from '@/lib/utils';

type Status = string;

const statusStyles: Record<string, string> = {
  // Package / workflow statuses
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  onboarding: 'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
  paused: 'bg-amber-50 text-amber-700 border-amber-200',
  planned: 'bg-gray-50 text-gray-600 border-gray-200',
  needs_attention: 'bg-red-50 text-red-700 border-red-200',
  // Request statuses
  new: 'bg-violet-50 text-violet-700 border-violet-200',
  reviewing: 'bg-amber-50 text-amber-700 border-amber-200',
  waiting_on_client: 'bg-orange-50 text-orange-700 border-orange-200',
  done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  // Milestone
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  upcoming: 'bg-gray-50 text-gray-600 border-gray-200',
  // Priority
  urgent: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-gray-50 text-gray-600 border-gray-200',
};

const statusLabels: Record<string, string> = {
  in_progress: 'In Progress',
  needs_attention: 'Needs Attention',
  waiting_on_client: 'Waiting on Client',
};

interface Props {
  status: Status;
  className?: string;
}

export default function StatusBadge({ status, className }: Props) {
  const style = statusStyles[status] || 'bg-gray-50 text-gray-600 border-gray-200';
  const label = statusLabels[status] || status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
