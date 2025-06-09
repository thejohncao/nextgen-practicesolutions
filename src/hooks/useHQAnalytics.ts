
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface HQAnalytics {
  totalRevenue: number;
  totalPatients: number;
  totalCreditsRedeemed: number;
  averageLTV: number;
  activeTenants: number;
  monthlyGrowth: number;
  topPerformingTenants: Array<{
    id: string;
    name: string;
    revenue: number;
    patients: number;
  }>;
}

export function useHQAnalytics() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<HQAnalytics>({
    totalRevenue: 0,
    totalPatients: 0,
    totalCreditsRedeemed: 0,
    averageLTV: 0,
    activeTenants: 0,
    monthlyGrowth: 0,
    topPerformingTenants: []
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    if (!profile || profile.role !== 'admin') return;

    try {
      // Get all tenants
      const { data: tenants, error: tenantsError } = await supabase
        .from('tenants')
        .select('*');

      if (tenantsError) throw tenantsError;

      // Get total patients across all tenants
      const { count: totalPatients } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'patient');

      // Get total bookings and revenue
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('credits_used, treatments(price_cents)');

      if (bookingsError) throw bookingsError;

      const totalCreditsRedeemed = bookings?.reduce((sum, booking) => sum + (booking.credits_used || 0), 0) || 0;
      const totalRevenue = bookings?.reduce((sum, booking) => {
        return sum + ((booking.treatments as any)?.price_cents || 0);
      }, 0) || 0;

      // Calculate analytics
      const averageLTV = totalPatients ? totalRevenue / totalPatients : 0;
      
      // Get top performing tenants (mock data for now)
      const topPerformingTenants = (tenants || []).slice(0, 3).map(tenant => ({
        id: tenant.id,
        name: tenant.name,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        patients: Math.floor(Math.random() * 200) + 50
      }));

      setAnalytics({
        totalRevenue: totalRevenue / 100, // Convert from cents
        totalPatients: totalPatients || 0,
        totalCreditsRedeemed,
        averageLTV: averageLTV / 100, // Convert from cents
        activeTenants: tenants?.length || 0,
        monthlyGrowth: 12, // Mock data
        topPerformingTenants
      });
    } catch (error) {
      console.error('Error fetching HQ analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchAnalytics();
    }
  }, [profile]);

  return {
    analytics,
    loading,
    refetch: fetchAnalytics
  };
}
