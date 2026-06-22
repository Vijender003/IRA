import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import countriesData from "../data/countryData";

const questions = [
  {
    id: "budget",
    question: "What's your annual budget for tuition?",
    options: [
      { label: "Under $5,000", value: "low", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
      { label: "$5,000 – $15,000", value: "mid", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
      { label: "$15,000 – $30,000", value: "high", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
      { label: "$30,000+", value: "premium", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
    ],
  },
  {
    id: "preference",
    question: "What's your primary goal?",
    options: [
      { label: "Study Abroad", value: "study", icon: "M12 14l9-5-9-5-9 5 9 5z" },
      { label: "Work & Settle", value: "work", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" },
      { label: "PR / Citizenship", value: "pr", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" },
      { label: "Business Setup", value: "business", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    ],
  },
  {
    id: "region",
    question: "Do you have a preferred region?",
    options: [
      { label: "Europe", value: "europe", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2" },
      { label: "North America", value: "north-america", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2" },
      { label: "Asia / Oceania", value: "asia", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2" },
      { label: "No Preference", value: "any", icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    ],
  },
];

function parseBudget(fees) {
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

export default function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const navigate = useNavigate();

  const currentQuestion = questions[step];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Generate recommendation
      const budget = newAnswers.budget;
      const goal = newAnswers.preference;
      const region = newAnswers.region;

      let scored = countriesData.map((c) => {
        let score = 0;
        const cb = parseBudget(c.fees);
        if (cb === budget) score += 3;
        else if (
          (budget === "low" && (cb === "low" || cb === "mid")) ||
          (budget === "mid" && (cb === "mid" || cb === "low")) ||
          (budget === "high" && (cb === "high" || cb === "mid")) ||
          (budget === "premium" && (cb === "premium" || cb === "high"))
        ) score += 2;

        const visaNum = parseInt(c.visaRate) || 70;
        if (goal === "pr" && visaNum >= 85) score += 3;
        if (goal === "pr" && visaNum >= 75) score += 2;
        if (goal === "work" && visaNum >= 80) score += 3;
        if (goal === "study") score += 2;

        if (region !== "any" && c.region?.toLowerCase().includes(region)) score += 3;
        if (region === "any") score += 1;

        return { country: c, score };
      });

      scored.sort((a, b) => b.score - a.score);
      setRecommendation(scored.slice(0, 3));
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary-glow text-base px-8 py-4 inline-flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        AI Study Advisor
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
                <h3 className="text-xl font-display font-bold text-white">AI Study Advisor</h3>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!recommendation ? (
                <div>
                  {/* Progress */}
                  <div className="flex gap-1.5 mb-8">
                    {questions.map((q, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all ${
                          i <= step ? "bg-primary-500" : "bg-white/5"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-white/40 mb-2">
                        Question {step + 1} of {questions.length}
                      </p>
                      <h4 className="text-lg font-bold text-white mb-6">
                        {currentQuestion.question}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {currentQuestion.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleAnswer(opt.value)}
                            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                              <svg className="w-5 h-5 text-white/40 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={opt.icon} />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-white/70 group-hover:text-white text-center">
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Top Picks For You</h4>
                      <p className="text-xs text-white/40">Based on your preferences</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {recommendation.map((r, i) => (
                      <motion.div
                        key={r.country.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-2xl p-4 hover:bg-white/[0.07] transition-all cursor-pointer group"
                        onClick={() => {
                          setOpen(false);
                          navigate(`/country/${r.country.slug}`);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{r.country.flag}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white group-hover:text-primary-300 transition-colors">{r.country.name}</p>
                            <p className="text-[10px] text-white/30">{r.country.fees} · {r.country.visaRate} visa rate</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-primary-400">
                              Match
                            </span>
                            <div className="text-lg font-black text-primary-400">{r.score * 10}%</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={reset} className="flex-1 btn-secondary text-sm py-3">
                      Start Over
                    </button>
                    <button onClick={() => setOpen(false)} className="flex-1 btn-primary text-sm py-3">
                      Explore All
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
