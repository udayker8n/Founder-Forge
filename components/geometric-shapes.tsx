"use client"

import { motion } from "framer-motion"

export default function GeometricShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Large circle */}
      <motion.div
        className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full border border-gray-200"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Small circle */}
      <motion.div
        className="absolute top-[60%] -left-[5%] w-[300px] h-[300px] rounded-full border border-gray-200"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Rectangle */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-[200px] h-[200px] border border-gray-200 rotate-45"
        animate={{
          rotate: [45, 60, 45],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Dots pattern */}
      <div className="absolute bottom-[10%] left-[15%] w-[200px] h-[200px] opacity-10">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: (i * 0.1) % 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
