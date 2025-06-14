
import { AgentMemory, OfficePlaybook } from "@/hooks/ai-chat/useAgentContext";

interface AgentPromptContextArgs {
  role: string | null;
  location: string | null;
  memory: AgentMemory[];
  playbooks: OfficePlaybook[];
}

/**
 * Build a context block for agent prompts.
 */
export function buildAgentPromptContext({
  role,
  location,
  memory,
  playbooks
}: AgentPromptContextArgs): string {
  const roleStr = role ? `Role: ${role}` : "";
  const locationStr = location ? `Location: ${location}` : "";
  const playbooksStr =
    playbooks && playbooks.length
      ? "Playbooks/Offers:\n" +
        playbooks.map(p => `- ${p.key}: ${p.value}`).join("\n")
      : "";
  const memoryStr =
    memory && memory.length
      ? "Last 5 prompts:\n" +
        memory
          .map(
            (m, idx) =>
              `${idx + 1}. "${m.prompt}"${m.response ? ` → "${m.response}"` : ""}`
          )
          .join("\n")
      : "";

  // Provide time context
  const today = new Date();
  const nowStr = `Current date/time: ${today.toLocaleString()}`;

  return [roleStr, locationStr, playbooksStr, memoryStr, nowStr]
    .filter(Boolean)
    .join("\n");
}
