import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import LeadFunnel from "./LeadFunnel";
import UrgencyBubbles from "./UrgencyBubbles";

export default function Hero() {
  const [showFunnel, setShowFunnel] = useState(false);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh) scale(1); opacity: 0; }
        }
        @keyframes morphGradient {
          0% { transform: translate(0,0) scale(1); opacity: 0.4; }
          25% { transform: translate(40px,-60px) scale(1.2); opacity: 0.5; }
          50% { transform: translate(-30px,20px) scale(0.9); opacity: 0.3; }
          75% { transform: translate(20px,40px) scale(1.1); opacity: 0.45; }
          100% { transform: translate(0,0) scale(1); opacity: 0.4; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-950/30 via-surface-900 to-surface-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-1/5 w-[600px] h-[600px] bg-primary-500/15 rounded-full blur-[150px] animate-[morphGradient_14s_ease-in-out_infinite]" />
      <div className="absolute top-1/4 right-1/5 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] animate-[morphGradient_18s_ease-in-out_infinite_3s]" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-primary-600/8 rounded-full blur-[180px] animate-[morphGradient_20s_ease-in-out_infinite_6s]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 6 + 2;
          return (
            <div key={i}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                left: `${Math.random() * 100}%`,
                bottom: "-10px",
                background: `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.05})`,
                animation: `floatUp ${Math.random() * 12 + 10}s ease-in-out ${Math.random() * 8}s infinite`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>

      {/* Floating urgency bubbles */}
      <UrgencyBubbles />

      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-8 py-32 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto text-center">

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Trusted by 10,000+ Students Worldwide</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.92] mb-8 tracking-tight"
          >
            Build Your Future<br />
            <span className="relative">
              <span className="text-gradient-blue">Abroad — Without Confusion</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Find the best country, course & visa path in 60 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button onClick={() => setShowFunnel(true)} className="btn-primary-glow text-base px-10 py-5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get Your FREE Study Abroad Plan
            </button>
            <Link to="/destinations" className="btn-secondary text-base px-10 py-5 inline-flex items-center gap-2">
              Explore Destinations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Trust stats row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { number: "98%", label: "Visa Success Rate", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { number: "10,000+", label: "Students Placed", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { number: "500+", label: "Partner Universities", icon: "M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-tight">{badge.number}</p>
                  <p className="text-xs text-white/40">{badge.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <LeadFunnel open={showFunnel} onClose={() => setShowFunnel(false)} source="hero" />
    </section>
  );
}
