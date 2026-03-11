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
        'bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] p-5 shadow-glass flex flex-col gap-3 transition-all duration-200 hover:border-white/[0.10]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#F9FAFB]">{pkg.name}</h3>
          <span className="text-xs text-[#6B7280]">{tierLabels[pkg.tier]} tier</span>
        </div>
        <StatusBadge status={pkg.status} />
      </div>

      <p className="text-xs text-[#9CA3AF] leading-relaxed">{pkg.scope}</p>

      {pkg.keyResults.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {pkg.keyResults.map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-medium bg-white/[0.06] text-[#9CA3AF] px-2 py-1 rounded-md"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-white/[0.04] mt-auto">
        <ArrowRight className="w-3.5 h-3.5 text-[#6B7280] flex-shrink-0" />
        <span className="text-xs text-[#9CA3AF]">Next: {pkg.nextMilestone}</span>
      </div>
    </div>
  );
}
