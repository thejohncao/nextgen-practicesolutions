
import React from 'react';
import { ShieldCheck, Lock, Shield, ShieldAlert } from 'lucide-react';

const features = [
  {
    title: 'HIPAA-Ready Architecture',
    description: 'Built from the ground up with HIPAA compliance in mind, ensuring your patient data is protected at every level.',
    icon: ShieldCheck
  },
  {
    title: 'SOC 2 Certified Infrastructure',
    description: 'Our infrastructure meets rigorous SOC 2 security, availability, and confidentiality standards.',
    icon: Shield
  },
  {
    title: 'U.S. Secure Servers',
    description: 'All data is processed and stored exclusively on secure servers located within the United States.',
    icon: Lock
  },
  {
    title: 'HITECH and ADA Compliance',
    description: 'Full compliance with HITECH Act requirements and ADA guidelines for accessibility.',
    icon: ShieldAlert
  }
];

const SecurityFeatures = () => {
  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-8 hover:bg-white/10 transition-colors"
            >
              <feature.icon className="h-12 w-12 text-nextgen-purple mb-6" />
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
