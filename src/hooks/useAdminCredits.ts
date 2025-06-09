
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface AdminCredit {
  id: string;
  user_id: string;
  user_email?: string;
  amount: number;
  source: string;
  created_at: string;
  balance_after?: number;
  related_action?: string;
}

interface CreditStats {
  totalIssued: number;
  totalRedeemed: number;
  inCirculation: number;
  burnRate: number;
  chartData: any[];
}

export function useAdminCredits() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [credits, setCredits] = useState<AdminCredit[]>([]);
  const [creditStats, setCreditStats] = useState<CreditStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    if (!profile || profile.role !== 'admin') return;

    try {
      // Fetch credits with user email
      const { data: creditsData, error } = await supabase
        .from('credits')
        .select(`
          *,
          profiles!inner(email)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Transform data to include user email
      const transformedCredits = (creditsData || []).map(credit => ({
        ...credit,
        user_email: credit.profiles?.email || 'Unknown'
      }));

      setCredits(transformedCredits);

      // Calculate stats
      const totalIssued = transformedCredits.reduce((sum, credit) => 
        credit.amount > 0 ? sum + credit.amount : sum, 0);
      const totalRedeemed = transformedCredits.reduce((sum, credit) => 
        credit.amount < 0 ? sum + Math.abs(credit.amount) : sum, 0);
      const inCirculation = totalIssued - totalRedeemed;
      const burnRate = totalIssued > 0 ? Math.round((totalRedeemed / totalIssued) * 100) : 0;

      // Generate chart data (mock for now)
      const chartData = [
        { name: 'Jan', earned: 1200, redeemed: 800 },
        { name: 'Feb', earned: 1500, redeemed: 950 },
        { name: 'Mar', earned: 1800, redeemed: 1100 },
        { name: 'Apr', earned: 2000, redeemed: 1300 },
        { name: 'May', earned: 2200, redeemed: 1400 },
        { name: 'Jun', earned: 2500, redeemed: 1600 },
      ];

      setCreditStats({
        totalIssued,
        totalRedeemed,
        inCirculation,
        burnRate,
        chartData
      });

    } catch (error) {
      console.error('Error fetching credits:', error);
      toast({
        title: "Error",
        description: "Failed to load credit data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      fetchCredits();
    }
  }, [profile]);

  return {
    credits,
    creditStats,
    loading,
    refetch: fetchCredits
  };
}
