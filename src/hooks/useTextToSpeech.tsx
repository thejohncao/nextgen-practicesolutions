
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface TextToSpeechOptions {
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

interface TextToSpeechState {
  isSpeaking: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useTextToSpeech(options: TextToSpeechOptions = {}) {
  const [state, setState] = useState<TextToSpeechState>({
    isSpeaking: false,
    isLoading: false,
    error: null,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef<Map<string, string>>(new Map());
  
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    
    // Set up event listeners
    audioRef.current.addEventListener('play', handleAudioPlay);
    audioRef.current.addEventListener('ended', handleAudioEnd);
    audioRef.current.addEventListener('error', handleAudioError);
    
    // Cleanup event listeners
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handleAudioPlay);
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
      }
    };
  }, []);
  
  // Handle audio play event
  const handleAudioPlay = () => {
    setState(prev => ({ ...prev, isSpeaking: true }));
    if (options.onStart) options.onStart();
  };
  
  // Handle audio end event
  const handleAudioEnd = () => {
    setState(prev => ({ ...prev, isSpeaking: false }));
    if (options.onEnd) options.onEnd();
  };
  
  // Handle audio error event
  const handleAudioError = (error: any) => {
    setState(prev => ({ 
      ...prev, 
      isSpeaking: false, 
      isLoading: false,
      error: "Failed to play audio" 
    }));
    
    if (options.onError) options.onError(error);
  };
  
  // Generate cache key for text and agent
  const getCacheKey = (text: string, agent: string): string => {
    return `${agent}:${text.substring(0, 50)}`;
  };
  
  // Generate and play speech
  const speak = async (text: string, agent: string): Promise<void> => {
    if (!text || !agent) return;
    
    try {
      // Stop any current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Check cache first
      const cacheKey = getCacheKey(text, agent);
      let audioBase64 = audioCache.current.get(cacheKey);
      
      // If not in cache, fetch from API
      if (!audioBase64) {
        console.log('Generating speech for:', { text, agent });
        
        const { data, error } = await supabase.functions.invoke('text-to-speech', {
          body: { text, agent }
        });
        
        if (error) {
          throw new Error(`Error generating speech: ${error.message}`);
        }
        
        if (!data || !data.audio) {
          throw new Error('No audio data received');
        }
        
        // Add to cache
        audioBase64 = data.audio;
        audioCache.current.set(cacheKey, audioBase64);
      }
      
      // Create audio source from base64
      const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
      
      if (audioRef.current) {
        audioRef.current.src = audioSrc;
        
        // Auto play if enabled
        if (options.autoPlay !== false) {
          try {
            await audioRef.current.play();
          } catch (playError) {
            console.error('Error playing audio:', playError);
            toast({
              title: "Audio Playback Error",
              description: "Please enable autoplay in your browser settings.",
              variant: "destructive"
            });
          }
        }
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
      
      toast({
        title: "Voice Generation Error",
        description: error instanceof Error ? error.message : 'Failed to generate speech',
        variant: "destructive"
      });
      
      if (options.onError) options.onError(error);
    }
  };
  
  // Play current audio
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };
  
  // Pause current audio
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  };
  
  // Stop current audio
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  };
  
  return {
    ...state,
    speak,
    play,
    pause,
    stop,
  };
}
