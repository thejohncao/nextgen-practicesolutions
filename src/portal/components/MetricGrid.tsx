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
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden', className)}>
      <div className="px-5 py-3.5 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {metrics.map((m, i) => (
          <div key={m.id || i} className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-gray-500">{m.label}</span>
            <span className={cn(
              'text-sm font-semibold',
              m.changeDirection === 'up' ? 'text-emerald-600' : m.changeDirection === 'down' ? 'text-red-600' : 'text-gray-900'
            )}>
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
