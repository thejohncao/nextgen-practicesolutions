
import { toast } from "@/components/ui/use-toast";

const API_KEY = ""; // Will be provided securely by the user

// Define types for OpenAI API requests and responses
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callOpenAI(
  messages: Message[],
  systemPrompt: string
): Promise<string | null> {
  try {
    // Prepend the system prompt
    const fullMessages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...messages,
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    toast({
      title: "Error",
      description: "Unable to connect to AI services. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}
