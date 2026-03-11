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
  { label: 'Giselle / Growth', icon: TrendingUp, path: '/portal/giselle', accent: 'text-emerald-500' },
  { label: 'Miles / Management', icon: Settings2, path: '/portal/miles', accent: 'text-blue-500' },
  { label: 'Devon / Development', icon: GraduationCap, path: '/portal/devon', accent: 'text-violet-500' },
  { label: 'Alma / Academy', icon: BookOpen, path: '/portal/alma', accent: 'text-amber-500' },
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
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">NG</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">NextGen Portal</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
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
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('w-[18px] h-[18px]', active ? 'text-white' : item.accent || 'text-gray-400')}
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
