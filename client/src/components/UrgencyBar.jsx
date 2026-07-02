import { motion } from "framer-motion";

export default function UrgencyBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-50 bg-gradient-to-r from-primary-600/20 via-coral-dark/20 to-primary-600/20 border-y border-white/5 overflow-hidden"
    >
      <div className="container-custom px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/70 font-medium">
            <span className="text-red-400 font-bold">September Intake</span> — Applications Closing Soon
          </span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-white/70 font-medium">
            Limited Slots Available — Apply Today
          </span>
        </div>
      </div>
    </motion.div>
  );
}
