
import React from 'react';
import { Crown, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MembershipCTA = () => {
  const benefits = [
    '15% off all treatments',
    'Monthly credit allowance',
    'Priority booking access',
    'Exclusive member events',
    'Complimentary consultations'
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="apple-card p-6 bg-gradient-to-br from-white to-cream-50 border-2 border-coral-accent/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coral-accent/10 rounded-full mb-4">
            <Crown className="w-8 h-8 text-coral-accent" />
          </div>
          
          <h3 className="text-xl font-bold text-apple-header mb-2">
            Join Membership & Save
          </h3>
          
          <p className="text-apple-detail">
            Unlock exclusive pricing and perks with our membership program
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm text-apple-detail">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 border-coral-accent text-coral-accent hover:bg-coral-accent/10"
          >
            Learn More
          </Button>
          
          <Button className="flex-1 bg-coral-accent hover:bg-coral-accent/90 text-white">
            Join Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-apple-detail">
            Start saving immediately • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipCTA;
