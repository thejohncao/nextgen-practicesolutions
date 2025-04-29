
import React from 'react';
import { Clock, Zap, Heart } from "lucide-react";
import DisplayCard from './DisplayCard';

const BenefitCardsGrid: React.FC = () => {
  const benefitCards = [
    {
      icon: Clock,
      title: "Save Your Time",
      description: "Eliminate busywork. Automate operations. Buy back the hours you can never replace."
    },
    {
      icon: Zap,
      title: "Recharge Your Energy",
      description: "Remove chaos from your day. Empower your team. Grow with momentum, not stress."
    },
    {
      icon: Heart,
      title: "Win Back Your Life",
      description: "Spend time with family. Lead with vision, not exhaustion. Build a life outside the office."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {benefitCards.map((card, index) => (
        <DisplayCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          description={card.description}
          index={index}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default BenefitCardsGrid;
