
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

const CertificationPathway = () => {
  const pathways = [
    {
      title: "Certified AI Operator – Foundation",
      description: "Learn front-desk AI, calendar automation, and recall workflows",
      skills: ["Prompt writing", "GoHighLevel", "Form logic"],
      bestFor: "Front office, admin",
      ctaText: "Begin Foundation Path"
    },
    {
      title: "Certified AI Operator – Growth",
      description: "Automate lead follow-up and increase treatment acceptance",
      skills: ["Pipeline logic", "SMS/email sequences", "Sales automation"],
      bestFor: "Treatment coordinators",
      ctaText: "Start Growth Path"
    },
    {
      title: "Certified AI Operator – Master",
      description: "Deploy multi-agent systems that run your office at scale",
      skills: ["Slack handoffs", "API integrations", "SOP bots"],
      bestFor: "Owners, consultants",
      ctaText: "Unlock Master Path"
    }
  ];

  return (
    <section className="py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Choose Your Certification Path
          </h2>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-x-auto pb-4">
          {pathways.map((path, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={index * 0.1}>
              <Card className="h-full glass-card border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <h3 className="text-xl font-bold text-nextgen-purple">{path.title}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/80">{path.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-2">Skills:</h4>
                    <ul className="space-y-1">
                      {path.skills.map((skill, idx) => (
                        <li key={idx} className="text-white/70">{skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-white/60 mb-1">Best For:</h4>
                    <p className="text-white/70">{path.bestFor}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white">
                    {path.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationPathway;
