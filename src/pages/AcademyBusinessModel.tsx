
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';
import { 
  Users, 
  Activity, 
  Star, 
  Heart, 
  Target, 
  Wrench, 
  Globe, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

const AcademyBusinessModel = () => {
  const businessModelSections = [
    {
      title: "Key Partners",
      icon: <Users className="h-6 w-6" />,
      items: [
        "Dental practices (e.g., Bespoke Dental Studios)",
        "AI platform vendors (CareCredit, Cherry, GHL)",
        "Job boards & recruiting channels"
      ],
      color: "text-blue-500"
    },
    {
      title: "Key Activities",
      icon: <Activity className="h-6 w-6" />,
      items: [
        "Develop & deliver training content",
        "Certify front office professionals",
        "Job placement support",
        "Real-time coaching & follow-up"
      ],
      color: "text-green-500"
    },
    {
      title: "Value Propositions",
      icon: <Star className="h-6 w-6" />,
      items: [
        "Hire-ready treatment coordinators in 1 week",
        "AI & financing-certified staff",
        "Increased collections, reduced overhead",
        "Plug-and-play team building"
      ],
      color: "text-nextgen-purple"
    },
    {
      title: "Customer Relationships",
      icon: <Heart className="h-6 w-6" />,
      items: [
        "Personalized onboarding for practices",
        "Student support during and post-certification",
        "Alumni network & placement follow-up"
      ],
      color: "text-purple-500"
    },
    {
      title: "Customer Segments",
      icon: <Target className="h-6 w-6" />,
      items: [
        "Dental practice owners",
        "Aspiring treatment coordinators (career switchers)",
        "Current front office staff seeking advancement"
      ],
      color: "text-amber-500"
    },
    {
      title: "Key Resources",
      icon: <Wrench className="h-6 w-6" />,
      items: [
        "Training curriculum & LMS",
        "AI agents (Miles, Giselle, Alma, Devon)",
        "Certification team",
        "Placement pipeline"
      ],
      color: "text-blue-500"
    },
    {
      title: "Channels",
      icon: <Globe className="h-6 w-6" />,
      items: [
        "nextgenpractice.org/academy",
        "Direct sales to practices",
        "Job recruitment portals & email funnels"
      ],
      color: "text-green-500"
    },
    {
      title: "Cost Structure",
      icon: <DollarSign className="h-6 w-6" />,
      items: [
        "Curriculum development",
        "Trainer & AI agent support",
        "Marketing & recruitment",
        "Software platform subscriptions"
      ],
      color: "text-red-500"
    },
    {
      title: "Revenue Streams",
      icon: <TrendingUp className="h-6 w-6" />,
      items: [
        "Academy tuition (practice-paid or student-paid)",
        "Placement or hiring fee",
        "Ongoing access/licensing",
        "AI agent upsells"
      ],
      color: "text-nextgen-purple"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-nextgen-dark">
        <div className="container mx-auto px-4">
          <ScrollRevealWrapper animation="fade-up">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Business Model Canvas – NextGen Academy
              </h1>
              <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                This Business Model Canvas outlines the strategic foundation of the NextGen Academy — our flagship training and certification program designed to future-proof dental teams through real-world education, job placement, and AI-integrated workflows.
              </p>
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>

      {/* Business Model Canvas Grid */}
      <section className="py-24 bg-nextgen-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {businessModelSections.map((section, index) => (
              <ScrollRevealWrapper 
                key={index} 
                animation="fade-up" 
                delay={index * 0.1}
              >
                <Card className="glass-card h-full hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className={`${section.color}`}>
                        {section.icon}
                      </div>
                      <span className="text-lg font-semibold">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-start gap-3 text-white/80"
                        >
                          <span className="text-nextgen-purple text-sm mt-1.5">•</span>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AcademyBusinessModel;
