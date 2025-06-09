
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LenisProvider from './components/providers/LenisProvider';
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from './pages/Index';
import Solutions from './pages/Solutions';
import AiTeam from './pages/AiTeam';
import Academy from './pages/Academy';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import Story from './pages/Story';
import Integrations from './pages/Integrations';
import Security from './pages/Security';
import Features from './pages/Features';
import Resources from './pages/Resources';
import KitsIndex from './pages/KitsIndex';
import KitDetail from './pages/KitDetail';
import Certifications from './pages/Certifications';
import AcademyCertification from './pages/AcademyCertification';
import AcademyCurriculum from './pages/AcademyCurriculum';
import AcademyBusinessModel from './pages/AcademyBusinessModel';
import Boardroom from './pages/Boardroom';
import AiDemo from './pages/AiDemo';
import NextGenOS from './pages/NextGenOS';
import NewHomepage from './pages/NewHomepage';
import NextGenHomeV2 from './pages/NextGenHomeV2';
import Juv from './pages/Juv';
import Join from './pages/Join';
import Watch from './pages/Watch';
import Privacy from './pages/Privacy';
import Animations from './pages/Animations';
import NotFound from './pages/NotFound';

// App components
import AppLayout from './components/app/AppLayout';
import Login from './pages/app/Login';
import PatientHome from './pages/app/patient/PatientHome';
import PatientWallet from './pages/app/patient/PatientWallet';
import PatientBooking from './pages/app/patient/PatientBooking';
import PatientReferrals from './pages/app/patient/PatientReferrals';
import StaffDashboard from './pages/app/staff/StaffDashboard';
import StaffCreditRedemption from './pages/app/staff/StaffCreditRedemption';
import StaffBookings from './pages/app/staff/StaffBookings';
import HQOverview from './pages/app/hq/HQOverview';
import TenantManagement from './pages/app/hq/TenantManagement';
import ServiceManagement from './pages/app/hq/ServiceManagement';
import AnalyticsDashboard from './pages/app/hq/AnalyticsDashboard';

// New Admin Pages
import AdminDashboard from './pages/app/admin/AdminDashboard';
import AdminUsers from './pages/app/admin/AdminUsers';
import AdminCredits from './pages/app/admin/AdminCredits';
import AdminAgents from './pages/app/admin/AdminAgents';
import AdminReports from './pages/app/admin/AdminReports';
import AdminLocations from './pages/app/admin/AdminLocations';
import AdminSettings from './pages/app/admin/AdminSettings';

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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LenisProvider>
            <Router>
              <Routes>
                {/* Existing routes */}
                <Route path="/" element={<Index />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/ai-team" element={<AiTeam />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/story" element={<Story />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/security" element={<Security />} />
                <Route path="/features" element={<Features />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/kits" element={<KitsIndex />} />
                <Route path="/kits/:slug" element={<KitDetail />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/academy/certification" element={<AcademyCertification />} />
                <Route path="/academy/curriculum" element={<AcademyCurriculum />} />
                <Route path="/academy/business-model" element={<AcademyBusinessModel />} />
                <Route path="/boardroom" element={<Boardroom />} />
                <Route path="/ai-demo" element={<AiDemo />} />
                <Route path="/nextgen-os" element={<NextGenOS />} />
                <Route path="/new-homepage" element={<NewHomepage />} />
                <Route path="/v2" element={<NextGenHomeV2 />} />
                <Route path="/juv" element={<Juv />} />
                <Route path="/join" element={<Join />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/animations" element={<Animations />} />

                {/* App routes */}
                <Route path="/app/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Navigate to="/app/patient/home" replace />} />
                  
                  {/* Patient routes */}
                  <Route path="patient/home" element={<PatientHome />} />
                  <Route path="patient/book" element={<PatientBooking />} />
                  <Route path="patient/wallet" element={<PatientWallet />} />
                  <Route path="patient/referral" element={<PatientReferrals />} />
                  
                  {/* Staff routes */}
                  <Route path="staff/dashboard" element={<StaffDashboard />} />
                  <Route path="staff/redeem" element={<StaffCreditRedemption />} />
                  <Route path="staff/bookings" element={<StaffBookings />} />
                  
                  {/* HQ Admin routes */}
                  <Route path="hq/overview" element={<HQOverview />} />
                  <Route path="hq/tenants" element={<TenantManagement />} />
                  <Route path="hq/services" element={<ServiceManagement />} />
                  <Route path="hq/analytics" element={<AnalyticsDashboard />} />
                  <Route path="hq/agents" element={<div className="text-white">AI Agents - Coming Soon</div>} />
                  <Route path="hq/academy" element={<div className="text-white">Academy - Coming Soon</div>} />
                  <Route path="hq/settings" element={<div className="text-white">Settings - Coming Soon</div>} />

                  {/* NextGen OS Admin Routes */}
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/users" element={<AdminUsers />} />
                  <Route path="admin/credits" element={<AdminCredits />} />
                  <Route path="admin/agents" element={<AdminAgents />} />
                  <Route path="admin/reports" element={<AdminReports />} />
                  <Route path="admin/locations" element={<AdminLocations />} />
                  <Route path="admin/settings" element={<AdminSettings />} />
                </Route>

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
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
