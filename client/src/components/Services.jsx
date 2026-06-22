import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  { title: "Study Abroad", description: "Complete guidance from university selection to relocation.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>, features: ["University Selection", "Application Process", "Visa Support", "Relocation Help"], color: "from-primary-500 to-primary-600", glow: "shadow-primary-500/20" },
  { title: "Immigration & Residency", description: "Permanent residency and relocation solutions.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, features: ["Permanent Residency", "Long-term Relocation", "Family Migration", "Settlement Support"], color: "from-accent-500 to-accent-600", glow: "shadow-accent-500/20" },
  { title: "Visa Services", description: "Expert visa assistance for all major destinations.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, features: ["Student Visa", "Tourist Visa", "Business Visa", "Work Visa"], color: "from-violet-500 to-violet-600", glow: "shadow-violet-500/20" },
  { title: "Business & Investment", description: "Launch your business globally with expert guidance.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, features: ["Business Setup Abroad", "Investment Migration", "Expansion Strategies", "Legal Compliance"], color: "from-amber-500 to-amber-600", glow: "shadow-amber-500/20" },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Our <span className="text-gradient">Services</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">Comprehensive solutions for your global aspirations.</p>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div key={i} variants={cardVariants}>
              <div className="glass-card rounded-3xl p-8 md:p-10 h-full group cursor-default relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg ${service.glow} group-hover:scale-110 transition-transform duration-300`}>{service.icon}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-white/50">
                        <svg className="w-4 h-4 text-accent-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link to="/apply" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
