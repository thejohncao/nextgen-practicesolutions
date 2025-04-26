
import React from 'react';
import FloatingChatButton from './FloatingChatButton';

const FloatingChat = () => {
  const milesGPTLink = "https://chatgpt.com/g/g-680c4224fdcc8191b710d8c5f371f825-miles-practice-manager-nextgen";

  const handleChatClick = () => {
    window.open(milesGPTLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <FloatingChatButton 
      onClick={handleChatClick}
    />
  );
};

export default FloatingChat;
