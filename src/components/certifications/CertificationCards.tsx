
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Check, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CertificationCard = ({ 
  title, 
  description, 
  skills, 
  idealFor, 
  earnedBy,
  color = "nextgen-purple"
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 hover:border-${color}/30 transition-all duration-300 hover:shadow-lg hover:shadow-${color}/5`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${color}/10 mb-4`}>
        <Award className={`h-4 w-4 text-${color}`} />
        <span className="text-sm font-medium">Certification</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm uppercase text-white/50 mb-3">What they learn:</h4>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className={`h-5 w-5 text-${color} mt-0.5 flex-shrink-0`} />
                <span className="text-white/80">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm uppercase text-white/50 mb-3">Ideal for:</h4>
          <div className="flex flex-wrap gap-2">
            {idealFor.map((role, index) => (
              <Badge key={index} variant="outline" className="bg-white/5">
                {role}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase text-white/50 mb-3">Earned by:</h4>
          <ul className="space-y-2">
            {earnedBy.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className={`h-5 w-5 text-${color} mt-0.5 flex-shrink-0`} />
                <span className="text-white/80">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CertificationCards = () => {
  const certifications = [
    {
      title: "NextGen Certified Treatment Coordinator",
      description: "Train your team to communicate, follow up, and close with confidence.",
      skills: [
        "Patient journey communication",
        "Case presentation psychology",
        "Objection handling",
        "Follow-up scripting",
        "CRM usage (GHL, Notion)"
      ],
      idealFor: [
        "Front office",
        "Treatment coordinators",
        "Office managers",
        "New hires"
      ],
      earnedBy: [
        "Completing Academy training",
        "Passing final assessment"
      ],
      color: "nextgen-purple"
    },
    {
      title: "NextGen Certified Practice Systems Operator",
      description: "Master the tools that power the modern dental office.",
      skills: [
        "Mailchimp: patient campaigns (e.g., Mother's Day, Reactivation)",
        "Stripe: payment plan links, deposits",
        "GHL: automation triggers, AI lead flows",
        "Slack: AI agent updates, KPI delivery",
        "Monday: onboarding checklists, SOP flows",
        "Canva/Notion: editing templates + SOPs"
      ],
      idealFor: [
        "Practice managers",
        "Marketing coordinators",
        "DSO implementation staff"
      ],
      earnedBy: [
        "Completing implementation modules",
        "Passing quiz",
        "Submitting 1 live campaign"
      ],
      color: "nextgen-blue"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">What You Can Earn</h2>
            <div className="w-24 h-1 bg-nextgen-purple/50 mx-auto"></div>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <FadeInSection key={index} delay={0.2 * index}>
              <CertificationCard {...cert} />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationCards;
