
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import DisplayCard from './DisplayCard';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, index }) => {
  return (
    <DisplayCard
      icon={icon}
      title={title}
      description={description}
      index={index}
      className={cn(
        "animate-fade-in-up w-full",
        index === 0 ? "md:ml-0" : ""
      )}
    />
  );
};

export default BenefitCard;
