import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const partners = [
  { name: "University of Oxford", slug: "oxford", location: "Oxford, UK", image: "https://images.unsplash.com/photo-1506003094589-5c5a5a12e8d3?w=600&q=80", tag: "#1 Worldwide" },
  { name: "MIT", slug: "mit", location: "Cambridge, USA", image: "https://images.unsplash.com/photo-1569488540394-4c53a1c0a0f9?w=600&q=80", tag: "#2 Worldwide" },
  { name: "Stanford University", slug: "stanford", location: "Stanford, USA", image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=80", tag: "#3 Worldwide" },
  { name: "University of Toronto", slug: "toronto", location: "Toronto, Canada", image: "https://images.unsplash.com/photo-1569519266191-9d3c3ea6b7d0?w=600&q=80", tag: "#18 Worldwide" },
  { name: "National University of Singapore", slug: "nus", location: "Singapore", image: "https://images.unsplash.com/photo-1568608471701-8f6e3bb1d460?w=600&q=80", tag: "#8 Worldwide" },
  { name: "Technical University of Munich", slug: "tum", location: "Munich, Germany", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&q=80", tag: "#37 Worldwide" },
  { name: "University of Melbourne", slug: "melbourne", location: "Melbourne, Australia", image: "https://images.unsplash.com/photo-1608958005033-8c1b04fd8b08?w=600&q=80", tag: "#14 Worldwide" },
  { name: "Trinity College Dublin", slug: "trinity-college-dublin", location: "Dublin, Ireland", image: "https://images.unsplash.com/photo-1558981001-792f6c0d5068?w=600&q=80", tag: "#61 Worldwide" },
];

export default function TrustLogos() {
  return (
    <section className="section-padding relative overflow-hidden">
      <style>{`
        @keyframes borderShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes cardPulse {
          0%, 100% { box-shadow: 0 0 18px 2px rgba(66, 135, 245, 0.35); }
          50% { box-shadow: 0 0 26px 5px rgba(66, 135, 245, 0.48); }
        }
        @media (max-width: 767px) {
          .glow-pulse {
            animation-duration: 4s !important;
            box-shadow: 0 0 10px 1px rgba(66, 135, 245, 0.3) !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-[#0a0f2c]" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold uppercase tracking-[2px] bg-gradient-to-r from-[#b0c4ff] to-white bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 2px rgba(66,135,245,0.5))" }}
          >
            Partnered with Top Global Universities
          </h2>
          <p className="text-white/25 text-xs tracking-[0.15em] uppercase mt-5 font-medium">
            Trusted by 10,000+ Students Worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {partners.map((p, i) => (
            <Link key={p.name} to={`/universities/${p.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="group relative h-[200px] md:h-[240px] lg:h-[280px] rounded-[16px] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 rounded-[16px] p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none z-10">
                  <div className="w-full h-full rounded-[15px] bg-gradient-to-r from-[#4287f5] via-[#8b5cf6] to-[#4287f5] bg-[length:200%_100%] animate-[borderShift_3s_linear_infinite]" />
                </div>

                <div
                  className="glow-pulse absolute inset-0 rounded-[16px] pointer-events-none z-0"
                  style={{
                    animation: `cardPulse 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />

                <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2c] via-[#0a0f2c]/40 to-transparent" />
                </div>

                <div
                  className="relative w-full h-full flex flex-col justify-end rounded-[16px] p-4 md:p-5 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-[1.03] group-hover:-translate-y-[3px] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_30px_4px_rgba(66,135,245,0.6)]"
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary-300 mb-1.5"
                  >
                    {p.tag}
                  </span>
                  <h3 className="text-white font-bold text-base md:text-lg leading-tight group-hover:text-primary-200 transition-colors duration-[400ms]">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white/50 text-xs">{p.location}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-[11px] text-primary-300 font-medium">View Details</span>
                    <svg className="w-3.5 h-3.5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
