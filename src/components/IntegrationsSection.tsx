
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import IntegrationsHeader from './integrations/IntegrationsHeader';
import IntegrationsList from './integrations/IntegrationsList';
import ComplianceSection from './integrations/ComplianceSection';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

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
        <IntegrationsHeader isVisible={isVisible} />
        
        <div className={`glass-card p-8 mb-12 rounded-xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <IntegrationsList integrations={integrations} isVisible={isVisible} />
          <ComplianceSection complianceChecklist={complianceChecklist} />
          
          <div className="flex justify-center mt-8">
            <Link to="/integrations">
              <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white">
                Explore All Integrations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
