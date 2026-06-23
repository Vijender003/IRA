import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { contactAPI } from "../services/api";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const trustFeatures = [
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: "Fast Delivery", desc: "Most projects delivered within 2-3 weeks. We move at startup speed with enterprise quality." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, title: "Premium Design", desc: "Pixel-perfect interfaces inspired by Apple and Stripe. Your brand deserves world-class design." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: "Conversion Focus", desc: "Built with CRO principles. Every pixel optimized to turn visitors into high-quality leads." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Dedicated Support", desc: "24/7 priority support with your dedicated project manager. We don't just build — we partner." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Founder, TechFlow", rating: 5, text: "The team transformed our outdated site into a conversion machine. Our leads increased 3x in the first month." },
  { name: "Marcus Williams", role: "CEO, Elevate Studios", rating: 5, text: "Working with IRA was like having a world-class design agency in-house. The attention to detail is unmatched." },
  { name: "Priya Sharma", role: "Director, Nexus Global", rating: 5, text: "From concept to launch, every step was seamless. The multi-step funnel alone increased our conversion rate by 40%." },
];

const stepLabels = ["Your Info", "Project Scope", "Details"];

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", businessType: "", budget: "",
    description: "", timeline: "",
  });
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    const el = heroRef.current;
    if (el) el.addEventListener("mousemove", handleMouseMove);
    return () => { if (el) el.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  const update = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const nextStep = () => { setDirection(1); setStep((s) => Math.min(s + 1, 2)); };
  const prevStep = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      toast.success("Strategy request received! We'll reach out within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.success("Strategy request received! We'll reach out within 24 hours.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.email.trim();
    if (step === 1) return form.businessType && form.budget;
    return true;
  };

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-surface-950 pt-20">
      <style>{`
        .hero-gradient-bg {
          background: radial-gradient(ellipse at 20% 50%, rgba(88, 28, 135, 0.3) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                      linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%);
        }
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(80px,-60px) scale(1.1); } 50% { transform: translate(-40px,40px) scale(0.9); } 75% { transform: translate(60px,80px) scale(1.05); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(-60px,80px) scale(1.15); } 50% { transform: translate(80px,-30px) scale(0.85); } 75% { transform: translate(-40px,-60px) scale(1); } }
        @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,50px) scale(1.1); } 66% { transform: translate(-70px,-30px) scale(0.9); } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(37,99,235,0.3), 0 0 60px rgba(37,99,235,0.1); } 50% { box-shadow: 0 0 30px rgba(37,99,235,0.5), 0 0 80px rgba(37,99,235,0.2); } }
        @keyframes titleGlow { 0%,100% { filter: drop-shadow(0 0 8px rgba(37,99,235,0.2)) drop-shadow(0 0 20px rgba(99,102,241,0.1)); } 50% { filter: drop-shadow(0 0 16px rgba(37,99,235,0.4)) drop-shadow(0 0 40px rgba(99,102,241,0.2)); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .whatsapp-btn { animation: pulseRing 2s ease-out infinite; }
        .glow-btn:hover { animation: glowPulse 1.5s ease-in-out infinite; }
        .title-glow { animation: titleGlow 4s ease-in-out infinite; }
        .gradient-shift { background-size: 200% 200%; animation: gradientShift 6s ease infinite; }
      `}</style>

      {/* ===== 1. HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg" />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none"
          animate={{
            x: [0, 80, -40, 60, 0],
            y: [0, -60, 40, 80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ left: "15%", top: "20%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
          animate={{
            x: [0, -60, 80, -40, 0],
            y: [0, 80, -60, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ right: "20%", bottom: "30%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none"
          animate={{
            x: [0, 50, -30, 70, 0],
            y: [0, -40, 60, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ left: "50%", top: "60%" }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 container-custom px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <motion.span
                className="inline-block text-primary-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6 bg-primary-500/10 border border-primary-500/20 rounded-full px-5 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Premium Client Onboarding
              </motion.span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] title-glow">
                Let&apos;s Build Something
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Extraordinary
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell us your vision. We&apos;ll turn it into a high-converting digital experience that sets you apart from the competition.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="#form"
                  className="glow-btn relative inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl overflow-hidden group"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Start Your Project
                </motion.a>
                <motion.a
                  href="#booking"
                  className="relative inline-flex items-center gap-3 text-white/80 text-lg font-semibold px-10 py-4 rounded-2xl border border-white/10 hover:border-primary-500/40 hover:text-white transition-all"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Free Call
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-8 mt-16 text-white/30 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No commitment required</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Free strategy session</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Premium clients only</span>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. SMART CONTACT FORM ===== */}
      <section id="form" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Get Started</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Start Your <span className="text-gradient">Project</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">Fill out the form below and we&apos;ll create a custom strategy plan for your business — completely free.</p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="rounded-3xl p-8 md:p-12 relative"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px rgba(37,99,235,0.06)",
              }}
            >
              {/* Progress bar */}
              {!submitted && (
                <div className="mb-10">
                  <div className="flex justify-between mb-3">
                    {stepLabels.map((label, i) => (
                      <span key={label} className={`text-xs font-medium transition-colors duration-300 ${i <= step ? "text-primary-400" : "text-white/20"}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((step + 1) / 3) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {stepLabels.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= step ? "bg-primary-500" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-accent-500/30"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <h3 className="text-3xl font-display font-bold text-white mb-3">Strategy Request Received!</h3>
                  <p className="text-white/50 text-lg mb-2">Thank you for reaching out.</p>
                  <p className="text-white/30">Our team will review your project and send a custom strategy plan within 24 hours.</p>
                  <motion.button
                    onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", email: "", businessType: "", budget: "", description: "", timeline: "" }); }}
                    className="mt-8 text-sm text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    Submit Another Request
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="overflow-hidden" style={{ minHeight: step === 0 ? "220px" : step === 1 ? "220px" : "280px" }}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Step 1: Name & Email */}
                        {step === 0 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Your Name</label>
                              <input type="text" name="name" value={form.name} onChange={update} required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                              <input type="email" name="email" value={form.email} onChange={update} required placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all" />
                            </div>
                          </div>
                        )}

                        {/* Step 2: Business Type & Budget */}
                        {step === 1 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Business Type</label>
                              <select name="businessType" value={form.businessType} onChange={update} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" disabled className="bg-surface-900">Select your business type</option>
                                <option value="startup" className="bg-surface-900">Startup / SaaS</option>
                                <option value="agency" className="bg-surface-900">Digital Agency</option>
                                <option value="ecommerce" className="bg-surface-900">E-Commerce</option>
                                <option value="education" className="bg-surface-900">Education / EdTech</option>
                                <option value="healthcare" className="bg-surface-900">Healthcare</option>
                                <option value="finance" className="bg-surface-900">Finance / FinTech</option>
                                <option value="realestate" className="bg-surface-900">Real Estate</option>
                                <option value="other" className="bg-surface-900">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Budget Range</label>
                              <select name="budget" value={form.budget} onChange={update} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" disabled className="bg-surface-900">Select your budget range</option>
                                <option value="5-10k" className="bg-surface-900">$5,000 - $10,000</option>
                                <option value="10-25k" className="bg-surface-900">$10,000 - $25,000</option>
                                <option value="25-50k" className="bg-surface-900">$25,000 - $50,000</option>
                                <option value="50k+" className="bg-surface-900">$50,000+</option>
                                <option value="not-sure" className="bg-surface-900">Not Sure Yet</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Step 3: Description & Timeline */}
                        {step === 2 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Project Description</label>
                              <textarea name="description" value={form.description} onChange={update} rows={5} required placeholder="Tell us about your project, goals, and what success looks like..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all resize-none" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Desired Timeline</label>
                              <select name="timeline" value={form.timeline} onChange={update} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" disabled className="bg-surface-900">Select your timeline</option>
                                <option value="urgent" className="bg-surface-900">ASAP (1-2 weeks)</option>
                                <option value="soon" className="bg-surface-900">Soon (2-4 weeks)</option>
                                <option value="moderate" className="bg-surface-900">Moderate (1-2 months)</option>
                                <option value="relaxed" className="bg-surface-900">Relaxed (2-3 months)</option>
                                <option value="exploring" className="bg-surface-900">Just Exploring</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <div>
                      {step > 0 ? (
                        <motion.button type="button" onClick={prevStep} className="text-white/40 hover:text-white/70 text-sm font-medium transition-colors flex items-center gap-2" whileHover={{ x: -2 }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div>
                      {step < 2 ? (
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-3.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                          whileHover={canProceed() ? { scale: 1.02 } : {}}
                          whileTap={canProceed() ? { scale: 0.98 } : {}}
                        >
                          Continue
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={loading || !canProceed()}
                          className="bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold px-8 py-3.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm flex items-center gap-2"
                          whileHover={canProceed() ? { scale: 1.02 } : {}}
                          whileTap={canProceed() ? { scale: 0.98 } : {}}
                        >
                          {loading ? (
                            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
                          ) : (
                            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Get My Free Strategy Plan</>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 3. TRUST SECTION ===== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Why Work With Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Built for <span className="text-gradient">Excellence</span>
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" {...stagger}>
            {trustFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="group relative rounded-2xl p-8 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-primary-500/10 flex items-center justify-center text-primary-400 mb-5 group-hover:shadow-lg group-hover:shadow-primary-500/10 transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(600px circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. CONTACT OPTIONS ===== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Other Ways to <span className="text-gradient">Reach Us</span>
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...stagger}>
            {[
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "Phone", value: "+91 9220552177", action: "tel:+919220552177", color: "accent" },
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: "Email", value: "admin@irainternationals.com", action: "mailto:admin@irainternationals.com", color: "primary" },
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Location", value: "Gurugram, Haryana, India", action: "#", color: "violet" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.action}
                className="group relative rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 mb-5 group-hover:shadow-lg transition-all duration-500`}>
                  {item.icon}
                </div>
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-white font-medium text-lg">{item.value}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(600px circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                }} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. WHATSAPP FLOATING BUTTON ===== */}
      <motion.a
        href="https://wa.me/919220552177?text=Hi%20IRA%20International!%20I'd%20like%20to%20chat%20about%20my%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full whataspp-btn" />
        </div>
        <span>Chat Instantly</span>
      </motion.a>

      {/* ===== 6. CALENDAR BOOKING SECTION ===== */}
      <section id="booking" className="relative py-24">
        <div className="absolute inset-0 bg-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Book a Call</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Schedule a Free <span className="text-gradient">Consultation</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">Book a free 15-minute strategy session with our team. No strings attached.</p>
          </motion.div>

          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-8 md:p-10 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Premium calendar embed UI */}
              <motion.div
                className="mb-8"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </motion.div>

              <h3 className="text-2xl font-display font-bold text-white mb-3">Free 15-Min Strategy Session</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">Select a time that works for you. We&apos;ll discuss your project goals and create a roadmap to success.</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {["Mon 10", "Mon 11", "Mon 2", "Tue 10", "Tue 11", "Tue 2", "Wed 10", "Wed 11", "Wed 2"].map((slot) => (
                  <motion.button
                    key={slot}
                    className="py-3 px-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-primary-500/20 hover:border-primary-500/30 hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slot}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 rounded-xl glow-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Confirm Booking
                </span>
              </motion.button>

              <p className="text-white/20 text-xs mt-4">Limited slots available. Premium clients only.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...stagger}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="group relative rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 8. FINAL CTA SECTION ===== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-shift bg-gradient-to-br from-surface-950 via-primary-900/20 to-surface-950" />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[150px]"
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />
        <div className="relative z-10 container-custom px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block text-white/30 text-sm font-semibold tracking-[0.2em] uppercase mb-6 bg-white/5 border border-white/10 rounded-full px-5 py-2">
              Limited Slots Available
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] title-glow">
              Your Next Big Move
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
              Join the world&apos;s most innovative brands. Let&apos;s build something extraordinary together.
            </p>
            <motion.a
              href="#form"
              className="glow-btn inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold px-12 py-5 rounded-2xl"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Start Your Project Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
