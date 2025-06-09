
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Wallet, Users, Clock } from 'lucide-react';

const PatientHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard</h1>
        <p className="text-white/70">Manage your treatments, credits, and referrals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Glow Wallet Card */}
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Glow Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-white">25</div>
                <div className="text-green-300 text-sm">Credits Available</div>
              </div>
              <div className="text-white/70 text-sm">
                Next drop: Jan 15, 2024
              </div>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link to="/app/patient/wallet">View Wallet</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Book Treatment Card */}
        <Card className="bg-gradient-to-br from-nextgen-purple/20 to-purple-600/20 border-nextgen-purple/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Book Treatment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-white/70 text-sm">
                Use your credits to book treatments
              </div>
              <Button asChild className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90">
                <Link to="/app/patient/book">Book Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referrals Card */}
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-blue-300 text-sm">Friends Referred</div>
              </div>
              <Button asChild variant="outline" className="w-full border-blue-500/30 text-white hover:bg-blue-500/20">
                <Link to="/app/patient/referral">Share & Earn</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <div className="text-white font-medium">Facial Treatment</div>
                <div className="text-white/70 text-sm">Used 10 credits</div>
              </div>
              <div className="text-white/70 text-sm">2 days ago</div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <div className="text-white font-medium">Monthly Credit Drop</div>
                <div className="text-green-400 text-sm">+25 credits</div>
              </div>
              <div className="text-white/70 text-sm">1 week ago</div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-white font-medium">Referral Bonus</div>
                <div className="text-green-400 text-sm">+5 credits</div>
              </div>
              <div className="text-white/70 text-sm">2 weeks ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientHome;
