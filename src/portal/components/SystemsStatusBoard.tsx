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
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden', className)}>
      <div className="px-5 py-3.5 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {workflows.map((wf) => (
          <div key={wf.id} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-700">{wf.name}</span>
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
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden', className)}>
      <div className="px-5 py-3.5 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-gray-50">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50">
            {asset.enabled ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-700">{asset.name}</span>
            </div>
            {asset.status && (
              <span className={cn(
                'text-[11px] font-medium',
                asset.enabled ? 'text-gray-500' : 'text-gray-400'
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
