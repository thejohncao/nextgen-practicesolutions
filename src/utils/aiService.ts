
import { SYSTEM_PROMPTS } from './systemPrompts';

/**
 * Fetches an AI-generated response from the agent
 * @param userMessage The user's message
 * @param agent The agent to use (miles, giselle, devon, alma)
 * @param useGpt Whether to use the GPT API or fallback responses
 * @returns The AI-generated response
 */
export const fetchAgentReply = async (
  userMessage: string, 
  agent: string, 
  useGpt: boolean = true
): Promise<string> => {
  // If GPT is disabled, don't make the API call
  if (!useGpt) {
    throw new Error("GPT is disabled");
  }

  try {
    console.log(`Requesting GPT response for agent: ${agent}`);
    
    const systemPrompt = SYSTEM_PROMPTS[agent.toLowerCase() as keyof typeof SYSTEM_PROMPTS];
    
    if (!systemPrompt) {
      console.error(`No system prompt found for agent: ${agent}`);
      throw new Error(`Invalid agent: ${agent}`);
    }

    const response = await fetch("/api/agent-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      console.error('API response error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('API error details:', errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    
    return data?.reply || "I'm processing your request. Let me think about this for a moment.";
  } catch (error) {
    console.error('Error fetching agent reply:', error);
    throw error;
  }
};
