import React, { useEffect } from 'react';
import { Calendar, Mail, MessageSquare, BookOpen, Check, Shield } from "lucide-react";

const IntegrationsSection = () => {
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

    const section = document.getElementById('integrations');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const integrations = [
    "GoHighLevel", "Google Calendar", "Meta Ads", "Typeform", 
    "Slack", "Cherry", "Stripe", "Loom", "Podium", "Notion"
  ];

  const complianceChecklist = [
    "HIPAA-Compliant Framework",
    "End-to-End Encryption",
    "Hosted on U.S. Secure Servers",
    "Built with HITECH & ADA Guidelines"
  ];

  return (
    <section id="integrations" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Shield className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Trusted by Practices</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Built for Healthcare. Trusted by Practices.
          </h2>
          
          <p className="text-lg text-white/70 mb-4">
            NextGen is secure by design, and integrates with the tools you already use.
          </p>
          
          <p className="text-sm text-white/60 max-w-2xl mx-auto">
            NextGen is built on HIPAA-ready architecture with seamless integrations for real clinical use.
          </p>
        </div>
        
        <div className={`glass-card p-8 mb-12 rounded-xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className={`px-4 py-2 bg-white/5 rounded-md text-white/70 text-sm transition-all duration-700`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {integration}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-heading font-semibold text-white mb-4">Compliance Checklist</h3>
              <ul className="space-y-3">
                {complianceChecklist.map((item, index) => (
                  <li key={index} className="flex items-center text-white/80">
                    {index === 0 ? (
                      <Shield className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
                    ) : (
                      <Check className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 flex flex-col justify-center">
              <div className="glass-card p-4 bg-white/5">
                <p className="text-white/80 italic">
                  "Our practice handles sensitive patient data every day. NextGen's security infrastructure gives us peace of mind while revolutionizing our workflow."
                </p>
                <p className="text-sm text-white/60 mt-2">
                  — Dr. Sarah M., Periodontics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
