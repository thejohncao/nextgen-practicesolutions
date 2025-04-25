
import React from 'react';
import { Shield, Check } from "lucide-react";

interface ComplianceSectionProps {
  complianceChecklist: string[];
}

const ComplianceSection = ({ complianceChecklist }: ComplianceSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4">
        <h3 className="text-xl font-heading font-semibold text-white mb-4">Compliance Checklist</h3>
        <ul className="space-y-3">
          {complianceChecklist.map((item, index) => (
            <li key={index} className="flex items-center text-white/80">
              {index === 0 ? (
                <Shield className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
              ) : (
                <Check className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 flex flex-col justify-center">
        <div className="glass-card p-4 bg-white/5">
          <p className="text-white/80 italic">
            "Our practice handles sensitive patient data every day. NextGen's security infrastructure gives us peace of mind while revolutionizing our workflow."
          </p>
          <p className="text-sm text-white/60 mt-2">
            — Dr. Sarah M., Periodontics
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSection;
