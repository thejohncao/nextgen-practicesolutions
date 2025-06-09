
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo_url?: string;
  created_at: string;
  settings?: any;
  brand_colors?: any;
  patient_count?: number;
  staff_count?: number;
  monthly_revenue?: number;
}

export function useTenantManagement() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    if (!profile || profile.role !== 'admin') return;

    try {
      const { data: tenantsData, error } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Enhance tenant data with counts
      const tenantsWithStats = await Promise.all(
        (tenantsData || []).map(async (tenant) => {
          // Get patient count
          const { count: patientCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenant.id)
            .eq('role', 'patient');

          // Get staff count
          const { count: staffCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenant.id)
            .eq('role', 'staff');

          return {
            ...tenant,
            patient_count: patientCount || 0,
            staff_count: staffCount || 0,
            monthly_revenue: Math.floor(Math.random() * 50000) + 10000 // Mock data
          };
        })
      );

      setTenants(tenantsWithStats);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      toast({
        title: "Error",
        description: "Failed to load tenants",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTenant = async (tenantData: {
    name: string;
    slug: string;
    domain?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .insert([tenantData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tenant Created",
        description: `${tenantData.name} has been created successfully`,
      });

      fetchTenants();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating tenant:', error);
      toast({
        title: "Error",
        description: "Failed to create tenant",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const updateTenant = async (tenantId: string, updates: Partial<Tenant>) => {
    try {
      const { error } = await supabase
        .from('tenants')
        .update(updates)
        .eq('id', tenantId);

      if (error) throw error;

      toast({
        title: "Tenant Updated",
        description: "Tenant has been updated successfully",
      });

      fetchTenants();
      return { success: true };
    } catch (error) {
      console.error('Error updating tenant:', error);
      toast({
        title: "Error",
        description: "Failed to update tenant",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchTenants();
    }
  }, [profile]);

  return {
    tenants,
    loading,
    createTenant,
    updateTenant,
    refetch: fetchTenants
  };
}
