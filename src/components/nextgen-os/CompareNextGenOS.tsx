
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, Circle, Rocket } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CompareNextGenOS = () => {
  const comparisonData = [
    {
      feature: 'Dental Membership',
      kleer: { status: 'yes', text: 'Yes' },
      repeatmd: { status: 'no', text: 'No' },
      moxie: { status: 'limited', text: 'Limited' },
      nextgen: { status: 'yes', text: 'Yes + Medspa' }
    },
    {
      feature: 'Medspa Upsells',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'yes', text: 'Yes' },
      moxie: { status: 'yes', text: 'Yes' },
      nextgen: { status: 'yes', text: 'Native credits' }
    },
    {
      feature: 'White-Labeled Brand',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'no', text: 'No' },
      moxie: { status: 'limited', text: 'Limited' },
      nextgen: { status: 'yes', text: 'Full white-label' }
    },
    {
      feature: 'Mobile-in-Your-Brand',
      kleer: { status: 'no', text: 'App' },
      repeatmd: { status: 'no', text: 'App' },
      moxie: { status: 'limited', text: 'Limited' },
      nextgen: { status: 'yes', text: 'Web + Mobile' }
    },
    {
      feature: 'Credit-Based Loyalty',
      kleer: { status: 'no', text: 'Discounts' },
      repeatmd: { status: 'yes', text: 'Points' },
      moxie: { status: 'no', text: 'No' },
      nextgen: { status: 'yes', text: 'Glow Wallet™' }
    },
    {
      feature: 'Financing Support',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'yes', text: '(Affirm)' },
      moxie: { status: 'no', text: 'No' },
      nextgen: { status: 'optional', text: 'Optional via Stripe' }
    },
    {
      feature: 'Transparent Pricing',
      kleer: { status: 'yes', text: 'Dental' },
      repeatmd: { status: 'no', text: 'No' },
      moxie: { status: 'no', text: 'No' },
      nextgen: { status: 'yes', text: 'All services' }
    },
    {
      feature: 'EMR / PMS Integration',
      kleer: { status: 'yes', text: 'Pro' },
      repeatmd: { status: 'no', text: 'No' },
      moxie: { status: 'yes', text: 'Deep' },
      nextgen: { status: 'yes', text: 'PatientNow + more' }
    },
    {
      feature: 'Automated Funnels',
      kleer: { status: 'limited', text: 'Limited' },
      repeatmd: { status: 'yes', text: 'Yes' },
      moxie: { status: 'yes', text: 'Basic' },
      nextgen: { status: 'yes', text: 'GHL-powered' }
    },
    {
      feature: 'Referral & Rewards',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'yes', text: 'Yes' },
      moxie: { status: 'no', text: 'No' },
      nextgen: { status: 'yes', text: 'Gamified logic' }
    },
    {
      feature: 'Real-Time Analytics',
      kleer: { status: 'yes', text: 'Basic' },
      repeatmd: { status: 'yes', text: 'Reports' },
      moxie: { status: 'yes', text: 'Reports' },
      nextgen: { status: 'yes', text: 'Live Dashboards' }
    },
    {
      feature: 'Multi-Location Scale',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'limited', text: 'Clunky' },
      moxie: { status: 'limited', text: 'Manual' },
      nextgen: { status: 'yes', text: '100+ ready' }
    },
    {
      feature: 'AI Agent Support',
      kleer: { status: 'no', text: 'No' },
      repeatmd: { status: 'no', text: 'No' },
      moxie: { status: 'no', text: 'No' },
      nextgen: { status: 'yes', text: '4 Executive Agents' }
    },
    {
      feature: 'Tech-First Architecture',
      kleer: { status: 'no', text: 'Monolith' },
      repeatmd: { status: 'limited', text: 'Legacy' },
      moxie: { status: 'no', text: 'Rigid' },
      nextgen: { status: 'yes', text: 'Modular OS' }
    }
  ];

  const getStatusIcon = (status: string, isNextGen: boolean = false) => {
    const iconClass = isNextGen ? "h-5 w-5" : "h-5 w-5";
    
    switch (status) {
      case 'yes':
        return <Check className={`${iconClass} ${isNextGen ? 'text-green-400' : 'text-green-500'}`} />;
      case 'no':
        return <X className={`${iconClass} text-red-400`} />;
      case 'limited':
      case 'optional':
        return <Circle className={`${iconClass} text-white/40`} />;
      default:
        return <X className={`${iconClass} text-red-400`} />;
    }
  };

  return (
    <section className="section-spacing bg-gradient-to-b from-nextgen-dark to-black/95">
      <div className="container-liquid">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-4xl">💥</span>
            <h2 className="text-headline-lg bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Why NextGen OS Outperforms the Competition
            </h2>
          </div>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            One system. Every advantage. Compare NextGen OS to other market leaders:
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 max-w-7xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/10">
                    <TableHead className="text-white font-semibold w-1/4 p-6">Module / Feature</TableHead>
                    <TableHead className="text-center text-white/70 font-medium p-6">Kleer</TableHead>
                    <TableHead className="text-center text-white/70 font-medium p-6">RepeatMD</TableHead>
                    <TableHead className="text-center text-white/70 font-medium p-6">Moxie</TableHead>
                    <TableHead className="text-center text-nextgen-purple font-semibold p-6">
                      NextGen OS <span className="text-2xl">🧠</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                      <TableCell className="font-medium text-white p-6">{row.feature}</TableCell>
                      <TableCell className="text-center p-6">
                        <div className="flex flex-col items-center gap-2">
                          {getStatusIcon(row.kleer.status)}
                          <span className="text-caption text-white/60">{row.kleer.text}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-6">
                        <div className="flex flex-col items-center gap-2">
                          {getStatusIcon(row.repeatmd.status)}
                          <span className="text-caption text-white/60">{row.repeatmd.text}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-6">
                        <div className="flex flex-col items-center gap-2">
                          {getStatusIcon(row.moxie.status)}
                          <span className="text-caption text-white/60">{row.moxie.text}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-6 bg-nextgen-purple/10">
                        <div className="flex flex-col items-center gap-2">
                          {getStatusIcon(row.nextgen.status, true)}
                          <span className="text-caption text-nextgen-purple font-medium">{row.nextgen.text}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-16">
          <p className="text-body-lg text-white/80 max-w-4xl mx-auto mb-12">
            NextGen OS is the only platform purpose-built for both dental and medspa scale — with white-label capabilities, 
            an AI-powered operations layer, and a fully integrated credit engine.
          </p>
          
          <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-semibold rounded-lg px-8 py-4 transition-all duration-300 hover:scale-105 group text-lg">
            <Link to="/demo" className="flex items-center">
              <Rocket className="h-6 w-6 mr-3" />
              Launch Your Branded Membership OS Today
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompareNextGenOS;
