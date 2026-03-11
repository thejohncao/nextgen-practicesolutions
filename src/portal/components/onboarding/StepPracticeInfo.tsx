import { usePractice } from '../../context/PracticeContext';
import { Building2, MapPin, CreditCard, User, Mail } from 'lucide-react';

export default function StepPracticeInfo() {
  const { activePractice } = usePractice();

  const fields = [
    { icon: Building2, label: 'Practice Name', value: activePractice.name },
    { icon: User, label: 'Owner', value: activePractice.ownerName },
    { icon: Mail, label: 'Email', value: activePractice.ownerEmail },
    { icon: MapPin, label: 'Location', value: activePractice.locations.join(', ') },
    { icon: CreditCard, label: 'Plan', value: activePractice.plan },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">Practice Information</h2>
      <p className="text-sm text-[#6B7280] mb-6">Review your practice details before we begin the onboarding audit.</p>

      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 space-y-4">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <f.icon className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
            <div>
              <span className="text-xs text-[#6B7280]">{f.label}</span>
              <p className="text-sm text-[#F9FAFB] font-medium">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
