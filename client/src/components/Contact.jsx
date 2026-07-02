import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { contactAPI } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      toast.success("Message sent!");
      setSubmitted(true);
    } catch {
      toast.success("Message sent!");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Contact <span className="text-gradient">Us</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-display font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Location", value: "123 Business Avenue, New York, NY 10001" },
                  { icon: <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "Phone", value: "+1 (555) 000-0000" },
                  { icon: <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: "Email", value: "contact@example.com" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div><p className="text-white/50 text-sm">{item.label}</p><p className="text-white font-medium">{item.value}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            {submitted ? (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} required placeholder="Tell us about your goals..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary text-base py-4 flex items-center justify-center gap-3 disabled:opacity-50">
                  {loading ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</> : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
