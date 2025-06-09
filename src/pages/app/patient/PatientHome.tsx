
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Wallet, Users, Clock, TrendingUp } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { useReferrals } from '@/hooks/useReferrals';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const PatientHome = () => {
  const { profile } = useAuth();
  const { 
    availableBalance, 
    transactions, 
    loading: creditsLoading, 
    getDaysUntilNextDrop 
  } = useCredits();
  const { 
    getCompletedReferrals, 
    loading: referralsLoading 
  } = useReferrals();

  const completedReferrals = getCompletedReferrals();
  const daysUntilDrop = getDaysUntilNextDrop();
  const recentTransactions = transactions.slice(0, 3);

  const isLoading = creditsLoading || referralsLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {profile?.first_name || 'Patient'}!
        </h1>
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
                <div className="text-3xl font-bold text-white">
                  {isLoading ? '...' : availableBalance}
                </div>
                <div className="text-green-300 text-sm">Credits Available</div>
              </div>
              <div className="text-white/70 text-sm">
                Next drop: {daysUntilDrop} days
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
                Use your {availableBalance} credits to book treatments
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
                <div className="text-2xl font-bold text-white">
                  {isLoading ? '...' : completedReferrals.length}
                </div>
                <div className="text-blue-300 text-sm">Friends Referred</div>
              </div>
              <Button asChild variant="outline" className="w-full border-blue-500/30 text-white hover:bg-blue-500/20">
                <Link to="/app/patient/referral">Share & Earn</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {transactions.filter(t => t.type === 'credit_drop').length}
                </div>
                <div className="text-white/70 text-xs">Monthly Drops</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {transactions.filter(t => t.type === 'redemption').length}
                </div>
                <div className="text-white/70 text-xs">Treatments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {transactions.filter(t => t.type === 'referral_bonus').length}
                </div>
                <div className="text-white/70 text-xs">Referral Bonuses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-white">{daysUntilDrop}</div>
                <div className="text-white/70 text-xs">Days to Drop</div>
              </div>
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
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No recent activity. Your transactions will appear here!
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <div className="text-white font-medium">
                      {transaction.type === 'credit_drop' && 'Monthly Credit Drop'}
                      {transaction.type === 'redemption' && 'Treatment Redemption'}
                      {transaction.type === 'referral_bonus' && 'Referral Bonus'}
                      {transaction.type === 'manual_adjustment' && 'Credit Adjustment'}
                    </div>
                    <div className="text-white/70 text-sm">
                      {format(new Date(transaction.created_at), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <div className={`text-right ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className="font-medium">
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} credits
                    </div>
                  </div>
                </div>
              ))}
              {transactions.length > 3 && (
                <div className="pt-2">
                  <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link to="/app/patient/wallet">View All Transactions</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientHome;
