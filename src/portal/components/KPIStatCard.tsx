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
        'bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] p-5 flex flex-col gap-1.5 shadow-glass transition-all duration-200 hover:border-white/[0.10]',
        className
      )}
    >
      <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">{label}</span>
      <span className={cn('text-2xl font-bold text-[#F9FAFB]', accent)}>{value}</span>
      {change && (
        <div className="flex items-center gap-1 mt-0.5">
          {changeDirection === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
          {changeDirection === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
          {changeDirection === 'flat' && <Minus className="w-3.5 h-3.5 text-[#6B7280]" />}
          <span
            className={cn(
              'text-xs font-medium',
              changeDirection === 'up' && 'text-emerald-400',
              changeDirection === 'down' && 'text-red-400',
              changeDirection === 'flat' && 'text-[#6B7280]'
            )}
          >
            {change} vs prior period
          </span>
        </div>
      )}
    </div>
  );
}
