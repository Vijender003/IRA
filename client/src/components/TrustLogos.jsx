import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const partners = [
  { name: "University of Oxford", slug: "oxford" },
  { name: "MIT", slug: "mit" },
  { name: "Stanford University", slug: "stanford" },
  { name: "University of Toronto", slug: "toronto" },
  { name: "National University of Singapore", slug: "nus" },
  { name: "Technical University of Munich", slug: "tum" },
  { name: "University of Melbourne", slug: "melbourne" },
  { name: "Trinity College Dublin", slug: "trinity-college-dublin" },
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
                className="group relative h-[100px] md:h-[110px] lg:h-[120px] rounded-[16px] cursor-pointer"
              >
                <div className="absolute inset-0 rounded-[16px] p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none">
                  <div className="w-full h-full rounded-[15px] bg-gradient-to-r from-[#4287f5] via-[#8b5cf6] to-[#4287f5] bg-[length:200%_100%] animate-[borderShift_3s_linear_infinite]" />
                </div>

                <div
                  className="glow-pulse absolute inset-0 rounded-[16px] pointer-events-none z-0"
                  style={{
                    animation: `cardPulse 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />

                <div
                  className="relative w-full h-full flex items-center justify-center rounded-[16px] px-6 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-[1.05] group-hover:-translate-y-[5px] group-hover:bg-white/[0.12] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_30px_4px_rgba(66,135,245,0.6)]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="text-sm lg:text-base font-medium text-[#e0e0ff] tracking-[0.5px] group-hover:text-white transition-colors duration-[400ms] text-center leading-relaxed">
                    {p.name}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
