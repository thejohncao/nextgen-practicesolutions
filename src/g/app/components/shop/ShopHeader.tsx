
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';

const ShopHeader = () => {
  const { profile } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-apple-header">Shop</h1>
          <p className="text-sm text-apple-detail">
            {profile ? `Welcome back, ${profile.first_name || 'Member'}` : 'Discover treatments & packages'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors">
            <Search className="w-5 h-5 text-apple-header" />
          </button>
          
          {profile && (
            <button className="p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors">
              <Bell className="w-5 h-5 text-apple-header" />
            </button>
          )}
          
          <button className="p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors">
            <User className="w-5 h-5 text-apple-header" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
