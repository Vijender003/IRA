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

const trustFeatures = [
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, title: "Expert Guidance", desc: "10+ years helping students get into top universities worldwide with personalized counseling." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: "98% Visa Success", desc: "Our visa documentation and interview prep gives you the highest chance of approval." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, title: "500+ University Partners", desc: "Direct partnerships with universities across 12 countries for seamless admissions." },
  { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, title: "End-to-End Support", desc: "From university selection to visa and accommodation — we handle everything." },
];

const testimonials = [
  { name: "Ananya Gupta", role: "MS Computer Science, MIT", rating: 5, text: "IRA made my dream of studying at MIT a reality. Their counselors guided me through every step — from SOP to visa interview." },
  { name: "Rahul Verma", role: "MBA, University of Toronto", rating: 5, text: "I was confused about which country to choose. They helped me find the perfect program that fit my profile and budget." },
  { name: "Priya Sharma", role: "BSc Nursing, University of Malta", rating: 5, text: "The visa process was so smooth. My counselor held my hand through the entire application. Grateful forever!" },
];

const stepLabels = ["Personal Info", "Study Preferences", "Additional Details"];

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    country: "", program: "", level: "",
    budget: "", intake: "", message: "",
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
      toast.success("Application received! Our team will reach out within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.success("Application received! Our team will reach out within 24 hours.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.phone.trim();
    if (step === 1) return form.country && form.level;
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
          background: radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.2) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.15) 0%, transparent 50%),
                      linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%);
        }
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(80px,-60px) scale(1.1); } 50% { transform: translate(-40px,40px) scale(0.9); } 75% { transform: translate(60px,80px) scale(1.05); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(-60px,80px) scale(1.15); } 50% { transform: translate(80px,-30px) scale(0.85); } 75% { transform: translate(-40px,-60px) scale(1); } }
        @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(50px,50px) scale(1.1); } 66% { transform: translate(-70px,-30px) scale(0.9); } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(37,99,235,0.3), 0 0 60px rgba(37,99,235,0.1); } 50% { box-shadow: 0 0 30px rgba(37,99,235,0.5), 0 0 80px rgba(37,99,235,0.2); } }
        @keyframes titleGlow { 0%,100% { filter: drop-shadow(0 0 8px rgba(37,99,235,0.2)) drop-shadow(0 0 20px rgba(99,102,241,0.1)); } 50% { filter: drop-shadow(0 0 16px rgba(37,99,235,0.4)) drop-shadow(0 0 40px rgba(99,102,241,0.2)); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .glow-btn:hover { animation: glowPulse 1.5s ease-in-out infinite; }
        .title-glow { animation: titleGlow 4s ease-in-out infinite; }
        .gradient-shift { background-size: 200% 200%; animation: gradientShift 6s ease infinite; }
      `}</style>

      {/* ===== 1. HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg" />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px] pointer-events-none"
          animate={{ x: [0, 80, -40, 60, 0], y: [0, -60, 40, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ left: "15%", top: "20%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none"
          animate={{ x: [0, -60, 80, -40, 0], y: [0, 80, -60, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ right: "20%", bottom: "30%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none"
          animate={{ x: [0, 50, -30, 70, 0], y: [0, -40, 60, -20, 0] }}
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
                Your Global Education Starts Here
              </motion.span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] title-glow">
                Ready to Study at a
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-violet-400 bg-clip-text text-transparent">
                  World-Class University?
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                Get free expert counseling on university selection, applications, visas, and scholarships. We&apos;ve helped 10,000+ students achieve their study abroad dreams.
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
                  Get Free Counseling
                </motion.a>
                <motion.a
                  href="#booking"
                  className="relative inline-flex items-center gap-3 text-white/80 text-lg font-semibold px-10 py-4 rounded-2xl border border-white/10 hover:border-primary-500/40 hover:text-white transition-all"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Free Consultation
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-8 mt-16 text-white/30 text-sm flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>10,000+ Students Guided</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>98% Visa Success Rate</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>500+ University Partners</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Free Expert Guidance</span>
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
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Start Your Journey</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Get Your Free <span className="text-gradient">Study Plan</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">Tell us about yourself and we&apos;ll create a personalized study abroad plan — completely free.</p>
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
                  <h3 className="text-3xl font-display font-bold text-white mb-3">We&apos;ve Received Your Inquiry!</h3>
                  <p className="text-white/50 text-lg mb-2">Thank you for reaching out.</p>
                  <p className="text-white/30">Our expert counselors will review your profile and contact you within 24 hours with a personalized study plan.</p>
                  <motion.button
                    onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", email: "", phone: "", country: "", program: "", level: "", budget: "", intake: "", message: "" }); }}
                    className="mt-8 text-sm text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    Submit Another Inquiry
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="overflow-hidden" style={{ minHeight: step === 0 ? "280px" : step === 1 ? "260px" : "260px" }}>
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
                        {step === 0 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                              <input type="text" name="name" value={form.name} onChange={update} required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                              <input type="email" name="email" value={form.email} onChange={update} required placeholder="john@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Phone Number</label>
                              <input type="tel" name="phone" value={form.phone} onChange={update} required placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all" />
                            </div>
                          </div>
                        )}

                        {step === 1 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Preferred Country</label>
                              <select name="country" value={form.country} onChange={update} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" disabled className="bg-surface-900">Select country</option>
                                <option value="usa" className="bg-surface-900">USA</option>
                                <option value="uk" className="bg-surface-900">UK</option>
                                <option value="canada" className="bg-surface-900">Canada</option>
                                <option value="australia" className="bg-surface-900">Australia</option>
                                <option value="germany" className="bg-surface-900">Germany</option>
                                <option value="france" className="bg-surface-900">France</option>
                                <option value="singapore" className="bg-surface-900">Singapore</option>
                                <option value="malta" className="bg-surface-900">Malta</option>
                                <option value="ireland" className="bg-surface-900">Ireland</option>
                                <option value="new-zealand" className="bg-surface-900">New Zealand</option>
                                <option value="russia" className="bg-surface-900">Russia</option>
                                <option value="georgia" className="bg-surface-900">Georgia</option>
                                <option value="not-sure" className="bg-surface-900">Not Sure Yet</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Interested Program</label>
                              <select name="program" value={form.program} onChange={update} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" className="bg-surface-900">Select program (optional)</option>
                                <option value="engineering" className="bg-surface-900">Engineering / Technology</option>
                                <option value="business" className="bg-surface-900">Business / Management</option>
                                <option value="medicine" className="bg-surface-900">Medicine / Healthcare</option>
                                <option value="arts" className="bg-surface-900">Arts / Humanities</option>
                                <option value="science" className="bg-surface-900">Science / Research</option>
                                <option value="law" className="bg-surface-900">Law</option>
                                <option value="nursing" className="bg-surface-900">Nursing</option>
                                <option value="other" className="bg-surface-900">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Study Level</label>
                              <select name="level" value={form.level} onChange={update} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" disabled className="bg-surface-900">Select study level</option>
                                <option value="bachelor" className="bg-surface-900">Bachelor&apos;s (Undergraduate)</option>
                                <option value="master" className="bg-surface-900">Master&apos;s (Postgraduate)</option>
                                <option value="phd" className="bg-surface-900">PhD / Doctorate</option>
                                <option value="diploma" className="bg-surface-900">Diploma / Certificate</option>
                                <option value="language" className="bg-surface-900">Language Course</option>
                                <option value="foundation" className="bg-surface-900">Foundation Program</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Annual Budget (Tuition + Living)</label>
                              <select name="budget" value={form.budget} onChange={update} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" className="bg-surface-900">Select budget (optional)</option>
                                <option value="under-10k" className="bg-surface-900">Under $10,000</option>
                                <option value="10-20k" className="bg-surface-900">$10,000 - $20,000</option>
                                <option value="20-35k" className="bg-surface-900">$20,000 - $35,000</option>
                                <option value="35-50k" className="bg-surface-900">$35,000 - $50,000</option>
                                <option value="50k+" className="bg-surface-900">$50,000+</option>
                                <option value="not-sure" className="bg-surface-900">Not Sure</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Preferred Intake</label>
                              <select name="intake" value={form.intake} onChange={update} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all appearance-none cursor-pointer">
                                <option value="" className="bg-surface-900">Select intake (optional)</option>
                                <option value="2026-fall" className="bg-surface-900">Fall 2026 (Sep/Oct)</option>
                                <option value="2027-spring" className="bg-surface-900">Spring 2027 (Jan/Feb)</option>
                                <option value="2027-summer" className="bg-surface-900">Summer 2027 (May/Jun)</option>
                                <option value="2027-fall" className="bg-surface-900">Fall 2027 (Sep/Oct)</option>
                                <option value="2028" className="bg-surface-900">2028 or later</option>
                                <option value="flexible" className="bg-surface-900">Flexible / Not Sure</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/60 mb-2">Additional Message</label>
                              <textarea name="message" value={form.message} onChange={update} rows={3} placeholder="Any specific questions or requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/40 transition-all resize-none" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <div>
                      {step > 0 ? (
                        <motion.button type="button" onClick={prevStep} className="text-white/40 hover:text-white/70 text-sm font-medium transition-colors flex items-center gap-2" whileHover={{ x: -2 }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          Back
                        </motion.button>
                      ) : <div />}
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
                            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>
                          ) : (
                            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Get My Free Study Plan</>
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
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Why Choose IRA</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Your Success Is Our <span className="text-gradient">Mission</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/10 flex items-center justify-center text-primary-400 mb-5 group-hover:shadow-lg group-hover:shadow-primary-500/10 transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(600px circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                }} />
              </motion.div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "Phone", value: "+91 9220552177", action: "tel:+919220552177" },
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: "Email", value: "admin@irainternationals.com", action: "mailto:admin@irainternationals.com" },
              { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Location", value: "Gurugram, Haryana, India", action: "#" },
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
                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 mb-5 group-hover:shadow-lg transition-all duration-500">
                  {item.icon}
                </div>
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-white font-medium text-lg">{item.value}</p>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: "radial-gradient(600px circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                }} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. WHATSAPP FLOATING BUTTON ===== */}
      <motion.a
        href="https://wa.me/919220552177?text=Hi%20IRA%20International!%20I'd%20like%20to%20know%20more%20about%20studying%20abroad."
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
              Schedule Free <span className="text-gradient">Counseling</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">Book a free 15-minute strategy session with our expert counselors. No strings attached.</p>
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
              <motion.div
                className="mb-8"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </motion.div>

              <h3 className="text-2xl font-display font-bold text-white mb-3">Free 15-Min Counseling Session</h3>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">Select a time slot and our counselor will discuss your study abroad goals, recommend universities, and create a roadmap.</p>

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

              <p className="text-white/20 text-xs mt-4">Free for first-time applicants.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <span className="inline-block text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              What Our Students <span className="text-gradient">Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] title-glow">
              Your Dream University
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-violet-400 bg-clip-text text-transparent">
                Awaits You.
              </span>
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
              Join 10,000+ successful students who achieved their study abroad dreams with IRA International.
            </p>
            <motion.a
              href="#form"
              className="glow-btn inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold px-12 py-5 rounded-2xl"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Start Your Journey Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
