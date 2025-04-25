import React from 'react';
import { GraduationCap, ArrowRight, Video, Book, Download, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EmailCollectionDialog from './EmailCollectionDialog';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3 group">
    <div className="relative mt-1">
      <div className="rounded-lg p-2 bg-nextgen-purple/20">
        <Icon className="h-4 w-4 text-nextgen-purple transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 bg-nextgen-purple/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  </div>
);

const AcademyOverviewSection = () => {
  const features = [
    {
      icon: Video,
      title: "Self-Paced Video Training",
      description: "Learn at your own pace with comprehensive video courses."
    },
    {
      icon: User,
      title: "AI-Powered Role Play",
      description: "Practice real scenarios with our intelligent AI system."
    },
    {
      icon: Book,
      title: "Certification Programs",
      description: "Earn professional certificates for your team."
    },
    {
      icon: Download,
      title: "Done-for-You Templates",
      description: "Access ready-to-use scripts and frameworks."
    },
    {
      icon: Check,
      title: "Progress Tracking",
      description: "Monitor your team's learning journey."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 mb-6">
            <GraduationCap className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Next-Gen Academy</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            Train Your Team. Grow Your Practice.
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-8">
            Next-Gen Academy delivers world-class, AI-powered certification training to your Front Desk, Treatment Coordinators, and Managers — without micromanagement.
          </p>

          {/* Feature Grid */}
          <div className="glass-card p-8 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
    </section>
  );
};

export default AcademyOverviewSection;
