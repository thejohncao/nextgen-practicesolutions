
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntegrationsList from './integrations/IntegrationsList';
import { Button } from './ui/button';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import IntegrationsGrid from './integrations/IntegrationsGrid';

const IntegrationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  return (
    <section id="integrations" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <LinkIcon className="h-5 w-5 text-nextgen-purple" />
            <span className="text-white/70 text-sm font-medium">Connect Your Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
            Powerful Integrations
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect NextGen with your favorite tools and services to streamline your practice workflow.
          </p>
        </div>
        
        <div className={`glass-card p-8 mb-12 rounded-xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <IntegrationsList integrations={integrations} isVisible={isVisible} />
          
          <div className="flex justify-center mt-8">
            <Button 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
              onClick={() => setDialogOpen(true)}
            >
              Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
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

export default IntegrationsSection;
