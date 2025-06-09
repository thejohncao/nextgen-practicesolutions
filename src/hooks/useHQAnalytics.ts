
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
  // New properties for admin dashboard
  totalUsers: number;
  activeLocations: number;
  monthlyRevenue: number;
  creditsInCirculation: number;
  creditUsageData: Array<{
    name: string;
    value: number;
  }>;
  agentActivityData: Array<{
    name: string;
    value: number;
  }>;
  recentActivity: Array<{
    description: string;
    timestamp: string;
    type: string;
  }>;
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
    totalUsers: 0,
    activeLocations: 0,
    monthlyRevenue: 0,
    creditsInCirculation: 0,
    creditUsageData: [],
    agentActivityData: [],
    recentActivity: [],
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

      // Get all users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

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

      // Mock chart data
      const creditUsageData = [
        { name: 'Jan', value: 1200 },
        { name: 'Feb', value: 1500 },
        { name: 'Mar', value: 1800 },
        { name: 'Apr', value: 2000 },
        { name: 'May', value: 2200 },
        { name: 'Jun', value: 2500 }
      ];

      const agentActivityData = [
        { name: 'Miles', value: 1250 },
        { name: 'Giselle', value: 980 },
        { name: 'Devon', value: 750 },
        { name: 'Alma', value: 560 }
      ];

      const recentActivity = [
        {
          description: 'New user registration spike detected',
          timestamp: '2 hours ago',
          type: 'Growth'
        },
        {
          description: 'System maintenance completed',
          timestamp: '4 hours ago',
          type: 'System'
        },
        {
          description: 'Credit bonus campaign launched',
          timestamp: '1 day ago',
          type: 'Campaign'
        }
      ];

      setAnalytics({
        totalRevenue: totalRevenue / 100, // Convert from cents
        totalPatients: totalPatients || 0,
        totalCreditsRedeemed,
        averageLTV: averageLTV / 100, // Convert from cents
        activeTenants: tenants?.length || 0,
        monthlyGrowth: 12, // Mock data
        totalUsers: totalUsers || 0,
        activeLocations: tenants?.length || 0,
        monthlyRevenue: totalRevenue / 100,
        creditsInCirculation: totalCreditsRedeemed * 2, // Mock calculation
        creditUsageData,
        agentActivityData,
        recentActivity,
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
