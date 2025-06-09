
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Patient {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  available_credits: number;
  total_bookings: number;
  last_booking?: string;
}

export function usePatients() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    if (!profile || profile.role !== 'staff') return;

    try {
      // Get all patients in the same tenant
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('tenant_id', profile.tenant_id)
        .eq('role', 'patient')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // For each patient, get their credit balance and booking count
      const patientsWithStats = await Promise.all(
        (profilesData || []).map(async (patient) => {
          // Get available credits
          const { data: creditsData } = await supabase
            .from('credits')
            .select('amount')
            .eq('user_id', patient.id)
            .is('used_at', null);

          const availableCredits = (creditsData || []).reduce(
            (sum, credit) => sum + credit.amount, 
            0
          );

          // Get booking count
          const { count: bookingCount } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', patient.id);

          // Get last booking
          const { data: lastBookingData } = await supabase
            .from('bookings')
            .select('scheduled_at')
            .eq('user_id', patient.id)
            .order('scheduled_at', { ascending: false })
            .limit(1);

          return {
            ...patient,
            available_credits: availableCredits,
            total_bookings: bookingCount || 0,
            last_booking: lastBookingData?.[0]?.scheduled_at
          };
        })
      );

      setPatients(patientsWithStats);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error",
        description: "Failed to load patients",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchPatients();
    }
  }, [profile]);

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.phone?.toLowerCase().includes(searchLower)
    );
  });

  const getPatientById = (patientId: string) => {
    return patients.find(p => p.id === patientId);
  };

  return {
    patients: filteredPatients,
    loading,
    searchTerm,
    setSearchTerm,
    getPatientById,
    refetch: fetchPatients
  };
}
