
import React from 'react';
import { Award, Code, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const JuvAboutBuilder = () => {
  const poweredByLogos = [
    { name: "OpenAI", icon: Code },
    { name: "Google", icon: Award },
    { name: "Webflow", icon: TrendingUp },
    { name: "Zapier", icon: Zap }
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
            👤 Founder of NextGen Practice Solutions
          </h2>
        </div>
        
        <Card className="glass-card max-w-4xl mx-auto border-nextgen-purple/20 bg-black/20 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              
              {/* Left Side - Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 relative">
                  {/* Circular Avatar */}
                  <div className="w-full h-full bg-gradient-to-br from-nextgen-purple to-nextgen-blue rounded-full flex items-center justify-center shadow-2xl shadow-nextgen-purple/20 border-2 border-nextgen-purple/20">
                    <span className="text-3xl md:text-4xl text-white font-bold tracking-wider">JC</span>
                  </div>
                  
                  {/* Ambient Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 rounded-full blur-xl scale-110 animate-pulse-slow opacity-50" />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Name & Title */}
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                    Jonathan Cao
                  </h3>
                  <p className="text-sm md:text-base text-nextgen-purple/80 font-medium uppercase tracking-wider">
                    AI Strategist. Systems Architect. Healthcare Operator.
                  </p>
                </div>

                {/* Highlighted Quote */}
                <div className="mb-6">
                  <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed font-light border-l-4 border-nextgen-purple pl-6 py-4 bg-nextgen-purple/5 rounded-r-lg">
                    "My mission is to modernize practices — to give teams back their time and energy so they can focus on what matters most."
                  </blockquote>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-lg text-white/80 leading-relaxed mb-4">
                    Jonathan builds AI-powered systems that help healthcare businesses scale — combining automation, marketing, and operations into clean, self-running platforms.
                  </p>
                  <p className="text-base text-white/70 leading-relaxed">
                    Certified in AI development and growth automation through Google, OpenAI, and enterprise no-code frameworks.
                  </p>
                </div>

                {/* Powered By Badge Row */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-3 uppercase tracking-wider">Powered By</p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {poweredByLogos.map((logo, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200">
                        <logo.icon className="h-4 w-4 text-nextgen-purple/70" />
                        <span className="text-white/70 text-sm font-medium">{logo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default JuvAboutBuilder;
