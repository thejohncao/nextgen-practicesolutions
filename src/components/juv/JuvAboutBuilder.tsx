
import React from 'react';
import { Award, Code, TrendingUp, Zap, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const JuvAboutBuilder = () => {
  const credentials = [
    { icon: Award, text: "Google AI Certified" },
    { icon: Code, text: "OpenAI Development" },
    { icon: Zap, text: "Enterprise No-Code Systems" }
  ];

  const keyWins = [
    { icon: Zap, text: "Built 150+ automations" },
    { icon: TrendingUp, text: "Doubled practice revenue" },
    { icon: Users, text: "Replaces 5–7 hires with AI" }
  ];

  const signatureSystems = [
    { icon: Target, text: "Scaled Bespoke Dental Studios from manual ops to full automation" },
    { icon: TrendingUp, text: "Designed the entire patient funnel, membership logic, and CRM for JUV" },
    { icon: Users, text: "Created a virtual executive team (Miles, Giselle, Devon, Alma) to scale without hiring" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Cinematic Background with Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-dark via-black/90 to-nextgen-purple/20">
        <div className="absolute inset-0 bg-black/50" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)'
        }} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            👤 About the Builder
          </h2>
        </div>
        
        <Card className="glass-card max-w-7xl mx-auto border-nextgen-purple/20 bg-black/20 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              
              {/* Left Side - Floating Avatar */}
              <div className="relative flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-nextgen-purple/10 to-transparent">
                <div className="absolute inset-0 bg-gradient-to-r from-nextgen-purple/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-48 h-48 md:w-64 md:h-64 relative">
                    {/* Floating Avatar with Animation */}
                    <div className="w-full h-full bg-gradient-to-br from-nextgen-purple/30 to-nextgen-blue/30 rounded-full flex items-center justify-center animate-float border-2 border-nextgen-purple/20 shadow-2xl shadow-nextgen-purple/20">
                      <div className="w-44 h-44 md:w-60 md:h-60 bg-gradient-to-br from-nextgen-purple to-nextgen-blue rounded-full flex items-center justify-center">
                        <span className="text-5xl md:text-6xl text-white font-bold tracking-wider">JC</span>
                      </div>
                    </div>
                    
                    {/* Ambient Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 rounded-full blur-xl scale-110 animate-pulse-slow opacity-50" />
                  </div>
                </div>
              </div>

              {/* Right Side - Content Hierarchy */}
              <div className="flex flex-col justify-center p-8 lg:p-12 lg:pl-8">
                <div className="space-y-6">
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                      Jonathan Cao
                    </h3>
                    <p className="text-xl md:text-2xl text-nextgen-purple font-semibold mb-6">
                      AI Strategist. Systems Architect. Healthcare Operator.
                    </p>
                  </div>

                  {/* Vision Quote */}
                  <div className="border-l-4 border-nextgen-purple pl-6 py-4 bg-nextgen-purple/5 rounded-r-lg">
                    <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed font-light">
                      "I don't just automate practices. I build the systems that run them — so they scale without chaos."
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-white/80 leading-relaxed">
                    Founder of NextGen Practice Solutions, Jonathan architected the operating system powering JUV's $10M scale plan.
                    His work sits at the intersection of AI, no-code, and growth strategy — turning complexity into clean, autonomous workflows for multi-location healthcare businesses.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Ribbons */}
            <div className="p-8 lg:p-12 border-t border-white/10 bg-black/10">
              <div className="space-y-8">
                
                {/* Credentials Ribbon */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-nextgen-purple" />
                    Credentials
                  </h4>
                  <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
                    {credentials.map((credential, index) => (
                      <div key={index} className="flex items-center gap-2 px-4 py-2 bg-nextgen-purple/10 border border-nextgen-purple/20 rounded-full whitespace-nowrap hover:bg-nextgen-purple/20 transition-all duration-200">
                        <credential.icon className="h-4 w-4 text-nextgen-purple" />
                        <span className="text-white/90 text-sm font-medium">{credential.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Wins Ribbon */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Key Wins
                  </h4>
                  <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
                    {keyWins.map((win, index) => (
                      <div key={index} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full whitespace-nowrap hover:bg-green-500/20 transition-all duration-200">
                        <win.icon className="h-4 w-4 text-green-400" />
                        <span className="text-white/90 text-sm font-medium">{win.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature Systems Ribbon */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-amber-400" />
                    Signature Systems
                  </h4>
                  <div className="space-y-3">
                    {signatureSystems.map((system, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg hover:bg-amber-500/10 transition-all duration-200">
                        <system.icon className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90 text-sm leading-relaxed">{system.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default JuvAboutBuilder;
