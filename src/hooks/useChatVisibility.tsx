
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useChatVisibility = (showPaths: string[] = ['/', '/solutions', '/academy', '/features']) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  // Event listener for opening the chat
  useEffect(() => {
    const listener = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent;
      return { customEvent };
    };
    
    document.addEventListener('open-miles-chat', listener as EventListener);
    return () => {
      document.removeEventListener('open-miles-chat', listener as EventListener);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    shouldShow
  };
};
