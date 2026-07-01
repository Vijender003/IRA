import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let start, raf;
    const fn = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(fn);
    };
    raf = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(raf);
  }, [started, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const serviceIcons = {
  report: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  consultation: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  eligibility: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const features = [
  { title: "Expert Counselors", desc: "Certified consultants with 15+ years experience", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { title: "24/7 Support", desc: "Round-the-clock via chat, email, and phone", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "500+ Universities", desc: "Partnerships with top universities worldwide", icon: "M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" },
  { title: "98% Success Rate", desc: "Highest visa success rate in the industry", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { title: "Personalized Roadmap", desc: "Customized plan for your unique profile", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { title: "Scholarship Assistance", desc: "Help securing financial aid & scholarships", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Visa Guidance", desc: "Complete visa application support & coaching", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Career Support", desc: "Job placement & career guidance post-graduation", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const faqs = [
  { q: "Is this really FREE?", a: "Yes! All three services — the Personalized Report, Consultation Call, and Eligibility Check — are completely free with zero hidden charges or obligations." },
  { q: "How is your success rate 98%?", a: "Our personalized approach, expert counselors, and thorough preparation have helped 98% of our students secure visa approvals. We don't just fill forms — we build complete applications." },
  { q: "Will my data be safe?", a: "Absolutely. We use bank-grade encryption and never share your information without your explicit permission. Your privacy is our priority." },
  { q: "How long does the report take?", a: "The personalized report is generated instantly after you complete the quick 2-minute assessment. You'll receive it via email immediately." },
  { q: "Can I speak with a counselor if I have more questions?", a: "Absolutely! Book your free 30-minute consultation call to speak one-on-one with a certified education expert." },
  { q: "What if I'm not eligible?", a: "Even if you're not immediately eligible, our counselors will create a step-by-step roadmap to help you prepare, improve your profile, and reapply successfully." },
];

const testimonials = [
  { name: "Priya Sharma", uni: "University of Toronto", country: "Canada", quote: "The personalized report was incredibly accurate. It matched me with the perfect university and helped me secure a $20,000 scholarship!", rating: 5, achievement: "Secured $20,000 Scholarship", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Ahmed Hassan", uni: "Technical University of Munich", country: "Germany", quote: "The consultation call changed everything. My counselor identified opportunities I had never considered. I got into my dream program tuition-free!", rating: 5, achievement: "Admitted to TUM", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Sarah Chen", uni: "NUS", country: "Singapore", quote: "The eligibility check saved me months of research. It instantly showed me which universities were the best fit and my exact chances of admission.", rating: 5, achievement: "95% Visa Success", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { name: "James Adebayo", uni: "University of Melbourne", country: "Australia", quote: "I was overwhelmed by the options until I found this service. The step-by-step guidance made the entire process simple and stress-free.", rating: 5, achievement: "Visa Approved in 2 Weeks", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
];

function ServiceModal({ type, open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", program: "", education: "", budget: "", date: "", time: "", gpa: "", english: "", message: "" });

  useEffect(() => { if (open) setStep(1); }, [open]);

  const services = {
    report: { title: "Get Your Free Report", fields: ["name", "email", "phone", "country", "program", "education"], submitLabel: "Get My Free Report" },
    consultation: { title: "Book Free Consultation", fields: ["name", "email", "phone", "date", "time", "message"], submitLabel: "Book My Free Call" },
    eligibility: { title: "Check Your Eligibility", fields: ["name", "email", "phone", "country", "program", "education", "gpa", "english"], submitLabel: "Check Eligibility" },
  };
  const s = services[type] || services.report;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { toast.error("Please fill in all required fields"); return; }
    toast.success(type === "consultation" ? "Consultation booked! We'll confirm shortly." : "Request received! Check your email.");
    onClose();
  };
  const isValid = (f) => f === "message" || form[f]?.trim()?.length > 0;

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[20px] overflow-hidden"
        style={{ background: "rgba(10,15,44,0.95)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{s.title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {step === 1 ? (
            <div className="space-y-4">
              {s.fields.includes("name") && <input type="text" placeholder="Full Name *" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 transition-all" />}
              {s.fields.includes("email") && <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 transition-all" />}
              {s.fields.includes("phone") && <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 transition-all" />}
              {s.fields.includes("country") && <select value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"><option value="">Preferred Country</option><option>Canada</option><option>USA</option><option>UK</option><option>Australia</option><option>Germany</option><option>Singapore</option><option>Ireland</option><option>New Zealand</option></select>}
              {s.fields.includes("program") && <select value={form.program} onChange={(e) => setForm({...form, program: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"><option value="">Program of Interest</option><option>Engineering</option><option>Business</option><option>Computer Science</option><option>Medicine</option><option>Law</option><option>Arts</option><option>Other</option></select>}
              {s.fields.includes("education") && <select value={form.education} onChange={(e) => setForm({...form, education: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"><option value="">Current Education Level</option><option>High School</option><option>Bachelor's</option><option>Master's</option><option>PhD</option></select>}
              {s.fields.includes("gpa") && <input type="text" placeholder="Current GPA/Grades" value={form.gpa} onChange={(e) => setForm({...form, gpa: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 transition-all" />}
              {s.fields.includes("english") && <select value={form.english} onChange={(e) => setForm({...form, english: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"><option value="">English Proficiency</option><option>IELTS 7.0+</option><option>IELTS 6.5</option><option>IELTS 6.0</option><option>TOEFL 90+</option><option>TOEFL 80+</option><option>None Yet</option></select>}
              {s.fields.includes("date") && <input type="date" placeholder="Preferred Date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all" />}
              {s.fields.includes("time") && <select value={form.time} onChange={(e) => setForm({...form, time: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"><option value="">Preferred Time</option><option>9:00 AM - 11:00 AM</option><option>11:00 AM - 1:00 PM</option><option>1:00 PM - 3:00 PM</option><option>3:00 PM - 5:00 PM</option><option>5:00 PM - 7:00 PM</option></select>}
              {s.fields.includes("message") && <textarea placeholder="Questions or Notes (optional)" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 transition-all resize-none" />}
              <button onClick={handleSubmit} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                style={{ background: type === "consultation" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : type === "eligibility" ? "linear-gradient(135deg, #22c55e, #16a34a)" : "linear-gradient(135deg, #22d3ee, #6366f1)", boxShadow: "0 0 20px rgba(34,211,238,0.3)" }}>
                {s.submitLabel}
              </button>
              <p className="text-center text-white/30 text-[11px]">✓ No credit card required · ✓ Instant results · ✓ 10,000+ students served</p>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

function ServiceCard({ type, data, index, onActivate }) {
  const colors = { report: { from: "#22d3ee", to: "#6366f1", glow: "rgba(34,211,238,0.3)", border: "linear-gradient(135deg, #22d3ee, #6366f1)" }, consultation: { from: "#6366f1", to: "#4f46e5", glow: "rgba(99,102,241,0.3)", border: "linear-gradient(135deg, #6366f1, #8b5cf6)" }, eligibility: { from: "#22c55e", to: "#16a34a", glow: "rgba(34,197,94,0.3)", border: "linear-gradient(135deg, #22c55e, #15803d)" } };
  const c = colors[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group rounded-[20px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 30px ${c.glow}` }}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${c.from}20`, border: `1px solid ${c.from}40` }}>
            <span style={{ color: c.from }}>{serviceIcons[type]}</span>
          </div>
          {data.badge && <span className="text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-wider" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff" }}>{data.badge}</span>}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{data.title}</h3>
        <ul className="space-y-2.5 mb-6 flex-1">
          {data.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: c.from }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-white/60 text-sm">{h}</span>
            </li>
          ))}
        </ul>
        {data.preview && (
          <div className="mb-6 rounded-2xl p-4" style={{ background: `${c.from}08`, border: `1px solid ${c.from}20` }}>
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">{type === "report" ? "Sample Report Preview" : type === "consultation" ? "Available Slots" : "Sample Results"}</p>
            {data.preview.map((row, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-white/40 text-xs">{row.label}</span>
                <span className="text-white/80 text-xs font-semibold" style={{ color: row.color || c.from }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => onActivate(type)} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, boxShadow: `0 4px 20px ${c.glow}` }}>
          {data.cta}
        </button>
        <div className="flex items-center justify-center gap-3 mt-4 text-white/30 text-[11px] flex-wrap">
          {data.footer.map((f, i) => (<span key={i}>{f}{i < data.footer.length - 1 && <span className="ml-3 w-1 h-1 rounded-full bg-white/20 inline-block" />}</span>))}
        </div>
      </div>
    </motion.div>
  );
}

export default function LivePage() {
  const [activeModal, setActiveModal] = useState(null);

  const services = {
    report: {
      title: "Get Your FREE Personalized Report",
      badge: "Most Popular",
      highlights: [
        "Best country match based on your profile",
        "Visa success probability analysis with %",
        "Complete cost breakdown (tuition + living)",
        "Top 3 universities with application tips",
        "Career path recommendations",
        "Scholarship opportunities matched to you",
      ],
      preview: [
        { label: "Best Country", value: "Canada", color: "#22d3ee" },
        { label: "Visa Chances", value: "92%", color: "#22c55e" },
        { label: "Est. Cost (1 Year)", value: "$25,000 - $35,000", color: "#f59e0b" },
        { label: "Top University", value: "University of Toronto", color: "#8b5cf6" },
      ],
      cta: "Get My Free Report",
      footer: ["No credit card", "2 minutes", "Personalized", "Valid 30 days"],
    },
    consultation: {
      title: "Free Consultation Worth ₹1,999",
      badge: "Limited Time Offer",
      highlights: [
        "1-on-1 session with study abroad expert",
        "Evaluate your profile & career goals",
        "Suggest best destinations for you",
        "Create personalized roadmap",
        "Answer all your questions",
        "Absolutely FREE — no hidden charges",
      ],
      preview: [
        { label: "Slots Left This Month", value: "26", color: "#ef4444" },
        { label: "Duration", value: "30-45 minutes", color: "#8b5cf6" },
        { label: "Format", value: "Video or Phone Call", color: "#8b5cf6" },
        { label: "Students Booked Today", value: "5", color: "#22c55e" },
      ],
      cta: "Book Free Call Now",
      footer: ["98% satisfaction", "Save $3,000 avg.", "98% first choice"],
    },
    eligibility: {
      title: "Check Your Eligibility",
      badge: "Quick & Easy",
      highlights: [
        "Quick eligibility assessment in 2 minutes",
        "Check university admission requirements",
        "Identify scholarship opportunities",
        "Get visa probability score",
        "Receive personalized recommendations",
        "Detailed eligibility report with next steps",
      ],
      preview: [
        { label: "Eligibility Score", value: "85%", color: "#22c55e" },
        { label: "Matching Universities", value: "5", color: "#22d3ee" },
        { label: "Visa Probability", value: "High", color: "#22c55e" },
        { label: "Scholarship Matches", value: "3", color: "#f59e0b" },
      ],
      cta: "Check Your Eligibility",
      footer: ["10 questions", "Instant results", "Detailed report"],
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0f2c]">
      {/* Nav spacer */}
      <div className="h-20" />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <style>{`
          @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 25%{transform:translate(60px,-40px) scale(1.1)} 50%{transform:translate(-30px,20px) scale(0.95)} 75%{transform:translate(40px,30px) scale(1.05)} }
        `}</style>
        <div className="absolute inset-0 bg-[#0a0f2c]" />
        <div className="absolute top-5 left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.1] blur-[150px] animate-[floatOrb_18s_ease-in-out_infinite] bg-blue-500" />
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[120px] animate-[floatOrb_22s_ease-in-out_infinite_3s] bg-purple-500" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[180px] animate-[floatOrb_20s_ease-in-out_infinite_6s] bg-emerald-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f2c]/30 to-[#0a0f2c]" />

        <div className="relative z-10 container-custom px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/70 font-medium">Join 10,000+ Successful Students</span>
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.95] mb-5 max-w-4xl mx-auto">
              Your Future Abroad{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] via-[#22d3ee] to-[#6366f1] bg-clip-text text-transparent">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed">
              Unlock your study abroad journey with expert guidance & personalized plans
            </p>
            <p className="text-sm text-white/30">Choose your path below and get started in under 2 minutes</p>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST STATS ===== */}
      <section className="pb-12 md:pb-16 -mt-4">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { num: 10000, label: "Students Guided", suffix: "+", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { num: 98, label: "Visa Success Rate", suffix: "%", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { num: 500, label: "Partner Universities", suffix: "+", icon: "M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z" },
              { num: 15, label: "Years of Excellence", suffix: "+", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { num: 247, label: "Expert Support", suffix: "/7", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-[16px] p-3 md:p-4 text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-1.5">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} /></svg>
                </div>
                <p className="text-lg md:text-xl font-bold text-white font-display"><CountUp end={stat.num} suffix={stat.suffix} /></p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#0d1235] to-[#0a0f2c]" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12 md:mb-16">
            <p className="text-xs text-primary-300/80 tracking-[0.2em] uppercase mb-3 font-medium">Choose Your Path</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Choose Your Path to{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">Select the service that best fits your needs — all completely free</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard type="report" data={services.report} index={0} onActivate={setActiveModal} />
            <ServiceCard type="consultation" data={services.consultation} index={1} onActivate={setActiveModal} />
            <ServiceCard type="eligibility" data={services.eligibility} index={2} onActivate={setActiveModal} />
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="section-padding relative">
        <div className="container-custom px-4 md:px-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              How to{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Choose?</span>
            </h2>
            <p className="text-white/40">Compare our services to find your perfect fit</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-[20px] overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <th className="text-left p-4 md:p-5 text-white/40 font-medium text-xs uppercase tracking-wider">Feature</th>
                    <th className="p-4 md:p-5 text-center text-primary-300 font-semibold text-xs uppercase tracking-wider">Report</th>
                    <th className="p-4 md:p-5 text-center text-purple-300 font-semibold text-xs uppercase tracking-wider">Consultation</th>
                    <th className="p-4 md:p-5 text-center text-emerald-300 font-semibold text-xs uppercase tracking-wider">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Time Required", report: "2 min", consult: "30-45 min", elig: "2 min" },
                    { label: "Cost", report: "FREE", consult: "FREE", elig: "FREE", highlight: true },
                    { label: "Personalization", report: "High", consult: "Very High", elig: "Medium" },
                    { label: "Best For", report: "Quick Info", consult: "In-depth", elig: "Quick Check" },
                    { label: "Results Timeline", report: "Instant", consult: "Instant", elig: "Instant" },
                    { label: "Follow-up Support", report: "Email", consult: "Phone/Email", elig: "Email" },
                  ].map((row, i) => (
                    <tr key={row.label} style={{ borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <td className="p-4 md:p-5 text-white/60 text-xs md:text-sm">{row.label}</td>
                      <td className={`p-4 md:p-5 text-center text-xs md:text-sm ${row.highlight ? "text-primary-300 font-semibold" : "text-white/50"}`}>{row.report}</td>
                      <td className={`p-4 md:p-5 text-center text-xs md:text-sm ${row.highlight ? "text-purple-300 font-semibold" : "text-white/50"}`}>{row.consult}</td>
                      <td className={`p-4 md:p-5 text-center text-xs md:text-sm ${row.highlight ? "text-emerald-300 font-semibold" : "text-white/50"}`}>{row.elig}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#0d1235] to-[#0a0f2c]" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Your Journey in{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">3 Simple Steps</span>
            </h2>
            <p className="text-white/40">Simple, transparent, and quick</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
            {[
              { step: 1, title: "Choose Your Service", desc: "Pick the service that matches your needs", time: "1 minute", icon: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 12a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" },
              { step: 2, title: "Provide Your Details", desc: "Share basic information about your profile", time: "2 minutes", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
              { step: 3, title: "Get Your Results", desc: "Receive instant personalized recommendations", time: "2 minutes", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative text-center p-6 md:p-8 rounded-[20px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.15))", border: "1px solid rgba(34,211,238,0.2)" }}>
                  <span className="text-primary-300 text-lg font-bold">{step.step}</span>
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} /></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
                <span className="inline-block mt-3 text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/30 uppercase tracking-wider">~{step.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREMIUM FEATURES ===== */}
      <section className="section-padding relative">
        <div className="container-custom px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Us?</span>
            </h2>
            <p className="text-white/40">Industry-leading study abroad guidance</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group rounded-[16px] p-4 md:p-5 hover:scale-[1.03] transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#0d1235] to-[#0a0f2c]" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Success{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-white/40">Real students, real results</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-[16px] p-5 group hover:scale-[1.02] transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.uni}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-white/60 text-sm italic mb-3 leading-relaxed">"{t.quote}"</p>
                <span className="inline-block text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                  ✓ {t.achievement}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding relative">
        <div className="container-custom px-4 md:px-8 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#0d1235] to-[#0a0f2c]" />
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[120px] bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="relative z-10 container-custom px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Get{" "}
              <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Started?</span>
            </h2>
            <p className="text-white/50 mb-3">Your dream university is waiting — take the first step today</p>
            <p className="text-sm text-primary-300/60 mb-8">⏱️ Limited slots available this month</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => setActiveModal("report")} className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #22d3ee, #6366f1)", boxShadow: "0 0 30px rgba(34,211,238,0.3)" }}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Get My Free Report Now
                </span>
              </button>
              <button onClick={() => setActiveModal("consultation")} className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Book My Free Consultation
                </span>
              </button>
              <button onClick={() => setActiveModal("eligibility")} className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Check My Eligibility
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 text-white/30 text-xs">
              <span>✓ No credit card required</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>✓ Results in 2 minutes</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>✓ 10,000+ students served</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MODALS ===== */}
      <ServiceModal type="report" open={activeModal === "report"} onClose={() => setActiveModal(null)} />
      <ServiceModal type="consultation" open={activeModal === "consultation"} onClose={() => setActiveModal(null)} />
      <ServiceModal type="eligibility" open={activeModal === "eligibility"} onClose={() => setActiveModal(null)} />
    </div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-[16px] overflow-hidden cursor-pointer group"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-4 md:p-5">
        <h3 className="text-white/80 font-medium text-sm md:text-base pr-4 group-hover:text-white transition-colors">{faq.q}</h3>
        <motion.svg animate={{ rotate: open ? 180 : 0 }} className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </div>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="overflow-hidden">
        <p className="px-4 md:px-5 pb-4 md:pb-5 text-white/40 text-sm leading-relaxed">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}
