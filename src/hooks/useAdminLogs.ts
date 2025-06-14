
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface AdminLog {
  id: string;
  admin_id: string | null;
  action: string;
  target_user_id: string | null;
  details: Record<string, any> | null;
  created_at: string;
}

export function useAdminLogs() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    if (!profile || profile.role !== "admin") return [];
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      setLogs(data || []);
    } catch (e) {
      toast({
        title: "Failed to load admin logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // For logging actions
  const logAdminAction = async (action: string, target_user_id?: string, details?: object) => {
    if (!profile || profile.role !== "admin") return;
    await supabase.from("admin_logs").insert([
      {
        admin_id: profile.id,
        action,
        target_user_id: target_user_id || null,
        details: details ? details : {},
      },
    ]);
  };

  useEffect(() => {
    fetchLogs();
  }, [profile]);

  return { logs, loading, fetchLogs, logAdminAction };
}
