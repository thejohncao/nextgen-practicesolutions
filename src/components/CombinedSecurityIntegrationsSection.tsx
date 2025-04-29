
import React from 'react';
import { Shield, LockKeyhole, Lock, Server, FileCheck, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import IntegrationsList from './integrations/IntegrationsList';
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

        {/* Top Row - Integration Icons */}
        <div className={`glass-card p-8 mb-12 rounded-xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <IntegrationsList integrations={integrations} isVisible={isVisible} />
          
          <div className="flex justify-center mt-8">
            <Button 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
              onClick={() => setDialogOpen(true)}
            >
              Explore All Integrations <LinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Left Column - Security Cards */}
          <div className="space-y-4">
            {securityCards.map((card, index) => (
              <div 
                key={card.title}
                className={cn(
                  "p-6 glass-card animate-fade-in flex items-start gap-4",
                  "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                )}
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
          
          {/* Right Column - Benefits */}
          <div className="space-y-6">
            <p className="text-lg text-white/70">
              NextGen Practice Solutions was engineered for the unique demands of healthcare providers — not generic SaaS workflows.
              With HIPAA-compliant data protocols, SOC 2 Certification, and seamless integrations with platforms like Salesforce, Meta, and Google Ads, your practice runs smarter, safer, and faster.
            </p>

            <div className="p-6 glass-card bg-white/5">
              <h3 className="text-xl font-bold mb-4">Streamlined Compliance</h3>
              <p className="text-white/70">
                Our platform helps you maintain compliance with healthcare regulations while providing advanced AI automation for your practice. Ensure you're meeting industry standards without the added stress.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                <Link to="/security">
                  Learn About Our Security
                </Link>
              </Button>
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
