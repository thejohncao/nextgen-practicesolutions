
import React from 'react';
import SupportTable from './SupportTable';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EmailCollectionDialog from './EmailCollectionDialog';

const SupportAndBenefits = () => {
  return (
    <section className="section-padding py-16">
      <div className="container mx-auto space-y-12">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              Premium Support, Tailored to Your Stage
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Every NextGen plan includes baseline support. As you grow, we upgrade your support to match your momentum.
            </p>
          </div>

          <div className="glass-card p-6 text-sm">
            <SupportTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportAndBenefits;
