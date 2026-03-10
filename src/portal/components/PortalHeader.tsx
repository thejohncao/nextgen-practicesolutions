import { Bell, Search, ChevronDown, Menu } from 'lucide-react';
import { demoPractice, demoUser, notifications } from '../data/mock';
import { useState } from 'react';
import PortalMobileNav from './PortalMobileNav';

export default function PortalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Left — mobile menu + practice */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition text-sm">
              <span className="font-semibold text-gray-900">{demoPractice.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <div className="hidden md:flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
              Last 30 days
            </div>
          </div>

          {/* Right — search, notifications, avatar */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition text-sm text-gray-500 w-48 lg:w-64">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </button>

            <button className="relative p-2 rounded-lg hover:bg-gray-50 transition">
              <Bell className="w-5 h-5 text-gray-500" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-500 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {demoUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">{demoUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <PortalMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
