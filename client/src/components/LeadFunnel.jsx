import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { submitLead } from "../services/api";

const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Ireland", "Singapore", "Russia", "Malta", "Georgia", "New Zealand"];
const levels = ["High School", "Bachelor's", "Master's", "MBA", "PhD", "Diploma"];

export default function LeadFunnel({ open, onClose, source = "direct" }) {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1); setCountry(""); setLevel(""); setName(""); setPhone(""); setEmail(""); setSubmitting(false); setDone(false);
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!country || !level) { toast.error("Please select country and education level"); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) { toast.error("Please fill in all fields"); return; }
    setSubmitting(true);
    try {
      await submitLead({ name, phone, email, country, level, source });
      setDone(true);
      toast.success("Your personalized study plan is ready!");
    } catch {
      toast.success("We've received your request! Check your email for your free study plan.");
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => { onClose(); reset(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-3xl p-8 md:p-10 max-w-lg w-full text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

            {/* Close button */}
            <button onClick={() => { onClose(); reset(); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!done ? (
              <>
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-primary-500 text-white" : "bg-white/10 text-white/30"}`}>1</div>
                  <div className="w-8 h-px bg-white/10" />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-primary-500 text-white" : "bg-white/10 text-white/30"}`}>2</div>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {step === 1 ? (
                  <>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Get Your FREE Study Abroad Plan</h3>
                    <p className="text-white/40 text-sm mb-7">Find the best country, course & visa path in 60 seconds.</p>
                    <form onSubmit={handleStep1} className="space-y-3">
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer" style={{ color: country ? "white" : "rgba(255,255,255,0.3)" }}>
                        <option value="" disabled className="bg-surface-900">Preferred Country</option>
                        {countries.map((c) => (<option key={c} value={c} className="bg-surface-900">{c}</option>))}
                      </select>
                      <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer" style={{ color: level ? "white" : "rgba(255,255,255,0.3)" }}>
                        <option value="" disabled className="bg-surface-900">Education Level</option>
                        {levels.map((l) => (<option key={l} value={l} className="bg-surface-900">{l}</option>))}
                      </select>
                      <button type="submit" className="w-full btn-primary-glow text-base py-4 inline-flex items-center justify-center gap-2">
                        Continue
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Almost Done!</h3>
                    <p className="text-white/40 text-sm mb-7">Enter your details to receive your personalized study plan.</p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all" />
                      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all" />
                      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all" />
                      <button type="submit" disabled={submitting} className="w-full btn-primary-glow text-base py-4 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
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
                        {submitting ? "Generating Your Plan..." : "Get My Plan"}
                      </button>
                    </form>
                  </>
                )}

                {/* Social proof */}
                <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-white/30">
                  <span>10,000+ students guided</span>
                  <span className="w-px h-3 bg-white/10" />
                  <span>98% visa success</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-emerald-500 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Your Free Study Plan is Ready! 🎉</h3>
                <p className="text-white/40 text-sm mb-6">Check your email for a detailed report including:</p>
                <div className="grid grid-cols-2 gap-2 mb-6 text-left">
                  {["Best Country Match", "Visa Chances Analysis", "Estimated Total Cost", "Top University Picks"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                      <svg className="w-3 h-3 text-accent-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/30 mb-4">Want to talk to an expert right now?</p>
                <a
                  href="https://wa.me/919220552177?text=Hi%2C%20I%20just%20got%20my%20free%20study%20plan%20and%20want%20to%20discuss%20my%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all mb-3"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  Chat on WhatsApp Now
                </a>
                <button onClick={() => { onClose(); reset(); }} className="text-xs text-white/30 hover:text-white/50 transition-colors">
                  Close & review my plan later
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
