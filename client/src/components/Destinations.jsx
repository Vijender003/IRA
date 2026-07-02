import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import countriesData from "../data/countryData";
import { countryImages } from "../data/countryImages";
import TiltCard from "./TiltCard";

const benefitLines = {
  canada: { line: "PR Friendly + High Salary", icon: "🍁" },
  australia: { line: "Work + Study Balance", icon: "🏄" },
  uk: { line: "Fast Degrees (1 Year Masters)", icon: "🎓" },
  germany: { line: "Low Cost / High Value", icon: "💰" },
  usa: { line: "Top Universities Worldwide", icon: "🏆" },
  singapore: { line: "Asia's Education Hub", icon: "🌏" },
  france: { line: "Affordable + Cultural", icon: "🥐" },
  ireland: { line: "Tech Hub of Europe", icon: "💻" },
  georgia: { line: "Safe & Budget-Friendly", icon: "🛡️" },
  russia: { line: "Top Medical Education", icon: "🩺" },
  malta: { line: "EU Gateway + English", icon: "🌴" },
  "new-zealand": { line: "Nature + Quality Education", icon: "🏔️" },
  newzealand: { line: "Nature + Quality Education", icon: "🏔️" },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const getVisaRating = (rate) => {
  const num = parseInt(rate);
  if (!num) return { label: "Good", color: "text-coral", bars: 3 };
  if (num >= 90) return { label: "Excellent", color: "text-coral", bars: 5 };
  if (num >= 80) return { label: "Great", color: "text-primary-500", bars: 4 };
  if (num >= 70) return { label: "Good", color: "text-amber-400", bars: 3 };
  return { label: "Fair", color: "text-orange-400", bars: 2 };
};

export default function Destinations() {
  return (
    <section id="destinations" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-4">
            Popular Destinations
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Where Will You <span className="text-gradient">Go?</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Explore top destinations chosen by thousands of successful students.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {countriesData.slice(0, 8).map((country, i) => {
            const images = countryImages[country.slug] || countryImages[country.slug.replace(/-/g, "")] || country.images || [];
            const heroImage = images[0] || "";
            const visaInfo = getVisaRating(country.visaRate);
            const benefit = benefitLines[country.slug] || { line: "Top Study Destination", icon: "🌍" };

            return (
              <motion.div key={country.slug} variants={cardVariants}>
                <TiltCard intensity={4} className="h-full">
                  <Link
                    to={`/country/${country.slug}`}
                    className="block group h-full"
                >
                  <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <div
                        className="absolute inset-0 bg-surface-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${heroImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/30 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-2.5 py-1 rounded-full">
                          {country.region}
                        </span>
                      </div>
                      {/* Benefit line overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex items-center gap-2">
                          <span className="text-sm">{benefit.icon}</span>
                          <span className="text-xs font-semibold text-white">{benefit.line}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                          {country.name}
                        </h3>
                        <span className={`text-xs font-bold ${visaInfo.color}`}>{country.visaRate}</span>
                      </div>
                      <p className="text-xs text-white/40 mb-3 line-clamp-1">{country.tagline}</p>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Tuition</p>
                          <p className="text-xs font-semibold text-white leading-tight">
                            {country.fees?.split("–")[0]?.trim() || country.fees}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Living Cost</p>
                          <p className="text-xs font-semibold text-white leading-tight">{country.livingCost}</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {country.highlights?.slice(0, 3).map((h, j) => (
                          <span
                            key={j}
                            className="text-[10px] font-medium bg-primary-500/10 border border-primary-500/20 text-primary-400 px-2 py-0.5 rounded-md"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] text-white/20">{country.universities?.length || 0} Universities</span>
                        <span className="text-xs font-semibold text-primary-500 group-hover:text-primary-400 transition-colors inline-flex items-center gap-1">
                          Explore
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/destinations"
            className="btn-secondary text-base px-10 py-4 inline-flex items-center gap-2"
          >
            View All 12 Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
