
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wallet, Clock, TrendingUp, Calendar } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { format } from 'date-fns';

const PatientWallet = () => {
  const { 
    availableBalance, 
    transactions, 
    loading, 
    getNextDropDate, 
    getDaysUntilNextDrop 
  } = useCredits();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading wallet...</div>
      </div>
    );
  }

  const nextDropDate = getNextDropDate();
  const daysUntilDrop = getDaysUntilNextDrop();
  const progressToNextDrop = Math.max(0, (30 - daysUntilDrop) / 30 * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Glow Wallet</h1>
        <p className="text-white/70">Manage your treatment credits and view transaction history</p>
      </div>

      {/* Credit Balance Card */}
      <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Available Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{availableBalance}</div>
              <div className="text-green-300">Credits Ready to Use</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Next Monthly Drop</span>
                <span>{daysUntilDrop} days</span>
              </div>
              <Progress value={progressToNextDrop} className="h-2" />
              <div className="text-xs text-white/60 text-center">
                Next drop: {format(nextDropDate, 'MMM dd, yyyy')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-xl font-bold text-white">
                  {transactions.filter(t => t.type === 'credit_drop').length}
                </div>
                <div className="text-white/70 text-sm">Monthly Drops</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-400" />
              <div>
                <div className="text-xl font-bold text-white">
                  {transactions.filter(t => t.type === 'redemption').length}
                </div>
                <div className="text-white/70 text-sm">Treatments Booked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-xl font-bold text-white">{daysUntilDrop}</div>
                <div className="text-white/70 text-sm">Days to Next Drop</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No transactions yet. Your first credit drop will appear here!
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <div className="text-white font-medium">
                      {transaction.type === 'credit_drop' && 'Monthly Credit Drop'}
                      {transaction.type === 'redemption' && 'Treatment Redemption'}
                      {transaction.type === 'referral_bonus' && 'Referral Bonus'}
                      {transaction.type === 'manual_adjustment' && 'Credit Adjustment'}
                    </div>
                    {transaction.description && (
                      <div className="text-white/70 text-sm">{transaction.description}</div>
                    )}
                    <div className="text-white/50 text-xs">
                      {format(new Date(transaction.created_at), 'MMM dd, yyyy • h:mm a')}
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientWallet;
