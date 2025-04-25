
import React from 'react';
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const CertificationSection = () => {
  const certificationItems = [
    "AI-powered patient journey systems",
    "Front office and management workflows",
    "Treatment coordination best practices",
    "Growth-driven operational strategies"
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side - Certificate badge */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative animate-fade-in">
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
          </div>
          
          {/* Right side - Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
              Earn Your Official NextGen Practice Certification
            </h2>
            
            <p className="text-lg text-white/80 mb-6">
              Our certification program validates that graduates have mastered:
            </p>
            
            <ul className="space-y-3 mb-8">
              {certificationItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="rounded-full bg-nextgen-purple/20 p-1">
                    <Award className="h-4 w-4 text-nextgen-purple" />
                  </div>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-white/80 mb-8">
              The NextGen Certification signals to practices that you're not just ready — you're ahead of the curve.
            </p>
            
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              Join the Academy Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
