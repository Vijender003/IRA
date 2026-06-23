import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stories = [
  {
    name: "Rahul Verma",
    from: "Delhi",
    destination: "Canada",
    program: "MBA at UBC",
    result: "Visa Approved in 45 Days",
    before: "2 visa rejections, almost gave up",
    after: "Got Canada PR pathway after MBA",
    text: "I had almost given up on my Canada dream after two rejections. THE PARASHARS turned it around completely. From a strong SOP to interview prep, they were with me at every step.",
    icon: "🇨🇦",
    color: "from-accent-500/20 to-accent-500/5",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Priya Sharma",
    from: "Mumbai",
    destination: "Australia",
    program: "MS in Data Science",
    result: "AUD 15,000 Scholarship",
    before: "Low IELTS score (6.0)",
    after: "Scholarship + job in Sydney",
    text: "The Parashars helped me find the perfect university that matched my profile AND got me a scholarship. I'm now working in Sydney with a great job.",
    icon: "🇦🇺",
    color: "from-primary-500/20 to-primary-500/5",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Amit Patel",
    from: "Ahmedabad",
    destination: "Germany",
    program: "MEng at TU Berlin",
    result: "Visa Approved — No Blocked Account",
    before: "Confused about APS process",
    after: "Enrolled at TU Berlin with housing",
    text: "The team guided me through the entire German application process. They even helped me find affordable student housing in Berlin.",
    icon: "🇩🇪",
    color: "from-amber-500/20 to-amber-500/5",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Sneha Reddy",
    from: "Hyderabad",
    destination: "UK",
    program: "LLM at King's College",
    result: "Visa Approved in 2 Weeks",
    before: "Missed September intake deadline",
    after: "Expedited visa in 14 days",
    text: "I needed to join the September intake urgently. The Parashars expedited my entire application and I got my visa in just 14 days. Absolutely life-changing.",
    icon: "🇬🇧",
    color: "from-violet-500/20 to-violet-500/5",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export default function SocialProof() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950" />
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">Real Student Stories</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Success Stories That <span className="text-gradient">Inspire Us</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">Real results from real students who trusted us with their dreams.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${story.color} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative glass-card rounded-3xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{story.name}</p>
                      <p className="text-white/30 text-xs">{story.from} → {story.destination}</p>
                    </div>
                  </div>
                  <span className="text-3xl">{story.icon}</span>
                </div>

                {/* Visa approval badge */}
                <div className="inline-flex items-center gap-1.5 bg-accent-500/10 border border-accent-500/20 rounded-full px-3 py-1 mb-3">
                  <svg className="w-3 h-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-accent-400">{story.result}</span>
                </div>

                {/* Before/After */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3">
                    <p className="text-[10px] text-red-400/60 uppercase tracking-wider mb-0.5">Before</p>
                    <p className="text-xs text-white/50">{story.before}</p>
                  </div>
                  <div className="bg-accent-500/5 border border-accent-500/10 rounded-xl p-3">
                    <p className="text-[10px] text-accent-400/60 uppercase tracking-wider mb-0.5">After</p>
                    <p className="text-xs text-accent-400 font-medium">{story.after}</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4">"{story.text}"</p>
                <div className="text-xs text-white/20">{story.program}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Results counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { number: "10,000+", label: "Students Helped" },
            { number: "98%", label: "Visa Approval Rate" },
            { number: "45+", label: "Partner Universities" },
            { number: "4.9/5", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center">
              <p className="text-2xl md:text-3xl font-black text-white mb-1">{stat.number}</p>
              <p className="text-xs text-white/30 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
