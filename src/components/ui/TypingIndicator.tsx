
import React, { useState, useEffect } from 'react';

interface TypingIndicatorProps {
  text: string;
  speed?: number; // ms per character
  startDelay?: number; // ms before typing starts
  onComplete?: () => void;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  text,
  speed = 50,
  startDelay = 200,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Handle typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start delay
    timeout = setTimeout(() => {
      setIsTyping(true);
      
      let currentIndex = 0;
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          if (onComplete) {
            setTimeout(() => onComplete(), 500);
          }
        }
      };
      
      typeNextChar();
    }, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    if (!isTyping && displayedText === text) return; // Stop blinking when typing is complete
    
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [isTyping, displayedText, text]);

  return (
    <div className="font-medium text-white relative">
      {displayedText}
      {isTyping && (
        <span className={`inline-block ml-0.5 w-0.5 h-4 bg-white ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} style={{ marginBottom: '-3px' }}></span>
      )}
    </div>
  );
};

export default TypingIndicator;
