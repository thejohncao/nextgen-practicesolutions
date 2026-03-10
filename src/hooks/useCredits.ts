
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Credit {
  id: string;
  amount: number;
  source: string;
  expires_at: string | null;
  used_at: string | null;
  created_at: string;
}

interface CreditTransaction {
  id: string;
  type: 'credit_drop' | 'redemption' | 'referral_bonus' | 'manual_adjustment';
  amount: number;
  description: string | null;
  created_at: string;
  booking_id: string | null;
}

export function useCredits() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [credits, setCredits] = useState<Credit[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(0);

  const fetchCredits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', user.id)
        .is('used_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCredits(data || []);
      const balance = (data || []).reduce((sum, credit) => sum + credit.amount, 0);
      setAvailableBalance(balance);
    } catch (error) {
      console.error('Error fetching credits:', error);
      toast({
        title: "Error",
        description: "Failed to load credit balance",
        variant: "destructive"
      });
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions((data || []) as unknown as CreditTransaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchCredits(), fetchTransactions()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  const getNextDropDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    return nextMonth;
  };

  const getDaysUntilNextDrop = () => {
    const now = new Date();
    const nextDrop = getNextDropDate();
    const diffTime = nextDrop.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return {
    credits,
    transactions,
    availableBalance,
    loading,
    getNextDropDate,
    getDaysUntilNextDrop,
    refetchCredits: fetchCredits,
    refetchTransactions: fetchTransactions
  };
}
