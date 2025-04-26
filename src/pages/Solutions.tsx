
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import SolutionsHero from '../components/solutions/SolutionsHero';
import AgentsSection from '../components/solutions/AgentsSection';
import FooterCTA from '../components/FooterCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Solutions = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-nextgen-dark text-white">
        <SolutionsHero />
        <AgentsSection />
        
        {/* Additional CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 bg-white/5">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Let our AI team handle your operations, growth, and training, while you focus on what matters most: your patients.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                  <Link to="/join">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5"
                  onClick={() => {
                    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
                    if (chatButton) chatButton.click();
                  }}
                >
                  Chat with Miles
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nextgen-purple/5 blur-[100px] rounded-full -z-10"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-nextgen-blue/5 blur-[100px] rounded-full -z-10"></div>
        </section>
        
        <FooterCTA />
      </div>
    </Layout>
  );
};

export default Solutions;
