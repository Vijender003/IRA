import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import servicesData, { whyChooseReasons, processSteps, stats } from "../data/servicesData";
import ServiceCard from "../components/ServiceCard";

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
}

const icons = {
  study: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  immigration: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  visa: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  business: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const whyIcons = {
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  expert: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  partners: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

function StatCard({ stat, index }) {
  const [count, ref] = useCountUp(stat.value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="glass-card rounded-2xl p-8 text-center"
    >
      <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">
        {count}{stat.suffix}
      </div>
      <p className="text-white/40 text-sm font-medium">{stat.label}</p>
    </motion.div>
  );
}

function WhyCard({ reason, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-2xl p-8 text-center hover:scale-[1.02] transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5 text-primary-400">
        {whyIcons[reason.icon]}
      </div>
      <h3 className="text-lg font-display font-bold text-white mb-2">{reason.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{reason.description}</p>
    </motion.div>
  );
}

function ServiceDetail({ service, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 mt-6">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>
                  {icons[service.icon]}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">{service.title}</h3>
                  <p className="text-white/40 text-sm">{service.shortDesc}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-white/50 leading-relaxed mb-10">{service.description}</p>

            {/* STEPS */}
            <div className="mb-10">
              <h4 className="text-lg font-display font-bold text-white mb-6">Our Process</h4>
              <div className="space-y-4">
                {service.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {i + 1}
                      </div>
                      {i < service.steps.length - 1 && <div className="w-px h-full bg-white/5 mt-1" />}
                    </div>
                    <div className="pb-6">
                      <h5 className="text-white font-semibold mb-1">{step.title}</h5>
                      <p className="text-white/40 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BENEFITS */}
            <div className="mb-8">
              <h4 className="text-lg font-display font-bold text-white mb-6">Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/60 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/apply" className="btn-primary inline-flex items-center gap-2">
              Get Started with {service.title}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  const toggleService = useCallback((id) => {
    setActiveService((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/30 via-surface-950 to-surface-950" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]" />
        <div className="relative z-10 container-custom px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-6">
              What We Offer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight mb-6">
              Your Global Journey <br />
              <span className="text-gradient">Starts Here</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              End-to-end support for study, career, and immigration abroad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary text-base px-10 py-5 inline-flex items-center gap-2"
              >
                Explore Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <Link to="/apply" className="btn-secondary text-base px-10 py-5">
                Get Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 md:px-8">
        {/* STATS */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services-grid" className="mb-20 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Our Core Services
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Everything You Need Under One Roof
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Comprehensive solutions designed to make your global journey seamless and stress-free.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} onClick={toggleService} />
            ))}
          </div>

          {/* DETAILED SERVICE SECTIONS */}
          {servicesData.map((service) => (
            <ServiceDetail
              key={service.id}
              service={service}
              isOpen={activeService === service.id}
              onClose={() => setActiveService(null)}
            />
          ))}
        </section>

        {/* PROCESS FLOW */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Your Journey in <span className="text-gradient">4 Simple Steps</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              From consultation to visa approval, we guide you at every step.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/40 via-accent-500/40 to-primary-500/40 hidden md:block" />
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative md:text-center"
                >
                  <div className="flex md:flex-col items-center md:items-center gap-5 md:gap-4">
                    <div className="relative z-10">
                      <div className="w-[78px] h-[78px] rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-display font-bold shadow-xl shadow-primary-500/20">
                        {step.number}
                      </div>
                    </div>
                    <div className="md:mt-4">
                      <h3 className="text-lg font-display font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Trusted by Thousands <span className="text-gradient">Worldwide</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              We combine expertise, global partnerships, and personalized support to deliver results.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseReasons.map((reason, i) => (
              <WhyCard key={reason.title} reason={reason} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                Ready to Start Your <span className="text-gradient">Global Journey?</span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
                Take the first step toward your future abroad. Our experts are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply" className="btn-primary text-base px-10 py-5">
                  Apply Now
                </Link>
                <Link to="/contact" className="btn-secondary text-base px-10 py-5">
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              We&apos;re Here to <span className="text-gradient">Help</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Reach out to our team for any questions or support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Phone",
                value: "+1 (555) 000-0000",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: "contact@example.com",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Location",
                value: "123 Global Street, New York, NY 10001",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4 text-primary-400">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-white/40 mb-1">{item.label}</h3>
                <p className="text-white font-semibold">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
