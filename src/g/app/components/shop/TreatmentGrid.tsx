
import React from 'react';
import TreatmentCard from './TreatmentCard';

interface Treatment {
  id: string;
  name: string;
  description: string | null;
  credit_cost: number;
  price_cents: number;
  category: string | null;
  is_active: boolean;
}

interface TreatmentGridProps {
  treatments: Treatment[];
  isMember: boolean;
  isGuest: boolean;
  availableCredits: number;
}

const TreatmentGrid = ({ treatments, isMember, isGuest, availableCredits }: TreatmentGridProps) => {
  if (treatments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-apple-header mb-2">
          No treatments found
        </h3>
        <p className="text-apple-detail">
          Try adjusting your filters to see more options
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {treatments.map(treatment => (
        <TreatmentCard
          key={treatment.id}
          treatment={treatment}
          isMember={isMember}
          isGuest={isGuest}
          availableCredits={availableCredits}
        />
      ))}
    </div>
  );
};

export default TreatmentGrid;
