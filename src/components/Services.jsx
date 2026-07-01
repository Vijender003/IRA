import { motion } from "framer-motion";

const services = [
  { title: "Study Abroad", icon: "🎓" },
  { title: "Work Visa", icon: "💼" },
  { title: "PR", icon: "🏡" },
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-8">

        {services.map((s, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-2xl shadow"
            whileHover={{ y: -10 }}
          >
            <div className="text-3xl">{s.icon}</div>
            <h3 className="text-xl font-bold mt-3">{s.title}</h3>
          </motion.div>
        ))}

      </div>
    </section>
  );
}