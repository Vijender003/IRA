import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Particle({ index }) {
  const size = Math.random() * 6 + 2;
  const x = Math.random() * 100;
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 5;
  return (
    <div
      className="particle"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10px",
        background: `rgba(37, 99, 235, ${Math.random() * 0.4 + 0.1})`,
        animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
        opacity: 0,
      }}
    />
  );
}

function useParticles(count) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: count }, (_, i) => <Particle key={i} index={i} />));
  }, [count]);
  return particles;
}

export default function Hero() {
  const particles = useParticles(20);

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
          0% { transform: translate(0,0) scale(1); opacity: 0.3; }
          25% { transform: translate(40px,-60px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(-30px,20px) scale(0.9); opacity: 0.2; }
          75% { transform: translate(20px,40px) scale(1.1); opacity: 0.35; }
          100% { transform: translate(0,0) scale(1); opacity: 0.3; }
        }
      `}</style>

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-950/40 to-surface-950" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] animate-[morphGradient_12s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] animate-[morphGradient_15s_ease-in-out_infinite_2s]" />
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[150px] animate-[morphGradient_18s_ease-in-out_infinite_4s]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>

      <div className="relative z-10 container-custom px-4 md:px-8 py-32 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Trusted by 10,000+ Students Worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] mb-8 tracking-tight"
          >
            Build Your Future<br />
            <span className="text-gradient-blue">Abroad — Without the Confusion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            From university selection to visa approval, we guide you step-by-step
            to study, work, and settle in top countries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/apply" className="btn-primary-glow text-base px-10 py-5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get Your Free Study Plan
            </Link>
            <Link to="/destinations" className="btn-secondary text-base px-10 py-5 inline-flex items-center gap-2">
              Explore Destinations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { number: "10,000+", label: "Students", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { number: "98%", label: "Visa Success", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { number: "500+", label: "Universities", icon: "M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" },
            ].map((badge, i) => (
              <div key={i} className="trust-badge flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-white">{badge.number}</span>
                  <span className="text-xs text-white/40 ml-1">{badge.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
    </section>
  );
}
