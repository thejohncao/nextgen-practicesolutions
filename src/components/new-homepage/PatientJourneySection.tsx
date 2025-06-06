import React from 'react';
import { GraduationCap, Settings, Bot, TrendingUp } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const PatientJourneySection = () => {
  const steps = [{
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Certify Your Front Office",
    description: "Graduates of our Academy are trained in AI tools, patient financing, and treatment presentation.",
    color: "text-blue-500"
  }, {
    icon: <Settings className="h-8 w-8" />,
    title: "Plug In Our System",
    description: "Smile quiz funnel, $49 deposit booking, and treatment planner set up in Week 1.",
    color: "text-purple-500"
  }, {
    icon: <Bot className="h-8 w-8" />,
    title: "Automate with AI Assistants",
    description: "Agents like Miles and Giselle handle follow-up, scheduling, and reminders.",
    color: "text-green-500"
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Watch Collections Grow",
    description: "Certified TCs + automation = more consults booked, more treatment accepted.",
    color: "text-amber-500"
  }];
  return;
};
export default PatientJourneySection;