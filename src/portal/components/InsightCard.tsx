import { Insight } from '../types';
import { AlertCircle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const priorityConfig = {
  high: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  medium: { icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

interface Props {
  insight: Insight;
  className?: string;
}

export default function InsightCard({ insight, className }: Props) {
  const config = priorityConfig[insight.priority];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-xl border p-4 flex gap-3 transition-all duration-200',
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.color)} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[#F9FAFB]">{insight.title}</h4>
        <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{insight.description}</p>
      </div>
    </div>
  );
}
