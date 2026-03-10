import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  value: string;
  change?: string;
  changeDirection?: 'up' | 'down' | 'flat';
  accent?: string;
  className?: string;
}

export default function KPIStatCard({ label, value, change, changeDirection, accent, className }: Props) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-1.5 shadow-sm',
        className
      )}
    >
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={cn('text-2xl font-bold text-gray-900', accent)}>{value}</span>
      {change && (
        <div className="flex items-center gap-1 mt-0.5">
          {changeDirection === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />}
          {changeDirection === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
          {changeDirection === 'flat' && <Minus className="w-3.5 h-3.5 text-gray-400" />}
          <span
            className={cn(
              'text-xs font-medium',
              changeDirection === 'up' && 'text-emerald-600',
              changeDirection === 'down' && 'text-red-600',
              changeDirection === 'flat' && 'text-gray-400'
            )}
          >
            {change} vs prior period
          </span>
        </div>
      )}
    </div>
  );
}
