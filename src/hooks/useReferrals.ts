import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Referral {
  id: string;
  referral_code: string;
  bonus_credits: number;
  status: string;
  completed_at: string | null;
  created_at: string;
  referred_id: string | null;
  invitee_email: string | null;
}

export function useReferrals() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [userReferralCode, setUserReferralCode] = useState<string>('');

  const generateReferralCode = () => {
    return `REF${user?.id?.slice(0, 8).toUpperCase()}${Date.now().toString().slice(-4)}`;
  };

  const fetchReferrals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
      
      // Generate a referral code for the user if they don't have one
      if (data && data.length > 0) {
        setUserReferralCode(data[0].referral_code);
      } else {
        setUserReferralCode(generateReferralCode());
      }
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast({
        title: "Error",
        description: "Failed to load referrals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  const getCompletedReferrals = () => {
    return referrals.filter(ref => ref.status === 'completed');
  };

  const getTotalBonusCredits = () => {
    return getCompletedReferrals().reduce((sum, ref) => sum + ref.bonus_credits, 0);
  };

  const getReferralLink = () => {
    return `${window.location.origin}?ref=${userReferralCode}`;
  };

  return {
    referrals,
    userReferralCode,
    loading,
    getCompletedReferrals,
    getTotalBonusCredits,
    getReferralLink,
    refetch: fetchReferrals
  };
}
