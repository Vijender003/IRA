import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Free Consultation",
    description: "Tell us about your goals, budget, and preferences. We listen carefully to understand your unique aspirations and map out possibilities.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    color: "from-primary-500 to-blue-600",
  },
  {
    step: 2,
    title: "Profile Evaluation",
    description: "We assess your academic background, work experience, and preferences to find the best-fit universities and courses for you.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    color: "from-coral to-emerald-600",
  },
  {
    step: 3,
    title: "University Selection",
    description: "We shortlist the best universities and courses that match your profile, budget, and long-term career aspirations.",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z",
    color: "from-violet-500 to-purple-600",
  },
  {
    step: 4,
    title: "Application & Visa",
    description: "End-to-end handling of applications, SOP writing, documentation, and visa processing — we manage everything for you.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "from-amber-500 to-orange-600",
  },
  {
    step: 5,
    title: "Fly Abroad ✈️",
    description: "From pre-departure briefing to airport pickup and accommodation, we ensure a smooth transition to your new home abroad.",
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    color: "from-rose-500 to-pink-600",
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
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-4">
            The Process
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Your Journey — <span className="text-gradient">Simplified</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            From profile evaluation to flying abroad — we handle everything so you don't have to.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {/* Vertical connector line for mobile */}
          <div className="absolute top-0 left-6 bottom-0 w-px bg-gradient-to-b from-primary-500/30 via-coral/20 to-transparent lg:hidden" />

          {steps.map((step, i) => (
            <motion.div key={i} variants={cardVariants} className="relative">
              {/* Horizontal connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[65%] w-[35%] h-px bg-gradient-to-r from-primary-500/30 to-transparent" />
              )}

              <div className="glass-card rounded-3xl p-6 lg:p-8 h-full group relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${step.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                      </svg>
                    </div>
                    <span className="text-4xl lg:text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                      0{step.step}
                    </span>
                  </div>

                  <h3 className="text-lg lg:text-xl font-display font-bold text-white mb-3">{step.title}</h3>
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
