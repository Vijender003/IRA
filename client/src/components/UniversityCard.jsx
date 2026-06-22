import { motion } from "framer-motion";
import universityImages from "../data/universityImages";

export default function UniversityCard({ university, index = 0 }) {
  const uniImage = universityImages[university.name] || university.image;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:border-primary-500/20 transition-all duration-500">
        <div className="relative h-44 overflow-hidden">
          <div
            className="absolute inset-0 bg-surface-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${uniImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-medium bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2.5 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {university.rating}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h4 className="text-lg font-semibold text-white mb-1">{university.name}</h4>
          <p className="text-white/40 text-xs mb-3">{university.location}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {university.programs?.slice(0, 3).map((p, i) => (
              <span key={i} className="text-[10px] font-medium bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded-md">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-sm font-semibold text-primary-400">{university.fees}</span>
            <span className="text-xs text-white/30">/ year</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
