import { motion } from "framer-motion";

const partners = [
  "University of Oxford",
  "MIT",
  "Stanford",
  "University of Toronto",
  "National University of Singapore",
  "Technical University of Munich",
  "University of Melbourne",
  "Trinity College Dublin",
];

export default function TrustLogos() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/20 uppercase tracking-[0.2em] mb-10"
        >
          Partnered with Top Global Universities
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all"
            >
              <span className="text-xs text-white/30 font-medium tracking-wide text-center leading-relaxed">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
