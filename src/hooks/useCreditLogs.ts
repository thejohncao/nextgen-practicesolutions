
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface CreditLog {
  id: string;
  user_id: string;
  admin_id: string | null;
  amount: number;
  source: string;
  balance_after: number | null;
  notes: string | null;
  metadata: any | null; // Accept anything returned from supabase
  created_at: string;
}

export function useCreditLogs(userId?: string) {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<CreditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    if (!profile) return;
    setLoading(true);
    let query = supabase.from("credit_logs").select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (userId) query = query.eq("user_id", userId);
    try {
      const { data, error } = await query;
      if (error) throw error;
      // Defensive: parse metadata field if stringified
      const logs = (data || []).map((entry: any) => ({
        ...entry,
        metadata:
          typeof entry.metadata === "string"
            ? (() => {
                try {
                  return JSON.parse(entry.metadata);
                } catch {
                  return entry.metadata;
                }
              })()
            : entry.metadata,
      }));
      setLogs(logs);
    } catch (e) {
      toast({ title: "Failed to load credit logs", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [profile, userId]);
  return { logs, loading, fetchLogs };
}
