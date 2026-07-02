import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeadFunnel from "./LeadFunnel";

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [showFunnel, setShowFunnel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !dismissed && !showFunnel) {
        setVisible(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed, showFunnel]);

  return (
    <>
      <AnimatePresence>
        {visible && !showFunnel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setVisible(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-coral to-transparent" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral to-emerald-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-3">Get FREE Study Abroad Assessment (Worth ₹2,499)</h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Find the best country, course & visa path for your profile — completely free. Limited to first 50 applicants this month.
              </p>

              <button
                onClick={() => { setVisible(false); setShowFunnel(true); }}
                className="btn-primary-glow text-base px-10 py-4 inline-flex items-center gap-2 mb-4 w-full justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Claim Now
              </button>

              <button
                onClick={() => { setVisible(false); setDismissed(true); }}
                className="text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                No thanks, I'll continue browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadFunnel open={showFunnel} onClose={() => setShowFunnel(false)} source="exit" />
    </>
  );
}
