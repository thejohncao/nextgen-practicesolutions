
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import LenisProvider from './components/providers/LenisProvider'
import AiAssistant from './components/AiAssistant'
import VoiceAiAssistant from './components/VoiceAiAssistant'
import { Toaster } from './components/ui/toaster'
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
import './App.css'

function App() {
  const [useVoiceAssistant, setUseVoiceAssistant] = useState(true);

  return (
    <LenisProvider>
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
      
      {/* Use the voice-enabled AI Assistant */}
      {useVoiceAssistant ? (
        <VoiceAiAssistant 
          showPaths={['/', '/solutions', '/academy', '/features']}
          initialAgent="miles"
          initialVoiceMode={false}
        />
      ) : (
        <AiAssistant 
          showPaths={['/', '/solutions', '/academy', '/features']}
        />
      )}
      
      <Toaster />
    </LenisProvider>
  )
}

export default App
