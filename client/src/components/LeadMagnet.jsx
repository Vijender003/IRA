import { useState } from "react";
import { motion } from "framer-motion";
import LeadFunnel from "./LeadFunnel";

export default function LeadMagnet() {
  const [showFunnel, setShowFunnel] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-950/30 to-surface-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)]" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 border-2 border-primary-500/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="inline-block text-accent-400 text-xs font-semibold tracking-widest uppercase mb-3">Free Resource</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
                  Get Your FREE<br />
                  <span className="text-gradient">Personalized Report</span>
                </h3>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">
                  Includes your best country match, visa chances, estimated total cost, and top university picks — tailored to your profile.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    { label: "Best country match based on your goals", icon: "🌍" },
                    { label: "Visa success probability analysis", icon: "✅" },
                    { label: "Complete cost breakdown (tuition + living)", icon: "💰" },
                    { label: "Top 3 universities with application tips", icon: "🎓" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowFunnel(true)}
                  className="btn-primary-glow text-base px-8 py-4 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Get My Free Report
                </button>
              </div>
              <div className="hidden md:block relative">
                <div className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">JD</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Your Personalized Report</p>
                      <p className="text-[10px] text-white/30">Generated just for you</p>
                    </div>
                  </div>
                  {[
                    { label: "Best Country", value: "Canada", color: "text-accent-400" },
                    { label: "Visa Chances", value: "92%", color: "text-accent-400" },
                    { label: "Est. Cost (1 Year)", value: "$25,000 - $35,000", color: "text-white" },
                    { label: "Top University", value: "University of Toronto", color: "text-primary-300" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-white/30">{row.label}</span>
                      <span className={`text-xs font-semibold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-white/20">
                      <svg className="w-3 h-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      10,000+ students already received theirs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <LeadFunnel open={showFunnel} onClose={() => setShowFunnel(false)} source="leadmagnet" />
    </section>
  );
}
