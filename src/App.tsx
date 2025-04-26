
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Watch from "./pages/Watch";
import Story from "./pages/Story";
import Join from "./pages/Join";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import Academy from "./pages/Academy";
import Solutions from "./pages/Solutions";
import Resources from "./pages/Resources";
import AiAssistant from "./components/AiAssistant";

const queryClient = new QueryClient();

// Create a component that only renders AiAssistant at the root level
const AiAssistantWrapper = () => {
  const location = useLocation();
  // Only render on the root page
  if (location.pathname === '/') {
    return <AiAssistant />;
  }
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AiAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
