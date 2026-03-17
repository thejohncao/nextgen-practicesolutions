import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface PortalProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  practice_id: string | null;
}

interface PortalAuthContextValue {
  user: User | null;
  profile: PortalProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  activePracticeId: string | null;
  setActivePracticeId: (id: string | null) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const PortalAuthContext = createContext<PortalAuthContextValue | null>(null);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PortalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('id, email, name, role, practice_id')
      .eq('id', userId)
      .single();
    if (data) {
      setProfile(data as PortalProfile);
      if ((data as PortalProfile).role !== 'admin') {
        setActivePracticeId((data as PortalProfile).practice_id);
      } else if (!activePracticeId) {
        setActivePracticeId((data as PortalProfile).practice_id);
      }
    }
  }, [activePracticeId]);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        try {
          await fetchProfile(u.id);
        } catch (e) {
          console.error('Failed to fetch profile:', e);
        }
      } else {
        setProfile(null);
        setActivePracticeId(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        try {
          await fetchProfile(u.id);
        } catch (e) {
          console.error('Failed to fetch profile:', e);
        }
      }
      setIsLoading(false);
    }).catch(() => {
      if (mounted) setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setActivePracticeId(null);
  }, []);

  const isAdmin = profile?.role === 'admin';

  return (
    <PortalAuthContext.Provider value={{
      user,
      profile,
      isAdmin,
      isLoading,
      activePracticeId,
      setActivePracticeId,
      signOut,
      refreshProfile,
    }}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth(): PortalAuthContextValue {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error('usePortalAuth must be used within PortalAuthProvider');
  return ctx;
}
