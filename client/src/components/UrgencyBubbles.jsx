import { motion } from "framer-motion";
import { useState } from "react";
import LeadFunnel from "./LeadFunnel";

const bubbles = [
  {
    text: "September Intake Closing Soon",
    color: "border-red-500/20 bg-red-500/10 text-red-400",
    dot: "bg-red-400",
    position: "top-[48%] left-[3%] lg:top-[46%] lg:left-[5%]",
    floatX: [0, 6, 0, -4, 0],
    floatY: [0, -6, 0, 4, 0],
    delay: 0.4,
  },
  {
    text: "High Visa Success Rate",
    color: "border-accent-500/20 bg-accent-500/10 text-accent-400",
    dot: "bg-accent-400",
    position: "top-[18%] right-[5%] lg:top-[16%] lg:right-[8%]",
    floatX: [0, -6, 0, 8, 0],
    floatY: [0, 5, 0, -6, 0],
    delay: 0.6,
  },
  {
    text: "Limited Slots Available",
    color: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
    position: "top-[58%] left-[3%] lg:top-[56%] lg:left-[5%]",
    floatX: [0, 4, 0, -6, 0],
    floatY: [0, -4, 0, 6, 0],
    delay: 0.8,
  },
];

export default function UrgencyBubbles() {
  const [showFunnel, setShowFunnel] = useState(false);

  return (
    <>
      {bubbles.map((b, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: b.floatX,
            y: b.floatY,
          }}
          transition={{
            opacity: { delay: b.delay, duration: 0.8 },
            scale: { delay: b.delay, duration: 0.8 },
            x: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            },
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFunnel(true)}
          className={`absolute z-20 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-xl border ${b.color} shadow-lg cursor-pointer select-none ${b.position}`}
        >
          <span className={`w-2 h-2 rounded-full ${b.dot} animate-pulse`} />
          <span className="text-xs font-semibold whitespace-nowrap">{b.text}</span>
        </motion.button>
      ))}

      {/* Mobile: just 1-2 simpler badges */}
      {[bubbles[0], bubbles[2]].map((b, i) => (
        <motion.button
          key={`mobile-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1, 1, 1],
            scale: 1,
            y: [0, -4, 0, 4, 0],
          }}
          transition={{
            opacity: { delay: b.delay + 0.3, duration: 0.6 },
            scale: { delay: b.delay + 0.3, duration: 0.6 },
            y: {
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFunnel(true)}
          className={`absolute z-20 lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border ${b.color} shadow-lg cursor-pointer select-none ${b.position}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${b.dot} animate-pulse`} />
          <span className="text-[10px] font-semibold whitespace-nowrap">{b.text}</span>
        </motion.button>
      ))}

      <LeadFunnel open={showFunnel} onClose={() => setShowFunnel(false)} source="urgency-bubble" />
    </>
  );
}
