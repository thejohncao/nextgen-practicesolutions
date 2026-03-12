import { Bell, Search, Menu, Route, LogOut } from 'lucide-react';
import { notifications } from '../data/mock';
import { useState } from 'react';
import PortalMobileNav from './PortalMobileNav';
import PracticeSwitcher from './PracticeSwitcher';
import { usePractice } from '../context/PracticeContext';
import { usePortalAuth } from '../context/PortalAuthContext';

export default function PortalHeader({ onStartTour }: { onStartTour?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeUser } = usePractice();
  const { signOut } = usePortalAuth();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#0D0E14]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Left — mobile menu + practice */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/[0.06] transition"
            >
              <Menu className="w-5 h-5 text-[#9CA3AF]" />
            </button>

            <PracticeSwitcher />

            <div className="hidden md:flex items-center gap-1 text-xs text-[#6B7280] bg-white/[0.04] px-2.5 py-1 rounded-full">
              Last 30 days
            </div>
          </div>

          {/* Right — search, notifications, avatar, sign out */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] transition text-sm text-[#6B7280] w-48 lg:w-64">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </button>

            <button
              onClick={onStartTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#F5A623] hover:bg-[#F5A623]/10 transition"
              title="Start guided tour"
            >
              <Route className="w-4 h-4" />
              <span className="hidden sm:inline">Tour</span>
            </button>

            <button className="relative p-2 rounded-lg hover:bg-white/[0.06] transition">
              <Bell className="w-5 h-5 text-[#9CA3AF]" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <div className="flex items-center gap-2 pl-2 ml-1 border-l border-white/[0.06]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-[#0B0C10] text-xs font-semibold">
                  {activeUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <span className="hidden lg:block text-sm font-medium text-[#9CA3AF]">{activeUser.name}</span>
              <button
                onClick={signOut}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <PortalMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
