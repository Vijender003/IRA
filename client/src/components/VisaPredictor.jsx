import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import countriesData from "../data/countryData";

export default function VisaPredictor() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [ielts, setIelts] = useState(6);
  const [hasFunds, setHasFunds] = useState(true);

  const country = countriesData.find((c) => c.slug === selectedCountry);
  const visaRate = country ? parseInt(country.visaRate) || 75 : 75;

  const ieltsScore = ielts;
  const requiredIelts = country ? parseFloat(country.englishRequirement?.match(/[\d.]+/)?.[0] || "6.0") : 6.0;
  const ieltsOk = ieltsScore >= requiredIelts;
  const fundsOk = hasFunds;

  let score = visaRate * 0.5;
  score += ieltsOk ? 20 : 0;
  score += fundsOk ? 20 : 0;
  score += visaRate >= 80 ? 10 : 0;

  const maxScore = 70 + 20 + 10;
  const percentage = Math.min(Math.round((score / maxScore) * 100), 99);

  const getLevel = () => {
    if (percentage >= 85) return { label: "High Chance", color: "text-accent-400", bg: "bg-accent-500/10", border: "border-accent-500/20" };
    if (percentage >= 65) return { label: "Good Chance", color: "text-primary-400", bg: "bg-primary-500/10", border: "border-primary-500/20" };
    if (percentage >= 45) return { label: "Moderate", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "Needs Work", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  const level = getLevel();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-secondary text-sm px-5 py-3 inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Visa Predictor
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
                <h3 className="text-xl font-display font-bold text-white">Visa Success Predictor</h3>
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
                  <label className="block text-sm text-white/60 mb-2">
                    IELTS Score: <span className="text-primary-400 font-bold">{ielts}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    step="0.5"
                    value={ielts}
                    onChange={(e) => setIelts(parseFloat(e.target.value))}
                    className="w-full accent-primary-500"
                  />
                  <div className="flex justify-between text-[10px] text-white/20 mt-1">
                    <span>0</span><span>9</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5">
                  <div>
                    <span className="text-sm text-white/60">Sufficient funds available</span>
                    {country && (
                      <p className="text-[10px] text-white/20">Living cost: {country.livingCost}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setHasFunds(!hasFunds)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      hasFunds ? "bg-primary-500" : "bg-white/10"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      hasFunds ? "left-5" : "left-1"
                    }`} />
                  </button>
                </div>

                {selectedCountry && (
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    {/* Score circle */}
                    <div className="flex flex-col items-center py-4">
                      <div className="relative w-28 h-28 mb-4">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                          <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke={percentage >= 85 ? "#22c55e" : percentage >= 65 ? "#22d3ee" : percentage >= 45 ? "#f59e0b" : "#ef4444"}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 52}`}
                            strokeDashoffset={`${2 * Math.PI * 52 * (1 - percentage / 100)}`}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-3xl font-black text-white">{percentage}%</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${level.color} ${level.bg} ${level.border} px-4 py-1.5 rounded-full`}>
                        {level.label}
                      </span>
                    </div>

                    {/* Factors */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${visaRate >= 80 ? "bg-accent-400" : "bg-amber-400"}`} />
                        <span className="text-white/50">Country visa rate: <span className="text-white">{country.visaRate}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${ieltsOk ? "bg-accent-400" : "bg-red-400"}`} />
                        <span className="text-white/50">IELTS: <span className={`${ieltsOk ? "text-accent-400" : "text-red-400"}`}>{ielts} (need {requiredIelts})</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${fundsOk ? "bg-accent-400" : "bg-red-400"}`} />
                        <span className="text-white/50">Funds: <span className={fundsOk ? "text-accent-400" : "text-red-400"}>{fundsOk ? "Sufficient" : "Not shown"}</span></span>
                      </div>
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
