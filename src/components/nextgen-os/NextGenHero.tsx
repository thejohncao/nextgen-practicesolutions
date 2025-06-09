
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Download, Users } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const NextGenHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-nextgen-dark via-black to-nextgen-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/10 via-transparent to-nextgen-blue/10" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollRevealWrapper animation="fade-up">
          <div className="mb-6">
            <span className="badge-static inline-flex items-center gap-2 px-6 py-2 border border-nextgen-purple/30 rounded-full text-white text-sm font-medium">
              NextGen OS Platform
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="hero-headline text-gradient mb-6">The Operating System for Modern Practices</h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.15}>
          <p className="hero-subheadline text-lg md:text-xl text-white/90 font-medium mb-8 max-w-4xl mx-auto">
            Launch your own credit-based membership model. Powered by AI agents. Branded as you.
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cta-button group px-8 py-4">
              <Link to="/demo">
                <TrendingUp className="h-5 w-5 mr-2" />
                Book Demo
                <span className="cta-arrow ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/downloads">
                <Download className="h-5 w-5 mr-2" />
                Download One-Pager
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/ai-team">
                <Users className="h-5 w-5 mr-2" />
                Meet Your AI Team
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>

      <style>{`
        .badge-static {
          background: linear-gradient(to right, #6c5ce7, #a29bfe);
          color: #FAFAFA;
          box-shadow: 0 0 8px rgba(108, 92, 231, 0.3);
          transition: none;
        }

        .hero-headline {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .hero-subheadline {
          line-height: 1.4;
        }

        .cta-button {
          background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
          border: none;
          position: relative;
          overflow: hidden;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #b8b3ff 0%, #7d73eb 100%);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
        }
      `}</style>
    </section>
  );
};

export default NextGenHero;
