import { cn } from '@/lib/utils';

interface MetricItem {
  id?: string;
  label: string;
  value: string;
  changeDirection?: 'up' | 'down' | 'flat';
}

interface Props {
  title: string;
  metrics: MetricItem[];
  className?: string;
}

export default function MetricGrid({ title, metrics, className }: Props) {
  return (
    <div className={cn('bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden transition-all duration-200 hover:border-white/[0.10]', className)}>
      <div className="px-5 py-3.5 border-b border-white/[0.04]">
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {metrics.map((m, i) => (
          <div key={m.id || i} className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-[#9CA3AF]">{m.label}</span>
            <span className={cn(
              'text-sm font-semibold',
              m.changeDirection === 'up' ? 'text-emerald-400' : m.changeDirection === 'down' ? 'text-red-400' : 'text-[#F9FAFB]'
            )}>
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
