
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

// Agent voice mappings to ElevenLabs Voice IDs
const AGENT_VOICE_MAPPINGS = {
  miles: "pNInz6obpgDQGcFmaJgB", // Josh (calm male voice)
  giselle: "EXAVITQu4vr4xnSDxMaL", // Rachel (upbeat female)
  devon: "ERnvAuB559u3nsdYHaUS", // Matthew (clear, direct male)
  alma: "jsCqWAovK2LkecY7zXl4", // Emily (warm, instructional female)
};

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handler for HTTP requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, agent } = await req.json();
    
    // Validation
    if (!text) {
      throw new Error("Text is required");
    }
    
    if (!agent || !AGENT_VOICE_MAPPINGS[agent.toLowerCase()]) {
      throw new Error("Valid agent name is required");
    }
    
    const voiceId = AGENT_VOICE_MAPPINGS[agent.toLowerCase()];
    
    // Call ElevenLabs API to generate speech
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.2, 
          use_speaker_boost: true,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: "Unknown error" }));
      throw new Error(`ElevenLabs API error: ${errorData.detail || response.statusText}`);
    }

    // Get audio data and convert to base64 for sending to client
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = btoa(
      new Uint8Array(audioBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return new Response(
      JSON.stringify({ audio: audioBase64, agent, success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Text-to-speech error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
