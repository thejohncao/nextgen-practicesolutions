
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Copy, Share2, Gift, QrCode, TrendingUp } from 'lucide-react';
import { useReferrals } from '@/hooks/useReferrals';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const PatientReferrals = () => {
  const { 
    referrals, 
    userReferralCode, 
    loading, 
    getCompletedReferrals, 
    getTotalBonusCredits, 
    getReferralLink 
  } = useReferrals();
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);

  const referralLink = getReferralLink();
  const completedReferrals = getCompletedReferrals();
  const totalBonusCredits = getTotalBonusCredits();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join NextGen Practice',
          text: 'Get treatment credits when you sign up!',
          url: referralLink,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      copyToClipboard(referralLink, 'Referral link');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading referrals...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Referral Program</h1>
        <p className="text-white/70">Invite friends and earn bonus credits for every successful referral</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{completedReferrals.length}</div>
                <div className="text-blue-300 text-sm">Successful Referrals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Gift className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{totalBonusCredits}</div>
                <div className="text-green-300 text-sm">Bonus Credits Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">{referrals.length}</div>
                <div className="text-purple-300 text-sm">Total Referrals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Tools */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Share Your Referral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Your Referral Code</label>
            <div className="flex gap-2">
              <Input
                value={userReferralCode}
                readOnly
                className="bg-white/10 border-white/20 text-white"
              />
              <Button
                onClick={() => copyToClipboard(userReferralCode, 'Referral code')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Your Referral Link</label>
            <div className="flex gap-2">
              <Input
                value={referralLink}
                readOnly
                className="bg-white/10 border-white/20 text-white text-sm"
              />
              <Button
                onClick={() => copyToClipboard(referralLink, 'Referral link')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={shareReferral}
              className="bg-nextgen-purple hover:bg-nextgen-purple/90"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Link
            </Button>
            
            <Button
              onClick={() => setShowQR(!showQR)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </div>

          {showQR && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <div className="text-center text-gray-600 text-sm">
                QR Code generation coming soon!<br/>
                Share your referral link for now.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-white font-medium mb-2">1. Share Your Link</h3>
              <p className="text-white/70 text-sm">Send your unique referral link to friends and family</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-white font-medium mb-2">2. Friend Signs Up</h3>
              <p className="text-white/70 text-sm">They create an account and get welcome credits</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-white font-medium mb-2">3. Earn Rewards</h3>
              <p className="text-white/70 text-sm">You both get bonus credits when they book their first treatment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No referrals yet. Start sharing your link to earn bonus credits!
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <div className="text-white font-medium">
                      Referral #{referral.referral_code}
                    </div>
                    <div className="text-white/70 text-sm">
                      {format(new Date(referral.created_at), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={referral.status === 'completed' ? 'default' : 'secondary'}
                      className={referral.status === 'completed' ? 'bg-green-500/20 text-green-300' : ''}
                    >
                      {referral.status}
                    </Badge>
                    {referral.status === 'completed' && (
                      <div className="text-green-400 text-sm mt-1">
                        +{referral.bonus_credits} credits
                      </div>
                    )}
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

export default PatientReferrals;
