
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntegrationsList from './integrations/IntegrationsList';
import { Button } from './ui/button';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import IntegrationsGrid from './integrations/IntegrationsGrid';
import SparkleText from './effects/SparkleText';

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
    <section id="integrations" className="section-padding py-24 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/8 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#1EAEDB]/8 blur-[120px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" style={{ opacity: 0.25 }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 backdrop-blur-xl border border-white/10">
            <LinkIcon className="h-5 w-5 text-nextgen-purple" />
            <span className="text-white/70 text-sm font-medium">Connect Your Tools</span>
          </div>
          <SparkleText>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
              Powerful Integrations
            </h2>
          </SparkleText>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect NextGen with your favorite tools and services to streamline your practice workflow.
          </p>
        </div>
        
        <div className={`glass-card p-8 mb-12 rounded-xl transition-all duration-700 backdrop-blur-lg border border-white/10 hover:shadow-lg ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <IntegrationsList integrations={integrations} isVisible={isVisible} />
          
          <div className="flex justify-center mt-8">
            <Button 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300 group"
              onClick={() => setDialogOpen(true)}
            >
              Explore All Integrations 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto bg-nextgen-dark/95 border-white/10 backdrop-blur-lg">
          <IntegrationsGrid activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default IntegrationsSection;
