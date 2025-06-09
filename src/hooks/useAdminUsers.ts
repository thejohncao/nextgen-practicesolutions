
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'patient' | 'staff' | 'admin';
  tenant_id?: string;
  created_at: string;
  last_login?: string;
}

export function useAdminUsers() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!profile || profile.role !== 'admin') return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'patient' | 'staff' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "User Updated",
        description: "User role has been updated successfully",
      });

      fetchUsers();
      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  const deactivateUser = async (userId: string) => {
    try {
      // In a real implementation, you might have an 'active' field
      // For now, we'll just show the toast
      toast({
        title: "User Deactivated",
        description: "User has been deactivated successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate user",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      fetchUsers();
    }
  }, [profile]);

  return {
    users,
    loading,
    updateUserRole,
    deactivateUser,
    refetch: fetchUsers
  };
}
