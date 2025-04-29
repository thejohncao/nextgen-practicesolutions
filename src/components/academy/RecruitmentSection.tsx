
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RecruitmentSection = () => {
  const benefits = [
    {
      icon: "🎯",
      text: "Career placement support available to qualified graduates"
    },
    {
      icon: "🤝",
      text: "Direct connection to modern, forward-thinking practices"
    },
    {
      icon: "🌍",
      text: "Become part of a next-generation healthcare movement"
    }
  ];

  return (
    <section className="py-24 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="rounded-lg p-4 bg-nextgen-purple/20">
              <Users className="h-8 w-8 text-nextgen-purple" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-center text-gradient">
            Your Certification is Just the Beginning
          </h2>
          
          <p className="text-lg text-center text-white/80 mb-8">
            Graduates of the NextGen Practice Academy gain exclusive access to career opportunities 
            through our growing network of NextGen-approved practices.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <p className="text-white/90">{benefit.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              Explore Placement Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
