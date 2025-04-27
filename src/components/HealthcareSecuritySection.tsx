
import React from 'react';
import SecurityBadges from './SecurityBadges';

const HealthcareSecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient">
              Built for Healthcare
            </h2>
            
            <p className="text-lg text-white/70">
              NextGen Practice Solutions was engineered for the unique demands of healthcare providers — not generic SaaS workflows. With HIPAA-compliant data protocols, SOC 2 Certification, and seamless integrations with platforms like Salesforce, Meta, and Google Ads, your practice runs smarter, safer, and faster.
            </p>

            <p className="text-lg text-white/70">
              Every feature, from patient communication to data storage, is built with healthcare-grade security at its core. Your patients' data deserves nothing less.
            </p>
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
