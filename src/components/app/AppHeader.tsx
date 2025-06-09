
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import NotificationBell from './NotificationBell';

const AppHeader = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="bg-nextgen-dark border-b border-white/10 px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">NextGen Practice</h1>
          <div className="text-sm text-white/70 capitalize">{profile?.role} Dashboard</div>
        </div>
        
        <div className="flex items-center gap-3">
          <NotificationBell />
          
          <div className="flex items-center gap-2 text-white/80">
            <User className="h-4 w-4" />
            <span className="text-sm">
              {profile?.first_name} {profile?.last_name}
            </span>
          </div>
          
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
