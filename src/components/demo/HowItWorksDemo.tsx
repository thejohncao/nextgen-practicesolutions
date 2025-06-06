import React from 'react';
import { ClipboardList, Bot, CreditCard, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const HowItWorksDemo = () => {
  const steps = [{
    number: "1",
    icon: <ClipboardList className="h-8 w-8" />,
    title: "Patient submits quiz or form",
    description: "Smart intake forms capture patient needs and preferences automatically"
  }, {
    number: "2",
    icon: <Bot className="h-8 w-8" />,
    title: "AI books and tags reason",
    description: "Miles schedules the appointment and categorizes the visit type for optimal preparation"
  }, {
    number: "3",
    icon: <CreditCard className="h-8 w-8" />,
    title: "TC presents case + offers financing",
    description: "Devon assists with treatment presentation and financing options for higher acceptance"
  }, {
    number: "4",
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Practice collects more, spends less",
    description: "Automated workflows and certified staff deliver measurable ROI growth"
  }];
  return;
};
export default HowItWorksDemo;