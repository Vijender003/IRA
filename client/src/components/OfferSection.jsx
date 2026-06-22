import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SlotCounter() {
  const [slots, setSlots] = useState(27);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlots((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  return slots > 0 ? (
    <span className="text-accent-400 font-bold">{slots} slots left</span>
  ) : (
    <span className="text-red-400 font-bold">Fully booked this month</span>
  );
}

export default function OfferSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-surface-950 to-accent-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_70%)]" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-accent-500/15 rounded-full blur-[100px] animate-pulse animate-delay-2000" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto border-2 border-primary-500/20 relative overflow-hidden"
        >
          {/* Shimmer line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-5 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-sm text-accent-400 font-semibold">Limited Time Offer</span>
            </motion.div>

            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
              <span className="text-xs text-red-400 font-medium">
                <SlotCounter />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Free Consultation <span className="text-white/30 line-through decoration-2 decoration-red-500/50">Worth ₹1,999</span>
            </h2>

            <p className="text-white/40 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Get a personalized 1-on-1 session with our study abroad experts. We'll evaluate your profile, suggest the best destinations, and create a roadmap — absolutely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/apply" className="btn-primary-glow text-base px-12 py-5 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Book Free Call Now
              </Link>
              <a href="tel:+919220552177" className="btn-secondary text-base px-10 py-5 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +91 9220552177
              </a>
            </div>

            <p className="mt-8 text-xs text-white/20">* Limited slots available. Offer valid for first 50 applicants this month.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
