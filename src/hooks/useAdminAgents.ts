
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface AgentMetrics {
  miles: {
    interactions: number;
    appointments: number;
    insurance: number;
    checkins: number;
  };
  giselle: {
    interactions: number;
    reactivations: number;
    leads: number;
    conversions: number;
  };
  devon: {
    interactions: number;
    consultations: number;
    caseAcceptance: number;
    financing: number;
  };
  alma: {
    interactions: number;
    trainings: number;
    sops: number;
    certifications: number;
  };
  responseTime: {
    miles: number;
    giselle: number;
    devon: number;
    alma: number;
  };
  leaderboardData: any[];
}

export function useAdminAgents() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAgentMetrics = async () => {
    if (!profile || profile.role !== 'admin') return;

    try {
      // Fetch agent log data
      const { data: agentLogs, error } = await supabase
        .from('agents_log')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process agent metrics (mock data for now)
      const metrics: AgentMetrics = {
        miles: {
          interactions: 1250,
          appointments: 420,
          insurance: 180,
          checkins: 650
        },
        giselle: {
          interactions: 980,
          reactivations: 156,
          leads: 89,
          conversions: 67
        },
        devon: {
          interactions: 750,
          consultations: 234,
          caseAcceptance: 78,
          financing: 145
        },
        alma: {
          interactions: 560,
          trainings: 89,
          sops: 234,
          certifications: 45
        },
        responseTime: {
          miles: 120,
          giselle: 95,
          devon: 180,
          alma: 240
        },
        leaderboardData: [
          { name: 'Miles', value: 1250 },
          { name: 'Giselle', value: 980 },
          { name: 'Devon', value: 750 },
          { name: 'Alma', value: 560 }
        ]
      };

      setAgentMetrics(metrics);

    } catch (error) {
      console.error('Error fetching agent metrics:', error);
      toast({
        title: "Error",
        description: "Failed to load agent data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      fetchAgentMetrics();
    }
  }, [profile]);

  return {
    agentMetrics,
    loading,
    refetch: fetchAgentMetrics
  };
}
