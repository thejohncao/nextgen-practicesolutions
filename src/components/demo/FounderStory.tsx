
import React from 'react';
import { Award, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FounderStory = () => {
  const credentials = [
    {
      icon: <Award className="h-6 w-6" />,
      text: "Certified AI strategist"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      text: "Doubled practice collections using AI workflows"
    },
    {
      icon: <Users className="h-6 w-6" />,
      text: "Google Cloud Generative AI program graduate"
    }
  ];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  Meet the Creator Behind the Platform
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Founder Image Placeholder */}
                <div className="text-center lg:text-left">
                  <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-nextgen-purple to-nextgen-blue flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-white">JC</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Jonathan Cao</h3>
                  <p className="text-white/70">Founder & CEO</p>
                </div>

                {/* Story Content */}
                <div className="lg:col-span-2">
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    Jonathan Cao is a certified AI strategist who built NextGenPractice.org from the ground up using his experience in dental operations and advanced training through Google Cloud's Generative AI program.
                  </p>
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    After doubling practice collections using AI workflows, he launched NextGen to help offices nationwide modernize their front desk, patient experience, and revenue systems.
                  </p>

                  {/* Credentials */}
                  <div className="space-y-3">
                    {credentials.map((credential, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-nextgen-purple/20 flex items-center justify-center text-nextgen-purple">
                          {credential.icon}
                        </div>
                        <span className="text-white/80">{credential.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
