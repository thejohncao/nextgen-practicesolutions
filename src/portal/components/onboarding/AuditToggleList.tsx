import { cn } from '@/lib/utils';

interface AuditItem {
  id: string;
  name: string;
  enabled: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  items: AuditItem[];
  onToggle: (id: string) => void;
  accentColor?: string; // tailwind color class for enabled state
}

export default function AuditToggleList({ title, subtitle, items, onToggle, accentColor = 'bg-emerald-400' }: Props) {
  const enabledCount = items.filter((i) => i.enabled).length;

  return (
    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F9FAFB]">{title}</h3>
          {subtitle && <p className="text-xs text-[#6B7280] mt-0.5">{subtitle}</p>}
        </div>
        <span className="text-xs text-[#6B7280] font-medium">
          {enabledCount} / {items.length} active
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition group"
          >
            <span className={cn('text-sm', item.enabled ? 'text-[#F9FAFB]' : 'text-[#6B7280]')}>
              {item.name}
            </span>
            {/* Toggle switch */}
            <div
              className={cn(
                'relative w-9 h-5 rounded-full transition-colors duration-200',
                item.enabled ? 'bg-[#F5A623]' : 'bg-white/[0.10]'
              )}
            >
              <div
                className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
                  item.enabled ? 'translate-x-4' : 'translate-x-0.5'
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
