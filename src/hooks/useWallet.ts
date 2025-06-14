
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

// Types
export interface Wallet {
  id: string;
  user_id: string;
  tenant_id: string;
  balance: number;
  created_at: string;
  last_updated: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: string;
  amount: number;
  source: string | null;
  notes: string | null;
  timestamp: string;
}

export interface CreditEvent {
  id: string;
  event_type: string;
  user_id: string;
  value: number;
  status: string | null;
  expires_at: string | null;
  notes: string | null;
  created_at: string;
}

export function useWallet() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [creditEvents, setCreditEvents] = useState<CreditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWallet(null);
      setTransactions([]);
      setCreditEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Fetch wallet for current user
    supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(async ({ data: walletData, error }) => {
        if (error) {
          toast({
            title: "Error",
            description: "Unable to load wallet.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        setWallet(walletData);

        if (walletData) {
          // Fetch transactions
          const { data: txs } = await supabase
            .from("wallet_transactions")
            .select("*")
            .eq("wallet_id", walletData.id)
            .order("timestamp", { ascending: false });
          setTransactions(txs || []);
        }

        // Fetch creditEvents
        const { data: credits } = await supabase
          .from("credit_events")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setCreditEvents(credits || []);
        setLoading(false);
      });
  }, [user]);

  return {
    wallet,
    transactions,
    creditEvents,
    loading,
  };
}
