import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import countriesData from "../data/countryData";

const defaultCountries = [
  { name: "Georgia", slug: "georgia", avgCost: "$3K–$8K/yr", costOfLiving: "$400–$700/mo", visaSuccess: "98%", jobs: "Medium", color: "from-primary-500 to-primary-600" },
  { name: "Singapore", slug: "singapore", avgCost: "$15K–$35K/yr", costOfLiving: "$1.2K–$2K/mo", visaSuccess: "85%", jobs: "High", color: "from-coral to-coral-dark" },
  { name: "Russia", slug: "russia", avgCost: "$2K–$7K/yr", costOfLiving: "$500–$900/mo", visaSuccess: "90%", jobs: "Medium", color: "from-violet-500 to-violet-600" },
  { name: "Malta", slug: "malta", avgCost: "$8K–$18K/yr", costOfLiving: "$800–$1.4K/mo", visaSuccess: "92%", jobs: "Growing", color: "from-amber-500 to-amber-600" },
];

const columns = [
  { key: "name", label: "Country", featured: true },
  { key: "avgCost", label: "Tuition Fees" },
  { key: "costOfLiving", label: "Living Cost" },
  { key: "visaSuccess", label: "Visa Success" },
  { key: "jobs", label: "Job Market" },
];

export default function CompareTable({ countries = defaultCountries }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-[700px] px-4 md:px-0">
          <div className="grid grid-cols-5 gap-3 mb-3 px-2">
            <div className="col-span-1" />
            {columns.slice(1).map((col) => (
              <div key={col.key} className="text-center">
                <span className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {countries.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group"
              >
                <Link
                  to={`/country/${c.slug}`}
                  className="grid grid-cols-5 gap-3 items-center px-4 py-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {c.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-white">{c.name}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-white/60">{c.avgCost}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-white/60">{c.costOfLiving}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-coral">{c.visaSuccess}</span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <span className="text-sm text-white/60">{c.jobs}</span>
                    <svg className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
