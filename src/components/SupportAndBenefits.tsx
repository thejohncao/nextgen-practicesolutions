
import React from 'react';
import SupportTable from './SupportTable';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EmailCollectionDialog from './EmailCollectionDialog';

const SupportAndBenefits = () => {
  return (
    <section className="section-padding py-20">
      <div className="container mx-auto space-y-20">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              Support & Optimization Built In
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Whether you're just starting or scaling fast, we match your growth with hands-on guidance, automation blueprints, and strategic reviews.
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
              Included Support by Plan
            </h3>
            <SupportTable />
          </div>
        </div>

        <div className="text-center">
          <EmailCollectionDialog
            triggerText="Let's Build Your AI Practice"
            buttonSize="lg"
            buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default SupportAndBenefits;
