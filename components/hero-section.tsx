"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  const brandName = "FounderForge"

  return (
    <div className="w-full max-w-4xl mx-auto text-center flex flex-col justify-center h-full px-4">
      <div className="mb-6 sm:mb-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
            {brandName}
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-[#E8E3D9] font-light tracking-wide"
        >
          The World's Most Exclusive Elite Founder 1:1 Session
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 sm:mt-8 backdrop-blur-sm bg-black/20 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10"
      >
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#E8E3D9]">
          Unlock game-changing insights from visionary founders. Get exclusive, one-on-one mentorship through seamless
          communication channels.
        </p>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-[#A9A9A9]">
          Our platform connects emerging entrepreneurs with founders who have built and scaled successful companies
          worth $100M+.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {["Exclusive Network", "1:1 Mentorship", "Proven Founders"].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-1.5 bg-black/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D4B98C]/20"
          >
            <span className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#D4B98C] rounded-full"></span>
            <span className="text-xs sm:text-sm text-[#E8E3D9]">{item}</span>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-6 sm:mt-8 text-[#A9A9A9] text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">Use arrow keys or the navigation buttons to explore</span>
        <span className="sm:hidden">Swipe left or right to explore</span>
      </motion.p>
    </div>
  )
}

