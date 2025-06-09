
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Calendar, CreditCard } from 'lucide-react';

const StaffDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Staff Dashboard</h1>
        <p className="text-white/70">Manage patients, bookings, and credit redemptions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Today's Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">12</div>
            <div className="text-white/70 text-sm">Scheduled appointments</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credits Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">85</div>
            <div className="text-white/70 text-sm">Today's redemptions</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">2:30 PM</div>
            <div className="text-white/70 text-sm">Sarah Johnson - Facial</div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Search */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Patient Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search by name, phone, or email..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              Search
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">John Smith</div>
                  <div className="text-white/70 text-sm">john@example.com • (555) 123-4567</div>
                  <div className="text-green-400 text-sm mt-1">Credits: 18 available</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Profile
                  </Button>
                  <Button size="sm" className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                    Redeem Credits
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
