import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCountryData } from "../data/countryData";
import { countryImages } from "../data/countryImages";
import countryExtras from "../data/countryExtras";
import MapComponent from "./MapComponent";
import UniversityCard from "./UniversityCard";

function Skeleton() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-custom px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-[55vh] rounded-3xl bg-white/5" />
          <div className="h-8 w-64 rounded-xl bg-white/5" />
          <div className="h-4 w-96 rounded-xl bg-white/5" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => <div key={i} className="aspect-[4/3] rounded-xl bg-white/5" />)}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-32 rounded-2xl bg-white/5" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
      <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{children}</h2>
    </div>
  );
}

function InfoCard({ icon, label, value, accent }) {
  return (
    <div className="bg-white/5 border border-white/[0.04] rounded-xl p-5 hover:bg-white/[0.07] transition-all">
      <div className={`w-10 h-10 rounded-xl bg-${accent || "primary"}-500/10 border border-${accent || "primary"}-500/20 flex items-center justify-center mb-3`}>
        <svg className={`w-5 h-5 text-${accent || "primary"}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <p className="text-xs text-white/30 mb-1">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export default function CountryPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const country = getCountryData(slug);
  const extras = countryExtras[slug] || null;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [slug]);

  if (loading) return <Skeleton />;

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Country Not Found</h1>
          <p className="text-white/40 mb-6">We couldn&apos;t find the country you&apos;re looking for.</p>
          <Link to="/destinations" className="btn-primary">Browse All Countries</Link>
        </div>
      </div>
    );
  }

  const images = countryImages[slug] || countryImages[slug.replace(/-/g, "")] || country.images || [];
  const heroImage = images[0];
  const galleryImages = images.slice(1, 5);

  const visaRate = parseInt(country.visaRate) || 0;
  const prColor = visaRate >= 90 ? "accent" : visaRate >= 80 ? "primary" : visaRate >= 70 ? "amber" : "red";

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[550px] flex items-end">
        <div className="absolute inset-0 bg-surface-900 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/70 to-surface-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950/50 to-transparent" />
        <div className="relative z-10 container-custom px-4 md:px-8 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/destinations" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Destinations
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{country.flag}</span>
              <span className="text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 px-4 py-1.5 rounded-full">
                {country.region}
              </span>
              {extras?.prChances && (
                <span className={`text-sm font-medium bg-${prColor}-500/10 border border-${prColor}-500/20 text-${prColor}-400 px-4 py-1.5 rounded-full`}>
                  PR: {extras.prChances.rating}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-4 leading-tight">
              {country.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-300 font-medium mb-8">{country.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Apply Now
              </Link>
              <Link to="/services" className="btn-secondary text-base px-8 py-4">Book Consultation</Link>
            </div>
          </motion.div>
        </div>
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent z-[5]" />
      </section>

      <div className="container-custom px-4 md:px-8">
        {/* OVERVIEW + KEY STATS */}
        <section className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-12"
            >
              {/* DESCRIPTION */}
              <div>
                <SectionHeading>About {country.name}</SectionHeading>
                <p className="text-white/50 text-lg leading-relaxed">{country.description}</p>
              </div>

              {/* WHY CHOOSE */}
              <div>
                <SectionHeading>Why Choose {country.name}?</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {country.whyChoose?.map((reason, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 bg-white/5 border border-white/[0.04] rounded-xl p-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/50 text-sm">{reason}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* COST BREAKDOWN */}
              <div>
                <SectionHeading>Cost Breakdown</SectionHeading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <InfoCard
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    label="Tuition (Year)"
                    value={country.fees}
                    accent="primary"
                  />
                  <InfoCard
                    icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    label="Living Cost (Month)"
                    value={country.livingCost}
                    accent="accent"
                  />
                  <InfoCard
                    icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    label="Visa Success Rate"
                    value={country.visaRate}
                    accent={prColor}
                  />
                  <InfoCard
                    icon="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    label="English Required"
                    value={country.englishRequirement}
                    accent="violet"
                  />
                </div>
              </div>

              {/* VISA PROCESS */}
              {extras?.visaProcess && (
                <div>
                  <SectionHeading>Visa Process</SectionHeading>
                  <div className="space-y-4">
                    {extras.visaProcess.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                            i === 0 ? "from-primary-500 to-blue-600" :
                            i === extras.visaProcess.length - 1 ? "from-accent-500 to-emerald-600" :
                            "from-primary-500/50 to-primary-600/50"
                          } flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                            {step.step}
                          </div>
                          {i < extras.visaProcess.length - 1 && (
                            <div className="w-px flex-1 bg-gradient-to-b from-primary-500/30 to-transparent my-1" />
                          )}
                        </div>
                        <div className="pb-6">
                          <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                          <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* JOB MARKET & OPPORTUNITIES */}
              {extras?.jobMarket && (
                <div>
                  <SectionHeading>Job Opportunities</SectionHeading>
                  <div className="glass-card rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Top Industries</p>
                        <div className="flex flex-wrap gap-2">
                          {extras.jobMarket.topIndustries.map((ind, i) => (
                            <span key={i} className="text-xs font-medium bg-primary-500/10 border border-primary-500/20 text-primary-300 px-3 py-1.5 rounded-lg">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Average Salary</p>
                        <p className="text-2xl font-display font-bold text-white">{extras.jobMarket.avgSalary}</p>
                        <p className="text-xs text-white/30 mt-1">Post-graduation expected range</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-wider mb-3">In-Demand Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {extras.jobMarket.demandRoles.map((role, i) => (
                          <span key={i} className="text-xs font-medium bg-accent-500/10 border border-accent-500/20 text-accent-400 px-3 py-1.5 rounded-lg">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-white/40 bg-white/5 rounded-xl p-4">
                      {country.workOpportunities}
                    </p>
                  </div>
                </div>
              )}

              {/* PR / SETTLEMENT CHANCES */}
              {extras?.prChances && (
                <div>
                  <SectionHeading>PR & Settlement Chances</SectionHeading>
                  <div className="glass-card rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-${prColor}-500/10 border border-${prColor}-500/20 flex items-center justify-center`}>
                        <svg className={`w-7 h-7 text-${prColor}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{extras.prChances.rating}</p>
                        <p className="text-xs text-white/30">PR / Settlement Rating</p>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{extras.prChances.description}</p>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">Pathway</p>
                      <p className="text-sm text-primary-300 font-medium">{extras.prChances.pathway}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* UNIVERSITIES */}
              {country.universities?.length > 0 && (
                <div>
                  <SectionHeading>Top Universities ({country.universities.length})</SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {country.universities.map((uni, i) => (
                      <UniversityCard key={uni.name} university={uni} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* POPULAR COURSES */}
              {country.courses?.length > 0 && (
                <div>
                  <SectionHeading>Popular Courses</SectionHeading>
                  <div className="flex flex-wrap gap-2">
                    {country.courses.map((course, i) => (
                      <motion.span
                        key={course}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        className="text-sm bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-xl hover:bg-primary-500/10 hover:border-primary-500/20 hover:text-primary-300 transition-all"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* GALLERY */}
              {galleryImages.length > 0 && (
                <div>
                  <SectionHeading>Gallery</SectionHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {galleryImages.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer bg-surface-800"
                      >
                        <img
                          src={img}
                          alt={`${country.name} gallery ${i + 2}`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* MAP */}
              <div>
                <SectionHeading>Explore on Map</SectionHeading>
                <MapComponent countrySlug={slug} zoom={5} className="rounded-2xl" />
              </div>
            </motion.div>

            {/* SIDEBAR */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-8 sticky top-28 space-y-6">
                <h3 className="text-lg font-display font-bold text-white">Quick Summary</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-white/40">Tuition</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{country.fees}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-sm text-white/40">Living Cost</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{country.livingCost}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm text-white/40">Visa Rate</span>
                    </div>
                    <span className={`text-sm font-semibold text-${prColor}-400`}>{country.visaRate}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-sm text-white/40">English</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{country.englishRequirement}</span>
                  </div>
                  <div className="flex items-start justify-between py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-white/40">Work</span>
                    </div>
                    <span className="text-sm text-white/60 text-right max-w-[160px]">{country.workOpportunities}</span>
                  </div>
                </div>

                <Link to="/apply" className="btn-primary w-full text-center block">
                  Apply for {country.name}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROS & CONS */}
        <section className="section-padding border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white">Pros</h3>
              </div>
              <ul className="space-y-3">
                {country.pros?.map((pro, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <svg className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/60 text-sm">{pro}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white">Cons</h3>
              </div>
              <ul className="space-y-3">
                {country.cons?.map((con, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-white/60 text-sm">{con}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                Ready to Study in <span className="text-gradient">{country.name}?</span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
                Get your personalized study plan and start your journey to {country.name} today — completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply" className="btn-primary-glow text-base px-10 py-5">
                  Get Your Free Study Plan
                </Link>
                <Link to="/destinations" className="btn-secondary text-base px-10 py-5">
                  Compare Countries
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
