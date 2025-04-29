
import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import IntegrationsGrid from './integrations/IntegrationsGrid';

const securityCards = [
  {
    title: "HIPAA Compliant",
    description: "Enterprise-grade security and privacy protocols",
    icon: Shield
  },
  {
    title: "SOC 2 Certified",
    description: "Rigorous security controls and data protection",
    icon: LockKeyhole
  },
  {
    title: "End-to-End Encryption",
    description: "Patient data protected at every touchpoint",
    icon: Lock
  },
  {
    title: "U.S. Secure Servers",
    description: "Data hosted exclusively on secure U.S. infrastructure",
    icon: Server
  },
  {
    title: "HITECH & ADA Compliant",
    description: "Built following latest healthcare guidelines",
    icon: FileCheck
  }
];

const integrations = [
  "GoHighLevel", "Google Calendar", "Meta Ads", "Typeform", 
  "Slack", "Cherry", "Stripe", "Loom", "Podium", "Notion"
];

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

  return (
    <section id="combined-section" className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
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

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Left Column - Security Cards */}
          <div className="space-y-4">
            {securityCards.map((card, index) => (
              <div 
                key={card.title}
                className="p-6 glass-card animate-fade-in flex items-start gap-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="rounded-full p-2 bg-white/5">
                  <card.icon className="h-6 w-6 text-nextgen-purple" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{card.title}</h4>
                  <p className="text-sm text-white/60">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column - Integration Pills with CTA */}
          <div className="flex flex-col">
            {/* Integration Pills with responsive grid */}
            <div className={`glass-card p-6 rounded-xl transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {integrations.map((integration, index) => (
                  <div 
                    key={integration}
                    className="px-4 py-3 glass-card rounded-lg text-center text-white/70 hover:text-white/90 transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm font-medium">{integration}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Below Integration Pills */}
              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
                  onClick={() => setDialogOpen(true)}
                >
                  Explore All Integrations <LinkIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
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
