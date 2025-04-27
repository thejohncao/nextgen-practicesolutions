
import React from 'react';
import SecurityBadges from './SecurityBadges';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HealthcareSecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white/5 to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Shield className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Trusted by Practices Nationwide</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Purpose-Built for Modern Healthcare Practices
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Security. Compliance. Patient-Centric Automation — all built into your NextGen Operating System.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg text-white/70">
              NextGen Practice Solutions was engineered for the unique demands of healthcare providers — not generic SaaS workflows. With HIPAA-compliant data protocols, SOC 2 Certification, and seamless integrations with platforms like Salesforce, Meta, and Google Ads, your practice runs smarter, safer, and faster.
            </p>

            <p className="text-lg text-white/70">
              Every feature, from patient communication to data storage, is built with healthcare-grade security at its core. Your patients' data deserves nothing less.
            </p>
            
            <div className="pt-4">
              <Button 
                asChild
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full transition-all duration-300"
              >
                <Link to="/integrations">
                  Explore Our Integrations
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <SecurityBadges />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSecuritySection;
