
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const AppHeader = () => {
  const { profile, signOut } = useAuth();

  return (
    <header className="h-16 bg-black/10 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-semibold">
          Welcome, {profile?.first_name || profile?.email}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <User className="h-4 w-4" />
          <span>{profile?.email}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
