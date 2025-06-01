
import React from 'react';
import { UserPlus, GraduationCap, Users, Rocket } from 'lucide-react';

const StudentJourney = () => {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "Enroll",
      description: "Choose your track and begin your transformation journey",
      details: [
        "Select Foundation, Growth, or Leadership track",
        "Access 24/7 learning platform",
        "Join exclusive student community"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Certify",
      description: "Complete modules, pass assessments, earn your credentials",
      details: [
        "Interactive lessons and real-world scenarios",
        "Hands-on practice with AI tools",
        "Comprehensive final examination"
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Coach",
      description: "Receive personalized guidance and ongoing support",
      details: [
        "1-on-1 mentorship sessions",
        "Career guidance and planning",
        "Interview preparation and tips"
      ],
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch",
      description: "Get placed in your ideal role or implement in your practice",
      details: [
        "Access to exclusive job network",
        "Practice implementation support",
        "Lifetime alumni community"
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Your Journey, Simplified
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From enrollment to career success—we guide you every step of the way.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative mb-16">
            {/* Connection line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 to-green-500"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step indicator */}
                  <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full ${step.bgColor} border-2 ${step.color.replace('text-', 'border-')} z-10 flex items-center justify-center`}>
                    <span className={`text-sm font-bold ${step.color}`}>{index + 1}</span>
                  </div>
                  
                  <div className="mt-32 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${step.bgColor} mb-6 ${step.color}`}>
                      {step.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')} flex-shrink-0`}></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center ${step.color}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-6 h-6 rounded-full ${step.bgColor} ${step.color} flex items-center justify-center text-xs font-bold`}>
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/70 mb-4">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')} flex-shrink-0`}></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Promise */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-full px-6 py-3">
            <Rocket className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-white">95% of graduates find placement within 30 days</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentJourney;
