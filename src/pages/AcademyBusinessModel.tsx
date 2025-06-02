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
  TrendingUp,
  StopCircle,
  Rocket,
  GraduationCap,
  UserCheck,
  BrainCircuit,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const pitchSlides = [
    {
      number: "01",
      title: "Cover",
      subtitle: "NextGen Academy",
      content: "Revolutionizing the Dental Front Office",
      tagline: ""Train smarter. Hire faster. Close more."",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "text-nextgen-purple"
    },
    {
      number: "02",
      title: "The Problem",
      subtitle: "The Dental Industry is Broken at the Front Desk",
      icon: <StopCircle className="h-8 w-8" />,
      color: "text-red-500",
      items: [
        "High turnover in admin roles",
        "Long ramp-up times for training",
        "Low case acceptance",
        "Struggles with patient financing",
        "AI adoption is coming — but no one is ready"
      ]
    },
    {
      number: "03",
      title: "The Opportunity",
      subtitle: "What if every dental office had AI-ready, certified front office staff?",
      icon: <Rocket className="h-8 w-8" />,
      color: "text-blue-500",
      items: [
        "Patient financing experts",
        "Case presentation specialists",
        "Trained in automation & follow-up",
        "Plug-and-play onboarding in 1 week"
      ]
    },
    {
      number: "04",
      title: "Our Solution",
      subtitle: "The NextGen Academy",
      content: "The first certification program for treatment coordinators in the AI era.",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "text-nextgen-purple",
      items: [
        "🦷 Treatment scripting & systems",
        "💳 Financing: CareCredit, Cherry, Sunbit",
        "🤖 AI & automation tools",
        "📞 Phone, text, and CRM follow-up",
        "📈 Real-world workflows + job placement"
      ]
    },
    {
      number: "05",
      title: "How It Works",
      icon: <UserCheck className="h-8 w-8" />,
      color: "text-green-500",
      steps: [
        "Apply",
        "Get certified in 1 week",
        "Placed in a dental practice",
        "Ongoing coaching to increase conversions"
      ],
      forPractices: [
        "Hire confidently",
        "Skip long onboarding",
        "Increase collections"
      ]
    },
    {
      number: "06",
      title: "Business Model",
      subtitle: "Revenue Streams",
      icon: <DollarSign className="h-8 w-8" />,
      color: "text-amber-500",
      items: [
        "Tuition (student or employer-paid)",
        "Placement or subscription fee",
        "AI Agent upgrades",
        "Coaching bonuses"
      ]
    },
    {
      number: "07",
      title: "Trainee Personas",
      icon: <Users className="h-8 w-8" />,
      color: "text-purple-500",
      personas: [
        "👩‍⚕️ Career Switchers",
        "🔥 Burned-Out Admins",
        "🧠 AI-Savvy Millennials"
      ]
    },
    {
      number: "08",
      title: "Why It Matters",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "text-green-500",
      content: "We're not just training people. We're training the future.",
      items: [
        "✅ Higher collections",
        "✅ Better experience",
        "✅ Less burnout",
        "✅ AI implementation ready"
      ]
    },
    {
      number: "09",
      title: "Next Steps / Ask",
      subtitle: "Pilot Opportunity at Bespoke Dental Studios",
      content: "Want to be next?",
      cta: "NextGenPractice.org/academy",
      icon: <ArrowRight className="h-8 w-8" />,
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

      {/* Pitch Deck Section */}
      <section className="py-24 bg-nextgen-dark border-t border-white/10">
        <div className="container mx-auto px-4">
          <ScrollRevealWrapper animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                NextGen Academy Pitch Deck
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Our Vision, Model, and Market Opportunity
              </p>
            </div>
          </ScrollRevealWrapper>

          <div className="max-w-4xl mx-auto space-y-12">
            {pitchSlides.map((slide, index) => (
              <ScrollRevealWrapper 
                key={index} 
                animation="fade-up" 
                delay={index * 0.1}
              >
                <Card className="glass-card hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/10 ${slide.color}`}>
                        {slide.icon}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold ${slide.color}`}>
                          {slide.number}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                    
                    {slide.subtitle && (
                      <h4 className="text-xl md:text-2xl font-semibold text-nextgen-purple mb-2">
                        {slide.subtitle}
                      </h4>
                    )}
                    
                    {slide.content && (
                      <p className="text-lg text-white/80 leading-relaxed">
                        {slide.content}
                      </p>
                    )}
                    
                    {slide.tagline && (
                      <p className="text-xl font-medium text-nextgen-purple mt-4 italic">
                        {slide.tagline}
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    {slide.items && (
                      <ul className="space-y-3">
                        {slide.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-white/80">
                            <span className="text-nextgen-purple text-lg mt-1">•</span>
                            <span className="text-lg leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {slide.steps && (
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-4">Process:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {slide.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="text-center">
                                <div className="w-8 h-8 bg-nextgen-purple rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
                                  {stepIndex + 1}
                                </div>
                                <p className="text-white/80 text-sm">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {slide.forPractices && (
                          <div>
                            <h5 className="text-lg font-semibold text-white mb-3">💼 For Practices:</h5>
                            <ul className="space-y-2">
                              {slide.forPractices.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-3 text-white/80">
                                  <span className="text-nextgen-purple text-lg mt-1">•</span>
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {slide.personas && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {slide.personas.map((persona, personaIndex) => (
                          <div key={personaIndex} className="text-center p-4 bg-white/5 rounded-lg">
                            <p className="text-lg text-white/90">{persona}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {slide.cta && (
                      <div className="text-center mt-6">
                        <Button 
                          size="lg" 
                          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-semibold"
                        >
                          {slide.cta}
                        </Button>
                      </div>
                    )}
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
