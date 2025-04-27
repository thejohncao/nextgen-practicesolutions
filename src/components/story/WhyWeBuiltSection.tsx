
import React from 'react';
import { Clock, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhyWeBuiltSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-8">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in">
            Why We Built NextGen Practice Solutions
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Buying Back Time, Energy, and Life for Modern Practices
          </p>

          {/* Icon Row */}
          <div className="flex justify-center gap-12 py-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Clock size={32} className="text-nextgen-purple" strokeWidth={1.5} />
            <Zap size={32} className="text-nextgen-purple" strokeWidth={1.5} />
            <Heart size={32} className="text-nextgen-purple" strokeWidth={1.5} />
          </div>

          {/* Main Text */}
          <div className="space-y-6 text-lg text-white/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
            <p className="font-medium">
              Most practices today are drowning in busywork — endless admin, staffing headaches, marketing overwhelm, and patient follow-up chaos.
            </p>
            <p>
              Doctors and teams deserve better.
            </p>
            <p>
              That's why we built NextGen — to buy back your time, energy, and freedom.
            </p>
            
            <div className="space-y-4 py-2">
              <p>
                Instead of running your practice,<br />
                <span className="text-white font-medium">you can lead it.</span>
              </p>
              <p>
                Instead of reacting,<br />
                <span className="text-white font-medium">you can grow.</span>
              </p>
              <p>
                Instead of burning out,<br />
                <span className="text-white font-medium">you can live.</span>
              </p>
            </div>

            <p className="text-xl text-white font-medium pt-4">
              You lead.<br />
              We execute.<br />
              You win back your life.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8"
            >
              <Link to="/solutions">
                Meet Your AI Executive Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeBuiltSection;

