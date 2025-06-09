
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  Calendar, 
  CreditCard, 
  Users, 
  BarChart3, 
  Building, 
  Settings,
  Bot,
  GraduationCap,
  TrendingUp
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  const { profile } = useAuth();

  const getNavItems = () => {
    switch (profile?.role) {
      case 'patient':
        return [
          { icon: Home, label: 'Home', path: '/app/patient/home' },
          { icon: Calendar, label: 'Book Treatment', path: '/app/patient/book' },
          { icon: CreditCard, label: 'My Wallet', path: '/app/patient/wallet' },
          { icon: Users, label: 'Refer Friends', path: '/app/patient/referral' },
        ];
      case 'staff':
        return [
          { icon: Home, label: 'Dashboard', path: '/app/staff/dashboard' },
          { icon: Calendar, label: 'Bookings', path: '/app/staff/bookings' },
          { icon: CreditCard, label: 'Redeem Credits', path: '/app/staff/redeem' },
        ];
      case 'admin':
        return [
          // NextGen OS Admin Routes
          { icon: Home, label: 'Admin Dashboard', path: '/app/admin' },
          { icon: Users, label: 'User Management', path: '/app/admin/users' },
          { icon: CreditCard, label: 'Credit System', path: '/app/admin/credits' },
          { icon: Bot, label: 'AI Agents', path: '/app/admin/agents' },
          { icon: BarChart3, label: 'Reports', path: '/app/admin/reports' },
          { icon: Building, label: 'Locations', path: '/app/admin/locations' },
          { icon: Settings, label: 'System Settings', path: '/app/admin/settings' },
          // Divider
          { icon: null, label: 'divider', path: '' },
          // Legacy HQ Routes
          { icon: TrendingUp, label: 'HQ Overview', path: '/app/hq/overview' },
          { icon: Building, label: 'HQ Tenants', path: '/app/hq/tenants' },
          { icon: BarChart3, label: 'HQ Services', path: '/app/hq/services' },
          { icon: TrendingUp, label: 'HQ Analytics', path: '/app/hq/analytics' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-nextgen-dark border-r border-white/10 h-full">
      <div className="p-6">
        <div className="text-white font-bold text-lg mb-6">
          NextGen Practice
        </div>
        <nav className="space-y-2">
          {navItems.map((item, index) => {
            if (item.label === 'divider') {
              return (
                <div key={index} className="border-t border-white/10 my-4"></div>
              );
            }

            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive 
                    ? "bg-nextgen-purple text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
