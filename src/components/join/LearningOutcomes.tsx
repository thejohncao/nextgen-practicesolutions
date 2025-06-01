
import React from 'react';
import { CheckCircle, DollarSign, MessageSquare, Bot, Users, Briefcase } from 'lucide-react';

const LearningOutcomes = () => {
  const outcomes = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Confidently close $3K–$20K treatments",
      description: "Master the psychology and frameworks for high-value case acceptance",
      category: "Revenue Growth"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Present CareCredit, Cherry, Sunbit",
      description: "Navigate financing conversations with confidence and convert more patients",
      category: "Patient Financing"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Run automated follow-up & scheduling",
      description: "Leverage AI assistants to streamline operations and reduce manual work",
      category: "AI Operations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Lead a front office team using AI tools",
      description: "Develop leadership skills and train others in modern practice management",
      category: "Leadership"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Launch or grow your dental career",
      description: "Access exclusive job opportunities and advance your professional trajectory",
      category: "Career Development"
    }
  ];

  const skillCategories = [
    {
      title: "For Practice Owners",
      skills: [
        "Hire pre-trained, certified staff",
        "Implement proven growth systems",
        "Reduce training overhead and costs",
        "Scale without adding headcount"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "For Treatment Coordinators",
      skills: [
        "Advanced case presentation techniques",
        "Financing expertise across all major platforms",
        "Objection handling mastery",
        "Leadership and mentoring capabilities"
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "For Career Starters",
      skills: [
        "Industry-ready professional skills",
        "Job placement network access",
        "Mentorship and ongoing support",
        "Clear advancement pathway"
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Practical Skills You'll Gain
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real-world capabilities that translate directly to increased revenue and career advancement.
          </p>
        </div>

        {/* Main Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div key={index} className="glass-card p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nextgen-purple/10 flex items-center justify-center text-nextgen-purple group-hover:scale-110 transition-transform">
                  {outcome.icon}
                </div>
                <div>
                  <div className="text-xs font-medium text-nextgen-purple/80 uppercase tracking-wide mb-2">
                    {outcome.category}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                    {outcome.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audience-Specific Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className={`${category.bgColor} border border-white/10 rounded-xl p-6`}>
              <h3 className={`text-xl font-semibold mb-6 ${category.color}`}>
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className={`h-5 w-5 ${category.color} mt-0.5 flex-shrink-0`} />
                    <span className="text-white/80 text-sm leading-relaxed">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-nextgen-purple/20 to-nextgen-blue/20 border border-nextgen-purple/30 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-nextgen-purple" />
            <span className="text-sm font-medium text-white">All skills backed by real-world implementation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
