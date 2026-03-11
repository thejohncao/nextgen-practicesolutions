import { WorkflowItem, SystemAsset } from '../types';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface WorkflowBoardProps {
  title: string;
  workflows: WorkflowItem[];
  className?: string;
}

export function WorkflowStatusBoard({ title, workflows, className }: WorkflowBoardProps) {
  return (
    <div className={cn('bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden', className)}>
      <div className="px-5 py-3.5 border-b border-white/[0.04]">
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {workflows.map((wf) => (
          <div key={wf.id} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-[#9CA3AF]">{wf.name}</span>
            <StatusBadge status={wf.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface AssetBoardProps {
  title: string;
  assets: SystemAsset[];
  className?: string;
}

export function AssetStatusBoard({ title, assets, className }: AssetBoardProps) {
  return (
    <div className={cn('bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden', className)}>
      <div className="px-5 py-3.5 border-b border-white/[0.04]">
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-white/[0.04]">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04]">
            {asset.enabled ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm text-[#9CA3AF]">{asset.name}</span>
            </div>
            {asset.status && (
              <span className={cn(
                'text-[11px] font-medium',
                asset.enabled ? 'text-[#9CA3AF]' : 'text-[#6B7280]'
              )}>
                {asset.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
