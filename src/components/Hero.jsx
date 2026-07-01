import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="gradient-hero text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            Your Journey to a <span className="text-gold-400">New Life</span>
          </h1>

          <p className="mb-6 text-blue-100">
            Expert migration services for study, work & PR.
          </p>

          <button className="bg-gold-400 text-brand-900 px-6 py-3 rounded-full">
            Get Started
          </button>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
          className="rounded-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />

      </div>
    </section>
  );
}