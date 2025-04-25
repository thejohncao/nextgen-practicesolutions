
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
    author: "Dr. Rachel S.",
    title: "Cosmetic Dentist",
    initials: "RS"
  },
  {
    quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
    author: "Dr. Kevin M.",
    title: "Practice Owner",
    initials: "KM"
  },
  {
    quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
    author: "Kayla T.",
    title: "Treatment Coordinator",
    initials: "KT"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            What Practice Owners Are Saying
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-4">
                <Avatar className="h-12 w-12 bg-gradient-to-br from-nextgen-purple to-nextgen-blue">
                  <AvatarFallback className="text-white font-medium">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <p className="text-white/90 italic mb-4">
                "{testimonial.quote}"
              </p>
              
              <p className="text-sm text-white/70">
                — {testimonial.author}, {testimonial.title}
              </p>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-nextgen-purple/5 rounded-full blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
