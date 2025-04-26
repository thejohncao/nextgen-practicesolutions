import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmailCollectionForm from './EmailCollectionForm';
import { useIsMobile } from '@/hooks/use-mobile';

const FooterCTA = () => {
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowMobileCTA(true);
      } else {
        setShowMobileCTA(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatOpen = () => {
    try {
      setTimeout(() => {
        const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
        if (chatButton) {
          console.log('Chat button found in mobile CTA, clicking...');
          chatButton.click();
        } else {
          console.warn('Chat button not found in DOM from mobile CTA');
        }
      }, 100);
    } catch (error) {
      console.error('Error opening chat from mobile CTA:', error);
    }
  };

  return (
    <section className="section-padding py-20">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16 bg-gradient-to-br from-nextgen-purple/10 to-nextgen-blue/5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-nextgen-purple/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-nextgen-blue/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
              Ready to Run Your Practice Like a Fortune 500?
            </h2>
            
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Try NextGen risk-free and experience the difference in 30 days.
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <EmailCollectionForm 
                buttonText="Get Started" 
                placeholder="Enter your work email" 
              />
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/join" 
                className="text-white/70 underline hover:text-white transition-colors text-sm"
              >
                Learn more about our solution
              </Link>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              Join the practices already transforming patient care with AI.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                SOC 2 Certified
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                14-Day Free Trial
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-nextgen-dark/90 backdrop-blur-lg border-t border-white/10 z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <EmailCollectionForm 
              buttonText="Join" 
              placeholder="Email address" 
              className="p-0 bg-transparent border-0 shadow-none"
            />
          </div>
        </div>
      )}
      
      {/* Mobile Meet Miles CTA */}
      {isMobile && showMobileCTA && (
        <button
          onClick={handleChatOpen}
          className="fixed bottom-0 left-0 w-full h-[40px] bg-[#F0F8FF] border-t border-blue-100/50 
                 flex items-center justify-center text-sm font-semibold text-slate-800 z-50 
                 animate-fade-in"
        >
          Meet Miles — Your Always-On AI Concierge
          <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] 
                      bg-[length:400%_100%] bg-clip-text text-transparent ml-1">
            ✨
          </span>
        </button>
      )}
    </section>
  );
};

export default FooterCTA;
