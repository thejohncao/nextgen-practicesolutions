
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";
import SparkleText from './effects/SparkleText';

const faqs = [
  {
    question: "Will NextGen AI replace my current team?",
    answer: "No, NextGen AI is designed to complement your existing team, not replace them. Our AI agents handle repetitive, time-consuming tasks so your staff can focus on patient care and high-value activities that require a human touch. Most practices find that NextGen helps them grow without needing to hire additional administrative staff."
  },
  {
    question: "Is NextGen Practice Solutions HIPAA compliant?",
    answer: "Absolutely. NextGen Practice Solutions is fully HIPAA compliant, with enterprise-grade security measures including encryption, secure data storage, regular security audits, and comprehensive Business Associate Agreements (BAAs). Patient data security is our top priority, and we maintain strict compliance with all healthcare privacy regulations."
  },
  {
    question: "How long does it take to implement NextGen?",
    answer: "Most practices are up and running with NextGen within 1-2 weeks. Our onboarding process includes system integration, data migration, and staff training. Our Elite and Blaze plans include white-glove implementation services to ensure a smooth transition with minimal disruption to your practice."
  },
  {
    question: "Will NextGen integrate with my current practice management software?",
    answer: "Yes, NextGen is designed to integrate with all major dental practice management systems including Dentrix, Eaglesoft, Open Dental, and more. Our team will handle the integration during implementation to ensure seamless data flow between systems."
  },
  {
    question: "What kind of results can I expect?",
    answer: "Most practices see significant improvements within the first 30 days, including reduced no-show rates, increased appointment bookings, and more efficient operations. Within 90 days, practices typically experience higher treatment acceptance rates, improved patient retention, and notable time savings for staff. Check out our ROI section for specific metrics."
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer: "We offer both monthly and annual billing options. Monthly plans can be canceled at any time with 30 days' notice. Annual plans offer a significant discount but require a 12-month commitment. All plans start with a 14-day free trial so you can experience the benefits before making a long-term decision."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding py-24 bg-gradient-to-b from-nextgen-dark/90 to-nextgen-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-nextgen-purple/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#1EAEDB]/5 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <MessageSquare className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">FAQ</span>
          </div>
          
          <SparkleText>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              Frequently Asked Questions
            </h2>
          </SparkleText>
          
          <p className="text-lg text-white/70">
            Find answers to common questions about implementing NextGen AI 
            in your dental practice.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:bg-white/8"
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
          <div className="inline-block glass-card px-6 py-3 rounded-full hover:bg-white/5 transition-all duration-300 backdrop-blur-md border border-white/10 hover:shadow-lg">
            <p className="text-sm text-white/60">
              Have more questions? <a href="#" className="text-nextgen-purple hover:text-nextgen-purple/80 transition-colors">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
