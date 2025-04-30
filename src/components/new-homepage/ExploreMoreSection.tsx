
import React from 'react';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface ExploreMoreLinkProps {
  to: string;
  label: string;
  delay: number;
}

const ExploreMoreLink = ({ to, label, delay }: ExploreMoreLinkProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay}>
    <Link 
      to={to} 
      className={cn(
        "block p-4 rounded-xl text-center transition-all duration-300",
        "bg-white/5 border border-white/10 backdrop-blur-md",
        "hover:bg-white/10 hover:border-nextgen-purple/20 hover:shadow-[0_4px_20px_rgba(155,135,245,0.2)]",
        "text-white font-medium"
      )}
    >
      {label}
    </Link>
  </ScrollRevealWrapper>
);

const ExploreMoreSection = () => {
  const links = [
    { to: "/academy", label: "Explore Practice Academy Features" },
    { to: "/ai-team", label: "Meet Your AI Agent Team" },
    { to: "/join", label: "Learn About the Talent Network" },
    { to: "/pricing", label: "View Pricing" },
    { to: "/resources", label: "Read Customer Success Stories" },
    { to: "/resources", label: "Visit Our Resources" }
  ];

  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
            Dive Deeper
          </h2>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {links.map((link, index) => (
            <ExploreMoreLink
              key={index}
              to={link.to}
              label={link.label}
              delay={0.1 + (index * 0.05)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreSection;
