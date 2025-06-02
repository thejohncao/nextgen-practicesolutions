
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SecurityCompliance = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "HIPAA-compliant and encrypted",
      description: "End-to-end encryption and HIPAA compliance built-in"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Role-based access for each user type",
      description: "Granular permissions ensure data security"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "No data stored without permission",
      description: "Your practice data remains under your control"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Audit logs and admin permissions built-in",
      description: "Complete visibility and control over system access"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Enterprise-Grade Security for Healthcare
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
