
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChartLine, Clipboard, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

// Icon mapping for fallback SVGs (replace with Lottie if available)
const AGENT_ICON_MAP: Record<string, React.ReactNode> = {
  miles: <Calendar className="w-10 h-10 text-blue-600" aria-label="Miles (calendar)" />,
  giselle: <ChartLine className="w-10 h-10 text-green-600" aria-label="Giselle (growth)" />,
  devon: <Clipboard className="w-10 h-10 text-purple-600" aria-label="Devon (clipboard)" />,
  alma: <Book className="w-10 h-10 text-yellow-600" aria-label="Alma (book)" />,
};

const badgeStyles = {
  miles: "bg-blue-100 text-blue-600",
  giselle: "bg-green-100 text-green-600",
  devon: "bg-purple-100 text-purple-600",
  alma: "bg-yellow-100 text-yellow-600",
};

const quickActions: Record<string, string> = {
  miles: "View Today’s Schedule",
  giselle: "Run Reactivation Blast",
  devon: "View Follow-Up Queue",
  alma: "Launch SOP Builder",
};

const roleChips: Record<string, string> = {
  miles: "Ops",
  giselle: "Growth",
  devon: "Sales",
  alma: "Training",
};

const taglines: Record<string, string> = {
  miles: "Your operations, optimized.",
  giselle: "Funnels, ads, and patients on demand.",
  devon: "Your best closer, always on.",
  alma: "Train your team. Document your systems.",
};

interface AgentExecutiveCardProps {
  id: "miles" | "giselle" | "devon" | "alma";
  name: string;
  tagline?: string;
  lastInteraction?: string;
  onQuickAction?: () => void;
  className?: string;
}

const AgentExecutiveCard: React.FC<AgentExecutiveCardProps> = ({
  id, name, tagline, lastInteraction, onQuickAction, className,
}) => {
  return (
    <div
      className={cn(
        "w-full sm:w-[320px] h-[220px] rounded-3xl bg-white/60 bg-glass-light shadow-md border border-white/40",
        "backdrop-blur-md transition-all duration-300 ease-apple animate-fade-in-up hover:shadow-lg",
        "hover:scale-[1.02] flex flex-col px-6 py-4 relative overflow-hidden font-sfpro",
        className
      )}
      tabIndex={0}
      role="button"
      aria-label={`Open ${name} agent`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {/* Avatar/Lottie/Icon */}
          {AGENT_ICON_MAP[id]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="font-bold text-xl text-[#00274D]">{name}</span>
            <span className={cn(
              "px-2 py-0.5 text-xs rounded-full font-semibold",
              badgeStyles[id]
            )}>
              {roleChips[id]}
            </span>
          </div>
          <div className="text-sm text-neutral-500 font-medium mt-1">{tagline || taglines[id]}</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Button
          variant="ghost"
          className={cn(
            "border border-transparent hover:border-[#FFD700]/40 text-sm mt-2 px-4 py-1.5 rounded-lg bg-white/20 text-[#00274D] font-semibold shadow-none hover:bg-[#f4f6fa]/40 hover:shadow-md transition hover:scale-105 active:scale-98",
            "focus-visible:ring-2 focus-visible:ring-[#00274D]/40"
          )}
          onClick={onQuickAction}
          tabIndex={0}
        >
          {quickActions[id]}
        </Button>
      </div>

      <div className="absolute bottom-4 w-full left-0 px-6 pointer-events-none">
        <span className="text-xs text-neutral-400 opacity-70 truncate block">
          {lastInteraction || `Last asked: "What's my reactivation rate?"`}
        </span>
      </div>
    </div>
  );
};

export default AgentExecutiveCard;
