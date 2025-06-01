
import React from 'react';
import { ArrowRight, Users, Calendar, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const EnrollmentCTA = () => {
  const benefits = [
    "Lifetime access to all course materials and updates",
    "Direct mentorship from industry experts", 
    "Exclusive job placement network",
    "AI tools training and certification",
    "Ongoing career support and alumni community"
  ];

  const urgencyPoints = [
    {
      icon: <Users className="h-5 w-5" />,
      text: "Limited to 50 students per cohort"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      text: "Next cohort starts January 15th"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: "Early bird pricing ends soon"
    }
  ];

  return (
    <section id="enrollment" className="py-20 bg-gradient-to-br from-nextgen-dark via-nextgen-purple/5 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <Card className="glass-card border-nextgen-purple/30 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-nextgen-purple/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-nextgen-blue/10 rounded-full blur-3xl"></div>
            
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                  🎓 Academy Enrollment Now Open
                </h2>
                <p className="text-xl text-white/80 mb-6">
                  Join the next generation of dental professionals who are transforming the industry.
                </p>
                
                {/* Urgency indicators */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {urgencyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <div className="text-nextgen-purple">{point.icon}</div>
                      <span className="text-sm text-white/80">{point.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits list */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  What's Included:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <RainbowButton size="lg" asChild>
                  <Link to="/academy" className="inline-flex items-center">
                    Enroll Now - Early Bird Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </RainbowButton>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/academy/curriculum">
                    💬 Book a Free Call
                  </Link>
                </Button>
              </div>

              {/* Additional info */}
              <div className="text-center mt-8">
                <p className="text-white/60 text-sm">
                  Questions? <Link to="/academy" className="text-nextgen-purple hover:underline">Contact our enrollment team</Link> • 30-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sticky bottom bar for mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-nextgen-dark/95 backdrop-blur-lg border-t border-white/10 p-4 z-50 lg:hidden">
            <div className="flex gap-3">
              <RainbowButton size="sm" className="flex-1" asChild>
                <Link to="/academy">
                  Enroll Now
                </Link>
              </RainbowButton>
              <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white" asChild>
                <Link to="/academy/curriculum">
                  Free Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentCTA;
