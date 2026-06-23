import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustLogos from "./components/TrustLogos";
import TrustStats from "./components/TrustStats";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Destinations from "./components/Destinations";
import SocialProof from "./components/SocialProof";
import Testimonials from "./components/Testimonials";
import LeadMagnet from "./components/LeadMagnet";
import OfferSection from "./components/OfferSection";
import LeadForm from "./components/LeadForm";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import ExitPopup from "./components/ExitPopup";
import LeadFunnel from "./components/LeadFunnel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from "./pages/ApplicationForm";
import DestinationsPage from "./pages/DestinationsPage";
import ServicesPage from "./pages/ServicesPage";
import CountryPage from "./components/CountryPage";
import UniversityDetailPage from "./pages/UniversityDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <TrustStats />
      <HowItWorks />
      <Services />
      <Destinations />
      <SocialProof />
      <Testimonials />
      <LeadMagnet />
      <OfferSection />
      <LeadForm />
      <CTA />
      <Contact />
    </>
  );
}

function App() {
  const [showFunnel, setShowFunnel] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#1e293b", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" },
            success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <div className="min-h-screen bg-surface-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/country/:slug" element={<CountryPage />} />
            <Route path="/universities/:slug" element={<UniversityDetailPage />} />
          </Routes>
          <Footer />
          <WhatsApp />
          <ExitPopup />
          <LeadFunnel open={showFunnel} onClose={() => setShowFunnel(false)} source="sticky" />

          {/* Sticky lead button - desktop */}
          <button
            onClick={() => setShowFunnel(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-semibold py-3 px-4 rounded-l-xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:pr-6 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap">
              Check Eligibility
            </span>
          </button>

          {/* Mobile sticky CTA */}
          <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Free Assessment</p>
                <p className="text-sm font-bold text-white truncate">Get Your FREE Study Abroad Plan</p>
              </div>
              <button
                onClick={() => setShowFunnel(true)}
                className="btn-primary-glow text-sm px-5 py-3 whitespace-nowrap inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Free Assessment
              </button>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
