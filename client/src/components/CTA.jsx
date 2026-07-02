import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AIAdvisor from "./AIAdvisor";

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <style>{`
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes glowPulseCTA { 0%,100% { box-shadow: 0 0 20px rgba(15,106,107,0.3), 0 0 60px rgba(15,106,107,0.1); } 50% { box-shadow: 0 0 30px rgba(15,106,107,0.5), 0 0 80px rgba(15,106,107,0.2); } }
        .cta-glow-bg { background-size: 200% 200%; animation: gradientShift 6s ease infinite; }
        .cta-glow-btn:hover { animation: glowPulseCTA 1.5s ease-in-out infinite; }
        @keyframes titleGlowCTA { 0%,100% { filter: drop-shadow(0 0 8px rgba(15,106,107,0.2)); } 50% { filter: drop-shadow(0 0 20px rgba(15,106,107,0.4)); } }
        .cta-title-glow { animation: titleGlowCTA 4s ease-in-out infinite; }
      `}</style>
      <div className="absolute inset-0 cta-glow-bg bg-gradient-to-br from-primary-950/50 via-surface-950 to-coral-dark/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,106,107,0.08),transparent_70%)]" />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[100px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ left: "20%", top: "20%" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-coral/10 blur-[100px]"
        animate={{ x: [0, -60, 80, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ right: "20%", bottom: "20%" }}
      />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-6 bg-coral/10 border border-coral/20 rounded-full px-5 py-2">
            Start Today
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight cta-title-glow">
            Your Next Big Move<br />
            <span className="bg-gradient-to-r from-primary-500 via-coral to-violet-400 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get your personalized study plan and eligibility check — free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link to="/apply" className="bg-gradient-to-r from-primary-500 to-coral text-white text-base font-semibold px-10 py-5 rounded-2xl inline-flex items-center gap-2 shadow-2xl shadow-primary-500/25 hover:shadow-[0_0_50px_rgba(15,106,107,0.35)] hover:scale-[1.02] transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Your Journey
            </Link>
            <AIAdvisor />
            <a href="tel:+15550000000" className="inline-flex items-center gap-3 text-white/60 text-base font-semibold px-10 py-5 rounded-2xl border border-white/10 hover:border-primary-500/30 hover:text-white hover:bg-white/[0.02] transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +1 (555) 000-0000
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
