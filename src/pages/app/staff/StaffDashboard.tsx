
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Calendar, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { useStaffBookings } from '@/hooks/useStaffBookings';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  const { 
    patients, 
    loading: patientsLoading, 
    searchTerm, 
    setSearchTerm 
  } = usePatients();
  
  const { 
    getTodaysBookings, 
    getUpcomingBookings, 
    updateBookingStatus,
    loading: bookingsLoading 
  } = useStaffBookings();

  const todaysBookings = getTodaysBookings();
  const upcomingBookings = getUpcomingBookings();
  const totalCreditsAvailable = patients.reduce((sum, p) => sum + p.available_credits, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Staff Dashboard</h1>
        <p className="text-white/70">Manage patients, bookings, and credit redemptions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {patientsLoading ? '...' : patients.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              Today's Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bookingsLoading ? '...' : todaysBookings.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4" />
              Available Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {patientsLoading ? '...' : totalCreditsAvailable}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bookingsLoading ? '...' : upcomingBookings.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysBookings.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No bookings scheduled for today
            </div>
          ) : (
            <div className="space-y-4">
              {todaysBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-white font-medium">
                        {format(new Date(booking.scheduled_at), 'h:mm a')}
                      </div>
                      <div className="text-white">
                        {booking.patient.first_name} {booking.patient.last_name}
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {booking.treatment.name}
                      </Badge>
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      {booking.patient.email} • {booking.credits_used} credits
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={booking.status === 'completed' ? 'default' : 'secondary'}
                      className={booking.status === 'completed' ? 'bg-green-500/20 text-green-300' : ''}
                    >
                      {booking.status}
                    </Badge>
                    {booking.status === 'scheduled' && (
                      <Button
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Search & Management */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Patient Management</CardTitle>
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Link to="/app/staff/redeem">Credit Redemption</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {patients.length === 0 ? (
                <div className="text-center py-8 text-white/60">
                  {patientsLoading ? 'Loading patients...' : 'No patients found'}
                </div>
              ) : (
                patients.slice(0, 10).map((patient) => (
                  <div key={patient.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          {patient.first_name} {patient.last_name}
                        </div>
                        <div className="text-white/70 text-sm">
                          {patient.email} {patient.phone && ` • ${patient.phone}`}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-green-400">
                            {patient.available_credits} credits
                          </span>
                          <span className="text-white/60">
                            {patient.total_bookings} bookings
                          </span>
                          {patient.last_booking && (
                            <span className="text-white/60">
                              Last: {format(new Date(patient.last_booking), 'MMM dd')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-nextgen-purple hover:bg-nextgen-purple/90"
                          disabled={patient.available_credits === 0}
                        >
                          Redeem Credits
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
