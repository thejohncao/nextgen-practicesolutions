
import React from 'react';
import { Button } from "@/components/ui/button";
import EmailCollectionDialog from '../EmailCollectionDialog';

const packages = [
  {
    name: "Spark Package",
    stage: "Foundation Stage",
    headline: "Start Strong. Build Your Foundation.",
    body: "Get your core operations running smoothly with smart systems, front desk automation, and recall workflows — all managed by your AI Practice Manager, Miles.",
    ideal: "Perfect for startups, solo providers, or early-stage practices."
  },
  {
    name: "Ignite Package",
    stage: "Growth Stage",
    headline: "Grow Faster. Fill Your Schedule.",
    body: "Layer in full-funnel marketing, lead nurturing, paid ads, and reactivation campaigns with Nova and Lia leading the charge.",
    ideal: "Ideal for established practices ready to scale production and patient flow."
  },
  {
    name: "Blaze Package",
    stage: "Multiply Stage",
    headline: "Multiply Your Results. Build a High-Performance Team.",
    body: "Unlock full team development, certification training, advanced reactivation, and treatment closing systems powered by Devon, Remi, and Casey.",
    ideal: "Perfect for high-volume practices or multi-location operators ready to dominate."
  }
];

const SolutionsPackages = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
            Find the Right Plan for Your Stage of Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.name} className="glass-card p-8 rounded-xl backdrop-blur-xl">
              <div className="mb-6">
                <span className="text-sm text-nextgen-purple font-medium">{pkg.stage}</span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-4">{pkg.headline}</h3>
                <p className="text-white/70 mb-4">{pkg.body}</p>
                <p className="text-sm text-white/60 italic">{pkg.ideal}</p>
              </div>
              
              <EmailCollectionDialog
                triggerText={`Explore ${pkg.name.split(' ')[0]}`}
                buttonClassName="w-full bg-nextgen-purple hover:bg-nextgen-purple/90"
              />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4">Not Sure Which Stage You're In?</h3>
          <p className="text-white/70 mb-8">Book a free strategy call and we'll map out a growth path tailored to your practice.</p>
          <EmailCollectionDialog
            triggerText="Book My Strategy Call"
            buttonSize="lg"
            buttonClassName="bg-white text-nextgen-dark hover:bg-white/90"
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionsPackages;
