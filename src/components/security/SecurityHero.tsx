
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-nextgen-dark to-black/95" />
      
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Shield className="h-16 w-16 text-nextgen-purple mb-8" />
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-6">
            Security & Compliance at NextGen Practice Solutions™
          </h1>
          
          <p className="text-lg text-white/70 max-w-2xl">
            Enterprise-grade security and compliance measures to protect your practice and patients.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecurityHero;
