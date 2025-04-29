
import React from 'react';
import { Users, BarChart3, PhoneOff, MessageSquare, GraduationCap } from 'lucide-react';
import DisplayCards from './DisplayCards';

const ResultsSection = () => {
  // Result items
  const resultItems = [
    {
      stat: "2X New Patients",
      subText: "By automating lead nurture and booking",
      icon: <Users className="h-8 w-8" />,
      agent: "Giselle",
      agentColor: "green"
    },
    {
      stat: "3X Collections",
      subText: "More high-ticket treatment converted",
      icon: <BarChart3 className="h-8 w-8" />,
      agent: "Devon",
      agentColor: "purple"
    },
    {
      stat: "0% No-Show Calls",
      subText: "Every lead gets followed up, every time",
      icon: <PhoneOff className="h-8 w-8" />,
      agent: "Miles",
      agentColor: "blue"
    },
    {
      stat: "<24H Response",
      subText: "Across text, voice, chat, and email",
      icon: <MessageSquare className="h-8 w-8" />,
      agent: "Miles",
      agentColor: "blue"
    },
    {
      stat: "1 Week to Train",
      subText: "Fully trained team or use our AI instead",
      icon: <GraduationCap className="h-8 w-8" />,
      agent: "Alma",
      agentColor: "gold"
    }
  ];

  return (
    <DisplayCards
      title="Real Results. In Real Practices."
      description="See what happens when your AI team never sleeps, never quits, and never misses a lead."
      items={resultItems}
      className="bg-gradient-to-b from-black to-nextgen-dark/90"
    />
  );
};

export default ResultsSection;
