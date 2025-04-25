
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesLanding = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gradient">
            Unlock Free Resources to Grow Your Practice Smarter
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8">
            Download proven scripts, templates, and checklists — designed to help you systematize growth 
            and deliver 5-star patient experiences.
          </p>
          <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90">
            Get Instant Access
          </Button>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="glass-card p-6 rounded-xl">
            <div className="rounded-lg p-4 bg-gradient-to-br from-blue-500 to-blue-600 w-fit mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">AI Practice Playbook</h3>
            <p className="text-white/70 mb-6">
              Learn the proven strategies top-performing dental practices use to implement AI solutions and maximize returns.
            </p>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/5">
              Download Playbook
            </Button>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="rounded-lg p-4 bg-gradient-to-br from-purple-500 to-purple-600 w-fit mb-4">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Practice Audit Quiz</h3>
            <p className="text-white/70 mb-6">
              Take our 2-minute quiz to identify automation opportunities in your practice and get a personalized recommendation.
            </p>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/5">
              Start Quiz
            </Button>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <div className="rounded-lg p-4 bg-gradient-to-br from-green-500 to-green-600 w-fit mb-4">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">ROI Calculator</h3>
            <p className="text-white/70 mb-6">
              Estimate how much time and money your practice could save by implementing NextGen AI solutions.
            </p>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/5">
              Calculate Savings
            </Button>
          </div>
        </div>

        {/* Academy CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Want Full Access to Our Complete Playbook?
          </h2>
          <p className="text-white/70 mb-6">
            Get certified through Next-Gen Academy and unlock advanced tools and templates.
          </p>
          <Link to="/academy">
            <Button variant="outline" className="border-white/20 hover:bg-white/5">
              Learn About Academy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLanding;
