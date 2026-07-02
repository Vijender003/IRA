import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getUniversityBySlug, getRelatedUniversities } from "../data/universityData";

function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function HeroSection({ uni }) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${uni.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/20 via-[#0a0908]/50 to-[#0a0908]/95" />
      {uni.logo && (
        <div className="absolute top-8 left-8 z-10">
          <img src={uni.logo} alt={uni.name} className="h-16 w-auto opacity-90" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-primary-400 font-medium tracking-[0.15em] uppercase mb-4"
          >
            {uni.rankingLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] mb-4"
            style={{ filter: "drop-shadow(0 0 20px rgba(15,106,107,0.3))" }}
          >
            {uni.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-2"
          >
            {uni.city}, {uni.country}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base text-white/40 italic mb-8"
          >
            {uni.motto}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button className="btn-primary-glow text-base px-10 py-4 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Apply Now
            </button>
            <button className="btn-secondary text-base px-10 py-4 inline-flex items-center gap-2">
              Request Information
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-widest">Explore</span>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsBar({ uni }) {
  const stats = [
    { label: "Founded", value: uni.founded, suffix: "", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", format: "number" },
    { label: "Global Ranking", value: `#${uni.ranking}`, icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", format: "text" },
    { label: "Students", value: uni.students, suffix: "+", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", format: "number" },
    { label: "Intl. Students", value: `${uni.internationalStudents}%`, icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", format: "text" },
    { label: "Acceptance", value: uni.acceptanceRate, suffix: "%", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", format: "number" },
    { label: "Faculty", value: uni.faculty, suffix: "+", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", format: "number" },
    { label: "Graduation Rate", value: uni.graduationRate, suffix: "%", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", format: "number" },
  ];

  return (
    <section className="relative z-10 -mt-16 pb-8">
      <div className="container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="glass-card rounded-[16px] p-4 md:p-5 text-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <p className="text-xl md:text-2xl font-bold text-white font-display">
                {stat.format === "number" ? <CountUp end={stat.value} suffix={stat.suffix} /> : stat.value}
              </p>
              <p className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection({ uni }) {
  return (
    <section className="section-padding relative">
      <div className="container-custom px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">{uni.name}</span>
          </h2>
          <p className="text-[#a0a0c0] text-sm tracking-[0.15em] uppercase mb-8">Founded in {uni.founded} · {uni.city}, {uni.country}</p>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 text-lg leading-relaxed mb-6">{uni.about}</p>
          </div>
          {uni.mission && (
            <div className="mt-8 p-6 rounded-[16px]" style={{ background: "rgba(15,106,107,0.05)", border: "1px solid rgba(15,106,107,0.12)" }}>
              <p className="text-xs text-primary-400 uppercase tracking-[0.15em] mb-2 font-medium">Mission</p>
              <p className="text-white/60 italic leading-relaxed">{uni.mission}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProgramCard({ program, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-[16px] overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:-translate-y-1"
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${program.color}15`, border: `1px solid ${program.color}30` }}
          >
            {program.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-base md:text-lg">{program.name}</h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                style={{ background: `${program.color}20`, color: program.color }}
              >
                {program.degreeType}
              </span>
            </div>
            <p className="text-[#a0a0c0] text-sm">
              <span className="text-white/60">{program.duration}</span>
              {program.fee && <span className="text-white/40 mx-2">·</span>}
              {program.fee && <span className="text-emerald-400/80 font-medium">{program.fee}</span>}
            </p>
          </div>
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-5 h-5 text-white/30 mt-2 flex-shrink-0"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {program.subjects.slice(0, 4).map((s) => (
            <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
              {s}
            </span>
          ))}
          {program.subjects.length > 4 && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/30 border border-white/5">
              +{program.subjects.length - 4}
            </span>
          )}
        </div>

        {program.careers && (
          <div className="flex flex-wrap gap-2">
            {program.careers.slice(0, 2).map((c) => (
              <span key={c} className="text-[11px] text-primary-400/70 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {c}
              </span>
            ))}
          </div>
        )}

        {expanded && program.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-white/5"
          >
            <p className="text-white/50 text-sm leading-relaxed">{program.description}</p>
            <button className="mt-3 text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors">
              Apply for this program →
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ProgramsSection({ uni }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#131210] to-[#0a0908]" />
      <div className="relative z-10 container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Academic Programs</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            What You Can <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Study</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Explore our comprehensive range of programs designed to prepare you for a successful career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {uni.programs.map((program, i) => (
            <ProgramCard key={program.name} program={program} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="btn-secondary text-sm px-8 py-3">
            View All Programs & Requirements
            <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FacilitiesSection({ uni }) {
  return (
    <section className="section-padding relative">
      <div className="container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Campus & Facilities</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            World-Class <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Facilities</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {uni.facilities.map((facility, i) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-[16px] overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="h-48 md:h-56 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/90 via-[#0a0908]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-primary-400 transition-colors">{facility.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ uni }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#131210] to-[#0a0908]" />
      <div className="relative z-10 container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Student Voices</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            What Students <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Say</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uni.testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[16px] p-6 group hover:scale-[1.02] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.program} · Class of {t.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdmissionsSection({ uni }) {
  return (
    <section className="section-padding relative">
      <div className="container-custom px-4 md:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Admissions</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Your Journey <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Starts Here</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/40 via-primary-500/20 to-transparent" />
          <div className="space-y-8">
            {uni.admissions.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-14 md:pl-16"
              >
                <div
                  className="absolute left-3 md:left-4 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: "rgba(15,106,107,0.15)", border: "1px solid rgba(15,106,107,0.3)" }}
                >
                  <span className="text-primary-400 text-xs font-bold">{step.step}</span>
                </div>
                <div
                  className="rounded-[16px] p-5 md:p-6 group hover:scale-[1.01] transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xl">{step.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                      <p className="text-primary-400/60 text-xs font-medium">{step.duration}</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{step.description}</p>
                  {step.details && (
                    <ul className="space-y-1">
                      {step.details.map((d) => (
                        <li key={d} className="text-white/40 text-xs flex items-center gap-2">
                          <svg className="w-3 h-3 text-primary-500/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScholarshipSection({ uni }) {
  if (!uni.scholarships || uni.scholarships.length === 0) return null;
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#131210] to-[#0a0908]" />
      <div className="relative z-10 container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Financial Support</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Scholarships & <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Financial Aid</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {uni.scholarships.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-[16px] p-5 md:p-6"
              style={{
                background: "linear-gradient(135deg, rgba(15,106,107,0.06) 0%, rgba(213,138,106,0.06) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-base md:text-lg">{s.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                  style={{ background: s.type === "Merit-Based" ? "rgba(15,106,107,0.15)" : "rgba(213,138,106,0.15)", color: s.type === "Merit-Based" ? "#5990ff" : "#a78bfa" }}>
                  {s.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Coverage</p>
                  <p className="text-white/70 text-sm font-medium">{s.coverage}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Amount</p>
                  <p className="text-emerald-400/80 text-sm font-semibold">{s.amount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Eligibility</p>
                  <p className="text-white/50 text-xs">{s.eligibility}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Deadline</p>
                  <p className="text-white/50 text-xs">{s.deadline}</p>
                </div>
              </div>
              <button className="text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors inline-flex items-center gap-1">
                Apply for Scholarship
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareerSection({ uni }) {
  const c = uni.careers;
  if (!c) return null;
  return (
    <section className="section-padding relative">
      <div className="container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs text-primary-400/80 tracking-[0.2em] uppercase mb-3 font-medium">Outcomes</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Your Career <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Future</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[16px] p-6 text-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-3xl md:text-4xl font-bold text-primary-400 font-display"><CountUp end={c.employmentRate} suffix="%" /></p>
            <p className="text-white/40 text-sm mt-1">Employment Rate</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[16px] p-6 text-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-3xl md:text-4xl font-bold text-emerald-400 font-display">{c.averageSalary}</p>
            <p className="text-white/40 text-sm mt-1">Average Starting Salary</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[16px] p-6 text-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-sm text-white/60 mb-2">Top Employers</p>
            <div className="flex flex-wrap justify-center gap-2">
              {c.topEmployers.slice(0, 6).map((emp) => (
                <span key={emp} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                  {emp}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        {c.graduateStories && c.graduateStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.graduateStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="rounded-[16px] p-5 flex items-center gap-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{story.name}</p>
                  <p className="text-white/60 text-xs">{story.program}</p>
                  <p className="text-primary-400/60 text-xs mt-1">{story.path}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactSection({ uni }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Request received! We'll contact you within 24 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#131210] to-[#0a0908]" />
      <div className="relative z-10 container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Join <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">{uni.name}</span>?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">Start your application journey today. Our admissions team is here to help.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {uni.contact.email && (
              <div className="flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Email</p>
                  <a href={`mailto:${uni.contact.email}`} className="text-primary-400 hover:text-primary-400 transition-colors text-sm">{uni.contact.email}</a>
                </div>
              </div>
            )}
            {uni.contact.phone && (
              <div className="flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Phone</p>
                  <a href={`tel:${uni.contact.phone}`} className="text-white/70 hover:text-white transition-colors text-sm">{uni.contact.phone}</a>
                </div>
              </div>
            )}
            {uni.contact.address && (
              <div className="flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Address</p>
                  <p className="text-white/50 text-sm">{uni.contact.address}</p>
                </div>
              </div>
            )}
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-[16px] p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="text-white font-semibold text-lg mb-5">Request Information</h3>
            <div className="space-y-4">
              <input
                type="text" placeholder="Full Name *" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all"
              />
              <input
                type="email" placeholder="Email Address *" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all"
              />
              <input
                type="tel" placeholder="Phone Number *" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all"
              />
              <textarea
                placeholder="Your Message (optional)" value={form.message} rows={3}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all resize-none"
              />
              <button type="submit" className="w-full btn-primary-glow text-sm py-3.5">
                Send Request
              </button>
              <div className="flex items-center justify-center gap-3 text-white/30 text-[11px]">
                <span>10,000+ students guided</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>98% visa success</span>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function RelatedSection({ slug }) {
  const related = getRelatedUniversities(slug, 4);
  return (
    <section className="section-padding relative">
      <div className="container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Explore Similar <span className="bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent">Universities</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((u, i) => (
            <Link key={u.slug} to={`/universities/${u.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-[16px] overflow-hidden cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="h-36 overflow-hidden">
                  <img src={u.image} alt={u.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm group-hover:text-primary-400 transition-colors">{u.name}</p>
                  <p className="text-white/30 text-xs mt-1">{u.city}, {u.country}</p>
                  <p className="text-primary-400/60 text-[11px] mt-1">Ranking: #{u.ranking}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function UniversityDetailPage() {
  const { slug } = useParams();
  const uni = getUniversityBySlug(slug);

  if (!uni) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0908]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">University Not Found</h1>
          <p className="text-white/50 mb-8">The university you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary-glow px-8 py-3">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0908] min-h-screen">
      <HeroSection uni={uni} />
      <StatsBar uni={uni} />
      <AboutSection uni={uni} />
      <ProgramsSection uni={uni} />
      <FacilitiesSection uni={uni} />
      <TestimonialsSection uni={uni} />
      <AdmissionsSection uni={uni} />
      <ScholarshipSection uni={uni} />
      <CareerSection uni={uni} />
      <ContactSection uni={uni} />
      <RelatedSection slug={slug} />
    </div>
  );
}
