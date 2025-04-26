
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FlywheelStageProps {
  label: string;
  description: string;
  color: string;
  rotation: number;
}

const FlywheelStage: React.FC<FlywheelStageProps> = ({ label, description, color, rotation }) => (
  <div 
    className="absolute w-[200px] group transition-all duration-500 ease-out hover:scale-110"
    style={{ 
      transform: `rotate(${rotation}deg) translateX(250px) rotate(-${rotation}deg)`,
    }}
  >
    <div className={`p-4 rounded-lg ${color} backdrop-blur-sm bg-opacity-10 border border-white/10 
      transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-opacity-20`}>
      <h4 className="text-lg font-bold mb-1">{label}</h4>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  </div>
);

const stages = [
  {
    label: "Attract",
    description: "AI-driven marketing, lead generation, patient acquisition.",
    color: "bg-red-500",
    rotation: 0
  },
  {
    label: "Engage",
    description: "Appointment prep, consultation support, nurturing sequences.",
    color: "bg-blue-500",
    rotation: 60
  },
  {
    label: "Convert",
    description: "Treatment planning, financial support, same-day case closure.",
    color: "bg-green-500",
    rotation: 120
  },
  {
    label: "Deliver",
    description: "Operational automation, front-office workflows, AI concierge.",
    color: "bg-purple-500",
    rotation: 180
  },
  {
    label: "Retain",
    description: "Membership retention, referral growth, loyalty campaigns.",
    color: "bg-nextgen-purple",
    rotation: 240
  },
  {
    label: "Expand",
    description: "Upsells, reactivation, patient lifetime value optimization.",
    color: "bg-nextgen-blue",
    rotation: 300
  }
];

const FlywheelSection = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
            How Our AI Growth Engine Powers Your Practice
          </h2>
        </div>

        <div className="relative w-[600px] h-[600px] mx-auto">
          {/* Circular Base with Rotation Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-[spin_30s_linear_infinite]" />
          
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-[200px]">
              <h3 className="text-xl font-bold text-gradient mb-2">AI-Powered Growth Engine</h3>
              <p className="text-sm text-white/70">for Modern Practices</p>
            </div>
          </div>

          {/* Stages */}
          {stages.map((stage, index) => (
            <FlywheelStage key={stage.label} {...stage} />
          ))}

          {/* Decorative Elements */}
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute inset-[100px] rounded-full border border-white/5" />
          <div className="absolute inset-[200px] rounded-full border border-white/5" />
        </div>
      </div>
    </section>
  );
};

export default FlywheelSection;
