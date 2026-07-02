import { motion } from "framer-motion";

const testimonials = [
  { name: "Priya Sharma", role: "Studying in Singapore", text: "THE PARASHARS made my dream of studying in NUS a reality. Their step-by-step guidance was incredible.", rating: 5, destination: "Singapore" },
  { name: "Arjun Mehta", role: "Medical Student in Russia", text: "From university selection to accommodation, everything was handled professionally. I'm now pursuing MBBS in Moscow.", rating: 5, destination: "Russia" },
  { name: "Sneha & Rahul Patel", role: "Family Immigration to Malta", text: "We wanted to relocate as a family. THE PARASHARS made the entire process smooth and stress-free.", rating: 5, destination: "Malta" },
  { name: "Vikram Singh", role: "Business Setup in Singapore", text: "Their business migration service helped me set up my tech startup. The investment guidance was invaluable.", rating: 5, destination: "Singapore" },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-4">Success Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">What Our <span className="text-gradient">Students Say</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="glass-card rounded-2xl p-8 group">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-coral flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
                <span className="text-xs bg-coral/10 border border-coral/20 text-coral px-3 py-1 rounded-full">{t.destination}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
