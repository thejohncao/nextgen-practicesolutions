
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
    className="absolute group transition-all duration-500 ease-out hover:scale-105"
    style={{ 
      transform: `rotate(${rotation}deg) translateX(300px) rotate(-${rotation}deg)`,
    }}
  >
    <div className={`p-4 rounded-lg ${color} backdrop-blur-sm bg-opacity-10 border border-white/10 
      transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-opacity-20 max-w-[180px]`}>
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

        <div className="relative w-full max-w-[700px] h-[700px] mx-auto">
          {/* Glowing Circle with Arrows */}
          <div className="absolute inset-[100px] rounded-full border-2 border-white/20 glow-circle">
            {/* Arrows on the circle */}
            {stages.map((stage, index) => (
              <div 
                key={`arrow-${index}`} 
                className="absolute"
                style={{
                  transform: `rotate(${stage.rotation}deg) translateX(250px) rotate(-${stage.rotation}deg)`,
                  width: "30px",
                  height: "30px"
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white/80 transform -rotate-90"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-10">
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
          <div className="absolute inset-[50px] rounded-full border border-white/5"></div>
          <div className="absolute inset-[150px] rounded-full border border-white/5"></div>
          <div className="absolute inset-[200px] rounded-full border border-white/5"></div>
        </div>
      </div>

      <style>
        {`
          .glow-circle {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            animation: pulse 3s infinite alternate;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
            100% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.5); }
          }
        `}
      </style>
    </section>
  );
};

export default FlywheelSection;
