
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import SolutionsPage from './pages/SolutionsPage'
import AcademyPage from './pages/AcademyPage'
import DemoPage from './pages/DemoPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'
import SocialProofPage from './pages/SocialProofPage'
import CurriculumPage from './pages/CurriculumPage'
import SitemapPage from './pages/SitemapPage'
import LegalPage from './pages/LegalPage'
import LenisProvider from './components/providers/LenisProvider'
import AiAssistant from './components/AiAssistant'
import VoiceAiAssistant from './components/VoiceAiAssistant'
import { Toaster } from './components/ui/toaster'
import './App.css'

function App() {
  const [useVoiceAssistant, setUseVoiceAssistant] = useState(true);

  return (
    <LenisProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="academy" element={<AcademyPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="social-proof" element={<SocialProofPage />} />
          <Route path="curriculum" element={<CurriculumPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="legal" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
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
