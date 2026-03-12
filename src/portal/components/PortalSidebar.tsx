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
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortalAuth } from '../context/PortalAuthContext';

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

export default function PortalSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/portal') return location.pathname === '/portal';
    return location.pathname.startsWith(path);
  };

  return (
    <aside data-tour="nav-sidebar" className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0D0E14] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
          <span className="text-[#0B0C10] font-bold text-sm">NG</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-[#F9FAFB] leading-tight">NextGen Portal</h1>
          <p className="text-[11px] text-[#6B7280] leading-tight">Practice Operating System</p>
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
                  ? 'bg-white/[0.08] text-[#F9FAFB] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/[0.04]'
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

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <Link
          to="/portal/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#F9FAFB] hover:bg-white/[0.04] transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
