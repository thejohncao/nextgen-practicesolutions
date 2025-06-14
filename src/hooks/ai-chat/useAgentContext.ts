
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTenant } from "@/context/TenantContext";

// Data Structures
export interface AgentMemory {
  prompt: string;
  response: string | null;
  created_at: string;
}
export interface OfficePlaybook {
  key: string;
  value: string;
  updated_at: string;
}

export function useAgentContext(agentName: string) {
  const { user } = useAuth();
  const { tenant } = useTenant();

  const [role, setRole] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [memory, setMemory] = useState<AgentMemory[]>([]);
  const [playbooks, setPlaybooks] = useState<OfficePlaybook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !tenant) {
      setRole(null);
      setLocation(null);
      setMemory([]);
      setPlaybooks([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Fetch profile (role/location)
    supabase
      .from("profiles")
      .select("role, tenant_id")
      .eq("id", user.id)
      .maybeSingle()
      .then(profileRes => {
        setRole(profileRes.data?.role ?? null);
        setLocation(tenant.name || null);
      });

    // Fetch last 5 prompts for this agent
    supabase
      .from("agent_conversation_memory")
      .select("prompt,response,created_at")
      .eq("user_id", user.id)
      .eq("agent_name", agentName)
      .order("created_at", { ascending: false })
      .limit(5)
      .then(memRes => {
        setMemory(memRes.data ?? []);
      });

    // Fetch all playbooks for tenant
    supabase
      .from("office_playbooks")
      .select("key,value,updated_at")
      .eq("tenant_id", tenant.id)
      .then((pbRes) => {
        setPlaybooks(pbRes.data || []);
        setLoading(false);
      });

  }, [user, tenant, agentName]);

  return {
    role,
    location,
    memory,
    playbooks,
    loading,
  };
}
