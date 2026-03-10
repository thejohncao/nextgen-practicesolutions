import { Insight } from '../types';
import { AlertCircle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const priorityConfig = {
  high: { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  medium: { icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  low: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
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
        'rounded-xl border p-4 flex gap-3',
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.color)} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
      </div>
    </div>
  );
}
