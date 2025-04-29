
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials?: string;
}

const AcademyTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "This program gave me the confidence and systems I needed to become a treatment coordinator. I now work in a modern dental studio that actually values innovation.",
      name: "Sarah J.",
      role: "Treatment Coordinator",
      initials: "SJ"
    },
    {
      quote: "The skills I learned transformed how our office handles new patients. We've increased our conversion rate by 32% in just three months.",
      name: "Michael T.",
      role: "Office Manager",
      initials: "MT"
    },
    {
      quote: "NextGen Academy's training helped me stand out in my job search. I was hired within two weeks of completing my certification.",
      name: "Emily R.",
      role: "Front Desk Specialist",
      initials: "ER"
    }
  ];

  return (
    <section className="py-24 relative bg-nextgen-dark/90">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
            Meet Our Graduates
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hear from professionals who transformed their careers through NextGen certification.
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollRevealWrapper 
              key={index}
              animation="fade-up"
              delay={0.1 * (index + 1)}
              className="h-full"
            >
              <Card className="bg-white/5 border-white/10 h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <blockquote className="text-lg text-white/90 italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 bg-nextgen-purple/20">
                      <AvatarFallback className="text-nextgen-purple">
                        {testimonial.initials || <User className="h-6 w-6" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyTestimonials;
