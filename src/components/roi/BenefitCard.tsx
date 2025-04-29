
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <div 
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10",
        "p-6 rounded-xl flex flex-col items-center",
        "animate-fade-in-up shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
        "hover:shadow-[0_8px_32px_rgba(155,135,245,0.15)] transition-shadow duration-300",
        "relative overflow-hidden"
      )}
      style={{animationDelay: `${index * 100}ms`}}
    >
      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-nextgen-purple/5 blur-xl rounded-xl opacity-70"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-nextgen-purple/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(155,135,245,0.3)]">
          <Icon size={24} className="text-nextgen-purple" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
        <p className="text-white/70 whitespace-pre-line leading-relaxed text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;
