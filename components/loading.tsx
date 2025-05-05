"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-16 h-16">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="absolute top-0 left-0 w-full h-full border-4 border-white/30 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#118AB2] rounded-full"
          ></motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-[#073B4C] text-sm font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}
