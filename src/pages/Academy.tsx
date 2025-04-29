
import React from 'react';
import Layout from '../components/Layout';
import AcademyHero from '../components/academy/AcademyHero';
import WhyItMatters from '../components/academy/WhyItMatters';
import WhatYouGet from '../components/academy/WhatYouGet';
import HowItWorks from '../components/academy/HowItWorks';
import CertificationSection from '../components/academy/CertificationSection';
import CareerPlacementSection from '../components/academy/CareerPlacementSection';
import NextGenJourney from '../components/academy/NextGenJourney';
import QuoteSection from '../components/academy/QuoteSection';
import FinalCTA from '../components/academy/FinalCTA';
import AccessDetails from '../components/academy/AccessDetails';
import CurriculumOverview from '../components/academy/CurriculumOverview';
import AcademyTestimonials from '../components/academy/AcademyTestimonials';
import SectionTransition from '../components/effects/SectionTransition';
import { GraduationCap, BookCheck, Handshake } from 'lucide-react';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';

const Academy = () => {
  return (
    <Layout>
      <AcademyHero />
      
      <IntroSection />
      
      <FeaturesSection />
      
      <CertificationSection />
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <CareerPlacementSection />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <NextGenJourney />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <HowItWorks />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <CurriculumOverview />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <AcademyTestimonials />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <QuoteSection />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <AccessDetails />
      </div>
      
      <div className="relative">
        <SectionTransition type="fade" position="top" height={16} />
        <FinalCTA />
      </div>
    </Layout>
  );
};

// Intro section right after the hero
const IntroSection = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            A New Standard for Dental Excellence
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-4">
            The NextGen Practice Academy is not just about education — it's about empowerment.
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-4">
            We equip today's dental teams with the skills, confidence, and systems to run a modern, AI-powered practice.
          </p>
          <p className="text-lg md:text-xl text-white/80">
            Our Academy offers official NextGen Practice Certification — the new gold standard for excellence in healthcare operations.
          </p>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

// Features section with 3 columns
const FeaturesSection = () => {
  const features = [
    {
      title: "Mission-Driven Training",
      description: "Empowering dental teams to lead with precision, pride, and passion.",
      icon: "graduation-cap"
    },
    {
      title: "Proven Systems",
      description: "Real-world strategies used to scale high-performing practices — built into every lesson.",
      icon: "book-check"
    },
    {
      title: "Built-In Support",
      description: "Graduates receive lifetime access to resources, updates, and practice growth tools.",
      icon: "handshake"
    }
  ];

  return (
    <section className="py-20 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-gradient">
            Why Choose NextGen Academy?
          </h2>
        </ScrollRevealWrapper>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature card component with animated icons
const FeatureCard = ({ title, description, icon, delay }) => {
  const iconComponents = {
    "graduation-cap": () => <GraduationCap className="h-6 w-6 text-nextgen-purple" />,
    "book-check": () => <BookCheck className="h-6 w-6 text-nextgen-purple" />,
    "handshake": () => <Handshake className="h-6 w-6 text-nextgen-purple" />
  };
  
  const IconComponent = iconComponents[icon];
  
  return (
    <ScrollRevealWrapper 
      animation="fade-up"
      delay={0.1 * (delay + 1)}
      className="glass-card p-8 text-center transition-all duration-300 hover:bg-white/10"
    >
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-nextgen-purple/20 p-4 group transition-all duration-300 hover:bg-nextgen-purple/30">
          <IconComponent />
        </div>
      </div>
      <h3 className="text-xl font-heading font-semibold mb-3 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </ScrollRevealWrapper>
  );
};

export default Academy;
