
import React from 'react';
import { Star, Clock, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Treatment {
  id: string;
  name: string;
  description: string | null;
  credit_cost: number;
  price_cents: number;
  category: string | null;
  is_active: boolean;
}

interface TreatmentCardProps {
  treatment: Treatment;
  isMember: boolean;
  isGuest: boolean;
  availableCredits: number;
}

const TreatmentCard = ({ treatment, isMember, isGuest, availableCredits }: TreatmentCardProps) => {
  const fullPrice = treatment.price_cents / 100;
  const memberPrice = Math.round(fullPrice * 0.85 * 100) / 100; // 15% discount
  const savings = fullPrice - memberPrice;
  const canAffordWithCredits = treatment.credit_cost <= availableCredits;

  const getBadge = () => {
    if (treatment.category?.toLowerCase().includes('new')) {
      return { text: 'NEW', color: 'bg-blue-500' };
    }
    if (fullPrice > 500) {
      return { text: 'POPULAR', color: 'bg-coral-accent' };
    }
    if (isMember && savings > 50) {
      return { text: `SAVE $${savings}`, color: 'bg-green-500' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <div className="apple-card hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-coral-accent/20 to-coral-accent/40 relative">
        {badge && (
          <div className={`absolute top-3 left-3 ${badge.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
            {badge.text}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
        
        {/* Treatment category icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl opacity-60">
            {treatment.category?.toLowerCase().includes('facial') ? '✨' : 
             treatment.category?.toLowerCase().includes('laser') ? '⚡' :
             treatment.category?.toLowerCase().includes('injectable') ? '💉' : '🌟'}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        {treatment.category && (
          <div className="text-xs text-coral-accent font-medium mb-1">
            {treatment.category.toUpperCase()}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-apple-header mb-2 line-clamp-2">
          {treatment.name}
        </h3>

        {/* Description */}
        {treatment.description && (
          <p className="text-sm text-apple-detail mb-3 line-clamp-2">
            {treatment.description}
          </p>
        )}

        {/* Treatment details */}
        <div className="flex items-center gap-4 text-xs text-apple-detail mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>45-60 min</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            <span>{treatment.credit_cost} credits</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {isMember ? (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-apple-header">
                  ${memberPrice}
                </span>
                <span className="text-sm text-apple-detail line-through">
                  ${fullPrice}
                </span>
              </div>
              <div className="text-xs text-green-600 font-medium">
                Member saves ${savings}!
              </div>
            </div>
          ) : (
            <div className="text-lg font-bold text-apple-header">
              ${fullPrice}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {isGuest ? (
            <Button className="w-full bg-coral-accent hover:bg-coral-accent/90 text-white">
              Join to Book
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={!canAffordWithCredits}
              >
                Add to Wallet
                {canAffordWithCredits && <CreditCard className="w-3 h-3 ml-1" />}
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-coral-accent hover:bg-coral-accent/90"
              >
                <Calendar className="w-3 h-3 mr-1" />
                Book Now
              </Button>
            </div>
          )}
        </div>

        {/* Credit affordability indicator */}
        {!isGuest && (
          <div className="mt-2 text-xs text-center">
            {canAffordWithCredits ? (
              <span className="text-green-600">✓ You can afford this with credits</span>
            ) : (
              <span className="text-apple-detail">
                Need {treatment.credit_cost - availableCredits} more credits
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentCard;
