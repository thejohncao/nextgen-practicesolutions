
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Academy from "./pages/Academy";
import Features from "./pages/Features";
import Join from "./pages/Join";
import Integrations from "./pages/Integrations";
import Security from "./pages/Security";
import Privacy from "./pages/Privacy";
import Watch from "./pages/Watch";
import Resources from "./pages/Resources";
import Story from "./pages/Story";
import Animations from "./pages/Animations";
import NotFound from "./pages/NotFound";
import AiAssistant from "./components/AiAssistant";
import AvatarManager from "./components/admin/AvatarManager";
import LenisProvider from "./components/providers/LenisProvider";

const queryClient = new QueryClient();

// Create a ScrollToTop component to reset scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use standard window.scrollTo without smooth behavior for consistent experience
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const AiAssistantWrapper = () => {
  const showAiAssistantPaths = ['/', '/solutions', '/academy', '/features'];
  
  return <AiAssistant showPaths={showAiAssistantPaths} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LenisProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/story" element={<Story />} />
            <Route path="/join" element={<Join />} />
            <Route path="/features" element={<Features />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/resources/*" element={<Resources />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin/avatars" element={<AvatarManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AiAssistantWrapper />
        </Router>
      </LenisProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
