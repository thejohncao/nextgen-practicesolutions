
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

    const requestData = await req.json()
    const { messages, systemPrompt, stream = false } = requestData
    
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

    console.log(`OpenAI API call: Processing ${messages.length} messages with system prompt${stream ? ' (streaming)' : ''}`)
    console.log(`Last user message: ${JSON.stringify(messages[messages.length - 1])}`)

    const fullMessages = [
      {
        role: "system" as const,
        content: systemPrompt,
      },
      ...messages,
    ]

    console.log("Making request to OpenAI API...")
    
    const openAIRequestBody = {
      model: "gpt-4o-mini", // Using gpt-4o-mini for faster responses
      messages: fullMessages,
      temperature: 0.7,
      max_tokens: 1800, // Increased from 800 to 1800 for longer responses
      presence_penalty: 0.1, // Slight penalty to encourage diverse responses
      frequency_penalty: 0.1, // Slight penalty to discourage repetition
      stream: stream, // Enable streaming if requested
    }
    
    // Use AbortController for timeout management
    const controller = new AbortController();
    // Increased timeout to 20 seconds as requested in the debug notes
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(openAIRequestBody),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json()
        console.error("OpenAI API error details:", error)
        throw new Error(error.error?.message || 'Error communicating with OpenAI API')
      }

      // Handle streaming responses differently
      if (stream) {
        // Return the response as-is for streaming
        console.log("Returning streamed response from OpenAI");
        
        // We need to create a new Response with the original body and CORS headers
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const reader = response.body?.getReader();
        
        // Pipe the response to our new stream with cors headers
        if (reader) {
          (async () => {
            try {
              while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                await writer.write(value);
              }
            } catch (err) {
              console.error("Error streaming response:", err);
            } finally {
              writer.close();
            }
          })();
        }
        
        return new Response(readable, {
          headers: { 
            ...corsHeaders,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          }
        });
      }
      
      // For non-streaming responses, return the complete data
      const data = await response.json()
      console.log("Successfully received response from OpenAI")
      
      // Validate that the response contains actual content
      const content = data.choices[0].message.content;
      if (!content || content.trim() === '') {
        console.error("Empty response received from OpenAI");
        throw new Error("Empty response received from OpenAI");
      }
      
      // Log the first 100 characters of the response for debugging
      console.log(`Response preview: ${content.substring(0, 100)}...`);
      
      return new Response(JSON.stringify({ response: content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        throw new Error("Request timed out after 20 seconds");
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
