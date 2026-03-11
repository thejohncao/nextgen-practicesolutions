import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  enabled: boolean;
}

interface Props {
  title?: string;
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}

export default function PillarChecklist({ title = 'Onboarding Checklist', items, onToggle }: Props) {
  const enabledCount = items.filter((i) => i.enabled).length;

  return (
    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280] font-medium">
            {enabledCount} / {items.length}
          </span>
          <div className="w-16 h-1.5 rounded-full bg-white/[0.06]">
            <div
              className="h-1.5 rounded-full bg-[#F5A623] transition-all duration-300"
              style={{ width: `${items.length > 0 ? (enabledCount / items.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition text-left"
          >
            {item.enabled ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-[#3A3B45] flex-shrink-0" />
            )}
            <span className={cn('text-sm', item.enabled ? 'text-[#9CA3AF] line-through' : 'text-[#F9FAFB]')}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
