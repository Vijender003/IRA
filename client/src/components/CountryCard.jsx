import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { countryImages } from "../data/countryImages";

export default function CountryCard({ country, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/country/${country.slug}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-surface-900 border border-white/5 hover:border-primary-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5">
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-surface-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${(countryImages[country.slug] || countryImages[country.slug.replace(/-/g, '')])?.[0] || country.images?.[0]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-sm">{country.flag}</span>
              <span className="text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-3 py-1 rounded-full">
                {country.universities?.length || 0} Universities
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-display font-bold text-white">{country.name}</h3>
              <svg className="w-4 h-4 text-primary-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <p className="text-white/40 text-xs mb-3 line-clamp-1">{country.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {country.highlights?.slice(0, 3).map((h, j) => (
                <span key={j} className="text-[10px] font-medium bg-primary-500/10 border border-primary-500/20 text-primary-300 px-2 py-0.5 rounded-md">
                  {h}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="text-xs text-white/30">
                Avg. {country.fees}
              </div>
              <span className="text-xs font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                Explore →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
