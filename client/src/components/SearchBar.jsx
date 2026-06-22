import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import countriesData from "../data/countryData";

export default function SearchBar({ onSearch, className = "" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef(null);
  const navigate = useNavigate();

  const filtered = query.trim()
    ? countriesData.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.region?.toLowerCase().includes(query.toLowerCase()) ||
        c.courses?.some((co) => co.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      if (filtered.length > 0) {
        navigate(`/country/${filtered[0].slug}`);
      }
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIdx(-1);
            }}
            onFocus={() => query.trim() && setOpen(true)}
            placeholder="Search countries, courses, or universities..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-14 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all"
          >
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {open && filtered.length > 0 && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 bg-surface-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 z-50"
          >
            {filtered.slice(0, 8).map((c, i) => (
              <button
                key={c.slug}
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                  navigate(`/country/${c.slug}`);
                }}
                onMouseEnter={() => setActiveIdx(i)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm text-left transition-colors ${
                  i === activeIdx ? "bg-primary-500/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-white/30 truncate">{c.region} — {c.fees}</p>
                </div>
                <span className="text-xs text-white/30">
                  {c.universities?.length || 0} universities
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
