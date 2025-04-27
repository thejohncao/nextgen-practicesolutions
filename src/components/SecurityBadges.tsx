
import React from 'react';
import { Shield, LockKeyhole, CloudOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const badges = [
  {
    title: "HIPAA Verified",
    icon: Shield,
    description: "Fully HIPAA compliant data handling"
  },
  {
    title: "SOC 2 Certified",
    icon: LockKeyhole,
    description: "Enterprise-grade security protocols"
  },
  {
    title: "End-to-End Encryption",
    icon: CloudOff,
    description: "Zero-knowledge data protection"
  }
];

const partners = [
  "Salesforce Partner",
  "Meta Ads Partner",
  "Google Ads Partner",
  "Dental Intelligence",
  "OpenAI API Secured"
];

const SecurityBadges = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {badges.map((badge, index) => (
          <div 
            key={badge.title}
            className="flex items-center gap-4 p-4 glass-card animate-fade-in transform hover:scale-[1.02] transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="rounded-full p-2 bg-white/5">
              <badge.icon className="h-6 w-6 text-nextgen-purple" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{badge.title}</h4>
              <p className="text-sm text-white/60">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {partners.map((partner, index) => (
          <Badge
            key={partner}
            variant="outline"
            className="py-2 justify-center text-white/60 border-white/10 hover:bg-white/5"
          >
            {partner}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;
