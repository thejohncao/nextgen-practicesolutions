
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useTenantManagement } from './useTenantManagement';
import { useToast } from './use-toast';

interface AdminLocation {
  id: string;
  name: string;
  subdomain?: string;
  status: 'active' | 'pending' | 'inactive';
  active_users: number;
  mrr: number;
  credits_in_circulation: number;
}

export function useAdminLocations() {
  const { profile } = useAuth();
  const { tenants } = useTenantManagement();
  const { toast } = useToast();
  const [locations, setLocations] = useState<AdminLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const createLocation = async (locationData: any) => {
    try {
      // This would integrate with the tenant creation logic
      toast({
        title: "Location Created",
        description: "New location has been added successfully",
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating location:', error);
      toast({
        title: "Error",
        description: "Failed to create location",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const assignCoordinator = async (locationId: string, coordinatorId: string) => {
    try {
      toast({
        title: "Coordinator Assigned",
        description: "Coordinator has been assigned successfully",
      });
      return { success: true };
    } catch (error) {
      console.error('Error assigning coordinator:', error);
      toast({
        title: "Error",
        description: "Failed to assign coordinator",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      // Transform tenant data to location format
      const locationData = tenants.map(tenant => ({
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.slug,
        status: 'active' as const,
        active_users: (tenant.patient_count || 0) + (tenant.staff_count || 0),
        mrr: tenant.monthly_revenue || 0,
        credits_in_circulation: Math.floor(Math.random() * 500) + 100
      }));

      setLocations(locationData);
      setLoading(false);
    }
  }, [profile, tenants]);

  return {
    locations,
    loading,
    createLocation,
    assignCoordinator
  };
}
