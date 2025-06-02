import React, { useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AgentAvatar from '../AgentAvatar';
import { ScrollArea } from '../ui/scroll-area';
import { Clipboard, Megaphone, Handshake, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Updated stages with additional badges as per the requirements
const stages = [{
  name: "Spark",
  color: "#3b82f6",
  // Blue
  agents: [{
    name: "Miles",
    role: "Practice Management",
    color: "blue",
    icon: Clipboard
  }],
  badges: ["Foundation Package Unlock"]
}, {
  name: "Ignite",
  color: "#22c55e",
  // Green
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }],
  badges: ["Growth Package Unlock"]
}, {
  name: "Blaze",
  color: "#8b5cf6",
  // Purple
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }, {
    name: "Devon",
    role: "Sales",
    color: "purple",
    icon: Handshake
  }],
  badges: ["Development Package Unlock", "Advanced Automations", "KPI Dashboard Access"]
}, {
  name: "Nova",
  color: "#f59e0b",
  // Orange
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }, {
    name: "Devon",
    role: "Sales",
    color: "purple",
    icon: Handshake
  }, {
    name: "Alma",
    role: "Training",
    color: "gold",
    icon: GraduationCap
  }],
  badges: ["Full AI Boardroom Access", "Multi-Location Support"]
}];
const BoardroomUnlockFlow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return;
};
export default BoardroomUnlockFlow;