
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Card, CardContent } from '@/components/ui/card';

const WhyCertExists = () => {
  const aiFeatures = [
    { agent: "Miles", description: "Schedule and follow up" },
    { agent: "Giselle", description: "Nurture leads" },
    { agent: "Devon", description: "Close treatment" },
    { agent: "Alma", description: "Document SOPs" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: Badge Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <FadeInSection>
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-nextgen-blue/70 to-nextgen-purple flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-gray-800 font-bold text-2xl">AI</div>
                      <div className="text-gray-800 font-bold text-2xl">OPERATOR</div>
                      <div className="text-nextgen-purple text-sm mt-2">Certified by NextGen</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-nextgen-purple/10 rounded-full blur-lg"></div>
              </div>
            </FadeInSection>
          </div>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2">
            <FadeInSection delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                AI Is Replacing Tasks. This Cert Trains You to Lead Them.
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                The NextGen Academy doesn't teach theory.
                We train your team to operate AI in real-world dental workflows:
              </p>
              
              <ul className="space-y-3 mb-8">
                {aiFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-nextgen-purple font-medium">{feature.agent}:</span>
                    <span className="text-gray-700">{feature.description}</span>
                  </li>
                ))}
              </ul>
              
              <Card className="bg-nextgen-purple/10 border-nextgen-purple/20">
                <CardContent className="p-6">
                  <p className="text-xl text-gray-800 font-medium">
                    We didn't invent AI.<br />
                    We built the playbook to use it.
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCertExists;
