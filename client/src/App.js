import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStats from "./components/TrustStats";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Destinations from "./components/Destinations";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import AIAdvisor from "./components/AIAdvisor";
import TrustLogos from "./components/TrustLogos";
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
      <Hero />
      <TrustLogos />
      <TrustStats />
      <HowItWorks />
      <Services />
      <Destinations />
      <Testimonials />
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
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
