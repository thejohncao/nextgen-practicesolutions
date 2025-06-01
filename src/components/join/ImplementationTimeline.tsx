
import React from 'react';
import { GraduationCap, Zap, Bot, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ImplementationTimeline = () => {
  const steps = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Certify Team",
      description: "Train your front office in proven systems and AI tools",
      timeline: "Week 1-4",
      outcome: "Skilled, confident team ready to implement",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Plug in Growth System",
      description: "Deploy treatment coordination and financing frameworks",
      timeline: "Week 5-6",
      outcome: "Streamlined patient journey and case presentation",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Add AI Assistants",
      description: "Integrate Miles, Giselle, Devon, and Alma for automation",
      timeline: "Week 7-8",
      outcome: "24/7 patient engagement and follow-up",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Watch Collections Grow",
      description: "Monitor results and optimize for continuous improvement",
      timeline: "Month 2+",
      outcome: "2x treatment acceptance, $30K+ monthly growth",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const metrics = [
    { label: "Treatment Acceptance Rate", value: "2x", description: "Double your case acceptance" },
    { label: "Monthly Revenue Growth", value: "$30K+", description: "Average partner practice boost" },
    { label: "Admin Roles Replaced", value: "3", description: "Through AI automation" },
    { label: "Hours Saved Monthly", value: "50+", description: "On follow-up & scheduling" }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            How It Works
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Your practice transformation journey from Academy training to measurable ROI.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 to-green-500 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step number */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-bold text-nextgen-dark z-10 hidden lg:flex">
                    {index + 1}
                  </div>
                  
                  <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 mt-24 lg:mt-32">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} mb-4 ${step.color}`}>
                        {step.icon}
                      </div>
                      
                      <div className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">
                        {step.timeline}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 text-white">
                        {step.title}
                      </h3>
                      
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className={`inline-flex items-center gap-2 ${step.bgColor} border border-white/10 rounded-full px-3 py-1`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`}></div>
                        <span className="text-xs text-white/80">{step.outcome}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Metrics */}
        <div className="bg-gradient-to-r from-nextgen-purple/10 to-nextgen-blue/10 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Real Results from Partner Practices</h3>
            <p className="text-white/70">Backed by data from our pilot implementations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-white/80 mb-1">{metric.label}</div>
                <div className="text-xs text-white/60">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;
