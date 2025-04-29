import React, { useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';
const testimonials = [{
  quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
  author: "Dr. Rachel S.",
  title: "Cosmetic Dentist",
  initials: "RS"
}, {
  quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
  author: "Dr. Kevin M.",
  title: "Practice Owner",
  initials: "KM"
}, {
  quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
  author: "Kayla T.",
  title: "Treatment Coordinator",
  initials: "KT"
}];
const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  return;
};
export default TestimonialsSection;