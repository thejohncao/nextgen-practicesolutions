import { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, ArrowLeft, LogOut, RefreshCw } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface Profile {
  name: string | null;
  role: string;
}

export default function AdminLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase.from('profiles').select('name, role').eq('id', u.id).single();
        setProfile(data);
      }
      setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase.from('profiles').select('name, role').eq('id', u.id).single();
        setProfile(data);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  if (profile?.role !== 'admin') {
    return <Navigate to="/portal" replace />;
  }

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="flex items-center justify-between h-14 px-4 lg:px-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-[#0B0C10] font-bold text-xs">NG</span>
              </div>
              <span className="text-sm font-semibold text-white">NextGen Admin</span>
            </div>
            <Link
              to="/portal"
              className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portal
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-[#0B0C10] text-[10px] font-bold">{initials}</span>
              </div>
              <span className="hidden sm:block text-xs text-[#9CA3AF]">{profile?.name || user.email}</span>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="p-1.5 rounded-lg hover:bg-white/[0.06] transition"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
