
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface StaffBooking {
  id: string;
  scheduled_at: string;
  status: string;
  notes?: string;
  credits_used: number;
  patient: {
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
  };
  treatment: {
    name: string;
    category?: string;
  };
}

type BookingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

export function useStaffBookings() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<StaffBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!profile || profile.role !== 'staff') return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles!bookings_user_id_fkey(first_name, last_name, email, phone),
          treatments(name, category)
        `)
        .eq('tenant_id', profile.tenant_id)
        .gte('scheduled_at', new Date().toISOString().split('T')[0])
        .order('scheduled_at', { ascending: true })
        .limit(20);

      if (error) throw error;

      const formattedBookings = (data || []).map(booking => ({
        id: booking.id,
        scheduled_at: booking.scheduled_at,
        status: booking.status,
        notes: booking.notes,
        credits_used: booking.credits_used,
        patient: {
          first_name: booking.profiles?.first_name,
          last_name: booking.profiles?.last_name,
          email: booking.profiles?.email || '',
          phone: booking.profiles?.phone
        },
        treatment: {
          name: booking.treatments?.name || 'Unknown Treatment',
          category: booking.treatments?.category
        }
      }));

      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching staff bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Booking Updated",
        description: `Booking status changed to ${status}`,
      });

      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (profile) {
      fetchBookings();
    }
  }, [profile]);

  const getTodaysBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(booking => 
      booking.scheduled_at.startsWith(today)
    );
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings.filter(booking => 
      new Date(booking.scheduled_at) > now
    ).slice(0, 5);
  };

  return {
    bookings,
    loading,
    getTodaysBookings,
    getUpcomingBookings,
    updateBookingStatus,
    refetch: fetchBookings
  };
}
