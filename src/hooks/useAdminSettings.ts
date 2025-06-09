
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface AdminSettings {
  featureToggles: {
    referralBonuses: boolean;
    creditRollover: boolean;
    aiAgentChat: boolean;
    autoReactivation: boolean;
  };
  creditRules: {
    monthlyDrop: number;
    referralBonus: number;
    expiryDays: number;
    maxBalance: number;
  };
  rolePermissions: {
    admin: string[];
    staff: string[];
    patient: string[];
  };
  security: {
    require2FA: boolean;
    sessionTimeout: number;
    auditLogging: boolean;
  };
}

export function useAdminSettings() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const updateSettings = async (newSettings: Partial<AdminSettings>) => {
    try {
      // In a real implementation, this would save to the database
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      
      toast({
        title: "Settings Updated",
        description: "System settings have been updated successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive"
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      // Load default settings
      setSettings({
        featureToggles: {
          referralBonuses: true,
          creditRollover: true,
          aiAgentChat: true,
          autoReactivation: false
        },
        creditRules: {
          monthlyDrop: 100,
          referralBonus: 50,
          expiryDays: 365,
          maxBalance: 1000
        },
        rolePermissions: {
          admin: ['full_access', 'user_management', 'system_settings', 'reports'],
          staff: ['patient_management', 'bookings', 'credits'],
          patient: ['self_management', 'bookings', 'referrals']
        },
        security: {
          require2FA: true,
          sessionTimeout: 60,
          auditLogging: true
        }
      });
      setLoading(false);
    }
  }, [profile]);

  return {
    settings,
    loading,
    updateSettings
  };
}
