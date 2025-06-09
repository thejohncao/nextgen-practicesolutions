
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Treatment {
  id: string;
  name: string;
  description: string | null;
  credit_cost: number;
  price_cents: number;
  category: string | null;
  is_active: boolean;
}

export function useTreatments() {
  const { toast } = useToast();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTreatments = async () => {
    try {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTreatments(data || []);
    } catch (error) {
      console.error('Error fetching treatments:', error);
      toast({
        title: "Error",
        description: "Failed to load treatments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const getAffordableTreatments = (availableCredits: number) => {
    return treatments.filter(treatment => treatment.credit_cost <= availableCredits);
  };

  return {
    treatments,
    loading,
    getAffordableTreatments,
    refetch: fetchTreatments
  };
}
