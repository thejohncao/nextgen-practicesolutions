
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

    const { model, messages } = await req.json()
    
    // Validate request data with detailed error messages
    if (!Array.isArray(messages)) {
      const error = 'Invalid messages format: messages must be an array';
      console.error(error);
      throw new Error(error);
    }
    
    if (typeof model !== 'string') {
      const error = 'Invalid model format: model must be a string';
      console.error(error);
      throw new Error(error);
    }

    console.log(`Agent Chat: Processing request with ${model} model`)

    // Use AbortController for timeout management
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
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
      
      return new Response(JSON.stringify({ 
        reply: data.choices[0].message.content,
        model: model,
        usage: data.usage
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === "AbortError") {
        throw new Error("Request timed out after 15 seconds");
      }
      throw fetchError;
    }

  } catch (error) {
    console.error("Error in agent-chat function:", error.message, error.stack)
    
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
