
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import SectionHeader from '@/components/boardroom/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, LayoutGrid, TrendingUp } from 'lucide-react';
import EmailCollectionDialog from '@/components/EmailCollectionDialog';

const BoardroomWorkflowSection = () => {
  const workflowSteps = [
    {
      title: "Train Your Team via Academy",
      icon: <GraduationCap className="h-6 w-6 text-nextgen-purple" />,
      color: "bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Deploy AI Agents for daily ops",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Activate Your Boardroom to track everything from one place",
      icon: <LayoutGrid className="h-6 w-6 text-green-500" />,
      color: "bg-green-500/10 border-green-500/20"
    },
    {
      title: "Lead with clarity — not chaos",
      icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20"
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <SectionHeader
            title="Boardroom Workflow"
            subtitle=""
          />
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {workflowSteps.map((step, index) => (
                <Card key={index} className={`glass-card ${step.color} transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="rounded-full p-2 bg-white/10 mr-3">
                        {step.icon}
                      </div>
                      <span className="text-sm text-white/50">Step {index + 1}</span>
                    </div>
                    <p className="text-lg text-white/90">{step.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.3} className="text-center mt-12">
          <EmailCollectionDialog
            triggerText="Request a Boardroom Demo"
            buttonVariant="default"
            buttonSize="lg"
            buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
          />
        </FadeInSection>
      </div>
    </section>
  );
};

export default BoardroomWorkflowSection;
