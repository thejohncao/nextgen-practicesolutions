
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Book, Download, Check, User, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmailCollectionDialog from './EmailCollectionDialog';
import SplashCursor from './ui/splash-cursor';
import SparkleText from './effects/SparkleText';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ComponentType<any>, title: string, description: string }) => (
  <div className="glass-card p-6 backdrop-blur-lg border border-white/10 hover:bg-white/5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
    <div className="flex items-start gap-4">
      <div className="relative mt-1">
        <div className="rounded-lg p-3 bg-nextgen-purple/20">
          <Icon className="h-5 w-5 text-nextgen-purple transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="absolute inset-0 bg-nextgen-purple/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
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
    <section className="py-28 relative overflow-hidden">
      {/* Splash Cursor Effect */}
      <SplashCursor 
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={5000}
        DENSITY_DISSIPATION={2.8}
        VELOCITY_DISSIPATION={2.2}
        PRESSURE={0.15}
        PRESSURE_ITERATIONS={20}
        CURL={3}
        TRANSPARENT={true}
        BACK_COLOR={{ r: 0.1, g: 0, b: 0.3 }}
        COLOR_UPDATE_SPEED={8}
      />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-nextgen-purple/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#E87C7C]/10 blur-[150px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 mb-6">
            <GraduationCap className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Next-Gen Academy</span>
          </div>

          {/* Headline */}
          <SparkleText>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Train Your Team. Grow Your Practice.
            </h2>
          </SparkleText>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-12">
            Next-Gen Academy delivers world-class, AI-powered certification training to your Front Desk, Treatment Coordinators, and Managers — without micromanagement.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          <div className="glass-card backdrop-blur-lg p-8 border border-white/10 rounded-2xl mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-4 text-gradient">Ready to elevate your team's skills?</h3>
            <p className="text-white/70 mb-8">Join hundreds of practices who've transformed their operations with Academy.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 group w-full sm:w-auto shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300"
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
                buttonClassName="border-white/10 hover:bg-white/5 w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyOverviewSection;
