import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import countriesData from "../data/countryData";

const TUITION_RANGES = {
  low: { min: 2000, max: 5000, label: "Under $5,000" },
  mid: { min: 5000, max: 15000, label: "$5,000 – $15,000" },
  high: { min: 15000, max: 30000, label: "$15,000 – $30,000" },
  premium: { min: 30000, max: 60000, label: "$30,000+" },
};

function parseBudgetRange(fees) {
  if (!fees) return "mid";
  const nums = fees.match(/\d[\d,]*/g);
  if (!nums) return "mid";
  const vals = nums.map((n) => parseInt(n.replace(/,/g, "")));
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  if (avg < 5000) return "low";
  if (avg < 15000) return "mid";
  if (avg < 30000) return "high";
  return "premium";
}

export default function CostCalculator() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [duration, setDuration] = useState(1);
  const [includeLiving, setIncludeLiving] = useState(true);

  const country = countriesData.find((c) => c.slug === selectedCountry);
  const countryBudget = country ? parseBudgetRange(country.fees) : "mid";
  const range = TUITION_RANGES[countryBudget];
  const avgTuition = range ? (range.min + range.max) / 2 : 10000;

  const livingPerMonth = country
    ? parseInt(country.livingCost?.match(/\d[\d,]*/)?.[0]?.replace(/,/g, "") || "1000")
    : 1000;
  const totalTuition = avgTuition * duration;
  const totalLiving = includeLiving ? livingPerMonth * 12 * duration : 0;
  const grandTotal = totalTuition + totalLiving;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-secondary text-sm px-5 py-3 inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Cost Calculator
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-strong rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold text-white">Cost Calculator</h3>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Select Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-surface-900">Choose a country...</option>
                    {countriesData.map((c) => (
                      <option key={c.slug} value={c.slug} className="bg-surface-900">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Duration (years)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((y) => (
                      <button
                        key={y}
                        onClick={() => setDuration(y)}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                          duration === y
                            ? "bg-primary-500 text-white"
                            : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {y} {y === 1 ? "yr" : "yrs"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5">
                  <span className="text-sm text-white/60">Include living costs</span>
                  <button
                    onClick={() => setIncludeLiving(!includeLiving)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      includeLiving ? "bg-primary-500" : "bg-white/10"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      includeLiving ? "left-5" : "left-1"
                    }`} />
                  </button>
                </div>

                {selectedCountry && (
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Tuition fees (avg)</span>
                      <span className="text-white font-medium">${avgTuition.toLocaleString()}/year</span>
                    </div>
                    {includeLiving && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Living costs</span>
                        <span className="text-white font-medium">${(livingPerMonth * 12).toLocaleString()}/year</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg pt-3 border-t border-white/5">
                      <span className="text-white font-bold">Total ({duration} {duration === 1 ? "year" : "years"})</span>
                      <span className="text-primary-400 font-bold">${grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
