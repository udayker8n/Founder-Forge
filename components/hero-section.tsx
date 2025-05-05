"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LayoutContainer from "./layout-container"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center py-20">
      <LayoutContainer>
        <div className="text-center z-10 mt-16 md:mt-0">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 mb-6"
            >
              EXCLUSIVE NETWORK FOR VISIONARY FOUNDERS
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-tight text-gray-900 mb-6"
            >
              <span className="block">Where <span className="block">Exceptional</span> </span>
              <span className="block mt-1">
                Founders <span className="italic">Converge</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
            >
              An invitation-only collective of elite entrepreneurs who have built and scaled $10M+ companies. Access
              unparalleled insights, strategic connections, and transformative opportunities.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#request-access"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full text-sm font-medium flex items-center gap-2 min-w-[200px] justify-center transition-all duration-300"
              >
                Request Access
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </LayoutContainer>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
            className="w-1.5 h-3 bg-gray-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
