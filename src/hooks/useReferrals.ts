
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

// Add import for membership tier
import { useQuery } from '@tanstack/react-query';

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
  // Track last shared channel for UX feedback optionally
  const [lastSharedChannel, setLastSharedChannel] = useState<string | null>(null);

  // Fetch membership tier for multipliers
  const { data: membershipTier } = useQuery({
    queryKey: ['membership-tier', user?.id],
    queryFn: async () => {
      if (!user?.id) return undefined;
      // join with membership_tiers to get multiplier
      let { data } = await supabase
        .from('user_memberships')
        .select('*, membership_tiers: tier_id(referral_bonus_multiplier, name)')
        .eq('user_id', user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

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

  // Calculate multiplier based on tier (default 1x)
  const getTierMultiplier = () => {
    if (!membershipTier?.membership_tiers) return 1;
    return membershipTier.membership_tiers.referral_bonus_multiplier || 1;
  };

  // Rewards configuration (can source from admin table later)
  const rewardTable = [
    { action: "Sign-up via referral", sender: 0.5, receiver: 0.5 },
    { action: "First paid appointment", sender: 1, receiver: 1 },
    { action: "Upgrade to Glow Plus", sender: 2, receiver: 1 },
  ];

  // Log share event
  const logShareEvent = async (channel: string) => {
    if (!user) return;
    setLastSharedChannel(channel);
    const { error } = await supabase.from('share_events').insert({
      user_id: user.id,
      channel,
      referral_code: userReferralCode
    });
    if (error) {
      toast({
        title: "Failed to log share",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getReferralLink = () => {
    return `${window.location.origin}/ref/${userReferralCode.replace(/^REF/, '')}`;
  };

  return {
    referrals,
    userReferralCode,
    loading,
    getCompletedReferrals,
    getTotalBonusCredits,
    getReferralLink,
    refetch: fetchReferrals,
    logShareEvent,
    lastSharedChannel,
    rewardTable,
    getTierMultiplier,
    membershipTier
  };
}
