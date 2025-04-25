
import React from 'react';
import SupportTable from './SupportTable';
import SuccessGuarantee from './SuccessGuarantee';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const SupportAndBenefits = () => {
  return (
    <section className="section-padding py-20">
      <div className="container mx-auto space-y-20">
        {/* Support & Optimization Section */}
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

        {/* Success Guarantee Section */}
        <SuccessGuarantee />

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white" asChild>
            <Link to="/demo">
              Let's Build Your AI Practice <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportAndBenefits;
