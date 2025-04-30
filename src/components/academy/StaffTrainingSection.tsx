
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/boardroom/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInSection } from "@/components/ui/fade-in-section";

const StaffTrainingSection = () => {
  const improvementPoints = [
    {
      before: ""Let me know if you have any questions…"",
      after: "Becomes confident call-to-action language"
    },
    {
      before: ""They ghosted us again…"",
      after: "Becomes high-converting reactivation flows"
    },
    {
      before: ""She's still training..."",
      after: "Becomes plug-and-play onboarding"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <SectionHeader
            title="Most Staff Are Thrown In. We Train Them to Close."
            subtitle=""
          />
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-white/80 mb-6">
              Most front desk and treatment coordinators are expected to "just figure it out."
              But without structure, follow-up scripts, or proper onboarding, patients fall through the cracks — and treatment goes unscheduled.
            </p>
            <p className="text-lg text-white/80 mb-6">
              <span className="text-nextgen-purple font-semibold">NextGen Academy changes that.</span> 
              We turn your team into confident patient advocates who know exactly how to follow up, present treatment, and overcome objections — without sounding salesy.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 text-center text-white/90">What We Fix:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {improvementPoints.map((point, index) => (
                <Card key={index} className="glass-card overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <p className="text-white/80 italic mb-2">{point.before}</p>
                      <div className="flex items-center">
                        <ArrowRight className="h-5 w-5 text-nextgen-purple mr-2" />
                        <p className="text-nextgen-purple font-medium">{point.after}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3} className="text-center">
          <Button
            asChild
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white mt-6"
            size="lg"
          >
            <Link to="/academy/curriculum">
              See Exactly What They'll Learn
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default StaffTrainingSection;
