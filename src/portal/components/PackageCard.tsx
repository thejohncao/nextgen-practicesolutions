import { Package } from '../types';
import StatusBadge from './StatusBadge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const tierLabels: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  scale: 'Scale',
  enterprise: 'Enterprise',
};

interface Props {
  pkg: Package;
  className?: string;
}

export default function PackageCard({ pkg, className }: Props) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{pkg.name}</h3>
          <span className="text-xs text-gray-400">{tierLabels[pkg.tier]} tier</span>
        </div>
        <StatusBadge status={pkg.status} />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{pkg.scope}</p>

      {pkg.keyResults.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {pkg.keyResults.map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-medium bg-gray-50 text-gray-700 px-2 py-1 rounded-md"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-gray-50 mt-auto">
        <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-xs text-gray-500">Next: {pkg.nextMilestone}</span>
      </div>
    </div>
  );
}
