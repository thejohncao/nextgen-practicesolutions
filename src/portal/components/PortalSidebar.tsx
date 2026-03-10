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
  LogOut,
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

export default function PortalSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/portal') return location.pathname === '/portal';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">NG</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900 leading-tight">NextGen Portal</h1>
          <p className="text-[11px] text-gray-400 leading-tight">Practice Operating System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          to="/portal/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
