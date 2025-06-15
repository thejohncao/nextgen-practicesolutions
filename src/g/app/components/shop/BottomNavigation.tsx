
import React from 'react';
import { Home, Search, ShoppingBag, Gift, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavigationProps {
  currentPage: 'home' | 'discover' | 'shop' | 'rewards' | 'wallet';
}

const BottomNavigation = ({ currentPage }: BottomNavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { key: 'home', icon: Home, label: 'Home', path: '/g/app/dashboard' },
    { key: 'discover', icon: Search, label: 'Discover', path: '/g/app/discover' },
    { key: 'shop', icon: ShoppingBag, label: 'Shop', path: '/g/app/shop' },
    { key: 'rewards', icon: Gift, label: 'Rewards', path: '/g/app/rewards' },
    { key: 'wallet', icon: Wallet, label: 'Wallet', path: '/g/app/wallet' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-white/20 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ key, icon: Icon, label, path }) => {
          const isActive = currentPage === key;
          
          return (
            <Link
              key={key}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-coral-accent/10 text-coral-accent' 
                  : 'text-apple-detail hover:text-apple-header'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-coral-accent rounded-full mt-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
