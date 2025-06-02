
import React from 'react';
import { X, TrendingDown, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProblemSection = () => {
  const problems = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Undertrained coordinators and high turnover",
      description: "Constant hiring and training costs drain resources"
    },
    {
      icon: <TrendingDown className="h-8 w-8" />,
      title: "Missed revenue from poor case presentation and follow-up",
      description: "Treatment acceptance rates below industry standards"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Rising payroll costs with shrinking margins",
      description: "Higher wages but lower productivity and efficiency"
    },
    {
      icon: <X className="h-8 w-8" />,
      title: "Outdated tools that don't talk to each other",
      description: "Fragmented systems creating workflow inefficiencies"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Today's Practices Are Facing a Staffing and Systems Crisis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                      {problem.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10" asChild>
            <Link to="#solution">
              Learn how NextGen is changing the game →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
