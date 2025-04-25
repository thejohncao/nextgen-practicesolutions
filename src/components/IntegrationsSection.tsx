
import React from 'react';
import { Calendar, Mail, MessageSquare, BookOpen, Check } from "lucide-react";

const IntegrationsSection = () => {
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Built for Healthcare. Trusted by Practices.
          </h2>
          
          <p className="text-lg text-white/70">
            NextGen is secure by design, and integrates with the tools you already use.
          </p>
        </div>
        
        <div className="glass-card p-8 mb-12 rounded-xl">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className="px-4 py-2 bg-white/5 rounded-md text-white/70 text-sm"
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
                    <Check className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
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
