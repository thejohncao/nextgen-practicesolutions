
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <div 
      className="glass-card p-6 text-center flex flex-col items-center animate-fade-in-up card-transition" 
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 flex items-center justify-center mb-4">
        <Icon size={28} className="text-nextgen-purple" strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-medium text-white mb-3">{title}</h3>
      <p className="text-white/70 whitespace-pre-line leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
