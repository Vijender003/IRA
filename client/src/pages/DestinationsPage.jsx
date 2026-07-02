import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { countryAPI } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import DestinationCard from "../components/DestinationCard";
import CompareTable from "../components/CompareTable";
import MapComponent from "../components/MapComponent";
import countriesData from "../data/countryData";
import { countryImages } from "../data/countryImages";

const featured = ["Georgia", "Singapore", "Russia", "Malta"];

function getCountryImage(c) {
  const slug = c.slug || c.name?.toLowerCase().replace(/\s+/g, "-");
  const img = countryImages[slug] || countryImages[slug?.replace(/-/g, "")];
  if (img?.[0]) return img[0];
  if (c.images?.[0]) return c.images[0];
  return c.image || "";
}

function enrichFromStatic(apiCountries) {
  return apiCountries.map((c) => {
    const staticC = countriesData.find((s) => s.name === c.name || s.slug === c.slug);
    return { ...staticC, ...c, slug: c.slug || staticC?.slug || c.name.toLowerCase() };
  });
}

export default function DestinationsPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ budget: "", level: "", region: "", course: "" });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await countryAPI.getAll();
        setCountries(enrichFromStatic(res.data));
      } catch {
        setCountries(countriesData);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = applyFilters(countries, filters);

  const featuredCountries = countries.filter((c) => featured.includes(c.name));
  const regularCountries = filtered.filter((c) => !featured.includes(c.name));

  const handleSearch = useCallback((query) => {
    const match = suggestions.find((s) => s.toLowerCase() === query.toLowerCase());
    if (match) {
      const country = countriesData.find((c) => c.name.toLowerCase() === match.toLowerCase());
      if (country) window.location.href = `/country/${country.slug}`;
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/5 animate-pulse h-[320px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-custom px-4 md:px-8">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-coral text-sm font-semibold tracking-widest uppercase mb-4">
            Discover Your Path
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-4">
            Explore Your <span className="text-gradient">Global Future</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-8">
            Find the best country for your study, work, or immigration journey.
          </p>
          <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {["Study", "Work", "Immigration", "Business"].map((t) => (
              <span key={t} className="text-xs bg-white/5 border border-white/10 text-white/50 px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </motion.div>
        </motion.section>

        {/* FILTERS */}
        <section className="mb-12">
          <FilterBar filters={filters} onFilterChange={setFilters} total={filtered.length} />
        </section>

        {/* FEATURED COUNTRIES */}
        {featuredCountries.length > 0 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Featured Destinations</h2>
                <p className="text-white/30 text-sm mt-1">Most popular choices among students</p>
              </div>
                <Link to="/destinations" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors">
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCountries.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Link to={`/country/${c.slug || c.name.toLowerCase()}`} className="block group">
                    <div className="relative h-[380px] rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-surface-800 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${getCountryImage(c)})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="transform transition-all duration-500 group-hover:-translate-y-3">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {c.highlights?.slice(0, 3).map((h, j) => (
                              <span key={j} className="text-[10px] font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-2.5 py-1 rounded-full">
                                {h}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-display font-bold text-white mb-1">{c.name}</h3>
                          <p className="text-primary-400 text-sm font-medium mb-1">{c.tagline}</p>
                          <p className="text-white/30 text-xs mb-3">{c.universityCount || 0} Universities</p>
                          <div className="flex items-center gap-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                            Explore {c.name}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* DESTINATIONS GRID */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              All Countries
            </h2>
            <p className="text-white/30 text-sm mt-1">Compare and find your perfect destination</p>
          </motion.div>
          {regularCountries.length === 0 ? (
            <div className="glass-card rounded-3xl p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No countries match your filters</h3>
              <p className="text-white/40 text-sm mb-4">Try adjusting your search criteria</p>
              <button onClick={() => setFilters({ budget: "", level: "", region: "", course: "" })} className="text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {regularCountries.map((c, i) => (
                <DestinationCard key={c.name} country={c} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* MAP SECTION */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Explore on <span className="text-gradient">Map</span>
            </h2>
            <p className="text-white/30 text-sm mt-1">Discover universities and offices around the world</p>
          </motion.div>
          <MapComponent zoom={1} />
        </section>

        {/* COMPARISON TABLE */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Compare <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-white/30 text-sm mt-1">Side-by-side comparison of top study destinations</p>
          </motion.div>
          <CompareTable />
        </section>

        {/* TRUST SECTION */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "98%", label: "Visa Success Rate", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { value: "500+", label: "Partner Universities", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg> },
              { value: "10K+", label: "Students Placed", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center mx-auto mb-4 text-coral">
                  {item.icon}
                </div>
                <div className="text-3xl font-display font-black text-white mb-1">{item.value}</div>
                <p className="text-white/40 text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Ready to Start Your <span className="text-gradient">Global Journey?</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
              Get free consultation from our experts and take the first step toward your future abroad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply" className="btn-primary text-base px-10 py-5">
                Get Free Consultation
              </Link>
              <Link to="/apply" className="btn-secondary text-base px-10 py-5">
                Apply Now
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

const suggestions = [
  "Georgia", "Singapore", "Russia", "Malta", "UK",
  "USA", "Canada", "Australia", "Germany", "France",
  "Ireland", "New Zealand",
];

function parseBudgetAvg(fees) {
  if (!fees) return null;
  const nums = fees.match(/\d[\d,]*/g);
  if (!nums) return null;
  const vals = nums.map((n) => parseInt(n.replace(/,/g, "")));
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function applyFilters(countries, filters) {
  return countries.filter((c) => {
    // Region filter
    if (filters.region) {
      const r = filters.region.toLowerCase();
      const regionMap = {
        europe: ["UK", "Germany", "France", "Ireland", "Malta", "Russia"],
        asia: ["Georgia", "Singapore", "Russia", "Australia", "New Zealand"],
        "north-america": ["USA", "Canada"],
        "middle-east": ["Georgia"],
      };
      const match = regionMap[r] || [];
      if (!match.includes(c.name)) return false;
    }

    // Budget filter
    if (filters.budget) {
      const avg = parseBudgetAvg(c.fees);
      if (avg === null) return false;
      const budgetRanges = {
        "5000": avg < 5000,
        "5000-15000": avg >= 5000 && avg <= 15000,
        "15000-30000": avg >= 15000 && avg <= 30000,
        "30000": avg > 30000,
      };
      if (!budgetRanges[filters.budget]) return false;
    }

    // Study level filter
    if (filters.level) {
      const courseText = (c.courses || []).join(" ").toLowerCase();
      const levelMap = {
        ug: ["bachelor", "undergraduate", "bsc", "ba", "bba"],
        pg: ["master", "postgraduate", "msc", "ma", "mba", "pg"],
        mba: ["mba", "business"],
        phd: ["phd", "doctorate", "doctoral", "research"],
      };
      const keywords = levelMap[filters.level] || [];
      const hasLevel = keywords.some((k) => courseText.includes(k) || c.name?.toLowerCase().includes(k));
      if (!hasLevel) return false;
    }

    // Course filter
    if (filters.course) {
      const courses = (c.courses || []).map((co) => co.toLowerCase());
      const match = courses.some((co) => co.includes(filters.course.toLowerCase()));
      if (!match) return false;
    }

    return true;
  });
}
