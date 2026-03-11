import { cn } from '@/lib/utils';

type Status = string;

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  live: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  onboarding: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  planned: 'bg-white/[0.06] text-[#9CA3AF] border-white/[0.08]',
  needs_attention: 'bg-red-500/10 text-red-400 border-red-500/20',
  new: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  reviewing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  waiting_on_client: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  upcoming: 'bg-white/[0.06] text-[#9CA3AF] border-white/[0.08]',
  urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-white/[0.06] text-[#9CA3AF] border-white/[0.08]',
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
  const style = statusStyles[status] || 'bg-white/[0.06] text-[#9CA3AF] border-white/[0.08]';
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
