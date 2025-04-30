
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Check, Award, BookOpen, Briefcase, Trophy } from 'lucide-react';
import RainbowButton from '@/components/ui/rainbow-button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CertificationBlockProps {
  title: string;
  subtitle: string;
  icon: React.ReactElement;
  items: Record<string, string[]>;
  color?: string;
  delay?: number;
}

const CertificationBlock = ({ 
  title, 
  subtitle, 
  icon, 
  items, 
  color = "nextgen-purple",
  delay = 0 
}: CertificationBlockProps) => {
  const getColorClasses = (colorName: string) => {
    const colorMap = {
      "nextgen-purple": "text-nextgen-purple bg-nextgen-purple/10 border-nextgen-purple/30",
      "nextgen-blue": "text-nextgen-blue bg-nextgen-blue/10 border-nextgen-blue/30",
      "amber": "text-amber-400 bg-amber-400/10 border-amber-400/30"
    };
    
    return colorMap[colorName] || colorMap["nextgen-purple"];
  };
  
  const iconColorClass = color === "nextgen-purple" ? "text-nextgen-purple" : 
                          color === "nextgen-blue" ? "text-nextgen-blue" : 
                          "text-amber-400";
                          
  const checkColorClass = color === "nextgen-purple" ? "text-nextgen-purple" : 
                          color === "nextgen-blue" ? "text-nextgen-blue" : 
                          "text-amber-400";

  return (
    <FadeInSection delay={delay}>
      <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className={cn("p-3 rounded-full flex items-center justify-center", 
            color === "nextgen-purple" ? "bg-nextgen-purple/10" : 
            color === "nextgen-blue" ? "bg-nextgen-blue/10" : 
            "bg-amber-400/10"
          )}>
            {React.cloneElement(icon, { className: `h-6 w-6 ${iconColorClass}` })}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
          </div>
        </div>
        
        <p className="text-white/80 mb-6">{subtitle}</p>
        
        <div className="space-y-6">
          {Object.entries(items).map(([heading, list], idx) => (
            <div key={idx}>
              <h4 className="text-sm uppercase text-white/50 mb-3">{heading}:</h4>
              <ul className="space-y-2">
                {list.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 ${checkColorClass} mt-0.5 flex-shrink-0`} />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

const AvailableCertifications = () => {
  const certifications = [
    {
      title: "Treatment Coordinator Certification",
      subtitle: "Train your team to follow up, present confidently, and close more treatment plans — using proven patient communication frameworks and objection handling.",
      icon: <BookOpen className="h-6 w-6 text-nextgen-purple" />,
      items: {
        "Includes": [
          "7 training modules",
          "Patient journey mastery",
          "Roleplay scripts + objection cheat sheets",
          "Final exam + digital badge"
        ]
      },
      color: "nextgen-purple"
    },
    {
      title: "Practice Systems Operator Certification",
      subtitle: "Become fluent in the tools that power the modern front office — from automation to campaign management.",
      icon: <Briefcase className="h-6 w-6 text-nextgen-blue" />,
      items: {
        "Includes training across": [
          "GoHighLevel CRM",
          "Mailchimp + patient campaigns",
          "Stripe payment setup",
          "Monday.com SOP execution",
          "Notion + Slack for team workflows"
        ]
      },
      color: "nextgen-blue"
    },
    {
      title: "Executive Operator Badge (Honor Designation)",
      subtitle: "Awarded to team leads or founders who complete both certifications and demonstrate application in a live clinic setting. Endorsed by NextGen's leadership team and modeled after healthcare leadership standards from Harvard Business School Online and UCLA's MHA Track.",
      icon: <Trophy className="h-6 w-6 text-amber-400" />,
      items: {
        "Includes": [
          "Public directory listing",
          "LinkedIn badge",
          "Certificate suitable for framing",
          "Priority access to Boardroom tools"
        ]
      },
      color: "amber"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Available Certifications</h2>
            <div className="w-24 h-1 bg-nextgen-purple/50 mx-auto"></div>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <CertificationBlock key={index} {...cert} delay={0.2 * index} />
          ))}
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row gap-4 justify-center">
          <RainbowButton asChild size="lg">
            <Link to="/academy">
              Enroll Your Team
            </Link>
          </RainbowButton>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              to="/academy/curriculum"
              className="px-6 py-3 border border-white/10 bg-white/5 text-white rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Preview Modules
            </Link>
            
            <Link 
              to="/academy/certification"
              className="px-6 py-3 border border-white/10 bg-white/5 text-white rounded-full hover:bg-white/10 transition-colors text-center"
            >
              See Real Results
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableCertifications;
