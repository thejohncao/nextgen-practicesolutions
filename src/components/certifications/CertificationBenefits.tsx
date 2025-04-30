
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Award, Sparkles, CheckCircle, Users } from 'lucide-react';
import AnimatedHeading from '@/components/ui/animated-heading';

const CertificationBenefits = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-12 w-12 text-nextgen-purple" />,
      title: "Certified staff close more treatment",
      description: "Staff with proven skills bring more value and generate measurable ROI through increased case acceptance."
    },
    {
      icon: <Users className="h-12 w-12 text-nextgen-purple" />,
      title: "Faster onboarding and consistent SOPs",
      description: "They follow systems correctly, use your tools as intended, and maintain consistency across locations."
    },
    {
      icon: <Sparkles className="h-12 w-12 text-nextgen-purple" />,
      title: "Less turnover, better team culture",
      description: "Staff who are confident in their skills stay longer and contribute more to your practice success."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <AnimatedHeading
              text="Why Certification Matters" 
              as="h2"
              className="text-3xl md:text-4xl mb-6"
            />
            
            <p className="text-xl md:text-2xl italic text-white/90 mb-6">
              In a modern practice, skill isn't optional — it's leverage.
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <FadeInSection key={index} delay={0.2 * index}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
        
        <FadeInSection delay={0.6}>
          <div className="mt-16 max-w-2xl mx-auto p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-10 w-10 text-amber-400" />
            </div>
            
            <h3 className="text-xl font-bold mb-3">Shareable Credentials</h3>
            <p className="text-white/80">
              Every certification includes a shareable badge for LinkedIn, email signature, or certificate wall display.
            </p>
          </div>
        </FadeInSection>
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-nextgen-purple/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-nextgen-blue/5 blur-[100px] rounded-full"></div>
      </div>
    </section>
  );
};

export default CertificationBenefits;
