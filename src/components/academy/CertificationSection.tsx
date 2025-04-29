
import React from 'react';
import { Button } from "@/components/ui/button";
import { Award, CheckCircle } from "lucide-react";
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

const CertificationSection = () => {
  const certificationItems = [
    "AI-powered patient journey systems",
    "Front office & management workflows",
    "Treatment coordination best practices",
    "Growth-driven operational strategies"
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95" id="certification">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side - Certificate badge */}
          <ScrollRevealWrapper animation="fade-in" delay={0.1} className="flex justify-center order-2 md:order-1">
            <div className="relative">
              {/* Certificate Badge */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-nextgen-purple via-nextgen-blue to-nextgen-purple/70 flex items-center justify-center p-1 animate-pulse-slow">
                <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center p-6">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-nextgen-purple mx-auto mb-2" />
                    <div className="text-white font-heading font-bold text-lg">NextGen</div>
                    <div className="text-white font-heading font-bold text-lg">CERTIFIED</div>
                    <div className="text-white/60 text-xs mt-2">Official Certification</div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-nextgen-purple/20 rounded-full blur-xl"></div>
            </div>
          </ScrollRevealWrapper>
          
          {/* Right side - Content */}
          <ScrollRevealWrapper animation="fade-up" delay={0.2} className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
              Earn Your Official NextGen Certification
            </h2>
            
            <ul className="space-y-4 mb-6">
              {certificationItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-nextgen-purple mr-2 mt-1 flex-shrink-0" />
                  <span className="text-white leading-7">{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-white/80 mb-8">
              Certification signals you're not just ready — you're ahead of the curve.
            </p>
            
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              Become NextGen Certified
            </Button>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
