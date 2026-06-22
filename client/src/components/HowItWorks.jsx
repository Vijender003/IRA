import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Free Consultation",
    description: "Tell us your goals and we'll map out your personalized study abroad or immigration plan.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    color: "from-primary-500 to-blue-600",
  },
  {
    step: 2,
    title: "Profile Evaluation",
    description: "We assess your academic profile, work experience, and preferences to find your best options.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    color: "from-accent-500 to-emerald-600",
  },
  {
    step: 3,
    title: "Application & Visa",
    description: "We handle your university applications, documentation, and visa process from start to finish.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "from-violet-500 to-purple-600",
  },
  {
    step: 4,
    title: "Fly Abroad",
    description: "From pre-departure briefing to airport pickup and accommodation, we ensure a smooth transition.",
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    color: "from-amber-500 to-orange-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Your Journey in <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            From first conversation to landing abroad — we're with you every step of the way.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {/* Vertical connector line for mobile */}
          <div className="absolute top-0 left-6 bottom-0 w-px bg-gradient-to-b from-primary-500/30 via-accent-500/20 to-transparent md:hidden" />

          {steps.map((step, i) => (
            <motion.div key={i} variants={cardVariants} className="relative">
              {/* Horizontal connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[40%] h-px bg-gradient-to-r from-primary-500/30 to-transparent" />
              )}

              <div className="glass-card rounded-3xl p-8 h-full group relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${step.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                      </svg>
                    </div>
                    <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                      0{step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
