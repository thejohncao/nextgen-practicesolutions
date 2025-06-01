
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import LenisProvider from './components/providers/LenisProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

// Pages
import Index from './pages/Index';
import NewHomepage from './pages/NewHomepage'; // New homepage
import About from './pages/About';
import AiTeam from './pages/AiTeam';
import Solutions from './pages/Solutions';
import Features from './pages/Features';
import Academy from './pages/Academy';
import AcademyCurriculum from './pages/AcademyCurriculum';
import AcademyCertification from './pages/AcademyCertification';
import Story from './pages/Story';
import Security from './pages/Security';
import Pricing from './pages/Pricing';
import Integrations from './pages/Integrations';
import Animations from './pages/Animations';
import NextGenHomeV2 from './pages/NextGenHomeV2';
import Resources from './pages/Resources';
import Watch from './pages/Watch';
import Join from './pages/Join';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import AiDemo from './pages/AiDemo';
import Boardroom from './pages/Boardroom';
import Certifications from './pages/Certifications';
import AITeamOrbitalPage from './pages/AITeamOrbitalPage';

// Components
import AiAssistant from './components/AiAssistant';
import EmailCollectionDialog from './components/EmailCollectionDialog';
import ChatDialog from './components/chat/ChatDialog';

// Create a client
const queryClient = new QueryClient();

function App() {
  const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isChatMinimized, setIsChatMinimized] = useState<boolean>(false);
  
  const handleCompleteDemo = () => {
    setShowEmailDialog(true);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LenisProvider>
          <Router>
            <Routes>
              {/* Use the NewHomepage as the main index page */}
              <Route path="/" element={<NewHomepage />} />
              <Route path="/legacy" element={<Index />} />
              <Route path="/new-homepage" element={<NewHomepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/ai-team" element={<AiTeam />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/features" element={<Features />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/academy/curriculum" element={<AcademyCurriculum />} />
              <Route path="/academy/certification" element={<AcademyCertification />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/story" element={<Story />} />
              <Route path="/security" element={<Security />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/animations" element={<Animations />} />
              <Route path="/nextgen-home-v2" element={<NextGenHomeV2 />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/join" element={<Join />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/ai-demo" element={<AiDemo />} />
              <Route path="/boardroom" element={<Boardroom />} />
              <Route path="/ai-team-orbital" element={<AITeamOrbitalPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <AiAssistant />
            <EmailCollectionDialog 
              open={showEmailDialog} 
              onOpenChange={setShowEmailDialog}
              triggerText=""
              buttonClassName="hidden"
            />
            <ChatDialog 
              isOpen={isChatOpen}
              isMinimized={isChatMinimized}
              setIsMinimized={setIsChatMinimized}
              onOpenChange={setIsChatOpen}
              messages={[]}
              onSendMessage={() => {}}
              currentAgent="miles"
              isTyping={false}
              isTimedOut={false}
              timeoutLevel="none"
              handleRetry={() => {}}
              handleStartOver={() => {}}
              onChangeAgent={() => {}}
            />
          </Router>
        </LenisProvider>
      </TooltipProvider>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
