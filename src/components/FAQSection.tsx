
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is NextGen Practice Solutions?",
    answer: "NextGen Practice Solutions is an AI-powered operating system for modern dental practices. Our platform features four AI agents (Miles, Giselle, Devon, and Alma) that work together to automate front-office tasks, streamline patient communications, boost case acceptance, and train your team—helping you grow your practice while reducing administrative burden."
  },
  {
    question: "Is it HIPAA compliant and secure?",
    answer: "Absolutely. NextGen Practice Solutions is fully HIPAA compliant, with enterprise-grade security measures including end-to-end encryption, secure data storage, regular security audits, and comprehensive Business Associate Agreements (BAAs). We maintain SOC 2 certification and prioritize patient data security across all aspects of our platform."
  },
  {
    question: "How fast can I get set up?",
    answer: "Most practices are up and running with NextGen within 1-2 weeks. Our onboarding process includes system integration, data migration, and staff training. Our Elite and Blaze plans include white-glove implementation services to ensure a smooth transition with minimal disruption to your practice."
  },
  {
    question: "Can I upgrade stages later?",
    answer: "Yes, you can easily upgrade your plan at any time as your practice grows and your needs evolve. We design our system with scalability in mind, making it simple to add additional AI agents and features when you're ready. Many practices start with our Spark plan and gradually add more capabilities."
  },
  {
    question: "What support do I get?",
    answer: "Every NextGen practice receives dedicated onboarding support, 24/7 system monitoring, and access to our client success team. Higher-tier plans include additional support benefits like quarterly business reviews, priority support response times, and custom integration assistance. Our goal is to be a true partner in your practice's success."
  },
  {
    question: "How does the Success Guarantee work?",
    answer: "Our Success Guarantee means we're committed to your growth. If you don't see measurable improvements in your practice's efficiency, patient acquisition, or case acceptance within the first 90 days, we'll continue working with you at no additional cost until you achieve results. We'll develop a custom improvement plan and provide additional training and optimization."
  },
  {
    question: "Can I talk to someone first?",
    answer: "Absolutely! You can speak with Miles, our AI concierge, right away to get immediate answers to your questions. For a more in-depth conversation, Miles can connect you with our team to schedule a personalized demo and consultation about your specific practice needs and goals."
  }
];

const FAQSection = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in FAQ, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button not found in DOM after delay');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from FAQ:', error);
    }
  };

  return (
    <section id="faq" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <MessageSquare className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Frequently Asked Questions
          </h2>
          
          <p className="text-lg text-white/70">
            Everything you need to know before getting started.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-white/5 text-white font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            onClick={handleChatOpen}
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.5)]"
            size="lg"
          >
            Talk to Miles — Get Your Questions Answered
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
