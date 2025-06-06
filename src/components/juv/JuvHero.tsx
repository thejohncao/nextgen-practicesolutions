
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Zap } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const JuvHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-nextgen-dark via-black to-nextgen-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/10 via-transparent to-nextgen-blue/10" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollRevealWrapper animation="fade-up">
          <div className="mb-6">
            <span className="badge-animated inline-flex items-center gap-2 px-4 py-2 border border-nextgen-purple/30 rounded-full text-nextgen-purple text-sm font-medium">
              <Zap className="h-4 w-4" />
              🔌 JUV x NextGen OS
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="hero-headline text-gradient mb-6">
            The System Behind JUV's Next 100 Locations
          </h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.15}>
          <p className="hero-subheadline text-lg md:text-xl text-white/90 font-medium mb-8 max-w-4xl mx-auto">
            We're building the first AI-powered medspa network — lean, automated, and built to scale with minimal overhead.
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cta-button group px-8 py-4">
              <Link to="/demo">
                <TrendingUp className="h-5 w-5 mr-2" />
                Let's Scale Together
                <span className="cta-arrow ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>

      <style>{`
        .badge-animated {
          animation: fadeSlideIn 0.3s ease-in-out 0.2s both;
          background: linear-gradient(to right, #6c5ce7, #a29bfe);
          box-shadow: 0 0 12px rgba(108, 92, 231, 0.5);
          transition: all 0.3s ease;
        }

        .badge-animated:hover {
          box-shadow: 0 0 20px rgba(108, 92, 231, 0.8);
          filter: blur(0.5px);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @media (hover: none) {
          .badge-animated:active {
            animation: rippleEffect 0.6s ease-out;
          }
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

        @media (min-width: 768px) {
          .hero-subheadline {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        .cta-button {
          background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
          border: none;
          position: relative;
          overflow: hidden;
          animation: glowRingPulse 3s ease-in-out infinite 0.5s;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #b8b3ff 0%, #7d73eb 100%);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .cta-button:hover::before {
          opacity: 0.3;
          animation: glowRingPulse 1.5s ease-in-out infinite;
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-12px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(108, 92, 231, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(108, 92, 231, 0.8);
          }
        }

        @keyframes glowRingPulse {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);
          }
          50% {
            box-shadow: 0 4px 25px rgba(108, 92, 231, 0.4);
          }
        }

        @keyframes rippleEffect {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};

export default JuvHero;
