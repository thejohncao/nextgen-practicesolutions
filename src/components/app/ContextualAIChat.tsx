
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ContextualAIChat = () => {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Hi ${profile?.first_name}! I'm your AI assistant. I'm here to help you with any questions about your ${profile?.role} dashboard.`,
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const getContextualWelcome = () => {
    switch (profile?.role) {
      case 'patient':
        return "I can help you book treatments, check your credit balance, or understand your referral program.";
      case 'staff':
        return "I can assist with booking management, credit redemption, and patient care workflows.";
      case 'admin':
        return "I can provide insights on analytics, help manage tenants and services, or explain platform features.";
      default:
        return "How can I assist you today?";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-nextgen-purple hover:bg-nextgen-purple/90 shadow-lg"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 bg-nextgen-dark border border-white/10 rounded-xl shadow-2xl",
          isMinimized ? "w-80 h-16" : "w-96 h-96"
        )}
      >
        <Card className="bg-transparent border-0 h-full">
          <CardHeader className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">AI Assistant</CardTitle>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0 text-white/60 hover:text-white"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-white/60 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-3 rounded-lg text-sm",
                      message.isUser
                        ? "bg-nextgen-purple text-white ml-4"
                        : "bg-white/10 text-white mr-4"
                    )}
                  >
                    {message.text}
                  </div>
                ))}
                <div className="p-3 rounded-lg text-sm bg-white/10 text-white mr-4">
                  {getContextualWelcome()}
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-nextgen-purple"
                  />
                  <Button size="sm" className="bg-nextgen-purple hover:bg-nextgen-purple/90">
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextualAIChat;
