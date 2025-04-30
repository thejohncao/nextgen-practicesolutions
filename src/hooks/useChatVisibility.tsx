
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useChatVisibility = (showPaths: string[] = ['/', '/solutions', '/academy', '/features']) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    shouldShow
  };
};
