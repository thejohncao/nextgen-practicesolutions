
import React, { useState, useEffect, useRef } from 'react';

// Voice recording and processing utilities using Web Speech API

// Define types for voice recognition 
export interface VoiceRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  finalTranscript: string;
}

// For TypeScript compatibility with the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Class to handle voice recognition
export class VoiceRecorder {
  private recognition: any;
  private isListening: boolean = false;
  private options: VoiceRecognitionOptions;

  constructor(options: VoiceRecognitionOptions = {}) {
    this.options = {
      continuous: true,
      interimResults: true,
      lang: 'en-US',
      ...options
    };

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = this.options.continuous;
    this.recognition.interimResults = this.options.interimResults;
    this.recognition.lang = this.options.lang;

    // Set up event handlers
    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Call the onResult callback if provided
      if (this.options.onResult) {
        const isFinal = finalTranscript.length > 0;
        this.options.onResult(
          isFinal ? finalTranscript : interimTranscript,
          isFinal
        );
      }
    };

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.options.onStart) this.options.onStart();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.options.onEnd) this.options.onEnd();
    };

    this.recognition.onerror = (event: any) => {
      if (this.options.onError) this.options.onError(event);
      console.error('Speech recognition error', event.error);
    };
  }

  // Start recording
  startRecording() {
    if (!this.recognition) return;
    
    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }

  // Stop recording
  stopRecording() {
    if (!this.recognition) return;
    
    try {
      this.recognition.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }

  // Check if currently recording
  isRecording() {
    return this.isListening;
  }
}

// Hook for voice recognition
export function useVoiceRecognition(options: VoiceRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const recorderRef = useRef<VoiceRecorder | null>(null);

  useEffect(() => {
    // Initialize voice recorder
    recorderRef.current = new VoiceRecorder({
      ...options,
      onStart: () => {
        setIsListening(true);
        setTranscript('');
        if (options.onStart) options.onStart();
      },
      onEnd: () => {
        setIsListening(false);
        if (options.onEnd) options.onEnd();
      },
      onResult: (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setFinalTranscript(text);
          setTranscript('');
        }
        if (options.onResult) options.onResult(text, isFinal);
      },
      onError: options.onError,
    });

    // Cleanup
    return () => {
      if (recorderRef.current?.isRecording()) {
        recorderRef.current.stopRecording();
      }
    };
  }, []);

  // Start voice recognition
  const startListening = React.useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.startRecording();
    }
  }, []);

  // Stop voice recognition
  const stopListening = React.useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording();
    }
  }, []);

  return {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening,
  };
}
