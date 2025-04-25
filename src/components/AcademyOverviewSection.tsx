
import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AcademyOverviewSection = () => {
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

          {/* Body Content */}
          <div className="glass-card p-8 mb-8 text-left max-w-2xl mx-auto">
            <p className="text-white/80 mb-6">
              Whether you're building your team from scratch or leveling up an existing one, the Next-Gen Academy provides self-paced video courses, real-world scripts, AI roleplays, and certification badges — designed to turn your staff into high-performing growth leaders.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-nextgen-purple" />
                Blaze clients unlock full lifetime access.
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-nextgen-purple" />
                Other practices can enroll separately.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8"
              size="lg"
            >
              <Link to="/academy">Learn About Academy</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 hover:bg-white/5"
            >
              <Link to="/join">Book a Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyOverviewSection;
