
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';

import Index from './pages/Index';
import Solutions from './pages/Solutions';
import Academy from './pages/Academy';
import AcademyCurriculum from './pages/AcademyCurriculum';
import Integrations from './pages/Integrations';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import Join from './pages/Join';
import Watch from './pages/Watch';
import Story from './pages/Story';
import Security from './pages/Security';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import NextGenHomeV2 from './pages/NextGenHomeV2';
import AiTeam from './pages/AiTeam';
import AiDemo from './pages/AiDemo';
import Animations from './pages/Animations';
import Features from './pages/Features';

import LenisProvider from './components/providers/LenisProvider';
import ChatDialog from './components/chat/ChatDialog';
import EmailCollectionDialog from './components/EmailCollectionDialog';
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import AiAssistant from './components/AiAssistant';

const queryClient = new QueryClient();

function App() {
  const [isEmailCollected, setIsEmailCollected] = useState<boolean | null>(null);

  useEffect(() => {
    const emailCollected = localStorage.getItem('emailCollected');
    setIsEmailCollected(emailCollected === 'true');
  }, []);

  const handleEmailCollectionComplete = () => {
    localStorage.setItem('emailCollected', 'true');
    setIsEmailCollected(true);
  };

  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <LenisProvider>
          <QueryClientProvider client={queryClient}>
            {isEmailCollected === null ? (
              <EmailCollectionDialog
                triggerText=""
                buttonClassName="hidden"
                open={true}
                onOpenChange={(open) => {
                  if (!open) handleEmailCollectionComplete();
                }}
                onComplete={handleEmailCollectionComplete}
              />
            ) : (
              <>
                <AiAssistant />
                <Router>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/academy/curriculum" element={<AcademyCurriculum />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/nextgen-home-v2" element={<NextGenHomeV2 />} />
                    <Route path="/ai-team" element={<AiTeam />} />
                    <Route path="/ai-demo" element={<AiDemo />} />
                    <Route path="/animations" element={<Animations />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </>
            )}
          </QueryClientProvider>
        </LenisProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;
