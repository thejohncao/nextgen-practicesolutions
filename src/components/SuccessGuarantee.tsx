
import React, { useEffect } from 'react';
import { Shield, Heart, Rocket, HandHeart } from "lucide-react";
import SparkleText from './effects/SparkleText';

const guaranteePoints = [
  {
    title: "Built for You",
    description: "We fully implement and test your entire AI system.",
    icon: Shield,
  },
  {
    title: "Backed by Humans",
    description: "You'll meet with real people who know your goals and measure performance with you.",
    icon: HandHeart,
  },
  {
    title: "Proven ROI",
    description: "Every campaign, every treatment closed, every reactivation—we track and show you the impact.",
    icon: Rocket,
  },
  {
    title: "Scalable Playbooks",
    description: "As your practice evolves, we unlock new growth plans, templates, and workflows to match.",
    icon: Heart,
  },
];

const SuccessGuarantee = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('success-guarantee');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="success-guarantee" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/8 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/8 blur-[120px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <SparkleText>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">Our Success Guarantee</h2>
          </SparkleText>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            You don't just get AI agents. You get a team behind them. From the moment we install your operating system, our support team is here to make sure it works—seamlessly, profitably, and without stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {guaranteePoints.map((point, index) => (
            <div 
              key={point.title} 
              className={`glass-card p-8 text-center transition-all duration-700 backdrop-blur-lg border border-white/10 hover:bg-white/5 hover:shadow-lg hover:scale-[1.02] transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4 relative">
                <div className="rounded-full bg-nextgen-purple/20 p-4 relative group-hover:scale-110 transition-transform duration-300">
                  <point.icon className="h-8 w-8 text-nextgen-purple" />
                  <div className="absolute inset-0 bg-nextgen-purple/20 blur-xl scale-0 hover:scale-100 transition-transform duration-300 rounded-full" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">{point.title}</h3>
              <p className="text-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessGuarantee;
