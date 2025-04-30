import { AgentResult } from '@/types/agentResults';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAgentResult = (agentName: string, results: AgentResult[]) => {
  if (!results || results.length === 0) return null;
  
  return results.find(result => 
    result.agent?.toLowerCase() === agentName.toLowerCase() || 
    result.agentName?.toLowerCase() === agentName.toLowerCase()
  );
};
