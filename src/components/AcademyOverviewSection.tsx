
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EmailCollectionDialog from './EmailCollectionDialog';

const AcademyOverviewSection = () => {
  const features = [
    "Self-paced video training",
    "AI-powered role play simulations",
    "Ready-to-use templates & SOPs",
    "Career certification and placement"
  ];

  return (
    <section id="academy" className="py-24 relative bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Badge Visual */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <div className="relative animate-fade-in">
              {/* Certificate Badge */}
              <div className="w-60 h-60 mx-auto lg:ml-0 rounded-full bg-gradient-to-br from-nextgen-purple via-nextgen-blue to-nextgen-purple/70 flex items-center justify-center p-1 animate-pulse-slow">
                <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-white font-heading font-bold text-xl">NextGen</div>
                    <div className="text-white font-heading font-bold text-xl">CERTIFIED</div>
                    <div className="text-white/60 text-sm mt-2">Official Certification</div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-nextgen-purple/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Right: Text and CTA */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              The World's First AI Academy for Dental Practices
            </h2>
            
            <p className="text-lg text-white/80 mb-6">
              Train your team, automate your systems, and grow your practice — without micromanagement. NextGen Academy delivers AI-powered certification programs for front desk, treatment coordinators, and managers.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-nextgen-purple flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 group"
                size="lg"
              >
                <Link to="/academy">
                  Learn About Academy
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <EmailCollectionDialog
                triggerText="Book a Strategy Call"
                buttonVariant="outline"
                buttonSize="lg"
                buttonClassName="border-white/10 hover:bg-white/5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyOverviewSection;
