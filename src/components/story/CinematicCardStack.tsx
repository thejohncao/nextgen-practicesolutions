
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  bullets: string[];
  bgColor: string;
  index: number;
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({ title, bullets, bgColor, index, isActive }) => {
  return (
    <div
      className={`w-full max-w-4xl mx-auto p-12 sm:p-16 rounded-lg shadow-lg transition-all duration-500 ${
        isActive ? 'opacity-100 transform-none' : 'opacity-0 translate-y-16'
      }`}
      style={{ 
        backgroundColor: bgColor,
        zIndex: 10 + index
      }}
    >
      <h3 className="text-3xl sm:text-5xl font-heading font-bold text-center mb-8 text-gray-800">
        {title}
      </h3>
      <ul className="space-y-4">
        {bullets.map((bullet, i) => (
          <li 
            key={i} 
            className="flex items-start text-lg sm:text-xl text-center mx-auto max-w-2xl text-gray-700 leading-relaxed"
          >
            <span className="mr-2 text-gray-400">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CinematicCardStack = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const cards = [
    {
      title: "Save Your Time",
      bullets: [
        "Eliminate busywork.",
        "Automate operations.",
        "Buy back the hours you can never replace."
      ],
      bgColor: "#f2f7fb"
    },
    {
      title: "Recharge Your Energy",
      bullets: [
        "Remove chaos from your day.",
        "Empower your team.",
        "Grow with momentum, not stress."
      ],
      bgColor: "#e8f7f2"
    },
    {
      title: "Win Back Your Life",
      bullets: [
        "Spend time with family.",
        "Lead with vision, not exhaustion.",
        "Build a life outside the office."
      ],
      bgColor: "#f5f2fb"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveCardIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    const ctaObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3
    };

    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, ctaObserverOptions);

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4" ref={sectionRef}>
        {/* Cards container */}
        <div className="space-y-64"> {/* Large vertical spacing between cards */}
          {cards.map((card, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="sticky top-1/4 min-h-[50vh] flex items-center justify-center"
            >
              <Card
                title={card.title}
                bullets={card.bullets}
                bgColor={card.bgColor}
                index={index}
                isActive={activeCardIndex >= index}
              />
            </div>
          ))}
          
          {/* CTA Section */}
          <div 
            ref={ctaRef}
            className="py-24 text-center opacity-0 translate-y-10 transition-all duration-700"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-white">
              Ready to see how your Dream Team can bring it to life?
            </h2>
            <Button
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 text-lg"
            >
              <Link to="/solutions">
                Meet Your Dream Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicCardStack;
