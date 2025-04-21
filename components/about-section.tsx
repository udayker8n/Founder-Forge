"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          Why FounderForge Exists
        </h2>
        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4B98C] to-[#A67C52] mx-auto mb-4 sm:mb-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-sm bg-black/30 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#D4B98C]">The Problem</h3>
          <p className="text-sm sm:text-base text-[#E8E3D9] leading-relaxed">
            Founders often struggle to connect with experienced entrepreneurs who've faced similar challenges.
            Traditional networking events and online forums lack the depth and personalization needed for meaningful
            guidance.
          </p>
          <p className="text-sm sm:text-base text-[#E8E3D9] leading-relaxed mt-3 sm:mt-4">
            Most mentorship platforms are filled with consultants and theorists rather than battle-tested founders
            who've built successful companies from the ground up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-sm bg-black/30 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#D4B98C]">Our Solution</h3>
          <p className="text-sm sm:text-base text-[#E8E3D9] leading-relaxed">
            FounderForge creates direct, one-on-one connections between emerging entrepreneurs and founders who have
            built and scaled successful companies worth $100M+.
          </p>
          <p className="text-sm sm:text-base text-[#E8E3D9] leading-relaxed mt-3 sm:mt-4">
            Our platform facilitates meaningful conversations through seamless communication channels, allowing for
            personalized guidance that addresses your specific challenges and opportunities.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 sm:mt-8 text-center backdrop-blur-sm bg-black/20 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10"
      >
        <p className="text-sm sm:text-lg text-[#E8E3D9] italic">
          "We're not building another networking platform. We're architecting a precision-engineered ecosystem where
          real founders share battle-tested insights that can only come from experience."
        </p>
      </motion.div>
    </div>
  )
}

