import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UrgencyBar from "./components/UrgencyBar";
import TrustLogos from "./components/TrustLogos";
import TrustStats from "./components/TrustStats";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Destinations from "./components/Destinations";
import SocialProof from "./components/SocialProof";
import Testimonials from "./components/Testimonials";
import OfferSection from "./components/OfferSection";
import LeadForm from "./components/LeadForm";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from "./pages/ApplicationForm";
import DestinationsPage from "./pages/DestinationsPage";
import ServicesPage from "./pages/ServicesPage";
import CountryPage from "./components/CountryPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <UrgencyBar />
      <Hero />
      <TrustLogos />
      <TrustStats />
      <HowItWorks />
      <Services />
      <Destinations />
      <SocialProof />
      <Testimonials />
      <OfferSection />
      <LeadForm />
      <CTA />
      <Contact />
    </>
  );
}

function App() {
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
          </Routes>
          <Footer />
          <WhatsApp />

          {/* Mobile sticky CTA */}
          <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/50">Free Consultation</p>
                <p className="text-sm font-bold text-white truncate">Worth ₹1,999 — Limited Time</p>
              </div>
              <a
                href="/apply"
                className="btn-primary-glow text-sm px-6 py-3 whitespace-nowrap inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Book Free Call
              </a>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
