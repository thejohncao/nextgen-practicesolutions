
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  Wallet, 
  Users, 
  BarChart3, 
  Settings, 
  Bot,
  GraduationCap,
  Building,
  CreditCard
} from 'lucide-react';

const AppSidebar = () => {
  const { profile } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    if (!profile) return [];

    const baseItems = [];

    if (profile.role === 'patient') {
      return [
        { icon: Home, label: 'Home', path: '/app/patient/home' },
        { icon: Calendar, label: 'Book Service', path: '/app/patient/book' },
        { icon: Wallet, label: 'Glow Wallet', path: '/app/patient/wallet' },
        { icon: Users, label: 'Referrals', path: '/app/patient/referral' }
      ];
    }

    if (profile.role === 'staff') {
      return [
        { icon: Home, label: 'Dashboard', path: '/app/staff/dashboard' },
        { icon: CreditCard, label: 'Redeem Credits', path: '/app/staff/redeem' },
        { icon: Calendar, label: 'Bookings', path: '/app/staff/bookings' }
      ];
    }

    if (profile.role === 'admin') {
      return [
        { icon: BarChart3, label: 'Overview', path: '/app/hq/overview' },
        { icon: Building, label: 'Tenants', path: '/app/hq/tenants' },
        { icon: CreditCard, label: 'Services', path: '/app/hq/services' },
        { icon: Bot, label: 'AI Agents', path: '/app/hq/agents' },
        { icon: GraduationCap, label: 'Academy', path: '/app/hq/academy' },
        { icon: Settings, label: 'Settings', path: '/app/hq/settings' }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link to="/app" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-nextgen-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">NG</span>
          </div>
          <span className="text-white font-semibold">NextGen OS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-nextgen-purple text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/50">
          Role: {profile?.role}
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
