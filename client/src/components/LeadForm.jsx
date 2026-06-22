import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Ireland", "Singapore", "Russia", "Malta", "Georgia", "New Zealand"];

export default function LeadForm({ sticky }) {
  const [form, setForm] = useState({ name: "", phone: "", country: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.country) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success("We've received your request! Our team will contact you within 24 hours.");
      setForm({ name: "", phone: "", country: "" });
      setSubmitting(false);
    }, 1000);
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${sticky ? "" : "glass-card rounded-3xl p-8 md:p-10"} max-w-md mx-auto`}
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">Check Your Eligibility</h3>
        <p className="text-sm text-white/40">Fill in your details and we'll get back to you</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
          />
        </div>
        <div>
          <select
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
            style={{ color: form.country ? "white" : "rgba(255,255,255,0.3)" }}
          >
            <option value="" disabled className="bg-surface-900">Preferred Country</option>
            {countries.map((c) => (
              <option key={c} value={c} className="bg-surface-900">{c}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-primary-glow text-base py-4 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {submitting ? "Submitting..." : "Check Your Eligibility"}
        </button>
        <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-white/25">
          <span>10,000+ students guided</span>
          <span className="w-px h-3 bg-white/10" />
          <span>98% visa success rate</span>
          <span className="w-px h-3 bg-white/10" />
          <span>500+ universities</span>
        </div>
      </form>
    </motion.div>
  );

  if (sticky) {
    return (
      <div className="fixed bottom-24 right-6 z-40 hidden lg:block">
        <div className="glass-strong rounded-2xl p-5 w-72 shadow-2xl shadow-primary-500/5 border border-primary-500/10">
          <div className="text-center mb-3">
            <h4 className="text-sm font-bold text-white">Quick Eligibility Check</h4>
            <p className="text-[10px] text-white/30">Free · 2 mins</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all" />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition-all" />
            <button type="submit" disabled={submitting} className="w-full bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold py-2.5 rounded-lg transition-all disabled:opacity-50">
              {submitting ? "Sending..." : "Check Eligibility"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return content;
}
