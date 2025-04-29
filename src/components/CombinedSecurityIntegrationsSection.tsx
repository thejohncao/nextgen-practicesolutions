
import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import IntegrationsGrid from './integrations/IntegrationsGrid';
import ComplianceSection from './integrations/ComplianceSection';
import PhoneDeviceMockup from './integrations/PhoneDeviceMockup';
import IntegrationIcons from './integrations/IntegrationIcons';

const CombinedSecurityIntegrationsSection = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
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

    const section = document.getElementById('combined-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Mock compliance checklist - using the security badge descriptions
  const complianceChecklist = [
    "Enterprise-grade security and privacy protocols",
    "Rigorous security controls and data protection",
    "Patient data protected at every touchpoint",
    "Data hosted exclusively on secure U.S. infrastructure",
    "Built following latest healthcare guidelines"
  ];

  return (
    <section id="combined-section" className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Shield className="h-5 w-5 text-nextgen-purple" />
            <span className="text-white/70 text-sm font-medium">Secure & Connected</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
            Built for Healthcare. Powered by Integrations.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            NextGen is HIPAA-ready, SOC 2 certified, and connects seamlessly with the tools you already use — from Google Calendar to Stripe. Launch faster. Work smarter. Stay secure.
          </p>
        </div>

        {/* Two Column Layout - 60/40 split */}
        <div className={`grid md:grid-cols-5 gap-8 mt-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Left Column - Security Cards (60%) */}
          <div className="md:col-span-3 space-y-4">
            <ComplianceSection complianceChecklist={complianceChecklist} />
            
            {/* Quote Card */}
            <div className="p-4 flex flex-col justify-center mt-6">
              <div className="glass-card p-6 bg-white/5">
                <p className="text-white/80 italic">
                  "Our practice handles sensitive patient data every day. NextGen's security infrastructure gives us peace of mind while revolutionizing our workflow."
                </p>
                <p className="text-sm text-white/60 mt-2">
                  — Dr. Sarah M., Periodontics
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Phone Mockup and Integration Icons (40%) */}
          <div className="md:col-span-2 flex flex-col items-center justify-start space-y-6">
            {/* Phone Mockup */}
            <PhoneDeviceMockup />
            
            {/* Integration Icons */}
            <div className="w-full">
              <IntegrationIcons />
            </div>
            
            {/* CTA Button */}
            <Button 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white mt-4"
              onClick={() => setDialogOpen(true)}
            >
              Explore All Integrations
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto bg-nextgen-dark/95 border-white/10">
          <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CombinedSecurityIntegrationsSection;
