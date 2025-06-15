
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useCredits } from '../../../hooks/useCredits';
import { useWallet } from '../../../hooks/useWallet';
import BottomNavigation from '../components/shop/BottomNavigation';
import { CreditCard, TrendingUp, Gift, Calendar } from 'lucide-react';
import '../../../o/app/styles/apple-design.css';

const Wallet = () => {
  const { profile } = useAuth();
  const { availableBalance, credits, transactions, loading } = useCredits();
  const { wallet } = useWallet();

  if (loading) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center">
        <div className="text-lg text-apple-subtle">Loading wallet...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-bg pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-apple-header mb-2">My Wallet</h1>
          <div className="text-3xl font-bold text-coral-accent mb-1">
            {availableBalance} Credits
          </div>
          <p className="text-sm text-apple-detail">
            Available for treatments and services
          </p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="apple-card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-apple-header">
              ${wallet?.balance ? (wallet.balance / 100).toFixed(2) : '0.00'}
            </div>
            <div className="text-xs text-apple-detail">Cash Balance</div>
          </div>
          
          <div className="apple-card p-4 text-center">
            <Gift className="w-6 h-6 text-coral-accent mx-auto mb-2" />
            <div className="text-lg font-semibold text-apple-header">
              {transactions.filter(t => t.type === 'referral_bonus').length}
            </div>
            <div className="text-xs text-apple-detail">Referral Rewards</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="apple-card p-4">
          <h3 className="font-semibold text-apple-header mb-4">Recent Activity</h3>
          
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-white/20 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-coral-accent/10 rounded-full flex items-center justify-center">
                      {transaction.type === 'credit_drop' ? (
                        <Gift className="w-4 h-4 text-coral-accent" />
                      ) : transaction.type === 'redemption' ? (
                        <Calendar className="w-4 h-4 text-blue-500" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-apple-header">
                        {transaction.description || transaction.type.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-apple-detail">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-apple-detail mx-auto mb-3" />
              <p className="text-apple-detail">No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation currentPage="wallet" />
    </div>
  );
};

export default Wallet;
