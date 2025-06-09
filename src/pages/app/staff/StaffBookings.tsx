
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users, CheckCircle, XCircle, Search, CreditCard } from 'lucide-react';
import { useStaffBookings } from '@/hooks/useStaffBookings';
import { format } from 'date-fns';

const StaffBookings = () => {
  const { 
    bookings, 
    loading, 
    updateBookingStatus 
  } = useStaffBookings();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.patient.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.patient.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.treatment.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300';
      case 'no_show':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Booking Management</h1>
        <p className="text-white/70">View and manage patient bookings and appointments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {bookings.filter(b => b.status === 'scheduled').length}
                </div>
                <div className="text-white/70 text-xs">Scheduled</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {bookings.filter(b => b.status === 'completed').length}
                </div>
                <div className="text-white/70 text-xs">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </div>
                <div className="text-white/70 text-xs">Cancelled</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {bookings.filter(b => b.status === 'no_show').length}
                </div>
                <div className="text-white/70 text-xs">No Shows</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Filter Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-white text-sm">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="search"
                  placeholder="Search by patient or treatment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="status" className="text-white text-sm">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="all" className="bg-gray-800">All Statuses</option>
                <option value="scheduled" className="bg-gray-800">Scheduled</option>
                <option value="completed" className="bg-gray-800">Completed</option>
                <option value="cancelled" className="bg-gray-800">Cancelled</option>
                <option value="no_show" className="bg-gray-800">No Show</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No bookings found matching your criteria
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-white font-medium">
                          {booking.patient.first_name} {booking.patient.last_name}
                        </div>
                        <Badge variant="outline" className="border-white/20 text-white/70">
                          {booking.treatment.name}
                        </Badge>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(booking.scheduled_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {format(new Date(booking.scheduled_at), 'h:mm a')}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {booking.credits_used} credits
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-sm mt-1">
                        {booking.patient.email}
                        {booking.patient.phone && ` • ${booking.patient.phone}`}
                      </div>
                      
                      {booking.notes && (
                        <div className="text-white/70 text-sm mt-2 p-2 bg-white/5 rounded">
                          {booking.notes}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {booking.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'no_show')}
                            className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20"
                          >
                            No Show
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="border-red-500/30 text-red-300 hover:bg-red-500/20"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffBookings;
