
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
      console.error("OpenAI API key missing or invalid")
      throw new Error('OpenAI API key not configured or invalid. Please check your configuration.')
    }

    const { messages, systemPrompt } = await req.json()
    
    // Validate request data with detailed error messages
    if (!Array.isArray(messages)) {
      const error = 'Invalid messages format: messages must be an array';
      console.error(error);
      throw new Error(error);
    }
    
    if (typeof systemPrompt !== 'string') {
      const error = 'Invalid systemPrompt format: systemPrompt must be a string';
      console.error(error);
      throw new Error(error);
    }

    console.log(`OpenAI API call: Processing ${messages.length} messages with system prompt`)

    const fullMessages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...messages,
    ]

    console.log("Making request to OpenAI API...")
    
    // Use AbortController for timeout management
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500); // 7.5 second timeout
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Using gpt-4o-mini for faster responses
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 800,
          presence_penalty: 0.1, // Slight penalty to encourage diverse responses
          frequency_penalty: 0.1, // Slight penalty to discourage repetition
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json()
        console.error("OpenAI API error details:", error)
        throw new Error(error.error?.message || 'Error communicating with OpenAI API')
      }

      const data = await response.json()
      console.log("Successfully received response from OpenAI")
      
      return new Response(JSON.stringify({ response: data.choices[0].message.content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === "AbortError") {
        throw new Error("Request timed out after 7.5 seconds");
      }
      throw fetchError;
    }

  } catch (error) {
    console.error("Detailed error in chat function:", error.message, error.stack)
    
    let statusCode = 500;
    let errorMessage = error.message || 'An unexpected error occurred';
    
    // Special handling for timeout errors
    if (errorMessage.includes("timed out")) {
      statusCode = 504; // Gateway Timeout
      errorMessage = "The AI service took too long to respond. Please try again.";
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: statusCode, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
