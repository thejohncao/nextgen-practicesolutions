import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Settings2,
  GraduationCap,
  BookOpen,
  Clock,
  MessageSquarePlus,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/portal' },
  { label: 'Giselle / Growth', icon: TrendingUp, path: '/portal/giselle', accent: 'text-emerald-400' },
  { label: 'Miles / Management', icon: Settings2, path: '/portal/miles', accent: 'text-rose-400' },
  { label: 'Devon / Development', icon: GraduationCap, path: '/portal/devon', accent: 'text-indigo-400' },
  { label: 'Alma / Academy', icon: BookOpen, path: '/portal/alma', accent: 'text-amber-400' },
  { label: 'Timeline', icon: Clock, path: '/portal/timeline' },
  { label: 'Requests', icon: MessageSquarePlus, path: '/portal/requests' },
  { label: 'Settings', icon: Settings, path: '/portal/settings' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PortalMobileNav({ open, onClose }: Props) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/portal') return location.pathname === '/portal';
    return location.pathname.startsWith(path);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0D0E14] shadow-xl border-r border-white/[0.06]">
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <span className="text-[#0B0C10] font-bold text-xs">NG</span>
            </div>
            <span className="text-sm font-semibold text-[#F9FAFB]">NextGen Portal</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06]">
            <X className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'bg-white/[0.08] text-[#F9FAFB]'
                    : 'text-[#9CA3AF] hover:bg-white/[0.04] hover:text-[#F9FAFB]'
                )}
              >
                <item.icon
                  className={cn('w-[18px] h-[18px]', active ? 'text-[#F5A623]' : item.accent || 'text-[#6B7280]')}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
