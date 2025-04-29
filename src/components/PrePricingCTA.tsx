
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const PrePricingCTA = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        description: "We need your email to get you started",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Thanks for your interest!",
      description: "We'll be in touch soon about your 30-day trial.",
    });
    
    // Clear the form
    setEmail('');
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark/95 z-0"></div>
      
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full bg-[radial-gradient(#9b87f5_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-8 sm:p-12 rounded-2xl border border-white/10 shadow-glow">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
            Ready to Run Your Practice Like a Fortune 500?
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Try NextGen risk-free and experience the difference in 30 days.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your work email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="flex flex-col items-center gap-6">
            <Button 
              variant="ghost" 
              className="bg-gradient-to-r from-nextgen-purple/80 to-nextgen-purple text-white rounded-full px-8 py-6 h-auto text-lg hover:from-nextgen-purple hover:to-nextgen-purple/80"
            >
              Talk to Miles
            </Button>
            
            <a href="#" className="text-white/70 hover:text-white text-sm underline underline-offset-4">
              Learn more about our solution
            </a>
            
            <p className="text-white/70 text-sm mt-4">
              Join the practices already transforming patient care with AI.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-white/70 text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-white/70 text-sm">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-white/70 text-sm">14-Day Free Trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrePricingCTA;
