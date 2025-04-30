
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ChatVisibilityProps {
  showPaths?: string[];
}

export function useChatVisibility({ showPaths = ['/', '/solutions', '/academy', '/features'] }: ChatVisibilityProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [hasShownEmailPrompt, setHasShownEmailPrompt] = useState(false);
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  // Listen for custom open-chat event
  useEffect(() => {
    const listener = () => {
      setIsOpen(true);
    };
    
    document.addEventListener('open-miles-chat', listener);
    return () => {
      document.removeEventListener('open-miles-chat', listener);
    };
  }, []);

  // Function to check and show email dialog for "get started" messages
  const checkAndShowEmailDialog = (message: string) => {
    // We only potentially show email dialog for explicit "get started" or "sign up" messages
    const isExplicitSignupRequest = 
      message.toLowerCase().includes('get started') || 
      message.toLowerCase().includes('sign up') ||
      message.toLowerCase().includes('register') ||
      message.toLowerCase().includes('join');
      
    // Show email dialog only on explicit signup request and if never shown before
    if (isExplicitSignupRequest && !hasShownEmailPrompt) {
      setHasShownEmailPrompt(true);
      setTimeout(() => setShowEmailDialog(true), 2000);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    showEmailDialog,
    setShowEmailDialog,
    hasShownEmailPrompt,
    setHasShownEmailPrompt,
    shouldShow,
    checkAndShowEmailDialog
  };
}
