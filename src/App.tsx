
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import LenisProvider from './components/providers/LenisProvider'
import VoiceAiAssistant from './components/VoiceAiAssistant'
import { Toaster } from './components/ui/toaster'
import { TooltipProvider } from './components/ui/tooltip'
import Index from './pages/Index'
import Academy from './pages/Academy'
import Solutions from './pages/Solutions'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Join from './pages/Join'
import Animations from './pages/Animations'
import Security from './pages/Security'
import Resources from './pages/Resources'
import Story from './pages/Story'
import Privacy from './pages/Privacy'
import Integrations from './pages/Integrations'
import AcademyCurriculum from './pages/AcademyCurriculum'
import Watch from './pages/Watch'
import EnhancedAiAssistant from './components/EnhancedAiAssistant'
import './App.css'

function App() {
  return (
    <LenisProvider>
      <TooltipProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/solutions" element={<Layout><Solutions /></Layout>} />
            <Route path="/academy" element={<Layout><Academy /></Layout>} />
            <Route path="/academy/curriculum" element={<Layout><AcademyCurriculum /></Layout>} />
            <Route path="/join" element={<Layout><Join /></Layout>} />
            <Route path="/watch" element={<Layout><Watch /></Layout>} />
            <Route path="/story" element={<Layout><Story /></Layout>} />
            <Route path="/animations" element={<Layout><Animations /></Layout>} />
            <Route path="/security" element={<Layout><Security /></Layout>} />
            <Route path="/resources/*" element={<Layout><Resources /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/integrations" element={<Layout><Integrations /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
        
        {/* Enhanced AI Assistant with agent selection */}
        <EnhancedAiAssistant 
          showPaths={['/', '/solutions', '/academy', '/features']}
          initialAgent="miles"
        />
        
        <Toaster />
      </TooltipProvider>
    </LenisProvider>
  )
}

export default App
