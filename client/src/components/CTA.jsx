import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AIAdvisor from "./AIAdvisor";

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-surface-950 to-accent-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px] animate-pulse animate-delay-2000" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-6">
            Start Today
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Your Future Without Borders<br />
            <span className="text-gradient">Starts With One Click</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Get your personalized study plan and eligibility check — free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link to="/apply" className="btn-primary-glow text-base px-10 py-5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check Your Eligibility
            </Link>
            <AIAdvisor />
            <a href="tel:+919220552177" className="btn-secondary text-base px-10 py-5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +91 9220552177
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
