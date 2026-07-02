import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Destinations", href: "/destinations" },
  { name: "Contact", href: "/contact" },
  { name: "Live", href: "/live", badge: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary-500/5 before:to-transparent before:pointer-events-none ${
        scrolled
          ? "bg-surface-950/80 backdrop-blur-xl border-b border-primary-500/15 shadow-2xl shadow-black/30"
          : "bg-surface-950/40 backdrop-blur-md border-b border-primary-500/5"
      }`}
    >
      {/* Animated glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
      <div className="container-custom flex justify-between items-center px-4 md:px-8 h-20">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 via-coral to-coral-dark flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/10 group-hover:ring-white/20">
            <span className="text-white font-display font-bold text-sm tracking-tight">A</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent opacity-50" />
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary-500/0 via-coral/0 to-coral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-display font-bold text-white tracking-[0.15em] uppercase leading-none">ABC Visas</span>
            <span className="text-[10px] font-sans font-medium text-white/40 tracking-[0.2em] uppercase mt-0.5">consulting & services</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all rounded-xl inline-flex items-center gap-1.5 ${
                  isActive
                    ? "text-white bg-white/5"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-primary-500 to-coral text-white font-bold animate-pulse tracking-wider">
                    LIVE
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-500 to-coral rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop auth/CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white transition-all rounded-xl hover:bg-white/[0.03]">
                Dashboard
              </Link>
              <button onClick={logout} className="px-5 py-2.5 text-sm font-medium text-white/30 hover:text-white/60 transition-all rounded-xl hover:bg-white/[0.03]">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white transition-all rounded-xl hover:bg-white/[0.03]">
                Sign In
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-primary-500 to-coral text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:shadow-[0_0_30px_rgba(15,106,107,0.3)] hover:scale-[1.02] transition-all duration-300">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-950/80 backdrop-blur-xl border-t border-primary-500/10"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setMobileOpen(false)} className="text-white/70 font-medium py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-all">
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-3 mt-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block text-white/70 font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all">Dashboard</Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left text-white/40 font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-white/70 font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all">Sign In</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="block bg-gradient-to-r from-primary-500 to-coral text-white text-center font-semibold py-3 px-4 rounded-xl">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}