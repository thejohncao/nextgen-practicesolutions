import React, { useEffect } from 'react';
import { Shield, Heart, Rocket, HandHeart } from "lucide-react";

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
    <div id="success-guarantee" className="space-y-8">
      <div className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">Our Success Guarantee</h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          You don't just get AI agents. You get a team behind them. From the moment we install your operating system, our support team is here to make sure it works—seamlessly, profitably, and without stress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {guaranteePoints.map((point, index) => (
          <div 
            key={point.title} 
            className={`glass-card p-6 text-center transition-all duration-700 transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-center mb-4">
              <point.icon className="h-8 w-8 text-nextgen-purple" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">{point.title}</h3>
            <p className="text-white/70">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessGuarantee;
