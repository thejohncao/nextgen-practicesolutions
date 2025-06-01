
import React from 'react';
import { TrendingUp, DollarSign, Bot, Clock } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';

const SuccessMetricsSection = () => {
  const metrics = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "2x",
      label: "Increase in Treatment Acceptance",
      color: "text-green-500"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: "$30K+",
      label: "Monthly Revenue Growth Potential",
      color: "text-blue-500"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      value: "3",
      label: "Admin Roles Replaced with Automation",
      color: "text-purple-500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      value: "50+",
      label: "Hours Saved Each Month on Follow-Up & Scheduling",
      color: "text-amber-500"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">
            What You Can Expect with NextGen
          </h2>
          <p className="text-center text-white/70 mb-12">
            Backed by real results from our pilot partner practice.
          </p>
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <ScrollRevealWrapper key={index} animation="fade-up" delay={0.1 + index * 0.1}>
              <Card className="glass-card text-center hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <p className="text-white/70 text-sm leading-tight">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetricsSection;
