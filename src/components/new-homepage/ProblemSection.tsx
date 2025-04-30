
import React from 'react';
import { Clock, AlertTriangle, Users, PhoneIncoming, FileText, PieChart } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  delay?: number;
}

const ProblemCard = ({ icon, title, delay = 0 }: ProblemCardProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay} className="w-full">
    <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-nextgen-purple/30 transition-all duration-300 h-full">
      <div className="p-2 rounded-full bg-nextgen-purple/20 text-nextgen-purple">
        {icon}
      </div>
      <div>
        <p className="text-white/90 text-lg">{title}</p>
      </div>
    </div>
  </ScrollRevealWrapper>
);

const ProblemSection = () => {
  const problems = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Your talented team is burning out juggling repetitive tasks: endless scheduling calls, manual appointment confirmations, tedious insurance verifications, inconsistent follow-ups."
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Inconsistent training leads to costly errors, frustrated staff, and missed opportunities for optimal patient care and case acceptance."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Finding, hiring, and retaining skilled front-office staff feels like a constant, expensive battle, draining time and resources."
    },
    {
      icon: <PhoneIncoming className="h-5 w-5" />,
      title: "Valuable new patient leads slip through the cracks due to slow or inconsistent follow-up."
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Treatment plans don't get the attention they deserve, leaving potential revenue unrealized."
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "You've tried different tools, but disconnected software often adds more complexity and fails to solve the core issues."
    }
  ];

  return (
    <section className="py-20 bg-black/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Is This Your Practice Reality?
            </h2>
          </div>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              delay={0.1 + (index * 0.1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
